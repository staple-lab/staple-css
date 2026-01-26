import { Container, Column, Card, Text, Box, Row, Grid, Flex } from "@staple-css/primitives/full";
import { CodePreview } from "../components/CodePreview";
import { EnhancedComponentExplorer } from "../components/EnhancedComponentExplorer";

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
            Layout and typography primitives with complete responsive support.
            All layout props (direction, gap, alignment, sizing) can be responsive objects.
          </Text>
        </Column>

        {/* Enhanced Component Explorer */}
        <Card pad={6} radius={3} shadow={1}>
          <EnhancedComponentExplorer />
        </Card>

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
import { Box, Column, Row, Flex, Grid, Container, Text, Card } from "@staple-css/primitives";`}
            language="typescript"
            title="Usage"
          />
        </Column>

        {/* Responsive API */}
        <Column gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Responsive Design
          </Text>
          <Text>
            All layout props support responsive objects. Use <Text as="span" mono>{"{ base, sm, md, lg, xl, 2xl }"}</Text> keys to change values at different breakpoints.
          </Text>

          <Column gap={3}>
            <Text as="h3" size={3} weight="semibold">
              Breakpoints
            </Text>
            <Card pad={0} radius={2}>
              <table className="token-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Min-Width</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Text as="span" mono>base</Text></td>
                    <td>0px</td>
                  </tr>
                  <tr>
                    <td><Text as="span" mono>sm</Text></td>
                    <td>640px</td>
                  </tr>
                  <tr>
                    <td><Text as="span" mono>md</Text></td>
                    <td>768px</td>
                  </tr>
                  <tr>
                    <td><Text as="span" mono>lg</Text></td>
                    <td>1024px</td>
                  </tr>
                  <tr>
                    <td><Text as="span" mono>xl</Text></td>
                    <td>1280px</td>
                  </tr>
                  <tr>
                    <td><Text as="span" mono>2xl</Text></td>
                    <td>1536px</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </Column>

          <CodePreview
            code={`// Mobile-first: start with base, override at breakpoints
<Box pad={{ base: 2, md: 4, lg: 6 }}>
  Mobile padding 2 → Tablet 4 → Desktop 6
</Box>

// Any prop that shows Responsive<T> supports this pattern
<Flex
  direction={{ base: "column", md: "row" }}
  gap={{ base: 2, md: 4 }}
  align={{ base: "start", md: "center" }}
/>

<Grid
  cols={{ base: 1, md: 2, lg: 3 }}
  gap={{ base: 2, md: 3, lg: 4 }}
  alignContent={{ base: "start", lg: "center" }}
/>`}
            language="tsx"
            title="Responsive Pattern"
          />
        </Column>

        {/* Box */}
        <Column gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Box
          </Text>
          <Text>
            Generic container with padding, radius, and shadow. Use <Text as="span" mono>pad</Text> and <Text as="span" mono>margin</Text> props with responsive support.
          </Text>
          <CodeExample
            title="Basic Box with Responsive Padding"
            code={`<Box pad={{ base: 2, md: 4, lg: 6 }} radius={2} shadow={1}>
  Padding adapts: mobile (2) → tablet (4) → desktop (6)
</Box>`}
          >
            <Box pad={{ base: 2, md: 4, lg: 6 }} radius={2} shadow={1} style={{ backgroundColor: "var(--st-color-surface-raised)" }}>
              <Text>Padding adapts: mobile (2) → tablet (4) → desktop (6)</Text>
            </Box>
          </CodeExample>
          <PropsTable
            props={[
              { name: "pad", type: "0-8 | Responsive<0-8>", description: "Padding (responsive)" },
              { name: "margin", type: "0-8 | Responsive<0-8>", description: "Margin (responsive)" },
              { name: "marginX", type: "0-8 | Responsive<0-8>", description: "Horizontal margin (responsive)" },
              { name: "marginY", type: "0-8 | Responsive<0-8>", description: "Vertical margin (responsive)" },
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
            Complete flexbox layout. All props are fully responsive, including direction, gap, alignment, justification, and wrapping.
          </Text>
          <CodeExample
            title="Responsive Direction"
            code={`// Column on mobile, row on tablet+
<Flex direction={{ base: "column", md: "row" }} gap={{ base: 2, md: 4 }}>
  <Box pad={3} style={{ flex: 1 }}>Item 1</Box>
  <Box pad={3} style={{ flex: 1 }}>Item 2</Box>
</Flex>`}
          >
            <Flex direction={{ base: "column", md: "row" }} gap={{ base: 2, md: 4 }}>
              <Box pad={3} style={{ flex: 1, backgroundColor: "var(--st-color-surface)" }}>
                <Text>Item 1</Text>
              </Box>
              <Box pad={3} style={{ flex: 1, backgroundColor: "var(--st-color-surface)" }}>
                <Text>Item 2</Text>
              </Box>
            </Flex>
          </CodeExample>
          <CodeExample
            title="Responsive Alignment & Gap"
            code={`<Flex
  gap={{ base: 2, lg: 6 }}
  align={{ base: "start", md: "center", lg: "stretch" }}
  justify={{ base: "start", md: "between" }}
>
  <Box pad={2}>Gap & align change at breakpoints</Box>
  <Box pad={2}>Try resizing</Box>
</Flex>`}
          >
            <Flex
              gap={{ base: 2, lg: 6 }}
              align={{ base: "start", md: "center", lg: "stretch" }}
              justify={{ base: "start", md: "between" }}
            >
              <Box pad={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text size={1}>Gap & align</Text>
              </Box>
              <Box pad={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text size={1}>change at breakpoints</Text>
              </Box>
            </Flex>
          </CodeExample>
          <CodeExample
            title="Responsive Wrap & alignContent"
            code={`<Flex
  wrap={{ base: "wrap", lg: "nowrap" }}
  gap={3}
  alignContent={{ base: "start", md: "center" }}
  style={{ height: "200px" }}
>
  <Box pad={2}>Item 1</Box>
  <Box pad={2}>Item 2</Box>
  <Box pad={2}>Item 3</Box>
  <Box pad={2}>Item 4</Box>
</Flex>`}
          >
            <Flex
              wrap={{ base: "wrap", lg: "nowrap" }}
              gap={3}
              alignContent={{ base: "start", md: "center" }}
              style={{ height: "200px", backgroundColor: "var(--st-color-surface-raised)", borderRadius: "var(--st-radius-2)" }}
            >
              <Box pad={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text size={1}>1</Text>
              </Box>
              <Box pad={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text size={1}>2</Text>
              </Box>
              <Box pad={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text size={1}>3</Text>
              </Box>
              <Box pad={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text size={1}>4</Text>
              </Box>
            </Flex>
          </CodeExample>
          <PropsTable
            props={[
              { name: "direction", type: "row | column | row-reverse | column-reverse | Responsive<>", description: "Flex direction (responsive)" },
              { name: "gap", type: "0-8 | Responsive<0-8>", description: "Gap between items (responsive)" },
              { name: "align", type: "start | center | end | stretch | baseline | Responsive<>", description: "Cross-axis alignment (responsive)" },
              { name: "justify", type: "start | center | end | between | around | evenly | Responsive<>", description: "Main-axis justification (responsive)" },
              { name: "wrap", type: "wrap | nowrap | wrap-reverse | Responsive<>", description: "Flex wrap behavior (responsive)" },
              { name: "alignContent", type: "start | center | end | between | around | evenly | Responsive<>", description: "Multi-line alignment (responsive)" },
              { name: "inline", type: "boolean | Responsive<boolean>", description: "Use inline-flex (responsive)" },
            ]}
          />
        </Column>

        {/* Row & Column Aliases */}
        <Column gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Row & Column Aliases
          </Text>
          <Text>
            Convenient aliases for common patterns. <Text as="span" mono>Column</Text> = <Text as="span" mono>&lt;Flex direction="column"&gt;</Text>,
            <Text as="span" mono>Row</Text> = <Text as="span" mono>&lt;Flex direction="row"&gt;</Text>. All Flex props available.
          </Text>
          <CodeExample
            title="Column - Vertical Layout"
            code={`<Column gap={{ base: 2, md: 4 }}>
  <Box pad={3}>Item 1</Box>
  <Box pad={3}>Item 2</Box>
  <Box pad={3}>Item 3</Box>
</Column>`}
          >
            <Column gap={{ base: 2, md: 4 }}>
              <Box pad={3} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text>Item 1</Text>
              </Box>
              <Box pad={3} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text>Item 2</Text>
              </Box>
              <Box pad={3} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text>Item 3</Text>
              </Box>
            </Column>
          </CodeExample>
          <CodeExample
            title="Row - Horizontal Layout with Responsive Justification"
            code={`<Row
  gap={{ base: 2, md: 4 }}
  justify={{ base: "start", md: "between" }}
  align={{ base: "start", md: "center" }}
>
  <Text weight="semibold">Left</Text>
  <Text>Right</Text>
</Row>`}
          >
            <Row
              gap={{ base: 2, md: 4 }}
              justify={{ base: "start", md: "between" }}
              align={{ base: "start", md: "center" }}
            >
              <Box pad={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text weight="semibold" size={1}>Left</Text>
              </Box>
              <Box pad={2} style={{ backgroundColor: "var(--st-color-surface)" }}>
                <Text size={1}>Right</Text>
              </Box>
            </Row>
          </CodeExample>
        </Column>

        {/* Grid */}
        <Column gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Grid
          </Text>
          <Text>
            CSS Grid with complete specification support. All props including columns, rows, gaps, alignment, and sizing are fully responsive.
          </Text>
          <CodeExample
            title="Responsive Columns"
            code={`// 1 col on mobile, 2 on tablet, 3 on desktop
<Grid cols={{ base: 1, md: 2, lg: 3 }} gap={{ base: 2, md: 4 }}>
  <Card pad={4}>1</Card>
  <Card pad={4}>2</Card>
  <Card pad={4}>3</Card>
  <Card pad={4}>4</Card>
</Grid>`}
          >
            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={{ base: 2, md: 4 }}>
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
            title="Responsive Preset & Gap"
            code={`// auto-fit preset responds to width
<Grid
  preset={{ base: "auto-fit-sm", lg: "auto-fit-md" }}
  gap={{ base: 2, md: 3, lg: 4 }}
>
  <Card pad={3}>Auto-fit</Card>
  <Card pad={3}>Changes at breakpoints</Card>
  <Card pad={3}>Try resizing</Card>
</Grid>`}
          >
            <Grid
              preset={{ base: "auto-fit-sm", lg: "auto-fit-md" }}
              gap={{ base: 2, md: 3, lg: 4 }}
            >
              <Card pad={3}>
                <Text align="center">Auto-fit</Text>
              </Card>
              <Card pad={3}>
                <Text align="center">Changes at</Text>
              </Card>
              <Card pad={3}>
                <Text align="center">breakpoints</Text>
              </Card>
            </Grid>
          </CodeExample>
          <CodeExample
            title="Responsive Alignment & Content Control"
            code={`<Grid
  cols={{ base: 2, lg: 3 }}
  gap={3}
  align={{ base: "start", md: "center", lg: "end" }}
  alignContent={{ base: "start", lg: "center" }}
  flow={{ base: "row", md: "column" }}
  style={{ minHeight: "300px" }}
>
  <Card pad={4}>Align & flow change</Card>
  <Card pad={4}>at different breakpoints</Card>
  <Card pad={4}>Resize to see</Card>
</Grid>`}
          >
            <Grid
              cols={{ base: 2, lg: 3 }}
              gap={3}
              align={{ base: "start", md: "center", lg: "end" }}
              alignContent={{ base: "start", lg: "center" }}
              flow={{ base: "row", md: "column" }}
              style={{ minHeight: "300px" }}
            >
              <Card pad={4}>
                <Text align="center">Align & flow</Text>
              </Card>
              <Card pad={4}>
                <Text align="center">change at</Text>
              </Card>
              <Card pad={4}>
                <Text align="center">breakpoints</Text>
              </Card>
            </Grid>
          </CodeExample>
          <PropsTable
            props={[
              { name: "cols", type: "1-12 | Responsive<1-12>", description: "Number of columns (responsive)" },
              { name: "rows", type: "1-6 | Responsive<1-6>", description: "Number of rows (responsive)" },
              { name: "preset", type: "auto-fit-xs/sm/md/lg | auto-fill-xs/sm/md/lg | Responsive<>", description: "Intrinsic responsive preset (responsive)" },
              { name: "gap", type: "0-8 | Responsive<0-8>", description: "Gap between items (responsive)" },
              { name: "align", type: "start | center | end | baseline | Responsive<>", description: "Item alignment on cross-axis (responsive)" },
              { name: "justify", type: "start | center | end | between | around | evenly | Responsive<>", description: "Item justification on main-axis (responsive)" },
              { name: "placeItems", type: "start | center | end | baseline | Responsive<>", description: "Shorthand for align & justify (responsive)" },
              { name: "alignContent", type: "start | center | end | between | around | evenly | Responsive<>", description: "Track alignment (responsive)" },
              { name: "justifyContent", type: "start | center | end | between | around | evenly | Responsive<>", description: "Track justification (responsive)" },
              { name: "placeContent", type: "start | center | end | between | around | evenly | Responsive<>", description: "Shorthand for align & justify content (responsive)" },
              { name: "flow", type: "row | column | dense | row-dense | column-dense | Responsive<>", description: "Grid auto-flow direction (responsive)" },
              { name: "autoRows", type: "auto | min | max | 1fr | minmax | Responsive<>", description: "Implicit row sizing (responsive)" },
              { name: "autoColumns", type: "auto | min | max | 1fr | minmax | Responsive<>", description: "Implicit column sizing (responsive)" },
              { name: "inline", type: "boolean | Responsive<boolean>", description: "Use inline-grid (responsive)" },
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
              <Box pad={4} style={{ backgroundColor: "var(--st-color-surface-raised)", textAlign: "center" }}>
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
            title="Text Styles"
            code={`<Column gap={2}>
  <Text as="h1" size={5} weight="bold">Heading</Text>
  <Text tone="muted" size={1}>Muted small text</Text>
  <Text tone="primary" weight="semibold">Primary emphasis</Text>
</Column>`}
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
          <Text>Surface wrapper for grouping content with semantic tones.</Text>
          <CodeExample
            title="Card with Tone"
            code={`<Column gap={3}>
  <Card pad={5} radius={3} shadow={1}>
    <Column gap={2}>
      <Text weight="semibold">Default Card</Text>
      <Text tone="muted">Description</Text>
    </Column>
  </Card>
  <Card tone="success" pad={4}>
    <Text>Success message</Text>
  </Card>
</Column>`}
          >
            <Column gap={3}>
              <Card pad={5} radius={3} shadow={1}>
                <Column gap={2}>
                  <Text weight="semibold">Default Card</Text>
                  <Text tone="muted">Description</Text>
                </Column>
              </Card>
              <Card tone="success" pad={4}>
                <Text>Success message</Text>
              </Card>
            </Column>
          </CodeExample>
          <PropsTable
            props={[
              { name: "pad", type: "0-8 | Responsive<0-8>", description: "Padding (responsive)" },
              { name: "radius", type: "0-4", description: "Border radius" },
              { name: "shadow", type: "0-2", description: "Box shadow" },
              { name: "tone", type: "neutral | primary | danger | warn | success", description: "Color tone" },
            ]}
          />
        </Column>

        {/* Escape Hatches */}
        <Column gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Escape Hatches
          </Text>
          <Text>
            All primitives accept <Text as="span" mono>className</Text> for custom styling.
            Layout primitives also accept a limited <Text as="span" mono>style</Text> prop for dynamic sizing.
          </Text>
          <CodePreview
            code={`// Layout style props allowed:
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
