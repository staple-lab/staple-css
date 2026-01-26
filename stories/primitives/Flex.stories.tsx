import type { Meta, StoryObj } from '@storybook/react'
import { Flex, Row, Column, Box, Text } from '@staple-css/primitives'

const meta = {
  title: 'Primitives/Flex',
  component: Flex,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    gap: {
      control: { type: 'number', min: 0, max: 8, step: 1 },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
  },
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

const DemoItem = ({ label, ...props }: { label: string; [key: string]: any }) => (
  <Box pad={3} radius={2} style={{ background: '#dbeafe', minWidth: '100px', textAlign: 'center', ...props.style }} {...props}>
    <Text>{label}</Text>
  </Box>
)

// Basic Flex layouts
export const Basic: Story = {
  render: () => (
    <Flex gap={4}>
      <DemoItem label="Item 1" />
      <DemoItem label="Item 2" />
      <DemoItem label="Item 3" />
    </Flex>
  ),
}

export const DirectionRow: Story = {
  render: () => (
    <Flex direction="row" gap={3}>
      <DemoItem label="First" />
      <DemoItem label="Second" />
      <DemoItem label="Third" />
    </Flex>
  ),
}

export const DirectionColumn: Story = {
  render: () => (
    <Flex direction="column" gap={3}>
      <DemoItem label="First" />
      <DemoItem label="Second" />
      <DemoItem label="Third" />
    </Flex>
  ),
}

// Gap scale demonstration
export const GapScale: Story = {
  render: () => (
    <Column gap={4}>
      <Text weight="bold">Gap Scale (0-8)</Text>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((gap) => (
        <Box key={gap} pad={2} radius={1} style={{ background: '#f9fafb' }}>
          <Text size={0} weight="semibold" style={{ marginBottom: '8px' }}>gap={gap}</Text>
          <Flex gap={gap as any}>
            <DemoItem label="A" />
            <DemoItem label="B" />
            <DemoItem label="C" />
          </Flex>
        </Box>
      ))}
    </Column>
  ),
}

// Alignment options
export const AlignStart: Story = {
  render: () => (
    <Flex align="start" gap={2} style={{ height: '200px', background: '#f9fafb', padding: '16px' }}>
      <DemoItem label="Tall item" style={{ height: '100px' }} />
      <DemoItem label="Short" />
      <DemoItem label="Short" />
    </Flex>
  ),
}

export const AlignCenter: Story = {
  render: () => (
    <Flex align="center" gap={2} style={{ height: '200px', background: '#f9fafb', padding: '16px' }}>
      <DemoItem label="Tall item" style={{ height: '100px' }} />
      <DemoItem label="Short" />
      <DemoItem label="Short" />
    </Flex>
  ),
}

export const AlignEnd: Story = {
  render: () => (
    <Flex align="end" gap={2} style={{ height: '200px', background: '#f9fafb', padding: '16px' }}>
      <DemoItem label="Tall item" style={{ height: '100px' }} />
      <DemoItem label="Short" />
      <DemoItem label="Short" />
    </Flex>
  ),
}

export const AlignStretch: Story = {
  render: () => (
    <Flex align="stretch" gap={2} style={{ height: '200px', background: '#f9fafb', padding: '16px' }}>
      <DemoItem label="Stretched" />
      <DemoItem label="Stretched" />
      <DemoItem label="Stretched" />
    </Flex>
  ),
}

// Justification options
export const JustifyStart: Story = {
  render: () => (
    <Flex justify="start" gap={2} style={{ width: '100%', background: '#f9fafb', padding: '16px' }}>
      <DemoItem label="Item 1" />
      <DemoItem label="Item 2" />
      <DemoItem label="Item 3" />
    </Flex>
  ),
}

export const JustifyCenter: Story = {
  render: () => (
    <Flex justify="center" gap={2} style={{ width: '100%', background: '#f9fafb', padding: '16px' }}>
      <DemoItem label="Item 1" />
      <DemoItem label="Item 2" />
      <DemoItem label="Item 3" />
    </Flex>
  ),
}

export const JustifyEnd: Story = {
  render: () => (
    <Flex justify="end" gap={2} style={{ width: '100%', background: '#f9fafb', padding: '16px' }}>
      <DemoItem label="Item 1" />
      <DemoItem label="Item 2" />
      <DemoItem label="Item 3" />
    </Flex>
  ),
}

export const JustifyBetween: Story = {
  render: () => (
    <Flex justify="between" gap={2} style={{ width: '100%', background: '#f9fafb', padding: '16px' }}>
      <DemoItem label="Item 1" />
      <DemoItem label="Item 2" />
      <DemoItem label="Item 3" />
    </Flex>
  ),
}

export const JustifyAround: Story = {
  render: () => (
    <Flex justify="around" gap={2} style={{ width: '100%', background: '#f9fafb', padding: '16px' }}>
      <DemoItem label="Item 1" />
      <DemoItem label="Item 2" />
      <DemoItem label="Item 3" />
    </Flex>
  ),
}

export const JustifyEvenly: Story = {
  render: () => (
    <Flex justify="evenly" gap={2} style={{ width: '100%', background: '#f9fafb', padding: '16px' }}>
      <DemoItem label="Item 1" />
      <DemoItem label="Item 2" />
      <DemoItem label="Item 3" />
    </Flex>
  ),
}

// Wrapping
export const Wrap: Story = {
  render: () => (
    <Flex wrap="wrap" gap={2} style={{ width: '300px', background: '#f9fafb', padding: '16px' }}>
      {Array.from({ length: 10 }, (_, i) => (
        <DemoItem key={i} label={`Item ${i + 1}`} />
      ))}
    </Flex>
  ),
}

export const NoWrap: Story = {
  render: () => (
    <Flex wrap="nowrap" gap={2} style={{ width: '300px', background: '#f9fafb', padding: '16px', overflow: 'auto' }}>
      {Array.from({ length: 6 }, (_, i) => (
        <DemoItem key={i} label={`Item ${i + 1}`} style={{ flexShrink: 0 }} />
      ))}
    </Flex>
  ),
}

// Row and Column convenienece components
export const RowComponent: Story = {
  render: () => (
    <Row gap={3} align="center">
      <Box style={{ width: '50px', height: '50px', background: '#3b82f6', borderRadius: '50%' }} />
      <Column gap={1}>
        <Text weight="bold">User Name</Text>
        <Text size={1} tone="muted">user@example.com</Text>
      </Column>
    </Row>
  ),
}

export const ColumnComponent: Story = {
  render: () => (
    <Column gap={3}>
      <DemoItem label="Header" />
      <DemoItem label="Content" />
      <DemoItem label="Footer" />
    </Column>
  ),
}

// Responsive examples
export const ResponsiveDirection: Story = {
  render: () => (
    <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 4 }}>
      <DemoItem label="Sidebar" />
      <DemoItem label="Main Content" />
      <DemoItem label="Aside" />
      <Text size={0} tone="muted">Resize window: column on mobile, row on desktop</Text>
    </Flex>
  ),
}

export const ResponsiveGap: Story = {
  render: () => (
    <Flex direction="column" gap={{ base: 1, sm: 2, md: 3, lg: 4 }}>
      <DemoItem label="Item 1" />
      <DemoItem label="Item 2" />
      <DemoItem label="Item 3" />
      <Text size={0} tone="muted">Gap increases with screen size</Text>
    </Flex>
  ),
}

// Real-world layouts
export const HeaderLayout: Story = {
  render: () => (
    <Flex
      justify="between"
      align="center"
      pad={4}
      style={{ background: '#1f2937', color: 'white', width: '100%' }}
    >
      <Text size={3} weight="bold">Logo</Text>
      <Row gap={4}>
        <Text>Home</Text>
        <Text>About</Text>
        <Text>Contact</Text>
      </Row>
      <button style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Sign In
      </button>
    </Flex>
  ),
}

export const CardLayout: Story = {
  render: () => (
    <Column gap={3} pad={4} radius={3} shadow={1} maxWidth="md" style={{ background: 'white' }}>
      <Row gap={3} align="center">
        <Box style={{ width: '60px', height: '60px', background: '#3b82f6', borderRadius: '50%' }} />
        <Column gap={1}>
          <Text size={3} weight="bold">Jane Doe</Text>
          <Text size={1} tone="muted">Software Engineer</Text>
        </Column>
      </Row>

      <Text leading="relaxed">
        Passionate about building great user experiences with modern web technologies.
        Specializing in React, TypeScript, and design systems.
      </Text>

      <Row gap={2}>
        <button style={{ flex: 1, padding: '10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
          Follow
        </button>
        <button style={{ flex: 1, padding: '10px', background: 'transparent', color: '#3b82f6', border: '2px solid #3b82f6', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
          Message
        </button>
      </Row>
    </Column>
  ),
}

export const FormLayout: Story = {
  render: () => (
    <Column gap={4} maxWidth="md" pad={6} radius={3} shadow={2} style={{ background: 'white' }}>
      <Text as="h2" size={4} weight="bold">Contact Us</Text>

      <Column gap={2}>
        <Text as="label" weight="semibold" size={1}>Full Name</Text>
        <input type="text" placeholder="John Doe" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '14px' }} />
      </Column>

      <Row gap={3}>
        <Column gap={2} style={{ flex: 1 }}>
          <Text as="label" weight="semibold" size={1}>Email</Text>
          <input type="email" placeholder="john@example.com" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '14px' }} />
        </Column>

        <Column gap={2} style={{ flex: 1 }}>
          <Text as="label" weight="semibold" size={1}>Phone</Text>
          <input type="tel" placeholder="(555) 123-4567" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '14px' }} />
        </Column>
      </Row>

      <Column gap={2}>
        <Text as="label" weight="semibold" size={1}>Message</Text>
        <textarea placeholder="How can we help?" style={{ padding: '10px', borderRadius: '6px', border: '1px solid #e5e7eb', minHeight: '120px', fontSize: '14px', fontFamily: 'inherit' }} />
      </Column>

      <Row justify="end" gap={2}>
        <button style={{ padding: '10px 20px', background: 'transparent', color: '#6b7280', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
          Cancel
        </button>
        <button style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
          Send Message
        </button>
      </Row>
    </Column>
  ),
}

export const DashboardLayout: Story = {
  render: () => (
    <Column gap={4} style={{ width: '100%', maxWidth: '1200px' }}>
      {/* Header */}
      <Flex justify="between" align="center" pad={4} radius={2} shadow={1} style={{ background: 'white' }}>
        <Text size={4} weight="bold">Dashboard</Text>
        <Row gap={3}>
          <button style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}>
            Filters
          </button>
          <button style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            New Item
          </button>
        </Row>
      </Flex>

      {/* Stats Grid */}
      <Flex wrap="wrap" gap={3}>
        {[
          { label: 'Total Users', value: '12,543', change: '+12%' },
          { label: 'Revenue', value: '$45,231', change: '+18%' },
          { label: 'Orders', value: '892', change: '-5%' },
        ].map((stat) => (
          <Box key={stat.label} pad={4} radius={2} shadow={1} style={{ flex: '1 1 200px', background: 'white' }}>
            <Column gap={2}>
              <Text size={1} tone="muted">{stat.label}</Text>
              <Text size={5} weight="bold">{stat.value}</Text>
              <Text size={0} style={{ color: stat.change.startsWith('+') ? '#16a34a' : '#dc2626' }}>
                {stat.change} from last month
              </Text>
            </Column>
          </Box>
        ))}
      </Flex>

      {/* Content Grid */}
      <Flex gap={3} direction={{ base: 'column', lg: 'row' }}>
        <Box pad={4} radius={2} shadow={1} style={{ flex: 2, background: 'white' }}>
          <Text size={3} weight="bold" style={{ marginBottom: '16px' }}>Recent Activity</Text>
          <Column gap={2}>
            {[1, 2, 3, 4].map((i) => (
              <Flex key={i} justify="between" pad={2} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <Text>Activity item {i}</Text>
                <Text size={1} tone="muted">2h ago</Text>
              </Flex>
            ))}
          </Column>
        </Box>

        <Box pad={4} radius={2} shadow={1} style={{ flex: 1, background: 'white' }}>
          <Text size={3} weight="bold" style={{ marginBottom: '16px' }}>Quick Actions</Text>
          <Column gap={2}>
            <button style={{ padding: '12px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', fontWeight: '500' }}>
              Create Report
            </button>
            <button style={{ padding: '12px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', fontWeight: '500' }}>
              Export Data
            </button>
            <button style={{ padding: '12px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', fontWeight: '500' }}>
              Settings
            </button>
          </Column>
        </Box>
      </Flex>
    </Column>
  ),
}
