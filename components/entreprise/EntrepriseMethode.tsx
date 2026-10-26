const stages = [
  {
    title: "D’abord, étudier et chiffrer.",
    description: "Comprendre le besoin, étudier les aspects techniques et établir un devis détaillé.",
  },
  {
    title: "Puis, réaliser et coordonner.",
    description: "Organiser les travaux et coordonner les corps de métier selon le périmètre retenu.",
  },
  {
    title: "Enfin, contrôler et réceptionner.",
    description: "Suivre les points de contrôle et préparer la réception des travaux.",
  },
] as const;

export function EntrepriseMethode() {
  return (
    <section className="entreprise-methode" aria-labelledby="entreprise-methode-title">
      <div className="frame">
        <div className="entreprise-methode-intro">
          <h2 id="entreprise-methode-title" data-reveal>Du besoin à la réception.</h2>
          <p data-reveal>Un cadre pour avancer étape par étape, du premier chiffrage à la coordination sur site, jusqu’aux vérifications de fin de travaux.</p>
        </div>
        <ol className="entreprise-stages">
          {stages.map(({ title, description }) => (
            <li key={title} data-reveal>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
