import Image from "next/image";
import Link from "next/link";

export function Company() {
  return (
    <section className="company" id="entreprise" data-motion-section="company" aria-labelledby="company-title">
      <div className="frame company-layout">
        <div className="company-copy">
          <h2 id="company-title" data-reveal>Une équipe<br />de terrain.</h2>
          <div className="company-body">
            <p data-reveal>Basée à Marrakech, Shams Busine accompagne les projets résidentiels, commerciaux et professionnels, de la structure aux finitions.</p>
            <p data-reveal>Coordonner les métiers, soigner l’exécution et garder un dialogue clair : nos engagements se vivent sur le chantier, avec une attention constante à la sécurité.</p>
            <Link className="text-link" href="#devis" data-reveal>Parlons de votre projet</Link>
          </div>
        </div>

        <figure className="company-figure">
          <div className="photo company-photo">
            <Image
              src="/images/company-team.webp"
              alt="Deux techniciens de dos portent le logo Shams Busine sur leur veste jaune et consultent un plan dans un chantier en béton."
              fill
              sizes="(max-width: 699px) 100vw, (max-width: 1099px) 52vw, 56vw"
              data-reveal
            />
          </div>
          <figcaption data-reveal>Visuel illustratif — deux techniciens coordonnent un point de chantier.</figcaption>
        </figure>
      </div>
    </section>
  );
}
