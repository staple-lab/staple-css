import { useState, useMemo, useCallback } from "react";
import { generateRamp } from "../../../../packages/tokens/src/color/ramp";
import { hexToOklch } from "../../../../packages/tokens/src/color/oklch";
import { bestTextColor } from "../../../../packages/tokens/src/color/contrast";
import { CodeBlock } from "../components/CodeBlock";

const SHADE_NAMES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function toSlug(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "custom";
}

function mapRampToShades(ramp: string[]): { shade: number; hex: string }[] {
  // Map 12-step ramp to 11 Tailwind-style shades (50-950).
  // Drop step 0 (near-white app bg), map remaining 11 steps directly.
  return SHADE_NAMES.map((shade, i) => ({
    shade,
    hex: (ramp[i + 1] ?? ramp[i])!,
  }));
}

export function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#2563eb");
  const [hexInput, setHexInput] = useState("#2563eb");
  const [paletteName, setPaletteName] = useState("brand");
  const [chromaScale, setChromaScale] = useState(1.0);
  const [hueBias, setHueBias] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const ramp = useMemo(
    () => generateRamp({ baseColor, chromaScale, hueBias, darkMode, steps: 12 }),
    [baseColor, chromaScale, hueBias, darkMode],
  );

  const shades = useMemo(() => mapRampToShades(ramp), [ramp]);
  const slug = toSlug(paletteName);

  const oklchInfo = useMemo(() => {
    const lch = hexToOklch(baseColor);
    return {
      L: (lch.L * 100).toFixed(1),
      C: lch.C.toFixed(3),
      H: lch.H.toFixed(1),
    };
  }, [baseColor]);

  const cssOutput = useMemo(() => {
    const lines = shades.map((s) => `  --st-${slug}-${s.shade}: ${s.hex};`);
    return `:root {\n${lines.join("\n")}\n}`;
  }, [shades, slug]);

  const handleBaseColorChange = useCallback((hex: string) => {
    setBaseColor(hex);
    setHexInput(hex);
  }, []);

  const handleHexInputChange = useCallback((raw: string) => {
    setHexInput(raw);
    if (/^#[0-9a-fA-F]{6}$/.test(raw)) {
      setBaseColor(raw);
    }
  }, []);

  const flash = useCallback((key: string) => {
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1400);
  }, []);

  const handleCopyVar = useCallback(
    (shade: number) => {
      copyToClipboard(`var(--st-${slug}-${shade})`);
      flash(`var-${shade}`);
    },
    [slug, flash],
  );

  const handleCopyHex = useCallback(
    (shade: number, hex: string) => {
      copyToClipboard(hex);
      flash(`hex-${shade}`);
    },
    [flash],
  );

  const handleCopyCss = useCallback(() => {
    copyToClipboard(cssOutput);
    flash("css");
  }, [cssOutput, flash]);

  const stepLabels = [
    "Subtle bg", "UI bg", "Hovered", "Active", "Subtle border",
    "Border", "Solid border", "Solid (base)", "Solid hover",
    "Low text", "High text",
  ];

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    color: "var(--doc-color-text-secondary)",
    marginBottom: 4,
  };

  return (
    <div>
      <p style={{ color: "var(--doc-color-text-secondary)", margin: "0 0 16px" }}>
        Generate a custom color palette from any base color. Name it, tune it, export the CSS.
      </p>

      {/* Controls row 1: color + name */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 16, alignItems: "end" }}>
        <div>
          <label style={labelStyle}>Base color</label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="color"
              value={baseColor}
              onChange={(e) => handleBaseColorChange(e.target.value)}
              style={{
                width: 44, height: 44,
                border: "1px solid var(--doc-color-border)",
                borderRadius: 4, cursor: "pointer", padding: 2,
                backgroundColor: "transparent",
              }}
            />
            <input
              type="text"
              value={hexInput}
              onChange={(e) => handleHexInputChange(e.target.value)}
              style={{
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: "0.875rem", padding: "8px 10px",
                border: "1px solid var(--doc-color-border)",
                borderRadius: 4, width: 100,
                backgroundColor: "var(--doc-color-bg)",
                color: "var(--doc-color-text)", minHeight: 44,
              }}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Palette name</label>
          <input
            type="text"
            value={paletteName}
            onChange={(e) => setPaletteName(e.target.value)}
            placeholder="brand"
            style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: "0.875rem", padding: "8px 10px",
              border: "1px solid var(--doc-color-border)",
              borderRadius: 4, width: 160,
              backgroundColor: "var(--doc-color-bg)",
              color: "var(--doc-color-text)", minHeight: 44,
            }}
          />
          {slug !== paletteName && (
            <div style={{
              fontSize: "0.625rem",
              color: "var(--doc-color-text-tertiary)",
              marginTop: 2,
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            }}>
              --st-{slug}-*
            </div>
          )}
        </div>
      </div>

      {/* Controls row 2: sliders */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 24, alignItems: "end" }}>
        <div>
          <label style={labelStyle}>
            Chroma: {chromaScale.toFixed(2)}
          </label>
          <input
            type="range" min={0.1} max={2.0} step={0.05}
            value={chromaScale}
            onChange={(e) => setChromaScale(parseFloat(e.target.value))}
            style={{ width: 160, minHeight: 44, cursor: "pointer" }}
          />
        </div>

        <div>
          <label style={labelStyle}>
            Hue bias: {hueBias.toFixed(2)}
          </label>
          <input
            type="range" min={-1} max={1} step={0.05}
            value={hueBias}
            onChange={(e) => setHueBias(parseFloat(e.target.value))}
            style={{ width: 160, minHeight: 44, cursor: "pointer" }}
          />
        </div>

        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: "var(--doc-color-text-secondary)", minHeight: 44, cursor: "pointer" }}>
            <input
              type="checkbox" checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              style={{ width: 16, height: 16 }}
            />
            Dark mode ramp
          </label>
        </div>
      </div>

      {/* OKLCH info */}
      <div style={{ fontSize: "0.75rem", color: "var(--doc-color-text-secondary)", marginBottom: 16, fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}>
        OKLCH: L={oklchInfo.L}% C={oklchInfo.C} H={oklchInfo.H}
      </div>

      {/* Gradient ramp strip */}
      <div
        style={{
          height: 28,
          borderRadius: 6,
          background: `linear-gradient(to right, ${shades.map((s) => s.hex).join(", ")})`,
          marginBottom: 12,
        }}
      />

      {/* Interactive shade swatches */}
      <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", marginBottom: 8 }}>
        {shades.map(({ shade, hex }) => (
          <button
            key={shade}
            onClick={() => handleCopyVar(shade)}
            style={{
              flex: 1, height: 56, backgroundColor: hex,
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              minWidth: 0,
            }}
            title={`--st-${slug}-${shade}: ${hex} -- click to copy var`}
          >
            <span style={{
              fontSize: "0.5625rem", fontWeight: 600,
              color: bestTextColor(hex),
              opacity: copiedKey === `var-${shade}` ? 1 : 0.7,
            }}>
              {copiedKey === `var-${shade}` ? "Copied" : shade}
            </span>
          </button>
        ))}
      </div>

      {/* Shade details grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 4, marginTop: 12 }}>
        {shades.map(({ shade, hex }, i) => {
          const varName = `--st-${slug}-${shade}`;
          const isVarCopied = copiedKey === `var-${shade}`;
          const isHexCopied = copiedKey === `hex-${shade}`;
          const stepOklch = hexToOklch(hex);
          return (
            <div
              key={shade}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 8px", borderRadius: 4,
                background: isVarCopied || isHexCopied ? "var(--doc-color-bg-secondary)" : "transparent",
              }}
            >
              <div style={{
                width: 24, height: 24, borderRadius: 3,
                backgroundColor: hex,
                border: "1px solid var(--doc-color-border)",
                flexShrink: 0,
              }} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <button
                  onClick={() => handleCopyVar(shade)}
                  title={`Copy var(${varName})`}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: 0, display: "block", width: "100%",
                    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                    fontSize: "0.6875rem", textAlign: "left",
                    color: isVarCopied ? "var(--doc-color-accent)" : "var(--doc-color-text)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}
                >
                  {isVarCopied ? "Copied!" : varName}
                </button>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    onClick={() => handleCopyHex(shade, hex)}
                    title={`Copy ${hex}`}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      padding: 0,
                      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                      fontSize: "0.5625rem", textAlign: "left",
                      color: isHexCopied ? "var(--doc-color-accent)" : "var(--doc-color-text-secondary)",
                    }}
                  >
                    {isHexCopied ? "Copied!" : hex}
                  </button>
                  <span style={{ fontSize: "0.5625rem", color: "var(--doc-color-text-tertiary)" }}>
                    {stepLabels[i]} / L:{(stepOklch.L * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CSS export */}
      <h3 style={{ marginTop: 32, marginBottom: 12, fontSize: "1rem" }}>
        Export CSS
      </h3>
      <CodeBlock code={cssOutput} language="css" />
      <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button
          onClick={handleCopyCss}
          style={{
            padding: "8px 16px",
            border: "1px solid var(--doc-color-border)",
            borderRadius: 4,
            backgroundColor: "var(--doc-color-bg)",
            color: "var(--doc-color-text)",
            fontSize: "0.8125rem",
            cursor: "pointer",
            minHeight: 44,
          }}
        >
          {copiedKey === "css" ? "Copied!" : "Copy CSS block"}
        </button>
      </div>
    </div>
  );
}
