import Image from "next/image";

export function ProjectProcess() {
  return (
    <section className="process frame section-space" aria-labelledby="process-title">
      <div className="section-intro">
        <h2 id="process-title" data-reveal>Un chantier,<br />un fil conducteur.</h2>
        <p data-reveal>Un besoin bien compris, des travaux coordonnés et des points de contrôle. Chaque étape prépare la suivante.</p>
      </div>
      <div className="process-layout">
        <figure data-reveal>
          <div className="photo process-photo"><Image src="/images/chantier-structure.webp" alt="Chantier de construction avec structure en béton, coffrages et terrain en cours d’aménagement" fill sizes="(max-width: 699px) 100vw, 52vw" /></div>
          <figcaption>Sur le chantier, la coordination prend tout son sens.</figcaption>
        </figure>
        <ol className="process-steps">
          <li data-reveal><h3>Étudier & chiffrer</h3><p>Comprendre votre besoin, étudier les contraintes techniques et établir un devis détaillé.</p></li>
          <li data-reveal><h3>Réaliser & coordonner</h3><p>Organiser le chantier et coordonner les corps de métier selon le planning défini pour votre projet.</p></li>
          <li data-reveal><h3>Contrôler & réceptionner</h3><p>Faire les points de contrôle et préparer ensemble la réception des travaux.</p></li>
        </ol>
      </div>
    </section>
  );
}
