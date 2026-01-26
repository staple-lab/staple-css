# Storybook - Component Development & Token Exploration

## Overview

Storybook provides an interactive environment for developing, testing, and documenting staple-css components in isolation. It fully integrates with the token system, allowing you to see exactly how tokens map to component props.

**Live Demo:** https://css.staplelab.com/storybook

## Navigation

### 1. **Components** (Component Primitives)
Interactive examples of each primitive:
- Box - Generic container
- Stack - Vertical flex layout
- Inline/Row - Horizontal flex layout
- Grid - CSS Grid layout
- Container - Centered max-width wrapper
- Text - Typography primitive
- Card - Semantic surface wrapper
- Flex - Full flexbox control

### 2. **Token Reference** (Design Tokens)
Complete token visualization:
- Color Tokens - Full palette browser
- Spacing Tokens - Space scale 0-8
- Typography Tokens - Font sizes and weights
- Motion Tokens - Durations and easings

### 3. **Examples** (Real-World Patterns)
Complete template examples:
- E-Commerce - Product listings
- Dashboard - Data layouts
- Social Feed - Social media interface
- Blog Platform - Article layouts
- Chat Application - Messaging UI
- Calendar - Calendar interface
- Email Client - Email layout
- File Manager - File browser
- and more...

### 4. **Guides** (Documentation)
Educational content:
- Dark Mode - Theme switching
- Color System - Palette usage
- Typography - Font hierarchy
- Spacing - Layout patterns

---

## Interactive Features

### 🎛️ Controls Panel
Each story includes interactive controls for modifying props:

```
Component Controls:
├── prop: space-scale (0-8)      ← Change and see live
├── radius: radius-scale (0-4)   ← Type-safe options
├── shadow: shadow-scale (0-5)   ← Dropdown selection
└── tone: color-tone             ← Semantic color
```

**How to use:**
1. Adjust control values in the right panel
2. See component update live
3. Check "Show code" to see generated JSX

### 📝 Code Preview
Shows the exact JSX code for current state:

```tsx
// Automatically generated from current control values
<Box
  pad={4}
  radius={2}
  shadow={1}
  style={{ background: "var(--st-color-surface)" }}
>
  Content
</Box>
```

**Features:**
- Auto-updates with control changes
- Copy-to-clipboard button
- Syntax highlighting
- Shows token variable usage

### 🎨 Background Selector
Toggle background colors:
- **Light** - Default white background
- **Dark** - Dark gray background
- **Surface** - Neutral surface color

### 🌓 Theme Switcher
Global theme selection (top toolbar):
- **Light** - Light theme (default colors)
- **Dark** - Dark theme (inverted colors)

Affects all stories globally - see how components adapt to themes.

### 📱 Viewport Simulator
Responsive design testing (responsive icon in toolbar):
- Desktop (1280px)
- Tablet (768px)
- Mobile (375px)
- Custom sizes

Test responsive behavior of components.

### ♿ Accessibility Panel
Built-in accessibility checks:
- Color contrast validation
- ARIA labels
- Semantic HTML checks
- Axe accessibility scanner

---

## Component Documentation

### Box
**Purpose:** Generic container with padding, margin, radius, shadow

**Token Usage:**
```
pad      → Space scale (0-8)
radius   → Radius scale (0-4)
shadow   → Shadow scale (0-5)
margin   → Space scale (0-8)
```

**Interactive Stories:**
1. **Basic** - Simple box with padding
2. **Padding Scale** - All 9 padding values (0-8)
3. **Radius Scale** - All 5 radius values (0-4)
4. **Shadow Scale** - All 6 shadow values (0-5)
5. **Responsive** - Responsive padding with breakpoints
6. **Aspect Ratio** - Video, square, portrait ratios

### Stack (Vertical Flexbox)
**Purpose:** Vertical layout with gap and alignment

**Token Usage:**
```
gap    → Space scale (0-8)
align  → Alignment (start, center, end, stretch)
```

### Text
**Purpose:** Typography with semantic styling

**Token Usage:**
```
size   → Font size scale (0-6)
weight → Font weight (normal, medium, semibold, bold)
tone   → Semantic color (primary, danger, success, muted)
```

### Card
**Purpose:** Semantic surface for grouped content

**Token Usage:**
```
pad    → Space scale (0-8)
radius → Radius scale (0-4)
shadow → Shadow scale (0-5)
tone   → Semantic color
```

---

## Token Browser

### Color Tokens
**View all available colors:**
```
Light Theme:
  background: #ffffff
  surface: #f9fafb
  text: #111827
  primary: #2563eb
  danger: #dc2626
  success: #16a34a

Dark Theme:
  background: #111827
  surface: #1f2937
  text: #f9fafb
  primary: #3b82f6
  danger: #ef4444
  success: #22c55e
```

### Space Tokens
All 9 spacing values visualized:
```
0 → 0px
1 → 4px
2 → 8px
3 → 12px
4 → 16px (recommended default)
5 → 24px
6 → 32px
7 → 48px
8 → 64px
```

### Radius Tokens
All 5 border radius values:
```
0 → 0px (sharp)
1 → 2px (subtle)
2 → 4px (standard)
3 → 8px (prominent)
4 → 16px (pill)
```

### Shadow Tokens
All 6 elevation levels:
```
0 → none (flat)
1 → subtle (cards)
2 → standard (containers)
3 → strong (floating panels)
4 → stronger (modals)
5 → strongest (overlays)
```

### Typography Tokens
**Font Sizes (0-6):**
```
0 → 12px (captions)
1 → 14px (labels)
2 → 16px (body - default)
3 → 18px (large body)
4 → 20px (h3)
5 → 24px (h2)
6 → 32px (h1)
```

**Font Weights:**
```
normal     → 400
medium     → 500
semibold   → 600
bold       → 700
```

### Motion Tokens
**Durations:**
```
instant  → 75ms
fast     → 150ms
normal   → 200ms (recommended)
moderate → 300ms
slow     → 500ms
```

**Easing Functions:**
```
default    → cubic-bezier(0.4, 0, 0.2, 1)
linear     → linear
in         → cubic-bezier(0.4, 0, 1, 1)
out        → cubic-bezier(0, 0, 0.2, 1)
emphasized → cubic-bezier(0.2, 0, 0, 1)
```

---

## Real-World Examples

### E-Commerce Template
Shows:
- Product grid layouts
- Card components
- Color scheme usage
- Responsive behavior
- Spacing patterns

**Learn:** How to build product listings

### Dashboard Template
Shows:
- Data table layout
- Chart visualization
- Sidebar navigation
- Header/footer patterns
- Density modes (comfortable vs compact)

**Learn:** How to structure admin interfaces

### Blog Platform
Shows:
- Article typography hierarchy
- Meta information styling
- Post list layouts
- Comment sections

**Learn:** How to style content

### Chat Application
Shows:
- Message bubbles
- Input fields
- Sidebar navigation
- Real-time indicators

**Learn:** How to build messaging UIs

---

## How to Use for Development

### 1. **Explore Components**
```
1. Click component name in sidebar
2. Read description and usage
3. Adjust controls to see variations
4. Copy code and use in your project
```

### 2. **Test Responsive Design**
```
1. Open Responsive icon in toolbar
2. Select different viewport sizes
3. Verify layout looks good
4. Test on actual devices
```

### 3. **Validate Accessibility**
```
1. Open Accessibility panel
2. Check color contrast (should pass AA)
3. Verify ARIA labels
4. Test keyboard navigation
```

### 4. **Check Token Usage**
```
1. Enable "Show code"
2. See which tokens are used
3. Verify token values are correct
4. Learn prop combinations
```

### 5. **Learn Patterns**
```
1. View Examples section
2. Study real-world templates
3. Copy pattern for your use case
4. Adapt tokens as needed
```

---

## Interactive Demonstrations

### Responsive Padding
```tsx
// Click controls to change:
<Box pad={{ base: 3, md: 5, lg: 7 }}>
  Mobile: 12px
  Tablet: 20px
  Desktop: 28px
</Box>
```

### Color Themes
```tsx
// Toggle theme in toolbar:

Light Mode:
  <Box style={{ background: "var(--st-color-surface)" }}>
  → #f9fafb (light gray)

Dark Mode:
  <Box style={{ background: "var(--st-color-surface)" }}>
  → #1f2937 (dark gray)
```

### Elevation System
```tsx
// Adjust shadow control:
<Card shadow={1}>  /* subtle lift */
<Card shadow={3}>  /* strong elevation */
<Card shadow={5}>  /* top-level overlay */
```

### Typography Hierarchy
```tsx
<Text size={6} weight="bold">     {/* H1: 32px, bold */}
<Text size={5} weight="semibold"> {/* H2: 24px, semibold */}
<Text size={3}>                    {/* Body: 18px, normal */}
<Text size={1}>                    {/* Caption: 14px, muted */}
```

---

## Tips & Tricks

### 📌 Favorite Stories
Click the star icon on any story to add it to favorites for quick access.

### 🔍 Search
Use `Cmd/Ctrl + K` to search stories by name or description.

### 🔗 Share Stories
Copy the URL to share a specific story state with colleagues:
```
https://css.staplelab.com/storybook/?path=/story/box--responsive-padding
```

### 💾 Bookmark Controls
Save a specific control configuration by copying the URL - the state is in the query parameters.

### 📸 Screenshot Components
Right-click any component and "Save as image" to capture visual state.

### 🧪 Test Accessibility
Use the Accessibility panel to validate color contrast and ARIA labels before shipping.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Search stories |
| `Cmd/Ctrl + .` | Toggle theme |
| `Cmd/Ctrl + /` | Show all shortcuts |
| `Escape` | Close search/panels |

---

## Common Workflows

### Create New Component
```
1. Open Storybook
2. Find similar component
3. Adjust controls to your needs
4. Click "Show code"
5. Copy JSX to project
6. Customize as needed
```

### Learn Token Values
```
1. Go to "Token Reference"
2. Browse available tokens
3. See visual representation
4. Copy token names (e.g., "space-4")
5. Use in components
```

### Test Responsive
```
1. Open component story
2. Click responsive icon
3. Adjust viewport
4. See layout reflow
5. Verify mobile-first approach
```

### Validate Colors
```
1. Toggle theme in toolbar
2. Check contrast with Accessibility panel
3. Ensure WCAG AA passes
4. Copy color token name
```

---

## Performance Notes

- Storybook loads independently from main docs site
- Component previews are heavily optimized
- CSS is shared with main packages (~10 KB gzip)
- JavaScript minimal - mostly configuration
- Fast hot-reload during development

---

## Troubleshooting

### Stories not loading?
→ Check network tab
→ Try hard refresh (Cmd/Ctrl + Shift + R)

### Controls not updating component?
→ Ensure story is properly exported
→ Check browser console for errors

### Dark mode not applying?
→ Toggle theme in top toolbar
→ Check if CSS variables are loaded

### Code preview showing old code?
→ Refresh page
→ Clear browser cache

---

## Learn More

- **[Full Token Reference](./TOKEN_SYSTEM.md)** — Complete token documentation
- **[Component API](./packages/primitives/README.md)** — Props and types
- **[Design Principles](./README.md)** — System philosophy

---

**Storybook is your interactive design system playground. Use it to learn, explore, and build.**
