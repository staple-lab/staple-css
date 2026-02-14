import { useState, useCallback } from "react";
import { palettes, type PaletteName, type PaletteShade } from "@staple-css/tokens";
import { CodeBlock } from "../components/CodeBlock";
import "./PalettesPage.css";

const usageCode = `@import "@staple-css/tokens/palettes.css";

.button-blue {
  background: var(--st-blue-600);
  color: white;
}

.button-blue:hover {
  background: var(--st-blue-700);
}

.badge-green {
  background: var(--st-green-100);
  color: var(--st-green-800);
}`;

const shades: PaletteShade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const paletteNames = Object.keys(palettes) as PaletteName[];

function bestText(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 0.299 + g * 0.587 + b * 0.114) > 150 ? "#000000" : "#ffffff";
}

function getPaletteDescription(name: string): string {
  const descriptions: Record<string, string> = {
    slate: "Cool gray with blue undertone for UI chrome",
    gray: "Neutral tones for text, backgrounds, and borders",
    zinc: "Neutral gray with subtle warmth",
    neutral: "Pure neutral without color bias",
    stone: "Warm gray with earthy undertone",
    red: "Critical actions, errors, and destructive operations",
    orange: "High-priority warnings and attention elements",
    amber: "Warm caution indicators and highlights",
    yellow: "Low-priority warnings and caution indicators",
    lime: "Fresh, active states and positive highlights",
    green: "Success states, confirmations, and positive actions",
    emerald: "Rich green for premium positive indicators",
    teal: "Information, navigation, and secondary accents",
    cyan: "Highlights, links, and interactive accents",
    sky: "Light interactive states and informational elements",
    blue: "Primary actions, interactive elements, and focus states",
    indigo: "Deep blue for emphasis and navigation",
    violet: "Creative accents and decorative elements",
    purple: "Premium features, magic, and special content",
    fuchsia: "Bold emphasis and creative accents",
    pink: "Soft accents, warmth, and approachable tones",
    rose: "Warm accents and gentle emphasis",
  };
  return descriptions[name] || "";
}

export function PalettesPage() {
  const [selected, setSelected] = useState<PaletteName | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = useCallback((text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  return (
    <div className="palettes-page">
      {/* Page header */}
      <header className="palettes-header">
        <h1 className="palettes-title">Color Palettes</h1>
        <p className="palettes-description">
          22 Tailwind-compatible color palettes with 11 shades each (50–950).
          Click any swatch to copy its CSS variable. Click a palette name to expand shade details.
        </p>
      </header>

      {/* Palette container card */}
      <div className="palettes-container">
        {/* Shade labels header */}
        <div className="palettes-shade-header">
          <div className="palettes-label-space" />
          <div className="palettes-shade-labels">
            {shades.map((shade) => (
              <span key={shade} className="palettes-shade-label">{shade}</span>
            ))}
          </div>
        </div>

        {/* Palette rows */}
        <div className="palettes-rows">
          {paletteNames.map((name) => {
            const palette = palettes[name];
            const isSelected = selected === name;

            return (
              <div key={name}>
                <div
                  className={`palettes-row${isSelected ? " palettes-row--selected" : ""}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelected(isSelected ? null : name)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSelected(isSelected ? null : name);
                  }}
                >
                  <span className="palettes-family-label">{name}</span>
                  <div className="palettes-swatches">
                    {shades.map((shade) => {
                      const hex = palette[shade];
                      const cssVar = `--st-${name}-${shade}`;
                      const isCopied = copied === `var(${cssVar})`;
                      return (
                        <button
                          key={shade}
                          className="palettes-swatch"
                          onClick={(e) => handleCopy(`var(${cssVar})`, e)}
                          title={`${cssVar}: ${hex}`}
                          style={{ backgroundColor: hex }}
                          aria-label={`${name} shade ${shade}`}
                        >
                          {isCopied && (
                            <span
                              className="palettes-swatch-check"
                              style={{ color: bestText(hex) }}
                            >
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Expanded detail card */}
                {isSelected && (
                  <div className="palettes-detail-card">
                    <div className="palettes-detail-header">
                      <div
                        className="palettes-detail-swatch"
                        style={{ backgroundColor: palette[500] }}
                      />
                      <div>
                        <h3 className="palettes-detail-title">{name}</h3>
                        <p className="palettes-detail-description">
                          {getPaletteDescription(name)}
                        </p>
                      </div>
                    </div>

                    <div className="palettes-shade-grid">
                      {shades.map((shade) => {
                        const hex = palette[shade];
                        const cssVar = `--st-${name}-${shade}`;
                        const varText = `var(${cssVar})`;
                        const isCopied = copied === varText;
                        return (
                          <div key={shade} className="palettes-shade-item">
                            <div
                              className="palettes-shade-preview"
                              style={{ backgroundColor: hex }}
                            />
                            <div className="palettes-shade-info">
                              <span className="palettes-shade-number">{shade}</span>
                              <code className="palettes-shade-var">{cssVar}</code>
                              <span className="palettes-shade-hex">{hex}</span>
                            </div>
                            <button
                              className="palettes-shade-copy"
                              onClick={() => handleCopy(varText)}
                            >
                              {isCopied ? "Copied" : "Copy"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Usage section */}
      <section className="palettes-section">
        <div className="palettes-card">
          <h2 className="palettes-section-title">Usage</h2>
          <p className="palettes-section-text">
            Import the color palettes and use CSS variables directly in your styles.
          </p>
          <CodeBlock code={usageCode} language="css" />
        </div>
      </section>

      {/* Copied toast */}
      {copied && (
        <div className="palettes-toast">
          Copied to clipboard
        </div>
      )}
    </div>
  );
}
