import { createRateLimiter } from "@/lib/api";
import { handleFormRequest } from "@/lib/form-route";
import type { InquiryField } from "@/lib/forms";
import { formMessages } from "@/lib/forms";
import { getProductSlugs } from "@/lib/products";
import { getTechnologyIds } from "@/lib/technologies";
import { validateInquiry, type InquiryData } from "@/lib/validation";

/**
 * POST /api/inquiry — product inquiry ("Pošljite povpraševanje za produkt").
 * Stores e-mail, the product (or requested product / technology) and
 * whether the sender is an individual or a professional. No health data.
 */
const isRateLimited = createRateLimiter({ limit: 6, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request) {
  return handleFormRequest<InquiryData, InquiryField>(request, {
    scope: "inquiry",
    isRateLimited,
    validate: (input) =>
      validateInquiry(input, { productSlugs: getProductSlugs(), technologyIds: getTechnologyIds() }),
    persist: (supabase, data) =>
      supabase.from("product_inquiries").insert({
        email: data.email,
        inquiry_type: data.inquiryType,
        product_slug: data.productSlug,
        requested_product: data.requestedProduct,
        technology: data.technology,
        requester_type: data.requesterType,
        source: data.source,
      }),
    successMessage: formMessages.inquirySuccess,
  });
}
