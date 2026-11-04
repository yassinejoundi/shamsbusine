import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import { getNeonDatabase } from "@/lib/neon-database";
import { getNeonStorage } from "@/lib/neon-storage";
import { validateEnquiry } from "@/lib/enquiry-validation";
import { isAllowedAttachment, maxAttachmentBytes, maxTotalAttachmentBytes } from "@/lib/enquiry-files";

const bucket = "devis-attachments";
const maxBodyBytes = 11 * 1024 * 1024;
function field(form: FormData, name: string) {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function errorResponse(error: string, status: number) {
  return Response.json({ error }, { status });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (!Number.isFinite(contentLength) || contentLength > maxBodyBytes) return errorResponse("La demande dépasse la taille autorisée.", 413);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return errorResponse("Le formulaire est invalide.", 400);
  }

  const name = field(form, "name");
  const city = field(form, "city");
  const phone = field(form, "phone");
  const email = field(form, "email");
  const projectType = field(form, "type");
  const description = field(form, "description");

  const validationError = validateEnquiry({ name, city, phone, email, type: projectType, description });
  if (validationError) return errorResponse(validationError, 400);

  const documentEntries = form.getAll("documents");
  if (documentEntries.some((entry) => typeof entry === "string" && entry.trim())) {
    return errorResponse("Une pièce jointe est invalide.", 400);
  }

  const files = documentEntries.filter((entry): entry is File => entry instanceof File && entry.size > 0);
  if (files.length > 3 || files.some((file) => file.size > maxAttachmentBytes) ||
      files.reduce((total, file) => total + file.size, 0) > maxTotalAttachmentBytes) {
    return errorResponse("Joignez jusqu’à 3 fichiers PDF, JPG, PNG ou WebP, dans la limite de 5 Mo par fichier et 10 Mo au total.", 400);
  }
  for (const file of files) {
    if (!await isAllowedAttachment(file)) {
      return errorResponse("Un fichier n’est pas un PDF, JPG, PNG ou WebP valide.", 400);
    }
  }

  const id = randomUUID();
  const uploaded: { key: string; filename: string; contentType: string; size: number }[] = [];

  try {
    const storage = getNeonStorage();
    for (const file of files) {
      const key = `enquiries/${id}/${randomUUID()}`;
      uploaded.push({
        key,
        filename: file.name.replace(/[\u0000-\u001f\u007f/\\]/g, "_").slice(0, 160) || "piece-jointe",
        contentType: file.type,
        size: file.size,
      });
      await storage.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type,
        ContentDisposition: "attachment",
      }));
    }

    const sql = getNeonDatabase();
    await sql`
      INSERT INTO quote_enquiries (id, name, city, phone, email, project_type, description, attachments)
      VALUES (${id}::uuid, ${name}, ${city}, ${phone}, ${email}, ${projectType}, ${description}, ${JSON.stringify(uploaded)}::jsonb)
    `;

    return Response.json({ id }, { status: 201 });
  } catch (error) {
    if (uploaded.length) {
      const storage = getNeonStorage();
      await Promise.allSettled(uploaded.map(({ key }) => storage.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }))));
    }
    console.error("Unable to save quote enquiry.", error);
    return errorResponse("Votre demande n’a pas pu être enregistrée. Réessayez ou contactez-nous directement.", 503);
  }
}
