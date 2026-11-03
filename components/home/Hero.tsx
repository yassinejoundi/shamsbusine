import Image from "next/image";
import { Arrow } from "@/components/site/Arrow";
import { ScrollSection } from "./ScrollSection";

export function Hero() {
  return (
    <ScrollSection animation="hero" className="hero frame" aria-labelledby="hero-title">
      <h1 id="hero-title"><span data-scroll-item>Bâtir.</span><span data-scroll-item>Habiter.</span></h1>
      <div className="hero-detail photo">
        <Image src="/images/detail-finitions.webp" alt="Marbre sombre, bois et végétation dans un aménagement extérieur" fill sizes="(max-width: 699px) 30vw, 24vw" data-scroll-item="image" />
      </div>
      <div className="hero-copy">
        <p className="hero-description" data-scroll-item>Construction et rénovation à Marrakech. Du gros œuvre aux finitions, Shams Busine donne vie à votre projet.</p>
        <div className="hero-actions">
          <a href="#devis" className="button" data-scroll-item>Demander un devis <Arrow /></a>
          <a href="#realisations" className="text-link" data-scroll-item>Découvrir nos réalisations</a>
        </div>
      </div>
      <figure className="hero-figure">
        <div className="photo hero-photo">
          <Image src="/images/villa-jardin.webp" alt="Villa aux façades roses, grandes baies vitrées et jardin planté de palmiers" fill sizes="(max-width: 699px) 100vw, 58vw" preload data-scroll-item="image" />
        </div>
        <figcaption data-scroll-item>Des fondations aux espaces de vie.</figcaption>
      </figure>
    </ScrollSection>
  );
}
