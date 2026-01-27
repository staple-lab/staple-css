import { Container, Column, Row, Text, Card, Box, Grid } from "@staple-css/primitives/full";
import { InteractivePlaygroundPro } from "../components/InteractivePlaygroundPro";

export function HomePageNew() {
  return (
    <Box>
      {/* Hero Section - Gradient with animations */}
      <Box
        className="pattern-tokens"
        style={{
          background: "var(--st-gradient-sunset)",
          color: "white",
          padding: "var(--st-space-8) var(--st-space-6)",
          position: "relative",
          overflow: "hidden",
          minHeight: "450px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Animated background elements */}
        <Box
          style={{
            position: "absolute",
            top: "-50%",
            right: "-10%",
            width: "500px",
            height: "500px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <Box
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "5%",
            width: "300px",
            height: "300px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />

        <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
          <Column gap={6} align="center">
            <Column gap={4} align="center">
              <Text as="h1" size={6} weight="bold" style={{ color: "white", lineHeight: "1.1" }}>
                Design System Primitives
              </Text>
              <Text size={3} style={{ color: "rgba(255,255,255,0.9)", textShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                Token-first. Performance-first. Ship fast.
              </Text>
            </Column>

            <Text size={1} style={{ color: "rgba(255,255,255,0.85)", maxWidth: "600px", textAlign: "center", lineHeight: "1.6" }}>
              staple-css is the design system contract for modern interfaces. Semantic tokens. Accessible primitives. Zero runtime. Scales from startups to enterprises.
            </Text>

            <Row gap={3} align="center">
              <a
                href="/guides"
                style={{
                  padding: "var(--st-space-3) var(--st-space-6)",
                  borderRadius: "var(--st-radius-2)",
                  background: "white",
                  color: "#f97316",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "var(--st-font-size-0)",
                  transition: "all var(--st-duration-fast) var(--st-easing-default)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 24px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
                }}
              >
                Get Started →
              </a>
              <a
                href="/colors"
                style={{
                  padding: "var(--st-space-3) var(--st-space-6)",
                  borderRadius: "var(--st-radius-2)",
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "var(--st-font-size-0)",
                  transition: "all var(--st-duration-fast) var(--st-easing-default)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Explore Colors
              </a>
            </Row>
          </Column>
        </Container>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(20px); }
          }
        `}</style>
      </Box>

      {/* Quick Stats */}
      <Box style={{ background: "var(--st-color-surface)", padding: "var(--st-space-6)" }}>
        <Container size="lg">
          <Grid cols={{ base: 2, md: 4 }} gap={4}>
            {[
              { stat: "2.5 KB", label: "Minimal Core" },
              { stat: "0 JS", label: "Runtime Overhead" },
              { stat: "22", label: "Color Palettes" },
              { stat: "9", label: "Spacing Levels" },
            ].map((item) => (
              <Box key={item.label} style={{ textAlign: "center" }}>
                <Text size={4} weight="bold" style={{ color: "var(--st-color-primary)" }}>
                  {item.stat}
                </Text>
                <Text size={0} tone="muted">
                  {item.label}
                </Text>
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container size="lg" style={{ padding: "var(--st-space-8) var(--st-space-6)" }}>
        <Column gap={8}>
          {/* Why Section */}
          <Column gap={4}>
            <Text as="h2" size={4} weight="bold">
              Why staple-css?
            </Text>
            <Grid cols={{ base: 1, md: 2 }} gap={6}>
              {[
                {
                  icon: "⚡",
                  title: "Performance First",
                  description: "2.5 KB core. No JavaScript. All CSS variables. Static generation. Tree-shakeable.",
                },
                {
                  icon: "🎨",
                  title: "Design Tokens API",
                  description: "Semantic tokens are the contract. Consistency by default. Override by design.",
                },
                {
                  icon: "♿",
                  title: "Built for Access",
                  description: "WCAG AA compliance. Keyboard navigation. Focus management. Reduced motion support.",
                },
                {
                  icon: "🚀",
                  title: "Scales to Enterprise",
                  description: "Start small, grow big. Token studio. Figma sync. Multi-brand support.",
                },
              ].map((feature) => (
                <Box
                  key={feature.title}
                  className="pattern-components"
                  style={{
                    background: "var(--st-color-surface)",
                    padding: "var(--st-space-6)",
                    borderRadius: "var(--st-radius-3)",
                    border: "2px solid var(--st-color-border)",
                    transition: "all var(--st-duration-normal) var(--st-easing-default)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(20, 184, 166, 0.2)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-color)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--st-color-border)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <Column gap={3}>
                    <Text size={2}>{feature.icon}</Text>
                    <Text weight="semibold" size={1}>
                      {feature.title}
                    </Text>
                    <Text size={0} tone="muted">
                      {feature.description}
                    </Text>
                  </Column>
                </Box>
              ))}
            </Grid>
          </Column>

          {/* Interactive Section */}
          <Column gap={4}>
            <Text as="h2" size={4} weight="bold">
              Try It Live
            </Text>
            <Text size={1} tone="muted">
              Interactive component playground. Switch between preview and code. Explore responsive behavior and best practices.
            </Text>
            <InteractivePlaygroundPro />
          </Column>

          {/* Getting Started */}
          <Column gap={4}>
            <Text as="h2" size={4} weight="bold">
              Getting Started
            </Text>
            <Grid cols={{ base: 1, md: 2 }} gap={6}>
              {[
                {
                  step: "1",
                  title: "Install Package",
                  code: "npm install @staple-css/tokens @staple-css/primitives",
                },
                {
                  step: "2",
                  title: "Import Styles",
                  code: "import '@staple-css/tokens/all.css';",
                },
                {
                  step: "3",
                  title: "Build Components",
                  code: "<Box pad={6}>\n  <Text>Your content</Text>\n</Box>",
                },
                {
                  step: "4",
                  title: "Deploy with Confidence",
                  code: "npm run build && npm run deploy",
                },
              ].map((item) => (
                <Card key={item.step} pad={6} radius={3} shadow={1}>
                  <Column gap={4}>
                    <Row gap={3} align="center">
                      <Box
                        style={{
                          width: "40px",
                          height: "40px",
                          background: "var(--st-gradient-primary-medium)",
                          borderRadius: "var(--st-radius-2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: "700",
                        }}
                      >
                        {item.step}
                      </Box>
                      <Text weight="semibold" size={1}>
                        {item.title}
                      </Text>
                    </Row>
                    <pre
                      style={{
                        background: "var(--st-color-background)",
                        padding: "var(--st-space-3)",
                        borderRadius: "var(--st-radius-1)",
                        overflow: "auto",
                        fontSize: "var(--st-font-size-0)",
                        fontFamily: "var(--st-font-mono)",
                        margin: 0,
                      }}
                    >
                      <code>{item.code}</code>
                    </pre>
                  </Column>
                </Card>
              ))}
            </Grid>
          </Column>

          {/* Call to Action */}
          <Box
            style={{
              background: "var(--st-gradient-ocean)",
              padding: "var(--st-space-8)",
              borderRadius: "var(--st-radius-4)",
              textAlign: "center",
            }}
          >
            <Column gap={4} align="center">
              <Column gap={2} align="center">
                <Text as="h3" size={3} weight="bold" style={{ color: "white" }}>
                  Ready to build?
                </Text>
                <Text style={{ color: "white", opacity: 0.9 }}>
                  Explore the token system, component patterns, and design guides.
                </Text>
              </Column>
              <a
                href="/guides"
                style={{
                  display: "inline-block",
                  padding: "var(--st-space-3) var(--st-space-6)",
                  borderRadius: "var(--st-radius-2)",
                  background: "white",
                  color: "#0ea5e9",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "var(--st-font-size-0)",
                  transition: "all var(--st-duration-fast) var(--st-easing-default)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 24px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                Explore Guides →
              </a>
            </Column>
          </Box>
        </Column>
      </Container>
    </Box>
  );
}
