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
    <section className="questions section-space" aria-labelledby="questions-title">
      <div className="frame">
        <div className="questions-intro">
          <div data-reveal>
            <h2 id="questions-title">Avant de se lancer.</h2>
          </div>
          <p data-reveal>Quelques réponses pour préparer votre échange : périmètre des travaux, lieu du chantier, planning et documents à réunir.</p>
        </div>

        <div className="questions-layout">
          <figure className="questions-image" data-reveal>
            <div className="photo detail-photo">
              <Image
                src="/images/chantier-maconnerie.webp"
                alt="Maçonnerie en briques, structure en béton et échafaudages sur un chantier"
                fill
                sizes="(max-width: 699px) 78vw, (max-width: 1099px) 42vw, 34vw"
              />
            </div>
            <figcaption>Maçonnerie en brique et structure en béton.</figcaption>
          </figure>

          <div className="faq-list">
            {questions.map(([question, answer]) => (
              <details key={question} data-reveal>
                <summary>{question}<DisclosureIcon /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
