"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";

import { Button, ButtonArrow } from "@/components/ui/button";
import { Field, Input, describedBy } from "@/components/ui/form-controls";
import { SpinnerIcon } from "@/components/ui/icons";
import type { ContactField } from "@/lib/forms";
import { HONEYPOT_FIELD, formMessages } from "@/lib/forms";
import { limits, validateContact, validateEmail } from "@/lib/validation";

import { FormErrorAlert, FormSuccess, HoneypotField } from "./form-feedback";
import { useFormSubmit } from "./use-form-submit";

/** One-field contact request: the visitor leaves an e-mail address and Medcore gets in touch. */
export function ContactForm() {
  const id = useId();
  const emailId = `${id}-email`;
  const privacyId = `${id}-privacy`;

  const { status, errorMessage, submit, reset } = useFormSubmit<ContactField>("/api/contact");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem("email");
    const honeypot = new FormData(form).get(HONEYPOT_FIELD);

    const payload = { email, [HONEYPOT_FIELD]: honeypot ?? "" };
    const validation = validateContact(payload);

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
    return <FormSuccess title={formMessages.contactSuccess} actionLabel="Pošlji znova" onAction={reset} />;
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-6"
      aria-describedby={privacyId}
    >
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
                Kontaktirajte me
                <ButtonArrow />
              </>
            )}
          </Button>
        </div>
      </Field>

      <HoneypotField id={`${id}-website`} />

      {status === "error" && errorMessage ? <FormErrorAlert message={errorMessage} /> : null}

      <p id={privacyId} className="text-[0.8125rem] leading-relaxed text-ink-500">
        Vaš e-poštni naslov bomo uporabili izključno za odgovor na vaše povpraševanje.{" "}
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
