import type { Metadata } from "next";
import { Suspense } from "react";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceScopes } from "@/components/services/ServiceScopes";
import { ProjectStageGuide } from "@/components/services/ProjectStageGuide";
import { ServiceProjects } from "@/components/services/ServiceProjects";
import { ServiceProcess } from "@/components/services/ServiceProcess";
import { ServiceQuestions } from "@/components/services/ServiceQuestions";
import { ServiceEnquiry } from "@/components/services/ServiceEnquiry";
import { getCmsContent, type CmsValues } from "@/lib/cms/content";
import { cmsPageBySlug, defaultCmsContent } from "@/lib/cms/schema";

import "./services.css";

export const metadata: Metadata = {
  title: "Nos services | Construction & rénovation à Marrakech | Shams Busine",
  description: "Gros œuvre, étanchéité, second œuvre, rénovation, finitions et suivi de chantier à Marrakech. Découvrez les services adaptés à votre projet avec Shams Busine.",
  openGraph: {
    title: "Nos services | Shams Busine",
    description: "De la structure aux finitions : construction, rénovation et suivi de chantier à Marrakech.",
    locale: "fr_MA",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <Suspense fallback={<ServicesContent content={defaultCmsContent(cmsPageBySlug.services)} />}>
      <ServicesFromCms />
    </Suspense>
  );
}

async function ServicesFromCms() {
  const content = await getCmsContent("services");
  return <ServicesContent content={content} />;
}

function ServicesContent({ content }: { content: CmsValues }) {
  return (
    <main id="contenu" className="services-page" tabIndex={-1}>
      <ServicesHero content={content} />
      <ServiceScopes content={content} />
      <ProjectStageGuide content={content} />
      <ServiceProjects content={content} />
      <ServiceProcess content={content} />
      <ServiceQuestions content={content} />
      <ServiceEnquiry content={content} />
    </main>
  );
}
