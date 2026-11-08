import "server-only";

import type { FormApiResponse } from "./forms";
import { formMessages } from "./forms";

const MAX_BODY_BYTES = 16 * 1024;

export function json<TField extends string>(body: FormApiResponse<TField>, status = 200): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Rejects cross-site browser submissions. Requests without an Origin header
 * (e.g. server-to-server tools) are allowed; validation and database
 * constraints still apply to them.
 */
export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  let allowed = false;
  try {
    allowed = Boolean(host) && new URL(origin).host === host;
  } catch {
    allowed = false;
  }

  if (!allowed) console.warn(`[api] Rejected request from origin "${origin}" (host "${host}").`);
  return allowed;
}

/**
 * Short code for a failed Supabase insert: the Postgres/PostgREST code when
 * available, otherwise derived from the HTTP status ("CONNECTION" when the
 * Supabase URL could not be reached at all).
 */
export function supabaseErrorCode(error: { code?: string }, status: number): string {
  if (error.code) return error.code;
  if (!status) return "CONNECTION";
  return `HTTP${status}`;
}

/** Logs a Supabase/PostgREST error with every field that helps diagnose it. */
export function logSupabaseError(
  scope: string,
  error: { code?: string; message?: string; details?: string | null; hint?: string | null },
) {
  console.error(`[${scope}] Supabase insert failed`, {
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
  });
}

type BodyResult = { ok: true; data: unknown } | { ok: false; response: Response };

export async function readJsonBody(request: Request): Promise<BodyResult> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return { ok: false, response: json({ ok: false, message: formMessages.generic, code: "REQUEST" }, 415) };
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return { ok: false, response: json({ ok: false, message: formMessages.generic, code: "REQUEST" }, 413) };
  }

  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return {
        ok: false,
        response: json({ ok: false, message: formMessages.generic, code: "REQUEST" }, 413),
      };
    }
    return { ok: true, data: JSON.parse(text) as unknown };
  } catch {
    return { ok: false, response: json({ ok: false, message: formMessages.generic, code: "REQUEST" }, 400) };
  }
}

/**
 * Best-effort, in-memory sliding-window rate limiter.
 *
 * On Vercel each warm function instance keeps its own window, which is
 * enough to stop casual abuse of a low-traffic form. For stricter limits
 * add a Vercel Firewall rate-limit rule or a shared store (e.g. Upstash).
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>();

  return function isRateLimited(key: string): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    const recent = (hits.get(key) ?? []).filter((timestamp) => timestamp > windowStart);

    if (recent.length >= limit) {
      hits.set(key, recent);
      return true;
    }

    recent.push(now);
    hits.set(key, recent);

    // Keep memory bounded on long-lived instances.
    if (hits.size > 5000) {
      for (const [storedKey, timestamps] of hits) {
        if (timestamps.every((timestamp) => timestamp <= windowStart)) hits.delete(storedKey);
      }
    }

    return false;
  };
}
