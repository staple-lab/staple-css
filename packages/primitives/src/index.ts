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
 * import { Box, Flex, Row, Column, Grid, Container, Text, Card } from "@staple-css/primitives";
 * ```
 */

// Components
export { Box } from "./Box.js";
export { Flex, Row, Column } from "./Flex.js";
export { Grid } from "./Grid.js";
export { Container } from "./Container.js";
export { Text } from "./Text.js";
export { Card } from "./Card.js";

// Types
export type { BoxProps, BoxOwnProps } from "./Box.js";
export type { FlexProps, FlexOwnProps } from "./Flex.js";
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
  FlexDirection,
  FlexWrap,
  TextAlign,
  Leading,
  ContainerSize,
  GridCols,
  GridRows,
  GridAutoFlow,
  GridAutoRows,
  GridAutoColumns,
  PlaceItems,
  PlaceContent,
  GridSpan,
  Breakpoint,
  Responsive,
  LayoutStyleProps,
} from "./types.js";

// Type utilities
export { isResponsiveObject, responsiveClasses } from "./types.js";

// Utility
export { cx } from "./cx.js";
