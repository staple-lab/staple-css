# Complete Token Reference

Comprehensive documentation of every token in the staple-css system. Look up exact values, use cases, and implementation patterns.

---

## Quick Navigation

- Spacing
- Sizing
- Radius
- Shadows
- Colors
- Typography
- Motion
- Gradients
- Breakpoints
- Z-Index
- Opacity
- Density

---

## Spacing Scale (0-8)

9-step spacing scale for consistent layouts. Use for padding, margins, gaps, and whitespace.

| Token | Value | Usage |
|-------|-------|-------|
| space-0 | 0 | No spacing, collapsed |
| space-1 | 4px (0.25rem) | Minimal padding (form elements) |
| space-2 | 8px (0.5rem) | Small gap between elements |
| space-3 | 12px (0.75rem) | Standard internal padding |
| space-4 | 16px (1rem) | Primary padding size |
| space-5 | 24px (1.5rem) | Medium section spacing |
| space-6 | 32px (2rem) | Large section spacing |
| space-7 | 48px (3rem) | Extra large gaps |
| space-8 | 64px (4rem) | Major section breaks |

---

## Max Width Scale

Container sizing for content layout. Use to constrain width at specific breakpoints.

| Token | Value | Usage |
|-------|-------|-------|
| max-w-xs | 320px | Narrow single-column |
| max-w-sm | 384px | Small cards/forms |
| max-w-md | 448px | Medium content width |
| max-w-lg | 512px | Sidebar content |
| max-w-xl | 576px | Article width |
| max-w-2xl | 672px | Wide content |
| max-w-3xl | 768px | Article max (preferred) |
| max-w-prose | 65ch | Typography optimal line |
| max-w-full | 100% | Full width (parent) |

---

## Border Radius Scale (0-4)

4-step radius scale for consistency. Creates visual softness and approachability.

| Token | Value | Usage |
|-------|-------|-------|
| radius-0 | 0px | Sharp corners (rare) |
| radius-1 | 2px | Subtle rounding (icons) |
| radius-2 | 4px | Button/input elements |
| radius-3 | 8px | Card/container default |
| radius-4 | 16px | Large, soft containers |

---

## Elevation/Shadow System (0-5)

6-level elevation system for depth and visual hierarchy. Higher levels = more prominence.

| Token | Value | Usage |
|-------|-------|-------|
| shadow-0 | none | Flat, on-background |
| shadow-1 | 0 0.0625rem 0.125rem | Subtle lift |
| shadow-2 | 0 0.25rem 0.375rem | Card elevation |
| shadow-3 | 0 0.5rem 0.75rem | Dropdown/overlay |
| shadow-4 | 0 1rem 1.5rem | Modal elevation |
| shadow-5 | 0 1.5rem 2rem | Top-most layer |

---

## Typography Scales

Carefully calibrated typography system for visual hierarchy and readability.

### Font Sizes (0-6)

| Token | Value | Usage |
|-------|-------|-------|
| font-size-0 | 12px | Captions, metadata |
| font-size-1 | 14px | Secondary text |
| font-size-2 | 16px | Body text (base) |
| font-size-3 | 18px | Subheadings |
| font-size-4 | 20px | Section heading |
| font-size-5 | 24px | Major heading |
| font-size-6 | 32px | Page title |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| normal | 400 | Body, regular text |
| medium | 500 | Emphasis, labels |
| semibold | 600 | Headings, strong |
| bold | 700 | Very strong emphasis |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| tight | 1.25 | Headlines (compact) |
| normal | 1.5 | Body text (default) |
| relaxed | 1.75 | Long-form (comfortable) |

---

## Motion Tokens

Consistent timing and easing for smooth, purposeful animations.

### Duration (ms)

| Token | Value | Usage |
|-------|-------|-------|
| instant | 75ms | Micro-interactions |
| fast | 150ms | Quick feedback |
| normal | 200ms | Standard transitions |
| moderate | 300ms | Noticeable transitions |
| slow | 500ms | Deliberate animations |
| slower | 700ms | Cinematic |
| slowest | 1000ms | Very slow reveals |

### Easing Functions

| Token | Value | Usage |
|-------|-------|-------|
| default | cubic-bezier(0.4, 0, 0.2, 1) | Standard smooth motion |
| in | cubic-bezier(0.4, 0, 1, 1) | Accelerating entrance |
| out | cubic-bezier(0, 0, 0.2, 1) | Decelerating exit |
| bounce | cubic-bezier(0.68, -0.55, 0.265, 1.55) | Playful arrival |

---

## Gradient Tokens (22 total)

Pre-built, perceptually-smooth gradients for visual emphasis and design showcase.

### Tone-Based Gradients (15)

- **Primary**: soft, medium, bold (Blue scale) - Brand gradients
- **Success**: soft, medium, bold (Green scale) - Positive feedback
- **Danger**: soft, medium, bold (Red scale) - Warnings/errors
- **Warning**: soft, medium, bold (Orange scale) - Cautions

### Vibrant Multi-Color (6)

| Token | Value | Usage |
|-------|-------|-------|
| sunrise | Orange → Coral | Energetic hero |
| sunset | Orange → Pink | Warm showcase |
| ocean | Blue → Teal | Cool/tech feel |
| forest | Green scale | Natural/organic |
| grape | Purple → Pink | Creative/premium |
| mint | Teal → Cyan | Fresh/modern |

---

## Responsive Breakpoints

Mobile-first breakpoint system. Start with mobile styles, enhance larger screens.

| Token | Min-Width | Usage |
|-------|-----------|-------|
| base | 0px+ | Mobile (default) |
| sm | 640px+ | Tablets |
| md | 768px+ | Small laptops |
| lg | 1024px+ | Laptops |
| xl | 1280px+ | Desktops |
| 2xl | 1536px+ | Ultra-wide |

---

## Semantic Colors

Intent-based colors that automatically adapt to light/dark themes.

### Light Theme

| Token | Value | Usage |
|-------|-------|-------|
| color-primary | #2563eb | Brand actions, links |
| color-danger | #dc2626 | Destructive actions |
| color-success | #16a34a | Confirmations |
| color-text | #111827 | Primary text |

### Dark Theme (auto-adapted)

| Token | Value | Usage |
|-------|-------|-------|
| color-primary | #3b82f6 | Lighter for contrast |

---

## Opacity Scale

11-step opacity scale for transparency and layering effects.

| Token | Value | Usage |
|-------|-------|-------|
| opacity-0 | 0% | Fully transparent |
| opacity-25 | 25% | Very faint |
| opacity-50 | 50% | Semi-transparent |
| opacity-75 | 75% | Mostly opaque |
| opacity-100 | 100% | Fully opaque |

---

## Z-Index Scale

Layering system for stacking contexts. Higher = more prominent.

| Token | Value | Usage |
|-------|-------|-------|
| z-0 | 0 | Default, same layer |
| z-10 | 10 | Content layer |
| z-20 | 20 | Overlay/dropdown |
| z-30 | 30 | Modal layer |
| z-40 | 40 | Tooltip/popover |
| z-50 | 50 | Sticky header |
| z-max | 9999 | Emergency top |

---

## Density Modes

Comfortable and compact modes for different contexts and user preferences.

### Comfortable (default)

| Token | Value | Usage |
|-------|-------|-------|
| control-height | 40px | Touch-friendly buttons |
| control-padding-x | 16px | Button padding |
| card-padding | 24px | Card internal spacing |
| stack-gap | 16px | Vertical spacing |

### Compact

| Token | Value | Usage |
|-------|-------|-------|
| control-height | 32px | Smaller buttons |
| control-padding-x | 12px | Tight padding |
| card-padding | 16px | Compact spacing |
| stack-gap | 12px | Reduced gap |
