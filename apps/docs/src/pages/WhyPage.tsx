import { Container, Stack, Card, Text, Inline } from "@staple-css/primitives";

export function WhyPage() {
  return (
    <Container size="md">
      <Stack gap={8}>
        <Stack gap={2}>
          <Text as="h1" size={5} weight="bold">
            Why staple-css?
          </Text>
          <Text tone="muted" size={3}>
            A styling contract that prioritizes consistency, performance, and maintainability.
          </Text>
        </Stack>

        {/* Core Philosophy */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Core Philosophy
          </Text>
          <Card pad={6} radius={3}>
            <Stack gap={4}>
              <Text>
                staple-css is built on a simple idea: <strong>tokens are the API</strong>.
                Instead of allowing arbitrary values throughout your codebase, staple-css
                provides a contract—a set of design decisions encoded as CSS variables.
              </Text>
              <Text>
                This contract ensures consistency. When every component uses the same
                spacing scale, the same color tokens, the same typography settings,
                your UI naturally becomes more cohesive.
              </Text>
            </Stack>
          </Card>
        </Stack>

        {/* Principles */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Principles
          </Text>

          <Card pad={5} radius={2}>
            <Stack gap={3}>
              <Text weight="semibold" size={3}>Tokens are the API</Text>
              <Text tone="muted">
                Design decisions live in tokens, not scattered across components.
                Components accept token keys (like <Text as="span" mono>pad={4}</Text> or{" "}
                <Text as="span" mono>tone="primary"</Text>), not arbitrary values.
                This makes your design system queryable and changeable from a single source.
              </Text>
            </Stack>
          </Card>

          <Card pad={5} radius={2}>
            <Stack gap={3}>
              <Text weight="semibold" size={3}>Contract over customization</Text>
              <Text tone="muted">
                A stable, predictable API enables teams to build consistent interfaces
                without constant coordination. Override mechanisms exist, but they're
                deliberate—not the default path. This reduces cognitive load and makes
                code reviews simpler.
              </Text>
            </Stack>
          </Card>

          <Card pad={5} radius={2}>
            <Stack gap={3}>
              <Text weight="semibold" size={3}>Consistency by default, escape hatches by design</Text>
              <Text tone="muted">
                The happy path keeps you in the token system. When you need to break out,
                <Text as="span" mono> className</Text> is always available, and layout primitives
                accept a limited <Text as="span" mono>style</Text> prop for dynamic sizing.
                Escape hatches are explicit and visible in code review.
              </Text>
            </Stack>
          </Card>
        </Stack>

        {/* Performance */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            Performance-First Design
          </Text>

          <Card pad={5} radius={2}>
            <Stack gap={3}>
              <Inline gap={2} align="center">
                <Text weight="semibold">Static CSS</Text>
              </Inline>
              <Text size={1} tone="muted">
                All styling is static CSS loaded upfront—no runtime style generation,
                no CSS-in-JS overhead. Token values are CSS variables that the browser
                handles natively.
              </Text>
            </Stack>
          </Card>

          <Card pad={5} radius={2}>
            <Stack gap={3}>
              <Inline gap={2} align="center">
                <Text weight="semibold">Minimal Runtime</Text>
              </Inline>
              <Text size={1} tone="muted">
                Components do simple object lookups to map props to class names.
                No complex class composition engines, no repeated string concatenation.
                The <Text as="span" mono>cx()</Text> utility is ~10 lines of code.
              </Text>
            </Stack>
          </Card>

          <Card pad={5} radius={2}>
            <Stack gap={3}>
              <Inline gap={2} align="center">
                <Text weight="semibold">Tree-Shakeable</Text>
              </Inline>
              <Text size={1} tone="muted">
                ESM exports with proper module boundaries mean unused components
                are eliminated during bundling. Import only what you use.
              </Text>
            </Stack>
          </Card>

          <Card pad={5} radius={2}>
            <Stack gap={3}>
              <Inline gap={2} align="center">
                <Text weight="semibold">Stable Class Names</Text>
              </Inline>
              <Text size={1} tone="muted">
                Class names like <Text as="span" mono>st-Stack--gap-4</Text> are
                precomputed and stable. No DOM churn from dynamically generated
                class names on each render.
              </Text>
            </Stack>
          </Card>
        </Stack>

        {/* What staple-css is NOT */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            What staple-css is NOT
          </Text>

          <Card pad={5} radius={2}>
            <Stack gap={3}>
              <Text weight="semibold">Not a component library</Text>
              <Text size={1} tone="muted">
                staple-css provides primitives—building blocks for layout and typography.
                It doesn't include complex widgets like datepickers, modals, or data tables.
                Use it alongside your component library of choice.
              </Text>
            </Stack>
          </Card>

          <Card pad={5} radius={2}>
            <Stack gap={3}>
              <Text weight="semibold">Not a utility-first framework</Text>
              <Text size={1} tone="muted">
                While staple-css uses CSS classes internally, it's not designed for
                utility-class composition in your markup. Props are the API;
                classes are an implementation detail.
              </Text>
            </Stack>
          </Card>

          <Card pad={5} radius={2}>
            <Stack gap={3}>
              <Text weight="semibold">Not infinitely customizable</Text>
              <Text size={1} tone="muted">
                Deliberate constraints are a feature. The token scales are fixed.
                The primitive API is minimal. This is by design—constraints enable
                consistency.
              </Text>
            </Stack>
          </Card>
        </Stack>

        {/* When to use */}
        <Stack gap={4}>
          <Text as="h2" size={4} weight="semibold">
            When to Use staple-css
          </Text>
          <Card pad={6} radius={3}>
            <Stack gap={3}>
              <Text weight="medium">staple-css is a good fit when you want:</Text>
              <Stack as="ul" gap={2} style={{ paddingLeft: "var(--st-space-5)" }}>
                <li><Text>A consistent token system across your app</Text></li>
                <li><Text>Layout primitives that just work</Text></li>
                <li><Text>Minimal runtime overhead</Text></li>
                <li><Text>Type-safe props that prevent arbitrary values</Text></li>
                <li><Text>Easy theming via CSS variables</Text></li>
                <li><Text>A foundation to build on, not a framework to fight</Text></li>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Container>
  );
}
