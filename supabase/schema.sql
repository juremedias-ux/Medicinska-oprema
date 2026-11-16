-- ============================================================================
-- Medcore — Supabase shema za obrazce spletne strani
--
-- Zaženite celotno datoteko v Supabase: Dashboard → SQL Editor → New query.
-- Vsebuje: 1. obvestila (starejši obrazec), 2. kontakt (starejši obrazec),
--          3. povpraševanja za produkte, 4. novičke.
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
  full_name text,
  email text not null,
  message text,
  source text not null default 'website'
);

comment on table public.contact_messages is
  'Sporočila iz kontaktnega obrazca na spletni strani.';

-- Obrazec zahteva samo e-poštni naslov; ime in sporočilo sta neobvezna.
-- (Posodobi tudi tabelo, ustvarjeno s prejšnjo različico te skripte.)
alter table public.contact_messages
  alter column full_name drop not null,
  alter column message drop not null;

alter table public.contact_messages
  drop constraint if exists contact_messages_full_name_length,
  drop constraint if exists contact_messages_email_format,
  drop constraint if exists contact_messages_message_length,
  drop constraint if exists contact_messages_source_format;

alter table public.contact_messages
  add constraint contact_messages_full_name_length
    check (full_name is null or char_length(full_name) between 2 and 120),
  add constraint contact_messages_email_format
    check (char_length(email) <= 254 and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]{2,}$'),
  add constraint contact_messages_message_length
    check (message is null or char_length(message) between 10 and 3000),
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


-- ----------------------------------------------------------------------------
-- 3. Povpraševanja za produkte (obrazec »Pošljite povpraševanje za produkt«)
--    Shranjujemo samo e-pošto, izbrani produkt oziroma tehnologijo in vrsto
--    uporabnika. Zdravstvenih podatkov ne zbiramo.
-- ----------------------------------------------------------------------------
create table if not exists public.product_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  inquiry_type text not null,
  product_slug text,
  requested_product text,
  technology text,
  requester_type text not null default 'posameznik',
  source text not null default 'website'
);

comment on table public.product_inquiries is
  'Povpraševanja za produkte s spletne strani (produkt s platforme, drug produkt ali pomoč pri izbiri).';

alter table public.product_inquiries
  drop constraint if exists product_inquiries_email_format,
  drop constraint if exists product_inquiries_inquiry_type_values,
  drop constraint if exists product_inquiries_product_slug_format,
  drop constraint if exists product_inquiries_requested_product_length,
  drop constraint if exists product_inquiries_technology_format,
  drop constraint if exists product_inquiries_requester_type_values,
  drop constraint if exists product_inquiries_source_format,
  drop constraint if exists product_inquiries_catalog_needs_product,
  drop constraint if exists product_inquiries_other_needs_name;

alter table public.product_inquiries
  add constraint product_inquiries_email_format
    check (char_length(email) <= 254 and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]{2,}$'),
  add constraint product_inquiries_inquiry_type_values
    check (inquiry_type in ('katalog', 'drug-produkt', 'pomoc-pri-izbiri')),
  add constraint product_inquiries_product_slug_format
    check (product_slug is null or product_slug ~ '^[a-z0-9-]{1,100}$'),
  add constraint product_inquiries_requested_product_length
    check (requested_product is null or char_length(requested_product) between 2 and 200),
  add constraint product_inquiries_technology_format
    check (technology is null or technology ~ '^[a-z0-9-]{1,100}$'),
  add constraint product_inquiries_requester_type_values
    check (requester_type in ('posameznik', 'strokovnjak')),
  add constraint product_inquiries_source_format
    check (source ~ '^[a-z0-9:_-]{1,64}$'),
  add constraint product_inquiries_catalog_needs_product
    check (inquiry_type <> 'katalog' or product_slug is not null),
  add constraint product_inquiries_other_needs_name
    check (inquiry_type <> 'drug-produkt' or requested_product is not null);

create index if not exists product_inquiries_created_idx
  on public.product_inquiries (created_at desc);

alter table public.product_inquiries enable row level security;

revoke all on table public.product_inquiries from anon, authenticated;
grant insert on table public.product_inquiries to anon;

drop policy if exists "Anon can insert product inquiries" on public.product_inquiries;
create policy "Anon can insert product inquiries"
  on public.product_inquiries
  for insert
  to anon
  with check (source in ('website', 'website:product-page'));


-- ----------------------------------------------------------------------------
-- 4. Novičke
--    Do tabele ni neposrednega dostopa iz spletne strani. Prijava in odjava
--    potekata samo prek funkcij subscribe_newsletter / unsubscribe_newsletter.
--    Shranimo besedilo in čas privolitve kot dokaz soglasja.
-- ----------------------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique,
  consent_text text not null,
  consented_at timestamptz not null default now(),
  source text not null default 'website',
  unsubscribed_at timestamptz
);

comment on table public.newsletter_subscribers is
  'Prijave na novičke s privolitvijo. Aktivni naročniki: unsubscribed_at is null.';

alter table public.newsletter_subscribers
  drop constraint if exists newsletter_subscribers_email_format,
  drop constraint if exists newsletter_subscribers_email_lowercase,
  drop constraint if exists newsletter_subscribers_consent_length,
  drop constraint if exists newsletter_subscribers_source_format;

alter table public.newsletter_subscribers
  add constraint newsletter_subscribers_email_format
    check (char_length(email) <= 254 and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]{2,}$'),
  add constraint newsletter_subscribers_email_lowercase
    check (email = lower(email)),
  add constraint newsletter_subscribers_consent_length
    check (char_length(consent_text) between 10 and 500),
  add constraint newsletter_subscribers_source_format
    check (source ~ '^[a-z0-9:_-]{1,64}$');

alter table public.newsletter_subscribers enable row level security;
revoke all on table public.newsletter_subscribers from anon, authenticated;

create or replace function public.subscribe_newsletter(p_email text, p_source text, p_consent_text text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.newsletter_subscribers (email, consent_text, source)
  values (lower(trim(p_email)), p_consent_text, coalesce(nullif(p_source, ''), 'website'))
  on conflict (email) do update
    set consent_text = excluded.consent_text,
        consented_at = now(),
        source = excluded.source,
        unsubscribed_at = null;
end;
$$;

create or replace function public.unsubscribe_newsletter(p_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.newsletter_subscribers
     set unsubscribed_at = now()
   where email = lower(trim(p_email))
     and unsubscribed_at is null;
end;
$$;

revoke all on function public.subscribe_newsletter(text, text, text) from public, authenticated;
revoke all on function public.unsubscribe_newsletter(text) from public, authenticated;
grant execute on function public.subscribe_newsletter(text, text, text) to anon;
grant execute on function public.unsubscribe_newsletter(text) to anon;
