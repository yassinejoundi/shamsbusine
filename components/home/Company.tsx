import Image from "next/image";

export function Company() {
  return (
    <section className="company frame section-space" id="entreprise" aria-labelledby="company-title">
      <div className="photo company-panorama" data-reveal><Image src="/images/chantier-structure.webp" alt="Chantier de construction avec structure en béton, coffrages et terrain en cours d’aménagement" fill sizes="100vw" /></div>
      <div className="company-panel">
        <div>
          <h2 id="company-title" data-reveal>Une équipe<br />de terrain.</h2>
          <a className="text-link" href="#devis" data-reveal>Échanger avec Shams Busine</a>
        </div>
        <div className="company-copy">
          <p data-reveal>Basée à Marrakech, Shams Busine accompagne les projets résidentiels, commerciaux et professionnels, de la structure aux finitions.</p>
          <p data-reveal>Coordonner les métiers, soigner l’exécution et garder un dialogue clair : nos engagements se vivent sur le chantier, avec une attention constante à la sécurité.</p>
        </div>
      </div>
    </section>
  );
}
