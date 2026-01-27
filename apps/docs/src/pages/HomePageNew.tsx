import { Container, Column, Row, Text, Box, Grid } from "@staple-css/primitives/full";
import {
  Palette,
  Layout,
  Type,
  Shield,
  Zap,
  Smartphone,
} from "lucide-react";
import "./HomePage.css";

export function HomePageNew() {
  return (
    <div className="home-page">
      {/* HERO: Distinctive Typography & Radical Simplicity */}
      <div className="hero">
        <Container size="lg">
          <Column gap={8} align="center">
            <Column gap={6} align="center" style={{ maxWidth: "700px" }}>
              <div className="hero-eyebrow">
                Semantic design tokens. Zero runtime.
              </div>

              <h1 className="hero-title">
                Design Systems
                <span className="hero-accent">That Scale</span>
              </h1>

              <Text size={2} className="hero-subtitle">
                Token-first primitives for teams that care about consistency, performance, and code quality. Contract-based, not customization-heavy.
              </Text>
            </Column>

            <div className="cta-group">
              <a href="/guides" className="cta-primary">
                Start Building
                <span className="arrow">→</span>
              </a>
              <a href="/why" className="cta-secondary">
                Why staple-css?
              </a>
            </div>
          </Column>
        </Container>
      </div>

      {/* THREE PILLARS: Distinctive Visual Treatment */}
      <section className="pillars">
        <Container size="lg">
          <div className="pillars-grid">
            {[
              {
                number: "01",
                title: "Tokens First",
                description: "Design decisions encoded as CSS variables. Update once, propagate everywhere. No scattered magic values.",
                accent: "var(--st-color-primary)",
              },
              {
                number: "02",
                title: "Zero Runtime",
                description: "Static CSS only. No JavaScript, no CSS-in-JS, no build-time magic. Native CSS variables the browser understands.",
                accent: "#06b6d4",
              },
              {
                number: "03",
                title: "Ship Fast",
                description: "Pre-built semantic primitives. Accessible by default. Dark mode included. Focus on features, not styling.",
                accent: "#8b5cf6",
              },
            ].map((pillar) => (
              <div key={pillar.number} className="pillar">
                <div className="pillar-number" style={{ color: pillar.accent }}>
                  {pillar.number}
                </div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-description">{pillar.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CAPABILITIES: Modern Icon Grid */}
      <section className="capabilities">
        <Container size="lg">
          <div className="capabilities-header">
            <h2>What You Get</h2>
            <p>Everything needed for professional design systems</p>
          </div>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {[
              { icon: Palette, title: "22 Color Palettes", desc: "Tailwind-compatible scales with semantic intent" },
              { icon: Layout, title: "Spacing System", desc: "9-step scale from 0-64px for perfect rhythm" },
              { icon: Type, title: "Typography", desc: "Font stacks, sizes, weights, and line heights" },
              { icon: Shield, title: "Accessibility Built-In", desc: "WCAG AA compliance. Dark mode. Motion respect." },
              { icon: Zap, title: "Performance", desc: "<1KB runtime. Tree-shakeable. Zero deps." },
              { icon: Smartphone, title: "Responsive", desc: "Intrinsic layout patterns. CSS Grid native." },
            ].map((cap, idx) => {
              const IconComponent = cap.icon;
              return (
                <div key={idx} className="capability">
                  <div className="capability-icon">
                    <IconComponent size={28} strokeWidth={1.5} />
                  </div>
                  <h3>{cap.title}</h3>
                  <p>{cap.desc}</p>
                </div>
              );
            })}
          </Grid>
        </Container>
      </section>

      {/* PHILOSOPHY: Why This Matters */}
      <section className="philosophy">
        <Container size="md">
          <div className="philosophy-inner">
            <h2>Design Systems Done Right</h2>

            <div className="philosophy-grid">
              {[
                {
                  label: "Consistency",
                  desc: "When every component uses the same tokens, your UI naturally becomes cohesive. No more color variations or spacing inconsistencies.",
                },
                {
                  label: "Maintainability",
                  desc: "Update a token once, and it propagates everywhere. Refactoring becomes trivial. Design feedback is actionable.",
                },
                {
                  label: "Scalability",
                  desc: "Works for teams of 5 or 500. The token system grows with you. Add new tokens without breaking existing patterns.",
                },
                {
                  label: "Performance",
                  desc: "No runtime CSS generation. Static CSS loaded once. Dark mode switching is instant. Your site stays fast as you scale.",
                },
              ].map((item) => (
                <div key={item.label} className="philosophy-card">
                  <h4>{item.label}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* STATS: Proof Points */}
      <section className="stats">
        <Container size="lg">
          <div className="stats-grid">
            {[
              { value: "2.5 KB", label: "Core Size" },
              { value: "0 ms", label: "Runtime Overhead" },
              { value: "22", label: "Color Palettes" },
              { value: "100%", label: "Tree-Shakeable" },
            ].map((stat) => (
              <div key={stat.label} className="stat">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CORE VALUES: Brand Foundation */}
      <section className="values">
        <Container size="lg">
          <h2 style={{ textAlign: "center", marginBottom: "var(--st-space-8)" }}>Our Values</h2>

          <div className="values-grid">
            {[
              {
                title: "Tokens are the API",
                description: "Design decisions aren't scattered throughout your codebase. They live in tokens. Query them, version them, change them.",
              },
              {
                title: "Contract over Customization",
                description: "A stable contract beats infinite customization. Teams coordinate through tokens, not through component prop sprawl.",
              },
              {
                title: "Performance Matters",
                description: "Static CSS. Zero JavaScript overhead. Fast theme switching. Your site stays responsive as complexity grows.",
              },
              {
                title: "Accessibility First",
                description: "WCAG AA compliance by default. Semantic HTML. Keyboard navigation. Dark mode. Not an afterthought.",
              },
            ].map((value) => (
              <div key={value.title} className="value-box">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA: Call to Action */}
      <section className="final-cta">
        <Container size="md">
          <div className="final-cta-content">
            <h2>Ready to Build?</h2>
            <p>Explore tokens, try primitives, and discover how staple-css changes the way you build interfaces.</p>

            <div className="final-cta-links">
              <a href="/tokens" className="link-button primary">
                View Token System →
              </a>
              <a href="/primitives" className="link-button secondary">
                Explore Primitives →
              </a>
              <a href="/why" className="link-button secondary">
                Learn Why →
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
