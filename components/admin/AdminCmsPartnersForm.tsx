"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import type { CmsValues } from "@/lib/cms/content";
import type { CmsPage, CmsSection } from "@/lib/cms/schema";
import { parseCmsPartners, type CmsPartner } from "@/lib/cms/partners";
import { AdminCmsImageField, uploadCmsImage, type CmsImageOption } from "@/components/admin/AdminCmsImageField";
import { useAdminUnsavedChanges } from "@/components/admin/AdminUnsavedChangesProvider";
import { saveCmsSection } from "@/app/admin/pages/[slug]/actions";

const initialSaveState: Awaited<ReturnType<typeof saveCmsSection>> = { status: "idle", sectionId: "" };
type PendingCmsImage = { file: File; onUploaded: (asset: CmsImageOption) => void };

export function AdminCmsPartnersForm({
  page,
  section,
  content,
  images,
}: {
  page: CmsPage;
  section: CmsSection;
  content: CmsValues;
  images: CmsImageOption[];
}) {
  const [state, formAction, isPending] = useActionState(saveCmsSection, initialSaveState);
  const { markDirty, markClean } = useAdminUnsavedChanges();
  const [partners, setPartners] = useState<CmsPartner[]>(() => parseCmsPartners(content["partners.items"] ?? "") ?? []);
  const [changedAfterSave, setChangedAfterSave] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [uploadError, setUploadError] = useState("");
  const pendingImages = useRef(new Map<string, PendingCmsImage>());
  const dirtyId = `${page.slug}:${section.id}`;
  const isBusy = isPending || isUploadingImages;

  useEffect(() => {
    if (state.status === "saved") markClean(dirtyId);
  }, [dirtyId, markClean, state]);

  function markChanged() {
    markDirty(dirtyId);
    setChangedAfterSave(true);
  }

  function updatePartner(id: string, update: (partner: CmsPartner) => CmsPartner) {
    setPartners((current) => current.map((partner) => partner.id === id ? update(partner) : partner));
    markChanged();
  }

  function handleImageFileChange(fieldKey: string, file: File | null, onUploaded: (asset: CmsImageOption) => void) {
    if (!file) {
      pendingImages.current.delete(fieldKey);
      return;
    }
    pendingImages.current.set(fieldKey, {
      file,
      onUploaded: (asset) => {
        const id = fieldKey.match(/^partner\.([a-z0-9-]+)\.image$/i)?.[1];
        if (id) setPartners((current) => current.map((partner) => partner.id === id ? { ...partner, image: asset.publicId } : partner));
        onUploaded(asset);
      },
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isBusy) return;

    const formData = new FormData(event.currentTarget);
    const uploads = [...pendingImages.current.entries()];
    setChangedAfterSave(false);
    setUploadError("");

    if (uploads.length === 0) {
      startTransition(() => formAction(formData));
      return;
    }

    setIsUploadingImages(true);
    try {
      let savedPartners = partners;
      for (const [index, [fieldKey, pending]] of uploads.entries()) {
        setUploadProgress(`Optimisation et envoi de l’image ${index + 1}/${uploads.length}…`);
        const asset = await uploadCmsImage(pending.file, page.slug, fieldKey);
        const partnerId = fieldKey.match(/^partner\.([a-z0-9-]+)\.image$/i)?.[1];
        if (!partnerId) throw new Error("Champ image partenaire invalide.");
        savedPartners = savedPartners.map((partner) => partner.id === partnerId ? { ...partner, image: asset.publicId } : partner);
        formData.set(fieldKey, asset.publicId);
        pendingImages.current.delete(fieldKey);
        pending.onUploaded(asset);
      }
      setPartners(savedPartners);
      formData.set("partners.items", JSON.stringify(savedPartners));
      startTransition(() => formAction(formData));
    } catch (error) {
      setChangedAfterSave(true);
      setUploadError(error instanceof Error ? error.message : "Envoi impossible. Vérifiez la connexion, puis réessayez.");
    } finally {
      setIsUploadingImages(false);
      setUploadProgress("");
    }
  }

  function addPartner() {
    if (partners.length >= 50) return;
    setPartners((current) => [...current, {
      id: `partner-${crypto.randomUUID()}`,
      name: "",
      image: "",
      visible: false,
    }]);
    markChanged();
  }

  return (
    <form action={formAction} className="admin-cms-section-form" aria-busy={isBusy} onSubmit={handleSubmit}>
      <input type="hidden" name="slug" value={page.slug} />
      <input type="hidden" name="sectionId" value={section.id} />
      <input type="hidden" name="partners.items" value={JSON.stringify(partners)} />
      <fieldset className="admin-cms-section" disabled={isBusy}>
        <legend>{section.title}</legend>
        <div className="admin-cms-fields">
          {section.fields.filter((field) => field.kind === "text").map((field) => {
            const id = `${page.slug}-${field.key}`;
            const rows = field.maxLength > 150 ? 4 : field.maxLength > 50 ? 2 : 1;
            return (
              <div className="admin-cms-field" key={field.key}>
                <label htmlFor={id}>{field.label}</label>
                <textarea
                  id={id}
                  name={field.key}
                  defaultValue={content[field.key] ?? field.defaultValue}
                  rows={rows}
                  maxLength={field.maxLength}
                  required
                  aria-describedby={`${id}-limit`}
                  onChange={markChanged}
                />
                <span id={`${id}-limit`} className="admin-cms-limit">Maximum {field.maxLength} caractères</span>
              </div>
            );
          })}
        </div>
        <div className="admin-partner-grid">
          {partners.map((partner, index) => {
            const fieldKey = `partner.${partner.id}.image`;
            const nameId = `${page.slug}-${partner.id}-name`;
            const headingId = `${page.slug}-${partner.id}-heading`;
            return (
              <article className={`admin-partner-card${partner.visible ? "" : " is-hidden"}`} key={partner.id} aria-labelledby={headingId}>
                <header className="admin-partner-card-heading">
                  <h3 id={headingId}>Partenaire {index + 1}</h3>
                  <span className="admin-partner-status">{partner.visible ? "Publié" : "Masqué"}</span>
                </header>
                <div className="admin-cms-field">
                  <label htmlFor={nameId}>Nom du partenaire</label>
                  <input
                    id={nameId}
                    className="admin-partner-name"
                    type="text"
                    name={`partner.${partner.id}.name`}
                    value={partner.name}
                    maxLength={100}
                    required={partner.visible}
                    onChange={(event) => updatePartner(partner.id, (current) => ({ ...current, name: event.currentTarget.value }))}
                  />
                  <span className="admin-cms-limit">Maximum 100 caractères</span>
                </div>
                <AdminCmsImageField
                  pageSlug={page.slug}
                  fieldKey={fieldKey}
                  label={`Partenaire ${index + 1}, logo`}
                  selectedId={partner.image}
                  images={images}
                  onDirtyChange={markChanged}
                  onFileChange={(file, onUploaded) => handleImageFileChange(fieldKey, file, onUploaded)}
                />
                <button
                  className="admin-partner-toggle"
                  type="button"
                  aria-label={`${partner.visible ? "Masquer" : "Afficher"} Partenaire ${index + 1}`}
                  onClick={() => updatePartner(partner.id, (current) => ({ ...current, visible: !current.visible }))}
                >
                  {partner.visible ? "Masquer ce partenaire" : "Afficher ce partenaire"}
                </button>
              </article>
            );
          })}
        </div>
        <button className="button admin-add-partner" type="button" onClick={addPartner} disabled={partners.length >= 50}>
          Ajouter un partenaire
        </button>
      </fieldset>
      {uploadProgress && <p className="admin-save-status" role="status" aria-live="polite">{uploadProgress}</p>}
      {uploadError && <p className="admin-save-error" role="alert">{uploadError}</p>}
      {state.status === "saved" && !changedAfterSave && !isBusy && <p className="admin-save-status" role="status">Modifications enregistrées.</p>}
      {state.status === "invalid" && <p className="admin-save-error" role="alert">Chaque partenaire affiché doit avoir un nom et une image. Vérifiez les champs avant d’enregistrer.</p>}
      {state.status === "save" && <p className="admin-save-error" role="alert">Enregistrement impossible. Vérifiez la connexion à la base Neon, puis réessayez.</p>}
      <button className="button admin-section-save" type="submit" disabled={isBusy}>
        {isUploadingImages ? "Optimisation et enregistrement…" : isPending ? "Enregistrement…" : "Enregistrer les modifications"}
      </button>
    </form>
  );
}
