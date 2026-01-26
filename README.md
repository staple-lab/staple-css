# staple-css

**Design tokens for consistency. Built for humans and AI.**

staple-css is a **token-based design system** that provides semantic CSS variables, React primitives, and comprehensive documentation. It enforces design consistency through constrained token APIs—with deliberate escape hatches.

- 🎨 **Token-First**: CSS variables as the API, not arbitrary values
- 🤖 **LLM-Friendly**: Clear allowed values and patterns for AI-assisted code generation
- 📱 **Responsive**: Mobile-first breakpoint system (sm, md, lg, xl, 2xl)
- 🌓 **Theme System**: Static and dynamic theming with full tree-shaking support
- 🚀 **Zero Runtime**: All CSS is static—no style generation overhead
- ♿ **Accessible**: WCAG compliant colors, semantic HTML, built-in focus states
- 📦 **Minimal**: ~75KB total (tokens + primitives), tree-shakeable ESM exports

📚 **[Documentation](https://staple-lab.github.io/staple-css/)** | 🎨 **[Token Studio](https://staple-lab.github.io/staple-css/tokens-studio)** | 📖 **[Storybook](https://staple-lab.github.io/staple-css/storybook)** | 📄 **[LLM Guide](./llms.txt)**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![npm: @staple-css/tokens](https://img.shields.io/npm/v/@staple-css/tokens)](https://www.npmjs.com/package/@staple-css/tokens)
[![npm: @staple-css/primitives](https://img.shields.io/npm/v/@staple-css/primitives)](https://www.npmjs.com/package/@staple-css/primitives)

## ✨ Features

- 🎨 **Token Studio** - Interactive visual builder for creating custom design systems
- 🎯 **Type-Safe** - Full TypeScript support with strict prop types
- 📱 **Responsive** - Built-in responsive design with breakpoint system
- 🌓 **Light/Dark Themes** - Automatic theme switching with `prefers-color-scheme`
- 🎭 **WCAG Compliant** - Accessible color contrasts and semantic HTML
- 🚀 **Zero Runtime** - Static CSS with no JavaScript style generation
- 🪶 **Lightweight** - Minimal bundle size, tree-shakeable exports
- 🔧 **Escape Hatches** - `className` and `style` props when you need them
- 🎨 **Color Science** - OKLCH-based color generation for perceptually uniform palettes
- 📦 **22 Color Palettes** - Tailwind-compatible palettes (50-950 shades)

## 📦 Packages

| Package | Description | Version |
|---------|-------------|---------|
| [@staple-css/tokens](./packages/tokens) | CSS variables for spacing, color, typography, shadows, motion | - |
| [@staple-css/primitives](./packages/primitives) | React primitives: Box, Stack, Inline, Grid, Container, Text, Card | - |

## 🚀 Quick Start

### Installation

```bash
npm install @staple-css/tokens @staple-css/primitives
```

### Basic Usage

```tsx
// Import CSS at your app root
import "@staple-css/tokens/all.css";
import "@staple-css/primitives/primitives.css";

// Use components
import { Container, Stack, Card, Text, Box } from "@staple-css/primitives";

function App() {
  return (
    <Container size="lg">
      <Stack gap={4}>
        <Text as="h1" size={5} weight="bold">
          Hello, staple-css
        </Text>
        <Card pad={5} radius={3} shadow={1}>
          <Stack gap={2}>
            <Text weight="semibold">Card Title</Text>
            <Text tone="muted">Card description goes here.</Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
```

### Responsive Design

All layout primitives support responsive props using breakpoint objects:

```tsx
import { Grid, Box, Stack } from "@staple-css/primitives";

function ResponsiveLayout() {
  return (
    <Grid
      cols={{ base: 1, sm: 2, lg: 4 }}
      gap={{ base: 2, md: 4 }}
    >
      <Box pad={{ base: 3, md: 5 }} radius={2}>
        <Stack gap={{ base: 2, lg: 4 }}>
          <Text size={4}>Responsive Card</Text>
          <Text>Adapts to screen size automatically</Text>
        </Stack>
      </Box>
    </Grid>
  );
}
```

**Breakpoints:**
- `base` - Default (mobile-first)
- `sm` - 640px and up
- `md` - 768px and up
- `lg` - 1024px and up
- `xl` - 1280px and up
- `2xl` - 1536px and up

## 🤖 Perfect for LLM-Assisted Development

staple-css is specifically designed to work well with AI code generation tools. See **[llms.txt](./llms.txt)** for a concise reference of allowed token values and **[llms-full.txt](./llms-full.txt)** for comprehensive examples.

**LLM-Friendly Features:**
- ✅ Constrained token values prevent hallucination of arbitrary CSS values
- ✅ Clear, documented API surfaces for consistent code generation
- ✅ Responsive patterns that are easy for LLMs to understand and implement
- ✅ Common patterns documented with copy-paste ready examples
- ✅ Type safety ensures generated code is correct TypeScript

**Example: AI generates consistent layouts**
```tsx
// LLM knows spacing tokens are 0-8, not arbitrary pixels
<Stack gap={4}>  // ✓ Generates 16px gap
  <Card pad={5} radius={2} shadow={1}>
    <Text size={4} weight="bold">Heading</Text>
  </Card>
</Stack>
```

## 📐 Theme System

### Static Themes (Build-Time)
Export custom themes as static CSS for production:
```tsx
import { createTheme, themeToCSS } from '@staple-css/tokens';

const brandTheme = createTheme({
  colors: { primary: '#007bff', text: '#212529' },
  space: { /* custom spacing scale */ },
});

const css = themeToCSS(brandTheme);
// Use in your build process
```

### Dynamic Themes (Runtime)
Apply and switch themes at runtime:
```tsx
import { applyDynamicTheme } from '@staple-css/tokens/dynamic-theme';
import { ThemeProvider, useTheme } from '@staple-css/primitives';

// Apply globally
applyDynamicTheme(customTheme);

// Or use React Provider
<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>

// Or hook-based
const { apply, remove } = useTheme();
apply(darkTheme);
```

### Theme Scoping
Apply different themes to different parts of your UI:
```tsx
<Box data-theme="brand-primary">
  Primary brand UI
</Box>
<Box data-theme="brand-secondary">
  Secondary brand UI
</Box>
```

## 🎨 Token Studio

The **[Token Studio](https://staple-lab.github.io/staple-css/tokens-studio)** is an interactive visual builder that lets you:

- 🎨 **Create Custom Palettes** - Generate color scales from base colors using OKLCH color space
- 🎯 **Semantic Color Mapping** - Define button colors, status colors, and UI elements
- 🌈 **Color Harmonies** - Generate complementary, triadic, and analogous color schemes
- ✅ **Accessibility Testing** - Real-time WCAG contrast validation
- 👁️ **Live Preview** - See your design system in action with responsive components
- 💾 **Export/Import** - Save and share your design system as JSON
- 📋 **CSS Export** - Generate production-ready CSS with your custom tokens

[**Try the Token Studio →**](https://staple-lab.github.io/staple-css/tokens-studio)

## 🎭 Theming

Apply themes using data attributes:

```html
<!-- Light theme (default) -->
<body data-theme="light">

<!-- Dark theme -->
<body data-theme="dark">

<!-- Comfortable density (default) -->
<body data-density="comfortable">

<!-- Compact density -->
<body data-density="compact">
```

The system automatically respects `prefers-color-scheme` when no explicit theme is set.

### Dynamic Theme Switching

```tsx
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
```

## 📐 Core Principles

1. **Tokens are the API** - Design decisions are encoded in tokens. Components consume token keys (`pad={4}`), not raw values (`padding: 16px`).
2. **Contract over customization** - A stable, constrained API enables consistency. Override by design, not by default.
3. **Consistency by default** - The happy path keeps you in the token system. Escape hatches via `className` and `style` props for exceptions.
4. **Zero runtime overhead** - All CSS is static. No JavaScript style generation, no CSS-in-JS overhead.
5. **LLM-aware design** - Constrained APIs that prevent AI hallucination and enable consistent code generation.

## 🎯 Why staple-css?

### vs. Tailwind CSS
- **Token-first instead of utility-first**: Semantic APIs (`pad={4}`) instead of class names (`p-4`)
- **Built-in theming**: Static and dynamic themes with scoping
- **Type-safe by default**: TypeScript props prevent invalid values
- **Smaller API surface**: Easier for LLMs to generate correct code
- **Works great with AI**: Constrained values prevent hallucination

### vs. CSS-in-JS (Emotion, Styled Components)
- **Zero runtime overhead**: Static CSS generated at build time
- **Better bundle size**: ~75KB total vs. runtime libraries
- **Native CSS variables**: Works everywhere, no custom API
- **Works with any framework**: Not tied to React internals

### vs. Material-UI / Chakra UI
- **Lightweight primitives**: Box, Stack, Grid, not 100+ components
- **Token-first philosophy**: Consistency through constraints, not component variants
- **Better for AI**: Clearer patterns for code generation
- **Simpler learning curve**: Fewer options = faster onboarding

## 🎯 Primitives Reference

### Box

Generic container with padding, radius, and shadow. Supports responsive props.

```tsx
<Box pad={4} radius={2} shadow={1}>Content</Box>
<Box as="section" pad={{ base: 3, md: 5 }}>Responsive padding</Box>
```

**Props:** `pad`, `radius`, `shadow`, `as`, `className`, `style`

### Stack

Vertical flex layout with consistent gap. Perfect for vertical spacing.

```tsx
<Stack gap={4} align="center">
  <Item />
  <Item />
</Stack>

{/* Responsive gap and alignment */}
<Stack gap={{ base: 2, md: 4 }} align={{ base: "start", md: "center" }}>
  <Item />
</Stack>
```

**Props:** `gap`, `align`, `as`, `className`, `style`

### Inline

Horizontal flex layout with consistent gap. Perfect for buttons, badges, tags.

```tsx
<Inline gap={3} align="center" justify="between">
  <Item />
  <Item />
</Inline>

{/* Responsive layout */}
<Inline
  gap={{ base: 2, lg: 4 }}
  wrap={{ base: true, lg: false }}
  justify={{ base: "center", md: "between" }}
>
  <Button />
  <Button />
</Inline>
```

**Props:** `gap`, `align`, `justify`, `wrap`, `as`, `className`, `style`

### Grid

CSS Grid layout with responsive columns and rows.

```tsx
<Grid cols={3} gap={4}>
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</Grid>

{/* Responsive grid: 1 col mobile, 2 col tablet, 4 col desktop */}
<Grid cols={{ base: 1, md: 2, lg: 4 }} gap={{ base: 2, md: 4 }}>
  <Card />
  <Card />
  <Card />
  <Card />
</Grid>
```

**Props:** `cols`, `rows`, `gap`, `rowGap`, `columnGap`, `flow`, `align`, `justify`, `as`, `className`, `style`

### Container

Centered max-width container with responsive padding.

```tsx
<Container size="lg">Content</Container>
<Container size="md">Narrower content</Container>
```

**Sizes:** `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)

### Text

Typography primitive with semantic sizing and tones.

```tsx
<Text as="h1" size={5} weight="bold">Heading</Text>
<Text tone="muted" size={1}>Small muted text</Text>
<Text as="p" size={2} leading="relaxed">Body paragraph</Text>
```

**Props:** `as`, `size`, `weight`, `tone`, `align`, `leading`, `mono`, `className`, `style`

### Card

Surface wrapper for grouped content with elevation.

```tsx
<Card pad={5} radius={3} shadow={1} tone="neutral">
  <Stack gap={2}>
    <Text weight="semibold">Title</Text>
    <Text tone="muted">Description</Text>
  </Stack>
</Card>

{/* Status cards */}
<Card tone="danger" pad={4} radius={2}>
  <Text>Error message</Text>
</Card>
```

**Props:** `pad`, `radius`, `shadow`, `tone`, `as`, `className`, `style`

## 📚 Complete Token Reference

**Quick lookup:** See [llms.txt](./llms.txt) for concise reference or [llms-full.txt](./llms-full.txt) for comprehensive examples.

### All Token Categories

| Category | Values | CSS Variable | Usage |
|----------|--------|--------------|-------|
| **Space** | 0-8 | `--st-space-{n}` | `pad`, `gap`, `margin` |
| **Radius** | 0-4 | `--st-radius-{n}` | `radius` |
| **Shadow** | 0-2 | `--st-shadow-{n}` | `shadow` |
| **Font Size** | 0-6 | `--st-font-size-{n}` | Text `size` |
| **Font Weight** | normal, medium, semibold, bold | `--st-font-weight-{name}` | Text `weight` |
| **Line Height** | tight, normal, relaxed | `--st-leading-{name}` | Text `leading` |
| **Z-Index** | 0, 10, 20, 30, 40, 50, max | `--st-z-{n}` | `zIndex` |
| **Opacity** | 0-100 | `--st-opacity-{n}` | `opacity` |
| **Display** | block, flex, grid, none, etc. | `--st-display-{name}` | *Available via CSS* |
| **Position** | static, relative, absolute, fixed, sticky | `--st-position-{name}` | *Available via CSS* |
| **Overflow** | visible, hidden, scroll, auto | `--st-overflow-{name}` | *Available via CSS* |
| **Cursor** | auto, pointer, wait, grab, etc. | `--st-cursor-{name}` | *Available via CSS* |
| **Colors** | Semantic + 22 Tailwind palettes | `--st-color-{name}` | Text `tone`, CSS backgrounds |

## 🎨 Token Reference

### Space Scale (0-8)

Used for padding, gap, and margin spacing.

| Token | Value | Use Case |
|-------|-------|----------|
| 0 | 0 | No spacing |
| 1 | 0.25rem (4px) | Tight spacing |
| 2 | 0.5rem (8px) | Compact spacing |
| 3 | 0.75rem (12px) | Default spacing |
| 4 | 1rem (16px) | Comfortable spacing |
| 5 | 1.5rem (24px) | Generous spacing |
| 6 | 2rem (32px) | Section spacing |
| 7 | 3rem (48px) | Large section spacing |
| 8 | 4rem (64px) | Hero spacing |

### Radius Scale (0-4)

Used for border-radius.

| Token | Value | Use Case |
|-------|-------|----------|
| 0 | 0 | Sharp corners |
| 1 | 0.125rem (2px) | Subtle rounding |
| 2 | 0.25rem (4px) | Standard rounding |
| 3 | 0.5rem (8px) | Prominent rounding |
| 4 | 1rem (16px) | Pill shape |

### Font Size Scale (0-6)

| Token | Value | Use Case |
|-------|-------|----------|
| 0 | 0.75rem (12px) | Caption, metadata |
| 1 | 0.875rem (14px) | Small text, labels |
| 2 | 1rem (16px) | Body text (default) |
| 3 | 1.125rem (18px) | Large body, h4 |
| 4 | 1.25rem (20px) | h3 |
| 5 | 1.5rem (24px) | h2 |
| 6 | 2rem (32px) | h1, hero |

### Shadow Scale (0-2)

| Token | Use Case |
|-------|----------|
| 0 | No shadow |
| 1 | Subtle elevation |
| 2 | Prominent elevation |

### Color Tokens

Semantic color tokens that automatically adapt to light/dark themes:

**Surfaces:**
- `background` - App background
- `surface` - Card/panel background
- `surfaceRaised` - Elevated surface (modals, dropdowns)

**Text:**
- `text` - Primary text
- `textMuted` - Secondary text
- `textInverse` - Text on colored backgrounds

**Borders:**
- `border` - Default borders
- `borderMuted` - Subtle borders
- `borderHover` - Hover state borders
- `borderFocus` - Focus state borders

**Actions:**
- `primary`, `primaryHover`, `primaryText`, `primaryBorder`
- `secondary`, `secondaryHover`, `secondaryText`, `secondaryBorder`
- `accent`, `accentHover`, `accentText`, `accentBorder`

**Status:**
- `danger`, `dangerHover`, `dangerText`, `dangerSurface`
- `warn`, `warnHover`, `warnText`, `warnSurface`
- `success`, `successHover`, `successText`, `successSurface`

**Shadows:**
- `shadow`, `shadowMedium`, `shadowLarge`

## 🎨 Color Palettes

staple-css includes 22 Tailwind-compatible color palettes with 11 shades each (50-950):

```tsx
import "@staple-css/tokens/palettes.css";
```

**Available palettes:**
`slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

**Usage in CSS:**
```css
.button {
  background: var(--st-blue-600);
}
.button:hover {
  background: var(--st-blue-700);
}
```

### OKLCH Color Generation

Generate custom color palettes using the OKLCH color space:

```typescript
import { generateRamp, generateHarmony } from "@staple-css/tokens/color";

// Generate 12-step ramp from base color
const ramp = generateRamp({ baseColor: "#2563eb" });

// Generate color harmonies
const complementary = generateHarmony("#2563eb", "complementary");
const triadic = generateHarmony("#2563eb", "triadic");
const analogous = generateHarmony("#2563eb", "analogous");
```

**Harmony types:** `complementary`, `split-complementary`, `triadic`, `tetradic`, `analogous`

## 🚀 Performance

staple-css is designed for maximum performance:

- **Static CSS**: All styling is static CSS loaded upfront—no runtime style generation
- **Minimal Runtime**: Components do simple object lookups to map props to class names
- **Tree-Shakeable**: ESM exports with proper module boundaries
- **Stable Class Names**: Class names like `st-Stack--gap-4` are precomputed and never change
- **No Heavy Dependencies**: Near-zero runtime overhead (just React peer dependency)
- **CSS Container Queries**: Responsive layouts based on container size, not viewport
- **Low Specificity**: Uses `:where()` for easy overrides without specificity wars

**Bundle Size:**
- `@staple-css/tokens`: ~50KB CSS (uncompressed)
- `@staple-css/primitives`: ~5KB JS + ~20KB CSS (uncompressed)

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone https://github.com/staple-lab/staple-css.git
cd staple-css

# Install dependencies
npm install

# Build packages
npm run build:packages

# Run docs site (includes Token Studio)
npm run dev
# Visit http://localhost:3000

# Run demo app
npm run dev:demo
```

### Available Commands

```bash
# Build all packages
npm run build

# Build only tokens and primitives
npm run build:packages

# Build docs for deployment
npm run build:docs

# Run tests
npm run test

# Type checking
npm run typecheck

# Linting
npm run lint

# Check bundle size
npm run bundle-size

# Check for raw values in CSS
npm run check-raw-values

# Run all quality checks
npm run quality
```

## 📚 Documentation

Visit the **[live documentation](https://staple-lab.github.io/staple-css/)** for:

- 📖 Complete API reference
- 🎨 Token Studio visual builder
- 🧪 Interactive examples
- 📱 Responsive design patterns
- 🎭 Theming guide
- 🌈 Color system deep dive

## 🚢 Deployment

The documentation site is automatically deployed to GitHub Pages on every push to `main`.

See [.github/DEPLOYMENT.md](./.github/DEPLOYMENT.md) for deployment details.

### Manual Deployment

```bash
# Build for production
BASE_URL=/staple-css/ npm run build:packages && npm run build:docs

# Test locally
npx serve apps/docs/dist -p 3000
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository** and create a feature branch
2. **Follow the code style** - use ESLint and Prettier settings
3. **Write tests** for new features
4. **Update documentation** if adding features
5. **Check bundle size** - run `npm run bundle-size`
6. **Ensure quality checks pass** - run `npm run quality`

### Contribution Rules

- **No raw CSS values** - Use token variables only
- **Props accept token keys** - No arbitrary values like `"16px"` or `"#ff0000"`
- **Static CSS only** - No runtime style generation
- **Keep bundle size minimal** - Avoid heavy dependencies
- **Maintain accessibility** - WCAG 2.1 AA minimum

## 📄 License

MIT © [staple-lab](https://github.com/staple-lab)

---

**[Documentation](https://staple-lab.github.io/staple-css/)** • **[Token Studio](https://staple-lab.github.io/staple-css/tokens-studio)** • **[GitHub](https://github.com/staple-lab/staple-css)** • **[Issues](https://github.com/staple-lab/staple-css/issues)**
