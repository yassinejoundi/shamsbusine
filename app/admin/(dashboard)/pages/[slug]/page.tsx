import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AdminCmsForm } from "@/components/admin/AdminCmsForm";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";
import { requireAdmin } from "@/lib/auth/admin";
import { getCmsContent, getCmsImageAssets } from "@/lib/cms/content";
import { cmsPageBySlug } from "@/lib/cms/schema";

export const metadata: Metadata = {
  title: "Modifier le contenu | Shams Busine",
  robots: { index: false, follow: false },
};

export default function CmsPageEditor({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<main id="contenu" className="frame admin-page" tabIndex={-1}><p role="status">Chargement de la page…</p></main>}>
      <CmsPageEditorContent params={params} />
    </Suspense>
  );
}

async function CmsPageEditorContent({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  await requireAdmin();
  const { slug } = await params;
  const page = cmsPageBySlug[slug];
  if (!page) notFound();
  const content = await getCmsContent(slug);
  const images = getCmsImageAssets(page, content);

  return (
    <main id="contenu" className="frame admin-page" tabIndex={-1}>
      <AdminBreadcrumb items={[
        { label: "Espace de gestion", href: "/admin" },
        { label: "Contenu du site", href: "/admin/pages" },
        { label: page.title, current: true },
      ]} />
      <header className="admin-heading">
        <div>
          <h1>{page.title}</h1>
          <p className="admin-intro">Modifiez les textes et les images publiés sur <Link href={page.route} target="_blank" rel="noreferrer">{page.route}</Link>.</p>
        </div>
      </header>
      <AdminCmsForm page={page} content={content} images={images} />
    </main>
  );
}
