"use client";

import { useState } from "react";
import { enquiryEmail } from "@/lib/enquiry";
import { Arrow } from "@/components/site/Arrow";

export function QuoteForm() {
  const [notice, setNotice] = useState("");
  const [contactMethod, setContactMethod] = useState("");

  return (
    <form className="quote-form" action="mailto:info@shamsbusine.com" method="get" onInput={(event) => {
      const field = event.target;
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.setCustomValidity("");
    }} onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const value = (key: string) => String(data.get(key) ?? "").trim();
      for (const name of ["name", "city", "contactDetails", "description"]) {
        if (value(name)) continue;
        const field = event.currentTarget.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
        field.setCustomValidity("Veuillez renseigner ce champ.");
        field.reportValidity();
        return;
      }
      window.location.href = enquiryEmail({ name: value("name"), city: value("city"), type: value("type"), description: value("description"), contactMethod: value("contactMethod"), contactDetails: value("contactDetails") });
      setNotice("Votre application e-mail est sollicitée. Relisez puis envoyez votre message. Si elle ne s’ouvre pas, utilisez le lien e-mail de cette section.");
    }}>
      <div className="form-row">
        <label>Votre nom<input name="name" autoComplete="name" required maxLength={100} /></label>
        <label>Ville du projet<input name="city" autoComplete="address-level2" required maxLength={100} /></label>
      </div>
      <div className="form-row">
        <label>Moyen de contact préféré<select name="contactMethod" value={contactMethod} onChange={(event) => setContactMethod(event.target.value)} required><option value="" disabled>Choisir un moyen de contact</option><option>Téléphone</option><option>E-mail</option></select></label>
        <label>{contactMethod === "Téléphone" ? "Votre numéro de téléphone" : contactMethod === "E-mail" ? "Votre adresse e-mail" : "Votre téléphone ou adresse e-mail"}<input name="contactDetails" type={contactMethod === "Téléphone" ? "tel" : contactMethod === "E-mail" ? "email" : "text"} autoComplete={contactMethod === "Téléphone" ? "tel" : contactMethod === "E-mail" ? "email" : "off"} required maxLength={200} /></label>
      </div>
      <label>Type de travaux<select name="type" defaultValue="" required><option value="" disabled>Sélectionner les travaux</option><option>Construction / gros œuvre</option><option>Rénovation / finitions</option><option>Étanchéité</option><option>Second œuvre / techniques</option><option>Conseil / suivi</option><option>Autre projet</option></select></label>
      <label>Quelques mots sur votre projet<textarea name="description" rows={4} required maxLength={2000} placeholder="Nature des travaux, état du projet, plans disponibles…" /></label>
      <p className="form-note" id="email-note">Ce formulaire ouvre un brouillon dans votre application e-mail ; rien n’est envoyé ni conservé sur ce site. Vous pourrez y joindre des plans ou des photos avant l’envoi.</p>
      <button type="submit" className="button" aria-describedby="email-note">Préparer mon e-mail <Arrow /></button>
      <p className="form-status" role="status">{notice}</p>
    </form>
  );
}
