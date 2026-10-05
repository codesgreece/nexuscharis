/**
 * Generates favicon / site-icon assets from the official NEXUS mark
 * (public/images/logo.svg) for Next.js App Router + stable public URLs.
 *
 * Run: npm run favicons
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import toIco from "to-ico";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE_SVG = path.join(ROOT, "public/images/logo.svg");
const APP = path.join(ROOT, "src/app");
const PUBLIC = path.join(ROOT, "public");

async function renderPng(size) {
  const svg = await fs.readFile(SOURCE_SVG);
  return sharp(svg, { density: Math.max(72, Math.round((size / 48) * 288)) })
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function writeBoth(relName, buffer) {
  // App Router file convention (metadata) + public stable URL where needed
  await fs.writeFile(path.join(APP, relName), buffer);
}

async function main() {
  const svgText = (await fs.readFile(SOURCE_SVG, "utf8")).trim() + "\n";

  // App Router SVG icon (crisp at any size)
  await fs.writeFile(path.join(APP, "icon.svg"), svgText);

  const png16 = await renderPng(16);
  const png32 = await renderPng(32);
  const png48 = await renderPng(48);
  const png180 = await renderPng(180);
  const png192 = await renderPng(192);
  const png512 = await renderPng(512);

  const ico = await toIco([png16, png32, png48], { resize: false });

  // Next.js App Router conventions → /favicon.ico, /icon, /apple-icon
  await writeBoth("favicon.ico", ico);
  await writeBoth("icon.png", png512);
  await writeBoth("apple-icon.png", png180);

  // Stable public helpers (Safari auto-discovery + PWA). App Router owns
  // /favicon.ico, /icon.png, /icon.svg, /apple-icon.png — do not duplicate those.
  await fs.writeFile(path.join(PUBLIC, "apple-touch-icon.png"), png180);
  await fs.writeFile(path.join(PUBLIC, "icon-192.png"), png192);
  await fs.writeFile(path.join(PUBLIC, "icon-512.png"), png512);

  // Remove legacy public copies that conflict with App Router icons
  for (const legacy of [
    "favicon.ico",
    "favicon.svg",
    "icon.png",
    "apple-icon.png",
  ]) {
    try {
      await fs.unlink(path.join(PUBLIC, legacy));
      console.log("Removed legacy", legacy);
    } catch {
      // already gone
    }
  }

  console.log(
    "Generated src/app/{favicon.ico,icon.png,icon.svg,apple-icon.png} + public/{apple-touch-icon.png,icon-192.png,icon-512.png}",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
