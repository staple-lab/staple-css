# @staple-css/tokens

**CSS variables for design tokens** — the foundation of the staple-css design system.

A comprehensive token library providing semantic CSS variables for spacing, color, typography, shadows, motion, and layout. Built for consistency, performance, and AI-assisted development.

---

## Installation

```bash
npm install @staple-css/tokens
```

## Quick Start

```tsx
// Import all tokens at your app root
import "@staple-css/tokens/all.css";

// Or import individually for more control
import "@staple-css/tokens/tokens.css";   // Base tokens
import "@staple-css/tokens/themes.css";   // Light/dark themes
import "@staple-css/tokens/density.css";  // Density modes
import "@staple-css/tokens/palettes.css"; // Color palettes
import "@staple-css/tokens/breakpoints.css"; // Responsive breakpoints
```

## What's Included

@staple-css/tokens provides **310+ CSS variables** across 20+ token categories:

### Core Tokens

- **Space Scale** (0-8) — Spacing for padding, gap, margin
- **Radius Scale** (0-4) — Border radius for cards, buttons
- **Shadow Scale** (0-2) — Box shadows for elevation
- **Font Size Scale** (0-6) — Typography sizes
- **Font Weight** — normal, medium, semibold, bold
- **Line Height** — tight, normal, relaxed

### Motion Tokens

- **Duration** — instant, fast, normal, moderate, slow, slower, slowest
- **Easing** — default, linear, in, out, inOut, emphasized, bounce, elastic
- **Delay** — 0-1000ms in steps

### Color System

- **Semantic Colors** — primary, danger, warn, success, accent
- **22 Palettes** — Tailwind-compatible colors (50-950 shades)
- **Theme Support** — Light/dark themes via `data-theme`
- **OKLCH Generation** — Perceptually uniform custom palettes

### Layout Tokens

- **Z-Index Scale** — Layering system (0-50, max)
- **Opacity Scale** — 0-100 in steps
- **Max Width Scale** — xs to 7xl
- **Aspect Ratios** — square, video, portrait, etc.
- **Breakpoints** — sm, md, lg, xl, 2xl

### And More

- Border widths, letter spacing, line clamp, outline, blur, brightness, contrast, saturate, transform scale, display, position, overflow, flex, cursor, text transform, white space, object fit

---

## Usage Examples

### In CSS

```css
/* Use CSS variables directly */
.card {
  padding: var(--st-space-5);
  border-radius: var(--st-radius-3);
  box-shadow: var(--st-shadow-1);
  background: var(--st-color-surface);
  color: var(--st-color-text);
  transition: all var(--st-duration-normal) var(--st-easing-out);
}

.card:hover {
  box-shadow: var(--st-shadow-2);
  transform: translateY(-2px);
}
```

### In JavaScript/TypeScript

```tsx
import { spaceScale, duration, easing } from "@staple-css/tokens";

// Access token definitions
console.log(spaceScale[4]); // "1rem"
console.log(duration.normal); // "200ms"
console.log(easing.emphasized); // "cubic-bezier(0.2, 0, 0, 1)"

// Use types for type safety
import type { SpaceToken, DurationToken } from "@staple-css/tokens";

function setPadding(pad: SpaceToken) {
  return `var(--st-space-${pad})`;
}

setPadding(4); // ✅ Valid
setPadding(99); // ❌ Type error
```

### In React (with @staple-css/primitives)

```tsx
import "@staple-css/tokens/all.css";
import { Stack, Card, Text } from "@staple-css/primitives";

export function App() {
  return (
    <Stack gap={4}>
      <Card pad={5} radius={3} shadow={1}>
        <Text size={4} weight="semibold">
          Using staple-css tokens
        </Text>
        <Text tone="muted">
          Components automatically consume token keys
        </Text>
      </Card>
    </Stack>
  );
}
```

---

## Token Reference

### Space Scale (0-8)

Used for padding, gap, margin:

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| 0 | 0 | `--st-space-0` | No spacing |
| 1 | 4px | `--st-space-1` | Tight spacing |
| 2 | 8px | `--st-space-2` | Compact spacing |
| 3 | 12px | `--st-space-3` | Default inline |
| 4 | 16px | `--st-space-4` | Comfortable (recommended) |
| 5 | 24px | `--st-space-5` | Section spacing |
| 6 | 32px | `--st-space-6` | Large sections |
| 7 | 48px | `--st-space-7` | Major breaks |
| 8 | 64px | `--st-space-8` | Hero spacing |

```css
padding: var(--st-space-4);
gap: var(--st-space-3);
margin-bottom: var(--st-space-6);
```

### Radius Scale (0-4)

Used for border-radius:

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| 0 | 0 | `--st-radius-0` | Sharp corners |
| 1 | 2px | `--st-radius-1` | Subtle rounding |
| 2 | 4px | `--st-radius-2` | Standard (cards, buttons) |
| 3 | 8px | `--st-radius-3` | Prominent rounding |
| 4 | 16px | `--st-radius-4` | Pill shape |

```css
border-radius: var(--st-radius-2);
```

### Shadow Scale (0-2)

Used for elevation:

| Token | Value | CSS Variable |
|-------|-------|--------------|
| 0 | none | `--st-shadow-0` |
| 1 | subtle | `--st-shadow-1` |
| 2 | prominent | `--st-shadow-2` |

```css
box-shadow: var(--st-shadow-1);
```

### Font Size Scale (0-6)

Typography sizes:

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| 0 | 12px | `--st-font-size-0` | Captions, metadata |
| 1 | 14px | `--st-font-size-1` | Small text, labels |
| 2 | 16px | `--st-font-size-2` | Body text (default) |
| 3 | 18px | `--st-font-size-3` | Large body, subheadings |
| 4 | 20px | `--st-font-size-4` | h3, card titles |
| 5 | 24px | `--st-font-size-5` | h2, section headers |
| 6 | 32px | `--st-font-size-6` | h1, hero text |

```css
font-size: var(--st-font-size-2);
```

### Motion Tokens

#### Duration

| Token | Value | CSS Variable |
|-------|-------|--------------|
| instant | 75ms | `--st-duration-instant` |
| fast | 150ms | `--st-duration-fast` |
| normal | 200ms | `--st-duration-normal` |
| moderate | 300ms | `--st-duration-moderate` |
| slow | 500ms | `--st-duration-slow` |
| slower | 700ms | `--st-duration-slower` |
| slowest | 1000ms | `--st-duration-slowest` |

#### Easing

| Token | Value | CSS Variable |
|-------|-------|--------------|
| default | cubic-bezier(0.4, 0, 0.2, 1) | `--st-easing-default` |
| linear | linear | `--st-easing-linear` |
| in | cubic-bezier(0.4, 0, 1, 1) | `--st-easing-in` |
| out | cubic-bezier(0, 0, 0.2, 1) | `--st-easing-out` |
| inOut | cubic-bezier(0.4, 0, 0.2, 1) | `--st-easing-in-out` |
| emphasized | cubic-bezier(0.2, 0, 0, 1) | `--st-easing-emphasized` |
| bounce | cubic-bezier(0.68, -0.55, 0.265, 1.55) | `--st-easing-bounce` |
| elastic | cubic-bezier(0.68, -0.6, 0.32, 1.6) | `--st-easing-elastic` |

#### Delay

| Token | Value | CSS Variable |
|-------|-------|--------------|
| 0 | 0ms | `--st-delay-0` |
| 75 | 75ms | `--st-delay-75` |
| 100 | 100ms | `--st-delay-100` |
| 150 | 150ms | `--st-delay-150` |
| 200 | 200ms | `--st-delay-200` |
| 300 | 300ms | `--st-delay-300` |
| 500 | 500ms | `--st-delay-500` |
| 700 | 700ms | `--st-delay-700` |
| 1000 | 1000ms | `--st-delay-1000` |

**Usage:**

```css
.button {
  transition: all var(--st-duration-normal) var(--st-easing-out);
  animation-delay: var(--st-delay-100);
}

.modal {
  animation: fadeIn var(--st-duration-moderate) var(--st-easing-emphasized);
}

.tooltip {
  transition: opacity var(--st-duration-fast) var(--st-easing-in);
  transition-delay: var(--st-delay-300);
}
```

### Color Tokens

Semantic colors that adapt to light/dark themes:

**Surfaces:**
- `--st-color-background` — App background
- `--st-color-surface` — Card/panel background
- `--st-color-surface-raised` — Elevated surfaces

**Text:**
- `--st-color-text` — Primary text
- `--st-color-text-muted` — Secondary text
- `--st-color-text-inverse` — Text on colored backgrounds

**Borders:**
- `--st-color-border` — Default borders
- `--st-color-border-muted` — Subtle borders
- `--st-color-border-hover` — Hover state
- `--st-color-border-focus` — Focus state

**Actions:**
- Primary: `--st-color-primary`, `--st-color-primary-hover`, `--st-color-primary-text`
- Secondary: `--st-color-secondary`, `--st-color-secondary-hover`, `--st-color-secondary-text`
- Accent: `--st-color-accent`, `--st-color-accent-hover`, `--st-color-accent-text`

**Status:**
- Danger: `--st-color-danger`, `--st-color-danger-hover`, `--st-color-danger-text`, `--st-color-danger-surface`
- Warn: `--st-color-warn`, `--st-color-warn-hover`, `--st-color-warn-text`, `--st-color-warn-surface`
- Success: `--st-color-success`, `--st-color-success-hover`, `--st-color-success-text`, `--st-color-success-surface`

---

## Theming

### Light/Dark Themes

Apply themes using the `data-theme` attribute:

```html
<!-- Light theme (default) -->
<body data-theme="light">

<!-- Dark theme -->
<body data-theme="dark">

<!-- System preference (automatic) -->
<body>
```

The system automatically respects `prefers-color-scheme` when no explicit theme is set.

### Density Modes

Apply density using the `data-density` attribute:

```html
<!-- Comfortable density (default) -->
<body data-density="comfortable">

<!-- Compact density (smaller spacing) -->
<body data-density="compact">
```

### Dynamic Theme Switching

```tsx
import { applyDynamicTheme, removeDynamicTheme } from "@staple-css/tokens/dynamic-theme";

// Apply custom theme at runtime
const customTheme = {
  colors: {
    primary: "#007bff",
    primaryHover: "#0056b3",
    text: "#212529",
    background: "#ffffff",
  },
  space: {
    // Custom spacing scale
  },
};

applyDynamicTheme(customTheme, document.body);

// Remove theme
removeDynamicTheme(document.body);
```

### Scoped Themes

Apply different themes to different parts of your UI:

```html
<div data-theme="brand-primary">
  Primary brand section
</div>

<div data-theme="brand-secondary">
  Secondary brand section
</div>
```

---

## Color Palettes

### Tailwind-Compatible Palettes

22 color palettes with 11 shades each (50-950):

```tsx
import "@staple-css/tokens/palettes.css";
```

**Available palettes:**
slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

**Usage:**

```css
.button-primary {
  background: var(--st-blue-600);
  color: var(--st-blue-50);
}

.button-primary:hover {
  background: var(--st-blue-700);
}

.text-muted {
  color: var(--st-gray-500);
}
```

### OKLCH Color Generation

Generate custom palettes using perceptually uniform OKLCH color space:

```tsx
import { generateRamp, generateHarmony } from "@staple-css/tokens/color";

// Generate 12-step color ramp from base color
const brandRamp = generateRamp({
  baseColor: "#2563eb",
  steps: 12,
});

// Generate color harmonies
const complementary = generateHarmony("#2563eb", "complementary");
const triadic = generateHarmony("#2563eb", "triadic");
const analogous = generateHarmony("#2563eb", "analogous");
const splitComplementary = generateHarmony("#2563eb", "split-complementary");
const tetradic = generateHarmony("#2563eb", "tetradic");
```

---

## Responsive Breakpoints

### Default Breakpoints (Tailwind-style)

```tsx
import "@staple-css/tokens/breakpoints.css";
```

| Name | Min-Width | CSS Variable |
|------|-----------|--------------|
| sm   | 640px     | `--st-screen-sm` |
| md   | 768px     | `--st-screen-md` |
| lg   | 1024px    | `--st-screen-lg` |
| xl   | 1280px    | `--st-screen-xl` |
| 2xl  | 1536px    | `--st-screen-2xl` |

### Usage in CSS

```css
/* Mobile-first approach */
.card {
  padding: var(--st-space-3);
}

/* Tablet and up */
@media (min-width: 768px) {
  .card {
    padding: var(--st-space-5);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .card {
    padding: var(--st-space-7);
  }
}
```

### Visibility Utilities

```css
.st-hide-md { }        /* Hidden at md and up */
.st-show-md { }        /* Shown at md and up */
.st-hide-below-md { }  /* Hidden below md */
.st-show-below-md { }  /* Shown below md */
```

### Custom Breakpoints

```tsx
import { generateBreakpointsCss, getBreakpoints } from "@staple-css/tokens";

// Use a preset
const bootstrap = getBreakpoints("bootstrap");
const minimal = getBreakpoints("minimal");

// Or create custom breakpoints
const custom = generateBreakpointsCss({
  breakpoints: [
    { name: "mobile", minWidth: 480 },
    { name: "tablet", minWidth: 768 },
    { name: "desktop", minWidth: 1200 },
    { name: "wide", minWidth: 1920 },
  ],
});
```

### Runtime Breakpoint Helpers

```tsx
import { createBreakpointHelpers } from "@staple-css/tokens";

const bp = createBreakpointHelpers();

// Check current breakpoint
if (bp.matches("md")) {
  console.log("Viewport is md or larger");
}

// Get current breakpoint name
const current = bp.current(); // "lg" | "md" | etc.

// Subscribe to changes
const unsubscribe = bp.onChange((breakpoint) => {
  console.log("Now at:", breakpoint);
});
```

---

## TypeScript Support

Full TypeScript types for all token scales:

```tsx
import type {
  SpaceToken,        // 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  RadiusToken,       // 0 | 1 | 2 | 3 | 4
  ShadowToken,       // 0 | 1 | 2
  FontSizeToken,     // 0 | 1 | 2 | 3 | 4 | 5 | 6
  FontWeightToken,   // "normal" | "medium" | "semibold" | "bold"
  LineHeightToken,   // "tight" | "normal" | "relaxed"
  DurationToken,     // "instant" | "fast" | "normal" | ...
  EasingToken,       // "default" | "linear" | "in" | ...
  DelayToken,        // 0 | 75 | 100 | 150 | ...
  ColorToken,
  ZIndexToken,
  OpacityToken,
} from "@staple-css/tokens";
```

### CSS Variable Helpers

```tsx
import { cssVar } from "@staple-css/tokens";

// Type-safe CSS variable references
const padding = cssVar.space(4);      // "var(--st-space-4)"
const radius = cssVar.radius(2);      // "var(--st-radius-2)"
const shadow = cssVar.shadow(1);      // "var(--st-shadow-1)"
const fontSize = cssVar.fontSize(3);  // "var(--st-font-size-3)"
const color = cssVar.color("primary"); // "var(--st-color-primary)"
```

---

## API Reference

### Token Definitions

```tsx
import {
  spaceScale,
  radiusScale,
  shadowScale,
  fontSizeScale,
  fontFamily,
  lineHeight,
  fontWeight,
  duration,
  easing,
  delay,
  zIndexScale,
  opacityScale,
  // ... and more
} from "@staple-css/tokens";
```

### Theme Management

```tsx
import {
  createTheme,
  themeToCSS,
  themeToTypeScript,
  themeToJson,
  themeFromJson,
} from "@staple-css/tokens";

// Create custom theme
const theme = createTheme({
  colors: { /* ... */ },
  space: { /* ... */ },
});

// Export theme to various formats
const css = themeToCSS(theme);
const ts = themeToTypeScript(theme);
const json = themeToJson(theme);
```

### Dynamic Themes

```tsx
import {
  applyDynamicTheme,
  removeDynamicTheme,
  getCurrentTheme,
  watchTheme,
} from "@staple-css/tokens/dynamic-theme";

// Apply theme at runtime
applyDynamicTheme(customTheme, element);

// Watch for theme changes
const unwatch = watchTheme((theme) => {
  console.log("Theme changed:", theme);
});
```

### Color Generation

```tsx
import {
  generateRamp,
  generateHarmony,
  hexToOklch,
  oklchToHex,
  adjustLightness,
  adjustChroma,
} from "@staple-css/tokens/color";
```

### Breakpoints

```tsx
import {
  generateBreakpointsCss,
  getBreakpoints,
  createBreakpointHelpers,
  getMediaQueries,
} from "@staple-css/tokens";
```

---

## Performance

- **~18 KB** (min+gzip) for all tokens
- **Zero runtime** — All CSS is static
- **Tree-shakeable** — Import only what you need
- **Low specificity** — Easy to override

---

## License

MIT © [staple-lab](https://github.com/staple-lab)

---

## Links

- [Main Documentation](https://staple-lab.github.io/staple-css/)
- [Token Studio](https://staple-lab.github.io/staple-css/tokens-studio)
- [Storybook](https://staple-lab.github.io/staple-css/storybook)
- [GitHub](https://github.com/staple-lab/staple-css)
- [npm](https://www.npmjs.com/package/@staple-css/tokens)
