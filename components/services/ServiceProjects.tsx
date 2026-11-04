import Image from "next/image";
import Link from "next/link";
import { cmsImage, cmsText, type CmsValues } from "@/lib/cms/content";

export function ServiceProjects({ content }: { content: CmsValues }) {
  return (
    <section className="frame section-space services-projects" aria-labelledby="projects-heading">
      <div className="section-intro services-projects-intro">
        <h2 id="projects-heading" data-reveal="left">{cmsText(content, "projects.title1")}<br />{cmsText(content, "projects.title2")}</h2>
        <div className="services-projects-lead" data-reveal="right">
          <p>{cmsText(content, "projects.intro")}</p>
          <Link className="text-link" href="/realisations">{cmsText(content, "projects.action")}</Link>
        </div>
      </div>

      <div className="services-project-grid">
        <figure className="services-project-featured" data-reveal="wipe-right">
          <div className="photo services-project-photo services-project-photo-main">
            <Image
              src={cmsImage(content, "projects.0.image")}
              alt={cmsText(content, "projects.0.alt")}
              fill
              sizes="(max-width: 699px) 100vw, (max-width: 1099px) 66vw, 64vw"
            />
          </div>
          <figcaption>{cmsText(content, "projects.0.caption")}</figcaption>
          <Link className="text-link services-project-link" href="#gros-oeuvre">{cmsText(content, "projects.0.link")}</Link>
        </figure>

        <figure className="services-project-secondary" data-reveal="wipe-left" data-reveal-delay="1">
          <div className="photo services-project-photo services-project-photo-interior">
            <Image
              src={cmsImage(content, "projects.1.image")}
              alt={cmsText(content, "projects.1.alt")}
              fill
              sizes="(max-width: 699px) 90vw, (max-width: 1099px) 34vw, 32vw"
            />
          </div>
          <figcaption>{cmsText(content, "projects.1.caption")}</figcaption>
          <Link className="text-link services-project-link" href="#renovation-finitions">{cmsText(content, "projects.1.link")}</Link>
        </figure>

        <figure className="services-project-tertiary" data-reveal="wipe-right" data-reveal-delay="2">
          <div className="photo services-project-photo services-project-photo-cour">
            <Image
              src={cmsImage(content, "projects.2.image")}
              alt={cmsText(content, "projects.2.alt")}
              fill
              sizes="(max-width: 699px) 100vw, (max-width: 1099px) 34vw, 32vw"
            />
          </div>
          <figcaption>{cmsText(content, "projects.2.caption")}</figcaption>
          <Link className="text-link services-project-link" href="#services-specialises">{cmsText(content, "projects.2.link")}</Link>
        </figure>
      </div>
    </section>
  );
}
