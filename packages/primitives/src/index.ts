/**
 * @staple-css/primitives
 *
 * Layout and typography primitives for staple-css.
 *
 * @example
 * ```ts
 * // Import CSS (requires @staple-css/tokens CSS loaded first)
 * import "@staple-css/primitives/primitives.css";
 *
 * // Import components
 * import { Box, Stack, Inline, Grid, Container, Text, Card } from "@staple-css/primitives";
 * ```
 */

// Components
export { Box } from "./Box.js";
export { Stack } from "./Stack.js";
export { Inline } from "./Inline.js";
export { Grid } from "./Grid.js";
export { Container } from "./Container.js";
export { Text } from "./Text.js";
export { Card } from "./Card.js";

// Types
export type { BoxProps, BoxOwnProps } from "./Box.js";
export type { StackProps, StackOwnProps } from "./Stack.js";
export type { InlineProps, InlineOwnProps } from "./Inline.js";
export type { GridProps, GridOwnProps } from "./Grid.js";
export type { ContainerProps, ContainerOwnProps } from "./Container.js";
export type { TextProps } from "./Text.js";
export type { CardProps } from "./Card.js";

// Shared types
export type {
  Space,
  Radius,
  Shadow,
  Size,
  Weight,
  Tone,
  Align,
  Justify,
  TextAlign,
  Leading,
  ContainerSize,
  GridCols,
  LayoutStyleProps,
} from "./types.js";

// Utility
export { cx } from "./cx.js";
