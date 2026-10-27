import Image from "next/image";

const stages = [
  {
    title: "Étudier & chiffrer",
    text: "Nous échangeons autour de votre besoin, de vos plans et des contraintes du site. L’étude technique prépare un devis détaillé et un planning adapté.",
  },
  {
    title: "Réaliser & coordonner",
    text: "Les travaux s’organisent selon le périmètre retenu. Les corps de métier sont coordonnés et les échanges accompagnent l’avancement du chantier.",
  },
  {
    title: "Contrôler & réceptionner",
    text: "Les ouvrages sont contrôlés, les finitions examinées et la réception des travaux préparée avec vous.",
  },
];

export function ProjectProcess() {
  return (
    <section className="process" aria-labelledby="process-title">
      <div className="frame">
        <div className="process-intro">
          <h2 id="process-title" data-reveal>Un chantier,<br />un fil conducteur.</h2>
          <p data-reveal>De l’analyse du besoin aux contrôles de fin de chantier, chaque étape prépare la suivante.</p>
        </div>

        <div className="process-layout">
          <figure className="process-figure" data-reveal>
            <div className="photo process-photo">
              <Image
                src="/images/techniciens-chantier.webp"
                alt="Deux techniciens en tenue jaune, vus de dos, observent un chantier."
                fill
                sizes="(max-width: 699px) 100vw, (max-width: 1099px) 44vw, 40vw"
              />
            </div>
            <figcaption>Visuel illustratif — une équipe sur le terrain.</figcaption>
          </figure>

          <ol className="process-steps">
            {stages.map(({ title, text }) => (
              <li key={title}>
                <h3 data-reveal>{title}</h3>
                <p data-reveal>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
