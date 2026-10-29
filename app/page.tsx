import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Services } from "@/components/home/Services";
import { ProjectProcess } from "@/components/home/ProjectProcess";
import { Company } from "@/components/home/Company";
import { Questions } from "@/components/home/Questions";
import { QuoteSection } from "@/components/home/QuoteSection";
import { HomeScrollAnimations } from "@/components/home/HomeScrollAnimations";

export default function Home() {
  return (
    <>
      <main id="contenu" tabIndex={-1}>
        <Hero />
        <SelectedWork />
        <Services />
        <ProjectProcess />
        <Company />
        <Questions />
        <QuoteSection />
      </main>
      <HomeScrollAnimations />
    </>
  );
}
