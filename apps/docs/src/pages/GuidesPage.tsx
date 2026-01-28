import { Container, Column, Row, Text, Box, Grid } from "@staple-css/primitives/full";
import {
  Ruler,
  Palette,
  Type,
  Zap,
  Smartphone,
  Accessibility,
  Settings,
} from "lucide-react";
import "./GuidesPage.css";

export function GuidesPage() {
  const guides = [
    {
      number: "01",
      icon: Ruler,
      title: "Spacing & Layout",
      description: "Master the spacing scale and create intrinsic responsive layouts",
      points: [
        "Space Scale (0-8): 9 predefined values from 0-4rem",
        "Padding vs Margin: Internal vs component spacing",
        "Intrinsic Responsive: CSS Grid auto-fit/auto-fill with minmax()",
      ],
    },
    {
      number: "02",
      icon: Palette,
      title: "Color & Contrast",
      description: "Build accessible color systems with semantic tokens",
      points: [
        "Semantic Colors: Primary, danger, warning, success tokens",
        "WCAG AA Compliance: All colors meet contrast standards",
        "Light & Dark: Adaptive colors for both themes",
      ],
    },
    {
      number: "03",
      icon: Type,
      title: "Typography & Text",
      description: "Establish visual hierarchy through intentional typography",
      points: [
        "Font Scale (0-6): 12px to 32px with hierarchy",
        "Line Height: Scales with font size (1.25-1.75)",
        "Readable Length: 50-75 characters optimal",
      ],
    },
    {
      number: "04",
      icon: Zap,
      title: "Motion & Animation",
      description: "Create smooth, respectful transitions and animations",
      points: [
        "Duration Scale: Fast (100ms), normal (200ms), slow (300ms)",
        "Easing Functions: Default, in/out for motion",
        "Accessibility: Respect prefers-reduced-motion",
      ],
    },
    {
      number: "05",
      icon: Smartphone,
      title: "Responsive Design",
      description: "Design mobile-first with intentional breakpoints",
      points: [
        "Mobile-First: Start with mobile, enhance for larger screens",
        "Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)",
        "Touch Targets: Minimum 44x44px for interactive elements",
      ],
    },
    {
      number: "06",
      icon: Accessibility,
      title: "Accessibility (a11y)",
      description: "Build with accessibility as a core requirement",
      points: [
        "Semantic HTML: Use correct elements for screen readers",
        "Color Contrast: 4.5:1 for normal, 3:1 for large text",
        "Focus Management: All interactive elements keyboard accessible",
      ],
    },
    {
      number: "07",
      icon: Settings,
      title: "Component Patterns",
      description: "Compose primitives into cohesive components",
      points: [
        "Composition: Combine primitives to create components",
        "Props as Tokens: Accept token keys, not arbitrary values",
        "Escape Hatches: Use className for edge cases",
      ],
    },
    {
      number: "08",
      icon: Box,
      title: "Design Tokens Strategy",
      description: "Structure tokens for maintainability and scale",
      points: [
        "Token Hierarchy: Global → Component → Instance",
        "Naming Convention: Semantic names, not color names",
        "Versioning: Document changes, provide migration guides",
      ],
    },
  ];

  return (
    <Box as="main" className="guides-page">
      <Container size="lg">
        <Column gap={8}>
          {/* Header */}
          <Column gap={2}>
            <Text as="h1" size={5} weight="bold">
              Design Guides & Best Practices
            </Text>
            <Text tone="muted">
              Comprehensive guides for building consistent, accessible, and performant interfaces with staple-css tokens and primitives.
            </Text>
          </Column>

          {/* Guides Grid - 2 columns */}
          <Grid cols={{ base: 1, md: 2 }} gap={4}>
            {guides.map((guide) => {
              const IconComponent = guide.icon;
              return (
                <Box
                  key={guide.title}
                  className="guide-card"
                  style={{
                    padding: "var(--st-space-5)",
                    border: "1px solid var(--st-color-border)",
                    borderRadius: "var(--st-radius-2)",
                    background: "var(--st-color-surface)",
                    transition: "all 150ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
                    e.currentTarget.style.borderColor = "var(--st-color-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "var(--st-color-border)";
                  }}
                >
                  <Column gap={3}>
                    {/* Guide number + icon + title */}
                    <Row gap={3} align="start">
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: 800,
                          fontFamily: "var(--st-font-display)",
                          color: "var(--st-color-primary)",
                          opacity: 0.3,
                          minWidth: "32px",
                        }}
                      >
                        {guide.number}
                      </div>
                      <Column gap={2} style={{ flex: 1 }}>
                        <Row gap={2} align="center">
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "rgba(42, 125, 82, 0.1)",
                              borderRadius: "var(--st-radius-1)",
                              color: "var(--st-color-primary)",
                              flexShrink: 0,
                            }}
                          >
                            <IconComponent size={18} strokeWidth={1.5} />
                          </div>
                          <Text as="h3" size={2} weight="semibold">
                            {guide.title}
                          </Text>
                        </Row>
                        <Text size={0} tone="muted" style={{ fontStyle: "italic" }}>
                          {guide.description}
                        </Text>
                      </Column>
                    </Row>

                    {/* Points list */}
                    <Column gap={2} style={{ marginTop: "var(--st-space-2)" }}>
                      {guide.points.map((point, i) => (
                        <Row key={i} gap={2} align="start" style={{ fontSize: "14px" }}>
                          <span
                            style={{
                              color: "var(--st-color-primary)",
                              fontWeight: 600,
                              flexShrink: 0,
                              marginTop: "2px",
                            }}
                          >
                            •
                          </span>
                          <Text size={0} tone="muted" style={{ lineHeight: 1.5 }}>
                            {point}
                          </Text>
                        </Row>
                      ))}
                    </Column>
                  </Column>
                </Box>
              );
            })}
          </Grid>
        </Column>
      </Container>
    </Box>
  );
}
