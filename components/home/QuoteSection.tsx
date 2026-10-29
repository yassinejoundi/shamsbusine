import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { contact } from "@/lib/site";
import { QuoteForm } from "./QuoteForm";

export function QuoteSection() {
  return (
    <section className="quote-section" id="devis" aria-labelledby="quote-title">
      <div className="frame quote-layout">
        <div className="quote-copy">
          <h2 id="quote-title" data-reveal>Votre projet<br />commence ici.</h2>
          <p data-reveal>Un terrain, des plans, une envie de rénover ? Racontez-nous votre projet pour préparer un premier échange.</p>
          <div className="contact-links" data-reveal>
            <a href={contact.phoneHref}><FontAwesomeIcon icon={faPhone} aria-hidden="true" /> {contact.phone}</a>
            <a href={contact.whatsapp}><FontAwesomeIcon icon={faCommentDots} aria-hidden="true" /> Échanger sur WhatsApp</a>
            <a href={`mailto:${contact.email}`}><FontAwesomeIcon icon={faEnvelope} aria-hidden="true" /> {contact.email}</a>
          </div>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
