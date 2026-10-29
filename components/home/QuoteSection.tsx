import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faCommentDots, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { contact } from "@/lib/site";
import { QuoteForm } from "./QuoteForm";

export function QuoteSection() {
  return (
    <section className="quote-section" id="devis" data-motion-section="quote" aria-labelledby="quote-title">
      <div className="frame quote-layout">
        <div className="quote-copy">
          <h2 id="quote-title" data-reveal>Bâtissons<br />la suite.</h2>
          <p data-reveal>Construction, rénovation ou aménagement : racontez-nous votre besoin pour préciser ensemble les prochaines étapes.</p>
          <div className="contact-links">
            <a href={contact.phoneHref} data-reveal><FontAwesomeIcon icon={faPhone} aria-hidden="true" /> {contact.phone}</a>
            <a href={contact.whatsapp} data-reveal><FontAwesomeIcon icon={faCommentDots} aria-hidden="true" /> Échanger sur WhatsApp</a>
            <a href={`mailto:${contact.email}`} data-reveal><FontAwesomeIcon icon={faEnvelope} aria-hidden="true" /> {contact.email}</a>
          </div>
          <address className="quote-address">
            <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" data-reveal />
            <span>
              <strong data-reveal>Notre adresse</strong>
              <span data-reveal>3e étage, bureau 509,<br />quartier industriel, 2 Rue Sidi Ghanem,<br />Marrakech 40000</span>
            </span>
          </address>
        </div>
        <div className="quote-form-panel">
          <div className="quote-form-heading">
            <h3 id="quote-form-title" data-reveal>Les détails du projet</h3>
            <p data-reveal>Tous les champs sont nécessaires pour préparer votre demande.</p>
          </div>
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
