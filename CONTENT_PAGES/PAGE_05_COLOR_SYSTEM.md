# Color System

Purpose-built semantic colors that adapt across themes. A cohesive palette for consistent, accessible interfaces with built-in dark mode support.

---

## Semantic Colors

Intent-based tokens. Perfect contrast ratios in light and dark modes.

### Primary
Primary actions and interactions

Light: #2563eb
Dark: #3b82f6

### Danger
Destructive actions and critical alerts

Light: #dc2626
Dark: #ef4444

### Warning
Cautionary states and warnings

Light: #d97706
Dark: #f59e0b

### Success
Positive confirmations

Light: #16a34a
Dark: #22c55e

### Neutral
Text, borders, backgrounds

Light: #111827
Dark: #f9fafb

---

## Color Palettes

22 scales (50-950) for data visualization and custom components.

### Available Palettes

Tailwind-compatible scales in these colors:
- slate, gray, zinc, neutral, stone
- red, orange, amber, yellow, lime
- green, emerald, teal, cyan, sky
- blue, indigo, violet, purple, fuchsia
- pink, rose

### Using Palettes

Import `@staple-css/tokens/palettes.css` to access all 22 color palettes.

Example:
```css
.button {
  background: var(--st-blue-600);
}
.button:hover {
  background: var(--st-blue-700);
}
```

---

## Gradient Tokens

Pre-defined, perceptually-smooth gradients for hero sections and emphasis.

### Tone-Based
15 systematic gradients - Brand, positive, warning, and error gradients

### Vibrant
6 expressive multi-color gradients - Sunrise, sunset, ocean, forest, grape, mint

### Overlays
3 semi-transparent gradients - For text and decorative uses

---

## Accessibility

### Contrast
- WCAG AA compliance (4.5:1 for text)
- Tested for color blindness
- Light and dark mode verified

### Intent
- Use semantic names, not hex values
- Never rely on color alone
- Add icons or labels for clarity

### Themes
- Automatic light/dark switching
- Respects system preference
- Maintains readability in all modes

### Testing
- WebAIM Contrast Checker
- Deuteranopia/Protanopia simulators
- Validate with real users
