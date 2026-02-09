import {
  Palette,
  Layout,
  Type,
  Shield,
  Zap,
  Smartphone,
} from "lucide-react";
import "./HomePage.css";

function DotDivider() {
  return (
    <div className="section-dot-divider">
      <span />
      <span />
      <span />
    </div>
  );
}

export function HomePageNew() {
  return (
    <div className="home-page">
      {/* HERO */}
      <div className="hero">
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div className="hero-eyebrow">
            Semantic design tokens. Zero runtime.
          </div>

          <h1 className="hero-title">
            Design Systems
            <span className="hero-accent">That Scale</span>
          </h1>

          <p className="hero-subtitle">
            Token-first primitives for teams that care about consistency, performance, and code quality.
          </p>

          <div className="cta-group" style={{ marginTop: "28px" }}>
            <a href="/guides" className="cta-primary">
              Start Building
              <span className="arrow">&rarr;</span>
            </a>
            <a href="/why" className="cta-secondary">
              Why staple-css?
            </a>
          </div>
        </div>
      </div>

      <DotDivider />

      {/* THREE PILLARS */}
      <section className="pillars">
        <div className="pillars-grid">
          {[
            {
              number: "01",
              title: "Tokens First",
              description: "Design decisions encoded as CSS variables. Update once, propagate everywhere.",
            },
            {
              number: "02",
              title: "Zero Runtime",
              description: "Static CSS only. No JavaScript, no CSS-in-JS. Native CSS variables.",
            },
            {
              number: "03",
              title: "Ship Fast",
              description: "Pre-built semantic primitives. Accessible by default. Dark mode included.",
            },
          ].map((pillar) => (
            <div key={pillar.number} className="pillar">
              <div className="pillar-number">
                {pillar.number}
              </div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-description">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <DotDivider />

      {/* CAPABILITIES */}
      <section className="capabilities">
        <div className="capabilities-header">
          <h2>What You Get</h2>
          <p>Everything needed for professional design systems</p>
        </div>

        <div className="capabilities-list">
          {[
            { icon: Palette, title: "22 Color Palettes", desc: "Tailwind-compatible scales with semantic intent" },
            { icon: Layout, title: "Spacing System", desc: "9-step scale from 0-64px for perfect rhythm" },
            { icon: Type, title: "Typography", desc: "Font stacks, sizes, weights, and line heights" },
            { icon: Shield, title: "Accessibility", desc: "WCAG AA compliance. Dark mode. Motion respect." },
            { icon: Zap, title: "Performance", desc: "<1KB runtime. Tree-shakeable. Zero deps." },
            { icon: Smartphone, title: "Responsive", desc: "Intrinsic layout patterns. CSS Grid native." },
          ].map((cap, idx) => {
            const IconComponent = cap.icon;
            return (
              <div key={idx} className="capability-item">
                <div className="capability-icon">
                  <IconComponent size={16} strokeWidth={1.5} />
                </div>
                <div className="capability-text">
                  <h3>{cap.title}</h3>
                  <p>{cap.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <DotDivider />

      {/* STATS */}
      <section className="stats">
        <div className="stats-grid">
          {[
            { value: "2.5 KB", label: "Core Size" },
            { value: "0 ms", label: "Runtime" },
            { value: "22", label: "Palettes" },
            { value: "100%", label: "Tree-Shakeable" },
          ].map((stat) => (
            <div key={stat.label} className="stat">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <DotDivider />

      {/* PHILOSOPHY */}
      <section className="philosophy">
        <div className="philosophy-inner">
          <h2>Design Systems Done Right</h2>

          <div className="philosophy-grid">
            {[
              {
                label: "Consistency",
                desc: "Every component uses the same tokens. Your UI naturally becomes cohesive.",
              },
              {
                label: "Maintainability",
                desc: "Update a token once, it propagates everywhere. Refactoring becomes trivial.",
              },
              {
                label: "Scalability",
                desc: "Works for teams of 5 or 500. The token system grows with you.",
              },
              {
                label: "Performance",
                desc: "No runtime CSS generation. Static CSS loaded once. Theme switching is instant.",
              },
            ].map((item) => (
              <div key={item.label} className="philosophy-card">
                <h4>{item.label}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DotDivider />

      {/* VALUES */}
      <section className="values">
        <h2 style={{ textAlign: "center", marginBottom: "40px", border: "none", padding: 0 }}>Our Values</h2>

        <div className="values-grid">
          {[
            {
              title: "Tokens are the API",
              description: "Design decisions live in tokens. Query them, version them, change them.",
            },
            {
              title: "Contract over Customization",
              description: "A stable contract beats infinite customization. Teams coordinate through tokens.",
            },
            {
              title: "Performance Matters",
              description: "Static CSS. Zero JavaScript overhead. Your site stays responsive as complexity grows.",
            },
            {
              title: "Accessibility First",
              description: "WCAG AA compliance by default. Semantic HTML. Keyboard navigation. Dark mode.",
            },
          ].map((value) => (
            <div key={value.title} className="value-box">
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <DotDivider />

      {/* CTA */}
      <section className="final-cta">
        <div className="final-cta-content">
          <h2>Ready to Build?</h2>
          <p>Explore tokens, try primitives, and discover how staple-css changes the way you build interfaces.</p>

          <div className="final-cta-links">
            <a href="/tokens" className="link-button primary">
              View Token System &rarr;
            </a>
            <a href="/primitives" className="link-button secondary">
              Explore Primitives
            </a>
            <a href="/why" className="link-button secondary">
              Learn Why
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
