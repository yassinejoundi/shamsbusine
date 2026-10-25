import Image from "next/image";
import { DisclosureIcon } from "@/components/site/DisclosureIcon";

const questions = [
  ["Quels travaux pouvez-vous réaliser ?", "Construction, gros œuvre, étanchéité, installations techniques, rénovation et finitions. Décrivez votre besoin pour que nous précisions ensemble le périmètre des travaux."],
  ["Intervenez-vous hors de Marrakech ?", "Notre entreprise est basée à Marrakech. Indiquez la ville de votre projet : nous vous confirmerons les possibilités d’intervention selon sa localisation et sa nature."],
  ["Travaillez-vous avec mon architecte ?", "Nous travaillons avec les architectes et bureaux d’études pour coordonner l’exécution. Vous pouvez nous transmettre les plans et les coordonnées des intervenants lors du premier échange."],
  ["Comment évaluer le délai et le budget ?", "Ils dépendent du périmètre, des contraintes du site et du niveau de finition. L’étude de votre projet permet de préparer un chiffrage et un planning adaptés, sans délai standard annoncé à l’avance."],
  ["Que prévoir avant de démarrer ?", "Partagez la localisation, le type de travaux et les plans disponibles. Le devis, le périmètre, les conditions d’exécution et les documents contractuels sont à examiner ensemble avant tout engagement."],
];

export function Questions() {
  return (
    <section className="questions frame section-space" aria-labelledby="questions-title">
      <div className="questions-image" data-reveal>
        <div className="photo detail-photo"><Image src="/images/chantier-maconnerie.webp" alt="Maçonnerie en briques, structure en béton et échafaudages sur un chantier" fill sizes="(max-width: 699px) 78vw, 30vw" /></div>
        <p>Bien préparer. Mieux construire.</p>
      </div>
      <div>
        <h2 id="questions-title" data-reveal>Vos questions.</h2>
        <div className="faq-list">
          {questions.map(([question, answer]) => (
            <details key={question} data-reveal><summary>{question}<DisclosureIcon /></summary><p>{answer}</p></details>
          ))}
        </div>
      </div>
    </section>
  );
}

