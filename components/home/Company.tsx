import Image from "next/image";
import Link from "next/link";
import { ScrollSection } from "./ScrollSection";

export function Company() {
  return (
    <ScrollSection animation="company" className="company" id="entreprise" aria-labelledby="company-title">
      <div className="frame company-layout">
        <div className="company-copy">
          <h2 id="company-title" data-scroll-item>Une équipe<br />de terrain.</h2>
          <div className="company-body">
            <p data-scroll-item>Basée à Marrakech, Shams Busine accompagne les projets résidentiels, commerciaux et professionnels, de la structure aux finitions.</p>
            <p data-scroll-item>Coordonner les métiers, soigner l’exécution et garder un dialogue clair : nos engagements se vivent sur le chantier, avec une attention constante à la sécurité.</p>
            <Link className="text-link" href="#devis" data-scroll-item>Parlons de votre projet</Link>
          </div>
        </div>

        <figure className="company-figure">
          <div className="photo company-photo">
            <Image
              src="/images/company-team.webp"
              alt="Deux techniciens de dos portent le logo Shams Busine sur leur veste jaune et consultent un plan dans un chantier en béton."
              fill
              sizes="(max-width: 699px) 100vw, (max-width: 1099px) 52vw, 56vw"
              data-scroll-item="image"
            />
          </div>
          <figcaption data-scroll-item>Visuel illustratif — deux techniciens coordonnent un point de chantier.</figcaption>
        </figure>
      </div>
    </ScrollSection>
  );
}
