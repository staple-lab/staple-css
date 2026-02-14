import { useState, useCallback, useEffect, useRef } from "react";
import { colorTokens } from "@staple-css/tokens";
import type { ColorToken } from "../../../../packages/tokens/src/types";

interface Override {
  tokenName: string;
  value: string;
}

export function TokenEditor() {
  const [selectedToken, setSelectedToken] = useState<ColorToken | null>(null);
  const [search, setSearch] = useState("");
  const [overrides, setOverrides] = useState<Override[]>([]);
  const [colorValue, setColorValue] = useState("#2563eb");
  const [hexInput, setHexInput] = useState("#2563eb");
  const previewRef = useRef<HTMLDivElement>(null);

  const filtered = search
    ? colorTokens.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase()),
      )
    : colorTokens;

  const handleSelectToken = useCallback(
    (token: ColorToken) => {
      setSelectedToken(token);
      const existing = overrides.find((o) => o.tokenName === token.name);
      const val = existing?.value || token.light;
      setColorValue(val);
      setHexInput(val);
    },
    [overrides],
  );

  const handleColorChange = useCallback(
    (hex: string) => {
      setColorValue(hex);
      setHexInput(hex);
      if (!selectedToken) return;
      setOverrides((prev) => {
        const next = prev.filter((o) => o.tokenName !== selectedToken.name);
        next.push({ tokenName: selectedToken.name, value: hex });
        return next;
      });
    },
    [selectedToken],
  );

  const handleHexInputChange = useCallback(
    (raw: string) => {
      setHexInput(raw);
      if (/^#[0-9a-fA-F]{6}$/.test(raw)) {
        handleColorChange(raw);
      }
    },
    [handleColorChange],
  );

  const handleRemoveOverride = useCallback((tokenName: string) => {
    setOverrides((prev) => prev.filter((o) => o.tokenName !== tokenName));
  }, []);

  const handleResetAll = useCallback(() => {
    setOverrides([]);
  }, []);

  // Apply overrides as CSS variables on the preview element
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    // Clear all overrides first
    for (const token of colorTokens) {
      el.style.removeProperty(`--${token.name}`);
    }
    // Apply current overrides
    for (const o of overrides) {
      el.style.setProperty(`--${o.tokenName}`, o.value);
    }
  }, [overrides]);

  return (
    <div>
      <p style={{ color: "var(--doc-color-text-secondary)", margin: "0 0 16px" }}>
        Select a color token and adjust its value. Overrides are applied live to the preview below.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
        {/* Left column: token picker */}
        <div
          style={{
            minWidth: 0,
          }}
        >
          <input
            type="search"
            placeholder="Search color tokens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid var(--doc-color-border)",
              borderRadius: 4,
              backgroundColor: "var(--doc-color-bg)",
              color: "var(--doc-color-text)",
              fontSize: "0.875rem",
              marginBottom: 8,
              minHeight: 44,
            }}
          />

          <div
            style={{
              maxHeight: 360,
              overflowY: "auto",
              border: "1px solid var(--doc-color-border)",
              borderRadius: 4,
            }}
          >
            {filtered.slice(0, 50).map((token) => {
              const isSelected = selectedToken?.name === token.name;
              const hasOverride = overrides.some((o) => o.tokenName === token.name);
              return (
                <button
                  key={token.name}
                  onClick={() => handleSelectToken(token)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 10px",
                    border: "none",
                    borderBottom: "1px solid var(--doc-color-border-subtle)",
                    background: isSelected ? "var(--doc-color-bg-secondary)" : "transparent",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    minHeight: 40,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 3,
                      backgroundColor: hasOverride
                        ? overrides.find((o) => o.tokenName === token.name)!.value
                        : token.light,
                      border: "1px solid var(--doc-color-border)",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                        fontSize: "0.6875rem",
                        color: "var(--doc-color-text)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      --{token.name}
                    </div>
                  </div>
                  {hasOverride && (
                    <span
                      style={{
                        fontSize: "0.5625rem",
                        padding: "1px 5px",
                        borderRadius: 3,
                        backgroundColor: "var(--doc-color-accent)",
                        color: "#fff",
                      }}
                    >
                      edited
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: editor */}
        <div>
          {selectedToken ? (
            <div>
              <h3
                style={{
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: "0.8125rem",
                  marginBottom: 4,
                  color: "var(--doc-color-text)",
                }}
              >
                --{selectedToken.name}
              </h3>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--doc-color-text-secondary)",
                  marginBottom: 16,
                }}
              >
                {selectedToken.description}
              </p>

              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <input
                  type="color"
                  value={colorValue}
                  onChange={(e) => handleColorChange(e.target.value)}
                  style={{
                    width: 48,
                    height: 48,
                    border: "1px solid var(--doc-color-border)",
                    borderRadius: 4,
                    cursor: "pointer",
                    padding: 2,
                    backgroundColor: "transparent",
                  }}
                />
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.6875rem",
                      color: "var(--doc-color-text-secondary)",
                      marginBottom: 2,
                    }}
                  >
                    Hex value
                  </label>
                  <input
                    type="text"
                    value={hexInput}
                    onChange={(e) => handleHexInputChange(e.target.value)}
                    style={{
                      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                      fontSize: "0.875rem",
                      padding: "6px 10px",
                      border: "1px solid var(--doc-color-border)",
                      borderRadius: 4,
                      width: 120,
                      backgroundColor: "var(--doc-color-bg)",
                      color: "var(--doc-color-text)",
                      minHeight: 44,
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, fontSize: "0.75rem", marginBottom: 16 }}>
                <div>
                  <span style={{ color: "var(--doc-color-text-secondary)" }}>Light default:</span>{" "}
                  <code>{selectedToken.light}</code>
                </div>
                <div>
                  <span style={{ color: "var(--doc-color-text-secondary)" }}>Dark default:</span>{" "}
                  <code>{selectedToken.dark}</code>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: 32, textAlign: "center", color: "var(--doc-color-text-tertiary)", fontSize: "0.875rem" }}>
              Select a token from the list to edit it
            </div>
          )}

          {/* Active overrides */}
          {overrides.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <h4 style={{ fontSize: "0.8125rem", color: "var(--doc-color-text)" }}>
                  Active overrides ({overrides.length})
                </h4>
                <button
                  onClick={handleResetAll}
                  style={{
                    border: "none",
                    background: "none",
                    color: "var(--doc-color-text-secondary)",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    textDecoration: "underline",
                    minHeight: 44,
                    padding: "8px 4px",
                  }}
                >
                  Reset all
                </button>
              </div>
              {overrides.map((o) => (
                <div
                  key={o.tokenName}
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
                      width: 16,
                      height: 16,
                      borderRadius: 2,
                      backgroundColor: o.value,
                      border: "1px solid var(--doc-color-border)",
                      flexShrink: 0,
                    }}
                  />
                  <code style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    --{o.tokenName}: {o.value}
                  </code>
                  <button
                    onClick={() => handleRemoveOverride(o.tokenName)}
                    style={{
                      border: "none",
                      background: "none",
                      color: "var(--doc-color-text-secondary)",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      padding: "4px 8px",
                      minHeight: 44,
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Live preview */}
      <div ref={previewRef} style={{ marginTop: 32 }}>
        <h3 style={{ fontSize: "0.875rem", color: "var(--doc-color-text)", marginBottom: 12 }}>
          Live preview
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {/* Card preview */}
          <div
            style={{
              padding: 20,
              backgroundColor: "var(--st-color-bg-surface-base, #ffffff)",
              border: "1px solid var(--st-color-bd-surface-base, #e5e5e5)",
              borderRadius: 6,
            }}
          >
            <h4 style={{ color: "var(--st-color-fg-surface-base, #1a1a1a)", marginBottom: 8 }}>Card title</h4>
            <p style={{ fontSize: "0.875rem", color: "var(--st-color-fg-surface-subtle, #6b6b6b)", marginBottom: 12 }}>
              A sample card using token-based styling.
            </p>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "var(--st-color-bg-interactive-base, #2563eb)",
                color: "var(--st-color-fg-interactive-on-color, #ffffff)",
                border: "none",
                borderRadius: 4,
                fontSize: "0.8125rem",
                cursor: "pointer",
              }}
            >
              Button
            </button>
          </div>

          {/* Status banner previews */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(["info", "success", "warn", "danger"] as const).map((status) => (
              <div
                key={status}
                style={{
                  padding: "10px 14px",
                  backgroundColor: `var(--st-color-bg-status-${status}-subtle, #f0f0f0)`,
                  border: `1px solid var(--st-color-bd-status-${status}-base, #ccc)`,
                  borderRadius: 4,
                  fontSize: "0.8125rem",
                  color: `var(--st-color-fg-status-${status}-base, #333)`,
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} status message
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
