import { Container, Column, Text, Box, Row, Grid, Flex } from "@staple-css/primitives/full";
import { CodePreview } from "../components/CodePreview";

export function PrimitivesPage() {
  return (
    <Box as="main">
      {/* Hero Section */}
      <Box style={{
        padding: "var(--st-space-8) var(--st-space-4)"
      }}>
        <Container size="lg">
          <Column gap={4} style={{ maxWidth: "750px" }}>
            <Text as="h1" style={{
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 700,
              fontFamily: "var(--st-font-display)",
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "-0.03em"
            }}>
              Primitives
            </Text>
            <Text tone="muted" style={{
              fontSize: "15px",
              lineHeight: 1.6,
              maxWidth: "65ch",
              fontWeight: 400
            }}>
              Essential layout and typography components. All props support responsive design with breakpoint objects. Type-safe, performant, accessible.
            </Text>
          </Column>
        </Container>
      </Box>

      <Container size="lg" style={{ padding: "48px 0" }}>
        <Column gap={8}>

        {/* Installation */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
            <Text as="h2" size={4} weight="semibold">Installation</Text>
            <CodePreview
              code="npm install @staple-css/primitives @staple-css/tokens"
              language="bash"
              title="Install packages"
            />
            <CodePreview
              code={`import "@staple-css/tokens/all.css";
import "@staple-css/primitives/primitives.css";
import { Box, Column, Row, Grid, Text } from "@staple-css/primitives";`}
              language="tsx"
              title="Import"
            />
          </Column>
        </Box>

        {/* Box */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
            <Text as="h2" size={4} weight="semibold">Box</Text>
            <Text tone="muted">Universal container. Props: pad, margin, radius, shadow.</Text>
            <CodePreview
              code={`<Box pad={4} radius={2} shadow={1}>
  Content with padding, rounded corners, and subtle shadow
</Box>`}
              language="tsx"
              title="Example"
            />
            <Text size={1} tone="muted">Responsive example:</Text>
            <CodePreview
              code={`<Box pad={{ base: 2, md: 4, lg: 6 }}>
  Padding: 2 on mobile → 4 on tablet → 6 on desktop
</Box>`}
              language="tsx"
              title="Responsive"
            />
          </Column>
        </Box>

        {/* Column */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
            <Text as="h2" size={4} weight="semibold">Column</Text>
            <Text tone="muted">Vertical layout (flex column). Props: gap, align, justify.</Text>
            <CodePreview
              code={`<Column gap={4} align="center">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Column>`}
              language="tsx"
              title="Example"
            />
            <Text size={1} tone="muted">Responsive direction:</Text>
            <CodePreview
              code={`<Column gap={{ base: 2, md: 4 }}>
  Stack vertically. Use Flex with direction="row" for horizontal.
</Column>`}
              language="tsx"
              title="Responsive gaps"
            />
          </Column>
        </Box>

        {/* Row */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
            <Text as="h2" size={4} weight="semibold">Row</Text>
            <Text tone="muted">Horizontal layout (flex row). Props: gap, align, justify.</Text>
            <CodePreview
              code={`<Row gap={4} justify="between" align="center">
  <Text weight="semibold">Label</Text>
  <Text tone="muted">Value</Text>
</Row>`}
              language="tsx"
              title="Example"
            />
          </Column>
        </Box>

        {/* Grid */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
            <Text as="h2" size={4} weight="semibold">Grid</Text>
            <Text tone="muted">CSS Grid. Props: cols, gap, rows, alignContent.</Text>
            <CodePreview
              code={`<Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
  <Box>Card 1</Box>
  <Box>Card 2</Box>
  <Box>Card 3</Box>
</Grid>`}
              language="tsx"
              title="Responsive columns"
            />
          </Column>
        </Box>

        {/* Text */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
            <Text as="h2" size={4} weight="semibold">Text</Text>
            <Text tone="muted">Typography. Props: size, weight, tone, as, align.</Text>
            <CodePreview
              code={`<Text as="h1" size={5} weight="bold">Heading</Text>
<Text size={2} tone="muted">Subtle text</Text>
<Text weight="semibold" align="center">Centered bold</Text>`}
              language="tsx"
              title="Examples"
            />
            <Text size={1} tone="muted">Sizes: 0-6 | Weights: 400, 500, 600, 700 | Tones: default, muted, primary, success, warning, danger</Text>
          </Column>
        </Box>

        {/* Flex */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
            <Text as="h2" size={4} weight="semibold">Flex</Text>
            <Text tone="muted">Custom flexbox layouts. Combines Row/Column capabilities.</Text>
            <CodePreview
              code={`<Flex
  direction={{ base: "column", md: "row" }}
  gap={4}
  align="center"
  justify="between"
>
  <Box>Item</Box>
  <Box>Item</Box>
</Flex>`}
              language="tsx"
              title="Example"
            />
          </Column>
        </Box>

        {/* Container */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
            <Text as="h2" size={4} weight="semibold">Container</Text>
            <Text tone="muted">Max-width wrapper. Sizes: sm, md, lg, xl.</Text>
            <CodePreview
              code={`<Container size="lg" style={{ margin: "0 auto" }}>
  <Column gap={6}>
    Content constrained to max-width with auto margins
  </Column>
</Container>`}
              language="tsx"
              title="Example"
            />
          </Column>
        </Box>

        {/* Responsive Pattern */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
            <Text as="h2" size={4} weight="semibold">Responsive Pattern</Text>
            <Text tone="muted">Use breakpoint objects on any numeric/string prop.</Text>
            <CodePreview
              code={`// Any of these work:
<Box pad={{ base: 2, md: 4, lg: 6 }} />
<Grid cols={{ base: 1, md: 2, lg: 3 }} />
<Column gap={{ base: 1, md: 2, lg: 4 }} />
<Flex direction={{ base: "column", lg: "row" }} />

// Breakpoints:
// base: 0px (mobile-first)
// md: 768px
// lg: 1024px`}
              language="tsx"
              title="Responsive breakpoints"
            />
          </Column>
        </Box>

        {/* Best Practices */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
            <Text as="h2" size={4} weight="semibold">Best Practices</Text>
            <Row gap={4}>
              <Column gap={2} style={{ flex: 1, paddingLeft: "var(--st-space-4)", borderLeft: "2px solid rgba(0,0,0,0.1)" }}>
                <Text weight="semibold" size={1}>Do</Text>
                <Column gap={1} style={{ fontSize: "14px" }}>
                  <Text>Use token scales (0-8)</Text>
                  <Text>Compose with primitives</Text>
                  <Text>Leverage responsive props</Text>
                  <Text>Keep it semantic</Text>
                </Column>
              </Column>

              <Column gap={2} style={{ flex: 1, paddingLeft: "var(--st-space-4)", borderLeft: "2px solid rgba(0,0,0,0.1)" }}>
                <Text weight="semibold" size={1}>Don't</Text>
                <Column gap={1} style={{ fontSize: "14px" }}>
                  <Text>Use raw pixel values</Text>
                  <Text>Style with inline styles</Text>
                  <Text>Ignore breakpoints</Text>
                  <Text>Hardcode magic numbers</Text>
                </Column>
              </Column>
            </Row>
          </Column>
        </Box>
      </Column>
      </Container>
    </Box>
  );
}
