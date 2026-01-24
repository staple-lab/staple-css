/**
 * Contrast Checking Utilities
 *
 * Provides both WCAG 2.1 contrast ratio and APCA (Advanced Perceptual Contrast Algorithm)
 * for evaluating text readability on colored backgrounds.
 */

import type { RGB } from "./oklch.js";
import { hexToRgb } from "./oklch.js";

/**
 * Calculate relative luminance for WCAG
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function relativeLuminance(rgb: RGB): number {
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r = rsRGB <= 0.04045 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.04045 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.04045 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate WCAG 2.1 contrast ratio
 * Returns a value between 1 and 21
 *
 * WCAG Levels:
 * - AA Normal Text: >= 4.5
 * - AA Large Text: >= 3.0
 * - AAA Normal Text: >= 7.0
 * - AAA Large Text: >= 4.5
 */
export function wcagContrast(fg: RGB, bg: RGB): number {
  const L1 = relativeLuminance(fg);
  const L2 = relativeLuminance(bg);

  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * WCAG contrast from hex colors
 */
export function wcagContrastHex(fgHex: string, bgHex: string): number {
  return wcagContrast(hexToRgb(fgHex), hexToRgb(bgHex));
}

/**
 * Get WCAG rating for a contrast ratio
 */
export function wcagRating(ratio: number): "AAA" | "AA" | "AA Large" | "Fail" {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA Large";
  return "Fail";
}

/**
 * APCA (Advanced Perceptual Contrast Algorithm)
 *
 * APCA is more perceptually accurate than WCAG contrast ratio,
 * especially for colored text on colored backgrounds.
 *
 * Returns Lc (Lightness Contrast) value:
 * - Positive values: light text on dark background
 * - Negative values: dark text on light background
 *
 * Recommended minimums (absolute value):
 * - Body text (14-16px): Lc 75+
 * - Large text (24px+): Lc 60+
 * - Headlines: Lc 45+
 * - Placeholder/disabled: Lc 30+
 *
 * Reference: https://github.com/Myndex/SAPC-APCA
 */

// APCA constants
const SA98G = {
  mainTRC: 2.4,
  sRco: 0.2126729,
  sGco: 0.7151522,
  sBco: 0.0721750,
  normBG: 0.56,
  normTXT: 0.57,
  revTXT: 0.62,
  revBG: 0.65,
  blkThrs: 0.022,
  blkClmp: 1.414,
  scaleBoW: 1.14,
  scaleWoB: 1.14,
  loBoWthresh: 0.035991,
  loWoBthresh: 0.035991,
  loBoWfactor: 27.7847239587675,
  loWoBfactor: 27.7847239587675,
  loBoWoffset: 0.027,
  loWoBoffset: 0.027,
  loClip: 0.1,
  deltaYmin: 0.0005,
};

/**
 * Calculate APCA Lc (Lightness Contrast) value
 */
export function apcaContrast(textRgb: RGB, bgRgb: RGB): number {
  // Linearize sRGB
  const txtY =
    Math.pow(textRgb.r / 255, SA98G.mainTRC) * SA98G.sRco +
    Math.pow(textRgb.g / 255, SA98G.mainTRC) * SA98G.sGco +
    Math.pow(textRgb.b / 255, SA98G.mainTRC) * SA98G.sBco;

  const bgY =
    Math.pow(bgRgb.r / 255, SA98G.mainTRC) * SA98G.sRco +
    Math.pow(bgRgb.g / 255, SA98G.mainTRC) * SA98G.sGco +
    Math.pow(bgRgb.b / 255, SA98G.mainTRC) * SA98G.sBco;

  // Soft clamp black
  const txtYc = txtY > SA98G.blkThrs ? txtY : txtY + Math.pow(SA98G.blkThrs - txtY, SA98G.blkClmp);
  const bgYc = bgY > SA98G.blkThrs ? bgY : bgY + Math.pow(SA98G.blkThrs - bgY, SA98G.blkClmp);

  // Delta check
  if (Math.abs(bgYc - txtYc) < SA98G.deltaYmin) {
    return 0;
  }

  let SAPC: number;
  let outputContrast: number;

  // Calculate contrast
  if (bgYc > txtYc) {
    // Light background, dark text (normal polarity)
    SAPC = (Math.pow(bgYc, SA98G.normBG) - Math.pow(txtYc, SA98G.normTXT)) * SA98G.scaleBoW;
    outputContrast =
      SAPC < SA98G.loClip
        ? 0
        : SAPC < SA98G.loBoWthresh
        ? SAPC - SAPC * SA98G.loBoWfactor * SA98G.loBoWoffset
        : SAPC - SA98G.loBoWoffset;
  } else {
    // Dark background, light text (reverse polarity)
    SAPC = (Math.pow(bgYc, SA98G.revBG) - Math.pow(txtYc, SA98G.revTXT)) * SA98G.scaleWoB;
    outputContrast =
      SAPC > -SA98G.loClip
        ? 0
        : SAPC > -SA98G.loWoBthresh
        ? SAPC - SAPC * SA98G.loWoBfactor * SA98G.loWoBoffset
        : SAPC + SA98G.loWoBoffset;
  }

  return outputContrast * 100;
}

/**
 * APCA contrast from hex colors
 */
export function apcaContrastHex(textHex: string, bgHex: string): number {
  return apcaContrast(hexToRgb(textHex), hexToRgb(bgHex));
}

/**
 * Get APCA rating based on use case
 */
export function apcaRating(
  lc: number,
  useCase: "body" | "large" | "headline" | "placeholder" = "body"
): "Pass" | "Marginal" | "Fail" {
  const absLc = Math.abs(lc);

  const thresholds = {
    body: { pass: 75, marginal: 60 },
    large: { pass: 60, marginal: 45 },
    headline: { pass: 45, marginal: 30 },
    placeholder: { pass: 30, marginal: 15 },
  };

  const t = thresholds[useCase];
  if (absLc >= t.pass) return "Pass";
  if (absLc >= t.marginal) return "Marginal";
  return "Fail";
}

/**
 * Find the best text color (black or white) for a background
 */
export function bestTextColor(bgHex: string): "#000000" | "#ffffff" {
  const bg = hexToRgb(bgHex);
  const whiteContrast = Math.abs(apcaContrast({ r: 255, g: 255, b: 255 }, bg));
  const blackContrast = Math.abs(apcaContrast({ r: 0, g: 0, b: 0 }, bg));

  return whiteContrast > blackContrast ? "#ffffff" : "#000000";
}

/**
 * Contrast check result
 */
export interface ContrastResult {
  wcag: {
    ratio: number;
    rating: "AAA" | "AA" | "AA Large" | "Fail";
  };
  apca: {
    lc: number;
    rating: "Pass" | "Marginal" | "Fail";
  };
}

/**
 * Full contrast check between foreground and background
 */
export function checkContrast(
  fgHex: string,
  bgHex: string,
  apcaUseCase: "body" | "large" | "headline" | "placeholder" = "body"
): ContrastResult {
  const wcagRatio = wcagContrastHex(fgHex, bgHex);
  const apcaLc = apcaContrastHex(fgHex, bgHex);

  return {
    wcag: {
      ratio: Math.round(wcagRatio * 100) / 100,
      rating: wcagRating(wcagRatio),
    },
    apca: {
      lc: Math.round(apcaLc * 10) / 10,
      rating: apcaRating(apcaLc, apcaUseCase),
    },
  };
}
