import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Services } from "@/components/home/Services";
import { ProjectProcess } from "@/components/home/ProjectProcess";
import { Company } from "@/components/home/Company";
import { Questions } from "@/components/home/Questions";
import { QuoteSection } from "@/components/home/QuoteSection";
import { getCmsContent, type CmsValues } from "@/lib/cms/content";
import { cmsPageBySlug, defaultCmsContent } from "@/lib/cms/schema";

export default function Home() {
  return (
    <Suspense fallback={<HomeContent content={defaultCmsContent(cmsPageBySlug.home)} />}>
      <HomeFromCms />
    </Suspense>
  );
}

async function HomeFromCms() {
  const content = await getCmsContent("home");
  return <HomeContent content={content} />;
}

function HomeContent({ content }: { content: CmsValues }) {
  return (
    <main id="contenu" tabIndex={-1}>
      <Hero content={content} />
      <SelectedWork content={content} />
      <Services content={content} />
      <ProjectProcess content={content} />
      <Company content={content} />
      <Questions content={content} />
      <QuoteSection content={content} />
    </main>
  );
}
