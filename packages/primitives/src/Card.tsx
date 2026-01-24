import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Space, Radius, Shadow, Tone } from "./types.js";
import { cx } from "./cx.js";

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
  /** Padding (space scale 0-8) */
  pad?: Space;
  /** Border radius (radius scale 0-4) */
  radius?: Radius;
  /** Box shadow (shadow scale 0-2) */
  shadow?: Shadow;
  /** Color tone */
  tone?: Exclude<Tone, "muted">;
  /** Additional class names */
  className?: string;
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
  ...rest
}: CardProps) {
  const classes = cx(
    "st-Card",
    `st-Card--pad-${pad}`,
    `st-Card--radius-${radius}`,
    shadow !== undefined && `st-Card--shadow-${shadow}`,
    tone && `st-Card--tone-${tone}`,
    className
  );

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
