"use client";

import { useActionState, useEffect, useState } from "react";
import type { CmsPage, CmsSection } from "@/lib/cms/schema";
import type { CmsValues } from "@/lib/cms/content";
import { AdminCmsImageField, type CmsImageOption } from "@/components/admin/AdminCmsImageField";
import { useAdminUnsavedChanges } from "@/components/admin/AdminUnsavedChangesProvider";
import { saveCmsSection } from "@/app/admin/pages/[slug]/actions";

const initialSaveState: Awaited<ReturnType<typeof saveCmsSection>> = { status: "idle", sectionId: "" };

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
    <div className="admin-cms-form">
      {page.sections.map((section) => (
        <AdminCmsSectionForm key={section.id} page={page} section={section} content={content} images={images} />
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
  const dirtyId = `${page.slug}:${section.id}`;

  useEffect(() => {
    if (state.status === "saved") markClean(dirtyId);
  }, [dirtyId, markClean, state]);

  function handleChange() {
    markDirty(dirtyId);
    setChangedAfterSave(true);
  }

  return (
    <form action={formAction} className="admin-cms-section-form" aria-busy={isPending} onSubmit={() => setChangedAfterSave(false)}>
      <input type="hidden" name="slug" value={page.slug} />
      <input type="hidden" name="sectionId" value={section.id} />
      <fieldset className="admin-cms-section">
        <legend>{section.title}</legend>
        <div className="admin-cms-fields">
          {section.fields.map((field) => {
            const value = content[field.key] ?? field.defaultValue;
            const id = `${page.slug}-${field.key}`;
            if (field.kind === "image") {
              return (
                <AdminCmsImageField
                  key={field.key}
                  pageSlug={page.slug}
                  fieldKey={field.key}
                  label={field.label}
                  selectedId={value}
                  images={images}
                  onDirtyChange={handleChange}
                />
              );
            }
            const rows = field.maxLength > 150 ? 4 : field.maxLength > 50 ? 2 : 1;
            return (
              <div className="admin-cms-field" key={field.key}>
                <label htmlFor={id}>{field.label}</label>
                <textarea
                  id={id}
                  name={field.key}
                  defaultValue={value}
                  rows={rows}
                  maxLength={field.maxLength}
                  required
                  aria-describedby={`${id}-limit`}
                  onChange={handleChange}
                />
                <span id={`${id}-limit`} className="admin-cms-limit">Maximum {field.maxLength} caractères</span>
              </div>
            );
          })}
        </div>
      </fieldset>
      {state.status === "saved" && !changedAfterSave && !isPending && <p className="admin-save-status" role="status">Modifications enregistrées.</p>}
      {state.status === "invalid" && <p className="admin-save-error" role="alert">Vérifiez les champs obligatoires et leurs limites avant de réessayer.</p>}
      {state.status === "save" && <p className="admin-save-error" role="alert">Enregistrement impossible. Vérifiez la connexion à la base Neon, puis réessayez.</p>}
      <button className="button admin-section-save" type="submit" disabled={isPending}>
        {isPending ? "Enregistrement…" : "Enregistrer les modifications"}
      </button>
    </form>
  );
}
