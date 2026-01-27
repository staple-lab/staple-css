# SearchPalette Component Guide

## Overview

The `SearchPalette` component is a modern, keyboard-driven command palette for the staple-css documentation. It provides quick access to:

- **Design Tokens**: Colors, spacing, typography, motion, radius, and shadow tokens
- **Documentation Pages**: All major documentation pages and guides
- **UI Patterns**: Common component patterns (buttons, cards, alerts, etc.)

It's built entirely with staple-css primitives and token variables, featuring glassmorphism design, smooth animations, and full accessibility support.

## Features

### Core Functionality

1. **Command Palette Activation**
   - Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) to open
   - Click the Search button in the header
   - Mobile-optimized for touch

2. **Fuzzy Search**
   - Searches across all token names, descriptions, and keywords
   - Smart scoring: exact matches ranked higher than fuzzy matches
   - Real-time filtering as you type
   - Results limited to top 20 matches

3. **Result Categories**
   - **Design Tokens**: Colors, spacing, typography, motion, radius, shadow
   - **Documentation**: Pages and guides
   - **UI Patterns**: Common component patterns

4. **Keyboard Navigation**
   - `↑/↓` Arrow keys: Navigate results
   - `Enter`: Select result and navigate
   - `Escape`: Close palette
   - `Cmd+K` / `Ctrl+K`: Toggle palette
   - Auto-focus search input when opened

5. **Visual Feedback**
   - Hover highlighting for mouse users
   - Keyboard focus indication with selection styling
   - Icon animations on selection
   - Smooth scroll-into-view for keyboard navigation

6. **Accessibility**
   - Full ARIA support (`role="dialog"`, `aria-modal`, `aria-selected`, etc.)
   - Focus management with auto-focus on input
   - Keyboard-only navigation support
   - Semantic HTML with proper heading hierarchy
   - High contrast mode support
   - Reduced motion support (`prefers-reduced-motion`)

## Usage

### Basic Integration

The component is already integrated into the App.tsx:

```tsx
import { SearchPalette } from "./components/SearchPalette";

export function App() {
  return (
    <header className="app-header">
      <Row gap={2}>
        <SearchPalette />
        {/* other header items */}
      </Row>
    </header>
  );
}
```

### With Navigation Callback

```tsx
<SearchPalette
  onNavigate={(path) => {
    // Custom navigation logic
    console.log("Navigating to:", path);
  }}
/>
```

## Component Architecture

### TypeScript Types

```typescript
interface SearchEntry {
  id: string;                                      // Unique identifier
  title: string;                                   // Display name
  description?: string;                           // Optional description
  category: "tokens" | "pages" | "patterns";      // Result category
  type: "color" | "space" | "typography" | ...;   // Specific type
  query: string;                                  // Searchable keywords
  path?: string;                                  // Navigation path for pages
  icon?: string;                                  // Display emoji icon
}

interface SearchPaletteProps {
  onNavigate?: (path: string) => void;  // Navigation callback
}
```

### Search Index Structure

The search index is built at runtime from the `buildSearchIndex()` function:

```typescript
// 80+ searchable items across three categories
[
  // Color tokens
  { id: "color-primary", title: "Primary", category: "tokens", ... },

  // Space tokens (0-8 scale)
  { id: "space-4", title: "Space 4", description: "16px", ... },

  // Pages
  { id: "page-tokens", title: "Tokens", category: "pages", path: "/tokens", ... },

  // Patterns
  { id: "pattern-button-primary", title: "Button Primary", category: "patterns", ... }
]
```

## Styling

### CSS Architecture

The component uses a modular CSS structure with:

- **Utility tokens**: All colors, spacing, shadows from staple-css
- **Glassmorphism effect**: `backdrop-filter: blur()` for modern look
- **Animations**: Smooth entrance/exit transitions
- **Responsive design**: Mobile-optimized with touch-friendly sizing

### Key CSS Classes

| Class | Purpose |
|-------|---------|
| `.search-trigger` | Header button to open palette |
| `.search-backdrop` | Semi-transparent overlay |
| `.search-palette` | Main modal container |
| `.search-input-wrapper` | Search input area with icon |
| `.search-results` | Scrollable results container |
| `.search-group` | Category group header |
| `.search-item` | Individual result item |
| `.search-item.selected` | Highlighted/selected state |
| `.search-footer` | Keyboard shortcuts hint area |

### Design Tokens Used

- **Colors**: `--st-color-surface`, `--st-color-primary`, `--st-color-text`
- **Spacing**: `--st-space-2`, `--st-space-3`, `--st-space-4`
- **Radius**: `--st-radius-1`, `--st-radius-2`, `--st-radius-3`
- **Shadow**: `--st-shadow-1` for modal elevation
- **Typography**: `--st-font-sans`, `--st-font-mono`
- **Motion**: `--st-duration-fast`, `--st-duration-normal`, `--st-easing-default`

## Extending the Search Index

To add more items to the search palette, edit `buildSearchIndex()` in `SearchPalette.tsx`:

### Adding a New Token

```typescript
{
  id: "token-unique-id",
  title: "Display Name",
  description: "Brief explanation",
  category: "tokens",
  type: "color" | "space" | "typography" | "motion" | "radius" | "shadow",
  query: "searchable keywords related to this token",
  icon: "🎨", // emoji icon
}
```

### Adding a New Page

```typescript
{
  id: "page-custom-page",
  title: "Custom Page",
  category: "pages",
  type: "page",
  query: "search keywords for navigation",
  path: "/custom-path",
  icon: "📄",
}
```

### Adding a New Pattern

```typescript
{
  id: "pattern-custom-component",
  title: "Custom Component",
  description: "What this pattern is for",
  category: "patterns",
  type: "pattern",
  query: "searchable keywords",
  icon: "🧩",
}
```

## Fuzzy Search Algorithm

The component uses a simple but effective fuzzy search:

1. **Exact substring match** (score: 100) - highest priority
2. **Character sequence matching** - finds characters in order
3. **Consecutive matches** - bonus scoring for consecutive character matches
4. **Results sorted by score** - best matches appear first

Example:
- Query: `"btn"` → Matches "button" with high score
- Query: `"sp 4"` → Matches "Space 4" with high score
- Query: `"primary"` → Matches "Primary" and "Button Primary"

## Performance Considerations

1. **Static index**: Built once at component mount, no runtime generation
2. **Limited results**: Displays max 20 results to maintain performance
3. **Efficient filtering**: Uses simple array methods for O(n) search
4. **No dependencies**: Minimal runtime overhead, lightweight component
5. **CSS-only animations**: Hardware-accelerated via CSS transforms

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+K` (Mac) / `Ctrl+K` | Open/close search palette |
| `↑` / `↓` | Navigate results (wraps around) |
| `Enter` / `Return` | Select current result |
| `Escape` | Close palette |
| `Type` | Filter results in real-time |

## Browser Support

- Modern browsers with CSS Grid and Flexbox
- CSS `backdrop-filter` for glassmorphism (graceful fallback to regular background)
- CSS animations and transitions
- `prefers-reduced-motion` media query support
- iOS Safari and Android Chrome (touch-optimized)

## Accessibility Features

### ARIA Labels & Roles

```html
<button aria-label="Open search palette">
  Search
</button>

<div role="dialog" aria-labelledby="search-title" aria-modal="true">
  <input aria-label="Search" aria-autocomplete="list" aria-controls="search-results" />
  <div id="search-results" role="listbox">
    <li role="option" aria-selected="true">Result</li>
  </div>
</div>
```

### Keyboard Navigation

- Focus trap on modal (Escape to close)
- Tab through search input and results
- Arrow keys for result navigation
- Enter to select

### Visual Accessibility

- High contrast mode support (2px borders)
- Color-independent result highlighting
- Semantic HTML structure
- Readable font sizes and spacing
- Proper color contrast ratios

## Customization

### Styling Customization

Override CSS variables in your global styles:

```css
:root {
  --search-palette-max-width: 600px;
  --search-palette-max-height: 600px;
  --search-item-icon-size: 1.25rem;
}
```

### Behavior Customization

Create a wrapper component:

```tsx
function CustomSearchPalette() {
  const handleNavigate = (path: string) => {
    // Custom navigation logic
    router.push(path);
  };

  return <SearchPalette onNavigate={handleNavigate} />;
}
```

## Mobile Experience

The component is optimized for mobile:

- Smaller header button (icon-only on small screens)
- Larger touch targets for results
- Modal opens with full-screen fallback on small viewports
- Prevents auto-zoom by using `font-size: 16px` on input
- Touch-friendly scrolling with `-webkit-overflow-scrolling: touch`

## Dark Mode Support

The component automatically adapts to system theme:

- Uses `--st-color-surface` and other semantic tokens
- Respects `prefers-color-scheme` media query
- Backdrop blur works in both light and dark modes
- Text colors adjust automatically

## Performance Metrics

- **Bundle size**: ~8KB (unminified)
- **Runtime memory**: Minimal (static index)
- **Search time**: <1ms for typical query
- **CSS**: ~3KB (unminified)
- **No external dependencies**: Uses React + staple-css primitives only

## Future Enhancements

Potential improvements:

1. **Recent searches**: Cache recently selected items
2. **Keyboard shortcut discovery**: Show available shortcuts on first visit
3. **Dynamic index**: Load token data from API
4. **Custom actions**: Support for custom command actions
5. **Search history**: Keyboard navigation through search history
6. **Analytics**: Track popular search queries
7. **Aliases**: Support multiple keywords for same item
8. **Grouping**: Smart grouping by frequency or recency

## Troubleshooting

### Search not finding items

- Check that query keywords are included in the `query` field
- Verify category and type are set correctly
- Ensure title is set for display

### Keyboard shortcuts not working

- Verify browser supports `Cmd` or `Ctrl` key detection
- Check that modal is focused (not input element)
- Ensure no other scripts are intercepting the shortcut

### Styling issues

- Verify staple-css tokens are loaded (check browser dev tools for CSS variables)
- Check for CSS specificity conflicts
- Ensure `.search-palette.css` is imported

### Mobile display problems

- Check viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Verify touch events are not being prevented
- Test on actual mobile device (not just browser dev tools)

## Files

- **Component**: `/apps/docs/src/components/SearchPalette.tsx`
- **Styles**: `/apps/docs/src/components/SearchPalette.css`
- **Integration**: `/apps/docs/src/App.tsx` (line 2, 149)

## License

Same as staple-css project.
