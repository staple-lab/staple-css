# Figma Integration

Seamlessly sync design tokens between Figma and your codebase. Keep design and development in perfect sync with bidirectional token support.

---

## Two-Way Sync

### Figma → Code
Export design tokens from Figma to CSS variables, JSON, or TypeScript

### Code → Figma
Import your CSS variables and design tokens into Figma automatically

---

## Key Features

### Bidirectional Sync
Keep Figma and code in sync automatically. Update in one place, sync everywhere.

### Multiple Formats
Export as CSS variables, JSON, TypeScript, or Figma tokens format.

### All Token Types
Colors, typography, spacing, shadows, gradients, motion tokens - everything syncs.

### Version Control
Track token changes over time. Roll back to previous versions easily.

### Team Collaboration
Multiple designers and developers can sync tokens without conflicts.

### Custom Mappings
Map Figma token names to your codebase naming conventions automatically.

---

## Supported Token Types

### Colors
- Semantic colors (primary, danger, warning, success)
- Color palettes (22 Tailwind-compatible palettes)
- Light & dark theme variants
- Opacity levels

### Typography
- Font families (sans, mono)
- Font sizes (7 steps)
- Font weights (400, 500, 600, 700)
- Line heights (tight, normal, relaxed)

### Spacing & Sizing
- Space scale (0-8)
- Border radius (0-4)
- Max width values
- Gap & padding tokens

### Effects
- Shadows (0-5 elevation)
- Gradients (22 pre-built)
- Blur effects
- Backdrop filters

### Motion
- Duration values (75ms - 1000ms)
- Easing functions
- Delay values
- Animation definitions

### Grid & Layout
- Breakpoints (sm, md, lg, xl, 2xl)
- Z-index scale
- Aspect ratios
- Layout utilities

---

## Integration Workflow

### Export (Figma → Code)

Get design tokens from Figma into your codebase

1. **Install Plugin**: Add staple-css Figma plugin
2. **Select Tokens**: Choose tokens to export
3. **Choose Format**: CSS, JSON, or TypeScript
4. **Download**: Save tokens to your repo
5. **Auto-Sync**: Updates sync automatically

### Import (Code → Figma)

Bring your code tokens into Figma for designers

1. **Export Tokens**: From Token Studio or CLI
2. **Select Format**: JSON or Figma tokens format
3. **Upload to Figma**: Use Figma plugin to import
4. **Create Libraries**: Auto-create color/text styles
5. **Apply to Designs**: Designers use tokens in Figma

---

## Export Formats

### CSS Variables
Standard CSS custom properties for web applications

Example:
```
--st-primary: #2563eb;
--st-space-4: 1rem;
```

### JSON
Structured data format for programmatic access

Example:
```json
{
  "colors": {
    "primary": "#2563eb"
  }
}
```

### TypeScript
Type-safe token definitions for component props

Example:
```typescript
export const tokens = {
  colors: { primary: "#2563eb" }
}
```

### Figma Tokens
Native Figma tokens format for designer workflows

Example:
```json
{
  "colors": {
    "primary": { "value": "#2563eb" }
  }
}
```

---

## Call to Action

Ready to sync with Figma? Install the staple-css Figma plugin to get started with token synchronization

- Token Studio →
- View Figma Plugin
