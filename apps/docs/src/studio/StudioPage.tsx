import { useState, lazy, Suspense } from "react";

const TokenExplorer = lazy(() =>
  import("./TokenExplorer").then((m) => ({ default: m.TokenExplorer })),
);
const TokenEditor = lazy(() =>
  import("./TokenEditor").then((m) => ({ default: m.TokenEditor })),
);
const ThemeBuilder = lazy(() =>
  import("./ThemeBuilder").then((m) => ({ default: m.ThemeBuilder })),
);
const PaletteGenerator = lazy(() =>
  import("./PaletteGenerator").then((m) => ({ default: m.PaletteGenerator })),
);
const ContrastAudit = lazy(() =>
  import("./ContrastAudit").then((m) => ({ default: m.ContrastAudit })),
);
const ExportPanel = lazy(() =>
  import("./ExportPanel").then((m) => ({ default: m.ExportPanel })),
);
const PreviewPane = lazy(() =>
  import("./PreviewPane").then((m) => ({ default: m.PreviewPane })),
);

type Tab =
  | "explorer"
  | "editor"
  | "theme"
  | "palette"
  | "contrast"
  | "preview"
  | "export";

const TABS: { key: Tab; label: string }[] = [
  { key: "explorer", label: "Explorer" },
  { key: "editor", label: "Editor" },
  { key: "theme", label: "Theme Builder" },
  { key: "palette", label: "Palette" },
  { key: "contrast", label: "Contrast" },
  { key: "preview", label: "Preview" },
  { key: "export", label: "Export" },
];

function TabFallback() {
  return (
    <div
      style={{
        padding: 24,
        color: "var(--doc-color-text-secondary)",
        fontSize: "0.875rem",
      }}
    >
      Loading...
    </div>
  );
}

export function StudioPage() {
  const [activeTab, setActiveTab] = useState<Tab>("explorer");

  return (
    <div>
      <h1 style={{ marginBottom: 8 }}>Token Studio</h1>
      <p
        style={{
          color: "var(--doc-color-text-secondary)",
          fontSize: "0.875rem",
          marginBottom: 24,
        }}
      >
        Explore, edit, and export design tokens. Build themes and check contrast.
      </p>

      {/* Tab navigation */}
      <nav
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid var(--doc-color-border)",
          marginBottom: 24,
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "10px 16px",
              border: "none",
              borderBottom:
                activeTab === tab.key
                  ? "2px solid var(--doc-color-text)"
                  : "2px solid transparent",
              background: "none",
              color:
                activeTab === tab.key
                  ? "var(--doc-color-text)"
                  : "var(--doc-color-text-secondary)",
              fontSize: "0.8125rem",
              cursor: "pointer",
              fontWeight: activeTab === tab.key ? 600 : 400,
              whiteSpace: "nowrap",
              minHeight: 44,
              transition: "color 0.15s, border-color 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Tab content */}
      <Suspense fallback={<TabFallback />}>
        {activeTab === "explorer" && <TokenExplorer />}
        {activeTab === "editor" && <TokenEditor />}
        {activeTab === "theme" && <ThemeBuilder />}
        {activeTab === "palette" && <PaletteGenerator />}
        {activeTab === "contrast" && <ContrastAudit />}
        {activeTab === "preview" && <PreviewPane />}
        {activeTab === "export" && <ExportPanel />}
      </Suspense>
    </div>
  );
}
