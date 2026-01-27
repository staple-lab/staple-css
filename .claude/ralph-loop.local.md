---
active: true
iteration: 4
max_iterations: 0
completion_promise: null
started_at: "2026-01-27T08:06:04Z"
---

## Iteration 4: GitHub Integration & Scroll Utilities

### Previous Iterations Summary:
- ✅ ITER 1: Sidebar Navigation (left, 280px, categories)
- ✅ ITER 2: Mobile Toggle + Breadcrumbs (FAB, slide-in, context trail)
- ✅ ITER 3: Table of Contents (right, 240px, page sections)

### Current Iteration Goals:

#### 1. GitHub Edit Link (High Priority)
- [ ] Add "Edit on GitHub" link in breadcrumb
- [ ] Calculate GitHub URL from current pathname
- [ ] Show in breadcrumb far-right
- [ ] Open in new tab
- [ ] Icon: 🔗 or ✎

#### 2. Scroll-to-Top Button (Medium Priority)
- [ ] Add sticky FAB in bottom-right (above mobile toggle)
- [ ] Show only when scrolled > 300px down
- [ ] Smooth scroll to top
- [ ] Icon: ↑ or ⬆️
- [ ] Fade in/out animations

#### 3. Page Anchor Links (Medium Priority)
- [ ] Update URL hash when clicking TOC links
- [ ] Support deep linking (share section URLs)
- [ ] Restore scroll position on page load
- [ ] Update browser history

#### 4. Scroll Position Memory (Low Priority)
- [ ] Cache sidebar scroll position per session
- [ ] Restore on page revisit
- [ ] Use sessionStorage
- [ ] Per-page key: `/page-name-sidebar-scroll`

### Implementation Plan:

**GitHub Link:**
```typescript
function getGitHubEditUrl(pathname: string): string {
  const docPath = pathname.slice(1); // Remove leading /
  return `https://github.com/anthropics/staple-css/edit/main/apps/docs/src/pages/${docPath}Page.tsx`;
}
```

**Scroll-to-Top:**
```typescript
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
  }, []);
  
  return visible ? <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button> : null;
}
```

**Anchor Links:**
- Breadcrumb: Update when scrolling TOC sections
- URL hash: `#heading-id` in address bar
- Deep linking: Scroll to hash on page load

### Files to Create/Modify:

**Create:**
- `apps/docs/src/components/ScrollToTop.tsx`
- `apps/docs/src/components/ScrollToTop.css`

**Modify:**
- `apps/docs/src/components/Breadcrumb.tsx` - Add GitHub link
- `apps/docs/src/components/TableOfContents.tsx` - Update URL hash
- `apps/docs/src/App.tsx` - Integrate ScrollToTop
- `apps/docs/src/styles.css` - Z-index management

### Expected Commits:
1. Add GitHub edit link to breadcrumb
2. Add scroll-to-top FAB button
3. Implement anchor link navigation
4. Add session scroll position memory

### Success Criteria:
- ✅ All new TypeScript compiles
- ✅ GitHub link works on all pages
- ✅ Scroll-to-top button works smoothly
- ✅ URL updates with section changes
- ✅ Deep links work (share & restore)
- ✅ Scroll position preserved on revisit
