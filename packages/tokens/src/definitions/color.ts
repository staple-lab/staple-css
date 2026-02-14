// ---------------------------------------------------------------------------
// Semantic color token definitions
// ~120 tokens covering backgrounds, foregrounds, borders, icons, and rings
// Each token provides light and dark mode hex values
//
// Naming: st-color-{property}-{role}-{prominence}-{state}
// ---------------------------------------------------------------------------

import type { ColorToken } from '../types.js';

// ---------------------------------------------------------------------------
// BACKGROUNDS (bg)
// ---------------------------------------------------------------------------

const bgSurface: ColorToken[] = [
  {
    name: 'st-color-bg-surface-base',
    light: '#ffffff',
    dark: '#0a0a0a',
    description: 'Default page/card background',
  },
  {
    name: 'st-color-bg-surface-subtle',
    light: '#fafafa',
    dark: '#111111',
    description: 'Slightly tinted surface for visual layering',
  },
  {
    name: 'st-color-bg-surface-muted',
    light: '#f5f5f5',
    dark: '#1a1a1a',
    description: 'Recessed or secondary surface background',
  },
  {
    name: 'st-color-bg-surface-strong',
    light: '#e5e5e5',
    dark: '#262626',
    description: 'Emphasised surface background (e.g. table header)',
  },
  {
    name: 'st-color-bg-surface-base-hover',
    light: '#fafafa',
    dark: '#111111',
    description: 'Default surface background on hover',
  },
  {
    name: 'st-color-bg-surface-overlay',
    light: '#00000066',
    dark: '#000000b3',
    description: 'Semi-transparent overlay for modals and drawers',
  },
];

const bgInteractive: ColorToken[] = [
  // base + states
  {
    name: 'st-color-bg-interactive-base',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Primary interactive background (buttons, links)',
  },
  {
    name: 'st-color-bg-interactive-base-hover',
    light: '#1d4ed8',
    dark: '#60a5fa',
    description: 'Primary interactive background on hover',
  },
  {
    name: 'st-color-bg-interactive-base-pressed',
    light: '#1e40af',
    dark: '#93bbfd',
    description: 'Primary interactive background when pressed',
  },
  {
    name: 'st-color-bg-interactive-base-disabled',
    light: '#93c5fd',
    dark: '#1e3a5f',
    description: 'Primary interactive background when disabled',
  },
  // subtle + hover
  {
    name: 'st-color-bg-interactive-subtle',
    light: '#eff6ff',
    dark: '#0f1a2e',
    description: 'Low-emphasis interactive background (ghost button)',
  },
  {
    name: 'st-color-bg-interactive-subtle-hover',
    light: '#dbeafe',
    dark: '#172554',
    description: 'Low-emphasis interactive background on hover',
  },
  // muted + hover
  {
    name: 'st-color-bg-interactive-muted',
    light: '#dbeafe',
    dark: '#172554',
    description: 'Mid-emphasis interactive background',
  },
  {
    name: 'st-color-bg-interactive-muted-hover',
    light: '#bfdbfe',
    dark: '#1e3a5f',
    description: 'Mid-emphasis interactive background on hover',
  },
  // strong + hover
  {
    name: 'st-color-bg-interactive-strong',
    light: '#1d4ed8',
    dark: '#60a5fa',
    description: 'High-emphasis interactive background',
  },
  {
    name: 'st-color-bg-interactive-strong-hover',
    light: '#1e40af',
    dark: '#93bbfd',
    description: 'High-emphasis interactive background on hover',
  },
];

const bgForm: ColorToken[] = [
  {
    name: 'st-color-bg-form-base',
    light: '#ffffff',
    dark: '#1a1a1a',
    description: 'Default form input background',
  },
  {
    name: 'st-color-bg-form-base-hover',
    light: '#fafafa',
    dark: '#222222',
    description: 'Form input background on hover',
  },
  {
    name: 'st-color-bg-form-base-focus',
    light: '#ffffff',
    dark: '#1a1a1a',
    description: 'Form input background when focused',
  },
  {
    name: 'st-color-bg-form-base-disabled',
    light: '#f5f5f5',
    dark: '#141414',
    description: 'Form input background when disabled',
  },
];

const bgFeature: ColorToken[] = [
  {
    name: 'st-color-bg-feature-base',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Brand/feature highlight background',
  },
  {
    name: 'st-color-bg-feature-base-hover',
    light: '#1d4ed8',
    dark: '#60a5fa',
    description: 'Brand/feature highlight background on hover',
  },
  {
    name: 'st-color-bg-feature-subtle',
    light: '#eff6ff',
    dark: '#0f1a2e',
    description: 'Soft brand tint background',
  },
  {
    name: 'st-color-bg-feature-muted',
    light: '#dbeafe',
    dark: '#172554',
    description: 'Mid-emphasis brand background',
  },
  {
    name: 'st-color-bg-feature-strong',
    light: '#1d4ed8',
    dark: '#60a5fa',
    description: 'Bold brand background',
  },
];

const bgUi: ColorToken[] = [
  {
    name: 'st-color-bg-ui-base',
    light: '#f5f5f5',
    dark: '#1a1a1a',
    description: 'Neutral UI element background (toolbar, sidebar)',
  },
  {
    name: 'st-color-bg-ui-base-hover',
    light: '#ebebeb',
    dark: '#222222',
    description: 'Neutral UI element background on hover',
  },
  {
    name: 'st-color-bg-ui-subtle',
    light: '#fafafa',
    dark: '#111111',
    description: 'Subtle UI background (secondary toolbar)',
  },
  {
    name: 'st-color-bg-ui-subtle-hover',
    light: '#f5f5f5',
    dark: '#1a1a1a',
    description: 'Subtle UI background on hover',
  },
  {
    name: 'st-color-bg-ui-strong',
    light: '#e5e5e5',
    dark: '#262626',
    description: 'Strong UI background (selected tab, active item)',
  },
  {
    name: 'st-color-bg-ui-strong-hover',
    light: '#d4d4d4',
    dark: '#333333',
    description: 'Strong UI background on hover',
  },
];

const bgStatusInfo: ColorToken[] = [
  {
    name: 'st-color-bg-status-info-base',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Info status background (solid)',
  },
  {
    name: 'st-color-bg-status-info-subtle',
    light: '#eff6ff',
    dark: '#0f1a2e',
    description: 'Info status background (subtle/banner)',
  },
  {
    name: 'st-color-bg-status-info-strong',
    light: '#1d4ed8',
    dark: '#60a5fa',
    description: 'Info status background (emphasised)',
  },
];

const bgStatusSuccess: ColorToken[] = [
  {
    name: 'st-color-bg-status-success-base',
    light: '#16a34a',
    dark: '#22c55e',
    description: 'Success status background (solid)',
  },
  {
    name: 'st-color-bg-status-success-subtle',
    light: '#f0fdf4',
    dark: '#052e16',
    description: 'Success status background (subtle/banner)',
  },
  {
    name: 'st-color-bg-status-success-strong',
    light: '#15803d',
    dark: '#4ade80',
    description: 'Success status background (emphasised)',
  },
];

const bgStatusWarn: ColorToken[] = [
  {
    name: 'st-color-bg-status-warn-base',
    light: '#d97706',
    dark: '#f59e0b',
    description: 'Warning status background (solid)',
  },
  {
    name: 'st-color-bg-status-warn-subtle',
    light: '#fffbeb',
    dark: '#2a1a00',
    description: 'Warning status background (subtle/banner)',
  },
  {
    name: 'st-color-bg-status-warn-strong',
    light: '#b45309',
    dark: '#fbbf24',
    description: 'Warning status background (emphasised)',
  },
];

const bgStatusDanger: ColorToken[] = [
  {
    name: 'st-color-bg-status-danger-base',
    light: '#dc2626',
    dark: '#ef4444',
    description: 'Danger status background (solid)',
  },
  {
    name: 'st-color-bg-status-danger-subtle',
    light: '#fef2f2',
    dark: '#2a0a0a',
    description: 'Danger status background (subtle/banner)',
  },
  {
    name: 'st-color-bg-status-danger-strong',
    light: '#b91c1c',
    dark: '#f87171',
    description: 'Danger status background (emphasised)',
  },
];

// ---------------------------------------------------------------------------
// FOREGROUNDS (fg)
// ---------------------------------------------------------------------------

const fgSurface: ColorToken[] = [
  {
    name: 'st-color-fg-surface-base',
    light: '#1a1a1a',
    dark: '#e5e5e5',
    description: 'Default body text colour',
  },
  {
    name: 'st-color-fg-surface-subtle',
    light: '#6b6b6b',
    dark: '#8b8b8b',
    description: 'Secondary text (captions, labels)',
  },
  {
    name: 'st-color-fg-surface-muted',
    light: '#a3a3a3',
    dark: '#525252',
    description: 'Placeholder / disabled text on surface',
  },
  {
    name: 'st-color-fg-surface-on-color',
    light: '#ffffff',
    dark: '#0a0a0a',
    description: 'Text that sits on a coloured/dark surface',
  },
];

const fgInteractive: ColorToken[] = [
  {
    name: 'st-color-fg-interactive-base',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Interactive text (links, text buttons)',
  },
  {
    name: 'st-color-fg-interactive-base-hover',
    light: '#1d4ed8',
    dark: '#60a5fa',
    description: 'Interactive text on hover',
  },
  {
    name: 'st-color-fg-interactive-base-pressed',
    light: '#1e40af',
    dark: '#93bbfd',
    description: 'Interactive text when pressed',
  },
  {
    name: 'st-color-fg-interactive-base-disabled',
    light: '#93c5fd',
    dark: '#1e3a5f',
    description: 'Interactive text when disabled',
  },
  {
    name: 'st-color-fg-interactive-subtle',
    light: '#3b82f6',
    dark: '#60a5fa',
    description: 'Low-emphasis interactive text',
  },
  {
    name: 'st-color-fg-interactive-on-color',
    light: '#ffffff',
    dark: '#0a0a0a',
    description: 'Text on a filled interactive surface',
  },
];

const fgForm: ColorToken[] = [
  {
    name: 'st-color-fg-form-base',
    light: '#1a1a1a',
    dark: '#e5e5e5',
    description: 'Form input text colour',
  },
  {
    name: 'st-color-fg-form-subtle',
    light: '#a3a3a3',
    dark: '#525252',
    description: 'Form placeholder text',
  },
  {
    name: 'st-color-fg-form-base-disabled',
    light: '#c4c4c4',
    dark: '#404040',
    description: 'Form text when disabled',
  },
];

const fgFeature: ColorToken[] = [
  {
    name: 'st-color-fg-feature-base',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Brand/feature text colour',
  },
  {
    name: 'st-color-fg-feature-subtle',
    light: '#3b82f6',
    dark: '#60a5fa',
    description: 'Low-emphasis brand text colour',
  },
  {
    name: 'st-color-fg-feature-on-color',
    light: '#ffffff',
    dark: '#0a0a0a',
    description: 'Text on a solid brand/feature background',
  },
];

const fgUi: ColorToken[] = [
  {
    name: 'st-color-fg-ui-base',
    light: '#1a1a1a',
    dark: '#e5e5e5',
    description: 'Neutral UI text colour',
  },
  {
    name: 'st-color-fg-ui-subtle',
    light: '#6b6b6b',
    dark: '#8b8b8b',
    description: 'Secondary neutral UI text colour',
  },
  {
    name: 'st-color-fg-ui-muted',
    light: '#a3a3a3',
    dark: '#525252',
    description: 'Low-emphasis UI text (disabled menu items)',
  },
  {
    name: 'st-color-fg-ui-on-color',
    light: '#ffffff',
    dark: '#0a0a0a',
    description: 'Text on a strong UI background',
  },
];

const fgStatusInfo: ColorToken[] = [
  {
    name: 'st-color-fg-status-info-base',
    light: '#1d4ed8',
    dark: '#60a5fa',
    description: 'Info status text colour',
  },
  {
    name: 'st-color-fg-status-info-subtle',
    light: '#3b82f6',
    dark: '#93bbfd',
    description: 'Low-emphasis info text colour',
  },
  {
    name: 'st-color-fg-status-info-on-color',
    light: '#ffffff',
    dark: '#0a0a0a',
    description: 'Text on solid info background',
  },
];

const fgStatusSuccess: ColorToken[] = [
  {
    name: 'st-color-fg-status-success-base',
    light: '#15803d',
    dark: '#4ade80',
    description: 'Success status text colour',
  },
  {
    name: 'st-color-fg-status-success-subtle',
    light: '#22c55e',
    dark: '#86efac',
    description: 'Low-emphasis success text colour',
  },
  {
    name: 'st-color-fg-status-success-on-color',
    light: '#ffffff',
    dark: '#052e16',
    description: 'Text on solid success background',
  },
];

const fgStatusWarn: ColorToken[] = [
  {
    name: 'st-color-fg-status-warn-base',
    light: '#b45309',
    dark: '#fbbf24',
    description: 'Warning status text colour',
  },
  {
    name: 'st-color-fg-status-warn-subtle',
    light: '#d97706',
    dark: '#fcd34d',
    description: 'Low-emphasis warning text colour',
  },
  {
    name: 'st-color-fg-status-warn-on-color',
    light: '#ffffff',
    dark: '#2a1a00',
    description: 'Text on solid warning background',
  },
];

const fgStatusDanger: ColorToken[] = [
  {
    name: 'st-color-fg-status-danger-base',
    light: '#b91c1c',
    dark: '#f87171',
    description: 'Danger status text colour',
  },
  {
    name: 'st-color-fg-status-danger-subtle',
    light: '#dc2626',
    dark: '#fca5a5',
    description: 'Low-emphasis danger text colour',
  },
  {
    name: 'st-color-fg-status-danger-on-color',
    light: '#ffffff',
    dark: '#2a0a0a',
    description: 'Text on solid danger background',
  },
];

// ---------------------------------------------------------------------------
// BORDERS (bd)
// ---------------------------------------------------------------------------

const bdSurface: ColorToken[] = [
  {
    name: 'st-color-bd-surface-base',
    light: '#e5e5e5',
    dark: '#262626',
    description: 'Default border for cards and dividers',
  },
  {
    name: 'st-color-bd-surface-subtle',
    light: '#f0f0f0',
    dark: '#1a1a1a',
    description: 'Subtle border for low-contrast separation',
  },
  {
    name: 'st-color-bd-surface-strong',
    light: '#d4d4d4',
    dark: '#404040',
    description: 'Emphasised border for clear delineation',
  },
];

const bdInteractive: ColorToken[] = [
  {
    name: 'st-color-bd-interactive-base',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Interactive element border (outline button)',
  },
  {
    name: 'st-color-bd-interactive-base-hover',
    light: '#1d4ed8',
    dark: '#60a5fa',
    description: 'Interactive border on hover',
  },
  {
    name: 'st-color-bd-interactive-base-focus',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Interactive border when focused',
  },
  {
    name: 'st-color-bd-interactive-base-disabled',
    light: '#bfdbfe',
    dark: '#1e3a5f',
    description: 'Interactive border when disabled',
  },
];

const bdForm: ColorToken[] = [
  {
    name: 'st-color-bd-form-base',
    light: '#d4d4d4',
    dark: '#404040',
    description: 'Default form input border',
  },
  {
    name: 'st-color-bd-form-base-hover',
    light: '#a3a3a3',
    dark: '#525252',
    description: 'Form input border on hover',
  },
  {
    name: 'st-color-bd-form-base-focus',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Form input border when focused',
  },
  {
    name: 'st-color-bd-form-base-disabled',
    light: '#e5e5e5',
    dark: '#262626',
    description: 'Form input border when disabled',
  },
];

const bdFeature: ColorToken[] = [
  {
    name: 'st-color-bd-feature-base',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Brand/feature border',
  },
  {
    name: 'st-color-bd-feature-subtle',
    light: '#bfdbfe',
    dark: '#1e3a5f',
    description: 'Soft brand border',
  },
  {
    name: 'st-color-bd-feature-strong',
    light: '#1d4ed8',
    dark: '#60a5fa',
    description: 'Bold brand border',
  },
];

const bdUi: ColorToken[] = [
  {
    name: 'st-color-bd-ui-base',
    light: '#e5e5e5',
    dark: '#262626',
    description: 'Neutral UI element border',
  },
  {
    name: 'st-color-bd-ui-subtle',
    light: '#f0f0f0',
    dark: '#1a1a1a',
    description: 'Subtle UI border',
  },
];

const bdStatusInfo: ColorToken[] = [
  {
    name: 'st-color-bd-status-info-base',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Info status border',
  },
  {
    name: 'st-color-bd-status-info-subtle',
    light: '#bfdbfe',
    dark: '#1e3a5f',
    description: 'Subtle info status border (banner edge)',
  },
];

const bdStatusSuccess: ColorToken[] = [
  {
    name: 'st-color-bd-status-success-base',
    light: '#16a34a',
    dark: '#22c55e',
    description: 'Success status border',
  },
  {
    name: 'st-color-bd-status-success-subtle',
    light: '#bbf7d0',
    dark: '#14532d',
    description: 'Subtle success status border (banner edge)',
  },
];

const bdStatusWarn: ColorToken[] = [
  {
    name: 'st-color-bd-status-warn-base',
    light: '#d97706',
    dark: '#f59e0b',
    description: 'Warning status border',
  },
  {
    name: 'st-color-bd-status-warn-subtle',
    light: '#fde68a',
    dark: '#78350f',
    description: 'Subtle warning status border (banner edge)',
  },
];

const bdStatusDanger: ColorToken[] = [
  {
    name: 'st-color-bd-status-danger-base',
    light: '#dc2626',
    dark: '#ef4444',
    description: 'Danger status border',
  },
  {
    name: 'st-color-bd-status-danger-subtle',
    light: '#fecaca',
    dark: '#7f1d1d',
    description: 'Subtle danger status border (banner edge)',
  },
];

// ---------------------------------------------------------------------------
// ICONS (icon)
// ---------------------------------------------------------------------------

const iconSurface: ColorToken[] = [
  {
    name: 'st-color-icon-surface-base',
    light: '#1a1a1a',
    dark: '#e5e5e5',
    description: 'Default icon colour',
  },
  {
    name: 'st-color-icon-surface-subtle',
    light: '#6b6b6b',
    dark: '#8b8b8b',
    description: 'Secondary / decorative icon colour',
  },
  {
    name: 'st-color-icon-surface-muted',
    light: '#a3a3a3',
    dark: '#525252',
    description: 'Low-emphasis icon colour',
  },
  {
    name: 'st-color-icon-surface-on-color',
    light: '#ffffff',
    dark: '#0a0a0a',
    description: 'Icon on a coloured/dark surface',
  },
];

const iconInteractive: ColorToken[] = [
  {
    name: 'st-color-icon-interactive-base',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Interactive icon colour',
  },
  {
    name: 'st-color-icon-interactive-base-hover',
    light: '#1d4ed8',
    dark: '#60a5fa',
    description: 'Interactive icon colour on hover',
  },
  {
    name: 'st-color-icon-interactive-on-color',
    light: '#ffffff',
    dark: '#0a0a0a',
    description: 'Icon on a filled interactive surface',
  },
];

const iconForm: ColorToken[] = [
  {
    name: 'st-color-icon-form-base',
    light: '#6b6b6b',
    dark: '#8b8b8b',
    description: 'Default form field icon colour',
  },
  {
    name: 'st-color-icon-form-base-disabled',
    light: '#c4c4c4',
    dark: '#404040',
    description: 'Form field icon when disabled',
  },
];

const iconFeature: ColorToken[] = [
  {
    name: 'st-color-icon-feature-base',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Brand/feature icon colour',
  },
];

const iconUi: ColorToken[] = [
  {
    name: 'st-color-icon-ui-base',
    light: '#6b6b6b',
    dark: '#8b8b8b',
    description: 'Neutral UI icon colour',
  },
  {
    name: 'st-color-icon-ui-subtle',
    light: '#a3a3a3',
    dark: '#525252',
    description: 'Low-emphasis UI icon colour',
  },
];

const iconStatusInfo: ColorToken[] = [
  {
    name: 'st-color-icon-status-info-base',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Info status icon colour',
  },
];

const iconStatusSuccess: ColorToken[] = [
  {
    name: 'st-color-icon-status-success-base',
    light: '#16a34a',
    dark: '#22c55e',
    description: 'Success status icon colour',
  },
];

const iconStatusWarn: ColorToken[] = [
  {
    name: 'st-color-icon-status-warn-base',
    light: '#d97706',
    dark: '#f59e0b',
    description: 'Warning status icon colour',
  },
];

const iconStatusDanger: ColorToken[] = [
  {
    name: 'st-color-icon-status-danger-base',
    light: '#dc2626',
    dark: '#ef4444',
    description: 'Danger status icon colour',
  },
];

// ---------------------------------------------------------------------------
// FOCUS RINGS (ring)
// ---------------------------------------------------------------------------

const ringInteractive: ColorToken[] = [
  {
    name: 'st-color-ring-interactive-base',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Default focus ring for interactive elements',
  },
];

const ringForm: ColorToken[] = [
  {
    name: 'st-color-ring-form-base',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Focus ring for form inputs',
  },
];

const ringStatusInfo: ColorToken[] = [
  {
    name: 'st-color-ring-status-info-base',
    light: '#2563eb',
    dark: '#3b82f6',
    description: 'Focus ring for info-state inputs',
  },
];

const ringStatusSuccess: ColorToken[] = [
  {
    name: 'st-color-ring-status-success-base',
    light: '#16a34a',
    dark: '#22c55e',
    description: 'Focus ring for success-state inputs',
  },
];

const ringStatusWarn: ColorToken[] = [
  {
    name: 'st-color-ring-status-warn-base',
    light: '#d97706',
    dark: '#f59e0b',
    description: 'Focus ring for warning-state inputs',
  },
];

const ringStatusDanger: ColorToken[] = [
  {
    name: 'st-color-ring-status-danger-base',
    light: '#dc2626',
    dark: '#ef4444',
    description: 'Focus ring for danger/error state inputs',
  },
];

// ---------------------------------------------------------------------------
// Aggregated export
// ---------------------------------------------------------------------------

/**
 * Complete set of semantic color tokens.
 * Each entry provides light and dark hex values.
 */
export const colorTokens: ColorToken[] = [
  // Backgrounds
  ...bgSurface,
  ...bgInteractive,
  ...bgForm,
  ...bgFeature,
  ...bgUi,
  ...bgStatusInfo,
  ...bgStatusSuccess,
  ...bgStatusWarn,
  ...bgStatusDanger,

  // Foregrounds
  ...fgSurface,
  ...fgInteractive,
  ...fgForm,
  ...fgFeature,
  ...fgUi,
  ...fgStatusInfo,
  ...fgStatusSuccess,
  ...fgStatusWarn,
  ...fgStatusDanger,

  // Borders
  ...bdSurface,
  ...bdInteractive,
  ...bdForm,
  ...bdFeature,
  ...bdUi,
  ...bdStatusInfo,
  ...bdStatusSuccess,
  ...bdStatusWarn,
  ...bdStatusDanger,

  // Icons
  ...iconSurface,
  ...iconInteractive,
  ...iconForm,
  ...iconFeature,
  ...iconUi,
  ...iconStatusInfo,
  ...iconStatusSuccess,
  ...iconStatusWarn,
  ...iconStatusDanger,

  // Focus rings
  ...ringInteractive,
  ...ringForm,
  ...ringStatusInfo,
  ...ringStatusSuccess,
  ...ringStatusWarn,
  ...ringStatusDanger,
];

/** Returns the full array of semantic color tokens. */
export function getColorTokens(): ColorToken[] {
  return colorTokens;
}
