/**
 * Spacing: Component Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface SpacingToken {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const PADDING_TOKENS: SpacingToken[] = [
  { name: "padding-xs", cssVar: "--st-component-padding-xs", value: "4px", description: "Extra small padding (badges, tags)" },
  { name: "padding-sm", cssVar: "--st-component-padding-sm", value: "8px", description: "Small padding (compact buttons)" },
  { name: "padding-md", cssVar: "--st-component-padding-md", value: "12px", description: "Medium padding (default buttons)" },
  { name: "padding-lg", cssVar: "--st-component-padding-lg", value: "16px", description: "Large padding (cards, modals)" },
  { name: "padding-xl", cssVar: "--st-component-padding-xl", value: "24px", description: "Extra large padding (sections)" },
];

const GAP_TOKENS: SpacingToken[] = [
  { name: "gap-xs", cssVar: "--st-component-gap-xs", value: "4px", description: "Extra small gap (icon + text)" },
  { name: "gap-sm", cssVar: "--st-component-gap-sm", value: "8px", description: "Small gap (form fields)" },
  { name: "gap-md", cssVar: "--st-component-gap-md", value: "12px", description: "Medium gap (button groups)" },
  { name: "gap-lg", cssVar: "--st-component-gap-lg", value: "16px", description: "Large gap (card content)" },
  { name: "gap-xl", cssVar: "--st-component-gap-xl", value: "24px", description: "Extra large gap (sections)" },
];

export function SpacingComponentTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Spacing: Component</h1>
        <p className="spacing-page-description">
          Semantic spacing tokens for component internals. Use these for padding
          and gaps within components to ensure consistent sizing.
        </p>
      </header>

      <section className="spacing-section">
        <h2 className="spacing-section-title" style={{ marginBottom: 16 }}>Component Padding</h2>
        <div className="spacing-scale-container">
          {PADDING_TOKENS.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
                <span className="spacing-value">{token.value}</span>
              </div>
              <div className="spacing-bar-container">
                <div className="spacing-bar" style={{ width: parseInt(token.value) * 2 }} />
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
        <h2 className="spacing-section-title" style={{ marginBottom: 16 }}>Component Gaps</h2>
        <div className="spacing-scale-container">
          {GAP_TOKENS.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
                <span className="spacing-value">{token.value}</span>
              </div>
              <div className="spacing-bar-container">
                <div className="spacing-bar" style={{ width: parseInt(token.value) * 2 }} />
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
  padding: var(--st-component-padding-sm) var(--st-component-padding-md);
}

.btn-lg {
  padding: var(--st-component-padding-md) var(--st-component-padding-lg);
}

.card {
  padding: var(--st-component-padding-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--st-component-gap-sm);
}

.button-group {
  display: flex;
  gap: var(--st-component-gap-md);
}`}</pre>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
