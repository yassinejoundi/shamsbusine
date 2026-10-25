import Image from "next/image";
import { Arrow } from "@/components/site/Arrow";

export function Hero() {
  return (
    <section className="hero frame" aria-labelledby="hero-title">
      <h1 id="hero-title" data-reveal>Du plan à la réalité.</h1>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-description" data-reveal>Construction et rénovation à Marrakech. Du gros œuvre aux finitions, Shams Busine accompagne votre projet.</p>
          <div className="hero-actions" data-reveal>
            <a href="#devis" className="button">Demander un devis <Arrow /></a>
            <a href="#realisations" className="text-link">Voir les réalisations <span aria-hidden="true">↘</span></a>
          </div>
          <p className="hero-location" data-reveal>Marrakech, Maroc<br />Du premier trait aux derniers détails.</p>
        </div>
        <figure className="hero-figure" data-reveal>
          <div className="photo hero-photo">
            <Image src="/images/villa-jardin.webp" alt="Villa aux façades roses, grandes baies vitrées et jardin planté de palmiers" fill sizes="(max-width: 699px) 100vw, 68vw" preload />
          </div>
          <figcaption><span>Construire des lieux. Soigner les détails.</span><span aria-hidden="true">Shams Busine ↗</span></figcaption>
        </figure>
      </div>
    </section>
  );
}
