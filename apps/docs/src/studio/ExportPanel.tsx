import { useState, useMemo, useCallback } from "react";
import { colorTokens } from "@staple-css/tokens";
import { spaceTokens } from "../../../../packages/tokens/src/definitions/space";
import { typographyTokens } from "../../../../packages/tokens/src/definitions/typography";
import { elevationTokens } from "../../../../packages/tokens/src/definitions/elevation";
import { borderTokens } from "../../../../packages/tokens/src/definitions/border";
import { motionTokens } from "../../../../packages/tokens/src/definitions/motion";
import { layoutTokens } from "../../../../packages/tokens/src/definitions/layout";
import { CodeBlock } from "../components/CodeBlock";

type ExportFormat = "css" | "json" | "typescript";
type CategoryFilter = "all" | "color" | "space" | "typography" | "elevation" | "border" | "motion" | "layout";

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function ExportPanel() {
  const [format, setFormat] = useState<ExportFormat>("css");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [mode, setMode] = useState<"light" | "dark">("light");

  const exportContent = useMemo(() => {
    const includeColor = category === "all" || category === "color";
    const includeSpace = category === "all" || category === "space";
    const includeType = category === "all" || category === "typography";
    const includeElevation = category === "all" || category === "elevation";
    const includeBorder = category === "all" || category === "border";
    const includeMotion = category === "all" || category === "motion";
    const includeLayout = category === "all" || category === "layout";

    if (format === "css") {
      const lines: string[] = [":root {"];

      if (includeColor) {
        lines.push("  /* Color tokens */");
        for (const t of colorTokens) {
          const val = mode === "light" ? t.light : t.dark;
          lines.push(`  --${t.name}: ${val};`);
        }
        lines.push("");
      }

      if (includeSpace) {
        lines.push("  /* Space tokens */");
        for (const t of spaceTokens) {
          lines.push(`  --${t.name}: ${t.value};`);
        }
        lines.push("");
      }

      if (includeType) {
        lines.push("  /* Typography tokens */");
        for (const t of typographyTokens) {
          lines.push(`  --${t.name}: ${t.value};`);
        }
        lines.push("");
      }

      if (includeElevation) {
        lines.push("  /* Elevation tokens */");
        for (const t of elevationTokens) {
          lines.push(`  --${t.name}: ${t.value};`);
        }
        lines.push("");
      }

      if (includeBorder) {
        lines.push("  /* Border tokens */");
        for (const t of borderTokens) {
          lines.push(`  --${t.name}: ${t.value};`);
        }
        lines.push("");
      }

      if (includeMotion) {
        lines.push("  /* Motion tokens */");
        for (const t of motionTokens) {
          lines.push(`  --${t.name}: ${t.value};`);
        }
        lines.push("");
      }

      if (includeLayout) {
        lines.push("  /* Layout tokens */");
        for (const t of layoutTokens) {
          lines.push(`  --${t.name}: ${t.value};`);
        }
        lines.push("");
      }

      lines.push("}");
      return lines.join("\n");
    }

    if (format === "json") {
      const obj: Record<string, Record<string, string>> = {};

      if (includeColor) {
        obj.color = {};
        for (const t of colorTokens) {
          obj.color[t.name] = mode === "light" ? t.light : t.dark;
        }
      }

      if (includeSpace) {
        obj.space = {};
        for (const t of spaceTokens) {
          obj.space[t.name] = t.value;
        }
      }

      if (includeType) {
        obj.typography = {};
        for (const t of typographyTokens) {
          obj.typography[t.name] = t.value;
        }
      }

      if (includeElevation) {
        obj.elevation = {};
        for (const t of elevationTokens) {
          obj.elevation[t.name] = t.value;
        }
      }

      if (includeBorder) {
        obj.border = {};
        for (const t of borderTokens) {
          obj.border[t.name] = t.value;
        }
      }

      if (includeMotion) {
        obj.motion = {};
        for (const t of motionTokens) {
          obj.motion[t.name] = t.value;
        }
      }

      if (includeLayout) {
        obj.layout = {};
        for (const t of layoutTokens) {
          obj.layout[t.name] = t.value;
        }
      }

      return JSON.stringify(obj, null, 2);
    }

    // TypeScript format
    const lines: string[] = [
      "/** Auto-generated design tokens */",
      "",
      "export const tokens = {",
    ];

    if (includeColor) {
      lines.push("  color: {");
      for (const t of colorTokens) {
        const val = mode === "light" ? t.light : t.dark;
        lines.push(`    "${t.name}": "${val}",`);
      }
      lines.push("  },");
    }

    if (includeSpace) {
      lines.push("  space: {");
      for (const t of spaceTokens) {
        lines.push(`    "${t.name}": "${t.value}",`);
      }
      lines.push("  },");
    }

    if (includeType) {
      lines.push("  typography: {");
      for (const t of typographyTokens) {
        lines.push(`    "${t.name}": "${t.value}",`);
      }
      lines.push("  },");
    }

    if (includeElevation) {
      lines.push("  elevation: {");
      for (const t of elevationTokens) {
        lines.push(`    "${t.name}": "${t.value}",`);
      }
      lines.push("  },");
    }

    if (includeBorder) {
      lines.push("  border: {");
      for (const t of borderTokens) {
        lines.push(`    "${t.name}": "${t.value}",`);
      }
      lines.push("  },");
    }

    if (includeMotion) {
      lines.push("  motion: {");
      for (const t of motionTokens) {
        lines.push(`    "${t.name}": "${t.value}",`);
      }
      lines.push("  },");
    }

    if (includeLayout) {
      lines.push("  layout: {");
      for (const t of layoutTokens) {
        lines.push(`    "${t.name}": "${t.value}",`);
      }
      lines.push("  },");
    }

    lines.push("} as const;");
    lines.push("");
    lines.push("export type TokenName = keyof typeof tokens;");
    return lines.join("\n");
  }, [format, category, mode]);

  const handleDownload = useCallback(() => {
    const ext = format === "css" ? "css" : format === "json" ? "json" : "ts";
    const mime = format === "css" ? "text/css" : format === "json" ? "application/json" : "text/typescript";
    downloadFile(exportContent, `staple-tokens.${ext}`, mime);
  }, [exportContent, format]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(exportContent);
  }, [exportContent]);

  const tokenCount = useMemo(() => {
    let count = 0;
    if (category === "all" || category === "color") count += colorTokens.length;
    if (category === "all" || category === "space") count += spaceTokens.length;
    if (category === "all" || category === "typography") count += typographyTokens.length;
    if (category === "all" || category === "elevation") count += elevationTokens.length;
    if (category === "all" || category === "border") count += borderTokens.length;
    if (category === "all" || category === "motion") count += motionTokens.length;
    if (category === "all" || category === "layout") count += layoutTokens.length;
    return count;
  }, [category]);

  return (
    <div>
      <p style={{ color: "var(--doc-color-text-secondary)", margin: "0 0 16px" }}>
        Export {tokenCount} tokens in CSS, JSON, or TypeScript format.
      </p>

      {/* Controls */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20, alignItems: "end" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", color: "var(--doc-color-text-secondary)", marginBottom: 4 }}>
            Format
          </label>
          <div style={{ display: "flex", gap: 0, border: "1px solid var(--doc-color-border)", borderRadius: 4, overflow: "hidden" }}>
            {(["css", "json", "typescript"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                style={{
                  padding: "8px 14px",
                  border: "none",
                  backgroundColor: format === f ? "var(--doc-color-bg-secondary)" : "transparent",
                  color: "var(--doc-color-text)",
                  fontSize: "0.8125rem",
                  cursor: "pointer",
                  minHeight: 44,
                  textTransform: "uppercase",
                }}
              >
                {f === "typescript" ? "TS" : f}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.75rem", color: "var(--doc-color-text-secondary)", marginBottom: 4 }}>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryFilter)}
            style={{
              padding: "8px 12px",
              border: "1px solid var(--doc-color-border)",
              borderRadius: 4,
              backgroundColor: "var(--doc-color-bg)",
              color: "var(--doc-color-text)",
              fontSize: "0.8125rem",
              minHeight: 44,
              cursor: "pointer",
            }}
          >
            <option value="all">All tokens</option>
            <option value="color">Color</option>
            <option value="space">Space</option>
            <option value="typography">Typography</option>
            <option value="elevation">Elevation</option>
            <option value="border">Border</option>
            <option value="motion">Motion</option>
            <option value="layout">Layout</option>
          </select>
        </div>

        {(category === "all" || category === "color") && (
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "var(--doc-color-text-secondary)", marginBottom: 4 }}>
              Color mode
            </label>
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
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
          <button
            onClick={handleCopy}
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
            Copy
          </button>
          <button
            onClick={handleDownload}
            style={{
              padding: "8px 16px",
              border: "1px solid var(--doc-color-text)",
              borderRadius: 4,
              backgroundColor: "var(--doc-color-text)",
              color: "var(--doc-color-bg)",
              fontSize: "0.8125rem",
              cursor: "pointer",
              minHeight: 44,
              fontWeight: 500,
            }}
          >
            Download
          </button>
        </div>
      </div>

      {/* Code output */}
      <CodeBlock code={exportContent} language={format === "typescript" ? "typescript" : format} />
    </div>
  );
}
