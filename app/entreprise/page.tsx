import type { Metadata } from "next";
import { PageMotion } from "@/components/site/PageMotion";
import { EntrepriseHero } from "@/components/entreprise/EntrepriseHero";
import { EntrepriseApproche } from "@/components/entreprise/EntrepriseApproche";
import { EntrepriseGalerie } from "@/components/entreprise/EntrepriseGalerie";
import { EntrepriseMethode } from "@/components/entreprise/EntrepriseMethode";
import { EntrepriseEnquiry } from "@/components/entreprise/EntrepriseEnquiry";

import "./entreprise.css";

export const metadata: Metadata = {
  title: "L’entreprise | Construction & rénovation à Marrakech — Shams Busine",
  description: "Découvrez l’approche de Shams Busine, entreprise de construction et de rénovation basée à Marrakech, du cadrage du projet à la réception des travaux.",
  openGraph: {
    title: "L’entreprise — Shams Busine",
    description: "Une méthode de chantier fondée sur la qualité, la transparence et la coordination.",
    locale: "fr_MA",
    type: "website",
  },
};

export default function EntreprisePage() {
  return (
    <PageMotion>
      <main id="contenu" className="entreprise-page" tabIndex={-1}>
        <EntrepriseHero />
        <EntrepriseApproche />
        <EntrepriseGalerie />
        <EntrepriseMethode />
        <EntrepriseEnquiry />
      </main>
    </PageMotion>
  );
}
