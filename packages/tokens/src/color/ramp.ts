/**
 * Color Ramp Generator
 *
 * Generates 12-step color scales similar to Radix Colors,
 * using OKLCH for perceptual uniformity.
 *
 * Step usage (Radix convention):
 * 1-2: App/subtle backgrounds
 * 3-5: Component backgrounds (hover, active)
 * 6-8: Borders
 * 9: Solid backgrounds (main brand color)
 * 10: Solid hover
 * 11: Low contrast text
 * 12: High contrast text
 */

import type { OKLCH } from "./oklch.js";
import { hexToOklch, oklchToHex, clampToGamut } from "./oklch.js";

export interface RampOptions {
  /** Base color as hex (will be mapped to step 9) */
  baseColor: string;
  /** Number of steps (8, 10, or 12) */
  steps?: 8 | 10 | 12;
  /** Chroma multiplier (0.5 = muted, 1.0 = normal, 1.5 = vibrant) */
  chromaScale?: number;
  /** Warm/cool bias (-1 to 1, shifts hue) */
  hueBias?: number;
  /** Generate for dark mode */
  darkMode?: boolean;
  /** Lock specific steps to custom values */
  lockedSteps?: Partial<Record<number, string>>;
}

/**
 * Lightness targets for each step (12-step scale)
 * Based on Radix Colors patterns
 */
const LIGHTNESS_TARGETS_LIGHT = {
  1: 0.99,  // Near white
  2: 0.98,  // Subtle background
  3: 0.96,  // UI element background
  4: 0.93,  // Hovered element
  5: 0.90,  // Active/selected element
  6: 0.85,  // Subtle border
  7: 0.78,  // UI element border/focus ring
  8: 0.68,  // Solid border
  9: 0.55,  // Solid background (main color)
  10: 0.50, // Hover state
  11: 0.42, // Low contrast text
  12: 0.25, // High contrast text
};

const LIGHTNESS_TARGETS_DARK = {
  1: 0.11,  // Near black
  2: 0.13,  // Subtle background
  3: 0.16,  // UI element background
  4: 0.19,  // Hovered element
  5: 0.22,  // Active/selected element
  6: 0.27,  // Subtle border
  7: 0.34,  // UI element border
  8: 0.42,  // Solid border
  9: 0.55,  // Solid background (main color)
  10: 0.62, // Hover state
  11: 0.72, // Low contrast text
  12: 0.93, // High contrast text
};

/**
 * Chroma multipliers for each step
 * Lower steps have reduced saturation
 */
const CHROMA_MULTIPLIERS_LIGHT = {
  1: 0.02,
  2: 0.04,
  3: 0.08,
  4: 0.14,
  5: 0.22,
  6: 0.35,
  7: 0.50,
  8: 0.70,
  9: 1.00,
  10: 0.95,
  11: 0.80,
  12: 0.45,
};

const CHROMA_MULTIPLIERS_DARK = {
  1: 0.02,
  2: 0.04,
  3: 0.08,
  4: 0.14,
  5: 0.20,
  6: 0.30,
  7: 0.45,
  8: 0.65,
  9: 1.00,
  10: 1.10,
  11: 0.85,
  12: 0.15,
};

/**
 * Generate a color ramp from a base color
 */
export function generateRamp(options: RampOptions): string[] {
  const {
    baseColor,
    steps = 12,
    chromaScale = 1.0,
    hueBias = 0,
    darkMode = false,
    lockedSteps = {},
  } = options;

  const baseLch = hexToOklch(baseColor);
  const lightnessTargets = darkMode ? LIGHTNESS_TARGETS_DARK : LIGHTNESS_TARGETS_LIGHT;
  const chromaMultipliers = darkMode ? CHROMA_MULTIPLIERS_DARK : CHROMA_MULTIPLIERS_LIGHT;

  const ramp: string[] = [];

  // Map steps based on count
  const stepMap = steps === 12
    ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    : steps === 10
    ? [1, 2, 3, 4, 5, 7, 8, 9, 10, 12]
    : [1, 3, 5, 7, 8, 9, 11, 12];

  for (let i = 0; i < stepMap.length; i++) {
    const step = stepMap[i];

    // Check for locked step
    if (lockedSteps[i + 1]) {
      ramp.push(lockedSteps[i + 1] as string);
      continue;
    }

    const targetL = lightnessTargets[step as keyof typeof lightnessTargets];
    const chromaMult = chromaMultipliers[step as keyof typeof chromaMultipliers];

    // Calculate chroma with scaling
    const targetC = baseLch.C * chromaMult * chromaScale;

    // Apply hue bias (shift hue slightly based on lightness)
    const hueBiasAmount = hueBias * 10;
    let targetH = baseLch.H + hueBiasAmount;
    if (targetH < 0) targetH += 360;
    if (targetH >= 360) targetH -= 360;

    const stepLch: OKLCH = {
      L: targetL,
      C: targetC,
      H: targetH,
    };

    // Clamp to gamut and convert to hex
    const clamped = clampToGamut(stepLch);
    ramp.push(oklchToHex(clamped));
  }

  return ramp;
}

/**
 * Generate alpha variants for a color
 */
export function generateAlphaRamp(baseColor: string, steps = 12): string[] {
  const alphaValues = steps === 12
    ? [0.02, 0.04, 0.08, 0.12, 0.18, 0.26, 0.36, 0.48, 0.64, 0.72, 0.82, 0.94]
    : steps === 10
    ? [0.03, 0.06, 0.12, 0.20, 0.30, 0.42, 0.58, 0.72, 0.84, 0.95]
    : [0.05, 0.12, 0.25, 0.40, 0.58, 0.75, 0.88, 0.96];

  return alphaValues.map(alpha => {
    const a = Math.round(alpha * 255).toString(16).padStart(2, "0");
    return baseColor + a;
  });
}

/**
 * Color harmony types
 */
export type HarmonyType =
  | "complementary"
  | "split-complementary"
  | "analogous"
  | "triadic"
  | "tetradic"
  | "monochrome";

/**
 * Generate harmony colors from a base color
 */
export function generateHarmony(baseColor: string, type: HarmonyType): string[] {
  const baseLch = hexToOklch(baseColor);

  const harmonies: OKLCH[] = [];

  switch (type) {
    case "complementary":
      harmonies.push({ ...baseLch, H: (baseLch.H + 180) % 360 });
      break;

    case "split-complementary":
      harmonies.push({ ...baseLch, H: (baseLch.H + 150) % 360 });
      harmonies.push({ ...baseLch, H: (baseLch.H + 210) % 360 });
      break;

    case "analogous":
      harmonies.push({ ...baseLch, H: (baseLch.H + 30) % 360 });
      harmonies.push({ ...baseLch, H: (baseLch.H + 330) % 360 });
      break;

    case "triadic":
      harmonies.push({ ...baseLch, H: (baseLch.H + 120) % 360 });
      harmonies.push({ ...baseLch, H: (baseLch.H + 240) % 360 });
      break;

    case "tetradic":
      harmonies.push({ ...baseLch, H: (baseLch.H + 90) % 360 });
      harmonies.push({ ...baseLch, H: (baseLch.H + 180) % 360 });
      harmonies.push({ ...baseLch, H: (baseLch.H + 270) % 360 });
      break;

    case "monochrome":
      harmonies.push({ ...baseLch, L: Math.min(baseLch.L + 0.2, 0.95) });
      harmonies.push({ ...baseLch, L: Math.max(baseLch.L - 0.2, 0.15) });
      break;
  }

  return harmonies.map(lch => oklchToHex(clampToGamut(lch)));
}

/**
 * Preset ramp templates (similar to Radix named scales)
 */
export const PRESET_TEMPLATES = {
  gray: { baseColor: "#8b8d98", chromaScale: 0.3 },
  slate: { baseColor: "#889096", chromaScale: 0.4 },
  sage: { baseColor: "#7c8e84", chromaScale: 0.5 },
  olive: { baseColor: "#898e79", chromaScale: 0.5 },
  sand: { baseColor: "#9a9181", chromaScale: 0.5 },
  tomato: { baseColor: "#e54d2e", chromaScale: 1.0 },
  red: { baseColor: "#e5484d", chromaScale: 1.0 },
  ruby: { baseColor: "#e54666", chromaScale: 1.0 },
  crimson: { baseColor: "#e93d82", chromaScale: 1.0 },
  pink: { baseColor: "#d6409f", chromaScale: 1.0 },
  plum: { baseColor: "#ab4aba", chromaScale: 1.0 },
  purple: { baseColor: "#8e4ec6", chromaScale: 1.0 },
  violet: { baseColor: "#6e56cf", chromaScale: 1.0 },
  iris: { baseColor: "#5b5bd6", chromaScale: 1.0 },
  indigo: { baseColor: "#3e63dd", chromaScale: 1.0 },
  blue: { baseColor: "#0090ff", chromaScale: 1.0 },
  cyan: { baseColor: "#00a2c7", chromaScale: 1.0 },
  teal: { baseColor: "#12a594", chromaScale: 1.0 },
  jade: { baseColor: "#29a383", chromaScale: 1.0 },
  green: { baseColor: "#30a46c", chromaScale: 1.0 },
  grass: { baseColor: "#46a758", chromaScale: 1.0 },
  bronze: { baseColor: "#a18072", chromaScale: 0.6 },
  gold: { baseColor: "#978365", chromaScale: 0.6 },
  brown: { baseColor: "#ad7f58", chromaScale: 0.7 },
  orange: { baseColor: "#f76b15", chromaScale: 1.0 },
  amber: { baseColor: "#ffc53d", chromaScale: 1.0 },
  yellow: { baseColor: "#ffe629", chromaScale: 1.0 },
  lime: { baseColor: "#bdee63", chromaScale: 0.9 },
  mint: { baseColor: "#86ead4", chromaScale: 0.8 },
  sky: { baseColor: "#7ce2fe", chromaScale: 0.8 },
} as const;

export type PresetTemplate = keyof typeof PRESET_TEMPLATES;

/**
 * Generate a ramp from a preset template
 */
export function generatePresetRamp(
  preset: PresetTemplate,
  options: Omit<RampOptions, "baseColor"> = {}
): string[] {
  const template = PRESET_TEMPLATES[preset];
  return generateRamp({
    baseColor: template.baseColor,
    chromaScale: options.chromaScale ?? template.chromaScale,
    ...options,
  });
}
