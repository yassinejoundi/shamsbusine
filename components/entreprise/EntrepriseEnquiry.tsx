import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";

export function EntrepriseEnquiry() {
  return (
    <section className="entreprise-enquiry" aria-labelledby="entreprise-enquiry-title">
      <div className="frame entreprise-enquiry-layout">
        <div className="entreprise-enquiry-copy">
          <h2 id="entreprise-enquiry-title">Parlons de votre projet.</h2>
          <p>
            Indiquez la ville, les travaux envisagés et le stade d’avancement pour cadrer le premier échange.
          </p>
        </div>
        <div className="entreprise-enquiry-actions">
          <Link className="button" href="/contact/#devis">
            Demander un devis <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
