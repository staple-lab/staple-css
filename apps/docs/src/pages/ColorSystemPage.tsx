import { Container, Column, Row, Text, Card, Box, Grid } from "@staple-css/primitives/full";

export function ColorSystemPage() {
  return (
    <Container size="xl" style={{ paddingTop: "var(--st-space-8)", paddingBottom: "var(--st-space-8)" }}>
      <Column gap={8}>
        {/* Distinctive Hero Section with Color Mixing Metaphor */}
        <Box
          className="bg-color-system"
          style={{
            padding: "var(--st-space-8) var(--st-space-6)",
            borderRadius: "var(--st-radius-3)",
            border: "1px solid var(--st-color-border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Column gap={4}>
            <Text as="h1" size={5} weight="bold">
              Color System
            </Text>
            <Text size={2} tone="muted">
              A comprehensive system for semantic colors, palettes, gradients, and accessibility.
              Theme-aware colors that adapt to light and dark modes automatically.
            </Text>
          </Column>
        </Box>

        {/* Semantic Colors */}
        <Column gap={4}>
          <Box
            className="bg-accent-hero"
            style={{
              padding: "var(--st-space-4) var(--st-space-6)",
              borderRadius: "var(--st-radius-2)",
            }}
          >
            <Text as="h2" size={3} weight="semibold">
              Semantic Colors
            </Text>
            <Text size={1} tone="muted">
              Intent-based color tokens for consistent, maintainable interfaces. These colors adapt
              automatically to light and dark themes while maintaining perfect contrast ratios.
            </Text>
          </Box>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {[
              {
                name: "Primary",
                description: "Brand color for primary actions and interactions",
                lightValue: "#2563eb",
                darkValue: "#3b82f6",
              },
              {
                name: "Danger",
                description: "Destructive actions and critical alerts",
                lightValue: "#dc2626",
                darkValue: "#ef4444",
              },
              {
                name: "Warning",
                description: "Cautionary states and warnings",
                lightValue: "#d97706",
                darkValue: "#f59e0b",
              },
              {
                name: "Success",
                description: "Positive confirmations and success states",
                lightValue: "#16a34a",
                darkValue: "#22c55e",
              },
              {
                name: "Neutral",
                description: "Text, borders, and backgrounds",
                lightValue: "#111827",
                darkValue: "#f9fafb",
              },
            ].map((color) => (
              <Card key={color.name} pad={4} radius={3} shadow={1}>
                <Column gap={3}>
                  <Column gap={1}>
                    <Text weight="semibold" size={1}>
                      {color.name}
                    </Text>
                    <Text size={0} tone="muted">
                      {color.description}
                    </Text>
                  </Column>

                  <Column gap={2}>
                    <Row gap={2} align="center">
                      <Box
                        style={{
                          width: "40px",
                          height: "40px",
                          background: color.lightValue,
                          borderRadius: "var(--st-radius-2)",
                        }}
                      />
                      <Column gap={0}>
                        <Text size={0} weight="medium">
                          Light
                        </Text>
                        <Text size={0} tone="muted" style={{ fontFamily: "var(--st-font-mono)" }}>
                          {color.lightValue}
                        </Text>
                      </Column>
                    </Row>
                    <Row gap={2} align="center">
                      <Box
                        style={{
                          width: "40px",
                          height: "40px",
                          background: color.darkValue,
                          borderRadius: "var(--st-radius-2)",
                        }}
                      />
                      <Column gap={0}>
                        <Text size={0} weight="medium">
                          Dark
                        </Text>
                        <Text size={0} tone="muted" style={{ fontFamily: "var(--st-font-mono)" }}>
                          {color.darkValue}
                        </Text>
                      </Column>
                    </Row>
                  </Column>
                </Column>
              </Card>
            ))}
          </Grid>
        </Column>

        {/* Color Scales & Palettes */}
        <Column gap={4}>
          <Text as="h2" size={3} weight="semibold">
            Color Palettes & Scales
          </Text>
          <Text size={1} tone="muted">
            Tailwind-compatible 11-step color scales (50-950) for 22 color palettes. Use for custom
            components, data visualization, and complex color needs.
          </Text>

          <Grid cols={{ base: 1, md: 2 }} gap={4}>
            {[
              { name: "slate", steps: 11 },
              { name: "gray", steps: 11 },
              { name: "zinc", steps: 11 },
              { name: "neutral", steps: 11 },
              { name: "stone", steps: 11 },
              { name: "red", steps: 11 },
              { name: "orange", steps: 11 },
              { name: "amber", steps: 11 },
              { name: "yellow", steps: 11 },
              { name: "lime", steps: 11 },
              { name: "green", steps: 11 },
              { name: "emerald", steps: 11 },
            ].map((palette) => (
              <Card key={palette.name} pad={4} radius={2} shadow={0}>
                <Column gap={2}>
                  <Text weight="semibold" size={0} style={{ textTransform: "capitalize" }}>
                    {palette.name}
                  </Text>
                  <Row gap={1}>
                    {Array.from({ length: palette.steps }).map((_, i) => (
                      <Box
                        key={i}
                        style={{
                          flex: 1,
                          height: "20px",
                          background: `var(--st-${palette.name}-${(i + 1) * 100})`,
                          borderRadius: "var(--st-radius-1)",
                        }}
                      />
                    ))}
                  </Row>
                </Column>
              </Card>
            ))}
          </Grid>

          <Card pad={4} radius={2} shadow={0} tone="primary">
            <Column gap={2}>
              <Text weight="semibold" size={0} style={{ color: "white" }}>
                Access Palettes
              </Text>
              <Text size={0} style={{ color: "white", opacity: 0.9 }}>
                Import <code style={{ fontFamily: "var(--st-font-mono)" }}>@staple-css/tokens/palettes.css</code> to use all 22 color palettes in your projects.
              </Text>
            </Column>
          </Card>
        </Column>

        {/* Gradients */}
        <Column gap={4}>
          <Text as="h2" size={3} weight="semibold">
            Gradient Tokens
          </Text>
          <Text size={1} tone="muted">
            22 pre-defined, perceptually-smooth gradients organized by category. Perfect for hero
            sections, cards, and visual emphasis. All accessible and theme-aware.
          </Text>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {[
              { name: "Tone-Based", description: "15 systematic gradients (neutral, primary, status)", color1: "#3b82f6", color2: "#2563eb" },
              { name: "Vibrant", description: "6 expressive multi-color gradients (sunrise, ocean, etc)", color1: "#f97316", color2: "#ec4899" },
              { name: "Overlays", description: "3 semi-transparent gradients for text contrast", color1: "#374151", color2: "#111827" },
            ].map((category) => (
              <Card key={category.name} pad={4} radius={3} shadow={1} style={{ overflow: "hidden" }}>
                <Column gap={0}>
                  <Box
                    style={{
                      height: "100px",
                      background: `linear-gradient(135deg, ${category.color1}, ${category.color2})`,
                      marginBottom: "var(--st-space-4)",
                    }}
                  />
                  <Column gap={1}>
                    <Text weight="semibold" size={1}>
                      {category.name}
                    </Text>
                    <Text size={0} tone="muted">
                      {category.description}
                    </Text>
                  </Column>
                </Column>
              </Card>
            ))}
          </Grid>

          <Card pad={4} radius={2} shadow={0} tone="success">
            <Column gap={2}>
              <Text weight="semibold" size={0} style={{ color: "white" }}>
                Create Custom Gradients
              </Text>
              <Text size={0} style={{ color: "white", opacity: 0.9 }}>
                Use the Gradient Studio to create unlimited custom gradients. Export as CSS variables and add to your design tokens.
              </Text>
            </Column>
          </Card>
        </Column>

        {/* Accessibility */}
        <Card pad={6} radius={3} shadow={1}>
          <Column gap={4}>
            <Text as="h2" size={3} weight="semibold">
              ♿ Color & Accessibility
            </Text>

            <Grid cols={{ base: 1, md: 2 }} gap={4}>
              {[
                {
                  title: "Contrast Compliance",
                  points: [
                    "All semantic colors meet WCAG AA standards (4.5:1 for normal text)",
                    "Text-on-background contrast verified for both light and dark modes",
                    "Color combinations tested for common color blindness types",
                  ],
                },
                {
                  title: "Intent Over Hue",
                  points: [
                    "Use semantic color names (danger, warning, success) not hex values",
                    "Don't rely on color alone to convey meaning",
                    "Add icons, patterns, or labels alongside colors for clarity",
                  ],
                },
                {
                  title: "Theme Switching",
                  points: [
                    "Colors automatically adapt to light/dark themes",
                    "Respects system prefers-color-scheme preference",
                    "Maintains contrast and readability in all themes",
                  ],
                },
                {
                  title: "Testing Colors",
                  points: [
                    "Use WebAIM Contrast Checker for custom colors",
                    "Test with Color Blindness simulators (Deuteranopia, Protanopia)",
                    "Validate with real users on real devices",
                  ],
                },
              ].map((section) => (
                <Column key={section.title} gap={2}>
                  <Text weight="semibold" size={1}>
                    {section.title}
                  </Text>
                  <Column gap={1}>
                    {section.points.map((point, idx) => (
                      <Row key={idx} gap={2} align="start">
                        <Text size={1} style={{ minWidth: "20px" }}>
                          ✓
                        </Text>
                        <Text size={0} tone="muted">
                          {point}
                        </Text>
                      </Row>
                    ))}
                  </Column>
                </Column>
              ))}
            </Grid>
          </Column>
        </Card>

        {/* Integration with Token Studio */}
        <Card pad={6} radius={3} shadow={1} style={{ borderLeft: "4px solid var(--st-color-primary)" }}>
          <Column gap={4}>
            <Text as="h2" size={3} weight="semibold">
              🎨 Token Studio Integration
            </Text>

            <Text size={1}>
              The <strong>Token Studio</strong> provides complete color system management tools:
            </Text>

            <Grid cols={{ base: 1, md: 2 }} gap={3}>
              {[
                {
                  icon: "🎯",
                  title: "Palette Generator",
                  description: "Generate color scales from a single base color using OKLCH color space",
                },
                {
                  icon: "🌈",
                  title: "Harmony Tools",
                  description: "Create complementary, triadic, and analogous color harmonies automatically",
                },
                {
                  icon: "✨",
                  title: "Gradient Maker",
                  description: "Craft custom gradients with full control over colors, angles, and stops",
                },
                {
                  icon: "🔄",
                  title: "Theme Manager",
                  description: "Create unlimited color themes with light and dark variants",
                },
                {
                  icon: "📊",
                  title: "Contrast Checker",
                  description: "Verify WCAG compliance for color combinations in real-time",
                },
                {
                  icon: "💾",
                  title: "Export & Import",
                  description: "Work with Figma tokens, JSON, CSS, or native token format",
                },
              ].map((feature) => (
                <Box key={feature.title} style={{ background: "var(--st-color-surface)", padding: "var(--st-space-4)", borderRadius: "var(--st-radius-2)" }}>
                  <Column gap={2}>
                    <Row gap={2} align="center">
                      <Text size={2}>{feature.icon}</Text>
                      <Text weight="semibold" size={0}>
                        {feature.title}
                      </Text>
                    </Row>
                    <Text size={0} tone="muted">
                      {feature.description}
                    </Text>
                  </Column>
                </Box>
              ))}
            </Grid>

            <Row gap={3}>
              <a
                href="/tokens-studio"
                style={{
                  display: "inline-block",
                  padding: "var(--st-space-3) var(--st-space-6)",
                  borderRadius: "var(--st-radius-2)",
                  background: "var(--st-color-primary)",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "var(--st-font-size-0)",
                  transition: "all var(--st-duration-fast) var(--st-easing-default)",
                }}
              >
                Open Token Studio →
              </a>
              <a
                href="/gradient-studio"
                style={{
                  display: "inline-block",
                  padding: "var(--st-space-3) var(--st-space-6)",
                  borderRadius: "var(--st-radius-2)",
                  border: "1px solid var(--st-color-primary)",
                  background: "transparent",
                  color: "var(--st-color-primary)",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "var(--st-font-size-0)",
                  transition: "all var(--st-duration-fast) var(--st-easing-default)",
                }}
              >
                Gradient Studio →
              </a>
            </Row>
          </Column>
        </Card>

        {/* Usage Examples */}
        <Card pad={6} radius={3} shadow={1}>
          <Column gap={4}>
            <Text as="h2" size={3} weight="semibold">
              💻 Usage Examples
            </Text>

            <Column gap={3}>
              <Column gap={1}>
                <Text weight="semibold" size={0}>
                  Semantic Colors (Theme-Aware)
                </Text>
                <pre
                  style={{
                    background: "var(--st-color-surface)",
                    padding: "var(--st-space-4)",
                    borderRadius: "var(--st-radius-2)",
                    overflow: "auto",
                    fontSize: "var(--st-font-size-0)",
                    fontFamily: "var(--st-font-mono)",
                  }}
                >
                  <code>{`.button {
  background: var(--st-color-primary);
  color: var(--st-color-primary-text);
}

.button:hover {
  background: var(--st-color-primary-hover);
}`}</code>
                </pre>
              </Column>

              <Column gap={1}>
                <Text weight="semibold" size={0}>
                  Color Palettes (Custom Components)
                </Text>
                <pre
                  style={{
                    background: "var(--st-color-surface)",
                    padding: "var(--st-space-4)",
                    borderRadius: "var(--st-radius-2)",
                    overflow: "auto",
                    fontSize: "var(--st-font-size-0)",
                    fontFamily: "var(--st-font-mono)",
                  }}
                >
                  <code>{`.chart-bar-1 { background: var(--st-blue-500); }
.chart-bar-2 { background: var(--st-purple-500); }
.chart-bar-3 { background: var(--st-pink-500); }`}</code>
                </pre>
              </Column>

              <Column gap={1}>
                <Text weight="semibold" size={0}>
                  Gradients (Visual Effects)
                </Text>
                <pre
                  style={{
                    background: "var(--st-color-surface)",
                    padding: "var(--st-space-4)",
                    borderRadius: "var(--st-radius-2)",
                    overflow: "auto",
                    fontSize: "var(--st-font-size-0)",
                    fontFamily: "var(--st-font-mono)",
                  }}
                >
                  <code>{`.hero {
  background: var(--st-gradient-sunrise);
}

.card {
  background: linear-gradient(135deg, var(--st-gradient-primary-soft));
}`}</code>
                </pre>
              </Column>
            </Column>
          </Column>
        </Card>
      </Column>
    </Container>
  );
}
