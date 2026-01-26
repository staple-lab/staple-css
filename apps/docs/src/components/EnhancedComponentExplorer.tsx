import { useState } from "react";
import { Column, Card, Text, Row, Box, Grid, Flex } from "@staple-css/primitives";

interface ComponentProp {
  name: string;
  type: string;
  description: string;
  default?: string;
  options?: string[];
}

interface ComponentDemo {
  name: string;
  description: string;
  props: ComponentProp[];
  examples: {
    title: string;
    code: string;
    component: React.ReactNode;
  }[];
  viewpoints?: {
    title: string;
    description: string;
    component: React.ReactNode;
  }[];
}

const componentDemos: ComponentDemo[] = [
  {
    name: "Box",
    description: "Universal layout container for wrapping and styling content",
    props: [
      { name: "pad", type: "Space", description: "Padding on all sides", default: "0", options: ["0", "1", "2", "3", "4", "5", "6", "7", "8"] },
      { name: "radius", type: "Radius", description: "Border radius", default: "0", options: ["0", "1", "2", "3", "4"] },
      { name: "shadow", type: "Shadow", description: "Box shadow elevation", default: "0", options: ["0", "1", "2"] },
      { name: "gap", type: "Space", description: "Gap between children (if flex)", default: "0" },
      { name: "className", type: "string", description: "Additional CSS classes for overrides" },
    ],
    examples: [
      {
        title: "Basic Box",
        code: `<Box pad={4} radius={2} shadow={1}>
  Basic content container
</Box>`,
        component: (
          <Box pad={4} radius={2} shadow={1} style={{ background: "var(--st-color-surface-secondary)" }}>
            <Text>Basic content container</Text>
          </Box>
        ),
      },
      {
        title: "Nested Boxes",
        code: `<Box pad={6} radius={3} shadow={2}>
  <Box pad={4} radius={2} style={{ background: "#f5f5f5" }}>
    Nested content
  </Box>
</Box>`,
        component: (
          <Box pad={6} radius={3} shadow={2}>
            <Box pad={4} radius={2} style={{ background: "rgba(0,0,0,0.05)" }}>
              <Text>Nested content</Text>
            </Box>
          </Box>
        ),
      },
    ],
    viewpoints: [
      {
        title: "Padding Variants",
        description: "Box with different padding scales",
        component: (
          <Row gap={3} style={{ flexWrap: "wrap" }}>
            {["0", "2", "4", "6", "8"].map((pad) => (
              <Box key={pad} pad={parseInt(pad)} radius={2} shadow={1} style={{ minWidth: "80px", background: "var(--st-color-primary-light, #e3f2fd)" }}>
                <Text size={1} align="center">{`pad={${pad}}`}</Text>
              </Box>
            ))}
          </Row>
        ),
      },
      {
        title: "Shadow Depths",
        description: "Different elevation levels",
        component: (
          <Row gap={3} style={{ flexWrap: "wrap" }}>
            {["0", "1", "2"].map((shadow) => (
              <Box key={shadow} pad={4} shadow={parseInt(shadow)} radius={2} style={{ minWidth: "100px" }}>
                <Text size={1} align="center">{`shadow={${shadow}}`}</Text>
              </Box>
            ))}
          </Row>
        ),
      },
    ],
  },
  {
    name: "Card",
    description: "Surface component for grouped content with consistent styling",
    props: [
      { name: "pad", type: "Space", description: "Internal padding", default: "4" },
      { name: "radius", type: "Radius", description: "Border radius", default: "2" },
      { name: "shadow", type: "Shadow", description: "Drop shadow", default: "1" },
      { name: "tone", type: "Tone", description: "Color tone", default: "neutral", options: ["neutral", "primary", "danger", "success", "warn"] },
      { name: "children", type: "ReactNode", description: "Card content" },
    ],
    examples: [
      {
        title: "Basic Card",
        code: `<Card pad={5} radius={3} shadow={1}>
  <Text weight="semibold">Card Title</Text>
  <Text tone="muted">Card content goes here</Text>
</Card>`,
        component: (
          <Card pad={5} radius={3} shadow={1}>
            <Column gap={2}>
              <Text weight="semibold">Card Title</Text>
              <Text tone="muted">Card content goes here</Text>
            </Column>
          </Card>
        ),
      },
      {
        title: "Toned Cards",
        code: `<Grid cols={2} gap={4}>
  <Card pad={4} tone="primary">Primary</Card>
  <Card pad={4} tone="danger">Danger</Card>
  <Card pad={4} tone="success">Success</Card>
  <Card pad={4} tone="warn">Warning</Card>
</Grid>`,
        component: (
          <Grid cols={{ base: 2 }} gap={4}>
            <Card pad={4} tone="primary"><Text size={1}>Primary</Text></Card>
            <Card pad={4} tone="danger"><Text size={1}>Danger</Text></Card>
            <Card pad={4} tone="success"><Text size={1}>Success</Text></Card>
            <Card pad={4} tone="warn"><Text size={1}>Warning</Text></Card>
          </Grid>
        ),
      },
    ],
  },
  {
    name: "Text",
    description: "Typography primitive for semantic text rendering",
    props: [
      { name: "as", type: "string", description: "HTML tag", default: "span", options: ["span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "label"] },
      { name: "size", type: "Size", description: "Font size scale", default: "2", options: ["1", "2", "3", "4", "5", "6"] },
      { name: "weight", type: "Weight", description: "Font weight", default: "normal", options: ["normal", "medium", "semibold", "bold"] },
      { name: "tone", type: "Tone", description: "Color tone", default: "neutral", options: ["neutral", "muted", "primary", "danger", "success"] },
      { name: "align", type: "string", description: "Text alignment", options: ["left", "center", "right"] },
    ],
    examples: [
      {
        title: "Text Sizes",
        code: `<Column gap={3}>
  <Text size={1}>Size 1: Small</Text>
  <Text size={3}>Size 3: Normal</Text>
  <Text size={5} weight="bold">Size 5: Large Bold</Text>
  <Text size={6} weight="bold">Size 6: Extra Large</Text>
</Column>`,
        component: (
          <Column gap={3}>
            <Text size={1}>Size 1: Small text</Text>
            <Text size={3}>Size 3: Normal text</Text>
            <Text size={5} weight="bold">Size 5: Large bold text</Text>
            <Text size={6} weight="bold">Size 6: Extra large bold</Text>
          </Column>
        ),
      },
      {
        title: "Text Tones",
        code: `<Column gap={2}>
  <Text tone="neutral">Neutral (default)</Text>
  <Text tone="muted">Muted (secondary)</Text>
  <Text tone="primary">Primary (accent)</Text>
  <Text tone="success">Success (positive)</Text>
  <Text tone="danger">Danger (error)</Text>
</Column>`,
        component: (
          <Column gap={2}>
            <Text tone="neutral">Neutral (default)</Text>
            <Text tone="muted">Muted (secondary)</Text>
            <Text tone="primary">Primary (accent)</Text>
            <Text tone="success">Success (positive)</Text>
            <Text tone="danger">Danger (error)</Text>
          </Column>
        ),
      },
    ],
    viewpoints: [
      {
        title: "Hierarchy Levels",
        description: "Typography scale for visual hierarchy",
        component: (
          <Column gap={4}>
            <Text as="h1" size={6} weight="bold">Heading 1 (H1) - Size 6</Text>
            <Text as="h2" size={5} weight="bold">Heading 2 (H2) - Size 5</Text>
            <Text as="h3" size={4} weight="semibold">Heading 3 (H3) - Size 4</Text>
            <Text as="p" size={3}>Body text - Size 3 (most common)</Text>
            <Text as="p" size={2}>Small body text - Size 2</Text>
            <Text size={1}>Caption or label - Size 1</Text>
          </Column>
        ),
      },
    ],
  },
  {
    name: "Grid",
    description: "Responsive CSS Grid layout for multi-column content",
    props: [
      { name: "cols", type: "GridCols", description: "Column configuration", default: "{ base: 1 }" },
      { name: "gap", type: "Space", description: "Gap between items", default: "4" },
      { name: "rows", type: "GridRows", description: "Row configuration" },
      { name: "children", type: "ReactNode", description: "Grid items" },
    ],
    examples: [
      {
        title: "Responsive Grid",
        code: `<Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
  <Card pad={4}>Item 1</Card>
  <Card pad={4}>Item 2</Card>
  <Card pad={4}>Item 3</Card>
</Grid>`,
        component: (
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
            <Card pad={4}><Text align="center">Item 1</Text></Card>
            <Card pad={4}><Text align="center">Item 2</Text></Card>
            <Card pad={4}><Text align="center">Item 3</Text></Card>
          </Grid>
        ),
      },
    ],
  },
];

export function EnhancedComponentExplorer() {
  const [selectedComponent, setSelectedComponent] = useState(0);
  const [expandedProp, setExpandedProp] = useState<string | null>(null);

  const component = componentDemos[selectedComponent];

  return (
    <Column gap={6} style={{ background: "var(--st-color-surface)" }}>
      {/* Component Selector */}
      <Box>
        <Row gap={2} style={{ flexWrap: "wrap" }}>
          {componentDemos.map((comp, idx) => (
            <button
              key={comp.name}
              onClick={() => setSelectedComponent(idx)}
              style={{
                padding: "10px 20px",
                borderRadius: "6px",
                border: idx === selectedComponent ? "2px solid var(--st-color-primary)" : "1px solid var(--st-color-border)",
                background: idx === selectedComponent ? "var(--st-color-primary)" : "transparent",
                color: idx === selectedComponent ? "white" : "inherit",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {comp.name}
            </button>
          ))}
        </Row>
      </Box>

      {/* Component Header */}
      <Box>
        <Column gap={2}>
          <Text as="h2" size={5} weight="bold">{component.name}</Text>
          <Text tone="muted">{component.description}</Text>
        </Column>
      </Box>

      {/* Props Reference */}
      <Card pad={5} radius={3}>
        <Column gap={4}>
          <Text as="h3" size={4} weight="semibold">Props Reference</Text>
          <Box style={{ display: "grid", gap: "var(--st-space-3)" }}>
            {component.props.map((prop) => (
              <Box
                key={prop.name}
                pad={3}
                radius={2}
                style={{ background: "var(--st-color-surface-secondary)", cursor: "pointer" }}
                onClick={() => setExpandedProp(expandedProp === prop.name ? null : prop.name)}
              >
                <Row justify="between" align="center">
                  <Column gap={1} style={{ flex: 1 }}>
                    <Text weight="semibold" size={2}>{prop.name}</Text>
                    <Row gap={2} align="center">
                      <Text size={1} tone="muted" style={{ fontFamily: "monospace", background: "rgba(0,0,0,0.05)", padding: "2px 6px", borderRadius: "3px" }}>
                        {prop.type}
                      </Text>
                      {prop.default && <Text size={1} tone="muted">Default: {prop.default}</Text>}
                    </Row>
                  </Column>
                  <Text size={2}>{expandedProp === prop.name ? "−" : "+"}</Text>
                </Row>
                {expandedProp === prop.name && (
                  <Column gap={2} style={{ marginTop: "var(--st-space-2)" }}>
                    <Text size={1}>{prop.description}</Text>
                    {prop.options && (
                      <Box>
                        <Text size={1} weight="semibold">Options:</Text>
                        <Box style={{ display: "flex", flexWrap: "wrap", gap: "var(--st-space-2)", marginTop: "var(--st-space-1)" }}>
                          {prop.options.map((opt) => (
                            <Text key={opt} size={1} style={{ background: "var(--st-color-primary)", color: "white", padding: "4px 8px", borderRadius: "3px", fontFamily: "monospace" }}>
                              {opt}
                            </Text>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Column>
                )}
              </Box>
            ))}
          </Box>
        </Column>
      </Card>

      {/* Examples */}
      <Column gap={4}>
        <Text as="h3" size={4} weight="semibold">Examples & Usage</Text>
        {component.examples.map((example, idx) => (
          <Column key={idx} gap={3}>
            <Card pad={5} radius={3}>
              <Column gap={3}>
                <Text weight="semibold" size={3}>{example.title}</Text>
                <Box style={{ background: "var(--st-color-surface-secondary)", padding: "var(--st-space-3)", borderRadius: "6px", overflow: "auto" }}>
                  <pre style={{ margin: 0, fontSize: "13px", fontFamily: "monospace", color: "var(--st-color-text)" }}>
                    {example.code}
                  </pre>
                </Box>
                <Box style={{ padding: "var(--st-space-4)", background: "var(--st-color-surface-secondary)", borderRadius: "6px", border: "1px solid var(--st-color-border)" }}>
                  {example.component}
                </Box>
              </Column>
            </Card>
          </Column>
        ))}
      </Column>

      {/* Viewpoints */}
      {component.viewpoints && (
        <Column gap={4}>
          <Text as="h3" size={4} weight="semibold">Responsive Viewpoints</Text>
          {component.viewpoints.map((vp, idx) => (
            <Card key={idx} pad={5} radius={3}>
              <Column gap={3}>
                <Column gap={1}>
                  <Text weight="semibold" size={3}>{vp.title}</Text>
                  <Text tone="muted" size={1}>{vp.description}</Text>
                </Column>
                <Box style={{ padding: "var(--st-space-4)", background: "var(--st-color-surface-secondary)", borderRadius: "6px", border: "1px solid var(--st-color-border)" }}>
                  {vp.component}
                </Box>
              </Column>
            </Card>
          ))}
        </Column>
      )}
    </Column>
  );
}
