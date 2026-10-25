import Image from "next/image";
import { DisclosureIcon } from "@/components/site/DisclosureIcon";

const services = [
  { title: "Gros œuvre", text: "Terrassement, fondations, assainissement, béton armé et maçonnerie. Les travaux de structure qui donnent sa forme au bâtiment." },
  { title: "Étanchéité", text: "Protection des toitures, terrasses et sous-sols. Diagnostic des supports, choix du système et mise en œuvre adaptés aux contraintes du projet." },
  { title: "Second œuvre", text: "Plomberie, réseaux sanitaires, électricité, courants faibles, chauffage, ventilation et climatisation. Des installations coordonnées avec les autres corps de métier." },
  { title: "Rénovation & finitions", text: "Transformation des espaces, carrelage et marbre, peinture, plâtrerie, cloisons et faux-plafonds. Le soin des matières jusqu’aux derniers détails." },
  { title: "Études & suivi", text: "Faisabilité, études techniques, chiffrage détaillé et planification. Coordination du chantier, contrôle qualité et accompagnement jusqu’à la réception." },
  { title: "Travaux spécialisés", text: "Menuiseries bois et aluminium, métallerie, terrains de padel et aménagements extérieurs. Précisons ensemble les besoins propres à votre projet." },
];

export function Services() {
  return (
    <section className="services section-space" id="services" aria-labelledby="services-title">
      <div className="frame">
        <div className="section-intro">
          <h2 id="services-title" data-reveal>Des métiers<br />complémentaires.</h2>
          <p data-reveal>Construire un bâtiment, rénover un intérieur ou préparer un chantier. Retrouvez les compétences utiles à votre projet.</p>
        </div>
        <div className="services-layout">
          <figure className="services-figure" data-reveal>
            <div className="photo services-photo"><Image src="/images/detail-finitions.webp" alt="Assemblage de pierre veinée et de bois sur une façade donnant sur le jardin" fill sizes="(max-width: 699px) 100vw, 34vw" /></div>
            <figcaption>Chaque matière, chaque détail.</figcaption>
          </figure>
          <div className="service-list">
            {services.map(({ title, text }, index) => (
              <details key={title} open={index === 0} data-reveal>
                <summary><h3>{title}</h3><DisclosureIcon /></summary>
                <p>{text}</p>
                <a className="text-link" href="#devis">Demander un devis</a>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
