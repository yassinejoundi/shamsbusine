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

## Verified on 25 October 2026

- `npm run lint`, `npm run build`, `git diff --check`: passed.
- `node --test --test-isolation=none lib/enquiry.test.mjs`: passed, including
  French text, line breaks and reserved characters in the email brief.
- Production browser checks: no horizontal overflow or broken images at
  320, 390, 768 and 1440px; all section anchors resolve.
- Axe WCAG A/AA checks: zero violations at all four widths.
- Keyboard: skip link, menu open/close, Escape focus restoration, section
  selection, service and FAQ disclosures, named form controls: passed.
- 200% text sizing: no horizontal overflow. JavaScript disabled: all seven
  sections visible and direct email fallback available.
- Reduced motion: no reveal animation, including preference changes after
  loading. Native smooth scrolling becomes immediate under reduced motion.
- Opening all disclosures adds 1268px on the tested phone viewport; scrolling
  through the expanded page leaves no unfinished reveals or console errors.
- Form: whitespace-only fields rejected; the first invalid field receives
  focus; editing clears the error. No email was sent during verification.
- Design inspector: zero failures. Intentional warnings: project-mandated
  plaster palette and absence of video; the supplied photographs are the proof.

Final visual critique: design 7.5, usability 8.5, creativity 7.0, content 8.0;
weighted score 7.8/10. The editorial composition is deliberately restrained;
motion follows the project's subtle-fade requirement. No award claim implied.
The mobile hero photograph starts at 479px versus 567px before this pass.

The detailed review and screenshots remain local in `.project/review/`.
Physical-device and screen-reader speech checks, real mail-app delivery and
business verification were not performed. This is a local preview, not a deployment.
