/**
 * Spacing: Layout Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface SpacingToken {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const LAYOUT_TOKENS: SpacingToken[] = [
  { name: "page-margin", cssVar: "--st-layout-page-margin", value: "24px", description: "Horizontal page margins" },
  { name: "page-margin-lg", cssVar: "--st-layout-page-margin-lg", value: "48px", description: "Larger screens page margin" },
  { name: "section-gap", cssVar: "--st-layout-section-gap", value: "64px", description: "Space between major sections" },
  { name: "section-gap-sm", cssVar: "--st-layout-section-gap-sm", value: "40px", description: "Smaller section gaps" },
  { name: "stack-gap", cssVar: "--st-layout-stack-gap", value: "24px", description: "Default vertical stack spacing" },
  { name: "stack-gap-sm", cssVar: "--st-layout-stack-gap-sm", value: "16px", description: "Small vertical stack spacing" },
  { name: "stack-gap-lg", cssVar: "--st-layout-stack-gap-lg", value: "32px", description: "Large vertical stack spacing" },
  { name: "gutter", cssVar: "--st-layout-gutter", value: "24px", description: "Grid/column gutter width" },
  { name: "gutter-sm", cssVar: "--st-layout-gutter-sm", value: "16px", description: "Small gutter width" },
  { name: "gutter-lg", cssVar: "--st-layout-gutter-lg", value: "32px", description: "Large gutter width" },
  { name: "sidebar-width", cssVar: "--st-layout-sidebar-width", value: "280px", description: "Default sidebar width" },
  { name: "content-max-width", cssVar: "--st-layout-content-max-width", value: "1200px", description: "Maximum content width" },
];

export function SpacingLayoutTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Spacing: Layout</h1>
        <p className="spacing-page-description">
          Semantic spacing tokens for page-level layout. Use these for margins,
          sections, stacks, and grid gutters.
        </p>
      </header>

      <section className="spacing-section">
        <div className="spacing-scale-container">
          {LAYOUT_TOKENS.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
                <span className="spacing-value">{token.value}</span>
              </div>
              <div className="spacing-bar-container">
                <div
                  className="spacing-bar"
                  style={{ width: Math.min(parseInt(token.value), 256) }}
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
            <pre className="spacing-code-content">{`.page {
  padding-inline: var(--st-layout-page-margin);
  max-width: var(--st-layout-content-max-width);
  margin: 0 auto;
}

.section {
  padding-block: var(--st-layout-section-gap);
}

.stack {
  display: flex;
  flex-direction: column;
  gap: var(--st-layout-stack-gap);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--st-layout-gutter);
}

.sidebar-layout {
  display: grid;
  grid-template-columns: var(--st-layout-sidebar-width) 1fr;
  gap: var(--st-layout-gutter-lg);
}`}</pre>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
