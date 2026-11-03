# Homepage redesign

## Direction

French homepage only. Make construction and renovation in Marrakech immediately clear, show the company's work, and lead to an email brief or a direct call. Keep Next.js Server Components, local Work Sans, existing Font Awesome, and the tested enquiry helper.

Art direction: **Photographs at uneven sizes**, seed **1385688691**, selected from three directions for its fit with the real villa archive. On this page, Shams Busine's rose façades, palms and unfinished structures become a photographic passage from building to living. The sun/house/crane logo and amber actions tie that passage to the company.

Hero: stepped “Bâtir. Habiter.” title, a small material photograph, a dominant villa photograph and an adjacent plain-language offer. Work Sans at monumental scale; neutral plaster, charcoal and existing amber. The mobile composition puts the offer and quote action before the principal photograph.

Sequence and evidence:

- Bâtir. Habiter. — construction and renovation in Marrakech, illustrated by the archived rose villa.
- Nos réalisations — unequal photographs of an exterior and staircase, with factual captions.
- Des métiers complémentaires — six native disclosures covering the archived service families.
- Votre chantier, accompagné — study, execution and reception, presented as a continuous written sequence.
- Une équipe de terrain — construction photograph and the company's coordination commitments, without unverified counters.
- Vos questions — scope, location, architect, budget and preparation.
- Votre projet commence ici — the existing email brief, phone, email and WhatsApp alternatives.
- Footer — large company signature, real logo, contact details and working homepage anchors.

The live interaction prepares a project email. It never claims a message was sent. Native validation and a direct email link remain available. There is no backend, analytics or new route.

Blueprint adjustments: replace the dealt draggable process row with “Lines that step across”; a carousel conflicts with the repository's accessible, continuous reading order. Use six service entries rather than decorative columns because each archived trade needs its own scope. The contact blueprint's portrait is omitted because no verified team portrait exists; the useful enquiry form occupies that space. The hero's two real images supersede the earlier single-image handoff for this requested rebuild.

## Assets and motion

All six deployed photographs and the original logo remain mapped in `public/images/sources.json`, verified against `.project/metadata/project-images.csv`. No stock photos, generated projects, invented client identities or sample statistics. Image generation adds no value to this existing photographic archive.

Keep native scrolling and static section content, matching the BAC English homepage. Use short CSS transitions for navigation, quote actions, the mobile menu icon and FAQ disclosure icon. Respect reduced motion; do not add GSAP, page-entry reveals, pinning, autoplay or scroll hijacking.

## Acceptance

- Rebuild all seven sections, shared navbar and footer; retain focused component files.
- Quote, service, FAQ and navigation paths work with keyboard and touch.
- No horizontal overflow at 320, 390, 768 and 1440 pixels or at 200% zoom.
- Test reduced motion and JavaScript-disabled content; verify contrast and focus.
- Run ESLint, enquiry tests, production build, design lint and production browser inspection.
- Record final visual critique and interface coverage. Keep `.project` and `.taste-skill` local and ignored.

## Before critique

ROUND 0
Seen in one second: large slogan beside a villa.
Idea: the real archive shows the passage from construction to a finished home.
Live thing: an email brief with native validation.
Layout words by section: hero=split / work=pair / services=split / process=split / company=split / faq=split / contact=split.
Scores: design 7 · usability 8 · creativity 6 · content 8 → overall 7.2.
Caps applied: creativity capped at 6 for a largely interchangeable composition.
Top three problems:
1. Repeated split layouts flatten the story (desktop-page-01 and 02); vary the spatial rhythm.
2. The hero's large title and small offer feel disconnected (desktop-fold); compose title, photo and offer as one scene.
3. Broad dark and pale panels lack a photographic focal point (desktop-page-01); give services a real material image and make the process a compact written sequence.

Before inspector: 0 FAIL, 2 WARN (brand plaster palette and no footage). No footage is used because autoplay is prohibited and the supplied still photographs prove the actual work.
