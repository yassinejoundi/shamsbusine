import Image from "next/image";

export function EntrepriseApproche() {
  return (
    <section id="equipe" className="entreprise-approche" aria-labelledby="entreprise-approche-title">
      <div className="frame">
        <div className="entreprise-approche-intro">
          <h2 id="entreprise-approche-title" data-reveal="left">Le chantier avance en équipe.</h2>
          <p data-reveal="right">
            Ingénieurs BTP, techniciens spécialisés, chefs de chantier et ouvriers qualifiés
            réunissent leurs compétences autour de chaque projet.
          </p>
        </div>
        <figure className="entreprise-approche-figure" data-reveal="wipe-left">
          <div className="photo entreprise-approche-photo">
            <Image
              src="/images/entreprise-approche.webp"
              alt="Trois personnes travaillent autour d’un échafaudage sur un chantier de construction."
              fill
              sizes="(max-width: 699px) 100vw, 91vw"
            />
          </div>
          <figcaption>Une structure en cours de réalisation, avec échafaudage.</figcaption>
        </figure>
        <p className="entreprise-approche-note" data-reveal="right" data-reveal-delay="1">
          La confiance, la qualité et la sécurité guident les échanges et le travail sur site.
        </p>
      </div>
    </section>
  );
}
