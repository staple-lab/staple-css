import { Column, Row, Text, Card, Grid, Box, Container } from "@staple-css/primitives/full";

interface GradientDefinition {
  name: string;
  description: string;
  cssVariable: string;
  category: "tone" | "vibrant" | "overlay";
}

const gradients: GradientDefinition[] = [
  // Tone-based gradients
  {
    name: "Neutral Soft",
    description: "Light neutral gradient for subtle backgrounds",
    cssVariable: "--st-gradient-neutral-soft",
    category: "tone",
  },
  {
    name: "Neutral Medium",
    description: "Medium neutral gradient for balanced contrast",
    cssVariable: "--st-gradient-neutral-medium",
    category: "tone",
  },
  {
    name: "Neutral Bold",
    description: "Dark neutral gradient for emphasis",
    cssVariable: "--st-gradient-neutral-bold",
    category: "tone",
  },
  {
    name: "Primary Soft",
    description: "Light blue gradient for primary accents",
    cssVariable: "--st-gradient-primary-soft",
    category: "tone",
  },
  {
    name: "Primary Medium",
    description: "Medium blue gradient for brand colors",
    cssVariable: "--st-gradient-primary-medium",
    category: "tone",
  },
  {
    name: "Primary Bold",
    description: "Dark blue gradient for strong actions",
    cssVariable: "--st-gradient-primary-bold",
    category: "tone",
  },
  {
    name: "Danger Soft",
    description: "Light red gradient for warning states",
    cssVariable: "--st-gradient-danger-soft",
    category: "tone",
  },
  {
    name: "Danger Medium",
    description: "Medium red gradient for destructive actions",
    cssVariable: "--st-gradient-danger-medium",
    category: "tone",
  },
  {
    name: "Danger Bold",
    description: "Dark red gradient for critical alerts",
    cssVariable: "--st-gradient-danger-bold",
    category: "tone",
  },
  {
    name: "Warning Soft",
    description: "Light orange gradient for cautions",
    cssVariable: "--st-gradient-warn-soft",
    category: "tone",
  },
  {
    name: "Warning Medium",
    description: "Medium orange gradient for warnings",
    cssVariable: "--st-gradient-warn-medium",
    category: "tone",
  },
  {
    name: "Warning Bold",
    description: "Dark orange gradient for emphasis",
    cssVariable: "--st-gradient-warn-bold",
    category: "tone",
  },
  {
    name: "Success Soft",
    description: "Light green gradient for confirmation",
    cssVariable: "--st-gradient-success-soft",
    category: "tone",
  },
  {
    name: "Success Medium",
    description: "Medium green gradient for success states",
    cssVariable: "--st-gradient-success-medium",
    category: "tone",
  },
  {
    name: "Success Bold",
    description: "Dark green gradient for positive feedback",
    cssVariable: "--st-gradient-success-bold",
    category: "tone",
  },
  // Vibrant multi-color gradients
  {
    name: "Sunrise",
    description: "Warm orange-to-coral gradient for energetic designs",
    cssVariable: "--st-gradient-sunrise",
    category: "vibrant",
  },
  {
    name: "Sunset",
    description: "Orange-to-pink gradient for warm vibes",
    cssVariable: "--st-gradient-sunset",
    category: "vibrant",
  },
  {
    name: "Ocean",
    description: "Blue-to-teal gradient for cool designs",
    cssVariable: "--st-gradient-ocean",
    category: "vibrant",
  },
  {
    name: "Forest",
    description: "Green gradient for natural, earthy feels",
    cssVariable: "--st-gradient-forest",
    category: "vibrant",
  },
  {
    name: "Grape",
    description: "Purple-to-pink gradient for creative designs",
    cssVariable: "--st-gradient-grape",
    category: "vibrant",
  },
  {
    name: "Mint",
    description: "Teal-to-cyan gradient for fresh designs",
    cssVariable: "--st-gradient-mint",
    category: "vibrant",
  },
  // Overlay gradients
  {
    name: "Diagonal Light",
    description: "Semi-transparent light overlay for text overlays",
    cssVariable: "--st-gradient-diagonal-light",
    category: "overlay",
  },
  {
    name: "Diagonal Dark",
    description: "Semi-transparent dark overlay for text overlays",
    cssVariable: "--st-gradient-diagonal-dark",
    category: "overlay",
  },
  {
    name: "Shimmer",
    description: "Animated shimmer gradient for loading states",
    cssVariable: "--st-gradient-shimmer",
    category: "overlay",
  },
];

export function GradientsPage() {
  return (
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
              Gradient Tokens
            </Text>
            <Text tone="muted" style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              maxWidth: "65ch",
              fontWeight: 400
            }}>
              Pre-defined, perceptually-smooth gradients for modern, accessible design. OKLCH-generated for visual harmony.
            </Text>
          </Column>
        </Container>
      </Box>

      <Container size="lg" style={{ paddingTop: "var(--st-space-8)", paddingBottom: "var(--st-space-8)" }}>
        <Column gap={8}>
          <Text>
            Apply gradients via the <code style={{ fontFamily: "var(--st-font-mono)" }}>background</code>
            {" "}or{" "}
            <code style={{ fontFamily: "var(--st-font-mono)" }}>background-image</code> CSS
            properties.
          </Text>

          {/* Usage Section */}
          <Card pad={6} radius={3} shadow={1}>
        <Column gap={4}>
          <Text as="h2" size={3} weight="semibold">
            How to Use
          </Text>
          <Text>Apply gradients via CSS variables:</Text>
          <pre
            style={{
              background: "var(--st-color-surface)",
              padding: "var(--st-space-4)",
              borderRadius: "var(--st-radius-2)",
              overflow: "auto",
              fontSize: "var(--st-font-size-1)",
              fontFamily: "var(--st-font-mono)",
              border: "1px solid var(--st-color-border)",
            }}
          >
            <code>
              {`.hero {
  background: var(--st-gradient-sunrise);
  /* or */
  background-image: var(--st-gradient-ocean);
}`}
            </code>
          </pre>
        </Column>
      </Card>
        </Column>
      </Container>

      {/* Tone-based Gradients */}
      <Container size="lg" style={{ paddingTop: "var(--st-space-6)", paddingBottom: "var(--st-space-6)" }}>
        <Column gap={8}>
          <Column gap={4}>
            <Text as="h2" size={3} weight="semibold">
              Tone-Based Gradients
            </Text>
            <Text size={1} tone="muted">
              Systematic gradients for each tone (neutral, primary, danger, warning, success)
              in three intensities: soft, medium, and bold.
            </Text>
            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
              {gradients
                .filter((g) => g.category === "tone")
                .map((gradient) => (
                  <GradientCard key={gradient.cssVariable} gradient={gradient} />
                ))}
            </Grid>
          </Column>

          {/* Vibrant Gradients */}
          <Column gap={4}>
            <Text as="h2" size={3} weight="semibold">
              Vibrant Multi-Color Gradients
            </Text>
            <Text size={1} tone="muted">
              Expressive, multi-color gradients for showcase sections, hero images, and
              creative designs.
            </Text>
            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
              {gradients
                .filter((g) => g.category === "vibrant")
                .map((gradient) => (
                  <GradientCard key={gradient.cssVariable} gradient={gradient} />
                ))}
            </Grid>
          </Column>

          {/* Overlay Gradients */}
          <Column gap={4}>
            <Text as="h2" size={3} weight="semibold">
              Overlay Gradients
            </Text>
            <Text size={1} tone="muted">
              Semi-transparent and shimmer gradients for overlays, loading states, and text
              contrast.
            </Text>
            <Grid cols={{ base: 1, md: 2 }} gap={4}>
              {gradients
                .filter((g) => g.category === "overlay")
                .map((gradient) => (
                  <GradientCard key={gradient.cssVariable} gradient={gradient} />
                ))}
            </Grid>
          </Column>

          {/* Integration Section */}
          <Card pad={6} radius={3} shadow={1} tone="primary">
            <Column gap={3}>
              <Text as="h2" size={3} weight="semibold" color="white">
                Integration with Gradient Maker
              </Text>
              <Text size={1} style={{ color: "white", opacity: 0.9 }}>
                Visit the <strong>Studio</strong> page to create custom gradients and manage
                your design system's gradient tokens.
              </Text>
            </Column>
          </Card>
        </Column>
      </Container>
    </Box>
  );
}

function GradientCard({ gradient }: { gradient: GradientDefinition }) {
  const gradientValue = `var(${gradient.cssVariable})`;

  return (
    <Card pad={0} radius={3} shadow={1} style={{ overflow: "hidden" }}>
      <Column gap={0}>
        {/* Gradient Preview */}
        <Box
          style={{
            height: "120px",
            background: gradientValue,
            borderBottom: "1px solid var(--st-color-border)",
          }}
        />

        {/* Content */}
        <Column gap={2} style={{ padding: "var(--st-space-4)" }}>
          <Text weight="semibold" size={1}>
            {gradient.name}
          </Text>
          <Text size={0} tone="muted">
            {gradient.description}
          </Text>
          <code
            style={{
              fontSize: "var(--st-font-size-0)",
              fontFamily: "var(--st-font-mono)",
              background: "var(--st-color-surface)",
              padding: "var(--st-space-2)",
              borderRadius: "var(--st-radius-1)",
              color: "var(--st-color-text-muted)",
              wordBreak: "break-all",
            }}
          >
            {gradient.cssVariable}
          </code>
        </Column>
      </Column>
    </Card>
    );
  }
