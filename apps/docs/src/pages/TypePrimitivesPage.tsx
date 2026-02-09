/**
 * Typography Primitives Page
 * Font sizes, weights, line heights, and letter spacing
 */

import { useState } from "react";
import "./TypePrimitivesPage.css";

interface TypeToken {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const FONT_SIZES: TypeToken[] = [
  { name: "xs", cssVar: "--st-font-size-xs", value: "12px", description: "Extra small text, captions" },
  { name: "sm", cssVar: "--st-font-size-sm", value: "14px", description: "Small text, labels" },
  { name: "base", cssVar: "--st-font-size-base", value: "16px", description: "Body text (default)" },
  { name: "lg", cssVar: "--st-font-size-lg", value: "18px", description: "Large body text" },
  { name: "xl", cssVar: "--st-font-size-xl", value: "20px", description: "Small headings" },
  { name: "2xl", cssVar: "--st-font-size-2xl", value: "24px", description: "Section headings" },
  { name: "3xl", cssVar: "--st-font-size-3xl", value: "30px", description: "Page headings" },
  { name: "4xl", cssVar: "--st-font-size-4xl", value: "36px", description: "Large headings" },
  { name: "5xl", cssVar: "--st-font-size-5xl", value: "48px", description: "Display headings" },
  { name: "6xl", cssVar: "--st-font-size-6xl", value: "60px", description: "Hero text" },
  { name: "7xl", cssVar: "--st-font-size-7xl", value: "72px", description: "Extra large display" },
  { name: "8xl", cssVar: "--st-font-size-8xl", value: "96px", description: "Huge display" },
  { name: "9xl", cssVar: "--st-font-size-9xl", value: "128px", description: "Maximum display" },
];

const FONT_WEIGHTS: TypeToken[] = [
  { name: "thin", cssVar: "--st-font-weight-thin", value: "100", description: "Hairline weight" },
  { name: "extralight", cssVar: "--st-font-weight-extralight", value: "200", description: "Extra light weight" },
  { name: "light", cssVar: "--st-font-weight-light", value: "300", description: "Light weight" },
  { name: "normal", cssVar: "--st-font-weight-normal", value: "400", description: "Normal/regular weight" },
  { name: "medium", cssVar: "--st-font-weight-medium", value: "500", description: "Medium weight" },
  { name: "semibold", cssVar: "--st-font-weight-semibold", value: "600", description: "Semi-bold weight" },
  { name: "bold", cssVar: "--st-font-weight-bold", value: "700", description: "Bold weight" },
  { name: "extrabold", cssVar: "--st-font-weight-extrabold", value: "800", description: "Extra bold weight" },
  { name: "black", cssVar: "--st-font-weight-black", value: "900", description: "Black/heavy weight" },
];

const LINE_HEIGHTS: TypeToken[] = [
  { name: "none", cssVar: "--st-leading-none", value: "1", description: "No line height (tight)" },
  { name: "tight", cssVar: "--st-leading-tight", value: "1.25", description: "Tight line height" },
  { name: "snug", cssVar: "--st-leading-snug", value: "1.375", description: "Snug line height" },
  { name: "normal", cssVar: "--st-leading-normal", value: "1.5", description: "Normal line height" },
  { name: "relaxed", cssVar: "--st-leading-relaxed", value: "1.625", description: "Relaxed line height" },
  { name: "loose", cssVar: "--st-leading-loose", value: "2", description: "Loose line height" },
];

const LETTER_SPACINGS: TypeToken[] = [
  { name: "tighter", cssVar: "--st-tracking-tighter", value: "-0.05em", description: "Very tight tracking" },
  { name: "tight", cssVar: "--st-tracking-tight", value: "-0.025em", description: "Tight tracking" },
  { name: "normal", cssVar: "--st-tracking-normal", value: "0", description: "Normal tracking" },
  { name: "wide", cssVar: "--st-tracking-wide", value: "0.025em", description: "Wide tracking" },
  { name: "wider", cssVar: "--st-tracking-wider", value: "0.05em", description: "Wider tracking" },
  { name: "widest", cssVar: "--st-tracking-widest", value: "0.1em", description: "Widest tracking" },
];

type TabType = "sizes" | "weights" | "heights" | "spacing";

export function TypePrimitivesPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("sizes");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: "sizes", label: "Font Sizes" },
    { id: "weights", label: "Font Weights" },
    { id: "heights", label: "Line Heights" },
    { id: "spacing", label: "Letter Spacing" },
  ];

  return (
    <div className="type-page">
      {/* Page Header */}
      <header className="type-page-header">
        <h1 className="type-page-title">Typography Primitives</h1>
        <p className="type-page-description">
          A complete typography system with font sizes, weights, line heights, and letter spacing
          for consistent, readable text across your application.
        </p>
      </header>

      {/* Tab Switcher */}
      <div className="type-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`type-tab ${activeTab === tab.id ? "type-tab--active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Font Sizes */}
      {activeTab === "sizes" && (
        <section className="type-section">
          <div className="type-scale-container">
            {FONT_SIZES.map((token) => (
              <div key={token.cssVar} className="type-item type-item--size">
                <div className="type-item-preview">
                  <span
                    className="type-preview-text"
                    style={{ fontSize: token.value }}
                  >
                    Aa
                  </span>
                </div>
                <div className="type-item-content">
                  <div className="type-item-header">
                    <span className="type-name">{token.name}</span>
                    <span className="type-value">{token.value}</span>
                  </div>
                  <div className="type-item-footer">
                    <code className="type-var">{token.cssVar}</code>
                    <span className="type-description">{token.description}</span>
                    <button
                      className="type-copy-btn"
                      onClick={() => handleCopy(`var(${token.cssVar})`)}
                    >
                      {copied === `var(${token.cssVar})` ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Font Weights */}
      {activeTab === "weights" && (
        <section className="type-section">
          <div className="type-scale-container">
            {FONT_WEIGHTS.map((token) => (
              <div key={token.cssVar} className="type-item type-item--weight">
                <div className="type-item-preview">
                  <span
                    className="type-preview-text type-preview-text--weight"
                    style={{ fontWeight: token.value }}
                  >
                    The quick brown fox
                  </span>
                </div>
                <div className="type-item-content">
                  <div className="type-item-header">
                    <span className="type-name">{token.name}</span>
                    <span className="type-value">{token.value}</span>
                  </div>
                  <div className="type-item-footer">
                    <code className="type-var">{token.cssVar}</code>
                    <span className="type-description">{token.description}</span>
                    <button
                      className="type-copy-btn"
                      onClick={() => handleCopy(`var(${token.cssVar})`)}
                    >
                      {copied === `var(${token.cssVar})` ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Line Heights */}
      {activeTab === "heights" && (
        <section className="type-section">
          <div className="type-scale-container">
            {LINE_HEIGHTS.map((token) => (
              <div key={token.cssVar} className="type-item type-item--leading">
                <div className="type-item-preview type-item-preview--leading">
                  <span
                    className="type-preview-paragraph"
                    style={{ lineHeight: token.value }}
                  >
                    Typography matters.<br />
                    Good line height improves<br />
                    readability significantly.
                  </span>
                </div>
                <div className="type-item-content">
                  <div className="type-item-header">
                    <span className="type-name">{token.name}</span>
                    <span className="type-value">{token.value}</span>
                  </div>
                  <div className="type-item-footer">
                    <code className="type-var">{token.cssVar}</code>
                    <span className="type-description">{token.description}</span>
                    <button
                      className="type-copy-btn"
                      onClick={() => handleCopy(`var(${token.cssVar})`)}
                    >
                      {copied === `var(${token.cssVar})` ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Letter Spacing */}
      {activeTab === "spacing" && (
        <section className="type-section">
          <div className="type-scale-container">
            {LETTER_SPACINGS.map((token) => (
              <div key={token.cssVar} className="type-item type-item--tracking">
                <div className="type-item-preview">
                  <span
                    className="type-preview-text type-preview-text--tracking"
                    style={{ letterSpacing: token.value }}
                  >
                    LETTER SPACING
                  </span>
                </div>
                <div className="type-item-content">
                  <div className="type-item-header">
                    <span className="type-name">{token.name}</span>
                    <span className="type-value">{token.value}</span>
                  </div>
                  <div className="type-item-footer">
                    <code className="type-var">{token.cssVar}</code>
                    <span className="type-description">{token.description}</span>
                    <button
                      className="type-copy-btn"
                      onClick={() => handleCopy(`var(${token.cssVar})`)}
                    >
                      {copied === `var(${token.cssVar})` ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Usage Section */}
      <section className="type-section">
        <div className="type-card">
          <h2 className="type-section-title">Usage</h2>
          <p className="type-section-text">
            Combine typography tokens for consistent, readable text styles.
          </p>

          <div className="type-code-block">
            <div className="type-code-header">
              <span>CSS</span>
              <button
                className="type-code-copy"
                onClick={() => handleCopy(`@import "@staple-css/tokens/type-primitives.css";

.heading {
  font-size: var(--st-font-size-3xl);
  font-weight: var(--st-font-weight-bold);
  line-height: var(--st-leading-tight);
  letter-spacing: var(--st-tracking-tight);
}

.body {
  font-size: var(--st-font-size-base);
  font-weight: var(--st-font-weight-normal);
  line-height: var(--st-leading-relaxed);
}

.caption {
  font-size: var(--st-font-size-xs);
  font-weight: var(--st-font-weight-medium);
  letter-spacing: var(--st-tracking-wide);
  text-transform: uppercase;
}`)}
              >
                Copy
              </button>
            </div>
            <pre className="type-code-content">{`@import "@staple-css/tokens/type-primitives.css";

.heading {
  font-size: var(--st-font-size-3xl);
  font-weight: var(--st-font-weight-bold);
  line-height: var(--st-leading-tight);
  letter-spacing: var(--st-tracking-tight);
}

.body {
  font-size: var(--st-font-size-base);
  font-weight: var(--st-font-weight-normal);
  line-height: var(--st-leading-relaxed);
}

.caption {
  font-size: var(--st-font-size-xs);
  font-weight: var(--st-font-weight-medium);
  letter-spacing: var(--st-tracking-wide);
  text-transform: uppercase;
}`}</pre>
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="type-section">
        <div className="type-card">
          <h2 className="type-section-title">Typography Guidelines</h2>
          <div className="type-guidelines">
            <div className="type-guideline">
              <h3>Headings</h3>
              <p>Use <code>2xl</code> to <code>5xl</code> with <code>bold</code> or <code>semibold</code> weight and <code>tight</code> line height.</p>
            </div>
            <div className="type-guideline">
              <h3>Body Text</h3>
              <p>Use <code>base</code> or <code>lg</code> with <code>normal</code> weight and <code>relaxed</code> line height for readability.</p>
            </div>
            <div className="type-guideline">
              <h3>Labels & Captions</h3>
              <p>Use <code>xs</code> or <code>sm</code> with <code>medium</code> weight. Consider <code>wide</code> tracking for uppercase.</p>
            </div>
            <div className="type-guideline">
              <h3>Display Text</h3>
              <p>Use <code>6xl</code> to <code>9xl</code> for hero sections with <code>tight</code> or <code>tighter</code> tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Copied Toast */}
      {copied && (
        <div className="type-toast">
          Copied to clipboard
        </div>
      )}
    </div>
  );
}
