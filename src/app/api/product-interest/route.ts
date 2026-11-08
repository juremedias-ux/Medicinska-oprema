import {
  createRateLimiter,
  getClientIp,
  isAllowedOrigin,
  json,
  logSupabaseError,
  readJsonBody,
  supabaseErrorCode,
} from "@/lib/api";
import type { ProductInterestField } from "@/lib/forms";
import { HONEYPOT_FIELD, formMessages } from "@/lib/forms";
import { getProductInterestValues } from "@/lib/products";
import { PostgresErrorCode, getSupabaseClient } from "@/lib/supabase";
import { validateProductInterest } from "@/lib/validation";

/**
 * POST /api/product-interest
 * Stores a "notify me when available" signup (e-mail + product) in Supabase.
 *
 * Security layers: same-origin check, rate limit, honeypot, server-side
 * validation, insert-only RLS policy, DB check constraints and a unique
 * index on (lower(email), product_interest) that makes repeat signups
 * idempotent.
 */
const isRateLimited = createRateLimiter({ limit: 6, windowMs: 10 * 60 * 1000 });

async function handle(request: Request): Promise<Response> {
  if (!isAllowedOrigin(request)) {
    return json<ProductInterestField>({ ok: false, message: formMessages.generic, code: "ORIGIN" }, 403);
  }

  if (isRateLimited(getClientIp(request))) {
    return json<ProductInterestField>({ ok: false, message: formMessages.rateLimited }, 429);
  }

  const body = await readJsonBody(request);
  if (!body.ok) return body.response;

  // Bots that fill the hidden field get a normal-looking success response.
  const honeypot = (body.data as Record<string, unknown> | null)?.[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return json<ProductInterestField>({ ok: true, message: formMessages.notifySuccess });
  }

  const validation = validateProductInterest(body.data, getProductInterestValues());
  if (!validation.success) {
    return json<ProductInterestField>(
      { ok: false, message: formMessages.validation, fieldErrors: validation.errors },
      422,
    );
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return json<ProductInterestField>({ ok: false, message: formMessages.unavailable, code: "CONFIG" }, 503);
  }

  const { fullName, email, productInterest, message, source } = validation.data;
  const { error, status: dbStatus } = await supabase.from("product_interest_signups").insert({
    full_name: fullName,
    email,
    product_interest: productInterest,
    message,
    source,
  });

  if (error) {
    // Same e-mail + product already registered: treat as success so the
    // response does not reveal whether an address is on the list.
    if (error.code === PostgresErrorCode.uniqueViolation) {
      return json<ProductInterestField>({ ok: true, message: formMessages.notifySuccess });
    }

    logSupabaseError("product-interest", error);
    const status = error.code === PostgresErrorCode.checkViolation ? 422 : 500;
    return json<ProductInterestField>(
      {
        ok: false,
        message: status === 422 ? formMessages.validation : formMessages.generic,
        code: supabaseErrorCode(error, dbStatus),
      },
      status,
    );
  }

  return json<ProductInterestField>({ ok: true, message: formMessages.notifySuccess }, 201);
}

export async function POST(request: Request) {
  try {
    return await handle(request);
  } catch (error) {
    console.error("[product-interest] Unexpected error:", error);
    return json<ProductInterestField>({ ok: false, message: formMessages.unavailable, code: "SERVER" }, 500);
  }
}
