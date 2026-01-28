# Staple CSS Docs - Redesign Audit & Design System

## 1. Current UI Issues (Bullets)

### Spacing & Layout
- [ ] Inconsistent section padding across pages (60px, 80px, 100px, 120px)
- [ ] Content max-width (90ch) is not responsive to all screen sizes
- [ ] Gap between sections not standardized (should use space-6/7/8 tokens)
- [ ] Sidebar section gaps were too large (fixed: reduced from gap-6 to gap-4)
- [ ] TOC right whitespace removed (fixed: adjusted padding and margins)

### Typography
- [ ] No clear typographic hierarchy (weights don't contrast enough)
- [ ] Body text lacks line-height optimization
- [ ] Heading sizes don't follow a clear scale
- [ ] Code blocks have inconsistent styling across pages
- [ ] Link styling inconsistent (some have underlines, some don't)

### Component Consistency
- [ ] Buttons: No unified styling (custom per page)
- [ ] Cards: Inconsistent padding and shadow usage
- [ ] Tables: Multiple custom table implementations
- [ ] Callouts/alerts: Different styling per page
- [ ] Code blocks: 8+ different CSS implementations

### Colors
- [ ] 215+ hardcoded RGBA values (should use tokens)
- [ ] Inconsistent color usage across pages
- [ ] Dark mode not consistently applied
- [ ] Primary color hover states undefined
- [ ] Semantic color tokens not fully utilized

### Navigation & Layout
- [ ] Two sidebar implementations (Sidebar.tsx and SidebarNav.tsx) - needs consolidation
- [ ] Sidebar icons now removed (fixed)
- [ ] Header padding inconsistent at mobile breakpoints (partially fixed)
- [ ] Mobile nav not optimized

### Responsive Design
- [ ] Breakpoints inconsistent (1024px, 768px, 640px, 480px mixed usage)
- [ ] Grid systems hardcoded (.grid-2, .grid-3, .grid-4) instead of using Container/Grid components
- [ ] No intrinsic responsive patterns (auto-fill/minmax)
- [ ] Mobile menu behavior not optimal

### Code Quality
- [ ] 8 page-specific CSS files (HomePage.css, TokensPage.css, etc.)
- [ ] styles.css is 1,200+ lines (should be consolidated)
- [ ] Inline styles in React components (App.tsx)
- [ ] Not using Staple primitives consistently

### Accessibility
- [ ] Focus states not consistently styled
- [ ] Contrast ratios need verification
- [ ] Keyboard navigation not fully tested
- [ ] prefers-reduced-motion not respected everywhere
- [ ] ARIA labels missing on some interactive elements

---

## 2. Design Tokens (Staple CSS Available)

### Spacing Scale (0-8)
```
0: 0
1: 4px
2: 8px
3: 12px
4: 16px
5: 24px
6: 32px
7: 48px
8: 64px
```
**Usage:** Padding, margins, gaps, section spacing

### Typography Scale (Sizes 0-6)
```
0: 12px (xs)
1: 14px (sm)
2: 16px (base)
3: 18px (lg)
4: 20px (xl)
5: 24px (2xl)
6: 32px (3xl)
```
**Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

**Recommended Hierarchy:**
- H1: size-6, weight-700 or 800
- H2: size-5, weight-700
- H3: size-4, weight-600
- H4: size-3, weight-600
- Body: size-2, weight-400, line-height relaxed
- Small: size-1, weight-400

### Radius Scale (0-4)
```
0: 0 (sharp)
1: 2px
2: 4px (default)
3: 8px (cards)
4: 16px (large)
```

### Shadow Scale (0-5)
```
1: Subtle (borders, dividers)
2: Standard (cards)
3: Strong (hover states)
4-5: Maximum elevation (popovers, modals)
```

### Color Tokens (Semantic)

**Light Mode:**
- `--st-color-background`: #ffffff
- `--st-color-surface`: #f9fafb (raised surfaces)
- `--st-color-text`: #111827 (primary text)
- `--st-color-text-muted`: #6b7280 (secondary text)
- `--st-color-border`: #e5e7eb
- `--st-color-primary`: #2563eb
- `--st-color-danger`: #dc2626
- `--st-color-warn`: #d97706
- `--st-color-success`: #16a34a

**Dark Mode:**
- `--st-color-background`: #111827
- `--st-color-surface`: #1f2937
- `--st-color-text`: #f9fafb
- `--st-color-text-muted`: #9ca3af
- And corresponding dark variants...

### Duration & Easing
```
fast: 150ms
normal: 200ms
slow: 500ms
easing-default: cubic-bezier(0.4, 0, 0.2, 1)
```

---

## 3. Component Specification

### Navigation Components

**Header (`.app-header`)**
- Fixed/sticky at top
- Height: auto (determined by content + padding)
- Padding: space-4 desktop, space-2 mobile
- Shadow: subtle (shadow-1)
- Container: size="xl"
- Layout: 3-column grid (logo, search, buttons)

**Sidebar Navigation (`.sidebar-nav`)**
- Sticky at left
- Width: 250px (flex-shrink: 0)
- Sections with gap: space-4
- Section title: size-0, weight-semibold, uppercase
- Menu items: size-1, weight-normal/semibold
- Active indicator: left border + primary color
- Responsive: hide at 1024px breakpoint

**Breadcrumb**
- Font: size-0 or size-1
- Separator: "/"
- Active: primary color
- Inactive: text-muted

---

### Layout Components

**Container**
- Uses Staple `<Container />` component
- Size: "lg" default (readable width)
- Padding: responsive (space-8 desktop, space-6 tablet, space-4 mobile)

**Main Content Area**
- Max-width: 90ch (prose width)
- Padding: inherited from Container
- Line-height: relaxed (1.75)

**Page Sections**
- Top margin: space-8 (first section: space-0)
- Bottom margin: space-8
- Internal padding: inherited

---

### Typography Components

**Headings**
- H1: size-6, weight-700/800, margin-top: space-0, margin-bottom: space-3
- H2: size-5, weight-700, border-bottom: 2px primary, padding-bottom: space-2, margin-bottom: space-4
- H3: size-4, weight-600, margin-bottom: space-3
- H4: size-3, weight-600, margin-bottom: space-2

**Body Text**
- Size: size-2
- Weight: 400
- Line-height: relaxed (1.75)
- Color: text

**Code**
- Inline: `<code>` with background surface, border 1px, radius-1, color primary
- Block: `<pre>` with background surface, padding space-4, radius-2

---

### Interactive Components

**Buttons**
- Primary: background-primary, text-white, padding space-3 space-6, radius-2
- Secondary: background-surface, border primary, text-primary
- Ghost: no background, text-primary, underline on hover
- Sizes: sm (space-2 space-4), md (space-3 space-6), lg (space-4 space-8)
- States: hover (translateY -1px), active (no transform), disabled (opacity-50)

**Links**
- Color: primary
- Underline: thin 1px, opacity-30
- Hover: opacity-100, primary-hover color
- Focus: outline 2px primary, offset 2px

**Cards**
- Padding: space-5
- Radius: radius-3
- Shadow: shadow-2
- Border: 1px border-muted
- Hover: shadow-3, slight translateY -2px

**Callouts/Alerts**
- Padding: space-4 space-5
- Border-left: 4px solid (color by type)
- Background: color-surface with gradient
- Radius: radius-2

---

### Form Components

**Inputs**
- Height: 40px (control-height)
- Padding: space-3 space-4
- Border: 1px border
- Radius: radius-2
- Focus: outline 2px primary

**Selects**
- Same as inputs
- Arrow: right-aligned

**Toggles/Checkboxes**
- Size: 20x20px
- Radius: radius-1
- Focus: outline 2px

---

## 4. Current Component Usage

### Staple Components Used ✓
- `<Container />`
- `<Row />`, `<Column />`
- `<Text />`
- `<Box />`

### Staple Components NOT Used (Should Migrate) ✗
- `<Grid />` - using custom .grid-2/3/4
- `<Card />` - building custom divs
- Custom buttons - should use Staple-compatible styling
- Custom tables - should use Grid + semantic HTML
- Custom forms - should use Staple typography + tokens

---

## 5. Design Token Recommendations

### Spacing Strategy
**Padding/Margins:**
- Component internals: space-3, space-4 (12px, 16px)
- Section gaps: space-6, space-7, space-8 (32px, 48px, 64px)
- List items: space-2, space-3 (8px, 12px)

**Example:**
```tsx
<Box pad={{ base: 4, md: 6, lg: 8 }}>
  Content with responsive padding
</Box>
```

### Typography Strategy
**Hierarchy:**
- Display: size-6 weight-800 (32px)
- Section: size-5 weight-700 (24px)
- Subsection: size-4 weight-600 (20px)
- Body: size-2 weight-400 (16px)
- Small: size-1 weight-400 (14px)

**Example:**
```tsx
<Text as="h1" size={6} weight="bold">
  Main Title
</Text>
<Text size={2} tone="muted" leading="relaxed">
  Body paragraph with good readability
</Text>
```

### Color Strategy
**Semantic Usage:**
- `tone="primary"` - for interactive elements
- `tone="muted"` - for secondary text
- `tone="danger"` - for warnings/errors
- No hardcoded colors - use tone prop or CSS variables

**Example:**
```tsx
<Text tone="primary">Important text</Text>
<Card tone="neutral" shadow={2}>
  Card content
</Card>
```

### Motion Strategy
- Hover transitions: `normal` (200ms)
- State changes: `fast` (150ms)
- Page transitions: `slow` (500ms)
- Easing: `default` for standard, `in`/`out` for emphasis

---

## 6. Solarpunk Aesthetic Implementation

### Color Palette (for custom accents)
- Primary: Warm green (#2d9a6f → #2563eb override with warm tones)
- Secondary: Gold/amber (#f59e0b)
- Accent: Lime green (#84cc16)
- Neutral: Warm grays (current tokens work well)

### Aurora Edge Signature Style
- Gradient wash at edges: green → amber → lime
- Opacity: 0.03
- Blur: 40px
- Animation: 15s loop
- Only on hero sections + prominent cards
- Respects prefers-reduced-motion

### Typography
- Display font: Bricolage Grotesque (already loaded)
- Weights: 200, 400, 600, 700, 800 (extreme contrast)
- Use 200 vs 800, not 400 vs 600

---

## 7. Verification Checklist

- [ ] All spacing uses tokens (no hardcoded px values)
- [ ] All colors use token variables (no hardcoded #hex or rgb)
- [ ] All sizes use token sizes (Typography scale 0-6)
- [ ] All radii use token scale (0-4)
- [ ] All shadows use token scale (0-5)
- [ ] All durations use token values (fast/normal/slow)
- [ ] Buttons have consistent styling across all pages
- [ ] Dark/light mode works on all pages
- [ ] Responsive breakpoints consistent (1024px primary, 768px secondary)
- [ ] Focus states visible and high-contrast
- [ ] Keyboard navigation functional
- [ ] prefers-reduced-motion respected
- [ ] Contrast ratios WCAG AA minimum
- [ ] Mobile touch targets 44px+
- [ ] Typography hierarchy clear
- [ ] No orphaned CSS files

---

## 8. Implementation Priority

### Phase 1: Foundation (Immediate)
1. Consolidate spacing (use only space-4/5/6/7/8)
2. Replace inline styles in App.tsx
3. Remove hardcoded colors (use tokens)
4. Fix responsive padding per breakpoint

### Phase 2: Components (Short-term)
1. Refactor buttons using Staple patterns
2. Update all cards to use Staple Card
3. Create reusable callout component
4. Consolidate table styling

### Phase 3: Pages (Medium-term)
1. HomePage: Refactor to Box/Column/Row
2. TokensPage: Use Grid component
3. ColorSystemPage: Use Card + Grid
4. All other pages: Consistent spacing + typography

### Phase 4: Polish (Long-term)
1. Apply Aurora Edge signature style
2. Add micro-interactions (hover/focus)
3. Implement dark mode refinements
4. Performance optimization

---

## 9. Files to Create/Modify

### New Files
- `patterns.css` - Reusable pattern library
- `CSS_ARCHITECTURE.md` - CSS organization guide
- `COMPONENT_PATTERNS.md` - Component usage patterns

### Modify (High Priority)
- `App.tsx` - Remove inline styles
- `styles.css` - Consolidate, replace RGBA values
- All page CSS files - Minimize/consolidate
- SidebarNav.tsx - Already updated

### Delete (Consolidate)
- `Sidebar.tsx` / `Sidebar.css` (duplicate implementation)
- Individual page CSS files (move to global patterns)

---

## 10. Quick Wins Already Completed
- ✅ Removed massive white space (margin-left calculation)
- ✅ Fixed menu spacing (reduced gaps)
- ✅ Removed sidebar icons (simplified)
- ✅ Fixed TOC right whitespace

---

**Next Steps:** Begin Phase 1 implementation with spacing standardization and color token replacement.
