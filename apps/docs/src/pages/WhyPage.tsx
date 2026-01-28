import { Container, Column, Text, Row, Box } from "@staple-css/primitives/full";
import {
  Package,
  Handshake,
  Sparkles,
  Check,
} from "lucide-react";
import "./WhyPage.css";

export function WhyPage() {
  return (
    <Box as="main" className="why-page">
      {/* Hero Section */}
      <Box style={{
        background: "linear-gradient(135deg, rgba(42, 125, 82, 0.05) 0%, rgba(212, 165, 116, 0.03) 100%)",
        borderBottom: "1px solid var(--st-color-border)",
        padding: "var(--st-space-8) var(--st-space-4)"
      }}>
        <Container size="lg">
          <Column gap={4} style={{ maxWidth: "750px" }}>
            <Text as="h1" style={{
              fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
              fontWeight: 800,
              fontFamily: "var(--st-font-display)",
              lineHeight: 1.15,
              margin: 0,
              color: "var(--st-color-text)",
              letterSpacing: "-2px"
            }}>
              Why staple-css?
            </Text>
            <Text tone="muted" style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              maxWidth: "65ch",
              fontWeight: 400
            }}>
              A styling contract that prioritizes consistency, performance, and maintainability. Tokens are the API. Contract over customization. Consistency by default.
            </Text>
          </Column>
        </Container>
      </Box>

      <Container size="lg" style={{ paddingTop: "var(--st-space-8)", paddingBottom: "var(--st-space-8)" }}>
        <Column gap={8}>

          {/* Core Philosophy */}
          <Box as="section">
          <Column gap={4}>
            <Row gap={3} align="center" style={{ marginBottom: "var(--st-space-2)" }}>
              <div style={{
                width: "4px",
                height: "32px",
                background: "#2a7d52",
                borderRadius: "2px"
              }} />
              <Text as="h2" style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 700,
                fontFamily: "var(--st-font-display)",
                margin: 0,
                letterSpacing: "-0.5px"
              }}>
                Core Philosophy
              </Text>
            </Row>
            <div className="philosophy-block" style={{
              padding: "var(--st-space-6)",
              border: "1px solid var(--st-color-border)",
              borderRadius: "var(--st-radius-2)",
              background: "var(--st-color-surface)"
            }}>
              <Text style={{ marginBottom: "var(--st-space-4)", fontSize: "1rem", lineHeight: 1.7 }}>
                staple-css is built on a simple idea: <strong style={{ color: "#2a7d52", fontWeight: 700 }}>tokens are the API</strong>.
                Instead of allowing arbitrary values throughout your codebase, staple-css
                provides a contract—a set of design decisions encoded as CSS variables.
              </Text>
              <Text style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--st-color-text-muted)" }}>
                This contract ensures consistency. When every component uses the same
                spacing scale, the same color tokens, the same typography settings,
                your UI naturally becomes more cohesive.
              </Text>
            </div>
          </Column>

          {/* Principles */}
          <Box as="section">
          <Column gap={4}>
            <Row gap={3} align="center" style={{ marginBottom: "var(--st-space-2)" }}>
              <div style={{
                width: "4px",
                height: "32px",
                background: "#d4a574",
                borderRadius: "2px"
              }} />
              <Text as="h2" style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 700,
                fontFamily: "var(--st-font-display)",
                margin: 0,
                letterSpacing: "-0.5px"
              }}>
                Principles
              </Text>
            </Row>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "var(--st-space-5)"
            }}>
              {[
                {
                  title: "Tokens are the API",
                  color: "#2a7d52",
                  desc: "Design decisions live in tokens, not scattered across components. Components accept token keys, not arbitrary values.",
                  icon: Package,
                },
                {
                  title: "Contract over customization",
                  color: "#d4a574",
                  desc: "A stable, predictable API enables teams to build consistent interfaces. Override mechanisms are deliberate, not default.",
                  icon: Handshake,
                },
                {
                  title: "Consistency by default",
                  color: "#4a9d72",
                  desc: "The happy path keeps you in the token system. Escape hatches are explicit and visible in code review.",
                  icon: Sparkles,
                },
              ].map((principle) => {
                const IconComponent = principle.icon;
                return (
                  <div key={principle.title} style={{
                    padding: "var(--st-space-5)",
                    border: "1px solid var(--st-color-border)",
                    borderLeft: `4px solid ${principle.color}`,
                    borderRadius: "var(--st-radius-2)",
                    background: "var(--st-color-surface)",
                    transition: "all 150ms cubic-bezier(0.2, 0, 0.38, 0.9)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                    <Box
                    aria-hidden="true"
                    style={{
                      width: "44px",
                      height: "44px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: principle.color,
                      color: "white",
                      borderRadius: "var(--st-radius-2)",
                      marginBottom: "var(--st-space-3)"
                    }}>
                    <IconComponent size={22} strokeWidth={1.5} />
                  </Box>
                    <Text weight="semibold" size={2} style={{ marginBottom: "var(--st-space-2)", fontFamily: "var(--st-font-display)" }}>
                      {principle.title}
                    </Text>
                    <Text tone="muted" size={0} style={{ lineHeight: "1.6" }}>
                      {principle.desc}
                    </Text>
                  </div>
                );
              })}
            </div>
          </Column>
          </Box>

          </Box>

          {/* Performance */}
          <Box as="section">
          <Column gap={4}>
            <Row gap={3} align="center" style={{ marginBottom: "var(--st-space-2)" }}>
              <div style={{
                width: "4px",
                height: "32px",
                background: "#8b6f47",
                borderRadius: "2px"
              }} />
              <Text as="h2" style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 700,
                fontFamily: "var(--st-font-display)",
                margin: 0,
                letterSpacing: "-0.5px"
              }}>
                Performance-First Design
              </Text>
            </Row>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "var(--st-space-5)"
            }}>
              {[
                {
                  title: "Static CSS",
                  color: "#2a7d52",
                  desc: "All styling is static CSS—no runtime generation, no CSS-in-JS overhead. Token values are CSS variables handled natively.",
                  metric: "0ms",
                  metricLabel: "runtime overhead",
                },
                {
                  title: "Zero dependencies",
                  color: "#d4a574",
                  desc: "Components need only React and @staple-css/tokens. No heavy libraries, no build-time magic.",
                  metric: "<1kb",
                  metricLabel: "runtime size",
                },
                {
                  title: "Tree-shakeable",
                  color: "#4a9d72",
                  desc: "Each component is independently importable. Unused code is automatically removed during bundling.",
                  metric: "100%",
                  metricLabel: "tree-shakeable",
                },
                {
                  title: "Intrinsic responsive",
                  color: "#8b6f47",
                  desc: "CSS Grid intrinsic sizing eliminates media query bloat. Layouts adapt to content naturally.",
                  metric: "~40%",
                  metricLabel: "fewer media queries",
                },
              ].map((perf) => (
                <div key={perf.title} style={{
                  padding: "var(--st-space-5)",
                  border: "1px solid var(--st-color-border)",
                  borderRadius: "var(--st-radius-2)",
                  background: "var(--st-color-background)",
                  transition: "all 150ms cubic-bezier(0.2, 0, 0.38, 0.9)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                  <div style={{ marginBottom: "var(--st-space-3)" }}>
                    <Text weight="bold" size={3} style={{ color: perf.color, margin: 0 }}>
                      {perf.metric}
                    </Text>
                    <Text size={0} tone="muted" style={{ marginTop: "var(--st-space-1)" }}>
                      {perf.metricLabel}
                    </Text>
                  </div>
                  <div>
                    <Text weight="semibold" size={1} style={{ marginBottom: "var(--st-space-2)", fontFamily: "var(--st-font-display)" }}>
                      {perf.title}
                    </Text>
                    <Text size={0} tone="muted" style={{ lineHeight: "1.6" }}>
                      {perf.desc}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </Column>

          </Box>

          {/* Maintainability */}
          <Box as="section">
          <Column gap={4}>
            <Row gap={3} align="center" style={{ marginBottom: "var(--st-space-2)" }}>
              <div style={{
                width: "4px",
                height: "32px",
                background: "#2a7d52",
                borderRadius: "2px"
              }} />
              <Text as="h2" style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 700,
                fontFamily: "var(--st-font-display)",
                margin: 0,
                letterSpacing: "-0.5px"
              }}>
                Long-Term Maintainability
              </Text>
            </Row>

            <div style={{
              border: "1px solid var(--st-color-border)",
              borderRadius: "var(--st-radius-2)",
              overflow: "hidden"
            }}>
              {[
                { label: "Token versioning", color: "#2a7d52", detail: "Update design decisions in one place, propagate everywhere" },
                { label: "Centralized design system", color: "#d4a574", detail: "Colors, spacing, typography live in @staple-css/tokens" },
                { label: "No style props hell", color: "#4a9d72", detail: "Props accept token keys, not arbitrary sx={{...}} objects" },
                { label: "Design → Code traceability", color: "#8b6f47", detail: "Each component maps to specific token decisions" },
              ].map((item, idx) => (
                <Row key={item.label} gap={4} align="start" style={{
                  padding: "var(--st-space-4)",
                  borderBottom: idx < 3 ? "1px solid var(--st-color-border)" : "none",
                  borderLeft: `4px solid ${item.color}`,
                  background: idx % 2 === 0 ? "var(--st-color-background)" : "var(--st-color-surface)"
                }}>
                  <Text weight="semibold" size={1} style={{ minWidth: "160px", fontFamily: "var(--st-font-display)", color: item.color }}>
                    {item.label}
                  </Text>
                  <Text size={0} tone="muted" style={{ lineHeight: "1.6" }}>
                    {item.detail}
                  </Text>
                </Row>
              ))}
            </div>
          </Column>

          </Box>

          {/* Accessibility */}
          <Box as="section">
          <Column gap={4}>
            <Row gap={3} align="center" style={{ marginBottom: "var(--st-space-2)" }}>
              <div style={{
                width: "4px",
                height: "32px",
                background: "#d4a574",
                borderRadius: "2px"
              }} />
              <Text as="h2" style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 700,
                fontFamily: "var(--st-font-display)",
                margin: 0,
                letterSpacing: "-0.5px"
              }}>
                Accessibility Built-In
              </Text>
            </Row>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "var(--st-space-5)"
            }}>
              {[
                {
                  title: "WCAG Compliance",
                  color: "#2a7d52",
                  desc: "All primitives built with semantic HTML and ARIA attributes. Color contrasts verified."
                },
                {
                  title: "Keyboard Navigation",
                  color: "#d4a574",
                  desc: "All interactive elements fully keyboard accessible. Focus states clearly visible."
                },
                {
                  title: "Motion Respect",
                  color: "#4a9d72",
                  desc: "Animations respect prefers-reduced-motion. No vestibular triggers."
                },
                {
                  title: "Dark Mode",
                  color: "#8b6f47",
                  desc: "Built-in dark theme support. Respects system color-scheme preference."
                }
              ].map((item) => (
                <div key={item.title} style={{
                  display: "flex",
                  gap: "var(--st-space-3)",
                  padding: "var(--st-space-5)",
                  border: "1px solid var(--st-color-border)",
                  borderRadius: "var(--st-radius-2)",
                  borderLeft: `4px solid ${item.color}`,
                  background: "var(--st-color-surface)",
                  transition: "all 150ms cubic-bezier(0.2, 0, 0.38, 0.9)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                  <Box aria-hidden="true" style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: item.color,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <Check size={16} strokeWidth={2.5} />
                  </Box>
                  <div>
                    <Text weight="semibold" size={1} style={{ marginBottom: "var(--st-space-2)", fontFamily: "var(--st-font-display)" }}>
                      {item.title}
                    </Text>
                    <Text size={0} tone="muted" style={{ lineHeight: "1.6" }}>{item.desc}</Text>
                  </div>
                </div>
              ))}
            </div>
          </Column>

          </Box>

          {/* CTA */}
          <Box as="section" style={{
            marginTop: "var(--st-space-4)",
            padding: "var(--st-space-6)",
            background: "linear-gradient(135deg, rgba(42, 125, 82, 0.05) 0%, rgba(212, 165, 116, 0.03) 100%)",
            border: "1px solid var(--st-color-border)",
            borderRadius: "var(--st-radius-2)"
          }}>
            <Text size={1} style={{
              marginBottom: "var(--st-space-2)",
              fontSize: "1rem",
              lineHeight: 1.7
            }}>
              Ready to build with staple-css? Explore the <a href="/primitives" style={{ color: "#2a7d52", textDecoration: "none", fontWeight: 600 }}>component library</a> and dive into the <a href="/tokens" style={{ color: "#2a7d52", textDecoration: "none", fontWeight: 600 }}>token system</a>.
            </Text>
          </Box>
        </Column>
        </Container>
    </Box>
  );
}
