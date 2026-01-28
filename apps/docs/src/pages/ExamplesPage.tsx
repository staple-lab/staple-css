import { Container, Column, Text, Grid, Row, Box, Flex } from "@staple-css/primitives/full";
import { Target, Zap, Lock, Palette, Package, Rocket, Users, DollarSign, TrendingUp, Circle, CheckCircle2, XCircle } from "lucide-react";
import "./ExamplesPage.css";

export function ExamplesPage() {
  return (
    <Box as="main" style={{ padding: "var(--st-space-8) var(--st-space-4)" }}>
      <Container size="lg">
        <Column gap={8}>
        {/* Header */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={2}>
          <Text as="h1" size={6} weight="bold">Real-World Examples</Text>
          <Text tone="muted">Production-ready patterns and components built with staple-css</Text>
          </Column>
        </Box>

        {/* Email Card Example */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
          <Text as="h2" size={5} weight="bold">Email Card</Text>
          <div className="st-accent-card">
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
          </div>
          </Column>
        </Box>

        {/* Feature Cards Grid */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
          <Text as="h2" size={5} weight="bold">Feature Showcase</Text>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {[
              { icon: Target, title: "Token-First", desc: "Design decisions as code. Type-safe props prevent invalid values.", color: "rgb(59, 130, 246)" },
              { icon: Zap, title: "Ultra-Lightweight", desc: "2.5 KB default. 75% smaller than competitors. Zero runtime cost.", color: "rgb(234, 179, 8)" },
              { icon: Lock, title: "Type-Safe", desc: "Full TypeScript support. Compile-time validation. IDE autocomplete.", color: "rgb(168, 85, 247)" },
              { icon: Palette, title: "Beautiful by Default", desc: "Professional design system. Light/dark themes included.", color: "rgb(236, 72, 153)" },
              { icon: Package, title: "Tree-Shakeable", desc: "Import only what you need. Per-component splitting.", color: "rgb(34, 197, 94)" },
              { icon: Rocket, title: "Performance", desc: "Minimal overhead. Static CSS. Instant theme switching.", color: "rgb(239, 68, 68)" },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="st-accent-card st-feature-card">
                  <div className="st-icon-badge" aria-hidden="true" style={{ "--icon-color": feature.color } as any}>
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <Column gap={2}>
                    <Text weight="semibold" size={3}>{feature.title}</Text>
                    <Text tone="muted" size={2}>{feature.desc}</Text>
                  </Column>
                </div>
              );
            })}
          </Grid>
          </Column>
        </Box>

        {/* Form Example */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
          <Text as="h2" size={5} weight="bold">Login Form</Text>
          <div className="st-accent-card" style={{ maxWidth: "400px" }}>
            <Box pad={6}>
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
            </Box>
          </div>
          </Column>
        </Box>

        {/* Dashboard Example */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
          <Text as="h2" size={5} weight="bold">Dashboard Widget</Text>
          <Grid cols={{ base: 1, md: 2 }} gap={4}>
            <div className="st-accent-card st-dashboard-card">
              <Column gap={3}>
                <Row justify="between" align="center">
                  <Column gap={1}>
                    <Text tone="muted" size={1}>Total Users</Text>
                    <Text as="h3" size={5} weight="bold">12,345</Text>
                  </Column>
                  <div className="st-icon-badge" aria-hidden="true" style={{ "--icon-color": "rgb(59, 130, 246)" } as any}>
                    <Users size={20} strokeWidth={2} />
                  </div>
                </Row>
                <Text size={1} tone="success">↑ 12% from last month</Text>
              </Column>
            </div>

            <div className="st-accent-card st-dashboard-card">
              <Column gap={3}>
                <Row justify="between" align="center">
                  <Column gap={1}>
                    <Text tone="muted" size={1}>Revenue</Text>
                    <Text as="h3" size={5} weight="bold">$48,230</Text>
                  </Column>
                  <div className="st-icon-badge" aria-hidden="true" style={{ "--icon-color": "rgb(34, 197, 94)" } as any}>
                    <DollarSign size={20} strokeWidth={2} />
                  </div>
                </Row>
                <Text size={1} tone="success">↑ 8% from last month</Text>
              </Column>
            </div>

            <div className="st-accent-card st-dashboard-card">
              <Column gap={3}>
                <Row justify="between" align="center">
                  <Column gap={1}>
                    <Text tone="muted" size={1}>Conversion Rate</Text>
                    <Text as="h3" size={5} weight="bold">3.24%</Text>
                  </Column>
                  <div className="st-icon-badge" aria-hidden="true" style={{ "--icon-color": "rgb(234, 179, 8)" } as any}>
                    <TrendingUp size={20} strokeWidth={2} />
                  </div>
                </Row>
                <Text size={1} tone="danger">↓ 0.5% from last month</Text>
              </Column>
            </div>

            <div className="st-accent-card st-dashboard-card">
              <Column gap={3}>
                <Row justify="between" align="center">
                  <Column gap={1}>
                    <Text tone="muted" size={1}>Active Sessions</Text>
                    <Text as="h3" size={5} weight="bold">1,892</Text>
                  </Column>
                  <div className="st-icon-badge" aria-hidden="true" style={{ "--icon-color": "rgb(6, 182, 212)" } as any}>
                    <Circle size={20} strokeWidth={2} />
                  </div>
                </Row>
                <Text size={1} tone="success">↑ 4% from average</Text>
              </Column>
            </div>
          </Grid>
          </Column>
        </Box>

        {/* Best Practices */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={4}>
          <Text as="h2" size={5} weight="bold">Best Practices</Text>
          <Grid cols={{ base: 1, md: 2 }} gap={4}>
            <div className="st-accent-card st-practices-card" style={{ background: "var(--st-color-surface-secondary)" }}>
              <Column gap={3}>
                <Row gap={2} align="center">
                  <CheckCircle2 size={20} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-success)", flexShrink: 0 }} />
                  <Text weight="semibold" size={3}>Do</Text>
                </Row>
                <Column gap={2} style={{ fontSize: "14px" }}>
                  <Row gap={2}><CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-success)", flexShrink: 0 }} /><Text>Use token scales: pad={"{0-8}"}</Text></Row>
                  <Row gap={2}><CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-success)", flexShrink: 0 }} /><Text>Compose layouts with Box & Flex</Text></Row>
                  <Row gap={2}><CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-success)", flexShrink: 0 }} /><Text>Use semantic token keys</Text></Row>
                  <Row gap={2}><CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-success)", flexShrink: 0 }} /><Text>Leverage type safety</Text></Row>
                </Column>
              </Column>
            </div>

            <div className="st-accent-card st-practices-card" style={{ background: "var(--st-color-surface-secondary)" }}>
              <Column gap={3}>
                <Row gap={2} align="center">
                  <XCircle size={20} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-danger)", flexShrink: 0 }} />
                  <Text weight="semibold" size={3}>Don't</Text>
                </Row>
                <Column gap={2} style={{ fontSize: "14px" }}>
                  <Row gap={2}><XCircle size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-danger)", flexShrink: 0 }} /><Text>Use raw pixel values</Text></Row>
                  <Row gap={2}><XCircle size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-danger)", flexShrink: 0 }} /><Text>Create custom paddings</Text></Row>
                  <Row gap={2}><XCircle size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-danger)", flexShrink: 0 }} /><Text>Hardcode colors</Text></Row>
                  <Row gap={2}><XCircle size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-danger)", flexShrink: 0 }} /><Text>Ignore TypeScript warnings</Text></Row>
                </Column>
              </Column>
            </div>
          </Grid>
          </Column>
        </Box>

        {/* Code Comparison */}
        <Box as="section" style={{ display: "contents" }}>
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
                  <th scope="col" style={{ padding: "var(--st-space-3)", textAlign: "left", fontWeight: "600" }}>Framework</th>
                  <th scope="col" style={{ padding: "var(--st-space-3)", textAlign: "center", fontWeight: "600" }}>Bundle (gzip)</th>
                  <th scope="col" style={{ padding: "var(--st-space-3)", textAlign: "center", fontWeight: "600" }}>Runtime</th>
                  <th scope="col" style={{ padding: "var(--st-space-3)", textAlign: "center", fontWeight: "600" }}>Components</th>
                  <th scope="col" style={{ padding: "var(--st-space-3)", textAlign: "center", fontWeight: "600" }}>Type Safety</th>
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
        </Box>
      </Column>
    </Container>
    </Box>
  );
}
