"use client";

import { useEffect, useRef } from "react";

import { AlertCircleIcon, CheckIcon } from "@/components/ui/icons";
import { HONEYPOT_FIELD } from "@/lib/forms";

export function FormErrorAlert({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-800"
    >
      <AlertCircleIcon className="mt-0.5 size-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}

export function FormSuccess({
  title,
  message,
  actionLabel,
  onAction,
}: {
  title: string;
  message?: string;
  actionLabel: string;
  onAction: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the confirmation so screen-reader users hear it.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div role="status" className="flex flex-col items-start py-6 sm:py-10">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-accent-50 text-accent-700 ring-1 ring-accent-200 ring-inset">
        <CheckIcon className="size-7" strokeWidth={2} />
      </span>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 text-2xl leading-snug font-semibold tracking-tight text-ink-950 outline-none"
      >
        {title}
      </h3>
      {message ? <p className="mt-3 max-w-md leading-relaxed text-ink-600">{message}</p> : null}
      <button
        type="button"
        onClick={onAction}
        className="mt-8 text-sm font-medium text-accent-700 underline decoration-accent-200 underline-offset-4 transition hover:decoration-accent-600"
      >
        {actionLabel}
      </button>
    </div>
  );
}

/** Hidden field that only bots fill in. */
export function HoneypotField({ id }: { id: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -left-[10000px] size-px overflow-hidden">
      <label htmlFor={id}>Spletna stran podjetja</label>
      <input id={id} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

export function CharacterCount({ id, length, max }: { id: string; length: number; max: number }) {
  return (
    <p id={id} className="text-right font-mono text-[0.6875rem] text-ink-500" aria-live="off">
      {length}/{max}
    </p>
  );
}
