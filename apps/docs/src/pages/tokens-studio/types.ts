/**
 * Types for the Tokens Studio Builder
 */

import type { Seeds, GenerationParams, Palette, SemanticMap, Override } from "@staple-css/tokens";
import type { HarmonyType } from "@staple-css/tokens/color";

// Builder workflow steps
export type BuilderStep = "seeds" | "generate" | "scales" | "export";

// Responsive value: base value + optional breakpoint overrides
export interface ResponsiveValue {
  base: string;
  breakpoints?: Record<string, string>; // e.g., { sm: "0.5rem", lg: "1rem" }
}

// Scale token collections
export interface ScaleTokens {
  space: Record<string, ResponsiveValue>;
  radius: Record<string, string>;
  shadow: Record<string, string>;
  fontSize: Record<string, string>;
  fontWeight: Record<string, string>;
  lineHeight: Record<string, string>;
  duration: Record<string, string>;
  easing: Record<string, string>;
}

// Working state for the builder
export interface WorkingState {
  seeds: Seeds;
  generation: GenerationParams;
  palettes: Palette[];
  semanticMap: {
    light: SemanticMap;
    dark: SemanticMap;
  };
  overrides: Override[];
  scales: ScaleTokens;
  breakpoints: Record<string, string>;
}

// Semantic color overrides per mode
export interface SemanticOverrides {
  light: Record<string, string>;
  dark: Record<string, string>;
}

// Resolved colors for both modes
export interface ResolvedColors {
  light: Record<string, string>;
  dark: Record<string, string>;
}

// Re-export types from tokens package for convenience
export type { Seeds, GenerationParams, Palette, SemanticMap, Override, HarmonyType };
