import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Arrow } from "@/components/site/Arrow";
import { ProjectGallery } from "@/components/realisations/ProjectGallery";
import { getCmsContent, type CmsValues } from "@/lib/cms/content";
import { cmsPageBySlug, defaultCmsContent } from "@/lib/cms/schema";
import "./realisations.css";

export const metadata: Metadata = {
  title: "Nos réalisations | Construction & rénovation | Shams Busine",
  description: "Découvrez les réalisations Shams Busine en images : extérieurs, structures, intérieurs et détails de finition.",
  openGraph: {
    title: "Nos réalisations | Shams Busine",
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
    <Suspense fallback={<RealisationsContent content={defaultCmsContent(cmsPageBySlug.realisations)} searchParams={searchParams} />}>
      <RealisationsFromCms searchParams={searchParams} />
    </Suspense>
  );
}

async function RealisationsFromCms({
  searchParams,
}: {
  searchParams: Promise<{ vue?: string | string[] }>;
}) {
  const content = await getCmsContent("realisations");
  return <RealisationsContent content={content} searchParams={searchParams} />;
}

function RealisationsContent({
  content,
  searchParams,
}: {
  content: CmsValues;
  searchParams: Promise<{ vue?: string | string[] }>;
}) {
  return (
    <main id="contenu" className="realisations-page" tabIndex={-1}>
      <section className="realisations-intro frame" aria-labelledby="realisations-title">
        <h1 id="realisations-title"><span data-reveal="type">{content["intro.title1"]}</span><span data-reveal="type" data-reveal-delay="1">{content["intro.title2"]}</span></h1>
        <div className="realisations-intro-copy" data-reveal="right">
          <p>{content["intro.text"]}</p>
          <Link href="/contact/#devis" className="button">
            {content["intro.action"]} <Arrow />
          </Link>
        </div>
      </section>
      <Suspense fallback={<ProjectGalleryFallback content={content} />}>
        <ProjectGallery searchParams={searchParams} content={content} />
      </Suspense>
      <section className="realisations-enquiry" aria-labelledby="realisations-enquiry-title">
        <div className="frame realisations-enquiry-layout">
          <div data-reveal="left">
            <h2 id="realisations-enquiry-title">{content["enquiry.title"]}</h2>
            <p>{content["enquiry.intro"]}</p>
          </div>
          <div className="realisations-enquiry-actions" data-reveal="right" data-reveal-delay="1">
            <Link href="/contact/#devis" className="button">
              {content["enquiry.action"]} <Arrow />
            </Link>
            <a href="tel:+212777543997">+212 777 54 39 97</a>
            <a href="mailto:info@shamsbusine.com">info@shamsbusine.com</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProjectGalleryFallback({ content }: { content: Record<string, string> }) {
  return (
    <section id="projets" className="realisations-gallery frame" aria-labelledby="realisations-gallery-title">
      <h2 id="realisations-gallery-title" data-reveal="left">{content["gallery.title"]}</h2>
      <p className="realisations-loading" role="status" data-reveal="up">{content["gallery.loading"]}</p>
    </section>
  );
}
