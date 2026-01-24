#!/usr/bin/env node

/**
 * Bundle Size Reporter
 *
 * Measures the bundle size of @staple-css/primitives using esbuild.
 * Reports both raw and gzipped sizes.
 */

import { build } from "esbuild";
import { gzipSync } from "node:zlib";
import { readFileSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function measureBundle(name, entryPoint) {
  try {
    const result = await build({
      entryPoints: [entryPoint],
      bundle: true,
      minify: true,
      format: "esm",
      write: false,
      external: ["react", "react-dom"],
      platform: "browser",
      target: "es2022",
    });

    const code = result.outputFiles[0].contents;
    const gzipped = gzipSync(code);

    return {
      name,
      raw: code.length,
      gzip: gzipped.length,
    };
  } catch (error) {
    console.error(`Error measuring ${name}:`, error.message);
    return null;
  }
}

function measureCSS(name, filePath) {
  try {
    if (!existsSync(filePath)) {
      console.warn(`  CSS file not found: ${filePath}`);
      return null;
    }
    const content = readFileSync(filePath);
    const gzipped = gzipSync(content);

    return {
      name,
      raw: content.length,
      gzip: gzipped.length,
    };
  } catch (error) {
    console.error(`Error measuring ${name}:`, error.message);
    return null;
  }
}

async function main() {
  console.log("\n📦 staple-css Bundle Size Report\n");
  console.log("=".repeat(60));

  const results = [];

  // Measure primitives JS bundle
  const primitivesEntry = join(rootDir, "packages/primitives/dist/index.js");
  if (existsSync(primitivesEntry)) {
    const jsResult = await measureBundle("@staple-css/primitives (JS)", primitivesEntry);
    if (jsResult) results.push(jsResult);
  } else {
    console.warn("  Primitives not built yet. Run 'npm run build:packages' first.\n");
  }

  // Measure CSS files
  const cssFiles = [
    ["tokens.css", join(rootDir, "packages/tokens/dist/tokens.css")],
    ["themes.css", join(rootDir, "packages/tokens/dist/themes.css")],
    ["density.css", join(rootDir, "packages/tokens/dist/density.css")],
    ["primitives.css", join(rootDir, "packages/primitives/dist/primitives.css")],
  ];

  for (const [name, path] of cssFiles) {
    const cssResult = measureCSS(name, path);
    if (cssResult) results.push(cssResult);
  }

  if (results.length === 0) {
    console.log("\n  No files to measure. Run 'npm run build:packages' first.\n");
    process.exit(0);
  }

  // Print results table
  console.log("\n");
  console.log("  File".padEnd(35) + "Raw".padStart(12) + "Gzip".padStart(12));
  console.log("  " + "-".repeat(55));

  let totalRaw = 0;
  let totalGzip = 0;

  for (const result of results) {
    console.log(
      `  ${result.name}`.padEnd(35) +
        formatBytes(result.raw).padStart(12) +
        formatBytes(result.gzip).padStart(12)
    );
    totalRaw += result.raw;
    totalGzip += result.gzip;
  }

  console.log("  " + "-".repeat(55));
  console.log(
    "  Total".padEnd(35) +
      formatBytes(totalRaw).padStart(12) +
      formatBytes(totalGzip).padStart(12)
  );

  console.log("\n" + "=".repeat(60));

  // Size budget check (example: 10KB gzipped total)
  const BUDGET_KB = 10;
  const BUDGET_BYTES = BUDGET_KB * 1024;

  if (totalGzip <= BUDGET_BYTES) {
    console.log(`\n✅ Bundle is within budget (${BUDGET_KB}KB gzipped)\n`);
  } else {
    console.log(
      `\n⚠️  Bundle exceeds budget: ${formatBytes(totalGzip)} > ${BUDGET_KB}KB\n`
    );
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Bundle size check failed:", error);
  process.exit(1);
});
