import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Minimal database typings for the tables this site writes to.
 * Keep in sync with `supabase/schema.sql` (or regenerate with
 * `supabase gen types typescript` once the project grows).
 */
export interface Database {
  public: {
    Tables: {
      product_interest_signups: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          email: string;
          product_interest: string;
          message: string | null;
          source: string;
        };
        Insert: {
          full_name: string;
          email: string;
          product_interest: string;
          message?: string | null;
          source?: string;
        };
        Update: never;
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          email: string;
          message: string;
          source: string;
        };
        Insert: {
          full_name: string;
          email: string;
          message: string;
          source?: string;
        };
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type MedcoreSupabaseClient = SupabaseClient<Database>;

let cachedClient: MedcoreSupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
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

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

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
