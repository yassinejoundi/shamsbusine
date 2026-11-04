import { serviceScopes } from "./service-content";
import { cmsText, type CmsValues } from "@/lib/cms/content";

export function ServiceScopes({ content }: { content: CmsValues }) {
  return (
    <section className="frame section-space services-scopes" id="metiers" aria-labelledby="scopes-heading">
      <div className="section-intro">
        <h2 id="scopes-heading" data-reveal="left">{cmsText(content, "scopes.title1")}<br />{cmsText(content, "scopes.title2")}</h2>
        <p data-reveal="right">{cmsText(content, "scopes.intro")}</p>
      </div>
      <div className="services-scope-layout">
        <nav className="services-scope-index" aria-label="Accès direct aux six métiers" data-reveal="left">
          <ul>
            {serviceScopes.map(({ id }, index) => <li key={id}><a href={`#${id}`}>{cmsText(content, `scope.${index}.title`)}</a></li>)}
          </ul>
        </nav>
        <div className="services-scope-grid">
          {serviceScopes.map(({ id }, index) => (
            <article id={id} key={id} className="services-scope-entry" data-reveal={index % 2 === 0 ? "left" : "right"} data-reveal-delay={String(index % 4)}>
              <div className="services-scope-copy">
                <h3>{cmsText(content, `scope.${index}.title`)}</h3>
                <p>{cmsText(content, `scope.${index}.description`)}</p>
              </div>
              <ul className="services-scope-list">
                {[0, 1, 2].map((item) => <li key={item}>{cmsText(content, `scope.${index}.item${item}`)}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
