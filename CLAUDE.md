# CLAUDE.md

This file provides guidance for AI assistants working on the staple-css codebase.

## Project Summary

staple-css is a design token system for consistent, semantic styling. Semantic CSS variables standardize spacing, color, typography, elevation, motion, border, and layout. Tokens are the API. Contract over customization. Consistency by default.

This is a performance-first styling system built as an npm monorepo (npm workspaces). It provides:
- **@staple-css/tokens**: CSS custom properties for design tokens with light/dark themes, OKLCH color tools, and generation pipeline

Deployed at **css.staplelab.com** via GitHub Pages.

## Core Principles

- **Tokens are the API.** Design decisions are encoded in tokens. Consumers use `var(--st-*)`, not raw values.
- **Contract over customization.** A stable variable API enables consistency across apps.
- **Zero runtime.** Pure CSS custom properties. No JavaScript runtime, no style injection.

## Token Architecture

5-level naming: `--st-{category}-{property}-{role}-{prominence}-{state}`

### Categories
- **color**: bg, fg, bd, icon, ring across surface/interactive/form/feature/ui/status roles
- **space**: 0-8 scale (0 to 4rem) plus `px` (1px)
- **type**: size (0-9), weight, leading, tracking, family
- **elevation**: shadow levels 0-4
- **border**: radius (0-4 + full), width (0-2)
- **motion**: duration (instant to slow), easing curves
- **layout**: container/screen breakpoints, z-index scale

### Color Token Count
~121 semantic color tokens, each with light and dark hex values.

## Repo Map

```
staple-css/
├── packages/
│   └── tokens/              # @staple-css/tokens
│       ├── src/
│       │   ├── types.ts        # 5-level type system
│       │   ├── definitions/    # Token definitions by category
│       │   │   ├── color.ts       # ~121 semantic color tokens
│       │   │   ├── space.ts       # Space scale
│       │   │   ├── typography.ts  # Type tokens
│       │   │   ├── elevation.ts   # Shadow tokens
│       │   │   ├── border.ts      # Radius and width
│       │   │   ├── motion.ts      # Duration and easing
│       │   │   ├── layout.ts      # Container, screen, z-index
│       │   │   └── index.ts       # getAllTokens() registry
│       │   ├── color/          # OKLCH color utilities
│       │   │   ├── oklch.ts       # Color space conversions
│       │   │   ├── contrast.ts    # WCAG + APCA contrast
│       │   │   └── ramp.ts        # Ramp generation + harmonies
│       │   ├── generator/      # Output generators
│       │   │   ├── css.ts         # CSS custom properties
│       │   │   ├── json.ts        # W3C DTCG format
│       │   │   └── typescript.ts  # TS constants + cssVar()
│       │   ├── palettes.ts     # 22 Tailwind-compatible palettes
│       │   ├── generate.ts     # CLI entry point
│       │   └── index.ts        # Public API
│       └── dist/               # Generated output
│           ├── tokens.css         # Semantic tokens (:root)
│           ├── themes.css         # [data-theme] + prefers-color-scheme
│           ├── palettes.css       # 22 palette ramps (50-950)
│           ├── all.css            # Combined import
│           ├── tokens.json        # W3C DTCG format
│           └── tokens.ts          # TypeScript constants
├── apps/
│   └── docs/                # Documentation site (Vite + React)
│       └── src/
│           ├── pages/          # 18 lazy-loaded pages
│           ├── components/     # Layout, Header, Sidebar, etc.
│           ├── studio/         # Token Studio tools
│           ├── hooks/          # useTheme, useSearch, useTokens
│           ├── data/           # Navigation, search index
│           └── styles/         # theme, global, layout, code, animations
└── [config files]
```

## Local Development

```bash
# Install dependencies
npm install

# Build token package (generates dist/ files)
npm run build:packages

# Run docs site
npm run dev

# Type check
npm run typecheck

# Lint
npm run lint

# Regenerate token output files
cd packages/tokens && node --import tsx src/generate.ts
```

## Token Usage

### Import CSS

```css
/* Import all tokens + themes + palettes */
@import "@staple-css/tokens/all.css";

/* Or import selectively */
@import "@staple-css/tokens/tokens.css";
@import "@staple-css/tokens/themes.css";
@import "@staple-css/tokens/palettes.css";
```

### Use in stylesheets

```css
.card {
  padding: var(--st-space-4);
  background: var(--st-color-bg-surface-base);
  color: var(--st-color-fg-surface-base);
  border: var(--st-border-width-1) solid var(--st-color-bd-surface-base);
  border-radius: var(--st-border-radius-3);
  box-shadow: var(--st-elevation-2);
}
```

### Theme switching

Themes use `[data-theme]` attribute with `prefers-color-scheme` fallback:

```html
<html data-theme="light">
<!-- or -->
<html data-theme="dark">
```

### TypeScript usage

```typescript
import { colorTokens, spaceTokens, getAllTokens } from "@staple-css/tokens";
import { generateRamp, hexToOklch } from "@staple-css/tokens/color";
```

## Publishing

ESM-only with proper exports map. CSS files marked as `sideEffects`:

```bash
cd packages/tokens && npm publish --access public
```

## Code Style

- ESM only (`type: "module"`)
- TypeScript strict mode
- No raw CSS values -- always use `var(--st-*)`
- No runtime CSS generation
- No heavy dependencies
- Tree-shakeable exports

## Color Palettes

22 Tailwind-compatible palettes with 11 shades (50-950):
slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

```css
.button { background: var(--st-blue-600); }
```

## OKLCH Color Tools

```typescript
import { generateRamp, generateHarmony, hexToOklch } from "@staple-css/tokens/color";

const ramp = generateRamp({ baseColor: "#2563eb" });
const complementary = generateHarmony("#2563eb", "complementary");
```

## Docs Site

React + Vite + react-router-dom. Deployed to css.staplelab.com via GitHub Pages.

Pages: Home, Getting Started, Why Staple, Token reference (7 categories), Palettes, AI Usage, Token Studio (Explorer, Palette Generator, Token Editor, Theme Builder).

Visual direction: minimal, typographic, monochrome chrome with blue accent (#2563eb). System fonts + JetBrains Mono. No decorative elements, gradients, or illustrations.
