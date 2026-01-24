/**
 * Color Utilities for staple-css
 *
 * This module provides:
 * - OKLCH color space conversions (perceptually uniform)
 * - Gamut clamping for display-safe colors
 * - WCAG and APCA contrast checking
 * - 12-step color ramp generation (Radix-like)
 * - Color harmony algorithms
 */

// OKLCH utilities
export {
  type RGB,
  type OKLAB,
  type OKLCH,
  rgbToOklab,
  oklabToRgb,
  rgbToOklch,
  oklchToRgb,
  oklabToOklch,
  oklchToOklab,
  hexToRgb,
  rgbToHex,
  hexToOklch,
  oklchToHex,
  clampToGamut,
  isInGamut,
  interpolateOklch,
} from "./oklch.js";

// Contrast utilities
export {
  relativeLuminance,
  wcagContrast,
  wcagContrastHex,
  wcagRating,
  apcaContrast,
  apcaContrastHex,
  apcaRating,
  bestTextColor,
  checkContrast,
  type ContrastResult,
} from "./contrast.js";

// Ramp generation
export {
  type RampOptions,
  type HarmonyType,
  type PresetTemplate,
  generateRamp,
  generateAlphaRamp,
  generateHarmony,
  generatePresetRamp,
  PRESET_TEMPLATES,
} from "./ramp.js";
