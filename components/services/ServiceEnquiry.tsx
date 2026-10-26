import Link from "next/link";
import { contact } from "@/lib/site";
import { Arrow } from "@/components/site/Arrow";

export function ServiceEnquiry() {
  return (
    <section className="section-space services-enquiry" aria-labelledby="enquiry-heading">
      <div className="frame services-enquiry-layout">
        <div>
          <h2 id="enquiry-heading" data-reveal>Parler de<br />mon projet.</h2>
          <p data-reveal>Un projet à Marrakech ou ailleurs&nbsp;? Précisons ensemble les travaux et les possibilités d’intervention.</p>
        </div>
        <div className="services-enquiry-details">
          <p data-reveal>Pour commencer, partagez&nbsp;:</p>
          <ul data-reveal><li>La ville et le type de bâtiment</li><li>Les travaux envisagés et l’état du projet</li><li>Les plans ou les photos disponibles</li></ul>
          <Link href="/contact/#devis" className="button services-quote-action" data-reveal>Demander un devis <Arrow /></Link>
          <a href={contact.phoneHref} data-reveal>{contact.phone}</a>
          <a href={`mailto:${contact.email}`} data-reveal>{contact.email}</a>
        </div>
      </div>
    </section>
  );
}
