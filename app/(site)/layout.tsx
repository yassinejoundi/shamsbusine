import { Suspense } from "react";
import { SiteNavbar, SiteNavbarFallback } from "@/components/site/SiteNavbar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollReveals } from "@/components/site/ScrollReveals";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<SiteNavbarFallback />}>
        <SiteNavbar />
      </Suspense>
      {children}
      <SiteFooter />
      <Suspense fallback={null}>
        <ScrollReveals />
      </Suspense>
    </>
  );
}
