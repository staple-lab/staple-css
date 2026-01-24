# CLAUDE.md

This file provides guidance for AI assistants working on the staple-css codebase.

## Project Summary

staple-css is a shared styling contract for apps—tokens, primitives, and accessible components. Semantic CSS variables standardize spacing, color, typography, and variants. Tokens are the API. Contract over customization. Consistency by default, with deliberate escape hatches.

This is a performance-first UI styling system built as an npm monorepo (npm workspaces). It provides:
- **@staple-css/tokens**: CSS variables for design tokens (colors, spacing, typography, etc.)
- **@staple-css/primitives**: React layout/typography primitives that consume tokens

## Core Principles

- **Tokens are the API.** Design decisions are encoded in tokens. Components consume token keys, not arbitrary values.
- **Contract over customization.** A stable API enables consistency. Override by design, not by default.
- **Consistency by default, escape hatches by design.** The happy path keeps you in the token system. `className` is always available for overrides.

## Repo Map

```
staple-css/
├── packages/
│   ├── tokens/           # @staple-css/tokens - CSS variable definitions
│   │   ├── src/
│   │   │   ├── tokens.ts    # Token definitions (source of truth)
│   │   │   ├── generate.ts  # CSS generator script
│   │   │   └── index.ts     # TypeScript exports
│   │   └── dist/            # Generated CSS files
│   │       ├── tokens.css      # Base tokens
│   │       ├── themes.css      # Light/dark themes
│   │       ├── density.css     # Comfortable/compact density
│   │       ├── palettes.css    # Tailwind-style color palettes (50-950)
│   │       ├── breakpoints.css # Responsive breakpoints
│   │       └── all.css         # Combined import
│   └── primitives/       # @staple-css/primitives - React components
│       ├── src/
│       │   ├── Box.tsx, Stack.tsx, etc.  # Components
│       │   ├── primitives.css            # Component CSS
│       │   ├── cx.ts                     # Tiny classname utility
│       │   └── types.ts                  # Shared types
│       └── dist/
├── apps/
│   ├── docs/             # Documentation site (Vite + React)
│   └── demo/             # Demo app with real screens
├── scripts/
│   ├── bundle-size.js    # Bundle size reporter
│   └── check-raw-values.js  # CSS lint for raw values
└── [config files]        # tsconfig, eslint, prettier, vitest
```

## Local Development

```bash
# Install dependencies
npm install

# Build packages (required before running apps)
npm run build:packages

# Run docs site
npm run dev

# Run demo app
npm run dev:demo

# Run tests
npm run test

# Type check
npm run typecheck

# Lint
npm run lint

# Check bundle size
npm run bundle-size

# Check for raw values in CSS
npm run check-raw-values

# Run all quality checks
npm run quality
```

## Publishing

### Package Structure

Both packages use ESM-only output with proper exports maps:

```json
{
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./tokens.css": "./dist/tokens.css"
  },
  "sideEffects": ["**/*.css"]
}
```

### Publishing Steps

1. Ensure all tests pass: `npm run quality`
2. Update version in package.json files
3. Build packages: `npm run build:packages`
4. Publish with provenance:
   ```bash
   cd packages/tokens && npm publish --access public
   cd packages/primitives && npm publish --access public
   ```

### CSS sideEffects

Both packages mark CSS files as sideEffects so bundlers don't tree-shake them:
- tokens: `"sideEffects": ["**/*.css"]`
- primitives: `"sideEffects": ["**/*.css"]`

### files Field

Only `dist/` is published. Source files are excluded.

## Contribution Rules

### Token Enforcement

- **Props accept token keys only.** No raw pixel values, no arbitrary color strings.
- Space: 0-8 scale
- Radius: 0-4 scale
- Shadow: 0-2 scale
- Font size: 0-6 scale
- Tone: neutral, primary, danger, warn, success

### No Raw Values

The CSS should use token variables, not hardcoded values:

```css
/* Good */
padding: var(--st-space-4);
color: var(--st-color-text);

/* Bad */
padding: 16px;
color: #333;
```

Run `npm run check-raw-values` to lint for violations.

### Performance Rules

1. **No runtime CSS generation.** All CSS is static files.
2. **Minimal class composition.** Use precomputed variant maps.
3. **Stable class names.** `st-Box--pad-4` never changes per render.
4. **No heavy dependencies.** The primitives package has near-zero runtime.
5. **Tree-shakeable exports.** Each component can be imported individually.

### No Large Dependencies

Do not add dependencies unless absolutely necessary. Current dependencies:
- React (peer dep)
- @staple-css/tokens (peer dep for primitives)

### Code Style

- ESM only (`type: "module"`)
- TypeScript strict mode
- Use `:where()` for low specificity CSS
- Use logical properties where appropriate
- Component class naming: `st-Component`, `st-Component--variant-value`

## Release Process

### Versioning

Follow semver:
- Patch: Bug fixes, docs updates
- Minor: New features, new tokens, new components
- Major: Breaking changes to token API or component props

### Changelog

Maintain CHANGELOG.md with:
- Version number and date
- Added/Changed/Fixed/Removed sections
- Migration notes for breaking changes

### Changesets (Optional)

The repo is set up for manual versioning, but changesets can be added:
```bash
npm install @changesets/cli
npx changeset init
```

## Non-Goals

### No Huge Component Surface

staple-css provides primitives (Box, Stack, Inline, Grid, Container, Text, Card), not a complete component library. Complex widgets like datepickers, modals, or data tables are out of scope.

### No Deep Override Engine

There's no theme provider, no component variant API, no style props engine. The escape hatch is `className`. That's it.

### No Primitive-Per-Element

Primitives map to roles (layout, typography, surface), not HTML elements. There's no `<Div>`, `<Section>`, `<Article>` primitive. Use `as` prop on Box for polymorphism.

### No Utility Classes

staple-css is not a utility-first framework. Props are the API; classes are implementation details.

## Responsive Design

### Intrinsic Responsive Patterns

The recommended approach for responsive layouts is **intrinsic design** using CSS Grid with `auto-fill`/`auto-fit` and `minmax()`. This avoids media queries entirely:

```css
/* Grid that automatically adjusts columns based on available space */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--st-space-4);
}
```

This pattern is used throughout the docs app and is the preferred method.

### Breakpoints System

For cases where you need explicit breakpoints, staple-css provides a configurable breakpoint system.

**Import breakpoints CSS:**
```css
@import "@staple-css/tokens/breakpoints.css";
```

**Default breakpoints (Tailwind-style):**
| Name | Min-Width | CSS Variable |
|------|-----------|--------------|
| sm   | 640px     | `--st-screen-sm` |
| md   | 768px     | `--st-screen-md` |
| lg   | 1024px    | `--st-screen-lg` |
| xl   | 1280px    | `--st-screen-xl` |
| 2xl  | 1536px    | `--st-screen-2xl` |

**Using breakpoints in CSS:**
```css
/* Mobile-first: start with mobile styles */
.card {
  padding: var(--st-space-3);
}

/* Then add breakpoint overrides */
@media (min-width: 768px) {
  .card {
    padding: var(--st-space-5);
  }
}
```

**Visibility utilities included:**
```css
.st-hide-md { }        /* Hidden at md and up */
.st-show-md { }        /* Shown at md and up */
.st-hide-below-md { }  /* Hidden below md */
.st-show-below-md { }  /* Shown below md */
```

### Custom Breakpoints Configuration

Generate breakpoints with custom prefixes or values:

```typescript
import { generateBreakpointsCss, type BreakpointsOptions } from "@staple-css/tokens";

// Custom prefix
const css = generateBreakpointsCss({
  prefix: "my",           // Default: "st"
  screenPrefix: "bp",     // Default: "screen"
});
// Generates: --my-bp-sm, --my-bp-md, etc.

// Custom breakpoints
const css = generateBreakpointsCss({
  breakpoints: [
    { name: "mobile", minWidth: 480 },
    { name: "tablet", minWidth: 768 },
    { name: "desktop", minWidth: 1200 },
  ],
});
```

**Available presets:**
```typescript
import { breakpointPresets, getBreakpoints } from "@staple-css/tokens";

// Tailwind (default): sm, md, lg, xl, 2xl
const tailwind = getBreakpoints("tailwind");

// Bootstrap: sm, md, lg, xl, xxl
const bootstrap = getBreakpoints("bootstrap");

// Minimal: tablet, desktop, wide
const minimal = getBreakpoints("minimal");

// Fine-grained: xs, sm, md, lg, xl, 2xl, 3xl
const fine = getBreakpoints("fine-grained");
```

**TypeScript helpers for runtime breakpoint detection:**
```typescript
import { createBreakpointHelpers } from "@staple-css/tokens";

const bp = createBreakpointHelpers();

// Check current breakpoint
if (bp.matches("md")) {
  // Viewport is md or larger
}

// Get current breakpoint name
const current = bp.current(); // "lg" | "md" | etc.

// Subscribe to changes
const unsubscribe = bp.onChange((breakpoint) => {
  console.log("Now at:", breakpoint);
});
```

## Color Palettes

### Tailwind-Compatible Palettes

22 color palettes with 11 shades each (50-950):

```css
@import "@staple-css/tokens/palettes.css";

.button {
  background: var(--st-blue-600);
}
.button:hover {
  background: var(--st-blue-700);
}
```

**Available palettes:** slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

### OKLCH Color Tools

Generate custom palettes using perceptually uniform OKLCH color space:

```typescript
import { generateRamp, generateHarmony, hexToOklch } from "@staple-css/tokens/color";

// Generate 12-step ramp from base color
const ramp = generateRamp({ baseColor: "#2563eb" });

// Generate color harmonies
const complementary = generateHarmony("#2563eb", "complementary");
const triadic = generateHarmony("#2563eb", "triadic");
```
