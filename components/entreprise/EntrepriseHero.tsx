import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";

export function EntrepriseHero() {
  return (
    <section className="entreprise-hero frame" aria-labelledby="entreprise-title">
      <figure className="entreprise-hero-figure">
        <div className="photo entreprise-hero-photo" data-reveal data-photo-motion>
          <Image
            src="/images/chantier-maconnerie.webp"
            alt="Bâtiment en cours de maçonnerie, avec une grue de chantier à proximité."
            fill
            preload
            sizes="100vw"
          />
        </div>
      </figure>
      <div className="entreprise-hero-copy">
        <p data-hero>Construction et rénovation à Marrakech, de la structure aux finitions.</p>
        <Link className="button" href="/contact/#devis" data-hero>Parler de mon projet <Arrow /></Link>
      </div>
      <h1 id="entreprise-title" data-hero data-wordmark><span>Shams</span> <span>Busine</span></h1>
    </section>
  );
}
