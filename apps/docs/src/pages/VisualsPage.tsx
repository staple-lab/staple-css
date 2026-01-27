import { Container, Column, Row, Text, Box, Grid } from "@staple-css/primitives/full";
import {
  Layers,
  Square,
  Droplet,
  Zap,
  Eye,
  Search,
  Wind,
  Maximize2,
  Palette,
  Type,
  Ruler,
  ClickOff2,
} from "lucide-react";
import "./VisualsPage.css";

export function VisualsPage() {
  return (
    <Container size="xl" style={{ paddingTop: "var(--st-space-6)", paddingBottom: "var(--st-space-6)" }}>
      <Column gap={6}>
        {/* Header */}
        <Column gap={2}>
          <Text as="h1" size={5} weight="bold">
            Visual System & Design Language
          </Text>
          <Text size={2} tone="muted">
            Comprehensive visual guidelines including icons, illustrations, shadows, and motion. Create
            beautiful, cohesive interfaces with consistent visual language.
          </Text>
        </Column>

        {/* Elevation System */}
        <Column gap={3}>
          <Row gap={2} align="center">
            <div className="icon-badge">
              <Layers size={20} />
            </div>
            <Text as="h2" size={3} weight="semibold">
              Elevation System (Shadows)
            </Text>
          </Row>
          <Text size={1} tone="muted">
            Six elevation levels (0-5) for depth and hierarchy. Each level represents a specific vertical
            distance, creating visual structure and focus.
          </Text>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={3}>
            {[
              { level: 0, description: "Flat - No shadow", shadow: "none" },
              { level: 1, description: "Subtle - Minimal elevation", shadow: "var(--st-shadow-1)" },
              { level: 2, description: "Raised - Card elevation", shadow: "var(--st-shadow-2)" },
              { level: 3, description: "Floating - Dropdown/modal", shadow: "var(--st-shadow-3)" },
              { level: 4, description: "Lifted - Emphasis", shadow: "var(--st-shadow-4)" },
              { level: 5, description: "Prominent - Top layer", shadow: "var(--st-shadow-5)" },
            ].map((item) => (
              <div key={item.level} className="accent-card">
                <Column gap={1} align="center">
                  <Text size={0} weight="semibold">
                    Level {item.level}
                  </Text>
                  <Text size={0} tone="muted" align="center">
                    {item.description}
                  </Text>
                  <Text size={0} tone="muted" style={{ fontFamily: "var(--st-font-mono)" }}>
                    shadow-{item.level}
                  </Text>
                </Column>
                <Box
                  style={{
                    background: "var(--st-color-surface)",
                    padding: "var(--st-space-4)",
                    borderRadius: "var(--st-radius-2)",
                    boxShadow: item.shadow,
                    transition: "all var(--st-duration-normal) var(--st-easing-default)",
                    height: "100px",
                    marginTop: "var(--st-space-2)",
                  }}
                />
              </div>
            ))}
          </Grid>
        </Column>

        {/* Border Radius System */}
        <Column gap={3}>
          <Row gap={2} align="center">
            <div className="icon-badge">
              <Square size={20} />
            </div>
            <Text as="h2" size={3} weight="semibold">
              Border Radius Scale
            </Text>
          </Row>
          <Text size={1} tone="muted">
            Four-step radius scale for consistency. Each level creates specific visual effects from subtle
            to highly rounded.
          </Text>

          <Grid cols={{ base: 2, md: 4 }} gap={3}>
            {[
              { level: 0, size: "0px", description: "Sharp" },
              { level: 1, size: "2px", description: "Subtle" },
              { level: 2, size: "4px", description: "Standard" },
              { level: 3, size: "8px", description: "Soft" },
              { level: 4, size: "16px", description: "Round" },
            ].map((item) => (
              <Column key={item.level} gap={2} align="center">
                <Box
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "var(--st-gradient-primary-medium)",
                    borderRadius: item.size,
                    transition: "all var(--st-duration-fast) var(--st-easing-default)",
                  }}
                />
                <Column gap={0} align="center">
                  <Text size={0} weight="semibold">
                    {item.description}
                  </Text>
                  <Text size={0} tone="muted">
                    {item.size}
                  </Text>
                </Column>
              </Column>
            ))}
          </Grid>
        </Column>

        {/* Color Gradients Showcase */}
        <Column gap={3}>
          <Row gap={2} align="center">
            <div className="icon-badge">
              <Droplet size={20} />
            </div>
            <Text as="h2" size={3} weight="semibold">
              Gradient Showcase
            </Text>
          </Row>
          <Text size={1} tone="muted">
            Visual examples of all gradient tokens. Use for hero sections, backgrounds, and visual
            emphasis.
          </Text>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={3}>
            {[
              { name: "Sunrise", var: "sunrise" },
              { name: "Sunset", var: "sunset" },
              { name: "Ocean", var: "ocean" },
              { name: "Forest", var: "forest" },
              { name: "Grape", var: "grape" },
              { name: "Mint", var: "mint" },
            ].map((grad) => (
              <Box
                key={grad.var}
                style={{
                  background: `var(--st-gradient-${grad.var})`,
                  height: "140px",
                  borderRadius: "var(--st-radius-2)",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: "var(--st-space-3)",
                  cursor: "pointer",
                  transition: "transform var(--st-duration-fast) var(--st-easing-default)",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                <Text weight="semibold" style={{ color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                  {grad.name}
                </Text>
              </Box>
            ))}
          </Grid>
        </Column>

        {/* Motion & Transitions */}
        <Column gap={3}>
          <Row gap={2} align="center">
            <div className="icon-badge">
              <Zap size={20} />
            </div>
            <Text as="h2" size={3} weight="semibold">
              Motion & Transitions
            </Text>
          </Row>
          <Text size={1} tone="muted">
            Smooth, purposeful motion that guides attention and creates responsive feedback. Always under
            300ms for perceived performance.
          </Text>

          <Grid cols={{ base: 1, md: 2 }} gap={3}>
            {[
              {
                title: "Fade In",
                description: "Gentle appearance animation",
                duration: "200ms",
                demo: "fade",
              },
              {
                title: "Slide Up",
                description: "Entrance from bottom",
                duration: "300ms",
                demo: "slide",
              },
              {
                title: "Scale",
                description: "Growth from center",
                duration: "250ms",
                demo: "scale",
              },
              {
                title: "Bounce",
                description: "Playful arrival",
                duration: "500ms",
                demo: "bounce",
              },
            ].map((motion) => (
              <div key={motion.title} className="accent-card">
                <Column gap={3} align="center">
                  <Box
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "var(--st-gradient-primary-medium)",
                      borderRadius: "var(--st-radius-2)",
                      animation:
                        motion.demo === "fade"
                          ? "fadeInDemo 2s ease-in-out infinite"
                          : motion.demo === "slide"
                            ? "slideUpDemo 2s ease-in-out infinite"
                            : motion.demo === "scale"
                              ? "scaleDemo 2s ease-in-out infinite"
                              : "bounceDemo 2s ease-in-out infinite",
                    }}
                  />
                  <Column gap={1} align="center">
                    <Text weight="semibold" size={1}>
                      {motion.title}
                    </Text>
                    <Text size={0} tone="muted">
                      {motion.description}
                    </Text>
                    <Text size={0} tone="muted" style={{ fontFamily: "var(--st-font-mono)" }}>
                      {motion.duration}
                    </Text>
                  </Column>
                </Column>
              </div>
            ))}
          </Grid>

          <style>{`
            @keyframes fadeInDemo {
              0%, 100% { opacity: 0; }
              50% { opacity: 1; }
            }
            @keyframes slideUpDemo {
              0%, 100% { transform: translateY(20px); opacity: 0; }
              50% { transform: translateY(0); opacity: 1; }
            }
            @keyframes scaleDemo {
              0%, 100% { transform: scale(0.8); }
              50% { transform: scale(1); }
            }
            @keyframes bounceDemo {
              0%, 100% { transform: translateY(0); }
              25% { transform: translateY(-10px); }
              50% { transform: translateY(0); }
              75% { transform: translateY(-5px); }
            }
          `}</style>
        </Column>

        {/* Typography Showcase */}
        <Column gap={3}>
          <Row gap={2} align="center">
            <div className="icon-badge">
              <Type size={20} />
            </div>
            <Text as="h2" size={3} weight="semibold">
              Typography Scale
            </Text>
          </Row>
          <Text size={1} tone="muted">
            Seven-step font scale with intentional hierarchy. Each size has a specific purpose in the
            visual hierarchy.
          </Text>

          <Column gap={2}>
            {[
              { size: "0", label: "12px - XS", text: "Extra small for captions" },
              { size: "1", label: "14px - SM", text: "Small for secondary text" },
              { size: "2", label: "16px - Base", text: "Base size for body copy" },
              { size: "3", label: "18px - LG", text: "Large for subheadings" },
              { size: "4", label: "20px - XL", text: "Extra large for headings" },
              { size: "5", label: "24px - 2XL", text: "2XL for section headings" },
              { size: "6", label: "32px - 3XL", text: "3XL for page titles" },
            ].map((item) => (
              <div key={item.size} className="accent-card accent-card--compact">
                <Row gap={3} align="center">
                  <Text as="span" style={{ fontSize: `var(--st-font-size-${item.size})` }} weight="semibold">
                    {item.label}
                  </Text>
                  <Text size={0} tone="muted">
                    {item.text}
                  </Text>
                </Row>
              </div>
            ))}
          </Column>
        </Column>

        {/* Spacing Visualization */}
        <Column gap={3}>
          <Row gap={2} align="center">
            <div className="icon-badge">
              <Ruler size={20} />
            </div>
            <Text as="h2" size={3} weight="semibold">
              Spacing Scale Visualization
            </Text>
          </Row>
          <Text size={1} tone="muted">
            Nine-step spacing scale from 0 to 4rem. Use consistently for padding, margins, and gaps.
          </Text>

          <Column gap={2}>
            {[
              { size: "0", value: "0px", label: "space-0" },
              { size: "1", value: "4px", label: "space-1" },
              { size: "2", value: "8px", label: "space-2" },
              { size: "3", value: "12px", label: "space-3" },
              { size: "4", value: "16px", label: "space-4" },
              { size: "5", value: "24px", label: "space-5" },
              { size: "6", value: "32px", label: "space-6" },
              { size: "7", value: "48px", label: "space-7" },
              { size: "8", value: "64px", label: "space-8" },
            ].map((item) => (
              <Row key={item.size} gap={3} align="center">
                <Text size={0} weight="semibold" style={{ minWidth: "60px" }}>
                  {item.label}
                </Text>
                <Box
                  style={{
                    height: "20px",
                    background: "var(--st-gradient-primary-medium)",
                    borderRadius: "var(--st-radius-1)",
                    width: `${parseInt(item.value)}px`,
                    minWidth: "4px",
                    transition: "all var(--st-duration-fast) var(--st-easing-default)",
                  }}
                />
                <Text size={0} tone="muted" style={{ fontFamily: "var(--st-font-mono)" }}>
                  {item.value}
                </Text>
              </Row>
            ))}
          </Column>
        </Column>

        {/* Interactive States */}
        <Column gap={3}>
          <Row gap={2} align="center">
            <div className="icon-badge">
              <ClickOff2 size={20} />
            </div>
            <Text as="h2" size={3} weight="semibold">
              Interactive States
            </Text>
          </Row>
          <Text size={1} tone="muted">
            Consistent state patterns for buttons, links, and form elements. Always provide visual
            feedback for interactions.
          </Text>

          <Grid cols={{ base: 1, md: 2 }} gap={3}>
            {["Default", "Hover", "Active", "Disabled"].map((state) => (
              <div key={state} className="accent-card">
                <Column gap={2} align="center">
                  <button
                    disabled={state === "Disabled"}
                    style={{
                      padding: "var(--st-space-2) var(--st-space-4)",
                      borderRadius: "var(--st-radius-2)",
                      border: state === "Default" ? "1px solid var(--st-color-primary)" : "none",
                      background:
                        state === "Disabled" ? "var(--st-color-surface)" : "var(--st-color-primary)",
                      color: state === "Disabled" ? "var(--st-color-text-muted)" : "white",
                      cursor: state === "Disabled" ? "not-allowed" : "pointer",
                      fontWeight: "600",
                      fontSize: "var(--st-font-size-0)",
                      opacity: state === "Disabled" ? 0.5 : 1,
                      transform: state === "Active" ? "scale(0.95)" : "scale(1)",
                      boxShadow: state === "Hover" ? "var(--st-shadow-2)" : "none",
                      transition: "all var(--st-duration-fast) var(--st-easing-default)",
                    }}
                  >
                    Button {state}
                  </button>
                  <Text size={0} tone="muted" align="center" style={{ lineHeight: "1.4" }}>
                    {state === "Default" && "Base state, ready for interaction"}
                    {state === "Hover" && "User hovers over element, shows readiness"}
                    {state === "Active" && "Element is being clicked/pressed"}
                    {state === "Disabled" && "Element is unavailable for interaction"}
                  </Text>
                </Column>
              </div>
            ))}
          </Grid>
        </Column>

        {/* Accessibility in Design */}
        <div className="accent-card accent-card--featured">
          <Column gap={3}>
            <Row gap={2} align="center">
              <div className="icon-badge">
                <Eye size={20} />
              </div>
              <Text as="h2" size={3} weight="semibold">
                Visual Accessibility
              </Text>
            </Row>
            <Grid cols={{ base: 1, md: 2 }} gap={3}>
              {[
                {
                  icon: Eye,
                  title: "Color Contrast",
                  description: "All text meets WCAG AA standards (4.5:1 minimum) for readability",
                },
                {
                  icon: Search,
                  title: "Clear Focus",
                  description: "Focus indicators are highly visible (2px outline, 2px offset)",
                },
                {
                  icon: Wind,
                  title: "Reduced Motion",
                  description: "Respects prefers-reduced-motion preference for safer interactions",
                },
                {
                  icon: Maximize2,
                  title: "Touch Targets",
                  description: "Interactive elements are 44px minimum (32px on mobile)",
                },
                {
                  icon: Palette,
                  title: "Not Color Alone",
                  description: "Information is conveyed with icons, patterns, and text too",
                },
                {
                  icon: Type,
                  title: "Readable Text",
                  description: "Line height and length optimized for dyslexia-friendly reading",
                },
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    style={{
                      background: "var(--st-color-surface)",
                      padding: "var(--st-space-3)",
                      borderRadius: "var(--st-radius-1)",
                      borderLeft: "2px solid var(--st-color-primary)",
                    }}
                  >
                    <Column gap={2}>
                      <Row gap={2} align="flex-start">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "28px",
                            height: "28px",
                            background: "var(--st-gradient-primary-light)",
                            borderRadius: "var(--st-radius-1)",
                            flexShrink: 0,
                            color: "var(--st-color-primary)",
                          }}
                        >
                          <IconComponent size={16} />
                        </div>
                        <Column gap={1}>
                          <Text weight="semibold" size={0}>
                            {item.title}
                          </Text>
                          <Text size={0} tone="muted" style={{ lineHeight: "1.4" }}>
                            {item.description}
                          </Text>
                        </Column>
                      </Row>
                    </Column>
                  </div>
                );
              })}
            </Grid>
          </Column>
        </div>
      </Column>
    </Container>
  );
}
