import Image from "next/image";
import { getCloudinaryImage, cmsText, type CmsValues } from "@/lib/cms/content";
import { parseCmsPartners } from "@/lib/cms/partners";

export function EntreprisePartenaires({ content }: { content: CmsValues }) {
  const partners = (parseCmsPartners(content["partners.items"] ?? "") ?? [])
    .filter((partner) => partner.visible && partner.name.trim() && partner.image)
    .map((partner) => ({ ...partner, src: getCloudinaryImage(partner.image) }))
    .filter((partner) => partner.src);

  return (
    <section id="partenaires" className="entreprise-partenaires" aria-labelledby="entreprise-partenaires-title">
      <div className="frame">
        <div className="entreprise-partenaires-intro">
          <h2 id="entreprise-partenaires-title" data-reveal="left">{cmsText(content, "partners.title")}</h2>
          <p data-reveal="right">{cmsText(content, "partners.intro")}</p>
        </div>
        <ul className="entreprise-partenaires-list">
          {partners.map((partner, index) => (
            <li key={partner.id} className="entreprise-partenaires-logo-item" data-reveal="up" data-reveal-delay={String(index % 4)}>
              <Image
                className="entreprise-partenaires-logo"
                src={partner.src}
                alt={partner.name}
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
