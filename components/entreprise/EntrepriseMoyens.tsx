import { cmsText, type CmsValues } from "@/lib/cms/content";

export function EntrepriseMoyens({ content }: { content: CmsValues }) {
  return (
    <section className="entreprise-moyens" aria-labelledby="entreprise-moyens-title">
      <div className="frame">
        <div className="entreprise-moyens-intro">
          <h2 id="entreprise-moyens-title" data-reveal="left">{cmsText(content, "equipment.title")}</h2>
          <p data-reveal="right">
            {cmsText(content, "equipment.intro")}
          </p>
        </div>
        <ul className="entreprise-moyens-list">
          {[0, 1, 2].map((index) => (
            <li key={index} data-reveal={index % 2 === 0 ? "left" : "right"} data-reveal-delay={String(index)}>
              <h3>{cmsText(content, `equipment.${index}.title`)}</h3>
              <p>{cmsText(content, `equipment.${index}.description`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
