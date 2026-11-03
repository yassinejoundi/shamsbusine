import Image from "next/image";
import Link from "next/link";

const subjects = [
  { id: "exterieurs", label: "Extérieurs" },
  { id: "structure", label: "Structure" },
  { id: "espaces", label: "Espaces & détails" },
] as const;

const views = [
  {
    src: "/images/villa-jardin.webp",
    alt: "Maison contemporaine à deux niveaux, avec baies vitrées, palmiers et pelouse.",
    caption: "Façade, jardin et bassin",
    subject: "exterieurs",
    imageClass: "garden",
  },
  {
    src: "/images/chantier-structure.webp",
    alt: "Ouvrage de béton sous un ciel dégagé, sur un terrain encore nu.",
    caption: "Béton et échafaudage",
    subject: "structure",
    imageClass: "structure",
  },
  {
    src: "/images/escalier-interieur.webp",
    alt: "Grande ouverture vitrée donnant sur des palmiers et un jardin.",
    caption: "Parois travaillées et lumière traversante",
    subject: "espaces",
    imageClass: "interior",
  },
  {
    src: "/images/chantier-maconnerie.webp",
    alt: "Bâtiment à plusieurs niveaux, au pied d’une grue jaune.",
    caption: "Maçonnerie et élévation",
    subject: "structure",
    imageClass: "masonry",
  },
  {
    src: "/images/villa-exterieur.webp",
    alt: "Façade contemporaine et terrain ouvert devant de larges baies vitrées.",
    caption: "Volumes extérieurs et matières",
    subject: "exterieurs",
    imageClass: "facade",
  },
  {
    src: "/images/detail-finitions.webp",
    alt: "Fontaine circulaire en marbre sombre devant un mur à claire-voie en bois.",
    caption: "Pierre, bois et détail d’aménagement",
    subject: "espaces",
    imageClass: "materials",
  },
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
}: {
  searchParams: Promise<{ vue?: string | string[] }>;
}) {
  const { vue } = await searchParams;
  const selected: SubjectFilter = typeof vue === "string" && subjects.some(({ id }) => id === vue) ? vue as SubjectFilter : "toutes";
  const visibleViews = selected === "toutes" ? views : views.filter(({ subject }) => subject === selected);

  return (
    <section id="projets" className="realisations-gallery frame" aria-labelledby="realisations-gallery-title">
      <div className="realisations-gallery-heading">
        <div>
          <h2 id="realisations-gallery-title" data-reveal="left">Du terrain aux détails.</h2>
          <p data-reveal="right">Parcourez les photos selon l’espace ou l’étape qui ressemble à votre projet.</p>
        </div>
        <p className="realisations-count" aria-live="polite">{visibleViews.length} {visibleViews.length === 1 ? "vue" : "vues"}</p>
      </div>
      <nav className="realisations-filters" aria-label="Filtrer les réalisations par sujet" data-reveal="right">
        <Link href="/realisations/#projets" aria-current={selected === "toutes" ? "page" : undefined}>Toutes les vues</Link>
        {subjects.map(({ id, label }) => (
          <Link key={id} href={`/realisations/?vue=${id}#projets`} aria-current={selected === id ? "page" : undefined}>
            {label}
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
