import { Container, Box } from "@staple-css/primitives/full";
import {
  Ruler,
  Palette,
  Type,
  Zap,
  Smartphone,
  Accessibility,
  Box,
  Settings,
} from "lucide-react";
import "./GuidesPage.css";

export function GuidesPage() {
  const guides = [
    {
      icon: Ruler,
      title: "Spacing & Layout",
      points: [
        "Space Scale (0-8): 9 predefined values from 0-4rem",
        "Padding vs Margin: Internal vs component spacing",
        "Intrinsic Responsive: CSS Grid auto-fit/auto-fill with minmax()",
      ],
      color: "var(--st-color-primary)"
    },
    {
      icon: Palette,
      title: "Color & Contrast",
      points: [
        "Semantic Colors: Primary, danger, warning, success tokens",
        "WCAG AA Compliance: All colors meet contrast standards",
        "Light & Dark: Adaptive colors for both themes",
      ],
      color: "#ec4899"
    },
    {
      icon: Type,
      title: "Typography & Text",
      points: [
        "Font Scale (0-6): 12px to 32px with hierarchy",
        "Line Height: Scales with font size (1.25-1.75)",
        "Readable Length: 50-75 characters optimal",
      ],
      color: "#8b5cf6"
    },
    {
      icon: Zap,
      title: "Motion & Animation",
      points: [
        "Duration Scale: Fast (100ms), normal (200ms), slow (300ms)",
        "Easing Functions: Default, in/out for motion",
        "Accessibility: Respect prefers-reduced-motion",
      ],
      color: "#f59e0b"
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      points: [
        "Mobile-First: Start with mobile, enhance for larger screens",
        "Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)",
        "Touch Targets: Minimum 44x44px for interactive elements",
      ],
      color: "#10b981"
    },
    {
      icon: Accessibility,
      title: "Accessibility (a11y)",
      points: [
        "Semantic HTML: Use correct elements for screen readers",
        "Color Contrast: 4.5:1 for normal, 3:1 for large text",
        "Focus Management: All interactive elements keyboard accessible",
      ],
      color: "#06b6d4"
    },
    {
      icon: Box,
      title: "Component Patterns",
      points: [
        "Composition: Combine primitives to create components",
        "Props as Tokens: Accept token keys, not arbitrary values",
        "Escape Hatches: Use className for edge cases",
      ],
      color: "#6366f1"
    },
    {
      icon: Settings,
      title: "Design Tokens Strategy",
      points: [
        "Token Hierarchy: Global → Component → Instance",
        "Naming Convention: Semantic names, not color names",
        "Versioning: Document changes, provide migration guides",
      ],
      color: "#14b8a6"
    },
  ];

  return (
    <Box as="main" className="guides-page">
      <Container size="xl">
        {/* Header */}
        <Box as="section" className="guides-header" style={{ display: "contents" }}>
          <h1>Design Guides & Best Practices</h1>
          <p>Comprehensive guides for building consistent, accessible, and performant interfaces with staple-css tokens and primitives.</p>
        </Box>

        {/* Guides Grid - 2 columns */}
        <Box as="section" className="guides-grid" style={{ display: "contents" }}>
          {guides.map((guide, idx) => {
            const IconComponent = guide.icon;
            return (
              <article key={guide.title} className="guide-card" style={{"--accent-color": guide.color} as React.CSSProperties}>
                <div aria-hidden="true" className="guide-card-number">{String(idx + 1).padStart(2, "0")}</div>
                <div className="guide-card-header">
                  <div aria-hidden="true" className="guide-card-icon">
                    <IconComponent size={20} strokeWidth={1.5} />
                  </div>
                  <h3>{guide.title}</h3>
                </div>
                <ul className="guide-card-points">
                  {guide.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
