import { Arrow } from "@/components/site/Arrow";
import { QuestionsAccordion } from "@/components/site/QuestionsAccordion";
import { cmsText, type CmsValues } from "@/lib/cms/content";

export function ServiceQuestions({ content }: { content: CmsValues }) {
  const questions = [0, 1, 2, 3, 4].map((index) => ({
    question: cmsText(content, `faq.${index}.question`),
    answer: cmsText(content, `faq.${index}.answer`),
  }));
  return (
    <section className="services-questions" aria-labelledby="faq-heading">
      <div className="frame services-questions-layout">
        <div className="services-questions-intro" data-reveal="left">
          <h2 id="faq-heading">{cmsText(content, "faq.title")}</h2>
          <p>{cmsText(content, "faq.intro")}</p>
          <a className="text-link services-questions-action" href="#enquiry-heading">{cmsText(content, "faq.action")} <Arrow /></a>
        </div>
        <QuestionsAccordion className="services-faq" questions={questions} />
      </div>
    </section>
  );
}
