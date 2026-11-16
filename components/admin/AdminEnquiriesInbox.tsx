"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";

type EnquiryAttachment = {
  filename: string;
  contentType: string;
  size: number;
  previewUrl: string;
  downloadUrl: string;
};

export type AdminEnquiry = {
  id: string;
  name: string;
  city: string;
  phone: string;
  email: string;
  project_type: string;
  description: string;
  attachments: EnquiryAttachment[];
  created_at: string;
};

type AttachmentFilter = "all" | "with-files";
type SortOrder = "newest" | "oldest";

const queueDate = new Intl.DateTimeFormat("fr-MA", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Casablanca",
});
const fullDate = new Intl.DateTimeFormat("fr-MA", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Africa/Casablanca",
});

export function AdminEnquiriesInbox({ enquiries }: { enquiries: AdminEnquiry[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(() => enquiries[0]?.id ?? null);
  const [search, setSearch] = useState("");
  const [attachmentFilter, setAttachmentFilter] = useState<AttachmentFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [preview, setPreview] = useState<EnquiryAttachment | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previewTriggerRef = useRef<HTMLButtonElement>(null);
  const lastSelectedTriggerRef = useRef<HTMLButtonElement>(null);
  const idPrefix = useId();

  const normalizedSearch = normalize(search.trim());
  const visibleEnquiries = enquiries
    .filter((enquiry) => attachmentFilter === "all" || enquiry.attachments.length > 0)
    .filter((enquiry) => !normalizedSearch || normalize([
      enquiry.name,
      enquiry.city,
      enquiry.phone,
      enquiry.email,
      enquiry.project_type,
      enquiry.description,
      ...enquiry.attachments.map((attachment) => attachment.filename),
    ].join(" ")).includes(normalizedSearch))
    .sort((left, right) => {
      const comparison = Date.parse(left.created_at) - Date.parse(right.created_at);
      return sortOrder === "newest" ? -comparison : comparison;
    });
  const selected = visibleEnquiries.find((enquiry) => enquiry.id === selectedId) ?? visibleEnquiries[0] ?? null;
  const withFilesCount = enquiries.filter((enquiry) => enquiry.attachments.length > 0).length;

  useEffect(() => {
    if (preview && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  }, [preview]);

  function selectEnquiry(enquiry: AdminEnquiry, button: HTMLButtonElement) {
    lastSelectedTriggerRef.current = button;
    setSelectedId(enquiry.id);
    setMobileDetailOpen(true);
  }

  function openPreview(attachment: EnquiryAttachment, button: HTMLButtonElement) {
    previewTriggerRef.current = button;
    setPreview(attachment);
  }

  function closePreview() {
    dialogRef.current?.close();
  }

  function restorePreviewFocus() {
    setPreview(null);
    previewTriggerRef.current?.focus();
    previewTriggerRef.current = null;
  }

  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closePreview();
  }

  function returnToList() {
    setMobileDetailOpen(false);
    requestAnimationFrame(() => lastSelectedTriggerRef.current?.focus());
  }

  function clearFilters() {
    setSearch("");
    setAttachmentFilter("all");
    setSortOrder("newest");
    setSelectedId(enquiries[0]?.id ?? null);
  }

  return (
    <div className="admin-devis-inbox" data-ui="inbox">
      <div className="admin-devis-layout">
        <section
          className={`admin-devis-list-panel${mobileDetailOpen ? " is-hidden" : ""}`}
          aria-labelledby={`${idPrefix}-list-heading`}
        >
          <header className="admin-devis-list-header">
            <div className="admin-devis-list-title-row">
              <h2 id={`${idPrefix}-list-heading`}>Demandes récentes</h2>
              <span className="admin-devis-loaded-count">
                {enquiries.length} {enquiries.length === 1 ? "demande" : "demandes"}
              </span>
            </div>
            <div className="admin-devis-search-field">
              <label htmlFor={`${idPrefix}-search`}>Rechercher</label>
              <input
                id={`${idPrefix}-search`}
                className="admin-devis-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                placeholder="Nom, e-mail, ville ou service"
                autoComplete="off"
              />
            </div>
            <div className="admin-devis-filter-row">
              <div className="admin-devis-filter-group" role="group" aria-label="Filtrer les demandes">
                <button
                  className="admin-devis-filter-button"
                  type="button"
                  aria-pressed={attachmentFilter === "all"}
                  onClick={() => setAttachmentFilter("all")}
                >
                  Toutes <span>{enquiries.length}</span>
                </button>
                <button
                  className="admin-devis-filter-button"
                  type="button"
                  aria-pressed={attachmentFilter === "with-files"}
                  onClick={() => setAttachmentFilter("with-files")}
                >
                  Avec fichiers <span>{withFilesCount}</span>
                </button>
              </div>
              <label className="admin-devis-sort-field" htmlFor={`${idPrefix}-sort`}>
                <span>Trier</span>
                <select
                  id={`${idPrefix}-sort`}
                  className="admin-devis-sort"
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.currentTarget.value as SortOrder)}
                >
                  <option value="newest">Plus récentes</option>
                  <option value="oldest">Plus anciennes</option>
                </select>
              </label>
            </div>
            <p className="admin-devis-result-count" role="status" aria-live="polite" aria-atomic="true">
              {visibleEnquiries.length === 0
                ? "Aucun résultat"
                : `${visibleEnquiries.length} ${visibleEnquiries.length === 1 ? "résultat" : "résultats"}`}
            </p>
          </header>

          {visibleEnquiries.length ? (
            <ol className="admin-devis-request-list">
              {visibleEnquiries.map((enquiry) => (
                <li key={enquiry.id}>
                  <button
                    className={`admin-devis-request${selected?.id === enquiry.id ? " is-selected" : ""}`}
                    type="button"
                    aria-pressed={selected?.id === enquiry.id}
                    onClick={(event) => selectEnquiry(enquiry, event.currentTarget)}
                  >
                    <span className="admin-devis-request-top">
                      <strong>{enquiry.name}</strong>
                      <time dateTime={enquiry.created_at}>{queueDate.format(new Date(enquiry.created_at))}</time>
                    </span>
                    <span className="admin-devis-request-project">
                      <span>{enquiry.project_type}</span>
                      <span aria-hidden="true">·</span>
                      <span>{enquiry.city}</span>
                    </span>
                    <span className="admin-devis-request-files">{attachmentLabel(enquiry.attachments.length)}</span>
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <div className="admin-devis-list-empty">
              <p>{enquiries.length ? "Aucune demande ne correspond à ces filtres." : "Aucune demande reçue pour le moment."}</p>
              {!enquiries.length ? (
                <p>Les nouvelles demandes s’afficheront ici.</p>
              ) : (
                <button className="admin-devis-clear-filters" type="button" onClick={clearFilters}>
                  Effacer les filtres
                </button>
              )}
            </div>
          )}
        </section>

        <section
          className={`admin-devis-detail-panel${mobileDetailOpen ? " is-visible" : ""}`}
          aria-labelledby={`${idPrefix}-detail-heading`}
        >
          {selected ? (
            <>
              <button className="admin-devis-mobile-back" type="button" onClick={returnToList}>
                <ArrowLeft />
                <span>Retour aux demandes</span>
              </button>
              <header className="admin-devis-detail-header">
                <h2 id={`${idPrefix}-detail-heading`}>{selected.name}</h2>
                <time dateTime={selected.created_at}>{fullDate.format(new Date(selected.created_at))}</time>
              </header>

              <dl className="admin-devis-project-facts">
                <div><dt>Projet</dt><dd>{selected.project_type}</dd></div>
                <div><dt>Ville</dt><dd>{selected.city}</dd></div>
              </dl>

              <section className="admin-devis-detail-section" aria-labelledby={`${idPrefix}-contact-heading`}>
                <h3 id={`${idPrefix}-contact-heading`}>Contacter le demandeur</h3>
                <div className="admin-devis-contact-links">
                  <a className="admin-devis-contact-primary" href={`mailto:${encodeURIComponent(selected.email)}`}>
                    <span>Envoyer un e-mail</span>
                    <strong>{selected.email}</strong>
                  </a>
                  <a className="admin-devis-contact-secondary" href={`tel:${selected.phone.replace(/[^+\d]/g, "")}`}>
                    <span>Appeler</span>
                    <strong>{selected.phone}</strong>
                  </a>
                </div>
              </section>

              <section className="admin-devis-detail-section" aria-labelledby={`${idPrefix}-brief-heading`}>
                <h3 id={`${idPrefix}-brief-heading`}>Brief du projet</h3>
                <p className="admin-devis-description">{selected.description}</p>
              </section>

              <section className="admin-devis-detail-section" aria-labelledby={`${idPrefix}-files-heading`}>
                <div className="admin-devis-files-heading">
                  <h3 id={`${idPrefix}-files-heading`}>Pièces jointes</h3>
                  <span>{attachmentLabel(selected.attachments.length)}</span>
                </div>
                {selected.attachments.length ? (
                  <ul className="admin-devis-file-list">
                    {selected.attachments.map((attachment, index) => (
                      <li className="admin-devis-file" key={`${attachment.filename}-${index}`}>
                        <AttachmentVisual attachment={attachment} onPreview={openPreview} />
                        <div className="admin-devis-file-info">
                          <p className="admin-devis-file-name">{attachment.filename}</p>
                          <p className="admin-devis-file-meta">
                            {fileTypeLabel(attachment)} <span aria-hidden="true">·</span> {formatFileSize(attachment.size)}
                          </p>
                          <div className="admin-devis-file-actions">
                            <button
                              type="button"
                              aria-label={`Aperçu ${attachment.filename}`}
                              onClick={(event) => openPreview(attachment, event.currentTarget)}
                            >
                              Aperçu
                            </button>
                            <a href={attachment.downloadUrl} aria-label={`Télécharger ${attachment.filename}`}>
                              Télécharger
                            </a>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="admin-devis-files-empty">Aucune pièce jointe pour cette demande.</p>
                )}
              </section>
            </>
          ) : (
            <div className="admin-devis-detail-empty">
              <h2 id={`${idPrefix}-detail-heading`}>Aucune demande sélectionnée</h2>
              <p>Choisissez une demande pour consulter son brief, ses coordonnées et ses pièces jointes.</p>
            </div>
          )}
        </section>
      </div>

      <dialog
        ref={dialogRef}
        className="admin-devis-preview-dialog"
        aria-labelledby={`${idPrefix}-preview-heading`}
        onClose={restorePreviewFocus}
        onClick={handleDialogClick}
      >
        <header className="admin-devis-preview-header">
          <h2 id={`${idPrefix}-preview-heading`}>{preview?.filename ?? "Pièce jointe"}</h2>
          <button className="admin-devis-close-preview" type="button" autoFocus onClick={closePreview}>
            Fermer<span className="admin-devis-visually-hidden"> l’aperçu</span>
          </button>
        </header>
        {preview && (
          isPdf(preview) ? (
            <div className="admin-devis-pdf-preview">
              <iframe src={preview.previewUrl} title={`Aperçu PDF : ${preview.filename}`} />
              <p>Le PDF ne s’affiche pas ? <a href={preview.downloadUrl}>Télécharger le document</a>.</p>
            </div>
          ) : isImage(preview) ? (
            <div className="admin-devis-image-preview">
              <Image src={preview.previewUrl} alt={`Aperçu de ${preview.filename}`} fill sizes="(max-width: 760px) 100vw, 80vw" unoptimized />
            </div>
          ) : (
            <p className="admin-devis-preview-fallback">
              L’aperçu n’est pas disponible pour ce format. <a href={preview.downloadUrl}>Télécharger le fichier</a>.
            </p>
          )
        )}
      </dialog>
    </div>
  );
}

function AttachmentVisual({ attachment, onPreview }: {
  attachment: EnquiryAttachment;
  onPreview: (attachment: EnquiryAttachment, button: HTMLButtonElement) => void;
}) {
  return isImage(attachment) ? (
    <button
      className="admin-devis-image-thumb"
      type="button"
      aria-label={`Agrandir ${attachment.filename}`}
      onClick={(event) => onPreview(attachment, event.currentTarget)}
    >
      <Image src={attachment.previewUrl} alt="" width={104} height={78} sizes="104px" unoptimized />
    </button>
  ) : (
    <button
      className="admin-devis-file-visual"
      type="button"
      aria-label={`Ouvrir l’aperçu de ${attachment.filename}`}
      onClick={(event) => onPreview(attachment, event.currentTarget)}
    >
      <DocumentIcon />
      <span>{fileTypeLabel(attachment)}</span>
    </button>
  );
}

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr-MA");
}

function attachmentLabel(count: number) {
  if (count === 0) return "Aucune pièce jointe";
  return `${count} ${count === 1 ? "fichier" : "fichiers"}`;
}

function fileTypeLabel(attachment: EnquiryAttachment) {
  if (isPdf(attachment)) return "PDF";
  const extension = attachment.filename.split(".").pop();
  return extension && extension !== attachment.filename ? extension.toUpperCase() : "Fichier";
}

function isPdf(attachment: EnquiryAttachment) {
  return attachment.contentType === "application/pdf" || attachment.filename.toLocaleLowerCase("fr-MA").endsWith(".pdf");
}

function isImage(attachment: EnquiryAttachment) {
  return attachment.contentType.startsWith("image/") || /\.(jpe?g|png|webp)$/i.test(attachment.filename);
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} Ko`;
  return `${(size / (1024 * 1024)).toLocaleString("fr-MA", { maximumFractionDigits: 1 })} Mo`;
}

function DocumentIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none">
      <path d="M7 3.75h6.5L19 9.3v11H7a2 2 0 0 1-2-2v-12.5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13 4v5.5h5.5M8.5 14h7M8.5 17h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20" fill="none">
      <path d="m11.75 4.5-5.5 5.5 5.5 5.5M6.5 10h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
