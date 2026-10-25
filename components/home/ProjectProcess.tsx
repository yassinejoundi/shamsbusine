const stages = [
  { title: "D’abord, comprendre.", text: "Votre besoin, vos plans, les contraintes du site. L’étude technique pose les bases d’un devis détaillé et d’un planning adapté." },
  { title: "Puis, construire.", text: "Les travaux s’organisent et les corps de métier se coordonnent. Les échanges et les points de suivi accompagnent l’avancement du chantier." },
  { title: "Enfin, réceptionner.", text: "Les ouvrages sont contrôlés et les finitions examinées. Nous préparons ensemble la réception des travaux." },
];

export function ProjectProcess() {
  return (
    <section className="process frame section-space" aria-labelledby="process-title">
      <div className="section-intro">
        <h2 id="process-title" data-reveal>Votre chantier,<br />accompagné.</h2>
        <p data-reveal>Un projet commence par un échange. Il avance avec un périmètre défini, des travaux coordonnés et des contrôles.</p>
      </div>
      <ol className="process-steps">
        {stages.map(({ title, text }) => <li key={title}><h3 data-reveal>{title}</h3><p data-reveal>{text}</p></li>)}
      </ol>
    </section>
  );
}
