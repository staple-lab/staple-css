/**
 * Color: Focus Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface ColorToken {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const FOCUS_COLORS: ColorToken[] = [
  { name: "ring", cssVar: "--st-color-focus-ring", value: "oklch(0.55 0.2 250)", description: "Focus ring color" },
  { name: "ring-offset", cssVar: "--st-color-focus-ring-offset", value: "oklch(1 0 0)", description: "Gap between element and focus ring" },
  { name: "ring-inset", cssVar: "--st-color-focus-ring-inset", value: "oklch(0.55 0.2 250 / 0.5)", description: "Inset focus ring (for inputs)" },
  { name: "outline", cssVar: "--st-color-focus-outline", value: "oklch(0.55 0.2 250)", description: "Focus outline color" },
  { name: "ring-error", cssVar: "--st-color-focus-ring-error", value: "oklch(0.55 0.2 25)", description: "Focus ring for error states" },
  { name: "ring-success", cssVar: "--st-color-focus-ring-success", value: "oklch(0.5 0.15 145)", description: "Focus ring for success states" },
];

const FOCUS_SIZES = [
  { name: "ring-width", cssVar: "--st-focus-ring-width", value: "2px", description: "Focus ring thickness" },
  { name: "ring-offset-width", cssVar: "--st-focus-ring-offset-width", value: "2px", description: "Gap between element and ring" },
];

export function ColorFocusTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Color: Focus</h1>
        <p className="spacing-page-description">
          Focus indicator tokens for accessibility. These ensure keyboard users
          can clearly see which element has focus.
        </p>
      </header>

      <section className="spacing-section">
        <h2 className="spacing-section-title" style={{ marginBottom: 16 }}>Focus Colors</h2>
        <div className="spacing-scale-container">
          {FOCUS_COLORS.map((token) => (
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
        <h2 className="spacing-section-title" style={{ marginBottom: 16 }}>Focus Sizes</h2>
        <div className="spacing-scale-container">
          {FOCUS_SIZES.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
                <span className="spacing-value">{token.value}</span>
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
            <pre className="spacing-code-content">{`/* Standard focus ring */
.btn:focus-visible {
  outline: var(--st-focus-ring-width) solid var(--st-color-focus-ring);
  outline-offset: var(--st-focus-ring-offset-width);
}

/* Focus ring with offset background */
.btn:focus-visible {
  box-shadow:
    0 0 0 var(--st-focus-ring-offset-width) var(--st-color-focus-ring-offset),
    0 0 0 calc(var(--st-focus-ring-offset-width) + var(--st-focus-ring-width)) var(--st-color-focus-ring);
}

/* Inset focus for inputs */
.input:focus {
  box-shadow: inset 0 0 0 1px var(--st-color-focus-ring-inset);
}`}</pre>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
