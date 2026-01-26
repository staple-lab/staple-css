import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '../../packages/primitives/src/Box'
import { Column } from '../../packages/primitives/src/Flex'
import { Row } from '../../packages/primitives/src/Flex'
import { Text } from '../../packages/primitives/src/Text'
import { useState } from 'react'

const meta = {
  title: 'Examples/Settings Panel',
  parameters: {
  tags: ['autodocs'],
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) => (
  <Box
    onClick={() => onChange(!enabled)}
    style={{
      width: '44px',
      height: '24px',
      borderRadius: '12px',
      background: enabled ? '#16a34a' : '#d1d5db',
      cursor: 'pointer',
      position: 'relative',
      transition: 'all var(--st-duration-fast) var(--st-easing-out)',
    }}
  >
    <Box
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'white',
        position: 'absolute',
        top: '2px',
        left: enabled ? '22px' : '2px',
        transition: 'all var(--st-duration-fast) var(--st-easing-out)',
      }}
    />
  </Box>
)

const SettingItem = ({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) => (
  <Box
    pad={4}
    style={{
      borderBottom: '1px solid var(--st-color-border)',
    }}
  >
    <Row gap={4} align="center" justify="space-between">
      <Column gap={1} style={{ flex: '1 1 0' }}>
        <Text size={2} weight="semibold">
          {title}
        </Text>
        {description && (
          <Text size={1} tone="muted">
            {description}
          </Text>
        )}
      </Column>
      {children}
    </Row>
  </Box>
)

export const CompleteSettings: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('profile')
    const [notifications, setNotifications] = useState({
      email: true,
      push: true,
      sms: false,
      desktop: true,
    })
    const [privacy, setPrivacy] = useState({
      profilePublic: true,
      showEmail: false,
      showActivity: true,
    })

    const tabs = [
      { id: 'profile', label: 'Profile', icon: '👤' },
      { id: 'account', label: 'Account', icon: '🔐' },
      { id: 'notifications', label: 'Notifications', icon: '🔔' },
      { id: 'privacy', label: 'Privacy', icon: '🔒' },
      { id: 'appearance', label: 'Appearance', icon: '🎨' },
      { id: 'billing', label: 'Billing', icon: '💳' },
    ]

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
            <Text size={4} weight="bold">
              ⚙️ Settings
            </Text>
            <Row gap={2}>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: '#f3f4f6',
                  cursor: 'pointer',
                }}
              >
                <Text size={2}>Cancel</Text>
              </Box>
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
                  Save Changes
                </Text>
              </Box>
            </Row>
          </Row>
        </Box>

        {/* Content */}
        <Row style={{ flex: '1 1 0', overflow: 'hidden' }}>
          {/* Sidebar */}
          <Box
            style={{
              width: '240px',
              background: '#f9fafb',
              borderRight: '1px solid var(--st-color-border)',
              overflow: 'auto',
            }}
          >
            <Column gap={1} pad={3}>
              {tabs.map((tab) => (
                <Box
                  key={tab.id}
                  pad={3}
                  radius={2}
                  style={{
                    background: activeTab === tab.id ? 'white' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                  }}
                  onClick={() => setActiveTab(tab.id)}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = 'white'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  <Row gap={2} align="center">
                    <Text size={2}>{tab.icon}</Text>
                    <Text size={2} weight={activeTab === tab.id ? 'semibold' : 'normal'}>
                      {tab.label}
                    </Text>
                  </Row>
                </Box>
              ))}
            </Column>
          </Box>

          {/* Main Content */}
          <Box
            style={{
              flex: '1 1 0',
              overflow: 'auto',
            }}
          >
            {activeTab === 'profile' && (
              <Column gap={0}>
                <Box pad={6} style={{ background: 'white' }}>
                  <Column gap={4}>
                    <Text size={5} weight="bold">
                      Profile Settings
                    </Text>
                    <Text size={2} tone="muted">
                      Manage your profile information and how others see you
                    </Text>
                  </Column>
                </Box>

                <Box pad={6} style={{ borderTop: '1px solid var(--st-color-border)' }}>
                  <Column gap={4}>
                    <Column gap={3}>
                      <Text size={3} weight="semibold">
                        Profile Photo
                      </Text>
                      <Row gap={4} align="center">
                        <Box
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: '#3b82f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '2rem',
                            fontWeight: 600,
                          }}
                        >
                          JD
                        </Box>
                        <Column gap={2}>
                          <Row gap={2}>
                            <Box
                              pad={2}
                              radius={2}
                              style={{
                                background: '#3b82f6',
                                color: 'white',
                                cursor: 'pointer',
                              }}
                            >
                              <Text size={2}>Upload Photo</Text>
                            </Box>
                            <Box
                              pad={2}
                              radius={2}
                              style={{
                                background: '#f3f4f6',
                                cursor: 'pointer',
                              }}
                            >
                              <Text size={2}>Remove</Text>
                            </Box>
                          </Row>
                          <Text size={1} tone="muted">
                            JPG, PNG or GIF. Max size 2MB.
                          </Text>
                        </Column>
                      </Row>
                    </Column>

                    <Column gap={3}>
                      <Column gap={2}>
                        <Text size={2} weight="semibold">
                          Full Name
                        </Text>
                        <input
                          type="text"
                          placeholder="John Doe"
                          style={{
                            padding: '10px 12px',
                            borderRadius: '6px',
                            border: '1px solid var(--st-color-border)',
                            fontSize: '14px',
                            width: '100%',
                            maxWidth: '400px',
                          }}
                        />
                      </Column>

                      <Column gap={2}>
                        <Text size={2} weight="semibold">
                          Email
                        </Text>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          style={{
                            padding: '10px 12px',
                            borderRadius: '6px',
                            border: '1px solid var(--st-color-border)',
                            fontSize: '14px',
                            width: '100%',
                            maxWidth: '400px',
                          }}
                        />
                      </Column>

                      <Column gap={2}>
                        <Text size={2} weight="semibold">
                          Bio
                        </Text>
                        <textarea
                          placeholder="Tell us about yourself..."
                          rows={4}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '6px',
                            border: '1px solid var(--st-color-border)',
                            fontSize: '14px',
                            width: '100%',
                            maxWidth: '600px',
                            fontFamily: 'inherit',
                            resize: 'vertical',
                          }}
                        />
                      </Column>

                      <Column gap={2}>
                        <Text size={2} weight="semibold">
                          Location
                        </Text>
                        <input
                          type="text"
                          placeholder="San Francisco, CA"
                          style={{
                            padding: '10px 12px',
                            borderRadius: '6px',
                            border: '1px solid var(--st-color-border)',
                            fontSize: '14px',
                            width: '100%',
                            maxWidth: '400px',
                          }}
                        />
                      </Column>
                    </Column>
                  </Column>
                </Box>
              </Column>
            )}

            {activeTab === 'account' && (
              <Column gap={0}>
                <Box pad={6} style={{ background: 'white' }}>
                  <Column gap={4}>
                    <Text size={5} weight="bold">
                      Account Settings
                    </Text>
                    <Text size={2} tone="muted">
                      Manage your account security and preferences
                    </Text>
                  </Column>
                </Box>

                <Column gap={0}>
                  <SettingItem
                    title="Change Password"
                    description="Update your password to keep your account secure"
                  >
                    <Box
                      pad={2}
                      radius={2}
                      style={{
                        background: '#f3f4f6',
                        cursor: 'pointer',
                      }}
                    >
                      <Text size={2}>Update</Text>
                    </Box>
                  </SettingItem>

                  <SettingItem
                    title="Two-Factor Authentication"
                    description="Add an extra layer of security to your account"
                  >
                    <Box
                      pad={2}
                      radius={2}
                      style={{
                        background: '#16a34a',
                        color: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      <Text size={2}>Enabled</Text>
                    </Box>
                  </SettingItem>

                  <SettingItem
                    title="Connected Accounts"
                    description="Manage third-party accounts connected to your profile"
                  >
                    <Box
                      pad={2}
                      radius={2}
                      style={{
                        background: '#f3f4f6',
                        cursor: 'pointer',
                      }}
                    >
                      <Text size={2}>Manage</Text>
                    </Box>
                  </SettingItem>

                  <SettingItem
                    title="Active Sessions"
                    description="View and manage your active login sessions"
                  >
                    <Box
                      pad={2}
                      radius={2}
                      style={{
                        background: '#f3f4f6',
                        cursor: 'pointer',
                      }}
                    >
                      <Text size={2}>View</Text>
                    </Box>
                  </SettingItem>

                  <Box
                    pad={6}
                    style={{
                      background: '#fef2f2',
                      borderTop: '1px solid var(--st-color-border)',
                    }}
                  >
                    <Column gap={3}>
                      <Text size={3} weight="semibold" style={{ color: '#dc2626' }}>
                        Danger Zone
                      </Text>
                      <Column gap={2}>
                        <Box
                          pad={3}
                          radius={2}
                          style={{
                            background: 'white',
                            border: '1px solid #fecaca',
                          }}
                        >
                          <Row gap={3} align="center" justify="space-between">
                            <Column gap={1}>
                              <Text size={2} weight="semibold">
                                Delete Account
                              </Text>
                              <Text size={1} tone="muted">
                                Permanently delete your account and all data
                              </Text>
                            </Column>
                            <Box
                              pad={2}
                              radius={2}
                              style={{
                                background: '#dc2626',
                                color: 'white',
                                cursor: 'pointer',
                              }}
                            >
                              <Text size={2}>Delete</Text>
                            </Box>
                          </Row>
                        </Box>
                      </Column>
                    </Column>
                  </Box>
                </Column>
              </Column>
            )}

            {activeTab === 'notifications' && (
              <Column gap={0}>
                <Box pad={6} style={{ background: 'white' }}>
                  <Column gap={4}>
                    <Text size={5} weight="bold">
                      Notification Preferences
                    </Text>
                    <Text size={2} tone="muted">
                      Choose how you want to be notified
                    </Text>
                  </Column>
                </Box>

                <Column gap={0}>
                  <Box
                    pad={4}
                    style={{
                      background: '#eff6ff',
                      borderBottom: '1px solid var(--st-color-border)',
                    }}
                  >
                    <Text size={2} weight="semibold" style={{ color: '#1e40af' }}>
                      Email Notifications
                    </Text>
                  </Box>

                  <SettingItem
                    title="Email Notifications"
                    description="Receive notifications via email"
                  >
                    <Toggle
                      enabled={notifications.email}
                      onChange={(value) =>
                        setNotifications({ ...notifications, email: value })
                      }
                    />
                  </SettingItem>

                  <Box
                    pad={4}
                    style={{
                      background: '#eff6ff',
                      borderBottom: '1px solid var(--st-color-border)',
                    }}
                  >
                    <Text size={2} weight="semibold" style={{ color: '#1e40af' }}>
                      Push Notifications
                    </Text>
                  </Box>

                  <SettingItem
                    title="Push Notifications"
                    description="Receive push notifications in your browser"
                  >
                    <Toggle
                      enabled={notifications.push}
                      onChange={(value) =>
                        setNotifications({ ...notifications, push: value })
                      }
                    />
                  </SettingItem>

                  <SettingItem
                    title="Desktop Notifications"
                    description="Show desktop notifications when app is in background"
                  >
                    <Toggle
                      enabled={notifications.desktop}
                      onChange={(value) =>
                        setNotifications({ ...notifications, desktop: value })
                      }
                    />
                  </SettingItem>

                  <SettingItem
                    title="SMS Notifications"
                    description="Receive important alerts via SMS"
                  >
                    <Toggle
                      enabled={notifications.sms}
                      onChange={(value) =>
                        setNotifications({ ...notifications, sms: value })
                      }
                    />
                  </SettingItem>
                </Column>
              </Column>
            )}

            {activeTab === 'privacy' && (
              <Column gap={0}>
                <Box pad={6} style={{ background: 'white' }}>
                  <Column gap={4}>
                    <Text size={5} weight="bold">
                      Privacy Settings
                    </Text>
                    <Text size={2} tone="muted">
                      Control your privacy and data sharing preferences
                    </Text>
                  </Column>
                </Box>

                <Column gap={0}>
                  <SettingItem
                    title="Public Profile"
                    description="Make your profile visible to everyone"
                  >
                    <Toggle
                      enabled={privacy.profilePublic}
                      onChange={(value) =>
                        setPrivacy({ ...privacy, profilePublic: value })
                      }
                    />
                  </SettingItem>

                  <SettingItem
                    title="Show Email Address"
                    description="Display your email on your public profile"
                  >
                    <Toggle
                      enabled={privacy.showEmail}
                      onChange={(value) => setPrivacy({ ...privacy, showEmail: value })}
                    />
                  </SettingItem>

                  <SettingItem
                    title="Show Activity Status"
                    description="Let others see when you're online"
                  >
                    <Toggle
                      enabled={privacy.showActivity}
                      onChange={(value) =>
                        setPrivacy({ ...privacy, showActivity: value })
                      }
                    />
                  </SettingItem>

                  <SettingItem
                    title="Data Export"
                    description="Download a copy of your data"
                  >
                    <Box
                      pad={2}
                      radius={2}
                      style={{
                        background: '#f3f4f6',
                        cursor: 'pointer',
                      }}
                    >
                      <Text size={2}>Export Data</Text>
                    </Box>
                  </SettingItem>
                </Column>
              </Column>
            )}

            {activeTab === 'appearance' && (
              <Column gap={0}>
                <Box pad={6} style={{ background: 'white' }}>
                  <Column gap={4}>
                    <Text size={5} weight="bold">
                      Appearance
                    </Text>
                    <Text size={2} tone="muted">
                      Customize how the app looks and feels
                    </Text>
                  </Column>
                </Box>

                <Box pad={6} style={{ borderTop: '1px solid var(--st-color-border)' }}>
                  <Column gap={5}>
                    <Column gap={3}>
                      <Text size={3} weight="semibold">
                        Theme
                      </Text>
                      <Row gap={3}>
                        {['Light', 'Dark', 'System'].map((theme) => (
                          <Box
                            key={theme}
                            pad={4}
                            radius={2}
                            style={{
                              background: theme === 'Light' ? '#e0e7ff' : '#f3f4f6',
                              border:
                                theme === 'Light'
                                  ? '2px solid #4f46e5'
                                  : '2px solid transparent',
                              cursor: 'pointer',
                              flex: '1 1 0',
                              textAlign: 'center',
                              transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                            }}
                            onMouseEnter={(e) => {
                              if (theme !== 'Light') {
                                e.currentTarget.style.borderColor = '#d1d5db'
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (theme !== 'Light') {
                                e.currentTarget.style.borderColor = 'transparent'
                              }
                            }}
                          >
                            <Column gap={2}>
                              <Text size={4}>
                                {theme === 'Light'
                                  ? '☀️'
                                  : theme === 'Dark'
                                    ? '🌙'
                                    : '🖥️'}
                              </Text>
                              <Text size={2} weight="semibold">
                                {theme}
                              </Text>
                            </Column>
                          </Box>
                        ))}
                      </Row>
                    </Column>

                    <Column gap={3}>
                      <Text size={3} weight="semibold">
                        Font Size
                      </Text>
                      <Row gap={3}>
                        {['Small', 'Medium', 'Large'].map((size) => (
                          <Box
                            key={size}
                            pad={3}
                            radius={2}
                            style={{
                              background: size === 'Medium' ? '#e0e7ff' : '#f3f4f6',
                              border:
                                size === 'Medium'
                                  ? '2px solid #4f46e5'
                                  : '2px solid transparent',
                              cursor: 'pointer',
                              flex: '1 1 0',
                              textAlign: 'center',
                            }}
                          >
                            <Text
                              size={size === 'Small' ? 1 : size === 'Large' ? 3 : 2}
                              weight="semibold"
                            >
                              Aa
                            </Text>
                          </Box>
                        ))}
                      </Row>
                    </Column>

                    <Column gap={3}>
                      <Text size={3} weight="semibold">
                        Accent Color
                      </Text>
                      <Row gap={2}>
                        {[
                          '#3b82f6',
                          '#8b5cf6',
                          '#ec4899',
                          '#10b981',
                          '#f59e0b',
                          '#ef4444',
                        ].map((color) => (
                          <Box
                            key={color}
                            style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '50%',
                              background: color,
                              cursor: 'pointer',
                              border:
                                color === '#3b82f6' ? '3px solid #1e3a8a' : 'none',
                              transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.1)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)'
                            }}
                          />
                        ))}
                      </Row>
                    </Column>
                  </Column>
                </Box>
              </Column>
            )}

            {activeTab === 'billing' && (
              <Column gap={0}>
                <Box pad={6} style={{ background: 'white' }}>
                  <Column gap={4}>
                    <Text size={5} weight="bold">
                      Billing & Subscription
                    </Text>
                    <Text size={2} tone="muted">
                      Manage your subscription and payment methods
                    </Text>
                  </Column>
                </Box>

                <Box pad={6} style={{ borderTop: '1px solid var(--st-color-border)' }}>
                  <Column gap={5}>
                    <Box
                      pad={5}
                      radius={3}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                      }}
                    >
                      <Column gap={3}>
                        <Row gap={3} align="center" justify="space-between">
                          <Column gap={1}>
                            <Text size={1} style={{ opacity: 0.9 }}>
                              Current Plan
                            </Text>
                            <Text size={5} weight="bold">
                              Professional
                            </Text>
                          </Column>
                          <Box
                            pad={3}
                            radius={2}
                            style={{
                              background: 'white',
                              color: '#667eea',
                              cursor: 'pointer',
                            }}
                          >
                            <Text size={2} weight="semibold">
                              Upgrade
                            </Text>
                          </Box>
                        </Row>
                        <Text size={2} style={{ opacity: 0.9 }}>
                          $49/month • Renews on Feb 15, 2024
                        </Text>
                      </Column>
                    </Box>

                    <Column gap={3}>
                      <Text size={3} weight="semibold">
                        Payment Method
                      </Text>
                      <Box
                        pad={4}
                        radius={2}
                        style={{
                          background: '#f3f4f6',
                        }}
                      >
                        <Row gap={3} align="center" justify="space-between">
                          <Row gap={3} align="center">
                            <Text size={4}>💳</Text>
                            <Column gap={0}>
                              <Text size={2} weight="semibold">
                                •••• •••• •••• 4242
                              </Text>
                              <Text size={1} tone="muted">
                                Expires 12/2025
                              </Text>
                            </Column>
                          </Row>
                          <Box
                            pad={2}
                            radius={2}
                            style={{
                              background: 'white',
                              cursor: 'pointer',
                            }}
                          >
                            <Text size={2}>Update</Text>
                          </Box>
                        </Row>
                      </Box>
                    </Column>

                    <Column gap={3}>
                      <Text size={3} weight="semibold">
                        Billing History
                      </Text>
                      {[
                        { date: 'Jan 15, 2024', amount: '$49.00', status: 'Paid' },
                        { date: 'Dec 15, 2023', amount: '$49.00', status: 'Paid' },
                        { date: 'Nov 15, 2023', amount: '$49.00', status: 'Paid' },
                      ].map((invoice, i) => (
                        <Box
                          key={i}
                          pad={3}
                          radius={2}
                          style={{
                            background: '#f3f4f6',
                          }}
                        >
                          <Row gap={3} align="center" justify="space-between">
                            <Column gap={0}>
                              <Text size={2} weight="semibold">
                                {invoice.date}
                              </Text>
                              <Text size={1} tone="muted">
                                Professional Plan
                              </Text>
                            </Column>
                            <Row gap={3} align="center">
                              <Text size={2} weight="semibold">
                                {invoice.amount}
                              </Text>
                              <Box
                                pad={1}
                                radius={1}
                                style={{
                                  background: '#d1fae5',
                                  color: '#065f46',
                                }}
                              >
                                <Text size={0} weight="semibold">
                                  {invoice.status}
                                </Text>
                              </Box>
                              <Box
                                pad={2}
                                radius={2}
                                style={{
                                  background: 'white',
                                  cursor: 'pointer',
                                }}
                              >
                                <Text size={1}>📥</Text>
                              </Box>
                            </Row>
                          </Row>
                        </Box>
                      ))}
                    </Column>
                  </Column>
                </Box>
              </Column>
            )}
          </Box>
        </Row>
      </Box>
    )
  },
}
