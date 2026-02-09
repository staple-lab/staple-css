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
      borderRadius: "14px",
      background: "#3b82f6",
      color: "#fff",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "16px",
      transition: "all 0.2s cubic-bezier(0.19, 1, 0.22, 1)",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
      display: "inline-block",
      border: "none",
      cursor: "pointer",
      ...props.style,
    }}
    onMouseEnter={(e: any) => {
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.2)";
      e.currentTarget.style.transform = "translateY(-1px)";
    }}
    onMouseLeave={(e: any) => {
      e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.04)";
      e.currentTarget.style.transform = "translateY(0)";
    }}
  />
);

const SecondaryButton = (props: any) => (
  <a
    {...props}
    style={{
      padding: "14px 32px",
      borderRadius: "14px",
      border: "1px solid rgba(0, 0, 0, 0.06)",
      color: "var(--st-color-text)",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "16px",
      transition: "all 0.2s cubic-bezier(0.19, 1, 0.22, 1)",
      display: "inline-block",
      cursor: "pointer",
      background: "var(--st-color-surface)",
      ...props.style,
    }}
    onMouseEnter={(e: any) => {
      e.currentTarget.style.borderColor = "#3b82f6";
      e.currentTarget.style.color = "#3b82f6";
    }}
    onMouseLeave={(e: any) => {
      e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.06)";
      e.currentTarget.style.color = "var(--st-color-text)";
    }}
  />
);

export function HomePage() {
  return (
    <Box as="main" style={{ minHeight: "100vh" }}>
      {/* Hero Section - Clean dark gradient */}
      <Box as="section" style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
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
            opacity: "0.06",
            backgroundImage: "radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />

        <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
          <Column gap={6} align="center">
            {/* Brand */}
            <Column gap={2} align="center">
              <Text as="h1" style={{
                fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
                fontWeight: 700,
                fontFamily: "var(--st-font-display)",
                lineHeight: 1.15,
                margin: 0,
                color: "white",
                letterSpacing: "-1.5px"
              }}>
                staple-css
              </Text>
              <Text size={3} align="center" style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "1.25rem",
                fontWeight: 400,
                lineHeight: 1.5
              }}>
                Token-First Design System for Performance-First Teams
              </Text>
            </Column>

            {/* Value Proposition */}
            <Box style={{ maxWidth: "700px" }}>
              <Text align="center" style={{
                color: "rgba(255,255,255,0.7)",
                lineHeight: "1.7",
                fontSize: "1.0625rem",
                fontWeight: 400
              }}>
                2.5 KB. Zero JS runtime. 350+ CSS variables. Build anything with primitives that scale from startup to enterprise. MIT licensed. Type-safe by default.
              </Text>
            </Box>

            {/* CTA Buttons */}
            <Row gap={3} style={{ marginTop: "var(--st-space-4)", flexWrap: "wrap" }}>
              <PrimaryButton href="#playground">
                Try it Live
              </PrimaryButton>
              <SecondaryButton href="/tokens" style={{ borderColor: "rgba(255,255,255,0.2)", color: "white", background: "transparent" }}>
                Get Started
              </SecondaryButton>
            </Row>

            {/* Stats */}
            <Grid cols={{ base: 2, md: 4 }} gap={4} style={{ marginTop: "var(--st-space-6)", width: "100%" }}>
              {[
                { value: "2.5 KB", label: "Core" },
                { value: "0 KB", label: "Runtime" },
                { value: "350+", label: "Tokens" },
                { value: "\u221E", label: "Scalable" },
              ].map((stat, i) => (
                <Box key={i} align="center">
                  <Text weight="bold" style={{
                    color: "white",
                    fontSize: "2rem",
                    fontFamily: "var(--st-font-display)",
                    fontWeight: 700,
                    margin: 0,
                    lineHeight: 1
                  }}>{stat.value}</Text>
                  <Text size={1} style={{ color: "rgba(255,255,255,0.5)", marginTop: "var(--st-space-1)", fontWeight: 500 }}>{stat.label}</Text>
                </Box>
              ))}
            </Grid>
          </Column>
        </Container>
      </Box>

      {/* Features Section */}
      <Box as="section" style={{
        background: "var(--st-color-background)",
        padding: "var(--st-space-8) var(--st-space-4)",
        width: "100%",
        boxSizing: "border-box",
        borderTop: "1px solid rgba(0, 0, 0, 0.06)"
      }}>
        <Container size="lg">
          <Column gap={8}>
            <Column gap={2} style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
              <Text as="h2" style={{
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 700,
                fontFamily: "var(--st-font-display)",
                margin: 0,
                letterSpacing: "-0.5px",
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
                { icon: Target, title: "Token-First Design", items: ["350+ CSS variables", "Type-safe props", "Consistent by default"] },
                { icon: Zap, title: "Ultra-Lightweight", items: ["2.5 KB core", "Zero runtime JS", "Static CSS only"] },
                { icon: Cpu, title: "AI-Friendly APIs", items: ["Constrained props", "Prevent hallucination", "Perfect for AI code gen"] },
                { icon: Palette, title: "Design System Ready", items: ["8 primitives", "Light/dark themes", "Multiple density"] },
                { icon: Lock, title: "Type-Safe", items: ["Full TypeScript", "Compile-time validation", "IDE autocomplete"] },
                { icon: Package, title: "Tree-Shakeable", items: ["Import only what you use", "ESM exports", "Per-component splitting"] },
              ].map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <div key={idx} style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--st-space-4)",
                    padding: "var(--st-space-5)",
                    border: "1px solid rgba(0, 0, 0, 0.06)",
                    borderRadius: "12px",
                    background: "var(--st-color-surface)",
                    transition: "all 150ms cubic-bezier(0.19, 1, 0.22, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.06)";
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
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(59, 130, 246, 0.08)",
                          color: "#3b82f6",
                          borderRadius: "10px",
                          flexShrink: 0,
                        }}>
                        <IconComponent size={20} strokeWidth={1.5} />
                      </Box>
                      <Text weight="bold" style={{
                        fontSize: "1.0625rem",
                        fontWeight: 600,
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
                            color: "#3b82f6",
                            fontWeight: 500,
                            fontSize: "0.875rem",
                            display: "inline-block",
                            flexShrink: 0,
                            marginTop: "2px"
                          }}>\u2022</span>
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
        borderTop: "1px solid rgba(0, 0, 0, 0.06)"
      }}>
        <Container size="lg">
          <Column gap={6}>
            <Column gap={2}>
              <Text as="h2" style={{
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 700,
                fontFamily: "var(--st-font-display)",
                margin: 0,
                letterSpacing: "-0.5px"
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
                  <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                    <th scope="col" style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Feature</th>
                    <th scope="col" style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>staple-css</th>
                    <th scope="col" style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>Tailwind</th>
                    <th scope="col" style={{ padding: "12px", textAlign: "center", fontWeight: "600" }}>Chakra UI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                    <td style={{ padding: "12px" }}>Bundle Size (gzip)</td>
                    <td style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: "#3b82f6" }}>2.5 KB</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>~10 KB</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>~45 KB</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                    <td style={{ padding: "12px" }}>Runtime Cost</td>
                    <td style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: "#3b82f6" }}>0 KB</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>0 KB</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>~15 KB</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                    <td style={{ padding: "12px" }}>Learning Curve</td>
                    <td style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: "#3b82f6" }}>Easy</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>Easy</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>Moderate</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "12px" }}>Type Safety</td>
                    <td style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: "#3b82f6" }}>Full TS</td>
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
        borderTop: "1px solid rgba(0, 0, 0, 0.06)"
      }}>
        <Container size="lg">
          <Column gap={6}>
            <Column gap={2}>
              <Text as="h2" style={{
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 700,
                fontFamily: "var(--st-font-display)",
                margin: 0,
                letterSpacing: "-0.5px"
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
                { title: "Tokens are the API", desc: "Design decisions live in tokens. Components consume token keys, not arbitrary raw values. This enforces consistency by default." },
                { title: "Contract Over Customization", desc: "A stable, constrained API enables consistency. Override by design via className, not by default. This reduces decision fatigue." },
                { title: "Zero Runtime Overhead", desc: "All CSS is static. No JavaScript style generation. No CSS-in-JS overhead. Minimum bundle size, maximum performance." }
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: "var(--st-space-5)",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  borderRadius: "12px",
                  transition: "all 150ms cubic-bezier(0.19, 1, 0.22, 1)",
                  background: "var(--st-color-background)"
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.06)";
                }} onMouseLeave={(e) => {
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
        borderTop: "1px solid rgba(0, 0, 0, 0.06)"
      }}>
        <Container size="lg">
          <Column gap={6}>
            <Column gap={2}>
              <Text as="h2" style={{
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 700,
                fontFamily: "var(--st-font-display)",
                margin: 0,
                letterSpacing: "-0.5px"
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
                padding: "var(--st-space-5)",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                borderRadius: "12px",
                background: "var(--st-color-surface)"
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
                    borderRadius: "8px",
                    fontFamily: "var(--st-font-mono)",
                    fontSize: "var(--st-font-size-0)",
                    overflowX: "auto",
                    border: "1px solid rgba(0, 0, 0, 0.06)"
                  }}>
                    <code>npm install @staple-css/tokens</code>
                  </Box>
                </Column>
              </div>

              {/* Quick Start */}
              <div style={{
                padding: "var(--st-space-5)",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                borderRadius: "12px",
                background: "var(--st-color-surface)"
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
                    borderRadius: "8px",
                    fontFamily: "var(--st-font-mono)",
                    fontSize: "var(--st-font-size-0)",
                    overflowX: "auto",
                    lineHeight: "1.6",
                    border: "1px solid rgba(0, 0, 0, 0.06)"
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
        borderTop: "1px solid rgba(0, 0, 0, 0.06)"
      }}>
        <Container size="lg">
          <Column gap={6}>
          <Column gap={2}>
            <Text as="h2" style={{
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              fontWeight: 700,
              fontFamily: "var(--st-font-display)",
              margin: 0,
              letterSpacing: "-0.5px"
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
              { icon: Gauge, title: "Performance", desc: "2.5 KB zero JS overhead" },
              { icon: Target, title: "Design Systems", desc: "Token-first consistency" },
              { icon: Cpu, title: "AI & Automation", desc: "Type-safe API constraints" },
              { icon: Smartphone, title: "Mobile Apps", desc: "Ultra-lightweight library" },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} style={{
                  display: "flex",
                  gap: "var(--st-space-3)",
                  padding: "var(--st-space-5)",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  borderRadius: "12px",
                  transition: "all 150ms cubic-bezier(0.19, 1, 0.22, 1)",
                  cursor: "pointer",
                  background: "var(--st-color-background)"
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.06)";
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                  <Box
                    aria-hidden="true"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "rgba(59, 130, 246, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#3b82f6",
                      flexShrink: 0,
                      marginTop: "2px"
                    }}>
                    <IconComponent size={20} strokeWidth={1.5} />
                  </Box>
                  <Column gap={2}>
                    <Text weight="bold" size={1} style={{ fontSize: "1rem", fontFamily: "var(--st-font-display)", fontWeight: 600 }}>{item.title}</Text>
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
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        padding: "var(--st-space-8) var(--st-space-4)",
        color: "white",
        width: "100%",
        boxSizing: "border-box",
      }}>
        <Container size="lg">
          <Column gap={6} align="center">
            <Column gap={2} align="center">
              <Text as="h2" style={{
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 700,
                fontFamily: "var(--st-font-display)",
                color: "white",
                margin: 0,
                letterSpacing: "-0.5px"
              }}>Ready to Build?</Text>
              <Text style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "1.0625rem",
                fontWeight: 400
              }}>Choose your edition. Core or full. MIT licensed.</Text>
            </Column>

            <Row gap={3} justify="center" style={{ flexWrap: "wrap" }}>
              <PrimaryButton href="/tokens">Get Started</PrimaryButton>
              <SecondaryButton href="/tokens-studio" style={{ borderColor: "rgba(255,255,255,0.2)", color: "white", background: "transparent" }}>Open Studio</SecondaryButton>
            </Row>

            <Text size={1} style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.9375rem",
              fontWeight: 400
            }}>
              350+ Tokens &bull; Zero Runtime &bull; Enterprise Ready
            </Text>
          </Column>
        </Container>
      </Box>
    </Box>
  );
}
