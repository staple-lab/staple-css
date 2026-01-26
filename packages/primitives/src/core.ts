/**
 * @staple-css/primitives/core
 *
 * Minimal core export: Box, Flex, Text only.
 * Perfect for ultra-lightweight applications.
 *
 * Bundle size: ~2.5 KB gzip (vs 8.23 KB for full)
 *
 * @example
 * ```ts
 * // Import minimal CSS
 * import "@staple-css/tokens/core.css";
 * import "@staple-css/primitives/core.css";
 *
 * // Import core components
 * import { Box, Flex, Text } from "@staple-css/primitives/core";
 *
 * // Build complex layouts with just 3 components
 * export function App() {
 *   return (
 *     <Flex direction="column" gap={4} pad={4}>
 *       <Text as="h1" size={6} weight="bold">Hello</Text>
 *       <Box>Any content here</Box>
 *     </Flex>
 *   );
 * }
 * ```
 */

// Core components only
export { Box } from "./Box.js";
export { Flex, Row, Column } from "./Flex.js";
export { Text } from "./Text.js";

// Types
export type { BoxProps, BoxOwnProps } from "./Box.js";
export type { FlexProps, FlexOwnProps } from "./Flex.js";
export type { TextProps } from "./Text.js";

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
  Breakpoint,
  Responsive,
  LayoutStyleProps,
} from "./types.js";

// Utility
export { cx } from "./cx.js";
