import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import type {
  Space,
  GridCols,
  GridRows,
  GridAutoFlow,
  GridAutoRows,
  GridAutoColumns,
  PlaceItems,
  PlaceContent,
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
 * Grid presets for intrinsic responsive layouts
 */
type GridPreset =
  | "auto-fit-xs"  // repeat(auto-fit, minmax(200px, 1fr))
  | "auto-fit-sm"  // repeat(auto-fit, minmax(250px, 1fr))
  | "auto-fit-md"  // repeat(auto-fit, minmax(300px, 1fr))
  | "auto-fit-lg"  // repeat(auto-fit, minmax(400px, 1fr))
  | "auto-fill-xs" // repeat(auto-fill, minmax(200px, 1fr))
  | "auto-fill-sm" // repeat(auto-fill, minmax(250px, 1fr))
  | "auto-fill-md" // repeat(auto-fill, minmax(300px, 1fr))
  | "auto-fill-lg"; // repeat(auto-fill, minmax(400px, 1fr))

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
  /** Number of columns (responsive, preset: 1-12, "none") - mutually exclusive with preset */
  cols?: Responsive<GridCols>;
  /** Number of rows (responsive, preset: 1-6, "none") */
  rows?: Responsive<GridRows>;
  /** Intrinsic responsive preset (auto-fit/auto-fill presets) - mutually exclusive with cols */
  preset?: Responsive<GridPreset>;
  /** Grid auto flow (responsive) */
  flow?: Responsive<GridAutoFlow>;
  /** Auto size for implicit rows (responsive) */
  autoRows?: Responsive<GridAutoRows>;
  /** Auto size for implicit columns (responsive) */
  autoColumns?: Responsive<GridAutoColumns>;
  /** Align items (responsive) */
  align?: Responsive<Align>;
  /** Justify items (responsive) */
  justify?: Responsive<Justify>;
  /** Place items shorthand - sets both align and justify items (responsive) */
  placeItems?: Responsive<PlaceItems>;
  /** Align content (responsive) */
  alignContent?: Responsive<Align | Justify>;
  /** Justify content (responsive) */
  justifyContent?: Responsive<Justify>;
  /** Place content shorthand - sets both align and justify content (responsive) */
  placeContent?: Responsive<PlaceContent>;
  /** Make container inline-grid (responsive) */
  inline?: Responsive<boolean>;
  /** Additional class names */
  className?: string;
  /**
   * Inline styles (escape hatch)
   * Only layout-related properties are allowed.
   * Use for custom grid-template-columns/rows values.
   * Takes precedence over cols/rows/preset.
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
  preset,
  flow,
  autoRows,
  autoColumns,
  align,
  justify,
  placeItems,
  alignContent,
  justifyContent,
  placeContent,
  inline,
  className,
  style,
  ...rest
}: GridProps<E>) {
  const Component = as || "div";

  if (typeof process !== "undefined" && process.env.NODE_ENV === "development") {
    if (preset && cols) {
      console.warn(
        "Grid: Both 'preset' and 'cols' props provided. 'preset' will be ignored. Use one or the other."
      );
    }
  }

  const classes = cx(
    "st-Grid",
    ...responsiveClasses("st-Grid", "gap", gap),
    ...responsiveClasses("st-Grid", "row-gap", rowGap),
    ...responsiveClasses("st-Grid", "col-gap", columnGap),
    ...(preset ? [] : responsiveClasses("st-Grid", "cols", cols)),
    ...responsiveClasses("st-Grid", "rows", rows),
    ...(preset ? [`st-Grid--preset-${preset}`] : []),
    ...responsiveClasses("st-Grid", "flow", flow),
    ...responsiveClasses("st-Grid", "auto-rows", autoRows),
    ...responsiveClasses("st-Grid", "auto-cols", autoColumns),
    ...responsiveClasses("st-Grid", "align", align),
    ...responsiveClasses("st-Grid", "justify", justify),
    ...responsiveClasses("st-Grid", "place-items", placeItems),
    ...responsiveClasses("st-Grid", "align-content", alignContent),
    ...responsiveClasses("st-Grid", "justify-content", justifyContent),
    ...responsiveClasses("st-Grid", "place-content", placeContent),
    ...responsiveClasses("st-Grid", "inline", inline),
    className
  );

  return (
    <Component className={classes} style={style} {...rest}>
      {children}
    </Component>
  );
}
