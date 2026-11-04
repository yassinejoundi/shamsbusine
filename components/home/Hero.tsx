import Image from "next/image";
import { Arrow } from "@/components/site/Arrow";
import { cmsImage, cmsText, type CmsValues } from "@/lib/cms/content";

export function Hero({ content }: { content: CmsValues }) {
  return (
    <section className="hero frame" aria-labelledby="hero-title">
      <h1 id="hero-title"><span data-reveal="type">{cmsText(content, "hero.title1")}</span><span data-reveal="type" data-reveal-delay="1">{cmsText(content, "hero.title2")}</span></h1>
      <div className="hero-detail photo" data-reveal="right">
        <Image src={cmsImage(content, "hero.accentImage")} alt={cmsText(content, "hero.accentAlt")} fill sizes="(max-width: 699px) 30vw, 24vw" />
      </div>
      <div className="hero-copy" data-reveal="right" data-reveal-delay="1">
        <p className="hero-description">{cmsText(content, "hero.description")}</p>
        <div className="hero-actions">
          <a href="#devis" className="button">{cmsText(content, "hero.quoteAction")} <Arrow /></a>
          <a href="#realisations" className="text-link">{cmsText(content, "hero.secondaryAction")}</a>
        </div>
      </div>
      <figure className="hero-figure" data-reveal="wipe-left">
        <div className="photo hero-photo">
          <Image src={cmsImage(content, "hero.mainImage")} alt={cmsText(content, "hero.mainAlt")} fill sizes="(max-width: 699px) 100vw, 58vw" preload />
        </div>
        <figcaption>{cmsText(content, "hero.mainCaption")}</figcaption>
      </figure>
    </section>
  );
}
