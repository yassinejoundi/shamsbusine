"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";

export function AdminSignInForm() {
  const router = useRouter();
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form className="quote-form admin-sign-in-form" onSubmit={async (event) => {
      event.preventDefault();
      setIsSubmitting(true);
      setNotice("");
      const form = new FormData(event.currentTarget);
      try {
        const { error } = await authClient.signIn.email({
          email: String(form.get("email") ?? "").trim(),
          password: String(form.get("password") ?? ""),
        });
        if (error) {
          setNotice("Connexion impossible. Vérifiez vos identifiants ou contactez l’administrateur.");
          return;
        }
        router.replace("/admin/pages");
        router.refresh();
      } catch {
        setNotice("Le service de connexion est momentanément indisponible.");
      } finally {
        setIsSubmitting(false);
      }
    }}>
      <label>
        <span className="form-label-text">Adresse e-mail</span>
        <input name="email" type="email" autoComplete="username" required maxLength={254} />
      </label>
      <label>
        <span className="form-label-text">Mot de passe</span>
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      <button type="submit" className="button" disabled={isSubmitting}>
        {isSubmitting ? "Connexion…" : "Se connecter"}
      </button>
      <p className="form-status" role="status" aria-live="polite">{notice}</p>
    </form>
  );
}
