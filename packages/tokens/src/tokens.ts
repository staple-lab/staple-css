/**
 * Token Definitions
 *
 * These are the canonical token definitions for staple-css.
 * They are used to generate CSS variables and TypeScript types.
 */

// ============================================================================
// Space Scale (0-8)
// ============================================================================
export const spaceScale = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.5rem", // 24px
  6: "2rem", // 32px
  7: "3rem", // 48px
  8: "4rem", // 64px
} as const;

export type SpaceToken = keyof typeof spaceScale;

// ============================================================================
// Radius Scale (0-4)
// ============================================================================
export const radiusScale = {
  0: "0",
  1: "0.125rem", // 2px
  2: "0.25rem", // 4px
  3: "0.5rem", // 8px
  4: "1rem", // 16px
} as const;

export type RadiusToken = keyof typeof radiusScale;

// ============================================================================
// Box Shadow Scale (0-5) - Enterprise elevation system
// ============================================================================
export const boxShadowScale = {
  0: "none",
  1: "0 0.0625rem 0.125rem 0 rgb(0 0 0 / 0.05)",
  2: "0 0.25rem 0.375rem -0.0625rem rgb(0 0 0 / 0.1), 0 0.125rem 0.25rem -0.125rem rgb(0 0 0 / 0.1)",
  3: "0 0.5rem 0.75rem -0.1875rem rgb(0 0 0 / 0.1), 0 0.25rem 0.5rem -0.25rem rgb(0 0 0 / 0.1)",
  4: "0 1rem 1.5rem -0.375rem rgb(0 0 0 / 0.1), 0 0.5rem 1rem -0.375rem rgb(0 0 0 / 0.1)",
  5: "0 1.5rem 2rem -0.5rem rgb(0 0 0 / 0.1), 0 1rem 1.5rem -0.5rem rgb(0 0 0 / 0.1)",
} as const;

export type BoxShadowToken = keyof typeof boxShadowScale;

// Legacy alias for backwards compatibility
export const shadowScale = boxShadowScale;
export type ShadowToken = BoxShadowToken;

// ============================================================================
// Typography - Font Family
// ============================================================================
export const fontFamily = {
  sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
} as const;

export type FontFamilyToken = keyof typeof fontFamily;

// ============================================================================
// Typography - Font Size Scale (0-6)
// ============================================================================
export const fontSizeScale = {
  0: "0.75rem", // 12px - xs
  1: "0.875rem", // 14px - sm
  2: "1rem", // 16px - base
  3: "1.125rem", // 18px - lg
  4: "1.25rem", // 20px - xl
  5: "1.5rem", // 24px - 2xl
  6: "2rem", // 32px - 3xl
} as const;

export type FontSizeToken = keyof typeof fontSizeScale;

// ============================================================================
// Typography - Line Height
// ============================================================================
export const lineHeight = {
  tight: "1.25",
  normal: "1.5",
  relaxed: "1.75",
} as const;

export type LineHeightToken = keyof typeof lineHeight;

// ============================================================================
// Typography - Font Weight
// ============================================================================
export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export type FontWeightToken = keyof typeof fontWeight;

// ============================================================================
// Motion - Duration
// ============================================================================
export const duration = {
  instant: "75ms",      // Near-instant transitions
  fast: "150ms",        // Fast micro-interactions
  normal: "200ms",      // Standard transitions (Tailwind default)
  moderate: "300ms",    // Moderate transitions
  slow: "500ms",        // Slow, deliberate transitions
  slower: "700ms",      // Very slow transitions
  slowest: "1000ms",    // Ultra-slow, cinematic
} as const;

export type DurationToken = keyof typeof duration;

// ============================================================================
// Motion - Easing (Timing Functions)
// ============================================================================
export const easing = {
  // Standard easing curves
  default: "cubic-bezier(0.4, 0, 0.2, 1)",    // Tailwind default (ease-in-out variant)
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",           // Ease in (accelerate)
  out: "cubic-bezier(0, 0, 0.2, 1)",          // Ease out (decelerate)
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",      // Ease in-out (smooth both ends)

  // Expressive easing curves (Material Design inspired)
  emphasized: "cubic-bezier(0.2, 0, 0, 1)",   // Material emphasized
  standard: "cubic-bezier(0.4, 0, 0.2, 1)",   // Material standard
  decelerate: "cubic-bezier(0, 0, 0.2, 1)",   // Strong deceleration
  accelerate: "cubic-bezier(0.4, 0, 1, 1)",   // Strong acceleration

  // Snappy/bouncy effects
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",    // Bounce effect
  snap: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",        // Snappy feel
  elastic: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",      // Elastic/spring effect
} as const;

export type EasingToken = keyof typeof easing;

// ============================================================================
// Motion - Delays
// ============================================================================
export const delay = {
  0: "0ms",
  75: "75ms",
  100: "100ms",
  150: "150ms",
  200: "200ms",
  300: "300ms",
  500: "500ms",
  700: "700ms",
  1000: "1000ms",
} as const;

export type DelayToken = keyof typeof delay;

// ============================================================================
// Z-Index Scale (Layering)
// ============================================================================
export const zIndexScale = {
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
  max: "9999",
} as const;

export type ZIndexToken = keyof typeof zIndexScale;

// ============================================================================
// Opacity Scale (0-100)
// ============================================================================
export const opacityScale = {
  0: "0",
  5: "0.05",
  10: "0.1",
  20: "0.2",
  30: "0.3",
  40: "0.4",
  50: "0.5",
  60: "0.6",
  70: "0.7",
  80: "0.8",
  90: "0.9",
  100: "1",
} as const;

export type OpacityToken = keyof typeof opacityScale;

// ============================================================================
// Text Shadow Scale - For typography emphasis
// ============================================================================
export const textShadowScale = {
  none: "none",
  sm: "0 1px 2px rgb(0 0 0 / 0.05)",
  base: "0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)",
  md: "0 4px 6px rgb(0 0 0 / 0.1), 0 2px 4px rgb(0 0 0 / 0.06)",
  lg: "0 10px 15px rgb(0 0 0 / 0.1), 0 4px 6px rgb(0 0 0 / 0.05)",
} as const;

export type TextShadowToken = keyof typeof textShadowScale;

// ============================================================================
// Border Width Scale
// ============================================================================
export const borderWidthScale = {
  0: "0",
  1: "1px",
  2: "2px",
  3: "3px",
  4: "4px",
  8: "8px",
} as const;

export type BorderWidthToken = keyof typeof borderWidthScale;

// ============================================================================
// Max Width Scale
// ============================================================================
export const maxWidthScale = {
  xs: "20rem", // 320px
  sm: "24rem", // 384px
  md: "28rem", // 448px
  lg: "32rem", // 512px
  xl: "36rem", // 576px
  "2xl": "42rem", // 672px
  "3xl": "48rem", // 768px
  "4xl": "56rem", // 896px
  "5xl": "64rem", // 1024px
  "6xl": "72rem", // 1152px
  "7xl": "80rem", // 1280px
  prose: "65ch",
  full: "100%",
  screen: "100vw",
  none: "none",
} as const;

export type MaxWidthToken = keyof typeof maxWidthScale;

// ============================================================================
// Aspect Ratio Scale
// ============================================================================
export const aspectRatioScale = {
  square: "1 / 1",
  video: "16 / 9",
  portrait: "3 / 4",
  landscape: "4 / 3",
  wide: "21 / 9",
  golden: "1.618 / 1",
  auto: "auto",
} as const;

export type AspectRatioToken = keyof typeof aspectRatioScale;

// ============================================================================
// Letter Spacing Scale
// ============================================================================
export const letterSpacingScale = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;

export type LetterSpacingToken = keyof typeof letterSpacingScale;

// ============================================================================
// Line Clamp Scale
// ============================================================================
export const lineClampScale = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  none: "none",
} as const;

export type LineClampToken = keyof typeof lineClampScale;

// ============================================================================
// Outline Width Scale
// ============================================================================
export const outlineWidthScale = {
  0: "0",
  1: "1px",
  2: "2px",
  4: "4px",
  8: "8px",
} as const;

export type OutlineWidthToken = keyof typeof outlineWidthScale;

// ============================================================================
// Outline Offset Scale
// ============================================================================
export const outlineOffsetScale = {
  0: "0",
  1: "1px",
  2: "2px",
  4: "4px",
  8: "8px",
} as const;

export type OutlineOffsetToken = keyof typeof outlineOffsetScale;

// ============================================================================
// Blur Scale
// ============================================================================
export const blurScale = {
  0: "0",
  sm: "4px",
  md: "8px",
  lg: "16px",
  xl: "24px",
  "2xl": "40px",
  "3xl": "64px",
} as const;

export type BlurToken = keyof typeof blurScale;

// ============================================================================
// Brightness Scale
// ============================================================================
export const brightnessScale = {
  0: "0",
  50: "0.5",
  75: "0.75",
  90: "0.9",
  100: "1",
  110: "1.1",
  125: "1.25",
  150: "1.5",
  200: "2",
} as const;

export type BrightnessToken = keyof typeof brightnessScale;

// ============================================================================
// Contrast Scale
// ============================================================================
export const contrastScale = {
  0: "0",
  50: "0.5",
  75: "0.75",
  90: "0.9",
  100: "1",
  110: "1.1",
  125: "1.25",
  150: "1.5",
  200: "2",
} as const;

export type ContrastToken = keyof typeof contrastScale;

// ============================================================================
// Saturate Scale
// ============================================================================
export const saturateScale = {
  0: "0",
  50: "0.5",
  75: "0.75",
  90: "0.9",
  100: "1",
  110: "1.1",
  125: "1.25",
  150: "1.5",
  200: "2",
} as const;

export type SaturateToken = keyof typeof saturateScale;

// ============================================================================
// Scale (Transform) Scale
// ============================================================================
export const scaleScale = {
  0: "0",
  50: "0.5",
  75: "0.75",
  90: "0.9",
  95: "0.95",
  100: "1",
  105: "1.05",
  110: "1.1",
  125: "1.25",
  150: "1.5",
  200: "2",
} as const;

export type ScaleToken = keyof typeof scaleScale;

// ============================================================================
// Color Tokens (Semantic) - Light Theme
// ============================================================================
export const colorsLight = {
  // Backgrounds
  background: "#ffffff",
  surface: "#f9fafb",
  surfaceRaised: "#ffffff",

  // Text
  text: "#111827",
  textMuted: "#6b7280",
  textInverse: "#ffffff",

  // Borders
  border: "#e5e7eb",
  borderMuted: "#f3f4f6",

  // Primary
  primary: "#2563eb",
  primaryHover: "#1d4ed8",
  primaryText: "#ffffff",

  // Danger
  danger: "#dc2626",
  dangerHover: "#b91c1c",
  dangerText: "#ffffff",
  dangerSurface: "#fef2f2",

  // Warning
  warn: "#d97706",
  warnHover: "#b45309",
  warnText: "#ffffff",
  warnSurface: "#fffbeb",

  // Success
  success: "#16a34a",
  successHover: "#15803d",
  successText: "#ffffff",
  successSurface: "#f0fdf4",

  // Focus
  focus: "#2563eb",
  focusRing: "0 0 0 2px #ffffff, 0 0 0 4px #2563eb",
} as const;

// ============================================================================
// Color Tokens (Semantic) - Dark Theme
// ============================================================================
export const colorsDark = {
  // Backgrounds
  background: "#111827",
  surface: "#1f2937",
  surfaceRaised: "#374151",

  // Text
  text: "#f9fafb",
  textMuted: "#9ca3af",
  textInverse: "#111827",

  // Borders
  border: "#374151",
  borderMuted: "#1f2937",

  // Primary
  primary: "#3b82f6",
  primaryHover: "#60a5fa",
  primaryText: "#ffffff",

  // Danger
  danger: "#ef4444",
  dangerHover: "#f87171",
  dangerText: "#ffffff",
  dangerSurface: "#450a0a",

  // Warning
  warn: "#f59e0b",
  warnHover: "#fbbf24",
  warnText: "#111827",
  warnSurface: "#451a03",

  // Success
  success: "#22c55e",
  successHover: "#4ade80",
  successText: "#111827",
  successSurface: "#052e16",

  // Focus
  focus: "#3b82f6",
  focusRing: "0 0 0 2px #111827, 0 0 0 4px #3b82f6",
} as const;

export type ColorToken = keyof typeof colorsLight;

// ============================================================================
// Density - Comfortable
// ============================================================================
export const densityComfortable = {
  controlHeight: "2.5rem", // 40px
  controlPaddingX: "1rem", // 16px
  controlPaddingY: "0.5rem", // 8px
  cardPadding: "1.5rem", // 24px
  stackGap: "1rem", // 16px
  inlineGap: "0.75rem", // 12px
} as const;

// ============================================================================
// Density - Compact
// ============================================================================
export const densityCompact = {
  controlHeight: "2rem", // 32px
  controlPaddingX: "0.75rem", // 12px
  controlPaddingY: "0.25rem", // 4px
  cardPadding: "1rem", // 16px
  stackGap: "0.75rem", // 12px
  inlineGap: "0.5rem", // 8px
} as const;

export type DensityToken = keyof typeof densityComfortable;

// ============================================================================
// Display Values
// ============================================================================
export const displayScale = {
  block: "block",
  "inline-block": "inline-block",
  inline: "inline",
  flex: "flex",
  "inline-flex": "inline-flex",
  grid: "grid",
  "inline-grid": "inline-grid",
  none: "none",
  contents: "contents",
} as const;

export type DisplayToken = keyof typeof displayScale;

// ============================================================================
// Position Values
// ============================================================================
export const positionScale = {
  static: "static",
  relative: "relative",
  absolute: "absolute",
  fixed: "fixed",
  sticky: "sticky",
} as const;

export type PositionToken = keyof typeof positionScale;

// ============================================================================
// Overflow Values
// ============================================================================
export const overflowScale = {
  visible: "visible",
  hidden: "hidden",
  scroll: "scroll",
  auto: "auto",
  clip: "clip",
} as const;

export type OverflowToken = keyof typeof overflowScale;

// ============================================================================
// Flex Grow Scale
// ============================================================================
export const flexGrowScale = {
  0: "0",
  1: "1",
} as const;

export type FlexGrowToken = keyof typeof flexGrowScale;

// ============================================================================
// Flex Shrink Scale
// ============================================================================
export const flexShrinkScale = {
  0: "0",
  1: "1",
} as const;

export type FlexShrinkToken = keyof typeof flexShrinkScale;

// ============================================================================
// Order Scale (for flex items)
// ============================================================================
export const orderScale = {
  "-1": "-1",
  0: "0",
  1: "1",
  2: "2",
  3: "3",
} as const;

export type OrderToken = keyof typeof orderScale;

// ============================================================================
// Transform / Translate Scale - For positioning and animations
// ============================================================================
export const translateScale = {
  0: "0",
  1: "0.25rem",  // 4px
  2: "0.5rem",   // 8px
  3: "0.75rem",  // 12px
  4: "1rem",     // 16px
  5: "1.5rem",   // 24px
  6: "2rem",     // 32px
  "-1": "-0.25rem",
  "-2": "-0.5rem",
  "-3": "-0.75rem",
  "-4": "-1rem",
  "-5": "-1.5rem",
  "-6": "-2rem",
} as const;

export type TranslateToken = keyof typeof translateScale;

// ============================================================================
// Rotate Scale - For transform effects
// ============================================================================
export const rotateScale = {
  0: "0deg",
  45: "45deg",
  90: "90deg",
  180: "180deg",
  "-45": "-45deg",
  "-90": "-90deg",
} as const;

export type RotateToken = keyof typeof rotateScale;

// ============================================================================
// Backdrop Filter Scale - For frosted glass effects
// ============================================================================
export const backdropFilterScale = {
  none: "none",
  blur: "blur(20px)",
  "blur-sm": "blur(10px)",
  "blur-md": "blur(20px)",
  "blur-lg": "blur(40px)",
} as const;

export type BackdropFilterToken = keyof typeof backdropFilterScale;

// ============================================================================
// Inset Scale - For positioning (absolute/fixed)
// ============================================================================
export const insetScale = {
  0: "0",
  1: "0.25rem",  // 4px
  2: "0.5rem",   // 8px
  3: "0.75rem",  // 12px
  4: "1rem",     // 16px
  5: "1.5rem",   // 24px
  6: "2rem",     // 32px
  auto: "auto",
} as const;

export type InsetToken = keyof typeof insetScale;

// ============================================================================
// Cursor Values
// ============================================================================
export const cursorScale = {
  auto: "auto",
  default: "default",
  pointer: "pointer",
  wait: "wait",
  text: "text",
  move: "move",
  "not-allowed": "not-allowed",
  grab: "grab",
  grabbing: "grabbing",
} as const;

export type CursorToken = keyof typeof cursorScale;

// ============================================================================
// Text Transform Values
// ============================================================================
export const textTransformScale = {
  none: "none",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
} as const;

export type TextTransformToken = keyof typeof textTransformScale;

// ============================================================================
// White Space Values
// ============================================================================
export const whiteSpaceScale = {
  normal: "normal",
  nowrap: "nowrap",
  pre: "pre",
  "pre-line": "pre-line",
  "pre-wrap": "pre-wrap",
} as const;

export type WhiteSpaceToken = keyof typeof whiteSpaceScale;

// ============================================================================
// Object Fit Values
// ============================================================================
export const objectFitScale = {
  contain: "contain",
  cover: "cover",
  fill: "fill",
  none: "none",
  "scale-down": "scale-down",
} as const;

export type ObjectFitToken = keyof typeof objectFitScale;

// ============================================================================
// Gradient Definitions - Perceptually Smooth Color Gradients
// ============================================================================
export const gradients = {
  // Neutral gradients (grayscale/professional)
  neutralSoft: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
  neutralMedium: "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)",
  neutralBold: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",

  // Primary gradients (brand/action)
  primarySoft: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
  primaryMedium: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  primaryBold: "linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)",

  // Danger/Error gradients (alert/destructive)
  dangerSoft: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
  dangerMedium: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  dangerBold: "linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)",

  // Warning/Caution gradients
  warnSoft: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
  warnMedium: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  warnBold: "linear-gradient(135deg, #b45309 0%, #92400e 100%)",

  // Success/Positive gradients
  successSoft: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
  successMedium: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  successBold: "linear-gradient(135deg, #15803d 0%, #166534 100%)",

  // Vibrant multi-color gradients (design showcase)
  sunrise: "linear-gradient(90deg, #fbbf24 0%, #f97316 50%, #fb923c 100%)",
  sunset: "linear-gradient(90deg, #f97316 0%, #ec4899 50%, #d946ef 100%)",
  ocean: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #0d9488 100%)",
  forest: "linear-gradient(135deg, #16a34a 0%, #059669 50%, #047857 100%)",
  grape: "linear-gradient(135deg, #a855f7 0%, #d946ef 50%, #ec4899 100%)",
  mint: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #0ea5e9 100%)",

  // Diagonal overlays (for cards/sections)
  diagonalLight: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(249, 250, 251, 0.6) 100%)",
  diagonalDark: "linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.9) 100%)",

  // Animated-ready (can be used with background-position animation)
  shimmer: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
} as const;

export type GradientToken = keyof typeof gradients;

// ============================================================================
// Tone Variants (for primitives)
// ============================================================================
export const tones = ["neutral", "primary", "danger", "warn", "success"] as const;
export type ToneToken = (typeof tones)[number];

// ============================================================================
// All Tokens Export (for documentation)
// ============================================================================
export const tokens = {
  space: spaceScale,
  radius: radiusScale,
  shadow: shadowScale,
  boxShadow: boxShadowScale,
  textShadow: textShadowScale,
  zIndex: zIndexScale,
  opacity: opacityScale,
  borderWidth: borderWidthScale,
  maxWidth: maxWidthScale,
  aspectRatio: aspectRatioScale,
  letterSpacing: letterSpacingScale,
  lineClamp: lineClampScale,
  outlineWidth: outlineWidthScale,
  outlineOffset: outlineOffsetScale,
  blur: blurScale,
  brightness: brightnessScale,
  contrast: contrastScale,
  saturate: saturateScale,
  scale: scaleScale,
  translate: translateScale,
  rotate: rotateScale,
  backdropFilter: backdropFilterScale,
  inset: insetScale,
  display: displayScale,
  position: positionScale,
  overflow: overflowScale,
  flexGrow: flexGrowScale,
  flexShrink: flexShrinkScale,
  order: orderScale,
  cursor: cursorScale,
  textTransform: textTransformScale,
  whiteSpace: whiteSpaceScale,
  objectFit: objectFitScale,
  gradients,
  fontFamily,
  fontSize: fontSizeScale,
  lineHeight,
  fontWeight,
  duration,
  easing,
  delay,
  colors: {
    light: colorsLight,
    dark: colorsDark,
  },
  density: {
    comfortable: densityComfortable,
    compact: densityCompact,
  },
  tones,
} as const;

export type Tokens = typeof tokens;
