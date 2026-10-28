import { DisclosureIcon } from "@/components/site/DisclosureIcon";
import { serviceScopes } from "./service-content";

export function ServiceScopes() {
  return (
    <section className="frame section-space services-scopes" id="metiers" aria-labelledby="scopes-heading">
      <div className="section-intro">
        <h2 id="scopes-heading" data-reveal>Les métiers<br />du projet.</h2>
        <p data-reveal>Six domaines d’intervention, du gros œuvre aux finitions. Parcourez les métiers et les travaux associés à votre projet.</p>
      </div>
      <div className="services-scope-layout">
        <nav className="services-scope-index" aria-label="Accès direct aux six métiers" data-reveal>
          <ul>
            {serviceScopes.map(({ id, title }) => <li key={id}><a href={`#${id}`}>{title}</a></li>)}
          </ul>
        </nav>
        <div className="services-scope-grid">
          {serviceScopes.map(({ id, title, description, scope }) => (
            <article id={id} key={id} className="services-scope-entry">
              <div className="services-scope-copy">
                <h3 data-reveal>{title}</h3>
                <p data-reveal>{description}</p>
              </div>
              <details data-reveal>
                <summary aria-label={`Travaux compris : ${title}`}>Travaux compris <DisclosureIcon /></summary>
                <ul>{scope.map((item) => <li key={item}>{item}</li>)}</ul>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
