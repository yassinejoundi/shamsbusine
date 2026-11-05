"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const maxOriginalBytes = 30 * 1024 * 1024;
const maxOptimizedBytes = 4 * 1024 * 1024;
const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export type CmsImageOption = { publicId: string; localPath: string; secureUrl: string };

type UploadResponse = { asset?: CmsImageOption; error?: string };

function optimizeImage(file: File) {
  if (!acceptedTypes.has(file.type)) throw new Error("format");
  if (file.size > maxOriginalBytes) throw new Error("original-size");

  return createImageBitmap(file).then(async (bitmap) => {
    try {
      let scale = Math.min(1, 2400 / bitmap.width, 2400 / bitmap.height);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) throw new Error("optimize");

      for (const quality of [0.82, 0.72, 0.62]) {
        canvas.width = Math.max(1, Math.round(bitmap.width * scale));
        canvas.height = Math.max(1, Math.round(bitmap.height * scale));
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", quality));
        if (!blob || blob.type !== "image/webp") throw new Error("optimize");
        if (blob.size <= maxOptimizedBytes) return blob;
        scale *= 0.8;
      }
      throw new Error("optimized-size");
    } finally {
      bitmap.close();
    }
  });
}

function readableSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} Ko` : `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
}

function uploadErrorMessage(error: string | undefined) {
  switch (error) {
    case "format": return "Choisissez une image JPG, PNG ou WebP.";
    case "size": return "L’image optimisée dépasse 4 Mo. Choisissez une image plus petite.";
    case "session": return "Votre session a expiré. Reconnectez-vous, puis réessayez.";
    case "forbidden": return "Ce compte ne dispose pas du rôle administrateur requis.";
    case "cloudinary": return "Cloudinary n’est pas configuré. Contactez l’administrateur.";
    case "origin": return "Requête refusée. Rechargez la page, puis réessayez.";
    default: return "Envoi impossible. Vérifiez la connexion, puis réessayez.";
  }
}

export function AdminCmsImageField({
  pageSlug,
  fieldKey,
  label,
  selectedId,
  images,
  onDirtyChange,
}: {
  pageSlug: string;
  fieldKey: string;
  label: string;
  selectedId: string;
  images: CmsImageOption[];
  onDirtyChange: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [options, setOptions] = useState(images);
  const [value, setValue] = useState(selectedId);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const id = `${pageSlug}-${fieldKey}`;
  const helperId = `${id}-upload-help`;
  const statusId = `${id}-upload-status`;
  const selected = options.find((asset) => asset.publicId === value);

  async function uploadSelectedImage() {
    if (!file) return;
    setIsUploading(true);
    setStatus("Optimisation de l’image…");
    setIsError(false);

    try {
      let optimized: Blob;
      try {
        optimized = await optimizeImage(file);
      } catch (error) {
        if (error instanceof Error && error.message === "format") throw error;
        if (error instanceof Error && error.message === "original-size") throw error;
        if (error instanceof Error && error.message === "optimized-size") throw error;
        throw new Error("optimize");
      }

      setStatus("Image optimisée, envoi vers Cloudinary…");
      const body = new FormData();
      body.set("pageSlug", pageSlug);
      body.set("fieldKey", fieldKey);
      body.append("file", optimized, "image.webp");
      const response = await fetch("/api/admin/cms-images", { method: "POST", body });
      const result = await response.json() as UploadResponse;
      if (!response.ok || !result.asset) throw new Error(result.error ?? "upload");

      const uploadedAsset = result.asset;
      setOptions((current) => [...current.filter((asset) => asset.publicId !== uploadedAsset.publicId), uploadedAsset]);
      setValue(uploadedAsset.publicId);
      onDirtyChange();
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
      setStatus(`Image importée (${readableSize(optimized.size)}). Enregistrez la page pour la publier.`);
    } catch (error) {
      let message = "Envoi impossible. Vérifiez la connexion, puis réessayez.";
      if (error instanceof Error && ["format", "original-size", "optimized-size", "optimize"].includes(error.message)) {
        message = error.message === "format"
          ? "Choisissez une image JPG, PNG ou WebP."
          : error.message === "original-size"
            ? "Le fichier dépasse 30 Mo. Choisissez une image plus petite."
            : error.message === "optimized-size"
              ? "L’image reste trop volumineuse après optimisation. Choisissez une image plus petite."
              : "Impossible d’optimiser cette image. Choisissez un autre fichier.";
      } else if (error instanceof Error) {
        message = uploadErrorMessage(error.message);
      }
      setStatus(message);
      setIsError(true);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="admin-cms-field admin-cms-image-field" aria-busy={isUploading}>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={fieldKey} value={value} onChange={(event) => {
        setValue(event.currentTarget.value);
        onDirtyChange();
      }} required>
        {options.map((asset) => (
          <option value={asset.publicId} key={asset.publicId}>
            {asset.localPath.split("/").at(-1)}
          </option>
        ))}
      </select>
      {selected?.secureUrl && (
        <Image
          className="admin-cms-preview"
          src={selected.secureUrl}
          alt=""
          width={240}
          height={150}
          sizes="(max-width: 600px) 100vw, 180px"
        />
      )}
      <div className="admin-image-upload">
        <label htmlFor={`${id}-file`}>Choisir une image</label>
        <input
          ref={inputRef}
          className="admin-upload-file"
          id={`${id}-file`}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          aria-describedby={`${helperId} ${statusId}`}
          onChange={(event) => {
            setFile(event.currentTarget.files?.[0] ?? null);
            setStatus("");
            setIsError(false);
          }}
        />
        <span className="admin-upload-help" id={helperId}>
          JPG, PNG ou WebP · 30 Mo maximum. L’image est réduite à 2 400 px, compressée et convertie en WebP avant l’envoi.
        </span>
        <button
          className="admin-upload-button"
          type="button"
          disabled={!file || isUploading}
          aria-describedby={`${helperId} ${statusId}`}
          onClick={uploadSelectedImage}
        >
          {isUploading ? "Optimisation et envoi…" : "Optimiser et envoyer"}
        </button>
        <p className={`admin-upload-status${isError ? " is-error" : ""}`} id={statusId} role="status" aria-live="polite" aria-atomic="true">
          {status}
        </p>
      </div>
      <span className="admin-upload-note">L’image sera publiée après l’enregistrement de la page.</span>
    </div>
  );
}
