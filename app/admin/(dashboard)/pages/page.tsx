import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { cmsPages } from "@/lib/cms/schema";
import { requireAdminForRender } from "@/lib/auth/admin";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";

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
  await requireAdminForRender();

  return (
    <main id="contenu" className="frame admin-page" tabIndex={-1}>
      <AdminBreadcrumb items={[
        { label: "Espace de gestion", href: "/admin" },
        { label: "Contenu du site", current: true },
      ]} />
      <header className="admin-heading">
        <div>
          <h1>Contenu du site</h1>
          <p className="admin-intro">Choisissez une page pour modifier les textes et images affichés sur le site.</p>
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
