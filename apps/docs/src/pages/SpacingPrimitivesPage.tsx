/**
 * Spacing Primitives Page
 * Numeric spacing scale visualization
 */

import { useState } from "react";
import "./SpacingPrimitivesPage.css";

interface SpacingToken {
  name: string;
  cssVar: string;
  value: string;
  pxValue: number;
  description: string;
}

const SPACING_SCALE: SpacingToken[] = [
  { name: "0", cssVar: "--st-spacing-0", value: "0px", pxValue: 0, description: "No spacing" },
  { name: "1", cssVar: "--st-spacing-1", value: "4px", pxValue: 4, description: "1 unit" },
  { name: "2", cssVar: "--st-spacing-2", value: "8px", pxValue: 8, description: "2 units" },
  { name: "3", cssVar: "--st-spacing-3", value: "12px", pxValue: 12, description: "3 units" },
  { name: "4", cssVar: "--st-spacing-4", value: "16px", pxValue: 16, description: "4 units" },
  { name: "5", cssVar: "--st-spacing-5", value: "20px", pxValue: 20, description: "5 units" },
  { name: "6", cssVar: "--st-spacing-6", value: "24px", pxValue: 24, description: "6 units" },
  { name: "7", cssVar: "--st-spacing-7", value: "28px", pxValue: 28, description: "7 units" },
  { name: "8", cssVar: "--st-spacing-8", value: "32px", pxValue: 32, description: "8 units" },
  { name: "9", cssVar: "--st-spacing-9", value: "36px", pxValue: 36, description: "9 units" },
  { name: "10", cssVar: "--st-spacing-10", value: "40px", pxValue: 40, description: "10 units" },
  { name: "11", cssVar: "--st-spacing-11", value: "44px", pxValue: 44, description: "11 units" },
  { name: "12", cssVar: "--st-spacing-12", value: "48px", pxValue: 48, description: "12 units" },
  { name: "14", cssVar: "--st-spacing-14", value: "56px", pxValue: 56, description: "14 units" },
  { name: "16", cssVar: "--st-spacing-16", value: "64px", pxValue: 64, description: "16 units" },
  { name: "20", cssVar: "--st-spacing-20", value: "80px", pxValue: 80, description: "20 units" },
  { name: "24", cssVar: "--st-spacing-24", value: "96px", pxValue: 96, description: "24 units" },
  { name: "32", cssVar: "--st-spacing-32", value: "128px", pxValue: 128, description: "32 units" },
];

export function SpacingPrimitivesPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="spacing-page">
      {/* Page Header */}
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Spacing Primitives</h1>
        <p className="spacing-page-description">
          A comprehensive spacing scale based on a 4px unit for consistent layouts.
          Use numeric values for precise control over margins, padding, and gaps.
        </p>
      </header>

      {/* Spacing Scale Visualization */}
      <section className="spacing-section">
        <div className="spacing-scale-container">
          {SPACING_SCALE.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
                <span className="spacing-value">{token.value}</span>
              </div>
              <div className="spacing-bar-container">
                <div
                  className="spacing-bar"
                  style={{ width: `${Math.min(token.pxValue, 256)}px` }}
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

      {/* Visual Demo */}
      <section className="spacing-section">
        <div className="spacing-card">
          <h2 className="spacing-section-title">Visual Reference</h2>
          <p className="spacing-section-text">
            Spacing tokens visualized side by side for quick comparison.
          </p>
          <div className="spacing-visual-grid">
            {SPACING_SCALE.slice(0, 10).map((token) => (
              <div key={token.cssVar} className="spacing-visual-item">
                <div
                  className="spacing-visual-box"
                  style={{
                    width: `${token.pxValue}px`,
                    height: `${token.pxValue}px`,
                    minWidth: "4px",
                    minHeight: "4px"
                  }}
                />
                <span className="spacing-visual-label">{token.name}</span>
                <span className="spacing-visual-value">{token.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="spacing-section">
        <div className="spacing-card">
          <h2 className="spacing-section-title">Usage</h2>
          <p className="spacing-section-text">
            Import the spacing primitives and use CSS variables for margins, padding, and gaps.
          </p>

          <div className="spacing-code-block">
            <div className="spacing-code-header">
              <span>CSS</span>
              <button
                className="spacing-code-copy"
                onClick={() => handleCopy(`@import "@staple-css/tokens/spacing-primitives.css";

.card {
  padding: var(--st-spacing-4);       /* 16px */
  margin-bottom: var(--st-spacing-6); /* 24px */
}

.button-group {
  gap: var(--st-spacing-2);           /* 8px */
}

.page-section {
  padding-block: var(--st-spacing-16); /* 64px */
}

.icon-text {
  gap: var(--st-spacing-1);           /* 4px */
}`)}
              >
                Copy
              </button>
            </div>
            <pre className="spacing-code-content">{`@import "@staple-css/tokens/spacing-primitives.css";

.card {
  padding: var(--st-spacing-4);       /* 16px */
  margin-bottom: var(--st-spacing-6); /* 24px */
}

.button-group {
  gap: var(--st-spacing-2);           /* 8px */
}

.page-section {
  padding-block: var(--st-spacing-16); /* 64px */
}

.icon-text {
  gap: var(--st-spacing-1);           /* 4px */
}`}</pre>
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="spacing-section">
        <div className="spacing-card">
          <h2 className="spacing-section-title">Spacing Guidelines</h2>
          <div className="spacing-guidelines">
            <div className="spacing-guideline">
              <h3>Component Internals</h3>
              <p>Use <code>1</code> to <code>3</code> (4-12px) for padding and gaps within components.</p>
            </div>
            <div className="spacing-guideline">
              <h3>Between Components</h3>
              <p>Use <code>4</code> to <code>6</code> (16-24px) for spacing between related components.</p>
            </div>
            <div className="spacing-guideline">
              <h3>Section Spacing</h3>
              <p>Use <code>8</code> to <code>16</code> (32-64px) for major section divisions.</p>
            </div>
            <div className="spacing-guideline">
              <h3>Page Layout</h3>
              <p>Use <code>20</code> to <code>32</code> (80-128px) for page-level margins and hero sections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Copied Toast */}
      {copied && (
        <div className="spacing-toast">
          Copied to clipboard
        </div>
      )}
    </div>
  );
}
