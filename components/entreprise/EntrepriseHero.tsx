import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";

export function EntrepriseHero() {
  return (
    <section className="entreprise-hero frame" aria-labelledby="entreprise-title">
      <div className="entreprise-hero-copy">
        <h1 id="entreprise-title" data-hero>
          <span>Du gros œuvre</span>
          <span>aux finitions.</span>
        </h1>
        <p data-hero>
          À Marrakech, Shams Busine accompagne les projets de construction et de rénovation, du gros
          œuvre aux finitions.
        </p>
        <div className="entreprise-hero-actions" data-hero>
          <Link className="button" href="/contact/#devis">
            Demander un devis <Arrow />
          </Link>
          <Link className="text-link" href="#methode">Découvrir notre méthode</Link>
        </div>
      </div>
      <figure className="entreprise-hero-figure" data-reveal>
        <div className="photo entreprise-hero-photo" data-photo-motion>
          <Image
            src="/images/souihla-perspective.jpeg"
            alt="Perspective architecturale d’une construction contemporaine entourée de palmiers et de végétation."
            fill
            preload
            sizes="(max-width: 1099px) 92vw, 48vw"
          />
        </div>
        <figcaption>Perspective architecturale.</figcaption>
      </figure>
    </section>
  );
}
