# Services page

## Direction and scope

Build `/services` in French, following `.project/website-structure.md`, `.project/website-design.md` and the current `docs/homepage-redesign.md`. Continue **Photographs at uneven sizes**, seed 1385688691: Work Sans, neutral plaster, charcoal fields, amber quote actions, square photographs and generous asymmetric spacing. No new design draw is needed for a page inside this established system.

On this page, the company's actual structure, stone and finished spaces become a practical guide from project idea to building use. A broad real construction photograph leads the hero; uneven architectural photographs provide evidence later. No new imagery is needed, and no generated or stock work will stand in for company projects. Use deployed images already mapped to the archive in `public/images/sources.json` and `.project/metadata/project-images.csv`.

## Sequence and copy direction

1. **De la structure aux finitions.** Explain construction and renovation services in Marrakech. Hero headline on two lines, supporting sentence and primary quote action beside it; wide structural photograph below, a small practical note beside the image. Preserve readable content before animation.
2. **Les métiers du projet.** Six unboxed editorial entries: Gros œuvre; Étanchéité; Second œuvre & techniques; Rénovation & finitions; Conseil, études & suivi; Services spécialisés. Each supplies one concrete scope sentence and a native disclosure naming the included trades. Short in-page index links reach the relevant entry. Detail routes remain deferred; use real section destinations rather than broken links.
3. **À quel stade êtes-vous ?** Charcoal field with three generous text links: preparing a project links to studies; building links to structural work; transforming a place links to renovation. Native anchors work with keyboard and without JavaScript.
4. **Le travail en images.** A wide villa exterior, smaller interior/staircase and material detail, each with an honest visual caption and a relevant service link. Do not imply an undocumented before/after sequence or invent project scope, client names or statistics.
5. **Du besoin au chantier.** A compact, readable ordered sequence: understand and estimate; organize and execute; check and receive. No standardized prices, completion deadlines, certification or contract promises.
6. **Les questions de départ.** Focused native FAQs about separate work packages, existing buildings, architect coordination, estimating and preparing the enquiry. Answers use the scraped service scopes, without repeating its guarantees.
7. **Parler de mon projet.** Warm plaster close, short preparation checklist and amber action to the existing homepage enquiry form. Direct phone and email alternatives remain available. No duplicate backend or invented sent state.

## Motion and implementation

Use the installed GSAP, ScrollTrigger and scoped `useGSAP`. Move the existing HomeMotion implementation into shared `components/site/PageMotion.tsx` and update its homepage caller without changing its established motion behavior. Apply it to the services page. Mark each meaningful heading, paragraph, photo, service disclosure, guide link, process item and quote action for its own smooth opacity entrance. Avoid animating a container and its descendants at the same time. Photos take 750ms; text 450ms; small grouping staggers 60ms. Refresh measurements when disclosures change the page height. No pinning, parallax, autoplay, scroll engine or continuously running effects. Under reduced motion, keep final opacity and native instant anchor scrolling; clean up on route changes, preference changes and unmount. All content remains visible in default CSS and server HTML.

Keep `app/services/page.tsx` a Server Component composition. Put focused section components and service data in `components/services/`; put route-specific styles in a namespaced stylesheet to protect the homepage. Reuse the shared navbar, footer, arrows, disclosure icons and tokens. Update the global Services destination and add route-aware current-page names through a small navigation leaf component. Shared links to future routes remain valid homepage anchors. Add a homepage link to the new overview.

## Responsive and accessibility

At desktop widths, keep equal outer gutters and a 12-column hero. Service entries use two generous text columns without boxes or icon cards. Photograph spans and offsets vary. At tablet widths, reduce gaps and retain readable text measures; below 700px, stack in source order with the offer and CTA before the hero photo. Retain an inset portrait for rhythm. At 320px, all copy and controls reflow; test 200% text sizing and a 720px viewport representing a zoomed desktop.

Use French metadata, one h1, h2 section headings, h3 service headings, semantic ordered lists, descriptive alt text, visible focus, native details/summary and labelled navigation. All decorative icons are hidden. The active Services link must be correct in desktop and mobile navigation on `/services` and `/services/`; Accueil must not stay marked current there. Quote links go to `/#devis` until Contact exists.

## Acceptance and limits

Verify production build, ESLint, existing enquiry tests, desktop/tablet/mobile screenshots, 320px reflow, 200% text sizing, keyboard navigation, native disclosures, every internal link, no-JavaScript content, motion completion after disclosure expansion, live reduced-motion switching, route transitions and ScrollTrigger cleanup. Run an automated WCAG audit. Record screenshots and test evidence locally under `.project/review/`; keep a concise tracked review in `docs/services-review.md`.

No dependencies, generated assets, service-detail routes, contact route or backend are needed. Contact ownership, WhatsApp availability and publication permissions remain business checks. Preserve the pre-existing modifications to `.gitignore`, `package.json` and `package-lock.json` and exclude them from this work's commits.

Implementation note: the existing Turbopack Tailwind rule treats every `.css` file as global CSS, including module filenames. Use the existing global-CSS idiom with `services-` class names in `app/services/services.css`; no bundler configuration change is needed. Verify the rendered class names and image-frame dimensions in production.
