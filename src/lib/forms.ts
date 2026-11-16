/**
 * Shared form contracts (safe to import in client and server code).
 */

export type FieldErrors<TField extends string = string> = Partial<Record<TField, string>>;

export type FormApiResponse<TField extends string = string> =
  | { ok: true; message: string }
  | {
      ok: false;
      message: string;
      fieldErrors?: FieldErrors<TField>;
      /** Short diagnostic code shown to the visitor (e.g. "23502", "ORIGIN", "CONFIG"). */
      code?: string;
    };

/** Where a submission originated — stored in the `source` column. */
export const formSources = ["website", "website:product-page"] as const;
export type FormSource = (typeof formSources)[number];

/** Hidden anti-spam field. Real visitors never fill it in. */
export const HONEYPOT_FIELD = "company_website";

export const inquiryTypes = ["katalog", "drug-produkt", "pomoc-pri-izbiri"] as const;
export type InquiryType = (typeof inquiryTypes)[number];

export const requesterTypes = ["posameznik", "strokovnjak"] as const;
export type RequesterType = (typeof requesterTypes)[number];

export type InquiryField =
  "email" | "inquiryType" | "productSlug" | "requestedProduct" | "technology" | "requesterType";

export type NewsletterField = "email" | "consent";

/** Stored with every newsletter signup as proof of what was agreed to. */
export const NEWSLETTER_CONSENT_TEXT =
  "Strinjam se, da mi Medcore po e-pošti pošilja novičke o tehnologijah in produktih za rehabilitacijo. Odjava je mogoča kadar koli.";

export const formMessages = {
  inquirySuccess: "Hvala. Povpraševanje smo prejeli in vam bomo odgovorili po e-pošti.",
  newsletterSuccess: "Hvala. Prijavljeni ste na novičke. Odjavite se lahko kadar koli.",
  unsubscribeSuccess: "Odjava je zabeležena. Če je bil naslov prijavljen, novičk ne boste več prejemali.",
  validation: "Preverite označena polja in poskusite znova.",
  rateLimited: "Prejeli smo preveč poskusov. Prosimo, poskusite znova čez nekaj minut.",
  unavailable: "Obrazec trenutno ni na voljo. Prosimo, poskusite kasneje ali nam pišite po e-pošti.",
  generic: "Pri pošiljanju je prišlo do napake. Prosimo, poskusite znova.",
  network: "Povezave ni bilo mogoče vzpostaviti. Preverite internetno povezavo in poskusite znova.",
} as const;
