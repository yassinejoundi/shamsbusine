import type { Metadata } from "next";
import { PageMotion } from "@/components/site/PageMotion";
import { EntrepriseHero } from "@/components/entreprise/EntrepriseHero";
import { EntrepriseApproche } from "@/components/entreprise/EntrepriseApproche";
import { EntrepriseMoyens } from "@/components/entreprise/EntrepriseMoyens";
import { EntrepriseGalerie } from "@/components/entreprise/EntrepriseGalerie";
import { EntrepriseMethode } from "@/components/entreprise/EntrepriseMethode";
import { EntreprisePartenaires } from "@/components/entreprise/EntreprisePartenaires";
import { EntrepriseEnquiry } from "@/components/entreprise/EntrepriseEnquiry";

import "./entreprise.css";
import "./partenaires.css";

export const metadata: Metadata = {
  title: "L’entreprise | Construction & rénovation à Marrakech — Shams Busine",
  description: "Découvrez les équipes, les moyens et la méthode de Shams Busine pour vos projets de construction et de rénovation à Marrakech.",
  openGraph: {
    title: "L’entreprise — Shams Busine",
    description: "Des équipes et des moyens pour accompagner chaque étape du chantier.",
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
        <EntrepriseMoyens />
        <EntrepriseGalerie />
        <EntrepriseMethode />
        <EntreprisePartenaires />
        <EntrepriseEnquiry />
      </main>
    </PageMotion>
  );
}
