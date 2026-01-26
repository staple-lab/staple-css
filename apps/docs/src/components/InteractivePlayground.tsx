import { useState } from "react";
import { Column, Card, Text, Row, Box, Grid } from "@staple-css/primitives";

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
            <button style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #ddd", cursor: "pointer" }}>
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
    <input type="email" />
  </Column>
  <Column gap={1}>
    <Text as="label" weight="medium">
      Password
    </Text>
    <input type="password" />
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
            style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #ddd", width: "100%" }}
          />
        </Column>
        <Column gap={1}>
          <Text as="label" weight="medium">
            Password
          </Text>
          <input
            type="password"
            placeholder="••••••••"
            style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #ddd", width: "100%" }}
          />
        </Column>
        <Row gap={3} justify="end">
          <button style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #ddd", cursor: "pointer" }}>
            Cancel
          </button>
          <button style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #2563eb", background: "#2563eb", color: "#fff", cursor: "pointer" }}>
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
    <Card pad={0} radius={3} shadow={2}>
      <Column gap={0}>
        {/* Tabs */}
        <Box style={{ borderBottom: "1px solid var(--st-color-border)", overflowX: "auto" }}>
          <Row gap={0}>
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                style={{
                  padding: "12px 20px",
                  background: selectedIndex === index ? "var(--st-color-surface)" : "transparent",
                  border: "none",
                  borderBottom: selectedIndex === index ? "2px solid var(--st-color-primary)" : "2px solid transparent",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: selectedIndex === index ? "600" : "normal",
                  color: selectedIndex === index ? "var(--st-color-text)" : "var(--st-color-text-muted)",
                  whiteSpace: "nowrap",
                }}
              >
                {example.title}
              </button>
            ))}
          </Row>
        </Box>

        {/* Controls */}
        <Box pad={3} style={{ borderBottom: "1px solid var(--st-color-border)" }}>
          <Row gap={3} justify="between" align="center">
            <Text size={1} weight="medium">
              {showCode ? "Code" : "Preview"}
            </Text>
            <Row gap={2}>
              <button
                onClick={() => setShowCode(false)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "4px",
                  border: "1px solid var(--st-color-border)",
                  background: !showCode ? "var(--st-color-surface)" : "transparent",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Preview
              </button>
              <button
                onClick={() => setShowCode(true)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "4px",
                  border: "1px solid var(--st-color-border)",
                  background: showCode ? "var(--st-color-surface)" : "transparent",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Code
              </button>
            </Row>
          </Row>
        </Box>

        {/* Content */}
        <Box pad={5}>
          {showCode ? (
            <pre
              style={{
                background: "var(--st-color-surface-raised)",
                padding: "16px",
                borderRadius: "8px",
                overflow: "auto",
                fontSize: "14px",
                lineHeight: "1.5",
                fontFamily: "var(--st-font-mono)",
              }}
            >
              <code>{currentExample.code}</code>
            </pre>
          ) : (
            <Box>{currentExample.component}</Box>
          )}
        </Box>

        {/* Footer */}
        <Box pad={3} style={{ borderTop: "1px solid var(--st-color-border)", background: "var(--st-color-surface-raised)" }}>
          <Row gap={3} justify="between" align="center">
            <Text size={0} tone="muted">
              Try resizing your browser to see responsive behavior
            </Text>
            <Row gap={2}>
              <a
                href="/storybook"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "6px 12px",
                  borderRadius: "4px",
                  border: "1px solid var(--st-color-border)",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "13px",
                  textDecoration: "none",
                  color: "var(--st-color-text)",
                }}
              >
                View in Storybook →
              </a>
            </Row>
          </Row>
        </Box>
      </Column>
    </Card>
  );
}
