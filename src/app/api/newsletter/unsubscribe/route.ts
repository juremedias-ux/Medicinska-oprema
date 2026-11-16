import { createRateLimiter } from "@/lib/api";
import { handleFormRequest } from "@/lib/form-route";
import { formMessages } from "@/lib/forms";
import { validateUnsubscribe } from "@/lib/validation";

/**
 * POST /api/newsletter/unsubscribe — marks an address as unsubscribed via the
 * `unsubscribe_newsletter` database function. The response is the same
 * whether or not the address was subscribed.
 */
const isRateLimited = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request) {
  return handleFormRequest<{ email: string }, "email">(request, {
    scope: "newsletter-unsubscribe",
    isRateLimited,
    validate: validateUnsubscribe,
    persist: (supabase, data) => supabase.rpc("unsubscribe_newsletter", { p_email: data.email }),
    successMessage: formMessages.unsubscribeSuccess,
  });
}
