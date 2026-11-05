import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { cmsPages } from "@/lib/cms/schema";
import { requireAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = {
  title: "Pages du site | Shams Busine",
  robots: { index: false, follow: false },
};

export default function AdminPagesIndex() {
  return (
    <Suspense fallback={<main id="contenu" className="frame admin-page" tabIndex={-1}><p role="status">Chargement des pages…</p></main>}>
      <AdminPagesContent />
    </Suspense>
  );
}

async function AdminPagesContent() {
  await connection();
  await requireAdmin();

  return (
    <main id="contenu" className="frame admin-page" tabIndex={-1}>
      <header className="admin-heading">
        <div>
          <h1>Contenu du site</h1>
          <p className="admin-intro">Modifiez les textes et les images affichés sur les pages du site.</p>
        </div>
      </header>
      <ul className="admin-page-list">
        {cmsPages.map((page) => (
          <li key={page.slug}>
            <Link href={`/admin/pages/${page.slug}`}>
              <span>
                <span className="admin-page-title">{page.title}</span>
                <span className="admin-page-route">{page.route}</span>
              </span>
              <span className="admin-page-edit">Modifier</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
