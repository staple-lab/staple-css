import { Container, Column, Row, Text, Box, Grid } from "@staple-css/primitives/full";
import {
  RefreshCw,
  Package,
  Palette,
  Lock,
  Users,
  Settings,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import "./FigmaIntegrationPage.css";

export function FigmaIntegrationPage() {
  return (
    <div className="figma-page">
      <Box as="main">
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
                letterSpacing: "-2px"
              }}>
                Figma Integration
              </Text>
              <Text tone="muted" style={{
                fontSize: "1.125rem",
                lineHeight: 1.7,
                maxWidth: "65ch",
                fontWeight: 400
              }}>
                Seamlessly sync design tokens between Figma and your codebase. Keep design and development in perfect sync with bidirectional token support.
              </Text>
            </Column>
          </Container>
        </Box>

        <Container size="xl" style={{ paddingTop: "var(--st-space-8)", paddingBottom: "var(--st-space-8)" }}>

        {/* Two-Way Sync */}
        <Box as="section" style={{ display: "contents" }}>
          <div className="sync-section">
          <div className="sync-flow">
            <div className="sync-direction">
              <h3>Figma → Code</h3>
              <p>Export design tokens from Figma to CSS variables, JSON, or TypeScript</p>
            </div>
            <div className="sync-arrow" aria-hidden="true">
              <ArrowRight size={32} strokeWidth={1.5} />
            </div>
            <div className="sync-direction">
              <h3>Code → Figma</h3>
              <p>Import your CSS variables and design tokens into Figma automatically</p>
            </div>
          </div>
          </div>
        </Box>

        {/* Features Grid */}
        <Box as="section" style={{ display: "contents" }}>
          <div className="features-section">
          <h2>Key Features</h2>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {[
              {
                icon: RefreshCw,
                title: "Bidirectional Sync",
                description: "Keep Figma and code in sync automatically. Update in one place, sync everywhere.",
              },
              {
                icon: Package,
                title: "Multiple Formats",
                description: "Export as CSS variables, JSON, TypeScript, or Figma tokens format.",
              },
              {
                icon: Palette,
                title: "All Token Types",
                description: "Colors, typography, spacing, shadows, gradients, motion tokens - everything syncs.",
              },
              {
                icon: Lock,
                title: "Version Control",
                description: "Track token changes over time. Roll back to previous versions easily.",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Multiple designers and developers can sync tokens without conflicts.",
              },
              {
                icon: Settings,
                title: "Custom Mappings",
                description: "Map Figma token names to your codebase naming conventions automatically.",
              },
            ].map((feature) => (
              <div key={feature.title} className="feature-card">
                <div className="feature-icon" aria-hidden="true">
                  <feature.icon size={24} strokeWidth={1.5} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </Grid>
          </div>
        </Box>

        {/* Supported Token Types */}
        <Box as="section" style={{ display: "contents" }}>
          <div className="token-types-section">
          <h2>Supported Token Types</h2>
          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {[
              {
                name: "Colors",
                items: ["Semantic colors (primary, danger, warning, success)", "Color palettes (22 Tailwind-compatible palettes)", "Light & dark theme variants", "Opacity levels"],
              },
              {
                name: "Typography",
                items: ["Font families (sans, mono)", "Font sizes (7 steps)", "Font weights (400, 500, 600, 700)", "Line heights (tight, normal, relaxed)"],
              },
              {
                name: "Spacing & Sizing",
                items: ["Space scale (0-8)", "Border radius (0-4)", "Max width values", "Gap & padding tokens"],
              },
              {
                name: "Effects",
                items: ["Shadows (0-5 elevation)", "Gradients (22 pre-built)", "Blur effects", "Backdrop filters"],
              },
              {
                name: "Motion",
                items: ["Duration values (75ms - 1000ms)", "Easing functions", "Delay values", "Animation definitions"],
              },
              {
                name: "Grid & Layout",
                items: ["Breakpoints (sm, md, lg, xl, 2xl)", "Z-index scale", "Aspect ratios", "Layout utilities"],
              },
            ].map((category) => (
              <div key={category.name} className="token-category">
                <h4>{category.name}</h4>
                <ul>
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Grid>
          </div>
        </Box>

        {/* Workflow Steps */}
        <Box as="section" style={{ display: "contents" }}>
          <div className="workflow-section">
          <h2>Integration Workflow</h2>
          <Grid cols={{ base: 1, md: 2 }} gap={6}>
            {/* Export Workflow */}
            <div className="workflow-card">
              <div className="workflow-header">
                <h3>Export (Figma → Code)</h3>
                <p>Get design tokens from Figma into your codebase</p>
              </div>

              <div className="workflow-steps">
                {[
                  { step: "1", title: "Install Plugin", desc: "Add staple-css Figma plugin" },
                  { step: "2", title: "Select Tokens", desc: "Choose tokens to export" },
                  { step: "3", title: "Choose Format", desc: "CSS, JSON, or TypeScript" },
                  { step: "4", title: "Download", desc: "Save tokens to your repo" },
                  { step: "5", title: "Auto-Sync", desc: "Updates sync automatically" },
                ].map((item) => (
                  <div key={item.step} className="step-item">
                    <div className="step-number" aria-hidden="true">{item.step}</div>
                    <div className="step-content">
                      <div className="step-title">{item.title}</div>
                      <div className="step-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Import Workflow */}
            <div className="workflow-card">
              <div className="workflow-header">
                <h3>Import (Code → Figma)</h3>
                <p>Bring your code tokens into Figma for designers</p>
              </div>

              <div className="workflow-steps">
                {[
                  { step: "1", title: "Export Tokens", desc: "From Token Studio or CLI" },
                  { step: "2", title: "Select Format", desc: "JSON or Figma tokens format" },
                  { step: "3", title: "Upload to Figma", desc: "Use Figma plugin to import" },
                  { step: "4", title: "Create Libraries", desc: "Auto-create color/text styles" },
                  { step: "5", title: "Apply to Designs", desc: "Designers use tokens in Figma" },
                ].map((item) => (
                  <div key={item.step} className="step-item">
                    <div className="step-number success">{item.step}</div>
                    <div className="step-content">
                      <div className="step-title">{item.title}</div>
                      <div className="step-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </div>

        {/* Export Formats */}
        <div className="export-formats-section">
          <h2>Export Formats</h2>

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
              <div key={format.format} className="format-card">
                <h4>{format.format}</h4>
                <p>{format.description}</p>
                <pre>
                  <code>{format.example}</code>
                </pre>
              </div>
            ))}
          </Grid>
          </div>
        </Box>

        {/* CTA */}
        <Box as="section" style={{ display: "contents" }}>
          <div className="figma-cta">
          <h2>Ready to sync with Figma?</h2>
          <p>Install the staple-css Figma plugin to get started with token synchronization</p>
          <div className="cta-buttons">
            <a href="/tokens-studio" className="btn btn-primary">
              Token Studio →
            </a>
            <a href="#figma-plugin" className="btn btn-secondary">
              View Figma Plugin
            </a>
          </div>
          </div>
        </Box>
        </Container>
      </Box>
    </div>
  );
}
