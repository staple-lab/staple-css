import { Link } from "react-router-dom";
import { CodeBlock } from "../components/CodeBlock";

const installCode = `npm install @staple-css/tokens`;

const usageCode = `/* Import all tokens */
@import "@staple-css/tokens/all.css";

/* Or import only what you need */
@import "@staple-css/tokens/tokens.css";
@import "@staple-css/tokens/themes.css";
@import "@staple-css/tokens/palettes.css";`;

const exampleCode = `.card {
  padding: var(--st-space-4);
  background: var(--st-color-bg-surface-base);
  border: var(--st-border-width-1) solid var(--st-color-bd-surface-base);
  border-radius: var(--st-border-radius-3);
  box-shadow: var(--st-elevation-2);
}`;

export function HomePage() {
  return (
    <div>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ marginBottom: 12 }}>staple-css</h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--doc-color-text-secondary)",
            maxWidth: 560,
            lineHeight: 1.6,
          }}
        >
          A shared styling contract for apps. Semantic CSS variables standardize
          spacing, color, typography, and motion. Tokens are the API. Contract
          over customization. Consistency by default.
        </p>
      </div>

      <CodeBlock code={installCode} language="bash" />

      <h2 style={{ marginTop: 48, marginBottom: 16 }}>Quick start</h2>
      <p style={{ marginBottom: 16, color: "var(--doc-color-text-secondary)" }}>
        Import the token CSS files in your app entry point, then use the
        variables anywhere in your stylesheets.
      </p>
      <CodeBlock code={usageCode} language="css" />

      <h2 style={{ marginTop: 48, marginBottom: 16 }}>Example</h2>
      <CodeBlock code={exampleCode} language="css" />

      <h2 style={{ marginTop: 48, marginBottom: 16 }}>What you get</h2>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "grid",
          gap: 12,
        }}
      >
        {[
          ["120+ semantic color tokens", "Light and dark mode built in with automatic theme switching."],
          ["Spacing, type, and layout scales", "Consistent sizing from 4px to 64px, plus typography and layout tokens."],
          ["22 color palettes", "Tailwind-compatible palette ramps from 50 to 950."],
          ["OKLCH color tools", "Perceptually uniform ramp generation, contrast checking, and color harmonies."],
          ["Zero runtime", "Pure CSS variables. No JavaScript runtime, no style injection."],
          ["AI-optimized", "Token names are structured for LLM consumption. Copy the tokens reference into your prompt."],
        ].map(([title, desc]) => (
          <li
            key={title}
            style={{
              padding: "16px 20px",
              border: "1px solid var(--doc-color-border)",
              borderRadius: 6,
            }}
          >
            <strong style={{ display: "block", marginBottom: 4 }}>{title}</strong>
            <span style={{ color: "var(--doc-color-text-secondary)", fontSize: "0.875rem" }}>
              {desc}
            </span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 48 }}>
        <Link
          to="/getting-started"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 20px",
            backgroundColor: "var(--doc-color-accent)",
            color: "#ffffff",
            borderRadius: 6,
            fontWeight: 600,
            fontSize: "0.9375rem",
            textDecoration: "none",
          }}
        >
          Get started
        </Link>
      </div>
    </div>
  );
}
