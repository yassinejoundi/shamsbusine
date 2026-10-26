import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageMotion } from "@/components/site/PageMotion";
import { Arrow } from "@/components/site/Arrow";
import { ProjectGallery } from "@/components/realisations/ProjectGallery";
import "./realisations.css";

export const metadata: Metadata = {
  title: "Nos réalisations | Construction & rénovation — Shams Busine",
  description: "Découvrez les réalisations Shams Busine en images : extérieurs, structures, intérieurs et détails de finition.",
  openGraph: {
    title: "Nos réalisations — Shams Busine",
    description: "Des vues de chantiers et d’espaces réalisés par Shams Busine.",
    locale: "fr_MA",
    type: "website",
  },
};

export default function RealisationsPage({
  searchParams,
}: {
  searchParams: Promise<{ vue?: string | string[] }>;
}) {
  return (
    <PageMotion>
      <main id="contenu" className="realisations-page" tabIndex={-1}>
        <section className="realisations-intro frame" aria-labelledby="realisations-title">
          <h1 id="realisations-title" data-hero><span>Des projets</span><span>en images.</span></h1>
          <div className="realisations-intro-copy">
            <p data-hero>De la structure aux finitions, découvrez des chantiers Shams Busine en images.</p>
            <Link href="/contact/#devis" className="button" data-hero>
              Demander un devis <Arrow />
            </Link>
          </div>
        </section>
        <Suspense fallback={<ProjectGalleryFallback />}>
          <ProjectGallery searchParams={searchParams} />
        </Suspense>
        <section className="realisations-enquiry" aria-labelledby="realisations-enquiry-title">
          <div className="frame realisations-enquiry-layout">
            <div>
              <h2 id="realisations-enquiry-title" data-reveal>Un projet à faire avancer&nbsp;?</h2>
              <p data-reveal>Pour un premier échange utile, indiquez la ville, les travaux envisagés et l’étape où vous en êtes.</p>
            </div>
            <div className="realisations-enquiry-actions">
              <Link href="/contact/#devis" className="button" data-reveal>
                Décrire mon projet <Arrow />
              </Link>
              <a href="tel:+212777543997" data-reveal>+212 777 54 39 97</a>
              <a href="mailto:info@shamsbusine.com" data-reveal>info@shamsbusine.com</a>
            </div>
          </div>
        </section>
      </main>
    </PageMotion>
  );
}

function ProjectGalleryFallback() {
  return (
    <section id="projets" className="realisations-gallery frame" aria-labelledby="realisations-gallery-title">
      <h2 id="realisations-gallery-title">Du terrain aux détails.</h2>
      <p className="realisations-loading" role="status">Chargement des vues de projets…</p>
    </section>
  );
}
