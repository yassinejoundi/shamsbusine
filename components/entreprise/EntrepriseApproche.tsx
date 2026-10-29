import Image from "next/image";

export function EntrepriseApproche() {
  return (
    <section id="equipe" className="entreprise-approche" aria-labelledby="entreprise-approche-title">
      <div className="frame">
        <div className="entreprise-approche-intro">
          <h2 id="entreprise-approche-title" data-reveal>Une équipe, plusieurs métiers.</h2>
          <p data-reveal>
            Ingénieurs BTP, techniciens spécialisés, chefs de chantier et ouvriers qualifiés
            réunissent leurs compétences autour de chaque projet.
          </p>
        </div>
        <div className="entreprise-approche-layout">
          <figure className="entreprise-approche-figure">
            <div className="photo entreprise-approche-photo" data-reveal>
              <Image
                src="/images/chantier-structure.webp"
                alt="Structure en béton en cours de réalisation, entourée d’échafaudages."
                fill
                sizes="(max-width: 699px) 100vw, (max-width: 899px) 48vw, 55vw"
              />
            </div>
            <figcaption>Structure et mise en œuvre sur chantier.</figcaption>
          </figure>
          <div className="entreprise-approche-details" data-reveal>
            <dl className="entreprise-facts">
              <div>
                <dt>Implantation</dt>
                <dd>Marrakech</dd>
              </div>
              <div>
                <dt>Projets</dt>
                <dd>Résidentiels, commerciaux et professionnels</dd>
              </div>
              <div>
                <dt>Intervention</dt>
                <dd>Du gros œuvre aux finitions</dd>
              </div>
            </dl>
            <p className="entreprise-approche-note">
              La confiance, la qualité et la sécurité guident les échanges et le travail sur site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
