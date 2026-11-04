import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";
import { cmsImage, cmsText, type CmsValues } from "@/lib/cms/content";

export function EntrepriseHero({ content }: { content: CmsValues }) {
  return (
    <section className="entreprise-hero frame" aria-labelledby="entreprise-title">
      <div className="entreprise-hero-copy">
        <h1 id="entreprise-title" data-reveal="type">
          <span>{cmsText(content, "hero.title1")}</span>
          <span>{cmsText(content, "hero.title2")}</span>
        </h1>
        <p data-reveal="left" data-reveal-delay="1">
          {cmsText(content, "hero.intro")}
        </p>
        <div className="entreprise-hero-actions" data-reveal="left" data-reveal-delay="2">
          <Link className="button" href="/contact/#devis">
            {cmsText(content, "hero.quoteAction")} <Arrow />
          </Link>
          <Link className="text-link" href="#methode">{cmsText(content, "hero.secondaryAction")}</Link>
        </div>
      </div>
      <figure className="entreprise-hero-figure" data-reveal="wipe-right">
        <div className="photo entreprise-hero-photo">
          <Image
            src={cmsImage(content, "hero.image")}
            alt={cmsText(content, "hero.imageAlt")}
            fill
            preload
            sizes="(max-width: 1099px) 92vw, 48vw"
          />
        </div>
        <figcaption>{cmsText(content, "hero.caption")}</figcaption>
      </figure>
    </section>
  );
}
