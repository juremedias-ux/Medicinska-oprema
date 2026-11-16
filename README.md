# Medcore — platforma za tehnologije za rehabilitacijo

Slovenian website where people explore advanced rehabilitation technologies and products from around the world
by body region, condition or rehabilitation goal, understand the evidence, and send an inquiry so Medcore can
check supply, prepare an offer and organise import and delivery.

Built with Next.js (App Router), TypeScript, Tailwind CSS and Supabase; deployed on Vercel.

- **Explorer** — interactive body map, condition and goal lists, and free-text search (navigation, not diagnosis)
- **Technologies** — plain-language explanations, typical environment, honest evidence summary, when a
  professional is needed
- **Products** — understanding-first cards and pages: intended use, environment, how it works, manufacturer
  claims vs. research/regulatory data with sources, limitations, warnings, availability; missing data is labelled
- **Inquiry** — "Pošljite povpraševanje za produkt". Currently only an e-mail field (`inquiryFormMode` in
  `src/config/site.ts`); the product, technology or professional context of the clicked button is stored with
  it. Set `inquiryFormMode` to `"full"` to show inquiry type, product / requested product / technology and
  individual vs. professional
- **Newsletter** — explicit consent, stored consent text, simple unsubscribe page (`/odjava`)
- **News** — date, source and type (market news / regulation / research) with a "what this means" note
- WCAG 2.2 AA (axe: 0 violations on key pages), keyboard navigation, reduced motion, no tracking cookies

---

## Contents

1. [Quick start](#quick-start)
2. [Project structure](#project-structure)
3. [Supabase setup](#supabase-setup)
4. [Deploying to Vercel](#deploying-to-vercel)
5. [Testing the forms](#testing-the-forms)
6. [Editing content](#editing-content)
7. [Before launch checklist](#before-launch-checklist)
8. [Architecture and security notes](#architecture-and-security-notes)
9. [Content principles and assumptions](#content-principles-and-assumptions)
10. [Scripts](#scripts)

---

## Quick start

Requires **Node.js 20.9 or newer**.

```bash
npm install
```

```bash
cp .env.example .env.local
```

Fill in the Supabase values in `.env.local` (see [Supabase setup](#supabase-setup)), then:

```bash
npm run dev
```

Open http://localhost:3000. Without Supabase the site works, but the forms answer with
"Obrazec trenutno ni na voljo … (Koda napake: CONFIG)" — they never fake a successful submission.

---

## Project structure

```text
src/
  app/
    page.tsx                         Homepage (sections in order)
    layout.tsx                       Root layout, fonts, metadata, header/footer
    globals.css                      Design tokens (graphite + cyan), motion, base styles
    products/[slug]/page.tsx         Product page template (prerendered for every product)
    odjava/page.tsx                  Newsletter unsubscribe
    privacy/, terms/                 Legal pages
    api/inquiry/route.ts             POST — product inquiry → Supabase table
    api/newsletter/route.ts          POST — newsletter signup → Supabase function
    api/newsletter/unsubscribe/      POST — unsubscribe → Supabase function
    sitemap.ts, robots.ts, manifest.ts, icons, opengraph-image.tsx
  components/
    sections/      Hero, ValueStrip, ExplorerSection, Technologies, Catalog, HowWeHelp,
                   Criteria, Professionals, News + Newsletter
    explorer/      Explorer (tabs, search), BodyMap, results, ExplorerProvider
    catalog/       ProductCatalog (filters), ProductCard
    inquiry/       InquiryForm, InquiryProvider (CTAs preselect product/technology)
    newsletter/    NewsletterForm, UnsubscribeForm
    news/          NewsList (type filter)
    products/      Product page sections, image
    layout/, legal/, seo/, ui/ (buttons, badges incl. EvidenceBadge, icons, tech icons)
  config/site.ts   Company, contact and legal data, navigation   ← edit before launch
  data/
    products.ts    Product catalogue
    technologies.ts Technology categories
    needs.ts       Body regions, conditions, goals (+ body-map positions)
    news.ts        News items
  types/           Data models
  lib/             Helpers: products, technologies, explorer search, evidence labels,
                   validation, form route handler, Supabase client, SEO, OG images
  proxy.ts         Real HTTP 404 for unknown product slugs
supabase/schema.sql  Tables, constraints, RLS, newsletter functions (run in Supabase)
```

---

## Supabase setup

### 1. Create a project

1. At https://supabase.com click **New project**.
2. Name it (e.g. `medcore-website`), set a strong database password, choose an **EU region** (e.g. Frankfurt).

### 2. Run the SQL

1. Open **SQL Editor → New query**.
2. Paste the full contents of [`supabase/schema.sql`](supabase/schema.sql) and click **Run**
   ("Success. No rows returned").

The script is idempotent and also upgrades databases created with earlier versions. **Run it again after every
update of `schema.sql`.**

| Object | Purpose |
| --- | --- |
| `product_inquiries` | Inquiries: e-mail, inquiry type, product / requested product / technology, individual or professional |
| `newsletter_subscribers` | Newsletter: e-mail, consent text and time, unsubscribe time. No direct access from the web |
| `subscribe_newsletter()` / `unsubscribe_newsletter()` | `SECURITY DEFINER` functions; the only way the site writes newsletter data |
| `product_interest_signups`, `contact_messages` | Tables of earlier forms; kept so existing data is preserved |
| RLS, grants, CHECK constraints | Role `anon` can only INSERT inquiries and execute the two functions; it can never read data |

View data in **Table Editor**. Active subscribers: rows where `unsubscribed_at` is empty.

### 3. URL and key

From the project's **Connect** dialog or **Project Settings → API Keys / Data API**:

- **Project URL** — exactly `https://<project>.supabase.co` (without `/rest/v1`) → `NEXT_PUBLIC_SUPABASE_URL`
- **anon** key (Legacy API keys) or **publishable** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Never use the `service_role` / secret key.

---

## Deploying to Vercel

1. Import the GitHub repository in Vercel (**Add New → Project**).
2. **Settings → Environment Variables** (type **Config**, Production and Preview):
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, optionally `NEXT_PUBLIC_SITE_URL`
   (e.g. `https://www.medcore.si`).
3. Deploy. After changing variables: **Deployments → ⋯ → Redeploy**.

Preview deployments are excluded from search engines via `robots.txt`.

---

## Testing the forms

1. Homepage → click a body region in the hero → explorer shows technologies with explanations.
2. Product card → **Pošljite povpraševanje** → enter an e-mail → "Hvala. Povpraševanje smo prejeli …" → row in
   `product_inquiries` with `product_slug`. From the explorer the row gets `technology`; from "Za strokovne
   uporabnike" `requester_type = strokovnjak`; other buttons store `inquiry_type = pomoc-pri-izbiri`.
3. With `inquiryFormMode = "full"`: choose **Produkt, ki ga ni na platformi**, enter a name → row with
   `requested_product`.
4. Newsletter → e-mail + consent checkbox → row in `newsletter_subscribers`.
5. `/odjava` → same e-mail → `unsubscribed_at` is set.

Failed submissions show a short code, e.g. "(Koda napake: 42P01)":

| Code | Meaning / fix |
| --- | --- |
| `42P01`, `PGRST205`, `PGRST202` | Table or function missing — run the latest `supabase/schema.sql` |
| `23502` | Database has an older schema — run the latest `supabase/schema.sql` |
| `42501` | Missing grants/policy — run the latest `supabase/schema.sql` |
| `HTTP401`, `PGRST301` | Wrong API key in Vercel |
| `HTTP404` | Wrong URL (e.g. ends with `/rest/v1`) — use `https://<project>.supabase.co` |
| `CONNECTION` | Supabase URL unreachable |
| `CONFIG` | Environment variables missing, placeholder or malformed |
| `ORIGIN` | Request from another domain |

Server logs (Vercel → **Logs**) contain the full Supabase error.

---

## Editing content

All content is data; components render whatever is present.

**Products** — `src/data/products.ts` (type: `src/types/product.ts`):

| Field | Notes |
| --- | --- |
| `intendedUse`, `environment`, `howItWorks` | Plain language; `null` = shown as "v preverjanju" |
| `manufacturerClaims` | Always labelled "Navedba proizvajalca" |
| `limitations`, `warnings` | From IFU / official documentation; `[]` = shown as "v preverjanju" |
| `evidence[]` | `kind`: `raziskava`, `regulativa`, `proizvajalec`, `medij`; summary incl. size/limits; `sources[]` with URLs |
| `regulatory[]` | Per market; `basis`: `regulativa`, `proizvajalec`, `medij`, `v-preverjanju`; optional source |
| `image` | Placeholder illustrations have `isPlaceholder: true` (badge in development); replace with official photos (1600 × 1200 px) |
| `details` | Optional specifications, downloads, FAQ |

**Technologies** — `src/data/technologies.ts`. `rehabilitation: false` keeps a category out of the explorer
and the technology overview (used for CGM and equipment disinfection).

**Needs** — `src/data/needs.ts`: `intro`, `seekCare` (when to seek professional assessment) and the list of
technologies. Body-map positions are in `bodyHotspots`.

**News** — `src/data/news.ts`: date, type (`trg` / `regulativa` / `raziskava`), source and `meaning`.

---

## Before launch checklist

- [ ] **Contact and legal data** in `src/config/site.ts` (search for `ZAMENJAJTE`)
- [ ] **Legal review** of `/privacy` and `/terms` (retention, processors, newsletter tool)
- [ ] **Services** — the site promises only: exploring options, clarifying requirements, checking the product,
      checking supply, preparing an offer, organising order, import and delivery in the agreed scope. Confirm
      this matches what Medcore actually provides
- [ ] **Product data** — verify every source link; complete `environment`, `howItWorks`, `limitations`,
      `warnings` from manufacturers' documentation; confirm regulatory status where marked "v preverjanju"
- [ ] **Images** — replace placeholder illustrations with official photography
- [ ] **Newsletter sending** — choose a sending tool; it must include an unsubscribe link (or point to `/odjava`);
      consider double opt-in
- [ ] Supabase in an EU region, latest `schema.sql` executed, Vercel variables set, redeployed, forms tested

---

## Architecture and security notes

- **Forms → API routes → Supabase.** One shared handler (`src/lib/form-route.ts`): same-origin check,
  rate limit, JSON size limit, honeypot, validation (`src/lib/validation.ts`, shared with the browser),
  Supabase write, JSON errors with diagnostic codes. Unexpected errors never produce a fake success.
- **Database.** Insert-only RLS for inquiries; newsletter table reachable only through two `SECURITY DEFINER`
  functions; CHECK constraints apply even to direct REST calls with the public key.
- **Minimal data.** Inquiries and newsletter collect an e-mail address plus non-medical selections. Explorer
  choices stay in the browser and are never sent or stored.
- **Rendering.** Static prerendering with Cache Components; product pages from `generateStaticParams`; unknown
  slugs return HTTP 404 via `src/proxy.ts`. Recently visited routes stay mounted (React `<Activity>`), so in-page
  CTAs scroll via refs and product pages use product-specific ids.
- **Motion.** CSS scroll-driven reveals and one looping hero illustration; everything stops with
  `prefers-reduced-motion`. No scroll hijacking.
- **Security headers** in `next.config.ts` (CSP in production, frame, referrer, permissions, HSTS).

---

## Content principles and assumptions

- Copy is formal Slovenian ("vi"), concrete, without superlatives or efficacy promises.
- "Advanced" is never presented as "more effective"; no rankings of "best" products.
- Product facts were researched from public sources (PubMed, ClinicalTrials.gov, FDA data, manufacturer
  releases, EU CORDIS) and linked; anything not verified is shown as "v preverjanju".
- The five existing products are kept. CGM (Sinocare) and ultrasound-probe disinfection (Germitec) are not
  rehabilitation products; they appear in the catalogue with honest categories and are excluded from the
  explorer, except CGM as part of diabetic-foot care.
- Earlier forms (availability notifications, contact form) were replaced by the inquiry and newsletter; their
  tables remain in the database.

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Route types + TypeScript |
| `npm run format` | Prettier (writes) |
| `npm run check` | Lint + types + formatting + build |

Fonts: Geist (SIL Open Font License 1.1, `src/assets/fonts/OFL.txt`).
