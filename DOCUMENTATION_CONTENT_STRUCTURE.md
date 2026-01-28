# Documentation Content Structure - All Pages
*Extracted for Redesign Reference*

---

## PAGE 1: HomePage.tsx

**Hero Section**
- H1: "staple-css"
- Subtitle: "Design System Primitives Built for Performance"
- Value: "2.5 KB by default. Token-first API. Zero JavaScript runtime. Build UI with 3 core primitives. Scales to enterprise with optional full edition."
- CTA: "Try it Live →" | "View Examples" | "Storybook"

**Stats Grid**
- 2.5 KB Core Bundle
- 350+ CSS Variables
- 0 KB Runtime Cost
- Type-Safe Props API

**Features Grid (6 cards)**
1. Token-First Design: 350+ CSS variables, Type-safe props, Consistent by default
2. Ultra-Lightweight: 2.5 KB core, Zero runtime JS, Static CSS only
3. AI-Friendly APIs: Constrained props, Prevent hallucination, Perfect for AI code gen
4. Design System Ready: 8 primitives, Light/dark themes, Multiple density
5. Type-Safe: Full TypeScript, Compile-time validation, IDE autocomplete
6. Tree-Shakeable: Import only what you use, ESM exports, Per-component splitting

**Comparison Table: staple-css vs Tailwind vs Chakra**
- Bundle Size (gzip): 2.5 KB vs ~10 KB vs ~45 KB
- Runtime Cost: 0 KB vs 0 KB vs ~15 KB
- Learning Curve: Easy vs Easy vs Moderate
- Type Safety: Full TS vs Partial vs Full TS

**Interactive Playground**
- "Try It Live" - CodePreview component

**Core Principles (3 cards)**
1. Tokens are the API: Design decisions live in tokens...
2. Contract Over Customization: A stable, constrained API...
3. Zero Runtime Overhead: All CSS is static...

**Getting Started (2 cards)**
- Installation: npm install @staple-css/tokens
- Quick Start: import "@staple-css/tokens"; import { Box }...

**Use Cases (4 cards)**
- Performance: 2.5 KB zero JS overhead
- Design Systems: Token-first consistency
- AI & Automation: Type-safe API constraints
- Mobile Apps: Ultra-lightweight library

**Final CTA**
- "Ready to Build?"
- "Get Started →" | "Open Studio"
- "MIT Licensed • 350+ CSS Variables • Zero Runtime"

---

## PAGE 2: WhyPage.tsx

**Hero**
- H1: "Why staple-css?"
- Subtitle: "A styling contract that prioritizes consistency, performance, and maintainability."

**Core Philosophy**
- Tokens are the API: Design decisions encoded as CSS variables
- Contract ensures consistency
- "When every component uses the same spacing scale, the same color tokens, the same typography settings, your UI naturally becomes more cohesive."

**Principles (3 cards)**
1. Tokens are the API
2. Contract over customization
3. Consistency by default

**Performance-First Design (4 metrics)**
- 0ms runtime overhead (Static CSS)
- <1kb runtime size (Zero dependencies)
- 100% tree-shakeable
- ~40% fewer media queries (Intrinsic responsive)

**Long-Term Maintainability (4 items)**
- Token versioning
- Centralized design system
- No style props hell
- Design → Code traceability

**Accessibility Built-In (4 items)**
- WCAG Compliance
- Keyboard Navigation
- Motion Respect
- Dark Mode

**CTA**
- "Get started with primitives"
- "Explore tokens"

---

## PAGE 3: GuidesPage.tsx

**Hero**
- H1: "Design Guides & Best Practices"
- Subtitle: "Comprehensive guides for building consistent, accessible, and performant interfaces with staple-css tokens and primitives."

**8 Design Guides (Inline list with icons)**
1. ✓ Spacing & Layout - Space Scale, Padding vs Margin, Intrinsic Responsive
2. ✓ Color & Contrast - Semantic Colors, WCAG AA, Light & Dark
3. ✓ Typography & Text - Font Scale, Line Height, Readable Length
4. ✓ Motion & Animation - Duration Scale, Easing, Accessibility
5. ✓ Responsive Design - Mobile-First, Breakpoints, Touch Targets
6. ✓ Accessibility (a11y) - Semantic HTML, Color Contrast, Focus Management
7. ✓ Component Patterns - Composition, Props, Escape Hatches
8. ✓ Design Tokens Strategy - Token Hierarchy, Naming, Versioning

---

## PAGE 4: ComponentPatternsPage.tsx

**Hero**
- H1: "Component Patterns"
- Subtitle: "Production-ready patterns and examples for common UI components."

**Button Patterns**
- Primary Solid, Primary Outline, Danger Solid, Success Outline, Small, Large

**Form Components**
- Text Input, Select Dropdown, Checkbox, Radio Group, Textarea, Range Slider

**Card Patterns**
- Simple, Header, Hover, Feature, Stats, Action

**Alerts & Notifications**
- Primary, Success, Danger, Warn (with icons)

**Layout Patterns**
- Two Column, Sidebar, Grid, Stack

**Data Display**
- Table Example with columns (Name, Status, Progress)

**Code Example**
```
// Card Component usage example
<Card pad={6} radius={3} shadow={1}>
  <Column gap={4}>
    <Text as="h2" size={3} weight="semibold">Heading</Text>
    <Text size={1} tone="muted">Description text</Text>
    <Row gap={3} justify="end">
      <button>Cancel</button>
      <button>Submit</button>
    </Row>
  </Column>
</Card>
```

---

## PAGE 5: ExamplesPage.tsx

**Hero**
- H1: "Real-World Examples"
- Subtitle: "Production-ready patterns and components built with staple-css"

**Email Card Example**
- Header: Welcome to staple-css
- Content: Get Started in Minutes
- Buttons: View Docs, Try Playground
- Footer: Copyright info

**Features Showcase (6 items)**
1. Token-First: Design decisions as code
2. Ultra-Lightweight: 2.5 KB default
3. Type-Safe: Full TypeScript support
4. Beautiful by Default: Professional design system
5. Tree-Shakeable: Import only what you need
6. Performance: Minimal overhead

**Login Form Example**
- Sign In heading
- Email input
- Password input
- Remember me checkbox
- Sign In button
- Sign up link

**Dashboard Metrics (4 cards)**
- Total Users: 12,345 (↑ 12%)
- Revenue: $48,230 (↑ 8%)
- Conversion Rate: 3.24% (↓ 0.5%)
- Active Sessions: 1,892 (↑ 4%)

**Best Practices**
- Do's: Use token scales, Compose with Box & Flex, Use semantic tokens, Type safety
- Don'ts: Raw pixels, Custom paddings, Hardcoded colors, Ignore TS

**Bundle Size Table**
- staple-css: 2.5 KB | 0 KB | 8 | Full TS ✅
- Tailwind: ~10 KB | 0 KB | 1000+ | Partial ⚠️
- Chakra: ~45 KB | ~15 KB | 50+ | Full TS ✅
- Material-UI: ~80 KB | ~45 KB | 100+ | Full TS ✅

---

## PAGE 6: PrimitivesPage.tsx

**Hero**
- H1: "Primitives"
- Subtitle: "Layout and typography primitives with complete responsive support."

**Core Components**
- **Box**: Generic container with padding, radius, shadow
- **Flex**: Complete flexbox layout, all props responsive
- **Row & Column**: Aliases for Flex direction
- **Grid**: CSS Grid with full specification
- **Container**: Centered container with max-width presets (sm, md, lg, xl)
- **Text**: Typography with size (0-6), weight, tone, alignment
- **Card**: Surface wrapper for grouping content

**Responsive Breakpoints**
- base (0px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

**Code Example - Responsive**
```tsx
<Box pad={{ base: 2, md: 4, lg: 6 }}>
<Flex direction={{ base: "column", md: "row" }} gap={{ base: 2, md: 4 }} />
<Grid cols={{ base: 1, md: 2, lg: 3 }} gap={{ base: 2, md: 3, lg: 4 }} />
```

---

## PAGE 7: TokenReferencePage.tsx

**Hero**
- H1: "Complete Token Reference"
- Subtitle: "Comprehensive documentation of every token in the staple-css system."

**Quick Navigation** (12 anchors)
- Spacing, Sizing, Radius, Shadows, Colors, Typography, Motion, Gradients, Breakpoints, Z-Index, Opacity, Density

**Token Categories with Values**

**Spacing Scale (0-8)**
- 0: 0, 1: 4px, 2: 8px, 3: 12px, 4: 16px, 5: 24px, 6: 32px, 7: 48px, 8: 64px

**Border Radius (0-4)**
- 0: 0px, 1: 2px, 2: 4px, 3: 8px, 4: 16px

**Shadows (0-5)**
- 6-level elevation system with pixel values and blur radius

**Typography Scales**
- Font Sizes: 12px-32px (sizes 0-6)
- Font Weights: 400, 500, 600, 700
- Line Heights: 1.25, 1.5, 1.75

**Motion Tokens**
- Duration: instant-slowest (75ms-1000ms)
- Easing: default, in, out, bounce

**Gradients**: 15 tone-based + 6 vibrant

**Breakpoints**: base-2xl

**Colors**: Semantic (primary, danger, success, warning, neutral) with light/dark

**Opacity**: 0%, 25%, 50%, 75%, 100%

**Z-Index**: 0, 10, 20, 30, 40, 50, 9999

**Density**: Comfortable (default), Compact

---

## PAGE 8: TokensPage.tsx

**Hero**
- H1: "Tokens"
- Subtitle: "Design tokens are the foundation of staple-css. They encode design decisions as CSS variables..."

**Usage Section**
```typescript
import "@staple-css/tokens/all.css";
// Or individually:
import "@staple-css/tokens/tokens.css";
import "@staple-css/tokens/themes.css";
import "@staple-css/tokens/density.css";
```

**Theming**
- data-theme="light" (default) or "dark"
- data-density="comfortable" (default) or "compact"

**Token Tables**
- Each table: CSS Variable | Value | Visual Sample
- 11 sections total (Space, Radius, Shadow, FontSize, FontWeight, LineHeight, Motion Duration, Motion Easing, Colors, etc.)

---

## PAGE 9: ColorSystemPage.tsx

**Hero**
- H1: "Color System"
- Subtitle: "Purpose-built semantic colors that adapt across themes. A cohesive palette for consistent, accessible interfaces with built-in dark mode support."

**Semantic Colors (5 items)**
- Primary: #2563eb (light) / #3b82f6 (dark)
- Danger: #dc2626 (light) / #ef4444 (dark)
- Warning: #d97706 (light) / #f59e0b (dark)
- Success: #16a34a (light) / #22c55e (dark)
- Neutral: #111827 (light) / #f9fafb (dark)

**Color Palettes** (22 scales: 50-950)
- slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

**Gradient Tokens**
- Tone-Based: 15 systematic
- Vibrant: 6 multi-color (sunrise, sunset, ocean, forest, grape, mint)
- Overlays: 3 semi-transparent

**Accessibility**
- Contrast: WCAG AA (4.5:1)
- Intent: Never color alone
- Themes: Light/dark automatic
- Testing: WebAIM, color blindness simulators

---

## PAGE 10: FigmaIntegrationPage.tsx

**Hero**
- H1: "Figma Integration"
- Subtitle: "Seamlessly sync design tokens between Figma and your codebase..."

**Two-Way Sync**
- Figma → Code: Export design tokens
- Code → Figma: Import CSS variables

**Key Features** (6 items)
- Bidirectional Sync
- Multiple Formats
- All Token Types
- Version Control
- Team Collaboration
- Custom Mappings

**Supported Token Types** (6 categories)
- Colors, Typography, Spacing & Sizing, Effects, Motion, Grid & Layout

**Export Workflow**
1. Install Plugin
2. Select Tokens
3. Choose Format (CSS, JSON, TypeScript)
4. Download
5. Auto-Sync

**Import Workflow**
1. Export Tokens
2. Select Format
3. Upload to Figma
4. Create Libraries
5. Apply to Designs

**Export Formats**
- CSS Variables: `--st-primary: #2563eb;`
- JSON: Structured
- TypeScript: Type-safe
- Figma Tokens: Native format

---

## PAGE 11: VisualsPage.tsx

**Hero**
- H1: "Visual System & Design Language"
- Subtitle: "Comprehensive visual guidelines including icons, illustrations, shadows, and motion..."

**Elevation System** (6 levels)
- Level 0: Flat
- Level 1: Subtle
- Level 2: Raised
- Level 3: Floating
- Level 4: Lifted
- Level 5: Prominent

**Border Radius Scale** (5 steps)
- 0px, 2px, 4px, 8px, 16px

**Gradient Showcase** (6 gradients)
- Sunrise, Sunset, Ocean, Forest, Grape, Mint

**Motion Examples** (4 animations)
- Fade In: 200ms
- Slide Up: 300ms
- Scale: 250ms
- Bounce: 500ms

**Typography Scale** (7 sizes)
- 12px (XS), 14px (SM), 16px (Base), 18px (LG), 20px (XL), 24px (2XL), 32px (3XL)

**Spacing Visualization** (9 steps)
- space-0 through space-8 with visual bars

**Interactive States** (4 states)
- Default, Hover, Active, Disabled

**Visual Accessibility** (6 features)
- Color Contrast (WCAG AA)
- Clear Focus (2px outline)
- Reduced Motion
- Touch Targets (44px+)
- Not Color Alone
- Readable Text

---

## Additional Pages

### PAGE 12: ColorSystemPage.tsx (Exists, covered above)

### PAGE 13: GradientStudioPage.tsx
- Interactive gradient maker component
- Gradient preview
- Color picker
- Export functionality

---

## Summary Statistics

| Aspect | Count | Notes |
|--------|-------|-------|
| Total Pages | 11 | Documentation + interactive |
| H1 Headings | 11 | One per page |
| H2 Headings | 50+ | Section headers |
| Feature Sections | 40+ | Cards, grids, lists |
| Code Examples | 10+ | React, CSS, TypeScript |
| Interactive Components | 5+ | Tables, selects, inputs |
| CTAs/Buttons | 30+ | Navigation, demos, downloads |
| Total Content Sections | 100+ | Organized by page/section |
| Token References | 200+ | CSS variables, values |
| Design Guidelines | 20+ | Principles, rules, patterns |

---

*This document serves as the content master reference for the 50+ iteration redesign. All pages documented with hierarchy, headings, content, and code examples extracted.*

