import { cmsText, type CmsValues } from "@/lib/cms/content";

export function EntrepriseMethode({ content }: { content: CmsValues }) {
  return (
    <section id="methode" className="entreprise-methode" aria-labelledby="entreprise-methode-title">
      <div className="frame">
        <div className="entreprise-methode-intro">
          <h2 id="entreprise-methode-title" data-reveal="left">
            {cmsText(content, "method.title")}
          </h2>
          <p data-reveal="right">
            {cmsText(content, "method.intro")}
          </p>
        </div>
        <ol className="entreprise-stages">
        {[0, 1, 2].map((index) => (
          <li key={index} data-reveal="right" data-reveal-delay={String(index)}>
              <h3>{cmsText(content, `method.${index}.title`)}</h3>
              <p>{cmsText(content, `method.${index}.description`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
