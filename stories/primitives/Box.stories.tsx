import type { Meta, StoryObj } from '@storybook/react'
import { Box, Column, Text } from '@staple-css/primitives/full'

const meta = {
  title: 'Primitives/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

// Basic box with padding
export const Basic: Story = {
  render: () => (
    <Box pad={4} radius={2} shadow={1}>
      <Text>Box content</Text>
    </Box>
  ),
}

// Box with different padding scales
export const PaddingScale: Story = {
  render: () => (
    <Column gap={4}>
      <Box pad={0} radius={1} style={{ background: '#f3f4f6' }}>
        <Text>pad={0}</Text>
      </Box>
      <Box pad={1} radius={1} style={{ background: '#f3f4f6' }}>
        <Text>pad={1}</Text>
      </Box>
      <Box pad={2} radius={1} style={{ background: '#f3f4f6' }}>
        <Text>pad={2}</Text>
      </Box>
      <Box pad={4} radius={1} style={{ background: '#f3f4f6' }}>
        <Text>pad={4}</Text>
      </Box>
      <Box pad={6} radius={1} style={{ background: '#f3f4f6' }}>
        <Text>pad={6}</Text>
      </Box>
      <Box pad={8} radius={1} style={{ background: '#f3f4f6' }}>
        <Text>pad={8}</Text>
      </Box>
    </Column>
  ),
}

// Box with different radius scales
export const RadiusScale: Story = {
  render: () => (
    <Column gap={4}>
      <Box pad={4} radius={0} shadow={1}>
        <Text>radius={0}</Text>
      </Box>
      <Box pad={4} radius={1} shadow={1}>
        <Text>radius={1}</Text>
      </Box>
      <Box pad={4} radius={2} shadow={1}>
        <Text>radius={2}</Text>
      </Box>
      <Box pad={4} radius={3} shadow={1}>
        <Text>radius={3}</Text>
      </Box>
      <Box pad={4} radius={4} shadow={1}>
        <Text>radius={4}</Text>
      </Box>
    </Column>
  ),
}

// Box with different shadow scales
export const ShadowScale: Story = {
  render: () => (
    <Column gap={4}>
      <Box pad={4} radius={2} shadow={0}>
        <Text>shadow={0}</Text>
      </Box>
      <Box pad={4} radius={2} shadow={1}>
        <Text>shadow={1}</Text>
      </Box>
      <Box pad={4} radius={2} shadow={2}>
        <Text>shadow={2}</Text>
      </Box>
    </Column>
  ),
}

// Box with margin
export const WithMargin: Story = {
  render: () => (
    <Box pad={2} radius={2} style={{ background: '#e5e7eb' }}>
      <Box pad={4} radius={2} shadow={1} margin={2}>
        <Text>Box with margin={2}</Text>
      </Box>
    </Box>
  ),
}

// Box with responsive padding
export const ResponsivePadding: Story = {
  render: () => (
    <Box pad={{ base: 2, sm: 3, md: 4, lg: 6 }} radius={2} shadow={1}>
      <Text>Resize window to see responsive padding</Text>
    </Box>
  ),
}

// Box with aspect ratio
export const AspectRatio: Story = {
  render: () => (
    <Column gap={4}>
      <Box aspectRatio="square" radius={2} shadow={1} style={{ background: 'lightblue' }}>
        <Text align="center">square (1/1)</Text>
      </Box>
      <Box aspectRatio="video" radius={2} shadow={1} style={{ background: 'lightcoral' }}>
        <Text align="center">video (16/9)</Text>
      </Box>
      <Box aspectRatio="portrait" radius={2} shadow={1} style={{ background: 'lightgreen' }}>
        <Text align="center">portrait (3/4)</Text>
      </Box>
    </Column>
  ),
}

// Box with maxWidth
export const MaxWidth: Story = {
  render: () => (
    <Column gap={4}>
      <Box maxWidth="xs" pad={4} radius={2} shadow={1}>
        <Text>maxWidth=xs (320px)</Text>
      </Box>
      <Box maxWidth="md" pad={4} radius={2} shadow={1}>
        <Text>maxWidth=md (448px)</Text>
      </Box>
      <Box maxWidth="lg" pad={4} radius={2} shadow={1}>
        <Text>maxWidth=lg (512px)</Text>
      </Box>
    </Column>
  ),
}

// Box as different HTML elements
export const Polymorphic: Story = {
  render: () => (
    <Column gap={4}>
      <Box as="section" pad={4} radius={2} shadow={1}>
        <Text as="h2">As Section</Text>
        <Text tone="muted">This is rendered as a section element</Text>
      </Box>
      <Box as="article" pad={4} radius={2} shadow={1}>
        <Text as="h2">As Article</Text>
        <Text tone="muted">This is rendered as an article element</Text>
      </Box>
      <Box as="header" pad={4} radius={2} shadow={1}>
        <Text>Header Box</Text>
      </Box>
    </Column>
  ),
}

// Box with opacity
export const Opacity: Story = {
  render: () => (
    <Column gap={4}>
      <Box pad={4} radius={2} shadow={1} opacity={100}>
        <Text>opacity=100 (fully opaque)</Text>
      </Box>
      <Box pad={4} radius={2} shadow={1} opacity={75}>
        <Text>opacity=75</Text>
      </Box>
      <Box pad={4} radius={2} shadow={1} opacity={50}>
        <Text>opacity=50</Text>
      </Box>
      <Box pad={4} radius={2} shadow={1} opacity={25}>
        <Text>opacity=25</Text>
      </Box>
    </Column>
  ),
}

// Box with z-index
export const ZIndex: Story = {
  render: () => (
    <Column gap={4}>
      <Box pad={4} radius={2} shadow={1} zIndex={10}>
        <Text>zIndex={10}</Text>
      </Box>
      <Box pad={4} radius={2} shadow={1} zIndex={50}>
        <Text>zIndex={50}</Text>
      </Box>
      <Box pad={4} radius={2} shadow={1} zIndex="max">
        <Text>zIndex=max</Text>
      </Box>
    </Column>
  ),
}

// Complex card example
export const ComplexCard: Story = {
  render: () => (
    <Box
      pad={6}
      radius={3}
      shadow={2}
      maxWidth="md"
      marginX="auto"
    >
      <Column gap={4}>
        <Column gap={1}>
          <Text as="h2" size={5} weight="bold">
            Complex Card
          </Text>
          <Text tone="muted" size={1}>
            Showcasing multiple Box features
          </Text>
        </Column>

        <Box pad={3} radius={2} style={{ background: '#f9fafb' }}>
          <Column gap={2}>
            <Text weight="semibold">Features:</Text>
            <Text size={1}>• Nested styling</Text>
            <Text size={1}>• Responsive padding</Text>
            <Text size={1}>• Shadow elevation</Text>
          </Column>
        </Box>

        <Box pad={2} radius={2} borderWidth={1} style={{ borderColor: 'var(--st-color-border)' }}>
          <Text tone="muted" size={1}>
            Box with border
          </Text>
        </Box>
      </Column>
    </Box>
  ),
}
