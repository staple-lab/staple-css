import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import type {
  Space,
  Radius,
  Shadow,
  ZIndex,
  Opacity,
  BorderWidth,
  MaxWidth,
  AspectRatio,
  OutlineWidth,
  OutlineOffset,
  LayoutStyleProps,
  Responsive,
} from "./types.js";
import { cx } from "./cx.js";
import { responsiveClasses } from "./types.js";

/**
 * Props for polymorphic component
 */
type PolymorphicProps<E extends ElementType> = {
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, "as">;

/**
 * Box Props - Type-safe layout container props
 *
 * All props accept token keys only. No arbitrary values allowed.
 * Values are validated at compile-time by TypeScript.
 */
export interface BoxOwnProps {
  /** Child content - required for semantic HTML */
  children?: ReactNode;
  /**
   * Padding on all sides (space scale 0-8)
   * @example <Box pad={4}>Content</Box>
   */
  pad?: Responsive<Space>;
  /**
   * Margin on all sides (space scale 0-8)
   * @example <Box margin={3}>Spaced content</Box>
   */
  margin?: Responsive<Space>;
  /**
   * Margin on left and right (space scale 0-8)
   * @example <Box marginX={4}>Horizontally spaced</Box>
   */
  marginX?: Responsive<Space>;
  /**
   * Margin on top and bottom (space scale 0-8)
   * @example <Box marginY={5}>Vertically spaced</Box>
   */
  marginY?: Responsive<Space>;
  /**
   * Margin on top only (space scale 0-8)
   */
  marginTop?: Responsive<Space>;
  /**
   * Margin on bottom only (space scale 0-8)
   */
  marginBottom?: Responsive<Space>;
  /**
   * Margin on left only (space scale 0-8)
   */
  marginLeft?: Responsive<Space>;
  /**
   * Margin on right only (space scale 0-8)
   */
  marginRight?: Responsive<Space>;
  /**
   * Border radius (radius scale 0-4)
   * 0: sharp, 1: subtle, 2: standard, 3: prominent, 4: pill-shaped
   * @example <Box radius={2}>Rounded box</Box>
   */
  radius?: Radius;
  /**
   * Box shadow / elevation (shadow scale 0-5)
   * 0: none, 1: subtle, 2: standard, 3: strong, 4: stronger, 5: strongest
   * @example <Box shadow={2}>Elevated box</Box>
   */
  shadow?: Shadow;
  /**
   * Z-index for stacking context (0, 10, 20, 30, 40, 50, max=9999)
   * Used with position: absolute/fixed/sticky
   * @example <Box zIndex={50}>Modal backdrop</Box>
   */
  zIndex?: ZIndex;
  /**
   * Opacity/transparency (0-100 scale by 5%)
   * @example <Box opacity={50}>Semi-transparent</Box>
   */
  opacity?: Responsive<Opacity>;
  /**
   * Border width (0, 1, 2, 3, 4, 8px)
   * @example <Box borderWidth={1}>With border</Box>
   */
  borderWidth?: Responsive<BorderWidth>;
  /**
   * Max width constraint (xs-7xl, prose, full, screen, none)
   * @example <Box maxWidth="lg">Content container</Box>
   */
  maxWidth?: Responsive<MaxWidth>;
  /**
   * Aspect ratio preset (square, video, portrait, landscape, wide, golden, auto)
   * @example <Box aspectRatio="video">16:9 container</Box>
   */
  aspectRatio?: Responsive<AspectRatio>;
  /**
   * Outline width for focus indicators (0, 1, 2, 4, 8)
   * Use with outline to create focus rings
   * @example <Box outlineWidth={2}>Focus ring</Box>
   */
  outlineWidth?: Responsive<OutlineWidth>;
  /**
   * Outline offset (0, 1, 2, 4, 8)
   * Space between outline and element
   * @example <Box outlineOffset={2}>Spaced outline</Box>
   */
  outlineOffset?: Responsive<OutlineOffset>;
  /**
   * Additional CSS class names (escape hatch)
   * For truly custom styles not available through tokens
   */
  className?: string;
  /**
   * Inline styles for layout properties only (escape hatch)
   * Restricted to: width, height, flex, grid properties
   * Do NOT use for styling - use props instead
   * @example <Box style={{ width: '100%' }}>
   */
  style?: LayoutStyleProps;
}

export type BoxProps<E extends ElementType = "div"> = BoxOwnProps &
  PolymorphicProps<E>;

/**
 * Box - Universal layout container primitive
 *
 * A generic container supporting padding, margin, radius, shadow, and sizing.
 * Use as a building block for custom layouts. Fully type-safe with token-only props.
 *
 * **Usage:**
 * - Wrapper for custom layouts
 * - Padding/margin container
 * - Elevation/shadow (cards, modals, etc.)
 * - With `as` prop for semantic HTML elements
 *
 * **Responsive Design:**
 * All spacing props support responsive values
 *
 * @typeParam E - HTML element type (default: div)
 *
 * @example
 * // Basic container with padding
 * <Box pad={4}>Content</Box>
 *
 * @example
 * // Semantic section with elevation
 * <Box as="section" pad={6} shadow={2} radius={3}>
 *   Section content
 * </Box>
 *
 * @example
 * // Responsive spacing
 * <Box pad={{ base: 3, md: 5, lg: 7 }} margin={4}>
 *   Responsive content
 * </Box>
 *
 * @see {@link https://css.staplelab.com/} for interactive examples
 */
export function Box<E extends ElementType = "div">({
  as,
  children,
  pad,
  margin,
  marginX,
  marginY,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  radius,
  shadow,
  zIndex,
  opacity,
  borderWidth,
  maxWidth,
  aspectRatio,
  outlineWidth,
  outlineOffset,
  className,
  style,
  ...rest
}: BoxProps<E>) {
  const Component = as || "div";

  const classes = cx(
    "st-Box",
    ...responsiveClasses("st-Box", "pad", pad),
    ...responsiveClasses("st-Box", "margin", margin),
    ...responsiveClasses("st-Box", "margin-x", marginX),
    ...responsiveClasses("st-Box", "margin-y", marginY),
    ...responsiveClasses("st-Box", "margin-top", marginTop),
    ...responsiveClasses("st-Box", "margin-bottom", marginBottom),
    ...responsiveClasses("st-Box", "margin-left", marginLeft),
    ...responsiveClasses("st-Box", "margin-right", marginRight),
    radius !== undefined && `st-Box--radius-${radius}`,
    shadow !== undefined && `st-Box--shadow-${shadow}`,
    zIndex !== undefined && `st-Box--z-${zIndex}`,
    ...responsiveClasses("st-Box", "opacity", opacity),
    ...responsiveClasses("st-Box", "border-width", borderWidth),
    ...responsiveClasses("st-Box", "max-width", maxWidth),
    ...responsiveClasses("st-Box", "aspect", aspectRatio),
    ...responsiveClasses("st-Box", "outline-width", outlineWidth),
    ...responsiveClasses("st-Box", "outline-offset", outlineOffset),
    className
  );

  return (
    <Component className={classes} style={style} {...rest}>
      {children}
    </Component>
  );
}
