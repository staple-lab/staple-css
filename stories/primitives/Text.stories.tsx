import type { Meta, StoryObj } from '@storybook/react'
import { Stack, Text } from '@staple-css/primitives'

const meta = {
  title: 'Primitives/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const FontSizeScale: Story = {
  render: () => (
    <Column gap={4}>
      <Text size={0}>Size 0 - 12px (caption)</Text>
      <Text size={1}>Size 1 - 14px (small)</Text>
      <Text size={2}>Size 2 - 16px (body)</Text>
      <Text size={3}>Size 3 - 18px (large)</Text>
      <Text size={4}>Size 4 - 20px (h3)</Text>
      <Text size={5}>Size 5 - 24px (h2)</Text>
      <Text size={6}>Size 6 - 32px (h1)</Text>
    </Column>
  ),
}

export const FontWeight: Story = {
  render: () => (
    <Column gap={3}>
      <Text size={3} weight="normal">
        Weight: normal (400)
      </Text>
      <Text size={3} weight="medium">
        Weight: medium (500)
      </Text>
      <Text size={3} weight="semibold">
        Weight: semibold (600)
      </Text>
      <Text size={3} weight="bold">
        Weight: bold (700)
      </Text>
    </Column>
  ),
}

export const LineHeight: Story = {
  render: () => (
    <Column gap={4}>
      <Column gap={0}>
        <Text weight="semibold" size={1}>
          leading=tight
        </Text>
        <Text leading="tight">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </Column>

      <Column gap={0}>
        <Text weight="semibold" size={1}>
          leading=normal
        </Text>
        <Text leading="normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </Column>

      <Column gap={0}>
        <Text weight="semibold" size={1}>
          leading=relaxed
        </Text>
        <Text leading="relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </Column>
    </Column>
  ),
}

export const Tones: Story = {
  render: () => (
    <Column gap={2}>
      <Text tone="neutral" weight="semibold">
        Tone: neutral
      </Text>
      <Text tone="primary" weight="semibold">
        Tone: primary
      </Text>
      <Text tone="danger" weight="semibold">
        Tone: danger
      </Text>
      <Text tone="warn" weight="semibold">
        Tone: warn
      </Text>
      <Text tone="success" weight="semibold">
        Tone: success
      </Text>
      <Text tone="muted">Tone: muted</Text>
    </Column>
  ),
}

export const TextAlignment: Story = {
  render: () => (
    <Column gap={4}>
      <Column gap={1}>
        <Text weight="semibold" size={1}>
          align=start
        </Text>
        <Text align="start">
          Left aligned text starts from here
        </Text>
      </Column>

      <Column gap={1}>
        <Text weight="semibold" size={1}>
          align=center
        </Text>
        <Text align="center">
          Center aligned text is in the middle
        </Text>
      </Column>

      <Column gap={1}>
        <Text weight="semibold" size={1}>
          align=end
        </Text>
        <Text align="end">
          Right aligned text ends here
        </Text>
      </Column>
    </Column>
  ),
}

export const SemanticElements: Story = {
  render: () => (
    <Column gap={4}>
      <Text as="h1" size={6} weight="bold">
        Heading 1 (h1)
      </Text>
      <Text as="h2" size={5} weight="bold">
        Heading 2 (h2)
      </Text>
      <Text as="h3" size={4} weight="bold">
        Heading 3 (h3)
      </Text>
      <Text as="p" size={2} leading="relaxed">
        Paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
      </Text>
      <Text as="label" weight="semibold" size={1}>
        Form Label
      </Text>
    </Column>
  ),
}

export const Monospace: Story = {
  render: () => (
    <Column gap={3}>
      <Text weight="semibold" size={2}>
        Regular text
      </Text>
      <Text mono size={2}>
        Monospace text
      </Text>
      <Text mono size={1}>
        const greeting = &quot;Hello, staple-css!&quot;;
      </Text>
      <Text mono size={1}>
        function add(a, b) {'{'} return a + b; {'}'}
      </Text>
    </Column>
  ),
}

export const TypographyHierarchy: Story = {
  render: () => (
    <Column gap={6}>
      <Column gap={2}>
        <Text as="h1" size={6} weight="bold">
          Main Title
        </Text>
        <Text tone="muted">Subheading for context</Text>
      </Column>

      <Text as="p" size={2} leading="relaxed">
        This is a paragraph with regular body text. It has a comfortable line height for readability and spans multiple lines to demonstrate how text flows.
      </Text>

      <Column gap={2}>
        <Text as="h2" size={5} weight="bold">
          Section Heading
        </Text>
        <Text size={1} tone="muted">
          Section metadata or description
        </Text>
      </Column>

      <Column gap={2}>
        <Text as="h3" size={4} weight="semibold">
          Subsection
        </Text>
        <Text size={1}>
          Supporting text with details about the subsection
        </Text>
      </Column>
    </Column>
  ),
}

export const Combinations: Story = {
  render: () => (
    <Column gap={4}>
      <Column gap={1}>
        <Text as="label" weight="bold" size={1} tone="primary">
          Important Label
        </Text>
        <Text size={2} leading="relaxed">
          This is descriptive text about the important label above.
        </Text>
      </Column>

      <Column gap={1}>
        <Text as="h4" size={3} weight="bold" tone="success">
          ✓ Success Message
        </Text>
        <Text size={1} tone="muted">
          Your action completed successfully.
        </Text>
      </Column>

      <Column gap={1}>
        <Text as="h4" size={3} weight="bold" tone="danger">
          ✗ Error Message
        </Text>
        <Text size={1} tone="muted">
          Something went wrong. Please try again.
        </Text>
      </Column>
    </Column>
  ),
}
