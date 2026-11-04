import assert from "node:assert/strict";
import { test } from "node:test";
import { isAllowedAttachment } from "./enquiry-files.ts";

test("accepts supported file signatures", async () => {
  assert.equal(await isAllowedAttachment(new File(["%PDF-1.7"], "plan.pdf", { type: "application/pdf" })), true);
  assert.equal(await isAllowedAttachment(new File([new Uint8Array([0xff, 0xd8, 0xff])], "photo.jpg", { type: "image/jpeg" })), true);
});

test("rejects unsupported and mislabeled file content", async () => {
  assert.equal(await isAllowedAttachment(new File(["plain text"], "photo.jpg", { type: "image/jpeg" })), false);
  assert.equal(await isAllowedAttachment(new File(["<svg/>"] , "image.svg", { type: "image/svg+xml" })), false);
});
