import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faCommentDots, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { contact } from "@/lib/site";
import { QuoteForm } from "./QuoteForm";

export function QuoteSection() {
  return (
    <section className="quote-section" id="devis" aria-labelledby="quote-title">
      <div className="frame quote-layout">
        <div className="quote-copy" data-reveal="left">
          <h2 id="quote-title">Bâtissons<br />la suite.</h2>
          <p>Construction, rénovation ou aménagement : racontez-nous votre besoin pour préciser ensemble les prochaines étapes.</p>
          <div className="contact-links">
            <a href={contact.phoneHref}><FontAwesomeIcon icon={faPhone} aria-hidden="true" /> {contact.phone}</a>
            <a href={contact.whatsapp}><FontAwesomeIcon icon={faCommentDots} aria-hidden="true" /> Échanger sur WhatsApp</a>
            <a href={`mailto:${contact.email}`}><FontAwesomeIcon icon={faEnvelope} aria-hidden="true" /> {contact.email}</a>
          </div>
          <address className="quote-address">
            <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />
            <span>
              <strong>Notre adresse</strong>
              <span>3e étage, bureau 509,<br />quartier industriel, 2 Rue Sidi Ghanem,<br />Marrakech 40000</span>
            </span>
          </address>
        </div>
        <div className="quote-form-panel" data-reveal="wipe-right" data-reveal-delay="1">
          <div className="quote-form-heading">
            <h3 id="quote-form-title">Les détails du projet</h3>
            <p>Décrivez votre projet. Vous pouvez joindre des plans ou des photos.</p>
          </div>
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
