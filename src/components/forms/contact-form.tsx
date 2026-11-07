"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";

import { Button, ButtonArrow } from "@/components/ui/button";
import { Field, Input, Textarea, describedBy } from "@/components/ui/form-controls";
import { SpinnerIcon } from "@/components/ui/icons";
import type { ContactField, FieldErrors } from "@/lib/forms";
import { HONEYPOT_FIELD, formMessages } from "@/lib/forms";
import {
  limits,
  validateContact,
  validateContactMessage,
  validateEmail,
  validateFullName,
} from "@/lib/validation";

import { CharacterCount, FormErrorAlert, FormSuccess, HoneypotField } from "./form-feedback";
import { focusFirstError } from "./form-utils";
import { useFormSubmit } from "./use-form-submit";

const emptyValues: Record<ContactField, string> = { fullName: "", email: "", message: "" };

const fieldOrder: ContactField[] = ["fullName", "email", "message"];

const validators: Record<ContactField, (value: string) => string | undefined> = {
  fullName: validateFullName,
  email: validateEmail,
  message: validateContactMessage,
};

export function ContactForm() {
  const id = useId();
  const ids = {
    fullName: `${id}-full-name`,
    email: `${id}-email`,
    message: `${id}-message`,
    messageCount: `${id}-message-count`,
    honeypot: `${id}-website`,
    privacy: `${id}-privacy`,
  };

  const { status, errorMessage, submit, reset } = useFormSubmit<ContactField>("/api/contact");
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<FieldErrors<ContactField>>({});

  function updateError(field: ContactField, value: string) {
    setErrors((current) => ({ ...current, [field]: validators[field](value) }));
  }

  function handleChange(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) updateError(field, value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const honeypot = new FormData(form).get(HONEYPOT_FIELD);

    const payload = { ...values, [HONEYPOT_FIELD]: honeypot ?? "" };
    const validation = validateContact(payload);

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
      <FormSuccess title={formMessages.contactSuccess} actionLabel="Pošlji novo sporočilo" onAction={reset} />
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-5"
      aria-describedby={ids.privacy}
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
            onChange={(event) => handleChange("fullName", event.target.value)}
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
            onChange={(event) => handleChange("email", event.target.value)}
            onBlur={(event) => event.target.value && updateError("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy(ids.email, { error: Boolean(errors.email) })}
          />
        </Field>
      </div>

      <Field id={ids.message} label="Sporočilo" error={errors.message}>
        <Textarea
          id={ids.message}
          name="message"
          rows={5}
          maxLength={limits.contactMessageMax}
          required
          value={values.message}
          onChange={(event) => handleChange("message", event.target.value)}
          onBlur={(event) => event.target.value && updateError("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={[describedBy(ids.message, { error: Boolean(errors.message) }), ids.messageCount]
            .filter(Boolean)
            .join(" ")}
        />
        <CharacterCount id={ids.messageCount} length={values.message.length} max={limits.contactMessageMax} />
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
              Pošlji sporočilo
              <ButtonArrow />
            </>
          )}
        </Button>
        <p id={ids.privacy} className="text-[0.8125rem] leading-relaxed text-ink-500">
          Vaše podatke bomo uporabili izključno za odgovor na vaše sporočilo.{" "}
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
