import { Container, Column, Card, Text, Box, Row, Grid, Flex } from "@staple-css/primitives";
import { CodePreview } from "../components/CodePreview";

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
    <Column gap={3}>
      <Text as="h3" size={3} weight="semibold">
        {title}
      </Text>
      <Card pad={0} radius={2}>
        <div className="example-preview">{children}</div>
        <CodePreview code={code} language="tsx" />
      </Card>
    </Column>
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
      <Column gap={8}>
        <Column gap={2}>
          <Text as="h1" size={5} weight="bold">
            Primitives
          </Text>
          <Text tone="muted">
            Layout and typography primitives that consume tokens. Minimal
            runtime, tree-shakeable, accessible by default.
          </Text>
        </Column>

        {/* Installation */}
        <Column gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Installation
          </Text>
          <CodePreview
            code="npm install @staple-css/primitives @staple-css/tokens"
            language="bash"
            title="Install"
          />
          <CodePreview
            code={`// Import CSS
import "@staple-css/tokens/all.css";
import "@staple-css/primitives/primitives.css";

// Import components
import { Box, Column, Row, Grid, Container, Text, Card } from "@staple-css/primitives";`}
            language="typescript"
            title="Usage"
          />
        </Column>

        {/* Box */}
        <Column gap={4}>
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
          <CodeExample
            title="Responsive Padding"
            code={`<Box pad={{ base: 2, md: 4, lg: 6 }} radius={2}>
  Padding adapts to screen size:
  - Mobile: 2 (small padding)
  - Tablet: 4 (medium padding)
  - Desktop: 6 (large padding)
</Box>`}
          >
            <Box pad={{ base: 2, md: 4, lg: 6 }} radius={2} style={{ backgroundColor: "var(--st-color-surface-raised)" }}>
              <Text>Padding adapts to screen size: Mobile (2) → Tablet (4) → Desktop (6)</Text>
            </Box>
          </CodeExample>
          <PropsTable
            props={[
              { name: "as", type: "ElementType", description: "HTML element (default: div)" },
              { name: "pad", type: "0-8 | Responsive<0-8>", description: "Padding (space scale), supports responsive object { base, sm, md, lg, xl }" },
              { name: "radius", type: "0-4", description: "Border radius" },
              { name: "shadow", type: "0-2", description: "Box shadow" },
            ]}
          />
        </Column>

        {/* Flex */}
        <Column gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Flex
          </Text>
          <Text>
            Complete flexbox layout with full CSS Flex specification support. Use <Text as="span" mono>direction</Text>,
            <Text as="span" mono>gap</Text>, <Text as="span" mono>align</Text>, <Text as="span" mono>justify</Text>, and more.
            Convenience aliases: <Text as="span" mono>Row</Text> (flex row) and <Text as="span" mono>Column</Text> (flex column).
          </Text>
          <CodeExample
            title="Flex Row - Horizontal Layout"
            code={`<Flex gap={3} align="center">
  <Box pad={2} radius={1} className="primary-box">Item 1</Box>
  <Box pad={2} radius={1} className="primary-box">Item 2</Box>
  <Box pad={2} radius={1} className="primary-box">Item 3</Box>
</Flex>`}
          >
            <Flex gap={3} align="center">
              <Box pad={2} radius={1} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text as="span" size={1}>Item 1</Text>
              </Box>
              <Box pad={2} radius={1} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text as="span" size={1}>Item 2</Text>
              </Box>
              <Box pad={2} radius={1} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text as="span" size={1}>Item 3</Text>
              </Box>
            </Flex>
          </CodeExample>
          <CodeExample
            title="Flex Column with direction prop"
            code={`<Flex direction="column" gap={4}>
  <Box pad={3} radius={2}>Item 1</Box>
  <Box pad={3} radius={2}>Item 2</Box>
  <Box pad={3} radius={2}>Item 3</Box>
</Flex>`}
          >
            <Flex direction="column" gap={4}>
              <Box pad={3} radius={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text>Item 1</Text>
              </Box>
              <Box pad={3} radius={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text>Item 2</Text>
              </Box>
              <Box pad={3} radius={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text>Item 3</Text>
              </Box>
            </Flex>
          </CodeExample>
          <CodeExample
            title="Multi-line Flex with alignContent"
            code={`<Flex wrap="wrap" gap={3} alignContent="center" style={{ height: "200px" }}>
  <Box pad={2} radius={1}>1</Box>
  <Box pad={2} radius={1}>2</Box>
  <Box pad={2} radius={1}>3</Box>
  <Box pad={2} radius={1}>4</Box>
</Flex>`}
          >
            <Flex wrap="wrap" gap={3} alignContent="center" style={{ height: "200px", backgroundColor: "var(--st-color-surface-raised)", borderRadius: "var(--st-radius-2)" }}>
              <Box pad={2} radius={1} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text as="span" size={1}>1</Text>
              </Box>
              <Box pad={2} radius={1} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text as="span" size={1}>2</Text>
              </Box>
              <Box pad={2} radius={1} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text as="span" size={1}>3</Text>
              </Box>
              <Box pad={2} radius={1} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text as="span" size={1}>4</Text>
              </Box>
            </Flex>
          </CodeExample>
          <PropsTable
            props={[
              { name: "direction", type: "row | column | row-reverse | column-reverse", description: "Flex direction (responsive)" },
              { name: "gap", type: "0-8 | Responsive<0-8>", description: "Gap between items" },
              { name: "align", type: "start | center | end | stretch | baseline", description: "Cross-axis alignment (align-items)" },
              { name: "justify", type: "start | center | end | between | around | evenly", description: "Main-axis justification (justify-content)" },
              { name: "alignContent", type: "start | center | end | ... | evenly", description: "Multi-line alignment (responsive)" },
              { name: "wrap", type: "wrap | nowrap | wrap-reverse", description: "Flex wrap behavior" },
              { name: "inline", type: "boolean", description: "Use inline-flex instead of flex" },
            ]}
          />
        </Column>

        {/* Row & Column Aliases */}
        <Column gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Row & Column Aliases
          </Text>
          <Text>
            Convenient aliases for common flex layouts. <Text as="span" mono>Column</Text> is shorthand for{" "}
            <Text as="span" mono>&lt;Flex direction="column"&gt;</Text> and <Text as="span" mono>Row</Text> is shorthand for{" "}
            <Text as="span" mono>&lt;Flex direction="row"&gt;</Text>. Use these for simpler, more readable code.
          </Text>
          <CodeExample
            title="Column - Vertical Layout"
            code={`<Column gap={4}>
  <Box pad={3} radius={2}>Item 1</Box>
  <Box pad={3} radius={2}>Item 2</Box>
  <Box pad={3} radius={2}>Item 3</Box>
</Column>`}
          >
            <Column gap={4}>
              <Box pad={3} radius={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text>Item 1</Text>
              </Box>
              <Box pad={3} radius={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text>Item 2</Text>
              </Box>
              <Box pad={3} radius={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text>Item 3</Text>
              </Box>
            </Column>
          </CodeExample>
          <CodeExample
            title="Row - Horizontal Layout"
            code={`<Row gap={3} align="center" justify="between">
  <Text>Left</Text>
  <Text>Right</Text>
</Row>`}
          >
            <Row gap={3} align="center" justify="between">
              <Box pad={2} radius={1} className="primary-box">
                <Text as="span" className="primary-text">Left</Text>
              </Box>
              <Box pad={2} radius={1} className="primary-box">
                <Text as="span" className="primary-text">Right</Text>
              </Box>
            </Row>
          </CodeExample>
          <PropsTable
            props={[
              { name: "gap", type: "0-8", description: "Gap between children" },
              { name: "align", type: "start | center | end | baseline | stretch", description: "Cross-axis alignment" },
              { name: "justify", type: "start | center | end | between", description: "Main-axis justification (Row only)" },
              { name: "wrap", type: "boolean", description: "Allow wrapping (Row only)" },
            ]}
          />
        </Column>

        {/* Grid */}
        <Column gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Grid
          </Text>
          <Text>
            CSS Grid layout with full grid specification support. Control columns, rows, gaps, alignment,
            and implicit sizing with full responsive breakpoint support.
          </Text>
          <CodeExample
            title="Basic Column Grid"
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
          <CodeExample
            title="Responsive Grid"
            code={`<Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
  <Card pad={4}>1</Card>
  <Card pad={4}>2</Card>
  <Card pad={4}>3</Card>
  <Card pad={4}>4</Card>
</Grid>`}
          >
            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
              <Card pad={4}>
                <Text align="center">1</Text>
              </Card>
              <Card pad={4}>
                <Text align="center">2</Text>
              </Card>
              <Card pad={4}>
                <Text align="center">3</Text>
              </Card>
              <Card pad={4}>
                <Text align="center">4</Text>
              </Card>
            </Grid>
          </CodeExample>
          <CodeExample
            title="Grid with Alignment & Spacing"
            code={`<Grid cols={2} gap={4} align="center" justify="center" style={{ minHeight: "300px" }}>
  <Card pad={4}>Centered item</Card>
  <Card pad={4}>Centered item</Card>
</Grid>`}
          >
            <Grid cols={2} gap={4} align="center" justify="center" style={{ minHeight: "300px" }}>
              <Card pad={4}>
                <Text align="center">Centered item</Text>
              </Card>
              <Card pad={4}>
                <Text align="center">Centered item</Text>
              </Card>
            </Grid>
          </CodeExample>
          <PropsTable
            props={[
              { name: "cols", type: "1-12 | Responsive<1-12>", description: "Number of columns (responsive)" },
              { name: "rows", type: "1-6 | Responsive<1-6>", description: "Number of rows (responsive)" },
              { name: "preset", type: "auto-fit-xs/sm/md/lg | auto-fill-xs/sm/md/lg", description: "Intrinsic responsive preset (auto-fit/fill with minmax)" },
              { name: "gap", type: "0-8 | Responsive<0-8>", description: "Gap between all items" },
              { name: "align", type: "start | center | end | ... | baseline", description: "Align items on cross-axis (responsive)" },
              { name: "justify", type: "start | center | end | ...", description: "Justify items on main-axis (responsive)" },
              { name: "placeItems", type: "start | center | end | ... | baseline", description: "Shorthand for align & justify items (responsive)" },
              { name: "alignContent", type: "start | center | end | ... | evenly", description: "Align tracks on cross-axis (responsive)" },
              { name: "justifyContent", type: "start | center | end | ... | evenly", description: "Justify tracks on main-axis (responsive)" },
              { name: "placeContent", type: "start | center | end | ... | evenly", description: "Shorthand for align & justify content (responsive)" },
              { name: "autoRows", type: "auto | min | max | 1fr | minmax", description: "Size implicit rows (responsive)" },
              { name: "autoColumns", type: "auto | min | max | 1fr | minmax", description: "Size implicit columns (responsive)" },
              { name: "flow", type: "row | column | dense | row-dense | column-dense", description: "Grid auto-flow direction (responsive)" },
            ]}
          />
        </Column>

        {/* Container */}
        <Column gap={4}>
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
        </Column>

        {/* Text */}
        <Column gap={4}>
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
            <Column gap={2}>
              <Text as="h1" size={5} weight="bold">Heading</Text>
              <Text tone="muted" size={1}>Muted small text</Text>
              <Text tone="primary" weight="semibold">Primary emphasis</Text>
            </Column>
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
        </Column>

        {/* Card */}
        <Column gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Card
          </Text>
          <Text>Surface wrapper for grouping related content with semantic tones.</Text>
          <CodeExample
            title="Basic Usage"
            code={`<Card pad={5} radius={3} shadow={1}>
  <Column gap={2}>
    <Text weight="semibold">Card Title</Text>
    <Text tone="muted">Description text</Text>
  </Column>
</Card>`}
          >
            <Card pad={5} radius={3} shadow={1}>
              <Column gap={2}>
                <Text weight="semibold">Card Title</Text>
                <Text tone="muted">Description text</Text>
              </Column>
            </Card>
          </CodeExample>
          <CodeExample
            title="Tone Variants"
            code={`<Card tone="success" pad={4}>Success message</Card>
<Card tone="warn" pad={4}>Warning message</Card>
<Card tone="danger" pad={4}>Error message</Card>`}
          >
            <Column gap={3}>
              <Card tone="success" pad={4}>
                <Text>Success message</Text>
              </Card>
              <Card tone="warn" pad={4}>
                <Text>Warning message</Text>
              </Card>
              <Card tone="danger" pad={4}>
                <Text>Error message</Text>
              </Card>
            </Column>
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
        </Column>

        {/* Responsive Design */}
        <Column gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Responsive Design
          </Text>
          <Text>
            Primitives support responsive values through the token system. Use an object with breakpoint keys instead of a single value.
          </Text>

          <Column gap={3}>
            <Text as="h3" size={3} weight="semibold">
              Breakpoints
            </Text>
            <Text tone="muted">
              The default breakpoints follow Tailwind's convention:
            </Text>
            <Card pad={0} radius={2}>
              <table className="token-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Min-Width</th>
                    <th>CSS Variable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Text as="span" mono>base</Text></td>
                    <td>0px</td>
                    <td><Text as="span" mono>-</Text></td>
                  </tr>
                  <tr>
                    <td><Text as="span" mono>sm</Text></td>
                    <td>640px</td>
                    <td><Text as="span" mono>--st-screen-sm</Text></td>
                  </tr>
                  <tr>
                    <td><Text as="span" mono>md</Text></td>
                    <td>768px</td>
                    <td><Text as="span" mono>--st-screen-md</Text></td>
                  </tr>
                  <tr>
                    <td><Text as="span" mono>lg</Text></td>
                    <td>1024px</td>
                    <td><Text as="span" mono>--st-screen-lg</Text></td>
                  </tr>
                  <tr>
                    <td><Text as="span" mono>xl</Text></td>
                    <td>1280px</td>
                    <td><Text as="span" mono>--st-screen-xl</Text></td>
                  </tr>
                  <tr>
                    <td><Text as="span" mono>2xl</Text></td>
                    <td>1536px</td>
                    <td><Text as="span" mono>--st-screen-2xl</Text></td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </Column>

          <Column gap={3}>
            <Text as="h3" size={3} weight="semibold">
              Responsive Props
            </Text>
            <Text tone="muted">
              Currently, <Text as="span" mono>Box</Text> supports responsive padding. More responsive props will be added to other primitives.
            </Text>
            <CodePreview
              code={`// Mobile-first: start with base, add overrides
<Box pad={{ base: 3, md: 5, xl: 7 }}>
  Grows from 3 → 5 → 7 as screen size increases
</Box>

// You can specify any or all breakpoints
<Box pad={{ base: 2, lg: 6 }}>
  Only changes at large screens
</Box>

// TypeScript support for all values
<Box pad={{ base: 4, sm: 4, md: 5, lg: 6, xl: 7, "2xl": 8 }}>
  Full responsive scale
</Box>`}
              language="tsx"
              title="Responsive Padding Examples"
            />
          </Column>

          <Column gap={3}>
            <Text as="h3" size={3} weight="semibold">
              How It Works
            </Text>
            <Text>
              Responsive values generate multiple CSS classes with media queries:
            </Text>
            <CodePreview
              code={`// This React component:
<Box pad={{ base: 2, md: 4, lg: 6 }} />

// Generates these classes:
// st-Box st-Box--pad-2 st-Box--md-pad-4 st-Box--lg-pad-6

// Which maps to this CSS:
.st-Box--pad-2 { padding: var(--st-space-2); }

@media (min-width: 768px) {
  .st-Box--md-pad-4 { padding: var(--st-space-4); }
}

@media (min-width: 1024px) {
  .st-Box--lg-pad-6 { padding: var(--st-space-6); }
}`}
              language="css"
              title="Generated CSS"
            />
          </Column>

          <CodeExample
            title="Real-World Example"
            code={`// Responsive layout wrapper
<Box pad={{ base: 3, md: 5, xl: 7 }} radius={2} shadow={1}>
  <Column gap={3}>
    <Text as="h2" size={4} weight="bold">
      Responsive Container
    </Text>
    <Text tone="muted">
      This container's padding adapts to screen size for
      optimal spacing on mobile, tablet, and desktop.
    </Text>
  </Column>
</Box>`}
          >
            <Box pad={{ base: 3, md: 5, xl: 7 }} radius={2} shadow={1} style={{ backgroundColor: "var(--st-color-surface-raised)" }}>
              <Column gap={3}>
                <Text as="h2" size={4} weight="bold">
                  Responsive Container
                </Text>
                <Text tone="muted">
                  This container's padding adapts to screen size for optimal spacing on mobile, tablet, and desktop.
                  Try resizing your browser to see the padding change!
                </Text>
              </Column>
            </Box>
          </CodeExample>
        </Column>

        {/* Escape Hatches */}
        <Column gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Escape Hatches
          </Text>
          <Text>
            All primitives accept <Text as="span" mono>className</Text> for custom styling.
            Layout primitives (Box, Column, Row, Grid, Container) also accept a
            limited <Text as="span" mono>style</Text> prop for dynamic sizing.
          </Text>
          <CodePreview
            code={`// Allowed style properties for layout primitives:
// width, height, minWidth, maxWidth, minHeight, maxHeight
// flex, flexGrow, flexShrink, flexBasis
// gridTemplateColumns, gridTemplateRows, gridColumn, gridRow

<Box style={{ width: "300px", minHeight: "100px" }}>
  Fixed-width box
</Box>

<Column style={{ flex: 1 }}>
  Flexible stack
</Column>`}
            language="tsx"
            title="Style Props"
          />
        </Column>
      </Column>
    </Container>
  );
}
