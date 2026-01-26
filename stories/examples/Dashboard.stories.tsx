import type { Meta, StoryObj } from '@storybook/react'
import { Box, Column, Row, Flex, Grid, Container, Text } from '@staple-css/primitives'
import { useState } from 'react'

const meta = {
  title: 'Examples/Dashboard App',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

// Navigation component
const Sidebar = ({ activePage, onNavigate }: { activePage: string; onNavigate: (page: string) => void }) => (
  <Column
    gap={2}
    pad={4}
    style={{
      width: '240px',
      height: '100vh',
      background: '#1f2937',
      color: 'white',
      position: 'sticky',
      top: 0,
    }}
  >
    <Text size={3} weight="bold" style={{ marginBottom: '16px' }}>
      Dashboard
    </Text>

    {['Overview', 'Analytics', 'Reports', 'Settings'].map((item) => (
      <Box
        key={item}
        pad={3}
        radius={2}
        onClick={() => onNavigate(item)}
        style={{
          background: activePage === item ? '#374151' : 'transparent',
          cursor: 'pointer',
          transition: 'background var(--st-duration-fast) var(--st-easing-out)',
        }}
        onMouseEnter={(e) => {
          if (activePage !== item) {
            e.currentTarget.style.background = '#374151'
          }
        }}
        onMouseLeave={(e) => {
          if (activePage !== item) {
            e.currentTarget.style.background = 'transparent'
          }
        }}
      >
        <Text>{item}</Text>
      </Box>
    ))}
  </Column>
)

// Stat card component
const StatCard = ({ label, value, change, trend }: {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
}) => (
  <Box pad={5} radius={2} shadow={1} style={{ background: 'white', flex: '1 1 200px' }}>
    <Column gap={2}>
      <Text size={1} tone="muted">
        {label}
      </Text>
      <Text size={6} weight="bold">
        {value}
      </Text>
      <Row gap={1} align="center">
        <Text size={3} style={{ color: trend === 'up' ? '#16a34a' : '#dc2626' }}>
          {trend === 'up' ? '↑' : '↓'}
        </Text>
        <Text
          size={1}
          style={{ color: trend === 'up' ? '#16a34a' : '#dc2626' }}
        >
          {change}
        </Text>
        <Text size={1} tone="muted">
          vs last month
        </Text>
      </Row>
    </Column>
  </Box>
)

// Chart placeholder
const ChartCard = ({ title }: { title: string }) => (
  <Box pad={5} radius={2} shadow={1} style={{ background: 'white' }}>
    <Column gap={4}>
      <Row justify="between" align="center">
        <Text size={3} weight="bold">
          {title}
        </Text>
        <select
          style={{
            padding: '6px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        >
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </Row>

      <Box
        style={{
          height: '200px',
          background: 'linear-gradient(180deg, #dbeafe 0%, #f9fafb 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text tone="muted">Chart visualization</Text>
      </Box>
    </Column>
  </Box>
)

// Activity item
const ActivityItem = ({ title, time, icon }: { title: string; time: string; icon: string }) => (
  <Row gap={3} pad={3} style={{ borderBottom: '1px solid #f3f4f6' }}>
    <Box
      style={{
        width: '40px',
        height: '40px',
        background: '#dbeafe',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Text size={3}>{icon}</Text>
    </Box>
    <Column gap={0} style={{ flex: 1 }}>
      <Text size={2} weight="semibold">
        {title}
      </Text>
      <Text size={1} tone="muted">
        {time}
      </Text>
    </Column>
  </Row>
)

// Complete dashboard
export const CompleteDashboard: Story = {
  render: () => {
    const [activePage, setActivePage] = useState('Overview')

    return (
      <Row gap={0} style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        <Column gap={0} style={{ flex: 1 }}>
          {/* Header */}
          <Box
            pad={5}
            style={{
              background: 'white',
              borderBottom: '1px solid #e5e7eb',
              position: 'sticky',
              top: 0,
              zIndex: 10,
            }}
          >
            <Container size="7xl">
              <Row justify="between" align="center">
                <Column gap={0}>
                  <Text size={5} weight="bold">
                    {activePage}
                  </Text>
                  <Text size={1} tone="muted">
                    Welcome back, here's what's happening
                  </Text>
                </Column>

                <Row gap={3} align="center">
                  <Box
                    pad={2}
                    radius={2}
                    style={{
                      background: '#f9fafb',
                      cursor: 'pointer',
                      transition: 'background var(--st-duration-fast)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f9fafb'}
                  >
                    <Text>🔔</Text>
                  </Box>

                  <Box
                    style={{
                      width: '40px',
                      height: '40px',
                      background: '#3b82f6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    JD
                  </Box>
                </Row>
              </Row>
            </Container>
          </Box>

          {/* Main content */}
          <Box pad={5}>
            <Container size="7xl">
              <Column gap={5}>
                {/* Stats grid */}
                <Flex wrap="wrap" gap={4}>
                  <StatCard
                    label="Total Revenue"
                    value="$124,531"
                    change="12.5%"
                    trend="up"
                  />
                  <StatCard
                    label="Active Users"
                    value="8,234"
                    change="8.2%"
                    trend="up"
                  />
                  <StatCard
                    label="Conversion Rate"
                    value="3.24%"
                    change="2.1%"
                    trend="down"
                  />
                  <StatCard
                    label="Avg Order Value"
                    value="$89.50"
                    change="5.7%"
                    trend="up"
                  />
                </Flex>

                {/* Charts */}
                <Grid cols={{ base: 1, lg: 2 }} gap={4}>
                  <ChartCard title="Revenue Over Time" />
                  <ChartCard title="User Growth" />
                </Grid>

                {/* Activity and Quick Actions */}
                <Grid cols={{ base: 1, lg: 3 }} gap={4}>
                  {/* Recent Activity */}
                  <Box
                    radius={2}
                    shadow={1}
                    style={{ background: 'white', gridColumn: '1 / span 2' }}
                  >
                    <Column gap={0}>
                      <Box pad={4} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <Text size={3} weight="bold">
                          Recent Activity
                        </Text>
                      </Box>

                      <Column gap={0}>
                        <ActivityItem
                          icon="📦"
                          title="New order received"
                          time="5 minutes ago"
                        />
                        <ActivityItem
                          icon="👤"
                          title="New user signed up"
                          time="12 minutes ago"
                        />
                        <ActivityItem
                          icon="💰"
                          title="Payment processed"
                          time="25 minutes ago"
                        />
                        <ActivityItem
                          icon="📊"
                          title="Monthly report generated"
                          time="1 hour ago"
                        />
                        <ActivityItem
                          icon="🔔"
                          title="System notification"
                          time="2 hours ago"
                        />
                      </Column>

                      <Box pad={4} style={{ borderTop: '1px solid #f3f4f6' }}>
                        <Text
                          size={1}
                          tone="primary"
                          weight="semibold"
                          style={{ cursor: 'pointer' }}
                        >
                          View all activity →
                        </Text>
                      </Box>
                    </Column>
                  </Box>

                  {/* Quick Actions */}
                  <Box pad={5} radius={2} shadow={1} style={{ background: 'white' }}>
                    <Column gap={4}>
                      <Text size={3} weight="bold">
                        Quick Actions
                      </Text>

                      <Column gap={2}>
                        <button
                          style={{
                            padding: '12px',
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#2563eb'
                            e.currentTarget.style.transform = 'translateY(-1px)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#3b82f6'
                            e.currentTarget.style.transform = 'translateY(0)'
                          }}
                        >
                          Create Report
                        </button>

                        <button
                          style={{
                            padding: '12px',
                            background: 'transparent',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all var(--st-duration-fast)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f9fafb'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          Export Data
                        </button>

                        <button
                          style={{
                            padding: '12px',
                            background: 'transparent',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all var(--st-duration-fast)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f9fafb'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          Invite Team
                        </button>

                        <button
                          style={{
                            padding: '12px',
                            background: 'transparent',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all var(--st-duration-fast)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f9fafb'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          Settings
                        </button>
                      </Column>
                    </Column>
                  </Box>
                </Grid>
              </Column>
            </Container>
          </Box>
        </Column>
      </Row>
    )
  },
}

// Mobile responsive version
export const MobileDashboard: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
      <Column gap={0} style={{ minHeight: '100vh', background: '#f9fafb' }}>
        {/* Mobile header */}
        <Box
          pad={4}
          style={{
            background: 'white',
            borderBottom: '1px solid #e5e7eb',
            position: 'sticky',
            top: 0,
            zIndex: 20,
          }}
        >
          <Row justify="between" align="center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                padding: '8px',
                background: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              ☰
            </button>

            <Text size={3} weight="bold">
              Dashboard
            </Text>

            <Box
              style={{
                width: '32px',
                height: '32px',
                background: '#3b82f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              JD
            </Box>
          </Row>
        </Box>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <>
            <Box
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 25,
              }}
            />

            <Column
              gap={2}
              pad={4}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: '80%',
                maxWidth: '300px',
                background: '#1f2937',
                color: 'white',
                zIndex: 30,
                animation: 'slideIn 200ms var(--st-easing-out)',
              }}
            >
              <Text size={3} weight="bold" style={{ marginBottom: '16px' }}>
                Menu
              </Text>

              {['Overview', 'Analytics', 'Reports', 'Settings'].map((item) => (
                <Box
                  key={item}
                  pad={3}
                  radius={2}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    cursor: 'pointer',
                    transition: 'background var(--st-duration-fast)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#374151'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Text>{item}</Text>
                </Box>
              ))}
            </Column>
          </>
        )}

        {/* Mobile content */}
        <Box pad={4}>
          <Column gap={4}>
            {/* Stats - stacked on mobile */}
            <Column gap={3}>
              <StatCard
                label="Total Revenue"
                value="$124,531"
                change="12.5%"
                trend="up"
              />
              <StatCard
                label="Active Users"
                value="8,234"
                change="8.2%"
                trend="up"
              />
            </Column>

            {/* Activity */}
            <Box radius={2} shadow={1} style={{ background: 'white' }}>
              <Column gap={0}>
                <Box pad={4} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <Text size={2} weight="bold">
                    Recent Activity
                  </Text>
                </Box>

                <Column gap={0}>
                  <ActivityItem
                    icon="📦"
                    title="New order"
                    time="5 min ago"
                  />
                  <ActivityItem
                    icon="👤"
                    title="New user"
                    time="12 min ago"
                  />
                  <ActivityItem
                    icon="💰"
                    title="Payment"
                    time="25 min ago"
                  />
                </Column>
              </Column>
            </Box>
          </Column>
        </Box>

        <style>{`
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}</style>
      </Column>
    )
  },
}
