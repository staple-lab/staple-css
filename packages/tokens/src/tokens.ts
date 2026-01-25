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
// Shadow Scale (0-2)
// ============================================================================
export const shadowScale = {
  0: "none",
  1: "0 0.0625rem 0.125rem 0 rgb(0 0 0 / 0.05)",
  2: "0 0.25rem 0.375rem -0.0625rem rgb(0 0 0 / 0.1), 0 0.125rem 0.25rem -0.125rem rgb(0 0 0 / 0.1)",
} as const;

export type ShadowToken = keyof typeof shadowScale;

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
  fast: "100ms",
  normal: "200ms",
  slow: "300ms",
} as const;

export type DurationToken = keyof typeof duration;

// ============================================================================
// Motion - Easing
// ============================================================================
export const easing = {
  default: "cubic-bezier(0.4, 0, 0.2, 1)",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export type EasingToken = keyof typeof easing;

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
  fontFamily,
  fontSize: fontSizeScale,
  lineHeight,
  fontWeight,
  duration,
  easing,
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
