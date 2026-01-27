# Complete Navigation System Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│  App Header (Sticky)                            │
│  • Logo                                         │
│  • SearchPalette                                │
│  • Theme Toggle                                 │
│  • Density Toggle                               │
│  Z-index: 100                                   │
└─────────────────────────────────────────────────┘
           ▼
┌─────────────────────────────────────────────────┐
│  Breadcrumb Navigation                          │
│  Home / Category / Current Page                 │
│  Z-index: 10                                    │
└─────────────────────────────────────────────────┘
           ▼
┌──────────────────┬──────────────────────────────┐
│                  │                              │
│ Sidebar          │ Main Content                 │
│ (280px)          │ • Page Title                 │
│                  │ • Content Area               │
│ • Categories ┐   │                              │
│   - Items    │   │                              │
│   - Links    │   │                              │
│              │   │                              │
│ Z-index: 40  │   │                              │
│ (desktop)    │   │                              │
│              │   │                              │
└──────────────────┴──────────────────────────────┘

Overlay (Mobile):
┌─────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  Backdrop
│ ░ ┌──────────────────┐ ░░░░░░░░░░░░░░░░░░░░░░░│  Z-index: 39
│ ░ │ Sidebar (Slide)  │ ░░░░░░░░░░░░░░░░░░░░░░░│  Z-index: 40
│ ░ │ • Categories     │ ░░░░░░░░░░░░░░░░░░░░░░░│
│ ░ │ • Items          │ ░░░░░░░░░░░░░░░░░░░░░░░│
│ ░ │                  │ ░░░░░░░░░░░░░░░░░░░░░░░│
│ ░ └──────────────────┘ ░░░░░░░░░░░░░░░░░░░░░░░│
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ☰ (FAB)░░░░│  Z-index: 45
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
└─────────────────────────────────────────────────┘
```

## Navigation Structure

### Categories & Items

```
📍 GETTING STARTED
   • Home (/)
   • Why Staple CSS (/why)
   • Guides (/guides)

🎨 FOUNDATIONS
   • Tokens Overview (/tokens)
   • Token Reference (/token-reference)
   • Colors & Palettes (/colors)
   • Visual System (/visuals)

📚 DOCUMENTATION
   • Component Patterns (/components)
   • Primitives (/primitives)
   • Examples (/examples)

⚙️ TOOLS
   • Gradient Studio (/gradient-studio)
   • Token Studio (/tokens-studio)
   • Figma Integration (/figma)

📖 RESOURCES
   • Storybook (/storybook) [External]
```

## Responsive Breakpoints

### Desktop (>1024px)
```
┌────────────────────────────────────────────────┐
│  Header - Full Width                           │
├──────────────────┬────────────────────────────┤
│                  │                            │
│  Sidebar         │  Breadcrumb                │
│  280px Fixed     │  ───────────────────       │
│  Always Visible  │                            │
│                  │  Main Content              │
│  • Categories    │  • Title                   │
│    - Items       │  • Full Layout             │
│    - Active: ▮   │  • Unrestricted Width      │
│                  │                            │
└──────────────────┴────────────────────────────┘
```

### Tablet (768-1024px)
```
┌────────────────────────────────────────────────┐
│  Header - Full Width                           │
│              ☰ (Floating Toggle FAB)           │
├────────────────────────────────────────────────┤
│                                                │
│  Breadcrumb                                    │
│  ─────────────────────────────────────────    │
│                                                │
│  Main Content                                  │
│  • Full Width                                  │
│  • No Sidebar                                  │
│  • Click FAB to reveal sidebar                 │
│                                                │
│                                                │
└────────────────────────────────────────────────┘
```

### Mobile (<768px)
```
┌────────────────────┐
│  Header            │
├────────────────────┤
│  Home > Current    │  Breadcrumb (condensed)
├────────────────────┤
│  Main Content      │
│                    │
│  • Mobile Optimized│
│  • Full Width      │
│  • Touch Friendly  │
│                    │
│                    │
│                    │
│                 ☰  │  Floating FAB
└────────────────────┘
```

## User Interactions

### Desktop Navigation Flow

```
User Lands on Page
       ↓
[Sidebar Always Visible]
       ↓
Click Category → [Expands/Collapses]
       ↓
Click Navigation Link
       ↓
Page Updates + Breadcrumb Updates
       ↓
View Content
```

### Mobile Navigation Flow

```
User Lands on Page
       ↓
[Sidebar Hidden, FAB Visible]
       ↓
Click FAB (☰)
       ↓
[Sidebar Slides In, Backdrop Appears]
       ↓
Click Category → [Expands/Collapses]
       ↓
Click Navigation Link
       ↓
[Sidebar Auto-Closes]
       ↓
Page Updates + Breadcrumb Updates
       ↓
View Content
```

### Breadcrumb Interaction

```
Breadcrumb Trail: Home > Foundations > Colors

User Click on "Foundations"
       ↓
Navigate to First Item in Foundations Category
       ↓
Update Breadcrumb
       ↓
Close Sidebar (on mobile)
```

## Color Scheme

### Light Theme
```
Sidebar Background:     --st-color-surface (white)
Border:                 --st-color-border (light gray)
Text:                   --st-color-text (dark gray)
Text Muted:             --st-color-text-muted (medium gray)
Active Background:      --st-color-primary-surface (light blue)
Active Text:            --st-color-primary (blue)
Hover Background:       --st-color-surface-hover (off-white)
Backdrop:               rgba(0, 0, 0, 0.5) (semi-transparent black)
```

### Dark Theme
```
Sidebar Background:     --st-color-surface (dark gray)
Border:                 --st-color-border (darker gray)
Text:                   --st-color-text (white)
Text Muted:             --st-color-text-muted (light gray)
Active Background:      --st-color-primary-surface (dark blue)
Active Text:            --st-color-primary (light blue)
Hover Background:       --st-color-surface-hover (lighter gray)
Backdrop:               rgba(0, 0, 0, 0.7) (darker overlay)
```

## Animation Timings

```
Sidebar Toggle Button Click
└─ Backdrop Fade In:        150ms (linear)
└─ Sidebar Slide In:        250ms (var(--st-easing-default))

Sidebar Link Click
└─ Sidebar Slide Out:       250ms
└─ Page Content Update:     [Instant]
└─ Breadcrumb Update:       [Instant]

Category Expand/Collapse
└─ Animation:               [Instant]
   (Toggle icon rotates: 90°)

Breadcrumb Link Hover
└─ Background Fade:         150ms
└─ Text Color Change:       150ms

Button Scale Effects
└─ Hover:                   scale(1.05) - 150ms
└─ Click:                   scale(0.95) - 150ms
```

## Z-index Stack (Mobile/Tablet)

```
45  ← Sidebar Toggle Button (FAB)
40  ← Sidebar (when open)
39  ← Sidebar Backdrop
38  ← Main Content (implicit)
...
10  ← Breadcrumb
...
0   ← App Root
```

## Accessibility Features

### Keyboard Navigation
```
Tab                  → Move between interactive elements
Shift+Tab            → Move backward through elements
Enter/Space          → Activate buttons, toggle categories
Escape               → Close sidebar (future: implement)
Cmd+K / Ctrl+K       → Open SearchPalette (existing)
```

### ARIA Attributes
```
sidebar-toggle
├─ aria-label: "Toggle navigation menu"
├─ aria-expanded: [true|false]

sidebar (open state)
├─ [visible to screen readers]

breadcrumb
├─ role: "nav"
├─ aria-label: "Breadcrumb"

breadcrumb-link
├─ [standard link semantics]
```

### Screen Reader Experience
```
"navigation menu toggle button, not expanded"
 ↓ [click]
"navigation menu toggle button, expanded"
"sidebar navigation region"
"getting started category, expandable"
 ↓ [enter]
"getting started category, expanded"
"home link"
"why staple css link"
 ↓ [click home]
"navigation menu toggle button, not expanded"
[page updates]
"breadcrumb navigation"
"home link"
"current page"
```

## Performance Considerations

### Rendering
- Sidebar: Position: fixed → No reflow on content changes
- Toggle: GPU-accelerated transforms (translateX, scale)
- Backdrop: CSS animation (not JavaScript)
- Breadcrumb: Lightweight DOM tree

### Bundle Impact
- `navigation.ts`: ~1KB (configuration)
- `Sidebar.tsx`: ~4KB (component)
- `Sidebar.css`: ~3KB (styles)
- `Breadcrumb.tsx`: ~3KB (component)
- `Breadcrumb.css`: ~2KB (styles)
- **Total Added: ~13KB** (minified ~5KB)

### Memory Usage
- Sidebar state: `Set<string>` (category names)
- Breadcrumb state: Derived from URL (computed on navigation)
- No external dependencies required

## Edge Cases Handled

✅ Home page → Breadcrumb hidden
✅ Unknown route → Breadcrumb shows URL path
✅ External links → Open in new tab (Storybook)
✅ Route change on mobile → Sidebar auto-closes
✅ Window resize → Responsive behavior maintains
✅ Theme change → Colors update via CSS variables
✅ Category not in navigation → Breadcrumb skips
✅ Deep nesting (future) → Breadcrumb handles it

---

**Status:** Production Ready ✓
