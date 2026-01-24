import { useState, useCallback } from "react";
import { Stack, Text, Inline } from "@staple-css/primitives";

interface CodePreviewProps {
  code: string;
  language?: string;
  title?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export function CodePreview({
  code,
  language = "css",
  title,
  collapsible = false,
  defaultCollapsed = true,
}: CodePreviewProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((c) => !c);
  }, []);

  return (
    <Stack gap={0}>
      {(title || collapsible) && (
        <Inline
          gap={2}
          align="center"
          justify="between"
          className="code-preview-header"
        >
          <Inline gap={2} align="center">
            {collapsible && (
              <button
                onClick={toggleCollapsed}
                className="code-preview-toggle"
                aria-label={collapsed ? "Expand" : "Collapse"}
              >
                {collapsed ? "+" : "-"}
              </button>
            )}
            {title && (
              <Text size={0} weight="medium">
                {title}
              </Text>
            )}
            {language && (
              <Text size={0} tone="muted" mono>
                {language}
              </Text>
            )}
          </Inline>
          <button onClick={handleCopy} className="code-preview-copy">
            {copied ? "Copied!" : "Copy"}
          </button>
        </Inline>
      )}
      {(!collapsible || !collapsed) && (
        <pre className="code-block code-preview-content">
          <code>{code}</code>
        </pre>
      )}
    </Stack>
  );
}

interface TabCodePreviewProps {
  tabs: Array<{
    label: string;
    code: string;
    language?: string;
  }>;
}

export function TabCodePreview({ tabs }: TabCodePreviewProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Stack gap={0}>
      <Inline gap={0} className="code-preview-tabs">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`code-preview-tab ${i === activeTab ? "code-preview-tab--active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </Inline>
      {tabs[activeTab] && (
        <CodePreview
          code={tabs[activeTab].code}
          language={tabs[activeTab].language}
        />
      )}
    </Stack>
  );
}
