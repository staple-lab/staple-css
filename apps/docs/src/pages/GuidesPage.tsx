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
      color: "#2a7d52",
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
      color: "#d4a574",
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
      color: "#4a9d72",
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
      <Box className="guides-hero" style={{ background: "linear-gradient(135deg, var(--st-color-background) 0%, rgba(42, 125, 82, 0.03) 100%)" }}>
        <Container size="lg">
          <Column gap={6} style={{ paddingTop: "var(--st-space-8)", paddingBottom: "var(--st-space-8)" }}>
            <Column gap={4} style={{ maxWidth: "700px" }}>
              <Column gap={2}>
                <Text
                  as="h1"
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
                    fontWeight: 800,
                    fontFamily: "var(--st-font-display)",
                    lineHeight: 1.15,
                    margin: 0,
                    color: "var(--st-color-text)",
                  }}
                >
                  Design Guides
                </Text>
                <Text
                  size={1}
                  tone="muted"
                  style={{
                    fontSize: "1.125rem",
                    lineHeight: 1.6,
                    fontWeight: 400,
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
      <Container size="lg" style={{ paddingTop: "var(--st-space-8)", paddingBottom: "var(--st-space-8)" }}>
        <Column gap={16}>
          {guideCategories.map((section) => (
            <Box key={section.category} as="section" style={{ display: "contents" }}>
              {/* Category Header with accent line */}
              <Row gap={3} align="center" style={{ marginBottom: "var(--st-space-6)" }}>
                <div
                  style={{
                    width: "4px",
                    height: "32px",
                    background: section.color,
                    borderRadius: "2px",
                  }}
                />
                <Text
                  as="h2"
                  size={3}
                  weight="bold"
                  style={{
                    fontFamily: "var(--st-font-display)",
                    color: "var(--st-color-text)",
                    margin: 0,
                  }}
                >
                  {section.category}
                </Text>
              </Row>

              {/* Guides Grid */}
              <Grid cols={{ base: 1, md: 2 }} gap={6}>
                {section.guides.map((guide) => {
                  const IconComponent = guide.icon;
                  return (
                    <Box
                      key={guide.title}
                      className="guide-card"
                      style={{
                        padding: "var(--st-space-6)",
                        border: "1px solid var(--st-color-border)",
                        borderRadius: "var(--st-radius-2)",
                        background: "var(--st-color-surface)",
                        transition: "all 180ms cubic-bezier(0.2, 0, 0.38, 0.9)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--st-space-4)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = "0 20px 25px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.1)";
                        e.currentTarget.style.borderColor = section.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)";
                        e.currentTarget.style.borderColor = "var(--st-color-border)";
                      }}
                    >
                      {/* Icon & Title */}
                      <Row gap={3} align="start" style={{ marginBottom: "var(--st-space-2)" }}>
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: section.color,
                            borderRadius: "var(--st-radius-2)",
                            color: "white",
                            flexShrink: 0,
                          }}
                        >
                          <IconComponent size={24} strokeWidth={1.5} />
                        </div>
                        <Column gap={1} style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: "1.25rem",
                              fontWeight: 700,
                              fontFamily: "var(--st-font-display)",
                              color: "var(--st-color-text)",
                              margin: 0,
                              lineHeight: 1.3,
                            }}
                          >
                            {guide.title}
                          </div>
                          <Text size={0} tone="muted" style={{ fontWeight: 500 }}>
                            {guide.description}
                          </Text>
                        </Column>
                      </Row>

                      {/* Details List */}
                      <Column gap={2}>
                        {guide.details.map((detail, i) => (
                          <Row key={i} gap={2} align="start">
                            <div
                              style={{
                                width: "5px",
                                height: "5px",
                                borderRadius: "50%",
                                background: section.color,
                                marginTop: "7px",
                                flexShrink: 0,
                              }}
                            />
                            <Text size={0} tone="muted" style={{ lineHeight: 1.6 }}>
                              {detail}
                            </Text>
                          </Row>
                        ))}
                      </Column>

                      {/* Link Footer */}
                      <Row
                        gap={2}
                        align="center"
                        style={{
                          marginTop: "var(--st-space-2)",
                          paddingTop: "var(--st-space-4)",
                          borderTop: "1px solid var(--st-color-border)",
                        }}
                      >
                        <a
                          href={guide.link}
                          style={{
                            color: section.color,
                            textDecoration: "none",
                            fontWeight: 600,
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--st-space-1)",
                            transition: "gap 150ms ease",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as any).style.gap = "var(--st-space-2)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as any).style.gap = "var(--st-space-1)";
                          }}
                        >
                          Learn more
                          <ArrowRight size={14} strokeWidth={2} />
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
      <Box style={{ background: "linear-gradient(135deg, rgba(42, 125, 82, 0.05) 0%, rgba(212, 165, 116, 0.03) 100%)", marginTop: "var(--st-space-8)" }}>
        <Container size="lg" style={{ paddingTop: "var(--st-space-8)", paddingBottom: "var(--st-space-8)" }}>
          <Column gap={4} align="center" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
            <Column gap={2}>
              <Text as="h2" size={3} weight="bold" style={{ fontFamily: "var(--st-font-display)" }}>
                Ready to build?
              </Text>
              <Text tone="muted">
                Explore the interactive Tokens Studio or dive into the Primitives documentation to start composing beautiful interfaces.
              </Text>
            </Column>
            <Row gap={3} style={{ marginTop: "var(--st-space-4)" }}>
              <a
                href="/tokens-studio"
                style={{
                  padding: "var(--st-space-3) var(--st-space-6)",
                  background: "#2a7d52",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "var(--st-radius-2)",
                  fontWeight: 600,
                  fontSize: "14px",
                  transition: "all 150ms ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as any).style.background = "#4a9d72";
                  (e.currentTarget as any).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as any).style.background = "#2a7d52";
                  (e.currentTarget as any).style.transform = "translateY(0)";
                }}
              >
                Open Token Studio
              </a>
              <a
                href="/primitives"
                style={{
                  padding: "var(--st-space-3) var(--st-space-6)",
                  background: "transparent",
                  color: "#2a7d52",
                  border: "1px solid #2a7d52",
                  textDecoration: "none",
                  borderRadius: "var(--st-radius-2)",
                  fontWeight: 600,
                  fontSize: "14px",
                  transition: "all 150ms ease",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as any).style.background = "rgba(42, 125, 82, 0.05)";
                  (e.currentTarget as any).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as any).style.background = "transparent";
                  (e.currentTarget as any).style.transform = "translateY(0)";
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
