# staple-css

A shared styling contract for apps—tokens, primitives, and accessible components.

Semantic CSS variables standardize spacing, color, typography, and variants. Tokens are the API. Contract over customization. Consistency by default, with deliberate escape hatches.

## Principles

- **Tokens are the API.** Design decisions are encoded in tokens. Components consume token keys, not arbitrary values.
- **Contract over customization.** A stable API enables consistency. Override by design, not by default.
- **Consistency by default, escape hatches by design.** The happy path keeps you in the token system. `className` is always available for overrides.

## Packages

| Package | Description |
|---------|-------------|
| [@staple-css/tokens](./packages/tokens) | CSS variables for spacing, color, typography, shadows, motion |
| [@staple-css/primitives](./packages/primitives) | React primitives: Box, Stack, Inline, Grid, Container, Text, Card |

## Quick Start

```bash
npm install @staple-css/tokens @staple-css/primitives
```

```tsx
// Import CSS at your app root
import "@staple-css/tokens/all.css";
import "@staple-css/primitives/primitives.css";

// Use components
import { Container, Stack, Card, Text } from "@staple-css/primitives";

function App() {
  return (
    <Container size="lg">
      <Stack gap={4}>
        <Text as="h1" size={5} weight="bold">
          Hello, staple-css
        </Text>
        <Card pad={5} radius={3}>
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

## Theming

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

The system respects `prefers-color-scheme` when no explicit theme is set.

## Token Reference

### Space Scale (0-8)

| Token | Value |
|-------|-------|
| 0 | 0 |
| 1 | 0.25rem (4px) |
| 2 | 0.5rem (8px) |
| 3 | 0.75rem (12px) |
| 4 | 1rem (16px) |
| 5 | 1.5rem (24px) |
| 6 | 2rem (32px) |
| 7 | 3rem (48px) |
| 8 | 4rem (64px) |

### Radius Scale (0-4)

| Token | Value |
|-------|-------|
| 0 | 0 |
| 1 | 0.125rem (2px) |
| 2 | 0.25rem (4px) |
| 3 | 0.5rem (8px) |
| 4 | 1rem (16px) |

### Font Size Scale (0-6)

| Token | Value |
|-------|-------|
| 0 | 0.75rem (12px) |
| 1 | 0.875rem (14px) |
| 2 | 1rem (16px) |
| 3 | 1.125rem (18px) |
| 4 | 1.25rem (20px) |
| 5 | 1.5rem (24px) |
| 6 | 2rem (32px) |

### Color Tokens

Semantic tokens that adapt to light/dark themes:

- `background`, `surface`, `surfaceRaised`
- `text`, `textMuted`, `textInverse`
- `border`, `borderMuted`
- `primary`, `primaryHover`, `primaryText`
- `danger`, `dangerHover`, `dangerText`, `dangerSurface`
- `warn`, `warnHover`, `warnText`, `warnSurface`
- `success`, `successHover`, `successText`, `successSurface`

## Primitives

### Box

Generic container with padding, radius, and shadow.

```tsx
<Box pad={4} radius={2} shadow={1}>Content</Box>
<Box as="section" pad={6}>Section content</Box>
```

### Stack

Vertical flex layout.

```tsx
<Stack gap={4} align="center">
  <Item />
  <Item />
</Stack>
```

### Inline

Horizontal flex layout.

```tsx
<Inline gap={3} align="center" justify="between">
  <Item />
  <Item />
</Inline>
```

### Grid

CSS Grid layout.

```tsx
<Grid cols={3} gap={4}>
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</Grid>
```

### Container

Centered max-width container.

```tsx
<Container size="lg">Content</Container>
```

### Text

Typography primitive.

```tsx
<Text as="h1" size={5} weight="bold">Heading</Text>
<Text tone="muted" size={1}>Small muted text</Text>
```

### Card

Surface wrapper for grouped content.

```tsx
<Card pad={5} radius={3} shadow={1}>
  <Stack gap={2}>
    <Text weight="semibold">Title</Text>
    <Text tone="muted">Description</Text>
  </Stack>
</Card>
```

## Performance

staple-css is designed for performance:

- **Static CSS**: All styling is static CSS loaded upfront—no runtime style generation
- **Minimal Runtime**: Components do simple object lookups to map props to class names
- **Tree-Shakeable**: ESM exports with proper module boundaries
- **Stable Class Names**: Class names like `st-Stack--gap-4` are precomputed and stable
- **No Heavy Dependencies**: Near-zero runtime overhead

## Development

```bash
# Install dependencies
npm install

# Build packages
npm run build:packages

# Run docs site
npm run dev

# Run demo app
npm run dev:demo

# Run tests
npm run test

# Check bundle size
npm run bundle-size
```

## License

MIT
