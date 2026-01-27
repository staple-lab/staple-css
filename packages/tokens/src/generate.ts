/**
 * CSS Generator
 *
 * Generates CSS variable files from token definitions.
 * Run with: node --import tsx src/generate.ts
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  spaceScale,
  radiusScale,
  shadowScale,
  zIndexScale,
  opacityScale,
  borderWidthScale,
  maxWidthScale,
  aspectRatioScale,
  letterSpacingScale,
  lineClampScale,
  outlineWidthScale,
  outlineOffsetScale,
  blurScale,
  brightnessScale,
  contrastScale,
  saturateScale,
  scaleScale,
  displayScale,
  positionScale,
  overflowScale,
  flexGrowScale,
  flexShrinkScale,
  orderScale,
  cursorScale,
  textTransformScale,
  whiteSpaceScale,
  objectFitScale,
  gradients,
  fontFamily,
  fontSizeScale,
  lineHeight,
  fontWeight,
  duration,
  easing,
  delay,
  colorsLight,
  colorsDark,
  densityComfortable,
  densityCompact,
} from "./tokens.js";
import { generatePalettesCss } from "./palettes.js";
import { generateBreakpointsCss } from "./breakpoints.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");

// Ensure dist directory exists
mkdirSync(distDir, { recursive: true });

/**
 * Convert camelCase to kebab-case
 */
function toKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Generate CSS variable declarations
 */
function generateVars(
  prefix: string,
  values: Record<string | number, string>
): string {
  return Object.entries(values)
    .map(([key, value]) => `  --st-${prefix}-${toKebab(String(key))}: ${value};`)
    .join("\n");
}

// ============================================================================
// tokens.css - Base tokens (non-theme, non-density)
// ============================================================================
const tokensCss = `/**
 * @staple-css/tokens - Base Tokens
 *
 * Core design tokens for spacing, typography, shadows, motion, and layout.
 * Import this file once at your app root.
 */

:root {
  /* Space Scale (0-8) */
${generateVars("space", spaceScale)}

  /* Radius Scale (0-4) */
${generateVars("radius", radiusScale)}

  /* Shadow Scale (0-2) */
${generateVars("shadow", shadowScale)}

  /* Z-Index Scale */
${generateVars("z", zIndexScale)}

  /* Opacity Scale (0-100) */
${generateVars("opacity", opacityScale)}

  /* Border Width Scale */
${generateVars("border-width", borderWidthScale)}

  /* Max Width Scale */
${generateVars("max-width", maxWidthScale)}

  /* Aspect Ratio Scale */
${generateVars("aspect", aspectRatioScale)}

  /* Letter Spacing Scale */
${generateVars("letter-spacing", letterSpacingScale)}

  /* Line Clamp Scale */
${generateVars("line-clamp", lineClampScale)}

  /* Outline Width Scale */
${generateVars("outline-width", outlineWidthScale)}

  /* Outline Offset Scale */
${generateVars("outline-offset", outlineOffsetScale)}

  /* Blur Scale */
${generateVars("blur", blurScale)}

  /* Brightness Scale */
${generateVars("brightness", brightnessScale)}

  /* Contrast Scale */
${generateVars("contrast", contrastScale)}

  /* Saturate Scale */
${generateVars("saturate", saturateScale)}

  /* Scale (Transform) Scale */
${generateVars("scale", scaleScale)}

  /* Font Family */
${generateVars("font", fontFamily)}

  /* Font Size Scale (0-6) */
${generateVars("font-size", fontSizeScale)}

  /* Line Height */
${generateVars("leading", lineHeight)}

  /* Font Weight */
${generateVars("font-weight", fontWeight)}

  /* Motion - Duration */
${generateVars("duration", duration)}

  /* Motion - Easing */
${generateVars("easing", easing)}

  /* Motion - Delays */
${generateVars("delay", delay)}

  /* Display Values */
${generateVars("display", displayScale)}

  /* Position Values */
${generateVars("position", positionScale)}

  /* Overflow Values */
${generateVars("overflow", overflowScale)}

  /* Flex Grow */
${generateVars("flex-grow", flexGrowScale)}

  /* Flex Shrink */
${generateVars("flex-shrink", flexShrinkScale)}

  /* Order */
${generateVars("order", orderScale)}

  /* Cursor */
${generateVars("cursor", cursorScale)}

  /* Text Transform */
${generateVars("text-transform", textTransformScale)}

  /* White Space */
${generateVars("white-space", whiteSpaceScale)}

  /* Object Fit */
${generateVars("object-fit", objectFitScale)}
}

:root {
  /* Gradients */
${generateVars("gradient", gradients)}
}
`;

writeFileSync(join(distDir, "tokens.css"), tokensCss);

// ============================================================================
// themes.css - Light/Dark color themes
// ============================================================================
const themesCss = `/**
 * @staple-css/tokens - Theme Tokens
 *
 * Color tokens for light and dark themes.
 * Themes are applied via data-theme attribute on a parent element.
 * Default (no attribute) uses light theme.
 */

:root,
[data-theme="light"] {
  /* Backgrounds */
${generateVars("color", colorsLight)}
}

[data-theme="dark"] {
  /* Backgrounds */
${generateVars("color", colorsDark)}
}

/* System preference support */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${generateVars("color", colorsDark).replace(/^  /gm, "    ")}
  }
}
`;

writeFileSync(join(distDir, "themes.css"), themesCss);

// ============================================================================
// density.css - Comfortable/Compact density
// ============================================================================
const densityCss = `/**
 * @staple-css/tokens - Density Tokens
 *
 * Density tokens for comfortable and compact UI modes.
 * Applied via data-density attribute on a parent element.
 * Default (no attribute) uses comfortable density.
 */

:root,
[data-density="comfortable"] {
${generateVars("density", densityComfortable)}
}

[data-density="compact"] {
${generateVars("density", densityCompact)}
}
`;

writeFileSync(join(distDir, "density.css"), densityCss);

// ============================================================================
// gradients.css - Gradient definitions
// ============================================================================
const gradientsCss = `/**
 * @staple-css/tokens - Gradient Tokens
 *
 * Pre-defined gradient values for backgrounds and visual effects.
 * Use with background or background-image CSS properties.
 */

:root {
${generateVars("gradient", gradients)}
}
`;

writeFileSync(join(distDir, "gradients.css"), gradientsCss);

// ============================================================================
// all.css - Combined import
// ============================================================================
const allCss = `/**
 * @staple-css/tokens - All Tokens
 *
 * Convenience file that imports all token CSS files.
 * Equivalent to importing tokens.css, themes.css, density.css, and gradients.css separately.
 */

@import "./tokens.css";
@import "./themes.css";
@import "./density.css";
@import "./gradients.css";
`;

writeFileSync(join(distDir, "all.css"), allCss);

// ============================================================================
// palettes.css - Tailwind-style color palettes
// ============================================================================
const palettesCss = generatePalettesCss();
writeFileSync(join(distDir, "palettes.css"), palettesCss);

// ============================================================================
// breakpoints.css - Responsive breakpoints
// ============================================================================
const breakpointsCss = generateBreakpointsCss();
writeFileSync(join(distDir, "breakpoints.css"), breakpointsCss);

console.log("Generated CSS files in dist/:");
console.log("  - tokens.css");
console.log("  - themes.css");
console.log("  - density.css");
console.log("  - gradients.css");
console.log("  - palettes.css");
console.log("  - breakpoints.css");
console.log("  - all.css");
