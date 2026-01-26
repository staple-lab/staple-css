# The staple-css Token System

## Overview

staple-css is built on a **token-first architecture** where design decisions are encoded as tokens and flow through the entire system. This document explains how tokens work, why they matter, and how to use them effectively.

## Design Decision → Implementation Flow

Every UI style in staple-css flows through a consistent pipeline:

```
┌─────────────────────────────────┐
│  Design Decision                 │
│  (e.g., "16px spacing")         │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Token Definition                │
│  space: { 4: "1rem" }           │
│  ↓                              │
│  CSS Variable                    │
│  --st-space-4: 1rem             │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Component Prop                  │
│  <Stack gap={4}>                │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Compiled HTML + CSS            │
│  <div class="st-Stack--gap-4">  │
│  gap: var(--st-space-4);        │
└─────────────────────────────────┘
```

**Key principle:** No raw values enter the system at any level. Everything is a token or a reference to a token.

---

## Token Categories (30+ total)

### Structural Tokens

#### Space (0-8)
Used for padding, margin, gap, and any layout spacing.

| Key | Value | Usage |
|-----|-------|-------|
| 0 | 0 | Reset/no spacing |
| 1 | 4px | Micro-spacing, tight grouping |
| 2 | 8px | Compact spacing |
| 3 | 12px | Default inline spacing |
| 4 | 16px | **Recommended default** spacing |
| 5 | 24px | Section spacing |
| 6 | 32px | Large section breaks |
| 7 | 48px | Major visual sections |
| 8 | 64px | Hero/page-level spacing |

**Component usage:**
```tsx
<Stack gap={4}>              // --st-space-4
<Box pad={5}>               // --st-space-5
<Inline gap={{ md: 6 }}>    // Responsive spacing
```

#### Radius (0-4)
Used for border-radius on containers and surfaces.

| Key | Value | Purpose |
|-----|-------|---------|
| 0 | 0 | Sharp, technical look |
| 1 | 2px | Subtle, minimal rounding |
| 2 | 4px | **Standard default** (cards, boxes) |
| 3 | 8px | Prominent, friendly rounding |
| 4 | 16px | Pill shape, extreme rounding |

**Component usage:**
```tsx
<Card radius={2}>           // Standard cards
<Box radius={4}>            // Pill-shaped badges
```

#### Box Shadow (0-5) - Elevation System
Used for depth and layering.

| Key | Value | Use Case |
|-----|-------|----------|
| 0 | none | Flat, no elevation |
| 1 | subtle | Slight lift, default cards |
| 2 | prominent | Important containers, cards |
| 3 | strong | Floating panels |
| 4 | stronger | Modals, overlays |
| 5 | strongest | Top-level floating elements |

**Component usage:**
```tsx
<Card shadow={1}>           // Default card elevation
<Box shadow={3}>            // Prominent floating container
```

#### Text Shadow (sm-lg)
Used for typography emphasis and readability over images.

```tsx
// In custom CSS with escape hatch:
<Text className="text-shadow-md">Text over image</Text>
```

#### Z-Index (0-50, max)
Used for stacking contexts in positioned elements.

| Key | Value | Purpose |
|-----|-------|---------|
| 0 | 0 | Default layer |
| 10 | 10 | Slightly elevated |
| 20 | 20 | Dropdown menus |
| 30 | 30 | Tooltips |
| 40 | 40 | Modal backdrops |
| 50 | 50 | Modal dialogs |
| max | 9999 | Top-level overlays |

**Component usage:**
```tsx
<Box className="st-Box--z-index-40">Modal backdrop</Box>
```

#### Inset (0-6, auto)
Used for `top`, `right`, `bottom`, `left` positioning.

```tsx
// Used in conjunction with position: absolute/fixed
<Box className="st-Box--inset-4">Content 16px from edges</Box>
```

#### Transform Tokens

**Translate (±0 to ±6):**
```tsx
// For animations and transforms
transform: translateX(var(--st-translate-4))  // 16px
```

**Rotate (0°, 45°, 90°, 180°, -45°, -90°):**
```tsx
transform: rotate(var(--st-rotate-90))  // 90 degrees
```

**Backdrop Filter (blur effects):**
```tsx
backdrop-filter: var(--st-backdrop-filter-blur-md)  // 20px blur
```

### Typography Tokens

#### Font Family
```tsx
<Text mono>Monospace text</Text>
// Uses: font-family: var(--st-fontFamily-mono)
```

- `sans`: System UI stack (default)
- `mono`: Monospace for code

#### Font Size (0-6)
Used for all typography scales.

| Key | Value | Use Case |
|-----|-------|----------|
| 0 | 12px | Caption, metadata, fine print |
| 1 | 14px | Small labels, secondary text |
| 2 | 16px | Body text **(default)** |
| 3 | 18px | Large body, subheadings |
| 4 | 20px | h3, card titles |
| 5 | 24px | h2, section headers |
| 6 | 32px | h1, page titles |

**Component usage:**
```tsx
<Text size={2}>Body paragraph</Text>
<Text as="h1" size={6}>Page title</Text>
```

#### Font Weight
```tsx
<Text weight="bold">Emphasis</Text>
```

- `normal`: 400 (default)
- `medium`: 500 (slightly heavier)
- `semibold`: 600 (stronger emphasis)
- `bold`: 700 (maximum emphasis)

#### Line Height
```tsx
<Text leading="relaxed">Relaxed line height</Text>
```

- `tight`: 1.25 (compact, 25% above text height)
- `normal`: 1.5 (default, 50% above text height)
- `relaxed`: 1.75 (spacious, 75% above text height)

#### Letter Spacing
```tsx
// Via CSS variable (use as escape hatch)
letter-spacing: var(--st-letterSpacing-wider)
```

- `tighter`: -0.05em
- `tight`: -0.025em
- `normal`: 0
- `wide`: 0.025em
- `wider`: 0.05em
- `widest`: 0.1em

### Visual Tokens

#### Opacity (0-100, 5% increments)
Used for transparency layers.

```tsx
// Via CSS variable (use as escape hatch)
opacity: var(--st-opacity-50)  // 50% opacity
```

| Key | Value |
|-----|-------|
| 0 | Fully transparent |
| 50 | 50% opacity |
| 100 | Fully opaque |

#### Border Width (0, 1, 2, 3, 4, 8)
Used for border sizes.

#### Outline Width (0, 1, 2, 4, 8)
Used for focus outlines and borders.

#### Outline Offset (0, 1, 2, 4, 8)
Used to space outline from element.

#### Blur (0, sm, md, lg, xl, 2xl, 3xl)
Used for blur effects in CSS filters.

```tsx
// Via CSS variable
filter: blur(var(--st-blur-md))
```

#### Brightness, Contrast, Saturate, Scale
Used for image and element effects.

```tsx
filter: brightness(var(--st-brightness-110))  // 110% brightness
```

### Color Tokens

#### Semantic Colors (Light & Dark Themes)
```tsx
<Card tone="primary">Primary action</Card>
<Text tone="muted">Secondary text</Text>
```

**Light Theme:**
- `background`: #fff (primary page background)
- `surface`: #f9fafb (card/surface background)
- `text`: #111827 (primary text)
- `textMuted`: #6b7280 (secondary text)
- `border`: #e5e7eb (border color)
- `primary`: #2563eb (primary brand color)
- `danger`: #dc2626 (error/destructive action)
- `warn`: #d97706 (warning state)
- `success`: #16a34a (success state)
- `focus`: #2563eb (focus ring color)

**Dark Theme:**
- Applied via `data-theme="dark"`
- All colors automatically invert for readability

#### Color Palettes (22 total)
22 industry-standard color palettes with 11 shades (50-950):

```tsx
import "@staple-css/tokens/palettes.css"

// Use in CSS:
background: var(--st-blue-600)
```

Available: slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

### Motion Tokens

#### Duration
```tsx
transition: all var(--st-duration-normal) var(--st-easing-out)
```

| Key | Value | Purpose |
|-----|-------|---------|
| instant | 75ms | Near-instant feedback |
| fast | 150ms | Quick micro-interactions |
| normal | 200ms | **Default** standard transitions |
| moderate | 300ms | Noticeable transitions |
| slow | 500ms | Deliberate, cinematic |
| slower | 700ms | Very slow animations |
| slowest | 1000ms | Ultra-slow, special effects |

#### Easing Functions
```tsx
transition: opacity var(--st-duration-normal) var(--st-easing-emphasized)
```

- `default`: Standard ease-in-out
- `linear`: No acceleration
- `in`: Accelerating from zero
- `out`: Decelerating to zero
- `inOut`: Accelerate then decelerate
- `emphasized`: Material Design emphasized curve
- `standard`: Material Design standard curve
- `bounce`: Spring/bounce effect
- `snap`: Snappy, springy feel
- `elastic`: Elastic/rubber effect

#### Delay
```tsx
animation-delay: var(--st-delay-200)
```

Values: 0, 75, 100, 150, 200, 300, 500, 700, 1000 ms

### Layout Tokens

#### Max Width Presets
Used for content constraint sizes.

```tsx
<Box maxWidth="lg">Constrained content</Box>
```

- `xs`: 320px (mobile)
- `sm`: 384px
- `md`: 448px
- `lg`: 512px (standard)
- `xl`: 576px
- `2xl`: 672px
- `3xl`: 768px
- `prose`: 65ch (optimal reading length)

#### Aspect Ratio
```tsx
<Box aspectRatio="video">16:9 container</Box>
```

- `square`: 1:1
- `video`: 16:9
- `portrait`: 3:4
- `landscape`: 4:3
- `wide`: 21:9
- `golden`: 1.618:1 (golden ratio)

#### Display Values
- `block`, `inline-block`, `inline`
- `flex`, `inline-flex`
- `grid`, `inline-grid`
- `none`, `contents`

#### Position Values
- `static` (default)
- `relative` (positioned relative to normal flow)
- `absolute` (positioned absolute to parent)
- `fixed` (positioned fixed to viewport)
- `sticky` (positioned sticky in container)

#### Overflow Values
- `visible` (default, content overflows)
- `hidden` (content clipped)
- `scroll` (scrollbars always shown)
- `auto` (scrollbars only when needed)
- `clip` (content clipped, no scroll)

### Density Tokens

Used to scale spacing and dimensions for comfortable vs. compact modes.

**Comfortable (default):**
```tsx
controlHeight: 40px       // Button/input height
controlPaddingX: 16px     // Horizontal padding
stackGap: 16px            // Default gap spacing
```

**Compact:**
```tsx
controlHeight: 32px       // Smaller controls
controlPaddingX: 12px     // Tighter padding
stackGap: 12px            // Tighter gaps
```

Applied via CSS to entire component:
```tsx
// Entire tree uses compact density
<div data-density="compact">
  <Stack gap={4}>         // Gap uses compact value
```

### Flex Layout Tokens

#### Flex Grow
- `0` (default, no growth)
- `1` (grows to fill available space)

#### Flex Shrink
- `0` (doesn't shrink)
- `1` (default, shrinks if needed)

#### Order
- `-1`, `0` (default), `1`, `2`, `3`
- Reorders flex items

### Interaction Tokens

#### Cursor Values
- `auto` (default)
- `pointer` (clickable)
- `grab`, `grabbing` (draggable)
- `wait` (processing)
- `not-allowed` (disabled)

### Text Utility Tokens

#### Text Transform
- `none` (default)
- `uppercase`, `lowercase`, `capitalize`

#### White Space
- `normal` (default)
- `nowrap` (single line)
- `pre`, `pre-line`, `pre-wrap` (whitespace preserved)

#### Object Fit (for images)
- `contain`, `cover`, `fill`, `scale-down`

---

## Component-to-Token Mapping

### Box
Uses: space, radius, shadow, z-index, opacity, border-width, max-width, aspect-ratio

```tsx
<Box
  pad={4}           // --st-space-4
  radius={2}        // --st-radius-2
  shadow={1}        // --st-boxShadow-1
  margin={3}        // --st-space-3
  maxWidth="lg"     // --st-maxWidth-lg
  aspectRatio="video" // --st-aspectRatio-video
/>
```

### Stack (Vertical Flex)
Uses: space (gap, align), flex alignment

```tsx
<Stack
  gap={4}           // --st-space-4
  align="center"    // flex alignment
/>
```

### Inline/Row (Horizontal Flex)
Uses: space (gap), flex alignment, justification

```tsx
<Inline
  gap={3}           // --st-space-3
  align="center"    // cross-axis alignment
  justify="between" // main-axis justification
/>
```

### Grid
Uses: space (gap), grid column/row, flow

```tsx
<Grid
  cols={3}          // Grid columns
  gap={4}           // --st-space-4
/>
```

### Container
Uses: max-width presets

```tsx
<Container size="lg">  // Constrains to lg max-width
```

### Text
Uses: font-size, font-weight, line-height, color (tone), letter-spacing

```tsx
<Text
  size={3}          // --st-fontSize-3
  weight="bold"     // --st-fontWeight-bold
  leading="relaxed" // --st-lineHeight-relaxed
  tone="primary"    // --st-color-primary
/>
```

### Card
Uses: space (padding), radius, shadow, tone (background/border color)

```tsx
<Card
  pad={5}           // --st-space-5
  radius={3}        // --st-radius-3
  shadow={2}        // --st-boxShadow-2
  tone="neutral"    // Color tone background
/>
```

---

## Responsive Tokens

All tokens support responsive variants:

```tsx
<Stack
  gap={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6, '2xl': 7 }}
  pad={{ base: 3, md: 5, lg: 6 }}
/>
```

Breakpoints:
- `base` (mobile-first, no media query)
- `sm` (640px and up)
- `md` (768px and up)
- `lg` (1024px and up)
- `xl` (1280px and up)
- `2xl` (1536px and up)

---

## Theme-Scoped Tokens

Tokens can be scoped to specific theme attributes:

```tsx
// Global light theme
<body data-theme="light">

// Global dark theme
<body data-theme="dark">

// Scoped theme
<Card data-theme="primary">Custom theme colors</Card>

// Runtime theme switching
import { applyDynamicTheme } from '@staple-css/tokens/dynamic-theme'
applyDynamicTheme(customTheme, element)
```

---

## Extending the Token System

### Custom Token Scales

```typescript
import { generateTokensCss } from '@staple-css/tokens/generator'

const customTokens = {
  space: { 0: '0', 1: '4px', ... },
  colors: { ... }
}

const css = generateTokensCss(customTokens)
```

### Custom Color Palettes

```typescript
import { generateRamp, generateHarmony } from '@staple-css/tokens/color'

// Generate perceptually uniform ramp
const ramp = generateRamp({ baseColor: '#007bff' })

// Generate color harmonies
const triadic = generateHarmony('#007bff', 'triadic')
```

---

## Token Validation

All tokens are validated at multiple levels:

1. **TypeScript Compilation** — Invalid values caught before runtime
2. **CSS Linting** — `npm run check-raw-values` ensures no raw values
3. **Component Props** — Only token keys accepted

```bash
# Check for raw CSS values (non-token usage)
npm run check-raw-values
```

---

## Performance Implications

### Bundle Size
- **CSS variables**: ~18 KB (minified+gzip)
- **All token types**: 30+ categories, 200+ values

### Runtime
- Zero runtime cost — all tokens are static CSS variables
- No JavaScript token processing
- No style generation

### CSS Specificity
- All tokens use low-specificity `:where()` selectors
- Easy to override with custom classes

---

## Why Tokens Matter

### 1. **Design Consistency**
Every UI component uses the same token values. Change a token, update the entire system.

### 2. **Type Safety**
TypeScript prevents invalid token values at compile time.

### 3. **AI-Friendly Code Generation**
LLMs can't hallucinate `gap={999}` or `tone="banana"` — only valid tokens exist.

### 4. **Maintainability**
Design changes propagate through tokens to all components automatically.

### 5. **Performance**
Static CSS variables + pre-computed class names = no runtime overhead.

### 6. **Accessibility**
Semantic color tokens ensure contrast ratios are respected across themes.

### 7. **Scalability**
Tokens scale from small projects to enterprise design systems.

---

## Escape Hatches

While tokens cover 90% of use cases, escape hatches exist for the other 10%:

```tsx
// className for custom styles
<Box className="my-custom-style">

// style for runtime-generated values (use sparingly)
<Box style={{ '--custom-var': value } as React.CSSProperties}>

// CSS variables for advanced styling
// Use any --st-* CSS variable in custom CSS
```

---

## See Also

- **[README.md](./README.md)** — Token-to-primitive integration guide
- **[Token Reference](https://css.staplelab.com/)** — Interactive token browser
- **[Token Studio](https://css.staplelab.com/tokens-studio)** — Visual token builder
- **[API Reference](./packages/primitives/README.md)** — Component prop documentation
