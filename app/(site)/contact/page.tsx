import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactEnquiry } from "@/components/contact/ContactEnquiry";
import { ContactHero } from "@/components/contact/ContactHero";
import { getCmsContent, type CmsValues } from "@/lib/cms/content";
import { cmsPageBySlug, defaultCmsContent } from "@/lib/cms/schema";
import { defaultSiteSettings, getSiteSettings, type SiteSettings } from "@/lib/site-settings";

import "./contact.css";

export const metadata: Metadata = {
  title: "Contact & devis | Construction à Marrakech | Shams Busine",
  description: "Décrivez votre projet de construction ou de rénovation à Marrakech et joignez vos plans ou photos pour demander un devis à Shams Busine.",
  openGraph: {
    title: "Contact & devis | Shams Busine",
    description: "Un premier échange pour cadrer vos travaux de construction ou de rénovation à Marrakech.",
    locale: "fr_MA",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <Suspense fallback={<ContactContent content={defaultCmsContent(cmsPageBySlug.contact)} settings={defaultSiteSettings} />}>
      <ContactFromCms />
    </Suspense>
  );
}

async function ContactFromCms() {
  const [content, settings] = await Promise.all([getCmsContent("contact"), getSiteSettings()]);
  return <ContactContent content={content} settings={settings} />;
}

function ContactContent({ content, settings }: { content: CmsValues; settings: SiteSettings }) {
  return (
    <main id="contenu" className="contact-page" tabIndex={-1}>
      <ContactHero content={content} settings={settings} />
      <ContactEnquiry contactEmail={settings.email} />
    </main>
  );
}
