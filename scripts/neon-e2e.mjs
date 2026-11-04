import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { DeleteObjectCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { neon } from "@neondatabase/serverless";

const baseUrl = process.env.NEON_TEST_BASE_URL || "http://localhost:3000";
const requiredEnv = ["DATABASE_URL", "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_ENDPOINT_URL_S3", "AWS_REGION", "NEON_AUTH_BASE_URL", "NEON_AUTH_COOKIE_SECRET"];
const missingEnv = requiredEnv.filter((name) => !process.env[name]);
assert.equal(missingEnv.length, 0, `Missing Neon env vars: ${missingEnv.join(", ")}`);

const sql = neon(process.env.DATABASE_URL);
const storage = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const marker = randomUUID();
const email = `codex-neon-${marker}@example.invalid`;
const testPdf = Buffer.from("%PDF-1.7\nTemporary Neon integration test\n");

async function cleanup() {
  const rows = await sql`SELECT attachments FROM quote_enquiries WHERE email = ${email}`;
  for (const row of rows) {
    const attachments = typeof row.attachments === "string" ? JSON.parse(row.attachments) : row.attachments;
    await Promise.all((attachments ?? []).map(({ key }) =>
      storage.send(new DeleteObjectCommand({ Bucket: "devis-attachments", Key: key })),
    ));
  }
  await sql`DELETE FROM quote_enquiries WHERE email = ${email}`;
}

let testError;
try {
  const badSignIn = await fetch(`${baseUrl}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password: marker }),
  });
  assert.notEqual(badSignIn.status, 404, "Neon Auth route was not found.");
  assert.ok(badSignIn.status < 500, `Neon Auth returned HTTP ${badSignIn.status}.`);

  const inbox = await fetch(`${baseUrl}/admin/devis`, { redirect: "manual" });
  const inboxBody = await inbox.text();
  const redirectsToSignIn = /\/admin(?:\?|$)/.test(inbox.headers.get("location") || "") ||
    (inbox.status === 200 && inboxBody.includes("/admin"));
  assert.ok(redirectsToSignIn, `Unauthenticated inbox did not redirect to sign-in (HTTP ${inbox.status}).`);
  console.log("PASS Neon Auth: sign-in route responds; anonymous inbox is denied.");

  const form = new FormData();
  form.set("name", "Codex Neon smoke test");
  form.set("city", "Marrakech");
  form.set("phone", "+212 777 54 39 97");
  form.set("email", email);
  form.set("type", "Rénovation / finitions");
  form.set("description", `Temporary end-to-end verification ${marker}`);
  form.append("documents", new Blob([testPdf], { type: "application/pdf" }), "smoke-test.pdf");

  const submitted = await fetch(`${baseUrl}/api/enquiries`, { method: "POST", body: form });
  const result = await submitted.json();
  assert.equal(submitted.status, 201, result.error || `Quote API returned HTTP ${submitted.status}.`);

  const rows = await sql`SELECT id, attachments FROM quote_enquiries WHERE id = ${result.id}::uuid`;
  assert.equal(rows.length, 1, "The quote was not saved to Postgres.");
  const attachments = typeof rows[0].attachments === "string" ? JSON.parse(rows[0].attachments) : rows[0].attachments;
  assert.equal(attachments.length, 1, "The quote attachment was not linked in Postgres.");

  const object = await storage.send(new GetObjectCommand({ Bucket: "devis-attachments", Key: attachments[0].key }));
  const storedPdf = await object.Body.transformToByteArray();
  assert.deepEqual(Buffer.from(storedPdf), testPdf, "The stored attachment contents do not match.");
  console.log("PASS Postgres and Object Storage: quote and private attachment round-trip.");
} catch (error) {
  testError = error;
}

try {
  await cleanup();
  console.log("PASS Cleanup: temporary test row and attachment removed.");
} catch (error) {
  console.error(`Cleanup failed for ${email}; temporary test data may remain.`, error);
  testError ??= error;
}

if (testError) throw testError;
