import Image from "next/image";
import { cmsImage, cmsText, type CmsValues } from "@/lib/cms/content";

export function EntreprisePartenaires({ content }: { content: CmsValues }) {
  return (
    <section id="partenaires" className="entreprise-partenaires" aria-labelledby="entreprise-partenaires-title">
      <div className="frame">
        <div className="entreprise-partenaires-intro">
          <h2 id="entreprise-partenaires-title" data-reveal="left">{cmsText(content, "partners.title")}</h2>
          <p data-reveal="right">{cmsText(content, "partners.intro")}</p>
        </div>
        <ul className="entreprise-partenaires-list">
          {Array.from({ length: 17 }, (_, index) => (
            <li key={index} className="entreprise-partenaires-logo-item" data-reveal="up" data-reveal-delay={String(index % 4)}>
              <Image
                className="entreprise-partenaires-logo"
                src={cmsImage(content, `partner.${index}.image`)}
                alt={cmsText(content, `partner.${index}.name`)}
                width={300}
                height={300}
                sizes="(max-width: 699px) 45vw, (max-width: 899px) 22vw, 14vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
