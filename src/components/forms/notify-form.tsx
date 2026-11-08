"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";

import { Button, ButtonArrow } from "@/components/ui/button";
import { Field, Input, describedBy } from "@/components/ui/form-controls";
import { AlertCircleIcon, BellIcon, CheckIcon, MailIcon, SpinnerIcon } from "@/components/ui/icons";
import type { ProductInterestField, SignupSource } from "@/lib/forms";
import { ALL_PRODUCTS_VALUE, HONEYPOT_FIELD, formMessages } from "@/lib/forms";
import type { ProductInterestOption } from "@/lib/products";
import { cn } from "@/lib/utils";
import { limits, validateEmail, validateProductInterest } from "@/lib/validation";

import { FormErrorAlert, FormSuccess, HoneypotField } from "./form-feedback";
import { useNotify } from "./notify-context";
import { useFormSubmit } from "./use-form-submit";

const privacyNote =
  "Z oddajo prijave se strinjate, da vaše podatke uporabimo za obveščanje o izbranih produktih.";

/** Shared state and submit logic for the e-mail-only signup forms. */
function useNotifySignup({
  options,
  source,
  product,
}: {
  options: ProductInterestOption[];
  source: SignupSource;
  product: string;
}) {
  const { status, errorMessage, submit, reset } =
    useFormSubmit<ProductInterestField>("/api/product-interest");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();

  const allowedValues = options.map((option) => option.value);
  const selectedProduct = allowedValues.includes(product) ? product : ALL_PRODUCTS_VALUE;

  function handleEmailChange(value: string) {
    setEmail(value);
    if (emailError) setEmailError(validateEmail(value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem("email");
    const honeypot = new FormData(form).get(HONEYPOT_FIELD);

    const payload = { email, productInterest: selectedProduct, source, [HONEYPOT_FIELD]: honeypot ?? "" };
    const validation = validateProductInterest(payload, allowedValues);

    if (!validation.success) {
      // Render the message first so screen readers announce it on focus.
      flushSync(() => setEmailError(validation.errors.email ?? formMessages.validation));
      if (input instanceof HTMLElement) input.focus();
      return;
    }

    setEmailError(undefined);
    const result = await submit(payload);

    if (result.ok) {
      setEmail("");
    } else if (result.fieldErrors?.email) {
      const message = result.fieldErrors.email;
      flushSync(() => setEmailError(message));
      if (input instanceof HTMLElement) input.focus();
    }
  }

  return {
    email,
    emailError,
    status,
    errorMessage,
    reset,
    selectedProduct,
    handleEmailChange,
    handleSubmit,
  };
}

function SubmitLabel({ isSubmitting, label }: { isSubmitting: boolean; label: string }) {
  return isSubmitting ? (
    <>
      <SpinnerIcon className="animate-spin" />
      Pošiljanje …
    </>
  ) : (
    <>
      {label}
      <ButtonArrow />
    </>
  );
}

function PrivacyLink() {
  return (
    <Link
      href="/privacy"
      className="font-medium text-ink-700 underline decoration-ink-300 underline-offset-2 hover:decoration-ink-600"
    >
      Politika zasebnosti
    </Link>
  );
}

type NotifyFormProps = {
  options: ProductInterestOption[];
  source?: SignupSource;
};

/**
 * Main signup form (notification section). The product comes from the CTA
 * that opened the form (product card or product page); generic CTAs sign
 * up for all products.
 */
export function NotifyForm({ options, source = "website" }: NotifyFormProps) {
  const id = useId();
  const emailId = `${id}-email`;
  const privacyId = `${id}-privacy`;

  const { productInterest, requestId, formRef } = useNotify();
  const signup = useNotifySignup({ options, source, product: productInterest });

  // A product CTA clicked after a successful signup opens a fresh form.
  const [handledRequestId, setHandledRequestId] = useState(requestId);
  if (requestId !== handledRequestId) {
    setHandledRequestId(requestId);
    if (signup.status === "success") signup.reset();
  }

  const selectedLabel =
    options.find((option) => option.value === signup.selectedProduct)?.label ?? "Vsi produkti";

  if (signup.status === "success") {
    return (
      <FormSuccess title={formMessages.notifySuccess} actionLabel="Nova prijava" onAction={signup.reset} />
    );
  }

  const isSubmitting = signup.status === "submitting";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={signup.handleSubmit}
      className="relative flex flex-col gap-6"
      aria-describedby={privacyId}
    >
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-600">
        <BellIcon className="size-4 text-accent-700" />
        Prijava za:
        <span className="font-semibold text-ink-950">{selectedLabel}</span>
      </p>

      <Field id={emailId} label="E-poštni naslov" error={signup.emailError}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            id={emailId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="ime@primer.si"
            maxLength={limits.emailMax}
            required
            value={signup.email}
            onChange={(event) => signup.handleEmailChange(event.target.value)}
            aria-invalid={Boolean(signup.emailError)}
            aria-describedby={describedBy(emailId, { error: Boolean(signup.emailError) })}
            className="sm:flex-1"
          />
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            className="h-12 sm:px-6"
          >
            <SubmitLabel isSubmitting={isSubmitting} label="Pošlji prijavo" />
          </Button>
        </div>
      </Field>

      <HoneypotField id={`${id}-website`} />

      {signup.status === "error" && signup.errorMessage ? (
        <FormErrorAlert message={signup.errorMessage} />
      ) : null}

      <p id={privacyId} className="text-[0.8125rem] leading-relaxed text-ink-500">
        {privacyNote} <PrivacyLink />
      </p>
    </form>
  );
}

type HeroNotifyFormProps = {
  options: ProductInterestOption[];
};

/**
 * Compact signup in the hero: e-mail + button, signs up for all products.
 * Independent of the CTA → form connection used by the main form.
 */
export function HeroNotifyForm({ options }: HeroNotifyFormProps) {
  const id = useId();
  const emailId = `${id}-email`;
  const errorId = `${id}-error`;
  const privacyId = `${id}-privacy`;
  const successRef = useRef<HTMLParagraphElement>(null);

  const signup = useNotifySignup({ options, source: "website", product: ALL_PRODUCTS_VALUE });
  const isSuccess = signup.status === "success";

  // Announce the confirmation to screen-reader users.
  useEffect(() => {
    if (isSuccess) successRef.current?.focus();
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <div className="flex flex-col items-start gap-3">
        <p
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="flex items-center gap-3 rounded-2xl bg-accent-50 px-5 py-4 text-[0.9375rem] font-medium text-accent-900 ring-1 ring-accent-200 outline-none ring-inset"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-600 text-white">
            <CheckIcon className="size-4" strokeWidth={2.5} />
          </span>
          {formMessages.notifySuccess}
        </p>
        <button
          type="button"
          onClick={signup.reset}
          className="text-sm font-medium text-ink-600 underline decoration-ink-300 underline-offset-4 transition hover:text-ink-950"
        >
          Nova prijava
        </button>
      </div>
    );
  }

  const isSubmitting = signup.status === "submitting";
  const hasError = Boolean(signup.emailError);

  return (
    <form noValidate onSubmit={signup.handleSubmit} className="relative" aria-describedby={privacyId}>
      <label htmlFor={emailId} className="sr-only">
        E-poštni naslov
      </label>
      <div
        className={cn(
          "flex flex-col gap-2 rounded-3xl bg-white p-2 shadow-soft ring-1 transition-shadow ring-inset focus-within:ring-2 sm:flex-row sm:items-center sm:rounded-full",
          hasError ? "ring-red-600" : "ring-ink-200 focus-within:ring-accent-600",
        )}
      >
        <div className="flex flex-1 items-center gap-3 pl-4">
          <MailIcon className="size-5 shrink-0 text-ink-400" />
          <input
            id={emailId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Vaš e-poštni naslov"
            maxLength={limits.emailMax}
            required
            value={signup.email}
            onChange={(event) => signup.handleEmailChange(event.target.value)}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className="h-12 w-full min-w-0 bg-transparent text-base text-ink-950 placeholder:text-ink-400 focus:outline-none"
          />
        </div>
        <Button type="submit" size="lg" disabled={isSubmitting} aria-disabled={isSubmitting} className="h-12">
          <SubmitLabel isSubmitting={isSubmitting} label="Obvesti me ob dostopnosti" />
        </Button>
      </div>

      {hasError ? (
        <p
          id={errorId}
          className="mt-3 flex items-start gap-1.5 pl-2 text-[0.8125rem] font-medium text-red-700"
        >
          <AlertCircleIcon className="mt-px size-4 shrink-0" />
          {signup.emailError}
        </p>
      ) : null}

      <HoneypotField id={`${id}-website`} />

      {signup.status === "error" && signup.errorMessage ? (
        <div className="mt-3">
          <FormErrorAlert message={signup.errorMessage} />
        </div>
      ) : null}

      <p id={privacyId} className="mt-3 pl-2 text-[0.8125rem] leading-relaxed text-ink-500">
        {privacyNote} <PrivacyLink />
      </p>
    </form>
  );
}
