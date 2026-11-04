import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
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
          <p className="admin-eyebrow">Espace de gestion</p>
          <h1>Contenu du site</h1>
          <p className="admin-intro">Choisissez une page. Chaque champ respecte une limite adaptée à sa place.</p>
        </div>
        <AdminSignOutButton />
      </header>
      <nav className="admin-tools" aria-label="Outils d’administration">
        <Link href="/admin/devis">Demandes de devis</Link>
      </nav>
      <ul className="admin-page-list">
        {cmsPages.map((page) => (
          <li key={page.slug}>
            <Link href={`/admin/pages/${page.slug}`}>
              <span>{page.title}</span>
              <span className="admin-page-route">{page.route}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
