/**
 * Builder Generator
 *
 * Deterministic generation of palettes and CSS from builder config.
 * This is the core engine that transforms seeds + params into a complete token system.
 */

import type {
  BuilderConfig,
  Seeds,
  GenerationParams,
  Palette,
  SemanticMap,
  SemanticRef,
  Override,
} from "./builder-config.js";
import {
  defaultSeeds,
  defaultGenerationParams,
  defaultSemanticMapLight,
  defaultSemanticMapDark,
} from "./builder-config.js";
import {
  generateRamp,
  generateAlphaRamp,
  generateHarmony,
  type HarmonyType,
} from "./color/index.js";

// ============================================================================
// Palette Generation
// ============================================================================

/**
 * Generate all palettes from seeds and generation params
 */
export function generatePalettes(
  seeds: Seeds,
  params: GenerationParams
): Palette[] {
  const palettes: Palette[] = [];

  // Primary palette
  palettes.push(generateSinglePalette("primary", seeds.primary, params));

  // Secondary palette (use seed or generate from harmony)
  const harmonyColors = generateHarmony(seeds.primary, "analogous");
  const secondaryColor = seeds.secondary || harmonyColors[0] || seeds.primary;
  palettes.push(generateSinglePalette("secondary", secondaryColor, params));

  // Accent palette (if provided)
  if (seeds.accent) {
    palettes.push(generateSinglePalette("accent", seeds.accent, params));
  }

  // Neutral palette
  const neutralColor = seeds.neutral || generateNeutralFromPrimary(seeds.primary);
  palettes.push(generateSinglePalette("neutral", neutralColor, {
    ...params,
    chromaScale: Math.min(params.chromaScale * 0.3, 0.5), // Always muted for neutrals
  }));

  // Success palette
  const successColor = seeds.success || "#16a34a";
  palettes.push(generateSinglePalette("success", successColor, params));

  // Warning palette
  const warnColor = seeds.warn || "#d97706";
  palettes.push(generateSinglePalette("warn", warnColor, params));

  // Danger palette
  const dangerColor = seeds.danger || "#dc2626";
  palettes.push(generateSinglePalette("danger", dangerColor, params));

  return palettes;
}

/**
 * Generate a single palette (light + dark modes)
 */
export function generateSinglePalette(
  name: string,
  baseColor: string,
  params: GenerationParams
): Palette {
  const chromaMultiplier = params.vibrant ? 1.2 : 1.0;

  const lightSteps = generateRamp({
    baseColor,
    steps: params.stepCount,
    chromaScale: params.chromaScale * chromaMultiplier,
    hueBias: params.warmCoolBias,
    darkMode: false,
  });

  const darkSteps = generateRamp({
    baseColor,
    steps: params.stepCount,
    chromaScale: params.chromaScale * chromaMultiplier,
    hueBias: params.warmCoolBias,
    darkMode: true,
  });

  const lightAlphaSteps = generateAlphaRamp(lightSteps[8] || baseColor, params.stepCount);
  const darkAlphaSteps = generateAlphaRamp(darkSteps[8] || baseColor, params.stepCount);

  return {
    name,
    baseColor,
    lightSteps,
    darkSteps,
    lightAlphaSteps,
    darkAlphaSteps,
  };
}

/**
 * Generate a neutral color from primary (desaturated version)
 */
function generateNeutralFromPrimary(primary: string): string {
  // Use a very desaturated version of the primary with a slight hue shift toward gray
  return "#64748b"; // Default slate-like neutral
}

// ============================================================================
// Harmony Suggestions
// ============================================================================

export interface HarmonySuggestion {
  type: HarmonyType;
  label: string;
  description: string;
  colors: string[];
}

/**
 * Generate harmony suggestions for a base color
 */
export function generateHarmonySuggestions(baseColor: string): HarmonySuggestion[] {
  return [
    {
      type: "complementary",
      label: "Complementary",
      description: "Opposite on the color wheel, high contrast",
      colors: generateHarmony(baseColor, "complementary"),
    },
    {
      type: "split-complementary",
      label: "Split Complementary",
      description: "Two colors adjacent to the complement",
      colors: generateHarmony(baseColor, "split-complementary"),
    },
    {
      type: "analogous",
      label: "Analogous",
      description: "Adjacent colors, harmonious and unified",
      colors: generateHarmony(baseColor, "analogous"),
    },
    {
      type: "triadic",
      label: "Triadic",
      description: "Three evenly spaced colors",
      colors: generateHarmony(baseColor, "triadic"),
    },
    {
      type: "tetradic",
      label: "Tetradic",
      description: "Four colors in rectangular pattern",
      colors: generateHarmony(baseColor, "tetradic"),
    },
    {
      type: "monochrome",
      label: "Monochrome",
      description: "Variations in lightness only",
      colors: generateHarmony(baseColor, "monochrome"),
    },
  ];
}

// ============================================================================
// Semantic Color Resolution
// ============================================================================

/**
 * Resolve a semantic reference to an actual color value
 */
export function resolveSemanticRef(
  ref: SemanticRef,
  palettes: Palette[],
  mode: "light" | "dark"
): string {
  const palette = palettes.find(p => p.name === ref.palette);
  if (!palette) {
    console.warn(`Palette "${ref.palette}" not found`);
    return "#ff00ff"; // Magenta for missing
  }

  const steps = mode === "light" ? palette.lightSteps : palette.darkSteps;
  const index = Math.max(0, Math.min(ref.step - 1, steps.length - 1));
  return steps[index] || "#ff00ff";
}

/**
 * Resolve all semantic colors for a mode
 */
export function resolveSemanticColors(
  semanticMap: SemanticMap,
  palettes: Palette[],
  mode: "light" | "dark"
): Record<string, string> {
  const colors: Record<string, string> = {};

  for (const [key, ref] of Object.entries(semanticMap)) {
    colors[key] = resolveSemanticRef(ref, palettes, mode);
  }

  // Generate focus ring
  const focusColor = colors.focus || colors.primary;
  const bgColor = mode === "light" ? "#ffffff" : "#111827";
  colors.focusRing = `0 0 0 2px ${bgColor}, 0 0 0 4px ${focusColor}`;

  return colors;
}

// ============================================================================
// Override Application
// ============================================================================

/**
 * Apply overrides to palettes
 */
export function applyPaletteOverrides(
  palettes: Palette[],
  overrides: Override[]
): Palette[] {
  const result = palettes.map(p => ({
    ...p,
    lightSteps: [...p.lightSteps],
    darkSteps: [...p.darkSteps],
  }));

  for (const override of overrides) {
    if (!override.enabled) continue;

    if (override.target.type === "palette") {
      const target = override.target;
      const palette = result.find(p => p.name === target.palette);
      if (!palette) continue;

      const steps = target.mode === "light" ? palette.lightSteps : palette.darkSteps;
      const index = target.step - 1;

      if (typeof override.value === "string") {
        steps[index] = override.value;
      }
    }
  }

  return result;
}

/**
 * Apply semantic overrides to resolved colors
 */
export function applySemanticOverrides(
  colors: Record<string, string>,
  overrides: Override[],
  palettes: Palette[],
  mode: "light" | "dark"
): Record<string, string> {
  const result = { ...colors };

  for (const override of overrides) {
    if (!override.enabled) continue;
    if (override.target.type !== "semantic") continue;
    if (override.target.mode !== mode) continue;

    const token = override.target.token;
    if (typeof override.value === "string") {
      result[token] = override.value;
    } else {
      result[token] = resolveSemanticRef(override.value, palettes, mode);
    }
  }

  return result;
}

// ============================================================================
// CSS Generation
// ============================================================================

/**
 * Generate CSS from builder config
 */
export function generateBuilderCss(config: BuilderConfig): {
  tokens: string;
  themes: string;
  palettes: string;
  all: string;
} {
  // Apply palette overrides
  const palettes = applyPaletteOverrides(config.palettes, config.overrides);

  // Resolve semantic colors
  const lightColors = applySemanticOverrides(
    resolveSemanticColors(config.semanticMap.light, palettes, "light"),
    config.overrides,
    palettes,
    "light"
  );

  const darkColors = applySemanticOverrides(
    resolveSemanticColors(config.semanticMap.dark, palettes, "dark"),
    config.overrides,
    palettes,
    "dark"
  );

  // Generate palette CSS
  const palettesCss = generatePalettesCss(palettes);

  // Generate tokens CSS
  const tokensCss = generateTokensCss(config);

  // Generate themes CSS
  const themesCss = generateThemesCss(lightColors, darkColors);

  return {
    tokens: tokensCss,
    themes: themesCss,
    palettes: palettesCss,
    all: `/* staple-css generated tokens */\n\n${tokensCss}\n\n${themesCss}\n\n${palettesCss}`,
  };
}

function generatePalettesCss(palettes: Palette[]): string {
  let css = "/* Color Palettes */\n:root {\n";

  for (const palette of palettes) {
    css += `  /* ${palette.name} */\n`;
    for (let i = 0; i < palette.lightSteps.length; i++) {
      css += `  --st-${palette.name}-${i + 1}: ${palette.lightSteps[i]};\n`;
    }
    if (palette.lightAlphaSteps) {
      for (let i = 0; i < palette.lightAlphaSteps.length; i++) {
        css += `  --st-${palette.name}-a${i + 1}: ${palette.lightAlphaSteps[i]};\n`;
      }
    }
    css += "\n";
  }

  css += "}\n\n[data-theme=\"dark\"] {\n";

  for (const palette of palettes) {
    css += `  /* ${palette.name} */\n`;
    for (let i = 0; i < palette.darkSteps.length; i++) {
      css += `  --st-${palette.name}-${i + 1}: ${palette.darkSteps[i]};\n`;
    }
    if (palette.darkAlphaSteps) {
      for (let i = 0; i < palette.darkAlphaSteps.length; i++) {
        css += `  --st-${palette.name}-a${i + 1}: ${palette.darkAlphaSteps[i]};\n`;
      }
    }
    css += "\n";
  }

  css += "}";

  return css;
}

function generateTokensCss(config: BuilderConfig): string {
  const space = config.space || {
    0: "0", 1: "0.25rem", 2: "0.5rem", 3: "0.75rem",
    4: "1rem", 5: "1.5rem", 6: "2rem", 7: "3rem", 8: "4rem",
  };

  const radius = config.radius || {
    0: "0", 1: "0.125rem", 2: "0.25rem", 3: "0.5rem", 4: "1rem",
  };

  const shadow = config.shadow || {
    0: "none",
    1: "0 0.0625rem 0.125rem 0 rgb(0 0 0 / 0.05)",
    2: "0 0.25rem 0.375rem -0.0625rem rgb(0 0 0 / 0.1), 0 0.125rem 0.25rem -0.125rem rgb(0 0 0 / 0.1)",
  };

  let css = "/* Base Tokens */\n:root {\n";

  // Space
  css += "  /* Space */\n";
  for (const [key, value] of Object.entries(space)) {
    css += `  --st-space-${key}: ${value};\n`;
  }

  // Radius
  css += "\n  /* Radius */\n";
  for (const [key, value] of Object.entries(radius)) {
    css += `  --st-radius-${key}: ${value};\n`;
  }

  // Shadow
  css += "\n  /* Shadow */\n";
  for (const [key, value] of Object.entries(shadow)) {
    css += `  --st-shadow-${key}: ${value};\n`;
  }

  // Typography
  if (config.typography) {
    css += "\n  /* Typography */\n";
    css += `  --st-font-sans: ${config.typography.fontFamily.sans};\n`;
    css += `  --st-font-mono: ${config.typography.fontFamily.mono};\n`;

    for (const [key, value] of Object.entries(config.typography.fontSize)) {
      css += `  --st-font-size-${key}: ${value};\n`;
    }

    for (const [key, value] of Object.entries(config.typography.lineHeight)) {
      css += `  --st-leading-${key}: ${value};\n`;
    }

    for (const [key, value] of Object.entries(config.typography.fontWeight)) {
      css += `  --st-font-${key}: ${value};\n`;
    }
  }

  // Motion
  if (config.motion) {
    css += "\n  /* Motion */\n";
    for (const [key, value] of Object.entries(config.motion.duration)) {
      css += `  --st-duration-${key}: ${value};\n`;
    }
    for (const [key, value] of Object.entries(config.motion.easing)) {
      css += `  --st-easing-${key}: ${value};\n`;
    }
  }

  css += "}";

  return css;
}

function generateThemesCss(
  lightColors: Record<string, string>,
  darkColors: Record<string, string>
): string {
  let css = "/* Theme Colors */\n:root,\n[data-theme=\"light\"] {\n";

  for (const [key, value] of Object.entries(lightColors)) {
    const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    css += `  --st-color-${cssKey}: ${value};\n`;
  }

  css += "}\n\n[data-theme=\"dark\"] {\n";

  for (const [key, value] of Object.entries(darkColors)) {
    const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    css += `  --st-color-${cssKey}: ${value};\n`;
  }

  css += "}";

  return css;
}

// ============================================================================
// Create Default Config
// ============================================================================

/**
 * Create a complete default builder config
 */
export function createDefaultBuilderConfig(): BuilderConfig {
  const seeds = defaultSeeds;
  const generation = defaultGenerationParams;
  const palettes = generatePalettes(seeds, generation);

  return {
    name: "staple-css",
    version: "1.0.0",
    seeds,
    generation,
    palettes,
    semanticMap: {
      light: defaultSemanticMapLight,
      dark: defaultSemanticMapDark,
    },
    overrides: [],
    space: {
      "0": "0", "1": "0.25rem", "2": "0.5rem", "3": "0.75rem",
      "4": "1rem", "5": "1.5rem", "6": "2rem", "7": "3rem", "8": "4rem",
    },
    radius: {
      "0": "0", "1": "0.125rem", "2": "0.25rem", "3": "0.5rem", "4": "1rem",
    },
    shadow: {
      "0": "none",
      "1": "0 0.0625rem 0.125rem 0 rgb(0 0 0 / 0.05)",
      "2": "0 0.25rem 0.375rem -0.0625rem rgb(0 0 0 / 0.1), 0 0.125rem 0.25rem -0.125rem rgb(0 0 0 / 0.1)",
    },
    typography: {
      fontFamily: {
        sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      },
      fontSize: {
        "0": "0.75rem", "1": "0.875rem", "2": "1rem",
        "3": "1.125rem", "4": "1.25rem", "5": "1.5rem", "6": "2rem",
      },
      lineHeight: {
        tight: "1.25", normal: "1.5", relaxed: "1.75",
      },
      fontWeight: {
        normal: "400", medium: "500", semibold: "600", bold: "700",
      },
    },
    motion: {
      duration: { fast: "100ms", normal: "200ms", slow: "300ms" },
      easing: {
        default: "cubic-bezier(0.4, 0, 0.2, 1)",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
    density: {
      comfortable: {
        controlHeight: "2.5rem",
        controlPaddingX: "1rem",
        controlPaddingY: "0.5rem",
        cardPadding: "1.5rem",
        stackGap: "1rem",
        inlineGap: "0.75rem",
      },
      compact: {
        controlHeight: "2rem",
        controlPaddingX: "0.75rem",
        controlPaddingY: "0.25rem",
        cardPadding: "1rem",
        stackGap: "0.75rem",
        inlineGap: "0.5rem",
      },
    },
  };
}
