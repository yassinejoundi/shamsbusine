import { randomUUID } from "node:crypto";
import { v2 as cloudinary } from "cloudinary";
import { cmsPageBySlug } from "@/lib/cms/schema";
import { isCmsUploadedImageId } from "@/lib/cms/asset-ids";
import { getAdminSession, isAdmin } from "@/lib/auth/admin";

const maxUploadBytes = 4 * 1024 * 1024;

function errorResponse(error: string, status: number) {
  return Response.json({ error }, { status });
}

function isWebp(buffer: Buffer) {
  return buffer.length >= 12
    && buffer.toString("ascii", 0, 4) === "RIFF"
    && buffer.toString("ascii", 8, 12) === "WEBP";
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin !== new URL(request.url).origin) return errorResponse("origin", 403);

  const user = await getAdminSession();
  if (!user) return errorResponse("session", 401);
  if (!isAdmin(user)) return errorResponse("forbidden", 403);

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > maxUploadBytes + 64 * 1024) {
    return errorResponse("size", 413);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return errorResponse("invalid", 400);
  }

  const rawSlug = formData.get("pageSlug");
  const fieldKey = formData.get("fieldKey");
  const page = typeof rawSlug === "string" && Object.hasOwn(cmsPageBySlug, rawSlug)
    ? cmsPageBySlug[rawSlug]
    : undefined;
  const imageField = page?.sections.flatMap((section) => section.fields)
    .find((field) => field.key === fieldKey && field.kind === "image");
  const file = formData.get("file");

  if (!page || !imageField || !(file instanceof File)) return errorResponse("invalid", 400);
  if (file.type !== "image/webp") return errorResponse("format", 415);
  if (file.size === 0 || file.size > maxUploadBytes) return errorResponse("size", 413);

  let buffer: Buffer;
  try {
    buffer = Buffer.from(await file.arrayBuffer());
  } catch {
    return errorResponse("invalid", 400);
  }
  if (!isWebp(buffer)) return errorResponse("format", 415);
  if (!process.env.CLOUDINARY_URL) return errorResponse("cloudinary", 503);

  const name = `image-${randomUUID()}`;
  try {
    const upload = await new Promise<{ public_id: string; secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({
        resource_type: "image",
        folder: `${page.slug}/uploads`,
        public_id: name,
        format: "webp",
        overwrite: false,
        unique_filename: false,
        use_filename: false,
      }, (error, result) => {
        if (error) reject(error);
        else if (!result) reject(new Error("Cloudinary returned no image."));
        else resolve(result);
      });
      stream.end(buffer);
    });

    if (!isCmsUploadedImageId(upload.public_id, page.slug) || !upload.secure_url.startsWith("https://")) {
      return errorResponse("upload", 502);
    }

    return Response.json({
      asset: {
        publicId: upload.public_id,
        localPath: `Image importée · ${name.slice(-6)}.webp`,
        secureUrl: upload.secure_url,
      },
    });
  } catch {
    return errorResponse("upload", 502);
  }
}
