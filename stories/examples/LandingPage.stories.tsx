import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '../../packages/primitives/src/Box'
import { Column } from '../../packages/primitives/src/Flex'
import { Row } from '../../packages/primitives/src/Flex'
import { Text } from '../../packages/primitives/src/Text'
import { Container } from '../../packages/primitives/src/Container'

const meta = {
  title: 'Examples/Landing Page',
  parameters: {
  tags: ['autodocs'],
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) => (
  <Box
    pad={5}
    radius={2}
    style={{
      background: 'white',
      cursor: 'pointer',
      transition: 'all var(--st-duration-normal) var(--st-easing-out)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)'
      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = 'none'
    }}
  >
    <Column gap={3}>
      <Text size={6}>{icon}</Text>
      <Text size={4} weight="bold">
        {title}
      </Text>
      <Text size={2} tone="muted">
        {description}
      </Text>
    </Column>
  </Box>
)

const TestimonialCard = ({
  quote,
  author,
  role,
  avatar,
}: {
  quote: string
  author: string
  role: string
  avatar: string
}) => (
  <Box
    pad={5}
    radius={2}
    shadow={1}
    style={{
      background: 'white',
      flex: '1 1 300px',
    }}
  >
    <Column gap={4}>
      <Text size={5}>⭐⭐⭐⭐⭐</Text>
      <Text size={3} style={{ lineHeight: 1.6 }}>
        "{quote}"
      </Text>
      <Row gap={3} align="center">
        <Box
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: avatar,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: 600,
          }}
        >
          {author[0]}
        </Box>
        <Column gap={0}>
          <Text size={2} weight="semibold">
            {author}
          </Text>
          <Text size={1} tone="muted">
            {role}
          </Text>
        </Column>
      </Row>
    </Column>
  </Box>
)

const PricingCard = ({
  name,
  price,
  period,
  description,
  features,
  highlighted,
}: {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  highlighted?: boolean
}) => (
  <Box
    pad={6}
    radius={2}
    shadow={highlighted ? 2 : 1}
    style={{
      background: 'white',
      flex: '1 1 300px',
      border: highlighted ? '2px solid #3b82f6' : 'none',
      position: 'relative',
      cursor: 'pointer',
      transition: 'all var(--st-duration-normal) var(--st-easing-out)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.03)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)'
    }}
  >
    {highlighted && (
      <Box
        pad={2}
        style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#3b82f6',
          color: 'white',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        MOST POPULAR
      </Box>
    )}
    <Column gap={4}>
      <Column gap={2}>
        <Text size={4} weight="bold">
          {name}
        </Text>
        <Text size={2} tone="muted">
          {description}
        </Text>
      </Column>
      <Row gap={1} align="baseline">
        <Text size={6} weight="bold">
          {price}
        </Text>
        <Text size={2} tone="muted">
          /{period}
        </Text>
      </Row>
      <Box
        pad={3}
        radius={2}
        style={{
          background: highlighted ? '#3b82f6' : '#f3f4f6',
          color: highlighted ? 'white' : 'inherit',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all var(--st-duration-fast) var(--st-easing-out)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = highlighted ? '#2563eb' : '#e5e7eb'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = highlighted ? '#3b82f6' : '#f3f4f6'
        }}
      >
        <Text size={2} weight="semibold">
          Get Started
        </Text>
      </Box>
      <Column gap={2}>
        {features.map((feature, i) => (
          <Row key={i} gap={2} align="center">
            <Text size={2}>✓</Text>
            <Text size={2}>{feature}</Text>
          </Row>
        ))}
      </Column>
    </Column>
  </Box>
)

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <Column gap={1} style={{ flex: '1 1 150px', textAlign: 'center' }}>
    <Text size={6} weight="bold">
      {value}
    </Text>
    <Text size={2} tone="muted">
      {label}
    </Text>
  </Column>
)

export const CompleteLandingPage: Story = {
  render: () => (
    <Box style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Navigation */}
      <Box
        pad={4}
        style={{
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Container size="xl" center>
          <Row gap={6} align="center" justify="space-between">
            <Text size={4} weight="bold" style={{ color: '#3b82f6' }}>
              ⚡ StapleLab
            </Text>
            <Row gap={5} align="center">
              <Text
                size={2}
                style={{
                  cursor: 'pointer',
                  transition: 'color var(--st-duration-fast) var(--st-easing-out)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#3b82f6'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'inherit'
                }}
              >
                Features
              </Text>
              <Text
                size={2}
                style={{
                  cursor: 'pointer',
                  transition: 'color var(--st-duration-fast) var(--st-easing-out)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#3b82f6'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'inherit'
                }}
              >
                Pricing
              </Text>
              <Text
                size={2}
                style={{
                  cursor: 'pointer',
                  transition: 'color var(--st-duration-fast) var(--st-easing-out)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#3b82f6'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'inherit'
                }}
              >
                Docs
              </Text>
              <Text
                size={2}
                style={{
                  cursor: 'pointer',
                  transition: 'color var(--st-duration-fast) var(--st-easing-out)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#3b82f6'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'inherit'
                }}
              >
                Blog
              </Text>
            </Row>
            <Row gap={3}>
              <Box
                pad={3}
                radius={2}
                style={{
                  cursor: 'pointer',
                  transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3f4f6'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <Text size={2}>Sign In</Text>
              </Box>
              <Box
                pad={3}
                radius={2}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2563eb'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#3b82f6'
                }}
              >
                <Text size={2} weight="semibold">
                  Get Started
                </Text>
              </Box>
            </Row>
          </Row>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        pad={8}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container size="lg" center>
          <Column gap={6}>
            <Column gap={4}>
              <Text
                size={6}
                weight="bold"
                style={{
                  fontSize: '3.5rem',
                  lineHeight: 1.2,
                }}
              >
                Build Beautiful Apps Faster
              </Text>
              <Text size={4} style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.95 }}>
                A design system that feels like magic. Ship pixel-perfect interfaces in minutes,
                not days.
              </Text>
            </Column>

            <Row gap={3} style={{ justifyContent: 'center' }}>
              <Box
                pad={4}
                radius={2}
                style={{
                  background: 'white',
                  color: '#667eea',
                  cursor: 'pointer',
                  transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <Text size={3} weight="bold">
                  Start Building →
                </Text>
              </Box>
              <Box
                pad={4}
                radius={2}
                style={{
                  border: '2px solid white',
                  cursor: 'pointer',
                  transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <Text size={3} weight="semibold">
                  View Demo
                </Text>
              </Box>
            </Row>

            {/* Stats */}
            <Row
              gap={6}
              style={{
                justifyContent: 'center',
                marginTop: 'var(--st-space-6)',
                paddingTop: 'var(--st-space-6)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <StatCard value="50k+" label="Developers" />
              <StatCard value="1M+" label="Components Built" />
              <StatCard value="99.9%" label="Uptime" />
              <StatCard value="4.9★" label="Rating" />
            </Row>
          </Column>
        </Container>
      </Box>

      {/* Features Section */}
      <Box pad={8}>
        <Container size="xl" center>
          <Column gap={6}>
            <Column gap={3} style={{ textAlign: 'center' }}>
              <Text size={5} weight="bold">
                Everything You Need to Build
              </Text>
              <Text size={3} tone="muted">
                Powerful primitives, beautiful tokens, and thoughtful defaults
              </Text>
            </Column>

            <Row
              gap={5}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              }}
            >
              <FeatureCard
                icon="🎨"
                title="Design Tokens"
                description="Semantic color, spacing, and typography tokens that adapt to your theme. Dark mode included."
              />
              <FeatureCard
                icon="⚡"
                title="Lightning Fast"
                description="Zero-runtime CSS. No JavaScript required for styling. Ship less, load faster."
              />
              <FeatureCard
                icon="🔧"
                title="Fully Typed"
                description="Complete TypeScript definitions. Autocomplete everything. Catch errors before runtime."
              />
              <FeatureCard
                icon="📱"
                title="Responsive"
                description="Mobile-first responsive props. Build for every screen size with ease."
              />
              <FeatureCard
                icon="♿"
                title="Accessible"
                description="WCAG 2.1 AA compliant. Semantic HTML. Keyboard navigation built-in."
              />
              <FeatureCard
                icon="🎯"
                title="Composable"
                description="Primitives that compose naturally. Build complex UIs from simple building blocks."
              />
            </Row>
          </Column>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box
        pad={8}
        style={{
          background: '#f3f4f6',
        }}
      >
        <Container size="xl" center>
          <Column gap={6}>
            <Column gap={3} style={{ textAlign: 'center' }}>
              <Text size={5} weight="bold">
                Loved by Developers
              </Text>
              <Text size={3} tone="muted">
                Join thousands of teams building with StapleLab
              </Text>
            </Column>

            <Row gap={5} style={{ flexWrap: 'wrap' }}>
              <TestimonialCard
                quote="StapleLab cut our development time in half. The token system just makes sense."
                author="Sarah Chen"
                role="Engineering Lead at Acme Corp"
                avatar="#3b82f6"
              />
              <TestimonialCard
                quote="Finally, a design system that doesn't fight against us. It's intuitive and powerful."
                author="Marcus Rodriguez"
                role="Senior Developer at TechFlow"
                avatar="#8b5cf6"
              />
              <TestimonialCard
                quote="The TypeScript support is incredible. We catch so many issues at compile time now."
                author="Emily Watson"
                role="Frontend Architect at DataCore"
                avatar="#ec4899"
              />
            </Row>
          </Column>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box pad={8}>
        <Container size="xl" center>
          <Column gap={6}>
            <Column gap={3} style={{ textAlign: 'center' }}>
              <Text size={5} weight="bold">
                Simple, Transparent Pricing
              </Text>
              <Text size={3} tone="muted">
                Choose the plan that's right for your team
              </Text>
            </Column>

            <Row gap={5} style={{ flexWrap: 'wrap' }}>
              <PricingCard
                name="Starter"
                price="$0"
                period="forever"
                description="Perfect for side projects and personal use"
                features={[
                  'All core primitives',
                  'Design tokens',
                  'Community support',
                  'MIT License',
                  'Unlimited projects',
                ]}
              />
              <PricingCard
                name="Professional"
                price="$49"
                period="month"
                description="For professional teams building production apps"
                features={[
                  'Everything in Starter',
                  'Advanced components',
                  'Priority support',
                  'Custom themes',
                  'Private Slack channel',
                ]}
                highlighted
              />
              <PricingCard
                name="Enterprise"
                price="Custom"
                period="year"
                description="For large teams with specific needs"
                features={[
                  'Everything in Professional',
                  'Dedicated support',
                  'Custom training',
                  'SLA guarantee',
                  'On-premise deployment',
                ]}
              />
            </Row>
          </Column>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        pad={8}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container size="md" center>
          <Column gap={5}>
            <Text
              size={6}
              weight="bold"
              style={{
                fontSize: '2.5rem',
                lineHeight: 1.3,
              }}
            >
              Ready to Build Something Amazing?
            </Text>
            <Text size={3} style={{ opacity: 0.95 }}>
              Join 50,000+ developers building the future with StapleLab
            </Text>
            <Row gap={3} style={{ justifyContent: 'center' }}>
              <Box
                pad={4}
                radius={2}
                style={{
                  background: 'white',
                  color: '#667eea',
                  cursor: 'pointer',
                  transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <Text size={3} weight="bold">
                  Get Started Free →
                </Text>
              </Box>
              <Box
                pad={4}
                radius={2}
                style={{
                  border: '2px solid white',
                  cursor: 'pointer',
                  transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <Text size={3} weight="semibold">
                  Schedule Demo
                </Text>
              </Box>
            </Row>
          </Column>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        pad={6}
        style={{
          background: '#111827',
          color: 'white',
        }}
      >
        <Container size="xl" center>
          <Column gap={6}>
            <Row
              gap={8}
              style={{
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <Column gap={3}>
                <Text size={4} weight="bold" style={{ color: '#3b82f6' }}>
                  ⚡ StapleLab
                </Text>
                <Text size={2} style={{ opacity: 0.7, maxWidth: '300px' }}>
                  Building the future of design systems, one component at a time.
                </Text>
              </Column>

              <Column gap={3}>
                <Text size={3} weight="semibold">
                  Product
                </Text>
                <Column gap={2}>
                  {['Features', 'Pricing', 'Docs', 'Changelog'].map((link) => (
                    <Text
                      key={link}
                      size={2}
                      style={{
                        opacity: 0.7,
                        cursor: 'pointer',
                        transition: 'opacity var(--st-duration-fast) var(--st-easing-out)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.7'
                      }}
                    >
                      {link}
                    </Text>
                  ))}
                </Column>
              </Column>

              <Column gap={3}>
                <Text size={3} weight="semibold">
                  Company
                </Text>
                <Column gap={2}>
                  {['About', 'Blog', 'Careers', 'Contact'].map((link) => (
                    <Text
                      key={link}
                      size={2}
                      style={{
                        opacity: 0.7,
                        cursor: 'pointer',
                        transition: 'opacity var(--st-duration-fast) var(--st-easing-out)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.7'
                      }}
                    >
                      {link}
                    </Text>
                  ))}
                </Column>
              </Column>

              <Column gap={3}>
                <Text size={3} weight="semibold">
                  Legal
                </Text>
                <Column gap={2}>
                  {['Privacy', 'Terms', 'Security'].map((link) => (
                    <Text
                      key={link}
                      size={2}
                      style={{
                        opacity: 0.7,
                        cursor: 'pointer',
                        transition: 'opacity var(--st-duration-fast) var(--st-easing-out)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.7'
                      }}
                    >
                      {link}
                    </Text>
                  ))}
                </Column>
              </Column>
            </Row>

            <Box
              style={{
                paddingTop: 'var(--st-space-6)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Row gap={4} align="center" justify="space-between" style={{ flexWrap: 'wrap' }}>
                <Text size={2} style={{ opacity: 0.7 }}>
                  © 2024 StapleLab. All rights reserved.
                </Text>
                <Row gap={4}>
                  {['Twitter', 'GitHub', 'Discord'].map((social) => (
                    <Text
                      key={social}
                      size={2}
                      style={{
                        opacity: 0.7,
                        cursor: 'pointer',
                        transition: 'opacity var(--st-duration-fast) var(--st-easing-out)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.7'
                      }}
                    >
                      {social}
                    </Text>
                  ))}
                </Row>
              </Row>
            </Box>
          </Column>
        </Container>
      </Box>
    </Box>
  ),
}

export const MinimalHero: Story = {
  render: () => (
    <Box
      style={{
        minHeight: '100vh',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container size="lg" center>
        <Column gap={6} style={{ textAlign: 'center' }}>
          <Column gap={4}>
            <Text
              size={6}
              weight="bold"
              style={{
                fontSize: '4.5rem',
                lineHeight: 1.1,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Design. Build. Ship.
            </Text>
            <Text
              size={4}
              tone="muted"
              style={{
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              The design system that gets out of your way. Beautiful by default, customizable when
              you need it.
            </Text>
          </Column>

          <Row gap={3} style={{ justifyContent: 'center' }}>
            <Box
              pad={4}
              radius={2}
              style={{
                background: '#3b82f6',
                color: 'white',
                cursor: 'pointer',
                transition: 'all var(--st-duration-normal) var(--st-easing-out)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(59 130 246 / 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <Text size={3} weight="bold">
                Get Started →
              </Text>
            </Box>
            <Box
              pad={4}
              radius={2}
              style={{
                background: '#f3f4f6',
                cursor: 'pointer',
                transition: 'all var(--st-duration-normal) var(--st-easing-out)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6'
              }}
            >
              <Text size={3} weight="semibold">
                View on GitHub
              </Text>
            </Box>
          </Row>

          <Box
            pad={6}
            radius={3}
            shadow={2}
            style={{
              background: '#111827',
              marginTop: 'var(--st-space-8)',
            }}
          >
            <pre
              style={{
                color: '#e5e7eb',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                textAlign: 'left',
                margin: 0,
              }}
            >
              <code>{`npm install @staple-css/tokens @staple-css/primitives

import { Box, Text } from '@staple-css/primitives'

<Box pad={4} radius={2} shadow={1}>
  <Text size={4} weight="bold">
    Hello, world!
  </Text>
</Box>`}</code>
            </pre>
          </Box>
        </Column>
      </Container>
    </Box>
  ),
}
