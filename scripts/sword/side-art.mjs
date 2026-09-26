// Renders side-art.html in headless Chromium and writes the left-margin art.
// Usage: node scripts/sword/side-art.mjs  (needs playwright + Chromium)
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "../../public/assets/side");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
page.on("pageerror", (e) => { console.error(e); process.exit(1); });
await page.goto(pathToFileURL(resolve(here, "side-art.html")).href);

for (const mode of ["dark", "light"]) {
  const url = await page.evaluate((m) => window.renderSide(m), mode);
  const buf = Buffer.from(url.split(",")[1], "base64");
  writeFileSync(resolve(outDir, `anti-magic-${mode}.webp`), buf);
  console.log(`anti-magic-${mode}.webp`, (buf.length / 1024).toFixed(0) + " KB");
}
await browser.close();
