import type { ScaleToken } from '../types.js';

/**
 * Typography tokens covering font size, weight, line-height, letter-spacing,
 * and font-family stacks.
 *
 * Size scale: 0.75rem (12px) to 3rem (48px) in 10 steps.
 * Weight, leading, and tracking use named stops for readability.
 */

// -- Font size scale ----------------------------------------------------------

const sizeTokens: ScaleToken[] = [
  {
    name: 'st-type-size-0',
    value: '0.75rem',
    description: '12px — smallest text; captions and fine print',
  },
  {
    name: 'st-type-size-1',
    value: '0.8125rem',
    description: '13px — small supporting text and labels',
  },
  {
    name: 'st-type-size-2',
    value: '0.875rem',
    description: '14px — secondary body text and compact UI copy',
  },
  {
    name: 'st-type-size-3',
    value: '1rem',
    description: '16px — base body text size',
  },
  {
    name: 'st-type-size-4',
    value: '1.125rem',
    description: '18px — large body text or small subheadings',
  },
  {
    name: 'st-type-size-5',
    value: '1.25rem',
    description: '20px — subheadings and prominent UI labels',
  },
  {
    name: 'st-type-size-6',
    value: '1.5rem',
    description: '24px — section headings (h3-equivalent)',
  },
  {
    name: 'st-type-size-7',
    value: '1.875rem',
    description: '30px — page headings (h2-equivalent)',
  },
  {
    name: 'st-type-size-8',
    value: '2.25rem',
    description: '36px — large headings (h1-equivalent)',
  },
  {
    name: 'st-type-size-9',
    value: '3rem',
    description: '48px — display headings for hero sections',
  },
];

// -- Font weight --------------------------------------------------------------

const weightTokens: ScaleToken[] = [
  {
    name: 'st-type-weight-light',
    value: '300',
    description: 'Light weight — decorative headings and large display text',
  },
  {
    name: 'st-type-weight-normal',
    value: '400',
    description: 'Normal weight — body text default',
  },
  {
    name: 'st-type-weight-medium',
    value: '500',
    description: 'Medium weight — subtle emphasis and labels',
  },
  {
    name: 'st-type-weight-semibold',
    value: '600',
    description: 'Semibold weight — subheadings and interactive labels',
  },
  {
    name: 'st-type-weight-bold',
    value: '700',
    description: 'Bold weight — headings and strong emphasis',
  },
];

// -- Line height (leading) ----------------------------------------------------

const leadingTokens: ScaleToken[] = [
  {
    name: 'st-type-leading-tight',
    value: '1.25',
    description: 'Tight line-height for headings and display text',
  },
  {
    name: 'st-type-leading-snug',
    value: '1.375',
    description: 'Snug line-height for compact body text',
  },
  {
    name: 'st-type-leading-normal',
    value: '1.5',
    description: 'Normal line-height for body text (WCAG recommended)',
  },
  {
    name: 'st-type-leading-relaxed',
    value: '1.625',
    description: 'Relaxed line-height for improved readability in long-form content',
  },
  {
    name: 'st-type-leading-loose',
    value: '2',
    description: 'Loose line-height for spacious prose and annotation text',
  },
];

// -- Letter spacing (tracking) ------------------------------------------------

const trackingTokens: ScaleToken[] = [
  {
    name: 'st-type-tracking-tight',
    value: '-0.025em',
    description: 'Tight letter-spacing for large headings and display text',
  },
  {
    name: 'st-type-tracking-normal',
    value: '0',
    description: 'Normal letter-spacing — browser default',
  },
  {
    name: 'st-type-tracking-wide',
    value: '0.025em',
    description: 'Slightly widened letter-spacing for small text and labels',
  },
  {
    name: 'st-type-tracking-wider',
    value: '0.05em',
    description: 'Widened letter-spacing for uppercase labels and overlines',
  },
];

// -- Font family stacks -------------------------------------------------------

const familyTokens: ScaleToken[] = [
  {
    name: 'st-type-family-sans',
    value: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    description: 'System sans-serif font stack with broad OS coverage',
  },
  {
    name: 'st-type-family-mono',
    value: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
    description: 'Monospace font stack for code blocks and technical content',
  },
];

// -- Combined export ----------------------------------------------------------

export const typographyTokens: ScaleToken[] = [
  ...sizeTokens,
  ...weightTokens,
  ...leadingTokens,
  ...trackingTokens,
  ...familyTokens,
];
