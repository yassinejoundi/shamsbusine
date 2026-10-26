import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";

export function EntrepriseEnquiry() {
  return (
    <section className="entreprise-enquiry" aria-labelledby="entreprise-enquiry-title">
      <div className="frame entreprise-enquiry-layout">
        <h2 id="entreprise-enquiry-title" data-reveal>Pour démarrer, décrivez les travaux, la ville et le calendrier.</h2>
        <div className="entreprise-enquiry-actions">
          <Link className="button" href="/#devis" data-reveal>Décrire mon projet <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
