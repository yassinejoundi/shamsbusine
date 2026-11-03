import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";
import { contact } from "@/lib/site";

export function ServiceEnquiry() {
  return (
    <section className="services-enquiry" aria-labelledby="enquiry-heading">
      <div className="frame services-enquiry-layout">
        <div className="services-enquiry-intro" data-reveal="left">
          <h2 id="enquiry-heading">Parlons de<br />votre projet.</h2>
          <p>À Marrakech ou ailleurs, précisons ensemble votre besoin et les prochaines étapes.</p>
        </div>

        <div className="services-enquiry-details" data-reveal="right" data-reveal-delay="1">
          <h3>Les premiers repères</h3>
          <p className="services-enquiry-prompt">Pour préparer notre échange, partagez&nbsp;:</p>
          <ul>
            <li><strong>Lieu</strong><span>La ville et le type de bâtiment</span></li>
            <li><strong>Travaux</strong><span>Ce que vous souhaitez construire ou transformer</span></li>
            <li><strong>Avancement</strong><span>Où vous en êtes et les documents disponibles</span></li>
          </ul>
          <div className="services-enquiry-contact">
            <Link href="/contact/#devis" className="button services-quote-action">Demander un devis <Arrow /></Link>
            <address>
              <a href={contact.phoneHref}>{contact.phone}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}
