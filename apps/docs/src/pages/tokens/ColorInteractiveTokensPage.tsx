/**
 * Color: Interactive Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface ColorToken {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const INTERACTIVE_COLORS: ColorToken[] = [
  { name: "primary", cssVar: "--st-color-interactive-primary", value: "oklch(0.55 0.2 250)", description: "Primary interactive color" },
  { name: "primary-hover", cssVar: "--st-color-interactive-primary-hover", value: "oklch(0.48 0.22 250)", description: "Primary hover state" },
  { name: "primary-active", cssVar: "--st-color-interactive-primary-active", value: "oklch(0.42 0.24 250)", description: "Primary active/pressed state" },
  { name: "secondary", cssVar: "--st-color-interactive-secondary", value: "oklch(0.5 0 0)", description: "Secondary interactive color" },
  { name: "secondary-hover", cssVar: "--st-color-interactive-secondary-hover", value: "oklch(0.4 0 0)", description: "Secondary hover state" },
  { name: "secondary-active", cssVar: "--st-color-interactive-secondary-active", value: "oklch(0.35 0 0)", description: "Secondary active state" },
  { name: "destructive", cssVar: "--st-color-interactive-destructive", value: "oklch(0.55 0.2 25)", description: "Destructive/danger actions" },
  { name: "destructive-hover", cssVar: "--st-color-interactive-destructive-hover", value: "oklch(0.48 0.22 25)", description: "Destructive hover state" },
  { name: "destructive-active", cssVar: "--st-color-interactive-destructive-active", value: "oklch(0.42 0.24 25)", description: "Destructive active state" },
  { name: "ghost", cssVar: "--st-color-interactive-ghost", value: "transparent", description: "Ghost/transparent buttons" },
  { name: "ghost-hover", cssVar: "--st-color-interactive-ghost-hover", value: "oklch(0.95 0 0)", description: "Ghost hover state" },
  { name: "ghost-active", cssVar: "--st-color-interactive-ghost-active", value: "oklch(0.9 0 0)", description: "Ghost active state" },
];

export function ColorInteractiveTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Color: Interactive</h1>
        <p className="spacing-page-description">
          Semantic colors for interactive elements like buttons, links, and controls.
          Includes hover, active, and disabled states for each variant.
        </p>
      </header>

      <section className="spacing-section">
        <div className="spacing-scale-container">
          {INTERACTIVE_COLORS.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
                <div
                  style={{
                    width: 40,
                    height: 24,
                    borderRadius: 4,
                    background: token.value,
                    border: token.value === "transparent" ? "1px dashed var(--st-color-border)" : "none",
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
            <pre className="spacing-code-content">{`.btn-primary {
  background: var(--st-color-interactive-primary);
}
.btn-primary:hover {
  background: var(--st-color-interactive-primary-hover);
}
.btn-primary:active {
  background: var(--st-color-interactive-primary-active);
}

.btn-danger {
  background: var(--st-color-interactive-destructive);
}

.btn-ghost {
  background: var(--st-color-interactive-ghost);
}
.btn-ghost:hover {
  background: var(--st-color-interactive-ghost-hover);
}`}</pre>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
