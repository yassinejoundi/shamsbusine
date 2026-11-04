import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { v2 as cloudinary } from "cloudinary";

assert.ok(process.env.CLOUDINARY_URL, "CLOUDINARY_URL is not configured.");

const result = await cloudinary.api.ping();
assert.equal(result.status, "ok", "Cloudinary API ping failed.");
const { assets } = JSON.parse(await readFile(new URL("../lib/cms/assets.json", import.meta.url), "utf8"));
const folders = [...new Set(assets.map(({ folder }) => folder))];
for (const folder of folders) {
  const expected = assets.filter((asset) => asset.folder === folder).map(({ publicId }) => publicId);
  const response = await cloudinary.api.resources({ type: "upload", prefix: `${folder}/`, max_results: 500 });
  const present = new Set(response.resources.map(({ public_id }) => public_id));
  assert.deepEqual(expected.filter((id) => !present.has(id)), [], `Cloudinary folder ${folder} is missing assets.`);
}
console.log(`PASS Cloudinary: authenticated API; all ${assets.length} assets verified across ${folders.length} folders.`);
