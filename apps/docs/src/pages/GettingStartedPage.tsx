import { CodeBlock } from "../components/CodeBlock";

const installCode = `npm install @staple-css/tokens`;

const importAllCode = `/* app.css or your entry CSS file */
@import "@staple-css/tokens/all.css";`;

const importSelectiveCode = `/* Import only what you need */
@import "@staple-css/tokens/tokens.css";   /* semantic tokens */
@import "@staple-css/tokens/themes.css";   /* light/dark switching */
@import "@staple-css/tokens/palettes.css"; /* color palettes */`;

const htmlSetupCode = `<!DOCTYPE html>
<html lang="en" data-theme="light">
  <head>
    <link rel="stylesheet" href="your-app.css" />
  </head>
  <body>
    <!-- Your app content -->
  </body>
</html>`;

const themeToggleCode = `// Toggle between light and dark
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  html.setAttribute("data-theme", current === "dark" ? "light" : "dark");
}`;

const usageExampleCode = `.button {
  padding: var(--st-space-2) var(--st-space-4);
  font-size: var(--st-type-size-3);
  font-weight: var(--st-type-weight-semibold);
  color: var(--st-color-fg-interactive-on-color);
  background: var(--st-color-bg-interactive-base);
  border: var(--st-border-width-1) solid var(--st-color-bd-interactive-base);
  border-radius: var(--st-border-radius-2);
  transition: background var(--st-motion-duration-fast)
    var(--st-motion-easing-default);
}

.button:hover {
  background: var(--st-color-bg-interactive-base-hover);
}`;

const tsUsageCode = `import { getAllTokens, type TokenRegistry } from "@staple-css/tokens";

const tokens: TokenRegistry = getAllTokens();

// Access all color tokens
tokens.color.forEach((t) => {
  console.log(t.name, t.light, t.dark);
});`;

export function GettingStartedPage() {
  return (
    <div>
      <h1 style={{ marginBottom: 12 }}>Getting started</h1>
      <p style={{ color: "var(--doc-color-text-secondary)", marginBottom: 32 }}>
        Install the tokens package and start using CSS variables in minutes.
      </p>

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>1. Install</h2>
      <CodeBlock code={installCode} language="bash" />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>2. Import CSS</h2>
      <p style={{ marginBottom: 16, color: "var(--doc-color-text-secondary)" }}>
        Import all tokens at once, or pick only the files you need.
      </p>
      <CodeBlock code={importAllCode} language="css" />
      <p
        style={{
          marginTop: 16,
          marginBottom: 16,
          color: "var(--doc-color-text-secondary)",
        }}
      >
        Or import selectively for smaller bundles:
      </p>
      <CodeBlock code={importSelectiveCode} language="css" />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>3. Set up theming</h2>
      <p style={{ marginBottom: 16, color: "var(--doc-color-text-secondary)" }}>
        Add a <code>data-theme</code> attribute to your root element. The tokens
        CSS includes a <code>prefers-color-scheme</code> fallback for users who
        have not explicitly chosen a theme.
      </p>
      <CodeBlock code={htmlSetupCode} language="html" />
      <CodeBlock code={themeToggleCode} language="typescript" />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>4. Use tokens</h2>
      <p style={{ marginBottom: 16, color: "var(--doc-color-text-secondary)" }}>
        Reference tokens as CSS custom properties. The naming convention is{" "}
        <code>{"--st-{category}-{property}-{role}-{prominence}"}</code>.
      </p>
      <CodeBlock code={usageExampleCode} language="css" />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>TypeScript access</h2>
      <p style={{ marginBottom: 16, color: "var(--doc-color-text-secondary)" }}>
        The package also exports token data as TypeScript for programmatic
        access, code generation, or tooling.
      </p>
      <CodeBlock code={tsUsageCode} language="typescript" />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>File reference</h2>
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
            <th style={{ padding: "8px 12px", fontWeight: 600 }}>File</th>
            <th style={{ padding: "8px 12px", fontWeight: 600 }}>Contents</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["tokens.css", "All semantic tokens (color, space, type, elevation, border, motion, layout) as :root CSS variables"],
            ["themes.css", "Light/dark theme switching via [data-theme] selectors and prefers-color-scheme fallback"],
            ["palettes.css", "22 Tailwind-compatible color palettes with 11 shades each (50-950)"],
            ["all.css", "Combined: tokens + palettes + themes in a single import"],
            ["tokens.json", "W3C Design Token Community Group (DTCG) format for tool integration"],
          ].map(([file, desc]) => (
            <tr key={file} style={{ borderBottom: "1px solid var(--doc-color-border-subtle)" }}>
              <td
                style={{
                  padding: "8px 12px",
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: "0.8125rem",
                  whiteSpace: "nowrap",
                }}
              >
                {file}
              </td>
              <td style={{ padding: "8px 12px", color: "var(--doc-color-text-secondary)" }}>
                {desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
