import { Container, Column, Text, Grid, Row, Box, Flex } from "@staple-css/primitives/full";
import { Target, Zap, Lock, Palette, Package, Rocket, Users, DollarSign, TrendingUp, Circle, CheckCircle2, XCircle } from "lucide-react";
import "./ExamplesPage.css";

export function ExamplesPage() {
  return (
    <Box as="main">
      {/* Hero Section */}
      <Box style={{
        padding: "var(--st-space-8) var(--st-space-4)"
      }}>
        <Container size="lg">
          <Column gap={4} style={{ maxWidth: "750px" }}>
            <Text as="h1" style={{
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 700,
              fontFamily: "var(--st-font-display)",
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "-0.03em"
            }}>
              Real-World Examples
            </Text>
            <Text tone="muted" style={{
              fontSize: "15px",
              lineHeight: 1.6,
              maxWidth: "65ch",
              fontWeight: 400
            }}>
              Production-ready patterns and components built with Staple CSS. Copy, customize, and deploy to your projects.
            </Text>
          </Column>
        </Container>
      </Box>

      <Container size="lg" style={{ padding: "48px 0" }}>
        <Column gap={8}>

        {/* Quick Start Section */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
          <Text as="h2" size={5} weight="bold">Quick Start</Text>
          <Column gap={3}>
            <Text as="h3" size={4} weight="semibold">Get Started in Minutes</Text>
            <Text tone="muted">
              Install the package, import CSS, and start building. Choose your bundle size: 2.5 KB core or 8.23 KB full.
            </Text>
            <Row gap={3}>
              <button className="btn btn-primary">
                View Docs
              </button>
              <button className="btn btn-secondary">
                Try Playground
              </button>
            </Row>
          </Column>
          </Column>
        </Box>

        {/* Key Features */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
          <Text as="h2" size={5} weight="bold">Key Features</Text>
          <Grid cols={{ base: 1, md: 2 }} gap={4}>
            {[
              { icon: Target, title: "Token-First", desc: "Design decisions as code. Type-safe props prevent invalid values." },
              { icon: Zap, title: "Ultra-Lightweight", desc: "2.5 KB default. 75% smaller than competitors." },
              { icon: Lock, title: "Type-Safe", desc: "Full TypeScript support. Compile-time validation." },
              { icon: Palette, title: "Beautiful by Default", desc: "Professional design system included." },
              { icon: Package, title: "Tree-Shakeable", desc: "Import only what you need. Per-component splitting." },
              { icon: Rocket, title: "Performance", desc: "Minimal overhead. Static CSS. Instant switching." },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <Row key={feature.title} gap={3} align="start" style={{ padding: "var(--st-space-4)", borderRadius: "12px", background: "var(--st-color-background)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={20} strokeWidth={2} style={{ color: "var(--st-color-text-muted)" }} />
                  </div>
                  <Column gap={1}>
                    <Text weight="semibold" size={2}>{feature.title}</Text>
                    <Text tone="muted" size={1}>{feature.desc}</Text>
                  </Column>
                </Row>
              );
            })}
          </Grid>
          </Column>
        </Box>

        {/* Form Example */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
          <Text as="h2" size={5} weight="bold">Form Example: Sign In</Text>
          <Box style={{ maxWidth: "400px", padding: "var(--st-space-6)", border: "1px solid var(--st-color-border)", borderRadius: "var(--st-radius-2)" }}>
            <Column gap={5}>
              <Column gap={1}>
                <Text size={3} weight="semibold">Enter your details</Text>
                <Text tone="muted" size={1}>Continue to your dashboard</Text>
              </Column>

              <Column gap={4}>
                <Column gap={2}>
                  <Text as="label" weight="semibold" size={1}>Email</Text>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    style={{
                      width: "100%",
                      padding: "var(--st-space-2) var(--st-space-3)",
                      borderRadius: "var(--st-radius-1)",
                      border: "1px solid var(--st-color-border)",
                      fontSize: "var(--st-font-size-2)",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                    }}
                  />
                </Column>

                <Column gap={2}>
                  <Row justify="between" align="center">
                    <Text as="label" weight="semibold" size={1}>Password</Text>
                    <Text as="a" href="#" size={0} tone="primary" style={{ textDecoration: "none" }}>Reset</Text>
                  </Row>
                  <input
                    type="password"
                    placeholder="••••••••"
                    style={{
                      width: "100%",
                      padding: "var(--st-space-2) var(--st-space-3)",
                      borderRadius: "var(--st-radius-1)",
                      border: "1px solid var(--st-color-border)",
                      fontSize: "var(--st-font-size-2)",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                    }}
                  />
                </Column>

                <label style={{ display: "flex", alignItems: "center", gap: "var(--st-space-2)", cursor: "pointer" }}>
                  <input type="checkbox" />
                  <Text size={1}>Keep me signed in</Text>
                </label>
              </Column>

              <button className="btn btn-primary" style={{ width: "100%" }}>
                Sign In
              </button>

              <Text size={0} tone="muted" align="center">
                New user? <Text as="a" href="#" tone="primary" style={{ textDecoration: "none", fontWeight: "600" }}>Create account</Text>
              </Text>
            </Column>
          </Box>
          </Column>
        </Box>

        {/* Dashboard Example */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
          <Text as="h2" size={5} weight="bold">Dashboard Metrics</Text>
          <Grid cols={{ base: 1, md: 2 }} gap={4}>
            {[
              { label: "Total Users", value: "12,345", icon: Users, trend: "↑ 12% from last month" },
              { label: "Revenue", value: "$48,230", icon: DollarSign, trend: "↑ 8% from last month" },
              { label: "Conversion", value: "3.24%", icon: TrendingUp, trend: "↓ 0.5% from last month" },
              { label: "Sessions", value: "1,892", icon: Circle, trend: "↑ 4% from average" },
            ].map((metric) => {
              const Icon = metric.icon;
              return (
                <Box key={metric.label} style={{ padding: "var(--st-space-4)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "12px", background: "var(--st-color-background)" }}>
                  <Column gap={3}>
                    <Row justify="between" align="start">
                      <Column gap={2}>
                        <Text tone="muted" size={1}>{metric.label}</Text>
                        <Text size={5} weight="bold">{metric.value}</Text>
                      </Column>
                      <Icon size={20} strokeWidth={2} style={{ color: "var(--st-color-text-muted)", opacity: 0.6 }} />
                    </Row>
                    <Text size={0} tone={metric.trend.includes("↑") ? "success" : "danger"}>{metric.trend}</Text>
                  </Column>
                </Box>
              );
            })}
          </Grid>
          </Column>
        </Box>

        {/* Best Practices */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={4}>
          <Text as="h2" size={5} weight="bold">Best Practices</Text>
          <Row gap={4}>
            <Column gap={3} style={{ flex: 1, paddingLeft: "var(--st-space-4)", borderLeft: "2px solid rgba(0,0,0,0.1)" }}>
              <Row gap={2} align="center">
                <CheckCircle2 size={20} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-text-muted)", flexShrink: 0 }} />
                <Text weight="semibold" size={3}>Do</Text>
              </Row>
              <Column gap={2}>
                <Row gap={2}><CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-text-muted)", flexShrink: 0 }} /><Text size={1}>Use token scales: pad={"{0-8}"}</Text></Row>
                <Row gap={2}><CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-text-muted)", flexShrink: 0 }} /><Text size={1}>Compose with Box & Flex</Text></Row>
                <Row gap={2}><CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-text-muted)", flexShrink: 0 }} /><Text size={1}>Use semantic token keys</Text></Row>
                <Row gap={2}><CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-text-muted)", flexShrink: 0 }} /><Text size={1}>Leverage type safety</Text></Row>
              </Column>
            </Column>

            <Column gap={3} style={{ flex: 1, paddingLeft: "var(--st-space-4)", borderLeft: "2px solid rgba(0,0,0,0.1)" }}>
              <Row gap={2} align="center">
                <XCircle size={20} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-text-muted)", flexShrink: 0 }} />
                <Text weight="semibold" size={3}>Don't</Text>
              </Row>
              <Column gap={2}>
                <Row gap={2}><XCircle size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-text-muted)", flexShrink: 0 }} /><Text size={1}>Use raw pixel values</Text></Row>
                <Row gap={2}><XCircle size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-text-muted)", flexShrink: 0 }} /><Text size={1}>Create custom paddings</Text></Row>
                <Row gap={2}><XCircle size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-text-muted)", flexShrink: 0 }} /><Text size={1}>Hardcode colors</Text></Row>
                <Row gap={2}><XCircle size={16} strokeWidth={2} aria-hidden="true" style={{ color: "var(--st-color-text-muted)", flexShrink: 0 }} /><Text size={1}>Ignore TypeScript warnings</Text></Row>
              </Column>
            </Column>
          </Row>
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
                  <td style={{ padding: "var(--st-space-3)", fontWeight: "600" }}>staple-css</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center", fontWeight: "600" }}>2.5 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>0 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>8</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>Full</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--st-color-border)" }}>
                  <td style={{ padding: "12px" }}>Tailwind CSS</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>~10 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>0 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>1000+</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>Partial</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--st-color-border)" }}>
                  <td style={{ padding: "12px" }}>Chakra UI</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>~45 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>~15 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>50+</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>Full</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px" }}>Material-UI</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>~80 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>~45 KB</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>100+</td>
                  <td style={{ padding: "var(--st-space-3)", textAlign: "center" }}>Full</td>
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
