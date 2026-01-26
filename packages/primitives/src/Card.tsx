import type { ComponentPropsWithoutRef, ReactNode, CSSProperties } from "react";
import type { Space, Radius, Shadow, Tone, Responsive } from "./types.js";
import { cx } from "./cx.js";
import { responsiveClasses } from "./types.js";

/**
 * Allowed elements for Card
 */
type CardElement = "div" | "section" | "article" | "aside";

/**
 * Card Props
 */
export interface CardProps extends Omit<ComponentPropsWithoutRef<"div">, "style"> {
  /** Content */
  children?: ReactNode;
  /** Render as different element */
  as?: CardElement;
  /** Padding (space scale 0-8), supports responsive values */
  pad?: Responsive<Space>;
  /** Border radius (radius scale 0-4), supports responsive values */
  radius?: Responsive<Radius>;
  /** Box shadow (shadow scale 0-2), supports responsive values */
  shadow?: Responsive<Shadow>;
  /** Color tone, supports responsive values */
  tone?: Responsive<Exclude<Tone, "muted">>;
  /** Additional class names */
  className?: string;
  /** Inline styles (escape hatch for custom styling) */
  style?: CSSProperties;
}

/**
 * Card
 *
 * Surface wrapper for grouping related content.
 *
 * @example
 * <Card pad={5} radius={3}>
 *   <Stack gap={3}>
 *     <Text weight="semibold">Card Title</Text>
 *     <Text tone="muted">Card description</Text>
 *   </Stack>
 * </Card>
 *
 * <Card as="section" pad={4} tone="success" aria-label="Success message">
 *   <Text>Operation completed successfully!</Text>
 * </Card>
 */
export function Card({
  as: Component = "div",
  children,
  pad = 4,
  radius = 2,
  shadow,
  tone = "neutral",
  className,
  style,
  ...rest
}: CardProps) {
  const classes = cx(
    "st-Card",
    ...responsiveClasses("st-Card", "pad", pad),
    ...responsiveClasses("st-Card", "radius", radius),
    ...responsiveClasses("st-Card", "shadow", shadow),
    ...responsiveClasses("st-Card", "tone", tone),
    className
  );

  return (
    <Component className={classes} style={style} {...rest}>
      {children}
    </Component>
  );
}
