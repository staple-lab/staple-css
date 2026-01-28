# Accessibility Audit - Iteration 3: Aria-labels & Semantic HTML
*Ralph Loop Iteration 3 Plan*

## Summary

Comprehensive audit of all 11+ documentation pages identified:
- **Icon-only elements**: 40+ missing aria-labels
- **Decorative elements**: 30+ missing aria-hidden attributes
- **Tables**: 8+ tables missing scope attributes
- **Semantic HTML**: 20+ sections needing proper semantic tags
- **Form labels**: 5+ inputs needing proper htmlFor association

## Priority Issues (WCAG 2.1 Level A violations)

### 1. Icon-Only Elements Needing aria-label
**Pages Affected**: HomePage, WhyPage, GuidesPage, ComponentPatternsPage, ExamplesPage, ColorSystemPage, FigmaIntegrationPage, VisualsPage

**Pattern**:
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
```

**Files to modify**:
- [ ] HomePage.tsx - Lines 170-241 (Features), 484-496 (Use Cases)
- [ ] WhyPage.tsx - Lines 70-92 (Principles), 200-212 (A11y Features)
- [ ] GuidesPage.tsx - Lines 109-127 (Guide Icons)
- [ ] ComponentPatternsPage.tsx - Lines 68-69, 119-120, etc. (Section Headers)
- [ ] ExamplesPage.tsx - Lines 80-82 (Feature Badges), 180+ (Dashboard)
- [ ] ColorSystemPage.tsx - Throughout color swatches
- [ ] FigmaIntegrationPage.tsx - Lines 77-84 (Feature Icons)
- [ ] VisualsPage.tsx - Lines 35-38, 87-90, 134-136 (Icon Badges)

### 2. Decorative Elements Needing aria-hidden="true"
**Pattern**:
```tsx
/* Before */
<Box style={{ background: "...", boxShadow: "..." }} />

/* After */
<Box
  aria-hidden="true"
  style={{ background: "...", boxShadow: "..." }}
/>
```

**Examples**:
- Hero background gradients (HomePage.tsx:86-95)
- Shadow demonstrations (VisualsPage.tsx:69-79)
- Color swatches (ColorSystemPage.tsx:39-82)
- Decorative emoji in headings (ColorSystemPage.tsx:139)
- Gradient previews (ColorSystemPage.tsx:119-124)
- Visual examples in all pages

### 3. Table scope Attributes
**Pattern**:
```html
/* Before */
<th style={{ padding: "12px", textAlign: "left" }}>Feature</th>

/* After */
<th scope="col" style={{ padding: "12px", textAlign: "left" }}>Feature</th>
```

**Tables in**:
- [ ] HomePage.tsx:257-296 (Comparison Table)
- [ ] ComponentPatternsPage.tsx:482+ (Data Table)
- [ ] ExamplesPage.tsx:275-320 (Bundle Size Comparison)
- [ ] PrimitivesPage.tsx: Multiple token tables
- [ ] TokensPage.tsx: Multiple token tables
- [ ] TokenReferencePage.tsx: All reference tables

### 4. Semantic HTML Structure
**Pattern**:
```tsx
/* Before */
<div style={{ padding: "var(--st-space-8)" }}>
  <div className="guides-grid">
    ...
  </div>
</div>

/* After */
<main>
  <section aria-labelledby="guides-heading">
    <h2 id="guides-heading">Design Guides</h2>
    ...
  </section>
</main>
```

**Changes needed**:
- [ ] All pages: Wrap main content in `<main>` element
- [ ] All pages: Feature sections in `<section>` with aria-label or aria-labelledby
- [ ] HomePage.tsx:152-245 (Features) → `<section>`
- [ ] HomePage.tsx:313-361 (Principles) → `<article>` elements
- [ ] All navigation in `<nav>` element
- [ ] Content areas in proper semantic zones

### 5. Form Label Association
**Pattern**:
```tsx
/* Before */
<Text as="label" weight="semibold">Email</Text>
<input type="text" />

/* After */
<label htmlFor="email-input" style={{ fontWeight: 600 }}>
  Email
</label>
<input id="email-input" type="text" />
```

**Files to modify**:
- [ ] ExamplesPage.tsx:106-118 (Email Input)
- [ ] ComponentPatternsPage.tsx:252 (Range Slider)
- [ ] All form components need htmlFor/id association

## Implementation Order

### Phase A: Icon Labels (30 minutes)
1. HomePage.tsx - Add aria-labels to 2 icon groups
2. GuidesPage.tsx - Add aria-labels to guide icons
3. ComponentPatternsPage.tsx - Add aria-labels to section headers
4. Verify all icon containers have `role="img"` and aria-label

### Phase B: Decorative Elements (20 minutes)
1. Add aria-hidden="true" to all visual demonstrations
2. Add aria-hidden="true" to emoji in headings
3. Add aria-hidden="true" to gradient swatches

### Phase C: Table scope (20 minutes)
1. Find all `<th>` elements across pages
2. Add `scope="col"` attribute
3. Add `scope="row"` if applicable

### Phase D: Semantic HTML (30 minutes)
1. Wrap main content in `<main>` on all pages
2. Convert generic `<div>` to `<section>` for feature areas
3. Add aria-label to sections without h1/h2
4. Verify heading hierarchy

### Phase E: Form Labels (15 minutes)
1. Add htmlFor/id to all form inputs
2. Verify label wrapping works for checkboxes

## Verification Checklist

- [ ] Tab through all pages - focus visible and logical
- [ ] Test with screen reader (VoiceOver on Mac):
  - [ ] Headings announced correctly
  - [ ] Icon labels announced
  - [ ] Table headers announced with scope
  - [ ] Decorative elements skipped
  - [ ] Form labels associated
- [ ] Test keyboard-only navigation on each page
- [ ] Verify no console warnings/errors
- [ ] Build succeeds
- [ ] Visual QA - no broken layouts

## Expected Outcome

After Iteration 3:
- ✅ All icon-only elements have aria-labels or aria-hidden
- ✅ Decorative elements properly hidden from screen readers
- ✅ Tables have proper scope attributes
- ✅ Semantic HTML structure implemented (main, section, nav, article)
- ✅ Form labels properly associated
- ✅ WCAG 2.1 Level A compliance achieved
- ✅ Screen reader announces page structure clearly

## Files Affected

11 page files:
- apps/docs/src/pages/HomePage.tsx
- apps/docs/src/pages/WhyPage.tsx
- apps/docs/src/pages/GuidesPage.tsx
- apps/docs/src/pages/ComponentPatternsPage.tsx
- apps/docs/src/pages/ExamplesPage.tsx
- apps/docs/src/pages/PrimitivesPage.tsx
- apps/docs/src/pages/TokenReferencePage.tsx
- apps/docs/src/pages/TokensPage.tsx
- apps/docs/src/pages/ColorSystemPage.tsx
- apps/docs/src/pages/FigmaIntegrationPage.tsx
- apps/docs/src/pages/VisualsPage.tsx

## Notes

- Ralph Loop: This is Iteration 3 in a 50+ iteration plan
- These changes are foundational for accessibility
- No visual changes - only structural improvements
- Build must succeed after each file modification
- Commit incrementally per file or per category

