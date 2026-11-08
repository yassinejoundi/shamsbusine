"use client";

import { useId, useState } from "react";
import { parseCmsSocialLinks, type CmsSocialLink } from "@/lib/cms/social-links";

type SocialRow = CmsSocialLink & { key: string };
const maxLinks = 20;

export function AdminCmsSocialLinksField({
  name,
  label,
  value,
  onDirtyChange,
}: {
  name: string;
  label: string;
  value: string;
  onDirtyChange: () => void;
}) {
  const baseId = useId();
  const [links, setLinks] = useState<SocialRow[]>(() =>
    (parseCmsSocialLinks(value) ?? []).map((link, index) => ({ ...link, key: String(index) })),
  );
  const preview = links.filter((link) => link.href.trim() && link.label.trim());

  function updateLink(index: number, changes: Partial<CmsSocialLink>) {
    setLinks((current) => current.map((link, row) => row === index ? { ...link, ...changes } : link));
    onDirtyChange();
  }

  function addLink() {
    setLinks((current) => [...current, { key: crypto.randomUUID(), label: "", href: "" }]);
    onDirtyChange();
  }

  function removeLink(index: number) {
    setLinks((current) => current.filter((_, row) => row !== index));
    onDirtyChange();
  }

  return (
    <fieldset className="admin-cms-social-links">
      <legend>{label}</legend>
      <p className="admin-upload-help" id={`${baseId}-help`}>Seuls les profils avec un nom et un lien HTTPS s’affichent sur le site. Vous pouvez laisser un lien vide.</p>
      <input type="hidden" name={name} value={JSON.stringify(links.map(({ label: linkLabel, href }) => ({ label: linkLabel, href })))} />
      <div className="admin-social-rows">
        {links.map((link, index) => {
          const rowId = `${baseId}-${link.key}`;
          return (
            <div className="admin-social-row" key={link.key}>
              <div className="admin-cms-field">
                <label htmlFor={`${rowId}-label`}>Nom affiché</label>
                <input
                  id={`${rowId}-label`}
                  type="text"
                  value={link.label}
                  maxLength={50}
                  aria-describedby={`${baseId}-help`}
                  onChange={(event) => updateLink(index, { label: event.currentTarget.value })}
                />
              </div>
              <div className="admin-cms-field">
                <label htmlFor={`${rowId}-href`}>Lien du profil</label>
                <input
                  id={`${rowId}-href`}
                  type="url"
                  value={link.href}
                  pattern="https://.+"
                  maxLength={512}
                  title="Saisissez une adresse complète commençant par https://."
                  aria-describedby={`${baseId}-help`}
                  onChange={(event) => updateLink(index, { href: event.currentTarget.value })}
                />
              </div>
              <button className="admin-social-remove" type="button" aria-label={`Supprimer ${link.label || "ce réseau social"}`} onClick={() => removeLink(index)}>
                Supprimer
              </button>
            </div>
          );
        })}
      </div>
      <button className="admin-add-social" type="button" onClick={addLink} disabled={links.length >= maxLinks}>
        Ajouter un réseau social
      </button>
      <p className="admin-social-preview" aria-label="Aperçu des liens visibles sur le site">
        Aperçu : {preview.length > 0 ? preview.map(({ label: linkLabel }) => linkLabel).join(" · ") : "aucun lien social affiché"}
      </p>
    </fieldset>
  );
}
