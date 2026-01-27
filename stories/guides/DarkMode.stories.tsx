import type { Meta, StoryObj } from '@storybook/react'
import { Box, Column, Row, Grid, Text, Card } from '@staple-css/primitives/full'
import { useState } from 'react'

const meta = {
  title: 'Guides/Dark Mode',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

// Theme toggle component
const ThemeToggle = ({ theme, onToggle }: { theme: 'light' | 'dark'; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    style={{
      padding: '10px 16px',
      background: theme === 'dark' ? '#374151' : '#f9fafb',
      color: theme === 'dark' ? 'white' : '#1f2937',
      border: '1px solid',
      borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all var(--st-duration-fast)',
    }}
  >
    <Text>{theme === 'dark' ? '🌙' : '☀️'}</Text>
    <Text>{theme === 'dark' ? 'Dark' : 'Light'} Mode</Text>
  </button>
)

// Basic dark mode demo
export const BasicDarkMode: Story = {
  render: () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    return (
      <Box
        data-theme={theme}
        style={{
          minHeight: '100vh',
          background: 'var(--st-color-background)',
          transition: 'background var(--st-duration-normal), color var(--st-duration-normal)',
        }}
      >
        <Column gap={6} pad={6} maxWidth="lg" marginX="auto">
          <Row justify="between" align="center">
            <Text size={5} weight="bold" style={{ color: 'var(--st-color-text)' }}>
              Dark Mode Demo
            </Text>
            <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
          </Row>

          <Column gap={4}>
            <Box
              pad={5}
              radius={2}
              shadow={1}
              style={{
                background: 'var(--st-color-surface)',
                borderColor: 'var(--st-color-border)',
              }}
            >
              <Column gap={3}>
                <Text size={4} weight="bold" style={{ color: 'var(--st-color-text)' }}>
                  Automatic Theme Switching
                </Text>
                <Text leading="relaxed" style={{ color: 'var(--st-color-text)' }}>
                  All color tokens automatically adapt to the current theme. Simply add{' '}
                  <Text as="code" mono style={{ background: 'var(--st-color-surface-raised)', padding: '2px 6px', borderRadius: '3px' }}>
                    data-theme="dark"
                  </Text>{' '}
                  to any parent element.
                </Text>
                <Text size={1} style={{ color: 'var(--st-color-text-muted)' }}>
                  Colors, backgrounds, borders, and shadows all update automatically.
                </Text>
              </Column>
            </Box>

            <Grid cols={{ base: 1, md: 2 }} gap={4}>
              <Card pad={4} radius={2} shadow={1} tone="primary">
                <Column gap={2}>
                  <Text weight="bold">Primary Card</Text>
                  <Text size={1}>Theme-aware primary tone</Text>
                </Column>
              </Card>

              <Card pad={4} radius={2} shadow={1} tone="success">
                <Column gap={2}>
                  <Text weight="bold">Success Card</Text>
                  <Text size={1}>Theme-aware success tone</Text>
                </Column>
              </Card>

              <Card pad={4} radius={2} shadow={1} tone="danger">
                <Column gap={2}>
                  <Text weight="bold">Danger Card</Text>
                  <Text size={1}>Theme-aware danger tone</Text>
                </Column>
              </Card>

              <Card pad={4} radius={2} shadow={1} tone="warn">
                <Column gap={2}>
                  <Text weight="bold">Warning Card</Text>
                  <Text size={1}>Theme-aware warning tone</Text>
                </Column>
              </Card>
            </Grid>
          </Column>
        </Column>
      </Box>
    )
  },
}

// System preference detection
export const SystemPreference: Story = {
  render: () => {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() =>
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    )

    const effectiveTheme = theme === 'system' ? systemTheme : theme

    return (
      <Box
        data-theme={effectiveTheme}
        style={{
          minHeight: '100vh',
          background: 'var(--st-color-background)',
          transition: 'background var(--st-duration-normal)',
        }}
      >
        <Column gap={6} pad={6} maxWidth="lg" marginX="auto">
          <Row justify="between" align="center">
            <Text size={5} weight="bold" style={{ color: 'var(--st-color-text)' }}>
              System Preference
            </Text>
          </Row>

          <Box
            pad={5}
            radius={2}
            shadow={1}
            style={{ background: 'var(--st-color-surface)' }}
          >
            <Column gap={4}>
              <Text size={4} weight="bold" style={{ color: 'var(--st-color-text)' }}>
                Choose Theme Mode
              </Text>

              <Row gap={2}>
                {(['light', 'dark', 'system'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setTheme(mode)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: theme === mode ? 'var(--st-color-primary)' : 'var(--st-color-surface-raised)',
                      color: theme === mode ? 'var(--st-color-primary-text)' : 'var(--st-color-text)',
                      border: '2px solid',
                      borderColor: theme === mode ? 'var(--st-color-primary)' : 'var(--st-color-border)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all var(--st-duration-fast)',
                    }}
                  >
                    {mode === 'light' && '☀️ Light'}
                    {mode === 'dark' && '🌙 Dark'}
                    {mode === 'system' && '🖥️ System'}
                  </button>
                ))}
              </Row>

              <Box
                pad={3}
                radius={2}
                style={{
                  background: 'var(--st-color-surface-raised)',
                  border: '1px solid var(--st-color-border)',
                }}
              >
                <Column gap={1}>
                  <Text size={1} weight="semibold" style={{ color: 'var(--st-color-text)' }}>
                    Current Settings:
                  </Text>
                  <Text size={1} mono style={{ color: 'var(--st-color-text-muted)' }}>
                    Selected: {theme}
                  </Text>
                  <Text size={1} mono style={{ color: 'var(--st-color-text-muted)' }}>
                    System Preference: {systemTheme}
                  </Text>
                  <Text size={1} mono style={{ color: 'var(--st-color-text-muted)' }}>
                    Active Theme: {effectiveTheme}
                  </Text>
                </Column>
              </Box>

              <Text size={1} leading="relaxed" style={{ color: 'var(--st-color-text-muted)' }}>
                System mode automatically respects the user's operating system preference
                using the <Text mono>prefers-color-scheme</Text> media query. This provides
                the best user experience by matching their system-wide theme settings.
              </Text>
            </Column>
          </Box>
        </Column>
      </Box>
    )
  },
}

// Implementation guide
export const ImplementationGuide: Story = {
  render: () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    return (
      <Box
        data-theme={theme}
        style={{
          minHeight: '100vh',
          background: 'var(--st-color-background)',
          padding: '40px 20px',
        }}
      >
        <Column gap={6} maxWidth="prose" marginX="auto">
          <Row justify="between" align="center">
            <Text size={6} weight="bold" style={{ color: 'var(--st-color-text)' }}>
              Implementation Guide
            </Text>
            <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
          </Row>

          <Column gap={6}>
            {/* Step 1 */}
            <Box
              pad={5}
              radius={2}
              shadow={1}
              style={{ background: 'var(--st-color-surface)' }}
            >
              <Column gap={3}>
                <Text size={4} weight="bold" style={{ color: 'var(--st-color-text)' }}>
                  1. Import Theme CSS
                </Text>
                <Text leading="relaxed" style={{ color: 'var(--st-color-text)' }}>
                  Import the themes CSS file to enable dark mode support:
                </Text>
                <Box
                  pad={3}
                  radius={2}
                  style={{
                    background: '#1f2937',
                    color: '#f9fafb',
                    overflow: 'auto',
                  }}
                >
                  <Column gap={1}>
                    <Text mono size={1}>import "@staple-css/tokens/themes.css";</Text>
                    <Text mono size={1}></Text>
                    <Text mono size={1} style={{ color: '#6b7280' }}>// Or import all tokens at once:</Text>
                    <Text mono size={1}>import "@staple-css/tokens/all.css";</Text>
                  </Column>
                </Box>
              </Column>
            </Box>

            {/* Step 2 */}
            <Box
              pad={5}
              radius={2}
              shadow={1}
              style={{ background: 'var(--st-color-surface)' }}
            >
              <Column gap={3}>
                <Text size={4} weight="bold" style={{ color: 'var(--st-color-text)' }}>
                  2. Add Theme Attribute
                </Text>
                <Text leading="relaxed" style={{ color: 'var(--st-color-text)' }}>
                  Add <Text mono>data-theme</Text> attribute to your root element or any container:
                </Text>
                <Box
                  pad={3}
                  radius={2}
                  style={{
                    background: '#1f2937',
                    color: '#f9fafb',
                    overflow: 'auto',
                  }}
                >
                  <Column gap={1}>
                    <Text mono size={1}>&lt;div data-theme="dark"&gt;</Text>
                    <Text mono size={1}>  &lt;App /&gt;</Text>
                    <Text mono size={1}>&lt;/div&gt;</Text>
                  </Column>
                </Box>
              </Column>
            </Box>

            {/* Step 3 */}
            <Box
              pad={5}
              radius={2}
              shadow={1}
              style={{ background: 'var(--st-color-surface)' }}
            >
              <Column gap={3}>
                <Text size={4} weight="bold" style={{ color: 'var(--st-color-text)' }}>
                  3. Use Color Tokens
                </Text>
                <Text leading="relaxed" style={{ color: 'var(--st-color-text)' }}>
                  Use color tokens in your components - they automatically adapt:
                </Text>
                <Box
                  pad={3}
                  radius={2}
                  style={{
                    background: '#1f2937',
                    color: '#f9fafb',
                    overflow: 'auto',
                  }}
                >
                  <Column gap={1}>
                    <Text mono size={1}>.button {'{'}</Text>
                    <Text mono size={1}>  background: var(--st-color-primary);</Text>
                    <Text mono size={1}>  color: var(--st-color-primary-text);</Text>
                    <Text mono size={1}>{'}'}</Text>
                    <Text mono size={1}></Text>
                    <Text mono size={1}>.card {'{'}</Text>
                    <Text mono size={1}>  background: var(--st-color-surface);</Text>
                    <Text mono size={1}>  border-color: var(--st-color-border);</Text>
                    <Text mono size={1}>  color: var(--st-color-text);</Text>
                    <Text mono size={1}>{'}'}</Text>
                  </Column>
                </Box>
              </Column>
            </Box>

            {/* Step 4 */}
            <Box
              pad={5}
              radius={2}
              shadow={1}
              style={{ background: 'var(--st-color-surface)' }}
            >
              <Column gap={3}>
                <Text size={4} weight="bold" style={{ color: 'var(--st-color-text)' }}>
                  4. Toggle Theme
                </Text>
                <Text leading="relaxed" style={{ color: 'var(--st-color-text)' }}>
                  Create a simple toggle to switch between themes:
                </Text>
                <Box
                  pad={3}
                  radius={2}
                  style={{
                    background: '#1f2937',
                    color: '#f9fafb',
                    overflow: 'auto',
                  }}
                >
                  <Column gap={1}>
                    <Text mono size={1}>const [theme, setTheme] = useState('light');</Text>
                    <Text mono size={1}></Text>
                    <Text mono size={1}>const toggleTheme = () =&gt; {'{'}</Text>
                    <Text mono size={1}>  const newTheme = theme === 'light' ? 'dark' : 'light';</Text>
                    <Text mono size={1}>  setTheme(newTheme);</Text>
                    <Text mono size={1}>  document.documentElement.dataset.theme = newTheme;</Text>
                    <Text mono size={1}>{'};'}</Text>
                  </Column>
                </Box>
              </Column>
            </Box>

            {/* Available tokens */}
            <Box
              pad={5}
              radius={2}
              shadow={1}
              style={{ background: 'var(--st-color-surface)' }}
            >
              <Column gap={3}>
                <Text size={4} weight="bold" style={{ color: 'var(--st-color-text)' }}>
                  Available Color Tokens
                </Text>
                <Grid cols={{ base: 1, md: 2 }} gap={3}>
                  {[
                    { name: '--st-color-background', desc: 'Page background' },
                    { name: '--st-color-surface', desc: 'Card/panel surfaces' },
                    { name: '--st-color-surface-raised', desc: 'Elevated surfaces' },
                    { name: '--st-color-text', desc: 'Primary text' },
                    { name: '--st-color-text-muted', desc: 'Secondary text' },
                    { name: '--st-color-border', desc: 'Borders and dividers' },
                    { name: '--st-color-primary', desc: 'Primary actions' },
                    { name: '--st-color-danger', desc: 'Error states' },
                    { name: '--st-color-success', desc: 'Success states' },
                    { name: '--st-color-warn', desc: 'Warning states' },
                  ].map((token) => (
                    <Box
                      key={token.name}
                      pad={3}
                      radius={2}
                      style={{
                        background: 'var(--st-color-surface-raised)',
                        border: '1px solid var(--st-color-border)',
                      }}
                    >
                      <Column gap={1}>
                        <Text mono size={1} weight="bold" style={{ color: 'var(--st-color-text)' }}>
                          {token.name}
                        </Text>
                        <Text size={0} style={{ color: 'var(--st-color-text-muted)' }}>
                          {token.desc}
                        </Text>
                      </Column>
                    </Box>
                  ))}
                </Grid>
              </Column>
            </Box>
          </Column>
        </Column>
      </Box>
    )
  },
}

// Complete themed app
export const CompleteThemedApp: Story = {
  render: () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    return (
      <Box
        data-theme={theme}
        style={{
          minHeight: '100vh',
          background: 'var(--st-color-background)',
          transition: 'background var(--st-duration-normal)',
        }}
      >
        {/* Header */}
        <Box
          pad={4}
          style={{
            background: 'var(--st-color-surface)',
            borderBottom: '1px solid var(--st-color-border)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <Row justify="between" align="center" maxWidth="7xl" marginX="auto">
            <Text size={3} weight="bold" style={{ color: 'var(--st-color-text)' }}>
              My App
            </Text>
            <Row gap={3} align="center">
              <Text style={{ color: 'var(--st-color-text)', cursor: 'pointer' }}>Home</Text>
              <Text style={{ color: 'var(--st-color-text)', cursor: 'pointer' }}>About</Text>
              <Text style={{ color: 'var(--st-color-text)', cursor: 'pointer' }}>Contact</Text>
              <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
            </Row>
          </Row>
        </Box>

        {/* Content */}
        <Column gap={6} pad={6} maxWidth="7xl" marginX="auto">
          {/* Stats */}
          <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
            {[
              { label: 'Total Users', value: '12,543', icon: '👥' },
              { label: 'Revenue', value: '$45,231', icon: '💰' },
              { label: 'Projects', value: '892', icon: '📊' },
              { label: 'Tasks Done', value: '1,234', icon: '✓' },
            ].map((stat) => (
              <Box
                key={stat.label}
                pad={5}
                radius={2}
                shadow={1}
                style={{
                  background: 'var(--st-color-surface)',
                  borderColor: 'var(--st-color-border)',
                }}
              >
                <Column gap={2}>
                  <Text size={4}>{stat.icon}</Text>
                  <Text size={1} style={{ color: 'var(--st-color-text-muted)' }}>
                    {stat.label}
                  </Text>
                  <Text size={5} weight="bold" style={{ color: 'var(--st-color-text)' }}>
                    {stat.value}
                  </Text>
                </Column>
              </Box>
            ))}
          </Grid>

          {/* Main content */}
          <Grid cols={{ base: 1, lg: 3 }} gap={4}>
            <Box
              radius={2}
              shadow={1}
              style={{
                gridColumn: '1 / span 2',
                background: 'var(--st-color-surface)',
              }}
            >
              <Column gap={0}>
                <Box pad={4} style={{ borderBottom: '1px solid var(--st-color-border)' }}>
                  <Text size={3} weight="bold" style={{ color: 'var(--st-color-text)' }}>
                    Recent Activity
                  </Text>
                </Box>
                <Column gap={0}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Box
                      key={i}
                      pad={3}
                      style={{
                        borderBottom: '1px solid var(--st-color-border)',
                      }}
                    >
                      <Row justify="between">
                        <Text style={{ color: 'var(--st-color-text)' }}>Activity {i}</Text>
                        <Text size={1} style={{ color: 'var(--st-color-text-muted)' }}>
                          {i}h ago
                        </Text>
                      </Row>
                    </Box>
                  ))}
                </Column>
              </Column>
            </Box>

            <Box
              pad={5}
              radius={2}
              shadow={1}
              style={{ background: 'var(--st-color-surface)' }}
            >
              <Column gap={4}>
                <Text size={3} weight="bold" style={{ color: 'var(--st-color-text)' }}>
                  Quick Actions
                </Text>
                <Column gap={2}>
                  <button
                    style={{
                      padding: '12px',
                      background: 'var(--st-color-primary)',
                      color: 'var(--st-color-primary-text)',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                    }}
                  >
                    New Project
                  </button>
                  <button
                    style={{
                      padding: '12px',
                      background: 'var(--st-color-surface-raised)',
                      color: 'var(--st-color-text)',
                      border: '1px solid var(--st-color-border)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                    }}
                  >
                    Export Data
                  </button>
                </Column>
              </Column>
            </Box>
          </Grid>
        </Column>
      </Box>
    )
  },
}
