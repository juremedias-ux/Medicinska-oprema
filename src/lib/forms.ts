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

export type ProductInterestField = "fullName" | "email" | "productInterest" | "message";
export type ContactField = "fullName" | "email" | "message";

/** Where a signup originated — stored in the `source` column. */
export const signupSources = ["website", "website:product-page"] as const;
export type SignupSource = (typeof signupSources)[number];

/** Value stored when a visitor signs up for updates about the whole portfolio. */
export const ALL_PRODUCTS_VALUE = "vsi-produkti";

/** Hidden anti-spam field. Real visitors never fill it in. */
export const HONEYPOT_FIELD = "company_website";

export const formMessages = {
  notifySuccess: "Hvala! Obvestili vas bomo, ko bo izbrani produkt na voljo.",
  contactSuccess: "Hvala! Oglasili se vam bomo v najkrajšem možnem času.",
  validation: "Preverite označena polja in poskusite znova.",
  rateLimited: "Prejeli smo preveč poskusov. Prosimo, poskusite znova čez nekaj minut.",
  unavailable: "Obrazec trenutno ni na voljo. Prosimo, poskusite kasneje ali nam pišite po e-pošti.",
  generic: "Pri pošiljanju je prišlo do napake. Prosimo, poskusite znova.",
  network: "Povezave ni bilo mogoče vzpostaviti. Preverite internetno povezavo in poskusite znova.",
} as const;
