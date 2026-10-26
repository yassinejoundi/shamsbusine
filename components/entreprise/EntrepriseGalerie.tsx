import Image from "next/image";

const photographs = [
  {
    src: "/images/villa-jardin.webp",
    alt: "Villa contemporaine ouverte sur un jardin paysager.",
    caption: "Une villa contemporaine et son jardin",
    className: "entreprise-gallery-villa",
  },
  {
    src: "/images/villa-exterieur.webp",
    alt: "Façade d’une villa contemporaine avec un jardin encore en aménagement.",
    caption: "Façade et jardin en aménagement",
    className: "entreprise-gallery-facade",
  },
  {
    src: "/images/escalier-interieur.webp",
    alt: "Pièce lumineuse ouverte sur le jardin par une grande baie vitrée.",
    caption: "Une pièce ouverte sur le jardin",
    className: "entreprise-gallery-interior",
  },
  {
    src: "/images/detail-finitions.webp",
    alt: "Fontaine en pierre sombre devant un mur de pierre et un parement en bois.",
    caption: "Pierre, bois et détail d’aménagement",
    className: "entreprise-gallery-fountain",
  },
] as const;

export function EntrepriseGalerie() {
  return (
    <section className="entreprise-gallery" aria-labelledby="entreprise-gallery-title">
      <div className="frame">
        <div className="entreprise-gallery-intro">
          <h2 id="entreprise-gallery-title" data-reveal>Réalisations</h2>
          <p data-reveal>Des images de construction, de volumes et de finitions issues des réalisations Shams Busine.</p>
        </div>
        <div className="entreprise-gallery-grid">
          {photographs.map(({ src, alt, caption, className }) => (
            <figure className={className} key={src}>
              <div className="photo entreprise-gallery-photo" data-reveal>
                <Image src={src} alt={alt} fill sizes="(max-width: 699px) 80vw, 55vw" />
              </div>
              <figcaption data-reveal>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
