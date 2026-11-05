import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AdminCmsForm } from "@/components/admin/AdminCmsForm";
import { requireAdmin } from "@/lib/auth/admin";
import { getCmsContent, getCmsImageAssets } from "@/lib/cms/content";
import { cmsPageBySlug } from "@/lib/cms/schema";

export const metadata: Metadata = {
  title: "Modifier le contenu | Shams Busine",
  robots: { index: false, follow: false },
};

export default function CmsPageEditor({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  return (
    <Suspense fallback={<main id="contenu" className="frame admin-page" tabIndex={-1}><p role="status">Chargement de la page…</p></main>}>
      <CmsPageEditorContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function CmsPageEditorContent({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await connection();
  await requireAdmin();
  const [{ slug }, status] = await Promise.all([params, searchParams]);
  const page = cmsPageBySlug[slug];
  if (!page) notFound();
  const content = await getCmsContent(slug);
  const images = getCmsImageAssets(page, content);

  return (
    <main id="contenu" className="frame admin-page" tabIndex={-1}>
      <header className="admin-heading">
        <div>
          <p className="admin-eyebrow"><Link href="/admin/pages">Contenu du site</Link> / {page.title}</p>
          <h1>Modifier {page.title}</h1>
          <p className="admin-intro">Page publique : <Link href={page.route} target="_blank" rel="noreferrer">{page.route}</Link>. Enregistrez vos modifications pour les publier.</p>
        </div>
      </header>
      {status.saved === "1" && <p className="admin-notice" role="status">Modifications enregistrées.</p>}
      {status.error === "invalid" && <p className="admin-error" role="alert">Vérifiez les champs obligatoires et leurs limites avant de réessayer.</p>}
      {status.error === "save" && <p className="admin-error" role="alert">Enregistrement impossible. Vérifiez la connexion à la base Neon, puis réessayez.</p>}
      <AdminCmsForm page={page} content={content} images={images} />
    </main>
  );
}
