"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { enquiryEmail } from "@/lib/enquiry";
import { Arrow } from "@/components/site/Arrow";

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15 && /^[+0-9().\s-]+$/.test(value);
}

export function QuoteForm() {
  const [notice, setNotice] = useState("");

  return (
    <form className="quote-form" aria-label="Demande de devis" action="mailto:info@shamsbusine.com" method="get" onInput={(event) => {
      const field = event.target;
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
        field.setCustomValidity("");
        if (field instanceof HTMLInputElement && field.name === "phone" && field.value && !isValidPhone(field.value)) {
          field.setCustomValidity("Saisissez un numéro de téléphone valide.");
        }
      }
      setNotice("");
    }} onInvalid={(event) => {
      const field = event.target;
      if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) return;
      if (field.validity.valueMissing) field.setCustomValidity("Veuillez renseigner ce champ.");
      else if (field instanceof HTMLInputElement && field.type === "email" && field.validity.typeMismatch) field.setCustomValidity("Saisissez une adresse e-mail valide.");
      else if (field instanceof HTMLInputElement && field.name === "phone" && !isValidPhone(field.value)) field.setCustomValidity("Saisissez un numéro de téléphone valide.");
    }} onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const value = (key: string) => String(data.get(key) ?? "").trim();
      for (const name of ["name", "city", "phone", "email", "type", "description"]) {
        if (value(name)) continue;
        const field = event.currentTarget.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        field.setCustomValidity("Veuillez renseigner ce champ.");
        field.reportValidity();
        return;
      }
      window.location.href = enquiryEmail({ name: value("name"), city: value("city"), phone: value("phone"), email: value("email"), type: value("type"), description: value("description") });
      setNotice("Votre demande est prête à être transmise. Vérifiez les informations avant l’envoi.");
    }}>
      <div className="form-row">
        <label><span className="form-label-text" data-scroll-item>Votre nom <span className="required-mark" aria-hidden="true">*</span></span><input name="name" autoComplete="name" required maxLength={100} data-scroll-item /></label>
        <label><span className="form-label-text" data-scroll-item>Ville du projet <span className="required-mark" aria-hidden="true">*</span></span><input name="city" autoComplete="address-level2" required maxLength={100} data-scroll-item /></label>
      </div>
      <div className="form-row">
        <label><span className="form-label-text" data-scroll-item>Votre téléphone <span className="required-mark" aria-hidden="true">*</span></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" required maxLength={24} data-scroll-item /></label>
        <label><span className="form-label-text" data-scroll-item>Votre adresse e-mail <span className="required-mark" aria-hidden="true">*</span></span><input name="email" type="email" autoComplete="email" required maxLength={254} data-scroll-item /></label>
      </div>
      <label><span className="form-label-text" data-scroll-item>Type de projet <span className="required-mark" aria-hidden="true">*</span></span><span className="form-select"><select name="type" defaultValue="" required data-scroll-item><option value="" disabled>Choisissez un type de projet</option><option>Construction / gros œuvre</option><option>Rénovation / finitions</option><option>Étanchéité</option><option>Second œuvre / techniques</option><option>Conseil / suivi</option><option>Autre projet</option></select><span className="form-select-arrow" aria-hidden="true" data-scroll-item><FontAwesomeIcon icon={faChevronDown} /></span></span></label>
      <label><span className="form-label-text" data-scroll-item>Décrivez votre projet <span className="required-mark" aria-hidden="true">*</span></span><textarea name="description" rows={4} required maxLength={2000} placeholder="Nature des travaux, état du projet, plans disponibles…" data-scroll-item /></label>
      <p className="form-note" id="request-note" data-scroll-item>Votre demande sera transmise à Shams Busine et enregistrée dans notre base de données.</p>
      <button type="submit" className="button" aria-describedby="request-note" data-scroll-item>Envoyer ma demande <Arrow /></button>
      <p className="form-status" role="status" data-scroll-item>{notice}</p>
    </form>
  );
}
