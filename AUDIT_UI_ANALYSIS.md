# UI Audit - Staple CSS Documentation Site
*Generated: Ralph Loop Iteration 1*

## Current State Summary
- **11 documentation pages** with consistent token-first approach
- **Typography**: Reliable sizing scale (size={0}→size={6}), no custom fonts
- **Spacing**: Good use of token variables, some inconsistencies in padding/margins
- **Components**: Heavy use of primitives (Container, Column, Row, Grid, Box, Text, Card)
- **Accessibility**: Solid foundation, but **missing focus states** and keyboard event handling
- **Styling**: Mix of inline styles + 8 CSS files, left-border accent pattern consistent

## Critical Issues to Address

### 1. Typography (MAJOR)
- [ ] All pages using default/generic font (system font stack)
- [ ] No distinctive typography choice
- [ ] Font size jumps inconsistent (not 3x+ contrast recommended)
- [ ] No font-weight extremes (should be 100/200 vs 800/900)
- [ ] Gradient text reduces readability

**Target**: Pick ONE distinctive font pair + implement consistently

### 2. Accessibility (HIGH)
- [ ] No visible focus states (`:focus` outlines missing on all components)
- [ ] Motion animations run without `prefers-reduced-motion` checks
- [ ] onMouseEnter/Leave without keyboard equivalents
- [ ] Icon-only elements lack aria-labels
- [ ] Disabled states not obviously distinguishable

**Target**: Full keyboard navigation, focus indicators, motion respect

### 3. Layout & Hierarchy (MEDIUM)
- [ ] No clear "docs-site" architecture (no sidebar, no TOC, no breadcrumbs)
- [ ] Spacing inconsistent between pages (some use gap={8}, others gap={4})
- [ ] No maximum line-width for readability (text can stretch full-width)
- [ ] Hero sections vary in approach (some gradients, some not)

**Target**: Consistent docs-style layout across all pages

### 4. Signature Style (LOW)
- [ ] No distinctive visual identity
- [ ] Gradient text on headings used but inconsistently applied
- [ ] No clear "design language" (Solarpunk aesthetic not present)
- [ ] Colors default to primary/success/danger without warmth

**Target**: Implement Solarpunk aesthetic (greens, golds, organic shapes, retro-futuristic)

### 5. Component Polish (MEDIUM)
- [ ] Buttons lack hover/active state animations
- [ ] Form inputs no visible focus styling
- [ ] Cards have basic styling, no depth/elevation system
- [ ] Transitions not standardized (mix of 0.2s, none shown)
- [ ] Border radius scale not emphasized visually

**Target**: Consistent, polished component states across entire site

---

## Accessibility Audit Results

| Issue | Impact | Pages Affected | Priority |
|-------|--------|----------------|----------|
| Missing focus states | Keyboard navigation broken | ALL 11 | CRITICAL |
| Motion without prefers-reduced-motion | Accessibility violation | VisualsPage, HomePage | HIGH |
| onMouseEnter/Leave without keyboard | Mobile/keyboard unusable | HomePage, ComponentPatternsPage | HIGH |
| No aria-labels on icons | Screen reader blind spots | 9+ pages | MEDIUM |
| Color contrast not verified | WCAG AA risk | All with muted tones | MEDIUM |
| Disabled states subtle | Unclear state to users | ComponentPatternsPage, ExamplesPage | LOW |

---

## Typography Observation

### Current: Generic Font Stack
```css
font-family: system-ui, -apple-system, sans-serif; /* default */
```

### Needed: Distinctive Choice
The prompt specifies avoiding Inter, Roboto, Open Sans, Lato.
Suggested distinctive options:
- **Startup aesthetic**: Satoshi, Clash Display, Cabinet Grotesk
- **Technical aesthetic**: IBM Plex, JetBrains Mono, Fira Code
- **Editorial aesthetic**: Playfair Display, Crimson Pro, Fraunces
- **Retro-futuristic (Solarpunk)**: Newsreader, Obviously, Bricolage Grotesque

### Recommendation for Solarpunk
Use **Bricolage Grotesque** (variable, warm, distinctive) paired with **IBM Plex Mono** for code.
- Bricolage: Warm, organic geometry, retro-futuristic
- IBM Plex Mono: Technical precision, warm neutrals
- This creates the "Solarpunk + technical" vibe

---

## Spacing Consistency Report

### Inconsistencies Found
- HomePage: Section padding 80-120px, gap={6}→gap={8}
- WhyPage: Section gaps gap={4}, padding varies
- GuidesPage: Super tight (20px margin-bottom), gap not centered
- TokenReferencePage: Hard-coded grid (150px|200px|1fr) breaks responsiveness

### Standardization Needed
```
Spacing Scale (using --st-space-*):
- Hero section: var(--st-space-8) vertical, var(--st-space-6) horizontal
- Section gap: var(--st-space-8)
- Subsection gap: var(--st-space-5)
- Component gap: var(--st-space-4)
- Item gap: var(--st-space-2) to var(--st-space-3)
- Card padding: var(--st-space-4) to var(--st-space-5)
- Button padding: var(--st-space-3) var(--st-space-4)
```

---

## Component Consistency Report

### Inventory
| Component | Usage | Consistency | State Handling |
|-----------|-------|-------------|----------------|
| Container | 11/11 pages | ✓ Consistent size prop | N/A |
| Column | 11/11 pages | ✓ Consistent gap usage | N/A |
| Row | 10/11 pages | ✓ Mostly consistent | Missing focus |
| Grid | 8/11 pages | ~ Varied grid templates | Missing focus |
| Button | 4/11 pages | ✗ Mix of styles | Missing hover/focus |
| Text | 11/11 pages | ✓ Consistent sizing | ✓ Tone prop good |
| Card | 6/11 pages | ~ Inconsistent padding | Missing hover states |
| Icon badges | 8/11 pages | ✓ 28-36px consistent | Missing focus |

### Component States Missing
- Focus outline (`:focus-visible`)
- Disabled visual state
- Active/pressed state
- Loading state
- Error state

---

## Color System Analysis

### Semantic Colors (Present)
- Primary: Blue (#3b82f6)
- Success: Green
- Danger: Red
- Warning: Amber
- Neutral: Gray

### Solarpunk Addition Needed
**Warm palette** (greens, golds, earth tones):
- Primary accent: Deep forest green (#2a7d52)
- Secondary accent: Gold/amber (#d4a574)
- Organic green: Sage (#9db4a8)
- Warm white: Cream (#f5f1e8)
- Retro future: Electric lime (#b4d61e)

---

## Next Steps for Ralph Loop

### Phase 1: Foundation (Iteration 1-5)
1. Choose typography pair and load from Google Fonts
2. Define Solarpunk color palette additions
3. Create CSS for focus states, disabled states
4. Audit and fix all motion (prefers-reduced-motion)
5. Add aria-labels to icon elements

### Phase 2: Layout (Iteration 6-15)
6. Redesign page structure (sidebar nav, TOC, breadcrumbs)
7. Add max-width and line-height for readability
8. Standardize section spacing across all pages
9. Create consistent component state styling
10. Build docs-style navigation

### Phase 3: Components (Iteration 16-30)
11. Polish all button variants (primary, secondary, ghost, icon)
12. Style form inputs with focus states
13. Create card hierarchy (simple, featured, highlighted)
14. Implement interactive states (hover, active, loading)
15. Build code block styling (copy button, syntax highlighting)

### Phase 4: Signature Style (Iteration 31-40)
16. Apply Solarpunk aesthetic across pages
17. Add organic shapes/illustrations
18. Implement pattern backgrounds
19. Create visual depth system
20. Build component showcase page

### Phase 5: Polish (Iteration 41-50)
21. Mobile responsiveness audit
22. Accessibility full sweep
23. Performance optimization
24. Cross-browser testing
25. Final visual QA checklist

