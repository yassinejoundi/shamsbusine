import Image from "next/image";
import Link from "next/link";
import { cmsImage, cmsText, type CmsValues } from "@/lib/cms/content";

const subjects = [
  { id: "exterieurs", key: "filter.exterieurs" },
  { id: "structure", key: "filter.structure" },
  { id: "espaces", key: "filter.espaces" },
] as const;

const views = [
  { subject: "exterieurs", imageClass: "garden" },
  { subject: "structure", imageClass: "structure" },
  { subject: "espaces", imageClass: "interior" },
  { subject: "structure", imageClass: "masonry" },
  { subject: "exterieurs", imageClass: "facade" },
  { subject: "espaces", imageClass: "materials" },
] as const;

const layouts = ["wide", "portrait", "low-left", "low-right", "small", "wide-low"] as const;
const imageSizes = [
  "(max-width: 699px) 100vw, (max-width: 1099px) 62vw, 58vw",
  "(max-width: 699px) 78vw, (max-width: 1099px) 30vw, 25vw",
  "(max-width: 699px) 100vw, (max-width: 1099px) 55vw, 42vw",
  "(max-width: 699px) 100vw, (max-width: 1099px) 47vw, 42vw",
  "(max-width: 699px) 78vw, (max-width: 1099px) 42vw, 34vw",
  "(max-width: 699px) 100vw, (max-width: 1099px) 55vw, 50vw",
] as const;

type SubjectFilter = (typeof subjects)[number]["id"] | "toutes";

export async function ProjectGallery({
  searchParams,
  content,
}: {
  searchParams: Promise<{ vue?: string | string[] }>;
  content: CmsValues;
}) {
  const { vue } = await searchParams;
  const selected: SubjectFilter = typeof vue === "string" && subjects.some(({ id }) => id === vue) ? vue as SubjectFilter : "toutes";
  const visibleViews = views.map((view, index) => ({
    ...view,
    src: cmsImage(content, `view.${index}.image`),
    alt: cmsText(content, `view.${index}.alt`),
    caption: cmsText(content, `view.${index}.caption`),
  })).filter(({ subject }) => selected === "toutes" || subject === selected);

  return (
    <section id="projets" className="realisations-gallery frame" aria-labelledby="realisations-gallery-title">
      <div className="realisations-gallery-heading">
        <div>
          <h2 id="realisations-gallery-title" data-reveal="left">{cmsText(content, "gallery.title")}</h2>
          <p data-reveal="right">{cmsText(content, "gallery.intro")}</p>
        </div>
        <p className="realisations-count" aria-live="polite">{visibleViews.length} {visibleViews.length === 1 ? "vue" : "vues"}</p>
      </div>
      <nav className="realisations-filters" aria-label="Filtrer les réalisations par sujet" data-reveal="right">
        <Link href="/realisations/#projets" aria-current={selected === "toutes" ? "page" : undefined}>{cmsText(content, "filter.all")}</Link>
        {subjects.map(({ id, key }) => (
          <Link key={id} href={`/realisations/?vue=${id}#projets`} aria-current={selected === id ? "page" : undefined}>
            {cmsText(content, key)}
          </Link>
        ))}
      </nav>
      <div className="realisations-grid">
        {visibleViews.map((view, index) => (
          <figure key={view.src} className={`realisations-item realisations-item--${layouts[index]}`} data-reveal={index % 2 ? "wipe-left" : "wipe-right"} data-reveal-delay={String(index % 4)}>
            <div className={`photo realisations-photo realisations-photo--${view.imageClass}`}>
              <Image
                src={view.src}
                alt={view.alt}
                fill
                sizes={imageSizes[index]}
              />
            </div>
            <figcaption>{view.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
