import { Container, Column, Card, Text, Grid, Row, Box } from "@staple-css/primitives/full";
import { CodePreview } from "../components/CodePreview";
import { InteractivePlayground } from "../components/InteractivePlayground";

const PrimaryButton = (props: any) => (
  <a
    {...props}
    style={{
      padding: "14px 32px",
      borderRadius: "8px",
      background: "var(--st-color-primary)",
      color: "#fff",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "16px",
      transition: "all 0.2s ease",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      display: "inline-block",
      border: "none",
      cursor: "pointer",
      ...props.style,
    }}
    onMouseEnter={(e: any) => {
      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e: any) => {
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
      e.currentTarget.style.transform = "translateY(0)";
    }}
  />
);

const SecondaryButton = (props: any) => (
  <a
    {...props}
    style={{
      padding: "14px 32px",
      borderRadius: "8px",
      border: "2px solid var(--st-color-primary)",
      color: "var(--st-color-primary)",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "16px",
      transition: "all 0.2s ease",
      display: "inline-block",
      cursor: "pointer",
      ...props.style,
    }}
    onMouseEnter={(e: any) => {
      e.currentTarget.style.background = "var(--st-color-primary)";
      e.currentTarget.style.color = "#fff";
    }}
    onMouseLeave={(e: any) => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = "var(--st-color-primary)";
    }}
  />
);

export function HomePage() {
  return (
    <Box style={{ minHeight: "100vh" }}>
      {/* Hero Section - Premium gradient background */}
      <Box style={{
        background: "linear-gradient(135deg, var(--st-color-primary) 0%, var(--st-color-primary-dark, #1a5a8f) 100%)",
        color: "white",
        padding: "var(--st-space-8) var(--st-space-4)",
        position: "relative",
        overflow: "hidden",
      }}>
        <Box style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          opacity: "0.1",
          backgroundImage: "radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 80%, white 0%, transparent 50%)",
          pointerEvents: "none",
        }} />

        <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
          <Column gap={6} align="center">
            {/* Brand */}
            <Column gap={2} align="center">
              <Text as="h1" size={6} weight="bold" align="center" style={{ color: "white" }}>
                staple-css
              </Text>
              <Text size={3} align="center" style={{ color: "rgba(255,255,255,0.9)" }}>
                Design System Primitives Built for Performance
              </Text>
            </Column>

            {/* Value Proposition */}
            <Box style={{ maxWidth: "700px" }}>
              <Text size={2} align="center" style={{ color: "rgba(255,255,255,0.85)", lineHeight: "1.6" }}>
                2.5 KB by default. Token-first API. Zero JavaScript runtime. Build UI with 3 core primitives. Scales to enterprise with optional full edition.
              </Text>
            </Box>

            {/* CTA Buttons */}
            <Row gap={3} style={{ marginTop: "var(--st-space-2)", flexWrap: "wrap" }}>
              <PrimaryButton href="#playground" style={{ background: "white", color: "var(--st-color-primary)" }}>
                Try it Live →
              </PrimaryButton>
              <SecondaryButton href="/examples" style={{ borderColor: "white", color: "white" }}>
                View Examples
              </SecondaryButton>
              <SecondaryButton href="/storybook" target="_blank" rel="noopener noreferrer" style={{ borderColor: "white", color: "white" }}>
                Storybook
              </SecondaryButton>
            </Row>

            {/* Stats */}
            <Grid cols={{ base: 2, md: 4 }} gap={4} style={{ marginTop: "var(--st-space-4)", width: "100%" }}>
              <Box align="center">
                <Text size={5} weight="bold" style={{ color: "white" }}>2.5 KB</Text>
                <Text size={1} style={{ color: "rgba(255,255,255,0.7)" }}>Core Bundle</Text>
              </Box>
              <Box align="center">
                <Text size={5} weight="bold" style={{ color: "white" }}>350+</Text>
                <Text size={1} style={{ color: "rgba(255,255,255,0.7)" }}>CSS Variables</Text>
              </Box>
              <Box align="center">
                <Text size={5} weight="bold" style={{ color: "white" }}>0 KB</Text>
                <Text size={1} style={{ color: "rgba(255,255,255,0.7)" }}>Runtime Cost</Text>
              </Box>
              <Box align="center">
                <Text size={5} weight="bold" style={{ color: "white" }}>Type-Safe</Text>
                <Text size={1} style={{ color: "rgba(255,255,255,0.7)" }}>Props API</Text>
              </Box>
            </Grid>
          </Column>
        </Container>
      </Box>

      {/* Features Section */}
      <Container size="lg" style={{ padding: "var(--st-space-8) var(--st-space-4)" }}>
        <Column gap={8}>
          <Column gap={2}>
            <Text as="h2" size={5} weight="bold">Why staple-css?</Text>
            <Text tone="muted">Everything you need to build beautiful, consistent interfaces—nothing you don't.</Text>
          </Column>

          <Grid cols={{ base: 1, md: 3 }} gap={6}>
            {/* Feature 1 */}
            <Column gap={3}>
              <Box style={{ fontSize: "32px" }}>🎯</Box>
              <Column gap={2}>
                <Text weight="bold" size={3}>Token-First Design</Text>
                <Text size={1} tone="muted">
                  350+ CSS variables across 25+ categories. Type-safe props prevent invalid values.
                </Text>
              </Column>
            </Column>

            {/* Feature 2 */}
            <Column gap={3}>
              <Box style={{ fontSize: "32px" }}>⚡</Box>
              <Column gap={2}>
                <Text weight="bold" size={3}>Ultra-Lightweight</Text>
                <Text size={1} tone="muted">
                  2.5 KB by default. Full edition 8.23 KB. Zero JavaScript. Static CSS only.
                </Text>
              </Column>
            </Column>

            {/* Feature 3 */}
            <Column gap={3}>
              <Box style={{ fontSize: "32px" }}>🤖</Box>
              <Column gap={2}>
                <Text weight="bold" size={3}>AI-Friendly APIs</Text>
                <Text size={1} tone="muted">
                  Constrained props prevent hallucination. Perfect for AI code generation.
                </Text>
              </Column>
            </Column>

            {/* Feature 4 */}
            <Column gap={3}>
              <Box style={{ fontSize: "32px" }}>🎨</Box>
              <Column gap={2}>
                <Text weight="bold" size={3}>Design System Ready</Text>
                <Text size={1} tone="muted">
                  8 composable primitives. Light/dark themes. Multiple density modes.
                </Text>
              </Column>
            </Column>

            {/* Feature 5 */}
            <Column gap={3}>
              <Box style={{ fontSize: "32px" }}>🔒</Box>
              <Column gap={2}>
                <Text weight="bold" size={3}>Type-Safe</Text>
                <Text size={1} tone="muted">
                  Full TypeScript support. Compile-time validation. IDE autocomplete.
                </Text>
              </Column>
            </Column>

            {/* Feature 6 */}
            <Column gap={3}>
              <Box style={{ fontSize: "32px" }}>📦</Box>
              <Column gap={2}>
                <Text weight="bold" size={3}>Tree-Shakeable</Text>
                <Text size={1} tone="muted">
                  Import only what you use. ESM exports. Per-component splitting.
                </Text>
              </Column>
            </Column>
          </Grid>
        </Column>
      </Container>

      {/* Comparison Section */}
      <Box style={{ background: "var(--st-color-surface-secondary, rgba(0,0,0,0.02))", padding: "var(--st-space-8) var(--st-space-4)" }}>
        <Container size="lg">
          <Column gap={6}>
            <Column gap={2}>
              <Text as="h2" size={5} weight="bold">How It Compares</Text>
              <Text tone="muted">staple-css is smaller, faster, and more intentional.</Text>
            </Column>

            <Box style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--st-color-border)" }}>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Feature</th>
                    <th style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>staple-css</th>
                    <th style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>Tailwind</th>
                    <th style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>Chakra UI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--st-color-border)" }}>
                    <td style={{ padding: "12px" }}>Bundle Size (gzip)</td>
                    <td style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: "var(--st-color-success, green)" }}>2.5 KB</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>~10 KB</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>~45 KB</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--st-color-border)" }}>
                    <td style={{ padding: "12px" }}>Runtime Cost</td>
                    <td style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: "var(--st-color-success, green)" }}>0 KB</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>0 KB</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>~15 KB</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--st-color-border)" }}>
                    <td style={{ padding: "12px" }}>Learning Curve</td>
                    <td style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: "var(--st-color-success, green)" }}>⭐⭐</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>⭐⭐</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "12px" }}>Type Safety</td>
                    <td style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: "var(--st-color-success, green)" }}>Full TS</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>Partial</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>Full TS</td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </Column>
        </Container>
      </Box>

      {/* Interactive Playground */}
      <Container size="lg" style={{ padding: "var(--st-space-8) var(--st-space-4)" }}>
        <Column gap={6} id="playground">
          <Column gap={2}>
            <Text as="h2" size={5} weight="bold">Try It Live</Text>
            <Text tone="muted">Interact with real components. Switch examples, view code, tweak props.</Text>
          </Column>
          <InteractivePlayground />
        </Column>
      </Container>

      {/* Principles Section */}
      <Box style={{ background: "var(--st-color-surface-secondary, rgba(0,0,0,0.02))", padding: "var(--st-space-8) var(--st-space-4)" }}>
        <Container size="lg">
          <Column gap={6}>
            <Column gap={2}>
              <Text as="h2" size={5} weight="bold">Core Principles</Text>
              <Text tone="muted">Thoughtful design decisions that guide every feature.</Text>
            </Column>

            <Grid cols={{ base: 1, md: 3 }} gap={6}>
              <Card pad={6} radius={3} shadow={0}>
                <Column gap={3}>
                  <Text weight="bold" size={3}>Tokens are the API</Text>
                  <Text size={1} tone="muted">
                    Design decisions live in tokens. Components consume token keys, not arbitrary raw values. This enforces consistency by default.
                  </Text>
                </Column>
              </Card>

              <Card pad={6} radius={3} shadow={0}>
                <Column gap={3}>
                  <Text weight="bold" size={3}>Contract Over Customization</Text>
                  <Text size={1} tone="muted">
                    A stable, constrained API enables consistency. Override by design via className, not by default. This reduces decision fatigue.
                  </Text>
                </Column>
              </Card>

              <Card pad={6} radius={3} shadow={0}>
                <Column gap={3}>
                  <Text weight="bold" size={3}>Zero Runtime Overhead</Text>
                  <Text size={1} tone="muted">
                    All CSS is static. No JavaScript style generation. No CSS-in-JS overhead. Minimum bundle size, maximum performance.
                  </Text>
                </Column>
              </Card>
            </Grid>
          </Column>
        </Container>
      </Box>

      {/* Getting Started Section */}
      <Box style={{ background: "var(--st-color-surface)", padding: "var(--st-space-8) var(--st-space-4)" }}>
        <Container size="lg">
          <Column gap={6}>
            <Column gap={2}>
              <Text as="h2" size={5} weight="bold">Getting Started</Text>
              <Text tone="muted">Installation and setup in 3 minutes</Text>
            </Column>

            <Grid cols={{ base: 1, md: 2 }} gap={6}>
              {/* Installation Card */}
              <Card pad={6} radius={3} shadow={1}>
                <Column gap={4}>
                  <Column gap={2}>
                    <Text weight="bold" size={3}>Installation</Text>
                    <Text size={1} tone="muted">
                      Get started in seconds with npm
                    </Text>
                  </Column>
                  <Box style={{
                    background: "var(--st-color-background)",
                    padding: "var(--st-space-4)",
                    borderRadius: "var(--st-radius-2)",
                    fontFamily: "var(--st-font-mono)",
                    fontSize: "var(--st-font-size-0)",
                    overflowX: "auto"
                  }}>
                    <code>npm install @staple-css/tokens</code>
                  </Box>
                </Column>
              </Card>

              {/* Quick Start Card */}
              <Card pad={6} radius={3} shadow={1}>
                <Column gap={4}>
                  <Column gap={2}>
                    <Text weight="bold" size={3}>Quick Start</Text>
                    <Text size={1} tone="muted">
                      Import and use in your application
                    </Text>
                  </Column>
                  <Box style={{
                    background: "var(--st-color-background)",
                    padding: "var(--st-space-4)",
                    borderRadius: "var(--st-radius-2)",
                    fontFamily: "var(--st-font-mono)",
                    fontSize: "var(--st-font-size-0)",
                    overflowX: "auto",
                    lineHeight: "1.6"
                  }}>
                    <code>{`import "@staple-css/tokens"\nimport { Box } from "@staple-css/primitives"`}</code>
                  </Box>
                </Column>
              </Card>
            </Grid>
          </Column>
        </Container>
      </Box>

      {/* Use Cases Section */}
      <Container size="lg" style={{ padding: "var(--st-space-8) var(--st-space-4)" }}>
        <Column gap={6}>
          <Column gap={2}>
            <Text as="h2" size={5} weight="bold">Perfect For</Text>
            <Text tone="muted">Use cases where staple-css excels</Text>
          </Column>

          <Grid cols={{ base: 1, md: 2, lg: 4 }} gap={4}>
            {[
              { icon: "⚡", title: "Performance", desc: "2.5 KB zero JS overhead" },
              { icon: "🎯", title: "Design Systems", desc: "Token-first consistency" },
              { icon: "🤖", title: "AI & Automation", desc: "Type-safe API constraints" },
              { icon: "📱", title: "Mobile Apps", desc: "Ultra-lightweight library" },
            ].map((item, idx) => (
              <Card key={idx} pad={4} radius={2} shadow={0}>
                <Column gap={3}>
                  <Box style={{ fontSize: "28px" }}>{item.icon}</Box>
                  <Column gap={1}>
                    <Text weight="bold" size={2}>{item.title}</Text>
                    <Text size={0} tone="muted">{item.desc}</Text>
                  </Column>
                </Column>
              </Card>
            ))}
          </Grid>
        </Column>
      </Container>

      {/* CTA Section */}
      <Box style={{ background: "linear-gradient(135deg, var(--st-color-primary) 0%, #1a5a8f 100%)", padding: "var(--st-space-8) var(--st-space-4)", color: "white" }}>
        <Container size="lg">
          <Column gap={6} align="center">
            <Column gap={2} align="center">
              <Text as="h2" size={5} weight="bold" style={{ color: "white" }}>Ready to Build?</Text>
              <Text style={{ color: "rgba(255,255,255,0.9)" }}>Choose your edition. Core or full.</Text>
            </Column>

            <Row gap={3} justify="center" style={{ flexWrap: "wrap" }}>
              <PrimaryButton href="/tokens" style={{ background: "white", color: "var(--st-color-primary)" }}>Get Started →</PrimaryButton>
              <SecondaryButton href="/tokens-studio" style={{ borderColor: "white", color: "white" }}>Open Studio</SecondaryButton>
            </Row>

            <Text size={1} style={{ color: "rgba(255,255,255,0.7)" }}>
              MIT Licensed • 350+ CSS Variables • Zero Runtime
            </Text>
          </Column>
        </Container>
      </Box>
    </Box>
  );
}
