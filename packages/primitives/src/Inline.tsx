import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import type { Space, Align, Justify, LayoutStyleProps, Responsive } from "./types.js";
import { cx } from "./cx.js";
import { responsiveClasses } from "./types.js";

/**
 * Props for polymorphic component
 */
type PolymorphicProps<E extends ElementType> = {
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, "as">;

/**
 * Inline Props
 */
export interface InlineOwnProps {
  /** Content */
  children?: ReactNode;
  /** Gap between children (space scale 0-8), supports responsive values */
  gap?: Responsive<Space>;
  /** Cross-axis alignment, supports responsive values */
  align?: Responsive<Align>;
  /** Main-axis justification, supports responsive values */
  justify?: Responsive<Justify>;
  /** Allow wrapping, supports responsive values */
  wrap?: Responsive<boolean>;
  /** Additional class names */
  className?: string;
  /**
   * Inline styles (escape hatch)
   * Only layout-related properties are allowed.
   */
  style?: LayoutStyleProps;
}

export type InlineProps<E extends ElementType = "div"> = InlineOwnProps &
  PolymorphicProps<E>;

/**
 * Inline
 *
 * @deprecated Use `<Flex direction="row">` or the `<Row>` alias instead.
 * Inline will be removed in v2.0. For backward compatibility, it's still available
 * but new code should use Flex for all layout needs.
 *
 * Horizontal flex layout with consistent gap between children.
 *
 * @example
 * // Deprecated - old way
 * <Inline gap={3} align="center">
 *   <Icon />
 *   <Text>Label</Text>
 * </Inline>
 *
 * @example
 * // New way (recommended)
 * <Flex direction="row" gap={3} align="center">
 *   <Icon />
 *   <Text>Label</Text>
 * </Flex>
 * // Or use the Row alias
 * <Row gap={3} align="center">
 *   <Icon />
 *   <Text>Label</Text>
 * </Row>
 *
 * @example
 * <Inline gap={2} justify="between">
 *   <Text>Left</Text>
 *   <Text>Right</Text>
 * </Inline>
 */
export function Inline<E extends ElementType = "div">({
  as,
  children,
  gap,
  align,
  justify,
  wrap,
  className,
  style,
  ...rest
}: InlineProps<E>) {
  const Component = as || "div";

  const classes = cx(
    "st-Inline",
    ...responsiveClasses("st-Inline", "gap", gap),
    ...responsiveClasses("st-Inline", "align", align),
    ...responsiveClasses("st-Inline", "justify", justify),
    ...responsiveClasses("st-Inline", "wrap", wrap),
    className
  );

  return (
    <Component className={classes} style={style} {...rest}>
      {children}
    </Component>
  );
}
