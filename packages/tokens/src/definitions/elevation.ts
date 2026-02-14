import type { ScaleToken } from '../types.js';

/**
 * Elevation (box-shadow) tokens: --st-elevation-{0-4}
 *
 * A 5-step shadow scale from flat (0) to heavily elevated (4).
 * Uses rgb() with modern space-separated syntax for consistency
 * with CSS Color Level 4.
 */
export const elevationTokens: ScaleToken[] = [
  {
    name: 'st-elevation-0',
    value: 'none',
    description: 'No elevation — flat surface with no shadow',
  },
  {
    name: 'st-elevation-1',
    value: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    description: 'Subtle elevation — cards resting on a surface',
  },
  {
    name: 'st-elevation-2',
    value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    description: 'Low elevation — raised cards and grouped content',
  },
  {
    name: 'st-elevation-3',
    value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    description: 'Medium elevation — dropdowns and popovers',
  },
  {
    name: 'st-elevation-4',
    value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    description: 'High elevation — modals and floating panels',
  },
];
