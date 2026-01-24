# @staple-css/tokens

Design tokens for staple-css — semantic CSS variables for spacing, color, typography, and more.

## Installation

```bash
npm install @staple-css/tokens
```

## Usage

Import the CSS files at your application root:

```ts
// Import all tokens
import "@staple-css/tokens/all.css";

// Or import individually for more control
import "@staple-css/tokens/tokens.css";   // Base tokens (space, radius, typography, etc.)
import "@staple-css/tokens/themes.css";   // Light/dark color themes
import "@staple-css/tokens/density.css";  // Comfortable/compact density
```

## Theming

Apply themes using the `data-theme` attribute:

```html
<!-- Light theme (default) -->
<body data-theme="light">

<!-- Dark theme -->
<body data-theme="dark">
```

The system also respects `prefers-color-scheme` when no explicit theme is set.

## Density

Apply density using the `data-density` attribute:

```html
<!-- Comfortable density (default) -->
<body data-density="comfortable">

<!-- Compact density -->
<body data-density="compact">
```

## Token Reference

### Space Scale (0-8)

| Token | Value | CSS Variable |
|-------|-------|--------------|
| 0 | 0 | `--st-space-0` |
| 1 | 0.25rem (4px) | `--st-space-1` |
| 2 | 0.5rem (8px) | `--st-space-2` |
| 3 | 0.75rem (12px) | `--st-space-3` |
| 4 | 1rem (16px) | `--st-space-4` |
| 5 | 1.5rem (24px) | `--st-space-5` |
| 6 | 2rem (32px) | `--st-space-6` |
| 7 | 3rem (48px) | `--st-space-7` |
| 8 | 4rem (64px) | `--st-space-8` |

### Radius Scale (0-4)

| Token | Value | CSS Variable |
|-------|-------|--------------|
| 0 | 0 | `--st-radius-0` |
| 1 | 0.125rem (2px) | `--st-radius-1` |
| 2 | 0.25rem (4px) | `--st-radius-2` |
| 3 | 0.5rem (8px) | `--st-radius-3` |
| 4 | 1rem (16px) | `--st-radius-4` |

### Color Tokens

Semantic color tokens that automatically adjust for light/dark themes:

- `--st-color-background` — Page background
- `--st-color-surface` — Card/panel backgrounds
- `--st-color-surface-raised` — Elevated surfaces
- `--st-color-text` — Primary text
- `--st-color-text-muted` — Secondary text
- `--st-color-border` — Borders
- `--st-color-primary` — Primary actions
- `--st-color-danger` — Destructive actions
- `--st-color-warn` — Warning states
- `--st-color-success` — Success states

## TypeScript Support

Import types for type-safe token references:

```ts
import type { SpaceToken, RadiusToken, ColorToken } from "@staple-css/tokens";

// SpaceToken = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
// RadiusToken = 0 | 1 | 2 | 3 | 4
```

## License

MIT
