/**
 * Responsive Breakpoints
 *
 * Configurable breakpoint system with customizable prefixes.
 * Defaults to Tailwind-style breakpoints.
 */

export interface BreakpointConfig {
  /** Breakpoint name (used in CSS variable name) */
  name: string;
  /** Min-width value in pixels */
  minWidth: number;
  /** Optional max-width for bounded ranges */
  maxWidth?: number;
}

export interface BreakpointsOptions {
  /** Prefix for CSS variables (default: "st") */
  prefix?: string;
  /** Prefix for breakpoint names (default: "screen") */
  screenPrefix?: string;
  /** Custom breakpoints (overrides defaults if provided) */
  breakpoints?: BreakpointConfig[];
}

/**
 * Default Tailwind-style breakpoints
 */
export const defaultBreakpoints: BreakpointConfig[] = [
  { name: "sm", minWidth: 640 },
  { name: "md", minWidth: 768 },
  { name: "lg", minWidth: 1024 },
  { name: "xl", minWidth: 1280 },
  { name: "2xl", minWidth: 1536 },
];

/**
 * Bootstrap-style breakpoints preset
 */
export const bootstrapBreakpoints: BreakpointConfig[] = [
  { name: "sm", minWidth: 576 },
  { name: "md", minWidth: 768 },
  { name: "lg", minWidth: 992 },
  { name: "xl", minWidth: 1200 },
  { name: "xxl", minWidth: 1400 },
];

/**
 * Minimal breakpoints preset (mobile-first with fewer stops)
 */
export const minimalBreakpoints: BreakpointConfig[] = [
  { name: "tablet", minWidth: 768 },
  { name: "desktop", minWidth: 1024 },
  { name: "wide", minWidth: 1440 },
];

/**
 * Fine-grained breakpoints preset (more control)
 */
export const fineGrainedBreakpoints: BreakpointConfig[] = [
  { name: "xs", minWidth: 480 },
  { name: "sm", minWidth: 640 },
  { name: "md", minWidth: 768 },
  { name: "lg", minWidth: 1024 },
  { name: "xl", minWidth: 1280 },
  { name: "2xl", minWidth: 1536 },
  { name: "3xl", minWidth: 1920 },
];

export type BreakpointPreset = "tailwind" | "bootstrap" | "minimal" | "fine-grained";

export const breakpointPresets: Record<BreakpointPreset, BreakpointConfig[]> = {
  tailwind: defaultBreakpoints,
  bootstrap: bootstrapBreakpoints,
  minimal: minimalBreakpoints,
  "fine-grained": fineGrainedBreakpoints,
};

/**
 * Get breakpoints from a preset or custom config
 */
export function getBreakpoints(
  presetOrConfig: BreakpointPreset | BreakpointConfig[]
): BreakpointConfig[] {
  if (Array.isArray(presetOrConfig)) {
    return presetOrConfig;
  }
  return breakpointPresets[presetOrConfig];
}

/**
 * Generate CSS variables for breakpoints
 */
export function generateBreakpointVars(options: BreakpointsOptions = {}): string {
  const {
    prefix = "st",
    screenPrefix = "screen",
    breakpoints = defaultBreakpoints,
  } = options;

  const vars = breakpoints
    .map((bp) => `  --${prefix}-${screenPrefix}-${bp.name}: ${bp.minWidth}px;`)
    .join("\n");

  return `:root {\n${vars}\n}`;
}

/**
 * Generate media query mixins/utilities
 * Returns an object with media query strings for each breakpoint
 */
export function getMediaQueries(
  breakpoints: BreakpointConfig[] = defaultBreakpoints
): Record<string, string> {
  const queries: Record<string, string> = {};

  for (const bp of breakpoints) {
    // Min-width query (mobile-first)
    queries[bp.name] = `(min-width: ${bp.minWidth}px)`;

    // Max-width query (for "below" breakpoint)
    queries[`below-${bp.name}`] = `(max-width: ${bp.minWidth - 1}px)`;
  }

  // Add range queries (between breakpoints)
  for (let i = 0; i < breakpoints.length - 1; i++) {
    const current = breakpoints[i]!;
    const next = breakpoints[i + 1]!;
    queries[`${current.name}-only`] =
      `(min-width: ${current.minWidth}px) and (max-width: ${next.minWidth - 1}px)`;
  }

  return queries;
}

/**
 * Generate complete breakpoints CSS file
 */
export function generateBreakpointsCss(options: BreakpointsOptions = {}): string {
  const {
    prefix = "st",
    screenPrefix = "screen",
    breakpoints = defaultBreakpoints,
  } = options;

  const lines: string[] = [
    "/**",
    " * @staple-css/tokens - Responsive Breakpoints",
    " *",
    " * Mobile-first breakpoint system.",
    " * Use CSS variables for consistent breakpoint values,",
    " * or use the generated media query custom properties.",
    " */",
    "",
    ":root {",
    "  /* Breakpoint values */",
  ];

  // Add breakpoint variables
  for (const bp of breakpoints) {
    lines.push(`  --${prefix}-${screenPrefix}-${bp.name}: ${bp.minWidth}px;`);
  }

  lines.push("");
  lines.push("  /* Container max-widths (optional) */");

  // Add container max-widths (slightly smaller than breakpoints)
  for (const bp of breakpoints) {
    const containerWidth = bp.minWidth - 48; // 24px padding on each side
    lines.push(`  --${prefix}-container-${bp.name}: ${containerWidth}px;`);
  }

  lines.push("}");
  lines.push("");

  // Generate utility classes for hiding/showing at breakpoints
  lines.push("/* Responsive visibility utilities */");

  for (const bp of breakpoints) {
    lines.push("");
    lines.push(`/* ${bp.name}: ${bp.minWidth}px and up */`);
    lines.push(`@media (min-width: ${bp.minWidth}px) {`);
    lines.push(`  .${prefix}-hide-${bp.name} { display: none !important; }`);
    lines.push(`  .${prefix}-show-${bp.name} { display: block !important; }`);
    lines.push(`  .${prefix}-show-${bp.name}-flex { display: flex !important; }`);
    lines.push(`  .${prefix}-show-${bp.name}-grid { display: grid !important; }`);
    lines.push(`  .${prefix}-show-${bp.name}-inline { display: inline !important; }`);
    lines.push(`  .${prefix}-show-${bp.name}-inline-flex { display: inline-flex !important; }`);
    lines.push("}");
  }

  // Add "below" breakpoint utilities
  lines.push("");
  lines.push("/* Below breakpoint utilities */");

  for (const bp of breakpoints) {
    lines.push("");
    lines.push(`/* Below ${bp.name}: less than ${bp.minWidth}px */`);
    lines.push(`@media (max-width: ${bp.minWidth - 1}px) {`);
    lines.push(`  .${prefix}-hide-below-${bp.name} { display: none !important; }`);
    lines.push(`  .${prefix}-show-below-${bp.name} { display: block !important; }`);
    lines.push("}");
  }

  return lines.join("\n");
}

/**
 * TypeScript helper to use breakpoints in JS/TS
 */
export function createBreakpointHelpers(
  breakpoints: BreakpointConfig[] = defaultBreakpoints
) {
  const queries = getMediaQueries(breakpoints);

  return {
    breakpoints,
    queries,

    /**
     * Check if current viewport matches a breakpoint (client-side only)
     */
    matches(name: string): boolean {
      if (typeof window === "undefined") return false;
      const query = queries[name];
      if (!query) return false;
      return window.matchMedia(query).matches;
    },

    /**
     * Get the current breakpoint name (client-side only)
     */
    current(): string | null {
      if (typeof window === "undefined") return null;
      // Check from largest to smallest
      const sorted = [...breakpoints].sort((a, b) => b.minWidth - a.minWidth);
      for (const bp of sorted) {
        if (window.matchMedia(`(min-width: ${bp.minWidth}px)`).matches) {
          return bp.name;
        }
      }
      return null; // Below smallest breakpoint
    },

    /**
     * Subscribe to breakpoint changes (client-side only)
     */
    onChange(callback: (breakpoint: string | null) => void): () => void {
      if (typeof window === "undefined") return () => {};

      const mediaQueries = breakpoints.map((bp) => ({
        name: bp.name,
        mq: window.matchMedia(`(min-width: ${bp.minWidth}px)`),
      }));

      const handler = () => {
        const sorted = [...breakpoints].sort((a, b) => b.minWidth - a.minWidth);
        for (const bp of sorted) {
          if (window.matchMedia(`(min-width: ${bp.minWidth}px)`).matches) {
            callback(bp.name);
            return;
          }
        }
        callback(null);
      };

      for (const { mq } of mediaQueries) {
        mq.addEventListener("change", handler);
      }

      // Initial call
      handler();

      // Return cleanup function
      return () => {
        for (const { mq } of mediaQueries) {
          mq.removeEventListener("change", handler);
        }
      };
    },
  };
}
