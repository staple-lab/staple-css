import { useState, useCallback } from "react";
import { Container, Stack, Text, Inline, Card, Box } from "@staple-css/primitives";

interface Prompt {
  id: string;
  title: string;
  description: string;
  category: "colors" | "tokens" | "themes" | "components" | "a11y";
  prompt: string;
}

const prompts: Prompt[] = [
  // Color Prompts
  {
    id: "brand-colors",
    title: "Generate Brand Color Palette",
    description: "Create a complete color system from a single brand color",
    category: "colors",
    prompt: `Generate a design token color palette for a web application based on this primary brand color: #2563eb

Requirements:
1. Create a 12-step scale (1-12) where:
   - Steps 1-2 are very light backgrounds
   - Steps 3-5 are interactive backgrounds (hover, pressed states)
   - Steps 6-8 are for borders
   - Step 9 is the main brand color
   - Step 10 is for hover states of solid buttons
   - Steps 11-12 are for text on light backgrounds

2. Generate both solid and alpha (transparent) variants
3. Ensure WCAG 2.1 AA contrast for text colors
4. Output as CSS custom properties with --brand- prefix

Use OKLCH color space for perceptually uniform interpolation.`,
  },
  {
    id: "semantic-colors",
    title: "Create Semantic Color System",
    description: "Generate semantic colors for light and dark themes",
    category: "colors",
    prompt: `Create a semantic color token system for a React application with light and dark themes.

Include these semantic color tokens:
- background, surface, surfaceRaised (for layered content)
- text, textMuted, textInverse
- border, borderMuted
- primary, primaryHover, primaryText
- danger, dangerHover, dangerText, dangerSurface
- warn, warnHover, warnText, warnSurface
- success, successHover, successText, successSurface
- focus, focusRing

Requirements:
1. Use hex colors (e.g., #ffffff)
2. Ensure all text/background combinations meet WCAG 2.1 AA
3. Dark theme should not just be inverted - it should be designed
4. Surface colors should have subtle elevation hierarchy
5. Output as CSS with [data-theme="light"] and [data-theme="dark"] selectors

Base the palette on primary: #2563eb (blue), danger: #dc2626 (red), warn: #d97706 (orange), success: #16a34a (green).`,
  },
  {
    id: "color-from-image",
    title: "Extract Colors from Image/Brand",
    description: "Generate a color palette based on brand guidelines or image",
    category: "colors",
    prompt: `I have a brand with the following characteristics:
- Primary brand color: [INSERT HEX]
- Industry: [INSERT INDUSTRY]
- Brand personality: [professional/playful/minimal/bold]
- Target audience: [describe]

Generate a complete color system including:
1. Primary palette (12 steps)
2. Neutral/gray palette (12 steps)
3. Semantic colors (success, warning, error)
4. Surface/background hierarchy

Output as staple-css compatible tokens with:
- CSS custom properties
- Light and dark theme variants
- OKLCH intermediate values for documentation`,
  },

  // Token System Prompts
  {
    id: "space-scale",
    title: "Generate Space Scale",
    description: "Create a consistent spacing system",
    category: "tokens",
    prompt: `Generate a spacing scale (space tokens) for a design system.

Requirements:
1. 9-step scale (0-8) following this pattern:
   - 0: 0 (no spacing)
   - 1-3: Small increments for tight UI
   - 4: Base unit (comfortable default)
   - 5-8: Larger values for sections and layouts

2. Use rem units for accessibility (user font-size preferences)
3. Base unit should be 1rem (16px default)
4. Each step should have a clear use case

Example output format:
--st-space-0: 0;
--st-space-1: 0.25rem;  /* 4px - tight padding */
...

Also provide usage guidelines for each step.`,
  },
  {
    id: "type-scale",
    title: "Create Typography Scale",
    description: "Generate a modular type scale with line heights",
    category: "tokens",
    prompt: `Create a typography scale for a web application.

Requirements:
1. Font size scale (0-6) using a modular ratio (suggest 1.25 or 1.333)
2. Base size of 1rem (16px)
3. Use rem units for accessibility
4. Include complementary line-height tokens:
   - tight (1.25) for headings
   - normal (1.5) for body text
   - relaxed (1.75) for long-form content

5. Include font-weight tokens:
   - normal (400)
   - medium (500)
   - semibold (600)
   - bold (700)

Output as CSS custom properties with clear comments explaining when to use each step.
Also provide a type pairing recommendation (e.g., which sizes work for h1, h2, body, caption).`,
  },
  {
    id: "radius-shadow",
    title: "Border Radius & Shadow System",
    description: "Create consistent radius and elevation tokens",
    category: "tokens",
    prompt: `Generate border radius and shadow/elevation tokens for a modern web application.

Border Radius Requirements:
1. 5-step scale (0-4)
2. 0 = square, 4 = very rounded (pill-like for buttons)
3. Use rem or px units
4. Consider: square → subtle → default → rounded → pill

Shadow Requirements:
1. 3-step scale (0-2) for elevation hierarchy
2. 0 = no shadow (flat)
3. 1 = subtle elevation (cards, dropdowns)
4. 2 = high elevation (modals, popovers)
5. Use realistic shadows with multiple layers
6. Consider dark mode (shadows work differently)

Output as CSS custom properties. Include usage guidelines.`,
  },

  // Theme Prompts
  {
    id: "dark-theme",
    title: "Convert Light Theme to Dark",
    description: "Generate accessible dark mode colors from light theme",
    category: "themes",
    prompt: `Convert this light theme to an accessible dark theme:

Light Theme:
- background: #ffffff
- surface: #f9fafb
- text: #111827
- textMuted: #6b7280
- primary: #2563eb
- border: #e5e7eb

Requirements:
1. Don't just invert colors - design for dark mode
2. Maintain semantic meaning (primary stays recognizable)
3. Reduce overall contrast slightly for eye comfort
4. Ensure WCAG AA contrast for all text
5. Surface colors should create subtle layering
6. Saturate colors slightly for dark backgrounds

Output as CSS with [data-theme="dark"] selector.
Include contrast ratios for text/background combinations.`,
  },
  {
    id: "density-tokens",
    title: "Create Density Variants",
    description: "Generate comfortable and compact UI density tokens",
    category: "themes",
    prompt: `Create density tokens for comfortable and compact UI modes.

Comfortable (Default):
- controlHeight: 2.5rem (40px)
- Generous padding
- Standard touch targets

Compact:
- controlHeight: 2rem (32px)
- Tighter padding
- Suitable for data-dense interfaces

Include these tokens for both densities:
- controlHeight (button/input height)
- controlPaddingX, controlPaddingY
- cardPadding
- stackGap (vertical spacing)
- inlineGap (horizontal spacing)

Output as CSS with [data-density="comfortable"] and [data-density="compact"] selectors.
Both should maintain usability and touch target requirements.`,
  },

  // Component Token Prompts
  {
    id: "button-tokens",
    title: "Button Component Tokens",
    description: "Generate tokens for a button component system",
    category: "components",
    prompt: `Design tokens for a button component with variants.

Variants needed:
1. Primary (solid, brand color)
2. Secondary (outline)
3. Ghost (minimal, text-only)
4. Danger (destructive actions)

States for each:
- Default, Hover, Active, Focus, Disabled

Token structure:
--st-btn-{variant}-{property}
--st-btn-{variant}-{property}-{state}

Properties:
- bg, text, border
- focus-ring
- opacity (for disabled)

Use existing semantic color tokens where possible.
Output should be composable and maintainable.`,
  },
  {
    id: "form-tokens",
    title: "Form Component Tokens",
    description: "Create tokens for inputs, selects, and form elements",
    category: "components",
    prompt: `Generate design tokens for form components.

Components to cover:
1. Text input
2. Select/dropdown
3. Checkbox
4. Radio button
5. Toggle/switch
6. Textarea

Tokens needed:
- Background, border, text colors
- Focus ring style
- Placeholder color
- Disabled state styling
- Error state colors
- Height (should match density tokens)

Requirements:
1. Consistent visual language across all inputs
2. Clear focus states for accessibility
3. Error states must be distinguishable (not just color)
4. Work in both light and dark themes

Output as CSS custom properties with semantic naming.`,
  },

  // Accessibility Prompts
  {
    id: "a11y-audit",
    title: "Accessibility Color Audit",
    description: "Check color combinations for WCAG compliance",
    category: "a11y",
    prompt: `Audit these color combinations for WCAG 2.1 compliance:

Text on backgrounds:
1. #111827 on #ffffff (dark text on light bg)
2. #f9fafb on #111827 (light text on dark bg)
3. #ffffff on #2563eb (button text)
4. #6b7280 on #ffffff (muted text)
5. #dc2626 on #fef2f2 (error text on error bg)

For each combination:
1. Calculate WCAG contrast ratio
2. Determine AA/AAA compliance for normal and large text
3. If failing, suggest the minimum adjustment needed
4. Calculate APCA Lightness Contrast (Lc) for reference

Output format:
- Original colors
- Contrast ratio
- WCAG rating (AA/AAA for normal/large)
- APCA Lc value
- Suggested fix if needed`,
  },
  {
    id: "focus-states",
    title: "Design Focus States",
    description: "Create accessible focus indicators for interactive elements",
    category: "a11y",
    prompt: `Design focus indicator tokens that meet WCAG 2.2 requirements.

Requirements (WCAG 2.2 Focus Appearance):
1. Focus indicator must have contrast ratio of 3:1 against adjacent colors
2. Must be at least 2px thick
3. Should not rely solely on color change

Design focus tokens for:
1. Light theme (on white/light backgrounds)
2. Dark theme (on dark backgrounds)
3. On primary color buttons
4. On transparent/ghost elements

Suggested approach:
- Use a visible outline with offset
- Double-ring pattern (inner white, outer brand color)
- box-shadow based focus ring

Output as CSS custom properties:
--st-focus-ring: [value];
--st-focus-ring-offset: [value];

Include example CSS for applying focus styles.`,
  },
];

const categories = [
  { id: "colors", label: "Colors", description: "Color palette and theme generation" },
  { id: "tokens", label: "Tokens", description: "Spacing, typography, and scale systems" },
  { id: "themes", label: "Themes", description: "Light/dark mode and density variants" },
  { id: "components", label: "Components", description: "Component-specific token design" },
  { id: "a11y", label: "Accessibility", description: "WCAG compliance and focus states" },
] as const;

export function PromptsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("colors");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPrompts = prompts.filter((p) => p.category === activeCategory);

  const copyPrompt = useCallback(async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.prompt);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  return (
    <Container size="xl">
      <Stack gap={6}>
        {/* Header */}
        <Stack gap={2}>
          <Text as="h1" size={5} weight="bold">
            Design Token Prompts
          </Text>
          <Text tone="muted">
            Copy-ready prompts for generating design tokens with AI assistants.
            These prompts are optimized for Claude, ChatGPT, and other LLMs.
          </Text>
        </Stack>

        {/* Info Card */}
        <Card pad={4} radius={2} tone="primary">
          <Stack gap={2}>
            <Text weight="semibold">How to use these prompts</Text>
            <Text size={1}>
              1. Click "Copy" on any prompt below to copy it to your clipboard.
              2. Paste into your favorite AI assistant (Claude, ChatGPT, etc.).
              3. Modify the placeholder values [like this] with your specific requirements.
              4. Review and validate the generated output.
              5. Import into your token configuration or use directly.
            </Text>
          </Stack>
        </Card>

        {/* Category Tabs */}
        <Inline gap={0} className="studio-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`studio-tab ${activeCategory === cat.id ? "studio-tab--active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </Inline>

        {/* Category Description */}
        {categories.find((c) => c.id === activeCategory) && (
          <Text tone="muted">
            {categories.find((c) => c.id === activeCategory)?.description}
          </Text>
        )}

        {/* Prompts List */}
        <Stack gap={4}>
          {filteredPrompts.map((prompt) => (
            <Card key={prompt.id} pad={0} radius={2}>
              <Stack gap={0}>
                <Box
                  pad={4}
                  className="prompt-header"
                  style={{ borderBottom: "1px solid var(--st-color-border)" }}
                >
                  <Inline gap={2} align="start" justify="between">
                    <Stack gap={1}>
                      <Text weight="semibold">{prompt.title}</Text>
                      <Text size={1} tone="muted">
                        {prompt.description}
                      </Text>
                    </Stack>
                    <button
                      onClick={() => copyPrompt(prompt)}
                      className={`studio-btn ${copiedId === prompt.id ? "studio-btn--success" : "studio-btn--primary"}`}
                    >
                      {copiedId === prompt.id ? "Copied!" : "Copy"}
                    </button>
                  </Inline>
                </Box>
                <pre className="prompt-content">{prompt.prompt}</pre>
              </Stack>
            </Card>
          ))}
        </Stack>

        {/* Custom Prompt Builder */}
        <Card pad={4} radius={2}>
          <Stack gap={4}>
            <Text as="h3" size={2} weight="semibold">
              Build Your Own Prompt
            </Text>
            <Text size={1} tone="muted">
              Combine these elements for custom token generation prompts:
            </Text>
            <div className="prompt-builder-grid">
              <PromptElement
                title="Output Format"
                options={[
                  "CSS custom properties",
                  "JSON object",
                  "TypeScript const",
                  "Tailwind config",
                ]}
              />
              <PromptElement
                title="Color Space"
                options={[
                  "OKLCH (perceptual uniformity)",
                  "HSL (intuitive)",
                  "RGB/Hex (direct)",
                ]}
              />
              <PromptElement
                title="Scale Type"
                options={[
                  "Linear (equal steps)",
                  "Modular (ratio-based)",
                  "Custom (semantic)",
                ]}
              />
              <PromptElement
                title="Accessibility"
                options={[
                  "WCAG 2.1 AA",
                  "WCAG 2.1 AAA",
                  "APCA (WCAG 3 draft)",
                ]}
              />
            </div>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}

function PromptElement({ title, options }: { title: string; options: string[] }) {
  return (
    <Stack gap={2}>
      <Text size={0} weight="medium">
        {title}
      </Text>
      <Stack gap={1}>
        {options.map((opt) => (
          <Text key={opt} size={0} mono tone="muted">
            • {opt}
          </Text>
        ))}
      </Stack>
    </Stack>
  );
}
