import { Container, Column, Row, Text, Card, Box, Grid, Flex } from "@staple-css/primitives/full";

export function ComponentPatternsPage() {
  return (
    <Container size="xl" style={{ paddingTop: "var(--st-space-8)", paddingBottom: "var(--st-space-8)" }}>
      <Column gap={8}>
        {/* Header */}
        <Column gap={4}>
          <Text as="h1" size={5} weight="bold">
            Component Patterns
          </Text>
          <Text size={2} tone="muted">
            Production-ready patterns and examples for common UI components. Copy, customize,
            and compose with staple-css primitives and tokens.
          </Text>
        </Column>

        {/* Button Variations */}
        <Column gap={4}>
          <Text as="h2" size={3} weight="semibold">
            🔘 Button Patterns
          </Text>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {[
              { label: "Primary Solid", color: "primary", solid: true },
              { label: "Primary Outline", color: "primary", solid: false },
              { label: "Danger Solid", color: "danger", solid: true },
              { label: "Success Outline", color: "success", solid: false },
              { label: "Small Button", size: "small", solid: true },
              { label: "Large Button", size: "large", solid: true },
            ].map((btn) => (
              <Card key={btn.label} pad={4} radius={2} shadow={0}>
                <Column gap={2}>
                  <Text size={0} weight="semibold">
                    {btn.label}
                  </Text>
                  <button
                    style={{
                      padding:
                        btn.size === "small"
                          ? "var(--st-space-1) var(--st-space-3)"
                          : btn.size === "large"
                            ? "var(--st-space-4) var(--st-space-6)"
                            : "var(--st-space-2) var(--st-space-4)",
                      borderRadius: "var(--st-radius-2)",
                      border: btn.solid
                        ? `1px solid transparent`
                        : `1px solid var(--st-color-${btn.color || "primary"})`,
                      background: btn.solid ? `var(--st-color-${btn.color || "primary"})` : "transparent",
                      color: btn.solid ? "white" : `var(--st-color-${btn.color || "primary"})`,
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "var(--st-font-size-0)",
                      transition: "all var(--st-duration-fast) var(--st-easing-default)",
                    }}
                  >
                    {btn.label}
                  </button>
                </Column>
              </Card>
            ))}
          </Grid>
        </Column>

        {/* Form Components */}
        <Column gap={4}>
          <Text as="h2" size={3} weight="semibold">
            📋 Form Components
          </Text>

          <Grid cols={{ base: 1, md: 2 }} gap={4}>
            {/* Text Input */}
            <Card pad={4} radius={2} shadow={0}>
              <Column gap={2}>
                <Text size={0} weight="semibold">
                  Text Input
                </Text>
                <Column gap={1}>
                  <label style={{ fontSize: "var(--st-font-size-0)", fontWeight: "500" }}>Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    style={{
                      padding: "var(--st-space-2) var(--st-space-3)",
                      borderRadius: "var(--st-radius-2)",
                      border: "1px solid var(--st-color-border)",
                      fontFamily: "var(--st-font-sans)",
                      fontSize: "var(--st-font-size-1)",
                      width: "100%",
                      transition: "all var(--st-duration-fast) var(--st-easing-default)",
                    }}
                  />
                </Column>
              </Column>
            </Card>

            {/* Select Dropdown */}
            <Card pad={4} radius={2} shadow={0}>
              <Column gap={2}>
                <Text size={0} weight="semibold">
                  Select Dropdown
                </Text>
                <Column gap={1}>
                  <label style={{ fontSize: "var(--st-font-size-0)", fontWeight: "500" }}>Option</label>
                  <select
                    style={{
                      padding: "var(--st-space-2) var(--st-space-3)",
                      borderRadius: "var(--st-radius-2)",
                      border: "1px solid var(--st-color-border)",
                      fontFamily: "var(--st-font-sans)",
                      fontSize: "var(--st-font-size-1)",
                      width: "100%",
                    }}
                  >
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </Column>
              </Column>
            </Card>

            {/* Checkbox */}
            <Card pad={4} radius={2} shadow={0}>
              <Column gap={2}>
                <Text size={0} weight="semibold">
                  Checkbox
                </Text>
                <Row gap={2} align="center">
                  <input
                    type="checkbox"
                    id="checkbox"
                    style={{
                      width: "18px",
                      height: "18px",
                      cursor: "pointer",
                    }}
                  />
                  <label htmlFor="checkbox" style={{ cursor: "pointer", fontSize: "var(--st-font-size-0)" }}>
                    I agree to the terms
                  </label>
                </Row>
              </Column>
            </Card>

            {/* Radio */}
            <Card pad={4} radius={2} shadow={0}>
              <Column gap={2}>
                <Text size={0} weight="semibold">
                  Radio Group
                </Text>
                <Column gap={2}>
                  {["Option A", "Option B", "Option C"].map((opt) => (
                    <Row key={opt} gap={2} align="center">
                      <input type="radio" id={opt} name="radio" style={{ cursor: "pointer" }} />
                      <label htmlFor={opt} style={{ cursor: "pointer", fontSize: "var(--st-font-size-0)" }}>
                        {opt}
                      </label>
                    </Row>
                  ))}
                </Column>
              </Column>
            </Card>

            {/* Textarea */}
            <Card pad={4} radius={2} shadow={0}>
              <Column gap={2}>
                <Text size={0} weight="semibold">
                  Textarea
                </Text>
                <Column gap={1}>
                  <label style={{ fontSize: "var(--st-font-size-0)", fontWeight: "500" }}>Message</label>
                  <textarea
                    placeholder="Enter your message..."
                    rows={3}
                    style={{
                      padding: "var(--st-space-2) var(--st-space-3)",
                      borderRadius: "var(--st-radius-2)",
                      border: "1px solid var(--st-color-border)",
                      fontFamily: "var(--st-font-sans)",
                      fontSize: "var(--st-font-size-1)",
                      width: "100%",
                      fontFamily: "var(--st-font-sans)",
                      resize: "vertical",
                    }}
                  />
                </Column>
              </Column>
            </Card>

            {/* Slider */}
            <Card pad={4} radius={2} shadow={0}>
              <Column gap={2}>
                <Text size={0} weight="semibold">
                  Range Slider
                </Text>
                <Column gap={2}>
                  <input type="range" min="0" max="100" defaultValue="50" style={{ width: "100%" }} />
                  <Text size={0} tone="muted">
                    Range inputs for numeric selection
                  </Text>
                </Column>
              </Column>
            </Card>
          </Grid>
        </Column>

        {/* Card Variations */}
        <Column gap={4}>
          <Text as="h2" size={3} weight="semibold">
            📇 Card Patterns
          </Text>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
            {/* Simple Card */}
            <Card pad={4} radius={2} shadow={1}>
              <Column gap={2}>
                <Text weight="semibold">Simple Card</Text>
                <Text size={0} tone="muted">
                  Basic card with padding and shadow
                </Text>
              </Column>
            </Card>

            {/* Card with Header */}
            <Card pad={0} radius={2} shadow={1} style={{ overflow: "hidden" }}>
              <Column gap={0}>
                <Box style={{ background: "var(--st-color-primary)", padding: "var(--st-space-4)" }}>
                  <Text weight="semibold" style={{ color: "white" }}>
                    Header Card
                  </Text>
                </Box>
                <Column gap={2} pad={4}>
                  <Text size={0} tone="muted">
                    Card with colored header section
                  </Text>
                </Column>
              </Column>
            </Card>

            {/* Hover Card */}
            <Card
              pad={4}
              radius={2}
              shadow={0}
              style={{
                border: "1px solid var(--st-color-border)",
                cursor: "pointer",
                transition: "all var(--st-duration-fast) var(--st-easing-default)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--st-shadow-2)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <Column gap={2}>
                <Text weight="semibold">Hover Card</Text>
                <Text size={0} tone="muted">
                  Lifts on hover with shadow
                </Text>
              </Column>
            </Card>

            {/* Feature Card */}
            <Card pad={4} radius={2} shadow={1} tone="primary">
              <Column gap={2}>
                <Text size={2} weight="bold" style={{ color: "white" }}>
                  ✨
                </Text>
                <Text weight="semibold" style={{ color: "white" }}>
                  Feature Card
                </Text>
                <Text size={0} style={{ color: "white", opacity: 0.9 }}>
                  Colored background with white text
                </Text>
              </Column>
            </Card>

            {/* Stats Card */}
            <Card pad={4} radius={2} shadow={0} style={{ border: "1px solid var(--st-color-border)" }}>
              <Column gap={3} align="center">
                <Text size={5} weight="bold" style={{ color: "var(--st-color-primary)" }}>
                  2,547
                </Text>
                <Text size={0} tone="muted" align="center">
                  Active Users
                </Text>
              </Column>
            </Card>

            {/* Action Card */}
            <Card pad={4} radius={2} shadow={1}>
              <Column gap={3}>
                <Text weight="semibold">Action Card</Text>
                <Text size={0} tone="muted">
                  Card with call-to-action button
                </Text>
                <button
                  style={{
                    padding: "var(--st-space-2) var(--st-space-4)",
                    borderRadius: "var(--st-radius-1)",
                    border: "none",
                    background: "var(--st-color-primary)",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "var(--st-font-size-0)",
                  }}
                >
                  Learn More →
                </button>
              </Column>
            </Card>
          </Grid>
        </Column>

        {/* Alert/Notification Patterns */}
        <Column gap={4}>
          <Text as="h2" size={3} weight="semibold">
            🔔 Alerts & Notifications
          </Text>

          <Column gap={3}>
            {["primary", "success", "danger", "warn"].map((tone) => (
              <Card
                key={tone}
                pad={4}
                radius={2}
                shadow={0}
                tone={tone as any}
                style={{ display: "flex", gap: "var(--st-space-4)" }}
              >
                <Text size={1} style={{ color: "white" }}>
                  {tone === "success" ? "✓" : tone === "danger" ? "!" : tone === "warn" ? "⚠" : "ℹ"}
                </Text>
                <Column gap={1}>
                  <Text weight="semibold" style={{ color: "white", textTransform: "capitalize" }}>
                    {tone} Message
                  </Text>
                  <Text size={0} style={{ color: "white", opacity: 0.9 }}>
                    This is a {tone} alert with icon and message
                  </Text>
                </Column>
              </Card>
            ))}
          </Column>
        </Column>

        {/* Layout Patterns */}
        <Column gap={4}>
          <Text as="h2" size={3} weight="semibold">
            📐 Layout Patterns
          </Text>

          <Grid cols={{ base: 1, md: 2 }} gap={4}>
            {/* Two Column Layout */}
            <Card pad={4} radius={2} shadow={0} style={{ border: "1px solid var(--st-color-border)" }}>
              <Column gap={2}>
                <Text size={0} weight="semibold">
                  Two Column Layout
                </Text>
                <Row gap={4}>
                  <Box style={{ flex: 1, background: "var(--st-color-surface)", height: "80px", borderRadius: "var(--st-radius-2)" }} />
                  <Box style={{ flex: 1, background: "var(--st-color-surface)", height: "80px", borderRadius: "var(--st-radius-2)" }} />
                </Row>
              </Column>
            </Card>

            {/* Sidebar Layout */}
            <Card pad={4} radius={2} shadow={0} style={{ border: "1px solid var(--st-color-border)" }}>
              <Column gap={2}>
                <Text size={0} weight="semibold">
                  Sidebar Layout
                </Text>
                <Row gap={4}>
                  <Box style={{ width: "80px", background: "var(--st-color-surface)", height: "80px", borderRadius: "var(--st-radius-2)" }} />
                  <Box style={{ flex: 1, background: "var(--st-color-surface)", height: "80px", borderRadius: "var(--st-radius-2)" }} />
                </Row>
              </Column>
            </Card>

            {/* Grid Layout */}
            <Card pad={4} radius={2} shadow={0} style={{ border: "1px solid var(--st-color-border)" }}>
              <Column gap={2}>
                <Text size={0} weight="semibold">
                  Grid Layout
                </Text>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--st-space-2)" }}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Box key={i} style={{ background: "var(--st-color-surface)", height: "40px", borderRadius: "var(--st-radius-1)" }} />
                  ))}
                </div>
              </Column>
            </Card>

            {/* Stack Layout */}
            <Card pad={4} radius={2} shadow={0} style={{ border: "1px solid var(--st-color-border)" }}>
              <Column gap={2}>
                <Text size={0} weight="semibold">
                  Stack Layout
                </Text>
                <Column gap={2}>
                  {[1, 2, 3].map((i) => (
                    <Box key={i} style={{ background: "var(--st-color-surface)", height: "30px", borderRadius: "var(--st-radius-1)" }} />
                  ))}
                </Column>
              </Column>
            </Card>
          </Grid>
        </Column>

        {/* Data Display Patterns */}
        <Column gap={4}>
          <Text as="h2" size={3} weight="semibold">
            📊 Data Display Patterns
          </Text>

          <Card pad={6} radius={3} shadow={1}>
            <Column gap={4}>
              <Text weight="semibold">Data Table Example</Text>
              <Box style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--st-color-border)" }}>
                      <th style={{ padding: "var(--st-space-3)", textAlign: "left", fontWeight: "600" }}>Name</th>
                      <th style={{ padding: "var(--st-space-3)", textAlign: "left", fontWeight: "600" }}>Status</th>
                      <th style={{ padding: "var(--st-space-3)", textAlign: "left", fontWeight: "600" }}>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Item A", status: "Active", progress: "75%" },
                      { name: "Item B", status: "Active", progress: "50%" },
                      { name: "Item C", status: "Inactive", progress: "25%" },
                    ].map((row) => (
                      <tr key={row.name} style={{ borderBottom: "1px solid var(--st-color-border)" }}>
                        <td style={{ padding: "var(--st-space-3)" }}>{row.name}</td>
                        <td style={{ padding: "var(--st-space-3)" }}>
                          <Box
                            style={{
                              display: "inline-block",
                              padding: "var(--st-space-1) var(--st-space-2)",
                              background: row.status === "Active" ? "var(--st-color-success)" : "var(--st-color-neutral-soft)",
                              color: row.status === "Active" ? "white" : "var(--st-color-text)",
                              borderRadius: "var(--st-radius-1)",
                              fontSize: "var(--st-font-size-0)",
                              fontWeight: "600",
                            }}
                          >
                            {row.status}
                          </Box>
                        </td>
                        <td style={{ padding: "var(--st-space-3)" }}>{row.progress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Column>
          </Card>
        </Column>

        {/* Code Examples */}
        <Card pad={6} radius={3} shadow={1}>
          <Column gap={4}>
            <Text as="h2" size={3} weight="semibold">
              💻 Copy-Paste Code Examples
            </Text>

            <pre
              style={{
                background: "var(--st-color-surface)",
                padding: "var(--st-space-4)",
                borderRadius: "var(--st-radius-2)",
                overflow: "auto",
                fontSize: "var(--st-font-size-0)",
                fontFamily: "var(--st-font-mono)",
              }}
            >
              <code>{`// Card Component
<Card pad={6} radius={3} shadow={1}>
  <Column gap={4}>
    <Text as="h2" size={3} weight="semibold">
      Heading
    </Text>
    <Text size={1} tone="muted">
      Description text
    </Text>
    <Row gap={3} justify="end">
      <button>Cancel</button>
      <button>Submit</button>
    </Row>
  </Column>
</Card>`}</code>
            </pre>
          </Column>
        </Card>
      </Column>
    </Container>
  );
}
