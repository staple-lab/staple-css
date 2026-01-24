/**
 * Token Configuration Schema
 *
 * This is the canonical configuration for staple-css tokens.
 * The schema is validated with Zod and used to generate CSS.
 */

import { z } from "zod";

// ============================================================================
// Schema Definitions
// ============================================================================

/**
 * Hex color validation
 */
const hexColor = z.string().regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, {
  message: "Must be a valid hex color (e.g., #ffffff or #ffffffaa)",
});

/**
 * CSS length value
 */
const cssLength = z.string().regex(/^(\d+(\.\d+)?(px|rem|em|%|vh|vw)|0)$/, {
  message: "Must be a valid CSS length (e.g., 16px, 1rem, 0)",
});

/**
 * CSS duration value
 */
const cssDuration = z.string().regex(/^\d+(\.\d+)?(ms|s)$/, {
  message: "Must be a valid CSS duration (e.g., 200ms, 0.2s)",
});

/**
 * CSS timing function
 */
const cssTimingFunction = z.string();

/**
 * Space scale schema (0-8)
 */
const spaceScaleSchema = z.object({
  0: cssLength,
  1: cssLength,
  2: cssLength,
  3: cssLength,
  4: cssLength,
  5: cssLength,
  6: cssLength,
  7: cssLength,
  8: cssLength,
});

/**
 * Radius scale schema (0-4)
 */
const radiusScaleSchema = z.object({
  0: cssLength,
  1: cssLength,
  2: cssLength,
  3: cssLength,
  4: cssLength,
});

/**
 * Shadow scale schema (0-2)
 */
const shadowScaleSchema = z.object({
  0: z.string(),
  1: z.string(),
  2: z.string(),
});

/**
 * Font family schema
 */
const fontFamilySchema = z.object({
  sans: z.string(),
  mono: z.string(),
});

/**
 * Font size scale schema (0-6)
 */
const fontSizeScaleSchema = z.object({
  0: cssLength,
  1: cssLength,
  2: cssLength,
  3: cssLength,
  4: cssLength,
  5: cssLength,
  6: cssLength,
});

/**
 * Line height schema
 */
const lineHeightSchema = z.object({
  tight: z.string(),
  normal: z.string(),
  relaxed: z.string(),
});

/**
 * Font weight schema
 */
const fontWeightSchema = z.object({
  normal: z.string(),
  medium: z.string(),
  semibold: z.string(),
  bold: z.string(),
});

/**
 * Duration schema
 */
const durationSchema = z.object({
  fast: cssDuration,
  normal: cssDuration,
  slow: cssDuration,
});

/**
 * Easing schema
 */
const easingSchema = z.object({
  default: cssTimingFunction,
  in: cssTimingFunction,
  out: cssTimingFunction,
  inOut: cssTimingFunction,
});

/**
 * Semantic colors schema
 */
const semanticColorsSchema = z.object({
  background: hexColor,
  surface: hexColor,
  surfaceRaised: hexColor,
  text: hexColor,
  textMuted: hexColor,
  textInverse: hexColor,
  border: hexColor,
  borderMuted: hexColor,
  primary: hexColor,
  primaryHover: hexColor,
  primaryText: hexColor,
  danger: hexColor,
  dangerHover: hexColor,
  dangerText: hexColor,
  dangerSurface: hexColor,
  warn: hexColor,
  warnHover: hexColor,
  warnText: hexColor,
  warnSurface: hexColor,
  success: hexColor,
  successHover: hexColor,
  successText: hexColor,
  successSurface: hexColor,
  focus: hexColor,
  focusRing: z.string(),
});

/**
 * Density tokens schema
 */
const densitySchema = z.object({
  controlHeight: cssLength,
  controlPaddingX: cssLength,
  controlPaddingY: cssLength,
  cardPadding: cssLength,
  stackGap: cssLength,
  inlineGap: cssLength,
});

/**
 * Color palette schema (12-step scale)
 */
const colorPaletteSchema = z.object({
  name: z.string(),
  baseColor: hexColor,
  steps: z.array(hexColor).length(12).optional(),
  alphaSteps: z.array(z.string()).length(12).optional(),
});

/**
 * Custom palettes schema
 */
const customPalettesSchema = z.array(colorPaletteSchema);

/**
 * Full token configuration schema
 */
export const tokenConfigSchema = z.object({
  $schema: z.string().optional(),
  name: z.string().default("staple-css"),
  version: z.string().default("1.0.0"),

  space: spaceScaleSchema,
  radius: radiusScaleSchema,
  shadow: shadowScaleSchema,

  typography: z.object({
    fontFamily: fontFamilySchema,
    fontSize: fontSizeScaleSchema,
    lineHeight: lineHeightSchema,
    fontWeight: fontWeightSchema,
  }),

  motion: z.object({
    duration: durationSchema,
    easing: easingSchema,
  }),

  colors: z.object({
    light: semanticColorsSchema,
    dark: semanticColorsSchema,
  }),

  density: z.object({
    comfortable: densitySchema,
    compact: densitySchema,
  }),

  palettes: customPalettesSchema.optional(),
});

export type TokenConfig = z.infer<typeof tokenConfigSchema>;
export type SemanticColors = z.infer<typeof semanticColorsSchema>;
export type DensityTokens = z.infer<typeof densitySchema>;
export type ColorPalette = z.infer<typeof colorPaletteSchema>;

// ============================================================================
// Default Configuration
// ============================================================================

export const defaultConfig: TokenConfig = {
  name: "staple-css",
  version: "1.0.0",

  space: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.5rem",
    6: "2rem",
    7: "3rem",
    8: "4rem",
  },

  radius: {
    0: "0",
    1: "0.125rem",
    2: "0.25rem",
    3: "0.5rem",
    4: "1rem",
  },

  shadow: {
    0: "none",
    1: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    2: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },

  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    },
    fontSize: {
      0: "0.75rem",
      1: "0.875rem",
      2: "1rem",
      3: "1.125rem",
      4: "1.25rem",
      5: "1.5rem",
      6: "2rem",
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },

  motion: {
    duration: {
      fast: "100ms",
      normal: "200ms",
      slow: "300ms",
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },

  colors: {
    light: {
      background: "#ffffff",
      surface: "#f9fafb",
      surfaceRaised: "#ffffff",
      text: "#111827",
      textMuted: "#6b7280",
      textInverse: "#ffffff",
      border: "#e5e7eb",
      borderMuted: "#f3f4f6",
      primary: "#2563eb",
      primaryHover: "#1d4ed8",
      primaryText: "#ffffff",
      danger: "#dc2626",
      dangerHover: "#b91c1c",
      dangerText: "#ffffff",
      dangerSurface: "#fef2f2",
      warn: "#d97706",
      warnHover: "#b45309",
      warnText: "#ffffff",
      warnSurface: "#fffbeb",
      success: "#16a34a",
      successHover: "#15803d",
      successText: "#ffffff",
      successSurface: "#f0fdf4",
      focus: "#2563eb",
      focusRing: "0 0 0 2px #ffffff, 0 0 0 4px #2563eb",
    },
    dark: {
      background: "#111827",
      surface: "#1f2937",
      surfaceRaised: "#374151",
      text: "#f9fafb",
      textMuted: "#9ca3af",
      textInverse: "#111827",
      border: "#374151",
      borderMuted: "#1f2937",
      primary: "#3b82f6",
      primaryHover: "#60a5fa",
      primaryText: "#ffffff",
      danger: "#ef4444",
      dangerHover: "#f87171",
      dangerText: "#ffffff",
      dangerSurface: "#450a0a",
      warn: "#f59e0b",
      warnHover: "#fbbf24",
      warnText: "#111827",
      warnSurface: "#451a03",
      success: "#22c55e",
      successHover: "#4ade80",
      successText: "#111827",
      successSurface: "#052e16",
      focus: "#3b82f6",
      focusRing: "0 0 0 2px #111827, 0 0 0 4px #3b82f6",
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

  palettes: [],
};

// ============================================================================
// Validation Helpers
// ============================================================================

/**
 * Validate a token configuration
 */
export function validateConfig(config: unknown): {
  success: boolean;
  data?: TokenConfig;
  errors?: z.ZodError;
} {
  const result = tokenConfigSchema.safeParse(config);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

/**
 * Merge partial config with defaults
 */
export function mergeConfig(partial: Partial<TokenConfig>): TokenConfig {
  return {
    ...defaultConfig,
    ...partial,
    typography: {
      ...defaultConfig.typography,
      ...partial.typography,
    },
    motion: {
      ...defaultConfig.motion,
      ...partial.motion,
    },
    colors: {
      light: { ...defaultConfig.colors.light, ...partial.colors?.light },
      dark: { ...defaultConfig.colors.dark, ...partial.colors?.dark },
    },
    density: {
      comfortable: { ...defaultConfig.density.comfortable, ...partial.density?.comfortable },
      compact: { ...defaultConfig.density.compact, ...partial.density?.compact },
    },
    palettes: partial.palettes ?? defaultConfig.palettes,
  };
}

/**
 * Export config as JSON
 */
export function configToJson(config: TokenConfig): string {
  return JSON.stringify(config, null, 2);
}

/**
 * Parse config from JSON
 */
export function configFromJson(json: string): TokenConfig {
  const parsed = JSON.parse(json);
  const result = validateConfig(parsed);
  if (!result.success) {
    throw new Error(`Invalid config: ${result.errors?.message}`);
  }
  return result.data!;
}
