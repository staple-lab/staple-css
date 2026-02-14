import type { ScaleToken } from '../types.js';

/**
 * Border tokens: radius and width scales.
 *
 * Radius scale: 0 (sharp) to 4 (heavily rounded), plus a `full` value
 * for pill shapes and circular elements.
 *
 * Width scale: 0 (no border) to 2 (heavy border).
 */

// -- Border radius ------------------------------------------------------------

const radiusTokens: ScaleToken[] = [
  {
    name: 'st-border-radius-0',
    value: '0',
    description: 'No border radius — sharp square corners',
  },
  {
    name: 'st-border-radius-1',
    value: '0.125rem',
    description: '2px — subtle rounding for inputs and small elements',
  },
  {
    name: 'st-border-radius-2',
    value: '0.25rem',
    description: '4px — default rounding for buttons, cards, and badges',
  },
  {
    name: 'st-border-radius-3',
    value: '0.5rem',
    description: '8px — medium rounding for larger cards and modals',
  },
  {
    name: 'st-border-radius-4',
    value: '0.75rem',
    description: '12px — heavy rounding for prominent surfaces',
  },
  {
    name: 'st-border-radius-full',
    value: '9999px',
    description: 'Full rounding — pill shapes, avatars, and circular elements',
  },
];

// -- Border width -------------------------------------------------------------

const widthTokens: ScaleToken[] = [
  {
    name: 'st-border-width-0',
    value: '0',
    description: 'No border — removes border entirely',
  },
  {
    name: 'st-border-width-1',
    value: '1px',
    description: 'Default border width for inputs, cards, and dividers',
  },
  {
    name: 'st-border-width-2',
    value: '2px',
    description: 'Heavy border for emphasis, active states, and focus rings',
  },
];

// -- Combined export ----------------------------------------------------------

export const borderTokens: ScaleToken[] = [...radiusTokens, ...widthTokens];
