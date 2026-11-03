const stages = [
  {
    title: "Étudier et chiffrer.",
    description: "Analyser le besoin, étudier les aspects techniques et préparer un devis détaillé.",
  },
  {
    title: "Réaliser et coordonner.",
    description: "Organiser les travaux et coordonner les corps de métier selon le périmètre retenu.",
  },
  {
    title: "Contrôler et réceptionner.",
    description: "Suivre les points de contrôle et préparer la réception des travaux.",
  },
] as const;

export function EntrepriseMethode() {
  return (
    <section id="methode" className="entreprise-methode" aria-labelledby="entreprise-methode-title">
      <div className="frame">
        <div className="entreprise-methode-intro">
          <h2 id="entreprise-methode-title">
            Un chantier, un fil conducteur.
          </h2>
          <p>
            Étude du besoin, organisation du chantier et points de contrôle structurent chaque étape.
          </p>
        </div>
        <ol className="entreprise-stages">
          {stages.map(({ title, description }) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
