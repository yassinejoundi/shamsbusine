import Image from "next/image";

export function SelectedWork() {
  return (
    <section className="selected-work frame section-space" id="realisations" data-motion-section="work" aria-labelledby="work-title">
      <div className="work-intro">
        <h2 id="work-title" data-reveal>Nos réalisations.</h2>
        <p data-reveal>La structure, les matières, la lumière. Découvrez le travail de Shams Busine à travers ses chantiers et ses réalisations.</p>
      </div>
      <figure className="work-main" data-reveal>
        <div className="photo work-landscape"><Image src="/images/villa-exterieur.webp" alt="Villa contemporaine à deux niveaux, avec parement en pierre et larges baies vitrées" fill sizes="(max-width: 699px) 100vw, 55vw" /></div>
        <figcaption><span>Villa contemporaine</span><span>Façades & volumes</span></figcaption>
      </figure>
      <figure className="work-secondary" data-reveal>
        <div className="photo work-portrait"><Image src="/images/escalier-interieur.webp" alt="Escalier courbe devant un mur blanc texturé et une fenêtre ouverte sur les palmiers" fill sizes="(max-width: 699px) 78vw, 32vw" /></div>
        <figcaption>Escalier intérieur & jeux de lumière</figcaption>
      </figure>
      <div className="work-note" data-reveal>
        <p>Un lieu se construit.<br />Son caractère aussi.</p>
        <a className="text-link" href="#devis">Parlons de vos travaux</a>
      </div>
    </section>
  );
}
