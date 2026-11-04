import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { v2 as cloudinary } from "cloudinary";

const root = process.cwd();
const imagesRoot = path.join(root, "public", "images");
const sourceIndex = JSON.parse(await readFile(path.join(imagesRoot, "sources.json"), "utf8"));
const output = path.join(root, "lib", "cms", "assets.json");
let existingAssets = [];
try {
  existingAssets = JSON.parse(await readFile(output, "utf8")).assets ?? [];
} catch {
  // First upload.
}
const sources = new Map([
  ...(sourceIndex.images ?? []),
  ...(sourceIndex.generated_images ?? []),
  ...(sourceIndex.partner_logos ?? []),
  ...(sourceIndex.logo ? [sourceIndex.logo] : []),
].map((entry) => [entry.file, entry]));

function foldersFor(file) {
  const base = path.basename(file);
  if (base === "shamsbusine-logo.png") return ["shared"];
  if (file.startsWith("partners/")) return ["entreprise"];
  if (base.startsWith("contact-")) return ["contact"];
  if (["services-structure.webp", "services-finitions.webp"].includes(base)) return ["services", "home"];
  if (base.startsWith("services-")) return ["services"];
  if (base.startsWith("entreprise-") || ["souihla-perspective.jpeg", "materials-study.webp"].includes(base)) return ["entreprise"];
  if (["villa-jardin.webp", "villa-exterieur.webp", "escalier-interieur.webp", "chantier-structure.webp", "chantier-maconnerie.webp", "detail-finitions.webp"].includes(base)) return ["home", "realisations"];
  if (base === "company-team.webp") return ["home"];
  if (base === "techniciens-chantier.webp" || base === "faq-villa-detail.jpg" || base === "chantier-structure.webp") return ["home"];
  return ["home"];
}

async function findImages(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const found = [];
  for (const entry of entries) {
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) found.push(...await findImages(path.join(directory, entry.name), relative));
    else if (/\.(avif|gif|jpe?g|png|webp)$/i.test(entry.name)) found.push(relative);
  }
  return found;
}

const files = await findImages(imagesRoot);
const assets = [...existingAssets];
const currentKeys = new Set(existingAssets.map((asset) => `${asset.localPath}:${asset.folder}`));
const failures = [];

for (const file of files) {
  for (const folder of foldersFor(file)) {
    const localPath = `/images/${file}`;
    const key = `${localPath}:${folder}`;
    if (currentKeys.has(key)) continue;
    try {
      const upload = await cloudinary.uploader.upload(path.join(imagesRoot, file), {
        resource_type: "image",
        folder,
        public_id: path.parse(file).name,
        overwrite: true,
        unique_filename: false,
        use_filename: false,
      });
      assets.push({
        localPath,
        folder,
        publicId: upload.public_id,
        secureUrl: upload.secure_url,
        source: sources.get(`/images/${file}`) ?? null,
      });
      currentKeys.add(key);
    } catch (error) {
      const detail = error && typeof error === "object"
        ? ("message" in error ? String(error.message) : "error" in error ? String(error.error) : "upload failed")
        : String(error);
      failures.push(`${file} (${folder}): ${detail}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify({ assets }, null, 2)}\n`);
  console.log(`Uploaded ${assets.length} Cloudinary assets from ${files.length} local images into page folders.`);
}
