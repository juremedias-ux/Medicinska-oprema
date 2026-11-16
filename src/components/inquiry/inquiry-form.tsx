"use client";

import Link from "next/link";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { flushSync } from "react-dom";

import { FormErrorAlert, FormSuccess, HoneypotField } from "@/components/forms/form-feedback";
import { focusFirstError } from "@/components/forms/form-utils";
import { useFormSubmit } from "@/components/forms/use-form-submit";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Field, Input, Select, describedBy } from "@/components/ui/form-controls";
import { SpinnerIcon } from "@/components/ui/icons";
import type { FieldErrors, FormSource, InquiryField, InquiryType, RequesterType } from "@/lib/forms";
import { inquiryFormMode } from "@/config/site";
import { HONEYPOT_FIELD, formMessages } from "@/lib/forms";
import type { ProductOption } from "@/lib/products";
import { cn } from "@/lib/utils";
import { limits, validateEmail, validateInquiry, validateRequestedProduct } from "@/lib/validation";

import { useInquiry } from "./inquiry-context";

type TechnologyOption = { value: string; label: string };

type InquiryFormProps = {
  products: ProductOption[];
  technologies: TechnologyOption[];
  source?: FormSource;
  mode?: "email-only" | "full";
};

const typeOptions: { value: InquiryType; label: string; hint: string }[] = [
  { value: "katalog", label: "Produkt s platforme", hint: "Izberete s seznama" },
  { value: "drug-produkt", label: "Produkt, ki ga ni na platformi", hint: "Vpišete ime ali povezavo" },
  { value: "pomoc-pri-izbiri", label: "Pomoč pri izbiri", hint: "Še ne veste, kateri produkt" },
];

const requesterOptions: { value: RequesterType; label: string }[] = [
  { value: "posameznik", label: "Posameznik" },
  { value: "strokovnjak", label: "Strokovni uporabnik" },
];

const fieldOrder: InquiryField[] = [
  "inquiryType",
  "productSlug",
  "requestedProduct",
  "technology",
  "requesterType",
  "email",
];

function ChoiceGroup<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
  columns,
  error,
}: {
  legend: string;
  name: string;
  value: T;
  options: { value: T; label: string; hint?: string }[];
  onChange: (value: T) => void;
  columns: string;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-ink-900">{legend}</legend>
      <div className={cn("mt-2 grid gap-2", columns)}>
        {options.map((option) => {
          const checked = option.value === value;
          return (
            <label
              key={option.value}
              className={cn(
                "relative flex cursor-pointer flex-col rounded-2xl px-4 py-3 ring-1 transition ring-inset has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-600",
                checked
                  ? "bg-ink-950 text-white ring-ink-950"
                  : "bg-white text-ink-900 ring-ink-200 hover:ring-ink-300",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span className="text-[0.9375rem] font-medium">{option.label}</span>
              {option.hint ? (
                <span className={cn("mt-0.5 text-[0.8125rem]", checked ? "text-ink-300" : "text-ink-500")}>
                  {option.hint}
                </span>
              ) : null}
            </label>
          );
        })}
      </div>
      {error ? <p className="mt-2 text-[0.8125rem] font-medium text-red-700">{error}</p> : null}
    </fieldset>
  );
}

function PrivacyNote({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="text-[0.8125rem] leading-relaxed text-ink-500">
      {children}{" "}
      <Link
        href="/privacy"
        className="font-medium text-ink-700 underline decoration-ink-300 underline-offset-2 hover:decoration-ink-600"
      >
        Politika zasebnosti
      </Link>
    </p>
  );
}

/** "Pošljite povpraševanje za produkt" — minimal data, no health information. */
export function InquiryForm({
  products,
  technologies,
  source = "website",
  mode = inquiryFormMode,
}: InquiryFormProps) {
  const id = useId();
  const ids = {
    product: `${id}-product`,
    requested: `${id}-requested`,
    technology: `${id}-technology`,
    email: `${id}-email`,
    privacy: `${id}-privacy`,
    honeypot: `${id}-website`,
  };

  const { preset, requestId, formRef } = useInquiry();
  const { status, errorMessage, submit, reset } = useFormSubmit<InquiryField>("/api/inquiry");

  const [inquiryType, setInquiryType] = useState<InquiryType>(preset.inquiryType ?? "katalog");
  const [productSlug, setProductSlug] = useState(preset.productSlug ?? "");
  const [requestedProduct, setRequestedProduct] = useState("");
  const [technology, setTechnology] = useState(preset.technology ?? "");
  const [requesterType, setRequesterType] = useState<RequesterType>(preset.requesterType ?? "posameznik");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors<InquiryField>>({});

  // Apply the preset of a CTA (product card, technology, professionals) when it is clicked.
  const [handledRequestId, setHandledRequestId] = useState(requestId);
  if (requestId !== handledRequestId) {
    setHandledRequestId(requestId);
    // Each CTA defines the whole context, so nothing from an earlier click carries over.
    setInquiryType(preset.inquiryType ?? "katalog");
    setProductSlug(preset.productSlug ?? "");
    setTechnology(preset.technology ?? "");
    setRequesterType(preset.requesterType ?? "posameznik");
    setErrors({});
    if (status === "success") reset();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const honeypot = new FormData(form).get(HONEYPOT_FIELD);

    // Email-only mode has no product or name field: an inquiry without a
    // selected product is stored as a general request for help.
    const effectiveType: InquiryType =
      mode === "email-only" && (inquiryType === "drug-produkt" || (inquiryType === "katalog" && !productSlug))
        ? "pomoc-pri-izbiri"
        : inquiryType;

    const payload = {
      email,
      inquiryType: effectiveType,
      productSlug,
      requestedProduct,
      technology,
      requesterType,
      source,
      [HONEYPOT_FIELD]: honeypot ?? "",
    };
    const validation = validateInquiry(payload, {
      productSlugs: products.map((product) => product.value),
      technologyIds: technologies.map((item) => item.value),
    });

    if (!validation.success) {
      flushSync(() => setErrors(validation.errors));
      focusFirstError(form, validation.errors, fieldOrder);
      return;
    }

    setErrors({});
    const result = await submit(payload);
    if (result.ok) {
      setEmail("");
      setRequestedProduct("");
    } else if (result.fieldErrors) {
      const fieldErrors = result.fieldErrors;
      flushSync(() => setErrors(fieldErrors));
      focusFirstError(form, fieldErrors, fieldOrder);
    }
  }

  if (status === "success") {
    return (
      <FormSuccess title={formMessages.inquirySuccess} actionLabel="Novo povpraševanje" onAction={reset} />
    );
  }

  const isSubmitting = status === "submitting";

  const submitLabel = isSubmitting ? (
    <>
      <SpinnerIcon className="animate-spin" />
      Pošiljanje …
    </>
  ) : (
    <>
      Pošljite povpraševanje
      <ButtonArrow />
    </>
  );

  if (mode === "email-only") {
    const otherError = Object.entries(errors).find(([field, message]) => field !== "email" && message)?.[1];
    return (
      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-5"
        aria-describedby={ids.privacy}
      >
        <Field id={ids.email} label="E-poštni naslov" error={errors.email}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              id={ids.email}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="ime@primer.si"
              maxLength={limits.emailMax}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (errors.email)
                  setErrors((current) => ({ ...current, email: validateEmail(event.target.value) }));
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy(ids.email, { error: Boolean(errors.email) })}
              className="sm:flex-1"
            />
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
              className="h-12 sm:px-6"
            >
              {submitLabel}
            </Button>
          </div>
        </Field>

        <HoneypotField id={ids.honeypot} />

        {otherError ? <FormErrorAlert message={otherError} /> : null}
        {status === "error" && errorMessage ? <FormErrorAlert message={errorMessage} /> : null}

        <PrivacyNote id={ids.privacy}>
          Podatke uporabimo samo za odgovor na povpraševanje. Povpraševanje ni naročilo in vas ne zavezuje.
        </PrivacyNote>
      </form>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-6"
      aria-describedby={ids.privacy}
    >
      <ChoiceGroup
        legend="Kaj vas zanima?"
        name="inquiryType"
        value={inquiryType}
        options={typeOptions}
        onChange={(value) => {
          setInquiryType(value);
          setErrors({});
        }}
        columns="sm:grid-cols-3"
        error={errors.inquiryType}
      />

      {inquiryType === "katalog" ? (
        <Field id={ids.product} label="Produkt" error={errors.productSlug}>
          <Select
            id={ids.product}
            name="productSlug"
            value={productSlug}
            onChange={(event) => {
              setProductSlug(event.target.value);
              if (errors.productSlug) setErrors((current) => ({ ...current, productSlug: undefined }));
            }}
            aria-invalid={Boolean(errors.productSlug)}
            aria-describedby={describedBy(ids.product, { error: Boolean(errors.productSlug) })}
            className={productSlug ? undefined : "text-ink-500"}
          >
            <option value="" disabled>
              Izberite produkt
            </option>
            {products.map((option) => (
              <option key={option.value} value={option.value} className="text-ink-950">
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
      ) : null}

      {inquiryType === "drug-produkt" ? (
        <Field
          id={ids.requested}
          label="Ime produkta ali povezava do njega"
          hint="Na primer ime naprave in proizvajalca ali spletni naslov."
          error={errors.requestedProduct}
        >
          <Input
            id={ids.requested}
            name="requestedProduct"
            maxLength={limits.requestedProductMax}
            value={requestedProduct}
            onChange={(event) => {
              setRequestedProduct(event.target.value);
              if (errors.requestedProduct) {
                setErrors((current) => ({
                  ...current,
                  requestedProduct: validateRequestedProduct(event.target.value),
                }));
              }
            }}
            aria-invalid={Boolean(errors.requestedProduct)}
            aria-describedby={describedBy(ids.requested, {
              hint: true,
              error: Boolean(errors.requestedProduct),
            })}
          />
        </Field>
      ) : null}

      {inquiryType === "pomoc-pri-izbiri" ? (
        <Field id={ids.technology} label="Tehnologija, ki jo raziskujete" optional error={errors.technology}>
          <Select
            id={ids.technology}
            name="technology"
            value={technology}
            onChange={(event) => setTechnology(event.target.value)}
            aria-invalid={Boolean(errors.technology)}
            aria-describedby={describedBy(ids.technology, { error: Boolean(errors.technology) })}
          >
            <option value="">Še ne vem</option>
            {technologies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
      ) : null}

      <ChoiceGroup
        legend="Povpraševanje oddajate kot"
        name="requesterType"
        value={requesterType}
        options={requesterOptions}
        onChange={setRequesterType}
        columns="grid-cols-2"
      />

      <Field
        id={ids.email}
        label="E-poštni naslov"
        hint="Ne pošiljajte zdravstvene dokumentacije ali podatkov o diagnozi."
        error={errors.email}
      >
        <Input
          id={ids.email}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="ime@primer.si"
          maxLength={limits.emailMax}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (errors.email)
              setErrors((current) => ({ ...current, email: validateEmail(event.target.value) }));
          }}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy(ids.email, { hint: true, error: Boolean(errors.email) })}
        />
      </Field>

      <HoneypotField id={ids.honeypot} />

      {status === "error" && errorMessage ? <FormErrorAlert message={errorMessage} /> : null}

      <div className="flex flex-col gap-4">
        <Button type="submit" size="lg" fullWidth disabled={isSubmitting} aria-disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <SpinnerIcon className="animate-spin" />
              Pošiljanje …
            </>
          ) : (
            <>
              Pošljite povpraševanje
              <ButtonArrow />
            </>
          )}
        </Button>
        <PrivacyNote id={ids.privacy}>
          Podatke uporabimo samo za odgovor na povpraševanje. Povpraševanje ni naročilo in vas ne zavezuje.
        </PrivacyNote>
      </div>
    </form>
  );
}
