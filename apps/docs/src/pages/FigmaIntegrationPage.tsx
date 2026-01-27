import { Container, Column, Row, Text, Card, Box, Grid } from "@staple-css/primitives/full";

export function FigmaIntegrationPage() {
  return (
    <Container size="xl" style={{ paddingTop: "var(--st-space-8)", paddingBottom: "var(--st-space-8)" }}>
      <Column gap={8}>
        {/* Header */}
        <Column gap={4}>
          <Text as="h1" size={5} weight="bold">
            Figma Integration
          </Text>
          <Text size={2} tone="muted">
            Seamlessly sync design tokens between Figma and your codebase. Keep design and
            development in perfect sync with bidirectional token support.
          </Text>
        </Column>

        {/* Two-Way Sync */}
        <Card pad={6} radius={3} shadow={1}>
          <Column gap={4}>
            <Row gap={4} align="center" justify="between">
              <Column gap={2} style={{ flex: 1 }}>
                <Text weight="bold" size={2}>
                  🎨 Figma → Code
                </Text>
                <Text size={0} tone="muted">
                  Export design tokens from Figma to CSS variables, JSON, or TypeScript
                </Text>
              </Column>
              <Box
                style={{
                  width: "60px",
                  height: "60px",
                  background: "var(--st-gradient-primary-medium)",
                  borderRadius: "var(--st-radius-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                }}
              >
                →
              </Box>
              <Column gap={2} style={{ flex: 1, textAlign: "right" }}>
                <Text weight="bold" size={2}>
                  Code → 🎨 Figma
                </Text>
                <Text size={0} tone="muted">
                  Import your CSS variables and design tokens into Figma automatically
                </Text>
              </Column>
            </Row>
          </Column>
        </Card>

        {/* Features Grid */}
        <Column gap={4}>
          <Text as="h2" size={3} weight="semibold">
            ✨ Key Features
          </Text>
          <Grid cols={{ base: 1, md: 2 }} gap={4}>
            {[
              {
                icon: "🔄",
                title: "Bidirectional Sync",
                description: "Keep Figma and code in sync automatically. Update in one place, sync everywhere.",
              },
              {
                icon: "📦",
                title: "Multiple Formats",
                description: "Export as CSS variables, JSON, TypeScript, or Figma tokens format.",
              },
              {
                icon: "🎨",
                title: "All Token Types",
                description: "Colors, typography, spacing, shadows, gradients, motion tokens - everything syncs.",
              },
              {
                icon: "🔐",
                title: "Version Control",
                description: "Track token changes over time. Roll back to previous versions easily.",
              },
              {
                icon: "🚀",
                title: "Team Collaboration",
                description: "Multiple designers and developers can sync tokens without conflicts.",
              },
              {
                icon: "⚙️",
                title: "Custom Mappings",
                description: "Map Figma token names to your codebase naming conventions automatically.",
              },
            ].map((feature) => (
              <Box
                key={feature.title}
                style={{
                  background: "var(--st-color-surface)",
                  padding: "var(--st-space-6)",
                  borderRadius: "var(--st-radius-2)",
                  border: "1px solid var(--st-color-border)",
                  transition: "all var(--st-duration-normal) var(--st-easing-default)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--st-color-primary)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--st-shadow-2)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--st-color-border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <Column gap={2}>
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

        {/* Supported Token Types */}
        <Column gap={4}>
          <Text as="h2" size={3} weight="semibold">
            📦 Supported Token Types
          </Text>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {[
              {
                name: "Colors",
                items: [
                  "Semantic colors (primary, danger, warning, success)",
                  "Color palettes (22 Tailwind-compatible palettes)",
                  "Light & dark theme variants",
                  "Opacity levels",
                ],
              },
              {
                name: "Typography",
                items: [
                  "Font families (sans, mono)",
                  "Font sizes (7 steps)",
                  "Font weights (400, 500, 600, 700)",
                  "Line heights (tight, normal, relaxed)",
                  "Letter spacing",
                ],
              },
              {
                name: "Spacing & Sizing",
                items: [
                  "Space scale (0-8)",
                  "Border radius (0-4)",
                  "Max width values",
                  "Gap & padding tokens",
                ],
              },
              {
                name: "Effects",
                items: [
                  "Shadows (0-5 elevation)",
                  "Gradients (22 pre-built)",
                  "Blur effects",
                  "Backdrop filters",
                ],
              },
              {
                name: "Motion",
                items: [
                  "Duration values (75ms - 1000ms)",
                  "Easing functions",
                  "Delay values",
                  "Animation definitions",
                ],
              },
              {
                name: "Grid & Layout",
                items: [
                  "Breakpoints (sm, md, lg, xl, 2xl)",
                  "Z-index scale",
                  "Aspect ratios",
                  "Layout utilities",
                ],
              },
            ].map((category) => (
              <Card key={category.name} pad={4} radius={2} shadow={0} style={{ border: "1px solid var(--st-color-border)" }}>
                <Column gap={3}>
                  <Text weight="semibold" size={1}>
                    {category.name}
                  </Text>
                  <Column gap={1}>
                    {category.items.map((item) => (
                      <Row key={item} gap={2} align="start">
                        <Text size={1} style={{ minWidth: "20px" }}>
                          ✓
                        </Text>
                        <Text size={0} tone="muted">
                          {item}
                        </Text>
                      </Row>
                    ))}
                  </Column>
                </Column>
              </Card>
            ))}
          </Grid>
        </Column>

        {/* Workflow Steps */}
        <Column gap={4}>
          <Text as="h2" size={3} weight="semibold">
            🔄 Integration Workflow
          </Text>

          <Grid cols={{ base: 1, md: 2 }} gap={6}>
            {/* Export Workflow */}
            <Card pad={6} radius={3} shadow={1}>
              <Column gap={4}>
                <Column gap={1}>
                  <Text weight="bold" size={2}>
                    Export (Figma → Code)
                  </Text>
                  <Text size={0} tone="muted">
                    Get design tokens from Figma into your codebase
                  </Text>
                </Column>

                <Column gap={3}>
                  {[
                    { step: "1", title: "Install Plugin", desc: "Add staple-css Figma plugin" },
                    { step: "2", title: "Select Tokens", desc: "Choose tokens to export" },
                    { step: "3", title: "Choose Format", desc: "CSS, JSON, or TypeScript" },
                    { step: "4", title: "Download", desc: "Save tokens to your repo" },
                    { step: "5", title: "Auto-Sync", desc: "Updates sync automatically" },
                  ].map((item) => (
                    <Row key={item.step} gap={3} align="center">
                      <Box
                        style={{
                          width: "32px",
                          height: "32px",
                          background: "var(--st-color-primary)",
                          color: "white",
                          borderRadius: "var(--st-radius-1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "700",
                        }}
                      >
                        {item.step}
                      </Box>
                      <Column gap={0}>
                        <Text weight="semibold" size={0}>
                          {item.title}
                        </Text>
                        <Text size={0} tone="muted">
                          {item.desc}
                        </Text>
                      </Column>
                    </Row>
                  ))}
                </Column>
              </Column>
            </Card>

            {/* Import Workflow */}
            <Card pad={6} radius={3} shadow={1}>
              <Column gap={4}>
                <Column gap={1}>
                  <Text weight="bold" size={2}>
                    Import (Code → Figma)
                  </Text>
                  <Text size={0} tone="muted">
                    Bring your code tokens into Figma for designers
                  </Text>
                </Column>

                <Column gap={3}>
                  {[
                    { step: "1", title: "Export Tokens", desc: "From Token Studio or CLI" },
                    { step: "2", title: "Select Format", desc: "JSON or Figma tokens format" },
                    { step: "3", title: "Upload to Figma", desc: "Use Figma plugin to import" },
                    { step: "4", title: "Create Libraries", desc: "Auto-create color/text styles" },
                    { step: "5", title: "Apply to Designs", desc: "Designers use tokens in Figma" },
                  ].map((item) => (
                    <Row key={item.step} gap={3} align="center">
                      <Box
                        style={{
                          width: "32px",
                          height: "32px",
                          background: "var(--st-color-success)",
                          color: "white",
                          borderRadius: "var(--st-radius-1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "700",
                        }}
                      >
                        {item.step}
                      </Box>
                      <Column gap={0}>
                        <Text weight="semibold" size={0}>
                          {item.title}
                        </Text>
                        <Text size={0} tone="muted">
                          {item.desc}
                        </Text>
                      </Column>
                    </Row>
                  ))}
                </Column>
              </Column>
            </Card>
          </Grid>
        </Column>

        {/* Export Formats */}
        <Column gap={4}>
          <Text as="h2" size={3} weight="semibold">
            📄 Export Formats
          </Text>

          <Grid cols={{ base: 1, md: 2 }} gap={4}>
            {[
              {
                format: "CSS Variables",
                description: "Standard CSS custom properties for web applications",
                example: `--st-primary: #2563eb;
--st-space-4: 1rem;`,
              },
              {
                format: "JSON",
                description: "Structured data format for programmatic access",
                example: `{
  "colors": {
    "primary": "#2563eb"
  }
}`,
              },
              {
                format: "TypeScript",
                description: "Type-safe token definitions for component props",
                example: `export const tokens = {
  colors: { primary: "#2563eb" }
}`,
              },
              {
                format: "Figma Tokens",
                description: "Native Figma tokens format for designer workflows",
                example: `{
  "colors": {
    "primary": { "value": "#2563eb" }
  }
}`,
              },
            ].map((format) => (
              <Card key={format.format} pad={4} radius={2} shadow={0} style={{ border: "1px solid var(--st-color-border)" }}>
                <Column gap={2}>
                  <Text weight="semibold" size={1}>
                    {format.format}
                  </Text>
                  <Text size={0} tone="muted">
                    {format.description}
                  </Text>
                  <pre
                    style={{
                      background: "var(--st-color-surface)",
                      padding: "var(--st-space-3)",
                      borderRadius: "var(--st-radius-1)",
                      fontSize: "var(--st-font-size-0)",
                      fontFamily: "var(--st-font-mono)",
                      margin: 0,
                      overflow: "auto",
                    }}
                  >
                    <code>{format.example}</code>
                  </pre>
                </Column>
              </Card>
            ))}
          </Grid>
        </Column>

        {/* CTA */}
        <Card pad={6} radius={3} shadow={1} tone="primary">
          <Column gap={3} align="center">
            <Text size={2} weight="bold" style={{ color: "white" }}>
              Ready to sync with Figma?
            </Text>
            <Text style={{ color: "white", opacity: 0.9 }}>
              Install the staple-css Figma plugin to get started with token synchronization
            </Text>
            <Row gap={3}>
              <a
                href="/tokens-studio"
                style={{
                  display: "inline-block",
                  padding: "var(--st-space-3) var(--st-space-6)",
                  borderRadius: "var(--st-radius-2)",
                  background: "white",
                  color: "var(--st-color-primary)",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "var(--st-font-size-0)",
                  transition: "all var(--st-duration-fast) var(--st-easing-default)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                Token Studio →
              </a>
              <a
                href="#figma-plugin"
                style={{
                  display: "inline-block",
                  padding: "var(--st-space-3) var(--st-space-6)",
                  borderRadius: "var(--st-radius-2)",
                  background: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "var(--st-font-size-0)",
                  transition: "all var(--st-duration-fast) var(--st-easing-default)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)";
                }}
              >
                View Figma Plugin
              </a>
            </Row>
          </Column>
        </Card>
      </Column>
    </Container>
  );
}
