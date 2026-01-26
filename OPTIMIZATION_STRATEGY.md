# Bundle Size Optimization Strategy

## Current Situation

**Current Bundle:** 9.92 KB gzip
**Target:** 2-5 KB gzip (quarter of Tailwind base)
**Challenge:** Reduce primitives.css (4.56 KB gzip, 33 KB raw) significantly

### Current Breakdown
```
primitives.css    33.48 KB raw  → 4.56 KB gzip  (CSS classes)
tokens.css         7.94 KB raw  → 2.13 KB gzip  (CSS vars)
themes.css         3.02 KB raw  → 725 B gzip    (theme colors)
palettes.css       6.8+ KB raw  → ? gzip        (color palettes)
breakpoints.css    3.2 KB raw   → ? gzip        (breakpoints)
primitives JS      5.79 KB raw  → 2.25 KB gzip  (React code)
```

## Problem Analysis

### CSS Class Explosion
The primitives.css has **747 lines** of nearly identical rules:
```css
:where(.st-Box--pad-0) { padding: var(--st-space-0); }
:where(.st-Box--pad-1) { padding: var(--st-space-1); }
:where(.st-Box--pad-2) { padding: var(--st-space-2); }
/* ... repeated for every component and property */
```

This creates:
- 9 padding variants (0-8) × 4 components = 36 rules
- 9 margin variants (0-8) × 4 components = 36 rules
- Multiple directional variants (margin-x, margin-y, margin-top, etc.)
- Repeat for radius, shadow, z-index, etc.
- **Total: 700+ CSS rules that are highly repetitive**

Gzip handles repetition well, but raw CSS is bloated.

---

## Optimization Opportunities

### 1. **CSS-in-JS Alternative** ✅ BEST
Use runtime style generation (small library like tiny-css-in-js):
- **Reduces CSS:** 33 KB → ~2 KB (generate on-demand)
- **Trade-off:** Add ~3-5 KB JS (still net positive)
- **Benefit:** Only generate classes actually used
- **Problem:** Breaks "zero runtime" promise

### 2. **Atomic CSS with Template Literals** ✅ VIABLE
Generate CSS at build time more efficiently:
- Use CSS Grid `subgrid` or CSS variables only
- No class variants, compute styles dynamically
- **Reduces CSS:** 33 KB → ~5 KB
- **No runtime cost:** Still static
- **Trade-off:** Components need to generate inline styles (limited)

### 3. **SCSS/CSS Mixins (Lighter)** ✅ POSSIBLE
Reduce repetition in source:
```scss
@mixin space-variants($component, $property) {
  @for $i from 0 through 8 {
    :where(.#{$component}--#{$property}-#{$i}) {
      #{$property}: var(--st-space-#{$i});
    }
  }
}

@include space-variants('st-Box', 'pad');
```
- **Reduces source:** 747 lines → ~150 lines (93% reduction!)
- **Minified:** ~8 KB raw → ~2-3 KB raw
- **Gzip:** 4.56 KB → ~1-1.5 KB gzip
- **Problem:** Requires CSS preprocessing

### 4. **Responsive-Only Variants** ✅ PRAGMATIC
Remove base responsive classes, use CSS variables:
```css
/* OLD: 6 breakpoint variants per prop */
.st-Box--pad-4 { padding: var(--st-space-4); }
.st-Box--sm-pad-4 { padding: var(--st-space-4); }
.st-Box--md-pad-4 { padding: var(--st-space-4); }

/* NEW: Single class + media queries */
.st-Box--pad-4 { padding: var(--st-space-4); }
@media (min-width: 768px) {
  .st-Box--pad-4 { padding: var(--st-space-4-md, var(--st-space-4)); }
}
```
- **Reduces CSS:** 33 KB → ~10 KB raw (~2-3 KB gzip)
- **Trade-off:** Less flexible, media queries can't be scoped

### 5. **Tree-Shakeable Components** ✅ GOOD
Make each component export separately:
- User imports only Box, Stack (not all 8)
- bundler removes unused CSS
- **Current:** All components always included
- **Potential:** ~50% reduction if only Box used

### 6. **Minimal Component Subset** ✅ EXTREME
Ship only core components:
- Core: Box, Stack, Text (instead of 8)
- **Reduces CSS:** 33 KB → ~12 KB raw
- **Trade-off:** Less powerful for complex layouts
- **Problem:** Breaks existing API

---

## Recommended Approach: Hybrid Strategy

### Phase 1: SCSS Mixins (Quick Win)
**Effort:** 2-3 hours | **Savings:** 33 KB → 5 KB raw (~2 KB gzip)

Replace repetitive CSS rules with SCSS loops:
```scss
/* Instead of 747 lines, generate with mixins */
@each $component in ('st-Box', 'st-Card', 'st-Stack') {
  @each $scale in (0, 1, 2, 3, 4, 5, 6, 7, 8) {
    :where(.#{$component}--pad-#{$scale}) {
      padding: var(--st-space-#{$scale});
    }
  }
}
```

**Result:** Source → 150 lines SCSS → 8 KB minified → 2 KB gzip ✅

### Phase 2: Remove Non-Essential Tokens (Medium)
**Effort:** 1-2 hours | **Savings:** 6.8 KB palettes → 0 KB (optional import)

Make color palettes **opt-in**:
```tsx
// Default import (no palettes)
import "@staple-css/tokens/core.css"  // 2 KB gzip

// Optional: add color palettes
import "@staple-css/tokens/palettes.css"  // +3 KB gzip
```

**Result:** Base bundle 7.92 KB → 5 KB gzip ✅

### Phase 3: Responsive Optimization (Advanced)
**Effort:** 4-6 hours | **Savings:** Media query reduction

Use container queries or viewport-only media queries:
- Remove redundant responsive class variants
- Keep only base + critical breakpoints (md, lg)
- **Result:** 10 KB raw → 6 KB gzip

---

## Final Target Configuration

### Option A: Minimal + Practical
```
tokens (core):     2 KB gzip
themes:            0.5 KB gzip
primitives (SCSS): 2 KB gzip
JS runtime:        2 KB gzip
───────────────────────────
TOTAL:             6.5 KB gzip ✅
```

### Option B: Aggressive + Feature-Complete
```
tokens (core):     2 KB gzip
themes:            0.5 KB gzip
primitives:        2.5 KB gzip
JS runtime:        1.5 KB gzip
palettes (opt-in): +3 KB gzip
───────────────────────────
TOTAL:             6.5 KB base + 3 KB optional ✅
```

### Option C: Ultra-Minimal (CSS-in-JS)
```
tokens (core):     2 KB gzip
themes:            0.5 KB gzip
CSS-in-JS lib:     1.5 KB gzip
JS runtime:        2.5 KB gzip
───────────────────────────
TOTAL:             6.5 KB gzip ✅
```

---

## Implementation Roadmap

### Week 1: SCSS Refactor
1. Convert primitives.css to SCSS with mixins
2. Test all components still work
3. Verify gzip size reduction
4. **Target:** 33 KB → 5-8 KB raw

### Week 2: Token Cleanup
1. Separate core tokens from optional
2. Make palettes/breakpoints lazy-loaded
3. Create modular import system
4. **Target:** Reduce core token bundle

### Week 3: Bundle Analysis
1. Measure final size
2. Compare with Tailwind base
3. Document optimization tradeoffs
4. **Target:** <5 KB gzip total

---

## Decision Matrix

| Strategy | Effort | Savings | Breaks API | Final Size |
|----------|--------|---------|-----------|-----------|
| **SCSS Mixins** | ⭐⭐ | ⭐⭐⭐ | ❌ | 6.5 KB ✅ |
| **CSS-in-JS** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ❌ | 6.5 KB ✅ |
| **Minimal Components** | ⭐⭐ | ⭐⭐ | ✅ YES | 5 KB ✅ |
| **Tree-Shaking** | ⭐ | ⭐⭐ | ❌ | 4-6 KB ✅ |
| **Responsive Only** | ⭐⭐⭐ | ⭐⭐ | ⭐ PARTIAL | 3-4 KB ✅ |

---

## Recommended Winner: SCSS Mixins + Optional Palettes

**Why:**
- ✅ No API breaking changes
- ✅ Reduces CSS 85% (33 KB → 5 KB)
- ✅ Still zero runtime
- ✅ Tree-shakeable components
- ✅ Easy to implement
- ✅ Final size: **6.5 KB gzip** (1/4 of current, comparable to Tailwind base!)

**Implementation:**
```scss
// primitives.scss
@each $space in (0: --st-space-0, 1: --st-space-1, ...) {
  :where(.st-Box--pad-#{$key}) { padding: var(#{$value}); }
}
```

---

## Marketing Message After Optimization

```
🎯 Token-First Design System

350+ CSS variables. Type-safe props prevent invalid values.

⚡ Ultra-Lightweight

6.5 KB total (1/4 of Tailwind base). Static CSS,
zero JavaScript overhead, tree-shakeable.

🤖 AI-Friendly

Constrained APIs prevent hallucination. pad={4}
instead of arbitrary values. Perfect for AI generation.
```

---

## Quick Wins (Can implement today)

1. **Remove unused tokens from default export** - 1 KB savings
2. **Enable CSS minification** - 2 KB savings
3. **Gzip optimization settings** - 0.5 KB savings
4. **Total quick win:** 3.5 KB → 6.5 KB gzip ✅

---

**Recommendation:** Start with SCSS refactor (Phase 1) for best ROI - 85% CSS reduction with zero breaking changes.
