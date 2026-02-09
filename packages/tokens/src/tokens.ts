/**
 * Token Definitions
 *
 * These are the canonical token definitions for staple-css.
 * They are used to generate CSS variables and TypeScript types.
 */

// ============================================================================
// Space Scale (0-64, based on 4px unit)
// ============================================================================
export const spaceScale = {
  0: "0",
  px: "1px",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  28: "7rem", // 112px
  32: "8rem", // 128px
  36: "9rem", // 144px
  40: "10rem", // 160px
  44: "11rem", // 176px
  48: "12rem", // 192px
  52: "13rem", // 208px
  56: "14rem", // 224px
  60: "15rem", // 240px
  64: "16rem", // 256px
} as const;

export type SpaceToken = keyof typeof spaceScale;

// ============================================================================
// Size Scale (0-96, fixed values)
// For width, height, min-width, min-height, max-width, max-height
// ============================================================================
export const sizeScale = {
  // Fixed sizes (matching spacing scale)
  0: "0",
  px: "1px",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  28: "7rem", // 112px
  32: "8rem", // 128px
  36: "9rem", // 144px
  40: "10rem", // 160px
  44: "11rem", // 176px
  48: "12rem", // 192px
  52: "13rem", // 208px
  56: "14rem", // 224px
  60: "15rem", // 240px
  64: "16rem", // 256px
  72: "18rem", // 288px
  80: "20rem", // 320px
  96: "24rem", // 384px
} as const;

export type SizeToken = keyof typeof sizeScale;

// ============================================================================
// Size Scale - Relative (percentage & keyword values)
// ============================================================================
export const sizeRelativeScale = {
  auto: "auto",
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666667%",
  "2/6": "33.333333%",
  "3/6": "50%",
  "4/6": "66.666667%",
  "5/6": "83.333333%",
  "1/12": "8.333333%",
  "2/12": "16.666667%",
  "3/12": "25%",
  "4/12": "33.333333%",
  "5/12": "41.666667%",
  "6/12": "50%",
  "7/12": "58.333333%",
  "8/12": "66.666667%",
  "9/12": "75%",
  "10/12": "83.333333%",
  "11/12": "91.666667%",
  full: "100%",
  screen: "100vw",
  svw: "100svw",
  lvw: "100lvw",
  dvw: "100dvw",
  min: "min-content",
  max: "max-content",
  fit: "fit-content",
} as const;

export type SizeRelativeToken = keyof typeof sizeRelativeScale;

// ============================================================================
// Height-specific relative values
// ============================================================================
export const heightRelativeScale = {
  auto: "auto",
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666667%",
  "2/6": "33.333333%",
  "3/6": "50%",
  "4/6": "66.666667%",
  "5/6": "83.333333%",
  full: "100%",
  screen: "100vh",
  svh: "100svh",
  lvh: "100lvh",
  dvh: "100dvh",
  min: "min-content",
  max: "max-content",
  fit: "fit-content",
} as const;

export type HeightRelativeToken = keyof typeof heightRelativeScale;

// ============================================================================
// Radius Scale (none to full)
// ============================================================================
export const radiusScale = {
  none: "0",
  sm: "0.125rem", // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px", // pill/circle
  // Numeric aliases for backwards compatibility
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
// Typography - Font Size Scale (xs to 9xl)
// ============================================================================
export const fontSizeScale = {
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  base: "1rem", // 16px
  lg: "1.125rem", // 18px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem", // 48px
  "6xl": "3.75rem", // 60px
  "7xl": "4.5rem", // 72px
  "8xl": "6rem", // 96px
  "9xl": "8rem", // 128px
  // Numeric aliases for backwards compatibility
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
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "1.75",
  // Numeric values for precise control
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
} as const;

export type LineHeightToken = keyof typeof lineHeight;

// ============================================================================
// Typography - Font Weight (100-900)
// ============================================================================
export const fontWeight = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
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
// SEMANTIC COLOR TOKENS - Light Theme
// ============================================================================

// Color: Text (Light)
export const colorTextLight = {
  primary: "#111827", // Main content text
  secondary: "#4b5563", // Supporting text
  tertiary: "#6b7280", // Placeholder, captions
  disabled: "#9ca3af", // Disabled state
  inverse: "#ffffff", // Text on dark backgrounds
  link: "#2563eb", // Link text
  linkHover: "#1d4ed8", // Link hover
  linkVisited: "#7c3aed", // Visited link
  onPrimary: "#ffffff", // Text on primary color
  onDestructive: "#ffffff", // Text on destructive color
  onSuccess: "#ffffff", // Text on success color
  onWarning: "#111827", // Text on warning color (dark for contrast)
  onInfo: "#ffffff", // Text on info color
} as const;

export type ColorTextToken = keyof typeof colorTextLight;

// Color: Background (Light)
export const colorBgLight = {
  primary: "#ffffff", // Main page background
  secondary: "#f9fafb", // Secondary/subtle background
  tertiary: "#f3f4f6", // Third level background
  elevated: "#ffffff", // Cards, modals (with shadow)
  sunken: "#f3f4f6", // Inset areas, wells
  hover: "#f9fafb", // Hover state background
  active: "#f3f4f6", // Active/pressed state
  selected: "#eff6ff", // Selected items
  disabled: "#f9fafb", // Disabled elements
  overlay: "rgba(0, 0, 0, 0.5)", // Modal/dialog backdrop
  inverse: "#111827", // Inverted background
  scrim: "rgba(0, 0, 0, 0.3)", // Light overlay/scrim
} as const;

export type ColorBgToken = keyof typeof colorBgLight;

// Color: Border (Light)
export const colorBorderLight = {
  default: "#e5e7eb", // Standard borders
  subtle: "#f3f4f6", // Subtle/light borders
  strong: "#d1d5db", // Emphasized borders
  focus: "#2563eb", // Focus ring color
  error: "#dc2626", // Error state border
  success: "#16a34a", // Success state border
  warning: "#d97706", // Warning state border
  info: "#0284c7", // Info state border
  interactive: "#d1d5db", // Interactive element borders
  interactiveHover: "#9ca3af", // Interactive hover
  disabled: "#e5e7eb", // Disabled border
  inverse: "#374151", // Inverse border
} as const;

export type ColorBorderToken = keyof typeof colorBorderLight;

// Color: Interactive (Light)
export const colorInteractiveLight = {
  primary: "#2563eb", // Primary action
  primaryHover: "#1d4ed8", // Primary hover
  primaryActive: "#1e40af", // Primary pressed
  primaryDisabled: "#93c5fd", // Primary disabled
  secondary: "#f3f4f6", // Secondary action background
  secondaryHover: "#e5e7eb", // Secondary hover
  secondaryActive: "#d1d5db", // Secondary pressed
  destructive: "#dc2626", // Destructive action
  destructiveHover: "#b91c1c", // Destructive hover
  destructiveActive: "#991b1b", // Destructive pressed
  ghost: "transparent", // Ghost button background
  ghostHover: "#f3f4f6", // Ghost hover
  ghostActive: "#e5e7eb", // Ghost pressed
} as const;

export type ColorInteractiveToken = keyof typeof colorInteractiveLight;

// Color: Feedback (Light) - Error, Warning, Success, Info
export const colorFeedbackLight = {
  // Error
  errorText: "#dc2626",
  errorBg: "#fef2f2",
  errorBgSubtle: "#fef2f2",
  errorBorder: "#fecaca",
  errorIcon: "#dc2626",
  // Warning
  warningText: "#d97706",
  warningBg: "#fffbeb",
  warningBgSubtle: "#fffbeb",
  warningBorder: "#fde68a",
  warningIcon: "#d97706",
  // Success
  successText: "#16a34a",
  successBg: "#f0fdf4",
  successBgSubtle: "#f0fdf4",
  successBorder: "#bbf7d0",
  successIcon: "#16a34a",
  // Info
  infoText: "#0284c7",
  infoBg: "#f0f9ff",
  infoBgSubtle: "#f0f9ff",
  infoBorder: "#bae6fd",
  infoIcon: "#0284c7",
} as const;

export type ColorFeedbackToken = keyof typeof colorFeedbackLight;

// Color: Icon (Light)
export const colorIconLight = {
  primary: "#374151", // Primary icons
  secondary: "#6b7280", // Secondary icons
  tertiary: "#9ca3af", // Tertiary/muted icons
  disabled: "#d1d5db", // Disabled icons
  interactive: "#2563eb", // Clickable icons
  interactiveHover: "#1d4ed8", // Clickable icon hover
  inverse: "#ffffff", // Icons on dark backgrounds
  onPrimary: "#ffffff", // Icons on primary color
  error: "#dc2626", // Error icons
  success: "#16a34a", // Success icons
  warning: "#d97706", // Warning icons
  info: "#0284c7", // Info icons
} as const;

export type ColorIconToken = keyof typeof colorIconLight;

// Color: Focus (Light)
export const colorFocusLight = {
  ring: "#2563eb", // Focus ring color
  ringOffset: "#ffffff", // Focus ring offset (background showing through)
  ringWidth: "2px", // Focus ring width
  ringOffsetWidth: "2px", // Focus ring offset width
} as const;

export type ColorFocusToken = keyof typeof colorFocusLight;

// ============================================================================
// SEMANTIC COLOR TOKENS - Dark Theme
// ============================================================================

// Color: Text (Dark)
export const colorTextDark = {
  primary: "#f9fafb",
  secondary: "#d1d5db",
  tertiary: "#9ca3af",
  disabled: "#6b7280",
  inverse: "#111827",
  link: "#60a5fa",
  linkHover: "#93c5fd",
  linkVisited: "#a78bfa",
  onPrimary: "#ffffff",
  onDestructive: "#ffffff",
  onSuccess: "#111827",
  onWarning: "#111827",
  onInfo: "#ffffff",
} as const;

// Color: Background (Dark)
export const colorBgDark = {
  primary: "#111827",
  secondary: "#1f2937",
  tertiary: "#374151",
  elevated: "#1f2937",
  sunken: "#0f172a",
  hover: "#1f2937",
  active: "#374151",
  selected: "#1e3a5f",
  disabled: "#1f2937",
  overlay: "rgba(0, 0, 0, 0.7)",
  inverse: "#ffffff",
  scrim: "rgba(0, 0, 0, 0.5)",
} as const;

// Color: Border (Dark)
export const colorBorderDark = {
  default: "#374151",
  subtle: "#1f2937",
  strong: "#4b5563",
  focus: "#3b82f6",
  error: "#ef4444",
  success: "#22c55e",
  warning: "#f59e0b",
  info: "#0ea5e9",
  interactive: "#4b5563",
  interactiveHover: "#6b7280",
  disabled: "#374151",
  inverse: "#e5e7eb",
} as const;

// Color: Interactive (Dark)
export const colorInteractiveDark = {
  primary: "#3b82f6",
  primaryHover: "#60a5fa",
  primaryActive: "#2563eb",
  primaryDisabled: "#1e40af",
  secondary: "#374151",
  secondaryHover: "#4b5563",
  secondaryActive: "#6b7280",
  destructive: "#ef4444",
  destructiveHover: "#f87171",
  destructiveActive: "#dc2626",
  ghost: "transparent",
  ghostHover: "#374151",
  ghostActive: "#4b5563",
} as const;

// Color: Feedback (Dark)
export const colorFeedbackDark = {
  errorText: "#f87171",
  errorBg: "#450a0a",
  errorBgSubtle: "#7f1d1d",
  errorBorder: "#991b1b",
  errorIcon: "#f87171",
  warningText: "#fbbf24",
  warningBg: "#451a03",
  warningBgSubtle: "#78350f",
  warningBorder: "#92400e",
  warningIcon: "#fbbf24",
  successText: "#4ade80",
  successBg: "#052e16",
  successBgSubtle: "#14532d",
  successBorder: "#166534",
  successIcon: "#4ade80",
  infoText: "#38bdf8",
  infoBg: "#0c4a6e",
  infoBgSubtle: "#075985",
  infoBorder: "#0369a1",
  infoIcon: "#38bdf8",
} as const;

// Color: Icon (Dark)
export const colorIconDark = {
  primary: "#e5e7eb",
  secondary: "#9ca3af",
  tertiary: "#6b7280",
  disabled: "#4b5563",
  interactive: "#60a5fa",
  interactiveHover: "#93c5fd",
  inverse: "#111827",
  onPrimary: "#ffffff",
  error: "#f87171",
  success: "#4ade80",
  warning: "#fbbf24",
  info: "#38bdf8",
} as const;

// Color: Focus (Dark)
export const colorFocusDark = {
  ring: "#3b82f6",
  ringOffset: "#111827",
  ringWidth: "2px",
  ringOffsetWidth: "2px",
} as const;

// ============================================================================
// Combined Color Tokens (Legacy compatibility)
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
// SEMANTIC SPACING TOKENS
// ============================================================================

// Spacing: Component (padding and gap for UI components)
export const spacingComponent = {
  // Padding sizes (for buttons, inputs, cards, etc.)
  paddingXs: "0.25rem", // 4px
  paddingSm: "0.5rem", // 8px
  paddingMd: "0.75rem", // 12px
  paddingLg: "1rem", // 16px
  paddingXl: "1.5rem", // 24px
  padding2xl: "2rem", // 32px

  // Gap sizes (for flex/grid children)
  gapXs: "0.25rem", // 4px
  gapSm: "0.5rem", // 8px
  gapMd: "0.75rem", // 12px
  gapLg: "1rem", // 16px
  gapXl: "1.5rem", // 24px
  gap2xl: "2rem", // 32px
} as const;

export type SpacingComponentToken = keyof typeof spacingComponent;

// Spacing: Layout (page-level and section spacing)
export const spacingLayout = {
  // Page margins (responsive-ready)
  pageMarginMobile: "1rem", // 16px
  pageMarginTablet: "1.5rem", // 24px
  pageMarginDesktop: "2rem", // 32px

  // Section spacing (vertical rhythm)
  sectionXs: "1.5rem", // 24px
  sectionSm: "2rem", // 32px
  sectionMd: "3rem", // 48px
  sectionLg: "4rem", // 64px
  sectionXl: "6rem", // 96px

  // Stack spacing (vertical content flow)
  stackXs: "0.5rem", // 8px
  stackSm: "0.75rem", // 12px
  stackMd: "1rem", // 16px
  stackLg: "1.5rem", // 24px
  stackXl: "2rem", // 32px

  // Gutter (column/grid gutters)
  gutterSm: "1rem", // 16px
  gutterMd: "1.5rem", // 24px
  gutterLg: "2rem", // 32px
} as const;

export type SpacingLayoutToken = keyof typeof spacingLayout;

// Spacing: Inset (uniform and asymmetric padding patterns)
export const spacingInset = {
  // Uniform (equal on all sides)
  uniformXs: "0.25rem", // 4px
  uniformSm: "0.5rem", // 8px
  uniformMd: "1rem", // 16px
  uniformLg: "1.5rem", // 24px
  uniformXl: "2rem", // 32px

  // Squish (less vertical, more horizontal - for buttons)
  squishSmX: "0.75rem", // 12px horizontal
  squishSmY: "0.25rem", // 4px vertical
  squishMdX: "1rem", // 16px horizontal
  squishMdY: "0.5rem", // 8px vertical
  squishLgX: "1.5rem", // 24px horizontal
  squishLgY: "0.75rem", // 12px vertical

  // Stretch (more vertical, less horizontal - for stacked content)
  stretchSmX: "0.5rem", // 8px horizontal
  stretchSmY: "0.75rem", // 12px vertical
  stretchMdX: "0.75rem", // 12px horizontal
  stretchMdY: "1rem", // 16px vertical
  stretchLgX: "1rem", // 16px horizontal
  stretchLgY: "1.5rem", // 24px vertical
} as const;

export type SpacingInsetToken = keyof typeof spacingInset;

// ============================================================================
// SEMANTIC SIZING TOKENS
// ============================================================================

// Sizing: Icons
export const sizingIcon = {
  xs: "0.75rem", // 12px
  sm: "1rem", // 16px
  md: "1.25rem", // 20px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "2.5rem", // 40px
  "3xl": "3rem", // 48px
} as const;

export type SizingIconToken = keyof typeof sizingIcon;

// Sizing: Avatars
export const sizingAvatar = {
  xs: "1.5rem", // 24px
  sm: "2rem", // 32px
  md: "2.5rem", // 40px
  lg: "3rem", // 48px
  xl: "4rem", // 64px
  "2xl": "5rem", // 80px
  "3xl": "6rem", // 96px
} as const;

export type SizingAvatarToken = keyof typeof sizingAvatar;

// Sizing: Form Controls (inputs, buttons, selects)
export const sizingControl = {
  // Heights
  heightXs: "1.5rem", // 24px - compact
  heightSm: "2rem", // 32px - small
  heightMd: "2.5rem", // 40px - default
  heightLg: "3rem", // 48px - large
  heightXl: "3.5rem", // 56px - extra large

  // Min widths for buttons
  minWidthSm: "4rem", // 64px
  minWidthMd: "5rem", // 80px
  minWidthLg: "6rem", // 96px

  // Touch target minimum (accessibility)
  touchTarget: "2.75rem", // 44px (iOS guideline)
} as const;

export type SizingControlToken = keyof typeof sizingControl;

// Sizing: Layout Containers
export const sizingContainer = {
  // Max widths for content containers
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
  prose: "65ch", // Optimal reading width
  full: "100%",

  // Common component widths
  sidebar: "16rem", // 256px
  sidebarWide: "20rem", // 320px
  modal: "32rem", // 512px
  modalWide: "48rem", // 768px
  dropdown: "12rem", // 192px
  dropdownWide: "16rem", // 256px
} as const;

export type SizingContainerToken = keyof typeof sizingContainer;

// Sizing: Border Radius per component type
export const sizingRadius = {
  // Element-specific radii
  button: "0.375rem", // 6px
  buttonPill: "9999px",
  input: "0.375rem", // 6px
  card: "0.5rem", // 8px
  cardLg: "0.75rem", // 12px
  modal: "0.75rem", // 12px
  tooltip: "0.25rem", // 4px
  badge: "0.25rem", // 4px
  badgePill: "9999px",
  avatar: "9999px", // Circular
  avatarSquare: "0.375rem", // 6px
  tag: "0.25rem", // 4px
  tagPill: "9999px",
} as const;

export type SizingRadiusToken = keyof typeof sizingRadius;

// ============================================================================
// SEMANTIC Z-INDEX TOKENS
// ============================================================================
export const zIndexSemantic = {
  hide: "-1", // Hidden below content
  base: "0", // Default stacking
  raised: "1", // Slightly elevated
  dropdown: "1000", // Dropdown menus
  sticky: "1100", // Sticky headers/elements
  overlay: "1200", // Overlay backgrounds
  modal: "1300", // Modal dialogs
  popover: "1400", // Popovers, tooltips
  toast: "1500", // Toast notifications
  tooltip: "1600", // Tooltips (highest interactive)
  max: "9999", // Emergency override
} as const;

export type ZIndexSemanticToken = keyof typeof zIndexSemantic;

// ============================================================================
// SEMANTIC MOTION TOKENS
// ============================================================================

// Motion: Durations (semantic naming)
export const motionDuration = {
  instant: "0ms", // No animation
  fastest: "50ms", // Micro-interactions (hover color)
  fast: "100ms", // Quick feedback
  normal: "150ms", // Default transitions
  moderate: "200ms", // Standard animations
  slow: "300ms", // Deliberate animations
  slower: "400ms", // Emphasized animations
  slowest: "500ms", // Complex/large animations

  // Semantic durations
  fade: "150ms", // Fade in/out
  scale: "200ms", // Scale transforms
  slide: "250ms", // Slide in/out
  expand: "300ms", // Expand/collapse
  page: "400ms", // Page transitions
} as const;

export type MotionDurationToken = keyof typeof motionDuration;

// Motion: Easing (semantic naming)
export const motionEasing = {
  // Standard curves
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",

  // Production curves (more refined)
  standard: "cubic-bezier(0.4, 0, 0.2, 1)", // General purpose
  entrance: "cubic-bezier(0, 0, 0.2, 1)", // Elements entering
  exit: "cubic-bezier(0.4, 0, 1, 1)", // Elements leaving
  emphasized: "cubic-bezier(0.2, 0, 0, 1)", // Attention-grabbing
  overshoot: "cubic-bezier(0.34, 1.56, 0.64, 1)", // Playful bounce
  spring: "cubic-bezier(0.5, 1.5, 0.5, 1)", // Spring effect

  // Specific use cases
  buttonPress: "cubic-bezier(0.4, 0, 0.6, 1)", // Button feedback
  modalOpen: "cubic-bezier(0, 0, 0.2, 1)", // Modal appearance
  modalClose: "cubic-bezier(0.4, 0, 1, 1)", // Modal dismissal
  tooltip: "cubic-bezier(0.4, 0, 0.2, 1)", // Tooltip fade
} as const;

export type MotionEasingToken = keyof typeof motionEasing;

// Motion: Composed Transitions (common patterns)
export const motionTransition = {
  // Common property transitions
  colors: "color 150ms ease, background-color 150ms ease, border-color 150ms ease",
  opacity: "opacity 150ms ease",
  shadow: "box-shadow 200ms ease",
  transform: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
  all: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",

  // Component-specific
  button: "background-color 150ms ease, border-color 150ms ease, color 150ms ease, box-shadow 150ms ease, transform 100ms ease",
  input: "border-color 150ms ease, box-shadow 150ms ease",
  card: "box-shadow 200ms ease, transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
  link: "color 150ms ease, text-decoration-color 150ms ease",
  modal: "opacity 200ms cubic-bezier(0, 0, 0.2, 1), transform 200ms cubic-bezier(0, 0, 0.2, 1)",
  dropdown: "opacity 150ms ease, transform 150ms cubic-bezier(0, 0, 0.2, 1)",
  tooltip: "opacity 100ms ease",
  toast: "opacity 200ms ease, transform 200ms cubic-bezier(0, 0, 0.2, 1)",
} as const;

export type MotionTransitionToken = keyof typeof motionTransition;

// ============================================================================
// SEMANTIC OPACITY TOKENS
// ============================================================================
export const opacitySemantic = {
  transparent: "0",
  disabled: "0.5", // Disabled elements
  placeholder: "0.6", // Placeholder text
  secondary: "0.7", // Secondary content
  hover: "0.8", // Hover overlays
  ghost: "0.1", // Ghost button backgrounds
  loading: "0.6", // Loading state
  overlay: "0.5", // Modal overlays
  overlayDark: "0.7", // Darker overlays
  scrim: "0.3", // Light scrims
  full: "1",
} as const;

export type OpacitySemanticToken = keyof typeof opacitySemantic;

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
  // Primitive scales
  space: spaceScale,
  size: sizeScale,
  sizeRelative: sizeRelativeScale,
  heightRelative: heightRelativeScale,
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

  // Legacy color tokens (for backwards compatibility)
  colors: {
    light: colorsLight,
    dark: colorsDark,
  },

  // Semantic color tokens
  colorText: {
    light: colorTextLight,
    dark: colorTextDark,
  },
  colorBg: {
    light: colorBgLight,
    dark: colorBgDark,
  },
  colorBorder: {
    light: colorBorderLight,
    dark: colorBorderDark,
  },
  colorInteractive: {
    light: colorInteractiveLight,
    dark: colorInteractiveDark,
  },
  colorFeedback: {
    light: colorFeedbackLight,
    dark: colorFeedbackDark,
  },
  colorIcon: {
    light: colorIconLight,
    dark: colorIconDark,
  },
  colorFocus: {
    light: colorFocusLight,
    dark: colorFocusDark,
  },

  // Semantic spacing tokens
  spacingComponent,
  spacingLayout,
  spacingInset,

  // Semantic sizing tokens
  sizingIcon,
  sizingAvatar,
  sizingControl,
  sizingContainer,
  sizingRadius,

  // Semantic z-index
  zIndexSemantic,

  // Semantic motion tokens
  motionDuration,
  motionEasing,
  motionTransition,

  // Semantic opacity
  opacitySemantic,

  // Density variants
  density: {
    comfortable: densityComfortable,
    compact: densityCompact,
  },
  tones,
} as const;

export type Tokens = typeof tokens;
