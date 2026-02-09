/**
 * Opacity Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface Token {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const OPACITY_TOKENS: Token[] = [
  { name: "disabled", cssVar: "--st-opacity-disabled", value: "0.5", description: "Disabled elements" },
  { name: "placeholder", cssVar: "--st-opacity-placeholder", value: "0.6", description: "Placeholder text" },
  { name: "loading", cssVar: "--st-opacity-loading", value: "0.7", description: "Loading state elements" },
  { name: "hover", cssVar: "--st-opacity-hover", value: "0.8", description: "Hover state overlays" },
  { name: "ghost", cssVar: "--st-opacity-ghost", value: "0.1", description: "Ghost button backgrounds" },
  { name: "ghost-hover", cssVar: "--st-opacity-ghost-hover", value: "0.15", description: "Ghost button hover" },
  { name: "overlay-light", cssVar: "--st-opacity-overlay-light", value: "0.3", description: "Light overlay" },
  { name: "overlay", cssVar: "--st-opacity-overlay", value: "0.5", description: "Standard overlay" },
  { name: "overlay-heavy", cssVar: "--st-opacity-overlay-heavy", value: "0.7", description: "Heavy overlay" },
  { name: "backdrop", cssVar: "--st-opacity-backdrop", value: "0.8", description: "Modal backdrop" },
];

export function OpacityTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Opacity</h1>
        <p className="spacing-page-description">
          Opacity tokens for transparency effects. Use these for disabled states,
          overlays, ghost buttons, and loading indicators.
        </p>
      </header>

      <section className="spacing-section">
        <div className="spacing-scale-container">
          {OPACITY_TOKENS.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
                <span className="spacing-value">{(parseFloat(token.value) * 100).toFixed(0)}%</span>
              </div>
              <div className="spacing-bar-container">
                <div
                  style={{
                    position: "relative",
                    width: 80,
                    height: 30,
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  {/* Checkered background */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `
                        linear-gradient(45deg, #ccc 25%, transparent 25%),
                        linear-gradient(-45deg, #ccc 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #ccc 75%),
                        linear-gradient(-45deg, transparent 75%, #ccc 75%)
                      `,
                      backgroundSize: "8px 8px",
                      backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
                    }}
                  />
                  {/* Opacity overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "var(--st-color-primary, #7f56d9)",
                      opacity: token.value,
                    }}
                  />
                </div>
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
          <h2 className="spacing-section-title">Visual Reference</h2>
          <p className="spacing-section-text">
            Compare opacity levels side by side.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              marginTop: 16,
            }}
          >
            {OPACITY_TOKENS.map((token) => (
              <div
                key={token.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    background: "var(--st-color-primary, #7f56d9)",
                    opacity: token.value,
                  }}
                />
                <span style={{ fontSize: 11, color: "var(--st-color-text-muted)" }}>
                  {token.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="spacing-section">
        <div className="spacing-card">
          <h2 className="spacing-section-title">Usage</h2>
          <div className="spacing-code-block">
            <div className="spacing-code-header">
              <span>CSS</span>
            </div>
            <pre className="spacing-code-content">{`.btn:disabled {
  opacity: var(--st-opacity-disabled);
  pointer-events: none;
}

.btn-ghost {
  background: oklch(0.5 0.2 250 / var(--st-opacity-ghost));
}
.btn-ghost:hover {
  background: oklch(0.5 0.2 250 / var(--st-opacity-ghost-hover));
}

.modal-backdrop {
  background: oklch(0 0 0 / var(--st-opacity-backdrop));
}

.skeleton {
  opacity: var(--st-opacity-loading);
}

input::placeholder {
  opacity: var(--st-opacity-placeholder);
}`}</pre>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
