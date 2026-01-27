import { Container, Column, Text, Row } from "@staple-css/primitives/full";
import "./WhyPage.css";

export function WhyPage() {
  return (
    <div className="why-page">
      <Container size="md">
        <Column gap={8}>
          {/* Hero */}
          <Column gap={2} style={{ marginBottom: "var(--st-space-4)" }}>
            <Text as="h1" size={5} weight="bold">
              Why staple-css?
            </Text>
            <Text tone="muted" size={3} style={{ maxWidth: "50ch", lineHeight: "1.6" }}>
              A styling contract that prioritizes consistency, performance, and maintainability.
            </Text>
          </Column>

          {/* Core Philosophy */}
          <Column gap={4}>
            <Text as="h2" size={4} weight="semibold">
              Core Philosophy
            </Text>
            <div className="philosophy-block">
              <Text style={{ marginBottom: "var(--st-space-3)" }}>
                staple-css is built on a simple idea: <strong>tokens are the API</strong>.
                Instead of allowing arbitrary values throughout your codebase, staple-css
                provides a contract—a set of design decisions encoded as CSS variables.
              </Text>
              <Text>
                This contract ensures consistency. When every component uses the same
                spacing scale, the same color tokens, the same typography settings,
                your UI naturally becomes more cohesive.
              </Text>
            </div>
          </Column>

          {/* Principles */}
          <Column gap={4}>
            <Text as="h2" size={4} weight="semibold">
              Principles
            </Text>

            <div className="principles-grid">
              {[
                {
                  title: "Tokens are the API",
                  desc: "Design decisions live in tokens, not scattered across components. Components accept token keys, not arbitrary values.",
                  icon: "📦",
                },
                {
                  title: "Contract over customization",
                  desc: "A stable, predictable API enables teams to build consistent interfaces. Override mechanisms are deliberate, not default.",
                  icon: "🤝",
                },
                {
                  title: "Consistency by default",
                  desc: "The happy path keeps you in the token system. Escape hatches are explicit and visible in code review.",
                  icon: "✨",
                },
              ].map((principle) => (
                <div key={principle.title} className="principle-card">
                  <div className="principle-icon">{principle.icon}</div>
                  <Text weight="semibold" size={2} style={{ marginBottom: "var(--st-space-2)" }}>
                    {principle.title}
                  </Text>
                  <Text tone="muted" size={0} style={{ lineHeight: "1.5" }}>
                    {principle.desc}
                  </Text>
                </div>
              ))}
            </div>
          </Column>

          {/* Performance */}
          <Column gap={4}>
            <Text as="h2" size={4} weight="semibold">
              Performance-First Design
            </Text>

            <div className="performance-grid">
              {[
                {
                  title: "Static CSS",
                  desc: "All styling is static CSS—no runtime generation, no CSS-in-JS overhead. Token values are CSS variables handled natively.",
                  metric: "0ms",
                  metricLabel: "runtime overhead",
                },
                {
                  title: "Zero dependencies",
                  desc: "Components need only React and @staple-css/tokens. No heavy libraries, no build-time magic.",
                  metric: "<1kb",
                  metricLabel: "runtime size",
                },
                {
                  title: "Tree-shakeable",
                  desc: "Each component is independently importable. Unused code is automatically removed during bundling.",
                  metric: "100%",
                  metricLabel: "tree-shakeable",
                },
                {
                  title: "Intrinsic responsive",
                  desc: "CSS Grid intrinsic sizing eliminates media query bloat. Layouts adapt to content naturally.",
                  metric: "~40%",
                  metricLabel: "fewer media queries",
                },
              ].map((perf) => (
                <div key={perf.title} className="perf-card">
                  <div className="perf-metric">
                    <Text weight="bold" size={3} style={{ color: "var(--st-color-primary)" }}>
                      {perf.metric}
                    </Text>
                    <Text size={0} tone="muted">
                      {perf.metricLabel}
                    </Text>
                  </div>
                  <div>
                    <Text weight="semibold" size={1} style={{ marginBottom: "var(--st-space-2)" }}>
                      {perf.title}
                    </Text>
                    <Text size={0} tone="muted" style={{ lineHeight: "1.5" }}>
                      {perf.desc}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </Column>

          {/* Maintainability */}
          <Column gap={4}>
            <Text as="h2" size={4} weight="semibold">
              Long-Term Maintainability
            </Text>

            <div className="maintain-list">
              {[
                { label: "Token versioning", detail: "Update design decisions in one place, propagate everywhere" },
                { label: "Centralized design system", detail: "Colors, spacing, typography live in @staple-css/tokens" },
                { label: "No style props hell", detail: "Props accept token keys, not arbitrary sx={{...}} objects" },
                { label: "Design → Code traceability", detail: "Each component maps to specific token decisions" },
              ].map((item) => (
                <Row key={item.label} gap={4} align="start" style={{ padding: "var(--st-space-4)", borderBottom: "1px solid var(--st-color-border)" }}>
                  <Text weight="semibold" size={1} style={{ minWidth: "140px" }}>
                    {item.label}
                  </Text>
                  <Text size={0} tone="muted" style={{ lineHeight: "1.5" }}>
                    {item.detail}
                  </Text>
                </Row>
              ))}
            </div>
          </Column>

          {/* Accessibility */}
          <Column gap={4}>
            <Text as="h2" size={4} weight="semibold">
              Accessibility Built-In
            </Text>

            <div className="a11y-features">
              <Row gap={8} align="start" style={{ paddingBottom: "var(--st-space-4)", borderBottom: "1px solid var(--st-color-border)" }}>
                <div style={{ flex: 1 }}>
                  <Text weight="semibold" size={1} style={{ marginBottom: "var(--st-space-2)" }}>
                    WCAG Compliance
                  </Text>
                  <Text size={0} tone="muted">All primitives built with semantic HTML and ARIA attributes. Color contrasts verified.</Text>
                </div>
                <div style={{ flex: 1 }}>
                  <Text weight="semibold" size={1} style={{ marginBottom: "var(--st-space-2)" }}>
                    Keyboard Navigation
                  </Text>
                  <Text size={0} tone="muted">All interactive elements fully keyboard accessible. Focus states clearly visible.</Text>
                </div>
              </Row>
              <Row gap={8} align="start" style={{ paddingTop: "var(--st-space-4)" }}>
                <div style={{ flex: 1 }}>
                  <Text weight="semibold" size={1} style={{ marginBottom: "var(--st-space-2)" }}>
                    Motion Respect
                  </Text>
                  <Text size={0} tone="muted">Animations respect prefers-reduced-motion. No vestibular triggers.</Text>
                </div>
                <div style={{ flex: 1 }}>
                  <Text weight="semibold" size={1} style={{ marginBottom: "var(--st-space-2)" }}>
                    Dark Mode
                  </Text>
                  <Text size={0} tone="muted">Built-in dark theme support. Respects system color-scheme preference.</Text>
                </div>
              </Row>
            </div>
          </Column>

          {/* CTA */}
          <div className="cta-section">
            <Text size={1} style={{ marginBottom: "var(--st-space-4)" }}>
              Ready to build with staple-css? Check out the <a href="/primitives" style={{ color: "var(--st-color-primary)", textDecoration: "none" }}>component library</a> and explore the <a href="/tokens" style={{ color: "var(--st-color-primary)", textDecoration: "none" }}>token system</a>.
            </Text>
          </div>
        </Column>
      </Container>
    </div>
  );
}
