import type { SpaceToken, RadiusToken, ShadowToken, FontSizeToken, FontWeightToken, ToneToken } from "@staple-css/tokens";

/**
 * Space scale tokens (0-8)
 */
export type Space = SpaceToken;

/**
 * Radius scale tokens (0-4)
 */
export type Radius = RadiusToken;

/**
 * Shadow scale tokens (0-2)
 */
export type Shadow = ShadowToken;

/**
 * Font size scale tokens (0-6)
 */
export type Size = FontSizeToken;

/**
 * Font weight tokens
 */
export type Weight = FontWeightToken;

/**
 * Tone variants for semantic coloring
 */
export type Tone = ToneToken | "muted";

/**
 * Alignment options for flex layouts
 */
export type Align = "start" | "center" | "end" | "stretch" | "baseline";

/**
 * Justify options for flex layouts
 */
export type Justify = "start" | "center" | "end" | "between";

/**
 * Text alignment options
 */
export type TextAlign = "start" | "center" | "end";

/**
 * Line height options
 */
export type Leading = "tight" | "normal" | "relaxed";

/**
 * Container size presets
 */
export type ContainerSize = "sm" | "md" | "lg" | "xl";

/**
 * Grid column presets
 */
export type GridCols = 1 | 2 | 3 | 4 | 6 | 12;

/**
 * Allowed inline style properties for layout primitives (escape hatch)
 *
 * Only these properties can be passed via the style prop on layout primitives.
 * This provides a limited escape hatch for dynamic sizing while preventing
 * arbitrary styling that should go through tokens.
 */
export interface LayoutStyleProps {
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  flex?: string | number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string | number;
}
