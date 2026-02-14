// ---------------------------------------------------------------------------
// Token type system for the 5-level hierarchy
// --st-{category}-{property}-{role}-{prominence}-{state}
//
// Not every category uses all 5 levels:
//   Color tokens  -> all 5 levels
//   Scale tokens  -> 2-3 levels (category + value, e.g. --st-space-4)
//   Layout tokens -> 2-3 levels (flex, grid, breakpoints)
// ---------------------------------------------------------------------------

// ---- Level 1: Token categories ----

/** Top-level token category — the first segment after the `--st-` prefix. */
export type TokenCategory =
  | 'color'
  | 'space'
  | 'type'
  | 'elevation'
  | 'border'
  | 'motion'
  | 'layout'
  | 'flex'
  | 'grid';

// ---- Level 2: Color property (what the color applies to) ----

/** The visual channel a color token targets. */
export type ColorProperty =
  | 'bg'   // background
  | 'fg'   // foreground / text
  | 'bd'   // border
  | 'icon' // iconography
  | 'ring'; // focus rings & outlines

// ---- Level 3: Semantic role ----

/** Semantic role — describes *why* a color exists. */
export type ColorRole =
  | 'surface'
  | 'interactive'
  | 'form'
  | 'feature'
  | 'ui'
  | 'status-info'
  | 'status-success'
  | 'status-warn'
  | 'status-danger';

// ---- Level 4: Prominence ----

/** Visual weight / emphasis within a role. */
export type Prominence =
  | 'base'
  | 'subtle'
  | 'muted'
  | 'strong'
  | 'on-color';

// ---- Level 5: Interaction state ----

/** Interaction state — appended only when the token varies by state. */
export type InteractionState =
  | 'hover'
  | 'pressed'
  | 'focus'
  | 'disabled';

// ---------------------------------------------------------------------------
// Token value types
// ---------------------------------------------------------------------------

/**
 * A semantic color token with light and dark mode hex values.
 *
 * `name` is the CSS custom-property name **without** the leading `--`.
 * For example: `st-color-bg-surface-base`
 */
export interface ColorToken {
  /** CSS variable name without the `--` prefix, e.g. `st-color-bg-surface-base` */
  name: string;
  /** Hex value used in light mode, e.g. `#ffffff` */
  light: string;
  /** Hex value used in dark mode, e.g. `#0a0a0a` */
  dark: string;
  /** Human-readable description of the token's purpose */
  description: string;
}

/**
 * A scale-based token (spacing, type size, elevation, etc.)
 *
 * The `value` is the raw CSS value — could be a length, a number, or a
 * composite value like a box-shadow.
 */
export interface ScaleToken {
  /** CSS variable name without the `--` prefix, e.g. `st-space-4` */
  name: string;
  /** CSS value, e.g. `1rem`, `400`, `0 1px 3px rgba(0,0,0,.1)` */
  value: string;
  /** Human-readable description of the token's purpose */
  description: string;
}

/**
 * A layout token (flex, grid, breakpoint configuration).
 *
 * Layout tokens may carry a single value *or* a light/dark pair when the
 * layout shifts between modes (rare, but possible for density changes).
 */
export interface LayoutToken {
  /** CSS variable name without the `--` prefix */
  name: string;
  /** CSS value */
  value: string;
  /** Human-readable description */
  description: string;
}

// ---------------------------------------------------------------------------
// Discriminated union of all token types
// ---------------------------------------------------------------------------

export type TokenDefinition =
  | ({ kind: 'color' } & ColorToken)
  | ({ kind: 'scale' } & ScaleToken)
  | ({ kind: 'layout' } & LayoutToken);

// ---------------------------------------------------------------------------
// Token registry — organises all tokens by category
// ---------------------------------------------------------------------------

/** Collection of all tokens, keyed by their top-level category. */
export interface TokenRegistry {
  color: ColorToken[];
  space: ScaleToken[];
  type: ScaleToken[];
  elevation: ScaleToken[];
  border: ScaleToken[];
  motion: ScaleToken[];
  layout: LayoutToken[];
  flex: LayoutToken[];
  grid: LayoutToken[];
}

// ---------------------------------------------------------------------------
// Builder helpers (useful when defining tokens)
// ---------------------------------------------------------------------------

/**
 * Segments that together form a fully-qualified color token name.
 *
 * Usage:
 * ```ts
 * const seg: ColorTokenSegments = {
 *   property: 'bg',
 *   role: 'surface',
 *   prominence: 'base',
 * };
 * // -> "st-color-bg-surface-base"
 * ```
 */
export interface ColorTokenSegments {
  property: ColorProperty;
  role: ColorRole;
  prominence?: Prominence;
  state?: InteractionState;
}

/**
 * Builds the canonical CSS variable name (without `--`) from its segments.
 *
 * Examples:
 * - `buildColorTokenName({ property:'bg', role:'surface', prominence:'base' })`
 *   -> `"st-color-bg-surface-base"`
 * - `buildColorTokenName({ property:'bg', role:'interactive', prominence:'base', state:'hover' })`
 *   -> `"st-color-bg-interactive-base-hover"`
 */
export function buildColorTokenName(segments: ColorTokenSegments): string {
  const parts: string[] = ['st', 'color', segments.property, segments.role];
  if (segments.prominence) parts.push(segments.prominence);
  if (segments.state) parts.push(segments.state);
  return parts.join('-');
}
