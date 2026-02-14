import type { ScaleToken } from '../types.js';

/**
 * Spacing scale tokens: --st-space-{0-8,px}
 *
 * A geometric spacing scale anchored at 1rem = 16px.
 * The `px` token provides a single-pixel value for fine borders and dividers.
 */
export const spaceTokens: ScaleToken[] = [
  {
    name: 'st-space-0',
    value: '0',
    description: 'Zero spacing — no space',
  },
  {
    name: 'st-space-1',
    value: '0.25rem',
    description: '4px — extra-small spacing for tight internal gaps',
  },
  {
    name: 'st-space-2',
    value: '0.5rem',
    description: '8px — small spacing for compact layouts and inline gaps',
  },
  {
    name: 'st-space-3',
    value: '0.75rem',
    description: '12px — medium-small spacing for form fields and list items',
  },
  {
    name: 'st-space-4',
    value: '1rem',
    description: '16px — base spacing unit for general-purpose padding and gaps',
  },
  {
    name: 'st-space-5',
    value: '1.5rem',
    description: '24px — medium-large spacing for section padding and card interiors',
  },
  {
    name: 'st-space-6',
    value: '2rem',
    description: '32px — large spacing for section gaps and major layout separations',
  },
  {
    name: 'st-space-7',
    value: '3rem',
    description: '48px — extra-large spacing for page-level sections',
  },
  {
    name: 'st-space-8',
    value: '4rem',
    description: '64px — maximum spacing for hero sections and major landmarks',
  },
  {
    name: 'st-space-px',
    value: '1px',
    description: '1px — hairline value for borders, dividers, and fine adjustments',
  },
];
