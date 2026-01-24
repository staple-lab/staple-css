/**
 * Prompts Page (Tokens Studio)
 *
 * LLM prompts for generating design tokens.
 */

import { useState, useCallback } from "react";
import { Container, Stack, Text, Inline, Card } from "@staple-css/primitives";
import { Link } from "react-router-dom";

type PromptCategory = "colors" | "spacing" | "typography" | "components" | "full-system";

interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
}

const prompts: Record<PromptCategory, Prompt[]> = {
  colors: [
    {
      id: "color-palette",
      title: "Generate Color Palette",
      description: "Create a complete color palette from a primary brand color",
      content: `Generate a design token color palette based on this primary brand color: [PRIMARY_COLOR]

Requirements:
- Create 12-step ramps for: primary, neutral, success, warning, danger
- Use OKLCH color space for perceptual uniformity
- Ensure WCAG AA contrast ratios for text on backgrounds
- Provide both light and dark mode variants

Output format:
\`\`\`json
{
  "colors": {
    "light": {
      "background": "#...",
      "surface": "#...",
      "text": "#...",
      "primary": "#...",
      ...
    },
    "dark": { ... }
  }
}
\`\`\``,
    },
    {
      id: "semantic-colors",
      title: "Semantic Color Mapping",
      description: "Map palette steps to semantic token names",
      content: `Given this color palette:
[PASTE_PALETTE]

Create semantic color mappings for:
- Backgrounds (background, surface, surfaceRaised)
- Text (text, textMuted, textInverse)
- Borders (border, borderMuted)
- Interactive states (primary, primaryHover, primaryText)
- Status colors (success, warning, danger variants)
- Focus states

Ensure each semantic token references a palette step like:
{ "palette": "neutral", "step": 1 }`,
    },
  ],
  spacing: [
    {
      id: "space-scale",
      title: "Space Scale",
      description: "Generate a harmonious spacing scale",
      content: `Generate a 9-step spacing scale (0-8) for a design system.

Requirements:
- Use rem units for accessibility
- Follow a consistent ratio (e.g., 1.5x or golden ratio)
- Step 0 should be 0
- Step 4 should be around 1rem (16px)
- Step 8 should be around 4rem (64px)

Output format:
\`\`\`json
{
  "space": {
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    ...
  }
}
\`\`\``,
    },
    {
      id: "radius-scale",
      title: "Border Radius Scale",
      description: "Generate a border radius scale",
      content: `Generate a 5-step border radius scale (0-4) that complements this spacing scale:
[PASTE_SPACING]

Requirements:
- Step 0 = 0 (sharp corners)
- Steps should progress naturally
- Consider pill shapes for buttons at higher steps

Output format:
\`\`\`json
{
  "radius": {
    "0": "0",
    "1": "0.125rem",
    ...
  }
}
\`\`\``,
    },
  ],
  typography: [
    {
      id: "font-scale",
      title: "Font Size Scale",
      description: "Generate a typographic scale",
      content: `Generate a 7-step font size scale (0-6) for a design system.

Requirements:
- Use rem units
- Follow a type scale ratio (e.g., Major Third 1.25, Perfect Fourth 1.333)
- Step 2 should be the base size (1rem / 16px)
- Include sizes for captions (0), body (1-2), headings (3-6)

Output format:
\`\`\`json
{
  "fontSize": {
    "0": "0.75rem",
    "1": "0.875rem",
    "2": "1rem",
    ...
  }
}
\`\`\``,
    },
    {
      id: "font-weights",
      title: "Font Weights",
      description: "Define font weight tokens",
      content: `Define font weight tokens for a design system using this font family:
[FONT_FAMILY]

Include weights for:
- Normal body text
- Medium emphasis
- Semibold for subheadings
- Bold for headings

Output format:
\`\`\`json
{
  "fontWeight": {
    "normal": "400",
    "medium": "500",
    "semibold": "600",
    "bold": "700"
  }
}
\`\`\``,
    },
  ],
  components: [
    {
      id: "button-variants",
      title: "Button Variants",
      description: "Generate button component tokens",
      content: `Using this token system:
[PASTE_TOKENS]

Generate CSS custom properties for button variants:
- Primary (filled)
- Secondary (outline)
- Ghost (text only)
- Danger

Include states: default, hover, active, disabled, focus

Output format: CSS custom properties that reference the existing token system.`,
    },
    {
      id: "form-controls",
      title: "Form Control Tokens",
      description: "Generate input and form control tokens",
      content: `Using this token system:
[PASTE_TOKENS]

Generate tokens for form controls:
- Input fields (default, focus, error, disabled)
- Checkboxes and radios
- Select dropdowns
- Labels and help text

Consider density modes (comfortable vs compact).`,
    },
  ],
  "full-system": [
    {
      id: "complete-system",
      title: "Complete Token System",
      description: "Generate a full design token system from brand guidelines",
      content: `Create a complete design token system based on these brand guidelines:

Brand Color: [PRIMARY_COLOR]
Brand Font: [FONT_FAMILY]
Style: [MODERN/CLASSIC/PLAYFUL/CORPORATE]

Generate:
1. Color palette with 12-step ramps (primary, neutral, success, warning, danger)
2. Semantic color mappings for light and dark modes
3. Space scale (9 steps, 0-8)
4. Border radius scale (5 steps, 0-4)
5. Shadow scale (3 steps, 0-2)
6. Typography (font sizes, line heights, weights)
7. Motion (durations, easings)
8. Density variants (comfortable, compact)

Output as a complete JSON configuration that can be used with staple-css.`,
    },
  ],
};

const categoryLabels: Record<PromptCategory, string> = {
  colors: "Colors",
  spacing: "Spacing & Layout",
  typography: "Typography",
  components: "Components",
  "full-system": "Full System",
};

export function PromptsPage() {
  const [activeCategory, setActiveCategory] = useState<PromptCategory>("colors");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = useCallback((id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
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
          </Text>
        </Stack>

        {/* Navigation */}
        <Card pad={3} radius={2}>
          <Inline gap={2} align="center" justify="between" wrap>
            <Inline gap={2}>
              <Link to="/tokens-studio" className="studio-btn">
                ← Builder
              </Link>
              <Link to="/tokens-studio/preview" className="studio-btn">
                Preview
              </Link>
              <Link to="/tokens-studio/config" className="studio-btn">
                Config
              </Link>
            </Inline>
          </Inline>
        </Card>

        {/* Category Tabs */}
        <Inline gap={0} className="studio-tabs">
          {(Object.keys(prompts) as PromptCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`studio-tab ${activeCategory === category ? "studio-tab--active" : ""}`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </Inline>

        {/* Prompts Grid */}
        <Stack gap={4}>
          {prompts[activeCategory].map((prompt) => (
            <Card key={prompt.id} pad={4} radius={2}>
              <Stack gap={3}>
                <Inline gap={2} align="center" justify="between">
                  <Stack gap={1}>
                    <Text weight="semibold">{prompt.title}</Text>
                    <Text size={1} tone="muted">
                      {prompt.description}
                    </Text>
                  </Stack>
                  <button
                    onClick={() => copyToClipboard(prompt.id, prompt.content)}
                    className={`studio-btn ${copiedId === prompt.id ? "studio-btn--success" : ""}`}
                  >
                    {copiedId === prompt.id ? "Copied!" : "Copy"}
                  </button>
                </Inline>
                <pre className="prompt-content">{prompt.content}</pre>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
