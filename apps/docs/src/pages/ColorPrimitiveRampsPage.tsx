/**
 * Colour Primitive Ramps Page
 * Polaris-inspired 16-shade color system
 */

import { useState } from "react";
import "./ColorPrimitiveRampsPage.css";

const COLOR_FAMILIES = [
  "black-alpha",
  "gray",
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "cyan",
  "teal",
  "azure",
  "blue",
  "purple",
  "magenta",
  "rose",
] as const;

const SHADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] as const;

// OKLCH values for each color family and shade
const OKLCH_VALUES: Record<string, Record<number, string>> = {
  "black-alpha": {
    1: "oklch(0% 0 0 / 0%)", 2: "oklch(0% 0 0 / 1%)", 3: "oklch(0% 0 0 / 2%)", 4: "oklch(0% 0 0 / 3%)",
    5: "oklch(0% 0 0 / 5%)", 6: "oklch(0% 0 0 / 6%)", 7: "oklch(0% 0 0 / 8%)", 8: "oklch(0% 0 0 / 11%)",
    9: "oklch(0% 0 0 / 17%)", 10: "oklch(0% 0 0 / 20%)", 11: "oklch(0% 0 0 / 28%)", 12: "oklch(0% 0 0 / 46%)",
    13: "oklch(0% 0 0 / 62%)", 14: "oklch(0% 0 0 / 71%)", 15: "oklch(0% 0 0 / 81%)", 16: "oklch(0% 0 0 / 90%)",
  },
  gray: {
    1: "oklch(1.000 0 0)", 2: "oklch(0.995 0 0)", 3: "oklch(0.985 0 0)", 4: "oklch(0.975 0 0)",
    5: "oklch(0.965 0 0)", 6: "oklch(0.955 0 0)", 7: "oklch(0.935 0 0)", 8: "oklch(0.910 0 0)",
    9: "oklch(0.865 0 0)", 10: "oklch(0.835 0 0)", 11: "oklch(0.760 0 0)", 12: "oklch(0.610 0 0)",
    13: "oklch(0.465 0 0)", 14: "oklch(0.385 0 0)", 15: "oklch(0.290 0 0)", 16: "oklch(0.210 0 0)",
  },
  red: {
    1: "oklch(0.993 0.005 17)", 2: "oklch(0.980 0.012 17)", 3: "oklch(0.960 0.028 20)", 4: "oklch(0.945 0.038 20)",
    5: "oklch(0.925 0.050 20)", 6: "oklch(0.910 0.058 20)", 7: "oklch(0.890 0.068 20)", 8: "oklch(0.860 0.085 20)",
    9: "oklch(0.820 0.110 22)", 10: "oklch(0.720 0.175 25)", 11: "oklch(0.610 0.205 28)", 12: "oklch(0.560 0.225 30)",
    13: "oklch(0.470 0.165 28)", 14: "oklch(0.400 0.130 25)", 15: "oklch(0.310 0.095 22)", 16: "oklch(0.220 0.060 20)",
  },
  orange: {
    1: "oklch(0.995 0.008 70)", 2: "oklch(0.980 0.025 70)", 3: "oklch(0.965 0.045 65)", 4: "oklch(0.950 0.065 60)",
    5: "oklch(0.930 0.085 55)", 6: "oklch(0.915 0.100 50)", 7: "oklch(0.895 0.115 48)", 8: "oklch(0.865 0.145 50)",
    9: "oklch(0.820 0.175 70)", 10: "oklch(0.765 0.165 70)", 11: "oklch(0.650 0.145 65)", 12: "oklch(0.575 0.130 60)",
    13: "oklch(0.505 0.115 55)", 14: "oklch(0.425 0.095 50)", 15: "oklch(0.345 0.075 48)", 16: "oklch(0.265 0.055 45)",
  },
  yellow: {
    1: "oklch(0.995 0.020 100)", 2: "oklch(0.980 0.075 100)", 3: "oklch(0.970 0.115 100)", 4: "oklch(0.955 0.150 100)",
    5: "oklch(0.940 0.175 100)", 6: "oklch(0.925 0.200 100)", 7: "oklch(0.905 0.195 100)", 8: "oklch(0.880 0.185 100)",
    9: "oklch(0.860 0.180 100)", 10: "oklch(0.795 0.165 100)", 11: "oklch(0.680 0.145 100)", 12: "oklch(0.605 0.130 95)",
    13: "oklch(0.525 0.115 95)", 14: "oklch(0.440 0.095 95)", 15: "oklch(0.345 0.070 95)", 16: "oklch(0.270 0.055 95)",
  },
  lime: {
    1: "oklch(0.993 0.015 140)", 2: "oklch(0.970 0.065 140)", 3: "oklch(0.955 0.095 140)", 4: "oklch(0.935 0.125 140)",
    5: "oklch(0.910 0.165 140)", 6: "oklch(0.880 0.205 140)", 7: "oklch(0.855 0.260 140)", 8: "oklch(0.820 0.255 140)",
    9: "oklch(0.800 0.250 140)", 10: "oklch(0.760 0.230 140)", 11: "oklch(0.670 0.195 140)", 12: "oklch(0.585 0.165 140)",
    13: "oklch(0.515 0.140 140)", 14: "oklch(0.430 0.115 140)", 15: "oklch(0.340 0.085 140)", 16: "oklch(0.250 0.060 140)",
  },
  green: {
    1: "oklch(0.993 0.012 160)", 2: "oklch(0.970 0.050 160)", 3: "oklch(0.950 0.080 160)", 4: "oklch(0.925 0.110 160)",
    5: "oklch(0.895 0.145 160)", 6: "oklch(0.860 0.180 160)", 7: "oklch(0.830 0.200 160)", 8: "oklch(0.805 0.190 160)",
    9: "oklch(0.785 0.180 160)", 10: "oklch(0.765 0.170 160)", 11: "oklch(0.655 0.140 160)", 12: "oklch(0.575 0.120 160)",
    13: "oklch(0.495 0.100 160)", 14: "oklch(0.405 0.080 160)", 15: "oklch(0.335 0.065 160)", 16: "oklch(0.275 0.050 160)",
  },
  cyan: {
    1: "oklch(0.993 0.010 175)", 2: "oklch(0.970 0.035 175)", 3: "oklch(0.955 0.055 175)", 4: "oklch(0.935 0.075 175)",
    5: "oklch(0.910 0.095 175)", 6: "oklch(0.890 0.110 175)", 7: "oklch(0.870 0.105 175)", 8: "oklch(0.845 0.100 175)",
    9: "oklch(0.825 0.095 175)", 10: "oklch(0.755 0.130 175)", 11: "oklch(0.665 0.115 175)", 12: "oklch(0.580 0.100 175)",
    13: "oklch(0.500 0.085 175)", 14: "oklch(0.420 0.070 175)", 15: "oklch(0.340 0.055 175)", 16: "oklch(0.270 0.040 175)",
  },
  teal: {
    1: "oklch(0.993 0.010 185)", 2: "oklch(0.970 0.035 185)", 3: "oklch(0.955 0.055 185)", 4: "oklch(0.935 0.075 185)",
    5: "oklch(0.910 0.100 185)", 6: "oklch(0.885 0.120 185)", 7: "oklch(0.860 0.135 185)", 8: "oklch(0.835 0.145 185)",
    9: "oklch(0.810 0.155 185)", 10: "oklch(0.770 0.145 185)", 11: "oklch(0.670 0.125 185)", 12: "oklch(0.580 0.105 185)",
    13: "oklch(0.500 0.090 185)", 14: "oklch(0.420 0.075 185)", 15: "oklch(0.340 0.055 185)", 16: "oklch(0.280 0.045 185)",
  },
  azure: {
    1: "oklch(0.993 0.005 235)", 2: "oklch(0.980 0.015 235)", 3: "oklch(0.965 0.025 235)", 4: "oklch(0.955 0.035 235)",
    5: "oklch(0.940 0.045 235)", 6: "oklch(0.925 0.055 235)", 7: "oklch(0.910 0.065 235)", 8: "oklch(0.885 0.080 235)",
    9: "oklch(0.860 0.095 235)", 10: "oklch(0.795 0.130 235)", 11: "oklch(0.660 0.150 235)", 12: "oklch(0.580 0.140 235)",
    13: "oklch(0.510 0.125 235)", 14: "oklch(0.435 0.110 235)", 15: "oklch(0.355 0.090 235)", 16: "oklch(0.270 0.065 235)",
  },
  blue: {
    1: "oklch(0.993 0.005 265)", 2: "oklch(0.980 0.012 265)", 3: "oklch(0.965 0.020 265)", 4: "oklch(0.950 0.030 265)",
    5: "oklch(0.935 0.040 265)", 6: "oklch(0.920 0.050 265)", 7: "oklch(0.905 0.060 265)", 8: "oklch(0.875 0.080 265)",
    9: "oklch(0.850 0.095 265)", 10: "oklch(0.780 0.135 265)", 11: "oklch(0.655 0.195 265)", 12: "oklch(0.565 0.200 265)",
    13: "oklch(0.500 0.185 265)", 14: "oklch(0.420 0.165 265)", 15: "oklch(0.340 0.140 265)", 16: "oklch(0.250 0.100 265)",
  },
  purple: {
    1: "oklch(0.993 0.005 295)", 2: "oklch(0.980 0.012 295)", 3: "oklch(0.965 0.022 295)", 4: "oklch(0.950 0.032 295)",
    5: "oklch(0.935 0.045 295)", 6: "oklch(0.920 0.055 295)", 7: "oklch(0.905 0.065 295)", 8: "oklch(0.880 0.085 295)",
    9: "oklch(0.855 0.105 295)", 10: "oklch(0.780 0.150 295)", 11: "oklch(0.700 0.185 295)", 12: "oklch(0.620 0.220 295)",
    13: "oklch(0.555 0.250 295)", 14: "oklch(0.470 0.235 295)", 15: "oklch(0.380 0.200 295)", 16: "oklch(0.280 0.145 295)",
  },
  magenta: {
    1: "oklch(0.993 0.005 330)", 2: "oklch(0.980 0.020 330)", 3: "oklch(0.965 0.035 330)", 4: "oklch(0.950 0.050 330)",
    5: "oklch(0.930 0.065 330)", 6: "oklch(0.915 0.080 330)", 7: "oklch(0.895 0.095 330)", 8: "oklch(0.870 0.115 330)",
    9: "oklch(0.850 0.130 330)", 10: "oklch(0.800 0.170 330)", 11: "oklch(0.700 0.200 330)", 12: "oklch(0.610 0.210 330)",
    13: "oklch(0.520 0.185 330)", 14: "oklch(0.435 0.155 330)", 15: "oklch(0.355 0.125 330)", 16: "oklch(0.270 0.090 330)",
  },
  rose: {
    1: "oklch(0.993 0.005 10)", 2: "oklch(0.980 0.015 10)", 3: "oklch(0.965 0.028 10)", 4: "oklch(0.950 0.042 10)",
    5: "oklch(0.935 0.055 10)", 6: "oklch(0.920 0.068 10)", 7: "oklch(0.900 0.085 10)", 8: "oklch(0.875 0.105 10)",
    9: "oklch(0.850 0.125 10)", 10: "oklch(0.780 0.175 350)", 11: "oklch(0.680 0.220 350)", 12: "oklch(0.590 0.230 350)",
    13: "oklch(0.510 0.200 350)", 14: "oklch(0.430 0.170 350)", 15: "oklch(0.350 0.135 350)", 16: "oklch(0.270 0.100 350)",
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
    "black-alpha": "Transparency scale for overlays and shadows",
    gray: "Neutral tones for text, backgrounds, and borders",
    red: "Critical actions, errors, and destructive operations",
    orange: "High-priority warnings and attention-grabbing elements",
    yellow: "Low-priority warnings and caution indicators",
    lime: "Fresh, active states and positive highlights",
    green: "Success states, confirmations, and positive actions",
    cyan: "Highlights, links, and interactive accents",
    teal: "Information, navigation, and secondary accents",
    azure: "Sky blue tones for light interactive states",
    blue: "Primary actions, interactive elements, and focus states",
    purple: "Premium features, magic, and special content",
    magenta: "Emphasis, decorative elements, and creative accents",
    rose: "Soft accents, warmth, and approachable tones",
  };
  return descriptions[family] || "";
}

function formatFamilyName(family: string): string {
  if (family === "black-alpha") return "Black Alpha";
  return family.charAt(0).toUpperCase() + family.slice(1);
}

export function ColorPrimitiveRampsPage() {
  const [hovered, setHovered] = useState<HoverInfo | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="primitive-ramps-page">
      {/* Page Header */}
      <header className="primitive-page-header">
        <h1 className="primitive-page-title">Colour Primitive Ramps</h1>
        <p className="primitive-page-description">
          Polaris-inspired 16-step color ramps for comprehensive design coverage.
          Each color family provides fine-grained control from lightest (1) to darkest (16).
        </p>
      </header>

      {/* Floating Info Bar */}
      {hovered && (
        <div className="primitive-info-bar">
          <div className="primitive-info-bar-inner">
            <div
              className="primitive-info-swatch"
              style={{ backgroundColor: hovered.oklch }}
            />
            <div className="primitive-info-details">
              <span className="primitive-info-var">{hovered.cssVar}</span>
              <span className="primitive-info-oklch">{hovered.oklch}</span>
            </div>
            <button
              className="primitive-copy-btn"
              onClick={() => handleCopy(`var(${hovered.cssVar})`)}
            >
              {copied === `var(${hovered.cssVar})` ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {/* Color Palette Grid */}
      <section className="primitive-section">
        <div className="primitive-palette-container">
          {/* Shade labels header */}
          <div className="primitive-shade-header">
            <div className="primitive-family-label-space" />
            <div className="primitive-shade-labels">
              {SHADES.map((shade) => (
                <span key={shade} className="primitive-shade-label">{shade}</span>
              ))}
            </div>
          </div>

          {/* Color rows */}
          <div className="primitive-palette-rows">
            {COLOR_FAMILIES.map((family) => (
              <div
                key={family}
                className={`primitive-palette-row ${selectedFamily === family ? "primitive-palette-row--selected" : ""}`}
                onClick={() => setSelectedFamily(selectedFamily === family ? null : family)}
              >
                <span className="primitive-family-label">
                  {formatFamilyName(family)}
                </span>
                <div className="primitive-swatches">
                  {SHADES.map((shade) => {
                    const cssVar = `--st-${family}-${shade}`;
                    const oklch = OKLCH_VALUES[family]?.[shade] || "";
                    return (
                      <button
                        key={shade}
                        className={`primitive-swatch ${family === "black-alpha" ? "primitive-swatch--alpha" : ""}`}
                        style={{ backgroundColor: oklch }}
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
        <section className="primitive-section">
          <div className="primitive-card">
            <div className="primitive-card-header">
              <div
                className="primitive-card-swatch"
                style={{ backgroundColor: OKLCH_VALUES[selectedFamily]?.[8] || "oklch(0.5 0 0)" }}
              />
              <div>
                <h3 className="primitive-card-title">
                  {formatFamilyName(selectedFamily)}
                </h3>
                <p className="primitive-card-description">
                  {getColorDescription(selectedFamily)}
                </p>
              </div>
            </div>

            <div className="primitive-shade-grid">
              {SHADES.map((shade) => {
                const cssVar = `--st-${selectedFamily}-${shade}`;
                const oklch = OKLCH_VALUES[selectedFamily]?.[shade] || "";
                return (
                  <div key={shade} className="primitive-shade-item">
                    <div
                      className={`primitive-shade-preview ${selectedFamily === "black-alpha" ? "primitive-shade-preview--alpha" : ""}`}
                      style={{ backgroundColor: oklch }}
                    />
                    <div className="primitive-shade-info">
                      <span className="primitive-shade-number">{shade}</span>
                      <code className="primitive-shade-var">{cssVar}</code>
                      <span className="primitive-shade-oklch">{oklch}</span>
                    </div>
                    <button
                      className="primitive-shade-copy"
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

      {/* Usage Section */}
      <section className="primitive-section">
        <div className="primitive-card">
          <h2 className="primitive-section-title">Usage</h2>
          <p className="primitive-section-text">
            Import the color primitives and use CSS variables directly in your styles.
          </p>

          <div className="primitive-code-block">
            <div className="primitive-code-header">
              <span>CSS</span>
              <button
                className="primitive-code-copy"
                onClick={() => handleCopy(`@import "@staple-css/tokens/color-primitives.css";

.button-primary {
  background: var(--st-blue-13);
  color: var(--st-gray-1);
}

.button-primary:hover {
  background: var(--st-blue-14);
}

.surface-overlay {
  background: var(--st-black-alpha-12);
}

.alert-critical {
  background: var(--st-red-3);
  border-color: var(--st-red-8);
  color: var(--st-red-14);
}`)}
              >
                Copy
              </button>
            </div>
            <pre className="primitive-code-content">{`@import "@staple-css/tokens/color-primitives.css";

.button-primary {
  background: var(--st-blue-13);
  color: var(--st-gray-1);
}

.button-primary:hover {
  background: var(--st-blue-14);
}

.surface-overlay {
  background: var(--st-black-alpha-12);
}

.alert-critical {
  background: var(--st-red-3);
  border-color: var(--st-red-8);
  color: var(--st-red-14);
}`}</pre>
          </div>
        </div>
      </section>

      {/* Contrast Guidelines */}
      <section className="primitive-section">
        <div className="primitive-card">
          <h2 className="primitive-section-title">Contrast Guidelines</h2>
          <p className="primitive-section-text">
            The 16-step ramps are designed to meet WCAG accessibility standards.
            Use these pairing guidelines for readable text:
          </p>
          <ul className="primitive-guidelines-list">
            <li><strong>4.5:1 minimum</strong> - Readable text at any size (shades 1-7 on 11-16, or vice versa)</li>
            <li><strong>3:1 minimum</strong> - Large text (18pt+) and UI elements (shades 1-8 on 10-16)</li>
          </ul>
        </div>
      </section>

      {/* Copied Toast */}
      {copied && (
        <div className="primitive-toast">
          Copied to clipboard
        </div>
      )}
    </div>
  );
}
