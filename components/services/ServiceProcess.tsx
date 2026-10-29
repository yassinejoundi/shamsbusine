export function ServiceProcess() {
  return (
    <section className="section-space services-process-section" aria-labelledby="delivery-heading">
      <div className="frame">
        <div className="services-process-intro">
          <h2 id="delivery-heading" data-reveal>Du besoin<br />au chantier.</h2>
          <p data-reveal>De la définition du besoin à la réception, les étapes se précisent selon le périmètre de votre projet.</p>
        </div>
        <ol className="services-process-list">
          <li><h3 data-reveal>Comprendre & chiffrer</h3><p data-reveal>Nous examinons le besoin, les plans disponibles et les contraintes du site pour préciser le périmètre et préparer le devis.</p></li>
          <li><h3 data-reveal>Organiser & réaliser</h3><p data-reveal>Les interventions sont planifiées et les corps de métier coordonnés selon les étapes retenues pour votre chantier.</p></li>
          <li><h3 data-reveal>Contrôler & réceptionner</h3><p data-reveal>Les points de contrôle et la réception permettent de revoir les travaux réalisés au regard du périmètre convenu.</p></li>
        </ol>
      </div>
    </section>
  );
}
