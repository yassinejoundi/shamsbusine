import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/site/Arrow";
import { contact } from "@/lib/site";
import { cmsImage, cmsText, type CmsValues } from "@/lib/cms/content";

export function ContactHero({ content }: { content: CmsValues }) {
  return (
    <section className="contact-hero frame" aria-labelledby="contact-title">
      <div className="contact-hero-heading">
        <h1 id="contact-title"><span data-reveal="type">{cmsText(content, "hero.title1")}</span><span data-reveal="type" data-reveal-delay="1">{cmsText(content, "hero.title2")}</span></h1>
      </div>
      <div className="contact-hero-content">
        <div className="contact-hero-copy" data-reveal="left">
          <p className="contact-hero-lead">{cmsText(content, "hero.lead")}</p>
          <p>{cmsText(content, "hero.intro")}</p>
          <Link href="#devis" className="button">{cmsText(content, "hero.action")} <Arrow /></Link>
          <div className="contact-direct-links">
            <a href={contact.phoneHref}>Appeler · {contact.phone}</a>
            <a href={`mailto:${contact.email}`}>Écrire · {contact.email}</a>
          </div>
        </div>
        <div className="contact-hero-visuals">
          <figure className="contact-hero-photo contact-hero-photo-facade" data-reveal="wipe-right">
            <div className="contact-hero-photo-frame photo">
              <Image src={cmsImage(content, "hero.image1")} alt={cmsText(content, "hero.image1Alt")} fill sizes="(max-width: 699px) 60vw, (max-width: 1099px) 42vw, 36vw" preload />
            </div>
            <figcaption>{cmsText(content, "hero.image1Caption")}</figcaption>
          </figure>
          <figure className="contact-hero-photo contact-hero-photo-pool" data-reveal="wipe-left" data-reveal-delay="1">
            <div className="contact-hero-photo-frame photo">
              <Image src={cmsImage(content, "hero.image2")} alt={cmsText(content, "hero.image2Alt")} fill sizes="(max-width: 699px) 40vw, (max-width: 1099px) 25vw, 20vw" />
            </div>
            <figcaption>{cmsText(content, "hero.image2Caption")}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
