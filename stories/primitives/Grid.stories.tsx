import type { Meta, StoryObj } from '@storybook/react'
import { Box, Grid, Stack, Text } from '@staple-css/primitives'

const meta = {
  title: 'Primitives/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const DemoCard = ({ label }: { label: string }) => (
  <Box pad={4} radius={2} shadow={1} style={{ background: 'lightblue' }}>
    <Text align="center">{label}</Text>
  </Box>
)

export const Basic: Story = {
  render: () => (
    <Grid cols={3} gap={4}>
      <DemoCard label="1" />
      <DemoCard label="2" />
      <DemoCard label="3" />
      <DemoCard label="4" />
      <DemoCard label="5" />
      <DemoCard label="6" />
    </Grid>
  ),
}

export const Responsive: Story = {
  render: () => (
    <Grid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={{ base: 2, md: 4 }}>
      {Array.from({ length: 12 }, (_, i) => (
        <DemoCard key={i} label={`${i + 1}`} />
      ))}
    </Grid>
  ),
}

export const ColumnVariations: Story = {
  render: () => (
    <Column gap={4}>
      <Column gap={2}>
        <Text weight="semibold">cols=1</Text>
        <Grid cols={1} gap={2}>
          <DemoCard label="1" />
          <DemoCard label="2" />
          <DemoCard label="3" />
        </Grid>
      </Column>

      <Column gap={2}>
        <Text weight="semibold">cols=2</Text>
        <Grid cols={2} gap={2}>
          <DemoCard label="1" />
          <DemoCard label="2" />
          <DemoCard label="3" />
          <DemoCard label="4" />
        </Grid>
      </Column>

      <Column gap={2}>
        <Text weight="semibold">cols=4</Text>
        <Grid cols={4} gap={2}>
          {Array.from({ length: 8 }, (_, i) => (
            <DemoCard key={i} label={`${i + 1}`} />
          ))}
        </Grid>
      </Column>
    </Column>
  ),
}

export const GapScale: Story = {
  render: () => (
    <Column gap={4}>
      <Column gap={2}>
        <Text weight="semibold">gap=2</Text>
        <Grid cols={3} gap={2}>
          <DemoCard label="1" />
          <DemoCard label="2" />
          <DemoCard label="3" />
        </Grid>
      </Column>

      <Column gap={2}>
        <Text weight="semibold">gap=4</Text>
        <Grid cols={3} gap={4}>
          <DemoCard label="1" />
          <DemoCard label="2" />
          <DemoCard label="3" />
        </Grid>
      </Column>

      <Column gap={2}>
        <Text weight="semibold">gap=6</Text>
        <Grid cols={3} gap={6}>
          <DemoCard label="1" />
          <DemoCard label="2" />
          <DemoCard label="3" />
        </Grid>
      </Column>
    </Column>
  ),
}

export const AutoFitLayout: Story = {
  render: () => (
    <Column gap={4}>
      <Text weight="semibold">Responsive auto-fit grid (resize to see)</Text>
      <Grid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
        {Array.from({ length: 12 }, (_, i) => (
          <DemoCard key={i} label={`Card ${i + 1}`} />
        ))}
      </Grid>
    </Column>
  ),
}

export const RowGapAndColumnGap: Story = {
  render: () => (
    <Column gap={4}>
      <Column gap={2}>
        <Text weight="semibold">Different row and column gaps</Text>
        <Grid cols={3} rowGap={6} columnGap={2}>
          {Array.from({ length: 6 }, (_, i) => (
            <DemoCard key={i} label={`${i + 1}`} />
          ))}
        </Grid>
      </Column>
    </Column>
  ),
}

export const ProductGrid: Story = {
  render: () => (
    <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
      {Array.from({ length: 9 }, (_, i) => (
        <Box key={i} pad={4} radius={2} shadow={1}>
          <Column gap={2}>
            <Box aspectRatio="square" radius={2} style={{ background: 'lightcyan' }} />
            <Text weight="semibold">Product {i + 1}</Text>
            <Text tone="muted" size={1}>$99.99</Text>
            <button style={{ padding: '8px 16px', borderRadius: '4px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}>
              Add to cart
            </button>
          </Column>
        </Box>
      ))}
    </Grid>
  ),
}
