import { Container, Column, Card, Text, Grid, Row, Box } from "@staple-css/primitives/full";
import {
  Target,
  Zap,
  Cpu,
  Palette,
  Lock,
  Package,
  Gauge,
  Target as AITarget,
  Smartphone,
  Sparkles,
} from "lucide-react";
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
    <Box as="main" style={{ minHeight: "100vh" }}>
      {/* Hero Section - Solarpunk gradient with organic warmth */}
      <Box as="section" style={{
        background: "linear-gradient(135deg, #2a7d52 0%, rgba(42, 125, 82, 0.95) 50%, #d4a574 100%)",
        color: "white",
        padding: "var(--st-space-8) var(--st-space-4)",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        boxSizing: "border-box",
      }}>
        <Box
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            opacity: "0.08",
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(212, 165, 116, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(42, 125, 82, 0.2) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />

        <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
          <Column gap={6} align="center">
            {/* Brand */}
            <Column gap={2} align="center">
              <Text as="h1" style={{
                fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
                fontWeight: 800,
                fontFamily: "var(--st-font-display)",
                lineHeight: 1.15,
                margin: 0,
                color: "white",
                letterSpacing: "-2px"
              }}>
                staple-css
              </Text>
              <Text size={3} align="center" style={{
                color: "rgba(255,255,255,0.95)",
                fontSize: "1.25rem",
                fontWeight: 500,
                lineHeight: 1.5
              }}>
                Token-First Design System for Performance-First Teams
              </Text>
            </Column>

            {/* Value Proposition */}
            <Box style={{ maxWidth: "700px" }}>
              <Text align="center" style={{
                color: "rgba(255,255,255,0.9)",
                lineHeight: "1.7",
                fontSize: "1.0625rem",
                fontWeight: 400
              }}>
                2.5 KB. Zero JS runtime. 350+ CSS variables. Build anything with primitives that scale from startup to enterprise. MIT licensed. Type-safe by default.
              </Text>
            </Box>

            {/* CTA Buttons */}
            <Row gap={3} style={{ marginTop: "var(--st-space-4)", flexWrap: "wrap" }}>
              <PrimaryButton href="#playground" style={{ background: "white", color: "#2a7d52", fontWeight: 700 }}>
                Try it Live →
              </PrimaryButton>
              <SecondaryButton href="/tokens" style={{ borderColor: "white", color: "white", fontWeight: 700 }}>
                Get Started
              </SecondaryButton>
            </Row>

            {/* Stats */}
            <Grid cols={{ base: 2, md: 4 }} gap={4} style={{ marginTop: "var(--st-space-6)", width: "100%" }}>
              <Box align="center">
                <Text weight="bold" style={{
                  color: "white",
                  fontSize: "2rem",
                  fontFamily: "var(--st-font-display)",
                  fontWeight: 800,
                  margin: 0,
                  lineHeight: 1
                }}>2.5 KB</Text>
                <Text size={1} style={{ color: "rgba(255,255,255,0.75)", marginTop: "var(--st-space-1)", fontWeight: 500 }}>Core</Text>
              </Box>
              <Box align="center">
                <Text weight="bold" style={{
                  color: "white",
                  fontSize: "2rem",
                  fontFamily: "var(--st-font-display)",
                  fontWeight: 800,
                  margin: 0,
                  lineHeight: 1
                }}>0 KB</Text>
                <Text size={1} style={{ color: "rgba(255,255,255,0.75)", marginTop: "var(--st-space-1)", fontWeight: 500 }}>Runtime</Text>
              </Box>
              <Box align="center">
                <Text weight="bold" style={{
                  color: "white",
                  fontSize: "2rem",
                  fontFamily: "var(--st-font-display)",
                  fontWeight: 800,
                  margin: 0,
                  lineHeight: 1
                }}>350+</Text>
                <Text size={1} style={{ color: "rgba(255,255,255,0.75)", marginTop: "var(--st-space-1)", fontWeight: 500 }}>Tokens</Text>
              </Box>
              <Box align="center">
                <Text weight="bold" style={{
                  color: "white",
                  fontSize: "2rem",
                  fontFamily: "var(--st-font-display)",
                  fontWeight: 800,
                  margin: 0,
                  lineHeight: 1
                }}>∞</Text>
                <Text size={1} style={{ color: "rgba(255,255,255,0.75)", marginTop: "var(--st-space-1)", fontWeight: 500 }}>Scalable</Text>
              </Box>
            </Grid>
          </Column>
        </Container>
      </Box>

      {/* Features Section - What You Get */}
      <Box as="section" style={{
        background: "var(--st-color-background)",
        padding: "var(--st-space-8) var(--st-space-4)",
        width: "100%",
        boxSizing: "border-box",
        borderTop: "1px solid var(--st-color-border)"
      }}>
        <Container size="lg">
          <Column gap={8}>
            <Column gap={2} style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <Text as="h2" style={{
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 700,
                fontFamily: "var(--st-font-display)",
                margin: 0,
                letterSpacing: "-1px",
                color: "var(--st-color-text)"
              }}>Everything needed for professional design systems</Text>
              <Text tone="muted" style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.6 }}>Complete toolkit. Start lightweight, scale to enterprise. No compromise.</Text>
            </Column>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "var(--st-space-6)",
              maxWidth: "1100px",
              margin: "0 auto",
              width: "100%",
              boxSizing: "border-box"
            }}>
              {[
                { icon: Target, title: "Token-First Design", color: "#2a7d52", items: ["350+ CSS variables", "Type-safe props", "Consistent by default"] },
                { icon: Zap, title: "Ultra-Lightweight", color: "#d4a574", items: ["2.5 KB core", "Zero runtime JS", "Static CSS only"] },
                { icon: Cpu, title: "AI-Friendly APIs", color: "#4a9d72", items: ["Constrained props", "Prevent hallucination", "Perfect for AI code gen"] },
                { icon: Palette, title: "Design System Ready", color: "#8b6f47", items: ["8 primitives", "Light/dark themes", "Multiple density"] },
                { icon: Lock, title: "Type-Safe", color: "#2a7d52", items: ["Full TypeScript", "Compile-time validation", "IDE autocomplete"] },
                { icon: Package, title: "Tree-Shakeable", color: "#d4a574", items: ["Import only what you use", "ESM exports", "Per-component splitting"] },
              ].map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <div key={idx} style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--st-space-4)",
                    padding: "var(--st-space-5)",
                    border: "1px solid var(--st-color-border)",
                    borderRadius: "var(--st-radius-2)",
                    background: "var(--st-color-surface)",
                    transition: "all 150ms cubic-bezier(0.2, 0, 0.38, 0.9)",
                    borderLeft: `4px solid ${feature.color}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  >
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--st-space-3)"
                    }}>
                      <Box
                        aria-hidden="true"
                        style={{
                          width: "44px",
                          height: "44px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: feature.color,
                          color: "white",
                          borderRadius: "var(--st-radius-2)",
                          flexShrink: 0,
                          fontSize: "20px"
                        }}>
                        <IconComponent size={22} strokeWidth={1.5} />
                      </Box>
                      <Text weight="bold" style={{
                        fontSize: "1.125rem",
                        fontWeight: 700,
                        margin: 0,
                        lineHeight: "1.3",
                        fontFamily: "var(--st-font-display)",
                        color: "var(--st-color-text)"
                      }}>{feature.title}</Text>
                    </div>

                    <ul style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--st-space-2)"
                    }}>
                      {feature.items.map((item, i) => (
                        <li key={i} style={{
                          fontSize: "0.9375rem",
                          color: "var(--st-color-text-muted)",
                          lineHeight: "1.5",
                          margin: 0,
                          display: "flex",
                          gap: "var(--st-space-2)",
                          alignItems: "flex-start",
                          padding: 0,
                          fontWeight: 400
                        }}>
                          <span style={{
                            color: feature.color,
                            fontWeight: 700,
                            fontSize: "0.9375rem",
                            display: "inline-block",
                            flexShrink: 0,
                            marginTop: "2px"
                          }}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Column>
        </Container>
      </Box>

      {/* Comparison Section */}
      <Box as="section" style={{
        background: "var(--st-color-background)",
        padding: "var(--st-space-8) var(--st-space-4)",
        width: "100%",
        boxSizing: "border-box",
        borderTop: "1px solid var(--st-color-border)"
      }}>
        <Container size="lg">
          <Column gap={6}>
            <Column gap={2}>
              <Text as="h2" style={{
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 700,
                fontFamily: "var(--st-font-display)",
                margin: 0,
                letterSpacing: "-1px"
              }}>How It Compares</Text>
              <Text tone="muted">staple-css is smaller, faster, and more intentional.</Text>
            </Column>

            <Box style={{ overflowX: "auto", maxWidth: "100%", width: "100%" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--st-color-border)" }}>
                    <th scope="col" style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Feature</th>
                    <th scope="col" style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>staple-css</th>
                    <th scope="col" style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>Tailwind</th>
                    <th scope="col" style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>Chakra UI</th>
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
                    <td style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: "var(--st-color-success, green)" }}>Easy</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>Easy</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>Moderate</td>
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
      <Box as="section" style={{ padding: "var(--st-space-8) var(--st-space-4)", width: "100%", boxSizing: "border-box" }}>
        <Container size="lg">
          <Column gap={6} id="playground">
            <Column gap={2}>
              <Text as="h2" size={5} weight="bold">Try It Live</Text>
              <Text tone="muted">Interact with real components. Switch examples, view code, tweak props.</Text>
            </Column>
            <InteractivePlayground />
          </Column>
        </Container>
      </Box>

      {/* Principles Section */}
      <Box as="section" style={{
        background: "var(--st-color-surface)",
        padding: "var(--st-space-8) var(--st-space-4)",
        width: "100%",
        boxSizing: "border-box",
        borderTop: "1px solid var(--st-color-border)"
      }}>
        <Container size="lg">
          <Column gap={6}>
            <Column gap={2}>
              <Text as="h2" style={{
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 700,
                fontFamily: "var(--st-font-display)",
                margin: 0,
                letterSpacing: "-1px"
              }}>Core Principles</Text>
              <Text tone="muted">Thoughtful design decisions that guide every feature.</Text>
            </Column>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "var(--st-space-5)",
              maxWidth: "1100px",
              margin: "0 auto",
              width: "100%",
              boxSizing: "border-box"
            }}>
              {[
                { title: "Tokens are the API", color: "#2a7d52", desc: "Design decisions live in tokens. Components consume token keys, not arbitrary raw values. This enforces consistency by default." },
                { title: "Contract Over Customization", color: "#d4a574", desc: "A stable, constrained API enables consistency. Override by design via className, not by default. This reduces decision fatigue." },
                { title: "Zero Runtime Overhead", color: "#4a9d72", desc: "All CSS is static. No JavaScript style generation. No CSS-in-JS overhead. Minimum bundle size, maximum performance." }
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: "var(--st-space-5)",
                  border: "1px solid var(--st-color-border)",
                  borderLeft: `4px solid ${item.color}`,
                  borderRadius: "var(--st-radius-2)",
                  transition: "all 150ms cubic-bezier(0.2, 0, 0.38, 0.9)",
                  background: "var(--st-color-background)"
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.background = "var(--st-color-surface)";
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--st-color-background)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                  <Text weight="bold" size={2} style={{ marginBottom: "var(--st-space-3)", fontFamily: "var(--st-font-display)" }}>{item.title}</Text>
                  <Text size={1} tone="muted" style={{ lineHeight: "1.6" }}>{item.desc}</Text>
                </div>
              ))}
            </div>
          </Column>
        </Container>
      </Box>

      {/* Getting Started Section */}
      <Box as="section" style={{
        background: "var(--st-color-background)",
        padding: "var(--st-space-8) var(--st-space-4)",
        width: "100%",
        boxSizing: "border-box",
        borderTop: "1px solid var(--st-color-border)"
      }}>
        <Container size="lg">
          <Column gap={6}>
            <Column gap={2}>
              <Text as="h2" style={{
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 700,
                fontFamily: "var(--st-font-display)",
                margin: 0,
                letterSpacing: "-1px"
              }}>Getting Started</Text>
              <Text tone="muted">Installation and setup in 3 minutes</Text>
            </Column>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "var(--st-space-4)",
              width: "100%",
              boxSizing: "border-box"
            }}>
              {/* Installation */}
              <div style={{
                padding: "var(--st-space-4)",
                border: "1px solid var(--st-color-border)",
                borderRadius: "0"
              }}>
                <Column gap={3}>
                  <Column gap={1}>
                    <Text weight="bold" size={2}>Installation</Text>
                    <Text size={0} tone="muted">
                      Get started in seconds with npm
                    </Text>
                  </Column>
                  <Box style={{
                    background: "var(--st-color-background)",
                    padding: "var(--st-space-3)",
                    borderRadius: "2px",
                    fontFamily: "var(--st-font-mono)",
                    fontSize: "var(--st-font-size-0)",
                    overflowX: "auto",
                    border: "1px solid var(--st-color-border)"
                  }}>
                    <code>npm install @staple-css/tokens</code>
                  </Box>
                </Column>
              </div>

              {/* Quick Start */}
              <div style={{
                padding: "var(--st-space-4)",
                border: "1px solid var(--st-color-border)",
                borderRadius: "0"
              }}>
                <Column gap={3}>
                  <Column gap={1}>
                    <Text weight="bold" size={2}>Quick Start</Text>
                    <Text size={0} tone="muted">
                      Import and use in your application
                    </Text>
                  </Column>
                  <Box style={{
                    background: "var(--st-color-background)",
                    padding: "var(--st-space-3)",
                    borderRadius: "2px",
                    fontFamily: "var(--st-font-mono)",
                    fontSize: "var(--st-font-size-0)",
                    overflowX: "auto",
                    lineHeight: "1.6",
                    border: "1px solid var(--st-color-border)"
                  }}>
                    <code>{`import "@staple-css/tokens"\nimport { Box } from "@staple-css/primitives"`}</code>
                  </Box>
                </Column>
              </div>
            </div>
          </Column>
        </Container>
      </Box>

      {/* Use Cases Section */}
      <Box as="section" style={{
        padding: "var(--st-space-8) var(--st-space-4)",
        width: "100%",
        boxSizing: "border-box",
        background: "var(--st-color-surface)",
        borderTop: "1px solid var(--st-color-border)"
      }}>
        <Container size="lg">
          <Column gap={6}>
          <Column gap={2}>
            <Text as="h2" style={{
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              fontWeight: 700,
              fontFamily: "var(--st-font-display)",
              margin: 0,
              letterSpacing: "-1px"
            }}>Perfect For</Text>
            <Text tone="muted">Use cases where staple-css excels</Text>
          </Column>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "var(--st-space-5)",
            maxWidth: "1100px",
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box"
          }}>
            {[
              { icon: Gauge, title: "Performance", color: "#2a7d52", desc: "2.5 KB zero JS overhead" },
              { icon: Target, title: "Design Systems", color: "#d4a574", desc: "Token-first consistency" },
              { icon: Cpu, title: "AI & Automation", color: "#4a9d72", desc: "Type-safe API constraints" },
              { icon: Smartphone, title: "Mobile Apps", color: "#8b6f47", desc: "Ultra-lightweight library" },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} style={{
                  display: "flex",
                  gap: "var(--st-space-3)",
                  padding: "var(--st-space-5)",
                  border: "1px solid var(--st-color-border)",
                  borderLeft: `4px solid ${item.color}`,
                  borderRadius: "var(--st-radius-2)",
                  transition: "all 150ms cubic-bezier(0.2, 0, 0.38, 0.9)",
                  cursor: "pointer",
                  background: "var(--st-color-background)"
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.background = "var(--st-color-surface)";
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--st-color-background)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                  <Box
                    aria-hidden="true"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "var(--st-radius-2)",
                      background: item.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      flexShrink: 0,
                      marginTop: "2px"
                    }}>
                    <IconComponent size={22} strokeWidth={1.5} />
                  </Box>
                  <Column gap={2}>
                    <Text weight="bold" size={1} style={{ fontSize: "1rem", fontFamily: "var(--st-font-display)", fontWeight: 700 }}>{item.title}</Text>
                    <Text size={0} tone="muted" style={{ fontSize: "0.9375rem" }}>{item.desc}</Text>
                  </Column>
                </div>
              );
            })}
          </div>
        </Column>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box as="section" style={{
        background: "linear-gradient(135deg, #2a7d52 0%, #d4a574 100%)",
        padding: "var(--st-space-8) var(--st-space-4)",
        color: "white",
        width: "100%",
        boxSizing: "border-box",
        borderTop: "1px solid rgba(255,255,255,0.1)"
      }}>
        <Container size="lg">
          <Column gap={6} align="center">
            <Column gap={2} align="center">
              <Text as="h2" style={{
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 800,
                fontFamily: "var(--st-font-display)",
                color: "white",
                margin: 0,
                letterSpacing: "-1px"
              }}>Ready to Build?</Text>
              <Text style={{
                color: "rgba(255,255,255,0.92)",
                fontSize: "1.0625rem",
                fontWeight: 400
              }}>Choose your edition. Core or full. MIT licensed.</Text>
            </Column>

            <Row gap={3} justify="center" style={{ flexWrap: "wrap" }}>
              <PrimaryButton href="/tokens" style={{ background: "white", color: "#2a7d52", fontWeight: 700 }}>Get Started →</PrimaryButton>
              <SecondaryButton href="/tokens-studio" style={{ borderColor: "white", color: "white", fontWeight: 700 }}>Open Studio</SecondaryButton>
            </Row>

            <Text size={1} style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "0.9375rem",
              fontWeight: 400
            }}>
              350+ Tokens • Zero Runtime • Enterprise Ready
            </Text>
          </Column>
        </Container>
      </Box>
    </Box>
  );
}
