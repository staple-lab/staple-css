/**
 * Motion Semantic Tokens
 */

import { useState } from "react";
import "../SpacingPrimitivesPage.css";

interface Token {
  name: string;
  cssVar: string;
  value: string;
  description: string;
}

const DURATION_TOKENS: Token[] = [
  { name: "instant", cssVar: "--st-duration-instant", value: "0ms", description: "No animation" },
  { name: "fast", cssVar: "--st-duration-fast", value: "100ms", description: "Quick micro-interactions" },
  { name: "normal", cssVar: "--st-duration-normal", value: "200ms", description: "Standard transitions" },
  { name: "slow", cssVar: "--st-duration-slow", value: "300ms", description: "Deliberate transitions" },
  { name: "slower", cssVar: "--st-duration-slower", value: "400ms", description: "Complex animations" },
  { name: "slowest", cssVar: "--st-duration-slowest", value: "500ms", description: "Page transitions" },
];

const EASING_TOKENS: Token[] = [
  { name: "linear", cssVar: "--st-ease-linear", value: "linear", description: "Constant speed" },
  { name: "in", cssVar: "--st-ease-in", value: "cubic-bezier(0.4, 0, 1, 1)", description: "Accelerating (exit)" },
  { name: "out", cssVar: "--st-ease-out", value: "cubic-bezier(0, 0, 0.2, 1)", description: "Decelerating (enter)" },
  { name: "in-out", cssVar: "--st-ease-in-out", value: "cubic-bezier(0.4, 0, 0.2, 1)", description: "Smooth both ways" },
  { name: "bounce", cssVar: "--st-ease-bounce", value: "cubic-bezier(0.68, -0.55, 0.27, 1.55)", description: "Bouncy effect" },
  { name: "spring", cssVar: "--st-ease-spring", value: "cubic-bezier(0.175, 0.885, 0.32, 1.275)", description: "Spring-like motion" },
];

const COMPOSED_TRANSITIONS: Token[] = [
  { name: "transition-colors", cssVar: "--st-transition-colors", value: "color, background-color, border-color 200ms ease-out", description: "Color changes" },
  { name: "transition-opacity", cssVar: "--st-transition-opacity", value: "opacity 200ms ease-out", description: "Fade in/out" },
  { name: "transition-transform", cssVar: "--st-transition-transform", value: "transform 200ms ease-out", description: "Movement & scale" },
  { name: "transition-shadow", cssVar: "--st-transition-shadow", value: "box-shadow 200ms ease-out", description: "Shadow changes" },
  { name: "transition-all", cssVar: "--st-transition-all", value: "all 200ms ease-out", description: "All properties" },
];

export function MotionTokensPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [animating, setAnimating] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const triggerAnimation = (name: string) => {
    setAnimating(name);
    setTimeout(() => setAnimating(null), 600);
  };

  return (
    <div className="spacing-page">
      <header className="spacing-page-header">
        <h1 className="spacing-page-title">Motion</h1>
        <p className="spacing-page-description">
          Animation duration, easing, and composed transition tokens.
          Use these for consistent, accessible motion across your UI.
        </p>
      </header>

      <section className="spacing-section">
        <h2 className="spacing-section-title" style={{ marginBottom: 16 }}>Durations</h2>
        <div className="spacing-scale-container">
          {DURATION_TOKENS.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
                <span className="spacing-value">{token.value}</span>
              </div>
              <div className="spacing-bar-container">
                <button
                  onClick={() => triggerAnimation(token.name)}
                  style={{
                    padding: "4px 12px",
                    fontSize: 12,
                    background: "var(--st-color-bg-secondary)",
                    border: "1px solid var(--st-color-border)",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Preview
                </button>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    background: "linear-gradient(135deg, var(--st-color-primary, #7f56d9) 0%, #9e77ed 100%)",
                    borderRadius: 4,
                    marginLeft: 12,
                    transform: animating === token.name ? "translateX(40px)" : "translateX(0)",
                    transition: `transform ${token.value} ease-out`,
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

      <section className="spacing-section">
        <h2 className="spacing-section-title" style={{ marginBottom: 16 }}>Easings</h2>
        <div className="spacing-scale-container">
          {EASING_TOKENS.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
              </div>
              <div className="spacing-bar-container">
                <button
                  onClick={() => triggerAnimation(token.name)}
                  style={{
                    padding: "4px 12px",
                    fontSize: 12,
                    background: "var(--st-color-bg-secondary)",
                    border: "1px solid var(--st-color-border)",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  Preview
                </button>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                    borderRadius: 4,
                    marginLeft: 12,
                    transform: animating === token.name ? "translateX(40px)" : "translateX(0)",
                    transition: `transform 400ms ${token.value}`,
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

      <section className="spacing-section">
        <h2 className="spacing-section-title" style={{ marginBottom: 16 }}>Composed Transitions</h2>
        <div className="spacing-scale-container">
          {COMPOSED_TRANSITIONS.map((token) => (
            <div key={token.cssVar} className="spacing-item">
              <div className="spacing-item-header">
                <span className="spacing-name">{token.name}</span>
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

      <section className="spacing-section">
        <div className="spacing-card">
          <h2 className="spacing-section-title">Usage</h2>
          <div className="spacing-code-block">
            <div className="spacing-code-header">
              <span>CSS</span>
            </div>
            <pre className="spacing-code-content">{`.btn {
  transition: var(--st-transition-colors);
}

.fade-in {
  animation: fadeIn var(--st-duration-normal) var(--st-ease-out);
}

.slide-up {
  animation: slideUp var(--st-duration-slow) var(--st-ease-out);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}</pre>
          </div>
        </div>
      </section>

      {copied && <div className="spacing-toast">Copied to clipboard</div>}
    </div>
  );
}
