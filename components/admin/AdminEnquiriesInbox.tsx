"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import styles from "./AdminEnquiriesInbox.module.css";

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
  const firstWithFiles = enquiries.find((enquiry) => enquiry.attachments.length > 0);
  const [selectedId, setSelectedId] = useState<string | null>((firstWithFiles ?? enquiries[0])?.id ?? null);
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

  return (
    <div className={styles.inbox} data-ui="inbox">
      <div className={styles.layout}>
        <section
          className={`${styles.listPanel}${mobileDetailOpen ? ` ${styles.listHidden}` : ""}`}
          aria-labelledby={`${idPrefix}-list-heading`}
        >
        <header className={styles.listHeader}>
          <div className={styles.listTitleRow}>
            <h2 id={`${idPrefix}-list-heading`}>Demandes récentes</h2>
            <span className={styles.loadedCount}>{enquiries.length} chargée{enquiries.length === 1 ? "" : "s"}</span>
          </div>
          <label className={styles.visuallyHidden} htmlFor={`${idPrefix}-search`}>Rechercher une demande</label>
          <input
            id={`${idPrefix}-search`}
            className={styles.search}
            type="search"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Nom, e-mail, ville, service…"
            autoComplete="off"
          />
          <div className={styles.filterRow}>
            <div className={styles.filterGroup} role="group" aria-label="Filtrer les demandes">
              <button
                className={styles.filterButton}
                type="button"
                aria-pressed={attachmentFilter === "all"}
                onClick={() => setAttachmentFilter("all")}
              >
                Toutes <span>{enquiries.length}</span>
              </button>
              <button
                className={styles.filterButton}
                type="button"
                aria-pressed={attachmentFilter === "with-files"}
                onClick={() => setAttachmentFilter("with-files")}
              >
                Avec fichiers <span>{withFilesCount}</span>
              </button>
            </div>
            <label className={styles.visuallyHidden} htmlFor={`${idPrefix}-sort`}>Ordre chronologique</label>
            <select
              id={`${idPrefix}-sort`}
              className={styles.sort}
              value={sortOrder}
              onChange={(event) => setSortOrder(event.currentTarget.value as SortOrder)}
            >
              <option value="newest">Plus récentes</option>
              <option value="oldest">Plus anciennes</option>
            </select>
          </div>
          <p className={styles.resultCount} role="status" aria-live="polite" aria-atomic="true">
            {visibleEnquiries.length} résultat{visibleEnquiries.length === 1 ? "" : "s"}
          </p>
        </header>

        {visibleEnquiries.length ? (
          <ol className={styles.requestList}>
            {visibleEnquiries.map((enquiry) => (
              <li key={enquiry.id}>
                <button
                  className={`${styles.request}${selected?.id === enquiry.id ? ` ${styles.requestSelected}` : ""}`}
                  type="button"
                  aria-pressed={selected?.id === enquiry.id}
                  onClick={(event) => selectEnquiry(enquiry, event.currentTarget)}
                >
                  <span className={styles.requestTop}>
                    <strong>{enquiry.name}</strong>
                    <time dateTime={enquiry.created_at}>{queueDate.format(new Date(enquiry.created_at))}</time>
                  </span>
                  <span className={styles.requestService}>{enquiry.project_type} <span aria-hidden="true">·</span> {enquiry.city}</span>
                  <span className={styles.requestFoot}>
                    <span>{enquiry.email}</span>
                    <span>{attachmentLabel(enquiry.attachments.length)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <div className={styles.listEmpty}>
            <p>{enquiries.length ? "Aucune demande ne correspond à cette recherche." : "Aucune demande reçue pour le moment."}</p>
            {(search || attachmentFilter !== "all") && (
              <button className={styles.clearFilters} type="button" onClick={() => { setSearch(""); setAttachmentFilter("all"); }}>
                Effacer les filtres
              </button>
            )}
          </div>
        )}
        </section>

        <section
          className={`${styles.detailPanel}${mobileDetailOpen ? ` ${styles.detailVisible}` : ""}`}
          aria-labelledby={`${idPrefix}-detail-heading`}
        >
        {selected ? (
          <>
            <button className={styles.mobileBack} type="button" onClick={returnToList}>
              <ArrowLeft /> Retour aux demandes
            </button>
            <header className={styles.detailHeader}>
              <div>
                <h2 id={`${idPrefix}-detail-heading`}>{selected.name}</h2>
              </div>
              <time dateTime={selected.created_at}>{fullDate.format(new Date(selected.created_at))}</time>
            </header>

            <dl className={styles.projectFacts}>
              <div><dt>Projet</dt><dd>{selected.project_type}</dd></div>
              <div><dt>Ville</dt><dd>{selected.city}</dd></div>
            </dl>

            <section className={styles.detailSection} aria-labelledby={`${idPrefix}-contact-heading`}>
              <h3 id={`${idPrefix}-contact-heading`}>Contacter le demandeur</h3>
              <div className={styles.contactLinks}>
                <a href={`tel:${selected.phone.replace(/[^+\d]/g, "")}`}>
                  <span>Téléphone</span><strong>{selected.phone}</strong>
                </a>
                <a href={`mailto:${encodeURIComponent(selected.email)}`}>
                  <span>E-mail</span><strong>{selected.email}</strong>
                </a>
              </div>
            </section>

            <section className={styles.detailSection} aria-labelledby={`${idPrefix}-brief-heading`}>
              <h3 id={`${idPrefix}-brief-heading`}>Brief du projet</h3>
              <p className={styles.description}>{selected.description}</p>
            </section>

            <section className={styles.detailSection} aria-labelledby={`${idPrefix}-files-heading`}>
              <div className={styles.filesHeading}>
                <h3 id={`${idPrefix}-files-heading`}>Pièces jointes</h3>
                <span>{attachmentLabel(selected.attachments.length)}</span>
              </div>
              {selected.attachments.length ? (
                <ul className={styles.fileList}>
                  {selected.attachments.map((attachment, index) => (
                    <li className={styles.fileCard} key={`${attachment.filename}-${index}`}>
                      <AttachmentVisual attachment={attachment} onPreview={openPreview} />
                      <div className={styles.fileInfo}>
                        <p className={styles.fileName} title={attachment.filename}>{attachment.filename}</p>
                        <p className={styles.fileMeta}>{fileTypeLabel(attachment)} <span aria-hidden="true">·</span> {formatFileSize(attachment.size)}</p>
                        <div className={styles.fileActions}>
                          <button type="button" onClick={(event) => openPreview(attachment, event.currentTarget)}>Aperçu</button>
                          <a href={attachment.downloadUrl}>Télécharger</a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.filesEmpty}>Aucun fichier joint à cette demande.</p>
              )}
            </section>
          </>
        ) : (
          <div className={styles.detailEmpty}>
            <h2 id={`${idPrefix}-detail-heading`}>Aucune demande sélectionnée</h2>
            <p>Choisissez une demande dans la liste pour consulter son brief et ses pièces jointes.</p>
          </div>
        )}
        </section>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.previewDialog}
        aria-labelledby={`${idPrefix}-preview-heading`}
        onClose={restorePreviewFocus}
        onClick={handleDialogClick}
      >
        <header className={styles.previewHeader}>
          <div>
            <h2 id={`${idPrefix}-preview-heading`}>{preview?.filename ?? "Pièce jointe"}</h2>
          </div>
          <button className={styles.closePreview} type="button" autoFocus onClick={closePreview}>
            Fermer<span className={styles.visuallyHidden}> l’aperçu</span>
          </button>
        </header>
        {preview && (
          isPdf(preview) ? (
            <div className={styles.pdfPreview}>
              <iframe src={preview.previewUrl} title={`Aperçu PDF : ${preview.filename}`} />
              <p>Le PDF ne s’affiche pas ? <a href={preview.downloadUrl}>Télécharger le document</a>.</p>
            </div>
          ) : isImage(preview) ? (
            <div className={styles.imagePreview}>
              <Image src={preview.previewUrl} alt={`Aperçu de ${preview.filename}`} fill sizes="(max-width: 760px) 100vw, 80vw" unoptimized />
            </div>
          ) : (
            <p className={styles.previewFallback}>L’aperçu n’est pas disponible pour ce format. <a href={preview.downloadUrl}>Télécharger le fichier</a>.</p>
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
      className={styles.imageThumb}
      type="button"
      aria-label={`Agrandir ${attachment.filename}`}
      onClick={(event) => onPreview(attachment, event.currentTarget)}
    >
      <Image src={attachment.previewUrl} alt="" fill sizes="104px" unoptimized />
    </button>
  ) : (
    <button
      className={styles.fileVisual}
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
