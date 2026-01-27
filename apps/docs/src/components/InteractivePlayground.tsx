import { useState } from "react";
import { Column, Card, Text, Row, Box, Grid } from "@staple-css/primitives/full";

const examples = [
  {
    title: "Card with Button",
    code: `<Card pad={5} radius={3} shadow={1}>
  <Column gap={3}>
    <Text size={4} weight="semibold">
      Welcome!
    </Text>
    <Text tone="muted">
      Start building with staple-css
    </Text>
    <Row gap={3} justify="end">
      <button>Get Started</button>
    </Row>
  </Column>
</Card>`,
    component: (
      <Card pad={5} radius={3} shadow={1}>
        <Column gap={3}>
          <Text size={4} weight="semibold">
            Welcome!
          </Text>
          <Text tone="muted">Start building with staple-css</Text>
          <Row gap={3} justify="end">
            <button style={{ padding: "var(--st-space-2) var(--st-space-4)", borderRadius: "var(--st-radius-2)", border: "1px solid var(--st-color-border)", cursor: "pointer" }}>
              Get Started
            </button>
          </Row>
        </Column>
      </Card>
    ),
  },
  {
    title: "Responsive Grid",
    code: `<Grid
  cols={{ base: 1, md: 2, lg: 3 }}
  gap={4}
>
  <Card pad={4} radius={2}>Item 1</Card>
  <Card pad={4} radius={2}>Item 2</Card>
  <Card pad={4} radius={2}>Item 3</Card>
</Grid>`,
    component: (
      <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
        <Card pad={4} radius={2}>
          <Text align="center">Item 1</Text>
        </Card>
        <Card pad={4} radius={2}>
          <Text align="center">Item 2</Text>
        </Card>
        <Card pad={4} radius={2}>
          <Text align="center">Item 3</Text>
        </Card>
      </Grid>
    ),
  },
  {
    title: "Status Cards",
    code: `<Column gap={3}>
  <Card pad={4} radius={2} tone="primary">
    <Text weight="medium">Primary</Text>
  </Card>
  <Card pad={4} radius={2} tone="danger">
    <Text weight="medium">Danger</Text>
  </Card>
  <Card pad={4} radius={2} tone="success">
    <Text weight="medium">Success</Text>
  </Card>
</Column>`,
    component: (
      <Column gap={3}>
        <Card pad={4} radius={2} tone="primary">
          <Text weight="medium">Primary</Text>
        </Card>
        <Card pad={4} radius={2} tone="danger">
          <Text weight="medium">Danger</Text>
        </Card>
        <Card pad={4} radius={2} tone="success">
          <Text weight="medium">Success</Text>
        </Card>
      </Column>
    ),
  },
  {
    title: "Form Layout",
    code: `<Column gap={4}>
  <Column gap={1}>
    <Text as="label" weight="medium">
      Email
    </Text>
    <input type="email" placeholder="you@example.com" />
  </Column>
  <Column gap={1}>
    <Text as="label" weight="medium">
      Password
    </Text>
    <input type="password" placeholder="••••••••" />
  </Column>
  <Row gap={3} justify="end">
    <button>Cancel</button>
    <button>Submit</button>
  </Row>
</Column>`,
    component: (
      <Column gap={4}>
        <Column gap={1}>
          <Text as="label" weight="medium">
            Email
          </Text>
          <input
            type="email"
            placeholder="you@example.com"
            style={{ padding: "var(--st-space-2) var(--st-space-3)", borderRadius: "var(--st-radius-2)", border: "1px solid var(--st-color-border)", width: "100%" }}
          />
        </Column>
        <Column gap={1}>
          <Text as="label" weight="medium">
            Password
          </Text>
          <input
            type="password"
            placeholder="••••••••"
            style={{ padding: "var(--st-space-2) var(--st-space-3)", borderRadius: "var(--st-radius-2)", border: "1px solid var(--st-color-border)", width: "100%" }}
          />
        </Column>
        <Row gap={3} justify="end">
          <button style={{ padding: "var(--st-space-2) var(--st-space-4)", borderRadius: "var(--st-radius-2)", border: "1px solid var(--st-color-border)", cursor: "pointer" }}>
            Cancel
          </button>
          <button style={{ padding: "var(--st-space-2) var(--st-space-4)", borderRadius: "var(--st-radius-2)", border: "1px solid var(--st-color-primary)", background: "var(--st-color-primary)", color: "#fff", cursor: "pointer" }}>
            Submit
          </button>
        </Row>
      </Column>
    ),
  },
];

export function InteractivePlayground() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCode, setShowCode] = useState(false);

  const currentExample = examples[selectedIndex];

  if (!currentExample) {
    return null;
  }

  return (
    <Card pad={0} radius={3} shadow={3}>
      <Column gap={0}>
        {/* Header */}
        <Box style={{ borderBottom: "2px solid var(--st-color-border)", background: "var(--st-color-surface-raised)", padding: "var(--st-space-4)" }}>
          <Row gap={3} justify="between" align="center">
            <Column gap={1}>
              <Text weight="bold" size={2}>Live Component Playground</Text>
              <Text size={0} tone="muted">Switch tabs to explore components</Text>
            </Column>
          </Row>
        </Box>

        {/* Tabs */}
        <Box style={{ borderBottom: "1px solid var(--st-color-border)", overflowX: "auto", background: "var(--st-color-surface)" }}>
          <Row gap={0}>
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                style={{
                  padding: "var(--st-space-3) var(--st-space-5)",
                  background: selectedIndex === index ? "white" : "transparent",
                  border: "none",
                  borderBottom: selectedIndex === index ? "3px solid var(--st-color-primary)" : "3px solid transparent",
                  cursor: "pointer",
                  fontSize: "var(--st-font-size-1)",
                  fontWeight: selectedIndex === index ? "600" : "500",
                  color: selectedIndex === index ? "var(--st-color-text)" : "var(--st-color-text-muted)",
                  whiteSpace: "nowrap",
                  transition: "all var(--st-duration-fast) var(--st-easing-default)",
                }}
              >
                {example.title}
              </button>
            ))}
          </Row>
        </Box>

        {/* Controls */}
        <Box pad={4} style={{ borderBottom: "1px solid var(--st-color-border)", background: "var(--st-color-surface)" }}>
          <Row gap={3} justify="between" align="center">
            <Column gap={0}>
              <Text size={0} weight="medium" tone="muted">Display</Text>
            </Column>
            <Row gap={2}>
              <button
                onClick={() => setShowCode(false)}
                style={{
                  padding: "var(--st-space-2) var(--st-space-4)",
                  borderRadius: "var(--st-radius-2)",
                  border: !showCode ? "2px solid var(--st-color-primary)" : "1px solid var(--st-color-border)",
                  background: !showCode ? "var(--st-color-primary)" : "transparent",
                  color: !showCode ? "white" : "var(--st-color-text)",
                  cursor: "pointer",
                  fontSize: "var(--st-font-size-0)",
                  fontWeight: "600",
                  transition: "all var(--st-duration-fast) var(--st-easing-default)",
                }}
              >
                👁️ Preview
              </button>
              <button
                onClick={() => setShowCode(true)}
                style={{
                  padding: "var(--st-space-2) var(--st-space-4)",
                  borderRadius: "var(--st-radius-2)",
                  border: showCode ? "2px solid var(--st-color-primary)" : "1px solid var(--st-color-border)",
                  background: showCode ? "var(--st-color-primary)" : "transparent",
                  color: showCode ? "white" : "var(--st-color-text)",
                  cursor: "pointer",
                  fontSize: "var(--st-font-size-0)",
                  fontWeight: "600",
                  transition: "all var(--st-duration-fast) var(--st-easing-default)",
                }}
              >
                {'<>'} Code
              </button>
            </Row>
          </Row>
        </Box>

        {/* Content */}
        <Box pad={6} style={{ minHeight: "300px", background: "var(--st-color-background)" }}>
          {showCode ? (
            <pre
              style={{
                background: "var(--st-color-surface)",
                padding: "var(--st-space-5)",
                borderRadius: "var(--st-radius-3)",
                overflow: "auto",
                fontSize: "var(--st-font-size-1)",
                lineHeight: "1.7",
                fontFamily: "var(--st-font-mono)",
                border: "1px solid var(--st-color-border)",
              }}
            >
              <code>{currentExample.code}</code>
            </pre>
          ) : (
            <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "300px", background: "var(--st-color-surface)", borderRadius: "var(--st-radius-2)", padding: "var(--st-space-6)" }}>
              {currentExample.component}
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Box pad={4} style={{ borderTop: "1px solid var(--st-color-border)", background: "var(--st-color-surface)" }}>
          <Row gap={3} justify="between" align="center">
            <Text size={0} tone="muted">
              💡 Resize your browser to see responsive behavior
            </Text>
            <Row gap={2}>
              <a
                href="/storybook"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "var(--st-space-2) var(--st-space-4)",
                  borderRadius: "var(--st-radius-2)",
                  border: "1px solid var(--st-color-primary)",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "var(--st-font-size-0)",
                  textDecoration: "none",
                  color: "var(--st-color-primary)",
                  fontWeight: "600",
                  transition: "all var(--st-duration-fast) var(--st-easing-default)",
                }}
              >
                📖 View in Storybook →
              </a>
            </Row>
          </Row>
        </Box>
      </Column>
    </Card>
  );
}
