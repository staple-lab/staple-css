import { useState } from "react";
import { Column, Card, Text, Row, Box, Grid } from "@staple-css/primitives/full";

interface Example {
  id: string;
  title: string;
  category: "layout" | "form" | "card" | "gradient" | "interaction";
  description: string;
  code: string;
  component: React.ReactNode;
  features: string[];
}

const examples: Example[] = [
  {
    id: "responsive-grid",
    title: "Responsive Grid",
    category: "layout",
    description: "Auto-responsive grid using CSS Grid. Automatically adjusts columns based on viewport width.",
    code: `<Grid
  cols={{ base: 1, md: 2, lg: 3 }}
  gap={4}
>
  <Card pad={4} radius={2}>
    <Text>Item 1</Text>
  </Card>
  {/* ... */}
</Grid>`,
    component: (
      <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} pad={4} radius={2} shadow={1}>
            <Column gap={2} align="center">
              <Box
                style={{
                  width: "48px",
                  height: "48px",
                  background: "var(--st-gradient-primary-medium)",
                  borderRadius: "var(--st-radius-2)",
                }}
              />
              <Text align="center" size={0}>
                Item {i}
              </Text>
            </Column>
          </Card>
        ))}
      </Grid>
    ),
    features: ["Responsive", "Mobile-first", "Auto-fit"],
  },
  {
    id: "form-layout",
    title: "Form with Validation",
    category: "form",
    description: "Complete form layout with labels, inputs, and proper spacing using token system.",
    code: `<Column gap={4}>
  <Column gap={1}>
    <Text weight="medium">Email</Text>
    <input
      type="email"
      placeholder="you@example.com"
      style={{
        padding: "var(--st-space-2) var(--st-space-3)",
        borderRadius: "var(--st-radius-2)",
        border: "1px solid var(--st-color-border)"
      }}
    />
  </Column>
</Column>`,
    component: (
      <Column gap={4}>
        {[
          { label: "Email", type: "email", placeholder: "you@example.com" },
          { label: "Password", type: "password", placeholder: "••••••••" },
        ].map((field) => (
          <Column key={field.label} gap={1}>
            <Text weight="medium" size={0}>
              {field.label}
            </Text>
            <input
              type={field.type}
              placeholder={field.placeholder}
              style={{
                padding: "var(--st-space-2) var(--st-space-3)",
                borderRadius: "var(--st-radius-2)",
                border: "1px solid var(--st-color-border)",
                fontFamily: "var(--st-font-sans)",
                fontSize: "var(--st-font-size-1)",
                width: "100%",
                transition: "all var(--st-duration-fast) var(--st-easing-default)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--st-color-primary)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--st-color-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </Column>
        ))}
        <Row gap={3} justify="end">
          <button
            style={{
              padding: "var(--st-space-2) var(--st-space-4)",
              borderRadius: "var(--st-radius-2)",
              border: "1px solid var(--st-color-border)",
              background: "transparent",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "var(--st-font-size-0)",
              transition: "all var(--st-duration-fast) var(--st-easing-default)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--st-color-primary)";
              e.currentTarget.style.color = "var(--st-color-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--st-color-border)";
              e.currentTarget.style.color = "var(--st-color-text)";
            }}
          >
            Cancel
          </button>
          <button
            style={{
              padding: "var(--st-space-2) var(--st-space-4)",
              borderRadius: "var(--st-radius-2)",
              border: "none",
              background: "var(--st-color-primary)",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "var(--st-font-size-0)",
              transition: "all var(--st-duration-fast) var(--st-easing-default)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--st-shadow-2)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Submit
          </button>
        </Row>
      </Column>
    ),
    features: ["Accessible", "Responsive", "Focus states"],
  },
  {
    id: "gradient-showcase",
    title: "Gradient Backgrounds",
    category: "gradient",
    description: "Showcase of premium gradient tokens. Perfect for hero sections and visual emphasis.",
    code: `<Grid cols={{ base: 1, md: 2 }} gap={4}>
  <Box
    style={{
      background: "var(--st-gradient-sunrise)",
      borderRadius: "var(--st-radius-3)",
      height: "120px"
    }}
  />
  {/* More gradients... */}
</Grid>`,
    component: (
      <Grid cols={{ base: 1, md: 2 }} gap={4}>
        {["sunrise", "sunset", "ocean", "forest"].map((grad) => (
          <Box
            key={grad}
            style={{
              background: `var(--st-gradient-${grad})`,
              borderRadius: "var(--st-radius-3)",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all var(--st-duration-fast) var(--st-easing-default)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "var(--st-shadow-3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Text weight="semibold" style={{ color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
              {grad}
            </Text>
          </Box>
        ))}
      </Grid>
    ),
    features: ["22 gradients", "Perceptually-smooth", "Theme-aware"],
  },
  {
    id: "card-hierarchy",
    title: "Card Elevation System",
    category: "card",
    description: "Six elevation levels create visual hierarchy. Each shadow level represents depth.",
    code: `<Grid cols={{ base: 2, md: 3 }} gap={4}>
  {[0, 1, 2, 3, 4, 5].map(i => (
    <Card key={i} shadow={i}>
      <Text>Level {i}</Text>
    </Card>
  ))}
</Grid>`,
    component: (
      <Grid cols={{ base: 2, md: 3 }} gap={4}>
        {[0, 1, 2, 3, 4, 5].map((level) => (
          <Card key={level} pad={4} radius={2} shadow={level as any}>
            <Column gap={2} align="center">
              <Text size={0} weight="semibold">
                Level {level}
              </Text>
              <Text size={0} tone="muted" style={{ fontFamily: "var(--st-font-mono)" }}>
                shadow-{level}
              </Text>
            </Column>
          </Card>
        ))}
      </Grid>
    ),
    features: ["Elevation", "Depth", "Visual hierarchy"],
  },
  {
    id: "interactive-buttons",
    title: "Interactive Button States",
    category: "interaction",
    description: "Complete button pattern with hover, active, focus, and disabled states.",
    code: `<Row gap={3}>
  <button className="btn-primary">Submit</button>
  <button className="btn-secondary">Cancel</button>
  <button disabled>Disabled</button>
</Row>`,
    component: (
      <Column gap={4}>
        <Row gap={3} align="center" justify="center">
          {["Primary", "Secondary", "Danger"].map((variant) => (
            <button
              key={variant}
              style={{
                padding: "var(--st-space-2) var(--st-space-5)",
                borderRadius: "var(--st-radius-2)",
                border:
                  variant === "Secondary"
                    ? "2px solid var(--st-color-primary)"
                    : variant === "Danger"
                      ? "2px solid var(--st-color-danger)"
                      : "none",
                background:
                  variant === "Secondary"
                    ? "transparent"
                    : variant === "Danger"
                      ? "var(--st-color-danger)"
                      : "var(--st-color-primary)",
                color:
                  variant === "Secondary" ? "var(--st-color-primary)" : "white",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "var(--st-font-size-0)",
                transition: "all var(--st-duration-fast) var(--st-easing-default)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "var(--st-shadow-2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = "2px solid var(--st-color-primary)";
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              {variant}
            </button>
          ))}
        </Row>
        <Row gap={3} align="center" justify="center">
          <button disabled style={{ opacity: 0.5, cursor: "not-allowed", padding: "var(--st-space-2) var(--st-space-5)" }}>
            Disabled
          </button>
          <Text size={0} tone="muted">
            Tab to test focus states
          </Text>
        </Row>
      </Column>
    ),
    features: ["Focus states", "Hover effects", "Accessible"],
  },
];

export function InteractivePlaygroundPro() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCode, setShowCode] = useState(false);

  const currentExample = examples[selectedIndex];

  return (
    <Column gap={0} style={{ borderRadius: "var(--st-radius-3)", overflow: "hidden", boxShadow: "var(--st-shadow-2)" }}>
      {/* Header */}
      <Box
        style={{
          background: "var(--st-color-surface-raised)",
          borderBottom: "1px solid var(--st-color-border)",
          padding: "var(--st-space-4) var(--st-space-6)",
        }}
      >
        <Row gap={4} align="center" justify="between">
          <Column gap={1}>
            <Text weight="bold" size={2}>
              Interactive Playground
            </Text>
            <Text size={0} tone="muted">
              Explore components with live code preview
            </Text>
          </Column>
          <Row gap={2}>
            <button
              onClick={() => setShowCode(false)}
              style={{
                padding: "var(--st-space-2) var(--st-space-4)",
                borderRadius: "var(--st-radius-1)",
                border: !showCode ? "2px solid var(--st-color-primary)" : "1px solid var(--st-color-border)",
                background: !showCode ? "var(--st-color-primary)" : "transparent",
                color: !showCode ? "white" : "var(--st-color-text)",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "var(--st-font-size-0)",
                transition: "all var(--st-duration-fast) var(--st-easing-default)",
              }}
            >
              👁️ Preview
            </button>
            <button
              onClick={() => setShowCode(true)}
              style={{
                padding: "var(--st-space-2) var(--st-space-4)",
                borderRadius: "var(--st-radius-1)",
                border: showCode ? "2px solid var(--st-color-primary)" : "1px solid var(--st-color-border)",
                background: showCode ? "var(--st-color-primary)" : "transparent",
                color: showCode ? "white" : "var(--st-color-text)",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "var(--st-font-size-0)",
                transition: "all var(--st-duration-fast) var(--st-easing-default)",
              }}
            >
              {"{}"} Code
            </button>
          </Row>
        </Row>
      </Box>

      {/* Example Tabs */}
      <Box
        style={{
          borderBottom: "1px solid var(--st-color-border)",
          overflowX: "auto",
          background: "var(--st-color-surface)",
        }}
      >
        <Row gap={0}>
          {examples.map((example, index) => (
            <button
              key={example.id}
              onClick={() => {
                setSelectedIndex(index);
                setShowCode(false);
              }}
              style={{
                padding: "var(--st-space-3) var(--st-space-4)",
                background: selectedIndex === index ? "white" : "transparent",
                border: "none",
                borderBottom:
                  selectedIndex === index ? "3px solid var(--st-color-primary)" : "3px solid transparent",
                cursor: "pointer",
                fontSize: "var(--st-font-size-0)",
                fontWeight: selectedIndex === index ? "600" : "500",
                color: selectedIndex === index ? "var(--st-color-text)" : "var(--st-color-text-muted)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                transition: "all var(--st-duration-fast) var(--st-easing-default)",
              }}
              onMouseEnter={(e) => {
                if (selectedIndex !== index) {
                  e.currentTarget.style.color = "var(--st-color-text)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedIndex !== index) {
                  e.currentTarget.style.color = "var(--st-color-text-muted)";
                }
              }}
            >
              {example.title}
            </button>
          ))}
        </Row>
      </Box>

      {/* Description & Features */}
      <Box
        style={{
          background: "var(--st-color-surface)",
          padding: "var(--st-space-4) var(--st-space-6)",
          borderBottom: "1px solid var(--st-color-border)",
        }}
      >
        <Column gap={2}>
          <Text size={1} tone="muted">
            {currentExample.description}
          </Text>
          <Row gap={2}>
            {currentExample.features.map((feature) => (
              <Box
                key={feature}
                style={{
                  display: "inline-block",
                  padding: "var(--st-space-1) var(--st-space-2)",
                  background: "var(--st-color-primary)",
                  color: "white",
                  borderRadius: "var(--st-radius-1)",
                  fontSize: "var(--st-font-size-0)",
                  fontWeight: "600",
                }}
              >
                {feature}
              </Box>
            ))}
          </Row>
        </Column>
      </Box>

      {/* Content Area */}
      <Box
        style={{
          padding: "var(--st-space-8)",
          minHeight: "400px",
          background: showCode ? "var(--st-color-surface)" : "var(--st-color-background)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {showCode ? (
          <pre
            style={{
              background: "var(--st-color-surface)",
              padding: "var(--st-space-4)",
              borderRadius: "var(--st-radius-2)",
              overflow: "auto",
              fontSize: "var(--st-font-size-0)",
              fontFamily: "var(--st-font-mono)",
              border: "1px solid var(--st-color-border)",
              maxWidth: "100%",
            }}
          >
            <code>{currentExample.code}</code>
          </pre>
        ) : (
          <Box style={{ width: "100%", maxWidth: "600px" }}>
            {currentExample.component}
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box
        style={{
          background: "var(--st-color-surface)",
          borderTop: "1px solid var(--st-color-border)",
          padding: "var(--st-space-4) var(--st-space-6)",
        }}
      >
        <Row gap={3} align="center" justify="between">
          <Text size={0} tone="muted">
            💡 Resize your browser to see responsive behavior in action
          </Text>
          <a
            href="/components"
            style={{
              padding: "var(--st-space-2) var(--st-space-4)",
              borderRadius: "var(--st-radius-2)",
              border: "1px solid var(--st-color-primary)",
              background: "transparent",
              color: "var(--st-color-primary)",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "var(--st-font-size-0)",
              transition: "all var(--st-duration-fast) var(--st-easing-default)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--st-color-primary)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--st-color-primary)";
            }}
          >
            View all components →
          </a>
        </Row>
      </Box>
    </Column>
  );
}
