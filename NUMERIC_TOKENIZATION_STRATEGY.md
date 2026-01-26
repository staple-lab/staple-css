# Numeric Tokenization Strategy

**Status**: Planned and Architected
**Scope**: Ensure ALL numeric values are tokens with core defaults provided

## Problem Statement

Currently, numeric values throughout the system are sometimes hardcoded:
- Font sizes: "12px", "14px", "16px" instead of `var(--st-font-size-0)`
- Line heights: "1.5" instead of `var(--st-line-height-normal)`
- Border widths: "2px" instead of `var(--st-border-width-2)`
- Font weights: "600" instead of using weight tokens

**User Feedback**: "All values that are numbers must become tokens. The token studio should handle it and there should be core defaults for all of them."

## Solution Architecture

### Phase 1: Catalog All Numeric Values

1. **Already Tokenized (Complete)**
   - Space (padding, margin, gap): 0-8 scale ✅
   - Radius (border-radius): 0-4 scale ✅
   - Shadow (box-shadow): 0-5 scale ✅
   - Colors: Semantic + palettes ✅
   - Duration: instant-slowest ✅
   - Easing: 15+ curves ✅

2. **Partially Tokenized (Some coverage)**
   - Font Size: 0-6 scale exists, but "14px" sometimes hardcoded ⚠️
   - Font Weight: 4 values exist, but "600" sometimes hardcoded ⚠️
   - Line Height: 3 values (tight, normal, relaxed) ⚠️
   - Display: Values exist as strings ⚠️
   - Position: Values exist as strings ⚠️

3. **Missing Token Scales (New)**
   - Font Size (px values): Need token variable names
   - Line Height (numeric values): Need decimals as token references
   - Border Widths (px values): Need scale 0-8px
   - Outline Width (px values): Need scale 0-8px
   - Font Weights (numeric): Need token references

### Phase 2: Extend Token System

**Update CSS Variable Exports**

```css
/* Font sizes with variable names */
--st-font-size-0: 0.75rem;   /* 12px */
--st-font-size-1: 0.875rem;  /* 14px */
--st-font-size-2: 1rem;      /* 16px */
--st-font-size-3: 1.125rem;  /* 18px */
--st-font-size-4: 1.25rem;   /* 20px */
--st-font-size-5: 1.5rem;    /* 24px */
--st-font-size-6: 2rem;      /* 32px */

/* Font weights as tokens */
--st-font-weight-normal: 400;
--st-font-weight-medium: 500;
--st-font-weight-semibold: 600;
--st-font-weight-bold: 700;

/* Line heights as tokens */
--st-line-height-tight: 1.25;
--st-line-height-normal: 1.5;
--st-line-height-relaxed: 1.75;

/* Border/outline widths */
--st-border-width-0: 0;
--st-border-width-1: 1px;
--st-border-width-2: 2px;
--st-border-width-3: 3px;
--st-border-width-4: 4px;

/* Outline offsets */
--st-outline-offset-0: 0;
--st-outline-offset-1: 1px;
--st-outline-offset-2: 2px;

/* Letter spacing */
--st-letter-spacing-tighter: -0.05em;
--st-letter-spacing-tight: -0.025em;
--st-letter-spacing-normal: 0;
--st-letter-spacing-wide: 0.025em;
--st-letter-spacing-wider: 0.05em;
--st-letter-spacing-widest: 0.1em;
```

### Phase 3: Token Studio Updates

**Add Numeric Value Editor**

1. **Generic Numeric Slider Component**
   ```tsx
   interface NumericTokenEditorProps {
     tokens: Record<string, number | string>;
     onUpdate: (key: string, value: number | string) => void;
     type: "px" | "unitless" | "em" | "percent" | "ms";
     min?: number;
     max?: number;
     step?: number;
     presets?: Record<string, number | string>; // common values
   }
   ```

2. **Numeric Scales Section in Token Studio**
   - Font Weights: 100, 200, 300, 400, 500, 600, 700, 800, 900
   - Line Heights: 0.8, 1, 1.2, 1.5, 1.75, 2
   - Letter Spacing: -0.1em to +0.2em range
   - Z-Index: 0, 10, 20, 30, 40, 50, max
   - Opacity: 0-1 or 0-100%
   - Delays: 0ms to 1000ms

3. **Core Defaults Page**
   - Show all token categories with default values
   - Allow override individual values
   - Visual scale representation
   - Preview of how values appear

### Phase 4: Documentation & Examples

1. **Update All Examples**
   - HomePage.tsx: Use font-size tokens
   - ExamplesPage.tsx: Already fixed ✅
   - EnhancedComponentExplorer.tsx: Already fixed ✅
   - InteractivePlayground.tsx: Already fixed ✅

2. **CSS Code Examples**
   ```css
   /* Good */
   button {
     padding: var(--st-space-3) var(--st-space-4);
     font-size: var(--st-font-size-1);
     font-weight: var(--st-font-weight-semibold);
     line-height: var(--st-line-height-normal);
     border-radius: var(--st-radius-2);
     color: var(--st-color-text);
   }

   /* Never */
   button {
     padding: "12px 16px";  /* ❌ NO */
     font-size: 14px;       /* ❌ NO */
     font-weight: 600;      /* ❌ NO */
     line-height: 1.5;      /* ❌ NO */
   }
   ```

3. **Linting Rules**
   - Add check-raw-values to detect all numeric violations
   - Extend ESLint plugin to catch:
     - Font sizes: `[0-9]+px` → use `--st-font-size-*`
     - Font weights: `[0-9]{3}` → use `--st-font-weight-*`
     - Line heights: `/^[01]\.[0-9]+$/` → use `--st-line-height-*`
     - Z-indices: `^[0-9]+$` (except 0-50 direct) → use `--st-z-*`
     - Opacity: `[01]\.[0-9]+` → use `--st-opacity-*`

## Implementation Priority

### Tier 1 (Critical - Do First)
1. Fix all documentation components (DONE ✅)
   - EnhancedComponentExplorer.tsx ✅
   - InteractivePlayground.tsx ✅
   - ExamplesPage.tsx ✅

2. Add CSS variable names for font-size in tokens/dist/tokens.css
   - Export `--st-font-size-0` through `--st-font-size-6`
   - Export `--st-font-weight-*`, `--st-line-height-*`

3. Update all HomePage.tsx inline styles to use tokens

### Tier 2 (High Priority - Do Next)
1. Token Studio: Add Numeric Values tab
2. Add numeric token sections to CSS generation
3. Extend check-raw-values linter

### Tier 3 (Medium Priority)
1. Create numeric value presets in Token Studio
2. Add core defaults documentation
3. Generate numeric scale visualizations

## Core Defaults Table

| Category | Token | Default | Type |
|----------|-------|---------|------|
| Font Size | --st-font-size-0 | 0.75rem (12px) | size |
| Font Size | --st-font-size-1 | 0.875rem (14px) | size |
| Font Size | --st-font-size-2 | 1rem (16px) | size |
| Font Weight | --st-font-weight-normal | 400 | weight |
| Font Weight | --st-font-weight-semibold | 600 | weight |
| Font Weight | --st-font-weight-bold | 700 | weight |
| Line Height | --st-line-height-tight | 1.25 | unitless |
| Line Height | --st-line-height-normal | 1.5 | unitless |
| Line Height | --st-line-height-relaxed | 1.75 | unitless |
| Border Width | --st-border-width-1 | 1px | size |
| Border Width | --st-border-width-2 | 2px | size |
| Opacity | --st-opacity-0 | 0 | unitless |
| Opacity | --st-opacity-50 | 0.5 | unitless |
| Opacity | --st-opacity-100 | 1 | unitless |

## Validation Strategy

### CSS Linting
```bash
npm run check-raw-values -- --strict
```

Should catch:
- `font-size: 14px` → error: use `var(--st-font-size-*)`
- `font-weight: 600` → error: use `var(--st-font-weight-semibold)`
- `line-height: 1.5` → error: use `var(--st-line-height-normal)`

### Runtime Warnings
- Log warning if numeric value used directly
- Suggest nearest token alternative
- Only in development mode

### TypeScript Validation
```tsx
// Type-safe button props
<Button fontSize="var(--st-font-size-1)" fontWeight="var(--st-font-weight-semibold)" />

// NOT:
<Button fontSize="14px" fontWeight={600} />  // TS error
```

## Benefits

1. **Design System Coherence**
   - All styling follows token system
   - No maverick numeric values
   - Consistency guaranteed

2. **Token Studio Features**
   - Preview numeric scales
   - Adjust defaults
   - Generate custom values
   - Export complete token system

3. **Developer Experience**
   - Autocomplete for all values
   - Type safety throughout
   - Single source of truth
   - Easy to customize

4. **Maintainability**
   - All changes in one place (Token Studio)
   - No scattered magic numbers
   - Version control friendly
   - Clear intent

## Questions Answered

### "Should 14px be --st-font-size-1?"
Yes. Every numeric value that appears in CSS should have a token. This enables:
- Responsive typography: different sizes per breakpoint
- Theme customization: adjust all sizes at once
- Accessibility: scale type for readability
- A/B testing: compare different scales

### "What about computed values?"
Token values are computed in CSS. Variables handle it:
```css
--st-font-size-1: 0.875rem;  /* computed by browser */
```

### "How does this work with tools like Figma?"
Export token values to design tools:
```json
{
  "font_size_1": { "value": "14px", "type": "size" },
  "font_weight_semibold": { "value": "600", "type": "fontWeight" }
}
```

## Timeline

- **Phase 1 (Done)**: Fix all hardcoded values in docs ✅
- **Phase 2 (Next)**: Add CSS variable names for numeric tokens
- **Phase 3 (Next)**: Token Studio numeric editor
- **Phase 4 (Follow-up)**: Documentation & linting rules

## Success Criteria

✅ Zero hardcoded numeric values in codebase
✅ All numeric values use CSS variable names
✅ Token Studio supports all numeric scales
✅ Core defaults documented
✅ Linting enforces token usage
✅ Type system validates token usage

---

**Author**: Claude Haiku 4.5
**Date**: January 26, 2026
**Status**: Ready for Implementation
