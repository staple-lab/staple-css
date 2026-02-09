import { Container, Column, Card, Text, Box } from "@staple-css/primitives/full";
import {
  spaceScale,
  radiusScale,
  shadowScale,
  fontSizeScale,
  fontWeight,
  lineHeight,
  duration,
  easing,
  colorsLight,
} from "@staple-css/tokens";
import { CodePreview } from "../components/CodePreview";
import { TokenCopyButton } from "../components/TokenCopyButton";

function TokenTable({
  title,
  tokens,
  varPrefix,
  renderSample,
}: {
  title: string;
  tokens: Record<string | number, string>;
  varPrefix: string;
  renderSample?: (key: string, value: string) => React.ReactNode;
}) {
  return (
    <Column gap={3}>
      <Text as="h3" size={3} weight="semibold">
        {title}
      </Text>
      <Card pad={0} radius={2}>
        <table className="token-table">
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">CSS Variable</th>
              <th scope="col">Value</th>
              <th scope="col" style={{ width: '100px', textAlign: 'center' }}>Copy</th>
              {renderSample && <th scope="col">Sample</th>}
            </tr>
          </thead>
          <tbody>
            {Object.entries(tokens).map(([key, value]) => (
              <tr key={key}>
                <td>
                  <Text as="span" mono size={1}>
                    {key}
                  </Text>
                </td>
                <td>
                  <Text as="span" mono size={1} tone="muted">
                    {varPrefix}-{key}
                  </Text>
                </td>
                <td>
                  <Text as="span" size={1}>
                    {value}
                  </Text>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <TokenCopyButton varName={`${varPrefix}-${key}`} copyValue={`var(--${varPrefix}-${key})`} />
                </td>
                {renderSample && <td>{renderSample(key, value)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Column>
  );
}

export function TokensPage() {
  return (
    <Box as="main">
      {/* Hero Section */}
      <Box style={{ padding: "48px 0" }}>
        <Container size="lg">
          <Column gap={3} style={{ maxWidth: "750px" }}>
            <Text as="h1" style={{
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "-0.03em"
            }}>
              Design Tokens
            </Text>
            <Text tone="muted" style={{
              fontSize: "15px",
              lineHeight: 1.7,
              maxWidth: "65ch",
              fontWeight: 400
            }}>
              Tokens are the foundation of staple-css. They encode design decisions as CSS variables, ensuring consistency across your application. 350+ variables, fully typed, theme-aware.
            </Text>
          </Column>
        </Container>
      </Box>

      <Container size="lg" style={{ padding: "48px 0" }}>
        <Column gap={8}>

        {/* Usage */}
        <Box as="section">
          <Column gap={4}>
          <Text as="h2" style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.01em", margin: 0 }}>
            Usage
          </Text>
          <CodePreview
            code={`// Import all tokens
import "@staple-css/tokens/all.css";

// Or import individually
import "@staple-css/tokens/tokens.css";   // Base tokens
import "@staple-css/tokens/themes.css";   // Light/dark themes
import "@staple-css/tokens/density.css";  // Density variants`}
            language="typescript"
            title="Import"
          />
          </Column>
        </Box>

        {/* Theming */}
        <Box as="section">
          <Column gap={4}>
          <Text as="h2" style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.01em", margin: 0 }}>
            Theming
          </Text>
          <Text>
            Apply themes using the <Text as="span" mono>data-theme</Text> attribute:
          </Text>
          <CodePreview
            code={`<body data-theme="light">  <!-- Light theme (default) -->
<body data-theme="dark">   <!-- Dark theme -->`}
            language="html"
            title="Theme"
          />
          <Text>
            Apply density using the <Text as="span" mono>data-density</Text> attribute:
          </Text>
          <CodePreview
            code={`<body data-density="comfortable">  <!-- Comfortable (default) -->
<body data-density="compact">      <!-- Compact -->`}
            language="html"
            title="Density"
          />
          </Column>
        </Box>

        {/* Token Tables Section */}
        <Box as="section">
          <Text as="h2" style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.01em", margin: 0, marginBottom: "var(--st-space-6)" }}>
            Token Reference
          </Text>
          <Column gap={6}>
          {/* Space */}
          <TokenTable
          title="Space Scale (0-8)"
          tokens={spaceScale}
          varPrefix="--st-space"
          renderSample={(key) => (
            <Box
              pad={Number(key) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}
              className="example-preview"
              style={{ display: "inline-block" }}
            >
              <Box
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "var(--st-color-primary)",
                }}
              />
            </Box>
          )}
        />

        {/* Radius */}
        <TokenTable
          title="Radius Scale (0-4)"
          tokens={radiusScale}
          varPrefix="--st-radius"
          renderSample={(key) => (
            <Box
              radius={Number(key) as 0 | 1 | 2 | 3 | 4}
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "var(--st-color-primary)",
              }}
            />
          )}
        />

        {/* Shadow */}
        <TokenTable
          title="Shadow Scale (0-2)"
          tokens={shadowScale}
          varPrefix="--st-shadow"
          renderSample={(key) => (
            <Box
              shadow={Number(key) as 0 | 1 | 2}
              radius={2}
              pad={3}
              style={{ backgroundColor: "var(--st-color-surface-raised)" }}
            >
              <Text size={0}>Shadow</Text>
            </Box>
          )}
        />

        {/* Font Size */}
        <TokenTable
          title="Font Size Scale (0-6)"
          tokens={fontSizeScale}
          varPrefix="--st-font-size"
          renderSample={(key) => (
            <Text size={Number(key) as 0 | 1 | 2 | 3 | 4 | 5 | 6}>Aa</Text>
          )}
        />

        {/* Font Weight */}
        <TokenTable
          title="Font Weight"
          tokens={fontWeight}
          varPrefix="--st-font-weight"
          renderSample={(key) => (
            <Text as="span" weight={key as "normal" | "medium" | "semibold" | "bold"}>
              Sample
            </Text>
          )}
        />

        {/* Line Height */}
        <TokenTable
          title="Line Height"
          tokens={lineHeight}
          varPrefix="--st-leading"
        />

        {/* Duration */}
        <TokenTable
          title="Motion Duration"
          tokens={duration}
          varPrefix="--st-duration"
        />

        {/* Easing */}
        <TokenTable
          title="Motion Easing"
          tokens={easing}
          varPrefix="--st-easing"
        />
          </Column>
        </Box>

        {/* Colors */}
        <Box as="section">
          <Column gap={3}>
          <Text as="h2" style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.01em", margin: 0 }}>
            Color Tokens
          </Text>
          <Text size={1} tone="muted">
            Colors automatically adapt to the current theme (light/dark).
          </Text>
          <Card pad={0} radius={2}>
            <table className="token-table">
              <thead>
                <tr>
                  <th scope="col">Token</th>
                  <th scope="col">CSS Variable</th>
                  <th scope="col">Sample</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(colorsLight).map(([key]) => (
                  <tr key={key}>
                    <td>
                      <Text as="span" mono size={1}>
                        {key}
                      </Text>
                    </td>
                    <td>
                      <Text as="span" mono size={1} tone="muted">
                        --st-color-{key.replace(/([A-Z])/g, "-$1").toLowerCase()}
                      </Text>
                    </td>
                    <td>
                      <span
                        className="color-swatch"
                        style={{
                          backgroundColor: `var(--st-color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()})`,
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Column>
        </Box>
      </Column>
      </Container>
    </Box>
  );
}
