# @staple-css/primitives

Layout and typography primitives for staple-css — Box, Stack, Inline, Grid, Container, Text, Card.

## Installation

```bash
npm install @staple-css/primitives @staple-css/tokens
```

## Usage

First, import the CSS files:

```ts
// In your app entry point
import "@staple-css/tokens/all.css";
import "@staple-css/primitives/primitives.css";
```

Then use the components:

```tsx
import { Container, Stack, Card, Text, Inline } from "@staple-css/primitives";

function App() {
  return (
    <Container size="lg">
      <Stack gap={6}>
        <Text as="h1" size={5} weight="bold">
          Page Title
        </Text>

        <Card pad={5} radius={3}>
          <Stack gap={3}>
            <Text weight="semibold">Card Title</Text>
            <Text tone="muted">Card description goes here.</Text>
          </Stack>
        </Card>

        <Inline gap={3} justify="end">
          <button>Cancel</button>
          <button>Save</button>
        </Inline>
      </Stack>
    </Container>
  );
}
```

## Components

### Box

Generic container with padding, radius, and shadow.

```tsx
<Box pad={4} radius={2} shadow={1}>
  Content
</Box>
```

| Prop | Type | Description |
|------|------|-------------|
| `as` | ElementType | HTML element (default: `div`) |
| `pad` | 0-8 | Padding (space scale) |
| `radius` | 0-4 | Border radius |
| `shadow` | 0-2 | Box shadow |

### Stack

Vertical flex layout.

```tsx
<Stack gap={4} align="center">
  <Item />
  <Item />
</Stack>
```

| Prop | Type | Description |
|------|------|-------------|
| `gap` | 0-8 | Gap between children |
| `align` | start, center, end, stretch | Cross-axis alignment |

### Inline

Horizontal flex layout.

```tsx
<Inline gap={3} align="center" justify="between">
  <Item />
  <Item />
</Inline>
```

| Prop | Type | Description |
|------|------|-------------|
| `gap` | 0-8 | Gap between children |
| `align` | start, center, end, baseline, stretch | Cross-axis alignment |
| `justify` | start, center, end, between | Main-axis justification |
| `wrap` | boolean | Allow wrapping |

### Grid

CSS Grid layout.

```tsx
<Grid cols={3} gap={4}>
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</Grid>
```

| Prop | Type | Description |
|------|------|-------------|
| `cols` | 1, 2, 3, 4, 6, 12 | Number of columns |
| `gap` | 0-8 | Gap between items |

### Container

Centered max-width container.

```tsx
<Container size="lg">
  Content
</Container>
```

| Prop | Type | Description |
|------|------|-------------|
| `size` | sm, md, lg, xl | Max-width preset |

### Text

Typography primitive.

```tsx
<Text size={3} weight="semibold" tone="primary">
  Styled text
</Text>
```

| Prop | Type | Description |
|------|------|-------------|
| `as` | p, span, label, h1-h6 | HTML element |
| `size` | 0-6 | Font size |
| `weight` | normal, medium, semibold, bold | Font weight |
| `tone` | neutral, muted, primary, danger, warn, success | Color |
| `align` | start, center, end | Text alignment |
| `leading` | tight, normal, relaxed | Line height |
| `mono` | boolean | Monospace font |

### Card

Surface wrapper for grouped content.

```tsx
<Card pad={5} radius={3} shadow={1} tone="neutral">
  Content
</Card>
```

| Prop | Type | Description |
|------|------|-------------|
| `as` | div, section, article, aside | HTML element |
| `pad` | 0-8 | Padding |
| `radius` | 0-4 | Border radius |
| `shadow` | 0-2 | Box shadow |
| `tone` | neutral, primary, danger, warn, success | Color tone |

## Escape Hatches

Layout primitives (Box, Stack, Inline, Grid, Container) accept a limited `style` prop for dynamic sizing:

```tsx
<Box style={{ width: "300px", minHeight: "100px" }}>
  Fixed-width box
</Box>
```

Allowed style properties: `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`, `flex`, `flexGrow`, `flexShrink`, `flexBasis`.

All primitives accept `className` for additional customization when tokens don't cover your use case.

## License

MIT
