/**
 * Color: Background Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface ColorToken {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const BG_COLORS: ColorToken[] = [
  { name: "primary", cssVar: "--st-color-bg-primary", value: "oklch(1 0 0)", description: "Primary background (page base)" },
  { name: "secondary", cssVar: "--st-color-bg-secondary", value: "oklch(0.97 0 0)", description: "Secondary background (cards, sections)" },
  { name: "tertiary", cssVar: "--st-color-bg-tertiary", value: "oklch(0.94 0 0)", description: "Tertiary background (nested elements)" },
  { name: "hover", cssVar: "--st-color-bg-hover", value: "oklch(0.95 0 0)", description: "Hover state background" },
  { name: "active", cssVar: "--st-color-bg-active", value: "oklch(0.92 0 0)", description: "Active/pressed state background" },
  { name: "selected", cssVar: "--st-color-bg-selected", value: "oklch(0.92 0.05 250)", description: "Selected item background" },
  { name: "disabled", cssVar: "--st-color-bg-disabled", value: "oklch(0.95 0 0)", description: "Disabled element background" },
  { name: "overlay", cssVar: "--st-color-bg-overlay", value: "oklch(0.2 0 0 / 0.5)", description: "Modal/dialog overlay" },
  { name: "backdrop", cssVar: "--st-color-bg-backdrop", value: "oklch(0.1 0 0 / 0.7)", description: "Heavy backdrop for focus" },
  { name: "inverse", cssVar: "--st-color-bg-inverse", value: "oklch(0.15 0 0)", description: "Inverse background (dark on light)" },
  { name: "elevated", cssVar: "--st-color-bg-elevated", value: "oklch(1 0 0)", description: "Elevated surface (dropdowns, popovers)" },
  { name: "sunken", cssVar: "--st-color-bg-sunken", value: "oklch(0.96 0 0)", description: "Sunken/inset areas" },
];

export function ColorBackgroundTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Color: Background</h1>
        <p className="spacing-page-description">
          Semantic background color tokens for surfaces and containers.
          Use these to create visual hierarchy and indicate states.
        </p>
      </header>

      <section className="spacing-section">
        <div className="spacing-scale-container">
          {BG_COLORS.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
                <div
                  style={{
                    width: 40,
                    height: 24,
                    borderRadius: 4,
                    background: token.value,
                    border: "1px solid var(--st-color-border)",
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
            <pre className="spacing-code-content">{`body {
  background: var(--st-color-bg-primary);
}

.card {
  background: var(--st-color-bg-secondary);
}

.list-item:hover {
  background: var(--st-color-bg-hover);
}

.list-item[aria-selected="true"] {
  background: var(--st-color-bg-selected);
}

.modal-backdrop {
  background: var(--st-color-bg-overlay);
}`}</pre>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
