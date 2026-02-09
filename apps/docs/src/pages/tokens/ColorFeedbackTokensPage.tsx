/**
 * Color: Feedback Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface ColorToken {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const FEEDBACK_COLORS: ColorToken[] = [
  // Error
  { name: "error-text", cssVar: "--st-color-feedback-error-text", value: "oklch(0.45 0.2 25)", description: "Error message text" },
  { name: "error-bg", cssVar: "--st-color-feedback-error-bg", value: "oklch(0.95 0.05 25)", description: "Error background" },
  { name: "error-border", cssVar: "--st-color-feedback-error-border", value: "oklch(0.7 0.15 25)", description: "Error border" },
  { name: "error-icon", cssVar: "--st-color-feedback-error-icon", value: "oklch(0.55 0.2 25)", description: "Error icon color" },
  // Warning
  { name: "warning-text", cssVar: "--st-color-feedback-warning-text", value: "oklch(0.4 0.12 70)", description: "Warning message text" },
  { name: "warning-bg", cssVar: "--st-color-feedback-warning-bg", value: "oklch(0.95 0.08 70)", description: "Warning background" },
  { name: "warning-border", cssVar: "--st-color-feedback-warning-border", value: "oklch(0.75 0.12 70)", description: "Warning border" },
  { name: "warning-icon", cssVar: "--st-color-feedback-warning-icon", value: "oklch(0.6 0.15 70)", description: "Warning icon color" },
  // Success
  { name: "success-text", cssVar: "--st-color-feedback-success-text", value: "oklch(0.4 0.12 145)", description: "Success message text" },
  { name: "success-bg", cssVar: "--st-color-feedback-success-bg", value: "oklch(0.95 0.05 145)", description: "Success background" },
  { name: "success-border", cssVar: "--st-color-feedback-success-border", value: "oklch(0.7 0.1 145)", description: "Success border" },
  { name: "success-icon", cssVar: "--st-color-feedback-success-icon", value: "oklch(0.5 0.15 145)", description: "Success icon color" },
  // Info
  { name: "info-text", cssVar: "--st-color-feedback-info-text", value: "oklch(0.4 0.12 230)", description: "Info message text" },
  { name: "info-bg", cssVar: "--st-color-feedback-info-bg", value: "oklch(0.95 0.05 230)", description: "Info background" },
  { name: "info-border", cssVar: "--st-color-feedback-info-border", value: "oklch(0.7 0.1 230)", description: "Info border" },
  { name: "info-icon", cssVar: "--st-color-feedback-info-icon", value: "oklch(0.5 0.15 230)", description: "Info icon color" },
];

export function ColorFeedbackTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Color: Feedback</h1>
        <p className="spacing-page-description">
          Semantic colors for feedback states: error, warning, success, and info.
          Each state includes text, background, border, and icon color variants.
        </p>
      </header>

      <section className="spacing-section">
        <div className="spacing-scale-container">
          {FEEDBACK_COLORS.map((token) => (
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
            <pre className="spacing-code-content">{`.alert-error {
  color: var(--st-color-feedback-error-text);
  background: var(--st-color-feedback-error-bg);
  border: 1px solid var(--st-color-feedback-error-border);
}

.alert-success {
  color: var(--st-color-feedback-success-text);
  background: var(--st-color-feedback-success-bg);
  border: 1px solid var(--st-color-feedback-success-border);
}

.alert-icon {
  color: var(--st-color-feedback-error-icon);
}`}</pre>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
