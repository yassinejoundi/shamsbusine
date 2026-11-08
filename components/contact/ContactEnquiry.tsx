import { QuoteForm } from "@/components/home/QuoteForm";

export function ContactEnquiry({ contactEmail }: { contactEmail: string }) {
  return (
    <section id="devis" className="contact-enquiry" aria-labelledby="contact-enquiry-title">
      <div className="frame contact-enquiry-layout">
        <div className="contact-enquiry-copy" data-reveal="left">
          <h2 id="contact-enquiry-title">Un premier échange utile.</h2>
          <p>Partagez vos coordonnées, la ville du chantier et le type de projet à chiffrer.</p>
        </div>
        <div className="contact-enquiry-form" aria-labelledby="contact-form-title" data-reveal="wipe-right" data-reveal-delay="1">
          <h3 id="contact-form-title">Décrire mon projet</h3>
          <QuoteForm contactEmail={contactEmail} />
        </div>
      </div>
    </section>
  );
}
