import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const ROOT = new URL("../visual-diff/", import.meta.url).pathname.replace(/^\/([a-zA-Z]:)/, "$1");
const BASELINE_DIR = `${ROOT}baseline/`;
const CURRENT_DIR = `${ROOT}current/`;
const DIFF_DIR = `${ROOT}diff/`;
const MANIFEST_PATH = `${ROOT}manifest.json`;
const REPORT_PATH = `${ROOT}report.json`;

const THRESHOLD_PERCENT = 1; // % mismatch above which a pair is marked as failing

const onlyArgIndex = process.argv.indexOf("--only");
const onlyName = onlyArgIndex !== -1 ? process.argv[onlyArgIndex + 1] : null;

mkdirSync(DIFF_DIR, { recursive: true });

const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
const entries = onlyName ? manifest.filter((e) => e.name === onlyName) : manifest;

if (entries.length === 0) {
  console.error(`No manifest entries matched${onlyName ? ` --only ${onlyName}` : ""}.`);
  process.exit(1);
}

function loadPng(path) {
  return PNG.sync.read(readFileSync(path));
}

function cropToTopLeft(png, width, height) {
  if (png.width === width && png.height === height) return png;
  const cropped = new PNG({ width, height });
  PNG.bitblt(png, cropped, 0, 0, width, height, 0, 0);
  return cropped;
}

const results = [];

for (const entry of entries) {
  const { name } = entry;
  const baselinePath = `${BASELINE_DIR}${name}.png`;
  const currentPath = `${CURRENT_DIR}${name}.png`;

  if (!existsSync(baselinePath) || !existsSync(currentPath)) {
    console.warn(`Skipping "${name}": missing ${!existsSync(baselinePath) ? "baseline" : "current"} file.`);
    results.push({ name, error: "missing-file" });
    continue;
  }

  const baselineRaw = loadPng(baselinePath);
  const currentRaw = loadPng(currentPath);

  const width = Math.min(baselineRaw.width, currentRaw.width);
  const height = Math.min(baselineRaw.height, currentRaw.height);
  const dimensionMismatch =
    baselineRaw.width !== currentRaw.width || baselineRaw.height !== currentRaw.height;

  const baseline = cropToTopLeft(baselineRaw, width, height);
  const current = cropToTopLeft(currentRaw, width, height);
  const diff = new PNG({ width, height });

  const diffPixels = pixelmatch(baseline.data, current.data, diff.data, width, height, {
    threshold: 0.1,
    includeAA: false,
  });

  const totalPixels = width * height;
  const mismatchPercent = Number(((diffPixels / totalPixels) * 100).toFixed(3));

  writeFileSync(`${DIFF_DIR}${name}.diff.png`, PNG.sync.write(diff));

  results.push({
    name,
    baselineSize: { width: baselineRaw.width, height: baselineRaw.height },
    currentSize: { width: currentRaw.width, height: currentRaw.height },
    dimensionMismatch,
    comparedSize: { width, height },
    diffPixels,
    totalPixels,
    mismatchPercent,
    pass: mismatchPercent <= THRESHOLD_PERCENT,
  });
}

results.sort((a, b) => (b.mismatchPercent ?? 0) - (a.mismatchPercent ?? 0));

writeFileSync(
  REPORT_PATH,
  JSON.stringify({ threshold: THRESHOLD_PERCENT, generatedAt: new Date().toISOString(), results }, null, 2)
);

console.log(`\nPixel diff report (threshold: ${THRESHOLD_PERCENT}%)\n`);
for (const r of results) {
  if (r.error) {
    console.log(`  ${r.name.padEnd(12)} SKIPPED (${r.error})`);
    continue;
  }
  const status = r.pass ? "PASS" : "FAIL";
  const dimNote = r.dimensionMismatch ? "  [size mismatch, cropped]" : "";
  console.log(`  ${r.name.padEnd(12)} ${r.mismatchPercent.toString().padStart(6)}%  ${status}${dimNote}`);
}
console.log(`\nFull report: ${REPORT_PATH}`);
console.log(`Diff images: ${DIFF_DIR}`);
