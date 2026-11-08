import "server-only";
import { connection } from "next/server";
import { neon } from "@neondatabase/serverless";
import { v2 as cloudinary } from "cloudinary";
import assetIndex from "./assets.json";
import { cmsPageBySlug, defaultCmsContent, type CmsPage } from "./schema";
import { isAnyCmsUploadedImageId, isCmsImageAssetId, isCmsUploadedImageId } from "./asset-ids";
import { defaultEntreprisePartners, isValidCmsPartners, parseCmsPartners } from "./partners";
import { isValidCmsTextFieldValue } from "./field-validation";
import { parseCmsSocialLinks } from "./social-links";
import { normalizeInternationalNumber, parseLegacyWhatsAppLink } from "../contact-numbers";

type Asset = (typeof assetIndex.assets)[number];
const assets = assetIndex.assets as Asset[];
const assetById = new Map(assets.map((asset) => [asset.publicId, asset]));

export type CmsValues = Record<string, string>;

export function cmsText(content: CmsValues, key: string) {
  return content[key] ?? "";
}

export function cmsImage(content: CmsValues, key: string) {
  return getCloudinaryImage(content[key]);
}

export function getCloudinaryImage(publicId: string) {
  if (assetById.has(publicId)) return assetById.get(publicId)?.secureUrl ?? "";
  if (!process.env.CLOUDINARY_URL || !isAnyCmsUploadedImageId(publicId)) return "";
  return cloudinary.url(publicId, { secure: true, format: "webp" });
}

export function getCmsImageAssets(page: CmsPage, content: CmsValues) {
  const existing = assets
    .filter((asset) => asset.folder === page.slug || asset.folder === "shared")
    .map(({ publicId, localPath, secureUrl }) => ({ publicId, localPath, secureUrl }));
  const currentUploads = [...new Set(page.sections.flatMap((section) => section.fields)
    .filter((field) => field.kind === "image")
    .map((field) => content[field.key] ?? "")
    .concat(page.slug === "entreprise"
      ? (parseCmsPartners(content["partners.items"] ?? "") ?? []).map((partner) => partner.image)
      : [])
    .filter((publicId) => isCmsUploadedImageId(publicId, page.slug)))];
  return [
    ...existing,
    ...currentUploads.map((publicId) => ({
      publicId,
      localPath: `Image importée · ${publicId.slice(-6)}.webp`,
      secureUrl: getCloudinaryImage(publicId),
    })),
  ];
}

export async function getCmsContent(slug: string): Promise<CmsValues> {
  const page = cmsPageBySlug[slug];
  if (!page) throw new Error(`Unknown CMS page: ${slug}`);
  const defaults = defaultCmsContent(page);
  await connection();

  try {
    const url = process.env.DATABASE_URL;
    if (!url) return defaults;
    const sql = neon(url);
    const rows = await sql`SELECT content FROM site_content WHERE page_slug = ${slug} LIMIT 1` as { content: unknown }[];
    const stored = rows[0]?.content;
    if (!stored || typeof stored !== "object" || Array.isArray(stored)) return defaults;

    const merged = { ...defaults };
    if (page.slug === "site-settings") {
      const storedValues = stored as Record<string, unknown>;
      if (typeof storedValues["site.whatsappNumber"] !== "string" && typeof storedValues["site.whatsapp"] === "string") {
        const legacyWhatsApp = parseLegacyWhatsAppLink(storedValues["site.whatsapp"]);
        if (legacyWhatsApp) {
          merged["site.whatsappNumber"] = legacyWhatsApp.number;
          merged["site.whatsappMessage"] = legacyWhatsApp.message;
        }
      }
    }
    for (const field of page.sections.flatMap((group) => group.fields)) {
      const value = (stored as Record<string, unknown>)[field.key];
      if (field.kind === "partner-list") {
        const partners = typeof value === "string" ? parseCmsPartners(value) : null;
        if (partners && isValidCmsPartners(partners, (image) => isCmsImageAssetId(image, page.slug))) {
          merged[field.key] = JSON.stringify(partners);
          continue;
        }
        if (page.slug === "entreprise") {
          const legacyPartners = defaultEntreprisePartners.map((partner, index) => {
            const legacyName = (stored as Record<string, unknown>)[`partner.${index}.name`];
            const legacyImage = (stored as Record<string, unknown>)[`partner.${index}.image`];
            return {
              ...partner,
              name: typeof legacyName === "string" && legacyName.trim() && legacyName.length <= 100
                ? legacyName
                : partner.name,
              image: typeof legacyImage === "string" && isCmsImageAssetId(legacyImage, page.slug)
                ? legacyImage
                : partner.image,
            };
          });
          merged[field.key] = JSON.stringify(legacyPartners);
        }
        continue;
      }
      if (field.kind === "social-list") {
        const links = typeof value === "string" ? parseCmsSocialLinks(value) : null;
        if (links) merged[field.key] = JSON.stringify(links);
        continue;
      }
      if (typeof value !== "string") continue;
      const normalizedValue = field.inputType === "tel" ? normalizeInternationalNumber(value) : value;
      if (field.kind === "image") {
        if (isCmsImageAssetId(value, page.slug)) merged[field.key] = value;
      } else if (isValidCmsTextFieldValue(field, normalizedValue)) {
        merged[field.key] = normalizedValue;
      }
    }
    return merged;
  } catch {
    return defaults;
  }
}

export function cmsPagePath(slug: string) {
  return cmsPageBySlug[slug]?.route ?? "/";
}
