/**
 * Sizing Primitives Page
 * Fixed and relative sizing scale visualization
 */

import { useState } from "react";
import "./SizingPrimitivesPage.css";

interface SizingToken {
  name: string;
  cssVar: string;
  value: string;
  pxValue: number;
  description: string;
}

const FIXED_SIZING: SizingToken[] = [
  { name: "0", cssVar: "--st-size-0", value: "0px", pxValue: 0, description: "No size" },
  { name: "1", cssVar: "--st-size-1", value: "4px", pxValue: 4, description: "1 unit (4px)" },
  { name: "2", cssVar: "--st-size-2", value: "8px", pxValue: 8, description: "2 units (8px)" },
  { name: "3", cssVar: "--st-size-3", value: "12px", pxValue: 12, description: "3 units (12px)" },
  { name: "4", cssVar: "--st-size-4", value: "16px", pxValue: 16, description: "4 units (16px)" },
  { name: "5", cssVar: "--st-size-5", value: "20px", pxValue: 20, description: "5 units (20px)" },
  { name: "6", cssVar: "--st-size-6", value: "24px", pxValue: 24, description: "6 units (24px)" },
  { name: "7", cssVar: "--st-size-7", value: "28px", pxValue: 28, description: "7 units (28px)" },
  { name: "8", cssVar: "--st-size-8", value: "32px", pxValue: 32, description: "8 units (32px)" },
  { name: "9", cssVar: "--st-size-9", value: "36px", pxValue: 36, description: "9 units (36px)" },
  { name: "10", cssVar: "--st-size-10", value: "40px", pxValue: 40, description: "10 units (40px)" },
  { name: "11", cssVar: "--st-size-11", value: "44px", pxValue: 44, description: "11 units (44px)" },
  { name: "12", cssVar: "--st-size-12", value: "48px", pxValue: 48, description: "12 units (48px)" },
  { name: "14", cssVar: "--st-size-14", value: "56px", pxValue: 56, description: "14 units (56px)" },
  { name: "16", cssVar: "--st-size-16", value: "64px", pxValue: 64, description: "16 units (64px)" },
  { name: "20", cssVar: "--st-size-20", value: "80px", pxValue: 80, description: "20 units (80px)" },
  { name: "24", cssVar: "--st-size-24", value: "96px", pxValue: 96, description: "24 units (96px)" },
  { name: "28", cssVar: "--st-size-28", value: "112px", pxValue: 112, description: "28 units (112px)" },
  { name: "32", cssVar: "--st-size-32", value: "128px", pxValue: 128, description: "32 units (128px)" },
  { name: "36", cssVar: "--st-size-36", value: "144px", pxValue: 144, description: "36 units (144px)" },
  { name: "40", cssVar: "--st-size-40", value: "160px", pxValue: 160, description: "40 units (160px)" },
  { name: "44", cssVar: "--st-size-44", value: "176px", pxValue: 176, description: "44 units (176px)" },
  { name: "48", cssVar: "--st-size-48", value: "192px", pxValue: 192, description: "48 units (192px)" },
  { name: "52", cssVar: "--st-size-52", value: "208px", pxValue: 208, description: "52 units (208px)" },
  { name: "56", cssVar: "--st-size-56", value: "224px", pxValue: 224, description: "56 units (224px)" },
  { name: "60", cssVar: "--st-size-60", value: "240px", pxValue: 240, description: "60 units (240px)" },
  { name: "64", cssVar: "--st-size-64", value: "256px", pxValue: 256, description: "64 units (256px)" },
  { name: "72", cssVar: "--st-size-72", value: "288px", pxValue: 288, description: "72 units (288px)" },
  { name: "80", cssVar: "--st-size-80", value: "320px", pxValue: 320, description: "80 units (320px)" },
  { name: "96", cssVar: "--st-size-96", value: "384px", pxValue: 384, description: "96 units (384px)" },
];

interface RelativeToken {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const RELATIVE_SIZING: RelativeToken[] = [
  { name: "auto", cssVar: "--st-size-auto", value: "auto", description: "Automatic sizing" },
  { name: "full", cssVar: "--st-size-full", value: "100%", description: "Full parent width/height" },
  { name: "1/2", cssVar: "--st-size-1-2", value: "50%", description: "Half of parent" },
  { name: "1/3", cssVar: "--st-size-1-3", value: "33.333%", description: "One third" },
  { name: "2/3", cssVar: "--st-size-2-3", value: "66.667%", description: "Two thirds" },
  { name: "1/4", cssVar: "--st-size-1-4", value: "25%", description: "One quarter" },
  { name: "3/4", cssVar: "--st-size-3-4", value: "75%", description: "Three quarters" },
  { name: "1/5", cssVar: "--st-size-1-5", value: "20%", description: "One fifth" },
  { name: "2/5", cssVar: "--st-size-2-5", value: "40%", description: "Two fifths" },
  { name: "3/5", cssVar: "--st-size-3-5", value: "60%", description: "Three fifths" },
  { name: "4/5", cssVar: "--st-size-4-5", value: "80%", description: "Four fifths" },
  { name: "screen", cssVar: "--st-size-screen", value: "100vw", description: "Full viewport width" },
  { name: "screen-h", cssVar: "--st-size-screen-h", value: "100vh", description: "Full viewport height" },
  { name: "min", cssVar: "--st-size-min", value: "min-content", description: "Minimum content size" },
  { name: "max", cssVar: "--st-size-max", value: "max-content", description: "Maximum content size" },
  { name: "fit", cssVar: "--st-size-fit", value: "fit-content", description: "Fit to content" },
];

export function SizingPrimitivesPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"fixed" | "relative">("fixed");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="sizing-page">
      {/* Page Header */}
      <header className="sizing-page-header">
        <h1 className="sizing-page-title">Sizing Primitives</h1>
        <p className="sizing-page-description">
          A comprehensive sizing scale for consistent dimensions. Use fixed values (based on 4px unit)
          for precise control or relative values for fluid layouts.
        </p>
      </header>

      {/* Tab Switcher */}
      <div className="sizing-tabs">
        <button
          className={`sizing-tab ${activeTab === "fixed" ? "sizing-tab--active" : ""}`}
          onClick={() => setActiveTab("fixed")}
        >
          Fixed Scale (0–96)
        </button>
        <button
          className={`sizing-tab ${activeTab === "relative" ? "sizing-tab--active" : ""}`}
          onClick={() => setActiveTab("relative")}
        >
          Relative Values
        </button>
      </div>

      {/* Fixed Sizing Scale */}
      {activeTab === "fixed" && (
        <section className="sizing-section">
          <div className="sizing-scale-container">
            {FIXED_SIZING.map((token) => (
              <div key={token.cssVar} className="sizing-item">
                <div className="sizing-item-header">
                  <span className="sizing-name">{token.name}</span>
                  <span className="sizing-value">{token.value}</span>
                </div>
                <div className="sizing-bar-container">
                  <div
                    className="sizing-bar"
                    style={{ width: `${Math.min(token.pxValue, 256)}px` }}
                  />
                </div>
                <div className="sizing-item-footer">
                  <code className="sizing-var">{token.cssVar}</code>
                  <span className="sizing-description">{token.description}</span>
                  <button
                    className="sizing-copy-btn"
                    onClick={() => handleCopy(`var(${token.cssVar})`)}
                  >
                    {copied === `var(${token.cssVar})` ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Relative Sizing */}
      {activeTab === "relative" && (
        <section className="sizing-section">
          <div className="sizing-scale-container">
            {RELATIVE_SIZING.map((token) => (
              <div key={token.cssVar} className="sizing-item sizing-item--relative">
                <div className="sizing-item-header">
                  <span className="sizing-name">{token.name}</span>
                  <span className="sizing-value">{token.value}</span>
                </div>
                <div className="sizing-item-footer">
                  <code className="sizing-var">{token.cssVar}</code>
                  <span className="sizing-description">{token.description}</span>
                  <button
                    className="sizing-copy-btn"
                    onClick={() => handleCopy(`var(${token.cssVar})`)}
                  >
                    {copied === `var(${token.cssVar})` ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Visual Demo */}
      <section className="sizing-section">
        <div className="sizing-card">
          <h2 className="sizing-section-title">Visual Reference</h2>
          <p className="sizing-section-text">
            Common sizes visualized for quick comparison.
          </p>
          <div className="sizing-visual-grid">
            {[
              { name: "4", size: 16 },
              { name: "8", size: 32 },
              { name: "12", size: 48 },
              { name: "16", size: 64 },
              { name: "20", size: 80 },
              { name: "24", size: 96 },
            ].map((item) => (
              <div key={item.name} className="sizing-visual-item">
                <div
                  className="sizing-visual-box"
                  style={{
                    width: `${item.size}px`,
                    height: `${item.size}px`,
                  }}
                />
                <span className="sizing-visual-label">{item.name}</span>
                <span className="sizing-visual-value">{item.size}px</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="sizing-section">
        <div className="sizing-card">
          <h2 className="sizing-section-title">Usage</h2>
          <p className="sizing-section-text">
            Use sizing tokens for widths, heights, and dimension constraints.
          </p>

          <div className="sizing-code-block">
            <div className="sizing-code-header">
              <span>CSS</span>
              <button
                className="sizing-code-copy"
                onClick={() => handleCopy(`@import "@staple-css/tokens/sizing-primitives.css";

.avatar {
  width: var(--st-size-10);       /* 40px */
  height: var(--st-size-10);      /* 40px */
}

.sidebar {
  width: var(--st-size-64);       /* 256px */
  min-height: var(--st-size-screen-h);
}

.modal {
  max-width: var(--st-size-96);   /* 384px */
  width: var(--st-size-full);     /* 100% */
}

.icon-sm { width: var(--st-size-4); }  /* 16px */
.icon-md { width: var(--st-size-6); }  /* 24px */
.icon-lg { width: var(--st-size-8); }  /* 32px */`)}
              >
                Copy
              </button>
            </div>
            <pre className="sizing-code-content">{`@import "@staple-css/tokens/sizing-primitives.css";

.avatar {
  width: var(--st-size-10);       /* 40px */
  height: var(--st-size-10);      /* 40px */
}

.sidebar {
  width: var(--st-size-64);       /* 256px */
  min-height: var(--st-size-screen-h);
}

.modal {
  max-width: var(--st-size-96);   /* 384px */
  width: var(--st-size-full);     /* 100% */
}

.icon-sm { width: var(--st-size-4); }  /* 16px */
.icon-md { width: var(--st-size-6); }  /* 24px */
.icon-lg { width: var(--st-size-8); }  /* 32px */`}</pre>
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="sizing-section">
        <div className="sizing-card">
          <h2 className="sizing-section-title">Sizing Guidelines</h2>
          <div className="sizing-guidelines">
            <div className="sizing-guideline">
              <h3>Icons & Controls</h3>
              <p>Use <code>4</code> to <code>10</code> (16-40px) for icons, buttons, and form controls.</p>
            </div>
            <div className="sizing-guideline">
              <h3>Avatars & Thumbnails</h3>
              <p>Use <code>8</code> to <code>16</code> (32-64px) for avatar sizes and small images.</p>
            </div>
            <div className="sizing-guideline">
              <h3>Containers</h3>
              <p>Use <code>64</code> to <code>96</code> (256-384px) for sidebars, cards, and modals.</p>
            </div>
            <div className="sizing-guideline">
              <h3>Fluid Layouts</h3>
              <p>Use relative values like <code>full</code>, <code>1/2</code>, <code>screen</code> for responsive designs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Copied Toast */}
      {copied && (
        <div className="sizing-toast">
          Copied to clipboard
        </div>
      )}
    </div>
  );
}
