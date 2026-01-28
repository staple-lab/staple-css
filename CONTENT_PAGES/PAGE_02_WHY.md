# Why staple-css?

A styling contract that prioritizes consistency, performance, and maintainability.

---

## Core Philosophy

staple-css is built on a simple idea: **tokens are the API**.

Instead of allowing arbitrary values throughout your codebase, staple-css provides a contract—a set of design decisions encoded as CSS variables.

This contract ensures consistency. When every component uses the same spacing scale, the same color tokens, the same typography settings, your UI naturally becomes more cohesive.

---

## Principles

### Tokens are the API
Design decisions live in tokens, not scattered across components. Components accept token keys, not arbitrary values.

### Contract over customization
A stable, predictable API enables teams to build consistent interfaces. Override mechanisms are deliberate, not default.

### Consistency by default
The happy path keeps you in the token system. Escape hatches are explicit and visible in code review.

---

## Performance-First Design

### Static CSS
All styling is static CSS—no runtime generation, no CSS-in-JS overhead. Token values are CSS variables handled natively.

**Runtime Overhead:** 0ms

### Zero dependencies
Components need only React and @staple-css/tokens. No heavy libraries, no build-time magic.

**Runtime Size:** <1kb

### Tree-shakeable
Each component is independently importable. Unused code is automatically removed during bundling.

**Tree-Shakeable:** 100%

### Intrinsic responsive
CSS Grid intrinsic sizing eliminates media query bloat. Layouts adapt to content naturally.

**Fewer Media Queries:** ~40%

---

## Long-Term Maintainability

- **Token versioning**: Update design decisions in one place, propagate everywhere
- **Centralized design system**: Colors, spacing, typography live in @staple-css/tokens
- **No style props hell**: Props accept token keys, not arbitrary sx={{...}} objects
- **Design → Code traceability**: Each component maps to specific token decisions

---

## Accessibility Built-In

### WCAG Compliance
All primitives built with semantic HTML and ARIA attributes. Color contrasts verified.

### Keyboard Navigation
All interactive elements fully keyboard accessible. Focus states clearly visible.

### Motion Respect
Animations respect prefers-reduced-motion. No vestibular triggers.

### Dark Mode
Built-in dark theme support. Respects system color-scheme preference.

---

## Next Steps

Ready to build with staple-css? Check out the component library and explore the token system.
