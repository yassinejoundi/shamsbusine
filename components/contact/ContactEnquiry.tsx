import { QuoteForm } from "@/components/home/QuoteForm";

export function ContactEnquiry() {
  return (
    <section id="devis" className="contact-enquiry" aria-labelledby="contact-enquiry-title">
      <div className="frame contact-enquiry-layout">
        <div className="contact-enquiry-copy">
          <h2 id="contact-enquiry-title" data-reveal>Un premier échange utile.</h2>
          <p data-reveal>Indiquez le type de travaux, la ville du chantier et le moyen de contact que vous préférez.</p>
        </div>
        <div className="contact-enquiry-form" aria-labelledby="contact-form-title">
          <h3 id="contact-form-title" data-reveal>Décrire mon projet</h3>
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
