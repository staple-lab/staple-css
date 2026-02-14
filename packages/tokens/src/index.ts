// ---------------------------------------------------------------------------
// @staple-css/tokens — Public API
//
// Re-exports types, token definitions, color utilities, palette helpers,
// and generator functions.
// ---------------------------------------------------------------------------

// Types
export type {
  TokenCategory,
  ColorProperty,
  ColorRole,
  Prominence,
  InteractionState,
  ColorToken,
  ScaleToken,
  LayoutToken,
  TokenDefinition,
  TokenRegistry,
  ColorTokenSegments,
} from './types.js';

export { buildColorTokenName } from './types.js';

// Token definitions
export {
  spaceTokens,
  typographyTokens,
  elevationTokens,
  borderTokens,
  motionTokens,
  layoutTokens,
  breakpoints,
  colorTokens,
  getColorTokens,
  getAllTokens,
} from './definitions/index.js';

// Palette data and helpers
export {
  palettes,
  paletteVar,
  generatePalettesCss,
} from './palettes.js';

export type { PaletteShade, PaletteName, ColorPalette } from './palettes.js';

// Generator functions
export {
  generateTokensCss,
  generateThemesCss,
  generateAllCss,
  generateTokensJson,
  generateTypeScriptConstants,
} from './generator/index.js';
