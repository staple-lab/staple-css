import { typographyTokens } from "@staple-css/tokens";
import { TokenTable } from "../components/TokenTable";
import { CodeBlock } from "../components/CodeBlock";

const usageCode = `body {
  font-family: var(--st-type-family-sans);
  font-size: var(--st-type-size-3);
  font-weight: var(--st-type-weight-normal);
  line-height: var(--st-type-leading-normal);
}

h1 {
  font-size: var(--st-type-size-8);
  font-weight: var(--st-type-weight-bold);
  line-height: var(--st-type-leading-tight);
  letter-spacing: var(--st-type-tracking-tight);
}

code {
  font-family: var(--st-type-family-mono);
}`;

function isSize(name: string) { return name.includes("-size-"); }
function isWeight(name: string) { return name.includes("-weight-"); }
function isLeading(name: string) { return name.includes("-leading-"); }
function isTracking(name: string) { return name.includes("-tracking-"); }
function isFamily(name: string) { return name.includes("-family-"); }

function SizePreview({ value }: { value: string }) {
  return <span style={{ fontSize: value, lineHeight: 1.2 }}>Aa</span>;
}

function WeightPreview({ value }: { value: string }) {
  return <span style={{ fontWeight: Number(value) }}>Aa</span>;
}

export function TypographyTokensPage() {
  const sections = [
    {
      title: "Font size",
      filter: isSize,
      preview: (v: string) => <SizePreview value={v} />,
    },
    {
      title: "Font weight",
      filter: isWeight,
      preview: (v: string) => <WeightPreview value={v} />,
    },
    {
      title: "Line height (leading)",
      filter: isLeading,
      preview: () => null,
    },
    {
      title: "Letter spacing (tracking)",
      filter: isTracking,
      preview: () => null,
    },
    {
      title: "Font family",
      filter: isFamily,
      preview: (v: string) => (
        <span style={{ fontFamily: v, fontSize: "0.875rem" }}>
          The quick brown fox
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: 12 }}>Typography tokens</h1>
      <p style={{ color: "var(--doc-color-text-secondary)", marginBottom: 32 }}>
        {typographyTokens.length} tokens covering font size, weight, line
        height, letter spacing, and font family stacks.
      </p>

      <CodeBlock code={usageCode} language="css" />

      {sections.map((section) => {
        const tokens = typographyTokens.filter((t) => section.filter(t.name));
        return (
          <div key={section.title} style={{ marginTop: 40 }}>
            <h2 style={{ marginBottom: 16, fontSize: "1.25rem" }}>
              {section.title}
            </h2>
            <TokenTable
              tokens={tokens.map((t) => ({
                name: `--${t.name}`,
                value: t.value,
                preview: section.preview(t.value),
              }))}
            />
          </div>
        );
      })}
    </div>
  );
}
