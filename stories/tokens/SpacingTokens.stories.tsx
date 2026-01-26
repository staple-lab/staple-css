import type { Meta, StoryObj } from '@storybook/react'
import { Box, Column, Row, Text } from '@staple-css/primitives'

const meta = {
  title: 'Tokens/Spacing',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

// Space scale
const spaceScale = [
  { key: '0', value: '0', pixels: '0px' },
  { key: '1', value: '0.25rem', pixels: '4px' },
  { key: '2', value: '0.5rem', pixels: '8px' },
  { key: '3', value: '0.75rem', pixels: '12px' },
  { key: '4', value: '1rem', pixels: '16px' },
  { key: '5', value: '1.5rem', pixels: '24px' },
  { key: '6', value: '2rem', pixels: '32px' },
  { key: '7', value: '3rem', pixels: '48px' },
  { key: '8', value: '4rem', pixels: '64px' },
]

export const SpaceScale: Story = {
  render: () => (
    <Column gap={4} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Space Scale (0-8)
        </Text>
        <Text tone="muted">
          9 spacing values for padding, margin, and gap. Based on a 4px scale for pixel-perfect layouts.
        </Text>
      </Column>

      <Column gap={3}>
        {spaceScale.map((space) => (
          <Row key={space.key} gap={4} align="center">
            <Box
              style={{
                width: space.value,
                height: '40px',
                background: '#3b82f6',
                borderRadius: '4px',
                minWidth: '4px',
              }}
            />
            <Column gap={0} style={{ flex: 1 }}>
              <Row gap={2} align="baseline">
                <Text weight="bold" mono>
                  --st-space-{space.key}
                </Text>
                <Text size={1} mono tone="muted">
                  {space.value}
                </Text>
                <Text size={0} tone="muted">
                  ({space.pixels})
                </Text>
              </Row>
            </Column>
          </Row>
        ))}
      </Column>
    </Column>
  ),
}

// Padding examples
export const PaddingExamples: Story = {
  render: () => (
    <Column gap={6} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Padding Scale
        </Text>
        <Text tone="muted">
          Consistent internal spacing using the space scale.
        </Text>
      </Column>

      <Column gap={3}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((pad) => (
          <Row key={pad} gap={3} align="center">
            <Box
              pad={pad as any}
              radius={2}
              style={{ background: '#dbeafe', border: '2px solid #3b82f6' }}
            >
              <Box style={{ background: '#3b82f6', height: '24px', minWidth: '80px', borderRadius: '2px' }} />
            </Box>
            <Text mono>pad={pad}</Text>
          </Row>
        ))}
      </Column>
    </Column>
  ),
}

// Gap examples
export const GapExamples: Story = {
  render: () => (
    <Column gap={6} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Gap Scale
        </Text>
        <Text tone="muted">
          Consistent spacing between flex/grid items.
        </Text>
      </Column>

      <Column gap={4}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((gap) => (
          <Box key={gap} pad={3} radius={2} style={{ background: '#f9fafb' }}>
            <Text size={0} weight="semibold" style={{ marginBottom: '8px' }}>
              gap={gap}
            </Text>
            <Row gap={gap as any}>
              {[1, 2, 3].map((i) => (
                <Box
                  key={i}
                  style={{
                    width: '60px',
                    height: '60px',
                    background: '#3b82f6',
                    borderRadius: '4px',
                  }}
                />
              ))}
            </Row>
          </Box>
        ))}
      </Column>
    </Column>
  ),
}

// Margin examples
export const MarginExamples: Story = {
  render: () => (
    <Column gap={6} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Margin Scale
        </Text>
        <Text tone="muted">
          External spacing between components.
        </Text>
      </Column>

      <Column gap={4}>
        <Box pad={4} radius={2} style={{ background: '#f9fafb' }}>
          <Text size={1} weight="semibold" style={{ marginBottom: '12px' }}>
            margin (all sides)
          </Text>
          <Box pad={3} radius={1} style={{ background: '#fef2f2', border: '2px dashed #f87171' }}>
            <Box
              margin={4}
              pad={3}
              radius={2}
              style={{ background: '#3b82f6', color: 'white' }}
            >
              <Text size={1}>margin=4</Text>
            </Box>
          </Box>
        </Box>

        <Box pad={4} radius={2} style={{ background: '#f9fafb' }}>
          <Text size={1} weight="semibold" style={{ marginBottom: '12px' }}>
            marginX (horizontal)
          </Text>
          <Box pad={3} radius={1} style={{ background: '#fef2f2', border: '2px dashed #f87171' }}>
            <Box
              marginX={6}
              pad={3}
              radius={2}
              style={{ background: '#10b981', color: 'white' }}
            >
              <Text size={1}>marginX=6</Text>
            </Box>
          </Box>
        </Box>

        <Box pad={4} radius={2} style={{ background: '#f9fafb' }}>
          <Text size={1} weight="semibold" style={{ marginBottom: '12px' }}>
            marginY (vertical)
          </Text>
          <Box pad={3} radius={1} style={{ background: '#fef2f2', border: '2px dashed #f87171' }}>
            <Box
              marginY={5}
              pad={3}
              radius={2}
              style={{ background: '#f59e0b', color: 'white' }}
            >
              <Text size={1}>marginY=5</Text>
            </Box>
          </Box>
        </Box>
      </Column>
    </Column>
  ),
}

// Radius scale
const radiusScale = [
  { key: '0', value: '0', pixels: '0px' },
  { key: '1', value: '0.125rem', pixels: '2px' },
  { key: '2', value: '0.25rem', pixels: '4px' },
  { key: '3', value: '0.5rem', pixels: '8px' },
  { key: '4', value: '1rem', pixels: '16px' },
]

export const RadiusScale: Story = {
  render: () => (
    <Column gap={4} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Radius Scale (0-4)
        </Text>
        <Text tone="muted">
          5 border radius values for consistent corner rounding.
        </Text>
      </Column>

      <Column gap={3}>
        {radiusScale.map((radius) => (
          <Row key={radius.key} gap={4} align="center">
            <Box
              style={{
                width: '80px',
                height: '80px',
                background: '#3b82f6',
                borderRadius: radius.value,
              }}
            />
            <Column gap={0} style={{ flex: 1 }}>
              <Row gap={2} align="baseline">
                <Text weight="bold" mono>
                  --st-radius-{radius.key}
                </Text>
                <Text size={1} mono tone="muted">
                  {radius.value}
                </Text>
                <Text size={0} tone="muted">
                  ({radius.pixels})
                </Text>
              </Row>
            </Column>
          </Row>
        ))}
      </Column>
    </Column>
  ),
}

// Shadow scale
export const ShadowScale: Story = {
  render: () => (
    <Column gap={4} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Shadow Scale (0-2)
        </Text>
        <Text tone="muted">
          3 elevation levels for depth and hierarchy.
        </Text>
      </Column>

      <Column gap={4}>
        <Row gap={4} align="center">
          <Box
            shadow={0}
            pad={5}
            radius={2}
            style={{ background: 'white', border: '1px solid #e5e7eb' }}
          >
            <Text align="center" weight="semibold">
              shadow=0
            </Text>
            <Text align="center" size={0} tone="muted">
              (none)
            </Text>
          </Box>

          <Box shadow={1} pad={5} radius={2} style={{ background: 'white' }}>
            <Text align="center" weight="semibold">
              shadow=1
            </Text>
            <Text align="center" size={0} tone="muted">
              (subtle)
            </Text>
          </Box>

          <Box shadow={2} pad={5} radius={2} style={{ background: 'white' }}>
            <Text align="center" weight="semibold">
              shadow=2
            </Text>
            <Text align="center" size={0} tone="muted">
              (elevated)
            </Text>
          </Box>
        </Row>
      </Column>
    </Column>
  ),
}

// Real-world spacing examples
export const CardSpacing: Story = {
  render: () => (
    <Column gap={6} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Card Spacing Patterns
        </Text>
        <Text tone="muted">
          Common spacing patterns for card layouts.
        </Text>
      </Column>

      <Column gap={4}>
        {/* Compact card */}
        <Box pad={3} radius={2} shadow={1} style={{ background: 'white' }}>
          <Column gap={2}>
            <Text weight="bold">Compact Card</Text>
            <Text size={1} tone="muted">
              pad=3, gap=2 - Dense information display
            </Text>
            <Row gap={2}>
              <Box pad={2} radius={1} style={{ background: '#dbeafe', flex: 1 }}>
                <Text size={0} align="center">Stat 1</Text>
              </Box>
              <Box pad={2} radius={1} style={{ background: '#dbeafe', flex: 1 }}>
                <Text size={0} align="center">Stat 2</Text>
              </Box>
            </Row>
          </Column>
        </Box>

        {/* Standard card */}
        <Box pad={4} radius={2} shadow={1} style={{ background: 'white' }}>
          <Column gap={3}>
            <Text weight="bold" size={3}>
              Standard Card
            </Text>
            <Text tone="muted">
              pad=4, gap=3 - Balanced spacing for most use cases
            </Text>
            <Row gap={3}>
              <button style={{ flex: 1, padding: '10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Action
              </button>
              <button style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}>
                Cancel
              </button>
            </Row>
          </Column>
        </Box>

        {/* Spacious card */}
        <Box pad={6} radius={2} shadow={1} style={{ background: 'white' }}>
          <Column gap={4}>
            <Column gap={1}>
              <Text weight="bold" size={4}>
                Spacious Card
              </Text>
              <Text tone="muted">
                pad=6, gap=4 - Premium feel with generous breathing room
              </Text>
            </Column>
            <Text leading="relaxed">
              This card uses larger spacing values to create a more premium, spacious feel.
              Perfect for hero sections or feature highlights.
            </Text>
            <button style={{ padding: '12px 24px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
              Get Started
            </button>
          </Column>
        </Box>
      </Column>
    </Column>
  ),
}

// Stack spacing patterns
export const StackSpacing: Story = {
  render: () => (
    <Column gap={6} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Stack Spacing Patterns
        </Text>
        <Text tone="muted">
          Vertical spacing guidelines for content hierarchy.
        </Text>
      </Column>

      <Box pad={5} radius={2} shadow={1} style={{ background: 'white' }}>
        <Column gap={6}>
          {/* Title group */}
          <Column gap={1}>
            <Text as="h1" size={6} weight="bold">
              Title Group
            </Text>
            <Text size={2} tone="muted">
              gap=1 (4px) - Tightly coupled items
            </Text>
          </Column>

          {/* Section */}
          <Column gap={3}>
            <Text as="h2" size={4} weight="bold">
              Section Heading
            </Text>
            <Text leading="relaxed">
              gap=3 (12px) - Related content within a section. This creates visual grouping while maintaining readability.
            </Text>
          </Column>

          {/* Major sections */}
          <Column gap={4}>
            <Text as="h3" size={3} weight="semibold">
              Subsection
            </Text>
            <Text>
              gap=4 (16px) - Standard spacing between major sections. Provides clear separation while maintaining flow.
            </Text>
          </Column>

          {/* Generous spacing */}
          <Column gap={6}>
            <Text as="h3" size={3} weight="semibold">
              Major Section Break
            </Text>
            <Text>
              gap=6 (32px) - Large spacing for distinct sections. Use this to clearly separate unrelated content blocks.
            </Text>
          </Column>
        </Column>
      </Box>
    </Column>
  ),
}

// Responsive spacing
export const ResponsiveSpacing: Story = {
  render: () => (
    <Column gap={6} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Responsive Spacing
        </Text>
        <Text tone="muted">
          Spacing adapts to screen size for optimal density. Resize window to see changes.
        </Text>
      </Column>

      <Box
        pad={{ base: 3, md: 5, lg: 7 }}
        radius={2}
        shadow={1}
        style={{ background: 'white' }}
      >
        <Column gap={{ base: 2, md: 3, lg: 4 }}>
          <Text size={{ base: 3, md: 4, lg: 5 }} weight="bold">
            Responsive Card
          </Text>
          <Text>
            This card's padding and gap adjust based on screen size:
          </Text>
          <Column gap={1} style={{ background: '#f9fafb', padding: '12px', borderRadius: '4px' }}>
            <Text size={1} mono>pad: base=3, md=5, lg=7</Text>
            <Text size={1} mono>gap: base=2, md=3, lg=4</Text>
          </Column>
        </Column>
      </Box>
    </Column>
  ),
}
