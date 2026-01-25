import type { ElementType, ComponentPropsWithoutRef, ReactNode, FC } from "react";
import type {
  Space,
  Align,
  Justify,
  FlexDirection,
  FlexWrap,
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
 * Flex Props
 */
export interface FlexOwnProps {
  /** Content */
  children?: ReactNode;
  /** Flex direction (responsive) */
  direction?: Responsive<FlexDirection>;
  /** Gap between children (responsive, space scale 0-8) */
  gap?: Responsive<Space>;
  /** Row gap (responsive, space scale 0-8) */
  rowGap?: Responsive<Space>;
  /** Column gap (responsive, space scale 0-8) */
  columnGap?: Responsive<Space>;
  /** Cross-axis alignment (responsive) */
  align?: Responsive<Align>;
  /** Main-axis justification (responsive) */
  justify?: Responsive<Justify>;
  /** Flex wrap (responsive) */
  wrap?: Responsive<FlexWrap>;
  /** Content alignment for wrapped lines (responsive) */
  alignContent?: Responsive<Align | Justify>;
  /** Make container inline-flex (responsive) */
  inline?: Responsive<boolean>;
  /** Additional class names */
  className?: string;
  /**
   * Inline styles (escape hatch)
   * Only layout-related properties are allowed.
   */
  style?: LayoutStyleProps;
}

export type FlexProps<E extends ElementType = "div"> = FlexOwnProps &
  PolymorphicProps<E>;

/**
 * Flex
 *
 * Flexible box layout with all CSS flexbox options and responsive breakpoint support.
 *
 * @example
 * // Simple row
 * <Flex gap={4} align="center">
 *   <Icon />
 *   <Text>Label</Text>
 * </Flex>
 *
 * @example
 * // Column layout
 * <Flex direction="column" gap={4}>
 *   <Text>First</Text>
 *   <Text>Second</Text>
 * </Flex>
 *
 * @example
 * // Responsive: column on mobile, row on desktop
 * <Flex direction={{ base: "column", md: "row" }} gap={{ base: 2, md: 4 }}>
 *   <Sidebar />
 *   <Main />
 * </Flex>
 */
export function Flex<E extends ElementType = "div">({
  as,
  children,
  direction,
  gap,
  rowGap,
  columnGap,
  align,
  justify,
  wrap,
  alignContent,
  inline,
  className,
  style,
  ...rest
}: FlexProps<E>) {
  const Component = as || "div";

  const classes = cx(
    "st-Flex",
    ...responsiveClasses("st-Flex", "dir", direction),
    ...responsiveClasses("st-Flex", "gap", gap),
    ...responsiveClasses("st-Flex", "row-gap", rowGap),
    ...responsiveClasses("st-Flex", "col-gap", columnGap),
    ...responsiveClasses("st-Flex", "align", align),
    ...responsiveClasses("st-Flex", "justify", justify),
    ...responsiveClasses("st-Flex", "wrap", wrap),
    ...responsiveClasses("st-Flex", "align-content", alignContent),
    ...responsiveClasses("st-Flex", "inline", inline),
    className
  );

  return (
    <Component className={classes} style={style} {...rest}>
      {children}
    </Component>
  );
}

/**
 * Row
 *
 * Convenience alias for <Flex direction="row">
 *
 * @example
 * <Row gap={4} align="center">
 *   <Icon />
 *   <Text>Label</Text>
 * </Row>
 */
export const Row: FC<Omit<FlexProps<"div">, "direction">> = (props) => {
  return <Flex direction="row" {...props} />;
};

/**
 * Column
 *
 * Convenience alias for <Flex direction="column">
 *
 * @example
 * <Column gap={4}>
 *   <Text>First</Text>
 *   <Text>Second</Text>
 * </Column>
 */
export const Column: FC<Omit<FlexProps<"div">, "direction">> = (props) => {
  return <Flex direction="column" {...props} />;
};

