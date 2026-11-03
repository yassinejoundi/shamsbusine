import Image from "next/image";
import { ScrollSection } from "./ScrollSection";

export function SelectedWork() {
  return (
    <ScrollSection animation="work" className="selected-work frame section-space" id="realisations" aria-labelledby="work-title">
      <div className="work-intro">
        <h2 id="work-title" data-scroll-item>Nos réalisations.</h2>
        <p data-scroll-item>La structure, les matières, la lumière. Découvrez le travail de Shams Busine à travers ses chantiers et ses réalisations.</p>
      </div>
      <figure className="work-main">
        <div className="photo work-landscape"><Image src="/images/villa-exterieur.webp" alt="Villa contemporaine à deux niveaux, avec parement en pierre et larges baies vitrées" fill sizes="(max-width: 699px) 100vw, 55vw" data-scroll-item="image" /></div>
        <figcaption><span data-scroll-item>Villa contemporaine</span><span data-scroll-item>Façades & volumes</span></figcaption>
      </figure>
      <figure className="work-secondary">
        <div className="photo work-portrait"><Image src="/images/escalier-interieur.webp" alt="Escalier courbe devant un mur blanc texturé et une fenêtre ouverte sur les palmiers" fill sizes="(max-width: 699px) 78vw, 32vw" data-scroll-item="image" /></div>
        <figcaption data-scroll-item>Escalier intérieur & jeux de lumière</figcaption>
      </figure>
      <div className="work-note">
        <p data-scroll-item>Un lieu se construit.<br />Son caractère aussi.</p>
        <a className="text-link" href="#devis" data-scroll-item>Parlons de vos travaux</a>
      </div>
    </ScrollSection>
  );
}
