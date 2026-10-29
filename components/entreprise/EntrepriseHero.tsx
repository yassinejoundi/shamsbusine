import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";

export function EntrepriseHero() {
  return (
    <section className="entreprise-hero frame" aria-labelledby="entreprise-title">
      <h1 id="entreprise-title" data-hero>Bâtir avec méthode.</h1>
      <div className="entreprise-hero-copy">
        <p data-hero>
          À Marrakech, Shams Busine accompagne les projets résidentiels, commerciaux et professionnels,
          du gros œuvre aux finitions.
        </p>
        <div className="entreprise-hero-actions" data-hero>
          <Link className="button" href="/contact/#devis">
            Demander un devis <Arrow />
          </Link>
          <Link className="text-link" href="#methode">Notre méthode</Link>
        </div>
      </div>
      <div className="entreprise-hero-visuals">
        <figure className="entreprise-hero-main" data-reveal>
          <div className="photo entreprise-hero-photo" data-photo-motion>
            <Image
              src="/images/villa-jardin.webp"
              alt="Villa contemporaine entourée de palmiers et d’un jardin paysager."
              fill
              preload
              sizes="(max-width: 699px) 100vw, (max-width: 899px) 92vw, 62vw"
            />
          </div>
          <figcaption>Un projet résidentiel, du bâti aux espaces extérieurs.</figcaption>
        </figure>
        <figure className="entreprise-hero-detail" data-reveal>
          <div className="photo entreprise-hero-detail-photo">
            <Image
              src="/images/chantier-maconnerie.webp"
              alt="Façade en brique en cours de construction, avec une grue de chantier à proximité."
              fill
              sizes="(max-width: 699px) 80vw, (max-width: 899px) 44vw, 21vw"
            />
          </div>
          <figcaption>Maçonnerie en cours</figcaption>
        </figure>
      </div>
    </section>
  );
}
