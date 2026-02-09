/**
 * Spacing: Inset Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface InsetToken {
  name: string;
  cssVar: string;
  value: string;
  description: string;
  preview: { top: number; right: number; bottom: number; left: number };
}

const INSET_TOKENS: InsetToken[] = [
  {
    name: "uniform-xs",
    cssVar: "--st-inset-uniform-xs",
    value: "4px",
    description: "Extra small uniform padding",
    preview: { top: 4, right: 4, bottom: 4, left: 4 },
  },
  {
    name: "uniform-sm",
    cssVar: "--st-inset-uniform-sm",
    value: "8px",
    description: "Small uniform padding",
    preview: { top: 8, right: 8, bottom: 8, left: 8 },
  },
  {
    name: "uniform-md",
    cssVar: "--st-inset-uniform-md",
    value: "12px",
    description: "Medium uniform padding",
    preview: { top: 12, right: 12, bottom: 12, left: 12 },
  },
  {
    name: "uniform-lg",
    cssVar: "--st-inset-uniform-lg",
    value: "16px",
    description: "Large uniform padding",
    preview: { top: 16, right: 16, bottom: 16, left: 16 },
  },
  {
    name: "uniform-xl",
    cssVar: "--st-inset-uniform-xl",
    value: "24px",
    description: "Extra large uniform padding",
    preview: { top: 24, right: 24, bottom: 24, left: 24 },
  },
  {
    name: "squish-sm",
    cssVar: "--st-inset-squish-sm",
    value: "4px 8px",
    description: "Small squish inset (less vertical)",
    preview: { top: 4, right: 8, bottom: 4, left: 8 },
  },
  {
    name: "squish-md",
    cssVar: "--st-inset-squish-md",
    value: "8px 16px",
    description: "Medium squish inset",
    preview: { top: 8, right: 16, bottom: 8, left: 16 },
  },
  {
    name: "squish-lg",
    cssVar: "--st-inset-squish-lg",
    value: "12px 24px",
    description: "Large squish inset",
    preview: { top: 12, right: 24, bottom: 12, left: 24 },
  },
  {
    name: "stretch-sm",
    cssVar: "--st-inset-stretch-sm",
    value: "8px 4px",
    description: "Small stretch inset (more vertical)",
    preview: { top: 8, right: 4, bottom: 8, left: 4 },
  },
  {
    name: "stretch-md",
    cssVar: "--st-inset-stretch-md",
    value: "16px 8px",
    description: "Medium stretch inset",
    preview: { top: 16, right: 8, bottom: 16, left: 8 },
  },
];

export function SpacingInsetTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Spacing: Inset</h1>
        <p className="spacing-page-description">
          Inset tokens for padding patterns. Includes uniform (equal all sides),
          squish (less vertical), and stretch (more vertical) variants.
        </p>
      </header>

      <section className="spacing-section">
        <div className="spacing-scale-container">
          {INSET_TOKENS.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
                <span className="spacing-value">{token.value}</span>
              </div>
              <div className="spacing-bar-container">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: `${token.preview.top}px ${token.preview.right}px ${token.preview.bottom}px ${token.preview.left}px`,
                    background: "linear-gradient(135deg, var(--st-color-primary, #7f56d9) 0%, #9e77ed 100%)",
                    borderRadius: 4,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 20,
                      background: "var(--st-color-bg-primary)",
                      borderRadius: 2,
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
          <h2 className="spacing-section-title">Usage</h2>
          <div className="spacing-code-block">
            <div className="spacing-code-header">
              <span>CSS</span>
            </div>
            <pre className="spacing-code-content">{`/* Uniform padding - same on all sides */
.badge {
  padding: var(--st-inset-uniform-xs);
}

.card {
  padding: var(--st-inset-uniform-lg);
}

/* Squish - less vertical, more horizontal (buttons) */
.btn {
  padding: var(--st-inset-squish-md);
}

/* Stretch - more vertical, less horizontal (lists) */
.list-item {
  padding: var(--st-inset-stretch-md);
}`}</pre>
          </div>
        </div>
      </section>

      <section className="spacing-section">
        <div className="spacing-card">
          <h2 className="spacing-section-title">When to Use Each Type</h2>
          <div className="spacing-guidelines">
            <div className="spacing-guideline">
              <h3>Uniform</h3>
              <p>Use for cards, badges, and containers where equal spacing on all sides is desired.</p>
            </div>
            <div className="spacing-guideline">
              <h3>Squish</h3>
              <p>Use for buttons, pills, and horizontal elements where text flows horizontally.</p>
            </div>
            <div className="spacing-guideline">
              <h3>Stretch</h3>
              <p>Use for list items, table cells, and vertical elements where content stacks.</p>
            </div>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
