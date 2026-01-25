import { useState, useCallback, useMemo } from "react";
import { Column, Text, Row } from "@staple-css/primitives";
import Prism from "prismjs";
import "prismjs/components/prism-css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";

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

  // Map language names to Prism grammar keys
  const prismLanguage = useMemo(() => {
    const langMap: Record<string, string> = {
      css: "css",
      ts: "typescript",
      typescript: "typescript",
      js: "javascript",
      javascript: "javascript",
      json: "json",
      bash: "bash",
      sh: "bash",
      shell: "bash",
    };
    return langMap[language] || "css";
  }, [language]);

  // Highlight code
  const highlightedCode = useMemo(() => {
    const grammar = Prism.languages[prismLanguage];
    if (!grammar) return code;
    return Prism.highlight(code, grammar, prismLanguage);
  }, [code, prismLanguage]);

  return (
    <Column gap={0}>
      {(title || collapsible) && (
        <Row
          gap={2}
          align="center"
          justify="between"
          className="code-preview-header"
        >
          <Row gap={2} align="center">
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
          </Row>
          <button onClick={handleCopy} className="code-preview-copy">
            {copied ? "Copied!" : "Copy"}
          </button>
        </Row>
      )}
      {(!collapsible || !collapsed) && (
        <pre className="code-block code-preview-content">
          <code
            className={`language-${prismLanguage}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      )}
    </Column>
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
  const currentTab = tabs[activeTab];

  return (
    <Column gap={0}>
      <Row gap={0} className="code-preview-tabs">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`code-preview-tab ${i === activeTab ? "code-preview-tab--active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </Row>
      {currentTab && (
        <CodePreview
          code={currentTab.code}
          language={currentTab.language}
        />
      )}
    </Column>
  );
}
