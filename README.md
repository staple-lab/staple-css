# staple-css

**A shared styling contract for apps—tokens, primitives, and accessible components.**

Semantic CSS variables standardize spacing, color, typography, and variants. Tokens are the API. Contract over customization. Consistency by default, with deliberate escape hatches.

📚 **[Live Documentation & Token Studio](https://staple-lab.github.io/staple-css/)** | 🎨 [Try the Token Builder](https://staple-lab.github.io/staple-css/tokens-studio)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)

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

- **Tokens are the API.** Design decisions are encoded in tokens. Components consume token keys, not arbitrary values.
- **Contract over customization.** A stable API enables consistency. Override by design, not by default.
- **Consistency by default, escape hatches by design.** The happy path keeps you in the token system. `className` is always available for overrides.

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
