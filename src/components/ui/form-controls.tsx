import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import { AlertCircleIcon, ChevronDownIcon } from "./icons";

const controlBase = [
  "w-full rounded-xl border border-ink-200 bg-white px-4 text-[0.9375rem] text-ink-950 shadow-[0_1px_1px_rgb(11_27_43/0.03)]",
  "placeholder:text-ink-400 transition-[border-color,box-shadow] duration-200",
  "hover:border-ink-300",
  "focus:border-accent-600 focus:ring-4 focus:ring-accent-600/12 focus:outline-none",
  "aria-invalid:border-red-600 aria-invalid:focus:ring-red-600/12",
  "disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-500",
].join(" ");

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlBase, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea className={cn(controlBase, "min-h-32 resize-y py-3 leading-relaxed", className)} {...props} />
  );
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={cn(controlBase, "h-12 cursor-pointer appearance-none pr-11", className)} {...props}>
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-500" />
    </div>
  );
}

/** IDs used to connect a control with its hint and error message. */
export function fieldIds(id: string) {
  return { hint: `${id}-hint`, error: `${id}-error` };
}

export function describedBy(id: string, { hint, error }: { hint?: boolean; error?: boolean }) {
  const ids = fieldIds(id);
  return [hint ? ids.hint : null, error ? ids.error : null].filter(Boolean).join(" ") || undefined;
}

type FieldProps = {
  id: string;
  label: string;
  optional?: boolean;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
  className?: string;
};

/** Label + control + hint + error, wired for screen readers. */
export function Field({ id, label, optional, hint, error, children, className }: FieldProps) {
  const ids = fieldIds(id);
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between gap-3 text-sm font-medium text-ink-900"
      >
        <span>{label}</span>
        {optional ? <span className="text-xs font-normal text-ink-500">neobvezno</span> : null}
      </label>
      {children}
      {hint ? (
        <p id={ids.hint} className="text-[0.8125rem] leading-snug text-ink-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={ids.error}
          className="flex items-start gap-1.5 text-[0.8125rem] leading-snug font-medium text-red-700"
        >
          <AlertCircleIcon className="mt-px size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
