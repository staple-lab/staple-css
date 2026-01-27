---
active: true
iteration: 5
max_iterations: 0
completion_promise: null
started_at: "2026-01-27T08:06:04Z"
---

## Iteration 4: GitHub Integration & Scroll Utilities

### Completed (2/4):

#### ✅ GitHub Edit Link
- ✅ Added `getGitHubEditUrl()` function
- ✅ Maps routes to file paths
- ✅ Shows "Edit" link in breadcrumb far-right
- ✅ Pencil icon (✎) indicator
- ✅ Opens in new tab (noopener noreferrer)
- ✅ Styled with primary color on hover

#### ✅ Scroll-to-Top Button
- ✅ Created ScrollToTop.tsx component
- ✅ Passive scroll listener
- ✅ Shows when scrolled > 300px
- ✅ Smooth scroll animation
- ✅ Z-index: 44 (above toggle/TOC)
- ✅ Slide-up entrance animation

### TODO (2/4):

#### Page Anchor Links
- [ ] Update URL hash when clicking TOC
- [ ] Support deep linking
- [ ] Restore scroll on page load
- [ ] Update browser history

#### Scroll Position Memory
- [ ] Cache sidebar scroll per session
- [ ] Restore on page revisit
- [ ] Use sessionStorage
- [ ] Per-page key: `/page-name-sidebar`

### Git Commits (Iteration 4):

1. `2aa386b` - Initialize Iteration 4 plan
2. `0f7359a` - Add GitHub edit link to breadcrumb
3. `8a517f6` - Add scroll-to-top floating action button

### Quality:
- ✅ All TypeScript compiles
- ✅ Accessibility compliant
- ✅ Responsive all breakpoints
- ✅ Performance optimized

### Next Phase:
Implement anchor link navigation and scroll memory.
