import { DisclosureIcon } from "@/components/site/DisclosureIcon";
import { serviceScopes } from "./service-content";

export function ServiceScopes() {
  return (
    <section className="frame section-space services-scopes" id="metiers" aria-labelledby="scopes-heading">
      <div className="section-intro">
        <h2 id="scopes-heading" data-reveal>Les métiers<br />du projet.</h2>
        <p data-reveal>Un ensemble de savoir-faire complémentaires. Retrouvez le périmètre qui correspond à vos travaux.</p>
      </div>
      <nav className="services-scope-index" aria-label="Accès aux six métiers" data-reveal>
        {serviceScopes.map(({ id, title }) => <a href={`#${id}`} key={id}>{title}</a>)}
      </nav>
      <div className="services-scope-grid">
        {serviceScopes.map(({ id, title, description, scope }) => (
          <article id={id} key={id} className="services-scope-entry">
            <h3 data-reveal>{title}</h3>
            <p data-reveal>{description}</p>
            <details data-reveal>
              <summary aria-label={`Travaux compris : ${title}`}>Travaux compris <DisclosureIcon /></summary>
              <ul>{scope.map((item) => <li key={item}>{item}</li>)}</ul>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
