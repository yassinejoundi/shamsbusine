"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Arrow } from "@/components/site/Arrow";
import { isValidPhone, projectTypes } from "@/lib/enquiry-validation";
import { contact } from "@/lib/site";

export function QuoteForm() {
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form className="quote-form" aria-label="Demande de devis" encType="multipart/form-data" onInput={(event) => {
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
    }} onSubmit={async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = new FormData(form);
      const value = (key: string) => String(data.get(key) ?? "").trim();
      for (const name of ["name", "city", "phone", "email", "type", "description"]) {
        if (value(name)) continue;
        const field = event.currentTarget.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        field.setCustomValidity("Veuillez renseigner ce champ.");
        field.reportValidity();
        return;
      }
      setIsSubmitting(true);
      setNotice("Envoi de votre demande…");
      try {
        const response = await fetch("/api/enquiries", { method: "POST", body: data });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Votre demande n’a pas pu être enregistrée.");
        form.reset();
        setNotice("Votre demande a été enregistrée. Vous pouvez aussi nous contacter directement par téléphone ou e-mail.");
      } catch (error) {
        setNotice(error instanceof Error ? error.message : "Votre demande n’a pas pu être enregistrée. Réessayez ou contactez-nous directement.");
      } finally {
        setIsSubmitting(false);
      }
    }}>
      <div className="form-row">
        <label><span className="form-label-text">Votre nom <span className="required-mark" aria-hidden="true">*</span></span><input name="name" autoComplete="name" required maxLength={100} /></label>
        <label><span className="form-label-text">Ville du projet <span className="required-mark" aria-hidden="true">*</span></span><input name="city" autoComplete="address-level2" required maxLength={100} /></label>
      </div>
      <div className="form-row">
        <label><span className="form-label-text">Votre téléphone <span className="required-mark" aria-hidden="true">*</span></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" required maxLength={24} /></label>
        <label><span className="form-label-text">Votre adresse e-mail <span className="required-mark" aria-hidden="true">*</span></span><input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      </div>
      <label><span className="form-label-text">Type de projet <span className="required-mark" aria-hidden="true">*</span></span><span className="form-select"><select name="type" defaultValue="" required><option value="" disabled>Choisissez un type de projet</option>{projectTypes.map((type) => <option key={type}>{type}</option>)}</select><span className="form-select-arrow" aria-hidden="true"><FontAwesomeIcon icon={faChevronDown} /></span></span></label>
      <label><span className="form-label-text">Décrivez votre projet <span className="required-mark" aria-hidden="true">*</span></span><textarea name="description" rows={4} required maxLength={2000} placeholder="Nature des travaux, état du projet, plans disponibles…" /></label>
      <label><span className="form-label-text">Plans ou photos (facultatif)</span><input name="documents" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp" multiple aria-describedby="upload-note" /></label>
      <p className="form-note" id="upload-note">Jusqu’à 3 fichiers PDF, JPG, PNG ou WebP, 5 Mo par fichier et 10 Mo au total. Vos coordonnées et pièces jointes seront stockées pour traiter votre demande. N’envoyez pas de document sensible.</p>
      <button type="submit" className="button" aria-describedby="upload-note" disabled={isSubmitting}>{isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"} <Arrow /></button>
      <p className="form-status" role="status" aria-live="polite">{notice}</p>
      <noscript><p className="form-note">Pour nous contacter sans JavaScript, écrivez à <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p></noscript>
    </form>
  );
}
