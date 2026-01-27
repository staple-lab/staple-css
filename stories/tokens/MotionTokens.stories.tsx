import type { Meta, StoryObj } from '@storybook/react'
import { Box, Column, Row, Text, Flex } from '@staple-css/primitives/full'
import { useState } from 'react'

const meta = {
  title: 'Tokens/Motion',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

// Duration tokens
const durations = [
  { name: 'instant', value: '75ms', desc: 'Near-instant transitions' },
  { name: 'fast', value: '150ms', desc: 'Fast micro-interactions' },
  { name: 'normal', value: '200ms', desc: 'Standard transitions (Tailwind default)' },
  { name: 'moderate', value: '300ms', desc: 'Moderate transitions' },
  { name: 'slow', value: '500ms', desc: 'Slow, deliberate transitions' },
  { name: 'slower', value: '700ms', desc: 'Very slow transitions' },
  { name: 'slowest', value: '1000ms', desc: 'Ultra-slow, cinematic' },
]

// Easing tokens
const easings = [
  { name: 'default', value: 'cubic-bezier(0.4, 0, 0.2, 1)', desc: 'Tailwind default' },
  { name: 'linear', value: 'linear', desc: 'Constant speed' },
  { name: 'in', value: 'cubic-bezier(0.4, 0, 1, 1)', desc: 'Ease in (accelerate)' },
  { name: 'out', value: 'cubic-bezier(0, 0, 0.2, 1)', desc: 'Ease out (decelerate)' },
  { name: 'inOut', value: 'cubic-bezier(0.4, 0, 0.2, 1)', desc: 'Smooth both ends' },
  { name: 'emphasized', value: 'cubic-bezier(0.2, 0, 0, 1)', desc: 'Material emphasized' },
  { name: 'bounce', value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', desc: 'Bounce effect' },
  { name: 'snap', value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', desc: 'Snappy feel' },
  { name: 'elastic', value: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', desc: 'Elastic/spring' },
]

const delays = [
  { name: '0', value: '0ms' },
  { name: '75', value: '75ms' },
  { name: '100', value: '100ms' },
  { name: '150', value: '150ms' },
  { name: '200', value: '200ms' },
  { name: '300', value: '300ms' },
  { name: '500', value: '500ms' },
  { name: '700', value: '700ms' },
  { name: '1000', value: '1000ms' },
]

// Interactive demo component
const AnimatedBox = ({ duration, easing, delay = '0ms' }: { duration: string; easing: string; delay?: string }) => {
  const [isAnimating, setIsAnimating] = useState(false)

  return (
    <Box
      onClick={() => {
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), parseFloat(duration) + parseFloat(delay) + 100)
      }}
      style={{
        width: '80px',
        height: '80px',
        background: isAnimating ? '#3b82f6' : '#dbeafe',
        borderRadius: '8px',
        cursor: 'pointer',
        transform: isAnimating ? 'scale(1.2)' : 'scale(1)',
        transition: `all ${duration} ${easing} ${delay}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text size={0} weight="bold">Click</Text>
    </Box>
  )
}

// Duration showcase
export const DurationScale: Story = {
  render: () => (
    <Column gap={6} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Duration Tokens
        </Text>
        <Text tone="muted">
          7 duration values for transitions and animations. Click each box to see the duration in action.
        </Text>
      </Column>

      <Column gap={4}>
        {durations.map((duration) => (
          <Row key={duration.name} gap={3} align="center">
            <AnimatedBox duration={duration.value} easing="cubic-bezier(0.4, 0, 0.2, 1)" />
            <Column gap={0} style={{ flex: 1 }}>
              <Row gap={2} align="baseline">
                <Text weight="bold" size={2}>
                  --st-duration-{duration.name}
                </Text>
                <Text size={1} mono tone="muted">
                  {duration.value}
                </Text>
              </Row>
              <Text size={1} tone="muted">
                {duration.desc}
              </Text>
            </Column>
          </Row>
        ))}
      </Column>
    </Column>
  ),
}

// Easing showcase
export const EasingCurves: Story = {
  render: () => (
    <Column gap={6} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Easing Functions
        </Text>
        <Text tone="muted">
          12 easing curves for different animation feels. Click each box to see the easing in action.
        </Text>
      </Column>

      <Column gap={4}>
        {easings.map((easing) => (
          <Row key={easing.name} gap={3} align="center">
            <AnimatedBox duration="500ms" easing={easing.value} />
            <Column gap={0} style={{ flex: 1 }}>
              <Row gap={2} align="baseline">
                <Text weight="bold" size={2}>
                  --st-easing-{easing.name}
                </Text>
              </Row>
              <Text size={0} mono tone="muted" style={{ marginBottom: '4px' }}>
                {easing.value}
              </Text>
              <Text size={1} tone="muted">
                {easing.desc}
              </Text>
            </Column>
          </Row>
        ))}
      </Column>
    </Column>
  ),
}

// Delay showcase
export const DelayScale: Story = {
  render: () => (
    <Column gap={6} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Delay Tokens
        </Text>
        <Text tone="muted">
          9 delay values for staggered animations. Click each box to see the delay before animation starts.
        </Text>
      </Column>

      <Column gap={4}>
        {delays.map((delay) => (
          <Row key={delay.name} gap={3} align="center">
            <AnimatedBox duration="300ms" easing="cubic-bezier(0.4, 0, 0.2, 1)" delay={delay.value} />
            <Column gap={0} style={{ flex: 1 }}>
              <Row gap={2} align="baseline">
                <Text weight="bold" size={2}>
                  --st-delay-{delay.name}
                </Text>
                <Text size={1} mono tone="muted">
                  {delay.value}
                </Text>
              </Row>
            </Column>
          </Row>
        ))}
      </Column>
    </Column>
  ),
}

// Combined example
export const CombinedExample: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null)

    return (
      <Column gap={6} maxWidth="lg">
        <Column gap={2}>
          <Text as="h2" size={4} weight="bold">
            Combined Motion Tokens
          </Text>
          <Text tone="muted">
            Click different boxes to see various combinations of duration, easing, and delay.
          </Text>
        </Column>

        <Column gap={4}>
          {/* Fast & snappy */}
          <Box
            onClick={() => setSelected('fast-snap')}
            pad={4}
            radius={2}
            style={{
              background: selected === 'fast-snap' ? '#3b82f6' : '#f9fafb',
              color: selected === 'fast-snap' ? 'white' : 'inherit',
              cursor: 'pointer',
              transform: selected === 'fast-snap' ? 'scale(1.02)' : 'scale(1)',
              transition: 'all var(--st-duration-fast) var(--st-easing-snap)',
              border: '2px solid',
              borderColor: selected === 'fast-snap' ? '#3b82f6' : '#e5e7eb',
            }}
          >
            <Text weight="bold">Fast & Snappy</Text>
            <Text size={0} tone="muted">fast (150ms) + snap easing</Text>
          </Box>

          {/* Normal & emphasized */}
          <Box
            onClick={() => setSelected('normal-emphasized')}
            pad={4}
            radius={2}
            style={{
              background: selected === 'normal-emphasized' ? '#10b981' : '#f9fafb',
              color: selected === 'normal-emphasized' ? 'white' : 'inherit',
              cursor: 'pointer',
              transform: selected === 'normal-emphasized' ? 'scale(1.02)' : 'scale(1)',
              transition: 'all var(--st-duration-normal) var(--st-easing-emphasized)',
              border: '2px solid',
              borderColor: selected === 'normal-emphasized' ? '#10b981' : '#e5e7eb',
            }}
          >
            <Text weight="bold">Normal & Emphasized</Text>
            <Text size={0} tone="muted">normal (200ms) + emphasized easing</Text>
          </Box>

          {/* Slow & bounce */}
          <Box
            onClick={() => setSelected('slow-bounce')}
            pad={4}
            radius={2}
            style={{
              background: selected === 'slow-bounce' ? '#f59e0b' : '#f9fafb',
              color: selected === 'slow-bounce' ? 'white' : 'inherit',
              cursor: 'pointer',
              transform: selected === 'slow-bounce' ? 'scale(1.05)' : 'scale(1)',
              transition: 'all var(--st-duration-slow) var(--st-easing-bounce)',
              border: '2px solid',
              borderColor: selected === 'slow-bounce' ? '#f59e0b' : '#e5e7eb',
            }}
          >
            <Text weight="bold">Slow & Bouncy</Text>
            <Text size={0} tone="muted">slow (500ms) + bounce easing</Text>
          </Box>

          {/* Moderate & elastic */}
          <Box
            onClick={() => setSelected('moderate-elastic')}
            pad={4}
            radius={2}
            style={{
              background: selected === 'moderate-elastic' ? '#8b5cf6' : '#f9fafb',
              color: selected === 'moderate-elastic' ? 'white' : 'inherit',
              cursor: 'pointer',
              transform: selected === 'moderate-elastic' ? 'scale(1.05)' : 'scale(1)',
              transition: 'all var(--st-duration-moderate) var(--st-easing-elastic)',
              border: '2px solid',
              borderColor: selected === 'moderate-elastic' ? '#8b5cf6' : '#e5e7eb',
            }}
          >
            <Text weight="bold">Moderate & Elastic</Text>
            <Text size={0} tone="muted">moderate (300ms) + elastic easing</Text>
          </Box>
        </Column>
      </Column>
    )
  },
}

// Staggered animation
export const StaggeredAnimation: Story = {
  render: () => {
    const [animate, setAnimate] = useState(false)

    return (
      <Column gap={6} maxWidth="lg">
        <Column gap={2}>
          <Text as="h2" size={4} weight="bold">
            Staggered Animation
          </Text>
          <Text tone="muted">
            Using delay tokens to create staggered entrance animations.
          </Text>
        </Column>

        <button
          onClick={() => {
            setAnimate(false)
            setTimeout(() => setAnimate(true), 50)
          }}
          style={{
            padding: '12px 24px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Replay Animation
        </button>

        <Column gap={2}>
          {[0, 75, 150, 300, 500].map((delay, i) => (
            <Box
              key={i}
              pad={4}
              radius={2}
              shadow={1}
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateX(0)' : 'translateX(-50px)',
                transition: `all var(--st-duration-normal) var(--st-easing-out) ${delay}ms`,
                background: '#dbeafe',
              }}
            >
              <Row justify="between" align="center">
                <Text weight="bold">Item {i + 1}</Text>
                <Text size={0} mono tone="muted">
                  delay: {delay}ms
                </Text>
              </Row>
            </Box>
          ))}
        </Column>
      </Column>
    )
  },
}

// Button interactions
export const ButtonInteractions: Story = {
  render: () => (
    <Column gap={6} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Button Interactions
        </Text>
        <Text tone="muted">
          Common button animations using motion tokens. Hover and click to see effects.
        </Text>
      </Column>

      <Column gap={3}>
        {/* Primary button */}
        <button
          style={{
            padding: '12px 24px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transform: 'scale(1)',
            transition: 'all var(--st-duration-fast) var(--st-easing-out)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.background = '#2563eb'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.background = '#3b82f6'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
        >
          Primary Button (Fast + Out)
        </button>

        {/* Bouncy button */}
        <button
          style={{
            padding: '12px 24px',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transform: 'scale(1)',
            transition: 'all var(--st-duration-normal) var(--st-easing-bounce)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Bouncy Button (Normal + Bounce)
        </button>

        {/* Elastic button */}
        <button
          style={{
            padding: '12px 24px',
            background: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transform: 'scale(1)',
            transition: 'all var(--st-duration-moderate) var(--st-easing-elastic)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Elastic Button (Moderate + Elastic)
        </button>

        {/* Ghost button */}
        <button
          style={{
            padding: '12px 24px',
            background: 'transparent',
            color: '#3b82f6',
            border: '2px solid #3b82f6',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all var(--st-duration-fast) var(--st-easing-default)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#3b82f6'
            e.currentTarget.style.color = 'white'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#3b82f6'
          }}
        >
          Ghost Button (Fast + Default)
        </button>
      </Column>
    </Column>
  ),
}

// Loading states
export const LoadingStates: Story = {
  render: () => (
    <Column gap={6} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Loading States
        </Text>
        <Text tone="muted">
          Smooth loading animations using motion tokens.
        </Text>
      </Column>

      <Column gap={4}>
        {/* Pulse loading */}
        <Box pad={4} radius={2} style={{ background: '#f9fafb' }}>
          <Text weight="bold" style={{ marginBottom: '12px' }}>Pulse Animation</Text>
          <Box
            style={{
              width: '100%',
              height: '100px',
              background: '#dbeafe',
              borderRadius: '8px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
        </Box>

        {/* Skeleton loading */}
        <Box pad={4} radius={2} style={{ background: '#f9fafb' }}>
          <Text weight="bold" style={{ marginBottom: '12px' }}>Skeleton Loading</Text>
          <Column gap={2}>
            {[100, 80, 60].map((width, i) => (
              <Box
                key={i}
                style={{
                  width: `${width}%`,
                  height: '16px',
                  background: '#dbeafe',
                  borderRadius: '4px',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  animationDelay: `${i * 200}ms`,
                }}
              />
            ))}
          </Column>
        </Box>

        {/* Spinner */}
        <Box pad={4} radius={2} style={{ background: '#f9fafb' }}>
          <Text weight="bold" style={{ marginBottom: '12px' }}>Spinner</Text>
          <Box
            style={{
              width: '40px',
              height: '40px',
              border: '4px solid #e5e7eb',
              borderTop: '4px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        </Box>
      </Column>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Column>
  ),
}
