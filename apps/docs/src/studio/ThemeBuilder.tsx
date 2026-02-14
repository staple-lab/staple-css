import { useState, useMemo, useCallback } from "react";
import { generateRamp } from "../../../../packages/tokens/src/color/ramp";
import { bestTextColor } from "../../../../packages/tokens/src/color/contrast";
import { CodeBlock } from "../components/CodeBlock";

interface SemanticMapping {
  tokenName: string;
  lightStep: number;
  darkStep: number;
  description: string;
}

const SEMANTIC_MAPPINGS: SemanticMapping[] = [
  { tokenName: "bg-surface-base", lightStep: -1, darkStep: -1, description: "Page background (white/near-black)" },
  { tokenName: "bg-surface-subtle", lightStep: 0, darkStep: 1, description: "Subtle surface tint" },
  { tokenName: "bg-surface-muted", lightStep: 1, darkStep: 2, description: "Recessed surface" },
  { tokenName: "bg-interactive-base", lightStep: 8, darkStep: 8, description: "Primary button" },
  { tokenName: "bg-interactive-base-hover", lightStep: 9, darkStep: 9, description: "Primary button hover" },
  { tokenName: "bg-interactive-subtle", lightStep: 1, darkStep: 2, description: "Ghost button" },
  { tokenName: "bg-interactive-subtle-hover", lightStep: 2, darkStep: 3, description: "Ghost button hover" },
  { tokenName: "fg-surface-base", lightStep: 11, darkStep: 11, description: "Body text" },
  { tokenName: "fg-surface-subtle", lightStep: 10, darkStep: 10, description: "Secondary text" },
  { tokenName: "fg-interactive-base", lightStep: 8, darkStep: 8, description: "Link text" },
  { tokenName: "fg-interactive-on-color", lightStep: -1, darkStep: -1, description: "Text on filled button" },
  { tokenName: "bd-surface-base", lightStep: 5, darkStep: 5, description: "Default border" },
  { tokenName: "bd-surface-subtle", lightStep: 3, darkStep: 3, description: "Subtle border" },
  { tokenName: "bd-interactive-base", lightStep: 8, darkStep: 8, description: "Interactive border" },
  { tokenName: "ring-interactive-base", lightStep: 8, darkStep: 8, description: "Focus ring" },
];

function getColorForStep(lightRamp: string[], darkRamp: string[], step: number, isDark: boolean): string {
  if (step === -1) return isDark ? "#0a0a0a" : "#ffffff";
  const ramp = isDark ? darkRamp : lightRamp;
  return ramp[step] || "#888888";
}

export function ThemeBuilder() {
  const [seedColor, setSeedColor] = useState("#2563eb");
  const [seedHex, setSeedHex] = useState("#2563eb");

  const lightRamp = useMemo(
    () => generateRamp({ baseColor: seedColor, darkMode: false, steps: 12 }),
    [seedColor],
  );

  const darkRamp = useMemo(
    () => generateRamp({ baseColor: seedColor, darkMode: true, steps: 12 }),
    [seedColor],
  );

  const handleSeedChange = useCallback((hex: string) => {
    setSeedColor(hex);
    setSeedHex(hex);
  }, []);

  const handleSeedHexInput = useCallback((raw: string) => {
    setSeedHex(raw);
    if (/^#[0-9a-fA-F]{6}$/.test(raw)) {
      setSeedColor(raw);
    }
  }, []);

  const cssOutput = useMemo(() => {
    const lines: string[] = [":root, [data-theme=\"light\"] {"];
    for (const m of SEMANTIC_MAPPINGS) {
      const val = getColorForStep(lightRamp, darkRamp, m.lightStep, false);
      lines.push(`  --st-color-${m.tokenName}: ${val};`);
    }
    lines.push("}");
    lines.push("");
    lines.push("[data-theme=\"dark\"] {");
    for (const m of SEMANTIC_MAPPINGS) {
      const val = getColorForStep(lightRamp, darkRamp, m.darkStep, true);
      lines.push(`  --st-color-${m.tokenName}: ${val};`);
    }
    lines.push("}");
    return lines.join("\n");
  }, [lightRamp, darkRamp]);

  return (
    <div>
      <p style={{ color: "var(--doc-color-text-secondary)", margin: "0 0 16px" }}>
        Enter a seed color to generate a complete semantic theme with light and dark mode variables.
        The ramp is generated using OKLCH for perceptual uniformity.
      </p>

      {/* Seed color input */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
        <label style={{ fontSize: "0.8125rem", color: "var(--doc-color-text)" }}>
          Seed color:
        </label>
        <input
          type="color"
          value={seedColor}
          onChange={(e) => handleSeedChange(e.target.value)}
          style={{
            width: 44,
            height: 44,
            border: "1px solid var(--doc-color-border)",
            borderRadius: 4,
            cursor: "pointer",
            padding: 2,
            backgroundColor: "transparent",
          }}
        />
        <input
          type="text"
          value={seedHex}
          onChange={(e) => handleSeedHexInput(e.target.value)}
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: "0.875rem",
            padding: "8px 10px",
            border: "1px solid var(--doc-color-border)",
            borderRadius: 4,
            width: 100,
            backgroundColor: "var(--doc-color-bg)",
            color: "var(--doc-color-text)",
            minHeight: 44,
          }}
        />
      </div>

      {/* Generated ramps */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div>
          <h3 style={{ fontSize: "0.8125rem", color: "var(--doc-color-text)", marginBottom: 8 }}>Light ramp</h3>
          <div style={{ display: "flex", borderRadius: 6, overflow: "hidden" }}>
            {lightRamp.map((hex, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 40,
                  backgroundColor: hex,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "0.5rem", color: bestTextColor(hex), fontWeight: 600 }}>
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: "0.8125rem", color: "var(--doc-color-text)", marginBottom: 8 }}>Dark ramp</h3>
          <div style={{ display: "flex", borderRadius: 6, overflow: "hidden" }}>
            {darkRamp.map((hex, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 40,
                  backgroundColor: hex,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "0.5rem", color: bestTextColor(hex), fontWeight: 600 }}>
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Semantic token mapping */}
      <h3 style={{ fontSize: "0.875rem", color: "var(--doc-color-text)", marginBottom: 12 }}>
        Semantic mapping
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* Light preview */}
        <div
          style={{
            padding: 20,
            backgroundColor: "#ffffff",
            borderRadius: 6,
            border: "1px solid var(--doc-color-border)",
          }}
        >
          <h4 style={{ fontSize: "0.75rem", color: "#888", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Light mode
          </h4>
          {SEMANTIC_MAPPINGS.map((m) => {
            const val = getColorForStep(lightRamp, darkRamp, m.lightStep, false);
            const isText = m.tokenName.startsWith("fg-");
            const isBorder = m.tokenName.startsWith("bd-") || m.tokenName.startsWith("ring-");
            return (
              <div
                key={m.tokenName}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "4px 0",
                  fontSize: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: isBorder ? 0 : 3,
                    backgroundColor: isText || isBorder ? "transparent" : val,
                    border: isBorder ? `2px solid ${val}` : "1px solid #e5e5e5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {isText && (
                    <span style={{ color: val, fontWeight: 700, fontSize: "0.625rem" }}>A</span>
                  )}
                </div>
                <span style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: "0.625rem", color: "#333" }}>
                  {m.tokenName}
                </span>
                <span style={{ fontSize: "0.5625rem", color: "#999", marginLeft: "auto" }}>
                  {val}
                </span>
              </div>
            );
          })}
        </div>

        {/* Dark preview */}
        <div
          style={{
            padding: 20,
            backgroundColor: "#0a0a0a",
            borderRadius: 6,
            border: "1px solid var(--doc-color-border)",
          }}
        >
          <h4 style={{ fontSize: "0.75rem", color: "#777", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Dark mode
          </h4>
          {SEMANTIC_MAPPINGS.map((m) => {
            const val = getColorForStep(lightRamp, darkRamp, m.darkStep, true);
            const isText = m.tokenName.startsWith("fg-");
            const isBorder = m.tokenName.startsWith("bd-") || m.tokenName.startsWith("ring-");
            return (
              <div
                key={m.tokenName}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "4px 0",
                  fontSize: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: isBorder ? 0 : 3,
                    backgroundColor: isText || isBorder ? "transparent" : val,
                    border: isBorder ? `2px solid ${val}` : "1px solid #262626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {isText && (
                    <span style={{ color: val, fontWeight: 700, fontSize: "0.625rem" }}>A</span>
                  )}
                </div>
                <span style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: "0.625rem", color: "#ccc" }}>
                  {m.tokenName}
                </span>
                <span style={{ fontSize: "0.5625rem", color: "#666", marginLeft: "auto" }}>
                  {val}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS output */}
      <h3 style={{ fontSize: "0.875rem", color: "var(--doc-color-text)", marginBottom: 8 }}>
        Generated CSS
      </h3>
      <CodeBlock code={cssOutput} language="css" />
    </div>
  );
}
