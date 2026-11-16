import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Minimal database typings for the tables and functions this site uses.
 * Keep in sync with `supabase/schema.sql` (or regenerate with
 * `supabase gen types typescript` once the project grows).
 */
export interface Database {
  public: {
    Tables: {
      product_inquiries: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          inquiry_type: string;
          product_slug: string | null;
          requested_product: string | null;
          technology: string | null;
          requester_type: string;
          source: string;
        };
        Insert: {
          email: string;
          inquiry_type: string;
          product_slug?: string | null;
          requested_product?: string | null;
          technology?: string | null;
          requester_type?: string;
          source?: string;
        };
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      subscribe_newsletter: {
        Args: { p_email: string; p_source: string; p_consent_text: string };
        Returns: undefined;
      };
      unsubscribe_newsletter: {
        Args: { p_email: string };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type MedcoreSupabaseClient = SupabaseClient<Database>;

let cachedClient: MedcoreSupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/** Returns a readable reason when the Supabase settings are missing or malformed. */
function getConfigProblem(url: string | undefined, key: string | undefined): string | null {
  if (!url || !key) return "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set.";
  if (url.includes("your_supabase") || key.includes("your_supabase")) {
    return "Supabase environment variables still contain the placeholder values from .env.example.";
  }
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return "NEXT_PUBLIC_SUPABASE_URL must start with https://";
    }
  } catch {
    return `NEXT_PUBLIC_SUPABASE_URL is not a valid URL (expected https://<project>.supabase.co).`;
  }
  return null;
}

/**
 * Server-side Supabase client using the public anon key.
 *
 * Inserts run through Next.js API routes, so the browser never talks to
 * Supabase directly. The anon key is public by design; Row Level Security
 * allows it to INSERT only (no SELECT / UPDATE / DELETE).
 *
 * Returns `null` when the environment variables are missing so the API
 * can respond with a friendly "temporarily unavailable" message.
 */
export function getSupabaseClient(): MedcoreSupabaseClient | null {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const problem = getConfigProblem(url, anonKey);
  if (problem || !url || !anonKey) {
    console.error(`[supabase] ${problem}`);
    return null;
  }

  cachedClient = createClient<Database>(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: { "x-application-name": "medcore-website" },
    },
  });

  return cachedClient;
}

/** Postgres error codes returned by PostgREST that we handle explicitly. */
export const PostgresErrorCode = {
  uniqueViolation: "23505",
  checkViolation: "23514",
  insufficientPrivilege: "42501",
} as const;
