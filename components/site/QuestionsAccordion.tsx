import { DisclosureIcon } from "@/components/site/DisclosureIcon";

type Question = {
  question: string;
  answer: string;
};

export function QuestionsAccordion({
  questions,
  className,
}: {
  questions: Question[];
  className?: string;
}) {
  return (
    <div className={className ? `faq-list ${className}` : "faq-list"}>
      {questions.map(({ question, answer }, index) => (
        <details key={question} data-reveal="right" data-reveal-delay={String(index % 4)}>
          <summary>{question}<DisclosureIcon /></summary>
          <div className="faq-answer"><p>{answer}</p></div>
        </details>
      ))}
    </div>
  );
}
