import type { Metadata } from "next";
import { connection } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Suspense } from "react";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";
import { AdminEnquiriesInbox, type AdminEnquiry } from "@/components/admin/AdminEnquiriesInbox";
import { requireAdminForRender } from "@/lib/auth/admin";
import { getNeonDatabase } from "@/lib/neon-database";
import { getNeonStorage } from "@/lib/neon-storage";

export const metadata: Metadata = {
  title: "Demandes de devis | Shams Busine",
  robots: { index: false, follow: false },
};

type StoredAttachment = { key: string; filename: string; contentType?: string; size: number };
type EnquiryRow = Omit<AdminEnquiry, "attachments" | "created_at"> & {
  attachments: StoredAttachment[];
  created_at: string | Date;
};

export default function EnquiriesPage() {
  return (
    <Suspense fallback={
      <main id="contenu" className="frame admin-page admin-devis-page admin-devis-loading" tabIndex={-1} role="status">
        <h1>Demandes de devis</h1>
        <p>Chargement des demandes…</p>
      </main>
    }>
      <EnquiriesContent />
    </Suspense>
  );
}

async function EnquiriesContent() {
  await connection();
  await requireAdminForRender();

  const sql = getNeonDatabase();
  const rows = await sql`
    SELECT id, name, city, phone, email, project_type, description, attachments, created_at
    FROM quote_enquiries
    ORDER BY created_at DESC
    LIMIT 100
  ` as EnquiryRow[];
  const storage = getNeonStorage();

  const enquiries: AdminEnquiry[] = await Promise.all(rows.map(async (row) => ({
    ...row,
    created_at: row.created_at instanceof Date ? row.created_at.toISOString() : new Date(row.created_at).toISOString(),
    attachments: await Promise.all((row.attachments ?? []).map(async (attachment) => {
      const base = { Bucket: "devis-attachments", Key: attachment.key };
      const previewUrl = await getSignedUrl(storage, new GetObjectCommand({
        ...base,
        ResponseContentDisposition: "inline",
        ...(attachment.contentType ? { ResponseContentType: attachment.contentType } : {}),
      }), { expiresIn: 1800 });
      const downloadUrl = await getSignedUrl(storage, new GetObjectCommand({
        ...base,
        ResponseContentDisposition: getDownloadDisposition(attachment.filename),
      }), { expiresIn: 1800 });

      return {
        filename: attachment.filename,
        contentType: attachment.contentType ?? "",
        size: attachment.size,
        previewUrl,
        downloadUrl,
      };
    })),
  })));

  return (
    <main id="contenu" className="frame admin-page admin-devis-page" tabIndex={-1}>
      <AdminBreadcrumb items={[
        { label: "Espace de gestion", href: "/admin" },
        { label: "Demandes de devis", current: true },
      ]} />
      <header className="admin-heading admin-devis-heading">
        <div>
          <h1>Demandes de devis</h1>
          <p className="admin-intro">Les coordonnées, le brief et les fichiers déposés sont réunis dans chaque demande.</p>
        </div>
      </header>
      <AdminEnquiriesInbox enquiries={enquiries} />
    </main>
  );
}

function getDownloadDisposition(filename: string) {
  const fallback = filename.replace(/[^\x20-\x7e]|["\\]/g, "_");
  const encoded = encodeURIComponent(filename).replace(/[!'()*]/g, (character) =>
    `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  );
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}
