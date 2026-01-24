import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import type { Space, Radius, Shadow, LayoutStyleProps } from "./types.js";
import { cx } from "./cx.js";

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
  /** Padding (space scale 0-8) */
  pad?: Space;
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
  radius,
  shadow,
  className,
  style,
  ...rest
}: BoxProps<E>) {
  const Component = as || "div";

  const classes = cx(
    "st-Box",
    pad !== undefined && `st-Box--pad-${pad}`,
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
