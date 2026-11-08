"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";

import { Button, ButtonArrow } from "@/components/ui/button";
import { Field, Input, describedBy } from "@/components/ui/form-controls";
import { BellIcon, SpinnerIcon } from "@/components/ui/icons";
import type { ProductInterestField, SignupSource } from "@/lib/forms";
import { ALL_PRODUCTS_VALUE, HONEYPOT_FIELD, formMessages } from "@/lib/forms";
import type { ProductInterestOption } from "@/lib/products";
import { limits, validateEmail, validateProductInterest } from "@/lib/validation";

import { FormErrorAlert, FormSuccess, HoneypotField } from "./form-feedback";
import { useNotify } from "./notify-context";
import { useFormSubmit } from "./use-form-submit";

type NotifyFormProps = {
  options: ProductInterestOption[];
  source?: SignupSource;
};

/**
 * One-field signup: the visitor only enters an e-mail address.
 * The product comes from the CTA that opened the form (product card or
 * product page); generic CTAs sign up for all products.
 */
export function NotifyForm({ options, source = "website" }: NotifyFormProps) {
  const id = useId();
  const emailId = `${id}-email`;
  const privacyId = `${id}-privacy`;

  const { productInterest, requestId, formRef } = useNotify();
  const { status, errorMessage, submit, reset } =
    useFormSubmit<ProductInterestField>("/api/product-interest");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();

  // A product CTA clicked after a successful signup opens a fresh form.
  const [handledRequestId, setHandledRequestId] = useState(requestId);
  if (requestId !== handledRequestId) {
    setHandledRequestId(requestId);
    if (status === "success") reset();
  }

  const allowedValues = options.map((option) => option.value);
  const selectedProduct = allowedValues.includes(productInterest) ? productInterest : ALL_PRODUCTS_VALUE;
  const selectedLabel = options.find((option) => option.value === selectedProduct)?.label ?? "Vsi produkti";

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

  if (status === "success") {
    return <FormSuccess title={formMessages.notifySuccess} actionLabel="Nova prijava" onAction={reset} />;
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-6"
      aria-describedby={privacyId}
    >
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-600">
        <BellIcon className="size-4 text-accent-700" />
        Prijava za:
        <span className="font-semibold text-ink-950">{selectedLabel}</span>
      </p>

      <Field id={emailId} label="E-poštni naslov" error={emailError}>
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
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (emailError) setEmailError(validateEmail(event.target.value));
            }}
            aria-invalid={Boolean(emailError)}
            aria-describedby={describedBy(emailId, { error: Boolean(emailError) })}
            className="sm:flex-1"
          />
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            className="h-12 sm:px-6"
          >
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
        </div>
      </Field>

      <HoneypotField id={`${id}-website`} />

      {status === "error" && errorMessage ? <FormErrorAlert message={errorMessage} /> : null}

      <p id={privacyId} className="text-[0.8125rem] leading-relaxed text-ink-500">
        Z oddajo prijave se strinjate, da vaše podatke uporabimo za obveščanje o izbranih produktih.{" "}
        <Link
          href="/privacy"
          className="font-medium text-ink-700 underline decoration-ink-300 underline-offset-2 hover:decoration-ink-600"
        >
          Politika zasebnosti
        </Link>
      </p>
    </form>
  );
}
