import Image from "next/image";

export function Company() {
  return (
    <section className="company section-space" id="entreprise" aria-labelledby="company-title">
      <div className="frame company-layout">
        <div className="company-copy">
          <h2 id="company-title" data-reveal>L’exigence,<br />sur le terrain.</h2>
          <p data-reveal>Basée à Marrakech, Shams Busine intervient sur des projets résidentiels, commerciaux et professionnels, de la structure aux finitions.</p>
          <p data-reveal>Notre approche : une coordination attentive, des échanges clairs et le soin du détail. La qualité d’exécution et la sécurité guident notre travail au quotidien.</p>
          <a className="text-link" href="#devis" data-reveal>Parler avec notre équipe <span aria-hidden="true">↗</span></a>
        </div>
        <figure data-reveal>
          <div className="photo company-photo"><Image src="/images/chantier-maconnerie.webp" alt="Bâtiment en cours de construction, maçonnerie en briques et structure en béton avec échafaudage" fill sizes="(max-width: 699px) 100vw, 46vw" /></div>
          <figcaption>Le savoir-faire se construit, chaque jour.</figcaption>
        </figure>
      </div>
    </section>
  );
}
