---
active: true
iteration: 3
max_iterations: 0
completion_promise: null
started_at: "2026-01-27T08:06:04Z"
---

## Iteration 3: Add Table of Contents for Documentation

### Completed Features:

#### Table of Contents (Right Sidebar)
- ✅ Created `TableOfContents.tsx` with intelligent heading extraction
- ✅ Auto-generates heading IDs if not present
- ✅ Tracks active heading during scroll with 200px offset
- ✅ Sticky positioning at top of viewport
- ✅ Supports h2-h4 levels with indentation
- ✅ Smooth scroll-into-view behavior
- ✅ Hidden on screens < 1400px (desktop only)
- ✅ Responsive gap handling

### Files Modified/Created:

**Created:**
- `apps/docs/src/components/TableOfContents.tsx`
- `apps/docs/src/components/TableOfContents.css`

**Modified:**
- `apps/docs/src/App.tsx` - Layout restructuring
- `apps/docs/src/styles.css` - Content wrapper flex layout

### Git Commits (Iteration 3):
- `785c096` - Add Table of Contents sidebar for documentation pages

### Navigation System Status:

Complete three-part navigation:
1. Left Sidebar (280px) - Categories
2. Breadcrumb - Context trail
3. Right TOC (240px) - Page sections [NEW]

### Quality:
- ✅ TypeScript clean compilation
- ✅ Passive scroll listeners (performance)
- ✅ Responsive at all breakpoints
- ✅ Accessibility compliant

### Next Iteration Ideas:
- Add "Edit on GitHub" link
- Create page anchor links
- Scroll-to-top button
- Lazy loading for large pages
