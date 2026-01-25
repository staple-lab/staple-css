# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-01-25

### Breaking Changes

**@staple-css/primitives**

- **Removed:** `Stack` and `Inline` components
  - Use `<Column>` (alias for `<Flex direction="column">`) instead of `<Stack>`
  - Use `<Row>` (alias for `<Flex direction="row">`) instead of `<Inline>`
  - These provide identical APIs with better flexibility and clarity

### Added

**@staple-css/primitives**

- **New:** `Row` component - convenience alias for `<Flex direction="row">`
- **New:** `Column` component - convenience alias for `<Flex direction="column">`
- **New:** `inline` prop on `Grid` component for `display: inline-grid` support (responsive)
- **New:** `2xl` breakpoint (1536px+) support for all responsive props on Box, Flex, and Grid components

### Fixed

**@staple-css/primitives**

- Fixed missing TypeScript interface for `Grid` `inline` prop (was used but not typed)

### Migration Guide

#### Stack → Column

```tsx
// Before
<Stack gap={4} align="center">
  <Text>First</Text>
  <Text>Second</Text>
</Stack>

// After (Option 1: Column alias - recommended)
<Column gap={4} align="center">
  <Text>First</Text>
  <Text>Second</Text>
</Column>

// After (Option 2: Explicit Flex)
<Flex direction="column" gap={4} align="center">
  <Text>First</Text>
  <Text>Second</Text>
</Flex>
```

#### Inline → Row

```tsx
// Before
<Inline gap={3} justify="between">
  <Text>Left</Text>
  <Text>Right</Text>
</Inline>

// After (Option 1: Row alias - recommended)
<Row gap={3} justify="between">
  <Text>Left</Text>
  <Text>Right</Text>
</Row>

// After (Option 2: Explicit Flex)
<Flex direction="row" gap={3} justify="between">
  <Text>Left</Text>
  <Text>Right</Text>
</Flex>
```

#### Import Changes

```tsx
// Before
import { Box, Flex, Stack, Inline, Grid, Container, Text, Card } from "@staple-css/primitives";

// After
import { Box, Flex, Row, Column, Grid, Container, Text, Card } from "@staple-css/primitives";
```

### Benefits of Migration

- **More flexible:** Full flexbox API available (wrap, alignContent, etc.)
- **Responsive direction:** Change layout direction at breakpoints: `<Flex direction={{ base: "column", md: "row" }} />`
- **Consistent API:** One component instead of three, unified semantics
- **Better naming:** Row/Column are immediately clear; Stack/Inline required documentation
- **Future-proof:** Aligns with modern React patterns and CSS naming

### Why This Breaking Change

- **Version 0.x allows breaking changes** - This project is still pre-1.0
- **Early deprecation benefit** - Stack/Inline were marked deprecated at 0.1.0
- **Cleaner codebase** - Reduces maintenance burden and bundle size
- **Better DX** - Consistency across components, less API surface to learn

## [0.1.0] - 2025-01-XX

### Added

- Initial release of @staple-css/tokens
- Initial release of @staple-css/primitives
- Components: Box, Flex, Stack (deprecated), Inline (deprecated), Grid, Container, Text, Card
- Full responsive breakpoint support (base, sm, md, lg, xl)
- TypeScript types for all components
- CSS-in-JS patterns with `:where()` for low specificity
- Logical properties support for RTL
