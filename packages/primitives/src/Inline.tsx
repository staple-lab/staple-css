import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import type { Space, Align, Justify, LayoutStyleProps } from "./types.js";
import { cx } from "./cx.js";

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
  /** Gap between children (space scale 0-8) */
  gap?: Space;
  /** Cross-axis alignment */
  align?: Align;
  /** Main-axis justification */
  justify?: Justify;
  /** Allow wrapping */
  wrap?: boolean;
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
 * Horizontal flex layout with consistent gap between children.
 *
 * @example
 * <Inline gap={3} align="center">
 *   <Icon />
 *   <Text>Label</Text>
 * </Inline>
 *
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
    gap !== undefined && `st-Inline--gap-${gap}`,
    align && `st-Inline--align-${align}`,
    justify && `st-Inline--justify-${justify}`,
    wrap && "st-Inline--wrap",
    className
  );

  return (
    <Component className={classes} style={style} {...rest}>
      {children}
    </Component>
  );
}
