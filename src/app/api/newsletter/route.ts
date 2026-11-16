import { createRateLimiter } from "@/lib/api";
import { handleFormRequest } from "@/lib/form-route";
import type { NewsletterField } from "@/lib/forms";
import { NEWSLETTER_CONSENT_TEXT, formMessages } from "@/lib/forms";
import { validateNewsletter, type NewsletterData } from "@/lib/validation";

/**
 * POST /api/newsletter — newsletter signup with explicit consent.
 * Uses the `subscribe_newsletter` database function, which stores the
 * consent text and time and re-activates a previously unsubscribed address.
 */
const isRateLimited = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request) {
  return handleFormRequest<NewsletterData, NewsletterField>(request, {
    scope: "newsletter",
    isRateLimited,
    validate: validateNewsletter,
    persist: (supabase, data) =>
      supabase.rpc("subscribe_newsletter", {
        p_email: data.email,
        p_source: data.source,
        p_consent_text: NEWSLETTER_CONSENT_TEXT,
      }),
    successMessage: formMessages.newsletterSuccess,
  });
}
