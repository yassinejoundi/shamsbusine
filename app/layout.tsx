import type { Metadata } from "next";
import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollReveals } from "@/components/site/ScrollReveals";
import "./globals.css";

config.autoAddCss = false;

const workSans = localFont({
  src: "./fonts/WorkSans.ttf",
  variable: "--font-work-sans",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shams Busine | Construction & rénovation à Marrakech",
  description: "Du gros œuvre aux finitions, Shams Busine accompagne vos projets de construction et de rénovation à Marrakech. Parlons de votre projet et de votre devis.",
  openGraph: {
    title: "Shams Busine — Du plan à la réalité",
    description: "Construction et rénovation à Marrakech, du gros œuvre aux finitions.",
    locale: "fr_MA",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={workSans.variable}>
      <body>
        <a className="skip-link" href="#contenu">Aller au contenu</a>
        <SiteNavbar />
        {children}
        <SiteFooter />
        <ScrollReveals />
      </body>
    </html>
  );
}
