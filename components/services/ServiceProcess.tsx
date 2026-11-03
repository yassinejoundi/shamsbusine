export function ServiceProcess() {
  return (
    <section className="section-space services-process-section" aria-labelledby="delivery-heading">
      <div className="frame">
        <div className="services-process-intro">
          <h2 id="delivery-heading" data-reveal="left">Du besoin<br />au chantier.</h2>
          <p data-reveal="right">De la définition du besoin à la réception, les étapes se précisent selon le périmètre de votre projet.</p>
        </div>
        <ol className="services-process-list">
          <li data-reveal="right">
            <h3>Comprendre & chiffrer</h3>
            <p>Nous examinons le besoin, les plans disponibles et les contraintes du site pour préciser le périmètre et préparer le devis.</p>
          </li>
          <li data-reveal="right" data-reveal-delay="1">
            <h3>Organiser & réaliser</h3>
            <p>Les interventions sont planifiées et les corps de métier coordonnés selon les étapes retenues pour votre chantier.</p>
          </li>
          <li data-reveal="right" data-reveal-delay="2">
            <h3>Contrôler & réceptionner</h3>
            <p>Les points de contrôle et la réception permettent de revoir les travaux réalisés au regard du périmètre convenu.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}
