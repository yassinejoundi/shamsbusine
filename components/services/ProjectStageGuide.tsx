import { Arrow } from "@/components/site/Arrow";
import { cmsText, type CmsValues } from "@/lib/cms/content";

const stageLinks = ["#conseil-etudes-suivi", "#gros-oeuvre", "#renovation-finitions"];

export function ProjectStageGuide({ content }: { content: CmsValues }) {
  return (
    <section className="section-space services-stage" aria-labelledby="stage-heading">
      <div className="frame">
        <div className="services-stage-intro">
          <h2 id="stage-heading" data-reveal="left">{cmsText(content, "stage.title1")}<br />{cmsText(content, "stage.title2")}</h2>
          <p data-reveal="right">{cmsText(content, "stage.intro")}</p>
        </div>
        <nav aria-label="Choisir un point de départ">
          <ul className="services-stage-links">
            {stageLinks.map((href, index) => (
              <li key={href} data-reveal={index % 2 === 0 ? "left" : "right"} data-reveal-delay={String(index)}>
                <a href={href}>
                  <span className="services-stage-title">{cmsText(content, `stage.${index}.title`)}</span>
                  <span className="services-stage-detail">{cmsText(content, `stage.${index}.detail`)}</span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
