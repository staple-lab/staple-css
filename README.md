# staple-css

**The design token system that speaks both human and AI.**

A semantic, token-first CSS framework with React primitives. Built for consistency, performance, and AI-assisted development.

---

<div align="center">

**[📚 Documentation](https://staple-lab.github.io/staple-css/)** • **[🎨 Token Studio](https://staple-lab.github.io/staple-css/tokens-studio)** • **[📖 Storybook](https://staple-lab.github.io/staple-css/storybook)** • **[💬 GitHub](https://github.com/staple-lab/staple-css)**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm: @staple-css/tokens](https://img.shields.io/npm/v/@staple-css/tokens)](https://www.npmjs.com/package/@staple-css/tokens)
[![npm: @staple-css/primitives](https://img.shields.io/npm/v/@staple-css/primitives)](https://www.npmjs.com/package/@staple-css/primitives)

</div>

---

## Why staple-css?

**Consistency through constraints.** staple-css is a design token system that enforces consistency through a well-defined API, not configuration hell. Think of it as the contract between design and engineering—tokens are the interface, components are the implementation.

### The Problem

- **Tailwind:** 1000+ utility classes. Great for prototyping, hard for AI to reason about, harder for teams to maintain consistency.
- **CSS-in-JS:** Runtime overhead, bundle bloat, complicated mental model, tied to React internals.
- **Component Libraries:** 100+ components, massive bundle sizes, countless props, steep learning curves.
- **Raw CSS:** Complete freedom = zero constraints = inconsistent designs.

### The Solution

**staple-css provides just enough structure:**

✅ **Design tokens as the API** — `pad={4}` instead of `padding: 16px`
✅ **8 layout primitives** — Not 100+ components, just Box, Stack, Grid, etc.
✅ **Zero runtime** — Static CSS, no JavaScript overhead
✅ **Type-safe** — TypeScript prevents `pad={999}` or `tone="banana"`
✅ **AI-friendly** — Constrained APIs prevent hallucination
✅ **~75KB total** — Tokens + primitives, tree-shakeable
✅ **Theme anywhere** — Scope themes to any element, not just root

---

## Quick Comparison

| Feature | staple-css | Tailwind | Chakra UI | Emotion |
|---------|------------|----------|-----------|---------|
| **API Style** | Props (`pad={4}`) | Classes (`p-4`) | Props | CSS-in-JS |
| **Learning Curve** | ~8 primitives | ~1000 utilities | ~100 components | CSS + JS API |
| **Runtime Cost** | 0 KB | 0 KB | ~45 KB | ~15 KB |
| **Bundle (min+gzip)** | ~25 KB | ~10 KB (base) | ~90 KB | ~15 KB + CSS |
| **AI-Friendly** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| **Theming** | Scoped anywhere | Global config | Context Provider | Styled API |
| **Type Safety** | Full TypeScript | Class strings | Props typed | Template strings |
| **Tree-Shaking** | Per-component | Requires PurgeCSS | Limited | Per-component |
| **Migration Cost** | Low | Medium | High | High |

---

## Installation

```bash
npm install @staple-css/tokens @staple-css/primitives
```

## Basic Usage

```tsx
// 1. Import CSS once at app root
import "@staple-css/tokens/all.css";
import "@staple-css/primitives/primitives.css";

// 2. Import components
import { Container, Stack, Card, Text, Inline } from "@staple-css/primitives";

// 3. Build UI with token-driven props
export function App() {
  return (
    <Container size="lg">
      <Stack gap={6}>
        <Text as="h1" size={6} weight="bold">
          Welcome to staple-css
        </Text>

        <Card pad={5} radius={3} shadow={2} tone="primary">
          <Stack gap={3}>
            <Text size={4} weight="semibold">
              Token-First Design
            </Text>
            <Text tone="muted">
              Every prop accepts a token key, not arbitrary values.
              This enforces consistency and makes code generation predictable.
            </Text>
            <Inline gap={3} justify="end">
              <button>Cancel</button>
              <button>Save</button>
            </Inline>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
```

**That's it.** No config, no provider, no build setup.

---

## Core Principles

### 1. Tokens are the API

Design decisions live in tokens. Components consume token **keys**, not raw values.

```tsx
// ✅ Good: Token key
<Box pad={4} radius={2}>

// ❌ Bad: Raw value (not allowed)
<Box padding="16px" borderRadius="4px">
```

### 2. Contract over Customization

A stable, constrained API enables consistency. Override by design (via `className`), not by default.

```tsx
// Token system covers 90% of use cases
<Card pad={5} radius={3} shadow={1}>

// Escape hatch for the other 10%
<Card className="custom-special-card">
```

### 3. Consistency by Default

The happy path keeps you in the token system. Constraints guide you toward consistent designs.

```tsx
// Space scale: 0-8 (not arbitrary pixels)
<Stack gap={4}>  // 1rem (16px)
  <Box pad={5}>  // 1.5rem (24px)
```

### 4. Zero Runtime Overhead

All CSS is static. No JavaScript style generation, no CSS-in-JS overhead.

```tsx
// This compiles to:
<div class="st-Stack st-Stack--gap-4">
  <div class="st-Box st-Box--pad-5">

// Not:
<div style={{ display: 'flex', gap: '1rem' }}>
  <div style={{ padding: '1.5rem' }}>
```

### 5. Built for AI Code Generation

Constrained APIs with clear allowed values make it easy for LLMs to generate correct code.

```tsx
// AI knows: gap accepts 0-8
<Stack gap={4}>

// Not: gap accepts any CSS value
<Stack gap="17.3px">  // ❌ AI hallucinates weird values
```

---

## Packages

### @staple-css/tokens

**CSS variables for design tokens.** Spacing, colors, typography, shadows, motion, and more.

- ✅ **310+ CSS variables** across 20+ token categories
- ✅ **Light/dark themes** with `data-theme` attribute
- ✅ **Comfortable/compact density** modes
- ✅ **22 color palettes** (Tailwind-compatible)
- ✅ **Responsive breakpoints** system
- ✅ **Motion tokens** (duration, easing, delay)
- ✅ **OKLCH color generation** for perceptually uniform palettes

```bash
npm install @staple-css/tokens
```

[📖 Full Documentation →](./packages/tokens)

### @staple-css/primitives

**React layout and typography primitives.** Token-driven props, minimal runtime.

- ✅ **8 primitives:** Box, Stack, Inline, Grid, Container, Text, Card, Row/Column
- ✅ **Responsive props:** `pad={{ base: 3, md: 5, lg: 7 }}`
- ✅ **Type-safe:** Invalid token values caught at compile time
- ✅ **Polymorphic:** `as` prop for semantic HTML
- ✅ **Escape hatches:** `className` and limited `style` props
- ✅ **Tiny runtime:** ~5KB JS

```bash
npm install @staple-css/primitives
```

[📖 Full Documentation →](./packages/primitives)

---

## Features

### 🎨 Token Studio

An **interactive visual builder** for creating custom design systems. Better than Figma tokens, better than Style Dictionary.

**Features:**
- 🎨 Generate color palettes from base colors using OKLCH
- 🌈 Create color harmonies (complementary, triadic, analogous)
- 🎯 Map semantic tokens (primary, danger, success)
- ✅ Real-time WCAG contrast validation
- 👁️ Live component preview
- 💾 Export to CSS, JSON, TypeScript
- 📦 Import from Figma, Style Dictionary, etc.

[**Launch Token Studio →**](https://staple-lab.github.io/staple-css/tokens-studio)

### 📖 Storybook

Browse all components with **interactive controls**, view source code, and test accessibility.

[**View Storybook →**](https://staple-lab.github.io/staple-css/storybook)

### 🎭 Advanced Theming

Apply themes **anywhere**, not just at the root. Scope themes to specific components or sections.

```tsx
// Global theme
<body data-theme="dark">

// Scoped theme
<Card data-theme="brand-primary">
  This card uses brand-primary theme
</Card>
<Card data-theme="brand-secondary">
  This card uses brand-secondary theme
</Card>
```

**Runtime theme switching:**

```tsx
import { applyDynamicTheme } from '@staple-css/tokens/dynamic-theme';

// Apply theme to any element
applyDynamicTheme(customTheme, document.body);

// Or use React context
import { ThemeProvider } from '@staple-css/primitives';

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

### 📱 Responsive Design

**Intrinsic-first approach** using CSS Grid `auto-fill`/`auto-fit` and `minmax()`:

```tsx
// Grid that automatically adapts to container width
<Grid
  style={{
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 'var(--st-space-4)',
  }}
>
  <Card />
  <Card />
  <Card />
</Grid>
```

**Or use responsive props:**

```tsx
<Grid
  cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
  gap={{ base: 2, md: 4 }}
>
  <Card pad={{ base: 3, md: 5 }} />
</Grid>
```

**Breakpoints:** `base` (mobile-first), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)

### 🌈 Color System

**22 Tailwind-compatible palettes** with 11 shades each (50-950):

```tsx
import "@staple-css/tokens/palettes.css";

// Use in CSS
.button {
  background: var(--st-blue-600);
  color: var(--st-blue-50);
}
.button:hover {
  background: var(--st-blue-700);
}
```

**OKLCH color generation** for custom palettes:

```tsx
import { generateRamp, generateHarmony } from "@staple-css/tokens/color";

// Generate perceptually uniform color ramp
const brandRamp = generateRamp({ baseColor: "#007bff" });

// Generate color harmonies
const complementary = generateHarmony("#007bff", "complementary");
const triadic = generateHarmony("#007bff", "triadic");
```

### ⚡ Motion System

Comprehensive animation tokens for smooth, consistent motion:

```tsx
// CSS variables
transition: all var(--st-duration-normal) var(--st-easing-out);
animation-delay: var(--st-delay-100);

// Or in JavaScript
element.style.transition = `transform ${duration.normal} ${easing.emphasized}`;
```

**Duration tokens:** `instant`, `fast`, `normal`, `moderate`, `slow`, `slower`, `slowest`
**Easing tokens:** `default`, `linear`, `in`, `out`, `inOut`, `emphasized`, `bounce`, `elastic`
**Delay tokens:** `0`, `75`, `100`, `150`, `200`, `300`, `500`, `700`, `1000`

---

## Complete Token Reference

### Space Scale (0-8)

Used for padding, gap, margin:

| Token | Value | Usage |
|-------|-------|-------|
| 0 | 0 | No spacing |
| 1 | 4px | Tight spacing between related elements |
| 2 | 8px | Compact spacing |
| 3 | 12px | Default inline spacing |
| 4 | 16px | Comfortable spacing (recommended default) |
| 5 | 24px | Section spacing |
| 6 | 32px | Large section spacing |
| 7 | 48px | Major section breaks |
| 8 | 64px | Hero spacing, page-level margins |

```tsx
<Stack gap={4}>        // 16px gap
<Box pad={5}>          // 24px padding
<Text marginBottom={2}> // 8px margin
```

### Radius Scale (0-4)

Used for border-radius:

| Token | Value | Usage |
|-------|-------|-------|
| 0 | 0 | Sharp corners (technical, modern) |
| 1 | 2px | Subtle rounding |
| 2 | 4px | Standard rounding (cards, buttons) |
| 3 | 8px | Prominent rounding |
| 4 | 16px | Pill shape |

```tsx
<Card radius={2}>      // Standard card
<Box radius={4}>       // Pill-shaped badge
```

### Shadow Scale (0-2)

Used for elevation:

| Token | Value | Usage |
|-------|-------|-------|
| 0 | none | Flat, no elevation |
| 1 | subtle | Cards, slight elevation |
| 2 | prominent | Modals, dropdowns, prominent elevation |

```tsx
<Card shadow={1}>      // Subtle card elevation
<Modal shadow={2}>     // Prominent modal elevation
```

### Font Size Scale (0-6)

Used for typography:

| Token | Value | Usage |
|-------|-------|-------|
| 0 | 12px | Captions, metadata, legal text |
| 1 | 14px | Small text, labels |
| 2 | 16px | Body text (default) |
| 3 | 18px | Large body, subheadings |
| 4 | 20px | h3, card titles |
| 5 | 24px | h2, section headers |
| 6 | 32px | h1, hero text |

```tsx
<Text size={2}>        // Body text
<Text as="h1" size={6}> // Page title
```

### Color Tones

Semantic color tokens for UI elements:

| Tone | Usage |
|------|-------|
| `neutral` | Default UI elements |
| `muted` | Secondary text, subtle elements |
| `primary` | Primary actions, links |
| `secondary` | Secondary actions |
| `accent` | Highlighted elements |
| `danger` | Destructive actions, errors |
| `warn` | Warnings, cautions |
| `success` | Success states, confirmations |

```tsx
<Card tone="danger">
<Text tone="muted">
```

---

## Primitives API Reference

### Box

Generic container with padding, radius, and shadow.

```tsx
<Box
  as="section"                    // HTML element (default: div)
  pad={4}                         // Padding (0-8)
  radius={2}                      // Border radius (0-4)
  shadow={1}                      // Box shadow (0-2)
  margin={2}                      // Margin (0-8)
  maxWidth="lg"                   // Max width preset
  aspectRatio="video"             // Aspect ratio
  className="custom-box"          // Escape hatch
>
  Content
</Box>
```

**Responsive props:**
```tsx
<Box pad={{ base: 3, md: 5, lg: 7 }}>
```

### Stack

Vertical flex layout.

```tsx
<Stack
  gap={4}                         // Gap between children (0-8)
  align="center"                  // Cross-axis alignment
  as="section"                    // HTML element (default: div)
>
  <Item />
  <Item />
</Stack>
```

**Align values:** `start`, `center`, `end`, `stretch`

### Inline / Row

Horizontal flex layout.

```tsx
<Inline
  gap={3}                         // Gap between children (0-8)
  align="center"                  // Cross-axis alignment
  justify="between"               // Main-axis justification
  wrap={true}                     // Allow wrapping
>
  <Item />
  <Item />
</Inline>
```

**Align:** `start`, `center`, `end`, `baseline`, `stretch`
**Justify:** `start`, `center`, `end`, `between`, `around`

### Grid

CSS Grid layout.

```tsx
<Grid
  cols={3}                        // Number of columns (1-12)
  rows={2}                        // Number of rows
  gap={4}                         // Gap (0-8)
  flow="row"                      // Grid flow direction
>
  <Item />
  <Item />
</Grid>
```

**Responsive:**
```tsx
<Grid cols={{ base: 1, md: 2, lg: 4 }} gap={{ base: 2, md: 4 }}>
```

### Container

Centered max-width container.

```tsx
<Container size="lg">
  Content
</Container>
```

**Sizes:** `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)

### Text

Typography primitive.

```tsx
<Text
  as="p"                          // HTML element (p, span, h1-h6)
  size={3}                        // Font size (0-6)
  weight="semibold"               // Font weight
  tone="primary"                  // Color tone
  align="center"                  // Text alignment
  leading="relaxed"               // Line height
  mono={true}                     // Monospace font
>
  Text content
</Text>
```

**Weight:** `normal`, `medium`, `semibold`, `bold`
**Leading:** `tight`, `normal`, `relaxed`
**Tone:** `neutral`, `muted`, `primary`, `danger`, `warn`, `success`

### Card

Surface wrapper for grouped content.

```tsx
<Card
  pad={5}                         // Padding (0-8)
  radius={3}                      // Border radius (0-4)
  shadow={1}                      // Box shadow (0-2)
  tone="neutral"                  // Color tone
>
  Content
</Card>
```

---

## AI-Friendly Development

staple-css is **specifically designed for AI code generation**. Constrained token APIs prevent hallucination and ensure consistent output.

### LLM Context Files

- **[llms.txt](./llms.txt)** — Concise token reference for AI context
- **[llms-full.txt](./llms-full.txt)** — Comprehensive examples and patterns

### Why AI Loves staple-css

✅ **Constrained values** — LLMs can't hallucinate `pad={999}` or `tone="banana"`
✅ **Clear patterns** — `<Stack gap={4}>` is easier to reason about than `className="flex flex-col gap-4"`
✅ **Type safety** — Invalid values caught at compile time
✅ **Semantic props** — `pad={4}` is more semantic than `p-4`
✅ **Small API surface** — 8 primitives vs 1000 utility classes

**Example:** Ask an AI to create a responsive card grid:

```
"Create a responsive grid of cards with 1 column on mobile,
2 columns on tablet, and 4 columns on desktop"
```

**AI generates:**

```tsx
<Grid cols={{ base: 1, md: 2, lg: 4 }} gap={{ base: 2, md: 4 }}>
  <Card pad={5} radius={3} shadow={1}>
    <Stack gap={3}>
      <Text size={4} weight="semibold">Card Title</Text>
      <Text tone="muted">Card description</Text>
    </Stack>
  </Card>
</Grid>
```

No hallucinated values, no style conflicts, just clean, consistent code.

---

## Performance

staple-css is built for **maximum performance**:

### Bundle Size (min+gzip)

- `@staple-css/tokens`: ~18 KB CSS
- `@staple-css/primitives`: ~4 KB JS + ~8 KB CSS
- **Total: ~30 KB** (tokens + primitives)

### Runtime Performance

- ✅ **Zero runtime overhead** — All CSS is static
- ✅ **No style generation** — Props map to precomputed class names
- ✅ **Stable class names** — `st-Stack--gap-4` never changes per render
- ✅ **Tree-shakeable** — Import only what you use
- ✅ **Low specificity** — Uses `:where()` for easy overrides

### Comparison

| Library | Min+Gzip | Runtime Cost | Style Generation |
|---------|----------|--------------|------------------|
| **staple-css** | ~30 KB | 0 KB | Static |
| Tailwind CSS | ~10 KB (base) | 0 KB | Static |
| Chakra UI | ~90 KB | ~45 KB | Runtime |
| Emotion | ~15 KB + CSS | ~15 KB | Runtime |
| Styled Components | ~15 KB + CSS | ~15 KB | Runtime |

---

## Migration Guides

### From Tailwind CSS

**Tailwind uses utility classes.** staple-css uses props.

```tsx
// Tailwind
<div className="flex flex-col gap-4 p-6 rounded-lg shadow-md">
  <h1 className="text-2xl font-bold">Title</h1>
  <p className="text-gray-600">Description</p>
</div>

// staple-css
<Stack gap={4} pad={6} radius={3} shadow={1}>
  <Text as="h1" size={5} weight="bold">Title</Text>
  <Text tone="muted">Description</Text>
</Stack>
```

**Benefits:**
- ✅ Type-safe props instead of string classes
- ✅ Smaller API surface (8 primitives vs 1000 utilities)
- ✅ Better for AI code generation
- ✅ Easier to enforce consistency

### From Chakra UI

**Chakra has 100+ components.** staple-css has 8 primitives.

```tsx
// Chakra
<Box p={6} borderRadius="lg" boxShadow="md">
  <VStack spacing={4}>
    <Heading size="lg">Title</Heading>
    <Text color="gray.600">Description</Text>
  </VStack>
</Box>

// staple-css
<Card pad={6} radius={3} shadow={1}>
  <Stack gap={4}>
    <Text as="h1" size={5} weight="bold">Title</Text>
    <Text tone="muted">Description</Text>
  </Stack>
</Card>
```

**Benefits:**
- ✅ Smaller bundle (~30 KB vs ~90 KB)
- ✅ Zero runtime overhead
- ✅ Simpler mental model
- ✅ Faster to learn

### From CSS-in-JS (Emotion, Styled Components)

**CSS-in-JS has runtime overhead.** staple-css is static CSS.

```tsx
// Emotion
const Card = styled.div`
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  h1 {
    font-size: 24px;
    font-weight: bold;
  }
`;

// staple-css
<Card pad={5} radius={2} shadow={1}>
  <Text as="h1" size={5} weight="bold">Title</Text>
</Card>
```

**Benefits:**
- ✅ No runtime style generation
- ✅ Better performance
- ✅ Simpler mental model
- ✅ Works with any framework

---

## Deployment

### Documentation Site

The docs, Token Studio, and Storybook are automatically deployed to GitHub Pages on every push to `main`.

**Live URLs:**
- Docs: https://staple-lab.github.io/staple-css/
- Token Studio: https://staple-lab.github.io/staple-css/tokens-studio
- Storybook: https://staple-lab.github.io/staple-css/storybook

### Manual Build

```bash
# Build everything
npm run build

# Build only packages
npm run build:packages

# Build docs for deployment
BASE_URL=/staple-css/ npm run build:packages && npm run build:docs

# Build Storybook
npm run build-storybook
```

---

## Development

### Setup

```bash
# Clone repository
git clone https://github.com/staple-lab/staple-css.git
cd staple-css

# Install dependencies
npm install

# Build packages (required before running apps)
npm run build:packages

# Run docs site (includes Token Studio)
npm run dev

# Run Storybook
npm run storybook

# Run demo app
npm run dev:demo
```

### Available Commands

```bash
npm run build              # Build all packages and apps
npm run build:packages     # Build only tokens and primitives
npm run build:docs         # Build docs site
npm run build-storybook    # Build Storybook
npm run dev                # Run docs dev server
npm run dev:demo           # Run demo app
npm run storybook          # Run Storybook dev server
npm run test               # Run tests
npm run test:watch         # Run tests in watch mode
npm run typecheck          # Type check all packages
npm run lint               # Lint all files
npm run lint:fix           # Fix lint errors
npm run format             # Format all files
npm run bundle-size        # Check bundle sizes
npm run check-raw-values   # Lint CSS for raw values
npm run quality            # Run all quality checks
```

### Quality Checks

Before committing:

```bash
npm run quality
```

This runs:
- TypeScript type checking
- ESLint
- Tests
- Bundle size check

---

## Contributing

Contributions are welcome! Please follow these guidelines:

### Code Style

- ✅ Use ESLint and Prettier configs
- ✅ Write tests for new features
- ✅ Update documentation
- ✅ Check bundle size

### Token Rules

- ❌ **No raw values** — Use token variables only
- ❌ **Props accept token keys** — No arbitrary values like `"16px"` or `"#ff0000"`
- ✅ **Static CSS only** — No runtime style generation
- ✅ **Keep bundle minimal** — Avoid heavy dependencies
- ✅ **Maintain accessibility** — WCAG 2.1 AA minimum

### Contribution Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and commit: `git commit -m "Add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## Publishing

### Prerequisites

- Ensure all tests pass: `npm run quality`
- Update version in `package.json` files
- Build packages: `npm run build:packages`

### Publish to npm

```bash
# Publish tokens
cd packages/tokens
npm publish --access public

# Publish primitives
cd ../primitives
npm publish --access public
```

---

## License

MIT © [staple-lab](https://github.com/staple-lab)

---

## Links

- **[Documentation](https://staple-lab.github.io/staple-css/)**
- **[Token Studio](https://staple-lab.github.io/staple-css/tokens-studio)**
- **[Storybook](https://staple-lab.github.io/staple-css/storybook)**
- **[GitHub](https://github.com/staple-lab/staple-css)**
- **[npm: @staple-css/tokens](https://www.npmjs.com/package/@staple-css/tokens)**
- **[npm: @staple-css/primitives](https://www.npmjs.com/package/@staple-css/primitives)**
- **[Issues](https://github.com/staple-lab/staple-css/issues)**

---

<div align="center">

**Built with ❤️ by [staple-lab](https://github.com/staple-lab)**

*Tokens are the API. Contract over customization. Consistency by default.*

</div>
