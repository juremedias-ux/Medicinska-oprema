import { createRateLimiter, getClientIp, isAllowedOrigin, json, readJsonBody } from "@/lib/api";
import type { ContactField } from "@/lib/forms";
import { HONEYPOT_FIELD, formMessages } from "@/lib/forms";
import { PostgresErrorCode, getSupabaseClient } from "@/lib/supabase";
import { validateContact } from "@/lib/validation";

/**
 * POST /api/contact
 * Stores a contact-form message in Supabase (`contact_messages`).
 * Same protections as /api/product-interest.
 */
const isRateLimited = createRateLimiter({ limit: 4, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return json<ContactField>({ ok: false, message: formMessages.generic }, 403);
  }

  if (isRateLimited(getClientIp(request))) {
    return json<ContactField>({ ok: false, message: formMessages.rateLimited }, 429);
  }

  const body = await readJsonBody(request);
  if (!body.ok) return body.response;

  const honeypot = (body.data as Record<string, unknown> | null)?.[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return json<ContactField>({ ok: true, message: formMessages.contactSuccess });
  }

  const validation = validateContact(body.data);
  if (!validation.success) {
    return json<ContactField>(
      { ok: false, message: formMessages.validation, fieldErrors: validation.errors },
      422,
    );
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error("[contact] Supabase environment variables are not configured.");
    return json<ContactField>({ ok: false, message: formMessages.unavailable }, 503);
  }

  const { fullName, email, message } = validation.data;
  const { error } = await supabase.from("contact_messages").insert({
    full_name: fullName,
    email,
    message,
    source: "website",
  });

  if (error) {
    console.error("[contact] Supabase insert failed:", error.code, error.message);
    const status = error.code === PostgresErrorCode.checkViolation ? 422 : 500;
    return json<ContactField>(
      { ok: false, message: status === 422 ? formMessages.validation : formMessages.generic },
      status,
    );
  }

  return json<ContactField>({ ok: true, message: formMessages.contactSuccess }, 201);
}
