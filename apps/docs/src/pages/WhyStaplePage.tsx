import { CodeBlock } from "../components/CodeBlock";

const beforeCode = `/* Without tokens - hardcoded values everywhere */
.card {
  padding: 16px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #1a1a1a;
  font-size: 14px;
}

/* Dark mode? Duplicate everything. */
@media (prefers-color-scheme: dark) {
  .card {
    background: #1a1a1a;
    border-color: #333;
    color: #e5e5e5;
  }
}`;

const afterCode = `/* With staple-css tokens */
.card {
  padding: var(--st-space-4);
  background: var(--st-color-bg-surface-base);
  border: var(--st-border-width-1) solid var(--st-color-bd-surface-base);
  border-radius: var(--st-border-radius-3);
  box-shadow: var(--st-elevation-2);
  color: var(--st-color-fg-surface-base);
  font-size: var(--st-type-size-2);
}

/* Dark mode? Already handled by theme switching. */`;

export function WhyStaplePage() {
  return (
    <div>
      <h1 style={{ marginBottom: 12 }}>Why staple-css</h1>
      <p style={{ color: "var(--doc-color-text-secondary)", marginBottom: 32 }}>
        Design systems break down when teams make ad-hoc styling decisions.
        staple-css solves this with a shared contract of CSS variables.
      </p>

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>The problem</h2>
      <p style={{ marginBottom: 16, color: "var(--doc-color-text-secondary)" }}>
        Without tokens, every developer invents their own values. Spacing
        drifts, colors multiply, and dark mode becomes a maintenance nightmare.
      </p>
      <CodeBlock code={beforeCode} language="css" />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>The solution</h2>
      <p style={{ marginBottom: 16, color: "var(--doc-color-text-secondary)" }}>
        Replace hardcoded values with semantic variables. One source of truth,
        automatic dark mode, and naming that communicates intent.
      </p>
      <CodeBlock code={afterCode} language="css" />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Core principles</h2>
      <div style={{ display: "grid", gap: 12, marginBottom: 32 }}>
        {[
          {
            title: "Tokens are the API",
            body: "Design decisions live in tokens. Components consume token names, never raw values. Change a token, change everything that uses it.",
          },
          {
            title: "Contract over customization",
            body: "A stable set of variables that the whole team agrees on. Consistency is the default. The escape hatch is className, not a sprawling theme config.",
          },
          {
            title: "Zero runtime",
            body: "Pure CSS custom properties. No JavaScript runtime, no style injection, no CSS-in-JS overhead. Import a CSS file and you are done.",
          },
          {
            title: "Semantic naming",
            body: "Token names describe purpose, not appearance. --st-color-bg-interactive-base tells you what it is for. --blue-600 tells you what it looks like.",
          },
          {
            title: "Dark mode included",
            body: "Every color token has light and dark values. Theme switching is a data attribute change. No conditional logic, no duplicate stylesheets.",
          },
          {
            title: "AI-friendly",
            body: "The 5-level naming hierarchy (category-property-role-prominence-state) is structured for LLM consumption. AI tools can generate correct token usage from the naming convention alone.",
          },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              padding: "16px 20px",
              border: "1px solid var(--doc-color-border)",
              borderRadius: 6,
            }}
          >
            <strong style={{ display: "block", marginBottom: 4 }}>{item.title}</strong>
            <span style={{ color: "var(--doc-color-text-secondary)", fontSize: "0.875rem" }}>
              {item.body}
            </span>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>What staple-css is not</h2>
      <ul
        style={{
          color: "var(--doc-color-text-secondary)",
          paddingLeft: 20,
          lineHeight: 2,
          marginBottom: 32,
        }}
      >
        <li>Not a component library. It provides tokens, not buttons and modals.</li>
        <li>Not a utility-class framework. No <code>.p-4</code> or <code>.text-blue-500</code> classes.</li>
        <li>Not a theme engine. No providers, no runtime config, no JS API for styling.</li>
        <li>Not opinionated about your framework. Works with React, Vue, Svelte, plain HTML, or anything that reads CSS.</li>
      </ul>
    </div>
  );
}
