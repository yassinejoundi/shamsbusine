import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AdminSignInForm } from "@/components/admin/AdminSignInForm";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { getAdminSessionForRender, isAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = {
  title: "Connexion administrateur | Shams Busine",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ access?: string }>;
}) {
  return (
    <Suspense fallback={<main id="contenu" className="frame admin-page" tabIndex={-1}><p role="status">Chargement de l’espace administrateur…</p></main>}>
      <AdminLoginContent searchParams={searchParams} />
    </Suspense>
  );
}

async function AdminLoginContent({ searchParams }: { searchParams: Promise<{ access?: string }> }) {
  await connection();
  const user = await getAdminSessionForRender();
  const { access } = await searchParams;
  if (user && isAdmin(user)) redirect("/admin/pages");
  if (user) {
    return (
      <main id="contenu" className="frame admin-page" tabIndex={-1}>
        <section className="admin-login-panel" aria-labelledby="admin-title">
          <h1 id="admin-title">Accès réservé</h1>
          <p className="admin-intro">{access === "denied" ? "Ce compte n’a pas le rôle administrateur requis." : "Ce compte ne peut pas accéder à l’espace de gestion."}</p>
          <AdminSignOutButton />
        </section>
      </main>
    );
  }
  return (
    <main id="contenu" className="frame admin-page" tabIndex={-1}>
      <section className="admin-login-panel" aria-labelledby="admin-title">
        <p className="admin-eyebrow">Espace de gestion</p>
        <h1 id="admin-title">Accès administrateur</h1>
        <p className="admin-intro">Connectez-vous pour modifier le contenu de Shams Busine.</p>
        <AdminSignInForm />
      </section>
    </main>
  );
}
