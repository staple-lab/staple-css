/**
 * Builder Configuration Schema
 *
 * This is the enhanced configuration for the Tokens Builder.
 * It separates concerns into: seeds → generation → palettes → semanticMap → overrides
 */

import { z } from "zod";

// ============================================================================
// Hex Color Validation
// ============================================================================

const hexColor = z.string().regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, {
  message: "Must be a valid hex color (e.g., #ffffff or #ffffffaa)",
});

// ============================================================================
// Seeds Schema - The starting point for all color generation
// ============================================================================

export const seedsSchema = z.object({
  /** Primary brand color */
  primary: hexColor,
  /** Secondary brand color (optional, can be auto-generated from harmony) */
  secondary: hexColor.optional(),
  /** Accent color (optional) */
  accent: hexColor.optional(),
  /** Neutral seed color (optional, defaults to auto-generate from primary) */
  neutral: hexColor.optional(),
  /** Success color seed */
  success: hexColor.optional(),
  /** Warning color seed */
  warn: hexColor.optional(),
  /** Danger/error color seed */
  danger: hexColor.optional(),
});

export type Seeds = z.infer<typeof seedsSchema>;

// ============================================================================
// Generation Parameters Schema
// ============================================================================

export const generationAlgorithm = z.enum(["oklch", "hct"]).default("oklch");

export const generationParamsSchema = z.object({
  /** Algorithm for ramp generation */
  algorithm: generationAlgorithm,
  /** Number of steps in each ramp (8, 10, or 12) */
  stepCount: z.union([z.literal(8), z.literal(10), z.literal(12)]).default(12),
  /** Chroma/saturation scale (0.0 to 2.0, 1.0 = normal) */
  chromaScale: z.number().min(0).max(2).default(1.0),
  /** Contrast target (affects lightness distribution) */
  contrastTarget: z.number().min(0).max(2).default(1.0),
  /** Warm/cool bias (-1 to 1, shifts hue) */
  warmCoolBias: z.number().min(-1).max(1).default(0),
  /** Muted vs vibrant toggle */
  vibrant: z.boolean().default(false),
});

export type GenerationParams = z.infer<typeof generationParamsSchema>;

// ============================================================================
// Palette Schema - Generated color ramps
// ============================================================================

export const paletteSchema = z.object({
  /** Palette name (e.g., "primary", "secondary", "neutral") */
  name: z.string(),
  /** Base color from seeds */
  baseColor: hexColor,
  /** Generated 12-step colors (light mode) */
  lightSteps: z.array(hexColor),
  /** Generated 12-step colors (dark mode) */
  darkSteps: z.array(hexColor),
  /** Alpha variants for light mode */
  lightAlphaSteps: z.array(z.string()).optional(),
  /** Alpha variants for dark mode */
  darkAlphaSteps: z.array(z.string()).optional(),
});

export type Palette = z.infer<typeof paletteSchema>;

// ============================================================================
// Semantic Map Schema - Maps semantic tokens to palette steps
// ============================================================================

export const semanticRefSchema = z.object({
  /** Palette name to reference */
  palette: z.string(),
  /** Step index (1-12 for a 12-step palette) */
  step: z.number().min(1).max(12),
});

export type SemanticRef = z.infer<typeof semanticRefSchema>;

export const semanticMapSchema = z.object({
  // Backgrounds
  background: semanticRefSchema,
  surface: semanticRefSchema,
  surfaceRaised: semanticRefSchema,

  // Text
  text: semanticRefSchema,
  textMuted: semanticRefSchema,
  textInverse: semanticRefSchema,

  // Borders
  border: semanticRefSchema,
  borderMuted: semanticRefSchema,

  // Primary
  primary: semanticRefSchema,
  primaryHover: semanticRefSchema,
  primaryText: semanticRefSchema,

  // Danger
  danger: semanticRefSchema,
  dangerHover: semanticRefSchema,
  dangerText: semanticRefSchema,
  dangerSurface: semanticRefSchema,

  // Warning
  warn: semanticRefSchema,
  warnHover: semanticRefSchema,
  warnText: semanticRefSchema,
  warnSurface: semanticRefSchema,

  // Success
  success: semanticRefSchema,
  successHover: semanticRefSchema,
  successText: semanticRefSchema,
  successSurface: semanticRefSchema,

  // Focus
  focus: semanticRefSchema,
});

export type SemanticMap = z.infer<typeof semanticMapSchema>;

// ============================================================================
// Override Schema - Final adjustments applied after generation
// ============================================================================

export const overrideTargetSchema = z.union([
  // Palette step override
  z.object({
    type: z.literal("palette"),
    palette: z.string(),
    step: z.number().min(1).max(12),
    mode: z.enum(["light", "dark"]),
  }),
  // Semantic token override
  z.object({
    type: z.literal("semantic"),
    token: z.string(),
    mode: z.enum(["light", "dark"]),
  }),
]);

export type OverrideTarget = z.infer<typeof overrideTargetSchema>;

export const overrideSchema = z.object({
  /** Unique identifier */
  id: z.string(),
  /** What to override */
  target: overrideTargetSchema,
  /** The override value (hex color or palette reference) */
  value: z.union([
    hexColor,
    z.object({
      palette: z.string(),
      step: z.number().min(1).max(12),
    }),
  ]),
  /** Optional reason for the override */
  reason: z.string().optional(),
  /** Whether this override is enabled */
  enabled: z.boolean().default(true),
});

export type Override = z.infer<typeof overrideSchema>;

// ============================================================================
// Full Builder Config Schema
// ============================================================================

export const builderConfigSchema = z.object({
  /** Schema version for migrations */
  $schema: z.string().optional(),
  /** Configuration name */
  name: z.string().default("staple-css"),
  /** Configuration version */
  version: z.string().default("1.0.0"),

  /** Brand color seeds */
  seeds: seedsSchema,

  /** Generation parameters */
  generation: generationParamsSchema,

  /** Generated palettes */
  palettes: z.array(paletteSchema),

  /** Semantic token mappings */
  semanticMap: z.object({
    light: semanticMapSchema,
    dark: semanticMapSchema,
  }),

  /** Ordered list of overrides */
  overrides: z.array(overrideSchema).default([]),

  /** Space scale (inherited from base config) */
  space: z.record(z.string()).optional(),

  /** Radius scale */
  radius: z.record(z.string()).optional(),

  /** Shadow scale */
  shadow: z.record(z.string()).optional(),

  /** Typography settings */
  typography: z.object({
    fontFamily: z.object({
      sans: z.string(),
      mono: z.string(),
    }),
    fontSize: z.record(z.string()),
    lineHeight: z.record(z.string()),
    fontWeight: z.record(z.string()),
  }).optional(),

  /** Motion settings */
  motion: z.object({
    duration: z.record(z.string()),
    easing: z.record(z.string()),
  }).optional(),

  /** Density settings */
  density: z.object({
    comfortable: z.record(z.string()),
    compact: z.record(z.string()),
  }).optional(),
});

export type BuilderConfig = z.infer<typeof builderConfigSchema>;

// ============================================================================
// Default Values
// ============================================================================

export const defaultSeeds: Seeds = {
  primary: "#2563eb",
  secondary: "#7c3aed",
  neutral: "#64748b",
  success: "#16a34a",
  warn: "#d97706",
  danger: "#dc2626",
};

export const defaultGenerationParams: GenerationParams = {
  algorithm: "oklch",
  stepCount: 12,
  chromaScale: 1.0,
  contrastTarget: 1.0,
  warmCoolBias: 0,
  vibrant: false,
};

export const defaultSemanticMapLight: SemanticMap = {
  background: { palette: "neutral", step: 1 },
  surface: { palette: "neutral", step: 2 },
  surfaceRaised: { palette: "neutral", step: 1 },
  text: { palette: "neutral", step: 12 },
  textMuted: { palette: "neutral", step: 11 },
  textInverse: { palette: "neutral", step: 1 },
  border: { palette: "neutral", step: 6 },
  borderMuted: { palette: "neutral", step: 4 },
  primary: { palette: "primary", step: 9 },
  primaryHover: { palette: "primary", step: 10 },
  primaryText: { palette: "neutral", step: 1 },
  danger: { palette: "danger", step: 9 },
  dangerHover: { palette: "danger", step: 10 },
  dangerText: { palette: "neutral", step: 1 },
  dangerSurface: { palette: "danger", step: 2 },
  warn: { palette: "warn", step: 9 },
  warnHover: { palette: "warn", step: 10 },
  warnText: { palette: "neutral", step: 12 },
  warnSurface: { palette: "warn", step: 2 },
  success: { palette: "success", step: 9 },
  successHover: { palette: "success", step: 10 },
  successText: { palette: "neutral", step: 1 },
  successSurface: { palette: "success", step: 2 },
  focus: { palette: "primary", step: 9 },
};

export const defaultSemanticMapDark: SemanticMap = {
  background: { palette: "neutral", step: 1 },
  surface: { palette: "neutral", step: 2 },
  surfaceRaised: { palette: "neutral", step: 3 },
  text: { palette: "neutral", step: 12 },
  textMuted: { palette: "neutral", step: 11 },
  textInverse: { palette: "neutral", step: 1 },
  border: { palette: "neutral", step: 6 },
  borderMuted: { palette: "neutral", step: 4 },
  primary: { palette: "primary", step: 9 },
  primaryHover: { palette: "primary", step: 10 },
  primaryText: { palette: "neutral", step: 1 },
  danger: { palette: "danger", step: 9 },
  dangerHover: { palette: "danger", step: 10 },
  dangerText: { palette: "neutral", step: 1 },
  dangerSurface: { palette: "danger", step: 3 },
  warn: { palette: "warn", step: 9 },
  warnHover: { palette: "warn", step: 10 },
  warnText: { palette: "neutral", step: 1 },
  warnSurface: { palette: "warn", step: 3 },
  success: { palette: "success", step: 9 },
  successHover: { palette: "success", step: 10 },
  successText: { palette: "neutral", step: 1 },
  successSurface: { palette: "success", step: 3 },
  focus: { palette: "primary", step: 9 },
};

// ============================================================================
// Validation Helpers
// ============================================================================

/**
 * Validate a builder configuration
 */
export function validateBuilderConfig(config: unknown): {
  success: boolean;
  data?: BuilderConfig;
  errors?: z.ZodError;
} {
  const result = builderConfigSchema.safeParse(config);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

/**
 * Validate that semantic map references valid palettes
 */
export function validateSemanticMap(
  semanticMap: SemanticMap,
  palettes: Palette[]
): string[] {
  const errors: string[] = [];
  const paletteNames = new Set(palettes.map(p => p.name));

  for (const [key, ref] of Object.entries(semanticMap)) {
    if (!paletteNames.has(ref.palette)) {
      errors.push(`${key}: references unknown palette "${ref.palette}"`);
    }
  }

  return errors;
}

/**
 * Validate that overrides reference valid targets
 */
export function validateOverrides(
  overrides: Override[],
  palettes: Palette[],
  semanticTokens: string[]
): string[] {
  const errors: string[] = [];
  const paletteNames = new Set(palettes.map(p => p.name));

  for (const override of overrides) {
    if (override.target.type === "palette") {
      if (!paletteNames.has(override.target.palette)) {
        errors.push(`Override ${override.id}: references unknown palette "${override.target.palette}"`);
      }
    } else if (override.target.type === "semantic") {
      if (!semanticTokens.includes(override.target.token)) {
        errors.push(`Override ${override.id}: references unknown semantic token "${override.target.token}"`);
      }
    }
  }

  return errors;
}
