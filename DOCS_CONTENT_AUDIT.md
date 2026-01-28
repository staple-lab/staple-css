# Staple CSS Documentation Content Audit

**Generated:** January 28, 2026
**Pages Analyzed:** 13 documentation pages from `/apps/docs/src/pages/`

---

## Page 1: HomePageNew.tsx

### Purpose
Hero landing page showcasing the staple-css design system and its core value propositions.

### Page Title (H1)
- "Design Systems That Scale" (with accent on "That Scale")

### Meta Description
Token-first primitives for teams that care about consistency, performance, and code quality. Contract-based, not customization-heavy.

### Main Sections

#### 1. Hero Section
- **Eyebrow text:** "Semantic design tokens. Zero runtime."
- **Tagline:** "Design Systems That Scale"
- **Subtitle:** "Token-first primitives for teams that care about consistency, performance, and code quality. Contract-based, not customization-heavy."
- **CTAs:**
  - "Start Building" → `/guides`
  - "Why staple-css?"

#### 2. Three Pillars Section
Grid layout with 3 cards:
- **Pillar 01:** "Tokens First" - Design decisions encoded as CSS variables
- **Pillar 02:** "Zero Runtime" - Static CSS only, no JavaScript
- **Pillar 03:** "Ship Fast" - Pre-built semantic primitives

#### 3. What You Get (Capabilities)
Icon + text list (6 items):
- 22 Color Palettes
- Spacing System
- Typography
- Accessibility Built-In
- Performance
- Responsive

#### 4. Philosophy Section
Grid layout (4 cards):
- Consistency
- Maintainability
- Scalability
- Performance

#### 5. Stats Section
4-column grid showing metrics:
- "2.5 KB" - Core Size
- "0 ms" - Runtime Overhead
- "22" - Color Palettes
- "100%" - Tree-Shakeable

#### 6. Our Values Section
Grid layout (4 cards):
- Tokens are the API
- Contract over Customization
- Performance Matters
- Accessibility First

#### 7. Final CTA Section
- Heading: "Ready to Build?"
- Links to: Token System, Primitives, Why staple-css

### Layout Structure
- Full-width hero with centered Container (size="lg")
- Horizontal three-pillar grid
- Single-column capabilities list with icons
- Multi-card philosophy section
- Stat tiles grid
- Value proposition cards grid
- Final CTA centered layout

### Interactive Elements
- Hover effects on CTA buttons
- Links to internal routes

---

## Page 2: WhyPage.tsx

### Purpose
Educational page explaining the philosophy, principles, and benefits behind staple-css design decisions.

### Page Title (H1)
- "Why staple-css?"

### Meta Description
A styling contract that prioritizes consistency, performance, and maintainability.

### Main Sections

#### 1. Hero Section
- Tagline: "Why staple-css?"
- Subtitle: "A styling contract that prioritizes consistency, performance, and maintainability."

#### 2. Core Philosophy
- Explanatory text about "tokens are the API"
- Key insight: Consistency through shared tokens across components

#### 3. Principles Section
Three principle cards with icons:
- **Tokens are the API** (Package icon)
  - Design decisions live in tokens
- **Contract over customization** (Handshake icon)
  - Stable API enables consistency
- **Consistency by default** (Sparkles icon)
  - Happy path keeps in token system

#### 4. Performance-First Design
Four performance metric cards:
- **Static CSS** (0ms runtime overhead)
- **Zero dependencies** (<1kb runtime size)
- **Tree-shakeable** (100%)
- **Intrinsic responsive** (~40% fewer media queries)

#### 5. Long-Term Maintainability
List with row layout (4 items):
- Token versioning
- Centralized design system
- No style props hell
- Design → Code traceability

#### 6. Accessibility Built-In
Grid (2 columns) with checkmarks:
- WCAG Compliance
- Keyboard Navigation
- Motion Respect
- Dark Mode

#### 7. CTA Section
Inline links to:
- Component library (`/primitives`)
- Token system (`/tokens`)

### Layout Structure
- Main column layout with Container (size="md")
- Section header + descriptive text pattern
- Principle cards grid
- Performance metric cards
- Maintenance list rows with dividers
- Accessibility features grid
- Closing CTA paragraph

### Interactive Elements
- Icon elements with gradients
- Internal navigation links

---

## Page 3: TokensPage.tsx

### Purpose
Reference documentation for all token types with import instructions and visual samples.

### Page Title (H1)
- "Tokens"

### Meta Description
Design tokens are the foundation of staple-css. They encode design decisions as CSS variables, ensuring consistency across your application.

### Main Sections

#### 1. Introduction
- Heading: "Tokens"
- Description explaining tokens as foundation

#### 2. Usage
Code preview showing import patterns:
- `@staple-css/tokens/all.css`
- Individual imports (tokens.css, themes.css, density.css)

#### 3. Theming
Code previews showing:
- `data-theme` attribute for light/dark
- `data-density` attribute for comfortable/compact

#### 4. Token Tables (Multiple)
Each with 4 columns: Token | CSS Variable | Value | Sample

Tables shown:
- **Space Scale (0-8)** - With visual padding samples
- **Radius Scale (0-4)** - With visual border radius samples
- **Shadow Scale (0-2)** - With visual shadow samples
- **Font Size Scale (0-6)** - With typography samples
- **Font Weight** - With weight samples
- **Line Height** - Text only
- **Motion Duration** - Text only
- **Motion Easing** - Text only

#### 5. Color Tokens
Table showing all semantic colors with color swatch samples:
- Columns: Token | CSS Variable | Sample
- Shows: primary, danger, warning, success, neutral, text variants

### Layout Structure
- Container (size="lg")
- Section-based column layout
- Inline code examples
- Multiple data tables with alternating light backgrounds
- Color swatches in table cells

### Interactive Elements
- Visual token samples (boxes, circles, etc.)
- Color swatches

---

## Page 4: TokenReferencePage.tsx

### Purpose
Comprehensive reference guide with searchable quick navigation and categorized token documentation.

### Page Title (H1)
- "Complete Token Reference"

### Meta Description
Comprehensive documentation of every token in the staple-css system. Look up exact values, use cases, and implementation patterns.

### Main Sections

#### 1. Introduction
- Heading and descriptive text about completeness of reference

#### 2. Quick Navigation Grid
Grid (base: 2, md: 4, lg: 6) with anchor links to sections:
- Spacing, Sizing, Radius, Shadows, Colors, Typography, Motion, Gradients, Breakpoints, Z-Index, Opacity, Density

#### 3. Spacing Scale (0-8)
Section with:
- Title: "Spacing Scale (0-8)"
- Description of use cases
- 9 token rows with: Key, Value, Usage

#### 4. Max Width Scale
Section with:
- Title: "Max Width Scale"
- 9 sizing tokens (xs to full)

#### 5. Border Radius Scale (0-4)
Section with:
- Title: "Border Radius Scale (0-4)"
- 5 radius levels with descriptions

#### 6. Elevation/Shadow System (0-5)
Section with:
- Title: "Elevation/Shadow System (0-5)"
- 6 shadow levels with use cases

#### 7. Typography Scales
Section with 3 subsections:
- **Font Sizes (0-6):** 7 sizes with specific uses
- **Font Weights:** 4 weight options with use cases
- **Line Heights:** 3 line height tokens

#### 8. Motion Tokens
Section with 2 subsections:
- **Duration (ms):** 7 duration values
- **Easing Functions:** 4 easing options (default, in, out, bounce)

#### 9. Gradient Tokens (22 total)
Section with 2 categories:
- **Tone-Based Gradients (15):** Primary, success, danger, warn (soft/medium/bold)
- **Vibrant Multi-Color (6):** Sunrise, sunset, ocean, forest, grape, mint

#### 10. Responsive Breakpoints
Section with 6 breakpoints:
- base, sm, md, lg, xl, 2xl with pixel values

#### 11. Semantic Colors
Section with 2 subsections:
- Light Theme colors
- Dark Theme (auto-adapted)

#### 12. Opacity Scale
Section with 5 opacity levels (0%, 25%, 50%, 75%, 100%)

#### 13. Z-Index Scale
Section with 7 z-index tokens

#### 14. Density Modes
Section with 2 subsections:
- **Comfortable (default):**
- **Compact:**

### Layout Structure
- Container (size="xl")
- Quick navigation grid at top
- Anchor-linked sections using display: "contents"
- TokenRow component displaying grid: key | value | usage
- Categorized subsections within main sections

### Interactive Elements
- Quick navigation anchor links
- Hover effects on navigation items (border/background color changes)

---

## Page 5: ColorSystemPage.tsx

### Purpose
Visual showcase of the complete color system including semantic colors, palettes, gradients, and accessibility guidelines.

### Page Title (H1)
- "Color System"

### Meta Description
Purpose-built semantic colors that adapt across themes. A cohesive palette for consistent, accessible interfaces with built-in dark mode support.

### Main Sections

#### 1. Introduction
- Heading: "Color System"
- Subtitle about semantic colors and themes

#### 2. Semantic Colors
Grid (base: 1, md: 2, lg: 3) with 5 color cards:
- **Primary** - #2563eb / #3b82f6
- **Danger** - #dc2626 / #ef4444
- **Warning** - #d97706 / #f59e0b
- **Success** - #16a34a / #22c55e
- **Neutral** - #111827 / #f9fafb

Each card shows light/dark swatches, description, and hex values.

#### 3. Color Palettes
Grid (base: 2, md: 3, lg: 4) showing 12 palette previews:
- slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald

Each showing 11-step color ramp (50-950).

Info box: "Using Palettes" - import instruction for `@staple-css/tokens/palettes.css`

#### 4. Gradient Tokens
Grid (base: 1, md: 2, lg: 3) with 3 gradient categories:
- **Tone-Based** - 15 systematic gradients
- **Vibrant** - 6 expressive multi-color
- **Overlays** - 3 semi-transparent

#### 5. Accessibility Section
Grid (base: 1, md: 2) with 4 accessibility topics:
- **Contrast** - WCAG AA 4.5:1 ratio
- **Intent** - Semantic naming
- **Themes** - Automatic light/dark switching
- **Testing** - Tools and validators

Each with bullet point list of verification methods.

### Layout Structure
- Container (size="xl")
- Section headers with description text
- Semantic color cards showing dual swatches
- Palette ramp grid with visual samples
- Gradient showcase cards
- Accessibility features grid
- Checkmark-based accessibility list

### Interactive Elements
- Color swatches (visual-only)
- Info boxes with background color
- Grid layouts responsive by breakpoint

---

## Page 6: VisualsPage.tsx

### Purpose
Comprehensive visual system documentation with interactive demonstrations of design elements (elevation, radius, gradients, motion, typography, spacing).

### Page Title (H1)
- "Visual System & Design Language"

### Meta Description
Comprehensive visual guidelines including icons, illustrations, shadows, and motion. Create beautiful, cohesive interfaces with consistent visual language.

### Main Sections

#### 1. Elevation System (Shadows)
Grid (base: 1, md: 2, lg: 3) with 5 shadow level cards:
- Level 1-5 with descriptions (subtle depth → topmost elements)
- Each card contains visual demonstration box with applied shadow

#### 2. Border Radius Scale
Grid (base: 2, md: 4) showing 5 radius levels:
- 0px (Sharp) through 16px (Round)
- Each with visual square demonstration using gradient background

#### 3. Gradient Showcase
Grid (base: 1, md: 2, lg: 3) with 6 gradient examples:
- Sunrise, Sunset, Ocean, Forest, Grape, Mint
- Large preview boxes with gradient applied
- Interactive hover scale effect

#### 4. Motion & Transitions
Grid (base: 1, md: 2) with 4 motion demonstrations:
- **Fade In** (200ms)
- **Slide Up** (300ms)
- **Scale** (250ms)
- **Bounce** (500ms)

Each with animated visual demo and CSS keyframes defined inline.

#### 5. Typography Scale
Column list (base: 1) showing 7 font sizes:
- Size 0 (12px) through Size 6 (32px)
- Each row shows size label, sample text, and purpose

#### 6. Spacing Scale Visualization
Column list showing 9 spacing values:
- Space-0 (0px) through Space-8 (64px)
- Visual bar representing pixel value
- Label and monospace value display

#### 7. Interactive States
Horizontal row of 4 state demonstrations:
- Default, Hover, Active, Disabled
- Visual button showing state styling
- State description below

#### 8. Visual Accessibility
Grid (base: 1, md: 2) with 6 accessibility guidelines:
- **Contrast** - WCAG AA 4.5:1+
- **Focus** - Visible focus indicators
- **Motion** - prefers-reduced-motion
- **Touch** - 44px min targets
- **Meaning** - Not color alone
- **Readability** - Optimized line height

Each with icon, title, description.

### Layout Structure
- Container (size="xl")
- Icon badge headers for section groups
- Grid layouts for demonstrations
- Inline keyframe animations in `<style>` tags
- Icon-based feature lists
- Interactive state row with overflow scroll

### Interactive Elements
- Animated shadow levels
- Scale transforms on gradient hover
- Inline motion animations (infinite loops)
- Button state interactions
- Icon visual indicators

---

## Page 7: ComponentPatternsPage.tsx

### Purpose
Production-ready UI component patterns showing practical examples of buttons, forms, cards, alerts, layouts, data tables, and code examples.

### Page Title (H1)
- "Component Patterns"

### Meta Description
Production-ready patterns and examples for common UI components. Copy, customize, and compose with staple-css primitives and tokens.

### Main Sections

#### 1. Button Patterns
Grid (base: 1, md: 2, lg: 3) with 6 button variations:
- Primary Solid, Primary Outline, Danger Solid, Success Outline, Small, Large
- Each with styled button element demo

#### 2. Form Components
Grid (base: 1, md: 2) with 6 form examples:
- Text Input
- Select Dropdown
- Checkbox
- Radio Group
- Textarea
- Range Slider

Each with label and interactive form element.

#### 3. Card Variations
Grid (base: 1, md: 2, lg: 3) with 6 card patterns:
- Simple Card
- Header Card (with colored header section)
- Hover Card (with lift effect)
- Feature Card (gradient + white text)
- Stats Card (large number centered)
- Action Card (with button)

#### 4. Alerts & Notifications
Column list with 4 alert variations:
- primary, success, danger, warn
- Each with icon, title, description
- Colored backgrounds matching tone

#### 5. Layout Patterns
Grid (base: 1, md: 2) with 4 layout demos:
- Two Column Layout
- Sidebar Layout
- Grid Layout (3x2)
- Stack Layout

Visual box representations of layout structure.

#### 6. Data Display Patterns
Large card with data table example:
- Table with header: Name | Status | Progress
- 3 data rows with status badge
- Responsive overflow wrapper

#### 7. Copy-Paste Code Examples
Large card with pre-formatted code block:
- Example: Card component with Column/Row composition
- Highlighted syntax showing primitives usage

### Layout Structure
- Icon-badged section headers
- Multiple grid-based pattern cards
- Pattern cards contain visual demos
- Colored alert/notification patterns
- Large data table in responsive wrapper
- Code block in pre/code container

### Interactive Elements
- Hover card lift effect (box-shadow + translateY)
- Interactive buttons with state styling
- Form inputs (functional)
- Status badges with color coding

---

## Page 8: PrimitivesPage.tsx

### Purpose
Documentation of core layout and typography primitive components with installation, props, responsive patterns, and best practices.

### Page Title (H1)
- "Primitives"

### Meta Description
Essential layout and typography components. All props support responsive design with { base, md, lg } breakpoints.

### Main Sections

#### 1. Installation
Two code preview blocks:
- npm install command
- Import statement

#### 2. Box Component
- Description: "Universal container. Props: pad, margin, radius, shadow."
- Basic example
- Responsive example with breakpoint object

#### 3. Column Component
- Description: "Vertical layout (flex column). Props: gap, align, justify."
- Example with 3 items
- Responsive gap example

#### 4. Row Component
- Description: "Horizontal layout (flex row). Props: gap, align, justify."
- Example with label/value layout

#### 5. Grid Component
- Description: "CSS Grid. Props: cols, gap, rows, alignContent."
- Responsive columns example (base: 1, md: 2, lg: 3)

#### 6. Text Component
- Description: "Typography. Props: size, weight, tone, as, align."
- Multiple examples
- Property ranges: Sizes 0-6, Weights, Tones (8 options)

#### 7. Flex Component
- Description: "Custom flexbox layouts. Combines Row/Column capabilities."
- Example with direction, gap, align, justify

#### 8. Container Component
- Description: "Max-width wrapper. Sizes: sm, md, lg, xl."
- Example showing max-width constraint

#### 9. Responsive Pattern
- Code explanation of breakpoint object usage
- Examples across multiple component types
- Breakpoint values: base (0px), md (768px), lg (1024px)

#### 10. Best Practices
Two-column layout with colored left borders:
- **Do list** (green border)
- **Don't list** (red border)

### Layout Structure
- Container (size="lg")
- Column gap layout throughout
- Inline code preview sections
- Best practices side-by-side comparison

### Interactive Elements
- Code preview blocks
- Best practices visual comparison

---

## Page 9: GradientsPage.tsx

### Purpose
Complete gradient token showcase with usage instructions and categorized gradient cards.

### Page Title (H1)
- "Gradient Tokens"

### Meta Description
Pre-defined, perceptually-smooth gradients for modern, accessible design. Use with the background or background-image CSS properties.

### Main Sections

#### 1. Introduction
- Heading and description
- Usage context (background, background-image)

#### 2. How to Use
Card (pad=6, radius=3) containing:
- Heading: "How to Use"
- Explanatory text
- Code block showing CSS variable syntax

#### 3. Tone-Based Gradients
Grid (base: 1, md: 2, lg: 3) with 15 gradient cards:
- Categories: Neutral (3), Primary (3), Danger (3), Warning (3), Success (3)
- Each card shows: Gradient preview | Name | Description | CSS variable

#### 4. Vibrant Multi-Color Gradients
Grid (base: 1, md: 2, lg: 3) with 6 gradient cards:
- Sunrise, Sunset, Ocean, Forest, Grape, Mint
- Same card structure as tone-based

#### 5. Overlay Gradients
Grid (base: 1, md: 2) with 3 gradient cards:
- Diagonal Light, Diagonal Dark, Shimmer

#### 6. Integration Section
Card (tone="primary", white text) promoting Gradient Studio:
- Title: "Integration with Gradient Maker"
- Link to Studio page

### Layout Structure
- Column-based layout
- Code preview in card
- Multiple grid sections for categorized gradients
- GradientCard component with preview + metadata

### Interactive Elements
- GradientCard component displays gradient variable visually
- Links to Gradient Studio

---

## Page 10: GradientStudioPage.tsx

### Purpose
Interactive gradient maker tool for creating and exporting custom gradients.

### Page Title (H1)
- "Gradient Studio"

### Meta Description
Design and export custom gradients for your design system.

### Main Sections

#### 1. Introduction
- Heading: "Gradient Studio"
- Subtitle: "Design and export custom gradients for your design system."

#### 2. Gradient Maker Component
- Interactive component (GradientMaker) imported from components
- Allows users to design gradients visually

### Layout Structure
- Container (size="md")
- Simple column layout
- Embedded interactive component

### Interactive Elements
- Full interactive gradient maker interface

---

## Page 11: FigmaIntegrationPage.tsx

### Purpose
Documentation of bidirectional Figma token synchronization capabilities, workflows, and supported token types.

### Page Title (H1)
- "Figma Integration"

### Meta Description
Seamlessly sync design tokens between Figma and your codebase. Keep design and development in perfect sync with bidirectional token support.

### Main Sections

#### 1. Header
- Heading: "Figma Integration"
- Description about bidirectional sync

#### 2. Two-Way Sync Section
Flow diagram showing:
- **Figma → Code:** Export tokens to CSS/JSON/TypeScript
- Arrow separator
- **Code → Figma:** Import CSS variables to Figma

#### 3. Key Features
Grid (base: 1, md: 2, lg: 3) with 6 feature cards:
- **Bidirectional Sync** - Updates propagate everywhere
- **Multiple Formats** - CSS, JSON, TypeScript, Figma format
- **All Token Types** - All token categories sync
- **Version Control** - Track and roll back changes
- **Team Collaboration** - Multi-user support
- **Custom Mappings** - Auto-map naming conventions

Each with icon, title, description.

#### 4. Supported Token Types
Grid (base: 1, md: 2, lg: 3) with 6 categories:
- **Colors:** Semantic colors, palettes, themes, opacity
- **Typography:** Families, sizes, weights, line heights
- **Spacing & Sizing:** Scales, radius, max-width, gaps
- **Effects:** Shadows, gradients, blur, backdrop filters
- **Motion:** Duration, easing, delays, animations
- **Grid & Layout:** Breakpoints, z-index, aspect ratios, utilities

Each category shown as list with bullet points.

#### 5. Integration Workflow
Grid (base: 1, md: 2) with 2 workflow cards:

**Export (Figma → Code):**
- 5 steps: Install Plugin → Select Tokens → Choose Format → Download → Auto-Sync
- Each step with numbered circle and description

**Import (Code → Figma):**
- 5 steps: Export Tokens → Select Format → Upload to Figma → Create Libraries → Apply to Designs
- Green numbered circles

#### 6. Export Formats
Grid (base: 1, md: 2) with 4 format cards:
- **CSS Variables** - Standard custom properties
- **JSON** - Structured data format
- **TypeScript** - Type-safe definitions
- **Figma Tokens** - Native format

Each with format name, description, code example in pre block.

#### 7. CTA Section
- Heading: "Ready to sync with Figma?"
- Description
- Two buttons: "Token Studio →" and "View Figma Plugin"

### Layout Structure
- Custom CSS with figma-page div wrapper
- Sync flow diagram with centered layout
- Feature cards grid
- Token type category grid
- Workflow steps grid with numbered progression
- Export format code examples
- CTA buttons grid

### Interactive Elements
- Links to Token Studio and Figma Plugin

---

## Page 12: ExamplesPage.tsx

### Purpose
Real-world usage examples including quick start, key features, form example, dashboard metrics, best practices, and competitive comparison table.

### Page Title (H1)
- "Real-World Examples"

### Meta Description
Production-ready patterns and components built with staple-css

### Main Sections

#### 1. Quick Start
- Heading: "Get Started in Minutes"
- Info about bundle size options (2.5 KB core, 8.23 KB full)
- Buttons: "View Docs" and "Try Playground"

#### 2. Key Features
Grid (base: 1, md: 2) with 6 feature rows:
- **Token-First** (Target icon)
- **Ultra-Lightweight** (Zap icon)
- **Type-Safe** (Lock icon)
- **Beautiful by Default** (Palette icon)
- **Tree-Shakeable** (Package icon)
- **Performance** (Rocket icon)

Each with icon, title, description.

#### 3. Form Example: Sign In
Visual form card containing:
- Heading: "Enter your details"
- Subtitle: "Continue to your dashboard"
- Email input with label
- Password input with "Reset" link
- "Keep me signed in" checkbox
- Sign In button
- "Create account" link

#### 4. Dashboard Metrics
Grid (base: 1, md: 2) with 4 metric cards:
- **Total Users** (Users icon) - 12,345 | ↑ 12%
- **Revenue** (DollarSign icon) - $48,230 | ↑ 8%
- **Conversion** (TrendingUp icon) - 3.24% | ↓ 0.5%
- **Sessions** (Circle icon) - 1,892 | ↑ 4%

Each with icon, label, large value, trend indicator.

#### 5. Best Practices
Two-column comparison:
- **Do list** (green left border) with checkmark icons
- **Don't list** (red left border) with X icons

#### 6. Bundle Size Comparison
Table with columns:
- Framework | Bundle (gzip) | Runtime | Components | Type Safety

Rows:
- staple-css: 2.5 KB | 0 KB | 8 | ✅ Full
- Tailwind CSS: ~10 KB | 0 KB | 1000+ | ⚠️ Partial
- Chakra UI: ~45 KB | ~15 KB | 50+ | ✅ Full
- Material-UI: ~80 KB | ~45 KB | 100+ | ✅ Full

### Layout Structure
- Container (size="lg")
- Section-based column layout
- Grid for features and metrics
- Form card with bounded width
- Comparison table in responsive wrapper
- Best practices side-by-side layout

### Interactive Elements
- Interactive form inputs
- Buttons linking to docs/playground
- Metrics display
- Comparison table (responsive overflow)

---

## Page 13: GuidesPage.tsx

### Purpose
Best practices and design guidelines for using staple-css tokens and primitives effectively across 8 key topic areas.

### Page Title (H1)
- "Design Guides & Best Practices"

### Meta Description
Comprehensive guides for building consistent, accessible, and performant interfaces with staple-css tokens and primitives.

### Main Sections

#### 1. Introduction
- Heading: "Design Guides & Best Practices"
- Description about comprehensive guides

#### 2. Eight Guide Cards (Grid, base: auto, md: auto layout)
Each card shows: numbered badge | icon | title | 3 bullet points | accent color

**Cards:**

1. **Spacing & Layout** (Ruler icon, blue)
   - Space Scale (0-8)
   - Padding vs Margin
   - Intrinsic Responsive patterns

2. **Color & Contrast** (Palette icon, pink)
   - Semantic Colors
   - WCAG AA Compliance
   - Light & Dark themes

3. **Typography & Text** (Type icon, purple)
   - Font Scale (0-6)
   - Line Height scaling
   - Readable length (50-75 chars)

4. **Motion & Animation** (Zap icon, orange)
   - Duration Scale
   - Easing Functions
   - Accessibility respect

5. **Responsive Design** (Smartphone icon, green)
   - Mobile-First approach
   - Breakpoints (sm/md/lg/xl)
   - Touch targets (44x44px)

6. **Accessibility (a11y)** (Accessibility icon, cyan)
   - Semantic HTML
   - Color Contrast (4.5:1)
   - Focus Management

7. **Component Patterns** (Box icon, indigo)
   - Composition with primitives
   - Props as Tokens
   - Escape hatches (className)

8. **Design Tokens Strategy** (Settings icon, teal)
   - Token Hierarchy
   - Naming Convention
   - Versioning & migration

### Layout Structure
- Container (size="xl")
- Guide cards in CSS grid (2 columns responsive)
- Each card contains:
  - Numbered badge (01-08)
  - Icon display
  - Title heading
  - Bullet point list
- Accent color variable applied per card (`--accent-color`)

### Interactive Elements
- Visual icon displays
- Numbered card badges

---

## Cross-Page Content Patterns

### Consistent Elements
1. **Header Pattern:** H1 title + meta description text in muted tone
2. **Section Headers:** Icon badge + H2 title + muted description
3. **Card Layouts:** Multiple grid-based card systems for content organization
4. **Code Examples:** CodePreview component with syntax highlighting
5. **CTAs:** Consistent link buttons with arrow suffixes
6. **Visual Demonstrations:** Inline visual samples (boxes, colors, gradients)
7. **List Patterns:** Bullet points, icon-based lists, comparison lists
8. **Best Practices:** Do/Don't side-by-side with visual indicators

### Color Usage
- Primary accent color: `var(--st-color-primary)` (blue)
- Semantic colors: danger (red), success (green), warn (orange)
- Neutral backgrounds: `var(--st-color-surface)`
- Text: `var(--st-color-text)` and `var(--st-color-text-muted)`

### Typography Patterns
- H1 (size 5-6): Page titles
- H2 (size 3-4): Major sections
- H3 (size 2-3): Subsections
- Body text: size 1-2
- Metadata: size 0-1, muted tone

### Layout Patterns
- **Single column:** Main reading flow
- **2-column grids:** Feature pairs, comparisons
- **3-column grids:** Card showcases
- **4-6 column grids:** Quick navigation, stats
- **Responsive:** All grids scale from base (1 col) to md (2-3 cols) to lg (3-4 cols)
- **Container sizes:** sm, md, lg, xl (most use md-lg)

### Interactive Element Patterns
- Hover state color changes (border, background)
- Scale transforms on gradient cards
- Shadow elevation on hover
- Button state styling (hover, active, disabled)
- Animated keyframes for motion demonstrations
- Inline style state management

---

## Content Audit Summary

| Page | Content Type | Primary Purpose | Key Sections | CTA Count |
|------|--------------|-----------------|--------------|-----------|
| HomePageNew | Landing | Value proposition | Hero, 3 Pillars, Capabilities, Philosophy, Stats, Values, CTA | 3 |
| WhyPage | Educational | Philosophy & benefits | Principles, Performance, Maintainability, A11y | 2 |
| TokensPage | Reference | Token documentation | Usage, Theming, Token tables (8 types) | 0 |
| TokenReferencePage | Reference | Comprehensive reference | 14 token sections with quick nav | 0 |
| ColorSystemPage | Reference | Color system showcase | Semantic colors, Palettes, Gradients, A11y | 0 |
| VisualsPage | Reference | Visual system | Elevation, Radius, Gradients, Motion, Typography, Spacing, States, A11y | 0 |
| ComponentPatternsPage | Examples | Pattern library | Buttons, Forms, Cards, Alerts, Layouts, Data tables, Code | 0 |
| PrimitivesPage | Documentation | Component API | 8 components + Installation + Best practices | 0 |
| GradientsPage | Reference | Gradient tokens | Tone-based, Vibrant, Overlays | 1 |
| GradientStudioPage | Tool | Interactive tool | Gradient Maker interface | 0 |
| FigmaIntegrationPage | Documentation | Figma sync | Features, Token types, Workflows, Formats | 2 |
| ExamplesPage | Examples | Real-world usage | Quick start, Features, Form, Dashboard, Comparison | 2 |
| GuidesPage | Guidelines | Best practices | 8 guide cards covering design topics | 0 |

---

## Observations & Recommendations

### Strengths
1. **Comprehensive coverage** - All major topics (tokens, components, patterns, guides) are documented
2. **Visual demonstrations** - Heavy use of interactive demos and visual examples
3. **Progressive disclosure** - From landing page → why → tokens → references → examples
4. **Consistent navigation** - Repeated CTAs guide users through natural learning path
5. **Reference completeness** - Token and color reference pages are thorough

### Content Organization
- Landing page → philosophy pages → technical references → examples → guides
- Each page is self-contained with embedded CTAs to related pages
- Quick navigation elements help users jump between sections

### Layout Consistency
- Most pages use Container (md-lg), Column-based layouts
- Responsive grids (1/2/3 columns) used extensively
- Consistent header/section patterns throughout
- Icon badges used to identify section types

### Interactive Elements
- Primarily visual (color swatches, gradients, shadows)
- Some functional (form inputs, buttons)
- Motion demonstrations with CSS keyframes
- Hover effects for enhanced interactivity

### Missing Elements
- Search functionality across pages
- Breadcrumb navigation
- "Previous/Next" page navigation
- Table of contents on long pages
- Scroll progress indicators
- Dark mode toggle showcase (implied but not demonstrated)
