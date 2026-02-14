interface TokenRow {
  name: string;
  value: string;
  preview?: React.ReactNode;
}

interface TokenTableProps {
  tokens: TokenRow[];
}

export function TokenTable({ tokens }: TokenTableProps) {
  return (
    <>
      {/* Desktop table */}
      <div className="token-table-desktop">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.875rem",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "1px solid var(--doc-color-border)",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "8px 12px", fontWeight: 600 }}>Token</th>
              <th style={{ padding: "8px 12px", fontWeight: 600 }}>Value</th>
              <th style={{ padding: "8px 12px", fontWeight: 600 }}>Preview</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <tr
                key={token.name}
                style={{
                  borderBottom: "1px solid var(--doc-color-border-subtle)",
                }}
              >
                <td
                  style={{
                    padding: "8px 12px",
                    fontFamily:
                      '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
                    fontSize: "0.8125rem",
                  }}
                >
                  {token.name}
                </td>
                <td
                  style={{
                    padding: "8px 12px",
                    color: "var(--doc-color-text-secondary)",
                  }}
                >
                  {token.value}
                </td>
                <td style={{ padding: "8px 12px" }}>{token.preview}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="token-table-mobile">
        {tokens.map((token) => (
          <div
            key={token.name}
            style={{
              padding: "12px 0",
              borderBottom: "1px solid var(--doc-color-border-subtle)",
            }}
          >
            <div
              style={{
                fontFamily:
                  '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
                fontSize: "0.8125rem",
                marginBottom: 4,
              }}
            >
              {token.name}
            </div>
            <div
              style={{
                fontSize: "0.8125rem",
                color: "var(--doc-color-text-secondary)",
                marginBottom: 8,
              }}
            >
              {token.value}
            </div>
            {token.preview}
          </div>
        ))}
      </div>

      <style>{`
        .token-table-mobile { display: none; }
        @media (max-width: 767px) {
          .token-table-desktop { display: none; }
          .token-table-mobile { display: block; }
        }
      `}</style>
    </>
  );
}
