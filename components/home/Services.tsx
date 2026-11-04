import Image from "next/image";
import Link from "next/link";
import { cmsImage, cmsText, type CmsValues } from "@/lib/cms/content";

type Service = {
  title: string;
  text: string;
  image?: {
    src: string;
    alt: string;
    caption?: string;
    kind: "structure" | "finishes";
  };
};

export function Services({ content }: { content: CmsValues }) {
  const services: Service[] = [0, 1, 2, 3, 4, 5].map((index) => ({
    title: cmsText(content, `services.item${index}.title`),
    text: cmsText(content, `services.item${index}.text`),
    image: index === 0 || index === 3 ? {
      src: cmsImage(content, `services.item${index}.image`),
      alt: cmsText(content, `services.item${index}.alt`),
      caption: index === 0 ? cmsText(content, "services.item0.caption") : undefined,
      kind: index === 0 ? "structure" as const : "finishes" as const,
    } : undefined,
  }));
  return (
    <section className="services section-space" id="services" aria-labelledby="services-title">
      <div className="frame">
        <div className="section-intro services-intro">
          <h2 id="services-title" data-reveal="left">{cmsText(content, "services.title1")}<br />{cmsText(content, "services.title2")}</h2>
          <div data-reveal="right" data-reveal-delay="1">
            <p>{cmsText(content, "services.intro")}</p>
            <Link href="/services" className="text-link">{cmsText(content, "services.action")}</Link>
          </div>
        </div>

        <ul className="services-bento">
          {services.map(({ title, text, image }, index) => (
            <li
              className={`service-tile ${image ? "service-tile--visual" : "service-tile--text"}`}
              data-reveal={index % 2 === 0 ? "left" : "right"}
              data-reveal-delay={String(Math.min(index, 3))}
              key={title}
            >
              {image && (
                <figure className="service-tile__figure">
                  <div className={`photo service-tile__photo service-tile__photo--${image.kind}`}>
                    <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1099px) 100vw, 58vw" />
                  </div>
                  {image.caption && <figcaption>{image.caption}</figcaption>}
                </figure>
              )}
              <div className="service-tile__body">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
