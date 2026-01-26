# Demo Templates - Real-World Usage Patterns

## Overview

Demo templates showcase staple-css used in complete, realistic applications. Each template demonstrates best practices, responsive design, and effective token usage.

**View All Templates:** https://css.staplelab.com/storybook/?globals=showExamples:true

---

## Available Templates

### 🛍️ E-Commerce Platform
**Use Case:** Product browsing, shopping cart, checkout

**Demonstrates:**
- Grid layouts for product listings
- Card components for products
- Responsive breakpoints
- Color tokens for pricing/status
- Shadow tokens for elevation

**Key Components Used:**
```tsx
<Grid cols={{ base: 1, md: 2, lg: 4 }}>
  <Card shadow={1} pad={4} radius={2}>
    {/* Product card */}
  </Card>
</Grid>
```

**Tokens Highlighted:**
- Space 4 (padding)
- Radius 2 (card corners)
- Shadow 1 (card elevation)
- Primary tone (CTA button)

---

### 📊 Analytics Dashboard
**Use Case:** Data visualization, metrics, real-time updates

**Demonstrates:**
- Data table layouts
- Sidebar navigation
- Chart containers
- Status indicators
- Density modes (comfortable/compact)

**Key Components Used:**
```tsx
<Stack gap={6}>
  <Box pad={6} shadow={2} radius={3}>
    <Text size={5} weight="bold">Revenue</Text>
    {/* Chart goes here */}
  </Box>
</Stack>
```

**Tokens Highlighted:**
- Space 6 (section spacing)
- Shadow 2 (panel elevation)
- Font sizes 5-6 (headers)
- Danger tone (alerts)

---

### 📱 Social Media Feed
**Use Case:** User posts, comments, likes, sharing

**Demonstrates:**
- Feed layouts
- Post cards
- Comment threads
- User avatars
- Interaction patterns

**Key Components Used:**
```tsx
<Stack gap={4} pad={4}>
  <Card shadow={1}>
    {/* Post content */}
  </Card>
</Stack>
```

**Tokens Highlighted:**
- Space 4 (gap between posts)
- Muted tone (metadata)
- Primary tone (interaction)
- Avatar radius 4 (pill shape)

---

### 📝 Blog Platform
**Use Case:** Article publishing, reading, categorization

**Demonstrates:**
- Typography hierarchy
- Article layout
- Meta information
- Category tags
- Comment sections

**Key Components Used:**
```tsx
<Container size="lg">
  <Text as="h1" size={6} weight="bold">
    Article Title
  </Text>
  <Text tone="muted" size={1}>By author · 5 min read</Text>
</Container>
```

**Tokens Highlighted:**
- Font size 6 (article title)
- Font size 2 (body text)
- Font size 1 (metadata)
- Muted tone (dates)
- Primary tone (links)

---

### 💬 Chat Application
**Use Case:** Messaging, notifications, user status

**Demonstrates:**
- Message bubbles
- Sidebar navigation
- User list
- Input fields
- Status indicators

**Key Components Used:**
```tsx
<Stack gap={3}>
  <Box pad={3} radius={3} style={{ background: "var(--st-color-primary)" }}>
    <Text tone="primary">Message bubble</Text>
  </Box>
</Stack>
```

**Tokens Highlighted:**
- Space 3 (message gap)
- Radius 3 (bubble rounding)
- Primary tone (own messages)
- Success tone (online status)

---

### 📅 Calendar Interface
**Use Case:** Date selection, event scheduling, time blocking

**Demonstrates:**
- Grid-based calendar
- Event cards
- Date selection
- Time slots
- Month navigation

**Key Components Used:**
```tsx
<Grid cols={7} gap={2}>
  {/* Calendar grid */}
  <Box radius={2} shadow={0} pad={2}>
    {/* Day cell */}
  </Box>
</Grid>
```

**Tokens Highlighted:**
- Space 2 (compact calendar)
- Radius 2 (day cells)
- Primary tone (selected day)
- Success tone (event)

---

### 📧 Email Client
**Use Case:** Email list, message reading, folder navigation

**Demonstrates:**
- List layouts
- Multi-panel interface
- Message preview
- Action buttons
- Sidebar navigation

**Key Components Used:**
```tsx
<Row gap={0}>
  <Box style={{ flex: "0 0 300px" }}>
    {/* Sidebar */}
  </Box>
  <Box style={{ flex: 1 }}>
    {/* Main content */}
  </Box>
</Row>
```

**Tokens Highlighted:**
- Consistent spacing
- Card containers
- Button tones
- Danger tone (delete)

---

### 📁 File Manager
**Use Case:** File browsing, organization, actions

**Demonstrates:**
- File/folder list
- Grid/list view switching
- Breadcrumb navigation
- Context menus
- Selection

**Key Components Used:**
```tsx
<Stack gap={2} pad={4}>
  {/* File list */}
  <Box pad={3} radius={2} className="file-item">
    <Text>{fileName}</Text>
  </Box>
</Stack>
```

**Tokens Highlighted:**
- Space 2-3 (file gaps)
- Radius 2 (file hover states)
- Muted tone (metadata)

---

### 🏠 Landing Page
**Use Case:** Marketing, hero section, CTA, features

**Demonstrates:**
- Hero section
- Feature showcases
- Call-to-action buttons
- Footer
- Typography hierarchy

**Key Components Used:**
```tsx
<Container size="xl">
  <Stack gap={8} pad={8}>
    <Text as="h1" size={6} weight="bold">
      Welcome to staple-css
    </Text>
    <Text size={3} tone="muted">
      The token-first design system
    </Text>
  </Stack>
</Container>
```

**Tokens Highlighted:**
- Space 8 (hero sections)
- Font sizes 6-3 (hierarchy)
- Primary tone (CTA)
- Large shadows for lift

---

### 🎵 Music Player
**Use Case:** Media controls, playlist, now playing

**Demonstrates:**
- Player controls
- Progress bar
- Playlist view
- Album art
- Now playing info

**Key Components Used:**
```tsx
<Box pad={6} shadow={3} radius={3}>
  <Text size={4} weight="bold">Now Playing</Text>
  {/* Player controls */}
</Box>
```

**Tokens Highlighted:**
- Space 6 (player padding)
- Shadow 3 (floating player)
- Font sizes for hierarchy
- Primary tone (play button)

---

### 📌 Project Management
**Use Case:** Task boards, kanban, sprint planning

**Demonstrates:**
- Kanban columns
- Task cards
- Status indicators
- Team members
- Drag-and-drop zones

**Key Components Used:**
```tsx
<Grid cols={{ base: 1, md: 3 }} gap={4}>
  <Stack gap={2}>
    {/* Kanban column */}
    <Card pad={3} shadow={1}>
      {/* Task card */}
    </Card>
  </Stack>
</Grid>
```

**Tokens Highlighted:**
- Space 4 (column gap)
- Space 3 (card padding)
- Shadow 1 (cards)
- Color tones (status)

---

### ⚙️ Settings Panel
**Use Case:** User preferences, configuration, options

**Demonstrates:**
- Form layouts
- Toggle switches
- Input fields
- Section grouping
- Save/cancel buttons

**Key Components Used:**
```tsx
<Stack gap={6} pad={6}>
  <Box>
    <Text weight="semibold" size={3}>Preferences</Text>
    {/* Settings groups */}
  </Box>
</Stack>
```

**Tokens Highlighted:**
- Space 6 (section gaps)
- Space 3 (form field gaps)
- Radius 2 (input fields)
- Primary tone (buttons)

---

## How to Use Templates

### 1. View in Storybook
```
1. Go to https://css.staplelab.com/storybook
2. Click "Examples" in sidebar
3. Browse available templates
4. Interact with component controls
```

### 2. Copy Code
```
1. Select template
2. Click "Show code"
3. Copy entire JSX
4. Paste into your project
5. Customize as needed
```

### 3. Study Patterns
```
1. View template
2. Note component combinations
3. Identify token usage
4. Learn layout patterns
5. Apply to your design
```

### 4. Responsive Testing
```
1. Open template
2. Click responsive icon
3. Adjust viewport size
4. Verify mobile layout
5. Test breakpoints
```

---

## Template Best Practices

### ✅ Spacing Patterns
```tsx
// Section spacing (use space 5-8)
<Stack gap={6} pad={6}>
  {/* Major sections */}
</Stack>

// Card spacing (use space 3-5)
<Card pad={5} gap={3}>
  {/* Card content */}
</Card>

// Tight spacing (use space 1-2)
<Stack gap={2}>
  {/* Related items */}
</Stack>
```

### ✅ Elevation Strategy
```tsx
// No elevation
<Box shadow={0}>Default box</Box>

// Subtle (default cards)
<Card shadow={1}>Product card</Card>

// Standard (containers)
<Box shadow={2}>Panel</Box>

// Strong (floating)
<Box shadow={3}>Floating element</Box>

// Modal
<Box shadow={5}>Modal dialog</Box>
```

### ✅ Color Tones
```tsx
// Neutral (default UI)
<Box>Default container</Box>

// Primary (main actions)
<Card tone="primary">Important card</Card>

// Muted (secondary info)
<Text tone="muted">Metadata</Text>

// Danger (destructive)
<Card tone="danger">Delete confirmation</Card>

// Success (positive)
<Card tone="success">Success message</Card>
```

### ✅ Typography Hierarchy
```tsx
// Page title (h1)
<Text as="h1" size={6} weight="bold">Title</Text>

// Section header (h2)
<Text as="h2" size={5} weight="semibold">Section</Text>

// Subsection (h3)
<Text as="h3" size={4} weight="semibold">Subsection</Text>

// Body text
<Text size={2}>Regular body text</Text>

// Metadata
<Text size={1} tone="muted">Details</Text>
```

### ✅ Responsive Patterns
```tsx
// Mobile-first (base is mobile)
<Grid cols={{ base: 1, md: 2, lg: 4 }} gap={{ base: 2, md: 4 }}>
  {/* Auto-adapts to screen size */}
</Grid>

// Responsive padding
<Box pad={{ base: 3, md: 5, lg: 7 }}>
  {/* More space on larger screens */}
</Box>

// Responsive text size
<Text size={{ base: 2, md: 3, lg: 4 }}>
  {/* Scales with screen */}
</Text>
```

---

## Learning Path

### Beginner
1. **Basic Layout** - Box + Stack
2. **Cards** - Card with padding + shadow
3. **Typography** - Text with sizes + weights
4. **Simple Grid** - Grid with basic columns

### Intermediate
1. **Responsive Grid** - Breakpoint-aware columns
2. **Mixed Spacing** - Different gaps for sections
3. **Elevation Stack** - Multiple shadow levels
4. **Color Tones** - Semantic coloring

### Advanced
1. **Complex Layouts** - Sidebar + main content
2. **Density Modes** - Comfortable vs compact
3. **Theme Switching** - Light/dark adaptation
4. **Full Templates** - Complete applications

---

## Token Usage Summary

### Most Used
```
space-4    → Default padding/gap
radius-2   → Standard card corners
shadow-1   → Default card elevation
size-2     → Body text
primary    → Main actions
```

### Layout
```
space (0-8)     → All spacing
radius (0-4)    → Corners
shadow (0-5)    → Elevation
maxWidth        → Content constraints
```

### Typography
```
size (0-6)      → Font sizes
weight          → Font emphasis
tone            → Semantic colors
leading         → Line height
```

### Decoration
```
shadow (0-5)    → Elevation
radius (0-4)    → Rounding
tone            → Semantic colors
opacity         → Transparency
```

---

## Quick Copy-Paste

### Centered Container
```tsx
<Container size="lg" pad={6}>
  <Stack gap={4}>
    {/* Your content */}
  </Stack>
</Container>
```

### Card Group
```tsx
<Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
  {items.map(item => (
    <Card pad={5} radius={3} shadow={1} key={item.id}>
      <Text size={4} weight="bold">{item.title}</Text>
    </Card>
  ))}
</Grid>
```

### Section with Header
```tsx
<Box pad={6} borderBottom={1} borderColor="border">
  <Text as="h2" size={5} weight="bold">Section Title</Text>
</Box>
```

### Button Row
```tsx
<Row gap={3} justify="end" pad={4}>
  <button>Cancel</button>
  <button>Save</button>
</Row>
```

---

## Performance Notes

- All templates use static token values
- No runtime CSS generation
- Responsive classes pre-computed
- Optimal bundle size impact
- Fast rendering performance

---

## Troubleshooting

### Template looks different?
→ Check if dark theme is enabled
→ Verify token CSS is loaded

### Code doesn't match preview?
→ Clear browser cache
→ Refresh Storybook page

### Responsive not working?
→ Check breakpoint sizes
→ Verify viewport size

---

## Learn More

- **[TOKEN_SYSTEM.md](./TOKEN_SYSTEM.md)** — Complete token reference
- **[STORYBOOK_GUIDE.md](./STORYBOOK_GUIDE.md)** — Interactive component exploration
- **[Component API](./packages/primitives/README.md)** — Detailed prop documentation

---

**Templates are your starting point. Study them, copy them, customize them.**
