# Shams Busine

French homepage for construction and renovation enquiries in Marrakech.

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

The homepage is composed in `app/page.tsx`. Shared navigation and footer live in `components/site/`; homepage sections live in `components/home/`. Work Sans is served locally, with its license in `app/fonts/OFL.txt`. Selected company photographs and their original source URLs are recorded in `public/images/sources.json`.

Local project handoffs: `.project/website-structure.md` and `.project/website-design.md`. The `.project` directory is intentionally ignored by Git. Review evidence is kept in `.project/review/`.

Only the homepage is implemented. Navigation uses section anchors until future routes are built. The enquiry form prepares an email in the visitor’s mail application; it does not collect or send data through a backend. Telephone, email, WhatsApp availability and photo disclosure permissions need business confirmation before publication. Exact office address, hours, counters, testimonials and legal claims are omitted pending verification.
