import Image from "next/image";

export function SelectedWork() {
  return (
    <section className="selected-work frame section-space" id="realisations" aria-labelledby="work-title">
      <div className="section-intro">
        <h2 id="work-title" data-reveal>Des projets,<br />du concret.</h2>
        <p data-reveal>Des volumes qui prennent forme aux finitions qui donnent du caractère. Un aperçu de nos réalisations.</p>
      </div>
      <div className="work-grid">
        <figure data-reveal>
          <div className="photo work-landscape"><Image src="/images/villa-exterieur.webp" alt="Villa contemporaine à deux niveaux, avec parement en pierre et larges baies vitrées" fill sizes="(max-width: 699px) 100vw, 59vw" /></div>
          <figcaption><span>Villa contemporaine</span><span>Volumes & façades</span></figcaption>
        </figure>
        <figure className="work-portrait-figure" data-reveal>
          <div className="photo work-portrait"><Image src="/images/escalier-interieur.webp" alt="Escalier courbe devant un mur blanc texturé et une fenêtre ouverte sur les palmiers" fill sizes="(max-width: 699px) 82vw, 28vw" /></div>
          <figcaption><span>Espaces intérieurs</span><span>Matières & finitions</span></figcaption>
        </figure>
      </div>
    </section>
  );
}
