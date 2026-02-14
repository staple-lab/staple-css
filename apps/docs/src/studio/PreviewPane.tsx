export function PreviewPane() {
  return (
    <div>
      <p style={{ color: "var(--doc-color-text-secondary)", margin: "0 0 24px" }}>
        Live preview of common UI patterns rendered with token-based CSS variables.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 24,
        }}
      >
        {/* Text hierarchy */}
        <div
          style={{
            padding: 24,
            backgroundColor: "var(--st-color-bg-surface-base, #ffffff)",
            border: "1px solid var(--st-color-bd-surface-base, #e5e5e5)",
            borderRadius: 8,
          }}
        >
          <h3
            style={{
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--st-color-fg-surface-subtle, #6b6b6b)",
              marginBottom: 16,
            }}
          >
            Text hierarchy
          </h3>
          <h1
            style={{
              fontSize: "var(--st-type-size-8, 2.25rem)",
              fontWeight: "var(--st-type-weight-bold, 700)" as unknown as number,
              lineHeight: "var(--st-type-leading-tight, 1.25)",
              color: "var(--st-color-fg-surface-base, #1a1a1a)",
              marginBottom: 8,
            }}
          >
            Display heading
          </h1>
          <h2
            style={{
              fontSize: "var(--st-type-size-6, 1.5rem)",
              fontWeight: "var(--st-type-weight-semibold, 600)" as unknown as number,
              color: "var(--st-color-fg-surface-base, #1a1a1a)",
              marginBottom: 8,
            }}
          >
            Section heading
          </h2>
          <p
            style={{
              fontSize: "var(--st-type-size-3, 1rem)",
              lineHeight: "var(--st-type-leading-normal, 1.5)",
              color: "var(--st-color-fg-surface-base, #1a1a1a)",
              marginBottom: 8,
            }}
          >
            Body text using the base foreground token. This paragraph demonstrates normal reading
            flow with the standard line height.
          </p>
          <p
            style={{
              fontSize: "var(--st-type-size-2, 0.875rem)",
              color: "var(--st-color-fg-surface-subtle, #6b6b6b)",
              marginBottom: 4,
            }}
          >
            Secondary text with subtle foreground color.
          </p>
          <p
            style={{
              fontSize: "var(--st-type-size-0, 0.75rem)",
              color: "var(--st-color-fg-surface-muted, #a3a3a3)",
            }}
          >
            Muted caption text for metadata and timestamps.
          </p>
        </div>

        {/* Card component */}
        <div
          style={{
            padding: 24,
            backgroundColor: "var(--st-color-bg-surface-base, #ffffff)",
            border: "1px solid var(--st-color-bd-surface-base, #e5e5e5)",
            borderRadius: 8,
          }}
        >
          <h3
            style={{
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--st-color-fg-surface-subtle, #6b6b6b)",
              marginBottom: 16,
            }}
          >
            Card
          </h3>
          <div
            style={{
              padding: 20,
              backgroundColor: "var(--st-color-bg-surface-subtle, #fafafa)",
              border: "1px solid var(--st-color-bd-surface-base, #e5e5e5)",
              borderRadius: "var(--st-border-radius-3, 0.5rem)",
              boxShadow: "var(--st-elevation-1, 0 1px 2px 0 rgb(0 0 0 / 0.05))",
            }}
          >
            <h4
              style={{
                fontSize: "var(--st-type-size-4, 1.125rem)",
                fontWeight: 600,
                color: "var(--st-color-fg-surface-base, #1a1a1a)",
                marginBottom: 8,
              }}
            >
              Card title
            </h4>
            <p
              style={{
                fontSize: "var(--st-type-size-2, 0.875rem)",
                color: "var(--st-color-fg-surface-subtle, #6b6b6b)",
                lineHeight: 1.5,
                marginBottom: 16,
              }}
            >
              Card description using subtle foreground on a subtle surface background with elevation.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "var(--st-color-bg-interactive-base, #2563eb)",
                  color: "var(--st-color-fg-interactive-on-color, #ffffff)",
                  border: "none",
                  borderRadius: "var(--st-border-radius-2, 0.25rem)",
                  fontSize: "var(--st-type-size-2, 0.875rem)",
                  fontWeight: 500,
                  cursor: "pointer",
                  minHeight: 44,
                }}
              >
                Primary
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  color: "var(--st-color-fg-interactive-base, #2563eb)",
                  border: "1px solid var(--st-color-bd-interactive-base, #2563eb)",
                  borderRadius: "var(--st-border-radius-2, 0.25rem)",
                  fontSize: "var(--st-type-size-2, 0.875rem)",
                  fontWeight: 500,
                  cursor: "pointer",
                  minHeight: 44,
                }}
              >
                Secondary
              </button>
            </div>
          </div>
        </div>

        {/* Form inputs */}
        <div
          style={{
            padding: 24,
            backgroundColor: "var(--st-color-bg-surface-base, #ffffff)",
            border: "1px solid var(--st-color-bd-surface-base, #e5e5e5)",
            borderRadius: 8,
          }}
        >
          <h3
            style={{
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--st-color-fg-surface-subtle, #6b6b6b)",
              marginBottom: 16,
            }}
          >
            Form inputs
          </h3>
          <div style={{ marginBottom: 12 }}>
            <label
              style={{
                display: "block",
                fontSize: "var(--st-type-size-2, 0.875rem)",
                fontWeight: 500,
                color: "var(--st-color-fg-form-base, #1a1a1a)",
                marginBottom: 4,
              }}
            >
              Label
            </label>
            <input
              type="text"
              placeholder="Placeholder text..."
              readOnly
              style={{
                width: "100%",
                padding: "10px 12px",
                backgroundColor: "var(--st-color-bg-form-base, #ffffff)",
                border: "1px solid var(--st-color-bd-form-base, #d4d4d4)",
                borderRadius: "var(--st-border-radius-2, 0.25rem)",
                fontSize: "var(--st-type-size-2, 0.875rem)",
                color: "var(--st-color-fg-form-base, #1a1a1a)",
                minHeight: 44,
              }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              value="Disabled input"
              readOnly
              style={{
                width: "100%",
                padding: "10px 12px",
                backgroundColor: "var(--st-color-bg-form-base-disabled, #f5f5f5)",
                border: "1px solid var(--st-color-bd-form-base-disabled, #e5e5e5)",
                borderRadius: "var(--st-border-radius-2, 0.25rem)",
                fontSize: "var(--st-type-size-2, 0.875rem)",
                color: "var(--st-color-fg-form-base-disabled, #c4c4c4)",
                minHeight: 44,
                opacity: 0.8,
              }}
            />
          </div>
        </div>

        {/* Badges */}
        <div
          style={{
            padding: 24,
            backgroundColor: "var(--st-color-bg-surface-base, #ffffff)",
            border: "1px solid var(--st-color-bd-surface-base, #e5e5e5)",
            borderRadius: 8,
          }}
        >
          <h3
            style={{
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--st-color-fg-surface-subtle, #6b6b6b)",
              marginBottom: 16,
            }}
          >
            Status badges
          </h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {(["info", "success", "warn", "danger"] as const).map((status) => (
              <span
                key={status}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 12px",
                  backgroundColor: `var(--st-color-bg-status-${status}-base)`,
                  color: `var(--st-color-fg-status-${status}-on-color, #ffffff)`,
                  borderRadius: "var(--st-border-radius-full, 9999px)",
                  fontSize: "var(--st-type-size-1, 0.8125rem)",
                  fontWeight: 500,
                  minHeight: 28,
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(["info", "success", "warn", "danger"] as const).map((status) => (
              <span
                key={`subtle-${status}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 12px",
                  backgroundColor: `var(--st-color-bg-status-${status}-subtle)`,
                  color: `var(--st-color-fg-status-${status}-base)`,
                  border: `1px solid var(--st-color-bd-status-${status}-subtle)`,
                  borderRadius: "var(--st-border-radius-full, 9999px)",
                  fontSize: "var(--st-type-size-1, 0.8125rem)",
                  fontWeight: 500,
                  minHeight: 28,
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div
          style={{
            padding: 24,
            backgroundColor: "var(--st-color-bg-surface-base, #ffffff)",
            border: "1px solid var(--st-color-bd-surface-base, #e5e5e5)",
            borderRadius: 8,
          }}
        >
          <h3
            style={{
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--st-color-fg-surface-subtle, #6b6b6b)",
              marginBottom: 16,
            }}
          >
            Alert banners
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(["info", "success", "warn", "danger"] as const).map((status) => (
              <div
                key={status}
                style={{
                  padding: "12px 16px",
                  backgroundColor: `var(--st-color-bg-status-${status}-subtle)`,
                  borderLeft: `3px solid var(--st-color-bd-status-${status}-base)`,
                  borderRadius: "var(--st-border-radius-2, 0.25rem)",
                }}
              >
                <div
                  style={{
                    fontSize: "var(--st-type-size-2, 0.875rem)",
                    fontWeight: 600,
                    color: `var(--st-color-fg-status-${status}-base)`,
                    marginBottom: 2,
                  }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
                <div
                  style={{
                    fontSize: "var(--st-type-size-1, 0.8125rem)",
                    color: `var(--st-color-fg-status-${status}-base)`,
                    opacity: 0.85,
                  }}
                >
                  This is a {status} alert using semantic status tokens.
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Button variants */}
        <div
          style={{
            padding: 24,
            backgroundColor: "var(--st-color-bg-surface-base, #ffffff)",
            border: "1px solid var(--st-color-bd-surface-base, #e5e5e5)",
            borderRadius: 8,
          }}
        >
          <h3
            style={{
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--st-color-fg-surface-subtle, #6b6b6b)",
              marginBottom: 16,
            }}
          >
            Buttons
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "var(--st-color-bg-interactive-base, #2563eb)",
                  color: "var(--st-color-fg-interactive-on-color, #ffffff)",
                  border: "none",
                  borderRadius: "var(--st-border-radius-2, 0.25rem)",
                  fontSize: "var(--st-type-size-2, 0.875rem)",
                  fontWeight: 500,
                  cursor: "pointer",
                  minHeight: 44,
                }}
              >
                Primary
              </button>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "var(--st-color-bg-interactive-subtle, #eff6ff)",
                  color: "var(--st-color-fg-interactive-base, #2563eb)",
                  border: "none",
                  borderRadius: "var(--st-border-radius-2, 0.25rem)",
                  fontSize: "var(--st-type-size-2, 0.875rem)",
                  fontWeight: 500,
                  cursor: "pointer",
                  minHeight: 44,
                }}
              >
                Ghost
              </button>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "transparent",
                  color: "var(--st-color-fg-interactive-base, #2563eb)",
                  border: "1px solid var(--st-color-bd-interactive-base, #2563eb)",
                  borderRadius: "var(--st-border-radius-2, 0.25rem)",
                  fontSize: "var(--st-type-size-2, 0.875rem)",
                  fontWeight: 500,
                  cursor: "pointer",
                  minHeight: 44,
                }}
              >
                Outline
              </button>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "var(--st-color-bg-interactive-base-disabled, #93c5fd)",
                  color: "var(--st-color-fg-interactive-on-color, #ffffff)",
                  border: "none",
                  borderRadius: "var(--st-border-radius-2, 0.25rem)",
                  fontSize: "var(--st-type-size-2, 0.875rem)",
                  fontWeight: 500,
                  cursor: "not-allowed",
                  minHeight: 44,
                  opacity: 0.6,
                }}
              >
                Disabled
              </button>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "var(--st-color-bg-status-danger-base, #dc2626)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "var(--st-border-radius-2, 0.25rem)",
                  fontSize: "var(--st-type-size-2, 0.875rem)",
                  fontWeight: 500,
                  cursor: "pointer",
                  minHeight: 44,
                }}
              >
                Danger
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
