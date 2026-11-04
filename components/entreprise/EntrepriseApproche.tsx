import Image from "next/image";
import { cmsImage, cmsText, type CmsValues } from "@/lib/cms/content";

export function EntrepriseApproche({ content }: { content: CmsValues }) {
  return (
    <section id="equipe" className="entreprise-approche" aria-labelledby="entreprise-approche-title">
      <div className="frame">
        <div className="entreprise-approche-intro">
          <h2 id="entreprise-approche-title" data-reveal="left">{cmsText(content, "approach.title")}</h2>
          <p data-reveal="right">
            {cmsText(content, "approach.intro")}
          </p>
        </div>
        <figure className="entreprise-approche-figure" data-reveal="wipe-left">
          <div className="photo entreprise-approche-photo">
            <Image
              src={cmsImage(content, "approach.image")}
              alt={cmsText(content, "approach.imageAlt")}
              fill
              sizes="(max-width: 699px) 100vw, 91vw"
            />
          </div>
          <figcaption>{cmsText(content, "approach.caption")}</figcaption>
        </figure>
        <p className="entreprise-approche-note" data-reveal="right" data-reveal-delay="1">
          {cmsText(content, "approach.note")}
        </p>
      </div>
    </section>
  );
}
