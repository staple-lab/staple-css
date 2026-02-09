/**
 * Borders Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface Token {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const BORDER_WIDTHS: Token[] = [
  { name: "width-0", cssVar: "--st-border-width-0", value: "0px", description: "No border" },
  { name: "width-1", cssVar: "--st-border-width-1", value: "1px", description: "Thin border (default)" },
  { name: "width-2", cssVar: "--st-border-width-2", value: "2px", description: "Medium border" },
  { name: "width-4", cssVar: "--st-border-width-4", value: "4px", description: "Thick border" },
  { name: "width-8", cssVar: "--st-border-width-8", value: "8px", description: "Extra thick border" },
];

const BORDER_RADII: Token[] = [
  { name: "radius-none", cssVar: "--st-radius-none", value: "0px", description: "No radius (square)" },
  { name: "radius-sm", cssVar: "--st-radius-sm", value: "4px", description: "Small radius" },
  { name: "radius-md", cssVar: "--st-radius-md", value: "6px", description: "Medium radius (default)" },
  { name: "radius-lg", cssVar: "--st-radius-lg", value: "8px", description: "Large radius" },
  { name: "radius-xl", cssVar: "--st-radius-xl", value: "12px", description: "Extra large radius" },
  { name: "radius-2xl", cssVar: "--st-radius-2xl", value: "16px", description: "2XL radius" },
  { name: "radius-3xl", cssVar: "--st-radius-3xl", value: "24px", description: "3XL radius" },
  { name: "radius-full", cssVar: "--st-radius-full", value: "9999px", description: "Pill/circle shape" },
];

const COMPONENT_RADII: Token[] = [
  { name: "radius-button", cssVar: "--st-radius-button", value: "6px", description: "Button border radius" },
  { name: "radius-input", cssVar: "--st-radius-input", value: "6px", description: "Input border radius" },
  { name: "radius-card", cssVar: "--st-radius-card", value: "12px", description: "Card border radius" },
  { name: "radius-modal", cssVar: "--st-radius-modal", value: "16px", description: "Modal border radius" },
  { name: "radius-tooltip", cssVar: "--st-radius-tooltip", value: "6px", description: "Tooltip border radius" },
  { name: "radius-badge", cssVar: "--st-radius-badge", value: "9999px", description: "Badge border radius (pill)" },
  { name: "radius-avatar", cssVar: "--st-radius-avatar", value: "9999px", description: "Avatar border radius (circle)" },
];

export function BordersTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Borders</h1>
        <p className="spacing-page-description">
          Border width and radius tokens for consistent component styling.
          Includes both primitive scale and component-specific tokens.
        </p>
      </header>

      <section className="spacing-section">
        <h2 className="spacing-section-title" style={{ marginBottom: 16 }}>Border Widths</h2>
        <div className="spacing-scale-container">
          {BORDER_WIDTHS.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
                <span className="spacing-value">{token.value}</span>
              </div>
              <div className="spacing-bar-container">
                <div
                  style={{
                    width: 60,
                    height: 30,
                    borderRadius: 4,
                    background: "var(--st-color-bg-secondary)",
                    border: `${token.value} solid var(--st-color-primary, #7f56d9)`,
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
        <h2 className="spacing-section-title" style={{ marginBottom: 16 }}>Border Radii Scale</h2>
        <div className="spacing-scale-container">
          {BORDER_RADII.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
                <span className="spacing-value">{token.value}</span>
              </div>
              <div className="spacing-bar-container">
                <div
                  style={{
                    width: 60,
                    height: 30,
                    borderRadius: token.value,
                    background: "linear-gradient(135deg, var(--st-color-primary, #7f56d9) 0%, #9e77ed 100%)",
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
        <h2 className="spacing-section-title" style={{ marginBottom: 16 }}>Component Radii</h2>
        <div className="spacing-scale-container">
          {COMPONENT_RADII.map((token) => (
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
            <pre className="spacing-code-content">{`.btn {
  border: var(--st-border-width-1) solid var(--st-color-border-default);
  border-radius: var(--st-radius-button);
}

.card {
  border-radius: var(--st-radius-card);
}

.avatar {
  border-radius: var(--st-radius-avatar);
}

.input:focus {
  border-width: var(--st-border-width-2);
}`}</pre>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
