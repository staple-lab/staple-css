/**
 * Sizing: Layout Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface SizingToken {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const CONTAINER_WIDTHS: SizingToken[] = [
  { name: "container-xs", cssVar: "--st-size-container-xs", value: "320px", description: "Extra small container" },
  { name: "container-sm", cssVar: "--st-size-container-sm", value: "640px", description: "Small container" },
  { name: "container-md", cssVar: "--st-size-container-md", value: "768px", description: "Medium container" },
  { name: "container-lg", cssVar: "--st-size-container-lg", value: "1024px", description: "Large container" },
  { name: "container-xl", cssVar: "--st-size-container-xl", value: "1280px", description: "Extra large container" },
  { name: "container-2xl", cssVar: "--st-size-container-2xl", value: "1536px", description: "2XL container" },
];

const MODAL_WIDTHS: SizingToken[] = [
  { name: "modal-sm", cssVar: "--st-size-modal-sm", value: "400px", description: "Small modal dialogs" },
  { name: "modal-md", cssVar: "--st-size-modal-md", value: "560px", description: "Medium modal dialogs" },
  { name: "modal-lg", cssVar: "--st-size-modal-lg", value: "720px", description: "Large modal dialogs" },
  { name: "modal-xl", cssVar: "--st-size-modal-xl", value: "900px", description: "Extra large modals" },
  { name: "modal-full", cssVar: "--st-size-modal-full", value: "calc(100vw - 48px)", description: "Full-width modal" },
];

const SIDEBAR_WIDTHS: SizingToken[] = [
  { name: "sidebar-collapsed", cssVar: "--st-size-sidebar-collapsed", value: "64px", description: "Collapsed sidebar" },
  { name: "sidebar-sm", cssVar: "--st-size-sidebar-sm", value: "200px", description: "Small sidebar" },
  { name: "sidebar-md", cssVar: "--st-size-sidebar-md", value: "256px", description: "Medium sidebar" },
  { name: "sidebar-lg", cssVar: "--st-size-sidebar-lg", value: "320px", description: "Large sidebar" },
];

const CARD_WIDTHS: SizingToken[] = [
  { name: "card-sm", cssVar: "--st-size-card-sm", value: "280px", description: "Small card min-width" },
  { name: "card-md", cssVar: "--st-size-card-md", value: "320px", description: "Medium card min-width" },
  { name: "card-lg", cssVar: "--st-size-card-lg", value: "400px", description: "Large card min-width" },
];

export function SizingLayoutTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const renderSection = (title: string, tokens: SizingToken[]) => (
    <section className="spacing-section">
      <h2 className="spacing-section-title" style={{ marginBottom: 16 }}>{title}</h2>
      <div className="spacing-scale-container">
        {tokens.map((token) => (
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
  );

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Sizing: Layout</h1>
        <p className="spacing-page-description">
          Semantic sizing tokens for layout structures. Defines widths for
          containers, modals, sidebars, and cards.
        </p>
      </header>

      {renderSection("Containers", CONTAINER_WIDTHS)}
      {renderSection("Modals", MODAL_WIDTHS)}
      {renderSection("Sidebars", SIDEBAR_WIDTHS)}
      {renderSection("Cards", CARD_WIDTHS)}

      <section className="spacing-section">
        <div className="spacing-card">
          <h2 className="spacing-section-title">Usage</h2>
          <div className="spacing-code-block">
            <div className="spacing-code-header">
              <span>CSS</span>
            </div>
            <pre className="spacing-code-content">{`.container {
  max-width: var(--st-size-container-lg);
  margin: 0 auto;
}

.modal {
  width: var(--st-size-modal-md);
  max-width: 100%;
}

.sidebar {
  width: var(--st-size-sidebar-md);
}

.sidebar.collapsed {
  width: var(--st-size-sidebar-collapsed);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--st-size-card-md), 1fr));
}`}</pre>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
