import Image from "next/image";

export function ServiceProjects() {
  return (
    <section className="frame section-space services-projects" aria-labelledby="projects-heading">
      <div className="section-intro">
        <h2 id="projects-heading" data-reveal>Le travail<br />en images.</h2>
        <p data-reveal>Des structures, des volumes et des matières. Quelques regards sur les projets de Shams Busine.</p>
      </div>
      <div className="services-project-grid">
        <figure className="services-project-wide">
          <div className="photo services-exterior-photo" data-reveal><Image src="/images/villa-exterieur.webp" alt="Façade contemporaine à deux niveaux, baies vitrées, pierre et habillages en bois" fill sizes="(max-width: 699px) 100vw, 55vw" /></div>
          <figcaption data-reveal>Volumes et façades d’une villa contemporaine.</figcaption>
          <a className="text-link" href="#gros-oeuvre" data-reveal>Le gros œuvre</a>
        </figure>
        <figure className="services-project-portrait">
          <div className="photo services-interior-photo" data-reveal><Image src="/images/escalier-interieur.webp" alt="Escalier courbe, mur blanc texturé et ouverture sur les palmiers du jardin" fill sizes="(max-width: 699px) 78vw, 28vw" /></div>
          <figcaption data-reveal>Un détail d’intérieur, entre courbes et lumière.</figcaption>
          <a className="text-link" href="#renovation-finitions" data-reveal>La rénovation et les finitions</a>
        </figure>
        <figure className="services-project-detail">
          <div className="photo services-material-photo" data-reveal><Image src="/images/detail-finitions.webp" alt="Rencontre du bois, de la pierre veinée et de la végétation dans un aménagement extérieur" fill sizes="(max-width: 699px) 100vw, 34vw" /></div>
          <figcaption data-reveal>Le soin des assemblages et des aménagements.</figcaption>
        </figure>
        <div className="services-project-note">
          <p data-reveal>Chaque projet se lit aussi dans ses détails.</p>
          <p data-reveal>Parlez-nous des espaces que vous souhaitez créer ou transformer. Les choix de matières et de mise en œuvre font partie de notre échange.</p>
          <a className="text-link" href="#services-specialises" data-reveal>Les aménagements spécialisés</a>
        </div>
      </div>
    </section>
  );
}
