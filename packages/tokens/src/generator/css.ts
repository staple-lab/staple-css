// ---------------------------------------------------------------------------
// CSS Custom Properties Generator
//
// Produces CSS files from token definitions:
//   - tokens.css   — semantic tokens as :root CSS variables
//   - palettes.css — Tailwind-style color palette variables
//   - themes.css   — light/dark theme switching via [data-theme]
//   - all.css      — combined output
// ---------------------------------------------------------------------------

import type { ColorToken, ScaleToken, TokenRegistry } from '../types.js';
import { getAllTokens } from '../definitions/index.js';
import { generatePalettesCss as paletteCss } from '../palettes.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function header(title: string): string {
  return [
    '/**',
    ` * @staple-css/tokens — ${title}`,
    ' * Auto-generated — do not edit by hand.',
    ' */',
    '',
  ].join('\n');
}

function scaleBlock(tokens: ScaleToken[]): string[] {
  return tokens.map((t) => `  --${t.name}: ${t.value};`);
}

// ---------------------------------------------------------------------------
// Semantic tokens (:root defaults use light-mode values)
// ---------------------------------------------------------------------------

export function generateTokensCss(registry?: TokenRegistry): string {
  const reg = registry ?? getAllTokens();
  const lines: string[] = [header('Semantic Tokens')];

  lines.push(':root {');

  // Color tokens — light values as defaults
  if (reg.color.length > 0) {
    lines.push('  /* Color */');
    for (const t of reg.color) {
      lines.push(`  --${t.name}: ${t.light};`);
    }
    lines.push('');
  }

  // Scale categories
  const scaleCategories: { label: string; tokens: ScaleToken[] }[] = [
    { label: 'Space', tokens: reg.space },
    { label: 'Typography', tokens: reg.type },
    { label: 'Elevation', tokens: reg.elevation },
    { label: 'Border', tokens: reg.border },
    { label: 'Motion', tokens: reg.motion },
    { label: 'Layout', tokens: reg.layout },
  ];

  for (const cat of scaleCategories) {
    if (cat.tokens.length === 0) continue;
    lines.push(`  /* ${cat.label} */`);
    lines.push(...scaleBlock(cat.tokens));
    lines.push('');
  }

  // Flex & Grid (LayoutToken — same shape as ScaleToken)
  for (const cat of [
    { label: 'Flex', tokens: reg.flex },
    { label: 'Grid', tokens: reg.grid },
  ] as const) {
    if (cat.tokens.length === 0) continue;
    lines.push(`  /* ${cat.label} */`);
    lines.push(...cat.tokens.map((t) => `  --${t.name}: ${t.value};`));
    lines.push('');
  }

  lines.push('}');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Palette CSS (delegates to palettes.ts)
// ---------------------------------------------------------------------------

export function generatePalettesCss(): string {
  return paletteCss();
}

// ---------------------------------------------------------------------------
// Theme CSS — light and dark selectors
// ---------------------------------------------------------------------------

function themeBlock(
  selector: string,
  tokens: ColorToken[],
  mode: 'light' | 'dark',
): string[] {
  const lines: string[] = [];
  lines.push(`${selector} {`);
  for (const t of tokens) {
    lines.push(`  --${t.name}: ${t[mode]};`);
  }
  lines.push('}');
  return lines;
}

export function generateThemesCss(registry?: TokenRegistry): string {
  const reg = registry ?? getAllTokens();
  const colorTokens = reg.color;

  if (colorTokens.length === 0) return '';

  const lines: string[] = [header('Theme Switching')];

  // Light theme
  lines.push(...themeBlock('[data-theme="light"]', colorTokens, 'light'));
  lines.push('');

  // Dark theme
  lines.push(...themeBlock('[data-theme="dark"]', colorTokens, 'dark'));
  lines.push('');

  // System preference fallback
  lines.push('@media (prefers-color-scheme: dark) {');
  lines.push('  :root:not([data-theme]) {');
  for (const t of colorTokens) {
    lines.push(`    --${t.name}: ${t.dark};`);
  }
  lines.push('  }');
  lines.push('}');

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Combined CSS
// ---------------------------------------------------------------------------

export function generateAllCss(registry?: TokenRegistry): string {
  const reg = registry ?? getAllTokens();
  return [
    generateTokensCss(reg),
    '',
    generatePalettesCss(),
    '',
    generateThemesCss(reg),
  ].join('\n');
}
