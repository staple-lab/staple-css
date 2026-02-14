import { Link } from "react-router-dom";
import { CodeBlock } from "../components/CodeBlock";

const namingCode = `--st-{category}-{property}-{role}-{prominence}-{state}

/* Examples */
--st-color-bg-surface-base
--st-color-bg-interactive-base-hover
--st-color-fg-status-danger-subtle
--st-space-4
--st-type-size-3
--st-elevation-2
--st-border-radius-3
--st-motion-duration-normal`;

const categories = [
  {
    name: "Color",
    path: "/tokens/color",
    count: "120+",
    description: "Semantic colors for backgrounds, foregrounds, borders, icons, and focus rings. Light and dark mode values.",
  },
  {
    name: "Spacing",
    path: "/tokens/spacing",
    count: "10",
    description: "Geometric spacing scale from 0 to 4rem, plus a 1px hairline value.",
  },
  {
    name: "Typography",
    path: "/tokens/typography",
    count: "21",
    description: "Font sizes, weights, line heights, letter spacing, and font family stacks.",
  },
  {
    name: "Elevation",
    path: "/tokens/elevation",
    count: "5",
    description: "Box-shadow scale from flat to heavily elevated for cards, dropdowns, and modals.",
  },
  {
    name: "Border",
    path: "/tokens/border",
    count: "9",
    description: "Border radius scale (0 to full) and border width scale (0 to 2px).",
  },
  {
    name: "Motion",
    path: "/tokens/motion",
    count: "10",
    description: "Duration scale (instant to slow) and easing curves for transitions and animations.",
  },
  {
    name: "Layout",
    path: "/tokens/layout",
    count: "17",
    description: "Container max-widths, screen breakpoints, and z-index scale.",
  },
];

export function TokensOverviewPage() {
  return (
    <div>
      <h1 style={{ marginBottom: 12 }}>Tokens</h1>
      <p style={{ color: "var(--doc-color-text-secondary)", marginBottom: 32 }}>
        Design tokens are the atomic values of the system. Every spacing,
        color, and typography decision is encoded as a CSS custom property.
      </p>

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Naming convention</h2>
      <p style={{ marginBottom: 16, color: "var(--doc-color-text-secondary)" }}>
        Color tokens use a 5-level hierarchy. Scale tokens (spacing,
        typography, etc.) use 2-3 levels.
      </p>
      <CodeBlock code={namingCode} language="css" />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Categories</h2>
      <div style={{ display: "grid", gap: 12, marginBottom: 32 }}>
        {categories.map((cat) => (
          <Link
            key={cat.path}
            to={cat.path}
            style={{
              display: "block",
              padding: "16px 20px",
              border: "1px solid var(--doc-color-border)",
              borderRadius: 6,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <strong>{cat.name}</strong>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--doc-color-text-secondary)",
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                {cat.count} tokens
              </span>
            </div>
            <span
              style={{
                fontSize: "0.875rem",
                color: "var(--doc-color-text-secondary)",
              }}
            >
              {cat.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
