import type { HTMLAttributes, ReactNode } from "react";
import type { Size, Weight, Tone, TextAlign, Leading, Responsive } from "./types.js";
import { cx } from "./cx.js";
import { responsiveClasses } from "./types.js";

/**
 * Allowed elements for Text
 */
type TextElement = "p" | "span" | "label" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Text Props
 */
export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  /** Content */
  children?: ReactNode;
  /** Render as different element */
  as?: TextElement;
  /** Font size (size scale 0-6), supports responsive values */
  size?: Responsive<Size>;
  /** Font weight, supports responsive values */
  weight?: Responsive<Weight>;
  /** Color tone, supports responsive values */
  tone?: Responsive<Tone>;
  /** Text alignment, supports responsive values */
  align?: Responsive<TextAlign>;
  /** Line height, supports responsive values */
  leading?: Responsive<Leading>;
  /** Use monospace font */
  mono?: boolean;
  /** Additional class names */
  className?: string;
}

/**
 * Text
 *
 * Typography primitive for paragraphs, labels, and inline text.
 *
 * @example
 * <Text>Default paragraph</Text>
 * <Text size={5} weight="bold">Large heading</Text>
 * <Text as="span" tone="muted" size={1}>Small muted text</Text>
 * <Text as="label" weight="medium">Form label</Text>
 */
export function Text({
  as: Component = "p",
  children,
  size,
  weight,
  tone,
  align,
  leading,
  mono,
  className,
  ...rest
}: TextProps) {
  const classes = cx(
    "st-Text",
    ...responsiveClasses("st-Text", "size", size),
    ...responsiveClasses("st-Text", "weight", weight),
    ...responsiveClasses("st-Text", "tone", tone),
    ...responsiveClasses("st-Text", "align", align),
    ...responsiveClasses("st-Text", "leading", leading),
    mono && "st-Text--mono",
    className
  );

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
