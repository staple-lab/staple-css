import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import type { ContainerSize, LayoutStyleProps, Responsive } from "./types.js";
import { cx } from "./cx.js";
import { responsiveClasses } from "./types.js";

/**
 * Props for polymorphic component
 */
type PolymorphicProps<E extends ElementType> = {
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, "as">;

/**
 * Container Props
 */
export interface ContainerOwnProps {
  /** Content */
  children?: ReactNode;
  /** Max-width size preset, supports responsive values */
  size?: Responsive<ContainerSize>;
  /** Additional class names */
  className?: string;
  /**
   * Inline styles (escape hatch)
   * Only layout-related properties are allowed.
   */
  style?: LayoutStyleProps;
}

export type ContainerProps<E extends ElementType = "div"> = ContainerOwnProps &
  PolymorphicProps<E>;

/**
 * Container
 *
 * Centered container with max-width and horizontal padding.
 *
 * @example
 * <Container size="lg">
 *   <Stack gap={6}>
 *     <Text size={5}>Page Title</Text>
 *     <Text>Content goes here...</Text>
 *   </Stack>
 * </Container>
 */
export function Container<E extends ElementType = "div">({
  as,
  children,
  size = "lg",
  className,
  style,
  ...rest
}: ContainerProps<E>) {
  const Component = as || "div";

  const classes = cx(
    "st-Container",
    ...responsiveClasses("st-Container", "size", size),
    className
  );

  return (
    <Component className={classes} style={style} {...rest}>
      {children}
    </Component>
  );
}
