<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Medcore project notes

- Read `README.md` first (setup, architecture, content rules).
- Product content lives only in `src/data/products.ts`; site-wide settings in `src/config/site.ts`.
- All UI copy is Slovenian. Do not add medical claims that are not in the manufacturer's approved documentation.
- Cache Components is enabled: avoid `new Date()` / `Math.random()` in prerendered server components (see `src/components/layout/current-year.tsx`).
- Routes stay mounted (hidden) after navigation (`<Activity>`): never rely on global element IDs for in-page behaviour; use refs.
- Run `npm run check` before committing.
