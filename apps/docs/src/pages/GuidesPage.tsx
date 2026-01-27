import { Container, Column, Row, Text, Card, Box, Grid } from "@staple-css/primitives/full";

export function GuidesPage() {
  return (
    <Container size="xl" style={{ paddingTop: "var(--st-space-8)", paddingBottom: "var(--st-space-8)" }}>
      <Column gap={8}>
        {/* Header */}
        <Column gap={4}>
          <Text as="h1" size={5} weight="bold">
            Design Guides & Best Practices
          </Text>
          <Text size={2} tone="muted">
            Comprehensive guides for building consistent, accessible, and performant interfaces
            with staple-css tokens and primitives.
          </Text>
        </Column>

        {/* Main Guides Grid */}
        <Grid cols={{ base: 1, md: 2 }} gap={6}>
          {/* Spacing & Layout */}
          <GuideCard
            title="Spacing & Layout"
            description="Master the spacing scale and create balanced layouts"
            icon="📐"
            sections={[
              {
                heading: "Space Scale (0-8)",
                content:
                  "The space scale provides 9 predefined spacing values from 0 to 4rem. Use these consistently throughout your interface to maintain visual rhythm.",
              },
              {
                heading: "Padding vs Margin",
                content:
                  "Use padding for internal spacing within components. Use margin for spacing between components. This creates predictable, composable layouts.",
              },
              {
                heading: "Intrinsic Responsive Design",
                content:
                  "Prefer CSS Grid with auto-fit/auto-fill and minmax() for responsive layouts. This eliminates media query bloat and creates truly fluid designs.",
              },
              {
                heading: "Common Patterns",
                content:
                  "8px baseline grid: Stack multiples of 8px spacing. 16px gutters: Standard gap for component groups. 24px sections: Space between major content areas.",
              },
            ]}
          />

          {/* Color & Contrast */}
          <GuideCard
            title="Color & Contrast"
            description="Use semantic colors for accessible, maintainable interfaces"
            icon="🎨"
            sections={[
              {
                heading: "Semantic Color Tokens",
                content:
                  "Use semantic colors (primary, danger, warning, success) instead of arbitrary colors. This ensures consistency and enables theme switching.",
              },
              {
                heading: "WCAG Compliance",
                content:
                  "All staple-css colors meet WCAG AA standards for contrast. Text on backgrounds always has sufficient contrast for accessibility.",
              },
              {
                heading: "Light & Dark Themes",
                content:
                  "Staple-css provides adaptive colors for both light and dark modes. The semantic mapping ensures consistent intent across themes.",
              },
              {
                heading: "Color Accessibility",
                content:
                  "Don't rely on color alone to convey information. Use icons, patterns, or text labels in addition to color differentiation.",
              },
            ]}
          />

          {/* Typography */}
          <GuideCard
            title="Typography & Text"
            description="Create readable, accessible text experiences"
            icon="📝"
            sections={[
              {
                heading: "Font Scale (0-6)",
                content:
                  "The 7-step font scale (12px to 32px) provides intentional typographic hierarchy. Use higher sizes for headings, lower for body text.",
              },
              {
                heading: "Line Height & Spacing",
                content:
                  "Line heights scale with font size: tighter for headlines (1.25), normal for body (1.5), relaxed for long-form (1.75).",
              },
              {
                heading: "Readable Line Length",
                content:
                  "Keep line length between 50-75 characters for optimal readability. Use max-width tokens: prose (65ch) for articles, other sizes for UI.",
              },
              {
                heading: "Font Weights",
                content:
                  "Use weight strategically: normal (400) for body, medium (500) for emphasis, semibold (600) for interactive elements, bold (700) for highlights.",
              },
            ]}
          />

          {/* Motion & Animation */}
          <GuideCard
            title="Motion & Animation"
            description="Create smooth, purposeful interactions"
            icon="✨"
            sections={[
              {
                heading: "Duration Scale",
                content:
                  "Fast (100ms) for micro-interactions, normal (200ms) for standard transitions, slow (300ms) for dramatic effects. Respect prefers-reduced-motion.",
              },
              {
                heading: "Easing Functions",
                content:
                  "Use default easing for most animations. In/out for directional motion. Bounce/elastic for playful elements. Always feel responsive.",
              },
              {
                heading: "When to Animate",
                content:
                  "Animate state changes, hover effects, and transitions. Avoid animating page loads. Keep animations under 300ms for perceived performance.",
              },
              {
                heading: "Accessibility",
                content:
                  "Always check prefers-reduced-motion. Provide instant feedback alongside animations. Test with users who have motion sensitivity.",
              },
            ]}
          />

          {/* Responsive Design */}
          <GuideCard
            title="Responsive Design"
            description="Build fluid, mobile-first interfaces"
            icon="📱"
            sections={[
              {
                heading: "Mobile-First Approach",
                content:
                  "Start with mobile styles. Add breakpoints to enhance larger screens. This ensures core functionality works everywhere.",
              },
              {
                heading: "Breakpoints",
                content:
                  "Staple-css provides Tailwind-style breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px).",
              },
              {
                heading: "Intrinsic Sizing",
                content:
                  'Use "max(1rem, 2vw)" and "clamp()" for fluid sizing. Use CSS Grid auto-fit for adaptive columns. Minimize media queries.',
              },
              {
                heading: "Touch Targets",
                content:
                  "Ensure interactive elements are at least 44x44px. Use comfortable padding on mobile. Test on real devices, not just viewports.",
              },
            ]}
          />

          {/* Accessibility */}
          <GuideCard
            title="Accessibility (a11y)"
            description="Build inclusive interfaces for everyone"
            icon="♿"
            sections={[
              {
                heading: "Semantic HTML",
                content:
                  "Use semantic elements: <button> for actions, <nav> for navigation, <main> for content. Screen readers rely on correct markup.",
              },
              {
                heading: "Color Contrast",
                content:
                  "Minimum 4.5:1 for normal text, 3:1 for large text (WCAG AA). Check with contrast checkers. Don't rely on color alone.",
              },
              {
                heading: "Focus Management",
                content:
                  "All interactive elements must be keyboard accessible. Use :focus-visible for clear focus indicators. Test with keyboard navigation only.",
              },
              {
                heading: "ARIA & Labels",
                content:
                  "Use ARIA labels for complex widgets. Always label form inputs. Provide alt text for images. Test with screen readers.",
              },
            ]}
          />

          {/* Performance */}
          <GuideCard
            title="Performance"
            description="Build fast, efficient interfaces"
            icon="⚡"
            sections={[
              {
                heading: "CSS Variables",
                content:
                  "Staple-css uses only CSS variables—no JavaScript parsing. Variables are inherited and scoped. Zero runtime overhead.",
              },
              {
                heading: "Static CSS",
                content:
                  "All CSS is generated statically. No runtime style generation. Tree-shakeable modules. Minimal dependencies (near-zero for primitives).",
              },
              {
                heading: "Theme Switching",
                content:
                  "Change themes via data-theme attribute on root. Single paint operation. Works with prefers-color-scheme media query.",
              },
              {
                heading: "Bundle Size",
                content:
                  "Tokens package: ~2KB gzipped. Primitives package: ~4KB gzipped. Full system with tokens.css: under 10KB gzipped.",
              },
            ]}
          />

          {/* Component Patterns */}
          <GuideCard
            title="Component Patterns"
            description="Common patterns for building components"
            icon="🧩"
            sections={[
              {
                heading: "Composition Over Configuration",
                content:
                  "Combine Box, Flex, Column, Row to create components. Each primitive is simple. Power comes from composition.",
              },
              {
                heading: "Props as Tokens",
                content:
                  "Component props accept only token keys (space: 0-8, radius: 0-4, tone: semantic). No arbitrary values. Consistency by default.",
              },
              {
                heading: "Escape Hatches",
                content:
                  "Use className or style prop to override. The happy path keeps you in tokens. Escape hatches for edge cases.",
              },
              {
                heading: "Responsive Props",
                content:
                  'Pass objects: cols={{ base: 1, md: 2, lg: 3 }}. Mobile-first: base value with breakpoint overrides.',
              },
            ]}
          />

          {/* Design Tokens */}
          <GuideCard
            title="Design Tokens Strategy"
            description="Implement tokens across your design system"
            icon="🎯"
            sections={[
              {
                heading: "Token Hierarchy",
                content:
                  "Global tokens (space, color) → Component tokens (button-padding) → Instance tokens (this-button). Inherit from above.",
              },
              {
                heading: "Naming Convention",
                content:
                  "Use semantic names: primary-soft, danger-bold. Avoid color names: not 'red', use 'danger'. Future-proof naming.",
              },
              {
                heading: "Versioning",
                content:
                  "Document token changes in CHANGELOG. Breaking changes warrant major version bumps. Provide migration guides.",
              },
              {
                heading: "Governance",
                content:
                  "One source of truth for tokens. Review changes carefully. Document why tokens exist. Rotate unused tokens.",
              },
            ]}
          />
        </Grid>

        {/* Advanced Topics */}
        <Card pad={6} radius={3} shadow={1}>
          <Column gap={4}>
            <Text as="h2" size={3} weight="semibold">
              🚀 Advanced Topics
            </Text>
            <Grid cols={{ base: 1, md: 2 }} gap={4}>
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
                  description: "Implement comfortable and compact UI modes. Automatically scales spacing and sizing. Perfect for different contexts.",
                },
                {
                  title: "Multi-Brand",
                  description: "Manage multiple brands with shared core tokens. Override specific tokens per brand. Reuse components across brands.",
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
                <div key={topic.title}>
                  <Text weight="semibold" size={1}>
                    {topic.title}
                  </Text>
                  <Text size={0} tone="muted">
                    {topic.description}
                  </Text>
                </div>
              ))}
            </Grid>
          </Column>
        </Card>

        {/* Quick Reference */}
        <Card pad={6} radius={3} shadow={1}>
          <Column gap={4}>
            <Text as="h2" size={3} weight="semibold">
              📚 Quick Reference
            </Text>
            <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
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
                <Box key={item.label} style={{ background: "var(--st-color-surface)", padding: "var(--st-space-4)", borderRadius: "var(--st-radius-2)" }}>
                  <Column gap={1}>
                    <Text size={0} weight="semibold">
                      {item.label}
                    </Text>
                    <Text size={0} tone="muted">
                      {item.value}
                    </Text>
                  </Column>
                </Box>
              ))}
            </Grid>
          </Column>
        </Card>
      </Column>
    </Container>
  );
}

interface Section {
  heading: string;
  content: string;
}

interface GuideCardProps {
  title: string;
  description: string;
  icon: string;
  sections: Section[];
}

function GuideCard({ title, description, icon, sections }: GuideCardProps) {
  return (
    <Card pad={6} radius={3} shadow={1}>
      <Column gap={4}>
        <Column gap={2}>
          <Text size={1}>{icon}</Text>
          <Text as="h3" size={2} weight="semibold">
            {title}
          </Text>
          <Text size={0} tone="muted">
            {description}
          </Text>
        </Column>

        <Column gap={3}>
          {sections.map((section, idx) => (
            <Column key={idx} gap={1}>
              <Text size={0} weight="semibold">
                {section.heading}
              </Text>
              <Text size={0} tone="muted">
                {section.content}
              </Text>
            </Column>
          ))}
        </Column>
      </Column>
    </Card>
  );
}
