# Component Patterns

Production-ready patterns and examples for common UI components. Copy, customize, and compose with staple-css primitives and tokens.

---

## Button Patterns

Variations of buttons with different colors, sizes, and styles.

### Primary Solid
Standard brand-colored button with filled background

### Primary Outline
Outlined button with border only

### Danger Solid
Red filled button for destructive actions

### Success Outline
Green outlined button for confirmations

### Small Button
Compact button for tight layouts

### Large Button
Oversized button for emphasis

---

## Form Components

Essential form elements with proper spacing and styling.

### Text Input
Email field with label and placeholder

### Select Dropdown
Option selection with label

### Checkbox
Single checkbox with label

### Radio Group
Group of radio buttons with options A, B, C

### Textarea
Multi-line text input with rows

### Range Slider
Numeric slider for value selection (0-100)

---

## Card Patterns

Different card styles for various use cases.

### Simple Card
Basic card with padding and shadow

### Card with Header
Card with colored header section

### Hover Card
Card that lifts on hover with shadow

### Feature Card
Colored background card with white text and emoji

### Stats Card
Large number display card (2,547 Active Users)

### Action Card
Card with call-to-action button

---

## Alerts & Notifications

Alert messages in different tones.

### Primary Alert
General information message

### Success Alert
Positive confirmation message

### Danger Alert
Error or critical alert

### Warning Alert
Cautionary alert message

---

## Layout Patterns

Common layout structures.

### Two Column Layout
Equal width two-column grid

### Sidebar Layout
Narrow sidebar + wide main content

### Grid Layout
3-column grid (6 items)

### Stack Layout
Vertical stack of 3 items

---

## Data Display Patterns

### Data Table Example

| Name | Status | Progress |
|------|--------|----------|
| Item A | Active | 75% |
| Item B | Active | 50% |
| Item C | Inactive | 25% |

---

## Copy-Paste Code Examples

Example component code using Card primitive:

```
// Card Component
<Card pad={6} radius={3} shadow={1}>
  <Column gap={4}>
    <Text as="h2" size={3} weight="semibold">
      Heading
    </Text>
    <Text size={1} tone="muted">
      Description text
    </Text>
    <Row gap={3} justify="end">
      <button>Cancel</button>
      <button>Submit</button>
    </Row>
  </Column>
</Card>
```
