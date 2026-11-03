# Homepage interface review — 25 October 2026

## Motion alignment — 3 November 2026

The follow-up creative brief supersedes the earlier static-scroll direction. Headlines clip into place, photographs wipe from alternating edges, split layouts enter from their own side, and grids use a short stagger. `IntersectionObserver` starts one-time Web Animations as each marked element approaches view. These effects do not alter React-managed markup, avoiding the reported hydration mismatch. Native scrolling remains unchanged; unsupported animation APIs, reduced motion and JavaScript failure leave content visible. `npm run lint`, `npm run build` and `git diff --check` passed. The production homepage preview showed the hero and scroll-enter reveals, with no browser console errors or warnings. Broader checks remain the 25 October baseline.

## Scope and coverage

Rendered French homepage, all seven sections, navigation, footer, native disclosures and email-brief form. Next.js 16.4.3, React Server Components, global CSS tokens, local Work Sans, Font Awesome and the Web Animations API. No animation dependency was added. Conventions inspected: `AGENTS.md`, `.project/website-structure.md`, `.project/website-design.md` and `docs/homepage-redesign.md`. No other routes or submission backend are in scope.

All six better-interface domain skills were loaded. Empty/invalid form, expanded/collapsed disclosures, open/closed menu, narrow widths, reduced motion and no-JavaScript content were inspected. Static sections have no loading or asynchronous error state.

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Accessibility | MobileMenu, QuoteForm, Services, Questions; keyboard and accessibility-tree checks; axe at four widths; no-JavaScript and reduced-motion checks | No actionable findings in checked behavior; screen-reader speech not verified |
| Layout | `app/globals.css`; all production screenshots at 1440, 768, 390 and 320px; 200% text sizing and 720px viewport at 2× device scale | No overflow, blocked controls or observed collisions |
| Writing | All seven homepage components, contact constants, native field errors and mail-preparation notice | No false submission message or unsupported statistics; business verification remains required |
| Typography | Computed Work Sans, headings at two lines or fewer, 16px inputs, French language, full-page screenshots | Clear; no clipped or truncated copy |
| Colors | Rendered solid surfaces, focus states, axe and explicit contrast calculations | Passing pairs; tablet overlap warning manually checked as described below |
| UI | Font Awesome disclosure/menu states, button feedback, reveal observer cleanup, live preference switching | Clear within the creative motion brief |

## Findings

No actionable interface findings remain within the inspected scope.

The tablet axe audit could not infer the background of the first company paragraph because its opaque panel overlaps the photograph. The final tablet screenshot shows the paragraph entirely on the solid panel. Its `#242923` text on `#e8e6df` measures **11.87:1**, exceeding 4.5:1. This is an automated inconclusive result, not a contrast failure.

## Verification

- `npm run lint`: passed.
- `npm run build`: passed; `/` remains prerendered. Only the homepage and Next system routes exist.
- `node --experimental-strip-types --test --test-isolation=none lib/enquiry.test.mjs`: passed; French accents, line breaks and reserved characters preserved. Node emits its existing module-type detection warning.
- `git diff --check`: passed.
- `node .agents/skills/design-taste-frontend/scripts/lint.mjs app components`: **0 FAIL, 0 WARN**.
- `node .agents/skills/design-taste-frontend/scripts/inspect.mjs http://127.0.0.1:3002 --out .taste-skill/after`: **0 FAIL, 2 WARN** at 1440, 768 and 390px. All eight listed screenshots were opened and reviewed.
- `node .project/review/redesign-browser-check.mjs`: no horizontal overflow, broken images or invalid anchors at 320, 390, 768 and 1440px. Axe reports zero violations at each size, with the single tablet inconclusive contrast result resolved above.
- Keyboard: skip link and visible focus; Tab reaches mobile menu; Enter opens; Escape closes and restores focus; selecting Réalisations closes the menu and reaches its anchor. Space toggles FAQ; Enter toggles services. All form controls have accessible names.
- Form: empty required fields fail native validation; a complete French brief passes. Whitespace-only name, city and description are rejected; focus reaches the failing field and editing clears custom validity.
- `node .project/review/redesign-motion-form-check.mjs`: opening all disclosures adds 1715px on the tested phone layout; all reveals finish; no console errors. Switching to reduced motion clears inline opacity and restores immediate anchor scrolling.
- Reduced motion on load: zero animations and no dimmed reveal or hero content. JavaScript disabled: all seven sections visible and direct email fallback present.
- Zoom: root text at 200% renders body text at 32px without horizontal overflow. A 720×450 CSS viewport at 2× device scale, representing the reflow area of a 1440×900 display at 200%, has no overflow or clipped controls. Native browser zoom shortcuts were not separately exercised.
- Contrast: ink/ground **13.35:1**, secondary/ground **6.39:1**, secondary/surface **5.68:1**, ink/amber **8.04:1**, inverse/dark surface **11.17:1**, input boundary/ground **3.71:1**.

Inspector warnings are deliberate: warm plaster follows the brand; video is omitted because real still photography provides the evidence and repository instructions prohibit autoplay. No exceptions were passed to the inspector.

Not verified: physical devices, Safari/Firefox, screen-reader speech, operating-system email application behavior, actual message delivery, contact availability or photo publication permissions. No email was sent. No deployment was performed.

## Visual critique

ROUND 1
Seen in one second: stepped title, rose villa and a small material study.
Idea (one sentence): Shams Busine's own buildings and materials become a passage from construction to living.
Live thing: prepare a project email.
Layout words by section: hero=stepped / work=staggered / services=photo-list / process=written-sequence / company=panorama-inset / faq=disclosures / contact=brief / footer=signature.
Scores: design 6 · usability 8 · creativity 7 · content 8 → overall 6.0.
Caps applied: inspector failure caps overall at 6.0.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Title touches the hero image in the initial development render (`round1/desktop-fold.jpg`); remove the negative image margin and reduce desktop display scale.
2. Offer is undersized beside the monumental title (`round1/desktop-fold.jpg`); raise it to 18px and shorten the copy.
3. Redundant email fallback competes with the contact block (`round1/desktop-page-02.jpg`); retain the direct email in contact and remove the duplicate.

ROUND 2
Seen in one second: the stepped “Bâtir. Habiter.” title.
Idea (one sentence): real villa photographs turn the mark's promise of building into visible spaces to inhabit.
Live thing: a validated, prepared email brief.
Layout words by section: hero=stepped / work=staggered / services=photo-list / process=written-sequence / company=panorama-inset / faq=disclosures / contact=brief / footer=signature.
Scores: design 7 · usability 8.5 · creativity 7 · content 8 → overall 6.0.
Caps applied: repeated service quote links trigger the inspector's eyebrow heuristic; overall capped until resolved.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Repeated identical quote links add noise inside disclosures (`after/tablet-page-01.jpg`, intermediate version); delete them, preserving the page's main quote path.
2. Mobile offer is wordy (`after/mobile-fold.jpg`, intermediate version); tighten to one concrete offer sentence.
3. No additional material visual issue; do not invent polish work.

ROUND 3
Seen in one second: the large stepped title and the real rose villa.
Idea (one sentence): Shams Busine's rose façades, palms and unfinished structures become a photographic passage from building to living.
Live thing: prepare an email containing the visitor's city, scope and project description.
Layout words by section: hero=stepped / work=staggered / services=photo-list / process=written-sequence / company=panorama-inset / faq=disclosures / contact=brief / footer=signature.
Scores: design 7 · usability 8.5 · creativity 7 · content 8 → overall 7.6.
Caps applied: conservative design score reflects the intentionally quiet opacity-only motion; creativity remains a familiar editorial approach.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. No remaining material visual blocker in the final desktop, tablet or mobile screenshot sets.
2. Remaining creative limitation: the photographic editorial approach is familiar; the client's own images carry the identity.
3. Motion remains deliberately subtle to follow project guidance. Richer motion would require a new direction, not more effects added here.

Before/after inspector: **0 → 0 failures**, **2 → 2 intentional warnings**, headline **1 → 2 lines** on desktop, maximum heading wrapping **2 → 2 lines**, six distinct project photographs preserved. The new composition changes the page rhythm without adding dependencies or routes.

## Verdict

**Approve** for the inspected local implementation. Physical-device, screen-reader speech, email delivery and publication/business checks remain outside this verification. Detailed screenshots, browser scripts and raw results remain local in ignored `.taste-skill/` and `.project/review/`.
