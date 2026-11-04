import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";
import { contact } from "@/lib/site";
import { cmsText, type CmsValues } from "@/lib/cms/content";

export function ServiceEnquiry({ content }: { content: CmsValues }) {
  return (
    <section className="services-enquiry" aria-labelledby="enquiry-heading">
      <div className="frame services-enquiry-layout">
        <div className="services-enquiry-intro" data-reveal="left">
          <h2 id="enquiry-heading">{cmsText(content, "enquiry.title1")}<br />{cmsText(content, "enquiry.title2")}</h2>
          <p>{cmsText(content, "enquiry.intro")}</p>
        </div>

        <div className="services-enquiry-details" data-reveal="right" data-reveal-delay="1">
          <h3>{cmsText(content, "enquiry.detailsTitle")}</h3>
          <p className="services-enquiry-prompt">{cmsText(content, "enquiry.prompt")}</p>
          <ul>
            {[0, 1, 2].map((index) => <li key={index}><strong>{cmsText(content, `enquiry.${index}.label`)}</strong><span>{cmsText(content, `enquiry.${index}.text`)}</span></li>)}
          </ul>
          <div className="services-enquiry-contact">
            <Link href="/contact/#devis" className="button services-quote-action">{cmsText(content, "enquiry.action")} <Arrow /></Link>
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
