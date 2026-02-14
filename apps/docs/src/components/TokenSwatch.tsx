interface TokenSwatchProps {
  name: string;
  value: string;
}

export function TokenSwatch({ name, value }: TokenSwatchProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 0",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 4,
          border: "1px solid var(--doc-color-border)",
          backgroundColor: value,
          flexShrink: 0,
        }}
      />
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily:
              '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
            fontSize: "0.8125rem",
            color: "var(--doc-color-text)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--doc-color-text-secondary)",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
