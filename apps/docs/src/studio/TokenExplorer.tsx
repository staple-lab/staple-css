import { useState, useCallback, useMemo } from "react";

type Category = "color" | "space" | "typography" | "elevation" | "border" | "motion" | "layout";

interface ColorToken {
  name: string;
  light: string;
  dark: string;
  description: string;
}

interface ScaleToken {
  name: string;
  value: string;
  description: string;
}

interface CategoryDef {
  key: Category;
  label: string;
  count: number;
}

// Embedded token data - standalone, no external imports needed
const colorTokens: ColorToken[] = [
  { name: "st-color-bg-surface-base", light: "#ffffff", dark: "#0a0a0a", description: "Default page background" },
  { name: "st-color-bg-surface-raised", light: "#f9f9f9", dark: "#141414", description: "Raised surface (cards)" },
  { name: "st-color-bg-surface-sunken", light: "#f3f3f3", dark: "#0d0d0d", description: "Sunken surface (wells)" },
  { name: "st-color-bg-surface-muted", light: "#e8e8e8", dark: "#1a1a1a", description: "Muted background" },
  { name: "st-color-bg-interactive-base", light: "#2563eb", dark: "#3b82f6", description: "Primary interactive background" },
  { name: "st-color-bg-interactive-base-hover", light: "#1d4ed8", dark: "#60a5fa", description: "Primary interactive hover" },
  { name: "st-color-bg-interactive-base-pressed", light: "#1e40af", dark: "#93bbfd", description: "Primary interactive pressed" },
  { name: "st-color-bg-interactive-subtle", light: "#eff6ff", dark: "#172554", description: "Subtle interactive background" },
  { name: "st-color-bg-interactive-muted", light: "#f0f0f0", dark: "#1c1c1c", description: "Muted interactive background" },
  { name: "st-color-bg-status-info-subtle", light: "#eff6ff", dark: "#172554", description: "Info status background" },
  { name: "st-color-bg-status-success-subtle", light: "#f0fdf4", dark: "#052e16", description: "Success status background" },
  { name: "st-color-bg-status-warn-subtle", light: "#fffbeb", dark: "#451a03", description: "Warning status background" },
  { name: "st-color-bg-status-danger-subtle", light: "#fef2f2", dark: "#450a0a", description: "Danger status background" },
  { name: "st-color-fg-surface-base", light: "#1a1a1a", dark: "#e5e5e5", description: "Primary text" },
  { name: "st-color-fg-surface-subtle", light: "#6b6b6b", dark: "#8b8b8b", description: "Secondary text" },
  { name: "st-color-fg-surface-muted", light: "#9a9a9a", dark: "#636363", description: "Muted text" },
  { name: "st-color-fg-interactive-base", light: "#2563eb", dark: "#60a5fa", description: "Interactive text/link" },
  { name: "st-color-fg-interactive-on-color", light: "#ffffff", dark: "#ffffff", description: "Text on primary color" },
  { name: "st-color-bd-surface-base", light: "#e5e5e5", dark: "#262626", description: "Default border" },
  { name: "st-color-bd-surface-subtle", light: "#f0f0f0", dark: "#1a1a1a", description: "Subtle border" },
  { name: "st-color-bd-interactive-base", light: "#2563eb", dark: "#3b82f6", description: "Interactive border" },
  { name: "st-color-bd-form-base", light: "#d4d4d4", dark: "#404040", description: "Form input border" },
  { name: "st-color-icon-base", light: "#6b6b6b", dark: "#8b8b8b", description: "Default icon color" },
  { name: "st-color-icon-muted", light: "#9a9a9a", dark: "#636363", description: "Muted icon color" },
  { name: "st-color-icon-interactive", light: "#2563eb", dark: "#60a5fa", description: "Interactive icon color" },
  { name: "st-color-ring-focus", light: "#2563eb", dark: "#3b82f6", description: "Focus ring color" },
];

const spaceTokens: ScaleToken[] = [
  { name: "st-space-0", value: "0", description: "No spacing" },
  { name: "st-space-px", value: "1px", description: "Hairline" },
  { name: "st-space-1", value: "0.25rem", description: "4px" },
  { name: "st-space-2", value: "0.5rem", description: "8px" },
  { name: "st-space-3", value: "0.75rem", description: "12px" },
  { name: "st-space-4", value: "1rem", description: "16px" },
  { name: "st-space-5", value: "1.5rem", description: "24px" },
  { name: "st-space-6", value: "2rem", description: "32px" },
  { name: "st-space-7", value: "3rem", description: "48px" },
  { name: "st-space-8", value: "4rem", description: "64px" },
];

const typographyTokens: ScaleToken[] = [
  { name: "st-type-size-0", value: "0.625rem", description: "10px" },
  { name: "st-type-size-1", value: "0.75rem", description: "12px" },
  { name: "st-type-size-2", value: "0.875rem", description: "14px" },
  { name: "st-type-size-3", value: "1rem", description: "16px" },
  { name: "st-type-size-4", value: "1.125rem", description: "18px" },
  { name: "st-type-size-5", value: "1.25rem", description: "20px" },
  { name: "st-type-size-6", value: "1.5rem", description: "24px" },
  { name: "st-type-size-7", value: "1.875rem", description: "30px" },
  { name: "st-type-size-8", value: "2.25rem", description: "36px" },
  { name: "st-type-weight-light", value: "300", description: "Light weight" },
  { name: "st-type-weight-normal", value: "400", description: "Normal weight" },
  { name: "st-type-weight-medium", value: "500", description: "Medium weight" },
  { name: "st-type-weight-semibold", value: "600", description: "Semibold weight" },
  { name: "st-type-weight-bold", value: "700", description: "Bold weight" },
  { name: "st-type-leading-none", value: "1", description: "No extra leading" },
  { name: "st-type-leading-tight", value: "1.25", description: "Tight leading" },
  { name: "st-type-leading-normal", value: "1.5", description: "Normal leading" },
  { name: "st-type-leading-relaxed", value: "1.75", description: "Relaxed leading" },
  { name: "st-type-tracking-tight", value: "-0.02em", description: "Tight tracking" },
  { name: "st-type-tracking-normal", value: "0", description: "Normal tracking" },
  { name: "st-type-tracking-wide", value: "0.05em", description: "Wide tracking" },
];

const elevationTokens: ScaleToken[] = [
  { name: "st-elevation-0", value: "none", description: "Flat" },
  { name: "st-elevation-1", value: "0 1px 2px rgba(0,0,0,0.05)", description: "Subtle shadow" },
  { name: "st-elevation-2", value: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)", description: "Low shadow" },
  { name: "st-elevation-3", value: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)", description: "Medium shadow" },
  { name: "st-elevation-4", value: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)", description: "High shadow" },
];

const borderTokens: ScaleToken[] = [
  { name: "st-border-radius-0", value: "0", description: "No radius" },
  { name: "st-border-radius-1", value: "2px", description: "Subtle radius" },
  { name: "st-border-radius-2", value: "4px", description: "Default radius" },
  { name: "st-border-radius-3", value: "6px", description: "Medium radius" },
  { name: "st-border-radius-4", value: "8px", description: "Large radius" },
  { name: "st-border-radius-full", value: "9999px", description: "Pill radius" },
  { name: "st-border-width-0", value: "0", description: "No border" },
  { name: "st-border-width-1", value: "1px", description: "Default border width" },
  { name: "st-border-width-2", value: "2px", description: "Thick border width" },
];

const motionTokens: ScaleToken[] = [
  { name: "st-motion-duration-instant", value: "0ms", description: "Instant" },
  { name: "st-motion-duration-fast", value: "100ms", description: "Fast transitions" },
  { name: "st-motion-duration-normal", value: "200ms", description: "Default transitions" },
  { name: "st-motion-duration-slow", value: "400ms", description: "Slow transitions" },
  { name: "st-motion-duration-slower", value: "600ms", description: "Very slow transitions" },
  { name: "st-motion-easing-default", value: "ease", description: "Default easing" },
  { name: "st-motion-easing-in", value: "ease-in", description: "Ease in" },
  { name: "st-motion-easing-out", value: "ease-out", description: "Ease out" },
  { name: "st-motion-easing-in-out", value: "ease-in-out", description: "Ease in-out" },
  { name: "st-motion-easing-linear", value: "linear", description: "Linear" },
];

const layoutTokens: ScaleToken[] = [
  { name: "st-screen-sm", value: "640px", description: "Small breakpoint" },
  { name: "st-screen-md", value: "768px", description: "Medium breakpoint" },
  { name: "st-screen-lg", value: "1024px", description: "Large breakpoint" },
  { name: "st-screen-xl", value: "1280px", description: "Extra-large breakpoint" },
  { name: "st-screen-2xl", value: "1536px", description: "2XL breakpoint" },
  { name: "st-container-sm", value: "640px", description: "Small container" },
  { name: "st-container-md", value: "768px", description: "Medium container" },
  { name: "st-container-lg", value: "1024px", description: "Large container" },
  { name: "st-container-xl", value: "1280px", description: "XL container" },
  { name: "st-z-auto", value: "auto", description: "Auto z-index" },
  { name: "st-z-0", value: "0", description: "Base z-index" },
  { name: "st-z-10", value: "10", description: "Low z-index" },
  { name: "st-z-20", value: "20", description: "Header z-index" },
  { name: "st-z-30", value: "30", description: "Dropdown z-index" },
  { name: "st-z-40", value: "40", description: "Modal z-index" },
  { name: "st-z-50", value: "50", description: "Toast z-index" },
  { name: "st-z-max", value: "9999", description: "Maximum z-index" },
];

function groupColorTokens(tokens: ColorToken[]): Record<string, ColorToken[]> {
  const groups: Record<string, ColorToken[]> = {};
  for (const t of tokens) {
    const parts = t.name.replace("st-color-", "").split("-");
    const groupKey = parts.slice(0, 2).join("-");
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(t);
  }
  return groups;
}

function groupScaleTokens(tokens: ScaleToken[]): Record<string, ScaleToken[]> {
  const groups: Record<string, ScaleToken[]> = {};
  for (const t of tokens) {
    const parts = t.name.replace("st-", "").split("-");
    const groupKey = parts.slice(0, 2).join("-");
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(t);
  }
  return groups;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function ColorSwatchRow({ token }: { token: ColorToken }) {
  const [copied, setCopied] = useState(false);
  const varName = `var(--${token.name})`;

  const handleCopy = useCallback(() => {
    copyToClipboard(varName);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [varName]);

  return (
    <button
      onClick={handleCopy}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 8px",
        border: "none",
        background: copied ? "var(--doc-color-bg-secondary)" : "transparent",
        borderRadius: 4,
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        minHeight: 44,
        transition: "background 0.15s",
      }}
      title={token.description}
    >
      <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 3,
            backgroundColor: token.light,
            border: "1px solid var(--doc-color-border)",
          }}
        />
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 3,
            backgroundColor: token.dark,
            border: "1px solid var(--doc-color-border)",
          }}
        />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: "0.75rem",
            color: "var(--doc-color-text)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          --{token.name}
        </div>
        <div style={{ fontSize: "0.6875rem", color: "var(--doc-color-text-secondary)" }}>
          {token.description}
        </div>
      </div>
      <span
        style={{
          fontSize: "0.625rem",
          color: "var(--doc-color-text-tertiary)",
          flexShrink: 0,
        }}
      >
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}

function ScaleTokenRow({ token, category }: { token: ScaleToken; category: Category }) {
  const [copied, setCopied] = useState(false);
  const varName = `var(--${token.name})`;

  const handleCopy = useCallback(() => {
    copyToClipboard(varName);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [varName]);

  const preview = useMemo(() => {
    if (category === "space") {
      return (
        <div
          style={{
            width: token.value === "0" ? 2 : undefined,
            minWidth: 2,
            height: 24,
            maxWidth: 64,
            flex: `0 0 ${token.value}`,
            backgroundColor: "var(--doc-color-accent)",
            borderRadius: 2,
            opacity: 0.6,
          }}
        />
      );
    }
    if (category === "typography" && token.name.includes("size")) {
      return (
        <span style={{ fontSize: token.value, lineHeight: 1.2, color: "var(--doc-color-text)" }}>
          Aa
        </span>
      );
    }
    if (category === "typography" && token.name.includes("weight")) {
      return (
        <span style={{ fontWeight: token.value, color: "var(--doc-color-text)" }}>Aa</span>
      );
    }
    if (category === "elevation") {
      return (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 4,
            backgroundColor: "var(--doc-color-bg)",
            boxShadow: token.value,
          }}
        />
      );
    }
    if (category === "border" && token.name.includes("radius")) {
      return (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: token.value,
            border: "2px solid var(--doc-color-accent)",
            opacity: 0.6,
          }}
        />
      );
    }
    return null;
  }, [token, category]);

  return (
    <button
      onClick={handleCopy}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 8px",
        border: "none",
        background: copied ? "var(--doc-color-bg-secondary)" : "transparent",
        borderRadius: 4,
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        minHeight: 44,
        transition: "background 0.15s",
      }}
      title={token.description}
    >
      <div style={{ width: 52, flexShrink: 0, display: "flex", justifyContent: "center" }}>
        {preview}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: "0.75rem",
            color: "var(--doc-color-text)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          --{token.name}
        </div>
        <div style={{ fontSize: "0.6875rem", color: "var(--doc-color-text-secondary)" }}>
          {token.value}
        </div>
      </div>
      <span
        style={{
          fontSize: "0.625rem",
          color: "var(--doc-color-text-tertiary)",
          flexShrink: 0,
        }}
      >
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}

export function TokenExplorer() {
  const [activeCategory, setActiveCategory] = useState<Category>("color");
  const [search, setSearch] = useState("");

  const categories: CategoryDef[] = useMemo(
    () => [
      { key: "color", label: "Color", count: colorTokens.length },
      { key: "space", label: "Space", count: spaceTokens.length },
      { key: "typography", label: "Typography", count: typographyTokens.length },
      { key: "elevation", label: "Elevation", count: elevationTokens.length },
      { key: "border", label: "Border", count: borderTokens.length },
      { key: "motion", label: "Motion", count: motionTokens.length },
      { key: "layout", label: "Layout", count: layoutTokens.length },
    ],
    [],
  );

  const totalCount = useMemo(
    () => categories.reduce((sum, c) => sum + c.count, 0),
    [categories],
  );

  const filteredColorGroups = useMemo(() => {
    const groups = groupColorTokens(colorTokens);
    if (!search) return groups;
    const filtered: Record<string, ColorToken[]> = {};
    for (const [key, tokens] of Object.entries(groups)) {
      const matches = tokens.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase()),
      );
      if (matches.length > 0) filtered[key] = matches;
    }
    return filtered;
  }, [search]);

  const getScaleTokens = useCallback(
    (category: Category): ScaleToken[] => {
      const map: Record<string, ScaleToken[]> = {
        space: spaceTokens,
        typography: typographyTokens,
        elevation: elevationTokens,
        border: borderTokens,
        motion: motionTokens,
        layout: layoutTokens,
      };
      const tokens = map[category] ?? [];
      if (!search) return tokens;
      return tokens.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase()) ||
          t.value.toLowerCase().includes(search.toLowerCase()),
      );
    },
    [search],
  );

  const formatGroupLabel = (key: string): string => {
    return key
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" / ");
  };

  return (
    <div>
      <p style={{ color: "var(--doc-color-text-secondary)", margin: "0 0 16px" }}>
        Browse all {totalCount} tokens. Click any token to copy its CSS variable reference.
      </p>

      <input
        type="search"
        placeholder="Filter tokens..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: 400,
          padding: "8px 12px",
          border: "1px solid var(--doc-color-border)",
          borderRadius: 4,
          backgroundColor: "var(--doc-color-bg)",
          color: "var(--doc-color-text)",
          fontSize: "0.875rem",
          marginBottom: 16,
          minHeight: 44,
        }}
      />

      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--doc-color-border)", marginBottom: 20, flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            style={{
              padding: "8px 14px",
              border: "none",
              borderBottom: activeCategory === cat.key ? "2px solid var(--doc-color-text)" : "2px solid transparent",
              background: "none",
              color: activeCategory === cat.key ? "var(--doc-color-text)" : "var(--doc-color-text-secondary)",
              fontSize: "0.8125rem",
              cursor: "pointer",
              fontWeight: activeCategory === cat.key ? 600 : 400,
              minHeight: 44,
              transition: "color 0.15s",
            }}
          >
            {cat.label}
            <span style={{ marginLeft: 4, fontSize: "0.6875rem", opacity: 0.6 }}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {activeCategory === "color" ? (
        <div>
          {Object.entries(filteredColorGroups).map(([groupKey, tokens]) => (
            <div key={groupKey} style={{ marginBottom: 24 }}>
              <h3
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "var(--doc-color-text-secondary)",
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {formatGroupLabel(groupKey)}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 0 }}>
                {tokens.map((t) => (
                  <ColorSwatchRow key={t.name} token={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {(() => {
            const tokens = getScaleTokens(activeCategory);
            const groups = groupScaleTokens(tokens);
            return Object.entries(groups).map(([groupKey, groupTokens]) => (
              <div key={groupKey} style={{ marginBottom: 24 }}>
                <h3
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--doc-color-text-secondary)",
                    marginBottom: 4,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {formatGroupLabel(groupKey)}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 0 }}>
                  {groupTokens.map((t) => (
                    <ScaleTokenRow key={t.name} token={t} category={activeCategory} />
                  ))}
                </div>
              </div>
            ));
          })()}
        </div>
      )}
    </div>
  );
}
