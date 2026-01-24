#!/usr/bin/env node

/**
 * Raw Value Checker
 *
 * Scans CSS files for suspicious raw values that should use tokens instead:
 * - Hex colors (#fff, #000000)
 * - rgb/rgba colors
 * - Pixel values (except 0px, 1px for borders)
 *
 * This is a best-effort lint to catch accidental hardcoded values.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

// Patterns to check
const patterns = [
  {
    name: "Hex color",
    regex: /#[0-9a-fA-F]{3,8}\b/g,
    // Allow common exceptions
    exceptions: [],
  },
  {
    name: "rgb/rgba color",
    regex: /rgba?\s*\([^)]+\)/gi,
    // Allow rgb(0 0 0 / x) which is used in shadows
    exceptions: [/rgb\s*\(\s*0\s+0\s+0/i],
  },
  {
    name: "Hardcoded px value",
    regex: /(?<![\w-])(\d+)px\b/g,
    // Allow 0px, 1px (borders), common breakpoints
    exceptions: [/^0px$/, /^1px$/],
  },
];

// Files/directories to scan
const scanPaths = [
  "packages/primitives/src/primitives.css",
];

// Files to ignore
const ignorePaths = [
  "node_modules",
  "dist",
  ".git",
];

function shouldIgnore(filePath) {
  return ignorePaths.some((p) => filePath.includes(p));
}

function scanFile(filePath) {
  const issues = [];
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  lines.forEach((line, lineIndex) => {
    // Skip comments
    if (line.trim().startsWith("/*") || line.trim().startsWith("*") || line.trim().startsWith("//")) {
      return;
    }

    patterns.forEach((pattern) => {
      const matches = line.matchAll(pattern.regex);
      for (const match of matches) {
        const value = match[0];

        // Check exceptions
        const isException = pattern.exceptions.some((exc) =>
          typeof exc === "string" ? value === exc : exc.test(value)
        );

        if (!isException) {
          issues.push({
            file: filePath,
            line: lineIndex + 1,
            column: match.index + 1,
            type: pattern.name,
            value,
            context: line.trim(),
          });
        }
      }
    });
  });

  return issues;
}

function scanDirectory(dirPath) {
  let allIssues = [];

  const entries = readdirSync(dirPath);
  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    if (shouldIgnore(fullPath)) continue;

    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      allIssues = allIssues.concat(scanDirectory(fullPath));
    } else if (extname(entry) === ".css") {
      allIssues = allIssues.concat(scanFile(fullPath));
    }
  }

  return allIssues;
}

function main() {
  console.log("\n🔍 Checking for raw values in CSS...\n");
  console.log("=".repeat(60));

  let allIssues = [];

  for (const scanPath of scanPaths) {
    const fullPath = join(rootDir, scanPath);
    try {
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        allIssues = allIssues.concat(scanDirectory(fullPath));
      } else {
        allIssues = allIssues.concat(scanFile(fullPath));
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(`  Skipping ${scanPath} (not found)`);
      } else {
        console.error(`  Error scanning ${scanPath}:`, error.message);
      }
    }
  }

  if (allIssues.length === 0) {
    console.log("\n✅ No suspicious raw values found!\n");
    process.exit(0);
  }

  console.log(`\n⚠️  Found ${allIssues.length} potential issue(s):\n`);

  // Group by file
  const byFile = {};
  for (const issue of allIssues) {
    if (!byFile[issue.file]) {
      byFile[issue.file] = [];
    }
    byFile[issue.file].push(issue);
  }

  for (const [file, issues] of Object.entries(byFile)) {
    console.log(`\n  ${file}:`);
    for (const issue of issues) {
      console.log(`    Line ${issue.line}: ${issue.type} "${issue.value}"`);
      console.log(`      ${issue.context}`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("\nNote: Some values may be intentional (e.g., border widths).");
  console.log("Review the above and update the exceptions if needed.\n");

  // Don't fail the build, just warn
  process.exit(0);
}

main();
