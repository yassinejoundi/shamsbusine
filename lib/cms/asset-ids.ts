import assetIndex from "./assets.json";
import { cmsPageBySlug } from "./schema";

const uploadedNamePattern = /^[a-z0-9][a-z0-9-]{0,47}-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export function isCmsUploadedImageId(publicId: string, pageSlug: string) {
  if (!Object.hasOwn(cmsPageBySlug, pageSlug)) return false;
  const prefix = `${pageSlug}/uploads/`;
  return publicId.startsWith(prefix) && uploadedNamePattern.test(publicId.slice(prefix.length));
}

export function isCmsImageAssetId(publicId: string, pageSlug: string) {
  return assetIndex.assets.some(
    (asset) => asset.publicId === publicId && (asset.folder === pageSlug || asset.folder === "shared"),
  ) || isCmsUploadedImageId(publicId, pageSlug);
}

export function isAnyCmsUploadedImageId(publicId: string) {
  return Object.keys(cmsPageBySlug).some((pageSlug) => isCmsUploadedImageId(publicId, pageSlug));
}
