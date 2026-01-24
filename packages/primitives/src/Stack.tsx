import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import type { Space, Align, LayoutStyleProps } from "./types.js";
import { cx } from "./cx.js";

/**
 * Props for polymorphic component
 */
type PolymorphicProps<E extends ElementType> = {
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, "as">;

/**
 * Stack Props
 */
export interface StackOwnProps {
  /** Content */
  children?: ReactNode;
  /** Gap between children (space scale 0-8) */
  gap?: Space;
  /** Cross-axis alignment */
  align?: Exclude<Align, "baseline">;
  /** Additional class names */
  className?: string;
  /**
   * Inline styles (escape hatch)
   * Only layout-related properties are allowed.
   */
  style?: LayoutStyleProps;
}

export type StackProps<E extends ElementType = "div"> = StackOwnProps &
  PolymorphicProps<E>;

/**
 * Stack
 *
 * Vertical flex layout with consistent gap between children.
 *
 * @example
 * <Stack gap={4}>
 *   <Text>First item</Text>
 *   <Text>Second item</Text>
 * </Stack>
 */
export function Stack<E extends ElementType = "div">({
  as,
  children,
  gap,
  align,
  className,
  style,
  ...rest
}: StackProps<E>) {
  const Component = as || "div";

  const classes = cx(
    "st-Stack",
    gap !== undefined && `st-Stack--gap-${gap}`,
    align && `st-Stack--align-${align}`,
    className
  );

  return (
    <Component className={classes} style={style} {...rest}>
      {children}
    </Component>
  );
}
