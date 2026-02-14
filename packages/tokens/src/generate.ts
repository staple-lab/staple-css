#!/usr/bin/env node
// ---------------------------------------------------------------------------
// CLI entry point — generates CSS, JSON, and TS files into dist/
//
// Usage:  node --import tsx src/generate.ts
// ---------------------------------------------------------------------------

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { getAllTokens } from './definitions/index.js';
import {
  generateTokensCss,
  generatePalettesCss,
  generateThemesCss,
  generateAllCss,
} from './generator/css.js';
import { generateTokensJson } from './generator/json.js';
import { generateTypeScriptConstants } from './generator/typescript.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = join(__dirname, '..', 'dist');

// Ensure dist/ exists
mkdirSync(distDir, { recursive: true });

const registry = getAllTokens();

const files: { name: string; content: string }[] = [
  { name: 'tokens.css', content: generateTokensCss(registry) },
  { name: 'palettes.css', content: generatePalettesCss() },
  { name: 'themes.css', content: generateThemesCss(registry) },
  { name: 'all.css', content: generateAllCss(registry) },
  { name: 'tokens.json', content: generateTokensJson(registry) },
  { name: 'tokens.ts', content: generateTypeScriptConstants(registry) },
];

for (const file of files) {
  const filePath = join(distDir, file.name);
  writeFileSync(filePath, file.content + '\n', 'utf-8');
  console.log(`  wrote ${file.name} (${file.content.length} bytes)`);
}

console.log(`\nGenerated ${files.length} files in dist/`);
