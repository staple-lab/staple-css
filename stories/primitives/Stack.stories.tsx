import type { Meta, StoryObj } from '@storybook/react'
import { Box, Column, Text } from '@staple-css/primitives'

/**
 * Column (Column Component)
 *
 * Note: "Column" is a layout pattern, not a component. Use the `Column` component
 * (from Flex) for vertical stacking layouts. Column is an alias for:
 * `<Flex direction="column">`
 *
 * See the Flex component documentation for full API details.
 */

const meta = {
  title: 'Primitives/Column (Column)',
  component: Column,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Column>

export default meta
type Story = StoryObj<typeof meta>

const DemoItem = ({ label }: { label: string }) => (
  <Box pad={3} radius={2} style={{ background: 'lightblue' }}>
    <Text>{label}</Text>
  </Box>
)

export const Basic: Story = {
  render: () => (
    <Column gap={2}>
      <DemoItem label="Item 1" />
      <DemoItem label="Item 2" />
      <DemoItem label="Item 3" />
    </Column>
  ),
}

export const GapScale: Story = {
  render: () => (
    <Column gap={4}>
      <Column gap={0}>
        <DemoItem label="gap=0" />
        <DemoItem label="Items" />
      </Column>
      <Column gap={2}>
        <DemoItem label="gap=2" />
        <DemoItem label="Items" />
      </Column>
      <Column gap={4}>
        <DemoItem label="gap=4" />
        <DemoItem label="Items" />
      </Column>
      <Column gap={6}>
        <DemoItem label="gap=6" />
        <DemoItem label="Items" />
      </Column>
    </Column>
  ),
}

export const Alignment: Story = {
  render: () => (
    <Column gap={6}>
      <Column gap={2} align="start">
        <Text size={1} weight="semibold">align=start</Text>
        <DemoItem label="Item 1" />
        <DemoItem label="Item 2" />
      </Column>
      <Column gap={2} align="center">
        <Text size={1} weight="semibold">align=center</Text>
        <DemoItem label="Item 1" />
        <DemoItem label="Item 2" />
      </Column>
      <Column gap={2} align="end">
        <Text size={1} weight="semibold">align=end</Text>
        <DemoItem label="Item 1" />
        <DemoItem label="Item 2" />
      </Column>
      <Column gap={2} align="stretch">
        <Text size={1} weight="semibold">align=stretch</Text>
        <DemoItem label="Item 1" />
        <DemoItem label="Item 2" />
      </Column>
    </Column>
  ),
}

export const ResponsiveGap: Story = {
  render: () => (
    <Column gap={{ base: 2, md: 4, lg: 6 }}>
      <DemoItem label="Item 1" />
      <DemoItem label="Item 2" />
      <DemoItem label="Item 3" />
      <Text size={0} tone="muted">Resize window to see gap change</Text>
    </Column>
  ),
}

export const NestedColumns: Story = {
  render: () => (
    <Column gap={4} pad={4} radius={2} shadow={1}>
      <Text weight="bold">Outer Column</Text>

      <Column gap={2} pad={3} radius={2} style={{ background: '#f9fafb' }}>
        <Text weight="semibold" size={1}>Nested Column 1</Text>
        <Text size={1}>Item A</Text>
        <Text size={1}>Item B</Text>
      </Column>

      <Column gap={2} pad={3} radius={2} style={{ background: '#f9fafb' }}>
        <Text weight="semibold" size={1}>Nested Column 2</Text>
        <Text size={1}>Item A</Text>
        <Text size={1}>Item B</Text>
      </Column>
    </Column>
  ),
}

export const FormLayout: Story = {
  render: () => (
    <Column gap={4} maxWidth="md" marginX="auto">
      <Text as="h2" size={4} weight="bold">Contact Form</Text>

      <Column gap={2}>
        <Text as="label" weight="semibold" size={1}>
          Name
        </Text>
        <input type="text" placeholder="Your name" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e5e7eb' }} />
      </Column>

      <Column gap={2}>
        <Text as="label" weight="semibold" size={1}>
          Email
        </Text>
        <input type="email" placeholder="you@example.com" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e5e7eb' }} />
      </Column>

      <Column gap={2}>
        <Text as="label" weight="semibold" size={1}>
          Message
        </Text>
        <textarea placeholder="Your message" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e5e7eb', minHeight: '100px' }} />
      </Column>

      <button style={{ padding: '12px', borderRadius: '4px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}>
        Send
      </button>
    </Column>
  ),
}
