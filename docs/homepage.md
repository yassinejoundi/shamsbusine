# Homepage delivery

**3 November 2026 motion update:** Scroll-triggered and page-entry animations were removed across the site. FAQ answer open/close interaction remains animated.

French homepage rebuilt around a stepped “Bâtir. Habiter.” hero, the company's real photography, six service disclosures, a written construction sequence and a practical email brief.

- Seven focused Server Component sections under `components/home/`.
- Shared Server Component navbar/footer; isolated client menu, enquiry and FAQ behavior.
- Work Sans, the existing logo, warm plaster, charcoal and amber quote actions.
- Font Awesome icons; no new dependencies, generated assets or invented project claims.
- No scroll-triggered or page-entry animations; the FAQ interaction respects reduced motion.
- Homepage anchors remain in place until destination routes exist.

Direction, seed, source choices and implementation boundaries: [Redesign brief](homepage-redesign.md).
Final tests, interface coverage, before/after comparison and visual critique: [Homepage review](homepage-review.md).

Verified on 25 October 2026: ESLint, enquiry encoding test, production build, source design lint, production design inspection, keyboard paths, responsive widths from 320 to 1440px, 200% text sizing, zoom-equivalent reflow, reduced motion, JavaScript-disabled content and form validation. Design inspector: zero failures. Axe: zero violations; one tablet background inference resolved through visual inspection and a measured 11.87:1 contrast pair.

Local-only records: `.project/website-structure.md`, `.project/website-design.md`, `.project/review/`, `.taste-skill/`. Tracked image provenance: `public/images/sources.json`.

No deployment or message delivery was performed. The form opens a prepared email; it does not submit to a backend. Confirm business contact details, WhatsApp availability and photo publication permissions before launch. Physical-device and screen-reader speech checks were not performed.
