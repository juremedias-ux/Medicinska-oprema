"use client";

import { useId, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";

import { FormErrorAlert, FormSuccess, HoneypotField } from "@/components/forms/form-feedback";
import { useFormSubmit } from "@/components/forms/use-form-submit";
import { Button } from "@/components/ui/button";
import { Field, Input, describedBy } from "@/components/ui/form-controls";
import { SpinnerIcon } from "@/components/ui/icons";
import { HONEYPOT_FIELD, formMessages } from "@/lib/forms";
import { limits, validateEmail } from "@/lib/validation";

export function UnsubscribeForm() {
  const id = useId();
  const emailId = `${id}-email`;
  const { status, errorMessage, submit, reset } = useFormSubmit<"email">("/api/newsletter/unsubscribe");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const validationError = validateEmail(email);
    if (validationError) {
      flushSync(() => setError(validationError));
      document.getElementById(emailId)?.focus();
      return;
    }
    setError(undefined);
    const honeypot = new FormData(form).get(HONEYPOT_FIELD);
    const result = await submit({ email, [HONEYPOT_FIELD]: honeypot ?? "" });
    if (result.ok) setEmail("");
  }

  if (status === "success") {
    return (
      <FormSuccess
        title={formMessages.unsubscribeSuccess}
        actionLabel="Odjavite drug naslov"
        onAction={reset}
      />
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field id={emailId} label="E-poštni naslov, ki ga želite odjaviti" error={error}>
        <Input
          id={emailId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={limits.emailMax}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(emailId, { error: Boolean(error) })}
        />
      </Field>
      <HoneypotField id={`${id}-website`} />
      {status === "error" && errorMessage ? <FormErrorAlert message={errorMessage} /> : null}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
        className="self-start"
      >
        {isSubmitting ? (
          <>
            <SpinnerIcon className="animate-spin" />
            Pošiljanje …
          </>
        ) : (
          "Odjavite me od novičk"
        )}
      </Button>
    </form>
  );
}
