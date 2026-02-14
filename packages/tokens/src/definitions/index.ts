// Token registry — exports all token definitions
//
// Each category file exports a typed array of ScaleToken objects.
// This barrel re-exports them individually and provides a `getAllTokens()`
// helper that returns every category in a single registry object.

export { spaceTokens } from './space.js';
export { typographyTokens } from './typography.js';
export { elevationTokens } from './elevation.js';
export { borderTokens } from './border.js';
export { motionTokens } from './motion.js';
export { layoutTokens, breakpoints } from './layout.js';

// Re-export color definitions (placeholder — populated in the color phase)
export * from './color.js';

import type { TokenRegistry } from '../types.js';

import { spaceTokens } from './space.js';
import { typographyTokens } from './typography.js';
import { elevationTokens } from './elevation.js';
import { borderTokens } from './border.js';
import { motionTokens } from './motion.js';
import { layoutTokens } from './layout.js';
import { colorTokens } from './color.js';

/**
 * Returns a combined registry object containing every token category.
 */
export function getAllTokens(): TokenRegistry {
  return {
    color: colorTokens,
    space: spaceTokens,
    type: typographyTokens,
    elevation: elevationTokens,
    border: borderTokens,
    motion: motionTokens,
    layout: layoutTokens,
    flex: [],
    grid: [],
  };
}
