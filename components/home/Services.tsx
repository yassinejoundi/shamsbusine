import { Arrow } from "@/components/site/Arrow";

const services = [
  { title: "Gros œuvre & étanchéité", text: "Terrassement, fondations, béton armé et maçonnerie. Protection des toitures, terrasses et sous-sols par des travaux d’étanchéité adaptés au projet." },
  { title: "Second œuvre & techniques", text: "Plomberie, réseaux sanitaires, électricité et courants faibles. Chauffage, ventilation et climatisation, en coordination avec les autres corps de métier." },
  { title: "Rénovation & finitions", text: "Rénovation des espaces, carrelage, peinture, plâtrerie et faux-plafonds. Menuiseries et aménagements intérieurs et extérieurs pour donner forme à votre projet." },
  { title: "Conseil, études & suivi", text: "Faisabilité et études techniques, chiffrage détaillé, planification et coordination du chantier. Contrôle qualité et accompagnement jusqu’à la réception des travaux." },
];

export function Services() {
  return (
    <section className="services section-space" id="services" aria-labelledby="services-title">
      <div className="frame services-layout">
        <div className="services-intro">
          <h2 id="services-title" data-reveal>À chaque étape,<br />le bon métier.</h2>
          <p data-reveal>Construire, transformer, rénover. Des compétences complémentaires, réunies autour de votre projet.</p>
          <a className="text-link" href="#devis" data-reveal>Discuter de vos travaux <Arrow /></a>
        </div>
        <div className="service-list">
          {services.map(({ title, text }, index) => (
            <details key={title} open={index === 0} data-reveal>
              <summary><h3>{title}</h3><span className="disclosure-icon" aria-hidden="true" /></summary>
              <p>{text}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
