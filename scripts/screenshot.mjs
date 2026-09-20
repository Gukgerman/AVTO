import { chromium } from "playwright";
import { mkdirSync } from "fs";

const widths = [1440, 1280, 1024, 768, 430, 390, 360];
const outDir = "screenshots";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);

  // scroll through the whole page to trigger whileInView reveal animations
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < scrollHeight; y += 400) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  await page.screenshot({ path: `${outDir}/full-${width}.png`, fullPage: true });
  await page.close();
  console.log(`captured ${width}`);
}
await browser.close();
