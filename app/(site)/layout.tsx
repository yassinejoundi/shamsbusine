import { Suspense } from "react";
import { SiteNavbar, SiteNavbarFallback } from "@/components/site/SiteNavbar";
import { SiteFooter, SiteFooterFallback } from "@/components/site/SiteFooter";
import { ScrollReveals } from "@/components/site/ScrollReveals";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<SiteNavbarFallback />}>
        <SiteNavbar />
      </Suspense>
      {children}
      <Suspense fallback={<SiteFooterFallback />}>
        <SiteFooter />
      </Suspense>
      <Suspense fallback={null}>
        <ScrollReveals />
      </Suspense>
    </>
  );
}
