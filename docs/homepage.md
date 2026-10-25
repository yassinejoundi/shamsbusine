# Homepage delivery

## Direction

French construction and renovation enquiries for Shams Busine in Marrakech.
Use the existing “Photographs at uneven sizes” direction (seed 465815890):
real project photography, Work Sans, warm plaster, charcoal and amber actions.
The visual story moves from the finished villa to the trades and construction
process behind it. Keep photography visible early on phones.

The detailed architecture and art direction remain local in
`.project/website-structure.md` and `.project/website-design.md`.
Asset provenance is tracked in `public/images/sources.json`; selected originals
were checked against `.project/metadata/project-images.csv`.

## Scope

- Homepage only, with shared navigation and footer and seven server-rendered sections.
- Native service and FAQ disclosures; mobile navigation supports keyboard and Escape.
- Quote links lead to the brief form. It prepares an email, never claims to send one.
- Font Awesome for interface icons; real company photographs for project evidence.
- GSAP opacity entrances with scoped cleanup and reduced-motion support.
- Native scrolling; no scroll engine, pinning, parallax, autoplay or Three.js.

The repo already contains the dependency setup and initial homepage milestones.
This pass refines mobile composition, conversion hierarchy and motion resilience.
No stock or generated assets, additional routes, backend or deployment are needed.

## Completion checks

Run ESLint, the enquiry encoding test and a production build. Inspect production
at 320, 390, 768 and 1440px, 200% text size, reduced motion and without JavaScript.
Exercise quote anchors, disclosure keyboard behavior, mobile menu focus and form
validation. Verify disclosure expansion refreshes scroll animation measurements.
Keep screenshots and detailed critique in ignored `.project/review/`.

Before publication, the business must confirm contact details, WhatsApp
availability and project photo permissions. Exact address, hours, statistics,
testimonials and legal claims remain absent pending verification.
