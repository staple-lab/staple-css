/**
 * Color: Border Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface ColorToken {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const BORDER_COLORS: ColorToken[] = [
  { name: "default", cssVar: "--st-color-border-default", value: "oklch(0.85 0 0)", description: "Default border color" },
  { name: "subtle", cssVar: "--st-color-border-subtle", value: "oklch(0.9 0 0)", description: "Subtle/light borders" },
  { name: "strong", cssVar: "--st-color-border-strong", value: "oklch(0.7 0 0)", description: "Strong/emphasized borders" },
  { name: "hover", cssVar: "--st-color-border-hover", value: "oklch(0.6 0 0)", description: "Border on hover" },
  { name: "focus", cssVar: "--st-color-border-focus", value: "oklch(0.55 0.2 250)", description: "Focus ring border" },
  { name: "disabled", cssVar: "--st-color-border-disabled", value: "oklch(0.9 0 0)", description: "Disabled element border" },
  { name: "error", cssVar: "--st-color-border-error", value: "oklch(0.55 0.2 25)", description: "Error state border" },
  { name: "warning", cssVar: "--st-color-border-warning", value: "oklch(0.7 0.15 70)", description: "Warning state border" },
  { name: "success", cssVar: "--st-color-border-success", value: "oklch(0.55 0.15 145)", description: "Success state border" },
  { name: "info", cssVar: "--st-color-border-info", value: "oklch(0.55 0.15 230)", description: "Info state border" },
  { name: "divider", cssVar: "--st-color-border-divider", value: "oklch(0.92 0 0)", description: "Horizontal/vertical dividers" },
];

export function ColorBorderTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Color: Border</h1>
        <p className="spacing-page-description">
          Semantic border color tokens for outlines, dividers, and focus states.
          These communicate structure and interaction feedback.
        </p>
      </header>

      <section className="spacing-section">
        <div className="spacing-scale-container">
          {BORDER_COLORS.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
                <div
                  style={{
                    width: 40,
                    height: 24,
                    borderRadius: 4,
                    background: "var(--st-color-bg-primary)",
                    border: `2px solid ${token.value}`,
                  }}
                />
              </div>
              <div className="spacing-item-footer">
                <code className="spacing-var">{token.cssVar}</code>
                <span className="spacing-description">{token.description}</span>
                <button
                  className="spacing-copy-btn"
                  onClick={() => handleCopy(`var(${token.cssVar})`)}
                >
                  {copied === `var(${token.cssVar})` ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="spacing-section">
        <div className="spacing-card">
          <h2 className="spacing-section-title">Usage</h2>
          <div className="spacing-code-block">
            <div className="spacing-code-header">
              <span>CSS</span>
            </div>
            <pre className="spacing-code-content">{`.card {
  border: 1px solid var(--st-color-border-default);
}

.input:focus {
  border-color: var(--st-color-border-focus);
}

.input[aria-invalid="true"] {
  border-color: var(--st-color-border-error);
}

hr {
  border-color: var(--st-color-border-divider);
}`}</pre>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
