import assert from "node:assert/strict";
import { test } from "node:test";
import { getAttachmentLimitError, isAllowedAttachment, maxAttachmentBytes, maxAttachmentCount, maxTotalAttachmentBytes } from "./enquiry-files.ts";

test("accepts supported file signatures", async () => {
  assert.equal(await isAllowedAttachment(new File(["%PDF-1.7"], "plan.pdf", { type: "application/pdf" })), true);
  assert.equal(await isAllowedAttachment(new File([new Uint8Array([0xff, 0xd8, 0xff])], "photo.jpg", { type: "image/jpeg" })), true);
});

test("rejects unsupported and mislabeled file content", async () => {
  assert.equal(await isAllowedAttachment(new File(["plain text"], "photo.jpg", { type: "image/jpeg" })), false);
  assert.equal(await isAllowedAttachment(new File(["<svg/>"] , "image.svg", { type: "image/svg+xml" })), false);
});

test("accepts files up to 5 MiB and exposes the shared attachment limits", async () => {
  const atLimit = new Uint8Array(maxAttachmentBytes);
  atLimit.set(new TextEncoder().encode("%PDF-1.7"));
  assert.equal(await isAllowedAttachment(new File([atLimit], "plan.pdf", { type: "application/pdf" })), true);
  assert.equal(await isAllowedAttachment(new File([new Uint8Array(maxAttachmentBytes + 1)], "plan.pdf", { type: "application/pdf" })), false);
  assert.equal(maxAttachmentCount, 3);
  assert.equal(maxTotalAttachmentBytes, 10 * 1024 * 1024);
});

test("enforces file count and combined size limits", () => {
  assert.equal(getAttachmentLimitError(Array.from({ length: maxAttachmentCount }, () => ({ size: 1 }))), null);
  assert.equal(getAttachmentLimitError(Array.from({ length: maxAttachmentCount + 1 }, () => ({ size: 1 }))), "count");
  assert.equal(getAttachmentLimitError([{ size: maxAttachmentBytes + 1 }]), "file-size");
  assert.equal(getAttachmentLimitError([{ size: maxAttachmentBytes }, { size: maxAttachmentBytes }, { size: 1 }]), "total-size");
});
