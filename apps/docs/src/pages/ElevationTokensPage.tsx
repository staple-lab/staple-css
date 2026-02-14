import { elevationTokens } from "@staple-css/tokens";
import { TokenTable } from "../components/TokenTable";
import { CodeBlock } from "../components/CodeBlock";

const usageCode = `.card {
  box-shadow: var(--st-elevation-1);
}

.dropdown {
  box-shadow: var(--st-elevation-3);
}

.modal {
  box-shadow: var(--st-elevation-4);
}`;

function ShadowPreview({ value }: { value: string }) {
  return (
    <div
      style={{
        width: 64,
        height: 40,
        borderRadius: 4,
        backgroundColor: "var(--doc-color-bg)",
        border: "1px solid var(--doc-color-border-subtle)",
        boxShadow: value === "none" ? undefined : value,
      }}
    />
  );
}

export function ElevationTokensPage() {
  const rows = elevationTokens.map((t) => ({
    name: `--${t.name}`,
    value: t.value === "none" ? "none" : t.value.slice(0, 40) + (t.value.length > 40 ? "..." : ""),
    preview: <ShadowPreview value={t.value} />,
  }));

  return (
    <div>
      <h1 style={{ marginBottom: 12 }}>Elevation tokens</h1>
      <p style={{ color: "var(--doc-color-text-secondary)", marginBottom: 32 }}>
        A 5-step box-shadow scale from flat (0) to heavily elevated (4). Use
        elevation to communicate visual hierarchy and depth.
      </p>

      <CodeBlock code={usageCode} language="css" />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>All elevation tokens</h2>
      <TokenTable tokens={rows} />
    </div>
  );
}
