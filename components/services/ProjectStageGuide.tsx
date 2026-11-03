import { Arrow } from "@/components/site/Arrow";

const stages = [
  {
    href: "#conseil-etudes-suivi",
    title: "Je prépare mon projet",
    detail: "Études, chiffrage et organisation",
  },
  {
    href: "#gros-oeuvre",
    title: "Je veux construire",
    detail: "Fondations, structure et maçonnerie",
  },
  {
    href: "#renovation-finitions",
    title: "Je transforme un lieu",
    detail: "Rénovation, réaménagement et finitions",
  },
];

export function ProjectStageGuide() {
  return (
    <section className="section-space services-stage" aria-labelledby="stage-heading">
      <div className="frame">
        <div className="services-stage-intro">
          <h2 id="stage-heading" data-reveal="left">Où en est<br />votre projet&nbsp;?</h2>
          <p data-reveal="right">Chaque projet a son point de départ. Choisissez celui qui vous ressemble pour découvrir les métiers concernés.</p>
        </div>
        <nav aria-label="Choisir un point de départ">
          <ul className="services-stage-links">
            {stages.map((stage, index) => (
              <li key={stage.href} data-reveal={index % 2 === 0 ? "left" : "right"} data-reveal-delay={String(index)}>
                <a href={stage.href}>
                  <span className="services-stage-title">{stage.title}</span>
                  <span className="services-stage-detail">{stage.detail}</span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
