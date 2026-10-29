import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";
import { contact } from "@/lib/site";

export function ServiceEnquiry() {
  return (
    <section className="section-space services-enquiry" aria-labelledby="enquiry-heading">
      <div className="frame services-enquiry-layout">
        <div className="services-enquiry-intro">
          <h2 id="enquiry-heading" data-reveal>Parlons de<br />votre projet.</h2>
          <p data-reveal>À Marrakech ou ailleurs, précisons ensemble votre besoin et les prochaines étapes.</p>
        </div>

        <div className="services-enquiry-details">
          <h3 data-reveal>Les premiers repères</h3>
          <p className="services-enquiry-prompt" data-reveal>Pour préparer notre échange, partagez&nbsp;:</p>
          <ul>
            <li data-reveal><strong>Lieu</strong><span>La ville et le type de bâtiment</span></li>
            <li data-reveal><strong>Travaux</strong><span>Ce que vous souhaitez construire ou transformer</span></li>
            <li data-reveal><strong>Avancement</strong><span>Où vous en êtes et les documents disponibles</span></li>
          </ul>
          <div className="services-enquiry-contact">
            <Link href="/contact/#devis" className="button services-quote-action" data-reveal>Demander un devis <Arrow /></Link>
            <address data-reveal>
              <a href={contact.phoneHref}>{contact.phone}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}
