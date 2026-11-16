import "server-only";

import {
  createRateLimiter,
  getClientIp,
  isAllowedOrigin,
  json,
  logSupabaseError,
  readJsonBody,
  supabaseErrorCode,
} from "./api";
import type { FormApiResponse } from "./forms";
import { HONEYPOT_FIELD, formMessages } from "./forms";
import type { MedcoreSupabaseClient } from "./supabase";
import { PostgresErrorCode, getSupabaseClient } from "./supabase";
import type { ValidationResult } from "./validation";

type PersistResult = {
  error: { code?: string; message?: string; details?: string | null; hint?: string | null } | null;
  status: number;
};

type FormRouteOptions<TData, TField extends string> = {
  /** Log prefix, e.g. "inquiry". */
  scope: string;
  isRateLimited: ReturnType<typeof createRateLimiter>;
  validate: (input: unknown) => ValidationResult<TData, TField>;
  persist: (supabase: MedcoreSupabaseClient, data: TData) => PromiseLike<PersistResult>;
  successMessage: string;
  /** Postgres codes that should be reported as success (e.g. duplicates). */
  successCodes?: string[];
};

/**
 * Shared handler for public form endpoints. Layers: same-origin check,
 * rate limit, JSON body limits, honeypot, validation, Supabase write.
 * Every failure returns JSON with a short diagnostic `code`.
 */
export async function handleFormRequest<TData, TField extends string>(
  request: Request,
  options: FormRouteOptions<TData, TField>,
): Promise<Response> {
  const reply = (body: FormApiResponse<TField>, status = 200) => json<TField>(body, status);

  try {
    if (!isAllowedOrigin(request)) {
      return reply({ ok: false, message: formMessages.generic, code: "ORIGIN" }, 403);
    }

    if (options.isRateLimited(getClientIp(request))) {
      return reply({ ok: false, message: formMessages.rateLimited }, 429);
    }

    const body = await readJsonBody(request);
    if (!body.ok) return body.response;

    // Bots that fill the hidden field get a normal-looking response; nothing is stored.
    const honeypot = (body.data as Record<string, unknown> | null)?.[HONEYPOT_FIELD];
    if (typeof honeypot === "string" && honeypot.trim() !== "") {
      return reply({ ok: true, message: options.successMessage });
    }

    const validation = options.validate(body.data);
    if (!validation.success) {
      return reply({ ok: false, message: formMessages.validation, fieldErrors: validation.errors }, 422);
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      return reply({ ok: false, message: formMessages.unavailable, code: "CONFIG" }, 503);
    }

    const { error, status } = await options.persist(supabase, validation.data);

    if (error) {
      if (error.code && options.successCodes?.includes(error.code)) {
        return reply({ ok: true, message: options.successMessage });
      }
      logSupabaseError(options.scope, error);
      const httpStatus = error.code === PostgresErrorCode.checkViolation ? 422 : 500;
      return reply(
        {
          ok: false,
          message: httpStatus === 422 ? formMessages.validation : formMessages.generic,
          code: supabaseErrorCode(error, status),
        },
        httpStatus,
      );
    }

    return reply({ ok: true, message: options.successMessage }, 201);
  } catch (error) {
    console.error(`[${options.scope}] Unexpected error:`, error);
    return reply({ ok: false, message: formMessages.unavailable, code: "SERVER" }, 500);
  }
}
