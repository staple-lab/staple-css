import type { Meta, StoryObj } from '@storybook/react'
import { Card, Stack, Text, Row } from '@staple-css/primitives'

const meta = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Card pad={4} radius={2} shadow={1}>
      <Column gap={2}>
        <Text weight="semibold">Card Title</Text>
        <Text tone="muted">This is a basic card component</Text>
      </Column>
    </Card>
  ),
}

export const Tones: Story = {
  render: () => (
    <Column gap={4}>
      <Card pad={4} radius={2} shadow={1} tone="neutral">
        <Text weight="semibold">Neutral Card</Text>
      </Card>

      <Card pad={4} radius={2} shadow={1} tone="primary">
        <Text weight="semibold">Primary Card</Text>
      </Card>

      <Card pad={4} radius={2} shadow={1} tone="danger">
        <Text weight="semibold">Danger Card</Text>
      </Card>

      <Card pad={4} radius={2} shadow={1} tone="warn">
        <Text weight="semibold">Warning Card</Text>
      </Card>

      <Card pad={4} radius={2} shadow={1} tone="success">
        <Text weight="semibold">Success Card</Text>
      </Card>
    </Column>
  ),
}

export const PaddingScale: Story = {
  render: () => (
    <Column gap={4}>
      <Card pad={2} radius={2} shadow={1} tone="neutral">
        <Text>pad=2</Text>
      </Card>

      <Card pad={4} radius={2} shadow={1} tone="neutral">
        <Text>pad=4</Text>
      </Card>

      <Card pad={6} radius={2} shadow={1} tone="neutral">
        <Text>pad=6</Text>
      </Card>
    </Column>
  ),
}

export const ShadowScale: Story = {
  render: () => (
    <Column gap={4}>
      <Card pad={4} radius={2} shadow={0} tone="neutral">
        <Text>shadow=0</Text>
      </Card>

      <Card pad={4} radius={2} shadow={1} tone="neutral">
        <Text>shadow=1</Text>
      </Card>

      <Card pad={4} radius={2} shadow={2} tone="neutral">
        <Text>shadow=2</Text>
      </Card>
    </Column>
  ),
}

export const RadiusScale: Story = {
  render: () => (
    <Column gap={4}>
      <Card pad={4} radius={0} shadow={1} tone="neutral">
        <Text>radius=0</Text>
      </Card>

      <Card pad={4} radius={1} shadow={1} tone="neutral">
        <Text>radius=1</Text>
      </Card>

      <Card pad={4} radius={2} shadow={1} tone="neutral">
        <Text>radius=2</Text>
      </Card>

      <Card pad={4} radius={3} shadow={1} tone="neutral">
        <Text>radius=3</Text>
      </Card>

      <Card pad={4} radius={4} shadow={1} tone="neutral">
        <Text>radius=4</Text>
      </Card>
    </Column>
  ),
}

export const StatusCards: Story = {
  render: () => (
    <Column gap={3}>
      <Card pad={4} radius={2} shadow={1} tone="success">
        <Column gap={1}>
          <Text weight="semibold">✓ Success</Text>
          <Text size={1} tone="muted">Your changes have been saved</Text>
        </Column>
      </Card>

      <Card pad={4} radius={2} shadow={1} tone="danger">
        <Column gap={1}>
          <Text weight="semibold">✗ Error</Text>
          <Text size={1} tone="muted">Something went wrong</Text>
        </Column>
      </Card>

      <Card pad={4} radius={2} shadow={1} tone="warn">
        <Column gap={1}>
          <Text weight="semibold">⚠ Warning</Text>
          <Text size={1} tone="muted">Please review this action</Text>
        </Column>
      </Card>

      <Card pad={4} radius={2} shadow={1} tone="primary">
        <Column gap={1}>
          <Text weight="semibold">ℹ Information</Text>
          <Text size={1} tone="muted">Here's something you should know</Text>
        </Column>
      </Card>
    </Column>
  ),
}

export const ContentCard: Story = {
  render: () => (
    <Card pad={6} radius={2} shadow={1} tone="neutral" maxWidth="md">
      <Column gap={4}>
        <Column gap={1}>
          <Text as="h2" size={4} weight="bold">
            Article Title
          </Text>
          <Text size={1} tone="muted">
            Published on January 26, 2025
          </Text>
        </Column>

        <Text as="p" leading="relaxed">
          This is a content card that demonstrates how to structure an article or blog post. It includes a title, publication date, and body content.
        </Text>

        <Row gap={2}>
          <button style={{ padding: '8px 16px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Read More
          </button>
          <button style={{ padding: '8px 16px', background: 'transparent', color: '#2563eb', border: '1px solid #2563eb', borderRadius: '4px', cursor: 'pointer' }}>
            Share
          </button>
        </Row>
      </Column>
    </Card>
  ),
}

export const CardGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
      {Array.from({ length: 6 }, (_, i) => (
        <Card key={i} pad={4} radius={2} shadow={1} tone={['neutral', 'primary', 'danger', 'warn', 'success', 'neutral'][i % 6] as any}>
          <Column gap={2}>
            <Text weight="semibold">Card {i + 1}</Text>
            <Text size={1} tone="muted">
              This is a card in a responsive grid layout
            </Text>
          </Column>
        </Card>
      ))}
    </div>
  ),
}
