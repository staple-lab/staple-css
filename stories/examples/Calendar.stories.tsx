import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '../../packages/primitives/src/Box'
import { Column } from '../../packages/primitives/src/Flex'
import { Row } from '../../packages/primitives/src/Flex'
import { Text } from '../../packages/primitives/src/Text'
import { useState } from 'react'

const meta = {
  title: 'Examples/Calendar',
  parameters: {
  tags: ['autodocs'],
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

interface Event {
  id: string
  title: string
  time: string
  duration: string
  color: string
  attendees?: number
  location?: string
}

const events: Record<string, Event[]> = {
  '2024-01-15': [
    {
      id: '1',
      title: 'Design Review',
      time: '09:00',
      duration: '1h',
      color: '#3b82f6',
      attendees: 5,
      location: 'Conference Room A',
    },
    {
      id: '2',
      title: 'Team Standup',
      time: '14:00',
      duration: '30m',
      color: '#10b981',
      attendees: 12,
    },
  ],
  '2024-01-16': [
    {
      id: '3',
      title: 'Client Meeting',
      time: '10:30',
      duration: '2h',
      color: '#f59e0b',
      attendees: 3,
      location: 'Zoom',
    },
    {
      id: '4',
      title: 'Code Review',
      time: '15:00',
      duration: '45m',
      color: '#8b5cf6',
      attendees: 4,
    },
  ],
  '2024-01-17': [
    {
      id: '5',
      title: 'Product Demo',
      time: '11:00',
      duration: '1h 30m',
      color: '#ec4899',
      attendees: 8,
      location: 'Conference Room B',
    },
  ],
}

const getDaysInMonth = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return { firstDay, daysInMonth }
}

const EventCard = ({ event }: { event: Event }) => (
  <Box
    pad={2}
    radius={2}
    style={{
      background: event.color,
      color: 'white',
      cursor: 'pointer',
      transition: 'all var(--st-duration-fast) var(--st-easing-out)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.02)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)'
    }}
  >
    <Column gap={1}>
      <Text size={1} weight="semibold" style={{ color: 'white' }}>
        {event.title}
      </Text>
      <Text size={0} style={{ color: 'rgba(255,255,255,0.9)' }}>
        {event.time} • {event.duration}
      </Text>
      {event.attendees && (
        <Row gap={1} align="center">
          <Text size={1} style={{ color: 'rgba(255,255,255,0.9)' }}>
            👥
          </Text>
          <Text size={0} style={{ color: 'rgba(255,255,255,0.9)' }}>
            {event.attendees}
          </Text>
        </Row>
      )}
    </Column>
  </Box>
)

export const MonthView: Story = {
  render: () => {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 15))
    const { firstDay, daysInMonth } = getDaysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    )

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return (
      <Box style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          pad={4}
          style={{
            background: 'white',
            borderBottom: '1px solid var(--st-color-border)',
          }}
        >
          <Row gap={4} align="center" justify="space-between">
            <Row gap={3} align="center">
              <Text size={4} weight="bold">
                📅 Calendar
              </Text>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                <Text size={2} weight="semibold">
                  + New Event
                </Text>
              </Box>
            </Row>
            <Row gap={2}>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: '#f3f4f6',
                  cursor: 'pointer',
                }}
              >
                <Text size={2}>Today</Text>
              </Box>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: '#f3f4f6',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  setCurrentDate(
                    new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
                  )
                }
              >
                <Text size={2}>←</Text>
              </Box>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: '#f3f4f6',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  setCurrentDate(
                    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
                  )
                }
              >
                <Text size={2}>→</Text>
              </Box>
            </Row>
          </Row>
        </Box>

        {/* Calendar Content */}
        <Row style={{ flex: '1 1 0', overflow: 'hidden' }}>
          {/* Sidebar */}
          <Box
            style={{
              width: '280px',
              background: '#f9fafb',
              borderRight: '1px solid var(--st-color-border)',
              overflow: 'auto',
            }}
          >
            <Column gap={4} pad={4}>
              {/* Mini Calendar */}
              <Column gap={2}>
                <Text size={2} weight="semibold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </Text>
                <Box
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '4px',
                  }}
                >
                  {dayNames.map((day) => (
                    <Box key={day} style={{ textAlign: 'center' }}>
                      <Text size={0} tone="muted" weight="semibold">
                        {day[0]}
                      </Text>
                    </Box>
                  ))}
                  {days.map((day, i) => (
                    <Box
                      key={i}
                      pad={1}
                      style={{
                        textAlign: 'center',
                        borderRadius: '50%',
                        background:
                          day === 15 ? '#3b82f6' : day ? 'white' : 'transparent',
                        color: day === 15 ? 'white' : 'inherit',
                        cursor: day ? 'pointer' : 'default',
                      }}
                    >
                      {day && (
                        <Text
                          size={1}
                          weight={day === 15 ? 'semibold' : 'normal'}
                          style={{ color: day === 15 ? 'white' : 'inherit' }}
                        >
                          {day}
                        </Text>
                      )}
                    </Box>
                  ))}
                </Box>
              </Column>

              <Box style={{ height: '1px', background: 'var(--st-color-border)' }} />

              {/* My Calendars */}
              <Column gap={2}>
                <Text size={2} weight="semibold">
                  My Calendars
                </Text>
                {[
                  { name: 'Work', color: '#3b82f6', checked: true },
                  { name: 'Personal', color: '#10b981', checked: true },
                  { name: 'Family', color: '#f59e0b', checked: false },
                ].map((cal) => (
                  <Row key={cal.name} gap={2} align="center">
                    <Box
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '4px',
                        background: cal.checked ? cal.color : 'transparent',
                        border: `2px solid ${cal.color}`,
                        cursor: 'pointer',
                      }}
                    />
                    <Text size={2}>{cal.name}</Text>
                  </Row>
                ))}
              </Column>

              <Box style={{ height: '1px', background: 'var(--st-color-border)' }} />

              {/* Upcoming Events */}
              <Column gap={2}>
                <Text size={2} weight="semibold">
                  Upcoming
                </Text>
                {Object.entries(events)
                  .slice(0, 3)
                  .flatMap(([date, dayEvents]) =>
                    dayEvents.map((event) => (
                      <Box
                        key={event.id}
                        pad={2}
                        radius={2}
                        style={{
                          background: 'white',
                          cursor: 'pointer',
                        }}
                      >
                        <Column gap={1}>
                          <Row gap={2} align="center">
                            <Box
                              style={{
                                width: '4px',
                                height: '24px',
                                borderRadius: '2px',
                                background: event.color,
                              }}
                            />
                            <Column gap={0}>
                              <Text size={1} weight="semibold">
                                {event.title}
                              </Text>
                              <Text size={0} tone="muted">
                                {event.time}
                              </Text>
                            </Column>
                          </Row>
                        </Column>
                      </Box>
                    ))
                  )}
              </Column>
            </Column>
          </Box>

          {/* Main Calendar */}
          <Column style={{ flex: '1 1 0' }}>
            {/* Month Header */}
            <Box
              pad={4}
              style={{
                background: 'white',
                borderBottom: '1px solid var(--st-color-border)',
              }}
            >
              <Text size={5} weight="bold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </Text>
            </Box>

            {/* Calendar Grid */}
            <Box
              style={{
                flex: '1 1 0',
                overflow: 'auto',
                background: '#fafafa',
              }}
            >
              <Column gap={0}>
                {/* Day Headers */}
                <Box
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    background: 'white',
                    borderBottom: '2px solid var(--st-color-border)',
                  }}
                >
                  {dayNames.map((day) => (
                    <Box key={day} pad={3} style={{ textAlign: 'center' }}>
                      <Text size={2} weight="semibold">
                        {day}
                      </Text>
                    </Box>
                  ))}
                </Box>

                {/* Calendar Days */}
                <Box
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gridAutoRows: 'minmax(120px, 1fr)',
                  }}
                >
                  {days.map((day, i) => {
                    const dateKey = day
                      ? `2024-01-${String(day).padStart(2, '0')}`
                      : null
                    const dayEvents = dateKey ? events[dateKey] || [] : []

                    return (
                      <Box
                        key={i}
                        pad={2}
                        style={{
                          background: day ? 'white' : '#fafafa',
                          border: '1px solid var(--st-color-border)',
                          cursor: day ? 'pointer' : 'default',
                        }}
                      >
                        {day && (
                          <Column gap={1}>
                            <Text
                              size={2}
                              weight={day === 15 ? 'bold' : 'normal'}
                              style={{
                                color: day === 15 ? '#3b82f6' : 'inherit',
                              }}
                            >
                              {day}
                            </Text>
                            <Column gap={1}>
                              {dayEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                              ))}
                            </Column>
                          </Column>
                        )}
                      </Box>
                    )
                  })}
                </Box>
              </Column>
            </Box>
          </Column>
        </Row>
      </Box>
    )
  },
}

export const WeekView: Story = {
  render: () => {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    return (
      <Box style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          pad={4}
          style={{
            background: 'white',
            borderBottom: '1px solid var(--st-color-border)',
          }}
        >
          <Row gap={4} align="center" justify="space-between">
            <Row gap={3} align="center">
              <Text size={4} weight="bold">
                📅 Calendar
              </Text>
            </Row>
            <Row gap={2}>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: '#e0e7ff',
                  color: '#4f46e5',
                }}
              >
                <Text size={2} weight="semibold">
                  Week
                </Text>
              </Box>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: '#f3f4f6',
                  cursor: 'pointer',
                }}
              >
                <Text size={2}>Month</Text>
              </Box>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: '#f3f4f6',
                  cursor: 'pointer',
                }}
              >
                <Text size={2}>Day</Text>
              </Box>
            </Row>
          </Row>
        </Box>

        {/* Week Content */}
        <Column style={{ flex: '1 1 0', overflow: 'hidden' }}>
          {/* Day Headers */}
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: '60px repeat(7, 1fr)',
              background: 'white',
              borderBottom: '2px solid var(--st-color-border)',
            }}
          >
            <Box pad={3} />
            {days.map((day, i) => (
              <Box key={day} pad={3} style={{ textAlign: 'center' }}>
                <Column gap={1}>
                  <Text size={1} tone="muted">
                    {day}
                  </Text>
                  <Text size={3} weight="bold">
                    {15 + i}
                  </Text>
                </Column>
              </Box>
            ))}
          </Box>

          {/* Time Grid */}
          <Box style={{ flex: '1 1 0', overflow: 'auto' }}>
            {hours.map((hour) => (
              <Box
                key={hour}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px repeat(7, 1fr)',
                  minHeight: '60px',
                  borderBottom: '1px solid var(--st-color-border)',
                }}
              >
                <Box
                  pad={2}
                  style={{
                    borderRight: '2px solid var(--st-color-border)',
                    textAlign: 'right',
                  }}
                >
                  <Text size={1} tone="muted">
                    {hour.toString().padStart(2, '0')}:00
                  </Text>
                </Box>
                {days.map((day, dayIndex) => {
                  const event =
                    dayIndex === 0 && hour === 9
                      ? events['2024-01-15'][0]
                      : dayIndex === 1 && hour === 10
                        ? events['2024-01-16'][0]
                        : null

                  return (
                    <Box
                      key={day}
                      pad={1}
                      style={{
                        borderRight: '1px solid var(--st-color-border)',
                        position: 'relative',
                      }}
                    >
                      {event && (
                        <Box
                          pad={2}
                          radius={2}
                          style={{
                            background: event.color,
                            color: 'white',
                            height: '100%',
                            cursor: 'pointer',
                          }}
                        >
                          <Column gap={1}>
                            <Text size={1} weight="semibold" style={{ color: 'white' }}>
                              {event.title}
                            </Text>
                            <Text size={0} style={{ color: 'rgba(255,255,255,0.9)' }}>
                              {event.time}
                            </Text>
                          </Column>
                        </Box>
                      )}
                    </Box>
                  )
                })}
              </Box>
            ))}
          </Box>
        </Column>
      </Box>
    )
  },
}
