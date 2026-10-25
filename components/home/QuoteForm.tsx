"use client";

import { useState } from "react";
import { enquiryEmail } from "@/lib/enquiry";
import { Arrow } from "@/components/site/Arrow";

export function QuoteForm() {
  const [notice, setNotice] = useState("");

  return (
    <form className="quote-form" action="mailto:info@shamsbusine.com" method="get" onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const value = (key: string) => String(data.get(key) ?? "").trim();
      window.location.href = enquiryEmail({ name: value("name"), city: value("city"), type: value("type"), description: value("description") });
      setNotice("Votre application e-mail est sollicitée. Relisez puis envoyez votre message. Si elle ne s’ouvre pas, utilisez l’adresse e-mail ci-dessous.");
    }}>
      <div className="form-row">
        <label>Votre nom<input name="name" autoComplete="name" required maxLength={100} /></label>
        <label>Ville du projet<input name="city" autoComplete="address-level2" required maxLength={100} /></label>
      </div>
      <label>Type de travaux<select name="type" defaultValue="" required><option value="" disabled>Sélectionner les travaux</option><option>Construction / gros œuvre</option><option>Rénovation / finitions</option><option>Étanchéité</option><option>Second œuvre / techniques</option><option>Conseil / suivi</option><option>Autre projet</option></select></label>
      <label>Quelques mots sur votre projet<textarea name="description" rows={4} required maxLength={2000} placeholder="Nature des travaux, état du projet, plans disponibles…" /></label>
      <p className="form-note" id="email-note">Ce formulaire prépare un message dans votre application e-mail. Aucun envoi n’est effectué sur ce site.</p>
      <button type="submit" className="button" aria-describedby="email-note">Préparer mon e-mail <Arrow /></button>
      <p className="form-status" role="status">{notice}</p>
      <a className="form-fallback" href="mailto:info@shamsbusine.com">Écrire directement à info@shamsbusine.com</a>
    </form>
  );
}
