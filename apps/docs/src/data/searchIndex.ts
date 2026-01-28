// Search index for global documentation search
// Auto-generated from page content + token definitions

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'page' | 'token';
  url: string;
  category?: string;
}

export const searchIndex: SearchResult[] = [
  // Foundation Pages
  {
    id: 'home',
    title: 'Home',
    description: 'Overview of Staple CSS. Token-first primitives for teams that care about consistency.',
    type: 'page',
    url: '/',
    category: 'Foundation',
  },
  {
    id: 'why',
    title: 'Why staple-css?',
    description: 'Philosophy and principles. Why use Staple CSS over other design systems.',
    type: 'page',
    url: '/why',
    category: 'Foundation',
  },
  {
    id: 'guides',
    title: 'Design Guides',
    description: 'Best practices and patterns. Learn the principles that make staple-css powerful.',
    type: 'page',
    url: '/guides',
    category: 'Foundation',
  },

  // Token Pages
  {
    id: 'tokens',
    title: 'Tokens',
    description: 'Design token categories and usage. Spacing, colors, typography, and more.',
    type: 'page',
    url: '/tokens',
    category: 'Tokens',
  },
  {
    id: 'token-reference',
    title: 'Token Reference',
    description: 'Complete token documentation with values. Look up any token in the system.',
    type: 'page',
    url: '/token-reference',
    category: 'Tokens',
  },
  {
    id: 'colors',
    title: 'Color System',
    description: 'Color palette and semantic colors. Accessible, theme-aware color tokens.',
    type: 'page',
    url: '/colors',
    category: 'Tokens',
  },

  // Component Pages
  {
    id: 'primitives',
    title: 'Primitives',
    description: 'Layout primitives (Box, Container, Column, Row, Grid, Flex). Building blocks.',
    type: 'page',
    url: '/primitives',
    category: 'Components',
  },
  {
    id: 'components',
    title: 'Component Patterns',
    description: 'Component showcase, patterns, and best practices. Real-world examples.',
    type: 'page',
    url: '/components',
    category: 'Components',
  },
  {
    id: 'visuals',
    title: 'Visual System',
    description: 'Radii, shadows, borders, and visual treatments. Elevation system documentation.',
    type: 'page',
    url: '/visuals',
    category: 'Components',
  },

  // Feature Pages
  {
    id: 'gradients',
    title: 'Gradient Tokens',
    description: 'Pre-defined OKLCH-generated gradients. Tone-based, vibrant, and overlay.',
    type: 'page',
    url: '/gradients',
    category: 'Tools',
  },
  {
    id: 'examples',
    title: 'Real-World Examples',
    description: 'Production-ready patterns and components. Forms, dashboards, and more.',
    type: 'page',
    url: '/examples',
    category: 'Tools',
  },
  {
    id: 'figma',
    title: 'Figma Integration',
    description: 'Seamless token sync between Figma and code. Bidirectional synchronization.',
    type: 'page',
    url: '/figma',
    category: 'Tools',
  },

  // Tokens - Spacing
  {
    id: 'token-space-0',
    title: 'Space 0 (0px)',
    description: 'No spacing',
    type: 'token',
    url: '/token-reference#spacing',
    category: 'Spacing',
  },
  {
    id: 'token-space-1',
    title: 'Space 1 (4px)',
    description: 'Extra small spacing',
    type: 'token',
    url: '/token-reference#spacing',
    category: 'Spacing',
  },
  {
    id: 'token-space-2',
    title: 'Space 2 (8px)',
    description: 'Small spacing',
    type: 'token',
    url: '/token-reference#spacing',
    category: 'Spacing',
  },
  {
    id: 'token-space-3',
    title: 'Space 3 (12px)',
    description: 'Medium-small spacing',
    type: 'token',
    url: '/token-reference#spacing',
    category: 'Spacing',
  },
  {
    id: 'token-space-4',
    title: 'Space 4 (16px)',
    description: 'Medium spacing',
    type: 'token',
    url: '/token-reference#spacing',
    category: 'Spacing',
  },
  {
    id: 'token-space-6',
    title: 'Space 6 (24px)',
    description: 'Large spacing',
    type: 'token',
    url: '/token-reference#spacing',
    category: 'Spacing',
  },
  {
    id: 'token-space-8',
    title: 'Space 8 (32px)',
    description: 'Extra large spacing',
    type: 'token',
    url: '/token-reference#spacing',
    category: 'Spacing',
  },

  // Tokens - Colors
  {
    id: 'token-color-primary',
    title: '--st-color-primary',
    description: 'Primary brand color. Used for main actions and highlights.',
    type: 'token',
    url: '/token-reference#colors',
    category: 'Colors',
  },
  {
    id: 'token-color-danger',
    title: '--st-color-danger',
    description: 'Danger/error color. Used for destructive actions.',
    type: 'token',
    url: '/token-reference#colors',
    category: 'Colors',
  },
  {
    id: 'token-color-warning',
    title: '--st-color-warn',
    description: 'Warning color. Used for alerts and cautions.',
    type: 'token',
    url: '/token-reference#colors',
    category: 'Colors',
  },
  {
    id: 'token-color-success',
    title: '--st-color-success',
    description: 'Success color. Used for confirmations.',
    type: 'token',
    url: '/token-reference#colors',
    category: 'Colors',
  },

  // Tokens - Typography
  {
    id: 'token-font-display',
    title: '--st-font-display',
    description: 'Display font for headings. Bricolage Grotesque.',
    type: 'token',
    url: '/token-reference#typography',
    category: 'Typography',
  },
  {
    id: 'token-font-mono',
    title: '--st-font-mono',
    description: 'Monospace font for code. Used in code blocks.',
    type: 'token',
    url: '/token-reference#typography',
    category: 'Typography',
  },

  // Tokens - Shadows
  {
    id: 'token-shadow-1',
    title: 'Shadow 1 (Subtle)',
    description: 'Subtle elevation shadow',
    type: 'token',
    url: '/token-reference#shadows',
    category: 'Shadows',
  },
  {
    id: 'token-shadow-2',
    title: 'Shadow 2 (Medium)',
    description: 'Medium elevation shadow',
    type: 'token',
    url: '/token-reference#shadows',
    category: 'Shadows',
  },

  // Tokens - Radius
  {
    id: 'token-radius-1',
    title: 'Radius 1 (4px)',
    description: 'Small border radius',
    type: 'token',
    url: '/token-reference#radius',
    category: 'Radius',
  },
  {
    id: 'token-radius-2',
    title: 'Radius 2 (6px)',
    description: 'Medium border radius',
    type: 'token',
    url: '/token-reference#radius',
    category: 'Radius',
  },
];

export function searchPages(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase();
  return searchIndex.filter(
    (item) =>
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery)
  );
}
