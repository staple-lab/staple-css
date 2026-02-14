import type { ScaleToken } from '../types.js';

/**
 * Layout tokens: containers, breakpoints (screen widths), and z-index scale.
 *
 * Container and screen values mirror each other — containers define max-width
 * constraints while screen values define media-query breakpoints. Both follow
 * the Tailwind breakpoint convention.
 *
 * The z-index scale uses 100-step increments starting at 1000 to avoid
 * collisions with application-level z-indices.
 */

// -- Container max-widths -----------------------------------------------------

const containerTokens: ScaleToken[] = [
  {
    name: 'st-layout-container-sm',
    value: '640px',
    description: 'Small container — max-width for narrow content like login forms',
  },
  {
    name: 'st-layout-container-md',
    value: '768px',
    description: 'Medium container — max-width for single-column article layouts',
  },
  {
    name: 'st-layout-container-lg',
    value: '1024px',
    description: 'Large container — max-width for standard page content',
  },
  {
    name: 'st-layout-container-xl',
    value: '1280px',
    description: 'Extra-large container — max-width for dashboard and wide layouts',
  },
  {
    name: 'st-layout-container-2xl',
    value: '1536px',
    description: 'Maximum container — max-width for full-width layouts on large screens',
  },
];

// -- Screen breakpoints -------------------------------------------------------

const screenTokens: ScaleToken[] = [
  {
    name: 'st-layout-screen-sm',
    value: '640px',
    description: 'Small breakpoint — landscape phones and small tablets',
  },
  {
    name: 'st-layout-screen-md',
    value: '768px',
    description: 'Medium breakpoint — portrait tablets',
  },
  {
    name: 'st-layout-screen-lg',
    value: '1024px',
    description: 'Large breakpoint — landscape tablets and small desktops',
  },
  {
    name: 'st-layout-screen-xl',
    value: '1280px',
    description: 'Extra-large breakpoint — standard desktop monitors',
  },
  {
    name: 'st-layout-screen-2xl',
    value: '1536px',
    description: 'Maximum breakpoint — large desktop monitors and ultra-wide displays',
  },
];

// -- Z-index scale ------------------------------------------------------------

const zIndexTokens: ScaleToken[] = [
  {
    name: 'st-layout-z-base',
    value: '0',
    description: 'Base stacking level — default document flow',
  },
  {
    name: 'st-layout-z-dropdown',
    value: '1000',
    description: 'Dropdown menus and autocomplete panels',
  },
  {
    name: 'st-layout-z-sticky',
    value: '1100',
    description: 'Sticky headers and pinned navigation bars',
  },
  {
    name: 'st-layout-z-fixed',
    value: '1200',
    description: 'Fixed-position elements like floating action buttons',
  },
  {
    name: 'st-layout-z-modal',
    value: '1300',
    description: 'Modal dialogs and full-screen overlays',
  },
  {
    name: 'st-layout-z-popover',
    value: '1400',
    description: 'Popovers and contextual menus above modals',
  },
  {
    name: 'st-layout-z-tooltip',
    value: '1500',
    description: 'Tooltips — highest layer, always on top',
  },
];

// -- Combined export ----------------------------------------------------------

export const layoutTokens: ScaleToken[] = [
  ...containerTokens,
  ...screenTokens,
  ...zIndexTokens,
];

// -- Breakpoints array --------------------------------------------------------

/**
 * Breakpoint definitions for responsive media queries.
 * Each entry maps a named breakpoint to its minimum viewport width.
 */
export const breakpoints: { name: string; minWidth: string }[] = [
  { name: 'sm', minWidth: '640px' },
  { name: 'md', minWidth: '768px' },
  { name: 'lg', minWidth: '1024px' },
  { name: 'xl', minWidth: '1280px' },
  { name: '2xl', minWidth: '1536px' },
];
