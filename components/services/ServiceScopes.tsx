import { serviceScopes } from "./service-content";

export function ServiceScopes() {
  return (
    <section className="frame section-space services-scopes" id="metiers" aria-labelledby="scopes-heading">
      <div className="section-intro">
        <h2 id="scopes-heading">Les métiers<br />du projet.</h2>
        <p>Découvrez les principaux travaux associés à nos six métiers, de la structure aux finitions.</p>
      </div>
      <div className="services-scope-layout">
        <nav className="services-scope-index" aria-label="Accès direct aux six métiers">
          <ul>
            {serviceScopes.map(({ id, title }) => <li key={id}><a href={`#${id}`}>{title}</a></li>)}
          </ul>
        </nav>
        <div className="services-scope-grid">
          {serviceScopes.map(({ id, title, description, scope }) => (
            <article id={id} key={id} className="services-scope-entry">
              <div className="services-scope-copy">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <ul className="services-scope-list">
                {scope.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
