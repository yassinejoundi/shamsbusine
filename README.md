# Shams Busine

French website for construction and renovation enquiries in Marrakech.

## Run locally

```sh
npm ci
npm run dev
```

## Verify

```sh
npm run lint
node --test --test-isolation=none lib/enquiry.test.mjs
npm run build
npm run start
```

The Node test command uses the built-in TypeScript support in Node 22.18+.

The homepage is composed in `app/page.tsx`; the services overview is in `app/services/page.tsx`. Shared navigation, footer and the FAQ accordion live in `components/site/`. Section-specific, transform-only GSAP scroll entrances cover homepage content; other routes remain static and reduced-motion preferences are respected. Focused page sections live in `components/home/` and `components/services/`. Work Sans is served locally, with its license in `app/fonts/OFL.txt`. Selected company photographs and their original source URLs are recorded in `public/images/sources.json`.

Local project handoffs: `.project/website-structure.md` and `.project/website-design.md`. The `.project` directory is intentionally ignored by Git. Review evidence is kept in `.project/review/`.

The homepage and `/services` are implemented. The six service scopes use native disclosures and in-page anchors while individual detail routes remain deferred. Other navigation uses homepage anchors until future routes are built. The enquiry form prepares an email in the visitor’s mail application; it does not collect or send data through a backend. Telephone, email, WhatsApp availability and photo disclosure permissions need business confirmation before publication. Exact office address, hours, counters, testimonials and legal claims are omitted pending verification.

Services direction and verification: `docs/services-design.md` and `docs/services-review.md`.
