import Image from "next/image";

export function EntrepriseApproche() {
  return (
    <section className="entreprise-approche" aria-labelledby="entreprise-approche-title">
      <div className="frame">
        <h2 id="entreprise-approche-title" data-reveal>Construire et rénover.</h2>
        <p className="entreprise-approche-lead" data-reveal>Shams Busine accompagne les projets résidentiels, commerciaux et professionnels, du gros œuvre aux finitions.</p>
        <div className="entreprise-approche-tiles">
          <figure className="entreprise-approche-figure">
            <div className="photo entreprise-approche-photo" data-reveal>
              <Image
                src="/images/chantier-structure.webp"
                alt="Structure en béton en cours de réalisation, entourée d’échafaudages."
                fill
                sizes="(max-width: 699px) 90vw, 50vw"
              />
            </div>
            <figcaption data-reveal>Structure et mise en œuvre</figcaption>
          </figure>
          <div className="entreprise-approche-facts" data-reveal>
            <h3>Un cadre clair.</h3>
            <p>Qualité, dialogue transparent et sécurité guident la préparation et la conduite des travaux.</p>
            <dl>
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
                <dd>De la structure aux finitions</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
