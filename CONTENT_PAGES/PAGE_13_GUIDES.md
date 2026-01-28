# Design Guides & Best Practices

Comprehensive guides for building consistent, accessible, and performant interfaces with staple-css tokens and primitives.

---

## 01. Spacing & Layout

### Master the spacing scale and create intrinsic responsive layouts

- **Space Scale (0-8)**: 9 predefined values from 0-4rem
- **Padding vs Margin**: Internal vs component spacing
- **Intrinsic Responsive**: CSS Grid auto-fit/auto-fill with minmax()

---

## 02. Color & Contrast

### Build accessible color systems with semantic tokens

- **Semantic Colors**: Primary, danger, warning, success tokens
- **WCAG AA Compliance**: All colors meet contrast standards
- **Light & Dark**: Adaptive colors for both themes

---

## 03. Typography & Text

### Establish visual hierarchy through intentional typography

- **Font Scale (0-6)**: 12px to 32px with hierarchy
- **Line Height**: Scales with font size (1.25-1.75)
- **Readable Length**: 50-75 characters optimal

---

## 04. Motion & Animation

### Create smooth, respectful transitions and animations

- **Duration Scale**: Fast (100ms), normal (200ms), slow (300ms)
- **Easing Functions**: Default, in/out for motion
- **Accessibility**: Respect prefers-reduced-motion

---

## 05. Responsive Design

### Design mobile-first with intentional breakpoints

- **Mobile-First**: Start with mobile, enhance for larger screens
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Targets**: Minimum 44x44px for interactive elements

---

## 06. Accessibility (a11y)

### Build with accessibility as a core requirement

- **Semantic HTML**: Use correct elements for screen readers
- **Color Contrast**: 4.5:1 for normal, 3:1 for large text
- **Focus Management**: All interactive elements keyboard accessible

---

## 07. Component Patterns

### Compose primitives into cohesive components

- **Composition**: Combine primitives to create components
- **Props as Tokens**: Accept token keys, not arbitrary values
- **Escape Hatches**: Use className for edge cases

---

## 08. Design Tokens Strategy

### Structure tokens for maintainability and scale

- **Token Hierarchy**: Global → Component → Instance
- **Naming Convention**: Semantic names, not color names
- **Versioning**: Document changes, provide migration guides
