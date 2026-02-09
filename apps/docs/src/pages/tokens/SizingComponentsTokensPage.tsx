/**
 * Sizing: Components Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface SizingToken {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const ICON_SIZES: SizingToken[] = [
  { name: "icon-xs", cssVar: "--st-size-icon-xs", value: "12px", description: "Extra small icons" },
  { name: "icon-sm", cssVar: "--st-size-icon-sm", value: "16px", description: "Small icons" },
  { name: "icon-md", cssVar: "--st-size-icon-md", value: "20px", description: "Medium icons (default)" },
  { name: "icon-lg", cssVar: "--st-size-icon-lg", value: "24px", description: "Large icons" },
  { name: "icon-xl", cssVar: "--st-size-icon-xl", value: "32px", description: "Extra large icons" },
];

const AVATAR_SIZES: SizingToken[] = [
  { name: "avatar-xs", cssVar: "--st-size-avatar-xs", value: "24px", description: "Extra small avatars" },
  { name: "avatar-sm", cssVar: "--st-size-avatar-sm", value: "32px", description: "Small avatars" },
  { name: "avatar-md", cssVar: "--st-size-avatar-md", value: "40px", description: "Medium avatars (default)" },
  { name: "avatar-lg", cssVar: "--st-size-avatar-lg", value: "48px", description: "Large avatars" },
  { name: "avatar-xl", cssVar: "--st-size-avatar-xl", value: "64px", description: "Extra large avatars" },
  { name: "avatar-2xl", cssVar: "--st-size-avatar-2xl", value: "96px", description: "Profile page avatars" },
];

const INPUT_SIZES: SizingToken[] = [
  { name: "input-height-sm", cssVar: "--st-size-input-height-sm", value: "32px", description: "Small input height" },
  { name: "input-height-md", cssVar: "--st-size-input-height-md", value: "40px", description: "Medium input height" },
  { name: "input-height-lg", cssVar: "--st-size-input-height-lg", value: "48px", description: "Large input height" },
];

const BUTTON_SIZES: SizingToken[] = [
  { name: "button-height-sm", cssVar: "--st-size-button-height-sm", value: "32px", description: "Small button height" },
  { name: "button-height-md", cssVar: "--st-size-button-height-md", value: "40px", description: "Medium button height" },
  { name: "button-height-lg", cssVar: "--st-size-button-height-lg", value: "48px", description: "Large button height" },
];

const TOUCH_SIZES: SizingToken[] = [
  { name: "touch-target-min", cssVar: "--st-size-touch-target-min", value: "44px", description: "Minimum touch target (WCAG)" },
  { name: "touch-target-comfortable", cssVar: "--st-size-touch-target-comfortable", value: "48px", description: "Comfortable touch target" },
];

export function SizingComponentsTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const renderSection = (title: string, tokens: SizingToken[]) => (
    <section className="spacing-section">
      <h2 className="spacing-section-title" style={{ marginBottom: 16 }}>{title}</h2>
      <div className="spacing-scale-container">
        {tokens.map((token) => (
          <div key={token.cssVar} className="spacing-item">
            <div className="spacing-item-header">
              <span className="spacing-name">{token.name}</span>
              <span className="spacing-value">{token.value}</span>
            </div>
            <div className="spacing-bar-container">
              <div
                style={{
                  width: parseInt(token.value),
                  height: parseInt(token.value),
                  maxWidth: 64,
                  maxHeight: 64,
                  background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                  borderRadius: 4,
                }}
              />
            </div>
            <div className="spacing-item-footer">
              <code className="spacing-var">{token.cssVar}</code>
              <span className="spacing-description">{token.description}</span>
              <button
                className="spacing-copy-btn"
                onClick={() => handleCopy(`var(${token.cssVar})`)}
              >
                {copied === `var(${token.cssVar})` ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Sizing: Components</h1>
        <p className="spacing-page-description">
          Semantic sizing tokens for UI components. Ensures consistent dimensions
          for icons, avatars, inputs, buttons, and touch targets.
        </p>
      </header>

      {renderSection("Icons", ICON_SIZES)}
      {renderSection("Avatars", AVATAR_SIZES)}
      {renderSection("Inputs", INPUT_SIZES)}
      {renderSection("Buttons", BUTTON_SIZES)}
      {renderSection("Touch Targets", TOUCH_SIZES)}

      <section className="spacing-section">
        <div className="spacing-card">
          <h2 className="spacing-section-title">Usage</h2>
          <div className="spacing-code-block">
            <div className="spacing-code-header">
              <span>CSS</span>
            </div>
            <pre className="spacing-code-content">{`.icon {
  width: var(--st-size-icon-md);
  height: var(--st-size-icon-md);
}

.avatar {
  width: var(--st-size-avatar-md);
  height: var(--st-size-avatar-md);
  border-radius: 50%;
}

.input {
  height: var(--st-size-input-height-md);
}

.btn {
  min-height: var(--st-size-button-height-md);
  min-width: var(--st-size-touch-target-min);
}`}</pre>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
