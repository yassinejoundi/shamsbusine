import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faCommentDots, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { contact } from "@/lib/site";
import { QuoteForm } from "./QuoteForm";
import { cmsText, type CmsValues } from "@/lib/cms/content";

export function QuoteSection({ content }: { content: CmsValues }) {
  return (
    <section className="quote-section" id="devis" aria-labelledby="quote-title">
      <div className="frame quote-layout">
        <div className="quote-copy" data-reveal="left">
          <h2 id="quote-title">{cmsText(content, "quote.title1")}<br />{cmsText(content, "quote.title2")}</h2>
          <p>{cmsText(content, "quote.intro")}</p>
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
            <h3 id="quote-form-title">{cmsText(content, "quote.formTitle")}</h3>
            <p>{cmsText(content, "quote.formIntro")}</p>
          </div>
          <QuoteForm copy={{
            formLabel: cmsText(content, "quote.formLabel"),
            nameLabel: cmsText(content, "quote.nameLabel"),
            cityLabel: cmsText(content, "quote.cityLabel"),
            phoneLabel: cmsText(content, "quote.phoneLabel"),
            emailLabel: cmsText(content, "quote.emailLabel"),
            typeLabel: cmsText(content, "quote.typeLabel"),
            typePlaceholder: cmsText(content, "quote.typePlaceholder"),
            descriptionLabel: cmsText(content, "quote.descriptionLabel"),
            descriptionPlaceholder: cmsText(content, "quote.descriptionPlaceholder"),
            attachmentsLabel: cmsText(content, "quote.attachmentsLabel"),
            attachmentsNote: cmsText(content, "quote.attachmentsNote"),
            submitLabel: cmsText(content, "quote.submitLabel"),
          }} />
        </div>
      </div>
    </section>
  );
}
