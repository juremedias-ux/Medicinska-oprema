/**
 * Form validation shared by the browser (instant feedback) and the API
 * routes (authoritative). Keep this module free of server-only imports.
 */
import type { ContactField, FieldErrors, ProductInterestField, SignupSource } from "./forms";
import { signupSources } from "./forms";

export const limits = {
  nameMin: 2,
  nameMax: 120,
  emailMax: 254,
  interestMessageMax: 1000,
  contactMessageMin: 10,
  contactMessageMax: 3000,
} as const;

// Pragmatic e-mail check: local@domain.tld without whitespace.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ValidationResult<TData, TField extends string> =
  { success: true; data: TData } | { success: false; errors: FieldErrors<TField> };

export interface ProductInterestData {
  /** Optional: the signup form only asks for an e-mail address. */
  fullName: string | null;
  email: string;
  productInterest: string;
  message: string | null;
  source: SignupSource;
}

export interface ContactData {
  fullName: string;
  email: string;
  message: string;
}

type UnknownRecord = Record<string, unknown>;

function asRecord(input: unknown): UnknownRecord {
  return typeof input === "object" && input !== null ? (input as UnknownRecord) : {};
}

function readString(record: UnknownRecord, key: string): string {
  const value = record[key];
  return typeof value === "string" ? value : "";
}

function normalizeName(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function validateFullName(value: string): string | undefined {
  const name = normalizeName(value);
  if (!name) return "Vnesite ime in priimek.";
  if (name.length < limits.nameMin) return "Ime in priimek mora vsebovati vsaj 2 znaka.";
  if (name.length > limits.nameMax) return "Vnos je predolg (največ 120 znakov).";
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const email = normalizeEmail(value);
  if (!email) return "Vnesite e-poštni naslov.";
  if (email.length > limits.emailMax || !EMAIL_PATTERN.test(email)) {
    return "Vnesite veljaven e-poštni naslov.";
  }
  return undefined;
}

export function validateProductInterestValue(
  value: string,
  allowedValues: readonly string[],
): string | undefined {
  if (!value) return "Izberite izdelek.";
  if (!allowedValues.includes(value)) return "Izberite izdelek s seznama.";
  return undefined;
}

export function validateInterestMessage(value: string): string | undefined {
  if (value.trim().length > limits.interestMessageMax) {
    return `Sporočilo je lahko dolgo največ ${limits.interestMessageMax} znakov.`;
  }
  return undefined;
}

export function validateContactMessage(value: string): string | undefined {
  const message = value.trim();
  if (!message) return "Vnesite sporočilo.";
  if (message.length < limits.contactMessageMin) return "Sporočilo je prekratko.";
  if (message.length > limits.contactMessageMax) {
    return `Sporočilo je lahko dolgo največ ${limits.contactMessageMax} znakov.`;
  }
  return undefined;
}

function compact<TField extends string>(errors: FieldErrors<TField>): FieldErrors<TField> {
  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => Boolean(message)),
  ) as FieldErrors<TField>;
}

export function validateProductInterest(
  input: unknown,
  allowedValues: readonly string[],
): ValidationResult<ProductInterestData, ProductInterestField> {
  const record = asRecord(input);
  const fullName = readString(record, "fullName");
  const email = readString(record, "email");
  const productInterest = readString(record, "productInterest");
  const message = readString(record, "message");
  const sourceInput = readString(record, "source");

  const hasName = normalizeName(fullName) !== "";

  const errors = compact<ProductInterestField>({
    fullName: hasName ? validateFullName(fullName) : undefined,
    email: validateEmail(email),
    productInterest: validateProductInterestValue(productInterest, allowedValues),
    message: validateInterestMessage(message),
  });

  if (Object.keys(errors).length > 0) return { success: false, errors };

  const source = (signupSources as readonly string[]).includes(sourceInput)
    ? (sourceInput as SignupSource)
    : "website";

  return {
    success: true,
    data: {
      fullName: hasName ? normalizeName(fullName) : null,
      email: normalizeEmail(email),
      productInterest,
      message: message.trim() || null,
      source,
    },
  };
}

export function validateContact(input: unknown): ValidationResult<ContactData, ContactField> {
  const record = asRecord(input);
  const fullName = readString(record, "fullName");
  const email = readString(record, "email");
  const message = readString(record, "message");

  const errors = compact<ContactField>({
    fullName: validateFullName(fullName),
    email: validateEmail(email),
    message: validateContactMessage(message),
  });

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    data: {
      fullName: normalizeName(fullName),
      email: normalizeEmail(email),
      message: message.trim(),
    },
  };
}
