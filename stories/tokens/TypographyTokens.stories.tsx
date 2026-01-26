import type { Meta, StoryObj } from '@storybook/react'
import { Box, Column, Row, Text } from '@staple-css/primitives'

const meta = {
  title: 'Tokens/Typography',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

// Font size scale
const fontSizes = [
  { key: '0', value: '0.75rem', pixels: '12px', name: 'Caption' },
  { key: '1', value: '0.875rem', pixels: '14px', name: 'Small' },
  { key: '2', value: '1rem', pixels: '16px', name: 'Body' },
  { key: '3', value: '1.125rem', pixels: '18px', name: 'Large' },
  { key: '4', value: '1.25rem', pixels: '20px', name: 'Heading 3' },
  { key: '5', value: '1.5rem', pixels: '24px', name: 'Heading 2' },
  { key: '6', value: '2rem', pixels: '32px', name: 'Heading 1' },
]

export const FontSizeScale: Story = {
  render: () => (
    <Column gap={4} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Font Size Scale (0-6)
        </Text>
        <Text tone="muted">
          7 font sizes optimized for hierarchy and readability.
        </Text>
      </Column>

      <Column gap={3}>
        {fontSizes.map((size) => (
          <Row key={size.key} gap={4} align="baseline">
            <Text size={parseInt(size.key) as any} style={{ minWidth: '200px' }}>
              The quick brown fox
            </Text>
            <Column gap={0} style={{ flex: 1 }}>
              <Row gap={2} align="baseline">
                <Text weight="bold" mono size={1}>
                  --st-font-size-{size.key}
                </Text>
                <Text size={0} mono tone="muted">
                  {size.value}
                </Text>
                <Text size={0} tone="muted">
                  ({size.pixels})
                </Text>
              </Row>
              <Text size={0} tone="muted">
                {size.name}
              </Text>
            </Column>
          </Row>
        ))}
      </Column>
    </Column>
  ),
}

// Font weight scale
const fontWeights = [
  { key: 'normal', value: '400', name: 'Regular body text' },
  { key: 'medium', value: '500', name: 'Subtle emphasis' },
  { key: 'semibold', value: '600', name: 'Strong emphasis' },
  { key: 'bold', value: '700', name: 'Headings & labels' },
]

export const FontWeightScale: Story = {
  render: () => (
    <Column gap={4} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Font Weight Scale
        </Text>
        <Text tone="muted">
          4 weight values for typographic hierarchy.
        </Text>
      </Column>

      <Column gap={3}>
        {fontWeights.map((weight) => (
          <Row key={weight.key} gap={4} align="baseline">
            <Text size={3} weight={weight.key as any} style={{ minWidth: '240px' }}>
              The quick brown fox
            </Text>
            <Column gap={0} style={{ flex: 1 }}>
              <Row gap={2} align="baseline">
                <Text weight="bold" mono size={1}>
                  --st-font-weight-{weight.key}
                </Text>
                <Text size={0} mono tone="muted">
                  {weight.value}
                </Text>
              </Row>
              <Text size={0} tone="muted">
                {weight.name}
              </Text>
            </Column>
          </Row>
        ))}
      </Column>
    </Column>
  ),
}

// Line height scale
const lineHeights = [
  { key: 'tight', value: '1.25', usage: 'Headings, short text' },
  { key: 'normal', value: '1.5', usage: 'Body text, default' },
  { key: 'relaxed', value: '1.75', usage: 'Long-form content' },
]

export const LineHeightScale: Story = {
  render: () => (
    <Column gap={4} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Line Height (Leading)
        </Text>
        <Text tone="muted">
          3 line height values for different content types.
        </Text>
      </Column>

      <Column gap={4}>
        {lineHeights.map((lh) => (
          <Box key={lh.key} pad={4} radius={2} style={{ background: '#f9fafb' }}>
            <Column gap={2}>
              <Row gap={2} align="baseline">
                <Text weight="bold" mono size={1}>
                  --st-leading-{lh.key}
                </Text>
                <Text size={0} mono tone="muted">
                  {lh.value}
                </Text>
              </Row>
              <Text size={0} tone="muted" style={{ marginBottom: '8px' }}>
                {lh.usage}
              </Text>
              <Text leading={lh.key as any}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris.
              </Text>
            </Column>
          </Box>
        ))}
      </Column>
    </Column>
  ),
}

// Typography hierarchy
export const TypographyHierarchy: Story = {
  render: () => (
    <Column gap={6} maxWidth="prose">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Typography Hierarchy
        </Text>
        <Text tone="muted">
          Recommended pairings for clear content hierarchy.
        </Text>
      </Column>

      <Box pad={6} radius={2} shadow={1} style={{ background: 'white' }}>
        <Column gap={6}>
          {/* H1 + Subtitle */}
          <Column gap={1}>
            <Text as="h1" size={6} weight="bold">
              Page Title (size=6, bold)
            </Text>
            <Text size={2} tone="muted">
              Subtitle or tagline (size=2, muted)
            </Text>
          </Column>

          {/* H2 + Meta */}
          <Column gap={2}>
            <Text as="h2" size={5} weight="bold">
              Section Heading (size=5, bold)
            </Text>
            <Text size={1} tone="muted">
              Metadata or description (size=1, muted)
            </Text>
          </Column>

          {/* H3 + Body */}
          <Column gap={2}>
            <Text as="h3" size={4} weight="semibold">
              Subsection (size=4, semibold)
            </Text>
            <Text size={2} leading="relaxed">
              Body paragraph (size=2, leading=relaxed). This is the default readable text size
              for longer content. Use relaxed leading for better readability in articles.
            </Text>
          </Column>

          {/* Label + Value */}
          <Column gap={1}>
            <Text as="label" size={1} weight="semibold">
              Field Label (size=1, semibold)
            </Text>
            <Text size={2}>Field value or input (size=2)</Text>
          </Column>

          {/* Caption */}
          <Text size={0} tone="muted">
            Caption or helper text (size=0, muted)
          </Text>
        </Column>
      </Box>
    </Column>
  ),
}

// Text combinations
export const TextCombinations: Story = {
  render: () => (
    <Column gap={6} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Common Text Patterns
        </Text>
        <Text tone="muted">
          Pre-configured combinations for common use cases.
        </Text>
      </Column>

      <Column gap={4}>
        {/* Hero text */}
        <Box pad={6} radius={2} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Column gap={3} align="center">
            <Text as="h1" size={6} weight="bold" align="center">
              Hero Heading
            </Text>
            <Text size={3} align="center" style={{ maxWidth: '600px' }}>
              Large, centered subtitle for landing pages. size=3 provides excellent readability.
            </Text>
          </Column>
        </Box>

        {/* Card header */}
        <Box pad={5} radius={2} shadow={1} style={{ background: 'white' }}>
          <Column gap={4}>
            <Column gap={1}>
              <Row justify="between" align="center">
                <Text as="h3" size={4} weight="bold">
                  Card Header
                </Text>
                <Text size={1} tone="muted">
                  Meta info
                </Text>
              </Row>
              <Text size={1} tone="muted">
                Supporting description or context
              </Text>
            </Column>
            <Text size={2} leading="relaxed">
              Card body content with comfortable reading text.
            </Text>
          </Column>
        </Box>

        {/* Data display */}
        <Box pad={5} radius={2} shadow={1} style={{ background: 'white' }}>
          <Column gap={3}>
            <Text size={1} tone="muted">
              TOTAL REVENUE
            </Text>
            <Text size={6} weight="bold">
              $124,531
            </Text>
            <Text size={1} style={{ color: '#16a34a' }}>
              ↑ 12.5% from last month
            </Text>
          </Column>
        </Box>

        {/* Form field */}
        <Box pad={4} radius={2} style={{ background: '#f9fafb' }}>
          <Column gap={2}>
            <Text as="label" size={1} weight="semibold">
              Email Address
            </Text>
            <input
              type="email"
              placeholder="you@example.com"
              style={{
                padding: '10px',
                fontSize: '16px',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
              }}
            />
            <Text size={0} tone="muted">
              We'll never share your email with anyone else.
            </Text>
          </Column>
        </Box>

        {/* Alert/notification */}
        <Box pad={4} radius={2} style={{ background: '#dbeafe', borderLeft: '4px solid #3b82f6' }}>
          <Column gap={1}>
            <Text size={2} weight="semibold">
              Information
            </Text>
            <Text size={1}>
              This is an informational message with a clear title and supporting text.
            </Text>
          </Column>
        </Box>
      </Column>
    </Column>
  ),
}

// Monospace text
export const MonospaceText: Story = {
  render: () => (
    <Column gap={6} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Monospace Typography
        </Text>
        <Text tone="muted">
          For code, technical content, and tabular data.
        </Text>
      </Column>

      <Column gap={4}>
        {/* Code block */}
        <Box pad={4} radius={2} style={{ background: '#1f2937', color: '#f9fafb' }}>
          <Column gap={2}>
            <Text size={1} mono style={{ color: '#9ca3af' }}>
              // Function example
            </Text>
            <Text mono>
              function calculateTotal(items) {'{'}
            </Text>
            <Text mono style={{ paddingLeft: '20px' }}>
              return items.reduce((sum, item) =&gt; sum + item.price, 0);
            </Text>
            <Text mono>
              {'}'}
            </Text>
          </Column>
        </Box>

        {/* Inline code */}
        <Box pad={4} radius={2} shadow={1} style={{ background: 'white' }}>
          <Text leading="relaxed">
            Use the <Text as="code" mono style={{ background: '#f9fafb', padding: '2px 6px', borderRadius: '3px' }}>fontSize</Text> prop
            to control text size, or <Text as="code" mono style={{ background: '#f9fafb', padding: '2px 6px', borderRadius: '3px' }}>fontWeight</Text> for
            emphasis.
          </Text>
        </Box>

        {/* Terminal */}
        <Box pad={4} radius={2} style={{ background: '#000', color: '#0f0' }}>
          <Column gap={1}>
            <Text mono size={1}>
              $ npm install @staple-css/tokens
            </Text>
            <Text mono size={1}>
              $ npm run build
            </Text>
            <Text mono size={1}>
              ✓ Build successful
            </Text>
          </Column>
        </Box>

        {/* Tabular data */}
        <Box pad={4} radius={2} shadow={1} style={{ background: 'white' }}>
          <Column gap={1}>
            <Text mono size={1} weight="semibold">
              NAME          SIZE      MODIFIED
            </Text>
            <Text mono size={0} style={{ color: '#6b7280' }}>
              ────────────────────────────────
            </Text>
            <Text mono size={1}>
              tokens.css    12.4 KB   2025-01-26
            </Text>
            <Text mono size={1}>
              index.js      89.2 KB   2025-01-26
            </Text>
            <Text mono size={1}>
              config.json   2.1 KB    2025-01-25
            </Text>
          </Column>
        </Box>
      </Column>
    </Column>
  ),
}

// Responsive typography
export const ResponsiveTypography: Story = {
  render: () => (
    <Column gap={6} maxWidth="lg">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Responsive Typography
        </Text>
        <Text tone="muted">
          Font sizes adapt to screen size. Resize window to see changes.
        </Text>
      </Column>

      <Box pad={{ base: 4, md: 6 }} radius={2} shadow={1} style={{ background: 'white' }}>
        <Column gap={{ base: 3, md: 4 }}>
          <Text
            as="h1"
            size={{ base: 4, md: 5, lg: 6 }}
            weight="bold"
          >
            Responsive Heading
          </Text>

          <Text
            size={{ base: 1, md: 2 }}
            leading="relaxed"
          >
            This text scales up on larger screens. On mobile it's size=1, on tablets size=2.
            The padding and gap also adjust for optimal reading experience at each breakpoint.
          </Text>

          <Column gap={1} style={{ background: '#f9fafb', padding: '12px', borderRadius: '4px' }}>
            <Text size={0} mono>heading: base=4, md=5, lg=6</Text>
            <Text size={0} mono>body: base=1, md=2</Text>
            <Text size={0} mono>padding: base=4, md=6</Text>
          </Column>
        </Column>
      </Box>
    </Column>
  ),
}

// Accessibility
export const AccessibleTypography: Story = {
  render: () => (
    <Column gap={6} maxWidth="prose">
      <Column gap={2}>
        <Text as="h2" size={4} weight="bold">
          Accessible Typography
        </Text>
        <Text tone="muted">
          Best practices for readable, accessible text.
        </Text>
      </Column>

      <Column gap={4}>
        {/* Good contrast */}
        <Box pad={5} radius={2} shadow={1} style={{ background: 'white' }}>
          <Column gap={3}>
            <Row gap={2} align="center">
              <Text size={3}>✓</Text>
              <Text weight="bold">Good Contrast</Text>
            </Row>
            <Text leading="relaxed">
              Body text uses high contrast ratios (WCAG AA minimum 4.5:1). This ensures
              readability for all users, including those with low vision.
            </Text>
            <Text size={1} tone="muted">
              Muted text maintains at least 3:1 contrast for secondary content.
            </Text>
          </Column>
        </Box>

        {/* Readable line length */}
        <Box pad={5} radius={2} shadow={1} style={{ background: 'white' }}>
          <Column gap={3}>
            <Row gap={2} align="center">
              <Text size={3}>✓</Text>
              <Text weight="bold">Optimal Line Length</Text>
            </Row>
            <Text leading="relaxed" style={{ maxWidth: '65ch' }}>
              Text is constrained to 65 characters per line (use Container size="prose").
              This prevents eye strain and maintains comfortable reading flow. Lines that are
              too long make it difficult to track from the end of one line to the start of the next.
            </Text>
          </Column>
        </Box>

        {/* Generous line height */}
        <Box pad={5} radius={2} shadow={1} style={{ background: 'white' }}>
          <Column gap={3}>
            <Row gap={2} align="center">
              <Text size={3}>✓</Text>
              <Text weight="bold">Comfortable Leading</Text>
            </Row>
            <Text leading="relaxed">
              Body text uses leading="relaxed" (1.75) for long-form content. This provides
              enough vertical space between lines to prevent text from feeling cramped while
              maintaining visual cohesion.
            </Text>
            <Text leading="relaxed">
              Headings can use leading="tight" (1.25) since they're typically short and
              need to feel more compact for visual impact.
            </Text>
          </Column>
        </Box>

        {/* Semantic HTML */}
        <Box pad={5} radius={2} shadow={1} style={{ background: 'white' }}>
          <Column gap={3}>
            <Row gap={2} align="center">
              <Text size={3}>✓</Text>
              <Text weight="bold">Semantic HTML</Text>
            </Row>
            <Text leading="relaxed">
              Always use the <Text mono style={{ background: '#f9fafb', padding: '2px 6px', borderRadius: '3px' }}>as</Text> prop
              to render correct HTML elements:
            </Text>
            <Column gap={1} style={{ background: '#f9fafb', padding: '12px', borderRadius: '4px' }}>
              <Text mono size={1}>&lt;Text as="h1"&gt;Page Title&lt;/Text&gt;</Text>
              <Text mono size={1}>&lt;Text as="p"&gt;Paragraph&lt;/Text&gt;</Text>
              <Text mono size={1}>&lt;Text as="label"&gt;Form Label&lt;/Text&gt;</Text>
            </Column>
          </Column>
        </Box>
      </Column>
    </Column>
  ),
}
