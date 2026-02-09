/**
 * Color: Icon Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface ColorToken {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const ICON_COLORS: ColorToken[] = [
  { name: "primary", cssVar: "--st-color-icon-primary", value: "oklch(0.3 0 0)", description: "Primary icon color" },
  { name: "secondary", cssVar: "--st-color-icon-secondary", value: "oklch(0.5 0 0)", description: "Secondary/muted icons" },
  { name: "tertiary", cssVar: "--st-color-icon-tertiary", value: "oklch(0.65 0 0)", description: "Tertiary/subtle icons" },
  { name: "disabled", cssVar: "--st-color-icon-disabled", value: "oklch(0.75 0 0)", description: "Disabled icon state" },
  { name: "interactive", cssVar: "--st-color-icon-interactive", value: "oklch(0.55 0.2 250)", description: "Clickable/interactive icons" },
  { name: "interactive-hover", cssVar: "--st-color-icon-interactive-hover", value: "oklch(0.48 0.22 250)", description: "Interactive icon hover" },
  { name: "inverse", cssVar: "--st-color-icon-inverse", value: "oklch(0.95 0 0)", description: "Icons on dark backgrounds" },
  { name: "on-primary", cssVar: "--st-color-icon-on-primary", value: "oklch(1 0 0)", description: "Icons on primary color" },
  { name: "error", cssVar: "--st-color-icon-error", value: "oklch(0.55 0.2 25)", description: "Error state icons" },
  { name: "warning", cssVar: "--st-color-icon-warning", value: "oklch(0.6 0.15 70)", description: "Warning state icons" },
  { name: "success", cssVar: "--st-color-icon-success", value: "oklch(0.5 0.15 145)", description: "Success state icons" },
  { name: "info", cssVar: "--st-color-icon-info", value: "oklch(0.5 0.15 230)", description: "Info state icons" },
];

export function ColorIconTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Color: Icon</h1>
        <p className="spacing-page-description">
          Semantic colors specifically for icons. These ensure icons have
          appropriate contrast and meaning across different contexts.
        </p>
      </header>

      <section className="spacing-section">
        <div className="spacing-scale-container">
          {ICON_COLORS.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
                <div
                  style={{
                    width: 24,
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
            <pre className="spacing-code-content">{`.icon {
  color: var(--st-color-icon-primary);
}

.icon-muted {
  color: var(--st-color-icon-secondary);
}

.icon-button .icon {
  color: var(--st-color-icon-interactive);
}
.icon-button:hover .icon {
  color: var(--st-color-icon-interactive-hover);
}

.btn-primary .icon {
  color: var(--st-color-icon-on-primary);
}`}</pre>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
