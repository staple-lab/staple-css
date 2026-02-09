/**
 * Z-Index Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface Token {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const ZINDEX_TOKENS: Token[] = [
  { name: "base", cssVar: "--st-z-base", value: "0", description: "Base layer (default stacking)" },
  { name: "dropdown", cssVar: "--st-z-dropdown", value: "1000", description: "Dropdown menus" },
  { name: "sticky", cssVar: "--st-z-sticky", value: "1100", description: "Sticky headers/elements" },
  { name: "fixed", cssVar: "--st-z-fixed", value: "1200", description: "Fixed position elements" },
  { name: "drawer", cssVar: "--st-z-drawer", value: "1300", description: "Side drawer/panel" },
  { name: "overlay", cssVar: "--st-z-overlay", value: "1400", description: "Background overlay" },
  { name: "modal", cssVar: "--st-z-modal", value: "1500", description: "Modal dialogs" },
  { name: "popover", cssVar: "--st-z-popover", value: "1600", description: "Popovers" },
  { name: "toast", cssVar: "--st-z-toast", value: "1700", description: "Toast notifications" },
  { name: "tooltip", cssVar: "--st-z-tooltip", value: "1800", description: "Tooltips (highest)" },
];

export function ZIndexTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Z-Index</h1>
        <p className="spacing-page-description">
          Z-index tokens for managing stacking order. Use these to ensure
          overlapping elements appear in the correct order.
        </p>
      </header>

      <section className="spacing-section">
        <div className="spacing-scale-container">
          {ZINDEX_TOKENS.map((token, index) => (
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
                    gap: 4,
                  }}
                >
                  {Array.from({ length: index + 1 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: 20,
                        height: 20,
                        background: `oklch(${0.7 - i * 0.05} 0.15 ${250 + i * 10})`,
                        borderRadius: 2,
                        marginLeft: i > 0 ? -8 : 0,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      }}
                    />
                  ))}
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
          <h2 className="spacing-section-title">Stacking Order</h2>
          <p className="spacing-section-text">
            Elements stack in this order from bottom to top:
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              marginTop: 16,
            }}
          >
            {[...ZINDEX_TOKENS].reverse().map((token, i) => (
              <div
                key={token.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "8px 12px",
                  background: `oklch(${0.95 - i * 0.03} 0.02 250)`,
                  borderRadius: 6,
                  fontSize: 13,
                }}
              >
                <span style={{ fontWeight: 600, minWidth: 80 }}>{token.name}</span>
                <code style={{ color: "var(--st-color-text-muted)" }}>{token.value}</code>
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
            <pre className="spacing-code-content">{`.header {
  position: sticky;
  top: 0;
  z-index: var(--st-z-sticky);
}

.modal-backdrop {
  z-index: var(--st-z-overlay);
}

.modal {
  z-index: var(--st-z-modal);
}

.tooltip {
  z-index: var(--st-z-tooltip);
}

.toast-container {
  z-index: var(--st-z-toast);
}`}</pre>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
