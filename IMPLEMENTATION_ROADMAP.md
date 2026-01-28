# Implementation Roadmap - Solarpunk Redesign
*Ralph Loop Iteration Plan - 50+ Iterations*

## Phase Overview

| Phase | Iterations | Focus | Deliverable |
|-------|-----------|-------|-------------|
| Foundation | 1-5 | Typography, color, motion, accessibility | Design tokens CSS, base styles |
| Layout | 6-15 | Docs architecture, sidebar, nav, spacing | New layout components |
| Components | 16-30 | Button, form, card, table polish | Styled components library |
| Signature Style | 31-40 | Solarpunk aesthetic, gradients, patterns | Visual identity system |
| Polish | 41-50+ | Mobile, accessibility sweep, optimization | Final QA checklist |

---

## PHASE 1: FOUNDATION (Iterations 1-5)

### Iteration 1: Typography & Google Fonts
**Task**: Load Bricolage Grotesque + IBM Plex Mono from Google Fonts

**Files to modify**:
- `apps/docs/src/App.tsx` - Add @import for Google Fonts
- `packages/primitives/src/primitives.css` - Add CSS variables for fonts
- `apps/docs/src/index.css` or main stylesheet

**Changes**:
```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');

:root {
  --st-font-display: "Bricolage Grotesque", system-ui, sans-serif;
  --st-font-body: "Bricolage Grotesque", system-ui, sans-serif;
  --st-font-mono: "IBM Plex Mono", monospace;
}

/* Apply to body */
body {
  font-family: var(--st-font-body);
}

code, pre {
  font-family: var(--st-font-mono);
}
```

**Verification**:
- [ ] Google Fonts loaded in browser DevTools (Network tab)
- [ ] All text on all pages using new fonts
- [ ] Monospace code blocks using IBM Plex Mono
- [ ] Font weight variations working (400, 500, 600, 700, 800)

---

### Iteration 2: Focus States & Accessibility Base
**Task**: Add focus rings and :focus-visible styles to all interactive elements

**Files to modify**:
- `packages/primitives/src/primitives.css` - Add focus rules
- Create `apps/docs/src/styles/accessibility.css` - Focus states

**Changes**:
```css
/* primitives.css - Add at top level */
:focus-visible {
  outline: 2px solid var(--st-color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}

/* For all clickable elements */
button:focus-visible,
a:focus-visible,
[role="button"]:focus-visible {
  outline: 2px solid var(--st-color-primary);
  outline-offset: 2px;
}

/* Form inputs */
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid var(--st-color-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Verification**:
- [ ] Tab through all pages - focus rings visible
- [ ] Focus ring color has sufficient contrast
- [ ] Focus order logical (left→right, top→bottom)
- [ ] prefers-reduced-motion detected and animations disabled

---

### Iteration 3: Solarpunk Color Palette
**Task**: Add warm color tokens to design system

**Files to modify**:
- `packages/tokens/src/tokens.ts` - Add solarpunk colors
- Or: `packages/primitives/src/primitives.css` - Add CSS variables

**Changes**:
```css
:root {
  /* Solarpunk Primary - Warm Forest Green */
  --st-color-primary-solarpunk: #2a7d52;
  --st-color-primary-light: #4da870;
  --st-color-primary-pale: #d4f0e8;

  /* Warm Accent - Gold/Amber */
  --st-color-accent-warm: #d4a574;
  --st-color-accent-light: #f4dcc8;

  /* Organic - Sage Green */
  --st-color-organic-green: #9db4a8;
  --st-color-organic-light: #e8ede8;

  /* Retro-Futuristic - Electric Lime */
  --st-color-accent-lime: #b4d61e;
  --st-color-accent-lime-pale: #e8f0cc;

  /* Warm Neutrals */
  --st-color-background-warm: #f5f1e8;
  --st-color-surface-warm: #fffbf7;
  --st-color-text-warm: #2c3e35;
}

@media (prefers-color-scheme: dark) {
  :root {
    --st-color-primary-solarpunk: #4da870;
    --st-color-accent-warm: #c4915e;
    --st-color-background-warm: #1a2620;
    --st-color-text-warm: #e8ede8;
  }
}
```

**Verification**:
- [ ] Colors load in CSS
- [ ] Light mode colors correct
- [ ] Dark mode colors defined
- [ ] No color clashes with existing palette

---

### Iteration 4: Motion & prefers-reduced-motion
**Task**: Audit all transitions/animations, add prefers-reduced-motion checks

**Files to modify**:
- All CSS files with transitions
- All .tsx files with inline transitions
- HomePage.tsx, VisualsPage.tsx, ComponentPatternsPage.tsx

**Changes**:
```css
/* Instead of bare transitions */
.element {
  transition: transform 150ms ease-out;
}

/* Wrap in prefers-reduced-motion check */
@media (prefers-reduced-motion: no-preference) {
  .element {
    transition: transform 150ms ease-out;
  }
}
```

**For inline styles in React**:
```tsx
const getTransition = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'none';
  }
  return 'transform 150ms ease-out';
};
```

**Verification**:
- [ ] All transitions wrapped in prefers-reduced-motion
- [ ] Animations still work when preference is "no preference"
- [ ] No animation when preference is "reduce"
- [ ] Test with browser DevTools (Rendering tab)

---

### Iteration 5: Aria-labels & Semantic HTML
**Task**: Add aria-labels to icon-only elements, verify semantic HTML

**Files to modify**:
- All pages with icon badges
- All pages with icon buttons
- HomePage.tsx, ComponentPatternsPage.tsx, ExamplesPage.tsx, VisualsPage.tsx

**Changes**:
```tsx
/* Before */
<Box style={{ width: "32px", height: "32px" }}>
  <IconComponent size={16} />
</Box>

/* After */
<Box
  role="img"
  aria-label="Token-First Design"
  style={{ width: "32px", height: "32px" }}
>
  <IconComponent size={16} aria-hidden="true" />
</Box>

/* Or for buttons */
<button aria-label="Download PDF">
  <DownloadIcon size={16} aria-hidden="true" />
</button>
```

**Verification**:
- [ ] Icon-only elements have aria-label or role="img"
- [ ] Aria-hidden="true" on decorative icons
- [ ] Semantic heading hierarchy (h1→h2→h3) maintained
- [ ] Screen reader test (VoiceOver, NVDA, JAWS)

---

## PHASE 2: LAYOUT (Iterations 6-15)

### Iteration 6-8: Sidebar Navigation
**Task**: Create docs-style sidebar navigation

**Files to create**:
- `apps/docs/src/components/Sidebar.tsx` - New sidebar component
- `apps/docs/src/components/Sidebar.css` - Sidebar styling

**Structure**:
```
┌─────────────────────────────────────────┐
│  Logo    [Menu]                   [🔍]  │  ← Top Nav
├──────────┬──────────────────────────────┤
│  Guides  │  Current Page Content        │
│  ├─ Spacing        │                    │
│  ├─ Color          │  • H1              │
│  ├─ Typography     │  • H2              │  ← Table of Contents
│  • Getting Started │                    │
│  • Primitives      │                    │
│  • Tokens          │                    │
└──────────┴──────────────────────────────┘
```

**Implementation**:
- Collapsible sections
- Active indicator (left border)
- Mobile hamburger menu
- Smooth scroll anchor links

---

### Iteration 9-10: Max-width & Line-length
**Task**: Implement readable line-length (65ch) for body text

**Files to modify**:
- All page CSS files
- Create `apps/docs/src/styles/typography.css` - Centralized

**Changes**:
```css
/* Main content area */
.content-main {
  max-width: 65ch; /* ~900-950px at 16px font */
  margin: 0 auto;
}

/* For full-width sections */
.full-width {
  width: 100%;
  max-width: 100%;
}

.full-width > .content-main {
  max-width: 65ch;
  padding: 0 var(--st-space-6);
}
```

**Verification**:
- [ ] Body text max-width = 65ch
- [ ] Readable on all viewport sizes
- [ ] Full-width sections still work
- [ ] Mobile: text readable without horizontal scroll

---

### Iteration 11-12: Standardize Section Spacing
**Task**: Apply consistent spacing across all pages

**Files to modify**:
- All 11 page files

**Rules**:
```
Section padding:
  - Desktop: var(--st-space-8) (40px)
  - Tablet: var(--st-space-7) (32px)
  - Mobile: var(--st-space-6) (24px)

Section gap: var(--st-space-8)
Subsection gap: var(--st-space-6)
Component gap: var(--st-space-4)
```

**Verification**:
- [ ] All sections use same padding scale
- [ ] No visual inconsistencies between pages
- [ ] Mobile spacing reduced appropriately
- [ ] Whitespace feels intentional

---

### Iteration 13-15: Breadcrumbs & TOC
**Task**: Add breadcrumb navigation and table of contents

**Files to create**:
- `apps/docs/src/components/Breadcrumbs.tsx`
- `apps/docs/src/components/TableOfContents.tsx`

**Implementation**:
- Breadcrumbs on each page header
- Right-side TOC with smooth scroll
- Mobile: collapse TOC below content
- Active section highlighting in TOC

---

## PHASE 3: COMPONENTS (Iterations 16-30)

### Iteration 16-18: Button States & Variants
**Task**: Polish all button variants (primary, secondary, ghost, icon)

**Files to modify**:
- `packages/primitives/src/primitives.css` - Button styles
- HomePage.tsx, ComponentPatternsPage.tsx, ExamplesPage.tsx

**Variants**:
```
Primary:
  - Default: blue, solid
  - Hover: darker blue, shadow-2, translateY(-2px)
  - Focus: outline + shadow
  - Active: no transform, shadow-1
  - Disabled: opacity 0.5

Secondary:
  - Default: white bg, border
  - Hover: light bg, darker border
  - Focus: outline
  - Active: bg shift
  - Disabled: opacity 0.5

Ghost:
  - Default: transparent, text color
  - Hover: light bg, text darker
  - Focus: outline
  - Active: opacity 0.95
  - Disabled: opacity 0.5

Icon-only:
  - 32x32px box, circular or rounded
  - Same state handling as buttons
```

---

### Iteration 19-21: Form Input Polish
**Task**: Style form inputs with visible states

**Files to modify**:
- `packages/primitives/src/primitives.css` - Input styles
- ComponentPatternsPage.tsx

**States**:
```
Input:
  - Default: border-color
  - Focus: primary color border + shadow
  - Hover: lighter border
  - Disabled: muted bg, no pointer
  - Error: danger color border + icon

Label:
  - Semibold, smaller text
  - Proper spacing above input
  - Optional indicator for required fields

Checkbox/Radio:
  - 20x20px size
  - Border style, focus outline
  - Proper label association
```

---

### Iteration 22-24: Card Hierarchy
**Task**: Define card types (simple, featured, highlighted)

**Files to modify**:
- Create `apps/docs/src/components/CardVariants.tsx`
- Create `apps/docs/src/styles/cards.css`

**Card Types**:
```
Simple Card:
  - Padding: var(--st-space-4)
  - Border: 1px solid border
  - Shadow: var(--st-shadow-1)
  - Hover: shadow-2

Featured Card:
  - Padding: var(--st-space-5)
  - Border: none or left-border
  - Shadow: var(--st-shadow-2)
  - Hover: shadow-3, lift effect

Highlighted Card:
  - Padding: var(--st-space-5)
  - Background: light accent color
  - Border: left-border with accent color
  - Shadow: var(--st-shadow-1)
  - Hover: shadow-2, glow effect
```

---

### Iteration 25-27: Code Block Styling
**Task**: Polish code blocks with copy button, syntax highlighting

**Files to modify**:
- Create `apps/docs/src/components/CodeBlock.tsx`
- Create `apps/docs/src/styles/code.css`

**Features**:
- Monospace font (IBM Plex Mono)
- Dark background, light text
- Line numbers (optional)
- Copy to clipboard button
- Language badge
- Syntax highlighting (use Prism.js or similar)
- Horizontal scroll with visible scrollbar

---

### Iteration 28-30: Table Styling
**Task**: Create clean, accessible table styles

**Files to modify**:
- Create `apps/docs/src/components/Table.tsx`
- Create `apps/docs/src/styles/tables.css`

**Features**:
- Semantic table structure (thead, tbody, th, td)
- Striped rows (alternating bg)
- Hover highlight on row
- Proper padding and alignment
- Responsive: stack columns on mobile
- Sortable headers (optional)
- Accessible headers (scope, id/headers attributes)

---

## PHASE 4: SIGNATURE STYLE (Iterations 31-40)

### Iteration 31-33: Solarpunk Aesthetic
**Task**: Apply warm colors and organic shapes throughout

**Changes**:
- Update accent colors to green/gold palette
- Add gradient overlays to hero sections
- Use warm neutrals for backgrounds
- Apply rounded corners consistently

### Iteration 34-35: Illustrations & Patterns
**Task**: Add organic shapes and nature-inspired patterns

**Files to create**:
- `apps/docs/src/components/Illustrations/` - SVG illustrations
- `apps/docs/src/styles/patterns.css` - Background patterns

**Patterns**:
- Subtle leaf/organic shapes in hero sections
- Gradient meshes on backgrounds
- Dotted patterns (optional)
- Nature-inspired section dividers

### Iteration 36-37: Gradient System
**Task**: Create and apply gradient tokens throughout

**Gradients**:
- Hero gradient (warm gold to forest green)
- Accent gradient (lime to gold)
- Text gradients (heading accents)
- Icon gradients (badge backgrounds)

### Iteration 38-40: Visual Depth
**Task**: Add layering, shadows, and depth perception

**Changes**:
- Use shadow scale consistently
- Add z-index layering
- Create visual depth with borders
- Implement backdrop blur (optional)

---

## PHASE 5: POLISH (Iterations 41-50+)

### Iteration 41-43: Mobile Responsiveness
**Task**: Full mobile audit and fixes

**Checklist**:
- [ ] Touch targets ≥ 44x44px
- [ ] Typography readable on small screens
- [ ] No horizontal scroll
- [ ] Sidebar collapses to hamburger
- [ ] Buttons full-width on mobile
- [ ] Images responsive
- [ ] Spacing scales down appropriately

### Iteration 44-46: Accessibility Full Sweep
**Task**: Complete accessibility audit (WCAG 2.1 AA)

**Checklist**:
- [ ] Color contrast ≥ 4.5:1 for normal text
- [ ] Focus indicators visible and clear
- [ ] Keyboard navigation works on all pages
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] Motion respects prefers-reduced-motion
- [ ] Form labels properly associated
- [ ] Images have alt text
- [ ] Links are underlined or otherwise distinct

### Iteration 47-48: Performance Optimization
**Task**: Optimize bundle size and rendering

**Checklist**:
- [ ] Google Fonts optimized (woff2, preload)
- [ ] Images optimized (WebP, lazy loading)
- [ ] CSS minimized and cached
- [ ] JavaScript bundle size < 50KB
- [ ] First contentful paint < 2s
- [ ] Lighthouse score ≥ 90

### Iteration 49-50+: Final QA
**Task**: Visual QA, cross-browser testing, final polish

**Visual QA Checklist**:
```
□ Typography
  ✓ Fonts loading correctly
  ✓ Font weights applied (400, 500, 600, 700, 800)
  ✓ Heading hierarchy consistent
  ✓ Line-height readable (1.5-1.6)
  ✓ Letter-spacing appropriate

□ Spacing
  ✓ Section gaps consistent
  ✓ Component gaps consistent
  ✓ Padding symmetrical
  ✓ Margins predictable
  ✓ Whitespace intentional

□ Colors
  ✓ Contrast sufficient (4.5:1)
  ✓ Color palette warm (Solarpunk)
  ✓ Gradients applied correctly
  ✓ Dark mode works
  ✓ No color-only information

□ Components
  ✓ Buttons have all states (default, hover, focus, active, disabled)
  ✓ Form inputs styled and focused
  ✓ Cards have hierarchy
  ✓ Links underlined
  ✓ Icons have aria-labels

□ Interactive
  ✓ Hover effects visible
  ✓ Focus rings clear
  ✓ Transitions smooth
  ✓ No motion on prefers-reduced-motion

□ Responsive
  ✓ Mobile layout works
  ✓ Tablet layout works
  ✓ Desktop layout works
  ✓ No horizontal scroll
  ✓ Touch targets ≥ 44px

□ Accessibility
  ✓ Keyboard navigation complete
  ✓ Focus order logical
  ✓ Screen reader compatible
  ✓ WCAG 2.1 AA compliant
  ✓ No flashing (< 3 Hz)

□ Performance
  ✓ Fonts load fast
  ✓ No render-blocking resources
  ✓ Images optimized
  ✓ CSS optimized
  ✓ JS minimal

□ Cross-browser
  ✓ Chrome/Edge
  ✓ Firefox
  ✓ Safari
  ✓ Mobile browsers
```

---

## Files Summary

### New Files to Create
```
apps/docs/src/
├── components/
│   ├── Sidebar.tsx
│   ├── Sidebar.css
│   ├── Breadcrumbs.tsx
│   ├── TableOfContents.tsx
│   ├── CodeBlock.tsx
│   ├── Table.tsx
│   ├── CardVariants.tsx
│   └── Illustrations/
│       ├── Leaf.tsx
│       ├── Organic.tsx
│       └── Pattern.svg
├── styles/
│   ├── accessibility.css
│   ├── typography.css
│   ├── cards.css
│   ├── code.css
│   ├── tables.css
│   ├── patterns.css
│   └── solarpunk.css
```

### Files to Modify
```
- packages/primitives/src/primitives.css (add focus, motion, buttons)
- packages/tokens/src/tokens.ts (add color tokens)
- apps/docs/src/App.tsx (add Google Fonts import)
- apps/docs/src/index.css (base styles)
- All 11 page files (spacing, aria-labels, styles)
```

---

## Success Criteria

By iteration 50+, the documentation site should have:

1. ✅ **Distinctive Typography**: Bricolage Grotesque + IBM Plex Mono throughout
2. ✅ **Solarpunk Aesthetic**: Warm colors (green, gold), organic shapes, retro-futuristic feel
3. ✅ **Full Accessibility**: WCAG 2.1 AA compliant, keyboard navigation, screen reader compatible
4. ✅ **Premium Polish**: Smooth transitions, clear focus states, consistent component states
5. ✅ **Docs-Style Layout**: Sidebar nav, TOC, breadcrumbs, max-width content
6. ✅ **Mobile Ready**: Responsive design, touch-friendly, performant
7. ✅ **Performance**: Fast loading, optimized assets, < 50KB JS
8. ✅ **Visual QA**: Professional appearance, consistent spacing/typography, clear hierarchy

---

This roadmap ensures systematic, measurable progress toward a Tailwind-docs-quality redesign with unique Solarpunk aesthetic.

