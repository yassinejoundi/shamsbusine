import Image from "next/image";
import Link from "next/link";

export function ServiceProjects() {
  return (
    <section className="frame section-space services-projects" aria-labelledby="projects-heading">
      <div className="section-intro services-projects-intro">
        <h2 id="projects-heading" data-reveal="left">La matière<br />en lumière.</h2>
        <div className="services-projects-lead" data-reveal="right">
          <p>Des façades aux détails intérieurs, quelques vues des projets de Shams Busine.</p>
          <Link className="text-link" href="/realisations">Parcourir les réalisations</Link>
        </div>
      </div>

      <div className="services-project-grid">
        <figure className="services-project-featured" data-reveal="wipe-right">
          <div className="photo services-project-photo services-project-photo-main">
            <Image
              src="/images/services-project-villa.webp"
              alt="Façade de villa aux teintes terre cuite, bordée de végétation."
              fill
              sizes="(max-width: 699px) 100vw, (max-width: 1099px) 66vw, 64vw"
            />
          </div>
          <figcaption>Une façade aux tons chauds, entre lignes nettes et végétation.</figcaption>
          <Link className="text-link services-project-link" href="#gros-oeuvre">Voir le gros œuvre</Link>
        </figure>

        <figure className="services-project-secondary" data-reveal="wipe-left" data-reveal-delay="1">
          <div className="photo services-project-photo services-project-photo-interior">
            <Image
              src="/images/services-project-interior.webp"
              alt="Mur intérieur texturé et fenêtre ouverte sur la végétation."
              fill
              sizes="(max-width: 699px) 90vw, (max-width: 1099px) 34vw, 32vw"
            />
          </div>
          <figcaption>Texture murale et lumière de fenêtre.</figcaption>
          <Link className="text-link services-project-link" href="#renovation-finitions">Voir la rénovation et les finitions</Link>
        </figure>

        <figure className="services-project-tertiary" data-reveal="wipe-right" data-reveal-delay="2">
          <div className="photo services-project-photo services-project-photo-cour">
            <Image
              src="/images/services-project-cour.webp"
              alt="Cour couverte aux murs couleur terre cuite, ouverte sur un palmier."
              fill
              sizes="(max-width: 699px) 100vw, (max-width: 1099px) 34vw, 32vw"
            />
          </div>
          <figcaption>Une cour ombragée ouverte sur le jardin.</figcaption>
          <Link className="text-link services-project-link" href="#services-specialises">Voir les services spécialisés</Link>
        </figure>
      </div>
    </section>
  );
}
