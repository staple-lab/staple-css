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
        padding: "48px 0"
      }}>
        <Container size="lg">
          <Column gap={3} style={{ alignItems: "center", textAlign: "center" }}>
            <Text as="h1" style={{
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              margin: 0,
              color: "var(--st-color-text)",
              letterSpacing: "-0.03em"
            }}>
              Why staple-css?
            </Text>
            <Text style={{
              fontSize: "15px",
              lineHeight: 1.6,
              maxWidth: "520px",
              color: "var(--st-color-text-muted)"
            }}>
              A styling contract that prioritizes consistency, performance, and maintainability. Tokens are the API. Contract over customization. Consistency by default.
            </Text>
          </Column>
        </Container>
      </Box>

      <Container size="lg" style={{ padding: "48px 0" }}>
        <Column gap={8}>

          {/* Core Philosophy */}
          <Box as="section">
            <Column gap={4}>
              <Text as="h2" style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: 0
              }}>
                Core Philosophy
              </Text>
              <div style={{
                padding: "24px",
                background: "var(--st-color-background)",
                borderRadius: "12px"
              }}>
                <Text style={{ marginBottom: "12px", fontSize: "14px", lineHeight: 1.7, color: "var(--st-color-text-muted)" }}>
                  staple-css is built on a simple idea: <strong style={{ color: "var(--st-color-text)", fontWeight: 700 }}>tokens are the API</strong>.
                  Instead of allowing arbitrary values throughout your codebase, staple-css
                  provides a contract—a set of design decisions encoded as CSS variables.
                </Text>
                <Text style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--st-color-text-muted)" }}>
                  This contract ensures consistency. When every component uses the same
                  spacing scale, the same color tokens, the same typography settings,
                  your UI naturally becomes more cohesive.
                </Text>
              </div>
            </Column>
          </Box>

          {/* Principles */}
          <Box as="section">
            <Column gap={4}>
              <Text as="h2" style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: 0
              }}>
                Principles
              </Text>

              <div className="why-gap-grid" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                background: "rgba(0,0,0,0.06)",
                borderRadius: "12px",
                overflow: "hidden",
                gap: "1px"
              }}>
                {[
                  {
                    title: "Tokens are the API",
                    desc: "Design decisions live in tokens, not scattered across components. Components accept token keys, not arbitrary values.",
                    icon: Package,
                  },
                  {
                    title: "Contract over customization",
                    desc: "A stable, predictable API enables teams to build consistent interfaces. Override mechanisms are deliberate, not default.",
                    icon: Handshake,
                  },
                  {
                    title: "Consistency by default",
                    desc: "The happy path keeps you in the token system. Escape hatches are explicit and visible in code review.",
                    icon: Sparkles,
                  },
                ].map((principle) => {
                  const IconComponent = principle.icon;
                  return (
                    <div key={principle.title} style={{
                      padding: "24px",
                      background: "var(--st-color-background)"
                    }}>
                      <Box
                        aria-hidden="true"
                        style={{
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(0,0,0,0.04)",
                          color: "var(--st-color-text-muted)",
                          borderRadius: "8px",
                          marginBottom: "12px"
                        }}>
                        <IconComponent size={16} strokeWidth={1.5} />
                      </Box>
                      <Text style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        marginBottom: "6px",
                        color: "var(--st-color-text)"
                      }}>
                        {principle.title}
                      </Text>
                      <Text style={{
                        fontSize: "13px",
                        lineHeight: 1.6,
                        color: "var(--st-color-text-muted)"
                      }}>
                        {principle.desc}
                      </Text>
                    </div>
                  );
                })}
              </div>
            </Column>
          </Box>

          {/* Performance */}
          <Box as="section">
            <Column gap={4}>
              <Text as="h2" style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: 0
              }}>
                Performance-First Design
              </Text>

              <div className="why-gap-grid" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                background: "rgba(0,0,0,0.06)",
                borderRadius: "12px",
                overflow: "hidden",
                gap: "1px"
              }}>
                {[
                  {
                    title: "Static CSS",
                    desc: "All styling is static CSS—no runtime generation, no CSS-in-JS overhead. Token values are CSS variables handled natively.",
                    metric: "0ms",
                    metricLabel: "runtime overhead",
                  },
                  {
                    title: "Zero dependencies",
                    desc: "Components need only React and @staple-css/tokens. No heavy libraries, no build-time magic.",
                    metric: "<1kb",
                    metricLabel: "runtime size",
                  },
                  {
                    title: "Tree-shakeable",
                    desc: "Each component is independently importable. Unused code is automatically removed during bundling.",
                    metric: "100%",
                    metricLabel: "tree-shakeable",
                  },
                  {
                    title: "Intrinsic responsive",
                    desc: "CSS Grid intrinsic sizing eliminates media query bloat. Layouts adapt to content naturally.",
                    metric: "~40%",
                    metricLabel: "fewer media queries",
                  },
                ].map((perf) => (
                  <div key={perf.title} style={{
                    padding: "24px",
                    background: "var(--st-color-background)"
                  }}>
                    <div style={{ marginBottom: "12px" }}>
                      <Text style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "var(--st-color-text)",
                        margin: 0
                      }}>
                        {perf.metric}
                      </Text>
                      <Text style={{
                        fontSize: "13px",
                        color: "var(--st-color-text-muted)",
                        marginTop: "2px"
                      }}>
                        {perf.metricLabel}
                      </Text>
                    </div>
                    <div>
                      <Text style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        marginBottom: "6px",
                        color: "var(--st-color-text)"
                      }}>
                        {perf.title}
                      </Text>
                      <Text style={{
                        fontSize: "13px",
                        lineHeight: 1.6,
                        color: "var(--st-color-text-muted)"
                      }}>
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
              <Text as="h2" style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: 0
              }}>
                Long-Term Maintainability
              </Text>

              <div className="why-gap-grid" style={{
                background: "rgba(0,0,0,0.06)",
                borderRadius: "12px",
                overflow: "hidden",
                gap: "1px",
                display: "grid",
                gridTemplateColumns: "1fr"
              }}>
                {[
                  { label: "Token versioning", detail: "Update design decisions in one place, propagate everywhere" },
                  { label: "Centralized design system", detail: "Colors, spacing, typography live in @staple-css/tokens" },
                  { label: "No style props hell", detail: "Props accept token keys, not arbitrary sx={{...}} objects" },
                  { label: "Design → Code traceability", detail: "Each component maps to specific token decisions" },
                ].map((item) => (
                  <div key={item.label} style={{
                    padding: "24px",
                    background: "var(--st-color-background)",
                    display: "flex",
                    gap: "16px",
                    alignItems: "start",
                    flexWrap: "wrap"
                  }}>
                    <Text style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      minWidth: "160px",
                      color: "var(--st-color-text)"
                    }}>
                      {item.label}
                    </Text>
                    <Text style={{
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "var(--st-color-text-muted)"
                    }}>
                      {item.detail}
                    </Text>
                  </div>
                ))}
              </div>
            </Column>
          </Box>

          {/* Accessibility */}
          <Box as="section">
            <Column gap={4}>
              <Text as="h2" style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: 0
              }}>
                Accessibility Built-In
              </Text>

              <div className="why-gap-grid" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                background: "rgba(0,0,0,0.06)",
                borderRadius: "12px",
                overflow: "hidden",
                gap: "1px"
              }}>
                {[
                  {
                    title: "WCAG Compliance",
                    desc: "All primitives built with semantic HTML and ARIA attributes. Color contrasts verified."
                  },
                  {
                    title: "Keyboard Navigation",
                    desc: "All interactive elements fully keyboard accessible. Focus states clearly visible."
                  },
                  {
                    title: "Motion Respect",
                    desc: "Animations respect prefers-reduced-motion. No vestibular triggers."
                  },
                  {
                    title: "Dark Mode",
                    desc: "Built-in dark theme support. Respects system color-scheme preference."
                  }
                ].map((item) => (
                  <div key={item.title} style={{
                    display: "flex",
                    gap: "12px",
                    padding: "24px",
                    background: "var(--st-color-background)"
                  }}>
                    <Box aria-hidden="true" style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "rgba(0,0,0,0.04)",
                      color: "var(--st-color-text-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <Check size={16} strokeWidth={2} />
                    </Box>
                    <div>
                      <Text style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        marginBottom: "6px",
                        color: "var(--st-color-text)"
                      }}>
                        {item.title}
                      </Text>
                      <Text style={{
                        fontSize: "13px",
                        lineHeight: 1.6,
                        color: "var(--st-color-text-muted)"
                      }}>
                        {item.desc}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </Column>
          </Box>

          {/* CTA */}
          <Box as="section" style={{
            padding: "48px 0",
            textAlign: "center"
          }}>
            <Column gap={3} style={{ alignItems: "center" }}>
              <Text style={{
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--st-color-text-muted)",
                maxWidth: "480px"
              }}>
                Ready to build with staple-css? Explore the component library and dive into the token system.
              </Text>
              <Row gap={3} style={{ marginTop: "8px" }}>
                <a href="/primitives" style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "8px 20px",
                  fontSize: "14px",
                  fontWeight: 600,
                  background: "var(--st-color-text)",
                  color: "var(--st-color-background)",
                  borderRadius: "999px",
                  textDecoration: "none",
                  border: "none"
                }}>
                  Component Library
                </a>
                <a href="/tokens" style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "8px 20px",
                  fontSize: "14px",
                  fontWeight: 600,
                  background: "transparent",
                  color: "var(--st-color-text)",
                  borderRadius: "999px",
                  textDecoration: "none",
                  border: "1px solid rgba(0,0,0,0.12)"
                }}>
                  Token System
                </a>
              </Row>
            </Column>
          </Box>

        </Column>
      </Container>
    </Box>
  );
}
