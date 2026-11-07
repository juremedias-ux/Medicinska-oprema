"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";

import { Button, ButtonArrow } from "@/components/ui/button";
import { Field, Input, Select, Textarea, describedBy } from "@/components/ui/form-controls";
import { SpinnerIcon } from "@/components/ui/icons";
import type { FieldErrors, ProductInterestField, SignupSource } from "@/lib/forms";
import { HONEYPOT_FIELD, formMessages } from "@/lib/forms";
import type { ProductInterestOption } from "@/lib/products";
import {
  limits,
  validateEmail,
  validateFullName,
  validateInterestMessage,
  validateProductInterest,
  validateProductInterestValue,
} from "@/lib/validation";

import { CharacterCount, FormErrorAlert, FormSuccess, HoneypotField } from "./form-feedback";
import { focusFirstError } from "./form-utils";
import { useNotify } from "./notify-context";
import { useFormSubmit } from "./use-form-submit";

type TextFields = Exclude<ProductInterestField, "productInterest">;

const emptyValues: Record<TextFields, string> = { fullName: "", email: "", message: "" };
const fieldOrder: ProductInterestField[] = ["fullName", "email", "productInterest", "message"];

type NotifyFormProps = {
  options: ProductInterestOption[];
  source?: SignupSource;
};

export function NotifyForm({ options, source = "website" }: NotifyFormProps) {
  const id = useId();
  const ids = {
    fullName: `${id}-full-name`,
    email: `${id}-email`,
    productInterest: `${id}-product`,
    message: `${id}-message`,
    messageCount: `${id}-message-count`,
    honeypot: `${id}-website`,
  };

  const { productInterest, setProductInterest, requestId, formRef } = useNotify();
  const { status, errorMessage, submit, reset } =
    useFormSubmit<ProductInterestField>("/api/product-interest");

  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<FieldErrors<ProductInterestField>>({});

  // A product CTA clicked after a successful signup opens a fresh form.
  const [handledRequestId, setHandledRequestId] = useState(requestId);
  if (requestId !== handledRequestId) {
    setHandledRequestId(requestId);
    if (status === "success") reset();
  }

  const allowedValues = options.map((option) => option.value);
  // A valid selection (also one preselected by a product CTA) clears the product error.
  const productError = allowedValues.includes(productInterest) ? undefined : errors.productInterest;

  const validators: Record<ProductInterestField, (value: string) => string | undefined> = {
    fullName: validateFullName,
    email: validateEmail,
    productInterest: (value) => validateProductInterestValue(value, allowedValues),
    message: validateInterestMessage,
  };

  function updateError(field: ProductInterestField, value: string) {
    setErrors((current) => ({ ...current, [field]: validators[field](value) }));
  }

  function handleTextChange(field: TextFields, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) updateError(field, value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const honeypot = new FormData(form).get(HONEYPOT_FIELD);

    const payload = { ...values, productInterest, source, [HONEYPOT_FIELD]: honeypot ?? "" };
    const validation = validateProductInterest(payload, allowedValues);

    if (!validation.success) {
      // Render the messages first so screen readers announce them on focus.
      flushSync(() => setErrors(validation.errors));
      focusFirstError(form, validation.errors, fieldOrder);
      return;
    }

    setErrors({});
    const result = await submit(payload);

    if (result.ok) {
      setValues(emptyValues);
    } else if (result.fieldErrors) {
      const fieldErrors = result.fieldErrors;
      flushSync(() => setErrors(fieldErrors));
      focusFirstError(form, fieldErrors, fieldOrder);
    }
  }

  if (status === "success") {
    return (
      <FormSuccess
        title={formMessages.notifySuccess}
        actionLabel="Prijava za drug izdelek"
        onAction={reset}
      />
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-5"
      aria-describedby={`${id}-privacy`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={ids.fullName} label="Ime in priimek" error={errors.fullName}>
          <Input
            id={ids.fullName}
            name="fullName"
            autoComplete="name"
            maxLength={limits.nameMax}
            required
            value={values.fullName}
            onChange={(event) => handleTextChange("fullName", event.target.value)}
            onBlur={(event) => event.target.value && updateError("fullName", event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describedBy(ids.fullName, { error: Boolean(errors.fullName) })}
          />
        </Field>
        <Field id={ids.email} label="E-poštni naslov" error={errors.email}>
          <Input
            id={ids.email}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={limits.emailMax}
            required
            value={values.email}
            onChange={(event) => handleTextChange("email", event.target.value)}
            onBlur={(event) => event.target.value && updateError("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy(ids.email, { error: Boolean(errors.email) })}
          />
        </Field>
      </div>

      <Field id={ids.productInterest} label="Izdelek, za katerega želite obvestilo" error={productError}>
        <Select
          id={ids.productInterest}
          name="productInterest"
          required
          value={productInterest}
          onChange={(event) => setProductInterest(event.target.value)}
          aria-invalid={Boolean(productError)}
          aria-describedby={describedBy(ids.productInterest, { error: Boolean(productError) })}
          className={productInterest ? undefined : "text-ink-400"}
        >
          <option value="" disabled>
            Izberite izdelek
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-ink-950">
              {option.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        id={ids.message}
        label="Kaj vas najbolj zanima?"
        optional
        hint="Prosimo, ne navajajte podatkov o svojem zdravstvenem stanju."
        error={errors.message}
      >
        <Textarea
          id={ids.message}
          name="message"
          rows={3}
          maxLength={limits.interestMessageMax}
          value={values.message}
          onChange={(event) => handleTextChange("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={[
            describedBy(ids.message, { hint: true, error: Boolean(errors.message) }),
            ids.messageCount,
          ].join(" ")}
        />
        <CharacterCount
          id={ids.messageCount}
          length={values.message.length}
          max={limits.interestMessageMax}
        />
      </Field>

      <HoneypotField id={ids.honeypot} />

      {status === "error" && errorMessage ? <FormErrorAlert message={errorMessage} /> : null}

      <div className="flex flex-col gap-4 pt-1">
        <Button type="submit" size="lg" fullWidth disabled={isSubmitting} aria-disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <SpinnerIcon className="animate-spin" />
              Pošiljanje …
            </>
          ) : (
            <>
              Pošlji prijavo
              <ButtonArrow />
            </>
          )}
        </Button>
        <p id={`${id}-privacy`} className="text-[0.8125rem] leading-relaxed text-ink-500">
          Z oddajo prijave se strinjate, da vaše podatke uporabimo za obveščanje o izbranih produktih.{" "}
          <Link
            href="/privacy"
            className="font-medium text-ink-700 underline decoration-ink-300 underline-offset-2 hover:decoration-ink-600"
          >
            Politika zasebnosti
          </Link>
        </p>
      </div>
    </form>
  );
}
