# Phase 3 Requirements: User Direction

**Date**: January 26, 2026
**Status**: Planned
**Priority**: High

## Requirements

### 1. Numeric Values Must All Be Tokens ✅ (Documented)
- ✅ All hardcoded pixel values replaced in documentation
- ✅ Numeric tokenization strategy documented in NUMERIC_TOKENIZATION_STRATEGY.md
- ⏳ Next: Add CSS variable names for numeric tokens (--st-font-size-0, etc.)
- ⏳ Next: Token Studio numeric value editor

### 2. Token Studio Should Handle Numeric Values ✅ (Planned)
- ⏳ Add Numeric Values tab to Token Studio
- ⏳ Support for:
  - Font sizes: 0.75rem-2rem (0.75/12px to 32px)
  - Font weights: 100-900 or presets (normal, medium, semibold, bold)
  - Line heights: 0.8-2.0 or presets (tight, normal, relaxed)
  - Z-index: 0-50+ scale
  - Opacity: 0-1 or 0-100%
  - Border widths: 0-8px scale
  - Outline offsets: 0-8px scale
  - Letter spacing: -0.1em to +0.2em range
  - Delays: 0-1000ms scale

### 3. Core Defaults for All Numeric Values ✅ (Planned)
Document and provide defaults for:
- Font sizes: 0.75rem, 0.875rem, 1rem, 1.125rem, 1.25rem, 1.5rem, 2rem
- Font weights: 400, 500, 600, 700
- Line heights: 1.25, 1.5, 1.75
- Z-indices: 0, 10, 20, 30, 40, 50, 9999
- Opacity: 0, 0.25, 0.5, 0.75, 1
- Defaults page in Token Studio showing all scales

### 4. Remove "Configure your project" Page from Storybook ⏳
- Location: Likely in Storybook pages
- Action: Delete or hide the configuration page
- Reason: User feedback indicates it's not needed

### 5. Remove Examples from Storybook ⏳
- Move all examples to website
- Create new "Examples" menu item in navigation
- List format for easy browsing

### 6. Website Examples Menu with List View ⏳
- Create `/examples` page (DONE ✅ - ExamplesPage.tsx exists)
- Add navigation link in header (⏳ May need to verify)
- Organize examples as:
  - Email templates
  - Forms (login, signup, etc.)
  - Cards & layouts
  - Dashboard patterns
  - Navigation patterns
  - etc.
- List view with:
  - Example name
  - Description
  - Preview thumbnail
  - Link to full example

## Implementation Plan

### Phase 3A: Numeric Tokenization (Weeks 1-2)
1. Add CSS variable names for numeric tokens
2. Update tokens.css with new variables
3. Document numeric token defaults
4. Create Token Studio numeric editor

### Phase 3B: Storybook Cleanup (Week 1)
1. Identify and remove "Configure your project" page
2. Remove example components from Storybook
3. Add note linking to website examples

### Phase 3C: Website Examples Enhancement (Weeks 2-3)
1. Expand ExamplesPage.tsx with more templates
2. Create example list/catalog view
3. Add category navigation
4. Link all from main header

## File Structure for Examples

```
apps/docs/src/pages/examples/
├── index.tsx              # ExamplesPage (category list)
├── templates/
│  ├── email-welcome.tsx
│  ├── email-newsletter.tsx
│  ├── form-login.tsx
│  ├── form-signup.tsx
│  └── ...
├── layouts/
│  ├── dashboard.tsx
│  ├── card-grid.tsx
│  └── ...
└── components/
   ├── hero-section.tsx
   ├── feature-grid.tsx
   └── ...
```

## Success Criteria

- ✅ All numeric values are tokens (or have defined token alternative)
- ✅ Token Studio handles numeric scales
- ✅ Core defaults documented and available
- ✅ Storybook "Configure your project" removed
- ✅ All examples moved from Storybook to website
- ✅ Website has comprehensive examples menu
- ✅ Bundle size maintained ≤ 10 KB gzip
- ✅ Tests still passing

## Notes

- These are follow-up requirements for Phase 3
- Prioritize numeric tokenization (user emphasis)
- Ensure examples are easily discoverable on website
- Maintain enterprise-grade UX throughout

---

**User Feedback**: "All values that are numbers must become tokens, the token studio should handle it and there should be core defaults for all of them, attrocious so far, also get rid of Configure your project page in storybook, also make sure, and remove the examples from the story book and put them on the website under their own menu items, with a list"

**Next Steps**: Wait for clarification on "make sure" statement (appears cut off in user message)
