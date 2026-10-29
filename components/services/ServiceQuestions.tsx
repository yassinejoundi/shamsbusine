import { Arrow } from "@/components/site/Arrow";
import { QuestionsAccordion } from "@/components/site/QuestionsAccordion";

const questions = [
  { question: "Puis-je demander un seul lot de travaux ?", answer: "Oui, un besoin ciblé peut être étudié : étanchéité, gros œuvre, installations techniques ou finitions. Nous précisons avec vous les travaux concernés et leur coordination avec les autres intervenants." },
  { question: "Intervenez-vous sur un bâtiment existant ?", answer: "La rénovation, le réaménagement et les extensions font partie de nos services. L’état du bâtiment et les contraintes techniques sont à examiner avant de définir les interventions." },
  { question: "Pouvez-vous travailler avec mon architecte ?", answer: "Nous coordonnons l’exécution avec les architectes et bureaux d’études. Transmettez les plans disponibles et les coordonnées des intervenants pour préparer cet échange." },
  { question: "Comment sont définis le budget et le planning ?", answer: "Ils dépendent de la nature des travaux, du site, des matériaux et des finitions. Le chiffrage et l’organisation sont précisés à partir de l’étude de votre besoin, sans tarif ni durée standard." },
  { question: "Quels éléments transmettre pour un devis ?", answer: "Indiquez la ville, le type de travaux et l’état d’avancement de votre projet. Des plans, des photos de l’existant et une description des attentes peuvent aider à définir le périmètre." },
];

export function ServiceQuestions() {
  return (
    <section className="services-questions" aria-labelledby="faq-heading">
      <div className="frame services-questions-layout">
        <div className="services-questions-intro">
          <h2 id="faq-heading" data-reveal>Vos questions</h2>
          <p data-reveal>Quelques repères pour préparer votre échange avec notre équipe.</p>
          <a className="text-link services-questions-action" href="#enquiry-heading" data-reveal>Parler de mon projet <Arrow /></a>
        </div>
        <QuestionsAccordion className="services-faq" questions={questions} />
      </div>
    </section>
  );
}
