/**
 * Form validation shared by the browser (instant feedback) and the API
 * routes (authoritative). Keep this module free of server-only imports.
 */
import type {
  FieldErrors,
  FormSource,
  InquiryField,
  InquiryType,
  NewsletterField,
  RequesterType,
} from "./forms";
import { formSources, inquiryTypes, requesterTypes } from "./forms";

export const limits = {
  emailMax: 254,
  requestedProductMin: 2,
  requestedProductMax: 200,
} as const;

// Pragmatic e-mail check: local@domain.tld without whitespace.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ValidationResult<TData, TField extends string> =
  { success: true; data: TData } | { success: false; errors: FieldErrors<TField> };

type UnknownRecord = Record<string, unknown>;

function asRecord(input: unknown): UnknownRecord {
  return typeof input === "object" && input !== null ? (input as UnknownRecord) : {};
}

function readString(record: UnknownRecord, key: string): string {
  const value = record[key];
  return typeof value === "string" ? value : "";
}

function compact<TField extends string>(errors: FieldErrors<TField>): FieldErrors<TField> {
  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => Boolean(message)),
  ) as FieldErrors<TField>;
}

function readSource(record: UnknownRecord): FormSource {
  const value = readString(record, "source");
  return (formSources as readonly string[]).includes(value) ? (value as FormSource) : "website";
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function validateEmail(value: string): string | undefined {
  const email = normalizeEmail(value);
  if (!email) return "Vnesite e-poštni naslov.";
  if (email.length > limits.emailMax || !EMAIL_PATTERN.test(email)) {
    return "Vnesite veljaven e-poštni naslov.";
  }
  return undefined;
}

// ── Inquiry ────────────────────────────────────────────────────────────────

export interface InquiryData {
  email: string;
  inquiryType: InquiryType;
  productSlug: string | null;
  requestedProduct: string | null;
  technology: string | null;
  requesterType: RequesterType;
  source: FormSource;
}

export function validateRequestedProduct(value: string): string | undefined {
  const text = value.replace(/\s+/g, " ").trim();
  if (!text) return "Vpišite ime produkta ali povezavo do njega.";
  if (text.length < limits.requestedProductMin) return "Vnos je prekratek.";
  if (text.length > limits.requestedProductMax) return "Vnos je predolg (največ 200 znakov).";
  return undefined;
}

export function validateInquiry(
  input: unknown,
  allowed: { productSlugs: readonly string[]; technologyIds: readonly string[] },
): ValidationResult<InquiryData, InquiryField> {
  const record = asRecord(input);
  const email = readString(record, "email");
  const inquiryType = readString(record, "inquiryType") as InquiryType;
  const productSlug = readString(record, "productSlug");
  const requestedProduct = readString(record, "requestedProduct");
  const technology = readString(record, "technology");
  const requesterInput = readString(record, "requesterType");

  const validType = (inquiryTypes as readonly string[]).includes(inquiryType);

  const errors = compact<InquiryField>({
    email: validateEmail(email),
    inquiryType: validType ? undefined : "Izberite, kaj vas zanima.",
    productSlug:
      inquiryType === "katalog"
        ? !productSlug
          ? "Izberite produkt."
          : allowed.productSlugs.includes(productSlug)
            ? undefined
            : "Izberite produkt s seznama."
        : undefined,
    requestedProduct: inquiryType === "drug-produkt" ? validateRequestedProduct(requestedProduct) : undefined,
    technology:
      inquiryType === "pomoc-pri-izbiri" && technology && !allowed.technologyIds.includes(technology)
        ? "Izberite tehnologijo s seznama."
        : undefined,
  });

  if (Object.keys(errors).length > 0) return { success: false, errors };

  const requesterType = (requesterTypes as readonly string[]).includes(requesterInput)
    ? (requesterInput as RequesterType)
    : "posameznik";

  return {
    success: true,
    data: {
      email: normalizeEmail(email),
      inquiryType,
      productSlug: inquiryType === "katalog" ? productSlug : null,
      requestedProduct: inquiryType === "drug-produkt" ? requestedProduct.replace(/\s+/g, " ").trim() : null,
      technology: inquiryType === "pomoc-pri-izbiri" && technology ? technology : null,
      requesterType,
      source: readSource(record),
    },
  };
}

// ── Newsletter ─────────────────────────────────────────────────────────────

export interface NewsletterData {
  email: string;
  source: FormSource;
}

export function validateNewsletter(input: unknown): ValidationResult<NewsletterData, NewsletterField> {
  const record = asRecord(input);
  const email = readString(record, "email");

  const errors = compact<NewsletterField>({
    email: validateEmail(email),
    consent: record.consent === true ? undefined : "Za prijavo potrebujemo vaše soglasje.",
  });

  if (Object.keys(errors).length > 0) return { success: false, errors };
  return { success: true, data: { email: normalizeEmail(email), source: readSource(record) } };
}

export function validateUnsubscribe(input: unknown): ValidationResult<{ email: string }, "email"> {
  const email = readString(asRecord(input), "email");
  const error = validateEmail(email);
  if (error) return { success: false, errors: { email: error } };
  return { success: true, data: { email: normalizeEmail(email) } };
}
