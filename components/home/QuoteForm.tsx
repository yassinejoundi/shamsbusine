"use client";

import { useId, useRef, useState, type ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCloudArrowUp, faFile, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Arrow } from "@/components/site/Arrow";
import { isValidPhone, projectTypes } from "@/lib/enquiry-validation";
import { getAttachmentLimitError, isAllowedAttachment, maxAttachmentCount } from "@/lib/enquiry-files";

function formatFileSize(bytes: number) {
  const size = bytes < 1024 * 1024 ? bytes / 1024 : bytes / (1024 * 1024);
  const unit = bytes < 1024 * 1024 ? "Ko" : "Mo";
  return `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 }).format(size)} ${unit}`;
}

type QuoteFormCopy = {
  formLabel: string;
  nameLabel: string;
  cityLabel: string;
  phoneLabel: string;
  emailLabel: string;
  typeLabel: string;
  typePlaceholder: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  attachmentsLabel: string;
  attachmentsNote: string;
  submitLabel: string;
};

const quoteFormCopy: QuoteFormCopy = {
  formLabel: "Demande de devis",
  nameLabel: "Votre nom",
  cityLabel: "Ville du projet",
  phoneLabel: "Votre téléphone",
  emailLabel: "Votre adresse e-mail",
  typeLabel: "Type de projet",
  typePlaceholder: "Choisissez un type de projet",
  descriptionLabel: "Décrivez votre projet",
  descriptionPlaceholder: "Nature des travaux, état du projet, plans disponibles…",
  attachmentsLabel: "Plans ou photos (facultatif)",
  attachmentsNote: "PDF, JPG, PNG ou WebP · 5 Mo maximum par fichier · 10 Mo au total · 3 fichiers maximum. Vos coordonnées et pièces jointes seront stockées pour traiter votre demande. N’envoyez pas de document sensible.",
  submitLabel: "Envoyer ma demande",
};

export function QuoteForm({ contactEmail }: { contactEmail: string }) {
  const copy = quoteFormCopy;
  const [notice, setNotice] = useState("");
  const [submissionError, setSubmissionError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentError, setAttachmentError] = useState("");
  const [isCheckingFiles, setIsCheckingFiles] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const uploadControlRef = useRef<HTMLButtonElement>(null);
  const successDialogRef = useRef<HTMLDialogElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const submissionLock = useRef(false);
  const uploadLabelId = useId();
  const uploadNoteId = useId();
  const uploadErrorId = useId();
  const successTitleId = useId();
  const successMessageId = useId();
  const isAtAttachmentLimit = attachments.length >= maxAttachmentCount;

  async function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const selectedFiles = Array.from(input.files ?? []);
    input.value = "";
    if (!selectedFiles.length) return;

    setIsCheckingFiles(true);
    setAttachmentError("");
    const nextAttachments = [...attachments];
    const errors: string[] = [];
    try {
      for (const file of selectedFiles) {
          const limitError = getAttachmentLimitError([...nextAttachments, file]);
          if (limitError === "count") {
          errors.push("Vous pouvez joindre 3 fichiers maximum. Retirez-en un pour en ajouter un autre.");
          break;
        }
          if (limitError === "file-size") {
          errors.push(`${file.name} dépasse la limite de 5 Mo. Choisissez un fichier plus léger.`);
          continue;
        }
          if (limitError === "total-size") {
          errors.push(`${file.name} ferait dépasser la limite de 10 Mo au total. Choisissez des fichiers plus légers.`);
          continue;
        }
        if (!await isAllowedAttachment(file)) {
          errors.push(`${file.name} n’est pas un PDF, JPG, PNG ou WebP valide. Choisissez un fichier dans l’un de ces formats.`);
          continue;
        }
        nextAttachments.push(file);
      }
    } catch {
      errors.push("Un fichier n’a pas pu être vérifié. Réessayez avec un autre fichier.");
    } finally {
      setAttachments(nextAttachments);
      setAttachmentError(errors.join(" "));
      setIsCheckingFiles(false);
    }
  }

  return (
    <form className="quote-form" aria-label={copy.formLabel} aria-busy={isSubmitting} encType="multipart/form-data" onInput={(event) => {
      const field = event.target;
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
        if (field instanceof HTMLInputElement && field.name === "phone") field.value = field.value.replace(/\D/g, "");
        field.setCustomValidity("");
        if (field instanceof HTMLInputElement && field.name === "phone" && field.value && !isValidPhone(field.value)) {
          field.setCustomValidity("Saisissez un numéro de téléphone valide.");
        }
      }
      setNotice("");
      setSubmissionError(false);
    }} onInvalid={(event) => {
      const field = event.target;
      if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) return;
      if (field.validity.valueMissing) field.setCustomValidity("Veuillez renseigner ce champ.");
      else if (field instanceof HTMLInputElement && field.type === "email" && field.validity.typeMismatch) field.setCustomValidity("Saisissez une adresse e-mail valide.");
      else if (field instanceof HTMLInputElement && field.name === "phone" && !isValidPhone(field.value)) field.setCustomValidity("Saisissez un numéro de téléphone valide.");
    }} onSubmit={async (event) => {
      event.preventDefault();
      if (submissionLock.current) return;
      const form = event.currentTarget;
      const data = new FormData(form);
      data.delete("documents");
      attachments.forEach((file) => data.append("documents", file));
      const value = (key: string) => String(data.get(key) ?? "").trim();
      for (const name of ["name", "city", "phone", "email", "type", "description"]) {
        if (value(name)) continue;
        const field = event.currentTarget.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        field.setCustomValidity("Veuillez renseigner ce champ.");
        field.reportValidity();
        return;
      }
      submissionLock.current = true;
      setIsSubmitting(true);
      setNotice("Envoi de votre demande…");
      setSubmissionError(false);
      try {
        const response = await fetch("/api/enquiries", { method: "POST", body: data });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Votre demande n’a pas pu être enregistrée.");
        form.reset();
        setAttachments([]);
        setAttachmentError("");
        setNotice("");
        successDialogRef.current?.showModal();
      } catch (error) {
        setNotice(error instanceof Error ? error.message : "Votre demande n’a pas pu être enregistrée. Réessayez ou contactez-nous directement.");
        setSubmissionError(true);
      } finally {
        submissionLock.current = false;
        setIsSubmitting(false);
      }
    }}>
      <div className="form-row">
        <label><span className="form-label-text">{copy.nameLabel} <span className="required-mark" aria-hidden="true">*</span></span><input name="name" autoComplete="name" required maxLength={100} /></label>
        <label><span className="form-label-text">{copy.cityLabel} <span className="required-mark" aria-hidden="true">*</span></span><input name="city" autoComplete="address-level2" required maxLength={100} /></label>
      </div>
      <div className="form-row">
        <label><span className="form-label-text">{copy.phoneLabel} <span className="required-mark" aria-hidden="true">*</span></span><input name="phone" type="tel" autoComplete="tel" inputMode="numeric" pattern="(?:[1-9][0-9]{7,14}|0[5-7][0-9]{8})" title="Saisissez 8 à 15 chiffres avec l’indicatif du pays ou un numéro marocain sur 10 chiffres commençant par 05, 06 ou 07." required maxLength={15} /></label>
        <label><span className="form-label-text">{copy.emailLabel} <span className="required-mark" aria-hidden="true">*</span></span><input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      </div>
      <label><span className="form-label-text">{copy.typeLabel} <span className="required-mark" aria-hidden="true">*</span></span><span className="form-select"><select name="type" defaultValue="" required><option value="" disabled>{copy.typePlaceholder}</option>{projectTypes.map((type) => <option key={type}>{type}</option>)}</select><span className="form-select-arrow" aria-hidden="true"><FontAwesomeIcon icon={faChevronDown} /></span></span></label>
      <label><span className="form-label-text">{copy.descriptionLabel} <span className="required-mark" aria-hidden="true">*</span></span><textarea name="description" rows={4} required maxLength={2000} placeholder={copy.descriptionPlaceholder} /></label>
      <div className="upload-group" role="group" aria-labelledby={uploadLabelId}>
        <span className="form-label-text" id={uploadLabelId}>{copy.attachmentsLabel}</span>
        <div className="upload-picker">
          <input ref={uploadInputRef} className="upload-input" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp" multiple disabled={isAtAttachmentLimit || isCheckingFiles || isSubmitting} aria-hidden="true" tabIndex={-1} onChange={(event) => { void handleFilesChange(event); }} />
          <button ref={uploadControlRef} type="button" className="upload-control" disabled={isAtAttachmentLimit || isCheckingFiles || isSubmitting} aria-describedby={`${uploadNoteId}${attachmentError ? ` ${uploadErrorId}` : ""}`} onClick={() => uploadInputRef.current?.click()}>
            <FontAwesomeIcon icon={faCloudArrowUp} aria-hidden="true" />
            <span className="upload-copy"><strong>{isCheckingFiles ? "Vérification des fichiers…" : "Ajouter des fichiers"}</strong><span>{isAtAttachmentLimit ? "Retirez un fichier pour continuer" : "Plans et photos de votre projet"}</span></span>
            {!isAtAttachmentLimit && <span className="upload-action">Parcourir</span>}
          </button>
        </div>
        {attachments.length > 0 && <ul className="upload-list" aria-label="Fichiers joints">
          {attachments.map((file, index) => <li className="upload-file" key={`${file.name}-${file.size}-${file.lastModified}-${index}`}>
            <FontAwesomeIcon icon={faFile} aria-hidden="true" />
            <span className="upload-file-details"><span className="upload-file-name">{file.name}</span><span className="upload-file-size">{formatFileSize(file.size)}</span></span>
            <button className="upload-remove" type="button" aria-label={`Retirer ${file.name}`} onClick={(event) => {
              const row = event.currentTarget.closest("li");
              const nextFocusTarget = row?.nextElementSibling?.querySelector<HTMLButtonElement>(".upload-remove")
                ?? row?.previousElementSibling?.querySelector<HTMLButtonElement>(".upload-remove")
                ?? uploadControlRef.current;
              setAttachments((current) => current.filter((_, fileIndex) => fileIndex !== index));
              setAttachmentError("");
              requestAnimationFrame(() => nextFocusTarget?.focus());
            }}><FontAwesomeIcon icon={faXmark} aria-hidden="true" /><span>Retirer</span></button>
          </li>)}
        </ul>}
        <p className="upload-live-status" role="status">{attachments.length ? `${attachments.length} fichier${attachments.length > 1 ? "s" : ""} joint${attachments.length > 1 ? "s" : ""}.` : ""}</p>
        <p className="upload-error" id={uploadErrorId} role="alert">{attachmentError}</p>
        <p className="form-note upload-note" id={uploadNoteId}>{copy.attachmentsNote}</p>
      </div>
      <button ref={submitButtonRef} type="submit" className="button" aria-describedby={uploadNoteId} aria-disabled={isSubmitting}>{isSubmitting ? "Envoi en cours…" : copy.submitLabel} <Arrow /></button>
      <p className="form-status" role={submissionError ? "alert" : "status"}>{notice}</p>
      <dialog ref={successDialogRef} className="enquiry-success" aria-labelledby={successTitleId} aria-describedby={successMessageId} onClose={() => submitButtonRef.current?.focus()}>
        <h2 id={successTitleId}>Merci pour votre demande.</h2>
        <p id={successMessageId}>Votre demande a bien été enregistrée. Vous pouvez nous joindre directement si vous souhaitez ajouter une précision.</p>
        <button className="button" type="button" onClick={() => successDialogRef.current?.close()}>Fermer</button>
      </dialog>
      <noscript><p className="form-note">Pour nous contacter sans JavaScript, écrivez à <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p></noscript>
    </form>
  );
}
