import { Container, Column, Row, Text, Box, Grid } from "@staple-css/primitives/full";
import {
  ToggleRight,
  FormInput,
  Grid3x3,
  Layers,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  Code2,
} from "lucide-react";
import "./ComponentPatternsPage.css";

export function ComponentPatternsPage() {
  const getSectionIcon = (name: string) => {
    const iconProps = { size: 20, className: "cpp-icon", "aria-hidden": true };
    switch (name) {
      case "buttons":
        return <ToggleRight {...iconProps} />;
      case "forms":
        return <FormInput {...iconProps} />;
      case "cards":
        return <Layers {...iconProps} />;
      case "alerts":
        return <AlertCircle {...iconProps} />;
      case "layouts":
        return <Grid3x3 {...iconProps} />;
      case "data":
        return <Grid3x3 {...iconProps} />;
      case "code":
        return <Code2 {...iconProps} />;
      default:
        return null;
    }
  };

  const getAlertIcon = (tone: string) => {
    const iconProps = { size: 18, className: "cpp-alert-icon", "aria-hidden": true };
    switch (tone) {
      case "success":
        return <CheckCircle2 {...iconProps} />;
      case "danger":
        return <AlertCircle {...iconProps} />;
      case "warn":
        return <AlertTriangle {...iconProps} />;
      default:
        return <Info {...iconProps} />;
    }
  };

  return (
    <Box as="main" className="cpp-container">
      {/* Hero Section */}
      <Box style={{
        background: "linear-gradient(135deg, rgba(42, 125, 82, 0.05) 0%, rgba(212, 165, 116, 0.03) 100%)",
        borderBottom: "1px solid var(--st-color-border)",
        padding: "var(--st-space-8) var(--st-space-4)"
      }}>
        <Container size="lg">
          <Column gap={4} style={{ maxWidth: "750px" }}>
            <Text as="h1" style={{
              fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
              fontWeight: 800,
              fontFamily: "var(--st-font-display)",
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "-2px"
            }}>
              Component Patterns
            </Text>
            <Text tone="muted" style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              maxWidth: "65ch",
              fontWeight: 400
            }}>
              Production-ready patterns and examples for common UI components. Copy, customize, and compose with Staple CSS primitives and tokens.
            </Text>
          </Column>
        </Container>
      </Box>

      <Container size="xl" style={{ paddingTop: "var(--st-space-8)", paddingBottom: "var(--st-space-8)" }}>
        <Column gap={8}>

          {/* Button Variations */}
          <Box as="section" style={{ display: "contents" }}>
            <Column gap={3}>
              <div className="cpp-section-header">
                <div className="cpp-icon-badge cpp-icon-badge--buttons">{getSectionIcon("buttons")}</div>
                <Text as="h2" size={3} weight="semibold">
                  Button Patterns
                </Text>
              </div>

              <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={3}>
                {[
                  { label: "Primary Solid", color: "primary", solid: true },
                  { label: "Primary Outline", color: "primary", solid: false },
                  { label: "Danger Solid", color: "danger", solid: true },
                  { label: "Success Outline", color: "success", solid: false },
                  { label: "Small Button", size: "small", solid: true },
                  { label: "Large Button", size: "large", solid: true },
                ].map((btn) => (
                  <article key={btn.label} className="cpp-pattern-card">
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
                  </article>
                ))}
              </Grid>
            </Column>
          </Box>

          {/* Form Components */}
          <Box as="section" style={{ display: "contents" }}>
            <Column gap={3}>
              <div className="cpp-section-header">
                <div className="cpp-icon-badge cpp-icon-badge--forms">{getSectionIcon("forms")}</div>
                <Text as="h2" size={3} weight="semibold">
                  Form Components
                </Text>
              </div>

              <Grid cols={{ base: 1, md: 2 }} gap={3}>
                {/* Text Input */}
                <article className="cpp-pattern-card">
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
                </article>

                {/* Select Dropdown */}
                <article className="cpp-pattern-card">
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
                </article>

                {/* Checkbox */}
                <article className="cpp-pattern-card">
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
                </article>

                {/* Radio */}
                <article className="cpp-pattern-card">
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
                </article>

                {/* Textarea */}
                <article className="cpp-pattern-card">
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
                          resize: "vertical",
                        }}
                      />
                    </Column>
                  </Column>
                </article>

                {/* Slider */}
                <article className="cpp-pattern-card">
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
                </article>
              </Grid>
            </Column>
          </Box>

          {/* Card Variations */}
          <Box as="section" style={{ display: "contents" }}>
            <Column gap={3}>
              <div className="cpp-section-header">
                <div className="cpp-icon-badge cpp-icon-badge--cards">{getSectionIcon("cards")}</div>
                <Text as="h2" size={3} weight="semibold">
                  Card Patterns
                </Text>
              </div>

              <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={3}>
                {/* Simple Card */}
                <article className="cpp-pattern-card">
                  <Column gap={2}>
                    <Text weight="semibold">Simple Card</Text>
                    <Text size={0} tone="muted">
                      Basic card with padding and shadow
                    </Text>
                  </Column>
                </article>

                {/* Card with Header */}
                <article className="cpp-pattern-card cpp-card-header">
                  <Column gap={0}>
                    <Box style={{ background: "var(--st-color-primary)", padding: "var(--st-space-3)" }}>
                      <Text weight="semibold" style={{ color: "white" }}>
                        Header Card
                      </Text>
                    </Box>
                    <Column gap={2} style={{ padding: "var(--st-space-3)" }}>
                      <Text size={0} tone="muted">
                        Card with colored header section
                      </Text>
                    </Column>
                  </Column>
                </article>

                {/* Hover Card */}
                <article
                  className="cpp-pattern-card cpp-card-hover"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--st-shadow-2)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                    (e.currentTarget as HTMLElement).style.transform = "";
                  }}
                >
                  <Column gap={2}>
                    <Text weight="semibold">Hover Card</Text>
                    <Text size={0} tone="muted">
                      Lifts on hover with shadow
                    </Text>
                  </Column>
                </article>

                {/* Feature Card */}
                <article className="cpp-pattern-card cpp-card-feature">
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
                </article>

                {/* Stats Card */}
                <article className="cpp-pattern-card cpp-card-stats">
                  <Column gap={3} align="center">
                    <Text size={5} weight="bold" style={{ color: "var(--st-color-primary)" }}>
                      2,547
                    </Text>
                    <Text size={0} tone="muted" align="center">
                      Active Users
                    </Text>
                  </Column>
                </article>

                {/* Action Card */}
                <article className="cpp-pattern-card">
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
                      Learn More
                    </button>
                  </Column>
                </article>
              </Grid>
            </Column>
          </Box>

          {/* Alert/Notification Patterns */}
          <Box as="section" style={{ display: "contents" }}>
            <Column gap={3}>
              <div className="cpp-section-header">
                <div className="cpp-icon-badge cpp-icon-badge--alerts">{getSectionIcon("alerts")}</div>
                <Text as="h2" size={3} weight="semibold">
                  Alerts & Notifications
                </Text>
              </div>

              <Column gap={2}>
                {["primary", "success", "danger", "warn"].map((tone) => (
                  <article
                    key={tone}
                    className={`cpp-alert cpp-alert--${tone}`}
                    style={{ display: "flex", gap: "var(--st-space-3)", alignItems: "flex-start", padding: "var(--st-space-3)" }}
                  >
                    <div style={{ flexShrink: 0, marginTop: "2px" }}>{getAlertIcon(tone)}</div>
                    <Column gap={0} style={{ flex: 1 }}>
                      <Text weight="semibold" style={{ color: "white", textTransform: "capitalize" }}>
                        {tone} Message
                      </Text>
                      <Text size={0} style={{ color: "white", opacity: 0.9 }}>
                        This is a {tone} alert with icon and message
                      </Text>
                    </Column>
                  </article>
                ))}
              </Column>
            </Column>
          </Box>

          {/* Layout Patterns */}
          <Box as="section" style={{ display: "contents" }}>
            <Column gap={3}>
              <div className="cpp-section-header">
                <div className="cpp-icon-badge cpp-icon-badge--layouts">{getSectionIcon("layouts")}</div>
                <Text as="h2" size={3} weight="semibold">
                  Layout Patterns
                </Text>
              </div>

              <Grid cols={{ base: 1, md: 2 }} gap={3}>
                {/* Two Column Layout */}
                <article className="cpp-pattern-card">
                  <Column gap={2}>
                    <Text size={0} weight="semibold">
                      Two Column Layout
                    </Text>
                    <Row gap={3}>
                      <Box style={{ flex: 1, background: "var(--st-color-surface)", height: "80px", borderRadius: "var(--st-radius-2)" }} />
                      <Box style={{ flex: 1, background: "var(--st-color-surface)", height: "80px", borderRadius: "var(--st-radius-2)" }} />
                    </Row>
                  </Column>
                </article>

                {/* Sidebar Layout */}
                <article className="cpp-pattern-card">
                  <Column gap={2}>
                    <Text size={0} weight="semibold">
                      Sidebar Layout
                    </Text>
                    <Row gap={3}>
                      <Box style={{ width: "80px", background: "var(--st-color-surface)", height: "80px", borderRadius: "var(--st-radius-2)" }} />
                      <Box style={{ flex: 1, background: "var(--st-color-surface)", height: "80px", borderRadius: "var(--st-radius-2)" }} />
                    </Row>
                  </Column>
                </article>

                {/* Grid Layout */}
                <article className="cpp-pattern-card">
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
                </article>

                {/* Stack Layout */}
                <article className="cpp-pattern-card">
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
                </article>
              </Grid>
            </Column>
          </Box>

          {/* Data Display Patterns */}
          <Box as="section" style={{ display: "contents" }}>
            <Column gap={3}>
              <div className="cpp-section-header">
                <div className="cpp-icon-badge cpp-icon-badge--data">{getSectionIcon("data")}</div>
                <Text as="h2" size={3} weight="semibold">
                  Data Display Patterns
                </Text>
              </div>

              <article className="cpp-pattern-card cpp-card-large">
                <Column gap={4}>
                  <Text weight="semibold">Data Table Example</Text>
                  <Box style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: "2px solid var(--st-color-border)" }}>
                          <th scope="col" style={{ padding: "var(--st-space-3)", textAlign: "left", fontWeight: "600" }}>Name</th>
                          <th scope="col" style={{ padding: "var(--st-space-3)", textAlign: "left", fontWeight: "600" }}>Status</th>
                          <th scope="col" style={{ padding: "var(--st-space-3)", textAlign: "left", fontWeight: "600" }}>Progress</th>
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
              </article>
            </Column>
          </Box>

          {/* Code Examples */}
          <article className="cpp-pattern-card cpp-card-large">
            <Column gap={4}>
              <div className="cpp-section-header">
                <div className="cpp-icon-badge cpp-icon-badge--code">{getSectionIcon("code")}</div>
                <Text as="h2" size={3} weight="semibold">
                  Copy-Paste Code Examples
                </Text>
              </div>

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
          </article>
        </Column>
      </Container>
    </Box>
  );
}
