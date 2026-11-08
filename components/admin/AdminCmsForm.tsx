"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import type { CmsPage, CmsSection } from "@/lib/cms/schema";
import type { CmsValues } from "@/lib/cms/content";
import { AdminCmsImageField, uploadCmsImage, type CmsImageOption } from "@/components/admin/AdminCmsImageField";
import { AdminCmsPartnersForm } from "@/components/admin/AdminCmsPartnersForm";
import { AdminCmsSocialLinksField } from "@/components/admin/AdminCmsSocialLinksField";
import { useAdminUnsavedChanges } from "@/components/admin/AdminUnsavedChangesProvider";
import { saveCmsSection } from "@/app/admin/pages/[slug]/actions";

const initialSaveState: Awaited<ReturnType<typeof saveCmsSection>> = { status: "idle", sectionId: "" };
type PendingCmsImage = { file: File; onUploaded: (asset: CmsImageOption) => void };

function relatedImageFields(image: CmsSection["fields"][number], fields: CmsSection["fields"]) {
  const stems = [image.key, image.key.replace(/image$/i, "")];
  const relatedKeys = new Set(stems.flatMap((stem) => [
    `${stem}Alt`, `${stem}alt`, `${stem}Caption`, `${stem}caption`, `${stem}Description`, `${stem}description`,
  ]));
  return fields.filter((field) => field.kind === "text" && relatedKeys.has(field.key));
}

export function AdminCmsForm({
  page,
  content,
  images,
}: {
  page: CmsPage;
  content: CmsValues;
  images: CmsImageOption[];
}) {
  return (
    <div className={`admin-cms-form${page.scope === "global" ? " admin-site-settings" : ""}`}>
      {page.sections.map((section) => (
        page.slug === "entreprise" && section.id === "partners"
          ? <AdminCmsPartnersForm key={section.id} page={page} section={section} content={content} images={images} />
          : <AdminCmsSectionForm key={section.id} page={page} section={section} content={content} images={images} />
      ))}
    </div>
  );
}

function AdminCmsSectionForm({
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
  const [changedAfterSave, setChangedAfterSave] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [uploadError, setUploadError] = useState("");
  const pendingImages = useRef(new Map<string, PendingCmsImage>());
  const dirtyId = `${page.slug}:${section.id}`;
  const isBusy = isPending || isUploadingImages;

  useEffect(() => {
    if (state.status === "saved") {
      markClean(dirtyId);
    }
  }, [dirtyId, markClean, state]);

  function handleChange() {
    markDirty(dirtyId);
    setChangedAfterSave(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isBusy) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const uploads = Array.from(pendingImages.current.entries());
    setChangedAfterSave(false);
    setUploadError("");

    if (uploads.length === 0) {
      startTransition(() => formAction(formData));
      return;
    }

    setIsUploadingImages(true);
    try {
      for (const [index, [fieldKey, pending]] of uploads.entries()) {
        setUploadProgress(`Optimisation et envoi de l’image ${index + 1}/${uploads.length}…`);
        const asset = await uploadCmsImage(pending.file, page.slug, fieldKey);
        formData.set(fieldKey, asset.publicId);
        pendingImages.current.delete(fieldKey);
        pending.onUploaded(asset);
      }
      startTransition(() => formAction(formData));
    } catch (error) {
      setChangedAfterSave(true);
      setUploadError(error instanceof Error ? error.message : "Envoi impossible. Vérifiez la connexion, puis réessayez.");
    } finally {
      setIsUploadingImages(false);
      setUploadProgress("");
    }
  }

  function handleImageFileChange(fieldKey: string, file: File | null, onUploaded: (asset: CmsImageOption) => void) {
    if (file) pendingImages.current.set(fieldKey, { file, onUploaded });
    else pendingImages.current.delete(fieldKey);
  }

  function renderTextField(field: CmsSection["fields"][number]) {
    const value = content[field.key] ?? field.defaultValue;
    const id = `${page.slug}-${field.key}`;
    const rows = field.maxLength > 150 ? 4 : field.maxLength > 50 ? 2 : 1;
    return (
      <div className={`admin-cms-field${field.fullWidth ? " admin-cms-field-full" : ""}`} key={field.key}>
        <label htmlFor={id}>{field.label}</label>
        {field.inputType ? (
          <input
            id={id}
            name={field.key}
            type={field.inputType}
            defaultValue={value}
            maxLength={field.maxLength}
            required={!field.optional}
            inputMode={field.inputType === "tel" ? "numeric" : undefined}
            pattern={field.inputType === "tel" ? "(?:[1-9][0-9]{7,14}|0[5-7][0-9]{8})" : undefined}
            title={field.inputType === "tel" ? "Saisissez 8 à 15 chiffres avec l’indicatif du pays ou un numéro marocain sur 10 chiffres commençant par 05, 06 ou 07." : undefined}
            aria-describedby={field.inputType === "tel" ? `${id}-limit ${id}-number-note` : `${id}-limit`}
            onChange={(event) => {
              if (field.inputType === "tel") event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "");
              handleChange();
            }}
          />
        ) : (
          <textarea
            id={id}
            name={field.key}
            defaultValue={value}
            rows={rows}
            maxLength={field.maxLength}
            required={!field.optional}
            aria-describedby={`${id}-limit`}
            onChange={handleChange}
          />
        )}
        <span id={`${id}-limit`} className="admin-cms-limit">Maximum {field.maxLength} caractères</span>
        {field.inputType === "tel" && <span id={`${id}-number-note`} className="admin-cms-limit">Chiffres uniquement : indicatif international ou numéro marocain sur 10 chiffres.</span>}
      </div>
    );
  }

  const consumedFieldKeys = new Set<string>();

  return (
    <form action={formAction} className={`admin-cms-section-form${page.scope === "global" ? " admin-site-settings-row" : ""}`} aria-busy={isBusy} onSubmit={handleSubmit}>
      <input type="hidden" name="slug" value={page.slug} />
      <input type="hidden" name="sectionId" value={section.id} />
      {page.scope === "global" && (
        <div className="admin-site-settings-guide">
          <h2>{section.title}</h2>
          {section.description && <p>{section.description}</p>}
        </div>
      )}
      <fieldset className="admin-cms-section" disabled={isBusy}>
        <legend className={page.scope === "global" ? "admin-site-settings-legend" : undefined}>{section.title}</legend>
        <div className="admin-cms-fields">
          {section.fields.map((field) => {
            if (consumedFieldKeys.has(field.key)) return null;
            if (field.kind === "text") return renderTextField(field);
            if (field.kind === "social-list") {
              return <AdminCmsSocialLinksField key={field.key} name={field.key} label={field.label} value={content[field.key] ?? field.defaultValue} onDirtyChange={handleChange} />;
            }
            if (field.kind !== "image") return null;
            const metadataFields = relatedImageFields(field, section.fields);
            metadataFields.forEach((metadata) => consumedFieldKeys.add(metadata.key));
            const rowClass = metadataFields.length === 1 ? "has-one-meta" : metadataFields.length > 1 ? "has-two-meta" : "no-meta";
            return (
              <div className={`admin-cms-image-row ${rowClass}`} key={field.key}>
                <AdminCmsImageField
                  pageSlug={page.slug}
                  fieldKey={field.key}
                  label={field.label}
                  selectedId={content[field.key] ?? field.defaultValue}
                  images={images}
                  onDirtyChange={handleChange}
                  onFileChange={(file, onUploaded) => handleImageFileChange(field.key, file, onUploaded)}
                />
                {metadataFields.length > 0 && (
                  <div className="admin-cms-image-meta">
                    {metadataFields.map(renderTextField)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </fieldset>
      {uploadProgress && <p className="admin-save-status" role="status" aria-live="polite">{uploadProgress}</p>}
      {uploadError && <p className="admin-save-error" role="alert">{uploadError}</p>}
      {state.status === "saved" && !changedAfterSave && !isBusy && <p className="admin-save-status" role="status">Modifications enregistrées.</p>}
      {state.status === "invalid" && <p className="admin-save-error" role="alert">Vérifiez les champs obligatoires et leurs limites avant de réessayer.</p>}
      {state.status === "save" && <p className="admin-save-error" role="alert">Enregistrement impossible. Réessayez. Si le problème persiste, contactez l’administrateur.</p>}
      <button className="button admin-section-save" type="submit" disabled={isBusy}>
        {isUploadingImages ? "Optimisation et enregistrement…" : isPending ? "Enregistrement…" : "Enregistrer les modifications"}
      </button>
    </form>
  );
}
