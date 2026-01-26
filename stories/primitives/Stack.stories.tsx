import type { Meta, StoryObj } from '@storybook/react'
import { Box, Stack, Text } from '@staple-css/primitives'

const meta = {
  title: 'Primitives/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

const DemoItem = ({ label }: { label: string }) => (
  <Box pad={3} radius={2} style={{ background: 'lightblue' }}>
    <Text>{label}</Text>
  </Box>
)

export const Basic: Story = {
  render: () => (
    <Stack gap={2}>
      <DemoItem label="Item 1" />
      <DemoItem label="Item 2" />
      <DemoItem label="Item 3" />
    </Stack>
  ),
}

export const GapScale: Story = {
  render: () => (
    <Stack gap={4}>
      <Stack gap={0}>
        <DemoItem label="gap=0" />
        <DemoItem label="Items" />
      </Stack>
      <Stack gap={2}>
        <DemoItem label="gap=2" />
        <DemoItem label="Items" />
      </Stack>
      <Stack gap={4}>
        <DemoItem label="gap=4" />
        <DemoItem label="Items" />
      </Stack>
      <Stack gap={6}>
        <DemoItem label="gap=6" />
        <DemoItem label="Items" />
      </Stack>
    </Stack>
  ),
}

export const Alignment: Story = {
  render: () => (
    <Stack gap={6}>
      <Stack gap={2} align="start">
        <Text size={1} weight="semibold">align=start</Text>
        <DemoItem label="Item 1" />
        <DemoItem label="Item 2" />
      </Stack>
      <Stack gap={2} align="center">
        <Text size={1} weight="semibold">align=center</Text>
        <DemoItem label="Item 1" />
        <DemoItem label="Item 2" />
      </Stack>
      <Stack gap={2} align="end">
        <Text size={1} weight="semibold">align=end</Text>
        <DemoItem label="Item 1" />
        <DemoItem label="Item 2" />
      </Stack>
      <Stack gap={2} align="stretch">
        <Text size={1} weight="semibold">align=stretch</Text>
        <DemoItem label="Item 1" />
        <DemoItem label="Item 2" />
      </Stack>
    </Stack>
  ),
}

export const ResponsiveGap: Story = {
  render: () => (
    <Stack gap={{ base: 2, md: 4, lg: 6 }}>
      <DemoItem label="Item 1" />
      <DemoItem label="Item 2" />
      <DemoItem label="Item 3" />
      <Text size={0} tone="muted">Resize window to see gap change</Text>
    </Stack>
  ),
}

export const NestedStacks: Story = {
  render: () => (
    <Stack gap={4} pad={4} radius={2} shadow={1}>
      <Text weight="bold">Outer Stack</Text>

      <Stack gap={2} pad={3} radius={2} style={{ background: '#f9fafb' }}>
        <Text weight="semibold" size={1}>Nested Stack 1</Text>
        <Text size={1}>Item A</Text>
        <Text size={1}>Item B</Text>
      </Stack>

      <Stack gap={2} pad={3} radius={2} style={{ background: '#f9fafb' }}>
        <Text weight="semibold" size={1}>Nested Stack 2</Text>
        <Text size={1}>Item A</Text>
        <Text size={1}>Item B</Text>
      </Stack>
    </Stack>
  ),
}

export const FormLayout: Story = {
  render: () => (
    <Stack gap={4} maxWidth="md" marginX="auto">
      <Text as="h2" size={4} weight="bold">Contact Form</Text>

      <Stack gap={2}>
        <Text as="label" weight="semibold" size={1}>
          Name
        </Text>
        <input type="text" placeholder="Your name" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e5e7eb' }} />
      </Stack>

      <Stack gap={2}>
        <Text as="label" weight="semibold" size={1}>
          Email
        </Text>
        <input type="email" placeholder="you@example.com" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e5e7eb' }} />
      </Stack>

      <Stack gap={2}>
        <Text as="label" weight="semibold" size={1}>
          Message
        </Text>
        <textarea placeholder="Your message" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e5e7eb', minHeight: '100px' }} />
      </Stack>

      <button style={{ padding: '12px', borderRadius: '4px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}>
        Send
      </button>
    </Stack>
  ),
}
