import Image from "next/image";

const partners = [
  { name: "Agence d’architecture", src: "/images/partners/partner-agence-architecture.png" },
  { name: "Sonasid", src: "/images/partners/partner-sonasid.png" },
  { name: "Ménara Préfa", src: "/images/partners/partner-menara-prefa.png" },
  { name: "Beldi Fusion Kitchen", src: "/images/partners/partner-beldi-fusion-kitchen.png" },
  { name: "Chaoua Briques", src: "/images/partners/partner-chaoua-briques.png" },
  { name: "Royaume du Maroc, ministère de l’Éducation nationale, du Préscolaire et des Sports", src: "/images/partners/partner-ministere-education.png" },
  { name: "Planète Montessori International School", src: "/images/partners/partner-planete-montessori.png" },
  { name: "Mega Engineering", src: "/images/partners/partner-mega-engineering.png" },
  { name: "Association Al Nadi Al Baydaoui de Marrakech", src: "/images/partners/partner-association-alnadi.png" },
  { name: "Laboratoire privé d’analyses et d’essais, L.P.A.E. Agadir", src: "/images/partners/partner-lpae.png" },
  { name: "ART BÉTON, études et travaux béton", src: "/images/partners/partner-art-beton.png" },
  { name: "Tecnitas", src: "/images/partners/partner-tecnitas.png" },
  { name: "Labo Control, laboratoire d’essais, analyses et de contrôle", src: "/images/partners/partner-labo-control.png" },
  { name: "3D Concept", src: "/images/partners/partner-3d-concept.png" },
  { name: "Magriser, systèmes d’irrigation", src: "/images/partners/partner-magriser.png" },
  { name: "Cogetis, systèmes d’étanchéité", src: "/images/partners/partner-cogetis.png" },
  { name: "Carripréfa", src: "/images/partners/partner-carriprefa.png" },
];

export function EntreprisePartenaires() {
  return (
    <section id="partenaires" className="entreprise-partenaires" aria-labelledby="entreprise-partenaires-title">
      <div className="frame">
        <div className="entreprise-partenaires-intro">
          <h2 id="entreprise-partenaires-title" data-reveal>Nos partenaires.</h2>
          <p data-reveal>Ils nous font confiance pour leurs projets de construction.</p>
        </div>
        <ul className="entreprise-partenaires-list">
          {partners.map((partner) => (
            <li key={partner.src} className="entreprise-partenaires-logo-item" data-reveal>
              <Image
                className="entreprise-partenaires-logo"
                src={partner.src}
                alt={partner.name}
                width={300}
                height={300}
                sizes="(max-width: 699px) 45vw, (max-width: 899px) 22vw, 14vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
