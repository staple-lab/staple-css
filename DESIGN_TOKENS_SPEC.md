# Design Tokens Specification - Solarpunk Redesign
*Ralph Loop Design System - Iteration 1*

## Typography System

### Font Choices (DECIDED)
- **Display/Editorial**: [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) - Variable, warm, distinctive
- **Monospace/Code**: [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) - Technical, warm
- **Fallback**: system-ui, -apple-system, sans-serif

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');
```

### CSS Variables (Add to tokens.css)
```css
--st-font-display: "Bricolage Grotesque", system-ui, sans-serif;
--st-font-mono: "IBM Plex Mono", monospace;
--st-font-body: "Bricolage Grotesque", system-ui, sans-serif;
```

### Font Weight Extremes
| Use Case | Weight | Usage |
|----------|--------|-------|
| Thin/Light | 400 | Body text, descriptions |
| Regular | 500 | Secondary headings |
| Semibold | 600 | Tertiary headings, form labels |
| Bold | 700 | Secondary headings, buttons |
| Extra Bold | 800 | Primary headings, accents |

### Typography Scale (Size x Weight)

#### H1 (Primary Heading)
```
Font-size: clamp(40px, 8vw, 56px)
Font-weight: 800 (Extra Bold)
Line-height: 1.15
Letter-spacing: -1px
Color: var(--st-color-text)
Paired with: Optional gradient accent
```

#### H2 (Section Heading)
```
Font-size: 36px (or clamp(32px, 6vw, 44px))
Font-weight: 700 (Bold)
Line-height: 1.2
Letter-spacing: -0.5px
Color: var(--st-color-text)
Margin-bottom: var(--st-space-5)
```

#### H3 (Subsection Heading)
```
Font-size: 24px
Font-weight: 700 (Bold)
Line-height: 1.25
Color: var(--st-color-text)
Margin-bottom: var(--st-space-4)
```

#### H4 (Card/Component Heading)
```
Font-size: 18px
Font-weight: 600 (Semibold)
Line-height: 1.3
Color: var(--st-color-text)
Margin-bottom: var(--st-space-3)
```

#### Body Text (Default)
```
Font-size: 16px
Font-weight: 400 (Regular)
Line-height: 1.6
Color: var(--st-color-text)
Max-width: 65ch (for readability)
```

#### Small Text
```
Font-size: 14px
Font-weight: 400 (Regular)
Line-height: 1.5
Color: var(--st-color-text-muted)
```

#### Extra Small (Labels, Metadata)
```
Font-size: 12px
Font-weight: 500 (Medium)
Line-height: 1.4
Color: var(--st-color-text-muted)
Text-transform: uppercase (optional)
Letter-spacing: 0.5px (optional)
```

#### Monospace (Code)
```
Font-family: var(--st-font-mono)
Font-size: 14px
Font-weight: 400
Line-height: 1.6
Color: var(--st-color-text)
Background: var(--st-color-surface)
Padding: 2px 4px (inline)
Border-radius: var(--st-radius-1)
```

---

## Color Palette - Solarpunk Edition

### Semantic Colors (Existing - Keep)
```css
--st-color-primary: #3b82f6; /* Current blue */
--st-color-success: #10b981; /* Current green */
--st-color-danger: #ef4444; /* Current red */
--st-color-warn: #f59e0b; /* Current amber */
--st-color-neutral: #6b7280; /* Current gray */
```

### Solarpunk Warmth Additions
```css
/* Primary Brand - Warm Forest Green */
--st-color-primary-solarpunk: #2a7d52; /* Deep forest */
--st-color-primary-light: #4da870; /* Medium forest */
--st-color-primary-pale: #d4f0e8; /* Pale sage */

/* Secondary Accent - Gold/Amber */
--st-color-accent-warm: #d4a574; /* Warm gold */
--st-color-accent-light: #f4dcc8; /* Pale cream */

/* Tertiary - Organic Sage */
--st-color-organic-green: #9db4a8; /* Soft sage */
--st-color-organic-light: #e8ede8; /* Very pale sage */

/* Accent - Electric Lime (Retro-futuristic) */
--st-color-accent-lime: #b4d61e; /* Electric lime */
--st-color-accent-lime-pale: #e8f0cc; /* Pale lime */

/* Neutrals - Warm tones */
--st-color-background-warm: #f5f1e8; /* Warm white/cream */
--st-color-surface-warm: #fffbf7; /* Warmer white */
--st-color-text-warm: #2c3e35; /* Dark forest */
```

### Color Usage Rules

| Element | Color | Notes |
|---------|-------|-------|
| Primary buttons | --st-color-primary-solarpunk | Or keep blue, use green for accents |
| Primary headings | --st-color-text-warm | Dark forest text |
| Links | --st-color-primary | Default blue or green |
| Link hover | --st-color-primary-light | Lighter forest |
| Accents/Highlights | --st-color-accent-warm | Gold/amber for warmth |
| Decorative elements | --st-color-accent-lime | Electric lime for retro feel |
| Background | --st-color-background-warm | Cream for warmth |
| Muted text | --st-color-text-muted (existing) | Keep gray/muted |
| Borders | --st-color-border (existing) | Keep current |

---

## Spacing Scale - Standardized

### Base Unit
```
1 unit = 4px
```

### Scale (Using existing --st-space-* tokens)
```css
--st-space-0: 0;
--st-space-1: 4px;   /* 1 unit */
--st-space-2: 8px;   /* 2 units */
--st-space-3: 12px;  /* 3 units */
--st-space-4: 16px;  /* 4 units */
--st-space-5: 20px;  /* 5 units */
--st-space-6: 24px;  /* 6 units */
--st-space-7: 32px;  /* 8 units */
--st-space-8: 40px;  /* 10 units */
--st-space-9: 48px;  /* 12 units */
--st-space-10: 64px; /* 16 units */
```

### Application Rules

#### Section Spacing
```
Vertical padding (top/bottom):
- Hero section: var(--st-space-10) / 40px (mobile: var(--st-space-8))
- Major section: var(--st-space-9) / 48px (mobile: var(--st-space-7))
- Minor section: var(--st-space-8) / 40px (mobile: var(--st-space-6))

Horizontal padding:
- Desktop: var(--st-space-6) / 24px
- Tablet: var(--st-space-5) / 20px
- Mobile: var(--st-space-4) / 16px
```

#### Gap Between Elements
```
Major section gap: var(--st-space-9) (48px)
Section gap: var(--st-space-8) (40px)
Subsection gap: var(--st-space-6) (24px)
Component gap: var(--st-space-4) (16px)
List item gap: var(--st-space-2) to var(--st-space-3) (8-12px)
Inline gap: var(--st-space-2) (8px)
```

#### Component Padding
```
Large component (Card, Panel): var(--st-space-6) (24px)
Standard component: var(--st-space-4) (16px)
Compact component: var(--st-space-3) (12px)
Dense component: var(--st-space-2) (8px)

Button padding:
- Large: var(--st-space-4) var(--st-space-6) (16px 24px)
- Standard: var(--st-space-3) var(--st-space-5) (12px 20px)
- Small: var(--st-space-2) var(--st-space-4) (8px 16px)
- Icon-only: var(--st-space-2) (8px)
```

---

## Border Radius Scale

### Current --st-radius-* Usage
```css
--st-radius-0: 0;
--st-radius-1: 2px;   /* Minimal radius */
--st-radius-2: 4px;   /* Subtle radius */
--st-radius-3: 8px;   /* Standard radius */
--st-radius-4: 12px;  /* Generous radius */
```

### Application Rules
```
Tight/minimal (buttons, small elements): var(--st-radius-1) or var(--st-radius-2)
Standard (cards, inputs): var(--st-radius-3)
Generous (large cards, hero sections): var(--st-radius-4)
Icon badges: var(--st-radius-2) to var(--st-radius-3)
```

---

## Shadow System

### Elevation Scale (Add to tokens if not present)
```css
--st-shadow-0: none;
--st-shadow-1: 0 1px 2px rgba(0, 0, 0, 0.04);
--st-shadow-2: 0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 1px rgba(0, 0, 0, 0.02);
--st-shadow-3: 0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
--st-shadow-4: 0 8px 16px rgba(0, 0, 0, 0.10), 0 4px 8px rgba(0, 0, 0, 0.06);
--st-shadow-5: 0 16px 32px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08);
```

### Application Rules
```
Default cards: var(--st-shadow-1)
Hover cards: var(--st-shadow-2) to var(--st-shadow-3)
Modals/Dropdowns: var(--st-shadow-4)
Featured sections: var(--st-shadow-3)
Interactive (hovered): var(--st-shadow-2)
```

---

## Motion & Transitions

### Durations
```css
--st-duration-fast: 100ms;    /* Micro-interactions */
--st-duration-base: 150ms;    /* Standard transitions */
--st-duration-slow: 200ms;    /* Noticeable transitions */
--st-duration-slower: 250ms;  /* Emphasis transitions */
--st-duration-slowest: 300ms; /* Entrance/exit animations */
```

### Easing
```css
--st-easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
--st-easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
--st-easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--st-easing-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--st-easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Application Rules
```
Hover transform: var(--st-duration-base) var(--st-easing-ease-out)
Focus ring: var(--st-duration-fast) var(--st-easing-ease-out)
Link underline: var(--st-duration-base) var(--st-easing-ease)
Color change: var(--st-duration-base) var(--st-easing-ease-out)
Icon rotation: var(--st-duration-slow) var(--st-easing-ease-in-out)
Modal entrance: var(--st-duration-slowest) var(--st-easing-ease-out)

CRITICAL: Wrap all motion in @media (prefers-reduced-motion: no-preference)
```

---

## Focus & Interaction States

### Focus Ring (Add to base CSS)
```css
:focus-visible {
  outline: 2px solid var(--st-color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: more) {
  :focus-visible {
    outline-width: 3px;
    outline-offset: 3px;
  }
}
```

### Hover State
```css
/* Standard hover transform */
transition: transform var(--st-duration-base) var(--st-easing-ease-out),
            box-shadow var(--st-duration-base) var(--st-easing-ease-out);

/* On hover */
transform: translateY(-2px);
box-shadow: var(--st-shadow-2);
```

### Active/Pressed State
```css
/* On active/pressed */
transform: translateY(0px);
box-shadow: var(--st-shadow-1);
opacity: 0.95;
```

### Disabled State
```css
/* Disabled elements */
opacity: 0.5;
cursor: not-allowed;
pointer-events: none;
```

### Visited Link State
```css
color: var(--st-color-primary-dark, #2563eb);
opacity: 0.8;
```

---

## Responsive Breakpoints (Existing - Confirm)

| Name | Min-Width | CSS Variable |
|------|-----------|--------------|
| xs (mobile) | 0px | --st-screen-xs |
| sm | 640px | --st-screen-sm |
| md | 768px | --st-screen-md |
| lg | 1024px | --st-screen-lg |
| xl | 1280px | --st-screen-xl |
| 2xl | 1536px | --st-screen-2xl |

### Mobile-First Approach
```
All default styles for mobile (< 640px)
@media (min-width: 640px) { /* Tablet */ }
@media (min-width: 768px) { /* Tablet/Small desktop */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large desktop */ }
```

---

## Accessibility Specifications

### Color Contrast
- **Normal text**: WCAG AA (4.5:1 minimum)
- **Large text** (18pt+): WCAG AA (3:1 minimum)
- **UI components**: WCAG AA (3:1 minimum)

### Focus Management
- Focus visible on all interactive elements
- Focus order matches visual order (left→right, top→bottom)
- Focus ring width: 2px minimum
- Focus ring color: Distinct from background (contrast ≥ 3:1)

### Motion
- Check `prefers-reduced-motion` media query
- Disable animations if user prefers reduced motion
- Transition duration ≥ 100ms

### Semantic HTML
- Use proper heading hierarchy (h1→h2→h3)
- Use semantic elements (nav, aside, main, article)
- Use proper form elements (label, input, button)
- Use aria-label for icon-only buttons

---

## Component State Specifications

### Button States
```
Default:
  - Color: var(--st-color-primary)
  - Shadow: var(--st-shadow-1)
  - Cursor: pointer

Hover:
  - Color: var(--st-color-primary-light)
  - Shadow: var(--st-shadow-2)
  - Transform: translateY(-2px)
  - Duration: 150ms ease-out

Focus:
  - Outline: 2px solid primary
  - Outline-offset: 2px
  - Transform: translateY(-2px)

Active:
  - Transform: translateY(0px)
  - Shadow: var(--st-shadow-1)
  - Opacity: 0.95

Disabled:
  - Opacity: 0.5
  - Cursor: not-allowed
  - Pointer-events: none
```

### Form Input States
```
Default:
  - Border: 1px solid var(--st-color-border)
  - Background: white
  - Color: var(--st-color-text)

Focus:
  - Border: 2px solid var(--st-color-primary)
  - Outline: none
  - Box-shadow: 0 0 0 3px rgba(primary, 0.1)

Hover:
  - Border: 1px solid var(--st-color-primary)

Disabled:
  - Background: var(--st-color-surface)
  - Color: var(--st-color-text-muted)
  - Cursor: not-allowed
  - Opacity: 0.6

Error:
  - Border: 2px solid var(--st-color-danger)
  - Box-shadow: 0 0 0 3px rgba(danger, 0.1)
```

---

## Summary

This specification provides:
1. ✓ Distinctive typography (Bricolage Grotesque + IBM Plex Mono)
2. ✓ Solarpunk color palette (warm greens, golds, organic feel)
3. ✓ Standardized spacing scale
4. ✓ Complete component states (hover, focus, active, disabled)
5. ✓ Accessibility guidelines (focus, motion, contrast)
6. ✓ Motion/transition rules with prefers-reduced-motion support

Ready for implementation in Phase 1-5 of Ralph Loop redesign.

