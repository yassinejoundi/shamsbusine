import Image from "next/image";

const photographs = [
  {
    src: "/images/villa-exterieur.webp",
    alt: "Façade contemporaine avec un habillage en bois et un jardin en aménagement.",
    caption: "Façade, bois et jardin.",
    className: "entreprise-gallery-facade",
    sizes: "(max-width: 699px) 100vw, 58vw",
  },
  {
    src: "/images/escalier-interieur.webp",
    alt: "Mur intérieur blanc aux reliefs sculptés, face à une grande baie vitrée ouverte sur le jardin.",
    caption: "Un intérieur ouvert sur le jardin.",
    className: "entreprise-gallery-interieur",
    sizes: "(max-width: 699px) 82vw, 30vw",
  },
  {
    src: "/images/detail-finitions.webp",
    alt: "Bassin en pierre sombre devant une façade habillée de lames de bois.",
    caption: "Pierre et bois autour d’un bassin.",
    className: "entreprise-gallery-detail",
    sizes: "(max-width: 699px) 88vw, 52vw",
  },
] as const;

export function EntrepriseGalerie() {
  return (
    <section className="entreprise-gallery" aria-labelledby="entreprise-gallery-title">
      <div className="frame">
        <div className="entreprise-gallery-intro">
          <h2 id="entreprise-gallery-title" data-reveal>Du terrain à l’espace fini.</h2>
          <p data-reveal>
            Des images de construction, d’aménagement et de finitions issues des réalisations
            Shams Busine.
          </p>
        </div>
        <div className="entreprise-gallery-grid">
          {photographs.map(({ src, alt, caption, className, sizes }) => (
            <figure className={className} key={src} data-reveal>
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
