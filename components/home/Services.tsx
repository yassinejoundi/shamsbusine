import Image from "next/image";
import Link from "next/link";

type Service = {
  title: string;
  text: string;
  image?: {
    src: string;
    alt: string;
    caption?: string;
    kind: "structure" | "finishes";
  };
};

const services: Service[] = [
  {
    title: "Gros œuvre",
    text: "Terrassement, fondations, assainissement, béton armé et maçonnerie. Les travaux de structure qui donnent sa forme au bâtiment.",
    image: {
      src: "/images/services-structure.webp",
      alt: "Échafaudages et dalle en béton sur un chantier de construction.",
      caption: "Une structure en cours de construction.",
      kind: "structure",
    },
  },
  {
    title: "Étanchéité",
    text: "Protection des toitures, terrasses et sous-sols. Diagnostic des supports, choix du système et mise en œuvre adaptés aux contraintes du projet.",
  },
  {
    title: "Second œuvre",
    text: "Plomberie, réseaux sanitaires, électricité, courants faibles, chauffage, ventilation et climatisation. Des installations coordonnées avec les autres corps de métier.",
  },
  {
    title: "Rénovation & finitions",
    text: "Transformation des espaces, carrelage et marbre, peinture, plâtrerie, cloisons et faux-plafonds. Le soin des matières jusqu’aux derniers détails.",
    image: {
      src: "/images/services-finitions.webp",
      alt: "Plafond en bois aux lignes géométriques dans un intérieur clair.",
      kind: "finishes",
    },
  },
  {
    title: "Études & suivi",
    text: "Faisabilité, études techniques, chiffrage détaillé et planification. Coordination du chantier, contrôle qualité et accompagnement jusqu’à la réception.",
  },
  {
    title: "Travaux spécialisés",
    text: "Menuiseries bois et aluminium, métallerie, terrains de padel et aménagements extérieurs. Précisons ensemble les besoins propres à votre projet.",
  },
];

export function Services() {
  return (
    <section className="services section-space" id="services" data-motion-section="services" aria-labelledby="services-title">
      <div className="frame">
        <div className="section-intro services-intro">
          <h2 id="services-title" data-reveal>Des métiers<br />complémentaires.</h2>
          <div>
            <p data-reveal>Construire un bâtiment, rénover un intérieur ou préparer un chantier. Retrouvez les compétences utiles à votre projet.</p>
            <Link href="/services" className="text-link" data-reveal>Explorer nos services</Link>
          </div>
        </div>

        <ul className="services-bento">
          {services.map(({ title, text, image }) => (
            <li
              className={`service-tile ${image ? "service-tile--visual" : "service-tile--text"}`}
              key={title}
            >
              {image && (
                <figure className="service-tile__figure">
                  <div className={`photo service-tile__photo service-tile__photo--${image.kind}`}>
                    <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1099px) 100vw, 58vw" data-reveal />
                  </div>
                  {image.caption && <figcaption data-reveal>{image.caption}</figcaption>}
                </figure>
              )}
              <div className="service-tile__body">
                <h3 data-reveal>{title}</h3>
                <p data-reveal>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
