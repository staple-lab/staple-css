import { spaceTokens } from "@staple-css/tokens";
import { TokenTable } from "../components/TokenTable";
import { CodeBlock } from "../components/CodeBlock";

const usageCode = `.card {
  padding: var(--st-space-4);        /* 16px */
  gap: var(--st-space-3);            /* 12px */
  margin-bottom: var(--st-space-6);  /* 32px */
}

.divider {
  height: var(--st-space-px);        /* 1px */
}`;

export function SpacingTokensPage() {
  const rows = spaceTokens.map((t) => ({
    name: `--${t.name}`,
    value: t.value,
    preview: (
      <div
        style={{
          width: t.value === "0" ? 2 : undefined,
          minWidth: 2,
          maxWidth: 200,
          height: 20,
          borderRadius: 2,
          backgroundColor: "var(--doc-color-accent)",
          opacity: t.value === "0" ? 0.2 : 0.6,
          ...(t.value !== "0" ? { width: t.value } : {}),
        }}
      />
    ),
  }));

  return (
    <div>
      <h1 style={{ marginBottom: 12 }}>Spacing tokens</h1>
      <p style={{ color: "var(--doc-color-text-secondary)", marginBottom: 16 }}>
        A geometric spacing scale anchored at 1rem (16px). Use these for
        padding, margin, gap, and any spatial relationships.
      </p>
      <p style={{ color: "var(--doc-color-text-secondary)", marginBottom: 32 }}>
        The <code>--st-space-px</code> token provides a 1px value for hairline
        borders and dividers.
      </p>

      <CodeBlock code={usageCode} language="css" />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>All spacing tokens</h2>
      <TokenTable tokens={rows} />
    </div>
  );
}
