import { useMemo } from "react";
import { Stack, Text, Inline, Card, Box } from "@staple-css/primitives";

export interface PreviewColors {
  background: string;
  surface: string;
  surfaceRaised: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryHover: string;
  primaryText: string;
  danger: string;
  dangerSurface: string;
  success: string;
  successSurface: string;
  warn: string;
  warnSurface: string;
}

export type PreviewSize = "mobile" | "tablet" | "desktop";

interface LivePreviewProps {
  colors: PreviewColors;
  theme?: "light" | "dark";
  size?: PreviewSize;
}

// Size widths for preview (matching breakpoints)
const sizeWidths: Record<PreviewSize, string> = {
  mobile: "375px",
  tablet: "768px",
  desktop: "100%",
};

export function LivePreview({ colors, theme = "light", size = "desktop" }: LivePreviewProps) {
  // Generate inline styles that override CSS variables
  const previewStyle = useMemo(() => ({
    "--preview-background": colors.background,
    "--preview-surface": colors.surface,
    "--preview-surface-raised": colors.surfaceRaised,
    "--preview-text": colors.text,
    "--preview-text-muted": colors.textMuted,
    "--preview-border": colors.border,
    "--preview-primary": colors.primary,
    "--preview-primary-hover": colors.primaryHover,
    "--preview-primary-text": colors.primaryText,
    "--preview-danger": colors.danger,
    "--preview-danger-surface": colors.dangerSurface,
    "--preview-success": colors.success,
    "--preview-success-surface": colors.successSurface,
    "--preview-warn": colors.warn,
    "--preview-warn-surface": colors.warnSurface,
  } as React.CSSProperties), [colors]);

  // Container style with size width
  const containerStyle = useMemo(() => ({
    ...previewStyle,
    width: sizeWidths[size],
    maxWidth: "100%",
    margin: size !== "desktop" ? "0 auto" : undefined,
  } as React.CSSProperties), [previewStyle, size]);

  return (
    <div className={`live-preview-container live-preview-container--${size}`} style={containerStyle}>
      <div className="live-preview-frame">
        {/* Header */}
        <header className="live-preview-header">
          <div className="live-preview-header-content">
            <span className="live-preview-logo">AppName</span>
            <nav className="live-preview-nav">
              <a href="#" className="live-preview-nav-link live-preview-nav-link--active">Dashboard</a>
              <a href="#" className="live-preview-nav-link">Projects</a>
              <a href="#" className="live-preview-nav-link">Settings</a>
            </nav>
            <button className="live-preview-btn live-preview-btn--primary">
              New Project
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="live-preview-main">
          {/* Stats Cards */}
          <div className="live-preview-stats">
            <div className="live-preview-stat-card">
              <span className="live-preview-stat-label">Total Revenue</span>
              <span className="live-preview-stat-value">$45,231</span>
              <span className="live-preview-stat-badge live-preview-stat-badge--success">+12.5%</span>
            </div>
            <div className="live-preview-stat-card">
              <span className="live-preview-stat-label">Active Users</span>
              <span className="live-preview-stat-value">2,345</span>
              <span className="live-preview-stat-badge live-preview-stat-badge--success">+8.2%</span>
            </div>
            <div className="live-preview-stat-card">
              <span className="live-preview-stat-label">Pending Tasks</span>
              <span className="live-preview-stat-value">18</span>
              <span className="live-preview-stat-badge live-preview-stat-badge--warn">+3</span>
            </div>
            <div className="live-preview-stat-card">
              <span className="live-preview-stat-label">Issues</span>
              <span className="live-preview-stat-value">4</span>
              <span className="live-preview-stat-badge live-preview-stat-badge--danger">Urgent</span>
            </div>
          </div>

          {/* Content Area */}
          <div className="live-preview-content">
            {/* Main Card */}
            <div className="live-preview-card live-preview-card--main">
              <div className="live-preview-card-header">
                <h3 className="live-preview-card-title">Recent Activity</h3>
                <button className="live-preview-btn live-preview-btn--ghost">View All</button>
              </div>
              <div className="live-preview-list">
                <div className="live-preview-list-item">
                  <div className="live-preview-avatar" style={{ backgroundColor: colors.primary }}></div>
                  <div className="live-preview-list-content">
                    <span className="live-preview-list-title">New user registered</span>
                    <span className="live-preview-list-meta">2 minutes ago</span>
                  </div>
                </div>
                <div className="live-preview-list-item">
                  <div className="live-preview-avatar" style={{ backgroundColor: colors.success }}></div>
                  <div className="live-preview-list-content">
                    <span className="live-preview-list-title">Payment received</span>
                    <span className="live-preview-list-meta">15 minutes ago</span>
                  </div>
                </div>
                <div className="live-preview-list-item">
                  <div className="live-preview-avatar" style={{ backgroundColor: colors.warn }}></div>
                  <div className="live-preview-list-content">
                    <span className="live-preview-list-title">Server warning</span>
                    <span className="live-preview-list-meta">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="live-preview-sidebar">
              <div className="live-preview-card">
                <h4 className="live-preview-card-title">Quick Actions</h4>
                <div className="live-preview-actions">
                  <button className="live-preview-btn live-preview-btn--primary live-preview-btn--full">
                    Create Report
                  </button>
                  <button className="live-preview-btn live-preview-btn--outline live-preview-btn--full">
                    Export Data
                  </button>
                  <button className="live-preview-btn live-preview-btn--ghost live-preview-btn--full">
                    View Docs
                  </button>
                </div>
              </div>

              {/* Alert */}
              <div className="live-preview-alert live-preview-alert--warn">
                <strong>Heads up!</strong> Your trial ends in 3 days.
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="live-preview-footer">
          <span>© 2024 AppName. All rights reserved.</span>
        </footer>
      </div>
    </div>
  );
}
