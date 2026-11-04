import Image from "next/image";
import { cmsImage, cmsText, type CmsValues } from "@/lib/cms/content";

const galleryClasses = ["entreprise-gallery-feature", "entreprise-gallery-matiere", "entreprise-gallery-cour"];
const gallerySizes = [
  "(max-width: 699px) 100vw, (max-width: 899px) 100vw, 50vw",
  "(max-width: 699px) 88vw, (max-width: 899px) 46vw, 46vw",
  "(max-width: 699px) 88vw, (max-width: 899px) 46vw, 46vw",
];

export function EntrepriseGalerie({ content }: { content: CmsValues }) {
  return (
    <section className="entreprise-gallery" aria-labelledby="entreprise-gallery-title">
      <div className="frame">
        <div className="entreprise-gallery-intro">
          <h2 id="entreprise-gallery-title" data-reveal="left">
            {cmsText(content, "gallery.title")}
          </h2>
          <p data-reveal="right">
            {cmsText(content, "gallery.intro")}
          </p>
        </div>
        <div className="entreprise-gallery-grid">
          {[0, 1, 2].map((index) => (
            <figure className={galleryClasses[index]} key={index} data-reveal={index % 2 === 0 ? "wipe-right" : "wipe-left"} data-reveal-delay={String(index)}>
              <div className="photo entreprise-gallery-photo">
                <Image src={cmsImage(content, `gallery.${index}.image`)} alt={cmsText(content, `gallery.${index}.alt`)} fill sizes={gallerySizes[index]} />
              </div>
              <figcaption>{cmsText(content, `gallery.${index}.caption`)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
