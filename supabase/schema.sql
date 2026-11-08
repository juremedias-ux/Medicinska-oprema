-- ============================================================================
-- Medcore — Supabase shema za obrazce spletne strani
--
-- Zaženite celotno datoteko v Supabase: Dashboard → SQL Editor → New query.
-- Skripta je idempotentna: večkratni zagon ne podvaja objektov.
--
-- Varnostni model
--   • Spletna stran zapisuje podatke prek strežniških API poti (Next.js) z
--     javnim ključem "anon". Ta ključ je javen po zasnovi.
--   • Row Level Security (RLS) vlogi anon dovoli SAMO vstavljanje (INSERT).
--     Branje, posodabljanje in brisanje iz brskalnika ali z anon ključem ni
--     mogoče. Podatke pregledujete v Supabase Dashboard (Table Editor).
--   • CHECK omejitve in unikatni indeks varujejo kakovost podatkov tudi, če
--     bi kdo poskušal pisati neposredno v Supabase REST API.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. Prijave na obvestila o izdelkih
-- ----------------------------------------------------------------------------
create table if not exists public.product_interest_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text,
  email text not null,
  product_interest text not null,
  message text,
  source text not null default 'website'
);

comment on table public.product_interest_signups is
  'Prijave na obvestila o dostopnosti izdelkov (obrazec na spletni strani).';

-- Obrazec zahteva samo e-poštni naslov; ime je neobvezno.
-- (Posodobi tudi tabelo, ustvarjeno s prejšnjo različico te skripte.)
alter table public.product_interest_signups
  alter column full_name drop not null;

-- Omejitve vsebine (ujemajo se z validacijo v src/lib/validation.ts).
alter table public.product_interest_signups
  drop constraint if exists product_interest_signups_full_name_length,
  drop constraint if exists product_interest_signups_email_format,
  drop constraint if exists product_interest_signups_product_interest_format,
  drop constraint if exists product_interest_signups_message_length,
  drop constraint if exists product_interest_signups_source_format;

alter table public.product_interest_signups
  add constraint product_interest_signups_full_name_length
    check (full_name is null or char_length(full_name) between 2 and 120),
  add constraint product_interest_signups_email_format
    check (char_length(email) <= 254 and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]{2,}$'),
  add constraint product_interest_signups_product_interest_format
    check (product_interest ~ '^[a-z0-9-]{1,100}$'),
  add constraint product_interest_signups_message_length
    check (message is null or char_length(message) <= 1000),
  add constraint product_interest_signups_source_format
    check (source ~ '^[a-z0-9:_-]{1,64}$');

-- Prepreči podvojene prijave za isti e-poštni naslov in isti izdelek.
create unique index if not exists product_interest_signups_email_product_key
  on public.product_interest_signups (lower(email), product_interest);

-- Hitrejši pregled najnovejših prijav po izdelku.
create index if not exists product_interest_signups_product_created_idx
  on public.product_interest_signups (product_interest, created_at desc);

-- Row Level Security: anon lahko samo vstavlja.
alter table public.product_interest_signups enable row level security;

revoke all on table public.product_interest_signups from anon, authenticated;
grant insert on table public.product_interest_signups to anon;

drop policy if exists "Anon can insert product interest signups" on public.product_interest_signups;
create policy "Anon can insert product interest signups"
  on public.product_interest_signups
  for insert
  to anon
  with check (source in ('website', 'website:product-page'));


-- ----------------------------------------------------------------------------
-- 2. Sporočila iz kontaktnega obrazca
-- ----------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  message text not null,
  source text not null default 'website'
);

comment on table public.contact_messages is
  'Sporočila iz kontaktnega obrazca na spletni strani.';

alter table public.contact_messages
  drop constraint if exists contact_messages_full_name_length,
  drop constraint if exists contact_messages_email_format,
  drop constraint if exists contact_messages_message_length,
  drop constraint if exists contact_messages_source_format;

alter table public.contact_messages
  add constraint contact_messages_full_name_length
    check (char_length(full_name) between 2 and 120),
  add constraint contact_messages_email_format
    check (char_length(email) <= 254 and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]{2,}$'),
  add constraint contact_messages_message_length
    check (char_length(message) between 10 and 3000),
  add constraint contact_messages_source_format
    check (source ~ '^[a-z0-9:_-]{1,64}$');

create index if not exists contact_messages_created_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

revoke all on table public.contact_messages from anon, authenticated;
grant insert on table public.contact_messages to anon;

drop policy if exists "Anon can insert contact messages" on public.contact_messages;
create policy "Anon can insert contact messages"
  on public.contact_messages
  for insert
  to anon
  with check (source = 'website');
