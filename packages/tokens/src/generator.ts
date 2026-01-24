/**
 * CSS Generator
 *
 * Generates CSS variable files from a token configuration.
 * This is a pure function - given the same config, produces the same output.
 */

import type { TokenConfig, SemanticColors, DensityTokens } from "./config.js";
import { hexToOklch, oklchToHex, clampToGamut, bestTextColor } from "./color/index.js";

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
  values: Record<string | number, string>,
  indent = "  "
): string {
  return Object.entries(values)
    .map(([key, value]) => `${indent}--st-${prefix}-${toKebab(String(key))}: ${value};`)
    .join("\n");
}

/**
 * Generate semantic color variables
 */
function generateColorVars(colors: SemanticColors, indent = "  "): string {
  return Object.entries(colors)
    .map(([key, value]) => `${indent}--st-color-${toKebab(key)}: ${value};`)
    .join("\n");
}

/**
 * Generate density variables
 */
function generateDensityVars(density: DensityTokens, indent = "  "): string {
  return Object.entries(density)
    .map(([key, value]) => `${indent}--st-density-${toKebab(key)}: ${value};`)
    .join("\n");
}

/**
 * Generated CSS output
 */
export interface GeneratedCss {
  /** Base tokens (space, radius, typography, motion) */
  tokens: string;
  /** Theme tokens (light/dark colors) */
  themes: string;
  /** Density tokens (comfortable/compact) */
  density: string;
  /** Combined all.css */
  all: string;
  /** Custom palette CSS (if any) */
  palettes?: string;
}

/**
 * Generate all CSS from a token configuration
 */
export function generateCss(config: TokenConfig): GeneratedCss {
  // Generate tokens.css
  const tokens = `/**
 * @staple-css/tokens - Base Tokens
 * Generated from: ${config.name} v${config.version}
 *
 * Core design tokens for spacing, typography, shadows, and motion.
 * Import this file once at your app root.
 */

:root {
  /* Space Scale (0-8) */
${generateVars("space", config.space)}

  /* Radius Scale (0-4) */
${generateVars("radius", config.radius)}

  /* Shadow Scale (0-2) */
${generateVars("shadow", config.shadow)}

  /* Font Family */
${generateVars("font", config.typography.fontFamily)}

  /* Font Size Scale (0-6) */
${generateVars("font-size", config.typography.fontSize)}

  /* Line Height */
${generateVars("leading", config.typography.lineHeight)}

  /* Font Weight */
${generateVars("font-weight", config.typography.fontWeight)}

  /* Motion - Duration */
${generateVars("duration", config.motion.duration)}

  /* Motion - Easing */
${generateVars("easing", config.motion.easing)}
}
`;

  // Generate themes.css
  const themes = `/**
 * @staple-css/tokens - Theme Tokens
 * Generated from: ${config.name} v${config.version}
 *
 * Color tokens for light and dark themes.
 * Themes are applied via data-theme attribute on a parent element.
 * Default (no attribute) uses light theme.
 */

:root,
[data-theme="light"] {
${generateColorVars(config.colors.light)}
}

[data-theme="dark"] {
${generateColorVars(config.colors.dark)}
}

/* System preference support */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${generateColorVars(config.colors.dark, "    ")}
  }
}
`;

  // Generate density.css
  const density = `/**
 * @staple-css/tokens - Density Tokens
 * Generated from: ${config.name} v${config.version}
 *
 * Density tokens for comfortable and compact UI modes.
 * Applied via data-density attribute on a parent element.
 * Default (no attribute) uses comfortable density.
 */

:root,
[data-density="comfortable"] {
${generateDensityVars(config.density.comfortable)}
}

[data-density="compact"] {
${generateDensityVars(config.density.compact)}
}
`;

  // Generate all.css
  const all = `/**
 * @staple-css/tokens - All Tokens
 * Generated from: ${config.name} v${config.version}
 *
 * Convenience file that imports all token CSS files.
 * Equivalent to importing tokens.css, themes.css, and density.css separately.
 */

@import "./tokens.css";
@import "./themes.css";
@import "./density.css";
`;

  // Generate palettes.css if custom palettes exist
  let palettes: string | undefined;
  if (config.palettes && config.palettes.length > 0) {
    const paletteVars = config.palettes
      .map((palette) => {
        if (!palette.steps || palette.steps.length === 0) return "";

        const vars = palette.steps
          .map((color, i) => `  --st-${palette.name}-${i + 1}: ${color};`)
          .join("\n");

        const alphaVars = palette.alphaSteps
          ? palette.alphaSteps
              .map((color, i) => `  --st-${palette.name}-a${i + 1}: ${color};`)
              .join("\n")
          : "";

        return `  /* ${palette.name} palette */\n${vars}${alphaVars ? "\n" + alphaVars : ""}`;
      })
      .filter(Boolean)
      .join("\n\n");

    if (paletteVars) {
      palettes = `/**
 * @staple-css/tokens - Custom Palettes
 * Generated from: ${config.name} v${config.version}
 */

:root {
${paletteVars}
}
`;
    }
  }

  return { tokens, themes, density, all, palettes };
}

/**
 * Generate a preview of a single token category
 */
export function generatePreviewCss(
  category: keyof TokenConfig,
  config: TokenConfig
): string {
  switch (category) {
    case "space":
      return `:root {\n${generateVars("space", config.space)}\n}`;
    case "radius":
      return `:root {\n${generateVars("radius", config.radius)}\n}`;
    case "shadow":
      return `:root {\n${generateVars("shadow", config.shadow)}\n}`;
    case "typography":
      return `:root {
${generateVars("font", config.typography.fontFamily)}
${generateVars("font-size", config.typography.fontSize)}
${generateVars("leading", config.typography.lineHeight)}
${generateVars("font-weight", config.typography.fontWeight)}
}`;
    case "motion":
      return `:root {
${generateVars("duration", config.motion.duration)}
${generateVars("easing", config.motion.easing)}
}`;
    case "colors":
      return `[data-theme="light"] {
${generateColorVars(config.colors.light)}
}

[data-theme="dark"] {
${generateColorVars(config.colors.dark)}
}`;
    case "density":
      return `[data-density="comfortable"] {
${generateDensityVars(config.density.comfortable)}
}

[data-density="compact"] {
${generateDensityVars(config.density.compact)}
}`;
    default:
      return "";
  }
}

/**
 * Generate semantic color tokens from a primary color
 */
export function generateSemanticColorsFromPrimary(
  primaryHex: string,
  darkMode = false
): Partial<SemanticColors> {
  const primary = hexToOklch(primaryHex);

  if (darkMode) {
    const primaryDark = clampToGamut({ ...primary, L: 0.65 });
    const primaryHoverDark = clampToGamut({ ...primary, L: 0.75 });

    return {
      primary: oklchToHex(primaryDark),
      primaryHover: oklchToHex(primaryHoverDark),
      primaryText: bestTextColor(oklchToHex(primaryDark)),
      focus: oklchToHex(primaryDark),
      focusRing: `0 0 0 2px #111827, 0 0 0 4px ${oklchToHex(primaryDark)}`,
    };
  }

  const primaryLight = clampToGamut({ ...primary, L: 0.55 });
  const primaryHoverLight = clampToGamut({ ...primary, L: 0.45 });

  return {
    primary: oklchToHex(primaryLight),
    primaryHover: oklchToHex(primaryHoverLight),
    primaryText: bestTextColor(oklchToHex(primaryLight)),
    focus: oklchToHex(primaryLight),
    focusRing: `0 0 0 2px #ffffff, 0 0 0 4px ${oklchToHex(primaryLight)}`,
  };
}
