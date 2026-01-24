import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import type {
  Space,
  GridCols,
  GridRows,
  GridAutoFlow,
  Align,
  Justify,
  Responsive,
  LayoutStyleProps,
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
 * Grid Props
 */
export interface GridOwnProps {
  /** Content */
  children?: ReactNode;
  /** Gap between items (responsive, space scale 0-8) */
  gap?: Responsive<Space>;
  /** Row gap (responsive, space scale 0-8) */
  rowGap?: Responsive<Space>;
  /** Column gap (responsive, space scale 0-8) */
  columnGap?: Responsive<Space>;
  /** Number of columns (responsive, preset: 1-12, "none") */
  cols?: Responsive<GridCols>;
  /** Number of rows (responsive, preset: 1-6, "none") */
  rows?: Responsive<GridRows>;
  /** Grid auto flow (responsive) */
  flow?: Responsive<GridAutoFlow>;
  /** Align items (responsive) */
  align?: Responsive<Align>;
  /** Justify items (responsive) */
  justify?: Responsive<Justify>;
  /** Align content (responsive) */
  alignContent?: Responsive<Align | Justify>;
  /** Justify content (responsive) */
  justifyContent?: Responsive<Justify>;
  /** Make container inline-grid (responsive) */
  inline?: Responsive<boolean>;
  /** Additional class names */
  className?: string;
  /**
   * Inline styles (escape hatch)
   * Only layout-related properties are allowed.
   * Use for custom grid-template-columns/rows values.
   */
  style?: LayoutStyleProps;
}

export type GridProps<E extends ElementType = "div"> = GridOwnProps &
  PolymorphicProps<E>;

/**
 * Grid
 *
 * CSS Grid layout with full grid options and responsive breakpoint support.
 *
 * @example
 * // Simple 3-column grid
 * <Grid cols={3} gap={4}>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 *
 * @example
 * // Responsive: 1 col on mobile, 2 on tablet, 4 on desktop
 * <Grid cols={{ base: 1, md: 2, lg: 4 }} gap={4}>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 *   <Card>Item 4</Card>
 * </Grid>
 *
 * @example
 * // Custom template with style escape hatch
 * <Grid gap={4} style={{ gridTemplateColumns: "200px 1fr 200px" }}>
 *   <Sidebar />
 *   <Main />
 *   <Aside />
 * </Grid>
 */
export function Grid<E extends ElementType = "div">({
  as,
  children,
  gap,
  rowGap,
  columnGap,
  cols,
  rows,
  flow,
  align,
  justify,
  alignContent,
  justifyContent,
  inline,
  className,
  style,
  ...rest
}: GridProps<E>) {
  const Component = as || "div";

  const classes = cx(
    "st-Grid",
    ...responsiveClasses("st-Grid", "gap", gap),
    ...responsiveClasses("st-Grid", "row-gap", rowGap),
    ...responsiveClasses("st-Grid", "col-gap", columnGap),
    ...responsiveClasses("st-Grid", "cols", cols),
    ...responsiveClasses("st-Grid", "rows", rows),
    ...responsiveClasses("st-Grid", "flow", flow),
    ...responsiveClasses("st-Grid", "align", align),
    ...responsiveClasses("st-Grid", "justify", justify),
    ...responsiveClasses("st-Grid", "align-content", alignContent),
    ...responsiveClasses("st-Grid", "justify-content", justifyContent),
    ...responsiveClasses("st-Grid", "inline", inline),
    className
  );

  return (
    <Component className={classes} style={style} {...rest}>
      {children}
    </Component>
  );
}
