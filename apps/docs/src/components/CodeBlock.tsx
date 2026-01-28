import { useState } from 'react';
import { Box, Row, Text } from '@staple-css/primitives/full';
import { Copy, Check } from 'lucide-react';
import './CodeBlock.css';

interface CodeBlockProps {
  code: string;
  language?: 'css' | 'jsx' | 'tsx' | 'ts' | 'json' | 'html' | 'bash';
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'css',
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <Box className="code-block">
      <Row
        justify="between"
        align="start"
        className="code-block-header"
        style={{
          padding: 'var(--st-space-3) var(--st-space-4)',
          borderBottom: '1px solid var(--st-color-border)',
          background: 'var(--st-color-surface)',
        }}
      >
        <Text
          size={0}
          tone="muted"
          style={{
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: 500,
            fontSize: '0.75rem',
          }}
        >
          {language}
        </Text>
        <button
          onClick={handleCopy}
          className={`code-copy-btn ${copied ? 'copied' : ''}`}
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check size={16} />
              <span className="copy-text">Copied</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span className="copy-text">Copy</span>
            </>
          )}
        </button>
      </Row>

      <pre
        className="code-block-pre"
        style={{
          padding: 'var(--st-space-4)',
          margin: 0,
          overflow: 'auto',
          background: 'var(--st-color-background)',
          border: 'none',
          borderRadius: '0',
        }}
      >
        <code
          className={`language-${language}`}
          style={{
            fontSize: 'var(--st-font-size-1)',
            fontFamily: 'var(--st-font-mono)',
            lineHeight: 1.5,
            display: 'block',
          }}
        >
          {lines.map((line, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: 'var(--st-space-3)',
              }}
            >
              {showLineNumbers && (
                <span
                  style={{
                    color: 'var(--st-color-text-muted)',
                    userSelect: 'none',
                    minWidth: '2em',
                    textAlign: 'right',
                    opacity: 0.5,
                  }}
                >
                  {index + 1}
                </span>
              )}
              <span>{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </Box>
  );
}
