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
  ToggleRight,
} from "lucide-react";
import "./VisualsPage.css";

export function VisualsPage() {
  return (
    <Box as="main">
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
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
          <Row gap={2} align="center">
            <div className="icon-badge" aria-hidden="true">
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
              { level: 1, description: "Subtle depth", shadow: "var(--st-shadow-1)" },
              { level: 2, description: "Raised elements", shadow: "var(--st-shadow-2)" },
              { level: 3, description: "Floating state", shadow: "var(--st-shadow-3)" },
              { level: 4, description: "Emphasized layer", shadow: "var(--st-shadow-4)" },
              { level: 5, description: "Topmost elements", shadow: "var(--st-shadow-5)" },
            ].map((item) => (
              <Box
                key={item.level}
                style={{
                  padding: "var(--st-space-4)",
                  border: "1px solid var(--st-color-border)",
                  borderRadius: "var(--st-radius-2)",
                  background: "var(--st-color-surface)",
                }}
              >
                <Column gap={3}>
                  <Column gap={1}>
                    <Text weight="semibold">Level {item.level}</Text>
                    <Text size={0} tone="muted">{item.description}</Text>
                  </Column>
                  <Box
                    style={{
                      background: "var(--st-color-surface)",
                      padding: "var(--st-space-4)",
                      borderRadius: "var(--st-radius-1)",
                      boxShadow: item.shadow,
                      border: "1px solid var(--st-color-border)",
                      height: "80px",
                      transition: "all var(--st-duration-normal) var(--st-easing-default)",
                    }}
                  />
                </Column>
              </Box>
            ))}
          </Grid>
          </Column>
        </Box>

        {/* Border Radius System */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
          <Row gap={2} align="center">
            <div className="icon-badge" aria-hidden="true">
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
        </Box>

        {/* Color Gradients Showcase */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
          <Row gap={2} align="center">
            <div className="icon-badge" aria-hidden="true">
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
        </Box>

        {/* Motion & Transitions */}
        <Box as="section" style={{ display: "contents" }}>
          <Row gap={2} align="center">
            <div className="icon-badge" aria-hidden="true">
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
              { title: "Fade In", description: "Gentle appearance", duration: "200ms", demo: "fade" },
              { title: "Slide Up", description: "Entrance from below", duration: "300ms", demo: "slide" },
              { title: "Scale", description: "Growth from center", duration: "250ms", demo: "scale" },
              { title: "Bounce", description: "Playful arrival", duration: "500ms", demo: "bounce" },
            ].map((motion) => (
              <Box
                key={motion.title}
                style={{
                  padding: "var(--st-space-4)",
                  border: "1px solid var(--st-color-border)",
                  borderRadius: "var(--st-radius-2)",
                  background: "var(--st-color-surface)",
                }}
              >
                <Column gap={4} align="center">
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
                    <Text weight="semibold">{motion.title}</Text>
                    <Text size={0} tone="muted">{motion.description}</Text>
                    <Text size={0} tone="muted" style={{ fontFamily: "var(--st-font-mono)" }}>
                      {motion.duration}
                    </Text>
                  </Column>
                </Column>
              </Box>
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
        </Box>

        {/* Typography Showcase */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
          <Row gap={2} align="center">
            <div className="icon-badge" aria-hidden="true">
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
              { size: "0", label: "12px - XS", text: "Extra small" },
              { size: "1", label: "14px - SM", text: "Small text" },
              { size: "2", label: "16px - Base", text: "Body copy" },
              { size: "3", label: "18px - LG", text: "Subheadings" },
              { size: "4", label: "20px - XL", text: "Headings" },
              { size: "5", label: "24px - 2XL", text: "Section titles" },
              { size: "6", label: "32px - 3XL", text: "Page titles" },
            ].map((item) => (
              <Row key={item.size} gap={3} align="center" style={{ padding: "var(--st-space-3)", border: "1px solid var(--st-color-border)", borderRadius: "var(--st-radius-1)", background: "var(--st-color-surface)", minWidth: "100px" }}>
                <Text as="span" style={{ fontSize: `var(--st-font-size-${item.size})`, minWidth: "100px" }} weight="semibold">
                  {item.label}
                </Text>
                <Text size={0} tone="muted">
                  {item.text}
                </Text>
              </Row>
            ))}
          </Column>
          </Column>
        </Box>

        {/* Spacing Visualization */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
          <Row gap={2} align="center">
            <div className="icon-badge" aria-hidden="true">
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
        </Box>

        {/* Interactive States */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
          <Row gap={2} align="center">
            <div className="icon-badge" aria-hidden="true">
              <ToggleRight size={20} />
            </div>
            <Text as="h2" size={3} weight="semibold">
              Interactive States
            </Text>
          </Row>
          <Text size={1} tone="muted">
            Consistent state patterns for buttons, links, and form elements. Always provide visual
            feedback for interactions.
          </Text>

          <Row gap={3} style={{ overflowX: "auto", paddingBottom: "var(--st-space-2)" }}>
            {["Default", "Hover", "Active", "Disabled"].map((state) => (
              <Box
                key={state}
                style={{
                  padding: "var(--st-space-3)",
                  border: "1px solid var(--st-color-border)",
                  borderRadius: "var(--st-radius-2)",
                  background: "var(--st-color-surface)",
                  minWidth: "120px",
                  flex: "0 0 auto",
                }}
              >
                <Column gap={2} align="center">
                  <button
                    disabled={state === "Disabled"}
                    style={{
                      padding: "var(--st-space-2) var(--st-space-3)",
                      borderRadius: "var(--st-radius-2)",
                      border: state === "Default" ? "1px solid var(--st-color-primary)" : "none",
                      background:
                        state === "Disabled" ? "var(--st-color-surface)" : "var(--st-color-primary)",
                      color: state === "Disabled" ? "var(--st-color-text-muted)" : "white",
                      cursor: state === "Disabled" ? "not-allowed" : "pointer",
                      fontWeight: "600",
                      fontSize: "12px",
                      opacity: state === "Disabled" ? 0.5 : 1,
                      transform: state === "Active" ? "scale(0.95)" : "scale(1)",
                      boxShadow: state === "Hover" ? "var(--st-shadow-2)" : "none",
                      transition: "all var(--st-duration-fast) var(--st-easing-default)",
                    }}
                  >
                    {state}
                  </button>
                  <Text size={0} tone="muted" align="center" style={{ lineHeight: "1.2" }}>
                    {state === "Default" && "Base"}
                    {state === "Hover" && "Hover"}
                    {state === "Active" && "Pressed"}
                    {state === "Disabled" && "Off"}
                  </Text>
                </Column>
              </Box>
            ))}
          </Row>
          </Column>
        </Box>

        {/* Accessibility in Design */}
        <Box as="section" style={{ display: "contents" }}>
          <Column gap={3}>
            <Row gap={2} align="center">
              <Eye size={20} style={{ color: "var(--st-color-primary)" }} />
              <Text as="h2" size={3} weight="semibold">
                Visual Accessibility
              </Text>
            </Row>
            <Grid cols={{ base: 1, md: 2 }} gap={3}>
              {[
                { icon: Eye, title: "Contrast", description: "WCAG AA 4.5:1+ for text" },
                { icon: Search, title: "Focus", description: "Visible focus indicators" },
                { icon: Wind, title: "Motion", description: "prefers-reduced-motion support" },
                { icon: Maximize2, title: "Touch", description: "44px min tap targets" },
                { icon: Palette, title: "Meaning", description: "Not color alone" },
                { icon: Type, title: "Readability", description: "Optimized line height" },
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <Box
                    key={item.title}
                    style={{
                      padding: "var(--st-space-4)",
                      background: "var(--st-color-surface)",
                      border: "1px solid var(--st-color-border)",
                      borderRadius: "var(--st-radius-2)",
                    }}
                  >
                    <Column gap={2}>
                      <Row gap={2} align="start">
                        <IconComponent size={16} style={{ color: "var(--st-color-primary)", flexShrink: 0, marginTop: "2px" }} />
                        <Column gap={1}>
                          <Text weight="semibold" size={1}>{item.title}</Text>
                          <Text size={0} tone="muted">{item.description}</Text>
                        </Column>
                      </Row>
                    </Column>
                  </Box>
                );
              })}
            </Grid>
          </Column>
        </Box>
      </Column>
      </Container>
    </Box>
  );
}
