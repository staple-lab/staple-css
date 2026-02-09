/**
 * Color: Text Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface ColorToken {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const TEXT_COLORS: ColorToken[] = [
  { name: "primary", cssVar: "--st-color-text-primary", value: "oklch(0.2 0 0)", description: "Primary text color for headings and body" },
  { name: "secondary", cssVar: "--st-color-text-secondary", value: "oklch(0.4 0 0)", description: "Secondary text for less emphasis" },
  { name: "tertiary", cssVar: "--st-color-text-tertiary", value: "oklch(0.55 0 0)", description: "Tertiary text for subtle content" },
  { name: "disabled", cssVar: "--st-color-text-disabled", value: "oklch(0.65 0 0)", description: "Disabled text state" },
  { name: "placeholder", cssVar: "--st-color-text-placeholder", value: "oklch(0.6 0 0)", description: "Placeholder text in inputs" },
  { name: "link", cssVar: "--st-color-text-link", value: "oklch(0.5 0.2 250)", description: "Link text color" },
  { name: "link-hover", cssVar: "--st-color-text-link-hover", value: "oklch(0.4 0.22 250)", description: "Link hover state" },
  { name: "link-visited", cssVar: "--st-color-text-link-visited", value: "oklch(0.45 0.18 280)", description: "Visited link color" },
  { name: "inverse", cssVar: "--st-color-text-inverse", value: "oklch(0.98 0 0)", description: "Text on dark backgrounds" },
  { name: "on-primary", cssVar: "--st-color-text-on-primary", value: "oklch(1 0 0)", description: "Text on primary color backgrounds" },
  { name: "on-success", cssVar: "--st-color-text-on-success", value: "oklch(1 0 0)", description: "Text on success backgrounds" },
  { name: "on-warning", cssVar: "--st-color-text-on-warning", value: "oklch(0.2 0 0)", description: "Text on warning backgrounds" },
  { name: "on-error", cssVar: "--st-color-text-on-error", value: "oklch(1 0 0)", description: "Text on error backgrounds" },
];

export function ColorTextTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Color: Text</h1>
        <p className="spacing-page-description">
          Semantic text color tokens for typography. These tokens define text colors
          based on their purpose rather than their visual appearance.
        </p>
      </header>

      <section className="spacing-section">
        <div className="spacing-scale-container">
          {TEXT_COLORS.map((token) => (
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
              <button
                className="spacing-code-copy"
                onClick={() => handleCopy(`.heading {
  color: var(--st-color-text-primary);
}

.subtitle {
  color: var(--st-color-text-secondary);
}

.caption {
  color: var(--st-color-text-tertiary);
}

a {
  color: var(--st-color-text-link);
}

a:hover {
  color: var(--st-color-text-link-hover);
}

.btn-primary {
  color: var(--st-color-text-on-primary);
}`)}
              >
                Copy
              </button>
            </div>
            <pre className="spacing-code-content">{`.heading {
  color: var(--st-color-text-primary);
}

.subtitle {
  color: var(--st-color-text-secondary);
}

.caption {
  color: var(--st-color-text-tertiary);
}

a {
  color: var(--st-color-text-link);
}

a:hover {
  color: var(--st-color-text-link-hover);
}

.btn-primary {
  color: var(--st-color-text-on-primary);
}`}</pre>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
