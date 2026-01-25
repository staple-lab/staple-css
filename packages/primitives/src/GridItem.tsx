import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Responsive, LayoutStyleProps } from "./types.js";
import { cx } from "./cx.js";
import { responsiveClasses } from "./types.js";

/**
 * Grid item span values (1-12, "full", or "auto")
 */
type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full" | "auto";

/**
 * Grid item position values (1-13 for grid lines, or "auto")
 */
type GridPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | "auto";

/**
 * GridItem Props
 */
export interface GridItemProps extends Omit<ComponentPropsWithoutRef<"div">, "style"> {
  /** Content */
  children?: ReactNode;
  /** Number of columns to span (responsive, 1-12, "full", "auto") */
  colSpan?: Responsive<GridSpan>;
  /** Number of rows to span (responsive, 1-6, "full", "auto") */
  rowSpan?: Responsive<GridSpan>;
  /** Column start position (responsive, 1-13, "auto") */
  colStart?: Responsive<GridPosition>;
  /** Column end position (responsive, 1-13, "auto") */
  colEnd?: Responsive<GridPosition>;
  /** Row start position (responsive, 1-13, "auto") */
  rowStart?: Responsive<GridPosition>;
  /** Row end position (responsive, 1-13, "auto") */
  rowEnd?: Responsive<GridPosition>;
  /** Additional class names */
  className?: string;
  /**
   * Inline styles (escape hatch)
   * Only layout-related properties are allowed.
   */
  style?: LayoutStyleProps;
}

/**
 * GridItem
 *
 * Grid item for positioning within CSS Grid layouts.
 * Use inside a Grid component to control item spanning and positioning.
 *
 * @example
 * // Simple spanning
 * <Grid cols={4} gap={4}>
 *   <GridItem colSpan={2}>Spans 2 columns</GridItem>
 *   <GridItem>Default 1 column</GridItem>
 * </Grid>
 *
 * @example
 * // Explicit positioning
 * <Grid cols={3} rows={3} gap={4}>
 *   <GridItem colStart={1} colEnd={3} rowStart={1} rowEnd={3}>
 *     Large 2x2 item
 *   </GridItem>
 * </Grid>
 *
 * @example
 * // Responsive spanning
 * <Grid cols={{ base: 1, md: 4 }} gap={4}>
 *   <GridItem colSpan={{ base: 1, md: 2 }}>
 *     Spans 1 col on mobile, 2 on desktop
 *   </GridItem>
 * </Grid>
 */
export function GridItem({
  children,
  colSpan,
  rowSpan,
  colStart,
  colEnd,
  rowStart,
  rowEnd,
  className,
  style,
  ...rest
}: GridItemProps) {
  const classes = cx(
    "st-GridItem",
    ...responsiveClasses("st-GridItem", "col-span", colSpan),
    ...responsiveClasses("st-GridItem", "row-span", rowSpan),
    ...responsiveClasses("st-GridItem", "col-start", colStart),
    ...responsiveClasses("st-GridItem", "col-end", colEnd),
    ...responsiveClasses("st-GridItem", "row-start", rowStart),
    ...responsiveClasses("st-GridItem", "row-end", rowEnd),
    className
  );

  return (
    <div className={classes} style={style} {...rest}>
      {children}
    </div>
  );
}
