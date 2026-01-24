import type { HTMLAttributes, ReactNode } from "react";
import type { Size, Weight, Tone, TextAlign, Leading } from "./types.js";
import { cx } from "./cx.js";

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
  /** Font size (size scale 0-6) */
  size?: Size;
  /** Font weight */
  weight?: Weight;
  /** Color tone */
  tone?: Tone;
  /** Text alignment */
  align?: TextAlign;
  /** Line height */
  leading?: Leading;
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
    size !== undefined && `st-Text--size-${size}`,
    weight && `st-Text--weight-${weight}`,
    tone && `st-Text--tone-${tone}`,
    align && `st-Text--align-${align}`,
    leading && `st-Text--leading-${leading}`,
    mono && "st-Text--mono",
    className
  );

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
