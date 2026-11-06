"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

function imageErrorMessage(error: unknown) {
  if (!(error instanceof Error)) return "Envoi impossible. Vérifiez la connexion, puis réessayez.";
  switch (error.message) {
    case "format": return "Choisissez une image JPG, PNG ou WebP.";
    case "original-size": return "Le fichier dépasse 30 Mo. Choisissez une image plus petite.";
    case "optimized-size": return "L’image reste trop volumineuse après optimisation. Choisissez une image plus petite.";
    case "optimize": return "Impossible d’optimiser cette image. Choisissez un autre fichier.";
    case "size": return "L’image optimisée dépasse 4 Mo. Choisissez une image plus petite.";
    case "session": return "Votre session a expiré. Reconnectez-vous, puis réessayez.";
    case "forbidden": return "Ce compte ne dispose pas du rôle administrateur requis.";
    case "cloudinary": return "Cloudinary n’est pas configuré. Contactez l’administrateur.";
    case "origin": return "Requête refusée. Rechargez la page, puis réessayez.";
    default: return "Envoi impossible. Vérifiez la connexion, puis réessayez.";
  }
}

export async function uploadCmsImage(file: File, pageSlug: string, fieldKey: string) {
  let optimized: Blob;
  try {
    optimized = await optimizeImage(file);
  } catch (error) {
    throw new Error(imageErrorMessage(error));
  }

  const body = new FormData();
  body.set("pageSlug", pageSlug);
  body.set("fieldKey", fieldKey);
  body.append("file", optimized, "image.webp");
  const response = await fetch("/api/admin/cms-images", { method: "POST", body });
  const result = await response.json() as UploadResponse;
  if (!response.ok || !result.asset) throw new Error(imageErrorMessage(new Error(result.error ?? "upload")));
  return { ...result.asset, localPath: file.name };
}

export function AdminCmsImageField({
  pageSlug,
  fieldKey,
  label,
  selectedId,
  images,
  onDirtyChange,
  onFileChange,
}: {
  pageSlug: string;
  fieldKey: string;
  label: string;
  selectedId: string;
  images: CmsImageOption[];
  onDirtyChange: () => void;
  onFileChange: (file: File | null, onUploaded: (asset: CmsImageOption) => void) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(selectedId);
  const [uploadedAsset, setUploadedAsset] = useState<CmsImageOption | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(images.find((asset) => asset.publicId === selectedId)?.secureUrl ?? null);
  const [uploadedFilename, setUploadedFilename] = useState<string | null>(null);
  const previewRef = useRef<string | null>(previewUrl);
  const id = `${pageSlug}-${fieldKey}`;
  const helperId = `${id}-upload-help`;
  const filenameId = `${id}-upload-filename`;
  const selected = uploadedAsset?.publicId === value
    ? uploadedAsset
    : images.find((asset) => asset.publicId === value);

  useEffect(() => () => {
    if (previewRef.current?.startsWith("blob:")) URL.revokeObjectURL(previewRef.current);
  }, []);

  function updatePreview(url: string | null) {
    if (previewRef.current?.startsWith("blob:")) URL.revokeObjectURL(previewRef.current);
    previewRef.current = url;
    setPreviewUrl(url);
  }

  function applyUploadedAsset(asset: CmsImageOption) {
    setUploadedAsset(asset);
    setValue(asset.publicId);
    setUploadedFilename(asset.localPath);
    updatePreview(asset.secureUrl);
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="admin-cms-field admin-cms-image-field">
      <p className="admin-image-title">{label}</p>
      <input type="hidden" name={fieldKey} value={value} />
      {previewUrl ? (
        <Image
          className="admin-cms-preview"
          src={previewUrl}
          alt=""
          width={480}
          height={360}
          sizes="(max-width: 600px) 100vw, 240px"
          unoptimized
        />
      ) : (
        <div className="admin-cms-preview admin-cms-preview-empty" aria-hidden="true">Aucun aperçu disponible</div>
      )}
      <input
        ref={inputRef}
        className="admin-upload-file"
        id={`${id}-file`}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        aria-label={`Choisir une image pour ${label.toLowerCase()}`}
        aria-describedby={`${helperId} ${filenameId}`}
        onChange={(event) => {
          const selectedFile = event.currentTarget.files?.[0] ?? null;
          setFile(selectedFile);
          updatePreview(selectedFile ? URL.createObjectURL(selectedFile) : selected?.secureUrl ?? null);
          if (selectedFile) {
            onDirtyChange();
            onFileChange(selectedFile, applyUploadedAsset);
          } else {
            onFileChange(null, applyUploadedAsset);
          }
        }}
      />
      <label className="admin-image-select" htmlFor={`${id}-file`}>
        <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20" fill="none">
          <path d="M10 13.25V4.5m0 0L6.75 7.75M10 4.5l3.25 3.25M4.25 12v3.5h11.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Choisir une image</span>
      </label>
      <p className="admin-upload-filename" id={filenameId}>
        {file ? `Fichier sélectionné : ${file.name}` : `Image actuelle : ${uploadedFilename ?? selected?.localPath.split("/").at(-1) ?? "Aucune image"}`}
      </p>
      <span className="admin-upload-help" id={helperId}>
        JPG, PNG ou WebP · 30 Mo maximum. L’image sera réduite à 2 400 px, compressée et convertie en WebP à l’enregistrement.
      </span>
    </div>
  );
}
