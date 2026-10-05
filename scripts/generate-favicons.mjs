/**
 * Generates favicon assets from the official NEXUS mark (public/images/logo.svg).
 * Run: node scripts/generate-favicons.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import toIco from "to-ico";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE_SVG = path.join(ROOT, "public/images/logo.svg");
const PUBLIC = path.join(ROOT, "public");

async function renderPng(size) {
  const svg = await fs.readFile(SOURCE_SVG);
  return sharp(svg, { density: Math.max(72, Math.round((size / 48) * 144)) })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function main() {
  const svg = await fs.readFile(SOURCE_SVG, "utf8");
  await fs.writeFile(path.join(PUBLIC, "favicon.svg"), svg.trim() + "\n");

  const sizes = [16, 32, 48];
  const pngBySize = {};
  for (const size of sizes) {
    pngBySize[size] = await renderPng(size);
  }

  const ico = await toIco(
    sizes.map((size) => pngBySize[size]),
    { resize: false },
  );
  await fs.writeFile(path.join(PUBLIC, "favicon.ico"), ico);

  await fs.writeFile(path.join(PUBLIC, "icon.png"), pngBySize[48]);
  await fs.writeFile(path.join(PUBLIC, "apple-touch-icon.png"), await renderPng(180));
  await fs.writeFile(path.join(PUBLIC, "icon-192.png"), await renderPng(192));
  await fs.writeFile(path.join(PUBLIC, "icon-512.png"), await renderPng(512));

  console.log("Generated favicon.ico (16, 32, 48), icon.png, apple-touch-icon.png, icon-192/512, favicon.svg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
