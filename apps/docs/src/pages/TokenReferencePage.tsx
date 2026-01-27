import { Container, Column, Row, Text, Card, Box, Grid } from "@staple-css/primitives/full";

export function TokenReferencePage() {
  return (
    <Container size="xl" style={{ paddingTop: "var(--st-space-8)", paddingBottom: "var(--st-space-8)" }}>
      <Column gap={8}>
        {/* Header */}
        <Column gap={4}>
          <Text as="h1" size={5} weight="bold">
            Complete Token Reference
          </Text>
          <Text size={2} tone="muted">
            Comprehensive documentation of every token in the staple-css system. Look up exact
            values, use cases, and implementation patterns.
          </Text>
        </Column>

        {/* Quick Navigation */}
        <Grid cols={{ base: 2, md: 4, lg: 6 }} gap={3}>
          {[
            "Spacing",
            "Sizing",
            "Radius",
            "Shadows",
            "Colors",
            "Typography",
            "Motion",
            "Gradients",
            "Breakpoints",
            "Z-Index",
            "Opacity",
            "Density",
          ].map((section) => (
            <a
              key={section}
              href={`#${section.toLowerCase()}`}
              style={{
                padding: "var(--st-space-3) var(--st-space-4)",
                borderRadius: "var(--st-radius-2)",
                background: "var(--st-color-surface)",
                border: "1px solid var(--st-color-border)",
                textDecoration: "none",
                color: "var(--st-color-primary)",
                fontWeight: "600",
                fontSize: "var(--st-font-size-0)",
                textAlign: "center",
                transition: "all var(--st-duration-fast) var(--st-easing-default)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--st-color-primary)";
                e.currentTarget.style.background = "var(--st-color-surface-raised)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--st-color-border)";
                e.currentTarget.style.background = "var(--st-color-surface)";
              }}
            >
              {section}
            </a>
          ))}
        </Grid>

        {/* Spacing Section */}
        <Section
          id="spacing"
          title="Spacing Scale (0-8)"
          description="9-step spacing scale for consistent layouts. Use for padding, margins, gaps, and whitespace."
          tokens={[
            { key: "space-0", value: "0", usage: "No spacing, collapsed" },
            { key: "space-1", value: "4px (0.25rem)", usage: "Minimal padding (form elements)" },
            { key: "space-2", value: "8px (0.5rem)", usage: "Small gap between elements" },
            { key: "space-3", value: "12px (0.75rem)", usage: "Standard internal padding" },
            { key: "space-4", value: "16px (1rem)", usage: "Primary padding size" },
            { key: "space-5", value: "24px (1.5rem)", usage: "Medium section spacing" },
            { key: "space-6", value: "32px (2rem)", usage: "Large section spacing" },
            { key: "space-7", value: "48px (3rem)", usage: "Extra large gaps" },
            { key: "space-8", value: "64px (4rem)", usage: "Major section breaks" },
          ]}
        />

        {/* Sizing Section */}
        <Section
          id="sizing"
          title="Max Width Scale"
          description="Container sizing for content layout. Use to constrain width at specific breakpoints."
          tokens={[
            { key: "max-w-xs", value: "320px", usage: "Narrow single-column" },
            { key: "max-w-sm", value: "384px", usage: "Small cards/forms" },
            { key: "max-w-md", value: "448px", usage: "Medium content width" },
            { key: "max-w-lg", value: "512px", usage: "Sidebar content" },
            { key: "max-w-xl", value: "576px", usage: "Article width" },
            { key: "max-w-2xl", value: "672px", usage: "Wide content" },
            { key: "max-w-3xl", value: "768px", usage: "Article max (preferred)" },
            { key: "max-w-prose", value: "65ch", usage: "Typography optimal line" },
            { key: "max-w-full", value: "100%", usage: "Full width (parent)" },
          ]}
        />

        {/* Radius Section */}
        <Section
          id="radius"
          title="Border Radius Scale (0-4)"
          description="4-step radius scale for consistency. Creates visual softness and approachability."
          tokens={[
            { key: "radius-0", value: "0px", usage: "Sharp corners (rare)" },
            { key: "radius-1", value: "2px", usage: "Subtle rounding (icons)" },
            { key: "radius-2", value: "4px", usage: "Button/input elements" },
            { key: "radius-3", value: "8px", usage: "Card/container default" },
            { key: "radius-4", value: "16px", usage: "Large, soft containers" },
          ]}
        />

        {/* Shadows Section */}
        <Section
          id="shadows"
          title="Elevation/Shadow System (0-5)"
          description="6-level elevation system for depth and visual hierarchy. Higher levels = more prominence."
          tokens={[
            { key: "shadow-0", value: "none", usage: "Flat, on-background" },
            { key: "shadow-1", value: "0 0.0625rem 0.125rem", usage: "Subtle lift" },
            { key: "shadow-2", value: "0 0.25rem 0.375rem", usage: "Card elevation" },
            { key: "shadow-3", value: "0 0.5rem 0.75rem", usage: "Dropdown/overlay" },
            { key: "shadow-4", value: "0 1rem 1.5rem", usage: "Modal elevation" },
            { key: "shadow-5", value: "0 1.5rem 2rem", usage: "Top-most layer" },
          ]}
        />

        {/* Typography Section */}
        <Section
          id="typography"
          title="Typography Scales"
          description="Carefully calibrated typography system for visual hierarchy and readability."
          tokens={[
            {
              category: "Font Sizes (0-6)",
              items: [
                { key: "font-size-0", value: "12px", usage: "Captions, metadata" },
                { key: "font-size-1", value: "14px", usage: "Secondary text" },
                { key: "font-size-2", value: "16px", usage: "Body text (base)" },
                { key: "font-size-3", value: "18px", usage: "Subheadings" },
                { key: "font-size-4", value: "20px", usage: "Section heading" },
                { key: "font-size-5", value: "24px", usage: "Major heading" },
                { key: "font-size-6", value: "32px", usage: "Page title" },
              ],
            },
            {
              category: "Font Weights",
              items: [
                { key: "normal", value: "400", usage: "Body, regular text" },
                { key: "medium", value: "500", usage: "Emphasis, labels" },
                { key: "semibold", value: "600", usage: "Headings, strong" },
                { key: "bold", value: "700", usage: "Very strong emphasis" },
              ],
            },
            {
              category: "Line Heights",
              items: [
                { key: "tight", value: "1.25", usage: "Headlines (compact)" },
                { key: "normal", value: "1.5", usage: "Body text (default)" },
                { key: "relaxed", value: "1.75", usage: "Long-form (comfortable)" },
              ],
            },
          ]}
        />

        {/* Motion Section */}
        <Section
          id="motion"
          title="Motion Tokens"
          description="Consistent timing and easing for smooth, purposeful animations."
          tokens={[
            {
              category: "Duration (ms)",
              items: [
                { key: "instant", value: "75ms", usage: "Micro-interactions" },
                { key: "fast", value: "150ms", usage: "Quick feedback" },
                { key: "normal", value: "200ms", usage: "Standard transitions" },
                { key: "moderate", value: "300ms", usage: "Noticeable transitions" },
                { key: "slow", value: "500ms", usage: "Deliberate animations" },
                { key: "slower", value: "700ms", usage: "Cinematic" },
                { key: "slowest", value: "1000ms", usage: "Very slow reveals" },
              ],
            },
            {
              category: "Easing Functions",
              items: [
                {
                  key: "default",
                  value: "cubic-bezier(0.4, 0, 0.2, 1)",
                  usage: "Standard smooth motion",
                },
                {
                  key: "in",
                  value: "cubic-bezier(0.4, 0, 1, 1)",
                  usage: "Accelerating entrance",
                },
                {
                  key: "out",
                  value: "cubic-bezier(0, 0, 0.2, 1)",
                  usage: "Decelerating exit",
                },
                {
                  key: "bounce",
                  value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                  usage: "Playful arrival",
                },
              ],
            },
          ]}
        />

        {/* Gradients Section */}
        <Section
          id="gradients"
          title="Gradient Tokens (22 total)"
          description="Pre-built, perceptually-smooth gradients for visual emphasis and design showcase."
          tokens={[
            {
              category: "Tone-Based Gradients (15)",
              items: [
                {
                  key: "primary-soft, primary-medium, primary-bold",
                  value: "Blue scale",
                  usage: "Brand gradients",
                },
                {
                  key: "success-soft, success-medium, success-bold",
                  value: "Green scale",
                  usage: "Positive feedback",
                },
                {
                  key: "danger-soft, danger-medium, danger-bold",
                  value: "Red scale",
                  usage: "Warnings/errors",
                },
                {
                  key: "warn-soft, warn-medium, warn-bold",
                  value: "Orange scale",
                  usage: "Cautions",
                },
              ],
            },
            {
              category: "Vibrant Multi-Color (6)",
              items: [
                { key: "sunrise", value: "Orange → Coral", usage: "Energetic hero" },
                { key: "sunset", value: "Orange → Pink", usage: "Warm showcase" },
                { key: "ocean", value: "Blue → Teal", usage: "Cool/tech feel" },
                { key: "forest", value: "Green scale", usage: "Natural/organic" },
                { key: "grape", value: "Purple → Pink", usage: "Creative/premium" },
                { key: "mint", value: "Teal → Cyan", usage: "Fresh/modern" },
              ],
            },
          ]}
        />

        {/* Breakpoints Section */}
        <Section
          id="breakpoints"
          title="Responsive Breakpoints"
          description="Mobile-first breakpoint system. Start with mobile styles, enhance larger screens."
          tokens={[
            { key: "base", value: "0px+", usage: "Mobile (default)" },
            { key: "sm", value: "640px+", usage: "Tablets" },
            { key: "md", value: "768px+", usage: "Small laptops" },
            { key: "lg", value: "1024px+", usage: "Laptops" },
            { key: "xl", value: "1280px+", usage: "Desktops" },
            { key: "2xl", value: "1536px+", usage: "Ultra-wide" },
          ]}
        />

        {/* Colors Section */}
        <Section
          id="colors"
          title="Semantic Colors"
          description="Intent-based colors that automatically adapt to light/dark themes."
          tokens={[
            {
              category: "Light Theme",
              items: [
                {
                  key: "color-primary",
                  value: "#2563eb",
                  usage: "Brand actions, links",
                },
                {
                  key: "color-danger",
                  value: "#dc2626",
                  usage: "Destructive actions",
                },
                {
                  key: "color-success",
                  value: "#16a34a",
                  usage: "Confirmations",
                },
                {
                  key: "color-text",
                  value: "#111827",
                  usage: "Primary text",
                },
              ],
            },
            {
              category: "Dark Theme (auto-adapted)",
              items: [
                {
                  key: "color-primary",
                  value: "#3b82f6",
                  usage: "Lighter for contrast",
                },
              ],
            },
          ]}
        />

        {/* Opacity Section */}
        <Section
          id="opacity"
          title="Opacity Scale"
          description="11-step opacity scale for transparency and layering effects."
          tokens={[
            { key: "opacity-0", value: "0%", usage: "Fully transparent" },
            { key: "opacity-25", value: "25%", usage: "Very faint" },
            { key: "opacity-50", value: "50%", usage: "Semi-transparent" },
            { key: "opacity-75", value: "75%", usage: "Mostly opaque" },
            { key: "opacity-100", value: "100%", usage: "Fully opaque" },
          ]}
        />

        {/* Z-Index Section */}
        <Section
          id="z-index"
          title="Z-Index Scale"
          description="Layering system for stacking contexts. Higher = more prominent."
          tokens={[
            { key: "z-0", value: "0", usage: "Default, same layer" },
            { key: "z-10", value: "10", usage: "Content layer" },
            { key: "z-20", value: "20", usage: "Overlay/dropdown" },
            { key: "z-30", value: "30", usage: "Modal layer" },
            { key: "z-40", value: "40", usage: "Tooltip/popover" },
            { key: "z-50", value: "50", usage: "Sticky header" },
            { key: "z-max", value: "9999", usage: "Emergency top" },
          ]}
        />

        {/* Density Section */}
        <Section
          id="density"
          title="Density Modes"
          description="Comfortable and compact modes for different contexts and user preferences."
          tokens={[
            {
              category: "Comfortable (default)",
              items: [
                {
                  key: "control-height",
                  value: "40px",
                  usage: "Touch-friendly buttons",
                },
                { key: "control-padding-x", value: "16px", usage: "Button padding" },
                {
                  key: "card-padding",
                  value: "24px",
                  usage: "Card internal spacing",
                },
                { key: "stack-gap", value: "16px", usage: "Vertical spacing" },
              ],
            },
            {
              category: "Compact",
              items: [
                {
                  key: "control-height",
                  value: "32px",
                  usage: "Smaller buttons",
                },
                { key: "control-padding-x", value: "12px", usage: "Tight padding" },
                { key: "card-padding", value: "16px", usage: "Compact spacing" },
                { key: "stack-gap", value: "12px", usage: "Reduced gap" },
              ],
            },
          ]}
        />
      </Column>
    </Container>
  );
}

interface SectionProps {
  id: string;
  title: string;
  description: string;
  tokens: Array<{
    key: string;
    value: string;
    usage: string;
    category?: string;
    items?: Array<{ key: string; value: string; usage: string }>;
  }>;
}

function Section({ id, title, description, tokens }: SectionProps) {
  return (
    <Column gap={4} id={id}>
      <Column gap={2}>
        <Text as="h2" size={3} weight="semibold">
          {title}
        </Text>
        <Text size={1} tone="muted">
          {description}
        </Text>
      </Column>

      <Column gap={3}>
        {tokens.map((token, idx) => (
          <div key={idx}>
            {token.category ? (
              <Column gap={2}>
                <Text weight="semibold" size={0} tone="muted">
                  {token.category}
                </Text>
                <Column gap={1}>
                  {token.items?.map((item) => (
                    <TokenRow key={item.key} token={item} />
                  ))}
                </Column>
              </Column>
            ) : (
              <TokenRow token={token} />
            )}
          </div>
        ))}
      </Column>
    </Column>
  );
}

function TokenRow({ token }: { token: any }) {
  return (
    <Box
      style={{
        display: "grid",
        gridTemplateColumns: "150px 200px 1fr",
        gap: "var(--st-space-4)",
        padding: "var(--st-space-3)",
        background: "var(--st-color-surface)",
        borderRadius: "var(--st-radius-2)",
        border: "1px solid var(--st-color-border)",
        alignItems: "center",
      }}
    >
      <Text weight="semibold" size={0} style={{ fontFamily: "var(--st-font-mono)" }}>
        {token.key}
      </Text>
      <Text size={0} style={{ fontFamily: "var(--st-font-mono)" }} tone="muted">
        {token.value}
      </Text>
      <Text size={0} tone="muted">
        {token.usage}
      </Text>
    </Box>
  );
}
