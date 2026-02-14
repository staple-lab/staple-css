// ---------------------------------------------------------------------------
// W3C Design Token Community Group (DTCG) JSON Generator
//
// Produces tokens in the DTCG format:
//   https://tr.designtokens.org/format/
//
// Each token becomes an object with $value, $type, and $description.
// Color tokens include light/dark mode as $extensions.
// ---------------------------------------------------------------------------

import type { TokenRegistry } from '../types.js';
import { getAllTokens } from '../definitions/index.js';

interface DtcgToken {
  $value: string;
  $type: string;
  $description: string;
  $extensions?: Record<string, unknown>;
}

type DtcgGroup = {
  [key: string]: DtcgToken | DtcgGroup;
};

/**
 * Maps a token name like `st-color-bg-surface-base` into nested DTCG groups.
 */
function setNestedValue(root: DtcgGroup, path: string[], token: DtcgToken): void {
  let current = root;
  for (let i = 0; i < path.length - 1; i++) {
    const segment = path[i]!;
    if (!(segment in current)) {
      current[segment] = {};
    }
    current = current[segment] as DtcgGroup;
  }
  const leaf = path[path.length - 1]!;
  current[leaf] = token;
}

function tokenNameToPath(name: string): string[] {
  // Strip `st-` prefix, split on hyphens
  return name.replace(/^st-/, '').split('-');
}

function mapDtcgType(category: string): string {
  switch (category) {
    case 'color':
      return 'color';
    case 'space':
      return 'dimension';
    case 'type':
      return 'dimension';
    case 'elevation':
      return 'shadow';
    case 'border':
      return 'dimension';
    case 'motion':
      return 'duration';
    case 'layout':
    case 'flex':
    case 'grid':
      return 'dimension';
    default:
      return 'dimension';
  }
}

export function generateTokensJson(registry?: TokenRegistry): string {
  const reg = registry ?? getAllTokens();
  const root: DtcgGroup = {};

  // Color tokens
  for (const t of reg.color) {
    const path = tokenNameToPath(t.name);
    const token: DtcgToken = {
      $value: t.light,
      $type: 'color',
      $description: t.description,
      $extensions: {
        'com.staple-css': {
          light: t.light,
          dark: t.dark,
        },
      },
    };
    setNestedValue(root, path, token);
  }

  // Scale and layout categories
  const scaleEntries: { category: string; tokens: { name: string; value: string; description: string }[] }[] = [
    { category: 'space', tokens: reg.space },
    { category: 'type', tokens: reg.type },
    { category: 'elevation', tokens: reg.elevation },
    { category: 'border', tokens: reg.border },
    { category: 'motion', tokens: reg.motion },
    { category: 'layout', tokens: reg.layout },
    { category: 'flex', tokens: reg.flex },
    { category: 'grid', tokens: reg.grid },
  ];

  for (const entry of scaleEntries) {
    for (const t of entry.tokens) {
      const path = tokenNameToPath(t.name);
      const token: DtcgToken = {
        $value: t.value,
        $type: mapDtcgType(entry.category),
        $description: t.description,
      };
      setNestedValue(root, path, token);
    }
  }

  return JSON.stringify(root, null, 2);
}
