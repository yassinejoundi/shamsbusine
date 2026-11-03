import Image from "next/image";

const photographs = [
  {
    src: "/images/entreprise-facade-terracotta.webp",
    alt: "Villa contemporaine à la façade terracotta, aux baies vitrées et au jardin planté.",
    caption: "Façade terracotta, verre et végétation.",
    className: "entreprise-gallery-feature",
    sizes: "(max-width: 699px) 100vw, (max-width: 899px) 100vw, 50vw",
  },
  {
    src: "/images/entreprise-bois-pierre.webp",
    alt: "Façade contemporaine en bois et pierre donnant sur un bassin en cours d’aménagement.",
    caption: "Le bois et la pierre au bord du bassin.",
    className: "entreprise-gallery-matiere",
    sizes: "(max-width: 699px) 88vw, (max-width: 899px) 46vw, 46vw",
  },
  {
    src: "/images/entreprise-cour-terracotta.webp",
    alt: "Cour terracotta ouverte sur une piscine étroite, bordée de palmiers.",
    caption: "Une cour ouverte autour de la piscine.",
    className: "entreprise-gallery-cour",
    sizes: "(max-width: 699px) 88vw, (max-width: 899px) 46vw, 46vw",
  },
] as const;

export function EntrepriseGalerie() {
  return (
    <section className="entreprise-gallery" aria-labelledby="entreprise-gallery-title">
      <div className="frame">
        <div className="entreprise-gallery-intro">
          <h2 id="entreprise-gallery-title" data-reveal="left">
            Des lieux, des lignes, des matières.
          </h2>
          <p data-reveal="right">
            Façades, jardins et espaces de vie issus des réalisations Shams Busine.
          </p>
        </div>
        <div className="entreprise-gallery-grid">
          {photographs.map(({ src, alt, caption, className, sizes }, index) => (
            <figure className={className} key={src} data-reveal={index % 2 === 0 ? "wipe-right" : "wipe-left"} data-reveal-delay={String(index)}>
              <div className="photo entreprise-gallery-photo">
                <Image src={src} alt={alt} fill sizes={sizes} />
              </div>
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
