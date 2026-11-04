import Image from "next/image";
import { cmsImage, cmsText, type CmsValues } from "@/lib/cms/content";

export function SelectedWork({ content }: { content: CmsValues }) {
  return (
    <section className="selected-work frame section-space" id="realisations" aria-labelledby="work-title">
      <div className="work-intro" data-reveal="left">
        <h2 id="work-title">{cmsText(content, "work.title")}</h2>
        <p>{cmsText(content, "work.intro")}</p>
      </div>
      <figure className="work-main" data-reveal="wipe-right">
        <div className="photo work-landscape"><Image src={cmsImage(content, "work.image1")} alt={cmsText(content, "work.image1Alt")} fill sizes="(max-width: 699px) 100vw, 55vw" /></div>
        <figcaption>{cmsText(content, "work.image1Caption")}</figcaption>
      </figure>
      <figure className="work-secondary" data-reveal="wipe-left" data-reveal-delay="1">
        <div className="photo work-portrait"><Image src={cmsImage(content, "work.image2")} alt={cmsText(content, "work.image2Alt")} fill sizes="(max-width: 699px) 78vw, 32vw" /></div>
        <figcaption>{cmsText(content, "work.image2Caption")}</figcaption>
      </figure>
      <div className="work-note" data-reveal="right" data-reveal-delay="2">
        <p>{cmsText(content, "work.closing")}</p>
        <a className="text-link" href="#devis">{cmsText(content, "work.action")}</a>
      </div>
    </section>
  );
}
