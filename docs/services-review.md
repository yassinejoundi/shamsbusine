# Services review — 26 October 2026

## Direction and initial critique

Continue the installed design-taste direction, Photographs at uneven sizes, seed 1385688691. Existing palette, Work Sans and verified company assets are retained; no redraw, generated image, stock photograph or new dependency is needed. The live interaction is choosing a project stage, inspecting the relevant service scope and proceeding to the existing quote-email brief. Native scroll behavior remains the only scrolling system; no WebGL is justified.

ROUND 1
Seen in one second: a concrete structure and a two-line statement of delivery range.
Idea (one sentence): Shams Busine’s real structures and finished spaces become a practical guide through the project’s trades.
Live thing: project-stage links lead to six native scope disclosures.
Layout words by section: hero=wide offset / scopes=editorial index / stage=dark link guide / projects=uneven prints / process=written sequence / faq=questions / close=project brief / footer=signature.
Scores: design 7 · usability 8 · creativity 7 · content 8 → overall 6.0 with the inspector cap.
Caps applied: a real quote action aligns directly above the large footer signature, triggering an eyebrow measurement. It is a button, but the composition can be clearer.
Top three problems (most visible first), each with screenshot and fix:
1. desktop-page-02.jpg: the final amber action floats below the left introduction. Move it beside the preparation checklist and direct contact methods, making the complete next step one group.
2. Early unstyled prototype: the global Tailwind loader rewrote CSS module imports without class exports. Replace module styling with namespaced classes using the established global stylesheet approach. Resolved before this visual round; add a production DOM assertion against undefined classes and zero-size photo frames.
3. No additional material visual blocker in the corrected desktop, tablet or mobile screenshots. Retain the real photography instead of inventing decorative assets.

Intentional warnings: plaster follows the established brand; no footage is supplied and autoplay is prohibited. The inspector’s right-margin estimate uses rendered text extents; frame boxes use identical fluid padding on both sides. Verify those box dimensions separately rather than stretching the signature’s text to fill its line.

ROUND 2 — final production page
Seen in one second: a real structural-work photograph, the construction-to-finishing offer and a quote action.
Idea (one sentence): the company's real structures and finished spaces become a practical guide through the trades of a project.
Live thing: select a project stage, inspect the relevant scope and continue to a prepared enquiry.
Layout words by section: hero=wide offset / scopes=editorial index / stage=dark link guide / projects=uneven prints / process=written sequence / faq=questions / close=brief and action / footer=signature.
Scores: design 7 · usability 8.5 · creativity 7 · content 8 → overall 7.6.
Caps applied: intentionally subtle opacity-only motion limits motion craft; the established editorial composition is familiar rather than a new visual invention.
Top three problems (most visible first), each with screenshot and fix:
1. desktop-page-02.jpg: action, preparation checklist and direct contact links now form one right-hand group. Resolved.
2. desktop-page-02.jpg: the last contact line and signature close need a clearer section break. Use the project's existing spacing scale for a slightly more generous end inset. Resolved; inspector now reports zero failures.
3. No remaining material visual blocker in the final desktop, tablet or mobile sets. Remaining creative limitation: imagery comes from the existing archive, selected for truthfulness and consistency.

All eight final services screenshots and all eight homepage-regression screenshots were opened and reviewed. The final services inspector has 0 FAIL and 3 explained warnings; the homepage has 0 FAIL and the existing 2 brand/footage warnings. The services frame-padding audit reports zero unequal frames at every width, resolving the text-extent margin warning with measured box evidence.

## Scope and coverage

New `/services` overview, seven focused sections, six service disclosures, project-stage anchors, project imagery, FAQ and quote close. Shared navigation now points to the real route and derives current-page state from the pathname. Existing homepage motion moved unchanged from HomeMotion to shared PageMotion. Existing package and ignore-file modifications are excluded from this work.

Conventions: root AGENTS.md, local website structure/design, tracked homepage-redesign.md and services-design.md. Next.js 16.4.3 Server Components, existing global CSS tokens and namespaced route styles, local Work Sans, Font Awesome and GSAP.

| Domain | Evidence | Result |
| --- | --- | --- |
| Accessibility | Native service/FAQ disclosures; keyboard flow; accessibility tree; axe at 320/390/768/1440; reduced-motion and no-JavaScript checks | No actionable findings in tested states |
| Layout | All 16 service/homepage screenshots; actual frame padding; 320px reflow; 200% root text sizing and zoom-equivalent reflow | No overflow or empty image frames |
| Writing | Six scopes checked against scraped service files; enquiry and FAQ copy | No invented project facts, guarantees or unsupported prices/durations |
| Typography | Work Sans, computed heading wraps and 16px body, natural French punctuation | All headings at most two lines at inspector widths |
| Colors | Existing token system and rendered axe contrast audit | Zero violations or incomplete audit checks at all four services widths |
| UI | Disclosure states, route-aware current-page underline, quote hierarchy, PageMotion lifecycle | No actionable findings in tested behavior |

## Findings

No actionable interface findings remain in the inspected scope.

## Verification

- `npm run lint`: passed.
- `node --experimental-strip-types --test --test-isolation=none lib/enquiry.test.mjs`: passed. Existing Node module-type detection warning remains; no dependency/configuration change was needed.
- `npm run build`: passed without warnings. `/` and `/services` are static; only framework system/icon routes accompany them.
- `node .agents/skills/design-taste-frontend/scripts/lint.mjs app/services components/services components/site/NavigationLink.tsx components/site/PageMotion.tsx`: 0 FAIL, 0 WARN.
- `node .agents/skills/design-taste-frontend/scripts/inspect.mjs http://127.0.0.1:3003/services --out .project/review/services-inspection`: 0 FAIL. Three warnings are defended above: established plaster palette, no supplied footage/autoplay, and the text-extent margin estimate.
- Homepage regression inspector at `http://127.0.0.1:3003`, output `.project/review/services-home-regression`: 0 FAIL, 2 unchanged intentional warnings.
- `node .project/review/services-browser-check.mjs`: passed all assertions. Four viewport widths have zero overflow, broken loaded images, undefined classes, zero-height photo frames, unequal frame padding, invalid internal destinations or dimmed reduced-motion elements. Seven sections and six scopes are present.
- Axe WCAG A/AA audit: zero violations and zero incomplete checks at 320, 390, 768 and 1440px.
- Keyboard: first-focus skip link has a visible outline; Enter opens menu; Tab reaches links; Escape closes and restores trigger focus. Space toggles service disclosures; Enter toggles FAQ. The stage guide reaches its target section.
- Accessibility tree: each service disclosure has the distinct French name `Travaux compris : [service]`. Services is marked current on this route; Accueil is current on the homepage. Hash-only destinations are not falsely marked as the current page.
- Motion: expanding every disclosure adds 1669px on the tested phone layout; scrolling through finishes every reveal. Offscreen content starts at full opacity before its entrance. Switching to reduced motion clears inline opacity, leaves zero active animations and restores `scroll-behavior: auto`.
- Route lifecycle: four repeated Services/Homepage trips preserve correct current-page state. Exactly one page ResizeObserver remains active per mounted page, and zero remain when motion is disabled; zero console exceptions observed.
- No JavaScript: all seven sections and all six scopes remain available with visible content and quote navigation.
- Zoom: 200% root text sizing renders body at 32px with no horizontal overflow. A 720×450 CSS viewport at device scale 2 also reflows without overflow. Native browser zoom shortcuts were not separately exercised.
- `git diff --check`: passed.

Not verified: physical devices, Safari/Firefox, screen-reader speech, actual operating-system email handoff or message delivery, business contact ownership and photo publication permissions. No deployment or email was performed. The enquiry backend and six individual service-detail routes remain deferred; all current links use working destinations.

Local-only evidence remains in ignored `.project/review/` and the project handoff remains ignored. No assets were generated: all four page photographs and the logo use existing source mappings in `public/images/sources.json`.

## Verdict

Approve for the inspected local services page and shared-shell transitions. Business/publication and untested device/assistive-technology checks remain outside this approval.
