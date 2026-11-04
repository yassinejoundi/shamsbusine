import { cmsText, type CmsValues } from "@/lib/cms/content";

export function ServiceProcess({ content }: { content: CmsValues }) {
  return (
    <section className="section-space services-process-section" aria-labelledby="delivery-heading">
      <div className="frame">
        <div className="services-process-intro">
          <h2 id="delivery-heading" data-reveal="left">{cmsText(content, "process.title1")}<br />{cmsText(content, "process.title2")}</h2>
          <p data-reveal="right">{cmsText(content, "process.intro")}</p>
        </div>
        <ol className="services-process-list">
          {[0, 1, 2].map((index) => (
            <li key={index} data-reveal="right" data-reveal-delay={String(index)}>
              <h3>{cmsText(content, `process.step${index}.title`)}</h3>
              <p>{cmsText(content, `process.step${index}.text`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
