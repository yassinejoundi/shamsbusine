import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { contact } from "@/lib/site";
import { QuoteForm } from "./QuoteForm";
import { Arrow } from "@/components/site/Arrow";

export function QuoteSection() {
  return (
    <section className="quote-section section-space" id="devis" aria-labelledby="quote-title">
      <div className="frame quote-layout">
        <div className="quote-copy">
          <h2 id="quote-title" data-reveal>Parlons de<br />votre projet.</h2>
          <p data-reveal>Une construction à imaginer, un lieu à transformer ? Donnez-nous les premiers éléments pour préparer notre échange.</p>
          <div className="contact-links" data-reveal>
            <a href={contact.phoneHref}><FontAwesomeIcon icon={faPhone} aria-hidden="true" /> {contact.phone}</a>
            <a className="text-link" href={contact.whatsapp}>Échanger sur WhatsApp <Arrow /></a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
