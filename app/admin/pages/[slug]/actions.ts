"use server";

import { revalidatePath } from "next/cache";
import { cmsPageBySlug } from "@/lib/cms/schema";
import { cmsPagePath } from "@/lib/cms/content";
import { isCmsImageAssetId } from "@/lib/cms/asset-ids";
import { defaultEntreprisePartners, isValidCmsPartners, parseCmsPartners } from "@/lib/cms/partners";
import { isValidCmsTextFieldValue } from "@/lib/cms/field-validation";
import { parseCmsSocialLinks } from "@/lib/cms/social-links";
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
    if (typeof raw !== "string") return { status: "invalid", sectionId };
    if (field.kind === "partner-list") {
      const partners = parseCmsPartners(raw);
      if (!partners || !isValidCmsPartners(partners, (image) => isCmsImageAssetId(image, page.slug))) {
        return { status: "invalid", sectionId };
      }
      sectionContent[field.key] = JSON.stringify(partners);
      partners.forEach((partner, index) => {
        if (index >= defaultEntreprisePartners.length || !partner.name.trim() || !partner.image) return;
        sectionContent[`partner.${index}.name`] = partner.name;
        sectionContent[`partner.${index}.image`] = partner.image;
      });
      continue;
    }
    if (field.kind === "social-list") {
      const links = parseCmsSocialLinks(raw);
      if (!links || raw.length > field.maxLength) return { status: "invalid", sectionId };
      sectionContent[field.key] = JSON.stringify(links);
      continue;
    }
    if (field.kind === "image") {
      if (!isCmsImageAssetId(raw, page.slug)) return { status: "invalid", sectionId };
    } else if (!isValidCmsTextFieldValue(field, raw)) {
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
  } catch (error) {
    const databaseError = error && typeof error === "object" ? error as { code?: unknown; constraint?: unknown; message?: unknown } : {};
    console.error("CMS section save failed", {
      pageSlug: page.slug,
      sectionId,
      code: typeof databaseError.code === "string" ? databaseError.code : "unknown",
      constraint: typeof databaseError.constraint === "string" ? databaseError.constraint : undefined,
      message: typeof databaseError.message === "string" ? databaseError.message : "Unknown database error",
    });
    return { status: "save", sectionId };
  }

  if (page.scope === "global") {
    revalidatePath("/", "layout");
    revalidatePath(`/admin/pages/${page.slug}`);
  } else {
    revalidatePath(cmsPagePath(page.slug));
    revalidatePath(`/admin/pages/${page.slug}`);
  }
  return { status: "saved", sectionId };
}
