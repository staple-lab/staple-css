import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import type { Space, GridCols, LayoutStyleProps } from "./types.js";
import { cx } from "./cx.js";

/**
 * Props for polymorphic component
 */
type PolymorphicProps<E extends ElementType> = {
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, "as">;

/**
 * Grid Props
 */
export interface GridOwnProps {
  /** Content */
  children?: ReactNode;
  /** Gap between items (space scale 0-8) */
  gap?: Space;
  /** Number of columns (preset: 1, 2, 3, 4, 6, 12) */
  cols?: GridCols;
  /** Additional class names */
  className?: string;
  /**
   * Inline styles (escape hatch)
   * Only layout-related properties are allowed.
   */
  style?: LayoutStyleProps;
}

export type GridProps<E extends ElementType = "div"> = GridOwnProps &
  PolymorphicProps<E>;

/**
 * Grid
 *
 * CSS Grid layout with consistent gap and column presets.
 *
 * @example
 * <Grid cols={3} gap={4}>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 */
export function Grid<E extends ElementType = "div">({
  as,
  children,
  gap,
  cols,
  className,
  style,
  ...rest
}: GridProps<E>) {
  const Component = as || "div";

  const classes = cx(
    "st-Grid",
    gap !== undefined && `st-Grid--gap-${gap}`,
    cols && `st-Grid--cols-${cols}`,
    className
  );

  return (
    <Component className={classes} style={style} {...rest}>
      {children}
    </Component>
  );
}
