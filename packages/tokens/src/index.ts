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
