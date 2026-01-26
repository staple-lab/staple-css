import { Container, Column, Card, Text, Grid, Row, Box, Flex } from "@staple-css/primitives";

export function ExamplesPage() {
  return (
    <Container size="lg" style={{ padding: "var(--st-space-8) var(--st-space-4)" }}>
      <Column gap={8}>
        {/* Header */}
        <Column gap={2}>
          <Text as="h1" size={6} weight="bold">Real-World Examples</Text>
          <Text tone="muted">Production-ready patterns and components built with staple-css</Text>
        </Column>

        {/* Email Card Example */}
        <Column gap={3}>
          <Text as="h2" size={5} weight="bold">Email Card</Text>
          <Card pad={0} radius={3} shadow={1} style={{ overflow: "hidden" }}>
            {/* Header */}
            <Box pad={4} style={{ background: "var(--st-color-primary)" }}>
              <Text weight="bold" style={{ color: "white" }}>Welcome to staple-css</Text>
            </Box>
            {/* Content */}
            <Box pad={5}>
              <Column gap={4}>
                <Column gap={2}>
                  <Text as="h3" size={4} weight="semibold">Get Started in Minutes</Text>
                  <Text tone="muted">
                    Install the package, import CSS, and start building. Choose your bundle size: 2.5 KB core or 8.23 KB full.
                  </Text>
                </Column>
                <Row gap={3}>
                  <button style={{
                    padding: "var(--st-space-3) var(--st-space-6)",
                    background: "var(--st-color-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "var(--st-radius-2)",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}>
                    View Docs
                  </button>
                  <button style={{
                    padding: "var(--st-space-3) var(--st-space-6)",
                    background: "transparent",
                    color: "var(--st-color-primary)",
                    border: "2px solid var(--st-color-primary)",
                    borderRadius: "var(--st-radius-2)",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}>
                    Try Playground
                  </button>
                </Row>
              </Column>
            </Box>
            {/* Footer */}
            <Box pad={3} style={{ background: "var(--st-color-surface-secondary)", borderTop: "1px solid var(--st-color-border)" }}>
              <Text size={1} tone="muted">© 2024 staple-css • MIT License</Text>
            </Box>
          </Card>
        </Column>

        {/* Feature Cards Grid */}
        <Column gap={3}>
          <Text as="h2" size={5} weight="bold">Feature Showcase</Text>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={5}>
            {[
              { icon: "🎯", title: "Token-First", desc: "Design decisions as code. Type-safe props prevent invalid values." },
              { icon: "⚡", title: "Ultra-Lightweight", desc: "2.5 KB default. 75% smaller than competitors. Zero runtime cost." },
              { icon: "🔒", title: "Type-Safe", desc: "Full TypeScript support. Compile-time validation. IDE autocomplete." },
              { icon: "🎨", title: "Beautiful by Default", desc: "Professional design system. Light/dark themes included." },
              { icon: "📦", title: "Tree-Shakeable", desc: "Import only what you need. Per-component splitting." },
              { icon: "🚀", title: "Performance", desc: "Minimal overhead. Static CSS. Instant theme switching." },
            ].map((feature) => (
              <Card key={feature.title} pad={5} radius={3} shadow={1}>
                <Column gap={3}>
                  <Box style={{ fontSize: "32px" }}>{feature.icon}</Box>
                  <Column gap={1}>
                    <Text weight="semibold" size={3}>{feature.title}</Text>
                    <Text tone="muted" size={2}>{feature.desc}</Text>
                  </Column>
                </Column>
              </Card>
            ))}
          </Grid>
        </Column>

        {/* Form Example */}
        <Column gap={3}>
          <Text as="h2" size={5} weight="bold">Login Form</Text>
          <Card pad={6} radius={3} shadow={1} style={{ maxWidth: "400px" }}>
            <Column gap={5}>
              <Column gap={1}>
                <Text as="h3" size={4} weight="bold">Sign In</Text>
                <Text tone="muted">Enter your credentials to continue</Text>
              </Column>

              <Column gap={4}>
                <Column gap={2}>
                  <Text as="label" weight="semibold" size={2}>Email</Text>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    style={{
                      width: "100%",
                      padding: "var(--st-space-3) var(--st-space-4)",
                      borderRadius: "var(--st-radius-2)",
                      border: "1px solid var(--st-color-border)",
                      fontSize: "var(--st-font-size-1)",
                      fontFamily: "inherit",
                    }}
                  />
                </Column>

                <Column gap={2}>
                  <Row justify="between" align="center">
                    <Text as="label" weight="semibold" size={2}>Password</Text>
                    <Text as="a" href="#" size={1} tone="primary" style={{ textDecoration: "none" }}>Forgot?</Text>
                  </Row>
                  <input
                    type="password"
                    placeholder="••••••••"
                    style={{
                      width: "100%",
                      padding: "var(--st-space-3) var(--st-space-4)",
                      borderRadius: "var(--st-radius-2)",
                      border: "1px solid var(--st-color-border)",
                      fontSize: "var(--st-font-size-1)",
                      fontFamily: "inherit",
                    }}
                  />
                </Column>

                <label style={{ display: "flex", alignItems: "center", gap: "var(--st-space-2)", cursor: "pointer" }}>
                  <input type="checkbox" />
                  <Text size={2}>Remember me</Text>
                </label>
              </Column>

              <button style={{
                width: "100%",
                padding: "var(--st-space-3) var(--st-space-6)",
                background: "var(--st-color-primary)",
                color: "white",
                border: "none",
                borderRadius: "var(--st-radius-2)",
                fontWeight: "600",
                fontSize: "var(--st-font-size-2)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}>
                Sign In
              </button>

              <Text size={1} tone="muted" align="center">
                Don't have an account? <Text as="a" href="#" tone="primary" style={{ textDecoration: "none", fontWeight: "600" }}>Sign up</Text>
              </Text>
            </Column>
          </Card>
        </Column>

        {/* Dashboard Example */}
        <Column gap={3}>
          <Text as="h2" size={5} weight="bold">Dashboard Widget</Text>
          <Grid cols={{ base: 1, md: 2 }} gap={4}>
            <Card pad={5} radius={3} shadow={1}>
              <Column gap={3}>
                <Row justify="between" align="center">
                  <Column gap={1}>
                    <Text tone="muted" size={1}>Total Users</Text>
                    <Text as="h3" size={5} weight="bold">12,345</Text>
                  </Column>
                  <Box style={{ fontSize: "32px" }}>👥</Box>
                </Row>
                <Text size={1} tone="success">↑ 12% from last month</Text>
              </Column>
            </Card>

            <Card pad={5} radius={3} shadow={1}>
              <Column gap={3}>
                <Row justify="between" align="center">
                  <Column gap={1}>
                    <Text tone="muted" size={1}>Revenue</Text>
                    <Text as="h3" size={5} weight="bold">$48,230</Text>
                  </Column>
                  <Box style={{ fontSize: "32px" }}>💰</Box>
                </Row>
                <Text size={1} tone="success">↑ 8% from last month</Text>
              </Column>
            </Card>

            <Card pad={5} radius={3} shadow={1}>
              <Column gap={3}>
                <Row justify="between" align="center">
                  <Column gap={1}>
                    <Text tone="muted" size={1}>Conversion Rate</Text>
                    <Text as="h3" size={5} weight="bold">3.24%</Text>
                  </Column>
                  <Box style={{ fontSize: "32px" }}>📈</Box>
                </Row>
                <Text size={1} tone="danger">↓ 0.5% from last month</Text>
              </Column>
            </Card>

            <Card pad={5} radius={3} shadow={1}>
              <Column gap={3}>
                <Row justify="between" align="center">
                  <Column gap={1}>
                    <Text tone="muted" size={1}>Active Sessions</Text>
                    <Text as="h3" size={5} weight="bold">1,892</Text>
                  </Column>
                  <Box style={{ fontSize: "32px" }}>🔵</Box>
                </Row>
                <Text size={1} tone="success">↑ 4% from average</Text>
              </Column>
            </Card>
          </Grid>
        </Column>

        {/* Best Practices */}
        <Column gap={4}>
          <Text as="h2" size={5} weight="bold">Best Practices</Text>
          <Grid cols={{ base: 1, md: 2 }} gap={5}>
            <Card pad={5} radius={3} shadow={0} style={{ background: "var(--st-color-surface-secondary)" }}>
              <Column gap={3}>
                <Text weight="semibold" size={3}>✅ Do</Text>
                <Column gap={2} style={{ fontSize: "14px" }}>
                  <Row gap={2}><Box>✓</Box><Text>Use token scales: pad={"{0-8}"}</Text></Row>
                  <Row gap={2}><Box>✓</Box><Text>Compose layouts with Box & Flex</Text></Row>
                  <Row gap={2}><Box>✓</Box><Text>Use semantic token keys</Text></Row>
                  <Row gap={2}><Box>✓</Box><Text>Leverage type safety</Text></Row>
                </Column>
              </Column>
            </Card>

            <Card pad={5} radius={3} shadow={0} style={{ background: "var(--st-color-surface-secondary)" }}>
              <Column gap={3}>
                <Text weight="semibold" size={3}>❌ Don't</Text>
                <Column gap={2} style={{ fontSize: "14px" }}>
                  <Row gap={2}><Box>✗</Box><Text>Use raw pixel values</Text></Row>
                  <Row gap={2}><Box>✗</Box><Text>Create custom paddings</Text></Row>
                  <Row gap={2}><Box>✗</Box><Text>Hardcode colors</Text></Row>
                  <Row gap={2}><Box>✗</Box><Text>Ignore TypeScript warnings</Text></Row>
                </Column>
              </Column>
            </Card>
          </Grid>
        </Column>

        {/* Code Comparison */}
        <Column gap={3}>
          <Text as="h2" size={5} weight="bold">Bundle Size Comparison</Text>
          <Box style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "var(--st-font-size-1)",
            }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--st-color-border)" }}>
                  <th style={{ padding: "var(--st-space-3)", textAlign: "left", fontWeight: "600" }}>Framework</th>
                  <th style={{ padding: "var(--st-space-3)", textAlign: "center", fontWeight: "600" }}>Bundle (gzip)</th>
                  <th style={{ padding: "var(--st-space-3)", textAlign: "center", fontWeight: "600" }}>Runtime</th>
                  <th style={{ padding: "var(--st-space-3)", textAlign: "center", fontWeight: "600" }}>Components</th>
                  <th style={{ padding: "var(--st-space-3)", textAlign: "center", fontWeight: "600" }}>Type Safety</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--st-color-border)" }}>
                  <td style={{ padding: "var(--st-space-3)", fontWeight: "600", color: "var(--st-color-success, green)" }}>staple-css</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center", fontWeight: "600", color: "var(--st-color-success, green)" }}>2.5 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>0 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>8</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>✅ Full</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--st-color-border)" }}>
                  <td style={{ padding: "12px" }}>Tailwind CSS</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>~10 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>0 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>1000+</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>⚠️ Partial</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--st-color-border)" }}>
                  <td style={{ padding: "12px" }}>Chakra UI</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>~45 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>~15 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>50+</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>✅ Full</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px" }}>Material-UI</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>~80 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>~45 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>100+</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>✅ Full</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Column>
      </Column>
    </Container>
  );
}
