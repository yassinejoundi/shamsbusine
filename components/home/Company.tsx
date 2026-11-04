import Image from "next/image";
import Link from "next/link";
import { cmsImage, cmsText, type CmsValues } from "@/lib/cms/content";

export function Company({ content }: { content: CmsValues }) {
  return (
    <section className="company" id="entreprise" aria-labelledby="company-title">
      <div className="frame company-layout">
        <div className="company-copy" data-reveal="left">
          <h2 id="company-title">{cmsText(content, "company.title1")}<br />{cmsText(content, "company.title2")}</h2>
          <div className="company-body">
            <p>{cmsText(content, "company.paragraph1")}</p>
            <p>{cmsText(content, "company.paragraph2")}</p>
            <Link className="text-link" href="#devis">Parlons de votre projet</Link>
          </div>
        </div>

        <figure className="company-figure" data-reveal="wipe-right" data-reveal-delay="1">
          <div className="photo company-photo">
            <Image
              src={cmsImage(content, "company.image")}
              alt={cmsText(content, "company.imageAlt")}
              fill
              sizes="(max-width: 699px) 100vw, (max-width: 1099px) 52vw, 56vw"
            />
          </div>
          <figcaption>{cmsText(content, "company.imageCaption")}</figcaption>
        </figure>
      </div>
    </section>
  );
}
