import { Column, Container, Text, Card } from "@staple-css/primitives/full";
import { GradientMaker } from "../components/GradientMaker";

export function GradientStudioPage() {
  return (
    <Container size="xl" style={{ paddingTop: "var(--st-space-8)", paddingBottom: "var(--st-space-8)" }}>
      <Column gap={8}>
        {/* Header */}
        <Column gap={4}>
          <Text as="h1" size={5} weight="bold">
            Gradient Studio
          </Text>
          <Text size={2} tone="muted">
            Design and export custom gradients for your design system. Create beautiful,
            accessible gradients with precise control over colors and positions.
          </Text>
        </Column>

        {/* Info Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "var(--st-space-4)" }}>
          <Card pad={4} radius={2} shadow={0} tone="primary">
            <Column gap={2}>
              <Text size={0} weight="semibold" style={{ color: "white" }}>
                🎨 Visual Design
              </Text>
              <Text size={0} style={{ color: "white", opacity: 0.9 }}>
                Interactive editor with live preview
              </Text>
            </Column>
          </Card>
          <Card pad={4} radius={2} shadow={0} tone="success">
            <Column gap={2}>
              <Text size={0} weight="semibold" style={{ color: "white" }}>
                📋 Export Ready
              </Text>
              <Text size={0} style={{ color: "white", opacity: 0.9 }}>
                Copy CSS variables instantly
              </Text>
            </Column>
          </Card>
          <Card pad={4} radius={2} shadow={0} tone="warn">
            <Column gap={2}>
              <Text size={0} weight="semibold" style={{ color: "white" }}>
                ⚡ Presets Included
              </Text>
              <Text size={0} style={{ color: "white", opacity: 0.9 }}>
                Start with beautiful presets
              </Text>
            </Column>
          </Card>
        </div>

        {/* Gradient Maker */}
        <GradientMaker />

        {/* Usage Guide */}
        <Card pad={6} radius={3} shadow={1}>
          <Column gap={4}>
            <Text as="h2" size={3} weight="semibold">
              💡 Usage Guide
            </Text>
            <Column gap={3}>
              <Column gap={1}>
                <Text weight="semibold" size={1}>
                  1. Choose Gradient Type
                </Text>
                <Text size={0} tone="muted">
                  Select between linear and radial gradients. Linear gradients create directional color transitions, while radial gradients expand from a center point.
                </Text>
              </Column>
              <Column gap={1}>
                <Text weight="semibold" size={1}>
                  2. Set Direction/Angle
                </Text>
                <Text size={0} tone="muted">
                  For linear gradients, adjust the angle (0-360 degrees). This determines the direction of the color flow.
                </Text>
              </Column>
              <Column gap={1}>
                <Text weight="semibold" size={1}>
                  3. Create Color Stops
                </Text>
                <Text size={0} tone="muted">
                  Add color stops at different positions. Each stop represents a color and its position in the gradient (0-100%).
                </Text>
              </Column>
              <Column gap={1}>
                <Text weight="semibold" size={1}>
                  4. Name Your Gradient
                </Text>
                <Text size={0} tone="muted">
                  Give your gradient a memorable name. It will be converted to a CSS variable name (kebab-case).
                </Text>
              </Column>
              <Column gap={1}>
                <Text weight="semibold" size={1}>
                  5. Export & Use
                </Text>
                <Text size={0} tone="muted">
                  Copy the CSS variable or gradient code. Use it in your stylesheets as a CSS variable or direct background property.
                </Text>
              </Column>
            </Column>
          </Column>
        </Card>

        {/* Best Practices */}
        <Card pad={6} radius={3} shadow={1}>
          <Column gap={4}>
            <Text as="h2" size={3} weight="semibold">
              ✨ Best Practices
            </Text>
            <Column gap={2}>
              <div>
                <Text weight="semibold" size={0}>
                  Accessibility
                </Text>
                <Text size={0} tone="muted">
                  Ensure sufficient contrast between gradient colors and text. Test your gradients with color contrast checkers.
                </Text>
              </div>
              <div>
                <Text weight="semibold" size={0}>
                  Performance
                </Text>
                <Text size={0} tone="muted">
                  Gradients are GPU-accelerated, but avoid animating complex gradients with many color stops on large elements.
                </Text>
              </div>
              <div>
                <Text weight="semibold" size={0}>
                  Naming Convention
                </Text>
                <Text size={0} tone="muted">
                  Use descriptive names: "sunrise", "ocean-fade", "brand-accent". This makes your token system more intuitive.
                </Text>
              </div>
              <div>
                <Text weight="semibold" size={0}>
                  Color Harmony
                </Text>
                <Text size={0} tone="muted">
                  Use complementary or analogous colors for better visual harmony. Consider using color harmony tools to generate palettes.
                </Text>
              </div>
            </Column>
          </Column>
        </Card>
      </Column>
    </Container>
  );
}
