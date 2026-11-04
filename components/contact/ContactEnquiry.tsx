import { QuoteForm } from "@/components/home/QuoteForm";
import { cmsText, type CmsValues } from "@/lib/cms/content";

export function ContactEnquiry({ content }: { content: CmsValues }) {
  return (
    <section id="devis" className="contact-enquiry" aria-labelledby="contact-enquiry-title">
      <div className="frame contact-enquiry-layout">
        <div className="contact-enquiry-copy" data-reveal="left">
          <h2 id="contact-enquiry-title">{cmsText(content, "enquiry.title")}</h2>
          <p>{cmsText(content, "enquiry.intro")}</p>
        </div>
        <div className="contact-enquiry-form" aria-labelledby="contact-form-title" data-reveal="wipe-right" data-reveal-delay="1">
          <h3 id="contact-form-title">{cmsText(content, "enquiry.formTitle")}</h3>
          <QuoteForm copy={{
            formLabel: cmsText(content, "enquiry.formLabel"),
            nameLabel: cmsText(content, "enquiry.nameLabel"),
            cityLabel: cmsText(content, "enquiry.cityLabel"),
            phoneLabel: cmsText(content, "enquiry.phoneLabel"),
            emailLabel: cmsText(content, "enquiry.emailLabel"),
            typeLabel: cmsText(content, "enquiry.typeLabel"),
            typePlaceholder: cmsText(content, "enquiry.typePlaceholder"),
            descriptionLabel: cmsText(content, "enquiry.descriptionLabel"),
            descriptionPlaceholder: cmsText(content, "enquiry.descriptionPlaceholder"),
            attachmentsLabel: cmsText(content, "enquiry.attachmentsLabel"),
            attachmentsNote: cmsText(content, "enquiry.attachmentsNote"),
            submitLabel: cmsText(content, "enquiry.submitLabel"),
          }} />
        </div>
      </div>
    </section>
  );
}
