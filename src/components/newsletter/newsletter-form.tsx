"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";

import { HoneypotField } from "@/components/forms/form-feedback";
import { useFormSubmit } from "@/components/forms/use-form-submit";
import { Button, ButtonArrow } from "@/components/ui/button";
import { AlertCircleIcon, CheckIcon, SpinnerIcon } from "@/components/ui/icons";
import type { FieldErrors, NewsletterField } from "@/lib/forms";
import { HONEYPOT_FIELD, NEWSLETTER_CONSENT_TEXT, formMessages } from "@/lib/forms";
import { cn } from "@/lib/utils";
import { limits, validateEmail, validateNewsletter } from "@/lib/validation";

/**
 * Newsletter signup on dark surfaces: e-mail + explicit consent.
 * `compact` is the smaller version used in the hero.
 */
export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const ids = {
    email: `${id}-email`,
    consent: `${id}-consent`,
    emailError: `${id}-email-error`,
    consentError: `${id}-consent-error`,
  };
  const { status, errorMessage, submit, reset } = useFormSubmit<NewsletterField>("/api/newsletter");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<NewsletterField>>({});
  const successRef = useRef<HTMLParagraphElement>(null);
  const isSuccess = status === "success";

  useEffect(() => {
    if (isSuccess) successRef.current?.focus();
  }, [isSuccess]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const honeypot = new FormData(form).get(HONEYPOT_FIELD);
    const payload = { email, consent, [HONEYPOT_FIELD]: honeypot ?? "" };
    const validation = validateNewsletter(payload);

    if (!validation.success) {
      flushSync(() => setErrors(validation.errors));
      const target = validation.errors.email ? ids.email : ids.consent;
      document.getElementById(target)?.focus();
      return;
    }

    setErrors({});
    const result = await submit(payload);
    if (result.ok) {
      setEmail("");
      setConsent(false);
    } else if (result.fieldErrors) {
      const fieldErrors = result.fieldErrors;
      flushSync(() => setErrors(fieldErrors));
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-start gap-3">
        <p
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-5 py-4 text-[0.9375rem] font-medium text-white ring-1 ring-white/15 outline-none ring-inset"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-300 text-ink-950">
            <CheckIcon className="size-4" strokeWidth={2.5} />
          </span>
          {formMessages.newsletterSuccess}
        </p>
        <button
          type="button"
          onClick={reset}
          className="text-sm text-ink-400 underline underline-offset-4 hover:text-white"
        >
          Prijavite drug naslov
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form noValidate onSubmit={handleSubmit} className="relative">
      <label htmlFor={ids.email} className="sr-only">
        E-poštni naslov
      </label>
      <div
        className={cn(
          "flex flex-col gap-2 rounded-3xl bg-white/[0.06] p-2 ring-1 transition ring-inset focus-within:ring-2 sm:flex-row sm:items-center sm:rounded-full",
          errors.email ? "ring-red-400" : "ring-white/15 focus-within:ring-accent-300",
        )}
      >
        <input
          id={ids.email}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Vaš e-poštni naslov"
          maxLength={limits.emailMax}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (errors.email)
              setErrors((current) => ({ ...current, email: validateEmail(event.target.value) }));
          }}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? ids.emailError : undefined}
          className={cn(
            "w-full min-w-0 flex-1 bg-transparent px-4 text-base text-white placeholder:text-ink-400 focus:outline-none",
            compact ? "h-11" : "h-12",
          )}
        />
        <Button
          type="submit"
          variant="accent"
          size={compact ? "md" : "lg"}
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className={compact ? "h-11" : "h-12"}
        >
          {isSubmitting ? (
            <>
              <SpinnerIcon className="animate-spin" />
              Pošiljanje …
            </>
          ) : (
            <>
              Naročite se na novičke
              <ButtonArrow />
            </>
          )}
        </Button>
      </div>
      {errors.email ? (
        <p
          id={ids.emailError}
          className="mt-3 flex items-start gap-1.5 pl-2 text-[0.8125rem] font-medium text-red-300"
        >
          <AlertCircleIcon className="mt-px size-4 shrink-0" />
          {errors.email}
        </p>
      ) : null}

      <div className={cn("flex items-start gap-3 pl-1", compact ? "mt-4" : "mt-5")}>
        <input
          id={ids.consent}
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={(event) => {
            setConsent(event.target.checked);
            if (event.target.checked) setErrors((current) => ({ ...current, consent: undefined }));
          }}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? ids.consentError : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-white/30 bg-transparent accent-accent-300"
        />
        <label
          htmlFor={ids.consent}
          className={cn(
            "cursor-pointer leading-relaxed text-ink-300",
            compact ? "text-[0.8125rem]" : "text-sm",
          )}
        >
          {NEWSLETTER_CONSENT_TEXT}{" "}
          <Link
            href="/privacy"
            className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white"
          >
            Politika zasebnosti
          </Link>
        </label>
      </div>
      {errors.consent ? (
        <p
          id={ids.consentError}
          className="mt-2 flex items-start gap-1.5 pl-9 text-[0.8125rem] font-medium text-red-300"
        >
          <AlertCircleIcon className="mt-px size-4 shrink-0" />
          {errors.consent}
        </p>
      ) : null}

      <HoneypotField id={`${id}-website`} />

      {status === "error" && errorMessage ? (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-200 ring-1 ring-red-400/30 ring-inset"
        >
          <AlertCircleIcon className="mt-0.5 size-4 shrink-0" />
          {errorMessage}
        </p>
      ) : null}

      {compact ? (
        <p className="mt-3 pl-1 text-[0.8125rem] text-ink-400">
          <Link
            href="/odjava"
            className="text-ink-200 underline decoration-white/30 underline-offset-2 hover:text-white"
          >
            Odjava od novičk
          </Link>
        </p>
      ) : (
        <p className="mt-5 pl-1 text-[0.8125rem] text-ink-400">
          Odjava je mogoča kadar koli na strani{" "}
          <Link
            href="/odjava"
            className="text-ink-200 underline decoration-white/30 underline-offset-2 hover:text-white"
          >
            Odjava od novičk
          </Link>
          .
        </p>
      )}
    </form>
  );
}
