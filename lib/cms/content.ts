import "server-only";
import { connection } from "next/server";
import { neon } from "@neondatabase/serverless";
import assetIndex from "./assets.json";
import { cmsPageBySlug, defaultCmsContent, type CmsPage } from "./schema";

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
  return assetById.get(publicId)?.secureUrl ?? "";
}

export function getCmsImageAssets(page: CmsPage) {
  return assets
    .filter((asset) => asset.folder === page.slug || asset.folder === "shared")
    .map(({ publicId, localPath, secureUrl }) => ({ publicId, localPath, secureUrl }));
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
    for (const field of page.sections.flatMap((group) => group.fields)) {
      const value = (stored as Record<string, unknown>)[field.key];
      if (typeof value !== "string") continue;
      if (field.kind === "image") {
        if (assetById.has(value)) merged[field.key] = value;
      } else if (value.trim().length > 0 && value.length <= field.maxLength) {
        merged[field.key] = value;
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
