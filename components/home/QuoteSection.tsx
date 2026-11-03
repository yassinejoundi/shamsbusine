import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faCommentDots, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { contact } from "@/lib/site";
import { QuoteForm } from "./QuoteForm";
import { ScrollSection } from "./ScrollSection";

export function QuoteSection() {
  return (
    <ScrollSection animation="quote" className="quote-section" id="devis" aria-labelledby="quote-title">
      <div className="frame quote-layout">
        <div className="quote-copy">
          <h2 id="quote-title" data-scroll-item>Bâtissons<br />la suite.</h2>
          <p data-scroll-item>Construction, rénovation ou aménagement : racontez-nous votre besoin pour préciser ensemble les prochaines étapes.</p>
          <div className="contact-links">
            <a href={contact.phoneHref} data-scroll-item><FontAwesomeIcon icon={faPhone} aria-hidden="true" /> {contact.phone}</a>
            <a href={contact.whatsapp} data-scroll-item><FontAwesomeIcon icon={faCommentDots} aria-hidden="true" /> Échanger sur WhatsApp</a>
            <a href={`mailto:${contact.email}`} data-scroll-item><FontAwesomeIcon icon={faEnvelope} aria-hidden="true" /> {contact.email}</a>
          </div>
          <address className="quote-address">
            <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" data-scroll-item />
            <span>
              <strong data-scroll-item>Notre adresse</strong>
              <span data-scroll-item>3e étage, bureau 509,<br />quartier industriel, 2 Rue Sidi Ghanem,<br />Marrakech 40000</span>
            </span>
          </address>
        </div>
        <div className="quote-form-panel">
          <div className="quote-form-heading">
            <h3 id="quote-form-title" data-scroll-item>Les détails du projet</h3>
            <p data-scroll-item>Tous les champs sont nécessaires pour préparer votre demande.</p>
          </div>
          <QuoteForm />
        </div>
      </div>
    </ScrollSection>
  );
}
