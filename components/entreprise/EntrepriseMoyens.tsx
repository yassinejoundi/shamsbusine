const equipment = [
  {
    title: "Préparer le terrain",
    description: "Pelles mécaniques, JCB, Bobcat et compacteurs.",
  },
  {
    title: "Coffrer et bâtir",
    description: "Grues, panneaux de coffrage, poutres H20, étais métalliques et vibrateurs à béton.",
  },
  {
    title: "Organiser le chantier",
    description: "Échafaudages, bureaux de chantier, compresseurs, postes à souder et pick-ups.",
  },
] as const;

export function EntrepriseMoyens() {
  return (
    <section className="entreprise-moyens" aria-labelledby="entreprise-moyens-title">
      <div className="frame">
        <div className="entreprise-moyens-intro">
          <h2 id="entreprise-moyens-title" data-reveal="left">Des moyens sur le terrain.</h2>
          <p data-reveal="right">
            Terrassement, coffrage, levage et organisation : les équipements accompagnent les
            différentes phases des travaux.
          </p>
        </div>
        <ul className="entreprise-moyens-list">
          {equipment.map(({ title, description }, index) => (
            <li key={title} data-reveal={index % 2 === 0 ? "left" : "right"} data-reveal-delay={String(index)}>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
