import Image from "next/image";
import type { CmsPage } from "@/lib/cms/schema";
import type { CmsValues } from "@/lib/cms/content";
import { saveCmsPage } from "@/app/admin/pages/[slug]/actions";

type ImageOption = { publicId: string; localPath: string; secureUrl: string };

export function AdminCmsForm({
  page,
  content,
  images,
}: {
  page: CmsPage;
  content: CmsValues;
  images: ImageOption[];
}) {
  return (
    <form action={saveCmsPage} className="admin-cms-form">
      <input type="hidden" name="slug" value={page.slug} />
      {page.sections.map((group) => (
        <fieldset className="admin-cms-section" key={group.id}>
          <legend>{group.title}</legend>
          <div className="admin-cms-fields">
            {group.fields.map((field) => {
              const value = content[field.key] ?? field.defaultValue;
              const id = `${page.slug}-${field.key}`;
              if (field.kind === "image") {
                const selected = images.find((asset) => asset.publicId === value) ?? images[0];
                return (
                  <div className="admin-cms-field admin-cms-image-field" key={field.key}>
                    <label htmlFor={id}>{field.label}</label>
                    <select id={id} name={field.key} defaultValue={selected?.publicId ?? ""} required>
                      {images.map((asset) => (
                        <option value={asset.publicId} key={asset.publicId}>
                          {asset.localPath.split("/").at(-1)}
                        </option>
                      ))}
                    </select>
                    {selected && (
                      <Image
                        className="admin-cms-preview"
                        src={selected.secureUrl}
                        alt=""
                        width={240}
                        height={150}
                        sizes="240px"
                      />
                    )}
                  </div>
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
                  />
                  <span id={`${id}-limit`} className="admin-cms-limit">Maximum {field.maxLength} caractères</span>
                </div>
              );
            })}
          </div>
        </fieldset>
      ))}
      <button className="button" type="submit">Enregistrer cette page</button>
    </form>
  );
}
