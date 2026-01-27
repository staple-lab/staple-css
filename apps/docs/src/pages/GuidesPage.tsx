import { Container } from "@staple-css/primitives/full";
import {
  Ruler,
  Palette,
  Type,
  Zap,
  Smartphone,
  Accessibility,
  Box,
  Settings,
  ChevronRight,
} from "lucide-react";
import "./GuidesPage.css";

export function GuidesPage() {
  return (
    <div className="guides-page">
      <Container size="xl">
        {/* Header */}
        <div className="guides-header">
          <h1>Design Guides & Best Practices</h1>
          <p>Comprehensive guides for building consistent, accessible, and performant interfaces with staple-css tokens and primitives.</p>
        </div>

        {/* Main Guides - Unique two-column layout with different visual treatment */}
        <div className="guides-grid">
          {/* LEFT COLUMN - CONCEPT / PRINCIPLE */}
          <div className="guides-column guides-column-left">
            {[
              {
                icon: Ruler,
                title: "Spacing & Layout",
                subtitle: "Master the spacing scale",
                principle: "9-step scale from 0-4rem",
                points: [
                  "Space Scale (0-8): Predefined values for consistent visual rhythm",
                  "Padding vs Margin: Internal vs external component spacing",
                  "Intrinsic Responsive: CSS Grid auto-fit/fill with minmax()",
                ]
              },
              {
                icon: Palette,
                title: "Color & Contrast",
                subtitle: "Accessible color system",
                principle: "Semantic intent mapping",
                points: [
                  "Semantic Colors: Primary, danger, warning, success tokens",
                  "WCAG AA: All colors meet contrast standards",
                  "Light & Dark: Adaptive colors for both themes",
                ]
              },
              {
                icon: Type,
                title: "Typography & Text",
                subtitle: "Readable, accessible text",
                principle: "7-step font scale",
                points: [
                  "Font Scale (0-6): 12px to 32px with intentional hierarchy",
                  "Line Height: Scales with font size (1.25-1.75)",
                  "Readable Length: 50-75 characters optimal",
                ]
              },
            ].map((guide) => {
              const IconComponent = guide.icon;
              return (
                <div key={guide.title} className="guide-concept">
                  <div className="concept-icon">
                    <IconComponent size={20} strokeWidth={1.5} />
                  </div>
                  <div className="concept-content">
                    <h3>{guide.title}</h3>
                    <p className="concept-subtitle">{guide.subtitle}</p>
                    <div className="concept-principle">{guide.principle}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN - DETAILS / IMPLEMENTATION */}
          <div className="guides-column guides-column-right">
            {[
              {
                details: [
                  "Use padding for internal spacing within components",
                  "Use margin for spacing between components",
                  "Creates predictable, composable layouts",
                  "Prefer CSS Grid with auto-fit/auto-fill",
                  "Eliminates media query bloat",
                  "Creates truly fluid designs",
                ]
              },
              {
                details: [
                  "Use semantic colors instead of arbitrary values",
                  "Ensures consistency and enables theme switching",
                  "Text on backgrounds always sufficient contrast",
                  "Staple-css provides adaptive colors",
                  "Semantic mapping ensures consistent intent",
                  "Don't rely on color alone for information",
                ]
              },
              {
                details: [
                  "Higher sizes for headings, lower for body text",
                  "Tight for headlines (1.25), normal for body (1.5), relaxed for long-form (1.75)",
                  "Keep line length between 50-75 characters",
                  "Use weight strategically: normal (400), medium (500), semibold (600), bold (700)",
                  "Body text: normal weight, emphasis: medium or semibold",
                  "Interactive elements: semibold for visual prominence",
                ]
              },
            ].map((section, idx) => (
              <div key={idx} className="guide-details">
                <ul>
                  {section.details.map((detail, i) => (
                    <li key={i}>
                      <span className="detail-dot">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM GRID - Different visual style */}
        <div className="guides-bottom">
          <div className="guides-section-title">More Guides</div>

          <div className="bottom-grid">
            {[
              {
                icon: Zap,
                title: "Motion & Animation",
                points: ["Duration Scale", "Easing Functions", "When to Animate", "Accessibility"]
              },
              {
                icon: Smartphone,
                title: "Responsive Design",
                points: ["Mobile-First Approach", "Breakpoints", "Intrinsic Sizing", "Touch Targets"]
              },
              {
                icon: Accessibility,
                title: "Accessibility (a11y)",
                points: ["Semantic HTML", "Color Contrast", "Focus Management", "ARIA & Labels"]
              },
              {
                icon: Box,
                title: "Component Patterns",
                points: ["Composition", "Props as Tokens", "Escape Hatches", "Responsive Props"]
              },
              {
                icon: Settings,
                title: "Design Tokens Strategy",
                points: ["Token Hierarchy", "Naming Convention", "Versioning", "Governance"]
              },
            ].map((guide) => {
              const IconComponent = guide.icon;
              return (
                <div key={guide.title} className="bottom-card">
                  <div className="bottom-card-icon">
                    <IconComponent size={24} strokeWidth={1.5} />
                  </div>
                  <h4>{guide.title}</h4>
                  <div className="bottom-card-points">
                    {guide.points.map((point, i) => (
                      <div key={i} className="point">{point}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
