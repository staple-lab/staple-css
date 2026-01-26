import { Container, Column, Card, Text, Grid, Row, Box } from "@staple-css/primitives";
import { CodePreview } from "../components/CodePreview";
import { InteractivePlayground } from "../components/InteractivePlayground";

export function HomePage() {
  return (
    <Container size="lg">
      <Column gap={8}>
        {/* Hero */}
        <Column gap={4} align="center">
          <Text as="h1" size={6} weight="bold" align="center">
            staple-css
          </Text>
          <Text size={3} tone="muted" align="center">
            The CSS variable generator for design system consistency
          </Text>
          <Box style={{ maxWidth: "600px" }}>
            <Text size={2} tone="muted" align="center">
              Create tokens, not chaos. Build design systems with semantic CSS variables, type-safe React primitives, and AI-friendly APIs.
            </Text>
          </Box>
          <Box style={{ marginTop: "8px" }}>
            <Row gap={3}>
            <a
              href="#playground"
              style={{
                padding: "12px 24px",
                borderRadius: "6px",
                background: "var(--st-color-primary)",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Try it Live
            </a>
            <a
              href="/storybook"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 24px",
                borderRadius: "6px",
                border: "2px solid var(--st-color-border)",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              View Storybook →
            </a>
            <a
              href="/tokens-studio"
              style={{
                padding: "12px 24px",
                borderRadius: "6px",
                border: "2px solid var(--st-color-border)",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Token Studio
            </a>
            </Row>
          </Box>
        </Column>

        {/* Value Props */}
        <Grid cols={{ base: 1, md: 3 }} gap={4}>
          <Card pad={5} radius={3} shadow={1}>
            <Column gap={2}>
              <Text size={5}>🎯</Text>
              <Text weight="bold">Token-First</Text>
              <Text size={1} tone="muted">
                310+ CSS variables. Space (0-8), radius (0-4), colors, motion, and more. Type-safe props prevent invalid values.
              </Text>
            </Column>
          </Card>
          <Card pad={5} radius={3} shadow={1}>
            <Column gap={2}>
              <Text size={5}>⚡</Text>
              <Text weight="bold">Zero Runtime</Text>
              <Text size={1} tone="muted">
                ~30KB total. Static CSS, no JavaScript overhead, tree-shakeable exports. Faster than CSS-in-JS.
              </Text>
            </Column>
          </Card>
          <Card pad={5} radius={3} shadow={1}>
            <Column gap={2}>
              <Text size={5}>🤖</Text>
              <Text weight="bold">AI-Friendly</Text>
              <Text size={1} tone="muted">
                Constrained APIs prevent hallucination. pad=&#123;4&#125; not padding: "16.7px". Perfect for AI code generation.
              </Text>
            </Column>
          </Card>
        </Grid>

        {/* Interactive Playground */}
        <Column gap={4} id="playground">
          <Column gap={2}>
            <Text as="h2" size={5} weight="bold">
              Try it Live
            </Text>
            <Text tone="muted">
              See how staple-css primitives work. Switch between examples, view code, and see real components in action.
            </Text>
          </Column>
          <InteractivePlayground />
        </Column>

        {/* Principles */}
        <Column gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Principles
          </Text>
          <Grid cols={3} gap={4}>
            <Card pad={5} radius={2}>
              <Column gap={2}>
                <Text weight="semibold">Tokens are the API</Text>
                <Text size={1} tone="muted">
                  Design decisions are encoded in tokens. Components consume tokens,
                  not arbitrary values.
                </Text>
              </Column>
            </Card>
            <Card pad={5} radius={2}>
              <Column gap={2}>
                <Text weight="semibold">Contract over customization</Text>
                <Text size={1} tone="muted">
                  A stable API enables consistency. Override by design, not by default.
                </Text>
              </Column>
            </Card>
            <Card pad={5} radius={2}>
              <Column gap={2}>
                <Text weight="semibold">Escape hatches by design</Text>
                <Text size={1} tone="muted">
                  className is always available. Layout primitives accept limited style props.
                </Text>
              </Column>
            </Card>
          </Grid>
        </Column>

        {/* Quick Start */}
        <Column gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Quick Start
          </Text>
          <CodePreview
            code="npm install @staple-css/tokens @staple-css/primitives"
            language="bash"
            title="Install"
          />
          <CodePreview
            code={`// Import CSS at your app root
import "@staple-css/tokens/all.css";
import "@staple-css/primitives/primitives.css";

// Use components
import { Container, Column, Card, Text } from "@staple-css/primitives";

function App() {
  return (
    <Container size="lg">
      <Column gap={4}>
        <Text as="h1" size={5} weight="bold">Hello</Text>
        <Card pad={4}>
          <Text>Welcome to staple-css</Text>
        </Card>
      </Column>
    </Container>
  );
}`}
            language="typescript"
            title="Usage"
          />
        </Column>

        {/* Packages */}
        <Column gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Packages
          </Text>
          <Grid cols={2} gap={4}>
            <Card pad={5} radius={2}>
              <Column gap={2}>
                <Text weight="semibold" mono>@staple-css/tokens</Text>
                <Text size={1} tone="muted">
                  CSS variables for spacing, color, typography, shadows, and motion.
                  Light/dark themes and comfortable/compact density via data attributes.
                </Text>
              </Column>
            </Card>
            <Card pad={5} radius={2}>
              <Column gap={2}>
                <Text weight="semibold" mono>@staple-css/primitives</Text>
                <Text size={1} tone="muted">
                  React components: Box, Column, Row, Grid, Container, Text, Card.
                  Token-driven props, minimal runtime, tree-shakeable.
                </Text>
              </Column>
            </Card>
          </Grid>
        </Column>
      </Column>
    </Container>
  );
}
