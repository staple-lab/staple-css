import { Container, Column, Row, Text, Box, Grid } from "@staple-css/primitives/full";
import {
  Ruler,
  Palette,
  Type,
  Zap,
  Smartphone,
  Accessibility,
  Settings,
  Package,
  ArrowRight,
} from "lucide-react";
import "./GuidesPage.css";

export function GuidesPage() {
  const guideCategories = [
    {
      category: "Foundation",
      color: "#3b82f6",
      guides: [
        {
          icon: Ruler,
          title: "Spacing & Layout",
          description: "Master the spacing scale and create layouts that breathe.",
          details: [
            "9-step space scale (0-8) from 0 to 4rem",
            "Intrinsic responsive design with CSS Grid",
            "Padding for internal spacing, margin for external",
          ],
          link: "/tokens#spacing",
        },
        {
          icon: Palette,
          title: "Color & Contrast",
          description: "Build systems with accessible, semantic colors.",
          details: [
            "Semantic token names over color names",
            "WCAG AA compliance by default",
            "Light & dark modes with adaptive tokens",
          ],
          link: "/colors",
        },
      ],
    },
    {
      category: "Design System",
      color: "#8b5cf6",
      guides: [
        {
          icon: Type,
          title: "Typography & Text",
          description: "Establish hierarchy through intentional type choices.",
          details: [
            "7-step scale (0-6) for readable proportions",
            "Dynamic line heights that scale with size",
            "Optimal line lengths (50-75 characters)",
          ],
          link: "/tokens#typography",
        },
        {
          icon: Zap,
          title: "Motion & Animation",
          description: "Create smooth, respectful micro-interactions.",
          details: [
            "Duration scale: fast (100ms), normal (200ms), slow (300ms)",
            "Consistent easing functions across the system",
            "Respect prefers-reduced-motion preference",
          ],
          link: "/tokens#motion",
        },
      ],
    },
    {
      category: "Implementation",
      color: "#22c55e",
      guides: [
        {
          icon: Smartphone,
          title: "Responsive Design",
          description: "Design mobile-first with intentional breakpoints.",
          details: [
            "5 breakpoints from mobile to wide (0, 640px, 768px, 1024px, 1280px)",
            "Mobile-first approach: enhance for larger screens",
            "48px minimum touch targets for accessibility",
          ],
          link: "/tokens#breakpoints",
        },
        {
          icon: Accessibility,
          title: "Accessibility (a11y)",
          description: "Build with accessibility as a core requirement.",
          details: [
            "Semantic HTML and ARIA roles throughout",
            "4.5:1 contrast ratio for normal text, 3:1 for large",
            "Full keyboard navigation on all interactive elements",
          ],
          link: "/guides#accessibility",
        },
      ],
    },
    {
      category: "Composition",
      color: "#8b5cf6",
      guides: [
        {
          icon: Settings,
          title: "Component Patterns",
          description: "Compose primitives into cohesive, reusable components.",
          details: [
            "Combine Box, Row, Column, Grid for any layout",
            "Props accept token keys, never arbitrary values",
            "className escape hatch for edge cases only",
          ],
          link: "/primitives",
        },
        {
          icon: Package,
          title: "Token Strategy",
          description: "Structure tokens for maintainability at scale.",
          details: [
            "3-tier hierarchy: global, component, instance",
            "Semantic naming: use semantic-role, not colors",
            "Version and document all token changes",
          ],
          link: "/token-reference",
        },
      ],
    },
  ];

  return (
    <Box as="main" className="guides-page">
      {/* Hero Section */}
      <Box className="guides-hero">
        <Container size="lg">
          <Column gap={6} style={{ padding: "48px 0" }}>
            <Column gap={4} style={{ maxWidth: "700px" }}>
              <Column gap={2}>
                <Text
                  as="h1"
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                    fontWeight: 700,
                    fontFamily: "var(--st-font-display)",
                    lineHeight: 1.15,
                    margin: 0,
                    color: "var(--st-color-text)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Design Guides
                </Text>
                <Text
                  size={1}
                  tone="muted"
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.6,
                    fontWeight: 400,
                    color: "var(--st-color-text-muted)",
                  }}
                >
                  Learn the principles and patterns that make staple-css powerful. Organized by foundation, design system, implementation, and composition.
                </Text>
              </Column>
            </Column>
          </Column>
        </Container>
      </Box>

      {/* Guides by Category */}
      <Container size="lg" style={{ padding: "48px 0" }}>
        <Column gap={8}>
          {guideCategories.map((section) => (
            <Box key={section.category} as="section" style={{ display: "contents" }}>
              {/* Category Header */}
              <Text
                as="h2"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  fontFamily: "var(--st-font-display)",
                  color: "var(--st-color-text)",
                  margin: 0,
                }}
              >
                {section.category}
              </Text>

              {/* Guides Grid */}
              <Grid cols={{ base: 1, md: 2 }} gap={6}>
                {section.guides.map((guide) => {
                  const IconComponent = guide.icon;
                  return (
                    <Box
                      key={guide.title}
                      className="guide-card"
                      style={{
                        padding: "24px",
                        border: "1px solid rgba(0,0,0,0.06)",
                        borderRadius: "12px",
                        background: "var(--st-color-background)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--st-space-4)",
                      }}
                    >
                      {/* Icon & Title */}
                      <Row gap={3} align="start">
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(0,0,0,0.04)",
                            borderRadius: "8px",
                            color: "var(--st-color-text-muted)",
                            flexShrink: 0,
                          }}
                        >
                          <IconComponent size={16} strokeWidth={1.5} />
                        </div>
                        <Column gap={1} style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: "15px",
                              fontWeight: 600,
                              color: "var(--st-color-text)",
                              margin: 0,
                              lineHeight: 1.3,
                            }}
                          >
                            {guide.title}
                          </div>
                          <div
                            style={{
                              fontSize: "13px",
                              color: "var(--st-color-text-muted)",
                              lineHeight: 1.5,
                            }}
                          >
                            {guide.description}
                          </div>
                        </Column>
                      </Row>

                      {/* Details List */}
                      <Column gap={2}>
                        {guide.details.map((detail, i) => (
                          <Row key={i} gap={2} align="start">
                            <span
                              style={{
                                fontSize: "13px",
                                color: "var(--st-color-text-muted)",
                                lineHeight: 1.6,
                                flexShrink: 0,
                              }}
                            >
                              ·
                            </span>
                            <span
                              style={{
                                fontSize: "13px",
                                color: "var(--st-color-text-muted)",
                                lineHeight: 1.6,
                              }}
                            >
                              {detail}
                            </span>
                          </Row>
                        ))}
                      </Column>

                      {/* Link Footer */}
                      <Row
                        gap={2}
                        align="center"
                        style={{
                          marginTop: "auto",
                          paddingTop: "var(--st-space-4)",
                          borderTop: "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        <a
                          href={guide.link}
                          style={{
                            color: "var(--st-color-text-muted)",
                            textDecoration: "none",
                            fontWeight: 500,
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          Learn more
                          <ArrowRight size={13} strokeWidth={2} />
                        </a>
                      </Row>
                    </Box>
                  );
                })}
              </Grid>
            </Box>
          ))}
        </Column>
      </Container>

      {/* CTA Section */}
      <Box style={{ padding: "48px 0" }}>
        <Container size="lg">
          <Column gap={4} align="center" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
            <Column gap={2}>
              <Text
                as="h2"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  fontFamily: "var(--st-font-display)",
                  color: "var(--st-color-text)",
                  margin: 0,
                }}
              >
                Ready to build?
              </Text>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--st-color-text-muted)",
                  lineHeight: 1.6,
                }}
              >
                Explore the interactive Tokens Studio or dive into the Primitives documentation to start composing beautiful interfaces.
              </div>
            </Column>
            <Row gap={3} style={{ marginTop: "8px" }}>
              <a
                href="/tokens-studio"
                style={{
                  padding: "10px 24px",
                  background: "var(--st-color-text)",
                  color: "var(--st-color-background)",
                  textDecoration: "none",
                  borderRadius: "999px",
                  fontWeight: 500,
                  fontSize: "14px",
                  display: "inline-block",
                }}
              >
                Open Token Studio
              </a>
              <a
                href="/primitives"
                style={{
                  padding: "10px 24px",
                  background: "transparent",
                  color: "var(--st-color-text)",
                  border: "1px solid rgba(0,0,0,0.12)",
                  textDecoration: "none",
                  borderRadius: "999px",
                  fontWeight: 500,
                  fontSize: "14px",
                  display: "inline-block",
                }}
              >
                Explore Primitives
              </a>
            </Row>
          </Column>
        </Container>
      </Box>
    </Box>
  );
}
