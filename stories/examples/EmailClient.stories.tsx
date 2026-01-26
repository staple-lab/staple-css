import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '../../packages/primitives/src/Box'
import { Column } from '../../packages/primitives/src/Flex'
import { Row } from '../../packages/primitives/src/Flex'
import { Text } from '../../packages/primitives/src/Text'
import { useState } from 'react'

const meta = {
  title: 'Examples/Email Client',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

interface Email {
  id: string
  from: {
    name: string
    email: string
    avatar: string
  }
  subject: string
  preview: string
  time: string
  isRead: boolean
  isStarred: boolean
  hasAttachment: boolean
  labels: string[]
}

const emails: Email[] = [
  {
    id: '1',
    from: { name: 'Sarah Chen', email: 'sarah@company.com', avatar: '#3b82f6' },
    subject: 'Q1 Design Review - Feedback Needed',
    preview:
      "Hi team, I've reviewed the latest design proposals and have some thoughts on the user flow...",
    time: '10:30 AM',
    isRead: false,
    isStarred: true,
    hasAttachment: true,
    labels: ['Work', 'Important'],
  },
  {
    id: '2',
    from: { name: 'Marcus Rodriguez', email: 'marcus@startup.io', avatar: '#8b5cf6' },
    subject: 'Re: Collaboration Opportunity',
    preview: "Thanks for reaching out! I'd love to discuss this further. Are you free for a call...",
    time: '9:15 AM',
    isRead: false,
    isStarred: false,
    hasAttachment: false,
    labels: ['Work'],
  },
  {
    id: '3',
    from: { name: 'Emily Watson', email: 'emily@design.co', avatar: '#ec4899' },
    subject: 'New Component Library Released',
    preview:
      "We're excited to announce the launch of our new component library with over 50 components...",
    time: 'Yesterday',
    isRead: true,
    isStarred: false,
    hasAttachment: true,
    labels: ['Newsletter'],
  },
  {
    id: '4',
    from: { name: 'GitHub', email: 'noreply@github.com', avatar: '#6b7280' },
    subject: '[staple-css] New Pull Request #42',
    preview: 'John Doe opened a new pull request: Add dark mode support...',
    time: 'Yesterday',
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    labels: ['Notifications'],
  },
  {
    id: '5',
    from: { name: 'David Chen', email: 'david@agency.com', avatar: '#10b981' },
    subject: 'Project Timeline Update',
    preview:
      "Quick update on the project timeline. We're on track for the beta launch next month...",
    time: '2 days ago',
    isRead: true,
    isStarred: true,
    hasAttachment: false,
    labels: ['Work', 'Projects'],
  },
]

const EmailListItem = ({
  email,
  isSelected,
  onClick,
}: {
  email: Email
  isSelected: boolean
  onClick: () => void
}) => (
  <Box
    pad={4}
    style={{
      background: isSelected
        ? 'var(--st-color-surface-raised)'
        : email.isRead
          ? 'white'
          : '#f9fafb',
      borderLeft: isSelected ? '3px solid var(--st-color-primary)' : '3px solid transparent',
      borderBottom: '1px solid var(--st-color-border)',
      cursor: 'pointer',
      transition: 'all var(--st-duration-fast) var(--st-easing-out)',
    }}
    onClick={onClick}
    onMouseEnter={(e) => {
      if (!isSelected) {
        e.currentTarget.style.background = '#f9fafb'
      }
    }}
    onMouseLeave={(e) => {
      if (!isSelected) {
        e.currentTarget.style.background = email.isRead ? 'white' : '#f9fafb'
      }
    }}
  >
    <Column gap={2}>
      <Row gap={3} align="center" justify="space-between">
        <Row gap={3} align="center" style={{ flex: '1 1 0', minWidth: 0 }}>
          <Box
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: email.from.avatar,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {email.from.name[0]}
          </Box>
          <Column gap={1} style={{ flex: '1 1 0', minWidth: 0 }}>
            <Row gap={2} align="center">
              <Text
                size={2}
                weight={email.isRead ? 'normal' : 'semibold'}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {email.from.name}
              </Text>
              {email.hasAttachment && <Text size={1}>📎</Text>}
              {email.isStarred && <Text size={1}>⭐</Text>}
            </Row>
            <Text
              size={2}
              weight={email.isRead ? 'normal' : 'semibold'}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {email.subject}
            </Text>
            <Text
              size={1}
              tone="muted"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {email.preview}
            </Text>
          </Column>
        </Row>
        <Text size={1} tone="muted" style={{ flexShrink: 0 }}>
          {email.time}
        </Text>
      </Row>
      {email.labels.length > 0 && (
        <Row gap={1} style={{ flexWrap: 'wrap' }}>
          {email.labels.map((label) => (
            <Box
              key={label}
              pad={1}
              radius={1}
              style={{
                background: '#e0e7ff',
                color: '#4f46e5',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              {label}
            </Box>
          ))}
        </Row>
      )}
    </Column>
  </Box>
)

const EmailDetail = ({ email }: { email: Email }) => (
  <Column gap={5} pad={6}>
    <Column gap={4}>
      <Row gap={3} align="center" justify="space-between">
        <Column gap={2}>
          <Text size={5} weight="bold">
            {email.subject}
          </Text>
          <Row gap={2} align="center">
            {email.labels.map((label) => (
              <Box
                key={label}
                pad={1}
                radius={1}
                style={{
                  background: '#e0e7ff',
                  color: '#4f46e5',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              >
                {label}
              </Box>
            ))}
          </Row>
        </Column>
        <Row gap={2}>
          <Box
            pad={2}
            radius={2}
            style={{
              background: '#f3f4f6',
              cursor: 'pointer',
              transition: 'all var(--st-duration-fast) var(--st-easing-out)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e5e7eb'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f3f4f6'
            }}
          >
            <Text size={2}>Reply</Text>
          </Box>
          <Box
            pad={2}
            radius={2}
            style={{
              background: '#f3f4f6',
              cursor: 'pointer',
              transition: 'all var(--st-duration-fast) var(--st-easing-out)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e5e7eb'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f3f4f6'
            }}
          >
            <Text size={2}>Forward</Text>
          </Box>
          <Box
            pad={2}
            radius={2}
            style={{
              background: '#f3f4f6',
              cursor: 'pointer',
              transition: 'all var(--st-duration-fast) var(--st-easing-out)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e5e7eb'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f3f4f6'
            }}
          >
            <Text size={2}>⋮</Text>
          </Box>
        </Row>
      </Row>

      <Row gap={3} align="center">
        <Box
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: email.from.avatar,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: 600,
          }}
        >
          {email.from.name[0]}
        </Box>
        <Column gap={0}>
          <Text size={2} weight="semibold">
            {email.from.name}
          </Text>
          <Text size={1} tone="muted">
            {email.from.email}
          </Text>
        </Column>
        <Text size={1} tone="muted" style={{ marginLeft: 'auto' }}>
          {email.time}
        </Text>
      </Row>
    </Column>

    <Box style={{ height: '1px', background: 'var(--st-color-border)' }} />

    <Column gap={4} style={{ lineHeight: 1.6 }}>
      <Text size={2}>
        Hi team, I've reviewed the latest design proposals and have some thoughts on the user flow
        that I wanted to share with everyone.
      </Text>

      <Text size={2}>
        Overall, I think we're moving in a great direction. The new navigation structure is much
        more intuitive, and the component hierarchy feels more logical. However, I have a few
        suggestions:
      </Text>

      <Column gap={2}>
        <Text size={2} weight="semibold">
          1. User Onboarding Flow
        </Text>
        <Text size={2}>
          The current onboarding experience might be too complex for first-time users. Consider
          simplifying the initial setup to just 2-3 steps instead of 5. We can always offer
          advanced configuration later.
        </Text>
      </Column>

      <Column gap={2}>
        <Text size={2} weight="semibold">
          2. Mobile Responsiveness
        </Text>
        <Text size={2}>
          The desktop designs look fantastic, but I'm concerned about how they'll translate to
          mobile. The information density on some screens might be too high. Let's prioritize
          mobile-first thinking.
        </Text>
      </Column>

      <Column gap={2}>
        <Text size={2} weight="semibold">
          3. Accessibility Considerations
        </Text>
        <Text size={2}>
          We should conduct an accessibility audit before finalizing. Specifically, let's verify
          that all interactive elements have sufficient color contrast and that keyboard navigation
          works seamlessly.
        </Text>
      </Column>

      <Text size={2}>
        I've attached a detailed breakdown with screenshots and specific recommendations. Let's
        discuss this in tomorrow's design review meeting.
      </Text>

      <Text size={2}>Thanks!</Text>
      <Text size={2}>Sarah</Text>
    </Column>

    {email.hasAttachment && (
      <>
        <Box style={{ height: '1px', background: 'var(--st-color-border)' }} />
        <Column gap={2}>
          <Text size={2} weight="semibold">
            Attachments
          </Text>
          <Row gap={3} style={{ flexWrap: 'wrap' }}>
            <Box
              pad={3}
              radius={2}
              style={{
                background: '#f3f4f6',
                cursor: 'pointer',
                transition: 'all var(--st-duration-fast) var(--st-easing-out)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6'
              }}
            >
              <Row gap={2} align="center">
                <Text size={3}>📄</Text>
                <Column gap={0}>
                  <Text size={2}>design-review-notes.pdf</Text>
                  <Text size={1} tone="muted">
                    2.4 MB
                  </Text>
                </Column>
              </Row>
            </Box>
            <Box
              pad={3}
              radius={2}
              style={{
                background: '#f3f4f6',
                cursor: 'pointer',
                transition: 'all var(--st-duration-fast) var(--st-easing-out)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6'
              }}
            >
              <Row gap={2} align="center">
                <Text size={3}>🖼️</Text>
                <Column gap={0}>
                  <Text size={2}>mockups.fig</Text>
                  <Text size={1} tone="muted">
                    856 KB
                  </Text>
                </Column>
              </Row>
            </Box>
          </Row>
        </Column>
      </>
    )}
  </Column>
)

export const CompleteEmailClient: Story = {
  render: () => {
    const [selectedEmailId, setSelectedEmailId] = useState<string>(emails[0].id)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    const selectedEmail = emails.find((e) => e.id === selectedEmailId) || emails[0]

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
                📧 MailBox
              </Text>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: '#f3f4f6',
                  cursor: 'pointer',
                }}
              >
                <Text size={2}>Compose</Text>
              </Box>
            </Row>
            <Row gap={3} align="center">
              <Box
                style={{
                  width: '200px',
                  padding: '8px 12px',
                  background: '#f3f4f6',
                  borderRadius: '6px',
                }}
              >
                <Text size={2} tone="muted">
                  🔍 Search mail...
                </Text>
              </Box>
              <Box
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                JD
              </Box>
            </Row>
          </Row>
        </Box>

        {/* Main Content */}
        <Row style={{ flex: '1 1 0', overflow: 'hidden' }}>
          {/* Sidebar */}
          {!sidebarCollapsed && (
            <Box
              style={{
                width: '200px',
                background: '#f9fafb',
                borderRight: '1px solid var(--st-color-border)',
                overflow: 'auto',
              }}
            >
              <Column gap={1} pad={3}>
                {[
                  { icon: '📥', label: 'Inbox', count: 12 },
                  { icon: '⭐', label: 'Starred', count: 2 },
                  { icon: '📤', label: 'Sent', count: null },
                  { icon: '📝', label: 'Drafts', count: 3 },
                  { icon: '🗑️', label: 'Trash', count: null },
                ].map((item) => (
                  <Box
                    key={item.label}
                    pad={2}
                    radius={2}
                    style={{
                      cursor: 'pointer',
                      transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                      background: item.label === 'Inbox' ? 'white' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        item.label === 'Inbox' ? 'white' : 'transparent'
                    }}
                  >
                    <Row gap={2} align="center" justify="space-between">
                      <Row gap={2} align="center">
                        <Text size={2}>{item.icon}</Text>
                        <Text size={2} weight={item.label === 'Inbox' ? 'semibold' : 'normal'}>
                          {item.label}
                        </Text>
                      </Row>
                      {item.count && (
                        <Box
                          pad={1}
                          radius={1}
                          style={{
                            background: '#e0e7ff',
                            color: '#4f46e5',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            minWidth: '20px',
                            textAlign: 'center',
                          }}
                        >
                          {item.count}
                        </Box>
                      )}
                    </Row>
                  </Box>
                ))}

                <Box style={{ height: '1px', background: 'var(--st-color-border)', margin: '8px 0' }} />

                <Text size={1} weight="semibold" tone="muted" style={{ padding: '8px' }}>
                  LABELS
                </Text>
                {['Work', 'Personal', 'Important', 'Projects'].map((label) => (
                  <Box
                    key={label}
                    pad={2}
                    radius={2}
                    style={{
                      cursor: 'pointer',
                      transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <Row gap={2} align="center">
                      <Box
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#3b82f6',
                        }}
                      />
                      <Text size={2}>{label}</Text>
                    </Row>
                  </Box>
                ))}
              </Column>
            </Box>
          )}

          {/* Email List */}
          <Box
            style={{
              width: '380px',
              background: 'white',
              borderRight: '1px solid var(--st-color-border)',
              overflow: 'auto',
            }}
          >
            <Column gap={0}>
              {emails.map((email) => (
                <EmailListItem
                  key={email.id}
                  email={email}
                  isSelected={email.id === selectedEmailId}
                  onClick={() => setSelectedEmailId(email.id)}
                />
              ))}
            </Column>
          </Box>

          {/* Email Detail */}
          <Box
            style={{
              flex: '1 1 0',
              background: 'white',
              overflow: 'auto',
            }}
          >
            <EmailDetail email={selectedEmail} />
          </Box>
        </Row>
      </Box>
    )
  },
}

export const MobileEmailClient: Story = {
  render: () => {
    const [view, setView] = useState<'list' | 'detail'>('list')
    const [selectedEmailId, setSelectedEmailId] = useState<string>(emails[0].id)

    const selectedEmail = emails.find((e) => e.id === selectedEmailId) || emails[0]

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
          <Row gap={3} align="center" justify="space-between">
            {view === 'detail' && (
              <Box
                style={{ cursor: 'pointer' }}
                onClick={() => setView('list')}
              >
                <Text size={3}>←</Text>
              </Box>
            )}
            <Text size={4} weight="bold">
              {view === 'list' ? 'Inbox' : 'Email'}
            </Text>
            <Box style={{ width: '24px' }} />
          </Row>
        </Box>

        {/* Content */}
        {view === 'list' ? (
          <Box style={{ flex: '1 1 0', overflow: 'auto' }}>
            <Column gap={0}>
              {emails.map((email) => (
                <EmailListItem
                  key={email.id}
                  email={email}
                  isSelected={false}
                  onClick={() => {
                    setSelectedEmailId(email.id)
                    setView('detail')
                  }}
                />
              ))}
            </Column>
          </Box>
        ) : (
          <Box style={{ flex: '1 1 0', overflow: 'auto' }}>
            <EmailDetail email={selectedEmail} />
          </Box>
        )}

        {/* Bottom Navigation */}
        <Box
          pad={3}
          style={{
            background: 'white',
            borderTop: '1px solid var(--st-color-border)',
          }}
        >
          <Row gap={0} justify="space-around">
            {[
              { icon: '📥', label: 'Inbox' },
              { icon: '⭐', label: 'Starred' },
              { icon: '📤', label: 'Sent' },
              { icon: '🗑️', label: 'Trash' },
            ].map((item) => (
              <Column key={item.label} gap={1} style={{ alignItems: 'center' }}>
                <Text size={3}>{item.icon}</Text>
                <Text size={0} tone="muted">
                  {item.label}
                </Text>
              </Column>
            ))}
          </Row>
        </Box>
      </Box>
    )
  },
}
