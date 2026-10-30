import Image from "next/image";
import Link from "next/link";

export function ServiceProjects() {
  return (
    <section className="frame section-space services-projects" aria-labelledby="projects-heading">
      <div className="section-intro services-projects-intro">
        <h2 id="projects-heading" data-reveal>La matière<br />en lumière.</h2>
        <div className="services-projects-lead">
          <p data-reveal>Des façades aux détails intérieurs, quelques vues des projets de Shams Busine.</p>
          <Link className="text-link" href="/realisations" data-reveal>Parcourir les réalisations</Link>
        </div>
      </div>

      <div className="services-project-grid">
        <figure className="services-project-featured">
          <div className="photo services-project-photo services-project-photo-main" data-reveal>
            <Image
              src="/images/services-project-villa.webp"
              alt="Façade de villa aux teintes terre cuite, bordée de végétation."
              fill
              sizes="(max-width: 699px) 100vw, (max-width: 1099px) 66vw, 64vw"
            />
          </div>
          <figcaption data-reveal>Une façade aux tons chauds, entre lignes nettes et végétation.</figcaption>
          <Link className="text-link services-project-link" href="#gros-oeuvre" data-reveal>Voir le gros œuvre</Link>
        </figure>

        <figure className="services-project-secondary">
          <div className="photo services-project-photo services-project-photo-interior" data-reveal>
            <Image
              src="/images/services-project-interior.webp"
              alt="Mur intérieur texturé et fenêtre ouverte sur la végétation."
              fill
              sizes="(max-width: 699px) 90vw, (max-width: 1099px) 34vw, 32vw"
            />
          </div>
          <figcaption data-reveal>Texture murale et lumière de fenêtre.</figcaption>
          <Link className="text-link services-project-link" href="#renovation-finitions" data-reveal>Voir la rénovation et les finitions</Link>
        </figure>

        <figure className="services-project-tertiary">
          <div className="photo services-project-photo services-project-photo-cour" data-reveal>
            <Image
              src="/images/services-project-cour.webp"
              alt="Cour couverte aux murs couleur terre cuite, ouverte sur un palmier."
              fill
              sizes="(max-width: 699px) 100vw, (max-width: 1099px) 34vw, 32vw"
            />
          </div>
          <figcaption data-reveal>Une cour ombragée ouverte sur le jardin.</figcaption>
          <Link className="text-link services-project-link" href="#services-specialises" data-reveal>Voir les services spécialisés</Link>
        </figure>
      </div>
    </section>
  );
}
