import type { Metadata } from "next";
import { ContactEnquiry } from "@/components/contact/ContactEnquiry";
import { ContactHero } from "@/components/contact/ContactHero";

import "./contact.css";

export const metadata: Metadata = {
  title: "Contact & devis | Construction à Marrakech — Shams Busine",
  description: "Parlez de votre projet de construction ou de rénovation à Marrakech. Contactez Shams Busine ou préparez un e-mail avec les premiers détails de votre chantier.",
  openGraph: {
    title: "Contact & devis — Shams Busine",
    description: "Un premier échange pour cadrer vos travaux de construction ou de rénovation à Marrakech.",
    locale: "fr_MA",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main id="contenu" className="contact-page" tabIndex={-1}>
      <ContactHero />
      <ContactEnquiry />
    </main>
  );
}
