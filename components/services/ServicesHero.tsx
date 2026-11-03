import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";

export function ServicesHero() {
  return (
    <section className="frame services-hero" aria-labelledby="services-heading">
      <h1 id="services-heading" data-reveal="type">De la structure<br />aux finitions.</h1>
      <div className="services-hero-copy" data-reveal="right">
        <p>Nos services de construction et de rénovation à Marrakech. Des compétences réunies, du premier ouvrage au dernier détail.</p>
        <Link href="/contact/#devis" className="button">Demander un devis <Arrow /></Link>
        <a href="#metiers" className="text-link">Découvrir les métiers</a>
      </div>
      <figure className="services-hero-figure" data-reveal="wipe-left">
        <div className="photo services-hero-photo">
          <Image src="/images/chantier-structure.webp" alt="Structure de bâtiment en cours de réalisation, avec coffrages et échafaudages sur le chantier" fill sizes="(max-width: 699px) 100vw, 72vw" preload />
        </div>
        <figcaption>La structure d’abord. Les espaces de vie ensuite.</figcaption>
      </figure>
      <p className="services-hero-note" data-reveal="left" data-reveal-delay="1">Un projet complet ou un besoin précis. Le périmètre se définit avec vous.</p>
    </section>
  );
}
