# Token Studio - Comprehensive Guide

**Status**: ✅ COMPLETE - Full UI coverage for all 40+ CSS token types

The Staple CSS Token Studio is a professional-grade visual token system builder. It provides an interactive interface for designing and managing every aspect of your design system tokens.

## Overview

Token Studio is structured in three steps:

1. **Brand Colors** - Define seeds and semantic color mappings
2. **Scales** - Configure all token scales (11 tabs, 40+ token types)
3. **Export** - Save as JSON or CSS

## Step 1: Brand Colors

### Seeds (Primary, Secondary, Accent)
- Color pickers for brand colors
- Automatic palette generation (OKLCH or HCT algorithms)
- Step count configuration (8, 10, or 12 steps)
- Chroma and contrast controls

### Custom Colors
- Add unlimited branded colors beyond primary/secondary/accent
- Each color generates a full palette
- Color harmony suggestions (complementary, triadic, analogous, etc.)

### Semantic Mapping
- Light and dark mode color assignments
- Predefined semantic tokens:
  - Backgrounds (surface, surfaceRaised, surface Secondary)
  - Text (text, textMuted, textInverse)
  - Borders (border, borderMuted)
  - UI State (primary, danger, warn, success)
  - Focus states (focus, focusRing)
- WCAG 2.1 contrast validation
- Per-shade fine-tuning with palette overrides

### Palette Management
- 22 Tailwind-compatible color palettes
- Custom palette creation from any base color
- Full ramp generation (11 shades: 50-950)

## Step 2: Scales - Complete Token Type Coverage

### Core Scales (6 tabs)

#### Breakpoints
- Define responsive breakpoints
- Editable names and width values
- Used across responsive token configurations
- Default: sm, md, lg, xl, 2xl (Tailwind-compatible)

#### Space
- 0-8 scale (default: 0, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
- Responsive overrides per breakpoint
- Visual bar preview showing scale progression
- Common uses: padding, margin, gap

#### Radius
- 0-4 scale (default: 0, 2px, 4px, 8px, 16px)
- Visual preview boxes showing border radius
- Common uses: border-radius, border radius variants

#### Shadow
- 0-5 scale (enterprise elevation system)
- Visual depth preview with box shadows
- Used for elevation and depth cues
- Includes text shadows if needed

#### Typography (3 sub-controls)
- **Font Size** (0-6): 12px to 32px scale
- **Font Weight**: normal, medium, semibold, bold
- **Line Height**: tight, normal, relaxed

#### Motion (2 sub-controls)
- **Duration**: instant, fast, normal, moderate, slow, slower, slowest
- **Easing**: 15 preset curves (linear, in, out, inOut, emphasized, bounce, elastic, snap, etc.)
  - Interactive easing preview with animation balls
  - Click "Preview" to see curves in action

### NEW: Transform & Effects (8 tabs)

#### Blur
- Visual filter preview showing blur effect
- CSS filter: `blur(Xpx)`

#### Brightness
- Adjust brightness from 0-2
- Visual preview showing effect
- CSS filter: `brightness(X)`

#### Contrast
- Contrast adjustment 0-2
- Visual gradient preview
- CSS filter: `contrast(X)`

#### Saturate
- Color saturation control 0-2
- Multi-color gradient preview
- CSS filter: `saturate(X)`

#### Scale
- Transform scale factor 0-2
- Visual preview with centered box
- CSS transform: `scale(X)`

#### Translate
- Position offset control
- Based on space scale (-6 to +6)
- CSS transform: `translate(X, Y)`

#### Rotate
- Rotation angles (0°, 45°, 90°, 180°, ±45°, ±90°)
- CSS transform: `rotate(Xdeg)`

#### Backdrop
- Backdrop filter effects
- Blur, brightness, contrast, saturate combinations
- CSS: `backdrop-filter: blur(...)`

### NEW: Borders & Text (5 tabs)

#### Border Width
- Border thickness scale
- Visual preview with colored borders
- Common values: 0, 1px, 2px, 3px, 4px, 8px

#### Outline Width
- Outline thickness
- Visual preview showing outline appearance
- Values: 0, 1px, 2px, 4px, 8px

#### Outline Offset
- Distance between element and outline
- Visual preview with offset display
- Values: 0, 1px, 2px, 4px, 8px

#### Letter Spacing
- Text letter spacing
- "Sample Text Here" preview showing effect
- Values: e.g., -0.05em, 0, 0.025em, 0.05em

#### Line Clamp
- Text truncation control (1-6 lines, none)
- CSS: `-webkit-line-clamp`, `display: -webkit-box`

### NEW: Layout Utilities (6 tabs)

#### Display
- Display types: block, inline-block, inline, flex, inline-flex, grid, inline-grid, none, contents
- Fundamental CSS layout modes

#### Position
- Positioning modes: static, relative, absolute, fixed, sticky
- Controls element positioning context

#### Overflow
- Overflow handling: visible, hidden, scroll, auto, clip
- Controls content overflow behavior

#### Flex Grow
- Flex growth factor: 0 (no growth), 1 (equal growth)
- Used in flexbox layouts

#### Flex Shrink
- Flex shrink factor: 0 (no shrink), 1 (equal shrink)
- Prevents unwanted flexbox shrinking

#### Order
- Flex order: -1, 0, 1, 2, 3, etc.
- Reorder flex children

### NEW: Sizing & Depth (4 tabs)

#### Max Width
- Container width constraints
- Values: xs, sm, md, lg, xl, 2xl-7xl, prose, full, screen
- Visual preview of aspect ratios

#### Aspect Ratio
- Predefined ratios: square, video (16:9), portrait, landscape, wide, golden
- Visual aspect ratio preview boxes

#### Z-Index
- Stacking order control: 0, 10, 20, 30, 40, 50, max
- Used for layering and modal management

#### Opacity
- Transparency 0-1 (0-100%)
- Visual opacity preview
- Useful for subtle effects

### NEW: Text Utilities (4 tabs)

#### Text Transform
- Case transformation: none, uppercase, lowercase, capitalize
- "Sample Text" preview showing transformation

#### White Space
- Whitespace handling: normal, nowrap, pre, pre-line, pre-wrap
- Controls text wrapping and spacing

#### Object Fit
- Image/video fitting: contain, cover, fill, none, scale-down
- CSS `object-fit` property

#### Cursor
- Mouse cursor styles: auto, default, pointer, wait, text, move, not-allowed, grab, grabbing
- Interactive preview showing cursor style

## Step 3: Export

### JSON Export
- Complete token configuration
- Includes all scales, colors, semantics, overrides
- Can be reimported to restore configurations
- Filename: `tokens-config.json`

### CSS Export Options
- **All** - Complete CSS file with tokens, themes, and palettes
- **Tokens** - Base token definitions only
- **Themes** - Light/dark theme overrides
- **Palettes** - Tailwind-compatible color palettes

### Import
- Upload previously exported JSON configs
- Restore full token system state
- Error handling for invalid formats

### AI Assistance
- LLM prompt generator for color palette suggestions
- Copy prompt to ChatGPT/Claude for brand color recommendations
- Import returned hex colors directly into studio

## User Interface Features

### Tab Organization
```
Row 1: Breakpoints | Space | Radius | Shadow | Typography | Motion
Row 2: ✨ Transforms & Effects | ◻️ Borders & Text | 📐 Layout Utils | 📏 Sizing & Depth | ✏️ Text Utils
```

### Generic Controls (Available on all scales)
- **Add** - Create new token item
- **Reset** - Restore defaults for this scale
- **Remove** - Delete individual items (× button)
- **Edit** - Inline text input for values

### Preview Features
- Real-time visual previews for most token types
- Motion animation previews (click "Preview" button)
- Color contrast validation
- Responsive breakpoint indicators

### Accessibility
- WCAG 2.1 contrast checking for colors
- Full keyboard navigation
- Semantic HTML throughout
- Form controls with proper labels

## Keyboard Shortcuts

- **Cmd/Ctrl + B** - Toggle sidebar (layout management)

## Workflow Example

### Create a Custom Design System

1. **Brand Colors** Step
   - Set primary to `#3b82f6` (blue)
   - Generate secondary using "Complementary" harmony
   - Set accent to `#f59e0b` (amber)
   - Customize success (#10b981), warning (#f59e0b), danger (#ef4444)
   - Adjust semantic colors for contrast

2. **Scales** Step
   - Review and adjust default space, radius, shadow scales
   - Add custom typography scales if needed
   - Add transform effects for animations
   - Configure layout utilities for your design
   - Set up sizing constraints (max-width for containers)

3. **Export** Step
   - Export as JSON to version control
   - Export CSS to include in your project
   - Use in apps: `npm install @staple-css/tokens` + export CSS

## Integration

### In Your Application

```bash
# Install the library
npm install @staple-css/tokens

# Import the CSS
import "@staple-css/tokens/tokens.css"
import "@staple-css/tokens/themes.css"
import "@staple-css/tokens/palettes.css"
```

### Using Exported CSS

```css
/* Use CSS variables in your styles */
.button {
  padding: var(--st-space-3) var(--st-space-4);
  background-color: var(--st-color-primary);
  border-radius: var(--st-radius-2);
  box-shadow: var(--st-shadow-1);
  transition: all var(--st-duration-normal) var(--st-easing-default);
}

.button:hover {
  background-color: var(--st-color-primary-hover);
  box-shadow: var(--st-shadow-2);
}
```

### With React Primitives

```tsx
import { Box, Text, Card, Column, Row } from "@staple-css/primitives"

export function MyComponent() {
  return (
    <Card pad={4} radius={2} shadow={1}>
      <Column gap={3}>
        <Text weight="bold">Heading</Text>
        <Row gap={2}>
          <Box pad={3} style={{ background: "var(--st-color-primary)" }} />
        </Row>
      </Column>
    </Card>
  )
}
```

## Advanced Features

### Palette Overrides
- Click individual palette swatches to fine-tune specific shades
- Perfect for accessibility adjustments or brand tweaks

### Responsive Scales
- Space tokens support per-breakpoint overrides
- Define different padding/margins for mobile vs desktop

### Custom Palettes
- Create unlimited brand-specific color palettes
- Each color generates a full 11-shade ramp
- Export with main tokens as CSS variables

### Theme System
- Separate light and dark mode configurations
- Automatic WCAG contrast calculation
- Preview both modes in real-time

## Performance

- All scales start empty by default (zero overhead)
- Add only the tokens you need
- CSS output is static (zero runtime cost)
- ~2.5 KB core, ~8.23 KB full with all tokens

## Troubleshooting

### Import Not Working
- Verify JSON format: should be valid `BuilderConfig` structure
- Check browser console for error messages
- Re-export a working config to see expected format

### Colors Look Wrong
- Check light/dark mode setting (button in preview sidebar)
- Verify semantic overrides aren't conflicting
- Adjust contrast targets in generation settings

### CSS Not Generating
- Ensure you've defined at least seeds
- Click Export and check the generated CSS
- Verify breakpoints are defined before using responsive scales

## Detailed Token Type Reference

| Category | Type | Count | Default Values |
|----------|------|-------|-----------------|
| Spatial | Space | 9 | 0-8 scale |
| Spatial | Radius | 5 | 0-4 scale |
| Effects | Shadow | 6 | 0-5 elevation |
| Effects | Blur | Custom | Pixel-based |
| Effects | Brightness | Custom | 0-2 range |
| Effects | Contrast | Custom | 0-2 range |
| Effects | Saturate | Custom | 0-2 range |
| Effects | Scale | Custom | 0-2 range |
| Motion | Duration | 7 | 75ms-1000ms |
| Motion | Easing | 15 | Cubic curves |
| Motion | Delay | Custom | 0-1000ms |
| Typography | Font Size | 7 | 12px-32px |
| Typography | Font Weight | 4 | normal-bold |
| Typography | Line Height | 3 | tight-relaxed |
| Layout | Display | 9 | block-contents |
| Layout | Position | 5 | static-sticky |
| Layout | Overflow | 5 | visible-clip |
| Layout | Flex Grow | 2 | 0, 1 |
| Layout | Flex Shrink | 2 | 0, 1 |
| Layout | Order | Custom | Integer values |
| Sizing | Max Width | 10+ | xs-screen |
| Sizing | Aspect Ratio | 7 | square-golden |
| Sizing | Z-Index | 7 | 0-max |
| Sizing | Opacity | 11 | 0-1 (10% steps) |
| Borders | Border Width | 6 | 0-8px |
| Borders | Outline Width | 5 | 0-8px |
| Borders | Outline Offset | 5 | 0-8px |
| Borders | Letter Spacing | Custom | em-based |
| Borders | Line Clamp | 7 | 1-6, none |
| Text | Text Transform | 4 | none-capitalize |
| Text | White Space | 5 | normal-pre-wrap |
| Text | Object Fit | 5 | contain-scale-down |
| Text | Cursor | 9 | auto-grabbing |
| Colors | Semantic | 25+ | Light/dark pairs |
| Colors | Palettes | 22 | slate-rose (11 shades each) |

## Version History

- **v1.0.0** - Initial comprehensive Token Studio
  - Full UI for all 40+ token types
  - Color system with semantic mapping
  - Responsive scales with breakpoint support
  - Import/export with JSON and CSS
  - Real-time preview and validation
  - Professional enterprise-grade interface

---

**Last Updated**: 2026-01-26
**Coverage**: 100% of CSS token types defined in staple-css
