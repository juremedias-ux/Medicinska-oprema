# Medcore — spletna stran

Production-ready Slovenian website for **Medcore**, a distributor of innovative medical and physiotherapy
technologies. Built with Next.js (App Router), TypeScript, Tailwind CSS and Supabase, deployed on Vercel.

- Single-page homepage: navigation, hero, O nas, Zakaj Medcore, portfolio (5 products), notification form,
  contact, footer
- Individual product pages at `/products/[slug]`, generated from one data file
- "Obvesti me ob dostopnosti" signups and contact requests (both e-mail only) stored in Supabase (insert-only, RLS-protected)
- SEO: Slovenian metadata, Open Graph / Twitter cards, generated OG images, sitemap, robots, JSON-LD
- Accessible (semantic landmarks, labelled fields, keyboard + screen-reader friendly forms, reduced motion)

---

## Contents

1. [Tech stack](#tech-stack)
2. [Quick start](#quick-start)
3. [Project structure](#project-structure)
4. [Supabase setup](#supabase-setup)
5. [Deploying to Vercel](#deploying-to-vercel)
6. [Testing the forms](#testing-the-forms)
7. [Managing products](#managing-products)
8. [Before launch checklist](#before-launch-checklist)
9. [Architecture and security notes](#architecture-and-security-notes)
10. [Content notes and assumptions](#content-notes-and-assumptions)
11. [Scripts](#scripts)

---

## Tech stack

| Area       | Choice                                                                                    |
| ---------- | ----------------------------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack, Cache Components, Partial Prefetching)                 |
| Language   | TypeScript (strict)                                                                       |
| Styling    | Tailwind CSS v4, design tokens in `src/app/globals.css`                                   |
| Components | Own shadcn-style primitives (`class-variance-authority`, `clsx`, `tailwind-merge`)        |
| Fonts      | Geist + Geist Mono via `next/font` (self-hosted at build, `latin-ext` for č, š, ž)        |
| Data       | `@supabase/supabase-js` (server-side only, through Next.js API routes)                    |
| Hosting    | Vercel                                                                                    |
| Quality    | ESLint (`eslint-config-next`), Prettier (+ Tailwind class sorting), `tsc`                 |

Requires **Node.js 20.9 or newer**.

---

## Quick start

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

Open http://localhost:3000. The site works without Supabase; only the two forms will show
"Obrazec trenutno ni na voljo …" until the environment variables are set.

---

## Project structure

```text
src/
  app/
    page.tsx                      Homepage (sections in order)
    layout.tsx                    Root layout, fonts, global metadata, header/footer
    globals.css                   Design tokens (colors, shadows, motion) + base styles
    products/[slug]/page.tsx      Product detail template (prerendered for every product)
    products/[slug]/opengraph-image.tsx   Per-product social image
    privacy/page.tsx              Politika zasebnosti
    terms/page.tsx                Pogoji uporabe
    api/product-interest/route.ts POST — notification signups → Supabase
    api/contact/route.ts          POST — contact messages → Supabase
    sitemap.ts, robots.ts, manifest.ts, icon.svg, apple-icon.tsx, opengraph-image.tsx
    not-found.tsx, error.tsx
  components/
    layout/      Header (mobile menu), footer, logo, skip link
    sections/    Hero, About, WhyMedcore, Portfolio, NotifySection, ContactSection
    products/    Product card, image, tags; detail/ = product page sections
    forms/       NotifyForm, ContactForm, NotifyProvider (CTA → form preselection)
    legal/       Legal page layout
    seo/         JSON-LD
    ui/          Button, inputs, badges, section heading, icons, container
  config/site.ts   Company name, contact data, legal data, navigation  ← edit before launch
  data/products.ts Product portfolio (single source of truth)
  types/product.ts Product data model
  lib/             products, validation, Supabase client, API helpers, SEO, OG renderer
  proxy.ts         Real HTTP 404 for unknown product slugs
supabase/schema.sql  Tables, constraints, RLS policies (run once in Supabase)
public/images/products/placeholders/  Temporary product illustrations (replace)
```

---

## Supabase setup

### 1. Create a project

1. Sign in at https://supabase.com and click **New project**.
2. Choose your organization, enter a name (e.g. `medcore-website`) and a strong database password
   (store it in a password manager; the website does not need it).
3. **Region:** choose an EU region (e.g. Frankfurt) — recommended for GDPR because the forms collect
   personal data of EU residents.
4. Wait until the project is ready (about a minute).

### 2. Create the tables and security policies

1. In the project, open **SQL Editor → New query**.
2. Paste the full contents of [`supabase/schema.sql`](supabase/schema.sql) and click **Run**.

The script is idempotent (safe to run again) and creates:

| Object                                    | Purpose                                                                 |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| `public.product_interest_signups`         | Notification signups — the table from the brief; `full_name` is optional because the form asks only for an e-mail |
| CHECK constraints                         | Name length, e-mail format, product value format, message length, source |
| Unique index `(lower(email), product_interest)` | Prevents duplicate signups for the same e-mail and product          |
| `public.contact_messages`                 | Contact requests (same security model; `full_name` and `message` optional because the form asks only for an e-mail) |
| Row Level Security + insert-only policy   | Role `anon` may **only INSERT**; no SELECT, UPDATE or DELETE             |
| Explicit `GRANT INSERT` / `REVOKE`        | Defense in depth, independent of project default privileges              |

You view submissions in **Table Editor** in the Supabase dashboard (the dashboard is not restricted by
these policies). No sensitive health data is collected; the message field asks visitors not to include any.

### 3. Get the URL and public key

Open the project's **Connect** dialog or **Project Settings → API Keys / Data API** (menu names can
differ slightly between dashboard versions) and copy:

- **Project URL** — e.g. `https://abcdefghijklmnop.supabase.co` → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public key** (shown under "Legacy API keys") **or** the newer **publishable key**
  (`sb_publishable_…`) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Never use the `service_role` / secret key in this project.

### 4. Add the environment variables locally

`.env.local`:

```text
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_or_publishable_key
```

Restart `npm run dev` after changing environment variables.

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. In Vercel: **Add New → Project**, import the repository. The framework preset (Next.js), build command
   and output are detected automatically.
3. **Settings → Environment Variables** — add for *Production*, *Preview* and *Development*:

   | Name                            | Value                                                        |
   | ------------------------------- | ------------------------------------------------------------ |
   | `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                                         |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon / publishable key                              |
   | `NEXT_PUBLIC_SITE_URL`          | Optional. Canonical URL once a custom domain is live, e.g. `https://www.medcore.si` |

4. Deploy. **After adding or changing environment variables, redeploy** (Deployments → ⋯ → Redeploy) —
   Vercel applies new values only to new deployments.
5. Custom domain: **Settings → Domains**. Then set `NEXT_PUBLIC_SITE_URL` and redeploy so canonical URLs,
   the sitemap and Open Graph tags use the domain.

Without `NEXT_PUBLIC_SITE_URL`, the Vercel production domain (`VERCEL_PROJECT_PRODUCTION_URL`) is used.
Preview deployments are automatically excluded from search engines via `robots.txt`.

---

## Testing the forms

### In the browser

1. Open the homepage and click **Obvesti me ob dostopnosti** on a product card — the page scrolls to the
   form and shows "Prijava za: <product>". Generic buttons (hero, header) sign up for "Vsi produkti".
2. Submit empty → "Vnesite e-poštni naslov." appears and focus moves to the field.
3. Enter an e-mail → **Pošlji prijavo** → "Hvala! Obvestili vas bomo, ko bo izbrani produkt na voljo."
4. In Supabase **Table Editor → product_interest_signups**, the new row is visible (e-mail stored in lowercase).
5. Submit the same e-mail + product again → same success message, but no duplicate row.
6. Enter an e-mail in the contact form → **Kontaktirajte me** → "Hvala! Oglasili se vam bomo v najkrajšem možnem času." → row in `contact_messages`.

### From the command line

With the dev server running:

```bash
curl -i -X POST http://localhost:3000/api/product-interest -H "Content-Type: application/json" -d '{"email":"ana@example.si","productInterest":"piomic-coms-one","source":"website"}'
```

Expected: `201` and `{"ok":true,...}`. Invalid input returns `422` with `fieldErrors`; missing Supabase
configuration returns `503`.

Valid `productInterest` values are the product slugs from `src/data/products.ts` plus `vsi-produkti`.

### Troubleshooting

Server-side errors are written to the logs (Vercel: project → **Logs**, filter `/api/product-interest`).

| Symptom                                   | Cause / fix                                                                                   |
| ----------------------------------------- | --------------------------------------------------------------------------------------------- |
| "Obrazec trenutno ni na voljo …" (503)    | Environment variables missing, placeholder or malformed — the log line `[supabase] …` names the problem; fix in Vercel and redeploy |
| "Pri pošiljanju je prišlo do napake …" (500) | The log line `Supabase insert failed` shows `code`, `message` and `hint` — usually the SQL script was not run or the key is wrong |
| Server log shows `42501`                  | Grants or policy missing — re-run `supabase/schema.sql`; ensure the Data API exposes `public`  |
| Server log reports the table is not found | The SQL script was not run in this project (or the schema cache is stale — re-run the script) |
| Repeated `429`                            | Rate limit (signups: 6, contact: 4 requests per 10 min per IP) — wait a few minutes            |

---

## Managing products

All product content lives in [`src/data/products.ts`](src/data/products.ts); types are in
[`src/types/product.ts`](src/types/product.ts).

### Add a product

1. Add an object to the `products` array with a unique, lowercase, hyphenated `slug`.
2. Add its image to `public/images/products/`.
3. Done — the homepage card, the form option, the sitemap entry, the OG image and `/products/<slug>` are
   generated automatically. Update the portfolio subtitle ("Pet izbranih …") if the count changes.

### Replace placeholder images

The five product visuals in `public/images/products/placeholders/` are **temporary illustrations**. They
are marked `isPlaceholder: true` in the data, and during local development they show a yellow
"Nadomestna slika" badge (never in production).

1. Add the official photo, e.g. `public/images/products/piomic-coms-one.jpg`
   (recommended 1600 × 1200 px, 4:3, JPG or WebP; `next/image` serves optimized AVIF/WebP automatically).
2. In `products.ts` update `image.src`, `width`, `height`, `alt` and set `isPlaceholder: false`.
3. Delete the placeholder file.

### Fill in product detail pages

Each product page already renders: hero (image, name, manufacturer, status, tags, CTAs), description,
key facts, notification form, contact CTA and related products. The following sections appear
automatically once data is added under `details`:

```ts
details: {
  heroImage: { src: "/images/products/piomic-hero.jpg", alt: "…", width: 1600, height: 1200 },
  keyBenefits: [{ title: "…", description: "…" }],
  specifications: [{ title: "Mere in teža", items: [{ label: "Teža", value: "…" }] }],
  intendedUse: { summary: "…", indications: ["…"], contraindications: ["…"], note: "…" },
  downloads: [{ title: "Brošura", href: "/downloads/piomic/brosura.pdf", fileType: "PDF", fileSize: "2,4 MB" }],
  faq: [{ question: "…", answer: "…" }],
},
seo: { title: "…", description: "…" },   // optional overrides
```

Until a section has data, the page shows a neutral "Podrobne informacije so v pripravi" panel listing the
sections that will follow. Put downloadable files in `public/downloads/`.

Medical-device content (intended use, indications, performance) must come from the manufacturer's approved
documentation (IFU, CE declaration). Do not add claims that are not supported by it.

### Availability status

`availabilityStatus` is one of `coming-soon` ("Prihaja na slovenski trg"), `available` ("Na voljo v
Sloveniji") or `on-request` ("Na voljo na povpraševanje"). Labels are in `src/lib/products.ts`.

---

## Before launch checklist

- [ ] **Contact data** in `src/config/site.ts` (`info@medcore.si`, phone, LinkedIn URL are placeholders —
      search for `ZAMENJAJTE`)
- [ ] **Legal entity data** in `src/config/site.ts` → `legal` (full company name, address, registration
      number, VAT ID); empty fields are hidden automatically
- [ ] **Legal review** of `/privacy` and `/terms` (written as professional templates; retention periods
      and processors must match reality)
- [ ] **Manufacturer URLs** in `products.ts` — verify each link (they could not be opened from the build
      environment)
- [ ] **Product images** — replace all placeholders
- [ ] **Supabase** project in an EU region, `schema.sql` executed, env vars set in Vercel, redeployed
- [ ] **Custom domain** connected and `NEXT_PUBLIC_SITE_URL` set
- [ ] Test both forms on the production URL and confirm rows in Supabase
- [ ] Decide who checks new signups/messages (see "Notifications" below)

---

## Architecture and security notes

**Forms → API routes → Supabase.** The browser posts JSON to `/api/product-interest` and `/api/contact`;
only the server talks to Supabase. Layers of protection:

1. Same-origin check (blocks cross-site browser submissions)
2. Best-effort in-memory rate limit per IP (per serverless instance; for stricter limits add a Vercel
   Firewall rate-limit rule)
3. Hidden honeypot field (bots get a fake success; nothing is stored)
4. Shared validation (`src/lib/validation.ts`) in the browser for instant feedback and on the server as the
   authority; names are normalized, e-mails lowercased
5. Database: insert-only RLS policy for `anon`, CHECK constraints and a unique index — they also apply if
   someone calls the Supabase REST API directly with the public key
6. Duplicate signups return the normal success message, so the API never reveals whether an e-mail is
   already registered

The anon/publishable key is public by design (hence the `NEXT_PUBLIC_` names from the brief); security
comes from RLS and grants. The code reads the variables only on the server.

**Notifications.** Submissions are stored, not e-mailed. To get an e-mail per submission, add a Supabase
Database Webhook or connect an e-mail service later.

**Rendering.** All pages are statically prerendered (Cache Components). Product pages are generated from
`generateStaticParams`; unknown slugs return a real HTTP 404 via `src/proxy.ts`. The copyright year is a
cached component revalidated daily. Next.js keeps up to three recently visited routes mounted but hidden
(React `<Activity>`), so in-page CTAs scroll to their own form through a React ref instead of relying on
global element IDs.

**Security headers** (in `next.config.ts`): CSP (production), `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`, HSTS. No analytics or tracking cookies are used.

**Motion.** Scroll reveals use CSS scroll-driven animations (no JavaScript); content is never hidden in
browsers without support, and all motion is disabled for `prefers-reduced-motion`.

---

## Content notes and assumptions

- All copy from the brief is used verbatim, except: the medical disclaimer's "professionalnega" is
  corrected to **"profesionalnega"**.
- Descriptive English product names are shown in Slovenian on the site (e.g. PlasmaCure "Plasma-based
  therapy solutions" → "Plazemske terapevtske rešitve"); the official manufacturer name is kept in
  `originalName` and shown on each product page under "Osnovni podatki".
- Tagline: "Izbrane tehnologije za boljšo oskrbo" (Slovenian version of "Selected technologies for better
  care.").
- `longDescription` texts only restate the positioning given in the brief — no additional clinical claims.
- The "CE oznaka v EU" tag and CE note appear only for COMS® One, as specified.
- The hero/about copy says products come from "Evrope in ZDA". Sinocare is headquartered in China — consider
  adjusting the wording if that matters for accuracy.
- The contact form stores messages in a second table (`contact_messages`); the brief did not specify a
  destination.
- The contact form asks only for an e-mail address (changed on request): no name or message field; button
  "Kontaktirajte me", card title "Želite, da vas kontaktiramo?".
- The notification form asks only for an e-mail address (changed on request). The product is taken from
  the button that opened the form; generic buttons store `vsi-produkti`. The section text was adjusted
  accordingly ("Pustite nam svoj e-poštni naslov in obvestili vas bomo, …").
- URLs follow the brief (`/products/[slug]`, `/privacy`, `/terms`); `/products` redirects to the portfolio.

---

## Scripts

| Command                | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Development server                                  |
| `npm run build`        | Production build                                    |
| `npm run start`        | Serve the production build                          |
| `npm run lint`         | ESLint                                              |
| `npm run typecheck`    | Route type generation + TypeScript                  |
| `npm run format`       | Prettier (writes)                                   |
| `npm run check`        | Lint + types + formatting + build (use before PRs)  |

Fonts: Geist is licensed under the SIL Open Font License 1.1 (`src/assets/fonts/OFL.txt`); the TTF copies
are used only to render Open Graph images.
