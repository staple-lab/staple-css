import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '../../packages/primitives/src/Box'
import { Column } from '../../packages/primitives/src/Stack'
import { Row } from '../../packages/primitives/src/Inline'
import { Text } from '../../packages/primitives/src/Text'
import { useState } from 'react'

const meta = {
  title: 'Examples/Chat Application',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

interface Message {
  id: string
  text: string
  time: string
  isOwn: boolean
  status?: 'sent' | 'delivered' | 'read'
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unreadCount: number
  isOnline: boolean
  isTyping?: boolean
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: '#3b82f6',
    lastMessage: "That sounds great! Let's schedule a call",
    time: '2m ago',
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Design Team',
    avatar: '#8b5cf6',
    lastMessage: 'Marcus: @everyone please review the latest mockups',
    time: '15m ago',
    unreadCount: 12,
    isOnline: false,
    isTyping: false,
  },
  {
    id: '3',
    name: 'Emily Watson',
    avatar: '#ec4899',
    lastMessage: 'Thanks for the feedback!',
    time: '1h ago',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: '4',
    name: 'Project Alpha',
    avatar: '#10b981',
    lastMessage: 'David: The PR is ready for review',
    time: '2h ago',
    unreadCount: 5,
    isOnline: false,
  },
  {
    id: '5',
    name: 'John Anderson',
    avatar: '#f59e0b',
    lastMessage: 'See you tomorrow!',
    time: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
  },
]

const messages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      text: 'Hey! Did you get a chance to look at the design proposals?',
      time: '10:30 AM',
      isOwn: false,
    },
    {
      id: '2',
      text: 'Yes! I reviewed them this morning. Really impressive work on the component library.',
      time: '10:32 AM',
      isOwn: true,
      status: 'read',
    },
    {
      id: '3',
      text: "Thanks! I'm glad you like it. I wanted to get your thoughts on the spacing system.",
      time: '10:33 AM',
      isOwn: false,
    },
    {
      id: '4',
      text: 'The spacing scale looks good. I like the 0-8 progression.',
      time: '10:35 AM',
      isOwn: true,
      status: 'read',
    },
    {
      id: '5',
      text: 'Should we add more granular options or keep it simple?',
      time: '10:36 AM',
      isOwn: false,
    },
    {
      id: '6',
      text: "Let's keep it simple for now. We can always expand based on feedback.",
      time: '10:38 AM',
      isOwn: true,
      status: 'delivered',
    },
    {
      id: '7',
      text: "That sounds great! Let's schedule a call to discuss the token naming conventions.",
      time: '10:40 AM',
      isOwn: false,
    },
  ],
}

const ConversationItem = ({
  conversation,
  isSelected,
  onClick,
}: {
  conversation: Conversation
  isSelected: boolean
  onClick: () => void
}) => (
  <Box
    pad={3}
    style={{
      background: isSelected ? '#e0e7ff' : 'transparent',
      cursor: 'pointer',
      transition: 'all var(--st-duration-fast) var(--st-easing-out)',
      borderLeft: isSelected ? '3px solid #4f46e5' : '3px solid transparent',
    }}
    onClick={onClick}
    onMouseEnter={(e) => {
      if (!isSelected) {
        e.currentTarget.style.background = '#f9fafb'
      }
    }}
    onMouseLeave={(e) => {
      if (!isSelected) {
        e.currentTarget.style.background = 'transparent'
      }
    }}
  >
    <Row gap={3} align="start">
      <Box style={{ position: 'relative' }}>
        <Box
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: conversation.avatar,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: 600,
          }}
        >
          {conversation.name[0]}
        </Box>
        {conversation.isOnline && (
          <Box
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: '#16a34a',
              border: '2px solid white',
            }}
          />
        )}
      </Box>
      <Column gap={1} style={{ flex: '1 1 0', minWidth: 0 }}>
        <Row gap={2} align="center" justify="space-between">
          <Text size={2} weight="semibold" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {conversation.name}
          </Text>
          <Text size={1} tone="muted">
            {conversation.time}
          </Text>
        </Row>
        <Text
          size={1}
          tone="muted"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {conversation.isTyping ? (
            <span style={{ color: '#16a34a', fontStyle: 'italic' }}>typing...</span>
          ) : (
            conversation.lastMessage
          )}
        </Text>
      </Column>
      {conversation.unreadCount > 0 && (
        <Box
          pad={1}
          radius={1}
          style={{
            background: '#4f46e5',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 600,
            minWidth: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
          }}
        >
          {conversation.unreadCount}
        </Box>
      )}
    </Row>
  </Box>
)

const MessageBubble = ({ message }: { message: Message }) => (
  <Row
    gap={2}
    style={{
      justifyContent: message.isOwn ? 'flex-end' : 'flex-start',
      alignItems: 'flex-end',
    }}
  >
    <Box
      pad={3}
      radius={2}
      style={{
        background: message.isOwn ? '#4f46e5' : '#f3f4f6',
        color: message.isOwn ? 'white' : 'inherit',
        maxWidth: '70%',
        borderRadius: message.isOwn ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
      }}
    >
      <Column gap={1}>
        <Text size={2}>{message.text}</Text>
        <Row gap={2} align="center" justify="space-between">
          <Text
            size={0}
            style={{
              color: message.isOwn ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.5)',
            }}
          >
            {message.time}
          </Text>
          {message.isOwn && message.status && (
            <Text size={1}>
              {message.status === 'sent' && '✓'}
              {message.status === 'delivered' && '✓✓'}
              {message.status === 'read' && (
                <span style={{ color: '#60a5fa' }}>✓✓</span>
              )}
            </Text>
          )}
        </Row>
      </Column>
    </Box>
  </Row>
)

export const CompleteChat: Story = {
  render: () => {
    const [selectedConversationId, setSelectedConversationId] = useState<string>('1')
    const [messageText, setMessageText] = useState('')

    const selectedConversation =
      conversations.find((c) => c.id === selectedConversationId) || conversations[0]
    const conversationMessages = messages[selectedConversationId] || []

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
                💬 ChatApp
              </Text>
            </Row>
            <Row gap={3} align="center">
              <Box
                style={{
                  width: '300px',
                  padding: '8px 12px',
                  background: '#f3f4f6',
                  borderRadius: '20px',
                }}
              >
                <Text size={2} tone="muted">
                  🔍 Search conversations...
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
                <Text size={2}>⚙️</Text>
              </Box>
              <Box
                style={{
                  width: '36px',
                  height: '36px',
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
                ME
              </Box>
            </Row>
          </Row>
        </Box>

        {/* Main Content */}
        <Row style={{ flex: '1 1 0', overflow: 'hidden' }}>
          {/* Conversations List */}
          <Box
            style={{
              width: '340px',
              background: 'white',
              borderRight: '1px solid var(--st-color-border)',
              overflow: 'auto',
            }}
          >
            <Column gap={0}>
              <Box pad={3} style={{ borderBottom: '1px solid var(--st-color-border)' }}>
                <Row gap={2}>
                  <Box
                    pad={2}
                    radius={2}
                    style={{
                      background: '#e0e7ff',
                      color: '#4f46e5',
                      cursor: 'pointer',
                      flex: '1 1 0',
                      textAlign: 'center',
                    }}
                  >
                    <Text size={2} weight="semibold">
                      All
                    </Text>
                  </Box>
                  <Box
                    pad={2}
                    radius={2}
                    style={{
                      background: '#f3f4f6',
                      cursor: 'pointer',
                      flex: '1 1 0',
                      textAlign: 'center',
                    }}
                  >
                    <Text size={2}>Unread</Text>
                  </Box>
                  <Box
                    pad={2}
                    radius={2}
                    style={{
                      background: '#f3f4f6',
                      cursor: 'pointer',
                      flex: '1 1 0',
                      textAlign: 'center',
                    }}
                  >
                    <Text size={2}>Groups</Text>
                  </Box>
                </Row>
              </Box>
              {conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isSelected={conversation.id === selectedConversationId}
                  onClick={() => setSelectedConversationId(conversation.id)}
                />
              ))}
            </Column>
          </Box>

          {/* Chat Area */}
          <Column style={{ flex: '1 1 0' }}>
            {/* Chat Header */}
            <Box
              pad={4}
              style={{
                background: 'white',
                borderBottom: '1px solid var(--st-color-border)',
              }}
            >
              <Row gap={3} align="center" justify="space-between">
                <Row gap={3} align="center">
                  <Box style={{ position: 'relative' }}>
                    <Box
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: selectedConversation.avatar,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                    >
                      {selectedConversation.name[0]}
                    </Box>
                    {selectedConversation.isOnline && (
                      <Box
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: '#16a34a',
                          border: '2px solid white',
                        }}
                      />
                    )}
                  </Box>
                  <Column gap={0}>
                    <Text size={2} weight="semibold">
                      {selectedConversation.name}
                    </Text>
                    <Text size={1} tone="muted">
                      {selectedConversation.isOnline ? 'Active now' : 'Last seen 2h ago'}
                    </Text>
                  </Column>
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
                    <Text size={2}>📞</Text>
                  </Box>
                  <Box
                    pad={2}
                    radius={2}
                    style={{
                      background: '#f3f4f6',
                      cursor: 'pointer',
                    }}
                  >
                    <Text size={2}>📹</Text>
                  </Box>
                  <Box
                    pad={2}
                    radius={2}
                    style={{
                      background: '#f3f4f6',
                      cursor: 'pointer',
                    }}
                  >
                    <Text size={2}>ℹ️</Text>
                  </Box>
                </Row>
              </Row>
            </Box>

            {/* Messages */}
            <Box
              pad={4}
              style={{
                flex: '1 1 0',
                overflow: 'auto',
                background: '#f9fafb',
              }}
            >
              <Column gap={2}>
                {conversationMessages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </Column>
            </Box>

            {/* Input Area */}
            <Box
              pad={4}
              style={{
                background: 'white',
                borderTop: '1px solid var(--st-color-border)',
              }}
            >
              <Row gap={2} align="end">
                <Box
                  pad={2}
                  radius={2}
                  style={{
                    background: '#f3f4f6',
                    cursor: 'pointer',
                  }}
                >
                  <Text size={3}>📎</Text>
                </Box>
                <Box
                  style={{
                    flex: '1 1 0',
                    padding: '12px 16px',
                    background: '#f3f4f6',
                    borderRadius: '24px',
                  }}
                >
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    style={{
                      width: '100%',
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '14px',
                    }}
                  />
                </Box>
                <Box
                  pad={2}
                  radius={2}
                  style={{
                    background: '#f3f4f6',
                    cursor: 'pointer',
                  }}
                >
                  <Text size={3}>😊</Text>
                </Box>
                <Box
                  pad={3}
                  radius={2}
                  style={{
                    background: '#4f46e5',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <Text size={2} weight="semibold">
                    Send
                  </Text>
                </Box>
              </Row>
            </Box>
          </Column>

          {/* Right Sidebar - Info Panel */}
          <Box
            style={{
              width: '280px',
              background: 'white',
              borderLeft: '1px solid var(--st-color-border)',
              overflow: 'auto',
            }}
          >
            <Column gap={5} pad={4}>
              <Column gap={3} style={{ alignItems: 'center', textAlign: 'center' }}>
                <Box
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: selectedConversation.avatar,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 600,
                  }}
                >
                  {selectedConversation.name[0]}
                </Box>
                <Column gap={1}>
                  <Text size={3} weight="bold">
                    {selectedConversation.name}
                  </Text>
                  <Text size={1} tone="muted">
                    {selectedConversation.isOnline ? 'Active now' : 'Offline'}
                  </Text>
                </Column>
              </Column>

              <Box style={{ height: '1px', background: 'var(--st-color-border)' }} />

              <Column gap={2}>
                <Text size={2} weight="semibold">
                  Shared Files
                </Text>
                <Column gap={2}>
                  {['design-mockup.fig', 'presentation.pdf', 'screenshot.png'].map((file) => (
                    <Box
                      key={file}
                      pad={2}
                      radius={2}
                      style={{
                        background: '#f3f4f6',
                        cursor: 'pointer',
                      }}
                    >
                      <Row gap={2} align="center">
                        <Text size={2}>📄</Text>
                        <Text size={1} style={{ flex: '1 1 0' }}>
                          {file}
                        </Text>
                      </Row>
                    </Box>
                  ))}
                </Column>
              </Column>

              <Box style={{ height: '1px', background: 'var(--st-color-border)' }} />

              <Column gap={2}>
                <Text size={2} weight="semibold">
                  Shared Photos
                </Text>
                <Box
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 'var(--st-space-2)',
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Box
                      key={i}
                      style={{
                        aspectRatio: '1',
                        background: '#e5e7eb',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </Box>
              </Column>

              <Box style={{ height: '1px', background: 'var(--st-color-border)' }} />

              <Column gap={2}>
                <Box
                  pad={2}
                  radius={2}
                  style={{
                    background: '#f3f4f6',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <Text size={2} tone="muted">
                    🔇 Mute Notifications
                  </Text>
                </Box>
                <Box
                  pad={2}
                  radius={2}
                  style={{
                    background: '#f3f4f6',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <Text size={2} tone="muted">
                    🔍 Search in Conversation
                  </Text>
                </Box>
                <Box
                  pad={2}
                  radius={2}
                  style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <Text size={2}>🗑️ Delete Conversation</Text>
                </Box>
              </Column>
            </Column>
          </Box>
        </Row>
      </Box>
    )
  },
}

export const MobileChat: Story = {
  render: () => {
    const [view, setView] = useState<'list' | 'chat'>('list')
    const [selectedConversationId, setSelectedConversationId] = useState<string>('1')

    const selectedConversation =
      conversations.find((c) => c.id === selectedConversationId) || conversations[0]
    const conversationMessages = messages[selectedConversationId] || []

    return (
      <Box style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {view === 'list' ? (
          <>
            {/* Header */}
            <Box
              pad={4}
              style={{
                background: 'white',
                borderBottom: '1px solid var(--st-color-border)',
              }}
            >
              <Column gap={3}>
                <Row gap={3} align="center" justify="space-between">
                  <Text size={4} weight="bold">
                    Messages
                  </Text>
                  <Box
                    pad={2}
                    radius={2}
                    style={{
                      background: '#4f46e5',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    <Text size={2}>✏️</Text>
                  </Box>
                </Row>
                <Box
                  style={{
                    padding: '8px 12px',
                    background: '#f3f4f6',
                    borderRadius: '20px',
                  }}
                >
                  <Text size={2} tone="muted">
                    🔍 Search
                  </Text>
                </Box>
              </Column>
            </Box>

            {/* Conversations */}
            <Box style={{ flex: '1 1 0', overflow: 'auto' }}>
              <Column gap={0}>
                {conversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isSelected={false}
                    onClick={() => {
                      setSelectedConversationId(conversation.id)
                      setView('chat')
                    }}
                  />
                ))}
              </Column>
            </Box>
          </>
        ) : (
          <>
            {/* Chat Header */}
            <Box
              pad={4}
              style={{
                background: 'white',
                borderBottom: '1px solid var(--st-color-border)',
              }}
            >
              <Row gap={3} align="center">
                <Box style={{ cursor: 'pointer' }} onClick={() => setView('list')}>
                  <Text size={3}>←</Text>
                </Box>
                <Box style={{ position: 'relative' }}>
                  <Box
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: selectedConversation.avatar,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    {selectedConversation.name[0]}
                  </Box>
                  {selectedConversation.isOnline && (
                    <Box
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#16a34a',
                        border: '2px solid white',
                      }}
                    />
                  )}
                </Box>
                <Column gap={0} style={{ flex: '1 1 0' }}>
                  <Text size={2} weight="semibold">
                    {selectedConversation.name}
                  </Text>
                  <Text size={0} tone="muted">
                    {selectedConversation.isOnline ? 'Active' : 'Offline'}
                  </Text>
                </Column>
                <Row gap={2}>
                  <Box style={{ cursor: 'pointer' }}>
                    <Text size={3}>📞</Text>
                  </Box>
                  <Box style={{ cursor: 'pointer' }}>
                    <Text size={3}>📹</Text>
                  </Box>
                </Row>
              </Row>
            </Box>

            {/* Messages */}
            <Box
              pad={4}
              style={{
                flex: '1 1 0',
                overflow: 'auto',
                background: '#f9fafb',
              }}
            >
              <Column gap={2}>
                {conversationMessages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </Column>
            </Box>

            {/* Input */}
            <Box
              pad={3}
              style={{
                background: 'white',
                borderTop: '1px solid var(--st-color-border)',
              }}
            >
              <Row gap={2} align="center">
                <Box style={{ cursor: 'pointer' }}>
                  <Text size={3}>📎</Text>
                </Box>
                <Box
                  style={{
                    flex: '1 1 0',
                    padding: '10px 16px',
                    background: '#f3f4f6',
                    borderRadius: '20px',
                  }}
                >
                  <input
                    type="text"
                    placeholder="Message..."
                    style={{
                      width: '100%',
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '14px',
                    }}
                  />
                </Box>
                <Box style={{ cursor: 'pointer' }}>
                  <Text size={3}>➤</Text>
                </Box>
              </Row>
            </Box>
          </>
        )}
      </Box>
    )
  },
}
