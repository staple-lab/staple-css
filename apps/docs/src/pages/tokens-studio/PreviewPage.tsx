/**
 * Preview Page
 *
 * Live preview of the current token configuration.
 * Shows how the tokens look in a realistic UI scenario.
 */

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Container, Stack, Text, Inline, Card } from "@staple-css/primitives";
import {
  createDefaultBuilderConfig,
  generateBuilderCss,
  resolveSemanticColors,
  applyPaletteOverrides,
  applySemanticOverrides,
} from "@staple-css/tokens";
import { CodePreview } from "../../components/CodePreview";

type PreviewMode = "light" | "dark";

export function PreviewPage() {
  const [mode, setMode] = useState<PreviewMode>("light");
  const [showCss, setShowCss] = useState(false);

  // Get the default config (in a real app, this would come from context or store)
  const config = useMemo(() => createDefaultBuilderConfig(), []);

  // Generate CSS
  const generatedCss = useMemo(() => generateBuilderCss(config), [config]);

  // Resolve colors for preview
  const resolvedColors = useMemo(() => {
    const palettes = applyPaletteOverrides(config.palettes, config.overrides);
    const lightColors = applySemanticOverrides(
      resolveSemanticColors(config.semanticMap.light, palettes, "light"),
      config.overrides,
      palettes,
      "light"
    );
    const darkColors = applySemanticOverrides(
      resolveSemanticColors(config.semanticMap.dark, palettes, "dark"),
      config.overrides,
      palettes,
      "dark"
    );
    return { light: lightColors, dark: darkColors };
  }, [config]);

  const colors = resolvedColors[mode];

  return (
    <Container size="xl">
      <Stack gap={6}>
        {/* Header */}
        <Stack gap={2}>
          <Text as="h1" size={5} weight="bold">
            Token Preview
          </Text>
          <Text tone="muted">
            See how your token configuration looks in a realistic UI.
          </Text>
        </Stack>

        {/* Page Navigation */}
        <Card pad={3} radius={2}>
          <Inline gap={2} align="center" justify="between" wrap>
            <Inline gap={2}>
              <Link to="/tokens-studio" className="studio-btn">
                ← Builder
              </Link>
              <span className="studio-btn studio-btn--primary">Preview</span>
              <Link to="/tokens-studio/config" className="studio-btn">
                Config
              </Link>
              <Link to="/tokens-studio/prompts" className="studio-btn">
                Prompts
              </Link>
            </Inline>
          </Inline>
        </Card>

        {/* Controls */}
        <Card pad={4} radius={2}>
          <Inline gap={4} align="center" justify="between">
            <Inline gap={2}>
              <button
                onClick={() => setMode("light")}
                className={`studio-btn ${mode === "light" ? "studio-btn--primary" : ""}`}
              >
                Light Mode
              </button>
              <button
                onClick={() => setMode("dark")}
                className={`studio-btn ${mode === "dark" ? "studio-btn--primary" : ""}`}
              >
                Dark Mode
              </button>
            </Inline>
            <button
              onClick={() => setShowCss(!showCss)}
              className="studio-btn"
            >
              {showCss ? "Hide CSS" : "Show CSS"}
            </button>
          </Inline>
        </Card>

        {/* Preview Area */}
        <div
          className="preview-frame"
          style={{
            backgroundColor: colors.background,
            color: colors.text,
            borderRadius: "var(--st-radius-3)",
            border: `1px solid ${colors.border}`,
            overflow: "hidden",
          }}
        >
          {/* Preview Header */}
          <div
            className="preview-header"
            style={{
              backgroundColor: colors.surface,
              borderBottom: `1px solid ${colors.border}`,
              padding: "var(--st-space-3) var(--st-space-4)",
            }}
          >
            <Inline gap={6} align="center">
              <span style={{ fontWeight: 700, color: colors.text }}>
                AppName
              </span>
              <Inline gap={4}>
                <span style={{ color: colors.primary }}>Dashboard</span>
                <span style={{ color: colors.textMuted }}>Settings</span>
                <span style={{ color: colors.textMuted }}>Profile</span>
              </Inline>
            </Inline>
          </div>

          {/* Preview Body */}
          <div
            className="preview-body"
            style={{
              padding: "var(--st-space-5)",
              minHeight: "400px",
            }}
          >
            <Stack gap={5}>
              {/* Stats Row */}
              <div className="preview-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--st-space-3)" }}>
                <StatCard
                  label="Total Revenue"
                  value="$45,231"
                  change="+20.1%"
                  changeType="success"
                  colors={colors}
                />
                <StatCard
                  label="Subscriptions"
                  value="+2,350"
                  change="+180.1%"
                  changeType="success"
                  colors={colors}
                />
                <StatCard
                  label="Sales"
                  value="+12,234"
                  change="+19%"
                  changeType="success"
                  colors={colors}
                />
                <StatCard
                  label="Active Now"
                  value="+573"
                  change="-4%"
                  changeType="danger"
                  colors={colors}
                />
              </div>

              {/* Content Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--st-space-4)" }}>
                {/* Main Content */}
                <div
                  style={{
                    backgroundColor: colors.surfaceRaised,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "var(--st-radius-2)",
                    padding: "var(--st-space-4)",
                  }}
                >
                  <Stack gap={4}>
                    <Inline gap={2} justify="between" align="center">
                      <span style={{ fontWeight: 600, color: colors.text }}>Recent Activity</span>
                      <button
                        style={{
                          backgroundColor: colors.primary,
                          color: colors.primaryText,
                          border: "none",
                          borderRadius: "var(--st-radius-2)",
                          padding: "var(--st-space-1) var(--st-space-3)",
                          fontSize: "var(--st-font-size-0)",
                          cursor: "pointer",
                        }}
                      >
                        View All
                      </button>
                    </Inline>

                    <Stack gap={3}>
                      <ActivityItem
                        title="New user registered"
                        time="2 minutes ago"
                        colors={colors}
                      />
                      <ActivityItem
                        title="Payment received"
                        time="15 minutes ago"
                        colors={colors}
                      />
                      <ActivityItem
                        title="Server alert resolved"
                        time="1 hour ago"
                        colors={colors}
                      />
                    </Stack>
                  </Stack>
                </div>

                {/* Sidebar */}
                <Stack gap={3}>
                  {/* Alert Card */}
                  <div
                    style={{
                      backgroundColor: colors.warnSurface,
                      border: `1px solid ${colors.warn}`,
                      borderRadius: "var(--st-radius-2)",
                      padding: "var(--st-space-3)",
                    }}
                  >
                    <Stack gap={2}>
                      <span style={{ fontWeight: 600, color: colors.warn }}>
                        Action Required
                      </span>
                      <span style={{ fontSize: "var(--st-font-size-0)", color: colors.warnText }}>
                        Please verify your email address to continue.
                      </span>
                    </Stack>
                  </div>

                  {/* Quick Actions */}
                  <div
                    style={{
                      backgroundColor: colors.surfaceRaised,
                      border: `1px solid ${colors.border}`,
                      borderRadius: "var(--st-radius-2)",
                      padding: "var(--st-space-3)",
                    }}
                  >
                    <Stack gap={3}>
                      <span style={{ fontWeight: 600, color: colors.text }}>
                        Quick Actions
                      </span>
                      <Stack gap={2}>
                        <ActionButton
                          label="Create New"
                          variant="primary"
                          colors={colors}
                        />
                        <ActionButton
                          label="Import Data"
                          variant="outline"
                          colors={colors}
                        />
                        <ActionButton
                          label="Export Report"
                          variant="ghost"
                          colors={colors}
                        />
                      </Stack>
                    </Stack>
                  </div>
                </Stack>
              </div>

              {/* Status Badges */}
              <Inline gap={3}>
                <span
                  style={{
                    backgroundColor: colors.successSurface,
                    color: colors.success,
                    padding: "var(--st-space-1) var(--st-space-2)",
                    borderRadius: "var(--st-radius-1)",
                    fontSize: "var(--st-font-size-0)",
                    fontWeight: 600,
                  }}
                >
                  Success
                </span>
                <span
                  style={{
                    backgroundColor: colors.warnSurface,
                    color: colors.warn,
                    padding: "var(--st-space-1) var(--st-space-2)",
                    borderRadius: "var(--st-radius-1)",
                    fontSize: "var(--st-font-size-0)",
                    fontWeight: 600,
                  }}
                >
                  Warning
                </span>
                <span
                  style={{
                    backgroundColor: colors.dangerSurface,
                    color: colors.danger,
                    padding: "var(--st-space-1) var(--st-space-2)",
                    borderRadius: "var(--st-radius-1)",
                    fontSize: "var(--st-font-size-0)",
                    fontWeight: 600,
                  }}
                >
                  Danger
                </span>
                <span
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.primaryText,
                    padding: "var(--st-space-1) var(--st-space-2)",
                    borderRadius: "var(--st-radius-1)",
                    fontSize: "var(--st-font-size-0)",
                    fontWeight: 600,
                  }}
                >
                  Primary
                </span>
              </Inline>
            </Stack>
          </div>
        </div>

        {/* CSS Output */}
        {showCss && (
          <Card pad={4} radius={2}>
            <Stack gap={4}>
              <Text weight="semibold">Generated CSS</Text>
              <CodePreview
                code={generatedCss.all}
                language="css"
                title="all.css"
                collapsible
                defaultCollapsed={false}
              />
            </Stack>
          </Card>
        )}
      </Stack>
    </Container>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  changeType: "success" | "danger";
  colors: Record<string, string>;
}

function StatCard({ label, value, change, changeType, colors }: StatCardProps) {
  const changeColor = changeType === "success" ? colors.success : colors.danger;

  return (
    <div
      style={{
        backgroundColor: colors.surfaceRaised,
        border: `1px solid ${colors.border}`,
        borderRadius: "var(--st-radius-2)",
        padding: "var(--st-space-3)",
      }}
    >
      <Stack gap={1}>
        <span style={{ fontSize: "var(--st-font-size-0)", color: colors.textMuted }}>{label}</span>
        <span style={{ fontSize: "var(--st-font-size-4)", fontWeight: 700, color: colors.text }}>{value}</span>
        <span style={{ fontSize: "var(--st-font-size-0)", color: changeColor }}>{change}</span>
      </Stack>
    </div>
  );
}

interface ActivityItemProps {
  title: string;
  time: string;
  colors: Record<string, string>;
}

function ActivityItem({ title, time, colors }: ActivityItemProps) {
  return (
    <div
      style={{
        backgroundColor: colors.surface,
        borderRadius: "var(--st-radius-1)",
        padding: "var(--st-space-2) var(--st-space-3)",
      }}
    >
      <Inline gap={3} align="center" justify="between">
        <span style={{ fontSize: "var(--st-font-size-1)", color: colors.text }}>{title}</span>
        <span style={{ fontSize: "var(--st-font-size-0)", color: colors.textMuted }}>{time}</span>
      </Inline>
    </div>
  );
}

interface ActionButtonProps {
  label: string;
  variant: "primary" | "outline" | "ghost";
  colors: Record<string, string>;
}

function ActionButton({ label, variant, colors }: ActionButtonProps) {
  const styles = {
    primary: {
      backgroundColor: colors.primary,
      color: colors.primaryText,
      border: `1px solid ${colors.primary}`,
    },
    outline: {
      backgroundColor: "transparent",
      color: colors.text,
      border: `1px solid ${colors.border}`,
    },
    ghost: {
      backgroundColor: "transparent",
      color: colors.textMuted,
      border: "1px solid transparent",
    },
  };

  return (
    <button
      style={{
        ...styles[variant],
        borderRadius: "var(--st-radius-2)",
        padding: "var(--st-space-2) var(--st-space-3)",
        fontSize: "var(--st-font-size-0)",
        cursor: "pointer",
        width: "100%",
        textAlign: "center",
      }}
    >
      {label}
    </button>
  );
}
