import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";
import { cmsText, type CmsValues } from "@/lib/cms/content";

export function EntrepriseEnquiry({ content }: { content: CmsValues }) {
  return (
    <section className="entreprise-enquiry" aria-labelledby="entreprise-enquiry-title">
      <div className="frame entreprise-enquiry-layout">
        <div className="entreprise-enquiry-copy" data-reveal="left">
          <h2 id="entreprise-enquiry-title">{cmsText(content, "enquiry.title")}</h2>
          <p>
            {cmsText(content, "enquiry.intro")}
          </p>
        </div>
        <div className="entreprise-enquiry-actions" data-reveal="right" data-reveal-delay="1">
          <Link className="button" href="/contact/#devis">
            {cmsText(content, "enquiry.action")} <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
