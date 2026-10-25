import { Arrow } from "@/components/site/Arrow";

export function ProjectStageGuide() {
  return (
    <section className="section-space services-stage" aria-labelledby="stage-heading">
      <div className="frame services-stage-layout">
        <div>
          <h2 id="stage-heading" data-reveal>À quel stade<br />êtes-vous&nbsp;?</h2>
          <p data-reveal>Votre point de départ nous aide à identifier les premiers sujets à travailler ensemble.</p>
        </div>
        <ul className="services-stage-links">
          <li data-reveal><a href="#conseil-etudes-suivi"><span>Je prépare mon projet<small>Études, chiffrage et organisation</small></span><Arrow /></a></li>
          <li data-reveal><a href="#gros-oeuvre"><span>Je veux construire<small>Fondations, structure et maçonnerie</small></span><Arrow /></a></li>
          <li data-reveal><a href="#renovation-finitions"><span>Je transforme un lieu<small>Rénovation, réaménagement et finitions</small></span><Arrow /></a></li>
        </ul>
      </div>
    </section>
  );
}
