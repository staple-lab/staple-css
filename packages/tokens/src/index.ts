/**
 * @staple-css/tokens
 *
 * Design tokens for staple-css.
 * Use the TypeScript exports for type safety and documentation.
 * Import CSS files for the actual CSS variable definitions.
 *
 * @example
 * ```ts
 * // Import CSS at your app root
 * import "@staple-css/tokens/tokens.css";
 * import "@staple-css/tokens/themes.css";
 * import "@staple-css/tokens/density.css";
 *
 * // Or import all at once
 * import "@staple-css/tokens/all.css";
 *
 * // Use types for type-safe token references
 * import type { SpaceToken, ColorToken } from "@staple-css/tokens";
 * ```
 */

export {
  // Token definitions (for documentation/tooling)
  tokens,
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
  fontFamily,
  fontSizeScale,
  lineHeight,
  fontWeight,
  duration,
  easing,
  colorsLight,
  colorsDark,
  densityComfortable,
  densityCompact,
  tones,
} from "./tokens.js";

export type {
  // Token types for type-safe props
  SpaceToken,
  RadiusToken,
  ShadowToken,
  ZIndexToken,
  OpacityToken,
  BorderWidthToken,
  MaxWidthToken,
  AspectRatioToken,
  LetterSpacingToken,
  LineClampToken,
  OutlineWidthToken,
  OutlineOffsetToken,
  BlurToken,
  BrightnessToken,
  ContrastToken,
  SaturateToken,
  ScaleToken,
  FontFamilyToken,
  FontSizeToken,
  LineHeightToken,
  FontWeightToken,
  DurationToken,
  EasingToken,
  ColorToken,
  DensityToken,
  ToneToken,
  Tokens,
} from "./tokens.js";

/**
 * CSS Variable name helpers
 *
 * Use these to reference CSS variables in TypeScript when needed.
 */
export const cssVar = {
  space: (n: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => `var(--st-space-${n})`,
  radius: (n: 0 | 1 | 2 | 3 | 4) => `var(--st-radius-${n})`,
  shadow: (n: 0 | 1 | 2) => `var(--st-shadow-${n})`,
  color: (name: string) => `var(--st-color-${name})`,
  fontSize: (n: 0 | 1 | 2 | 3 | 4 | 5 | 6) => `var(--st-font-size-${n})`,
} as const;

// Re-export config module
export {
  tokenConfigSchema,
  defaultConfig,
  validateConfig,
  mergeConfig,
  configToJson,
  configFromJson,
  type TokenConfig,
  type SemanticColors,
  type DensityTokens,
  type ColorPalette,
} from "./config.js";

// Re-export generator module
export {
  generateCss,
  generatePreviewCss,
  generateSemanticColorsFromPrimary,
  type GeneratedCss,
} from "./generator.js";

// Re-export color palettes (Tailwind-style)
export {
  palettes,
  paletteVar,
  generatePalettesCss,
  slate,
  gray,
  zinc,
  neutral,
  stone,
  red,
  orange,
  amber,
  yellow,
  lime,
  green,
  emerald,
  teal,
  cyan,
  sky,
  blue,
  indigo,
  violet,
  purple,
  fuchsia,
  pink,
  rose,
  type PaletteShade,
  type PaletteName,
  type ColorPalette as TailwindColorPalette,
} from "./palettes.js";

// Re-export breakpoints
export {
  defaultBreakpoints,
  bootstrapBreakpoints,
  minimalBreakpoints,
  fineGrainedBreakpoints,
  breakpointPresets,
  getBreakpoints,
  generateBreakpointVars,
  generateBreakpointsCss,
  getMediaQueries,
  createBreakpointHelpers,
  type BreakpointConfig,
  type BreakpointsOptions,
  type BreakpointPreset,
} from "./breakpoints.js";

// Re-export builder config schema
export {
  seedsSchema,
  generationParamsSchema,
  paletteSchema,
  semanticMapSchema,
  overrideSchema,
  builderConfigSchema,
  validateBuilderConfig,
  validateSemanticMap,
  validateOverrides,
  defaultSeeds,
  defaultGenerationParams,
  defaultSemanticMapLight,
  defaultSemanticMapDark,
  type Seeds,
  type GenerationParams,
  type Palette,
  type SemanticMap,
  type SemanticRef,
  type Override,
  type OverrideTarget,
  type BuilderConfig,
} from "./builder-config.js";

// Re-export builder generator
export {
  generatePalettes,
  generateSinglePalette,
  generateHarmonySuggestions,
  resolveSemanticRef,
  resolveSemanticColors,
  applyPaletteOverrides,
  applySemanticOverrides,
  generateBuilderCss,
  createDefaultBuilderConfig,
  type HarmonySuggestion,
} from "./builder-generator.js";

// Re-export theme manager
export {
  createTheme,
  updateThemeMetadata,
  themeToJson,
  themeFromJson,
  themeToCSS,
  themeToTypeScript,
  applyTheme,
  removeTheme,
  themeCollectionToJson,
  themeCollectionFromJson,
  createThemeCollection,
  getThemeById,
  addThemeToCollection,
  removeThemeFromCollection,
  exportThemeCollectionAsZip,
  saveThemeCollectionToStorage,
  loadThemeCollectionFromStorage,
  type Theme,
  type ThemeMetadata,
  type ThemeCollection,
  type ThemeExportFormat,
} from "./theme-manager.js";
