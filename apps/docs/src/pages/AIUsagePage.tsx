import { CodeBlock } from "../components/CodeBlock";

const promptExampleCode = `Use staple-css tokens for all styling values.

Token naming convention:
  --st-color-{bg|fg|bd|icon|ring}-{role}-{prominence}-{state}
  --st-space-{0-8|px}
  --st-type-{size|weight|leading|tracking|family}-{value}
  --st-elevation-{0-4}
  --st-border-{radius|width}-{value}
  --st-motion-{duration|easing}-{value}

Roles: surface, interactive, form, feature, ui, status-info,
       status-success, status-warn, status-danger

Prominences: base, subtle, muted, strong, on-color
States: hover, pressed, focus, disabled`;

const aiGeneratedCode = `/* AI-generated component using staple-css tokens */
.alert-banner {
  display: flex;
  align-items: center;
  gap: var(--st-space-3);
  padding: var(--st-space-3) var(--st-space-4);
  background: var(--st-color-bg-status-warn-subtle);
  border: var(--st-border-width-1) solid var(--st-color-bd-status-warn-subtle);
  border-radius: var(--st-border-radius-2);
  color: var(--st-color-fg-status-warn-base);
  font-size: var(--st-type-size-2);
}

.alert-banner svg {
  color: var(--st-color-icon-status-warn-base);
  flex-shrink: 0;
}`;

const cursorRulesCode = `# .cursorrules or similar AI config file

When writing CSS for this project:
1. Always use staple-css token variables, never raw values
2. Color tokens: --st-color-{property}-{role}-{prominence}
3. Spacing: --st-space-{0-8} (0.25rem increments from 4px-64px)
4. Typography: --st-type-size-{0-9}, --st-type-weight-{name}
5. Borders: --st-border-radius-{0-4|full}, --st-border-width-{0-2}
6. Elevation: --st-elevation-{0-4}
7. Motion: --st-motion-duration-{name} + --st-motion-easing-{name}
8. Dark mode is automatic via token values - no manual dark styles`;

export function AIUsagePage() {
  return (
    <div>
      <h1 style={{ marginBottom: 12 }}>AI usage guide</h1>
      <p style={{ color: "var(--doc-color-text-secondary)", marginBottom: 32 }}>
        staple-css tokens are designed to work well with AI coding assistants.
        The structured naming convention makes it easy for LLMs to generate
        correct token usage without memorizing every value.
      </p>

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Why tokens work well with AI</h2>
      <div style={{ display: "grid", gap: 12, marginBottom: 32 }}>
        {[
          {
            title: "Predictable naming",
            body: "The 5-level hierarchy (category-property-role-prominence-state) lets AI construct valid token names compositionally. An LLM that understands the naming rule can generate --st-color-bg-status-danger-subtle without having seen it before.",
          },
          {
            title: "Constrained choices",
            body: "Instead of choosing from infinite hex values and pixel sizes, the AI picks from a finite set of named tokens. This eliminates the most common source of AI styling errors: arbitrary values.",
          },
          {
            title: "Self-documenting",
            body: "Token names describe intent. --st-color-fg-interactive-base-hover is unambiguous. No comments needed to explain what a color is for.",
          },
          {
            title: "Dark mode for free",
            body: "AI-generated CSS automatically works in dark mode because tokens resolve to theme-appropriate values. No conditional logic required.",
          },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              padding: "16px 20px",
              border: "1px solid var(--doc-color-border)",
              borderRadius: 6,
            }}
          >
            <strong style={{ display: "block", marginBottom: 4 }}>{item.title}</strong>
            <span style={{ color: "var(--doc-color-text-secondary)", fontSize: "0.875rem" }}>
              {item.body}
            </span>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Prompt template</h2>
      <p style={{ marginBottom: 16, color: "var(--doc-color-text-secondary)" }}>
        Include this in your system prompt or project context to teach any AI
        assistant the token naming convention.
      </p>
      <CodeBlock code={promptExampleCode} language="bash" />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Example AI output</h2>
      <p style={{ marginBottom: 16, color: "var(--doc-color-text-secondary)" }}>
        Given the prompt template above, an AI assistant can generate components
        like this:
      </p>
      <CodeBlock code={aiGeneratedCode} language="css" />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>IDE integration</h2>
      <p style={{ marginBottom: 16, color: "var(--doc-color-text-secondary)" }}>
        Add token rules to your AI configuration file (such as{" "}
        <code>.cursorrules</code>, <code>CLAUDE.md</code>, or similar) so that
        the AI assistant always uses tokens.
      </p>
      <CodeBlock code={cursorRulesCode} language="bash" />

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Token cheat sheet for AI</h2>
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
            <th style={{ padding: "8px 12px", fontWeight: 600 }}>Category</th>
            <th style={{ padding: "8px 12px", fontWeight: 600 }}>Pattern</th>
            <th style={{ padding: "8px 12px", fontWeight: 600 }}>Example</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Color", "--st-color-{bg|fg|bd|icon|ring}-{role}-{prominence}", "--st-color-bg-surface-base"],
            ["Space", "--st-space-{0-8|px}", "--st-space-4"],
            ["Type size", "--st-type-size-{0-9}", "--st-type-size-3"],
            ["Type weight", "--st-type-weight-{name}", "--st-type-weight-semibold"],
            ["Leading", "--st-type-leading-{name}", "--st-type-leading-normal"],
            ["Tracking", "--st-type-tracking-{name}", "--st-type-tracking-tight"],
            ["Font family", "--st-type-family-{sans|mono}", "--st-type-family-sans"],
            ["Elevation", "--st-elevation-{0-4}", "--st-elevation-2"],
            ["Radius", "--st-border-radius-{0-4|full}", "--st-border-radius-3"],
            ["Border width", "--st-border-width-{0-2}", "--st-border-width-1"],
            ["Duration", "--st-motion-duration-{name}", "--st-motion-duration-fast"],
            ["Easing", "--st-motion-easing-{name}", "--st-motion-easing-default"],
          ].map(([cat, pattern, example]) => (
            <tr key={cat} style={{ borderBottom: "1px solid var(--doc-color-border-subtle)" }}>
              <td style={{ padding: "8px 12px", fontWeight: 500 }}>{cat}</td>
              <td style={{ padding: "8px 12px", fontFamily: '"JetBrains Mono", monospace', fontSize: "0.75rem" }}>
                {pattern}
              </td>
              <td style={{ padding: "8px 12px", fontFamily: '"JetBrains Mono", monospace', fontSize: "0.75rem" }}>
                {example}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
