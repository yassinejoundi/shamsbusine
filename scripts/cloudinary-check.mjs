import assert from "node:assert/strict";
import { v2 as cloudinary } from "cloudinary";

assert.ok(process.env.CLOUDINARY_URL, "CLOUDINARY_URL is not configured.");

const result = await cloudinary.api.ping();
assert.equal(result.status, "ok", "Cloudinary API ping failed.");
console.log("PASS Cloudinary: authenticated API ping.");
