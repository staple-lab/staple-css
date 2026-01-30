/**
 * Colors Page - Polaris-inspired Color Ramp Tool
 * Clean, minimal aesthetic with Inter typography
 * Card-based layout with generous whitespace
 */

import { useState } from "react";
import "./ColorsPage.css";

const COLOR_FAMILIES = [
  "gray",
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "teal",
  "cyan",
  "blue",
  "purple",
  "magenta",
  "rose",
] as const;

const SHADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

// OKLCH values for each color family and shade
const OKLCH_VALUES: Record<string, Record<number, string>> = {
  gray: {
    1: "oklch(0.98 0 0)", 2: "oklch(0.94 0 0)", 3: "oklch(0.88 0 0)", 4: "oklch(0.80 0 0)",
    5: "oklch(0.71 0 0)", 6: "oklch(0.62 0 0)", 7: "oklch(0.53 0 0)", 8: "oklch(0.44 0 0)",
    9: "oklch(0.36 0 0)", 10: "oklch(0.28 0 0)", 11: "oklch(0.21 0 0)", 12: "oklch(0.15 0 0)",
  },
  red: {
    1: "oklch(0.98 0.015 25)", 2: "oklch(0.94 0.045 25)", 3: "oklch(0.88 0.090 25)", 4: "oklch(0.80 0.140 25)",
    5: "oklch(0.71 0.190 25)", 6: "oklch(0.62 0.220 25)", 7: "oklch(0.53 0.210 25)", 8: "oklch(0.44 0.185 25)",
    9: "oklch(0.36 0.160 25)", 10: "oklch(0.28 0.130 25)", 11: "oklch(0.21 0.100 25)", 12: "oklch(0.15 0.070 25)",
  },
  orange: {
    1: "oklch(0.98 0.015 50)", 2: "oklch(0.94 0.050 50)", 3: "oklch(0.88 0.100 50)", 4: "oklch(0.80 0.145 50)",
    5: "oklch(0.71 0.175 50)", 6: "oklch(0.62 0.180 50)", 7: "oklch(0.53 0.165 50)", 8: "oklch(0.44 0.145 50)",
    9: "oklch(0.36 0.125 50)", 10: "oklch(0.28 0.100 50)", 11: "oklch(0.21 0.075 50)", 12: "oklch(0.15 0.055 50)",
  },
  yellow: {
    1: "oklch(0.98 0.025 90)", 2: "oklch(0.94 0.070 90)", 3: "oklch(0.88 0.130 90)", 4: "oklch(0.80 0.175 90)",
    5: "oklch(0.71 0.185 90)", 6: "oklch(0.62 0.170 90)", 7: "oklch(0.53 0.150 90)", 8: "oklch(0.44 0.125 90)",
    9: "oklch(0.36 0.100 90)", 10: "oklch(0.28 0.080 90)", 11: "oklch(0.21 0.060 90)", 12: "oklch(0.15 0.045 90)",
  },
  lime: {
    1: "oklch(0.98 0.025 125)", 2: "oklch(0.94 0.065 125)", 3: "oklch(0.88 0.120 125)", 4: "oklch(0.80 0.165 125)",
    5: "oklch(0.71 0.190 125)", 6: "oklch(0.62 0.180 125)", 7: "oklch(0.53 0.160 125)", 8: "oklch(0.44 0.135 125)",
    9: "oklch(0.36 0.110 125)", 10: "oklch(0.28 0.085 125)", 11: "oklch(0.21 0.065 125)", 12: "oklch(0.15 0.050 125)",
  },
  green: {
    1: "oklch(0.98 0.020 145)", 2: "oklch(0.94 0.055 145)", 3: "oklch(0.88 0.105 145)", 4: "oklch(0.80 0.155 145)",
    5: "oklch(0.71 0.185 145)", 6: "oklch(0.62 0.180 145)", 7: "oklch(0.53 0.165 145)", 8: "oklch(0.44 0.140 145)",
    9: "oklch(0.36 0.115 145)", 10: "oklch(0.28 0.090 145)", 11: "oklch(0.21 0.070 145)", 12: "oklch(0.15 0.050 145)",
  },
  teal: {
    1: "oklch(0.98 0.018 175)", 2: "oklch(0.94 0.050 175)", 3: "oklch(0.88 0.095 175)", 4: "oklch(0.80 0.140 175)",
    5: "oklch(0.71 0.165 175)", 6: "oklch(0.62 0.165 175)", 7: "oklch(0.53 0.150 175)", 8: "oklch(0.44 0.130 175)",
    9: "oklch(0.36 0.105 175)", 10: "oklch(0.28 0.085 175)", 11: "oklch(0.21 0.065 175)", 12: "oklch(0.15 0.050 175)",
  },
  cyan: {
    1: "oklch(0.98 0.018 200)", 2: "oklch(0.94 0.050 200)", 3: "oklch(0.88 0.095 200)", 4: "oklch(0.80 0.140 200)",
    5: "oklch(0.71 0.165 200)", 6: "oklch(0.62 0.165 200)", 7: "oklch(0.53 0.150 200)", 8: "oklch(0.44 0.130 200)",
    9: "oklch(0.36 0.110 200)", 10: "oklch(0.28 0.085 200)", 11: "oklch(0.21 0.065 200)", 12: "oklch(0.15 0.050 200)",
  },
  blue: {
    1: "oklch(0.98 0.018 260)", 2: "oklch(0.94 0.050 260)", 3: "oklch(0.88 0.095 260)", 4: "oklch(0.80 0.145 260)",
    5: "oklch(0.71 0.185 260)", 6: "oklch(0.62 0.200 260)", 7: "oklch(0.53 0.195 260)", 8: "oklch(0.44 0.175 260)",
    9: "oklch(0.36 0.150 260)", 10: "oklch(0.28 0.120 260)", 11: "oklch(0.21 0.090 260)", 12: "oklch(0.15 0.065 260)",
  },
  purple: {
    1: "oklch(0.98 0.018 295)", 2: "oklch(0.94 0.050 295)", 3: "oklch(0.88 0.095 295)", 4: "oklch(0.80 0.140 295)",
    5: "oklch(0.71 0.175 295)", 6: "oklch(0.62 0.190 295)", 7: "oklch(0.53 0.180 295)", 8: "oklch(0.44 0.160 295)",
    9: "oklch(0.36 0.135 295)", 10: "oklch(0.28 0.110 295)", 11: "oklch(0.21 0.085 295)", 12: "oklch(0.15 0.065 295)",
  },
  magenta: {
    1: "oklch(0.98 0.018 330)", 2: "oklch(0.94 0.050 330)", 3: "oklch(0.88 0.095 330)", 4: "oklch(0.80 0.145 330)",
    5: "oklch(0.71 0.185 330)", 6: "oklch(0.62 0.200 330)", 7: "oklch(0.53 0.190 330)", 8: "oklch(0.44 0.165 330)",
    9: "oklch(0.36 0.140 330)", 10: "oklch(0.28 0.110 330)", 11: "oklch(0.21 0.085 330)", 12: "oklch(0.15 0.065 330)",
  },
  rose: {
    1: "oklch(0.98 0.015 10)", 2: "oklch(0.94 0.045 10)", 3: "oklch(0.88 0.090 10)", 4: "oklch(0.80 0.140 10)",
    5: "oklch(0.71 0.185 10)", 6: "oklch(0.62 0.205 10)", 7: "oklch(0.53 0.195 10)", 8: "oklch(0.44 0.170 10)",
    9: "oklch(0.36 0.145 10)", 10: "oklch(0.28 0.115 10)", 11: "oklch(0.21 0.090 10)", 12: "oklch(0.15 0.065 10)",
  },
};

interface HoverInfo {
  family: string;
  shade: number;
  cssVar: string;
  oklch: string;
}

function getColorDescription(family: string): string {
  const descriptions: Record<string, string> = {
    gray: "Neutral tones for text, backgrounds, and borders",
    red: "Critical actions, errors, and destructive operations",
    orange: "High-priority warnings and attention-grabbing elements",
    yellow: "Low-priority warnings and caution indicators",
    lime: "Fresh, active states and positive highlights",
    green: "Success states, confirmations, and positive actions",
    teal: "Information, navigation, and secondary accents",
    cyan: "Highlights, links, and interactive accents",
    blue: "Primary actions, interactive elements, and focus states",
    purple: "Premium features, magic, and special content",
    magenta: "Emphasis, decorative elements, and creative accents",
    rose: "Soft accents, warmth, and approachable tones",
  };
  return descriptions[family] || "";
}

export function ColorsPage() {
  const [hovered, setHovered] = useState<HoverInfo | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="polaris-colors-page">
      {/* Page Header */}
      <header className="polaris-page-header">
        <h1 className="polaris-page-title">Global palette</h1>
        <p className="polaris-page-description">
          The global palette contains 12 color families with 12 perceptually uniform shades each,
          built on the OKLCH color space for consistent contrast ratios across hues.
        </p>
      </header>

      {/* Floating Info Bar */}
      {hovered && (
        <div className="polaris-info-bar">
          <div className="polaris-info-bar-inner">
            <div
              className="polaris-info-swatch"
              style={{ backgroundColor: `var(${hovered.cssVar})` }}
            />
            <div className="polaris-info-details">
              <span className="polaris-info-var">{hovered.cssVar}</span>
              <span className="polaris-info-oklch">{hovered.oklch}</span>
            </div>
            <button
              className="polaris-copy-btn"
              onClick={() => handleCopy(`var(${hovered.cssVar})`)}
            >
              {copied === `var(${hovered.cssVar})` ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {/* Color Palette Grid */}
      <section className="polaris-section">
        <div className="polaris-palette-container">
          {/* Shade labels header */}
          <div className="polaris-shade-header">
            <div className="polaris-family-label-space" />
            <div className="polaris-shade-labels">
              {SHADES.map((shade) => (
                <span key={shade} className="polaris-shade-label">{shade}</span>
              ))}
            </div>
          </div>

          {/* Color rows */}
          <div className="polaris-palette-rows">
            {COLOR_FAMILIES.map((family) => (
              <div
                key={family}
                className={`polaris-palette-row ${selectedFamily === family ? "polaris-palette-row--selected" : ""}`}
                onClick={() => setSelectedFamily(selectedFamily === family ? null : family)}
              >
                <span className="polaris-family-label">
                  {family.charAt(0).toUpperCase() + family.slice(1)}
                </span>
                <div className="polaris-swatches">
                  {SHADES.map((shade) => {
                    const cssVar = `--st-${family}-${shade}`;
                    const oklch = OKLCH_VALUES[family]?.[shade] || "";
                    return (
                      <button
                        key={shade}
                        className="polaris-swatch"
                        style={{ backgroundColor: `var(${cssVar})` }}
                        onMouseEnter={() => setHovered({ family, shade, cssVar, oklch })}
                        onMouseLeave={() => setHovered(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(`var(${cssVar})`);
                        }}
                        aria-label={`${family} shade ${shade}`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Color Details Card */}
      {selectedFamily && (
        <section className="polaris-section">
          <div className="polaris-card">
            <div className="polaris-card-header">
              <div
                className="polaris-card-swatch"
                style={{ backgroundColor: `var(--st-${selectedFamily}-8)` }}
              />
              <div>
                <h3 className="polaris-card-title">
                  {selectedFamily.charAt(0).toUpperCase() + selectedFamily.slice(1)}
                </h3>
                <p className="polaris-card-description">
                  {getColorDescription(selectedFamily)}
                </p>
              </div>
            </div>

            <div className="polaris-shade-grid">
              {SHADES.map((shade) => {
                const cssVar = `--st-${selectedFamily}-${shade}`;
                const oklch = OKLCH_VALUES[selectedFamily]?.[shade] || "";
                return (
                  <div key={shade} className="polaris-shade-item">
                    <div
                      className="polaris-shade-preview"
                      style={{ backgroundColor: `var(${cssVar})` }}
                    />
                    <div className="polaris-shade-info">
                      <span className="polaris-shade-number">{shade}</span>
                      <code className="polaris-shade-var">{cssVar}</code>
                      <span className="polaris-shade-oklch">{oklch}</span>
                    </div>
                    <button
                      className="polaris-shade-copy"
                      onClick={() => handleCopy(`var(${cssVar})`)}
                    >
                      {copied === `var(${cssVar})` ? "Copied" : "Copy"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Why OKLCH Section */}
      <section className="polaris-section">
        <div className="polaris-card">
          <h2 className="polaris-section-title">Why OKLCH?</h2>
          <p className="polaris-section-text">
            OKLCH is a perceptually uniform color space that ensures colors at the same
            lightness value actually appear equally bright to the human eye. This means
            <code className="polaris-inline-code">--st-red-8</code> and{" "}
            <code className="polaris-inline-code">--st-blue-8</code> have identical
            perceived brightness, making them interchangeable for consistent UI contrast ratios.
          </p>

          <div className="polaris-code-block">
            <div className="polaris-code-header">
              <span>OKLCH Format</span>
              <button
                className="polaris-code-copy"
                onClick={() => handleCopy(`/* OKLCH format: oklch(L C H) */
/* L = Lightness (0-1)    */
/* C = Chroma (0-0.4)     */
/* H = Hue (0-360)        */

--st-blue-8: oklch(0.44 0.175 260);
--st-red-8:  oklch(0.44 0.185 25);
/*               ↑ Same lightness = same perceived brightness */`)}
              >
                {copied?.includes("OKLCH format") ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="polaris-code-content">{`/* OKLCH format: oklch(L C H) */
/* L = Lightness (0-1)    */
/* C = Chroma (0-0.4)     */
/* H = Hue (0-360)        */

--st-blue-8: oklch(0.44 0.175 260);
--st-red-8:  oklch(0.44 0.185 25);
/*               ↑ Same lightness = same perceived brightness */`}</pre>
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="polaris-section">
        <div className="polaris-card">
          <h2 className="polaris-section-title">Usage</h2>
          <p className="polaris-section-text">
            Import the color palette and use CSS variables directly in your styles.
          </p>

          <div className="polaris-code-block">
            <div className="polaris-code-header">
              <span>CSS</span>
              <button
                className="polaris-code-copy"
                onClick={() => handleCopy(`@import "@staple-css/tokens/colors.css";

.button {
  background: var(--st-blue-9);
  color: var(--st-gray-1);
}

.button:hover {
  background: var(--st-blue-10);
}

.alert-error {
  background: var(--st-red-2);
  border-color: var(--st-red-6);
  color: var(--st-red-12);
}`)}
              >
                Copy
              </button>
            </div>
            <pre className="polaris-code-content">{`@import "@staple-css/tokens/colors.css";

.button {
  background: var(--st-blue-9);
  color: var(--st-gray-1);
}

.button:hover {
  background: var(--st-blue-10);
}

.alert-error {
  background: var(--st-red-2);
  border-color: var(--st-red-6);
  color: var(--st-red-12);
}`}</pre>
          </div>
        </div>
      </section>

      {/* Copied Toast */}
      {copied && (
        <div className="polaris-toast">
          Copied to clipboard
        </div>
      )}
    </div>
  );
}
