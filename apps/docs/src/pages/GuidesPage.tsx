import { Container, Column, Text, Grid } from "@staple-css/primitives/full";
import {
  Ruler,
  Palette,
  Type,
  Zap,
  Smartphone,
  Accessibility,
  Zap as Performance,
  Box,
  Settings,
  Code,
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

        {/* Main Guides Grid */}
        <Grid cols={{ base: 1, md: 2 }} gap={4}>
          {/* Spacing & Layout */}
          <GuideCard
            icon={Ruler}
            title="Spacing & Layout"
            description="Master the spacing scale and create balanced layouts"
            sections={[
              {
                heading: "Space Scale (0-8)",
                content: "The space scale provides 9 predefined spacing values from 0 to 4rem. Use these consistently throughout your interface to maintain visual rhythm.",
              },
              {
                heading: "Padding vs Margin",
                content: "Use padding for internal spacing within components. Use margin for spacing between components. This creates predictable, composable layouts.",
              },
              {
                heading: "Intrinsic Responsive Design",
                content: "Prefer CSS Grid with auto-fit/auto-fill and minmax() for responsive layouts. This eliminates media query bloat and creates truly fluid designs.",
              },
            ]}
          />

          {/* Color & Contrast */}
          <GuideCard
            icon={Palette}
            title="Color & Contrast"
            description="Use semantic colors for accessible, maintainable interfaces"
            sections={[
              {
                heading: "Semantic Color Tokens",
                content: "Use semantic colors (primary, danger, warning, success) instead of arbitrary colors. This ensures consistency and enables theme switching.",
              },
              {
                heading: "WCAG Compliance",
                content: "All staple-css colors meet WCAG AA standards for contrast. Text on backgrounds always has sufficient contrast for accessibility.",
              },
              {
                heading: "Light & Dark Themes",
                content: "Staple-css provides adaptive colors for both light and dark modes. The semantic mapping ensures consistent intent across themes.",
              },
            ]}
          />

          {/* Typography */}
          <GuideCard
            icon={Type}
            title="Typography & Text"
            description="Create readable, accessible text experiences"
            sections={[
              {
                heading: "Font Scale (0-6)",
                content: "The 7-step font scale (12px to 32px) provides intentional typographic hierarchy. Use higher sizes for headings, lower for body text.",
              },
              {
                heading: "Line Height & Spacing",
                content: "Line heights scale with font size: tighter for headlines (1.25), normal for body (1.5), relaxed for long-form (1.75).",
              },
              {
                heading: "Readable Line Length",
                content: "Keep line length between 50-75 characters for optimal readability. Use max-width tokens for different content types.",
              },
            ]}
          />

          {/* Motion & Animation */}
          <GuideCard
            icon={Zap}
            title="Motion & Animation"
            description="Create smooth, purposeful interactions"
            sections={[
              {
                heading: "Duration Scale",
                content: "Fast (100ms) for micro-interactions, normal (200ms) for standard transitions, slow (300ms) for dramatic effects.",
              },
              {
                heading: "Easing Functions",
                content: "Use default easing for most animations. In/out for directional motion. Always feel responsive and purposeful.",
              },
              {
                heading: "Accessibility",
                content: "Always check prefers-reduced-motion. Provide instant feedback alongside animations. Keep animations under 300ms.",
              },
            ]}
          />

          {/* Responsive Design */}
          <GuideCard
            icon={Smartphone}
            title="Responsive Design"
            description="Build fluid, mobile-first interfaces"
            sections={[
              {
                heading: "Mobile-First Approach",
                content: "Start with mobile styles. Add breakpoints to enhance larger screens. This ensures core functionality works everywhere.",
              },
              {
                heading: "Breakpoints",
                content: "Staple-css provides Tailwind-style breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px).",
              },
              {
                heading: "Intrinsic Sizing",
                content: 'Use "max(1rem, 2vw)" and "clamp()" for fluid sizing. Use CSS Grid auto-fit for adaptive columns. Minimize media queries.',
              },
            ]}
          />

          {/* Accessibility */}
          <GuideCard
            icon={Accessibility}
            title="Accessibility (a11y)"
            description="Build inclusive interfaces for everyone"
            sections={[
              {
                heading: "Semantic HTML",
                content: "Use semantic elements: <button> for actions, <nav> for navigation, <main> for content. Screen readers rely on correct markup.",
              },
              {
                heading: "Color Contrast",
                content: "Minimum 4.5:1 for normal text, 3:1 for large text (WCAG AA). Check with contrast checkers. Don't rely on color alone.",
              },
              {
                heading: "Focus Management",
                content: "All interactive elements must be keyboard accessible. Use :focus-visible for clear focus indicators. Test keyboard-only navigation.",
              },
            ]}
          />

          {/* Performance */}
          <GuideCard
            icon={Performance}
            title="Performance"
            description="Build fast, efficient interfaces"
            sections={[
              {
                heading: "CSS Variables",
                content: "Staple-css uses only CSS variables—no JavaScript parsing. Variables are inherited and scoped. Zero runtime overhead.",
              },
              {
                heading: "Static CSS",
                content: "All CSS is generated statically. No runtime style generation. Tree-shakeable modules. Minimal dependencies.",
              },
              {
                heading: "Bundle Size",
                content: "Tokens package: ~2KB gzipped. Primitives package: ~4KB gzipped. Full system with tokens.css: under 10KB gzipped.",
              },
            ]}
          />

          {/* Component Patterns */}
          <GuideCard
            icon={Box}
            title="Component Patterns"
            description="Common patterns for building components"
            sections={[
              {
                heading: "Composition Over Configuration",
                content: "Combine Box, Flex, Column, Row to create components. Each primitive is simple. Power comes from composition.",
              },
              {
                heading: "Props as Tokens",
                content: "Component props accept only token keys (space: 0-8, radius: 0-4). No arbitrary values. Consistency by default.",
              },
              {
                heading: "Escape Hatches",
                content: "Use className or style prop to override. The happy path keeps you in tokens. Escape hatches for edge cases.",
              },
            ]}
          />

          {/* Design Tokens */}
          <GuideCard
            icon={Settings}
            title="Design Tokens Strategy"
            description="Implement tokens across your design system"
            sections={[
              {
                heading: "Token Hierarchy",
                content: "Global tokens → Component tokens → Instance tokens. Inherit from above. Single source of truth.",
              },
              {
                heading: "Naming Convention",
                content: "Use semantic names: primary-soft, danger-bold. Avoid color names. Future-proof naming conventions.",
              },
              {
                heading: "Versioning",
                content: "Document token changes in CHANGELOG. Breaking changes warrant major version bumps. Provide migration guides.",
              },
            ]}
          />
        </Grid>

        {/* Advanced Topics */}
        <div className="advanced-section">
          <h2>Advanced Topics</h2>
          <div className="advanced-grid">
            {[
              {
                title: "Custom Themes",
                description: "Build custom color themes on top of staple-css. Export from Figma, import tokens. Supports unlimited themes.",
              },
              {
                title: "Dynamic Theming",
                description: "Switch themes at runtime. Use data-theme attribute. Works with localStorage for persistence.",
              },
              {
                title: "Density Modes",
                description: "Implement comfortable and compact UI modes. Automatically scales spacing and sizing.",
              },
              {
                title: "Multi-Brand",
                description: "Manage multiple brands with shared core tokens. Override specific tokens per brand.",
              },
              {
                title: "Figma Integration",
                description: "Export tokens from Figma to CSS variables. Import color palettes. Keep design and code in sync.",
              },
              {
                title: "Performance Optimization",
                description: "Analyze bundle impact. Tree-shake unused tokens. Minimize CSS. Track metrics over time.",
              },
            ].map((topic) => (
              <div key={topic.title} className="advanced-item">
                <h4>{topic.title}</h4>
                <p>{topic.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reference */}
        <div className="quick-reference">
          <h2>Quick Reference</h2>
          <div className="reference-grid">
            {[
              { label: "Space Scale", value: "0-8 (0 to 4rem)" },
              { label: "Radius Scale", value: "0-4 (0 to 1rem)" },
              { label: "Font Sizes", value: "0-6 (12px to 32px)" },
              { label: "Font Weights", value: "400, 500, 600, 700" },
              { label: "Breakpoints", value: "sm, md, lg, xl, 2xl" },
              { label: "Colors", value: "Semantic (light/dark)" },
              { label: "Durations", value: "75ms to 1000ms" },
              { label: "Easings", value: "default, in, out, inOut" },
              { label: "Shadows", value: "0-5 elevation levels" },
            ].map((item) => (
              <div key={item.label} className="reference-item">
                <div className="reference-label">{item.label}</div>
                <div className="reference-value">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

interface Section {
  heading: string;
  content: string;
}

interface GuideCardProps {
  icon: React.ComponentType<{ size: number; strokeWidth: number }>;
  title: string;
  description: string;
  sections: Section[];
}

function GuideCard({ icon: IconComponent, title, description, sections }: GuideCardProps) {
  return (
    <div className="guide-card">
      <div className="guide-card-header">
        <div className="guide-icon">
          <IconComponent size={24} strokeWidth={1.5} />
        </div>
        <div className="guide-card-title-section">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      <div className="guide-card-content">
        {sections.map((section, idx) => (
          <div key={idx} className="guide-section">
            <h4>{section.heading}</h4>
            <p>{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
