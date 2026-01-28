# Staple CSS Docs - Premium Design Specification
## ITER 47+: Complete Redesign for Tailwind Docs-Level Quality

**Target:** Transform current documentation to premium quality matching Tailwind/Bootstrap docs aesthetic, but uniquely Solarpunk.
**Framework:** Staple CSS components + tokens only
**Timeline:** ITER 47-50 (50+ iterations target)

---

## PART 1: CURRENT STATE AUDIT

### A. Typography Issues
- **Current:** Using default system fonts + inconsistent sizes
- **Problem:** No visual distinction, generic feel, lacks premium quality signal
- **Solution:** Implement **Bricolage Grotesque** (distinctive, retro-futuristic) + **Space Mono** for code

### B. Layout & Spacing Inconsistencies
- **Current:** Varying container widths, inconsistent padding, uneven rhythm
- **Problem:** Looks hand-stitched, not professional; spacing feels random
- **Solution:** Enforce strict spacing scale (use Staple tokens 0-8), consistent max-widths

### C. Color System Underutilized
- **Current:** Muted neutrals, limited accent usage, flat appearance
- **Problem:** Doesn't showcase Solarpunk aesthetic (warm, optimistic, organic)
- **Solution:** Implement warm palette: Sage Green (#2a7d52), Gold (#d4a574), Earth tones

### D. Navigation & Sidebar
- **Current:** Sidebar exists but lacks active state styling, breadcrumb spacing suboptimal
- **Problem:** User disorientation, poor information hierarchy
- **Solution:** Implement "Precision Rails" signature (gentle section dividers) + active indicator

### E. Code Blocks & Examples
- **Current:** Basic display, no copy button, generic styling
- **Problem:** Doesn't inspire confidence in code quality
- **Solution:** Add copy buttons, syntax highlighting, proper spacing

### F. Component Inconsistency
- **Current:** Mixed use of custom HTML + Staple components
- **Problem:** Maintenance burden, visual inconsistency
- **Solution:** Standardize on Staple components exclusively

### G. Responsive Behavior
- **Current:** Mobile nav exists but mobile UX is basic
- **Problem:** Doesn't feel intentional on small screens
- **Solution:** Proper mobile sidebar collapse, comfortable touch targets

---

## PART 2: DESIGN TOKENS DEFINITION

### Typography Tokens
```
// Load from Google Fonts
- Bricolage Grotesque (Display font): weights 200, 400, 600, 800
- Space Mono (Monospace): regular (code blocks)

// Scale (based on Staple's --st-font-size 0-6)
H1: 3.5rem (56px), weight 800, line-height 1.1
H2: 2.5rem (40px), weight 700, line-height 1.2
H3: 1.75rem (28px), weight 600, line-height 1.3
H4: 1.25rem (20px), weight 600, line-height 1.4
Body: 1rem (16px), weight 400, line-height 1.6
Caption: 0.875rem (14px), weight 400, line-height 1.5
Code: 0.9rem (14.4px), weight 400, fontFamily: Space Mono

// Contrast = interesting
Use weight extremes: 200 light vs 800 bold (not 400 vs 600)
Size jumps: 3x multiples where possible (not 1.5x increments)
```

### Color Palette (Solarpunk)
```
// Primary: Sage Green (growth, natural, optimistic)
--st-color-primary: #2a7d52 (dark sage for text/accents)
--st-color-primary-light: #4a9d72 (lighter for hover)
--st-color-primary-lighter: #a8d5ba (very light for backgrounds)

// Accent: Warm Gold (technical meets organic)
--st-color-accent: #d4a574 (warm gold)
--st-color-accent-dark: #b8885a (darker for interactive)

// Earth tones (supporting colors)
--st-color-earth-dark: #8b6f47 (warm brown)
--st-color-earth-light: #e8dcc8 (off-white/cream)

// Neutrals (maintained)
--st-color-text: #1a1a1a (near black)
--st-color-text-muted: #666666 (muted gray)
--st-color-bg: #ffffff (or #fafaf9 for warm off-white)

// Success/Warning/Danger (unchanged, from Staple)
--st-color-success: #22c55e
--st-color-warning: #eab308
--st-color-danger: #ef4444
```

### Spacing Scale (Staple Tokens)
```
--st-space-0: 0px
--st-space-1: 4px
--st-space-2: 8px
--st-space-3: 12px
--st-space-4: 16px (base unit)
--st-space-5: 20px
--st-space-6: 24px
--st-space-7: 32px
--st-space-8: 40px

// Page-level spacing rhythm
Section padding: space-8 vertical, space-6 horizontal
Card padding: space-4-6 (variable)
Component gap: space-2-3
```

### Radii (Staple Tokens)
```
--st-radius-0: 0px (sharp)
--st-radius-1: 4px (subtle)
--st-radius-2: 8px (standard)
--st-radius-3: 12px (generous)
--st-radius-4: 16px (large)

// Usage
Buttons: radius-1
Cards: radius-2
Large panels: radius-2 (not excessive)
Code blocks: radius-2
```

### Shadows (Solarpunk subtle)
```
--st-shadow-1: 0 1px 2px rgba(0,0,0,0.05)
--st-shadow-2: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)
--st-shadow-3: 0 10px 15px rgba(0,0,0,0.1)
--st-shadow-4: 0 20px 25px rgba(0,0,0,0.15)

// Usage
Hover cards: shadow-2
Modals: shadow-4
Nav (optional): shadow-1
Subtle depth: shadow-1
```

### Breakpoints (Staple or custom)
```
Mobile first (base):  0px
Tablet (md):          768px  --st-screen-md
Desktop (lg):         1024px --st-screen-lg
Wide (xl):            1280px --st-screen-xl
```

---

## PART 3: SIGNATURE STYLE CHOICE

### Selected: "Precision Rails"
**Why:** Reinforces the "technical contract" nature of staple-css while keeping organic feel.

**Implementation:**
- Subtle vertical section dividers (thin border-left) using sage green at low opacity
- Gentle horizontal rules between major content blocks
- Creates visual rhythm and guides eye through hierarchy
- Pairs well with Solarpunk organic aesthetic

**Visual application:**
```
Section dividers: 2px border-left, color: var(--st-color-primary), opacity: 0.2
Subsection: thin 1px top border in neutral gray (0.1 opacity)
Breadcrumb separator: · (middle dot) or / in primary color
```

---

## PART 4: COMPONENT SPECIFICATIONS

### 1. Navigation Bar (Sticky)
**Staple Components:** Container, Row, Text, Box
**Styling:**
- Height: 64px (comfortable touch target)
- Padding: space-3 horizontal, space-2 vertical
- Background: rgba(255, 255, 255, 0.95) (frosted glass effect, subtle)
- Border-bottom: 1px solid rgba(42, 125, 82, 0.1) (precision rail)
- Sticky positioning: top 0, z-index high
- Logo: Text weight 800, size 3, color primary

**States:**
- Hover on logo/links: slight color shift to accent (gold)
- Active link: underline (1.5px) in primary green
- Theme toggle: hover fills with primary-light

### 2. Sidebar Navigation
**Staple Components:** Column, Text, Box
**Styling:**
- Width: 240px (desktop), collapse to hamburger on tablet
- Background: var(--st-color-bg)
- Border-right: 1px solid rgba(42, 125, 82, 0.1) (precision rail)
- Padding: space-4 top/bottom, space-3 sides
- Max height: calc(100vh - nav-height), scrollable

**Items:**
- Font: Body weight 500
- Padding: space-2 vertical, space-3 horizontal
- Radius: radius-1
- Active state: background primary-lighter + left border 3px primary
- Hover: background-color slightly darker, no animation (respects prefers-reduced-motion)

**Mobile behavior:**
- Collapse to slide-out drawer on <768px
- Semi-transparent overlay behind drawer
- Animate in/out with transform (smooth, 150ms)

### 3. Main Content Area
**Staple Components:** Container, Column
**Styling:**
- Max-width: 700px for narrow (guides, documentation), 900px for reference
- Padding: space-6 horizontal, space-8 vertical
- Margin: 0 auto (centered)

**Subsections:**
- Margin-top: space-8 between major sections
- Margin-top: space-5 between subsections
- Border-top: 1px solid rgba(42, 125, 82, 0.1) (precision rail, faint)

### 4. Typography Components
**H1 (Page Title):**
- Font: Bricolage Grotesque 800, 56px
- Color: var(--st-color-text)
- Line-height: 1.1
- Margin-bottom: space-3
- Example: "Design Systems That Scale"

**H2 (Section Heading):**
- Font: Bricolage Grotesque 700, 40px
- Color: var(--st-color-text)
- Line-height: 1.2
- Margin-top: space-8, Margin-bottom: space-4
- Anchor link on hover (optional)

**H3 (Subsection):**
- Font: Bricolage Grotesque 600, 28px
- Color: var(--st-color-primary)
- Line-height: 1.3
- Margin-top: space-6, Margin-bottom: space-3

**Body:**
- Font: System sans (or maintain current), 16px, weight 400
- Line-height: 1.6
- Color: var(--st-color-text)
- Max-line-length: 70-80 characters (readable)

**Accent text (callouts, highlights):**
- Font: Bricolage Grotesque, weight 600, color primary or accent
- Usage: Inline emphasis, labels

**Code inline:**
- Font: Space Mono, 14px, regular
- Background: rgba(42, 125, 82, 0.1) (primary very light)
- Padding: 2px 6px
- Radius: radius-1
- Color: var(--st-color-earth-dark)

### 5. Code Blocks
**Staple Components:** Box, Row (for toolbar)
**Styling:**
- Background: #0d1117 (dark gray, not pure black for warmth)
- Foreground: #c9d1d9 (light gray)
- Padding: space-4
- Radius: radius-2
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Font: Space Mono, 14px, line-height 1.5
- Overflow: auto (horizontal scroll if needed)

**Toolbar (top-right):**
- Copy button: "Copy" → "Copied!" on click
- Styling: Text button, primary color on hover
- Position: absolute top-right inside block, padding space-2

**Line numbers:** Optional, subtle gray (not required for short examples)

### 6. Buttons
**Primary Button:**
- Background: var(--st-color-primary)
- Color: white
- Padding: space-2 vertical, space-4 horizontal
- Radius: radius-1
- Font-weight: 600
- Hover: background var(--st-color-primary-light), shadow-2
- Active: background darker (—primary with -20% brightness)
- Transition: 150ms

**Secondary Button:**
- Background: transparent
- Border: 1px solid var(--st-color-primary)
- Color: var(--st-color-primary)
- Hover: background var(--st-color-primary-lighter)
- Transition: 150ms

**Ghost Button:**
- Background: transparent
- Color: var(--st-color-primary)
- Hover: color var(--st-color-accent), underline 1px
- No border

### 7. Links
**Standard link:**
- Color: var(--st-color-primary)
- Text-decoration: none
- Border-bottom: 1px solid currentColor
- Hover: color var(--st-color-accent)
- Transition: 150ms
- Focus: outline 2px solid var(--st-color-primary), offset 2px

### 8. Cards (for examples, features, etc.)
**Staple Components:** Box, Column
**Styling:**
- Background: var(--st-color-bg) or rgba(168, 213, 186, 0.1) for accent
- Border: 1px solid rgba(42, 125, 82, 0.2) (precision rail)
- Radius: radius-2
- Padding: space-5
- Shadow: shadow-1
- Hover: shadow-2, slight border color intensify

**Interior:**
- Title: H4 (Bricolage 600, 20px)
- Description: Body text, muted tone
- CTA: Link or button at bottom

### 9. Tables
**Staple Components:** Box with HTML table inside
**Styling:**
- Width: 100%
- Border-collapse: collapse
- Font: Body, 14px
- Cell padding: space-3

**Header row:**
- Background: rgba(168, 213, 186, 0.1) (primary very light)
- Font-weight: 600
- Text color: var(--st-color-primary)
- Border-bottom: 2px solid var(--st-color-primary)

**Body rows:**
- Border-bottom: 1px solid rgba(0, 0, 0, 0.05)
- Hover: background rgba(42, 125, 82, 0.05) (subtle highlight)

**Alternating rows (optional):** Slightly darker background every other row

### 10. Alerts/Callouts
**Staple Components:** Box, Row
**Styling:**
- Padding: space-3 to space-4
- Radius: radius-2
- Border-left: 4px solid (colored based on type)
- Background: very light tint (10% opacity of color)

**Types:**
- Info (blue): border #3b82f6, background rgba(59, 130, 246, 0.1)
- Success (green): border #22c55e, background rgba(34, 197, 94, 0.1)
- Warning (yellow): border #eab308, background rgba(234, 179, 8, 0.1)
- Danger (red): border #ef4444, background rgba(239, 68, 68, 0.1)

**Interior:**
- Icon (left): 20px, same color as border
- Title: Weight 600, color same as border
- Description: Body text, muted tone

### 11. Breadcrumbs
**Staple Components:** Row, Text
**Styling:**
- Font: Body, 14px, weight 500
- Color: var(--st-color-text-muted)
- Separator: " / " or " · " in primary color
- Link hover: color var(--st-color-primary)
- Margin: space-1 top, space-3 bottom (already adjusted)
- Active item: color var(--st-color-text), weight 600

### 12. Tabs (if used)
**Staple Components:** Row, Box
**Styling:**
- Tabs container: border-bottom 1px solid rgba(0, 0, 0, 0.1)
- Tab items: padding space-2 horizontal, space-1 vertical
- Font: weight 500, 14px
- Hover: background rgba(42, 125, 82, 0.05)
- Active: color var(--st-color-primary), border-bottom 3px var(--st-color-primary)
- Transition: 150ms

---

## PART 5: IMPLEMENTATION ROADMAP

### ITER 47: Font System Setup
- [ ] Add Bricolage Grotesque + Space Mono to `apps/docs/public/index.html` via Google Fonts
- [ ] Update CSS variables: `--st-font-family-display: 'Bricolage Grotesque'`
- [ ] Update CSS variables: `--st-font-family-mono: 'Space Mono'`
- [ ] Test rendering on all pages

### ITER 48: Color System Upgrade
- [ ] Update Staple CSS token definitions to use Solarpunk palette
- [ ] Add CSS variables for primary (sage green), accent (gold), earth tones
- [ ] Update light/dark theme to use new palette
- [ ] Verify contrast ratios (WCAG AA minimum 4.5:1)

### ITER 49: Navigation & Layout Refinement
- [ ] Implement "Precision Rails" dividers (border-left on sections)
- [ ] Refine sidebar active state styling
- [ ] Improve breadcrumb spacing (already done, verify)
- [ ] Update nav styling: sticky, proper z-index, subtle shadow

### ITER 50: Typography & Spacing Standardization
- [ ] Apply Bricolage Grotesque to all headings (H1-H4)
- [ ] Enforce spacing scale across all pages
- [ ] Update container max-widths: narrow 700px, reference 900px
- [ ] Verify rhythm and hierarchy

### ITER 51: Component Styling
- [ ] Buttons: primary/secondary/ghost with proper states
- [ ] Cards: border, shadow, hover effects
- [ ] Code blocks: add copy button, proper styling
- [ ] Tables: proper spacing, alternating rows

### ITER 52: Responsive & Accessibility
- [ ] Mobile sidebar collapse
- [ ] Touch target validation (48px minimum)
- [ ] Focus state testing
- [ ] prefers-reduced-motion compliance

### ITER 53: Polish & QA
- [ ] Visual consistency audit
- [ ] Build & performance check
- [ ] Cross-browser testing
- [ ] Final spacing/alignment verification

---

## PART 6: CONCRETE CODE PATTERNS

### Font Loading (Add to index.html)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@200;400;600;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### CSS Variable Updates (styles.css)
```css
:root {
  /* Typography */
  --st-font-family-display: 'Bricolage Grotesque', sans-serif;
  --st-font-family-mono: 'Space Mono', monospace;

  /* Solarpunk Colors */
  --st-color-primary: #2a7d52;
  --st-color-primary-light: #4a9d72;
  --st-color-primary-lighter: #a8d5ba;
  --st-color-accent: #d4a574;
  --st-color-accent-dark: #b8885a;
  --st-color-earth-dark: #8b6f47;
  --st-color-earth-light: #e8dcc8;
}

[data-theme="dark"] {
  --st-color-primary: #4a9d72;
  --st-color-primary-light: #6bb387;
  --st-color-primary-lighter: #2a7d52;
  --st-color-bg: #0f1419;
  --st-color-surface: #1a1f26;
}
```

### H1 Styling (pages)
```tsx
<Text as="h1" size={5} weight="bold" style={{
  fontFamily: 'var(--st-font-family-display)',
  fontSize: '3.5rem',
  fontWeight: 800,
  lineHeight: 1.1,
  marginBottom: 'var(--st-space-3)'
}}>
  Design Systems That Scale
</Text>
```

### Precision Rails Divider (section)
```tsx
<Box style={{
  borderLeft: '2px solid rgba(42, 125, 82, 0.2)',
  paddingLeft: 'var(--st-space-4)',
  marginTop: 'var(--st-space-8)',
}}>
  {/* section content */}
</Box>
```

### Code Block with Copy
```tsx
<Box style={{
  background: '#0d1117',
  padding: 'var(--st-space-4)',
  borderRadius: 'var(--st-radius-2)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'relative'
}}>
  <button onClick={() => copyToClipboard(code)} style={{
    position: 'absolute',
    top: 'var(--st-space-2)',
    right: 'var(--st-space-2)',
    padding: 'var(--st-space-1) var(--st-space-2)',
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#c9d1d9',
    cursor: 'pointer',
    borderRadius: 'var(--st-radius-1)'
  }}>
    {copied ? 'Copied!' : 'Copy'}
  </button>
  <pre style={{ fontFamily: 'var(--st-font-family-mono)', color: '#c9d1d9' }}>
    {code}
  </pre>
</Box>
```

---

## PART 7: VISUAL QA CHECKLIST

- [ ] **Typography:** All headings use Bricolage Grotesque (distinctive, not generic)
- [ ] **Hierarchy:** Clear visual distinction between H1, H2, H3, body (size + weight)
- [ ] **Spacing:** Consistent rhythm (space-8 between sections, space-4 between subsections)
- [ ] **Alignment:** All elements left-aligned or centered intentionally, no random spacing
- [ ] **Color:** Solarpunk palette applied consistently (sage primary, gold accent, earth tones)
- [ ] **Contrast:** All text meets WCAG AA (4.5:1 minimum for body)
- [ ] **Precision Rails:** Subtle dividers visible on major sections
- [ ] **Sidebar:** Active state clearly visible, hover effects smooth
- [ ] **Navigation:** Sticky nav doesn't obscure content, proper z-index
- [ ] **Buttons:** Primary/secondary/ghost states distinct, hover effects present
- [ ] **Links:** Underline visible, color distinct from body text
- [ ] **Code blocks:** Copy button present, syntax readable, proper overflow handling
- [ ] **Responsive:** Navigation collapses on mobile, touch targets 48px+, readable on all sizes
- [ ] **Focus states:** Visible 2px outline with 2px offset on keyboard nav
- [ ] **Disabled states:** Gray out disabled elements with reduced opacity
- [ ] **Mobile:** Sidebar converts to hamburger, comfortable thumb reach

---

## PART 8: FILES TO MODIFY (by iteration)

### ITER 47 (Fonts)
- `apps/docs/public/index.html` - Add Google Fonts link
- `apps/docs/src/styles.css` - Add font-family CSS variables

### ITER 48 (Colors)
- `apps/docs/src/styles.css` - Update color palette
- `packages/tokens/src/tokens.ts` - Update Staple token definitions (if applicable)

### ITER 49 (Layout)
- `apps/docs/src/components/Sidebar.tsx` - Improve active state
- `apps/docs/src/components/Breadcrumb.tsx` - Update styling
- `apps/docs/src/App.tsx` - Add precision rails styling
- `apps/docs/src/styles.css` - Add section divider styles

### ITER 50 (Typography)
- `apps/docs/src/pages/*.tsx` - Update all H1-H3 to use Bricolage + new size scale
- `apps/docs/src/styles.css` - Normalize heading sizes

### ITER 51 (Components)
- `apps/docs/src/components/CodePreview.tsx` - Add copy button
- `apps/docs/src/styles.css` - Button/card/table/alert styling
- Various pages: Apply card/button patterns

### ITER 52 (Responsive)
- `apps/docs/src/App.tsx` - Mobile nav logic
- `apps/docs/src/styles.css` - Media query updates

### ITER 53 (QA)
- All files: Final polish and verification

---

## NEXT STEPS

1. **Review this specification** with the design/build vision
2. **Approve font choices:** Bricolage Grotesque + Space Mono + Sage Green + Gold palette
3. **Approve signature style:** "Precision Rails" (gentle dividers)
4. **Start ITER 47:** Font system setup (should be quick win)

---

**Document Status:** Ready for implementation
**Last Updated:** January 28, 2026
**Owner:** Design + Frontend Engineering
