import { layoutTokens, breakpoints } from "@staple-css/tokens";
import { TokenTable } from "../components/TokenTable";
import { CodeBlock } from "../components/CodeBlock";

const containerUsageCode = `.page {
  max-width: var(--st-layout-container-lg);
  margin: 0 auto;
  padding: 0 var(--st-space-4);
}`;

const breakpointUsageCode = `/* Mobile-first responsive design */
.sidebar {
  display: none;
}

@media (min-width: 768px) {
  .sidebar {
    display: block;
    width: 240px;
  }
}`;

const zIndexUsageCode = `.dropdown {
  z-index: var(--st-layout-z-dropdown);
}

.modal-overlay {
  z-index: var(--st-layout-z-modal);
}

.tooltip {
  z-index: var(--st-layout-z-tooltip);
}`;

function isContainer(name: string) { return name.includes("-container-"); }
function isScreen(name: string) { return name.includes("-screen-"); }
function isZIndex(name: string) { return name.includes("-z-"); }

const deviceLabels: Record<string, string> = {
  sm: "Landscape phones",
  md: "Tablets",
  lg: "Small desktops",
  xl: "Standard desktops",
  "2xl": "Large monitors",
};

export function LayoutTokensPage() {
  const containers = layoutTokens.filter((t) => isContainer(t.name));
  const screens = layoutTokens.filter((t) => isScreen(t.name));
  const zIndices = layoutTokens.filter((t) => isZIndex(t.name));

  return (
    <div>
      <h1 style={{ marginBottom: 12 }}>Layout tokens</h1>
      <p style={{ color: "var(--doc-color-text-secondary)", marginBottom: 32 }}>
        {layoutTokens.length} tokens for container widths, screen breakpoints,
        and z-index layering.
      </p>

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Container max-widths</h2>
      <p style={{ marginBottom: 16, color: "var(--doc-color-text-secondary)" }}>
        Use container tokens to constrain content width at different layout
        sizes.
      </p>
      <CodeBlock code={containerUsageCode} language="css" />
      <TokenTable
        tokens={containers.map((t) => ({
          name: `--${t.name}`,
          value: t.value,
        }))}
      />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Screen breakpoints</h2>
      <p style={{ marginBottom: 16, color: "var(--doc-color-text-secondary)" }}>
        Breakpoint values for responsive media queries. Use a mobile-first
        approach with <code>min-width</code>.
      </p>
      <CodeBlock code={breakpointUsageCode} language="css" />
      <TokenTable
        tokens={screens.map((t) => ({
          name: `--${t.name}`,
          value: t.value,
        }))}
      />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Breakpoint quick reference</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.875rem",
          marginBottom: 32,
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid var(--doc-color-border)", textAlign: "left" }}>
            <th style={{ padding: "8px 12px", fontWeight: 600 }}>Name</th>
            <th style={{ padding: "8px 12px", fontWeight: 600 }}>Min-Width</th>
            <th style={{ padding: "8px 12px", fontWeight: 600 }}>Typical device</th>
          </tr>
        </thead>
        <tbody>
          {breakpoints.map((bp) => (
            <tr key={bp.name} style={{ borderBottom: "1px solid var(--doc-color-border-subtle)" }}>
              <td style={{ padding: "8px 12px", fontFamily: '"JetBrains Mono", monospace', fontSize: "0.8125rem" }}>
                {bp.name}
              </td>
              <td style={{ padding: "8px 12px" }}>{bp.minWidth}</td>
              <td style={{ padding: "8px 12px", color: "var(--doc-color-text-secondary)" }}>
                {deviceLabels[bp.name] ?? ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Z-index scale</h2>
      <p style={{ marginBottom: 16, color: "var(--doc-color-text-secondary)" }}>
        Structured z-index values using 100-step increments starting at 1000
        to avoid collisions.
      </p>
      <CodeBlock code={zIndexUsageCode} language="css" />
      <TokenTable
        tokens={zIndices.map((t) => ({
          name: `--${t.name}`,
          value: t.value,
        }))}
      />
    </div>
  );
}
