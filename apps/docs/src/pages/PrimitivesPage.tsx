import { Container, Stack, Card, Text, Box, Inline, Grid } from "@staple-css/primitives";

function CodeExample({
  title,
  code,
  children,
}: {
  title: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <Stack gap={3}>
      <Text as="h3" size={3} weight="semibold">
        {title}
      </Text>
      <Card pad={0} radius={2}>
        <div className="example-preview">{children}</div>
        <pre className="code-block" style={{ borderTop: "1px solid var(--st-color-border)", borderRadius: 0 }}>
          {code}
        </pre>
      </Card>
    </Stack>
  );
}

function PropsTable({
  props,
}: {
  props: Array<{ name: string; type: string; description: string }>;
}) {
  return (
    <Card pad={0} radius={2}>
      <table className="token-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <td>
                <Text as="span" mono size={1}>
                  {prop.name}
                </Text>
              </td>
              <td>
                <Text as="span" mono size={1} tone="muted">
                  {prop.type}
                </Text>
              </td>
              <td>
                <Text as="span" size={1}>
                  {prop.description}
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export function PrimitivesPage() {
  return (
    <Container size="lg">
      <Stack gap={8}>
        <Stack gap={2}>
          <Text as="h1" size={5} weight="bold">
            Primitives
          </Text>
          <Text tone="muted">
            Layout and typography primitives that consume tokens. Minimal
            runtime, tree-shakeable, accessible by default.
          </Text>
        </Stack>

        {/* Installation */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Installation
          </Text>
          <Card pad={0} radius={2}>
            <pre className="code-block">{`npm install @staple-css/primitives @staple-css/tokens`}</pre>
          </Card>
          <Card pad={0} radius={2}>
            <pre className="code-block">{`// Import CSS
import "@staple-css/tokens/all.css";
import "@staple-css/primitives/primitives.css";

// Import components
import { Box, Stack, Inline, Grid, Container, Text, Card } from "@staple-css/primitives";`}</pre>
          </Card>
        </Stack>

        {/* Box */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Box
          </Text>
          <Text>
            Generic container with padding, radius, and shadow options. Polymorphic via <Text as="span" mono>as</Text> prop.
          </Text>
          <CodeExample
            title="Basic Usage"
            code={`<Box pad={4} radius={2} shadow={1}>
  Content with padding, rounded corners, and shadow
</Box>`}
          >
            <Box pad={4} radius={2} shadow={1} style={{ backgroundColor: "var(--st-color-surface-raised)" }}>
              <Text>Content with padding, rounded corners, and shadow</Text>
            </Box>
          </CodeExample>
          <PropsTable
            props={[
              { name: "as", type: "ElementType", description: "HTML element (default: div)" },
              { name: "pad", type: "0-8", description: "Padding (space scale)" },
              { name: "radius", type: "0-4", description: "Border radius" },
              { name: "shadow", type: "0-2", description: "Box shadow" },
            ]}
          />
        </Stack>

        {/* Stack */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Stack
          </Text>
          <Text>Vertical flex layout with consistent gap between children.</Text>
          <CodeExample
            title="Basic Usage"
            code={`<Stack gap={4}>
  <Box pad={3} radius={2}>Item 1</Box>
  <Box pad={3} radius={2}>Item 2</Box>
  <Box pad={3} radius={2}>Item 3</Box>
</Stack>`}
          >
            <Stack gap={4}>
              <Box pad={3} radius={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text>Item 1</Text>
              </Box>
              <Box pad={3} radius={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text>Item 2</Text>
              </Box>
              <Box pad={3} radius={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text>Item 3</Text>
              </Box>
            </Stack>
          </CodeExample>
          <PropsTable
            props={[
              { name: "gap", type: "0-8", description: "Gap between children" },
              { name: "align", type: "start | center | end | stretch", description: "Cross-axis alignment" },
            ]}
          />
        </Stack>

        {/* Inline */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Inline
          </Text>
          <Text>Horizontal flex layout with gap, alignment, and justify options.</Text>
          <CodeExample
            title="Basic Usage"
            code={`<Inline gap={3} align="center" justify="between">
  <Text>Left</Text>
  <Text>Right</Text>
</Inline>`}
          >
            <Inline gap={3} align="center" justify="between">
              <Box pad={2} radius={1} className="primary-box">
                <Text as="span" className="primary-text">Left</Text>
              </Box>
              <Box pad={2} radius={1} className="primary-box">
                <Text as="span" className="primary-text">Right</Text>
              </Box>
            </Inline>
          </CodeExample>
          <PropsTable
            props={[
              { name: "gap", type: "0-8", description: "Gap between children" },
              { name: "align", type: "start | center | end | baseline | stretch", description: "Cross-axis alignment" },
              { name: "justify", type: "start | center | end | between", description: "Main-axis justification" },
              { name: "wrap", type: "boolean", description: "Allow wrapping" },
            ]}
          />
        </Stack>

        {/* Grid */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Grid
          </Text>
          <Text>CSS Grid layout with column presets and gap.</Text>
          <CodeExample
            title="Basic Usage"
            code={`<Grid cols={3} gap={4}>
  <Card pad={4}>1</Card>
  <Card pad={4}>2</Card>
  <Card pad={4}>3</Card>
</Grid>`}
          >
            <Grid cols={3} gap={4}>
              <Card pad={4}>
                <Text align="center">1</Text>
              </Card>
              <Card pad={4}>
                <Text align="center">2</Text>
              </Card>
              <Card pad={4}>
                <Text align="center">3</Text>
              </Card>
            </Grid>
          </CodeExample>
          <PropsTable
            props={[
              { name: "cols", type: "1 | 2 | 3 | 4 | 6 | 12", description: "Number of columns" },
              { name: "gap", type: "0-8", description: "Gap between items" },
            ]}
          />
        </Stack>

        {/* Container */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Container
          </Text>
          <Text>Centered container with max-width and horizontal padding.</Text>
          <CodeExample
            title="Basic Usage"
            code={`<Container size="md">
  <Text>Centered content with max-width</Text>
</Container>`}
          >
            <Container size="md">
              <Box pad={4} style={{ backgroundColor: "var(--st-color-surface)", textAlign: "center" }}>
                <Text>Centered content with max-width</Text>
              </Box>
            </Container>
          </CodeExample>
          <PropsTable
            props={[
              { name: "size", type: "sm | md | lg | xl", description: "Max-width preset" },
            ]}
          />
        </Stack>

        {/* Text */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Text
          </Text>
          <Text>Typography primitive with size, weight, tone, and alignment.</Text>
          <CodeExample
            title="Basic Usage"
            code={`<Text as="h1" size={5} weight="bold">Heading</Text>
<Text tone="muted" size={1}>Muted small text</Text>
<Text tone="primary" weight="semibold">Primary emphasis</Text>`}
          >
            <Stack gap={2}>
              <Text as="h1" size={5} weight="bold">Heading</Text>
              <Text tone="muted" size={1}>Muted small text</Text>
              <Text tone="primary" weight="semibold">Primary emphasis</Text>
            </Stack>
          </CodeExample>
          <PropsTable
            props={[
              { name: "as", type: "p | span | label | h1-h6", description: "HTML element" },
              { name: "size", type: "0-6", description: "Font size" },
              { name: "weight", type: "normal | medium | semibold | bold", description: "Font weight" },
              { name: "tone", type: "neutral | muted | primary | danger | warn | success", description: "Color tone" },
              { name: "align", type: "start | center | end", description: "Text alignment" },
              { name: "leading", type: "tight | normal | relaxed", description: "Line height" },
              { name: "mono", type: "boolean", description: "Monospace font" },
            ]}
          />
        </Stack>

        {/* Card */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Card
          </Text>
          <Text>Surface wrapper for grouping related content with semantic tones.</Text>
          <CodeExample
            title="Basic Usage"
            code={`<Card pad={5} radius={3} shadow={1}>
  <Stack gap={2}>
    <Text weight="semibold">Card Title</Text>
    <Text tone="muted">Description text</Text>
  </Stack>
</Card>`}
          >
            <Card pad={5} radius={3} shadow={1}>
              <Stack gap={2}>
                <Text weight="semibold">Card Title</Text>
                <Text tone="muted">Description text</Text>
              </Stack>
            </Card>
          </CodeExample>
          <CodeExample
            title="Tone Variants"
            code={`<Card tone="success" pad={4}>Success message</Card>
<Card tone="warn" pad={4}>Warning message</Card>
<Card tone="danger" pad={4}>Error message</Card>`}
          >
            <Stack gap={3}>
              <Card tone="success" pad={4}>
                <Text>Success message</Text>
              </Card>
              <Card tone="warn" pad={4}>
                <Text>Warning message</Text>
              </Card>
              <Card tone="danger" pad={4}>
                <Text>Error message</Text>
              </Card>
            </Stack>
          </CodeExample>
          <PropsTable
            props={[
              { name: "as", type: "div | section | article | aside", description: "HTML element" },
              { name: "pad", type: "0-8", description: "Padding" },
              { name: "radius", type: "0-4", description: "Border radius" },
              { name: "shadow", type: "0-2", description: "Box shadow" },
              { name: "tone", type: "neutral | primary | danger | warn | success", description: "Color tone" },
            ]}
          />
        </Stack>

        {/* Escape Hatches */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Escape Hatches
          </Text>
          <Text>
            All primitives accept <Text as="span" mono>className</Text> for custom styling.
            Layout primitives (Box, Stack, Inline, Grid, Container) also accept a
            limited <Text as="span" mono>style</Text> prop for dynamic sizing.
          </Text>
          <Card pad={0} radius={2}>
            <pre className="code-block">{`// Allowed style properties for layout primitives:
// width, height, minWidth, maxWidth, minHeight, maxHeight
// flex, flexGrow, flexShrink, flexBasis

<Box style={{ width: "300px", minHeight: "100px" }}>
  Fixed-width box
</Box>

<Stack style={{ flex: 1 }}>
  Flexible stack
</Stack>`}</pre>
          </Card>
        </Stack>
      </Stack>
    </Container>
  );
}
