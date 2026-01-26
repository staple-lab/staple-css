# @staple-css/primitives

**React layout and typography primitives** — token-driven components for building consistent UIs.

A minimal set of 8 layout primitives that consume @staple-css/tokens. Built for composition, performance, and AI-assisted development.

---

## Installation

```bash
npm install @staple-css/primitives @staple-css/tokens
```

## Quick Start

```tsx
// 1. Import CSS at your app root
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

        <Card pad={5} radius={3} shadow={2}>
          <Stack gap={3}>
            <Text size={4} weight="semibold">
              Token-First Design
            </Text>
            <Text tone="muted">
              Every prop accepts a token key, not arbitrary values.
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

---

## The 8 Primitives

@staple-css/primitives provides just 8 components—enough to build any layout:

1. **Box** — Generic container with padding, radius, shadow
2. **Stack** — Vertical flex layout
3. **Inline** / **Row** — Horizontal flex layout
4. **Column** — Alias for Stack (for clarity)
5. **Grid** — CSS Grid layout
6. **Container** — Centered max-width container
7. **Text** — Typography primitive
8. **Card** — Surface wrapper for grouped content

**That's it.** No 100+ components. No 1000 props. Just primitives.

---

## Why Primitives?

### The Problem with Component Libraries

- 🚫 **100+ components** — Buttons, badges, alerts, modals, tooltips, etc.
- 🚫 **Thousands of props** — Infinite customization = infinite complexity
- 🚫 **Massive bundles** — 90KB+ just for UI components
- 🚫 **Steep learning curve** — Weeks to master the API
- 🚫 **Hard for AI** — Too many options for LLMs to reason about

### The Primitive Approach

- ✅ **8 primitives** — Box, Stack, Grid, Text, etc.
- ✅ **Constrained props** — Token keys only (e.g., `pad={4}`)
- ✅ **Tiny bundle** — ~5KB JS + ~8KB CSS
- ✅ **Easy to learn** — Master in an hour
- ✅ **AI-friendly** — Clear, predictable patterns

---

## Complete API Reference

### Box

Generic container with padding, radius, and shadow. The most flexible primitive.

```tsx
<Box
  as="section"                    // HTML element (default: div)
  pad={4}                         // Padding (0-8)
  padX={5}                        // Horizontal padding
  padY={3}                        // Vertical padding
  padTop={2}                      // Top padding
  padRight={2}                    // Right padding
  padBottom={2}                   // Bottom padding
  padLeft={2}                     // Left padding
  margin={2}                      // Margin (0-8)
  marginX={3}                     // Horizontal margin
  marginY={3}                     // Vertical margin
  marginTop={2}                   // Top margin
  marginRight={2}                 // Right margin
  marginBottom={2}                // Bottom margin
  marginLeft={2}                  // Left margin
  radius={2}                      // Border radius (0-4)
  shadow={1}                      // Box shadow (0-2)
  maxWidth="lg"                   // Max width preset
  aspectRatio="video"             // Aspect ratio
  opacity={80}                    // Opacity (0-100)
  zIndex={10}                     // Z-index (0, 10, 20, 30, 40, 50, max)
  borderWidth={1}                 // Border width (0-4)
  className="custom"              // Escape hatch
  style={{ width: "300px" }}      // Limited style prop
>
  Content
</Box>
```

**Responsive props:**

```tsx
<Box pad={{ base: 3, md: 5, lg: 7 }}>
<Box radius={{ base: 2, md: 3 }}>
```

**Common patterns:**

```tsx
// Card-like box
<Box pad={5} radius={3} shadow={1}>

// Pill-shaped badge
<Box padX={3} padY={1} radius={4}>

// Full-width section
<Box as="section" pad={8} marginY={6}>
```

### Stack / Column

Vertical flex layout. Use for stacking elements vertically.

```tsx
<Stack
  gap={4}                         // Gap between children (0-8)
  align="center"                  // Cross-axis alignment
  as="section"                    // HTML element (default: div)
  className="custom"
>
  <Item />
  <Item />
</Stack>

// Column is an alias for Stack
<Column gap={4}>
  <Item />
</Column>
```

**Align values:** `start`, `center`, `end`, `stretch` (default: `stretch`)

**Responsive:**

```tsx
<Stack gap={{ base: 2, md: 4, lg: 6 }} align={{ base: "start", md: "center" }}>
```

**Common patterns:**

```tsx
// Form layout
<Stack gap={4}>
  <label>Name</label>
  <input />
  <label>Email</label>
  <input />
  <button>Submit</button>
</Stack>

// Card content
<Stack gap={3}>
  <Text size={4} weight="semibold">Title</Text>
  <Text tone="muted">Description</Text>
  <Inline gap={2} justify="end">
    <button>Cancel</button>
    <button>Save</button>
  </Inline>
</Stack>
```

### Inline / Row

Horizontal flex layout. Use for buttons, badges, tags, navigation.

```tsx
<Inline
  gap={3}                         // Gap between children (0-8)
  align="center"                  // Cross-axis alignment
  justify="between"               // Main-axis justification
  wrap={true}                     // Allow wrapping
  as="nav"                        // HTML element (default: div)
>
  <Item />
  <Item />
</Inline>

// Row is an alias for Inline
<Row gap={3}>
  <Item />
</Row>
```

**Align:** `start`, `center`, `end`, `baseline`, `stretch`
**Justify:** `start`, `center`, `end`, `between`, `around`, `evenly`

**Responsive:**

```tsx
<Inline
  gap={{ base: 2, lg: 4 }}
  wrap={{ base: true, lg: false }}
  justify={{ base: "center", md: "between" }}
>
```

**Common patterns:**

```tsx
// Button group
<Inline gap={3} justify="end">
  <button>Cancel</button>
  <button>Save</button>
</Inline>

// Badge list
<Inline gap={2} wrap={true}>
  <Badge>React</Badge>
  <Badge>TypeScript</Badge>
  <Badge>CSS</Badge>
</Inline>

// Navigation
<Inline as="nav" gap={6} align="center">
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</Inline>
```

### Grid

CSS Grid layout with responsive columns and rows.

```tsx
<Grid
  cols={3}                        // Number of columns (1-12)
  rows={2}                        // Number of rows (1-12)
  gap={4}                         // Gap (0-8)
  rowGap={3}                      // Row gap
  columnGap={5}                   // Column gap
  flow="row"                      // Grid flow (row, column, dense)
  align="center"                  // Align items
  justify="center"                // Justify items
  as="section"
>
  <Item />
  <Item />
  <Item />
</Grid>
```

**Responsive:**

```tsx
// 1 column mobile, 2 tablet, 4 desktop
<Grid
  cols={{ base: 1, md: 2, lg: 4 }}
  gap={{ base: 2, md: 4 }}
>
```

**Common patterns:**

```tsx
// Card grid
<Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</Grid>

// Dashboard layout
<Grid cols={12} gap={4}>
  <Box style={{ gridColumn: "span 8" }}>Main content</Box>
  <Box style={{ gridColumn: "span 4" }}>Sidebar</Box>
</Grid>

// Equal-width columns
<Grid cols={3} gap={4}>
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</Grid>
```

### Container

Centered max-width container with responsive padding.

```tsx
<Container
  size="lg"                       // Max width (sm, md, lg, xl)
  as="main"                       // HTML element (default: div)
>
  Content
</Container>
```

**Sizes:**

| Size | Max-Width |
|------|-----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

**Common patterns:**

```tsx
// Page wrapper
<Container size="lg">
  <Stack gap={8}>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </Stack>
</Container>

// Narrow content (blog post)
<Container size="md">
  <article>
    <Text as="h1" size={6}>Article Title</Text>
    <Text>Article content...</Text>
  </article>
</Container>
```

### Text

Typography primitive with semantic sizing and tones.

```tsx
<Text
  as="p"                          // HTML element (p, span, label, h1-h6)
  size={3}                        // Font size (0-6)
  weight="semibold"               // Font weight
  tone="primary"                  // Color tone
  align="center"                  // Text alignment (start, center, end)
  leading="relaxed"               // Line height
  mono={true}                     // Monospace font
  transform="uppercase"           // Text transform
  className="custom"
>
  Text content
</Text>
```

**Size scale (0-6):**

| Size | Value | Usage |
|------|-------|-------|
| 0 | 12px | Captions, metadata |
| 1 | 14px | Small text, labels |
| 2 | 16px | Body text (default) |
| 3 | 18px | Large body, subheadings |
| 4 | 20px | h3, card titles |
| 5 | 24px | h2, section headers |
| 6 | 32px | h1, hero text |

**Weight:** `normal`, `medium`, `semibold`, `bold`
**Leading:** `tight`, `normal`, `relaxed`
**Tone:** `neutral`, `muted`, `primary`, `secondary`, `danger`, `warn`, `success`

**Responsive:**

```tsx
<Text size={{ base: 3, md: 4, lg: 5 }} weight={{ base: "medium", md: "semibold" }}>
```

**Common patterns:**

```tsx
// Page title
<Text as="h1" size={6} weight="bold">
  Page Title
</Text>

// Section heading
<Text as="h2" size={5} weight="semibold">
  Section Heading
</Text>

// Body text
<Text size={2} leading="relaxed">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</Text>

// Muted text
<Text size={1} tone="muted">
  Secondary information
</Text>

// Code/monospace
<Text mono size={1}>
  const foo = "bar";
</Text>

// Danger text
<Text tone="danger" weight="medium">
  Error: Something went wrong
</Text>
```

### Card

Surface wrapper for grouped content with elevation.

```tsx
<Card
  pad={5}                         // Padding (0-8)
  radius={3}                      // Border radius (0-4)
  shadow={1}                      // Box shadow (0-2)
  tone="neutral"                  // Color tone
  as="article"                    // HTML element (default: div)
>
  Content
</Card>
```

**Tones:** `neutral`, `primary`, `secondary`, `danger`, `warn`, `success`

**Responsive:**

```tsx
<Card pad={{ base: 3, md: 5 }} radius={{ base: 2, md: 3 }}>
```

**Common patterns:**

```tsx
// Standard card
<Card pad={5} radius={3} shadow={1}>
  <Stack gap={3}>
    <Text size={4} weight="semibold">Card Title</Text>
    <Text tone="muted">Card description</Text>
  </Stack>
</Card>

// Status card
<Card pad={4} radius={2} tone="danger">
  <Text tone="danger" weight="medium">Error message</Text>
</Card>

// Clickable card
<Card
  as="a"
  href="/details"
  pad={5}
  radius={3}
  shadow={1}
  className="hover-card"
>
  <Stack gap={2}>
    <Text weight="semibold">Link Card</Text>
    <Text tone="muted">Click to view details</Text>
  </Stack>
</Card>

// Complex card
<Card pad={6} radius={3} shadow={2}>
  <Stack gap={4}>
    <Stack gap={1}>
      <Text size={5} weight="bold">Product Name</Text>
      <Text tone="muted">$99.99</Text>
    </Stack>
    <Text>Product description goes here.</Text>
    <Inline gap={3} justify="between" align="center">
      <Text size={1} tone="muted">In stock</Text>
      <Inline gap={2}>
        <button>Add to cart</button>
        <button>Buy now</button>
      </Inline>
    </Inline>
  </Stack>
</Card>
```

---

## Responsive Design

All primitives support responsive props using breakpoint objects:

```tsx
<Grid
  cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
  gap={{ base: 2, md: 4 }}
>
  <Card pad={{ base: 3, md: 5 }} radius={{ base: 2, md: 3 }}>
    <Text size={{ base: 3, md: 4 }}>Responsive text</Text>
  </Card>
</Grid>
```

**Breakpoints:**

| Name | Min-Width |
|------|-----------|
| `base` | Default (mobile-first) |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

---

## Escape Hatches

### className

All primitives accept a `className` prop for custom styling:

```tsx
<Card className="custom-card">
  <Text className="custom-text">Content</Text>
</Card>
```

### style (limited)

Layout primitives (Box, Stack, Inline, Grid, Container) accept a limited `style` prop for dynamic sizing:

```tsx
<Box style={{ width: "300px", minHeight: "100px" }}>
  Fixed-width box
</Box>

<Grid style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
  Intrinsic grid
</Grid>
```

**Allowed style properties:**
- `width`, `height`
- `minWidth`, `maxWidth`
- `minHeight`, `maxHeight`
- `flex`, `flexGrow`, `flexShrink`, `flexBasis`
- `gridColumn`, `gridRow`
- `gridTemplateColumns`, `gridTemplateRows`

### as (polymorphic)

All primitives support the `as` prop to change the rendered HTML element:

```tsx
<Box as="section">
<Stack as="article">
<Text as="h1">
<Card as="aside">
```

---

## TypeScript Support

Full TypeScript types for all props:

```tsx
import type {
  BoxProps,
  StackProps,
  InlineProps,
  GridProps,
  ContainerProps,
  TextProps,
  CardProps,
} from "@staple-css/primitives";
```

All primitives are fully typed with token constraints:

```tsx
<Box pad={4}>     // ✅ Valid (0-8)
<Box pad={99}>    // ❌ Type error

<Text size={3}>   // ✅ Valid (0-6)
<Text size={10}>  // ❌ Type error

<Card tone="primary">  // ✅ Valid
<Card tone="banana">   // ❌ Type error
```

---

## Composition Patterns

### Forms

```tsx
<Stack gap={4}>
  <Stack gap={1}>
    <Text as="label" weight="medium">Name</Text>
    <input type="text" />
  </Stack>

  <Stack gap={1}>
    <Text as="label" weight="medium">Email</Text>
    <input type="email" />
  </Stack>

  <Inline gap={3} justify="end">
    <button type="button">Cancel</button>
    <button type="submit">Submit</button>
  </Inline>
</Stack>
```

### Modal/Dialog

```tsx
<Box
  className="modal-overlay"
  style={{
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <Card pad={6} radius={3} shadow={2} maxWidth="md">
    <Stack gap={4}>
      <Text size={5} weight="bold">Dialog Title</Text>
      <Text>Dialog content goes here.</Text>
      <Inline gap={3} justify="end">
        <button>Cancel</button>
        <button>Confirm</button>
      </Inline>
    </Stack>
  </Card>
</Box>
```

### Dashboard Layout

```tsx
<Container size="xl">
  <Stack gap={6}>
    {/* Header */}
    <Inline justify="between" align="center">
      <Text size={6} weight="bold">Dashboard</Text>
      <Inline gap={3}>
        <button>Settings</button>
        <button>Logout</button>
      </Inline>
    </Inline>

    {/* Stats Grid */}
    <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
      <Card pad={5} radius={2}>
        <Stack gap={2}>
          <Text size={0} tone="muted">Total Users</Text>
          <Text size={5} weight="bold">1,234</Text>
        </Stack>
      </Card>
      {/* More stat cards... */}
    </Grid>

    {/* Main Content */}
    <Grid cols={{ base: 1, lg: 3 }} gap={6}>
      <Box style={{ gridColumn: "span 2" }}>
        <Card pad={6} radius={3}>
          <Stack gap={4}>
            <Text size={4} weight="semibold">Recent Activity</Text>
            {/* Activity list... */}
          </Stack>
        </Card>
      </Box>

      <Card pad={6} radius={3}>
        <Stack gap={4}>
          <Text size={4} weight="semibold">Quick Actions</Text>
          {/* Action buttons... */}
        </Stack>
      </Card>
    </Grid>
  </Stack>
</Container>
```

---

## Performance

- **~5KB JS** (min+gzip) — Just component logic
- **~8KB CSS** (min+gzip) — Precomputed styles
- **Zero runtime overhead** — Props map to precomputed class names
- **Tree-shakeable** — Import only what you use
- **Stable class names** — No dynamic style generation

---

## Bundle Size Comparison

| Library | Components | JS Size | CSS Size | Total |
|---------|------------|---------|----------|-------|
| **staple-css** | 8 primitives | ~5 KB | ~8 KB | ~13 KB |
| Chakra UI | 100+ components | ~45 KB | ~45 KB | ~90 KB |
| Material-UI | 100+ components | ~85 KB | ~45 KB | ~130 KB |
| Ant Design | 50+ components | ~70 KB | ~60 KB | ~130 KB |

---

## Why Not More Components?

**We don't need them.** The 8 primitives compose into any UI pattern:

- ❌ No `Button` component — Use `<button>` with `<Inline>` or `<Box>`
- ❌ No `Modal` component — Use `<Card>` with positioning
- ❌ No `Alert` component — Use `<Card tone="danger">`
- ❌ No `Badge` component — Use `<Box padX={2} padY={1} radius={4}>`
- ❌ No `Tooltip` component — Use `<Box>` with positioning
- ❌ No `Tabs` component — Use `<Inline>` + state
- ❌ No `Accordion` component — Use `<Stack>` + state

**Primitives > Components.** Less API surface = easier to learn, smaller bundle, more flexible.

---

## License

MIT © [staple-lab](https://github.com/staple-lab)

---

## Links

- [Main Documentation](https://staple-lab.github.io/staple-css/)
- [Token Studio](https://staple-lab.github.io/staple-css/tokens-studio)
- [Storybook](https://staple-lab.github.io/staple-css/storybook)
- [GitHub](https://github.com/staple-lab/staple-css)
- [npm](https://www.npmjs.com/package/@staple-css/primitives)
