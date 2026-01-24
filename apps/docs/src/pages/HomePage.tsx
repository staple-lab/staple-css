import { Container, Stack, Card, Text, Grid } from "@staple-css/primitives";

export function HomePage() {
  return (
    <Container size="lg">
      <Stack gap={8}>
        {/* Hero */}
        <Stack gap={4} align="center">
          <Text as="h1" size={6} weight="bold" align="center">
            staple-css
          </Text>
          <Text size={3} tone="muted" align="center">
            A shared styling contract for apps—tokens, primitives, and accessible components.
          </Text>
        </Stack>

        {/* Description */}
        <Card pad={6} radius={3}>
          <Stack gap={4}>
            <Text>
              Semantic CSS variables standardize spacing, color, typography, and variants.
              Tokens are the API. Contract over customization. Consistency by default,
              with deliberate escape hatches.
            </Text>
          </Stack>
        </Card>

        {/* Principles */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Principles
          </Text>
          <Grid cols={3} gap={4}>
            <Card pad={5} radius={2}>
              <Stack gap={2}>
                <Text weight="semibold">Tokens are the API</Text>
                <Text size={1} tone="muted">
                  Design decisions are encoded in tokens. Components consume tokens,
                  not arbitrary values.
                </Text>
              </Stack>
            </Card>
            <Card pad={5} radius={2}>
              <Stack gap={2}>
                <Text weight="semibold">Contract over customization</Text>
                <Text size={1} tone="muted">
                  A stable API enables consistency. Override by design, not by default.
                </Text>
              </Stack>
            </Card>
            <Card pad={5} radius={2}>
              <Stack gap={2}>
                <Text weight="semibold">Escape hatches by design</Text>
                <Text size={1} tone="muted">
                  className is always available. Layout primitives accept limited style props.
                </Text>
              </Stack>
            </Card>
          </Grid>
        </Stack>

        {/* Quick Start */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Quick Start
          </Text>
          <Card pad={0} radius={2}>
            <pre className="code-block">{`npm install @staple-css/tokens @staple-css/primitives`}</pre>
          </Card>
          <Card pad={0} radius={2}>
            <pre className="code-block">{`// Import CSS at your app root
import "@staple-css/tokens/all.css";
import "@staple-css/primitives/primitives.css";

// Use components
import { Container, Stack, Card, Text } from "@staple-css/primitives";

function App() {
  return (
    <Container size="lg">
      <Stack gap={4}>
        <Text as="h1" size={5} weight="bold">Hello</Text>
        <Card pad={4}>
          <Text>Welcome to staple-css</Text>
        </Card>
      </Stack>
    </Container>
  );
}`}</pre>
          </Card>
        </Stack>

        {/* Packages */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Packages
          </Text>
          <Grid cols={2} gap={4}>
            <Card pad={5} radius={2}>
              <Stack gap={2}>
                <Text weight="semibold" mono>@staple-css/tokens</Text>
                <Text size={1} tone="muted">
                  CSS variables for spacing, color, typography, shadows, and motion.
                  Light/dark themes and comfortable/compact density via data attributes.
                </Text>
              </Stack>
            </Card>
            <Card pad={5} radius={2}>
              <Stack gap={2}>
                <Text weight="semibold" mono>@staple-css/primitives</Text>
                <Text size={1} tone="muted">
                  React components: Box, Stack, Inline, Grid, Container, Text, Card.
                  Token-driven props, minimal runtime, tree-shakeable.
                </Text>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
}
