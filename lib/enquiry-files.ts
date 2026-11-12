const signatures: Record<string, (bytes: Uint8Array) => boolean> = {
  "application/pdf": (bytes) => new TextDecoder().decode(bytes.subarray(0, 5)) === "%PDF-",
  "image/jpeg": (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
  "image/png": (bytes) => [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((byte, i) => bytes[i] === byte),
  "image/webp": (bytes) => new TextDecoder().decode(bytes.subarray(0, 4)) === "RIFF" && new TextDecoder().decode(bytes.subarray(8, 12)) === "WEBP",
};

export const maxAttachmentBytes = 5 * 1024 * 1024;
export const maxTotalAttachmentBytes = 10 * 1024 * 1024;
export const maxAttachmentCount = 3;

export function getAttachmentLimitError(files: ReadonlyArray<{ size: number }>) {
  if (files.length > maxAttachmentCount) return "count";
  if (files.some((file) => file.size > maxAttachmentBytes)) return "file-size";
  if (files.reduce((total, file) => total + file.size, 0) > maxTotalAttachmentBytes) return "total-size";
  return null;
}

export async function isAllowedAttachment(file: File) {
  const signature = signatures[file.type];
  if (!signature || file.size > maxAttachmentBytes) return false;
  return signature(new Uint8Array(await file.slice(0, 12).arrayBuffer()));
}
