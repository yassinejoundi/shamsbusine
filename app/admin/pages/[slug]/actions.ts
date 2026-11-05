"use server";

import { revalidatePath } from "next/cache";
import { cmsPageBySlug } from "@/lib/cms/schema";
import { cmsPagePath } from "@/lib/cms/content";
import { isCmsImageAssetId } from "@/lib/cms/asset-ids";
import { requireAdmin } from "@/lib/auth/admin";
import { getNeonDatabase } from "@/lib/neon-database";

type CmsSectionSaveState = {
  status: "idle" | "saved" | "invalid" | "save";
  sectionId: string;
};

export async function saveCmsSection(_previousState: CmsSectionSaveState, formData: FormData): Promise<CmsSectionSaveState> {
  const user = await requireAdmin();
  const slug = formData.get("slug");
  const sectionIdValue = formData.get("sectionId");
  const page = typeof slug === "string" ? cmsPageBySlug[slug] : undefined;
  if (!page || typeof sectionIdValue !== "string") return { status: "invalid", sectionId: "" };
  const section = page.sections.find((candidate) => candidate.id === sectionIdValue);
  if (!section) return { status: "invalid", sectionId: sectionIdValue };
  const sectionId = sectionIdValue;

  const sectionContent: Record<string, string> = {};
  for (const field of section.fields) {
    const raw = formData.get(field.key);
    if (typeof raw !== "string" || raw.length === 0) return { status: "invalid", sectionId };
    if (field.kind === "image") {
      if (!isCmsImageAssetId(raw, page.slug)) return { status: "invalid", sectionId };
    } else if (!raw.trim() || raw.length > field.maxLength) {
      return { status: "invalid", sectionId };
    }
    sectionContent[field.key] = raw;
  }

  try {
    const sql = getNeonDatabase();
    await sql`
      INSERT INTO site_content (page_slug, content, updated_by)
      VALUES (${page.slug}, ${JSON.stringify(sectionContent)}::jsonb, ${user.email})
      ON CONFLICT (page_slug) DO UPDATE
      SET content = COALESCE(site_content.content, '{}'::jsonb) || EXCLUDED.content,
          updated_at = now(), updated_by = EXCLUDED.updated_by
    `;
  } catch {
    return { status: "save", sectionId };
  }

  revalidatePath(cmsPagePath(page.slug));
  revalidatePath(`/admin/pages/${page.slug}`);
  return { status: "saved", sectionId };
}
