import type { Metadata } from "next";
import { connection } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { auth } from "@/lib/auth/server";
import { getNeonDatabase } from "@/lib/neon-database";
import { getNeonStorage } from "@/lib/neon-storage";

import "../admin.css";

export const metadata: Metadata = {
  title: "Demandes de devis | Shams Busine",
  robots: { index: false, follow: false },
};

type Attachment = { key: string; filename: string; size: number };
type Enquiry = {
  id: string;
  name: string;
  city: string;
  phone: string;
  email: string;
  project_type: string;
  description: string;
  attachments: Attachment[];
  created_at: string;
};

export default function EnquiriesPage() {
  return (
    <Suspense fallback={<main id="contenu" className="frame admin-page">Chargement des demandes…</main>}>
      <EnquiriesContent />
    </Suspense>
  );
}

async function EnquiriesContent() {
  await connection();
  const { data } = await auth.getSession();
  if (!data?.user) redirect("/admin/sign-in");

  const role = (data.user as typeof data.user & { role?: string | string[] }).role;
  if (role !== "admin" && !(Array.isArray(role) && role.includes("admin"))) {
    return (
      <main id="contenu" className="frame admin-page" tabIndex={-1}>
        <h1>Accès réservé</h1>
        <p className="admin-intro">Ce compte n’a pas le rôle administrateur requis pour consulter les demandes.</p>
        <AdminSignOutButton />
      </main>
    );
  }

  const sql = getNeonDatabase();
  const rows = await sql`
    SELECT id, name, city, phone, email, project_type, description, attachments, created_at
    FROM quote_enquiries
    ORDER BY created_at DESC
    LIMIT 100
  ` as Enquiry[];
  const storage = getNeonStorage();
  const enquiries = await Promise.all(rows.map(async (row) => ({
    ...row,
    attachments: await Promise.all((row.attachments ?? []).map(async (attachment) => ({
      ...attachment,
      url: await getSignedUrl(storage, new GetObjectCommand({
        Bucket: "devis-attachments",
        Key: attachment.key,
        ResponseContentDisposition: "attachment",
      }), { expiresIn: 300 }),
    }))),
  })));

  return (
    <main id="contenu" className="frame admin-page" tabIndex={-1}>
      <header className="admin-heading">
        <div>
          <h1>Demandes de devis</h1>
          <p className="admin-intro">Les 100 demandes les plus récentes.</p>
        </div>
        <AdminSignOutButton />
      </header>
      {enquiries.length ? (
        <ol className="admin-enquiries">
          {enquiries.map((enquiry) => (
            <li className="admin-enquiry" key={enquiry.id}>
              <div className="admin-enquiry-heading">
                <h2>{enquiry.name}</h2>
                <time dateTime={enquiry.created_at}>{new Date(enquiry.created_at).toLocaleString("fr-MA", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Casablanca" })}</time>
              </div>
              <p><strong>{enquiry.project_type}</strong> · {enquiry.city}</p>
              <address className="admin-contact">
                <a href={`tel:${enquiry.phone.replace(/[^+\d]/g, "")}`}>{enquiry.phone}</a>
                <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
              </address>
              <p className="admin-description">{enquiry.description}</p>
              {enquiry.attachments.length > 0 && (
                <ul className="admin-attachments">
                  {enquiry.attachments.map((attachment) => (
                    <li key={attachment.key}>
                      <a href={attachment.url} rel="noreferrer">{attachment.filename}</a>
                      <span>{(attachment.size / 1024 / 1024).toFixed(1)} Mo</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <p className="admin-empty">Aucune demande pour le moment.</p>
      )}
    </main>
  );
}
