/**
 * OKLCH Color Space Utilities
 *
 * OKLCH is a perceptually uniform color space that provides:
 * - L: Lightness (0-1, where 0 is black and 1 is white)
 * - C: Chroma (0+, saturation/colorfulness)
 * - H: Hue (0-360 degrees)
 *
 * This module provides conversions between sRGB, OKLAB, and OKLCH,
 * with proper gamut clamping for display-safe colors.
 */

export interface RGB {
  r: number; // 0-255
  g: number;
  b: number;
}

export interface OKLAB {
  L: number; // 0-1
  a: number; // ~-0.4 to 0.4
  b: number; // ~-0.4 to 0.4
}

export interface OKLCH {
  L: number; // 0-1
  C: number; // 0+
  H: number; // 0-360
}

// Matrix type for 3x3 color transformation matrices
type Matrix3x3 = readonly [
  readonly [number, number, number],
  readonly [number, number, number],
  readonly [number, number, number],
];

// Linear sRGB to OKLAB matrix
const M1: Matrix3x3 = [
  [0.4122214708, 0.5363325363, 0.0514459929],
  [0.2119034982, 0.6806995451, 0.1073969566],
  [0.0883024619, 0.2817188376, 0.6299787005],
] as const;

const M2: Matrix3x3 = [
  [0.2104542553, 0.793617785, -0.0040720468],
  [1.9779984951, -2.428592205, 0.4505937099],
  [0.0259040371, 0.7827717662, -0.808675766],
] as const;

// OKLAB to linear sRGB matrix (inverse of M1 * M2)
const M1_INV: Matrix3x3 = [
  [1.0, 0.3963377774, 0.2158037573],
  [1.0, -0.1055613458, -0.0638541728],
  [1.0, -0.0894841775, -1.291485548],
] as const;

const M2_INV: Matrix3x3 = [
  [4.0767416621, -3.3077115913, 0.2309699292],
  [-1.2684380046, 2.6097574011, -0.3413193965],
  [-0.0041960863, -0.7034186147, 1.707614701],
] as const;

/**
 * Convert sRGB component to linear RGB
 */
function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

/**
 * Convert linear RGB component to sRGB
 */
function linearToSrgb(c: number): number {
  const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return Math.round(Math.max(0, Math.min(255, v * 255)));
}

/**
 * Convert RGB to OKLAB
 */
export function rgbToOklab(rgb: RGB): OKLAB {
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);

  const l = M1[0][0] * r + M1[0][1] * g + M1[0][2] * b;
  const m = M1[1][0] * r + M1[1][1] * g + M1[1][2] * b;
  const s = M1[2][0] * r + M1[2][1] * g + M1[2][2] * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return {
    L: M2[0][0] * l_ + M2[0][1] * m_ + M2[0][2] * s_,
    a: M2[1][0] * l_ + M2[1][1] * m_ + M2[1][2] * s_,
    b: M2[2][0] * l_ + M2[2][1] * m_ + M2[2][2] * s_,
  };
}

/**
 * Convert OKLAB to RGB
 */
export function oklabToRgb(lab: OKLAB): RGB {
  const l_ = M1_INV[0][0] * lab.L + M1_INV[0][1] * lab.a + M1_INV[0][2] * lab.b;
  const m_ = M1_INV[1][0] * lab.L + M1_INV[1][1] * lab.a + M1_INV[1][2] * lab.b;
  const s_ = M1_INV[2][0] * lab.L + M1_INV[2][1] * lab.a + M1_INV[2][2] * lab.b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const r = M2_INV[0][0] * l + M2_INV[0][1] * m + M2_INV[0][2] * s;
  const g = M2_INV[1][0] * l + M2_INV[1][1] * m + M2_INV[1][2] * s;
  const b = M2_INV[2][0] * l + M2_INV[2][1] * m + M2_INV[2][2] * s;

  return {
    r: linearToSrgb(r),
    g: linearToSrgb(g),
    b: linearToSrgb(b),
  };
}

/**
 * Convert OKLAB to OKLCH
 */
export function oklabToOklch(lab: OKLAB): OKLCH {
  const C = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  let H = Math.atan2(lab.b, lab.a) * (180 / Math.PI);
  if (H < 0) H += 360;

  return { L: lab.L, C, H };
}

/**
 * Convert OKLCH to OKLAB
 */
export function oklchToOklab(lch: OKLCH): OKLAB {
  const hRad = lch.H * (Math.PI / 180);
  return {
    L: lch.L,
    a: lch.C * Math.cos(hRad),
    b: lch.C * Math.sin(hRad),
  };
}

/**
 * Convert RGB to OKLCH
 */
export function rgbToOklch(rgb: RGB): OKLCH {
  return oklabToOklch(rgbToOklab(rgb));
}

/**
 * Convert OKLCH to RGB with gamut clamping
 */
export function oklchToRgb(lch: OKLCH): RGB {
  return oklabToRgb(oklchToOklab(lch));
}

/**
 * Check if an RGB color is within sRGB gamut
 */
export function isInGamut(rgb: RGB): boolean {
  return (
    rgb.r >= 0 && rgb.r <= 255 &&
    rgb.g >= 0 && rgb.g <= 255 &&
    rgb.b >= 0 && rgb.b <= 255
  );
}

/**
 * Clamp OKLCH color to sRGB gamut by reducing chroma
 * Uses binary search for efficiency
 */
export function clampToGamut(lch: OKLCH): OKLCH {
  // Handle edge cases
  if (lch.L <= 0) return { L: 0, C: 0, H: lch.H };
  if (lch.L >= 1) return { L: 1, C: 0, H: lch.H };
  if (lch.C <= 0) return { L: lch.L, C: 0, H: lch.H };

  // Check if already in gamut
  const rgb = oklchToRgb(lch);
  if (isInGamut(rgb)) return lch;

  // Binary search to find maximum chroma that fits in gamut
  let low = 0;
  let high = lch.C;
  const epsilon = 0.0001;

  while (high - low > epsilon) {
    const mid = (low + high) / 2;
    const testLch = { L: lch.L, C: mid, H: lch.H };
    const testRgb = oklchToRgb(testLch);

    if (isInGamut(testRgb)) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return { L: lch.L, C: low, H: lch.H };
}

/**
 * Parse hex color to RGB
 */
export function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result || result.length < 4) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  // We've verified the regex matched, so these captures exist
  const rHex = result[1] as string;
  const gHex = result[2] as string;
  const bHex = result[3] as string;
  return {
    r: parseInt(rHex, 16),
    g: parseInt(gHex, 16),
    b: parseInt(bHex, 16),
  };
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, "0");
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

/**
 * Parse hex to OKLCH
 */
export function hexToOklch(hex: string): OKLCH {
  return rgbToOklch(hexToRgb(hex));
}

/**
 * Convert OKLCH to hex with gamut clamping
 */
export function oklchToHex(lch: OKLCH): string {
  const clamped = clampToGamut(lch);
  return rgbToHex(oklchToRgb(clamped));
}

/**
 * Interpolate between two OKLCH colors
 */
export function interpolateOklch(
  start: OKLCH,
  end: OKLCH,
  t: number
): OKLCH {
  // Handle hue interpolation (shortest path)
  let hDiff = end.H - start.H;
  if (hDiff > 180) hDiff -= 360;
  if (hDiff < -180) hDiff += 360;

  let H = start.H + hDiff * t;
  if (H < 0) H += 360;
  if (H >= 360) H -= 360;

  return {
    L: start.L + (end.L - start.L) * t,
    C: start.C + (end.C - start.C) * t,
    H,
  };
}
