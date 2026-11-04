import Image from "next/image";
import { QuestionsAccordion } from "@/components/site/QuestionsAccordion";
import { cmsImage, cmsText, type CmsValues } from "@/lib/cms/content";

export function Questions({ content }: { content: CmsValues }) {
  const questions = [0, 1, 2, 3, 4].map((index) => ({
    question: cmsText(content, `faq.${index}.question`),
    answer: cmsText(content, `faq.${index}.answer`),
  }));
  return (
    <section className="questions" aria-labelledby="questions-title">
      <div className="frame">
        <div className="questions-intro">
          <h2 id="questions-title" data-reveal="left">{cmsText(content, "faq.title")}</h2>
          <p data-reveal="right">{cmsText(content, "faq.intro")}</p>
        </div>

        <div className="questions-layout">
          <figure className="questions-image" data-reveal="wipe-left">
            <div className="photo detail-photo">
              <Image
                src={cmsImage(content, "faq.image")}
                alt={cmsText(content, "faq.imageAlt")}
                fill
                sizes="(max-width: 699px) 78vw, (max-width: 1099px) 42vw, 34vw"
              />
            </div>
            <figcaption>{cmsText(content, "faq.imageCaption")}</figcaption>
          </figure>

          <QuestionsAccordion questions={questions} />
        </div>
      </div>
    </section>
  );
}
