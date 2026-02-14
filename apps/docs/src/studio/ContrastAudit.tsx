import { useState, useMemo } from "react";
import {
  wcagContrastHex,
  wcagRating,
  apcaContrastHex,
  apcaRating,
} from "../../../../packages/tokens/src/color/contrast";
import { colorTokens } from "@staple-css/tokens";
import type { ColorToken } from "../../../../packages/tokens/src/types";

interface PairResult {
  fg: ColorToken;
  bg: ColorToken;
  wcagRatio: number;
  wcagLevel: string;
  apcaLc: number;
  apcaLevel: string;
}

function isAlphaHex(hex: string): boolean {
  return /^#[a-f\d]{8}$/i.test(hex);
}

function generatePairs(tokens: ColorToken[], mode: "light" | "dark"): PairResult[] {
  const fgTokens = tokens.filter((t) => t.name.includes("-fg-"));
  const bgTokens = tokens.filter((t) => t.name.includes("-bg-"));

  const pairs: PairResult[] = [];
  for (const fg of fgTokens) {
    for (const bg of bgTokens) {
      // Only pair tokens from the same role family
      const fgRole = extractRole(fg.name);
      const bgRole = extractRole(bg.name);
      if (fgRole !== bgRole && fgRole !== "surface" && bgRole !== "surface") continue;

      const fgHex = mode === "light" ? fg.light : fg.dark;
      const bgHex = mode === "light" ? bg.light : bg.dark;

      // Skip tokens with alpha channel -- contrast checking is meaningless for transparent colors
      if (isAlphaHex(fgHex) || isAlphaHex(bgHex)) continue;

      const wcagRatio = wcagContrastHex(fgHex, bgHex);
      const wcagLevel = wcagRating(wcagRatio);
      const apcaLc = apcaContrastHex(fgHex, bgHex);
      const apcaLevel = apcaRating(apcaLc, "body");

      pairs.push({ fg, bg, wcagRatio, wcagLevel, apcaLc, apcaLevel });
    }
  }
  return pairs;
}

function extractRole(name: string): string {
  // st-color-fg-surface-base -> surface
  const parts = name.replace("st-color-", "").split("-");
  return parts[1] || "";
}

type FilterMode = "all" | "pass" | "fail";

export function ContrastAudit() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [fgColor, setFgColor] = useState("#1a1a1a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [tab, setTab] = useState<"auto" | "manual">("auto");

  const pairs = useMemo(() => generatePairs(colorTokens, mode), [mode]);

  const filteredPairs = useMemo(() => {
    if (filter === "all") return pairs;
    if (filter === "pass") return pairs.filter((p) => p.wcagLevel === "AA" || p.wcagLevel === "AAA");
    return pairs.filter((p) => p.wcagLevel === "Fail" || p.wcagLevel === "AA Large");
  }, [pairs, filter]);

  const stats = useMemo(() => {
    const total = pairs.length;
    const aaa = pairs.filter((p) => p.wcagLevel === "AAA").length;
    const aa = pairs.filter((p) => p.wcagLevel === "AA").length;
    const aaLarge = pairs.filter((p) => p.wcagLevel === "AA Large").length;
    const fail = pairs.filter((p) => p.wcagLevel === "Fail").length;
    return { total, aaa, aa, aaLarge, fail };
  }, [pairs]);

  // Manual checker
  const manualWcag = useMemo(() => wcagContrastHex(fgColor, bgColor), [fgColor, bgColor]);
  const manualWcagLevel = useMemo(() => wcagRating(manualWcag), [manualWcag]);
  const manualApca = useMemo(() => apcaContrastHex(fgColor, bgColor), [fgColor, bgColor]);
  const manualApcaLevel = useMemo(() => apcaRating(manualApca, "body"), [manualApca]);

  const ratingColor = (level: string) => {
    if (level === "AAA" || level === "Pass") return "#16a34a";
    if (level === "AA") return "#2563eb";
    if (level === "AA Large" || level === "Marginal") return "#d97706";
    return "#dc2626";
  };

  return (
    <div>
      <p style={{ color: "var(--doc-color-text-secondary)", margin: "0 0 16px" }}>
        Audit foreground/background token pairs for WCAG 2.1 and APCA contrast compliance.
      </p>

      {/* Tab selector */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--doc-color-border)", marginBottom: 20 }}>
        {(["auto", "manual"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "8px 16px",
              border: "none",
              borderBottom: tab === t ? "2px solid var(--doc-color-text)" : "2px solid transparent",
              background: "none",
              color: tab === t ? "var(--doc-color-text)" : "var(--doc-color-text-secondary)",
              fontSize: "0.8125rem",
              cursor: "pointer",
              fontWeight: tab === t ? 600 : 400,
              minHeight: 44,
              textTransform: "capitalize",
            }}
          >
            {t === "auto" ? "Token audit" : "Manual checker"}
          </button>
        ))}
      </div>

      {tab === "manual" ? (
        <div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 24, alignItems: "end" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "var(--doc-color-text-secondary)", marginBottom: 4 }}>
                Foreground (text)
              </label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  style={{ width: 44, height: 44, border: "1px solid var(--doc-color-border)", borderRadius: 4, cursor: "pointer", padding: 2, backgroundColor: "transparent" }}
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => { if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) setFgColor(e.target.value); }}
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
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "var(--doc-color-text-secondary)", marginBottom: 4 }}>
                Background
              </label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  style={{ width: 44, height: 44, border: "1px solid var(--doc-color-border)", borderRadius: 4, cursor: "pointer", padding: 2, backgroundColor: "transparent" }}
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => { if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) setBgColor(e.target.value); }}
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
            </div>
          </div>

          {/* Preview */}
          <div
            style={{
              padding: 32,
              backgroundColor: bgColor,
              borderRadius: 8,
              border: "1px solid var(--doc-color-border)",
              marginBottom: 20,
            }}
          >
            <p style={{ color: fgColor, fontSize: "1.5rem", fontWeight: 700, marginBottom: 4 }}>
              Large text sample
            </p>
            <p style={{ color: fgColor, fontSize: "1rem" }}>
              Normal body text using the selected foreground and background colors.
            </p>
            <p style={{ color: fgColor, fontSize: "0.75rem", marginTop: 8 }}>
              Small text / captions
            </p>
          </div>

          {/* Results */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ padding: 16, border: "1px solid var(--doc-color-border)", borderRadius: 6 }}>
              <h4 style={{ fontSize: "0.75rem", color: "var(--doc-color-text-secondary)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                WCAG 2.1
              </h4>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--doc-color-text)" }}>
                {manualWcag.toFixed(2)}:1
              </div>
              <span
                style={{
                  display: "inline-block",
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: ratingColor(manualWcagLevel),
                  marginTop: 4,
                }}
              >
                {manualWcagLevel}
              </span>
              <div style={{ fontSize: "0.6875rem", color: "var(--doc-color-text-secondary)", marginTop: 8 }}>
                AA: 4.5:1 normal / 3:1 large
                <br />
                AAA: 7:1 normal / 4.5:1 large
              </div>
            </div>
            <div style={{ padding: 16, border: "1px solid var(--doc-color-border)", borderRadius: 6 }}>
              <h4 style={{ fontSize: "0.75rem", color: "var(--doc-color-text-secondary)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                APCA
              </h4>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--doc-color-text)" }}>
                Lc {manualApca.toFixed(1)}
              </div>
              <span
                style={{
                  display: "inline-block",
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: ratingColor(manualApcaLevel),
                  marginTop: 4,
                }}
              >
                {manualApcaLevel}
              </span>
              <div style={{ fontSize: "0.6875rem", color: "var(--doc-color-text-secondary)", marginTop: 8 }}>
                Body: Lc 75+ / Large: Lc 60+
                <br />
                Headlines: Lc 45+ / Placeholders: Lc 30+
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Auto audit controls */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 0, border: "1px solid var(--doc-color-border)", borderRadius: 4, overflow: "hidden" }}>
              {(["light", "dark"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    padding: "8px 14px",
                    border: "none",
                    backgroundColor: mode === m ? "var(--doc-color-bg-secondary)" : "transparent",
                    color: "var(--doc-color-text)",
                    fontSize: "0.8125rem",
                    cursor: "pointer",
                    minHeight: 44,
                    textTransform: "capitalize",
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 0, border: "1px solid var(--doc-color-border)", borderRadius: 4, overflow: "hidden" }}>
              {(["all", "pass", "fail"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "8px 14px",
                    border: "none",
                    backgroundColor: filter === f ? "var(--doc-color-bg-secondary)" : "transparent",
                    color: "var(--doc-color-text)",
                    fontSize: "0.8125rem",
                    cursor: "pointer",
                    minHeight: 44,
                    textTransform: "capitalize",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            {[
              { label: "Total pairs", value: stats.total, color: "var(--doc-color-text)" },
              { label: "AAA", value: stats.aaa, color: "#16a34a" },
              { label: "AA", value: stats.aa, color: "#2563eb" },
              { label: "AA Large", value: stats.aaLarge, color: "#d97706" },
              { label: "Fail", value: stats.fail, color: "#dc2626" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: s.color }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "0.6875rem", color: "var(--doc-color-text-secondary)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Results table */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.75rem",
              }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px 6px", borderBottom: "1px solid var(--doc-color-border)", color: "var(--doc-color-text-secondary)", fontWeight: 600 }}>
                    Foreground
                  </th>
                  <th style={{ textAlign: "left", padding: "8px 6px", borderBottom: "1px solid var(--doc-color-border)", color: "var(--doc-color-text-secondary)", fontWeight: 600 }}>
                    Background
                  </th>
                  <th style={{ textAlign: "left", padding: "8px 6px", borderBottom: "1px solid var(--doc-color-border)", color: "var(--doc-color-text-secondary)", fontWeight: 600 }}>
                    Preview
                  </th>
                  <th style={{ textAlign: "right", padding: "8px 6px", borderBottom: "1px solid var(--doc-color-border)", color: "var(--doc-color-text-secondary)", fontWeight: 600 }}>
                    WCAG
                  </th>
                  <th style={{ textAlign: "right", padding: "8px 6px", borderBottom: "1px solid var(--doc-color-border)", color: "var(--doc-color-text-secondary)", fontWeight: 600 }}>
                    APCA
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPairs.slice(0, 100).map((pair, i) => {
                  const fgHex = mode === "light" ? pair.fg.light : pair.fg.dark;
                  const bgHex = mode === "light" ? pair.bg.light : pair.bg.dark;
                  return (
                    <tr key={i} style={{ borderBottom: "1px solid var(--doc-color-border-subtle)" }}>
                      <td style={{ padding: "6px", fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: "0.625rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <div style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: fgHex, border: "1px solid var(--doc-color-border)", flexShrink: 0 }} />
                          {pair.fg.name.replace("st-color-", "")}
                        </div>
                      </td>
                      <td style={{ padding: "6px", fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: "0.625rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <div style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: bgHex, border: "1px solid var(--doc-color-border)", flexShrink: 0 }} />
                          {pair.bg.name.replace("st-color-", "")}
                        </div>
                      </td>
                      <td style={{ padding: "6px" }}>
                        <div
                          style={{
                            display: "inline-block",
                            padding: "2px 8px",
                            backgroundColor: bgHex,
                            color: fgHex,
                            borderRadius: 3,
                            fontSize: "0.6875rem",
                            fontWeight: 500,
                          }}
                        >
                          Aa
                        </div>
                      </td>
                      <td style={{ padding: "6px", textAlign: "right" }}>
                        <span style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace', marginRight: 6 }}>
                          {pair.wcagRatio.toFixed(1)}
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "1px 5px",
                            borderRadius: 3,
                            fontSize: "0.5625rem",
                            fontWeight: 600,
                            color: "#fff",
                            backgroundColor: ratingColor(pair.wcagLevel),
                          }}
                        >
                          {pair.wcagLevel}
                        </span>
                      </td>
                      <td style={{ padding: "6px", textAlign: "right" }}>
                        <span style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace', marginRight: 6 }}>
                          {pair.apcaLc.toFixed(0)}
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "1px 5px",
                            borderRadius: 3,
                            fontSize: "0.5625rem",
                            fontWeight: 600,
                            color: "#fff",
                            backgroundColor: ratingColor(pair.apcaLevel),
                          }}
                        >
                          {pair.apcaLevel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredPairs.length > 100 && (
              <p style={{ fontSize: "0.75rem", color: "var(--doc-color-text-secondary)", marginTop: 8 }}>
                Showing first 100 of {filteredPairs.length} pairs
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
