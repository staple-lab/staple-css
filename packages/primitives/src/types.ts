import type {
  SpaceToken,
  RadiusToken,
  ShadowToken,
  FontSizeToken,
  FontWeightToken,
  ToneToken,
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
} from "@staple-css/tokens";

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
export type Justify = "start" | "center" | "end" | "between" | "around" | "evenly";

/**
 * Flex direction options
 */
export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";

/**
 * Flex wrap options
 */
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

/**
 * Text alignment options
 */
export type TextAlign = "start" | "center" | "end";

/**
 * Line height options
 */
export type Leading = "tight" | "normal" | "relaxed";

/**
 * Z-Index scale tokens
 */
export type ZIndex = ZIndexToken;

/**
 * Opacity scale tokens
 */
export type Opacity = OpacityToken;

/**
 * Border width scale tokens
 */
export type BorderWidth = BorderWidthToken;

/**
 * Max width scale tokens
 */
export type MaxWidth = MaxWidthToken;

/**
 * Aspect ratio scale tokens
 */
export type AspectRatio = AspectRatioToken;

/**
 * Letter spacing scale tokens
 */
export type LetterSpacing = LetterSpacingToken;

/**
 * Line clamp scale tokens
 */
export type LineClamp = LineClampToken;

/**
 * Outline width scale tokens
 */
export type OutlineWidth = OutlineWidthToken;

/**
 * Outline offset scale tokens
 */
export type OutlineOffset = OutlineOffsetToken;

/**
 * Blur scale tokens
 */
export type Blur = BlurToken;

/**
 * Container size presets
 */
export type ContainerSize = "sm" | "md" | "lg" | "xl";

/**
 * Grid column presets
 */
export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "none";

/**
 * Grid row presets
 */
export type GridRows = 1 | 2 | 3 | 4 | 5 | 6 | "none";

/**
 * Grid auto flow options
 */
export type GridAutoFlow = "row" | "column" | "dense" | "row-dense" | "column-dense";

/**
 * Grid auto rows sizing options
 */
export type GridAutoRows = "auto" | "min" | "max" | "1fr" | "minmax";

/**
 * Grid auto columns sizing options
 */
export type GridAutoColumns = "auto" | "min" | "max" | "1fr" | "minmax";

/**
 * Place items shorthand (align-items + justify-items)
 */
export type PlaceItems = "start" | "center" | "end" | "stretch" | "baseline";

/**
 * Place content shorthand (align-content + justify-content)
 */
export type PlaceContent = "start" | "center" | "end" | "stretch" | "between" | "around" | "evenly";

/**
 * Grid item placement
 */
export type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full" | "auto";

/**
 * Breakpoint keys
 */
export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Responsive value - can be a single value or object with breakpoint keys
 */
export type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

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
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridColumn?: string;
  gridRow?: string;
}

/**
 * Helper to check if a value is a responsive object
 */
export function isResponsiveObject<T>(value: Responsive<T>): value is Partial<Record<Breakpoint, T>> {
  return typeof value === "object" && value !== null && ("base" in value || "sm" in value || "md" in value || "lg" in value || "xl" in value || "2xl" in value);
}

/**
 * Generate class names for responsive props
 */
export function responsiveClasses<T extends string | number | boolean>(
  prefix: string,
  prop: string,
  value: Responsive<T> | undefined
): string[] {
  if (value === undefined) return [];

  if (isResponsiveObject(value)) {
    const classes: string[] = [];
    for (const [bp, val] of Object.entries(value)) {
      if (val === undefined) continue;
      if (bp === "base") {
        classes.push(`${prefix}--${prop}-${val}`);
      } else {
        classes.push(`${prefix}--${bp}-${prop}-${val}`);
      }
    }
    return classes;
  }

  return [`${prefix}--${prop}-${value}`];
}
