import Image from "next/image";
import { Arrow } from "@/components/site/Arrow";

export function Hero() {
  return (
    <section className="hero frame" data-motion-section="hero" aria-labelledby="hero-title">
      <h1 id="hero-title"><span data-hero>Bâtir.</span><span data-hero>Habiter.</span></h1>
      <div className="hero-detail photo" data-hero>
        <Image src="/images/detail-finitions.webp" alt="Marbre sombre, bois et végétation dans un aménagement extérieur" fill sizes="(max-width: 699px) 30vw, 24vw" />
      </div>
      <div className="hero-copy">
        <p className="hero-description" data-hero>Construction et rénovation à Marrakech. Du gros œuvre aux finitions, Shams Busine donne vie à votre projet.</p>
        <div className="hero-actions" data-hero>
          <a href="#devis" className="button">Demander un devis <Arrow /></a>
          <a href="#realisations" className="text-link">Découvrir nos réalisations</a>
        </div>
      </div>
      <figure className="hero-figure" data-hero>
        <div className="photo hero-photo">
          <Image src="/images/villa-jardin.webp" alt="Villa aux façades roses, grandes baies vitrées et jardin planté de palmiers" fill sizes="(max-width: 699px) 100vw, 58vw" preload />
        </div>
        <figcaption>Des fondations aux espaces de vie.</figcaption>
      </figure>
    </section>
  );
}
