# Primitives

Essential layout and typography components. All props support responsive design with { base, md, lg } breakpoints.

---

## Installation

### Install packages
```bash
npm install @staple-css/primitives @staple-css/tokens
```

### Import
```tsx
import "@staple-css/tokens/all.css";
import "@staple-css/primitives/primitives.css";
import { Box, Column, Row, Grid, Text } from "@staple-css/primitives";
```

---

## Box

Universal container. Props: pad, margin, radius, shadow.

### Example
```tsx
<Box pad={4} radius={2} shadow={1}>
  Content with padding, rounded corners, and subtle shadow
</Box>
```

### Responsive example
```tsx
<Box pad={{ base: 2, md: 4, lg: 6 }}>
  Padding: 2 on mobile → 4 on tablet → 6 on desktop
</Box>
```

---

## Column

Vertical layout (flex column). Props: gap, align, justify.

### Example
```tsx
<Column gap={4} align="center">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Column>
```

### Responsive gaps
```tsx
<Column gap={{ base: 2, md: 4 }}>
  Stack vertically. Use Flex with direction="row" for horizontal.
</Column>
```

---

## Row

Horizontal layout (flex row). Props: gap, align, justify.

### Example
```tsx
<Row gap={4} justify="between" align="center">
  <Text weight="semibold">Label</Text>
  <Text tone="muted">Value</Text>
</Row>
```

---

## Grid

CSS Grid. Props: cols, gap, rows, alignContent.

### Responsive columns
```tsx
<Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
  <Box>Card 1</Box>
  <Box>Card 2</Box>
  <Box>Card 3</Box>
</Grid>
```

---

## Text

Typography. Props: size, weight, tone, as, align.

### Examples
```tsx
<Text as="h1" size={5} weight="bold">Heading</Text>
<Text size={2} tone="muted">Subtle text</Text>
<Text weight="semibold" align="center">Centered bold</Text>
```

### Options
- Sizes: 0-6
- Weights: 400, 500, 600, 700
- Tones: default, muted, primary, success, warning, danger

---

## Flex

Custom flexbox layouts. Combines Row/Column capabilities.

### Example
```tsx
<Flex
  direction={{ base: "column", md: "row" }}
  gap={4}
  align="center"
  justify="between"
>
  <Box>Item</Box>
  <Box>Item</Box>
</Flex>
```

---

## Container

Max-width wrapper. Sizes: sm, md, lg, xl.

### Example
```tsx
<Container size="lg" style={{ margin: "0 auto" }}>
  <Column gap={6}>
    Content constrained to max-width with auto margins
  </Column>
</Container>
```

---

## Responsive Pattern

Use breakpoint objects on any numeric/string prop.

### Available breakpoints
- base: 0px (mobile-first)
- md: 768px
- lg: 1024px

### Examples
```tsx
<Box pad={{ base: 2, md: 4, lg: 6 }} />
<Grid cols={{ base: 1, md: 2, lg: 3 }} />
<Column gap={{ base: 1, md: 2, lg: 4 }} />
<Flex direction={{ base: "column", lg: "row" }} />
```

---

## Best Practices

### Do
- Use token scales (0-8)
- Compose with primitives
- Leverage responsive props
- Keep it semantic

### Don't
- Use raw pixel values
- Style with inline styles
- Ignore breakpoints
- Hardcode magic numbers
