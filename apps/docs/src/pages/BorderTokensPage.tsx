import { borderTokens } from "@staple-css/tokens";
import { TokenTable } from "../components/TokenTable";
import { CodeBlock } from "../components/CodeBlock";

const usageCode = `.card {
  border: var(--st-border-width-1) solid var(--st-color-bd-surface-base);
  border-radius: var(--st-border-radius-3);
}

.pill {
  border-radius: var(--st-border-radius-full);
}

.input {
  border: var(--st-border-width-1) solid var(--st-color-bd-form-base);
  border-radius: var(--st-border-radius-2);
}

.input:focus {
  border-width: var(--st-border-width-2);
  border-color: var(--st-color-bd-form-base-focus);
}`;

function isRadius(name: string) { return name.includes("-radius-"); }
function isWidth(name: string) { return name.includes("-width-"); }

function RadiusPreview({ value }: { value: string }) {
  return (
    <div
      style={{
        width: 48,
        height: 32,
        border: "2px solid var(--doc-color-accent)",
        borderRadius: value,
        opacity: 0.6,
      }}
    />
  );
}

function WidthPreview({ value }: { value: string }) {
  return (
    <div
      style={{
        width: 48,
        borderBottom: `${value} solid var(--doc-color-accent)`,
        opacity: value === "0" ? 0.2 : 0.6,
        minHeight: value === "0" ? 2 : undefined,
      }}
    />
  );
}

export function BorderTokensPage() {
  const radii = borderTokens.filter((t) => isRadius(t.name));
  const widths = borderTokens.filter((t) => isWidth(t.name));

  return (
    <div>
      <h1 style={{ marginBottom: 12 }}>Border tokens</h1>
      <p style={{ color: "var(--doc-color-text-secondary)", marginBottom: 32 }}>
        {borderTokens.length} tokens covering border radius and border width.
      </p>

      <CodeBlock code={usageCode} language="css" />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Border radius</h2>
      <TokenTable
        tokens={radii.map((t) => ({
          name: `--${t.name}`,
          value: t.value,
          preview: <RadiusPreview value={t.value} />,
        }))}
      />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Border width</h2>
      <TokenTable
        tokens={widths.map((t) => ({
          name: `--${t.name}`,
          value: t.value,
          preview: <WidthPreview value={t.value} />,
        }))}
      />
    </div>
  );
}
