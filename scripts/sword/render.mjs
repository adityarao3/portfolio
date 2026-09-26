// Renders render.html in headless Chromium and writes the sword asset.
// Usage: node scripts/sword/render.mjs  (needs playwright + Chromium)
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "../../public/assets/sword");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
page.on("pageerror", (e) => { console.error(e); process.exit(1); });
await page.goto(pathToFileURL(resolve(here, "render.html")).href);
await page.evaluate(() => window.renderSword());

const grab = (type, q, scale, name = "full") =>
  page.evaluate(([type, q, scale, name]) => {
    const src = LAYERS[name];
    let c = src;
    if (scale !== 1) {
      c = document.createElement("canvas");
      c.width = src.width * scale; c.height = src.height * scale;
      const g = c.getContext("2d");
      g.imageSmoothingQuality = "high";
      g.drawImage(src, 0, 0, c.width, c.height);
    }
    return c.toDataURL(type, q);
  }, [type, q, scale, name]);

const save = (name, url) => {
  const buf = Buffer.from(url.split(",")[1], "base64");
  writeFileSync(resolve(outDir, name), buf);
  console.log(name, (buf.length / 1024 / 1024).toFixed(2) + " MB");
};
save("demon-slayer-sword-4k.png", await grab("image/png", undefined, 1));
save("demon-slayer-sword-4k.webp", await grab("image/webp", 0.9, 1));
save("demon-slayer-sword-2k.webp", await grab("image/webp", 0.9, 0.5));
for (const name of ["base", "glow", "fx"]) {
  save(`sword-${name}-4k.webp`, await grab("image/webp", 0.9, 1, name));
  save(`sword-${name}-2k.webp`, await grab("image/webp", 0.9, 0.5, name));
}
await browser.close();
