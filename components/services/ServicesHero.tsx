import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";
import { cmsImage, cmsText, type CmsValues } from "@/lib/cms/content";

export function ServicesHero({ content }: { content: CmsValues }) {
  return (
    <section className="frame services-hero" aria-labelledby="services-heading">
      <h1 id="services-heading" data-reveal="type">{cmsText(content, "hero.title1")}<br />{cmsText(content, "hero.title2")}</h1>
      <div className="services-hero-copy" data-reveal="right">
        <p>{cmsText(content, "hero.intro")}</p>
        <Link href="/contact/#devis" className="button">{cmsText(content, "hero.quoteAction")} <Arrow /></Link>
        <a href="#metiers" className="text-link">{cmsText(content, "hero.secondaryAction")}</a>
      </div>
      <figure className="services-hero-figure" data-reveal="wipe-left">
        <div className="photo services-hero-photo">
          <Image src={cmsImage(content, "hero.image")} alt={cmsText(content, "hero.imageAlt")} fill sizes="(max-width: 699px) 100vw, 72vw" preload />
        </div>
        <figcaption>{cmsText(content, "hero.imageCaption")}</figcaption>
      </figure>
      <p className="services-hero-note" data-reveal="left" data-reveal-delay="1">{cmsText(content, "hero.note")}</p>
    </section>
  );
}
