import { colorTokens } from "@staple-css/tokens";
import { TokenSwatch } from "../components/TokenSwatch";
import { CodeBlock } from "../components/CodeBlock";

const usageCode = `.card {
  background: var(--st-color-bg-surface-base);
  color: var(--st-color-fg-surface-base);
  border: 1px solid var(--st-color-bd-surface-base);
}

.button-primary {
  background: var(--st-color-bg-interactive-base);
  color: var(--st-color-fg-interactive-on-color);
}

.button-primary:hover {
  background: var(--st-color-bg-interactive-base-hover);
}`;

type ColorGroup = { label: string; prefix: string };

const groups: ColorGroup[] = [
  { label: "Background - Surface", prefix: "st-color-bg-surface" },
  { label: "Background - Interactive", prefix: "st-color-bg-interactive" },
  { label: "Background - Form", prefix: "st-color-bg-form" },
  { label: "Background - Feature", prefix: "st-color-bg-feature" },
  { label: "Background - UI", prefix: "st-color-bg-ui" },
  { label: "Background - Status", prefix: "st-color-bg-status" },
  { label: "Foreground - Surface", prefix: "st-color-fg-surface" },
  { label: "Foreground - Interactive", prefix: "st-color-fg-interactive" },
  { label: "Foreground - Form", prefix: "st-color-fg-form" },
  { label: "Foreground - Feature", prefix: "st-color-fg-feature" },
  { label: "Foreground - UI", prefix: "st-color-fg-ui" },
  { label: "Foreground - Status", prefix: "st-color-fg-status" },
  { label: "Border - Surface", prefix: "st-color-bd-surface" },
  { label: "Border - Interactive", prefix: "st-color-bd-interactive" },
  { label: "Border - Form", prefix: "st-color-bd-form" },
  { label: "Border - Feature", prefix: "st-color-bd-feature" },
  { label: "Border - UI", prefix: "st-color-bd-ui" },
  { label: "Border - Status", prefix: "st-color-bd-status" },
  { label: "Icon", prefix: "st-color-icon" },
  { label: "Focus Ring", prefix: "st-color-ring" },
];

export function ColorTokensPage() {
  return (
    <div>
      <h1 style={{ marginBottom: 12 }}>Color tokens</h1>
      <p style={{ color: "var(--doc-color-text-secondary)", marginBottom: 16 }}>
        {colorTokens.length} semantic color tokens organized by property
        (bg, fg, bd, icon, ring), role, prominence, and state. Every token has
        light and dark values.
      </p>
      <p style={{ color: "var(--doc-color-text-secondary)", marginBottom: 32 }}>
        Naming: <code>{"--st-color-{property}-{role}-{prominence}-{state}"}</code>
      </p>

      <CodeBlock code={usageCode} language="css" />

      {groups.map((group) => {
        const tokens = colorTokens.filter((t) => t.name.startsWith(group.prefix));
        if (tokens.length === 0) return null;
        return (
          <div key={group.label} style={{ marginTop: 40 }}>
            <h2 style={{ marginBottom: 12, fontSize: "1.25rem" }}>{group.label}</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 4,
              }}
            >
              {tokens.map((t) => (
                <TokenSwatch key={t.name} name={`--${t.name}`} value={t.light} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
