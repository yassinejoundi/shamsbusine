import Image from "next/image";
import { QuestionsAccordion } from "@/components/site/QuestionsAccordion";

const questions = [
  { question: "Quels travaux pouvez-vous réaliser ?", answer: "Construction, gros œuvre, étanchéité, installations techniques, rénovation et finitions. Décrivez votre besoin pour que nous précisions ensemble le périmètre des travaux." },
  { question: "Intervenez-vous hors de Marrakech ?", answer: "Notre entreprise est basée à Marrakech. Indiquez la ville de votre projet : nous vous confirmerons les possibilités d’intervention selon sa localisation et sa nature." },
  { question: "Travaillez-vous avec mon architecte ?", answer: "Nous travaillons avec les architectes et bureaux d’études pour coordonner l’exécution. Vous pouvez nous transmettre les plans et les coordonnées des intervenants lors du premier échange." },
  { question: "Comment évaluer le délai et le budget ?", answer: "Ils dépendent du périmètre, des contraintes du site et du niveau de finition. L’étude de votre projet permet de préparer un chiffrage et un planning adaptés, sans délai standard annoncé à l’avance." },
  { question: "Que prévoir avant de démarrer ?", answer: "Partagez la localisation, le type de travaux et les plans disponibles. Le devis, le périmètre, les conditions d’exécution et les documents contractuels sont à examiner ensemble avant tout engagement." },
];

export function Questions() {
  return (
    <section className="questions" aria-labelledby="questions-title">
      <div className="frame">
        <div className="questions-intro">
          <h2 id="questions-title" data-reveal="left">Avant de se lancer.</h2>
          <p data-reveal="right">Quelques réponses pour préparer votre échange : périmètre des travaux, lieu du chantier, planning et documents à réunir.</p>
        </div>

        <div className="questions-layout">
          <figure className="questions-image" data-reveal="wipe-left">
            <div className="photo detail-photo">
              <Image
                src="/images/faq-villa-detail.jpg"
                alt="Détail d’une façade de villa en pierre grise et enduit clair"
                fill
                sizes="(max-width: 699px) 78vw, (max-width: 1099px) 42vw, 34vw"
              />
            </div>
            <figcaption>Une façade contemporaine, entre pierre grise et enduit clair.</figcaption>
          </figure>

          <QuestionsAccordion questions={questions} />
        </div>
      </div>
    </section>
  );
}
