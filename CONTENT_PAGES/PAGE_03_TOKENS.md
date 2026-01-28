# Tokens

Design tokens are the foundation of staple-css. They encode design decisions as CSS variables, ensuring consistency across your application.

---

## Usage

### Import all tokens
```
import "@staple-css/tokens/all.css";
```

### Or import individually
```
import "@staple-css/tokens/tokens.css";   // Base tokens
import "@staple-css/tokens/themes.css";   // Light/dark themes
import "@staple-css/tokens/density.css";  // Density variants
```

---

## Theming

### Apply themes using data-theme attribute

Light theme (default):
```html
<body data-theme="light">
```

Dark theme:
```html
<body data-theme="dark">
```

### Apply density using data-density attribute

Comfortable (default):
```html
<body data-density="comfortable">
```

Compact:
```html
<body data-density="compact">
```

---

## Space Scale (0-8)

| Token | CSS Variable | Value |
|-------|--------------|-------|
| space-0 | --st-space-0 | 0 |
| space-1 | --st-space-1 | 4px |
| space-2 | --st-space-2 | 8px |
| space-3 | --st-space-3 | 12px |
| space-4 | --st-space-4 | 16px |
| space-5 | --st-space-5 | 24px |
| space-6 | --st-space-6 | 32px |
| space-7 | --st-space-7 | 48px |
| space-8 | --st-space-8 | 64px |

---

## Radius Scale (0-4)

| Token | CSS Variable | Value |
|-------|--------------|-------|
| radius-0 | --st-radius-0 | 0px |
| radius-1 | --st-radius-1 | 2px |
| radius-2 | --st-radius-2 | 4px |
| radius-3 | --st-radius-3 | 8px |
| radius-4 | --st-radius-4 | 16px |

---

## Shadow Scale (0-2)

| Token | CSS Variable | Value |
|-------|--------------|-------|
| shadow-0 | --st-shadow-0 | none |
| shadow-1 | --st-shadow-1 | 0 0.0625rem 0.125rem |
| shadow-2 | --st-shadow-2 | 0 0.25rem 0.375rem |

---

## Font Size Scale (0-6)

| Token | CSS Variable | Value |
|-------|--------------|-------|
| font-size-0 | --st-font-size-0 | 12px |
| font-size-1 | --st-font-size-1 | 14px |
| font-size-2 | --st-font-size-2 | 16px |
| font-size-3 | --st-font-size-3 | 18px |
| font-size-4 | --st-font-size-4 | 20px |
| font-size-5 | --st-font-size-5 | 24px |
| font-size-6 | --st-font-size-6 | 32px |

---

## Font Weight

| Token | CSS Variable | Value |
|-------|--------------|-------|
| normal | --st-font-weight-normal | 400 |
| medium | --st-font-weight-medium | 500 |
| semibold | --st-font-weight-semibold | 600 |
| bold | --st-font-weight-bold | 700 |

---

## Line Height

| Token | CSS Variable | Value |
|-------|--------------|-------|
| tight | --st-leading-tight | 1.25 |
| normal | --st-leading-normal | 1.5 |
| relaxed | --st-leading-relaxed | 1.75 |

---

## Motion Duration

| Token | CSS Variable | Value |
|-------|--------------|-------|
| instant | --st-duration-instant | 75ms |
| fast | --st-duration-fast | 150ms |
| normal | --st-duration-normal | 200ms |
| moderate | --st-duration-moderate | 300ms |
| slow | --st-duration-slow | 500ms |
| slower | --st-duration-slower | 700ms |
| slowest | --st-duration-slowest | 1000ms |

---

## Motion Easing

| Token | CSS Variable | Value |
|-------|--------------|-------|
| default | --st-easing-default | cubic-bezier(0.4, 0, 0.2, 1) |
| in | --st-easing-in | cubic-bezier(0.4, 0, 1, 1) |
| out | --st-easing-out | cubic-bezier(0, 0, 0.2, 1) |
| bounce | --st-easing-bounce | cubic-bezier(0.68, -0.55, 0.265, 1.55) |

---

## Color Tokens

Colors automatically adapt to the current theme (light/dark).

| Token | CSS Variable |
|-------|--------------|
| text | --st-color-text |
| textMuted | --st-color-text-muted |
| border | --st-color-border |
| surface | --st-color-surface |
| surfaceRaised | --st-color-surface-raised |
| primary | --st-color-primary |
| danger | --st-color-danger |
| success | --st-color-success |
| warning | --st-color-warning |
