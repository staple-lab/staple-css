import type { Meta, StoryObj } from '@storybook/react'
import { Container, Column, Row, Text, Box } from '@staple-css/primitives/full'

const meta = {
  title: 'Primitives/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'prose', 'full'],
    },
    center: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

const DemoContent = () => (
  <Box pad={6} radius={2} shadow={1} style={{ background: '#dbeafe' }}>
    <Text size={3} weight="bold" style={{ marginBottom: '16px' }}>
      Container Content
    </Text>
    <Text leading="relaxed">
      This content is constrained by the container's max-width. Resize the window to see
      how the container adapts to different screen sizes while maintaining its maximum width.
    </Text>
  </Box>
)

// Basic containers
export const Basic: Story = {
  render: () => (
    <Container>
      <DemoContent />
    </Container>
  ),
}

export const Centered: Story = {
  render: () => (
    <Container center>
      <DemoContent />
    </Container>
  ),
}

// Size scale
export const SizeXS: Story = {
  render: () => (
    <Container size="xs" center>
      <DemoContent />
      <Text size={0} tone="muted" align="center" style={{ marginTop: '8px' }}>
        size="xs" (320px / 20rem)
      </Text>
    </Container>
  ),
}

export const SizeSM: Story = {
  render: () => (
    <Container size="sm" center>
      <DemoContent />
      <Text size={0} tone="muted" align="center" style={{ marginTop: '8px' }}>
        size="sm" (384px / 24rem)
      </Text>
    </Container>
  ),
}

export const SizeMD: Story = {
  render: () => (
    <Container size="md" center>
      <DemoContent />
      <Text size={0} tone="muted" align="center" style={{ marginTop: '8px' }}>
        size="md" (448px / 28rem)
      </Text>
    </Container>
  ),
}

export const SizeLG: Story = {
  render: () => (
    <Container size="lg" center>
      <DemoContent />
      <Text size={0} tone="muted" align="center" style={{ marginTop: '8px' }}>
        size="lg" (512px / 32rem)
      </Text>
    </Container>
  ),
}

export const SizeXL: Story = {
  render: () => (
    <Container size="xl" center>
      <DemoContent />
      <Text size={0} tone="muted" align="center" style={{ marginTop: '8px' }}>
        size="xl" (576px / 36rem)
      </Text>
    </Container>
  ),
}

export const Size2XL: Story = {
  render: () => (
    <Container size="2xl" center>
      <DemoContent />
      <Text size={0} tone="muted" align="center" style={{ marginTop: '8px' }}>
        size="2xl" (672px / 42rem)
      </Text>
    </Container>
  ),
}

export const SizeProse: Story = {
  render: () => (
    <Container size="prose" center>
      <Box pad={6}>
        <Text as="h1" size={6} weight="bold" style={{ marginBottom: '16px' }}>
          Article Title
        </Text>
        <Text leading="relaxed">
          The prose container size (65ch) is optimized for reading long-form content.
          It limits line length to approximately 65 characters, which is considered
          optimal for readability.
        </Text>
        <Text leading="relaxed" style={{ marginTop: '16px' }}>
          Research shows that line lengths between 45-75 characters per line are most
          comfortable for reading. Lines that are too long tire the eye and make it
          difficult to track from the end of one line to the beginning of the next.
        </Text>
      </Box>
      <Text size={0} tone="muted" align="center" style={{ marginTop: '8px' }}>
        size="prose" (65ch)
      </Text>
    </Container>
  ),
}

export const SizeFull: Story = {
  render: () => (
    <Container size="full">
      <DemoContent />
      <Text size={0} tone="muted" align="center" style={{ marginTop: '8px' }}>
        size="full" (100% width)
      </Text>
    </Container>
  ),
}

// Responsive container
export const Responsive: Story = {
  render: () => (
    <Container size={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }} center>
      <Box pad={6} radius={2} shadow={1} style={{ background: '#dbeafe' }}>
        <Text size={3} weight="bold" style={{ marginBottom: '16px' }}>
          Responsive Container
        </Text>
        <Text leading="relaxed">
          This container's size adapts based on breakpoints:
          <ul style={{ marginTop: '12px', marginLeft: '20px' }}>
            <li>xs on mobile (320px)</li>
            <li>sm on small screens (384px)</li>
            <li>md on medium screens (448px)</li>
            <li>lg on large screens (512px)</li>
            <li>xl on extra large screens (576px)</li>
          </ul>
        </Text>
      </Box>
    </Container>
  ),
}

// Real-world examples
export const ArticleLayout: Story = {
  render: () => (
    <Container size="prose" center>
      <Column gap={4} pad={6}>
        <Column gap={2}>
          <Text as="h1" size={6} weight="bold">
            Building Better Interfaces
          </Text>
          <Row gap={2} align="center">
            <Box style={{ width: '40px', height: '40px', background: '#3b82f6', borderRadius: '50%' }} />
            <Column gap={0}>
              <Text weight="semibold">Jane Doe</Text>
              <Text size={0} tone="muted">Published on January 26, 2025</Text>
            </Column>
          </Row>
        </Column>

        <Text as="p" leading="relaxed">
          In the ever-evolving landscape of web development, creating interfaces that are
          both beautiful and functional remains a paramount goal. The key lies in understanding
          the fundamental principles that govern user interaction and visual hierarchy.
        </Text>

        <Text as="p" leading="relaxed">
          One of the most important aspects of interface design is consistency. When users
          encounter a consistent design language throughout an application, they can focus
          on their tasks rather than learning new patterns at every turn.
        </Text>

        <Box pad={4} radius={2} style={{ background: '#f9fafb', borderLeft: '4px solid #3b82f6' }}>
          <Text size={2} weight="semibold" style={{ marginBottom: '8px' }}>
            Key Takeaway
          </Text>
          <Text leading="relaxed">
            Design systems provide the foundation for consistent, scalable interfaces that
            users love.
          </Text>
        </Box>

        <Text as="p" leading="relaxed">
          As we continue to push the boundaries of what's possible on the web, remember that
          the best interfaces are those that feel invisible—they simply work, allowing users
          to accomplish their goals without friction.
        </Text>
      </Column>
    </Container>
  ),
}

export const LandingPage: Story = {
  render: () => (
    <Column gap={0}>
      {/* Hero Section */}
      <Box style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Container size="xl" center>
          <Column gap={6} pad={8} align="center">
            <Text as="h1" size={6} weight="bold" align="center">
              Build Amazing Products
            </Text>
            <Text size={3} align="center" style={{ maxWidth: '600px' }}>
              Everything you need to create beautiful, modern web applications with confidence.
            </Text>
            <Row gap={3}>
              <button style={{ padding: '14px 28px', background: 'white', color: '#667eea', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
                Get Started
              </button>
              <button style={{ padding: '14px 28px', background: 'transparent', color: 'white', border: '2px solid white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
                Learn More
              </button>
            </Row>
          </Column>
        </Container>
      </Box>

      {/* Features Section */}
      <Container size="xl" center>
        <Column gap={8} pad={8}>
          <Text as="h2" size={5} weight="bold" align="center">
            Why Choose Us
          </Text>

          <Row gap={4} wrap="wrap" justify="center">
            {[
              { title: 'Fast Performance', desc: 'Lightning-fast load times and smooth interactions' },
              { title: 'Easy to Use', desc: 'Intuitive interface that anyone can master' },
              { title: 'Secure & Reliable', desc: 'Bank-level security and 99.9% uptime' },
            ].map((feature) => (
              <Box key={feature.title} pad={6} radius={2} shadow={1} style={{ flex: '1 1 250px', background: 'white' }}>
                <Column gap={2}>
                  <Box style={{ width: '48px', height: '48px', background: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text size={4}>✓</Text>
                  </Box>
                  <Text size={3} weight="bold">{feature.title}</Text>
                  <Text tone="muted" leading="relaxed">{feature.desc}</Text>
                </Column>
              </Box>
            ))}
          </Row>
        </Column>
      </Container>

      {/* CTA Section */}
      <Box style={{ background: '#f9fafb' }}>
        <Container size="lg" center>
          <Column gap={4} pad={8} align="center">
            <Text as="h2" size={5} weight="bold" align="center">
              Ready to Get Started?
            </Text>
            <Text size={2} align="center" tone="muted">
              Join thousands of teams already building with our platform.
            </Text>
            <button style={{ padding: '14px 32px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
              Start Free Trial
            </button>
          </Column>
        </Container>
      </Box>
    </Column>
  ),
}

export const DashboardLayout: Story = {
  render: () => (
    <Container size="7xl" center>
      <Column gap={4} pad={4}>
        {/* Header */}
        <Row justify="between" align="center">
          <Text size={5} weight="bold">Dashboard</Text>
          <Row gap={2}>
            <button style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}>
              Export
            </button>
            <button style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              New Report
            </button>
          </Row>
        </Row>

        {/* Stats Grid */}
        <Row gap={3} wrap="wrap">
          {[
            { label: 'Total Revenue', value: '$145,230', change: '+12.5%', positive: true },
            { label: 'Active Users', value: '12,543', change: '+8.2%', positive: true },
            { label: 'Conversion Rate', value: '3.24%', change: '-2.1%', positive: false },
            { label: 'Avg. Order Value', value: '$89.50', change: '+5.7%', positive: true },
          ].map((stat) => (
            <Box key={stat.label} pad={4} radius={2} shadow={1} style={{ flex: '1 1 200px', background: 'white' }}>
              <Column gap={2}>
                <Text size={1} tone="muted">{stat.label}</Text>
                <Text size={5} weight="bold">{stat.value}</Text>
                <Text size={1} style={{ color: stat.positive ? '#16a34a' : '#dc2626' }}>
                  {stat.change} vs last month
                </Text>
              </Column>
            </Box>
          ))}
        </Row>

        {/* Content Area */}
        <Box pad={6} radius={2} shadow={1} style={{ background: 'white' }}>
          <Text size={3} weight="bold" style={{ marginBottom: '16px' }}>
            Recent Activity
          </Text>
          <Column gap={2}>
            {Array.from({ length: 5 }, (_, i) => (
              <Row key={i} justify="between" pad={3} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <Column gap={0}>
                  <Text weight="semibold">Activity Item {i + 1}</Text>
                  <Text size={0} tone="muted">Description of the activity</Text>
                </Column>
                <Text size={1} tone="muted">{i + 1}h ago</Text>
              </Row>
            ))}
          </Column>
        </Box>
      </Column>
    </Container>
  ),
}
