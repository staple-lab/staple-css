import { Container, Column, Row, Text, Box, Grid } from "@staple-css/primitives/full";
import "./ColorSystemPage.css";

export function ColorSystemPage() {
  return (
    <div className="color-system-page">
      <Box as="main">
        {/* Hero Section */}
        <Box style={{
          padding: "48px 0"
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
                Color System
              </Text>
              <Text tone="muted" style={{
                fontSize: "15px",
                lineHeight: 1.7,
                maxWidth: "65ch",
                fontWeight: 400
              }}>
                Purpose-built semantic colors that adapt across themes. A cohesive palette for consistent, accessible interfaces with built-in dark mode support.
              </Text>
            </Column>
          </Container>
        </Box>

        <Container size="xl" style={{ padding: "48px 0" }}>
          <Column gap={8}>

          {/* Semantic Colors */}
          <Box as="section" style={{ display: "contents" }}>
            <Column gap={6}>
            <div className="section-header">
              <Text as="h2" size={3} weight="semibold">
                Semantic Colors
              </Text>
              <Text size={1} tone="muted" style={{ marginTop: "var(--st-space-2)" }}>
                Intent-based tokens. Perfect contrast ratios in light and dark modes.
              </Text>
            </div>

            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
              {[
                { name: "Primary", desc: "Primary actions and interactions", light: "#2563eb", dark: "#3b82f6" },
                { name: "Danger", desc: "Destructive actions and critical alerts", light: "#dc2626", dark: "#ef4444" },
                { name: "Warning", desc: "Cautionary states and warnings", light: "#d97706", dark: "#f59e0b" },
                { name: "Success", desc: "Positive confirmations", light: "#16a34a", dark: "#22c55e" },
                { name: "Neutral", desc: "Text, borders, backgrounds", light: "#111827", dark: "#f9fafb" },
              ].map((color) => (
                <div key={color.name} className="semantic-color">
                  <div className="color-samples" aria-hidden="true">
                    <div className="sample light" style={{ backgroundColor: color.light }} />
                    <div className="sample dark" style={{ backgroundColor: color.dark }} />
                  </div>
                  <div className="color-meta">
                    <Text weight="semibold" size={1}>
                      {color.name}
                    </Text>
                    <Text size={0} tone="muted">
                      {color.desc}
                    </Text>
                    <Text size={0} tone="muted" style={{ fontFamily: "var(--st-font-mono)", marginTop: "var(--st-space-2)" }}>
                      {color.light} / {color.dark}
                    </Text>
                  </div>
                </div>
              ))}
            </Grid>
            </Column>
          </Box>

          {/* Color Palettes */}
          <Box as="section" style={{ display: "contents" }}>
            <Column gap={6}>
              <div className="section-header">
              <Text as="h2" size={3} weight="semibold">
                Color Palettes
              </Text>
              <Text size={1} tone="muted" style={{ marginTop: "var(--st-space-2)" }}>
                22 scales (50-950) for data visualization and custom components.
              </Text>
              </div>

              <Grid cols={{ base: 2, md: 3, lg: 4 }} gap={3}>
              {["slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald"].map((palette) => (
                <div key={palette} className="palette-card">
                  <div className="palette-ramp" aria-hidden="true">
                    {Array.from({ length: 11 }).map((_, i) => (
                      <div
                        key={i}
                        className="palette-step"
                        style={{
                          backgroundColor: `var(--st-${palette}-${(i + 1) * 100})`,
                        }}
                      />
                    ))}
                  </div>
                  <Text size={0} weight="medium" style={{ marginTop: "var(--st-space-2)", textTransform: "capitalize" }}>
                    {palette}
                  </Text>
                </div>
              ))}
            </Grid>

            <Box style={{ padding: "var(--st-space-4) var(--st-space-6)", backgroundColor: "var(--st-color-primary)", color: "white", borderRadius: "var(--st-radius-2)" }}>
              <Text size={0} weight="semibold" style={{ marginBottom: "var(--st-space-2)" }}>
                Using Palettes
              </Text>
              <Text size={0} style={{ opacity: 0.9 }}>
                Import <code style={{ fontFamily: "var(--st-font-mono)", backgroundColor: "rgba(0,0,0,0.2)", padding: "2px 4px", borderRadius: "3px" }}>@staple-css/tokens/palettes.css</code> to access all 22 color palettes.
              </Text>
            </Box>
          </Column>
          </Box>

          {/* Gradients */}
          <Box as="section" style={{ display: "contents" }}>
            <Column gap={6}>
            <div className="section-header">
              <Text as="h2" size={3} weight="semibold">
                Gradient Tokens
              </Text>
              <Text size={1} tone="muted" style={{ marginTop: "var(--st-space-2)" }}>
                Pre-defined, perceptually-smooth gradients for hero sections and emphasis.
              </Text>
            </div>

            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
              {[
                { name: "Tone-Based", desc: "15 systematic gradients", colors: ["#3b82f6", "#2563eb"] },
                { name: "Vibrant", desc: "6 expressive multi-color", colors: ["#f97316", "#ec4899"] },
                { name: "Overlays", desc: "3 semi-transparent", colors: ["#374151", "#111827"] },
              ].map((cat) => (
                <div key={cat.name} className="gradient-showcase">
                  <div
                    className="gradient-preview"
                    aria-hidden="true"
                    style={{
                      background: `linear-gradient(135deg, ${cat.colors[0]}, ${cat.colors[1]})`,
                    }}
                  />
                  <Text weight="semibold" size={1} style={{ marginTop: "var(--st-space-3)" }}>
                    {cat.name}
                  </Text>
                  <Text size={0} tone="muted">
                    {cat.desc}
                  </Text>
                </div>
              ))}
            </Grid>
            </Column>
          </Box>

          {/* Accessibility */}
          <Box as="section" style={{ display: "contents" }}>
            <div className="accessibility-section">
            <Text as="h2" size={3} weight="semibold" style={{ marginBottom: "var(--st-space-4)" }}>
              ♿ Accessibility
            </Text>
            <Grid cols={{ base: 1, md: 2 }} gap={4}>
              {[
                { title: "Contrast", points: ["WCAG AA compliance (4.5:1 for text)", "Tested for color blindness", "Light and dark mode verified"] },
                { title: "Intent", points: ["Use semantic names, not hex values", "Never rely on color alone", "Add icons or labels for clarity"] },
                { title: "Themes", points: ["Automatic light/dark switching", "Respects system preference", "Maintains readability in all modes"] },
                { title: "Testing", points: ["WebAIM Contrast Checker", "Deuteranopia/Protanopia simulators", "Validate with real users"] },
              ].map((section) => (
                <div key={section.title} className="a11y-card">
                  <Text weight="semibold" size={1} style={{ marginBottom: "var(--st-space-2)" }}>
                    {section.title}
                  </Text>
                  <Column gap={2}>
                    {section.points.map((point, idx) => (
                      <Row key={idx} gap={2} align="start">
                        <Text size={0} style={{ minWidth: "20px", color: "var(--st-color-primary)" }}>
                          ✓
                        </Text>
                        <Text size={0} tone="muted">
                          {point}
                        </Text>
                      </Row>
                    ))}
                  </Column>
                </div>
              ))}
            </Grid>
          </div>
          </Box>
        </Column>
        </Container>
      </Box>
    </div>
  );
}
