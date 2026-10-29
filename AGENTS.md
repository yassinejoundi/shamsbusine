<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Shams Busine project guidance

- Read `.project/website-structure.md` for architecture and content sources, then `.project/website-design.md` for visual and interaction decisions. These local files may be Git-ignored; never force-add `.project`.
- French is the primary language. Build only requested routes. Keep quote requests the primary action; use working homepage anchors until destination pages exist.
- Keep pages as clear Server Component compositions. Split substantial sections into focused files under `components/home/`; share `SiteNavbar` and `SiteFooter` under `components/site/`. Isolate client-side state and animation. Prefer children composition over boolean-heavy component APIs.
- Use the real logo and project photography from `.project/media/`, checked against `.project/metadata/project-images.csv`. Copy only deployed assets into `public/images/` and preserve provenance in `sources.json`. Do not invent project facts, client identities, testimonials, statistics or credentials.
- Use semantic HTML, French metadata, descriptive alternatives, bound labels, visible keyboard focus and a skip link. Verify menu/disclosure keyboard behavior, 320px reflow, 200% zoom and text contrast. Decorative Font Awesome icons are hidden from assistive technology.
- Focused inputs, selects and textareas use a 2px `--ink` border instead of an outline; keep a visible system-color indicator in forced-colors mode.
- Use GSAP with scoped `useGSAP` cleanup and reduced-motion guards. Content must remain visible without JavaScript. Keep motion subtle and purposeful; no scroll hijacking, pinning or autoplay.
- Homepage scroll animation: use `components/home/HomeScrollAnimations.tsx`, not the shared `PageMotion` wrapper. Keep homepage sections as Server Components and mark each with `data-motion-section`; scope reveal targets to the containing section. Animate visible child elements individually—headings, copy, photos, captions, links, prompts and form controls—not whole content groups. Give each of the seven sections its own entry timing and stagger. Keep opacity-only reveals and content visible without JavaScript. Use one-time `ScrollTrigger.batch` entrances in page order, skip animation under reduced motion, register plugins once, let `useGSAP` clean up, and refresh triggers when content height changes. Do not add pinning, parallax, scrub, autoplay or custom scroll hijacking.
- Use npm and the existing lockfile. Read installed `node_modules/next/dist/docs/` guides for changed APIs. Run ESLint and a production build, then inspect desktop/tablet/mobile and relevant interactions.
- Commit coherent milestones with terse Conventional Commits (`docs`, `build`, `feat`, `fix`). Stage explicit task files only, preserve unrelated edits, never amend existing commits. Report local-only design files and checks not run.
