/**
 * Generates favicon / site-icon assets from the official NEXUS N-mark
 * (public/images/logo-mark.png) for Next.js App Router + stable public URLs.
 *
 * Source of truth for the full brand lockup: public/images/brand-logo.png
 * Favicon / app icons use ONLY the N mark (no wordmark text).
 *
 * Run: npm run favicons
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import toIco from "to-ico";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE_MARK = path.join(ROOT, "public/images/logo-mark.png");
const APP = path.join(ROOT, "src/app");
const PUBLIC = path.join(ROOT, "public");

async function renderPng(size) {
  return sharp(SOURCE_MARK)
    .resize(size, size, {
      fit: "contain",
      background: { r: 250, g: 248, b: 255, alpha: 1 },
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function main() {
  await fs.access(SOURCE_MARK);

  const png16 = await renderPng(16);
  const png32 = await renderPng(32);
  const png48 = await renderPng(48);
  const png180 = await renderPng(180);
  const png192 = await renderPng(192);
  const png512 = await renderPng(512);

  const ico = await toIco([png16, png32, png48], { resize: false });

  // Next.js App Router conventions → /favicon.ico, /icon, /apple-icon
  await fs.writeFile(path.join(APP, "favicon.ico"), ico);
  await fs.writeFile(path.join(APP, "icon.png"), png512);
  await fs.writeFile(path.join(APP, "apple-icon.png"), png180);

  // Remove legacy SVG icon so browsers use the official PNG mark
  try {
    await fs.unlink(path.join(APP, "icon.svg"));
    console.log("Removed legacy src/app/icon.svg");
  } catch {
    // already gone
  }

  // Stable public helpers (Safari auto-discovery + PWA + Google favicon sizes)
  await fs.writeFile(path.join(PUBLIC, "apple-touch-icon.png"), png180);
  await fs.writeFile(path.join(PUBLIC, "icon-192.png"), png192);
  await fs.writeFile(path.join(PUBLIC, "icon-512.png"), png512);
  await fs.writeFile(path.join(PUBLIC, "favicon-16x16.png"), png16);
  await fs.writeFile(path.join(PUBLIC, "favicon-32x32.png"), png32);
  await fs.writeFile(path.join(PUBLIC, "favicon-48x48.png"), png48);

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
    "Generated src/app/{favicon.ico,icon.png,apple-icon.png} + public/{apple-touch-icon.png,icon-192.png,icon-512.png,favicon-16x16.png,favicon-32x32.png,favicon-48x48.png}",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
