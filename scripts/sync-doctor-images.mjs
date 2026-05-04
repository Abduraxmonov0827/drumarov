import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.join(__dirname, "..");

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

const defaultSrc = path.join(websiteRoot, "..", "images");
const destDir = path.join(websiteRoot, "public", "images");

const srcDir = process.env.DOCTOR_IMAGES_SOURCE?.trim() || defaultSrc;

if (!fs.existsSync(srcDir)) {
  console.warn(`[sync-images] Manba topilmadi: ${srcDir}`);
  console.warn("Rasmlarni shu yerga qo‘ying yoki DOCTOR_IMAGES_SOURCE ni sozlang.");
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter((f) => IMAGE_EXT.test(f));
if (files.length === 0) {
  console.warn(`[sync-images] ${srcDir} ichida rasm fayli yo‘q.`);
  process.exit(0);
}

for (const file of files) {
  const from = path.join(srcDir, file);
  const to = path.join(destDir, file);
  fs.copyFileSync(from, to);
  console.log(`[sync-images] ${file} → public/images/`);
}

console.log(`[sync-images] Tayyor: ${files.length} fayl.`);
