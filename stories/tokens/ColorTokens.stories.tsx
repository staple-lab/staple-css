import type { Meta, StoryObj } from '@storybook/react'
import { Box, Stack, Inline, Text } from '@staple-css/primitives'

const meta = {
  title: 'Tokens/Colors',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

const ColorGrid = ({ colors }: { colors: Record<string, string> }) => (
  <Stack gap={2}>
    {Object.entries(colors).map(([name, value]) => (
      <Inline key={name} gap={2} align="center">
        <Box
          style={{
            width: '40px',
            height: '40px',
            background: value,
            borderRadius: '4px',
            border: '1px solid #e5e7eb',
          }}
        />
        <Stack gap={0}>
          <Text weight="semibold" size={1}>
            {name}
          </Text>
          <Text size={0} tone="muted" mono>
            {value}
          </Text>
        </Stack>
      </Inline>
    ))}
  </Stack>
)

export const SemanticColors: Story = {
  render: () => (
    <Stack gap={6} maxWidth="lg">
      <Stack gap={2}>
        <Text as="h2" size={4} weight="bold">
          Light Theme
        </Text>
        <Text tone="muted">
          These semantic colors automatically adapt to light/dark themes
        </Text>
      </Stack>

      <Stack gap={4}>
        <Stack gap={2}>
          <Text weight="bold" size={2}>
            Surfaces
          </Text>
          <ColorGrid
            colors={{
              background: '#ffffff',
              surface: '#f9fafb',
              'surface-raised': '#ffffff',
            }}
          />
        </Stack>

        <Stack gap={2}>
          <Text weight="bold" size={2}>
            Text
          </Text>
          <ColorGrid
            colors={{
              text: '#111827',
              'text-muted': '#6b7280',
              'text-inverse': '#ffffff',
            }}
          />
        </Stack>

        <Stack gap={2}>
          <Text weight="bold" size={2}>
            Borders
          </Text>
          <ColorGrid
            colors={{
              border: '#e5e7eb',
              'border-muted': '#f3f4f6',
            }}
          />
        </Stack>

        <Stack gap={2}>
          <Text weight="bold" size={2}>
            Primary Action
          </Text>
          <ColorGrid
            colors={{
              primary: '#2563eb',
              'primary-hover': '#1d4ed8',
              'primary-text': '#ffffff',
            }}
          />
        </Stack>

        <Stack gap={2}>
          <Text weight="bold" size={2}>
            Danger State
          </Text>
          <ColorGrid
            colors={{
              danger: '#dc2626',
              'danger-hover': '#b91c1c',
              'danger-text': '#ffffff',
              'danger-surface': '#fef2f2',
            }}
          />
        </Stack>

        <Stack gap={2}>
          <Text weight="bold" size={2}>
            Warning State
          </Text>
          <ColorGrid
            colors={{
              warn: '#d97706',
              'warn-hover': '#b45309',
              'warn-text': '#ffffff',
              'warn-surface': '#fffbeb',
            }}
          />
        </Stack>

        <Stack gap={2}>
          <Text weight="bold" size={2}>
            Success State
          </Text>
          <ColorGrid
            colors={{
              success: '#16a34a',
              'success-hover': '#15803d',
              'success-text': '#ffffff',
              'success-surface': '#f0fdf4',
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  ),
}

export const ColorScale: Story = {
  render: () => (
    <Stack gap={4}>
      <Stack gap={2}>
        <Text as="h3" size={3} weight="bold">
          Blue Palette (50-950)
        </Text>
        <Stack gap={1}>
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => (
            <Inline key={shade} gap={2} align="center">
              <Box
                style={{
                  width: '60px',
                  height: '30px',
                  background: `var(--st-blue-${shade})`,
                  borderRadius: '2px',
                  border: '1px solid #e5e7eb',
                }}
              />
              <Text size={1} mono>
                --st-blue-{shade}
              </Text>
            </Inline>
          ))}
        </Stack>
      </Stack>
    </Stack>
  ),
}

export const ButtonExamples: Story = {
  render: () => (
    <Stack gap={4}>
      <Text as="h3" size={3} weight="bold">
        Button Styling with Color Tokens
      </Text>

      <Stack gap={2}>
        <button
          style={{
            padding: '12px 24px',
            background: 'var(--st-color-primary)',
            color: 'var(--st-color-primary-text)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Primary Button
        </button>

        <button
          style={{
            padding: '12px 24px',
            background: 'var(--st-color-danger)',
            color: 'var(--st-color-danger-text)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Danger Button
        </button>

        <button
          style={{
            padding: '12px 24px',
            background: 'var(--st-color-success)',
            color: 'var(--st-color-success-text)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Success Button
        </button>
      </Stack>
    </Stack>
  ),
}

export const StatusCards: Story = {
  render: () => (
    <Stack gap={3}>
      <Box pad={3} radius={2} style={{ background: 'var(--st-color-success-surface)' }}>
        <Text tone="success" weight="semibold">
          ✓ Success Message
        </Text>
        <Text size={1} tone="muted">
          Everything worked as expected
        </Text>
      </Box>

      <Box pad={3} radius={2} style={{ background: 'var(--st-color-warn-surface)' }}>
        <Text tone="warn" weight="semibold">
          ⚠ Warning Message
        </Text>
        <Text size={1} tone="muted">
          Please be aware of this situation
        </Text>
      </Box>

      <Box pad={3} radius={2} style={{ background: 'var(--st-color-danger-surface)' }}>
        <Text tone="danger" weight="semibold">
          ✗ Error Message
        </Text>
        <Text size={1} tone="muted">
          Something went wrong
        </Text>
      </Box>
    </Stack>
  ),
}
