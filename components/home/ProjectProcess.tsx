import Image from "next/image";
import { cmsImage, cmsText, type CmsValues } from "@/lib/cms/content";

export function ProjectProcess({ content }: { content: CmsValues }) {
  const stages = [0, 1, 2].map((index) => ({
    title: cmsText(content, `process.step${index}.title`),
    text: cmsText(content, `process.step${index}.text`),
  }));
  return (
    <section className="process" aria-labelledby="process-title">
      <div className="frame">
        <div className="process-intro">
          <h2 id="process-title" data-reveal="left">{cmsText(content, "process.title1")}<br />{cmsText(content, "process.title2")}</h2>
          <p data-reveal="right">{cmsText(content, "process.intro")}</p>
        </div>

        <div className="process-layout">
          <figure className="process-figure" data-reveal="wipe-left">
            <div className="photo process-photo">
              <Image
                src={cmsImage(content, "process.image")}
                alt={cmsText(content, "process.imageAlt")}
                fill
                sizes="(max-width: 699px) 100vw, (max-width: 1099px) 44vw, 40vw"
              />
            </div>
            <figcaption>{cmsText(content, "process.imageCaption")}</figcaption>
          </figure>

          <ol className="process-steps">
            {stages.map(({ title, text }, index) => (
              <li key={title} data-reveal="right" data-reveal-delay={String(index)}>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
