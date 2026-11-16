"use client";

import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";

export default function EnquiriesError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="contenu" className="frame admin-page admin-devis-page admin-devis-error" tabIndex={-1}>
      <AdminBreadcrumb items={[
        { label: "Espace de gestion", href: "/admin" },
        { label: "Demandes de devis", current: true },
      ]} />
      <section role="alert" aria-labelledby="admin-devis-error-title">
        <header className="admin-heading admin-devis-heading">
          <div>
            <h1 id="admin-devis-error-title">Impossible de charger les demandes</h1>
            <p>La liste n’a pas pu s’afficher. Réessayez.</p>
          </div>
        </header>
        <button className="admin-devis-retry" type="button" onClick={reset}>Réessayer</button>
      </section>
    </main>
  );
}
