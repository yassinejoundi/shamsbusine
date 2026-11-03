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
      {questions.map(({ question, answer }) => (
        <details key={question}>
          <summary>{question}<DisclosureIcon /></summary>
          <div className="faq-answer"><p>{answer}</p></div>
        </details>
      ))}
    </div>
  );
}
