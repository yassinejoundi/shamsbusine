"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cmsPageBySlug } from "@/lib/cms/schema";
import { cmsPagePath } from "@/lib/cms/content";
import { isCmsImageAssetId } from "@/lib/cms/asset-ids";
import { requireAdmin } from "@/lib/auth/admin";
import { getNeonDatabase } from "@/lib/neon-database";

export async function saveCmsPage(formData: FormData) {
  const user = await requireAdmin();
  const slug = formData.get("slug");
  const page = typeof slug === "string" ? cmsPageBySlug[slug] : undefined;
  if (!page) redirect("/admin/pages?error=invalid");

  const content: Record<string, string> = {};
  for (const field of page.sections.flatMap((group) => group.fields)) {
    const raw = formData.get(field.key);
    if (typeof raw !== "string" || raw.length === 0) redirect(`/admin/pages/${page.slug}?error=invalid`);
    if (field.kind === "image") {
      if (!isCmsImageAssetId(raw, page.slug)) redirect(`/admin/pages/${page.slug}?error=invalid`);
    } else if (!raw.trim() || raw.length > field.maxLength) {
      redirect(`/admin/pages/${page.slug}?error=invalid`);
    }
    content[field.key] = raw;
  }

  try {
    const sql = getNeonDatabase();
    await sql`
      INSERT INTO site_content (page_slug, content, updated_by)
      VALUES (${page.slug}, ${JSON.stringify(content)}::jsonb, ${user.email})
      ON CONFLICT (page_slug) DO UPDATE
      SET content = EXCLUDED.content, updated_at = now(), updated_by = EXCLUDED.updated_by
    `;
  } catch {
    redirect(`/admin/pages/${page.slug}?error=save`);
  }

  revalidatePath(cmsPagePath(page.slug));
  revalidatePath(`/admin/pages/${page.slug}`);
  redirect(`/admin/pages/${page.slug}?saved=1`);
}
