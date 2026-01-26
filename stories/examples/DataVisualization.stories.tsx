import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '../../packages/primitives/src/Box'
import { Column } from '../../packages/primitives/src/Flex'
import { Row } from '../../packages/primitives/src/Flex'
import { Text } from '../../packages/primitives/src/Text'
import { useState } from 'react'

const meta = {
  title: 'Examples/Data Visualization',
  parameters: {
  tags: ['autodocs'],
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const MetricCard = ({
  label,
  value,
  change,
  trend,
  sparklineData,
}: {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
  sparklineData: number[]
}) => {
  const max = Math.max(...sparklineData)
  const min = Math.min(...sparklineData)
  const range = max - min

  return (
    <Box
      pad={5}
      radius={2}
      shadow={1}
      style={{
        background: 'white',
        flex: '1 1 240px',
      }}
    >
      <Column gap={3}>
        <Row gap={3} align="center" justify="space-between">
          <Column gap={2}>
            <Text size={1} tone="muted">
              {label}
            </Text>
            <Text size={6} weight="bold">
              {value}
            </Text>
            <Row gap={1} align="center">
              <Text size={2} style={{ color: trend === 'up' ? '#16a34a' : '#dc2626' }}>
                {trend === 'up' ? '↑' : '↓'}
              </Text>
              <Text size={2} style={{ color: trend === 'up' ? '#16a34a' : '#dc2626' }}>
                {change}
              </Text>
              <Text size={2} tone="muted">
                vs last period
              </Text>
            </Row>
          </Column>
        </Row>

        {/* Sparkline */}
        <Box style={{ height: '40px', position: 'relative' }}>
          <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
            <polyline
              points={sparklineData
                .map((value, i) => {
                  const x = (i / (sparklineData.length - 1)) * 100
                  const y = 40 - ((value - min) / range) * 40
                  return `${x},${y}`
                })
                .join(' ')}
              fill="none"
              stroke={trend === 'up' ? '#16a34a' : '#dc2626'}
              strokeWidth="2"
            />
          </svg>
        </Box>
      </Column>
    </Box>
  )
}

const BarChart = ({
  title,
  data,
}: {
  title: string
  data: Array<{ label: string; value: number; color: string }>
}) => {
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <Box pad={5} radius={2} shadow={1} style={{ background: 'white' }}>
      <Column gap={4}>
        <Text size={4} weight="bold">
          {title}
        </Text>
        <Column gap={3}>
          {data.map((item, i) => (
            <Column key={i} gap={2}>
              <Row gap={3} align="center" justify="space-between">
                <Text size={2}>{item.label}</Text>
                <Text size={2} weight="semibold">
                  {item.value.toLocaleString()}
                </Text>
              </Row>
              <Box
                style={{
                  height: '32px',
                  background: '#f3f4f6',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <Box
                  style={{
                    height: '100%',
                    width: `${(item.value / maxValue) * 100}%`,
                    background: item.color,
                    transition: 'width var(--st-duration-slow) var(--st-easing-out)',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 'var(--st-space-3)',
                  }}
                >
                  <Text size={1} weight="semibold" style={{ color: 'white' }}>
                    {Math.round((item.value / maxValue) * 100)}%
                  </Text>
                </Box>
              </Box>
            </Column>
          ))}
        </Column>
      </Column>
    </Box>
  )
}

const PieChart = ({
  title,
  data,
}: {
  title: string
  data: Array<{ label: string; value: number; color: string }>
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  const createArc = (percentage: number, startAngle: number) => {
    const angle = (percentage / 100) * 360
    const endAngle = startAngle + angle
    const largeArc = angle > 180 ? 1 : 0

    const startX = 100 + 80 * Math.cos((Math.PI * startAngle) / 180)
    const startY = 100 + 80 * Math.sin((Math.PI * startAngle) / 180)
    const endX = 100 + 80 * Math.cos((Math.PI * endAngle) / 180)
    const endY = 100 + 80 * Math.sin((Math.PI * endAngle) / 180)

    return `M 100 100 L ${startX} ${startY} A 80 80 0 ${largeArc} 1 ${endX} ${endY} Z`
  }

  return (
    <Box pad={5} radius={2} shadow={1} style={{ background: 'white' }}>
      <Column gap={4}>
        <Text size={4} weight="bold">
          {title}
        </Text>
        <Row gap={5} align="center">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {data.map((item, i) => {
              const percentage = (item.value / total) * 100
              const path = createArc(percentage, currentAngle)
              const angle = currentAngle
              currentAngle += (percentage / 100) * 360
              return <path key={i} d={path} fill={item.color} />
            })}
          </svg>
          <Column gap={3}>
            {data.map((item, i) => (
              <Row key={i} gap={3} align="center">
                <Box
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '4px',
                    background: item.color,
                  }}
                />
                <Column gap={0}>
                  <Text size={2}>{item.label}</Text>
                  <Text size={1} tone="muted">
                    {((item.value / total) * 100).toFixed(1)}% · {item.value.toLocaleString()}
                  </Text>
                </Column>
              </Row>
            ))}
          </Column>
        </Row>
      </Column>
    </Box>
  )
}

const LineChart = ({
  title,
  data,
}: {
  title: string
  data: Array<{ label: string; values: number[]; color: string }>
}) => {
  const allValues = data.flatMap((d) => d.values)
  const max = Math.max(...allValues)
  const min = Math.min(...allValues)
  const range = max - min
  const points = data[0].values.length

  return (
    <Box pad={5} radius={2} shadow={1} style={{ background: 'white' }}>
      <Column gap={4}>
        <Row gap={4} align="center" justify="space-between">
          <Text size={4} weight="bold">
            {title}
          </Text>
          <Row gap={3}>
            {data.map((series, i) => (
              <Row key={i} gap={2} align="center">
                <Box
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: series.color,
                  }}
                />
                <Text size={2}>{series.label}</Text>
              </Row>
            ))}
          </Row>
        </Row>

        <Box style={{ height: '300px', position: 'relative' }}>
          {/* Y-axis labels */}
          <Column
            gap={0}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '40px',
              justifyContent: 'space-between',
            }}
          >
            {[max, max * 0.75, max * 0.5, max * 0.25, min].map((value, i) => (
              <Text key={i} size={1} tone="muted" style={{ textAlign: 'right' }}>
                {Math.round(value)}
              </Text>
            ))}
          </Column>

          {/* Chart area */}
          <Box
            style={{
              marginLeft: '50px',
              height: '100%',
              position: 'relative',
            }}
          >
            {/* Grid lines */}
            <svg
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                <line
                  key={i}
                  x1="0"
                  y1={ratio * 300}
                  x2="100%"
                  y2={ratio * 300}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}
            </svg>

            {/* Lines */}
            <svg
              width="100%"
              height="300"
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              {data.map((series, seriesIndex) => (
                <g key={seriesIndex}>
                  <polyline
                    points={series.values
                      .map((value, i) => {
                        const x = (i / (points - 1)) * 100
                        const y = 300 - ((value - min) / range) * 300
                        return `${x}%,${y}`
                      })
                      .join(' ')}
                    fill="none"
                    stroke={series.color}
                    strokeWidth="3"
                  />
                  {series.values.map((value, i) => {
                    const x = (i / (points - 1)) * 100
                    const y = 300 - ((value - min) / range) * 300
                    return (
                      <circle
                        key={i}
                        cx={`${x}%`}
                        cy={y}
                        r="4"
                        fill={series.color}
                      />
                    )
                  })}
                </g>
              ))}
            </svg>
          </Box>

          {/* X-axis labels */}
          <Row
            gap={0}
            style={{
              position: 'absolute',
              left: '50px',
              right: 0,
              bottom: '-24px',
              justifyContent: 'space-between',
            }}
          >
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((label, i) => (
              <Text key={i} size={1} tone="muted">
                {label}
              </Text>
            ))}
          </Row>
        </Box>
      </Column>
    </Box>
  )
}

const DataTable = ({
  title,
  headers,
  rows,
}: {
  title: string
  headers: string[]
  rows: Array<{ name: string; values: Array<string | number>; trend?: 'up' | 'down' }>
}) => (
  <Box pad={5} radius={2} shadow={1} style={{ background: 'white' }}>
    <Column gap={4}>
      <Text size={4} weight="bold">
        {title}
      </Text>
      <Box style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr
              style={{
                borderBottom: '2px solid #e5e7eb',
              }}
            >
              {headers.map((header, i) => (
                <th
                  key={i}
                  style={{
                    padding: 'var(--st-space-3)',
                    textAlign: 'left',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: '#6b7280',
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: '1px solid #f3f4f6',
                  transition: 'background var(--st-duration-fast) var(--st-easing-out)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f9fafb'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white'
                }}
              >
                <td
                  style={{
                    padding: 'var(--st-space-3)',
                    fontWeight: 600,
                  }}
                >
                  {row.name}
                </td>
                {row.values.map((value, j) => (
                  <td
                    key={j}
                    style={{
                      padding: 'var(--st-space-3)',
                      color: '#6b7280',
                    }}
                  >
                    {value}
                  </td>
                ))}
                {row.trend && (
                  <td style={{ padding: 'var(--st-space-3)' }}>
                    <Row gap={1} align="center">
                      <Text
                        size={2}
                        style={{
                          color: row.trend === 'up' ? '#16a34a' : '#dc2626',
                        }}
                      >
                        {row.trend === 'up' ? '↑' : '↓'}
                      </Text>
                    </Row>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Column>
  </Box>
)

export const AnalyticsDashboard: Story = {
  render: () => {
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

    return (
      <Box style={{ minHeight: '100vh', background: '#f9fafb' }}>
        {/* Header */}
        <Box
          pad={5}
          style={{
            background: 'white',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          <Column gap={4}>
            <Row gap={4} align="center" justify="space-between">
              <Column gap={2}>
                <Text size={5} weight="bold">
                  Analytics Dashboard
                </Text>
                <Text size={2} tone="muted">
                  Real-time performance metrics and insights
                </Text>
              </Column>
              <Row gap={2}>
                <Box
                  pad={3}
                  radius={2}
                  style={{
                    background: timeRange === '7d' ? '#3b82f6' : '#f3f4f6',
                    color: timeRange === '7d' ? 'white' : 'inherit',
                    cursor: 'pointer',
                  }}
                  onClick={() => setTimeRange('7d')}
                >
                  <Text size={2}>Last 7 days</Text>
                </Box>
                <Box
                  pad={3}
                  radius={2}
                  style={{
                    background: timeRange === '30d' ? '#3b82f6' : '#f3f4f6',
                    color: timeRange === '30d' ? 'white' : 'inherit',
                    cursor: 'pointer',
                  }}
                  onClick={() => setTimeRange('30d')}
                >
                  <Text size={2}>Last 30 days</Text>
                </Box>
                <Box
                  pad={3}
                  radius={2}
                  style={{
                    background: timeRange === '90d' ? '#3b82f6' : '#f3f4f6',
                    color: timeRange === '90d' ? 'white' : 'inherit',
                    cursor: 'pointer',
                  }}
                  onClick={() => setTimeRange('90d')}
                >
                  <Text size={2}>Last 90 days</Text>
                </Box>
                <Box
                  pad={3}
                  radius={2}
                  style={{
                    background: '#16a34a',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <Text size={2}>📊 Export Report</Text>
                </Box>
              </Row>
            </Row>
          </Column>
        </Box>

        {/* Content */}
        <Box pad={5}>
          <Column gap={5}>
            {/* Top Metrics */}
            <Row gap={4} style={{ flexWrap: 'wrap' }}>
              <MetricCard
                label="Total Revenue"
                value="$128,450"
                change="+23.5%"
                trend="up"
                sparklineData={[45, 52, 48, 61, 58, 73, 68, 82, 79, 91, 88, 95]}
              />
              <MetricCard
                label="Active Users"
                value="8,452"
                change="+12.3%"
                trend="up"
                sparklineData={[320, 340, 350, 380, 410, 390, 420, 450, 440, 480, 500, 520]}
              />
              <MetricCard
                label="Conversion Rate"
                value="3.24%"
                change="-2.1%"
                trend="down"
                sparklineData={[3.8, 3.6, 3.5, 3.4, 3.3, 3.2, 3.1, 3.2, 3.3, 3.2, 3.3, 3.24]}
              />
              <MetricCard
                label="Avg Session"
                value="4m 32s"
                change="+8.7%"
                trend="up"
                sparklineData={[210, 220, 225, 235, 240, 245, 250, 255, 260, 265, 270, 272]}
              />
            </Row>

            {/* Line Chart */}
            <LineChart
              title="Revenue Trends"
              data={[
                {
                  label: 'Revenue',
                  values: [42000, 48000, 45000, 52000, 58000, 65000],
                  color: '#3b82f6',
                },
                {
                  label: 'Expenses',
                  values: [28000, 32000, 30000, 35000, 38000, 42000],
                  color: '#ef4444',
                },
                {
                  label: 'Profit',
                  values: [14000, 16000, 15000, 17000, 20000, 23000],
                  color: '#16a34a',
                },
              ]}
            />

            {/* Bar Chart and Pie Chart */}
            <Row gap={5} style={{ alignItems: 'stretch' }}>
              <Box style={{ flex: '1 1 0' }}>
                <BarChart
                  title="Traffic Sources"
                  data={[
                    { label: 'Organic Search', value: 45230, color: '#3b82f6' },
                    { label: 'Direct', value: 32180, color: '#8b5cf6' },
                    { label: 'Social Media', value: 28940, color: '#ec4899' },
                    { label: 'Referral', value: 18650, color: '#10b981' },
                    { label: 'Email', value: 12340, color: '#f59e0b' },
                  ]}
                />
              </Box>
              <Box style={{ flex: '1 1 0' }}>
                <PieChart
                  title="Device Distribution"
                  data={[
                    { label: 'Desktop', value: 5420, color: '#3b82f6' },
                    { label: 'Mobile', value: 2840, color: '#8b5cf6' },
                    { label: 'Tablet', value: 1280, color: '#ec4899' },
                  ]}
                />
              </Box>
            </Row>

            {/* Data Table */}
            <DataTable
              title="Top Performing Pages"
              headers={['Page', 'Views', 'Unique Visitors', 'Avg Time', 'Bounce Rate', 'Trend']}
              rows={[
                {
                  name: '/products',
                  values: ['124,520', '98,430', '4m 32s', '32.4%'],
                  trend: 'up',
                },
                {
                  name: '/pricing',
                  values: ['98,340', '82,150', '3m 18s', '28.7%'],
                  trend: 'up',
                },
                {
                  name: '/about',
                  values: ['76,230', '64,820', '2m 45s', '45.2%'],
                  trend: 'down',
                },
                {
                  name: '/blog/getting-started',
                  values: ['64,180', '52,340', '6m 12s', '22.1%'],
                  trend: 'up',
                },
                {
                  name: '/contact',
                  values: ['42,560', '38,920', '1m 52s', '52.8%'],
                  trend: 'down',
                },
              ]}
            />
          </Column>
        </Box>
      </Box>
    )
  },
}

export const RealtimeMetrics: Story = {
  render: () => {
    const [activeUsers, setActiveUsers] = useState(1247)

    // Simulate real-time updates
    useState(() => {
      const interval = setInterval(() => {
        setActiveUsers((prev) => prev + Math.floor(Math.random() * 20 - 10))
      }, 2000)
      return () => clearInterval(interval)
    })

    return (
      <Box style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <Box
          pad={5}
          style={{
            background: 'white',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          <Row gap={4} align="center" justify="space-between">
            <Column gap={2}>
              <Text size={5} weight="bold">
                Real-Time Dashboard
              </Text>
              <Row gap={2} align="center">
                <Box
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#16a34a',
                    animation: 'pulse 2s infinite',
                  }}
                />
                <Text size={2} tone="muted">
                  Live data · Updates every 2 seconds
                </Text>
              </Row>
            </Column>
            <Box
              pad={4}
              radius={2}
              style={{
                background: '#16a34a',
                color: 'white',
              }}
            >
              <Column gap={1}>
                <Text size={1}>Active Users Right Now</Text>
                <Text size={6} weight="bold">
                  {activeUsers.toLocaleString()}
                </Text>
              </Column>
            </Box>
          </Row>
        </Box>

        <Box pad={5}>
          <Column gap={5}>
            <Row gap={4} style={{ flexWrap: 'wrap' }}>
              {[
                { label: 'Page Views/min', value: '2,458', icon: '👁️' },
                { label: 'Sign-ups/hr', value: '142', icon: '✍️' },
                { label: 'Purchases/hr', value: '38', icon: '🛍️' },
                { label: 'Avg Response Time', value: '124ms', icon: '⚡' },
              ].map((metric, i) => (
                <Box
                  key={i}
                  pad={5}
                  radius={2}
                  shadow={1}
                  style={{
                    background: 'white',
                    flex: '1 1 240px',
                  }}
                >
                  <Column gap={3}>
                    <Text size={1} tone="muted">
                      {metric.label}
                    </Text>
                    <Row gap={2} align="center">
                      <Text size={4}>{metric.icon}</Text>
                      <Text size={6} weight="bold">
                        {metric.value}
                      </Text>
                    </Row>
                  </Column>
                </Box>
              ))}
            </Row>

            <Box pad={5} radius={2} shadow={1} style={{ background: 'white' }}>
              <Column gap={4}>
                <Text size={4} weight="bold">
                  Active Sessions by Location
                </Text>
                <Column gap={3}>
                  {[
                    { country: 'United States', users: 428, color: '#3b82f6' },
                    { country: 'United Kingdom', users: 312, color: '#8b5cf6' },
                    { country: 'Germany', users: 248, color: '#ec4899' },
                    { country: 'France', users: 186, color: '#10b981' },
                    { country: 'Canada', users: 142, color: '#f59e0b' },
                  ].map((location, i) => (
                    <Row key={i} gap={4} align="center">
                      <Text size={2} style={{ flex: '0 0 150px' }}>
                        {location.country}
                      </Text>
                      <Box
                        style={{
                          flex: '1 1 0',
                          height: '32px',
                          background: '#f3f4f6',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          position: 'relative',
                        }}
                      >
                        <Box
                          style={{
                            height: '100%',
                            width: `${(location.users / 428) * 100}%`,
                            background: location.color,
                            transition: 'width var(--st-duration-normal) var(--st-easing-out)',
                          }}
                        />
                      </Box>
                      <Text size={2} weight="semibold" style={{ flex: '0 0 60px' }}>
                        {location.users}
                      </Text>
                    </Row>
                  ))}
                </Column>
              </Column>
            </Box>
          </Column>
        </Box>
      </Box>
    )
  },
}
