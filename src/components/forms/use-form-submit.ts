"use client";

import { useCallback, useState } from "react";

import type { FieldErrors, FormApiResponse } from "@/lib/forms";
import { formMessages } from "@/lib/forms";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

type SubmitResult<TField extends string> = { ok: true } | { ok: false; fieldErrors?: FieldErrors<TField> };

/** Posts JSON to a form API route and tracks the request state. */
export function useFormSubmit<TField extends string>(endpoint: string) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = useCallback(
    async (payload: Record<string, unknown>): Promise<SubmitResult<TField>> => {
      setStatus("submitting");
      setErrorMessage(null);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await response.json().catch(() => null)) as FormApiResponse<TField> | null;

        if (response.ok && data?.ok) {
          setStatus("success");
          return { ok: true };
        }

        setStatus("error");
        setErrorMessage(data?.message ?? formMessages.generic);
        return { ok: false, fieldErrors: data && !data.ok ? data.fieldErrors : undefined };
      } catch {
        setStatus("error");
        setErrorMessage(formMessages.network);
        return { ok: false };
      }
    },
    [endpoint],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setErrorMessage(null);
  }, []);

  return { status, errorMessage, submit, reset };
}
