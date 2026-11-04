import type { Metadata } from "next";
import { AdminSignInForm } from "@/components/admin/AdminSignInForm";

export const metadata: Metadata = {
  title: "Connexion administrateur | Shams Busine",
  robots: { index: false, follow: false },
};

export default function AdminSignInPage() {
  return (
    <main id="contenu" className="frame admin-page" tabIndex={-1}>
      <h1>Accès administrateur</h1>
      <p className="admin-intro">Connectez-vous avec un compte administrateur Neon Auth.</p>
      <AdminSignInForm />
    </main>
  );
}
