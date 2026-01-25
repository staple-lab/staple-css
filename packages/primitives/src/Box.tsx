import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import type { Space, Radius, Shadow, LayoutStyleProps, Responsive } from "./types.js";
import { cx } from "./cx.js";
import { responsiveClasses } from "./types.js";

/**
 * Props for polymorphic component
 */
type PolymorphicProps<E extends ElementType> = {
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, "as">;

/**
 * Box Props
 */
export interface BoxOwnProps {
  /** Content */
  children?: ReactNode;
  /** Padding (space scale 0-8), supports responsive values */
  pad?: Responsive<Space>;
  /** Margin on all sides (space scale 0-8), supports responsive values */
  margin?: Responsive<Space>;
  /** Margin on horizontal axis (space scale 0-8), supports responsive values */
  marginX?: Responsive<Space>;
  /** Margin on vertical axis (space scale 0-8), supports responsive values */
  marginY?: Responsive<Space>;
  /** Margin on top (space scale 0-8), supports responsive values */
  marginTop?: Responsive<Space>;
  /** Margin on bottom (space scale 0-8), supports responsive values */
  marginBottom?: Responsive<Space>;
  /** Margin on left (space scale 0-8), supports responsive values */
  marginLeft?: Responsive<Space>;
  /** Margin on right (space scale 0-8), supports responsive values */
  marginRight?: Responsive<Space>;
  /** Border radius (radius scale 0-4) */
  radius?: Radius;
  /** Box shadow (shadow scale 0-2) */
  shadow?: Shadow;
  /** Additional class names */
  className?: string;
  /**
   * Inline styles (escape hatch)
   * Only layout-related properties are allowed.
   */
  style?: LayoutStyleProps;
}

export type BoxProps<E extends ElementType = "div"> = BoxOwnProps &
  PolymorphicProps<E>;

/**
 * Box
 *
 * A generic container with padding, radius, and shadow options.
 * Use as a building block for custom layouts.
 *
 * @example
 * <Box pad={4} radius={2}>Content</Box>
 * <Box as="section" pad={6} shadow={1}>Section content</Box>
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
    className
  );

  return (
    <Component className={classes} style={style} {...rest}>
      {children}
    </Component>
  );
}
