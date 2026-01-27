import { useState } from "react";
import { Column, Row, Text, Card, Box, Grid, Flex } from "@staple-css/primitives/full";

interface ColorStop {
  color: string;
  position: number; // 0-100
}

interface GradientConfig {
  name: string;
  angle: number; // 0-360 for linear gradients
  stops: ColorStop[];
  type: "linear" | "radial";
}

export function GradientMaker() {
  const [gradient, setGradient] = useState<GradientConfig>({
    name: "My Gradient",
    angle: 135,
    stops: [
      { color: "#3b82f6", position: 0 },
      { color: "#ec4899", position: 100 },
    ],
    type: "linear",
  });

  const [selectedStopIndex, setSelectedStopIndex] = useState(0);

  const generateGradientCss = (): string => {
    const sortedStops = [...gradient.stops].sort((a, b) => a.position - b.position);
    const stopStrings = sortedStops
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(", ");

    if (gradient.type === "linear") {
      return `linear-gradient(${gradient.angle}deg, ${stopStrings})`;
    } else {
      return `radial-gradient(circle, ${stopStrings})`;
    }
  };

  const generateCssVariable = (): string => {
    const kebabName = gradient.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    return `--st-gradient-${kebabName}`;
  };

  const addColorStop = () => {
    const newPosition = 50;
    const newColor = "#8b5cf6";
    setGradient({
      ...gradient,
      stops: [...gradient.stops, { color: newColor, position: newPosition }],
    });
  };

  const removeColorStop = (index: number) => {
    if (gradient.stops.length > 2) {
      setGradient({
        ...gradient,
        stops: gradient.stops.filter((_, i) => i !== index),
      });
      if (selectedStopIndex >= gradient.stops.length - 1) {
        setSelectedStopIndex(gradient.stops.length - 2);
      }
    }
  };

  const updateColorStop = (index: number, stop: Partial<ColorStop>) => {
    const updated = [...gradient.stops];
    updated[index] = { ...updated[index], ...stop };
    setGradient({ ...gradient, stops: updated });
  };

  const cssGradient = generateGradientCss();

  return (
    <Column gap={6}>
      {/* Title */}
      <Column gap={2}>
        <Text as="h2" size={3} weight="semibold">
          ✨ Gradient Maker
        </Text>
        <Text size={1} tone="muted">
          Create custom gradients and export them as CSS variables for your design system.
        </Text>
      </Column>

      <Grid cols={{ base: 1, lg: 2 }} gap={6}>
        {/* Preview & Controls */}
        <Column gap={4}>
          {/* Preview */}
          <Card pad={0} radius={3} shadow={1} style={{ overflow: "hidden" }}>
            <Box
              style={{
                background: cssGradient,
                height: "200px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                padding: "var(--st-space-4)",
              }}
            >
              <Text weight="semibold" style={{ color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                {gradient.name}
              </Text>
            </Box>
          </Card>

          {/* Name Input */}
          <Column gap={1}>
            <Text weight="medium" size={0}>
              Name
            </Text>
            <input
              type="text"
              value={gradient.name}
              onChange={(e) => setGradient({ ...gradient, name: e.target.value })}
              style={{
                padding: "var(--st-space-2) var(--st-space-3)",
                borderRadius: "var(--st-radius-2)",
                border: "1px solid var(--st-color-border)",
                fontFamily: "var(--st-font-sans)",
                fontSize: "var(--st-font-size-1)",
                width: "100%",
              }}
            />
          </Column>

          {/* Type Selection */}
          <Column gap={2}>
            <Text weight="medium" size={0}>
              Type
            </Text>
            <Row gap={2}>
              {(["linear", "radial"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setGradient({ ...gradient, type })}
                  style={{
                    padding: "var(--st-space-2) var(--st-space-4)",
                    borderRadius: "var(--st-radius-2)",
                    border: gradient.type === type ? "2px solid var(--st-color-primary)" : "1px solid var(--st-color-border)",
                    background: gradient.type === type ? "var(--st-color-primary)" : "transparent",
                    color: gradient.type === type ? "white" : "var(--st-color-text)",
                    cursor: "pointer",
                    fontSize: "var(--st-font-size-0)",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {type}
                </button>
              ))}
            </Row>
          </Column>

          {/* Angle Control (for linear) */}
          {gradient.type === "linear" && (
            <Column gap={2}>
              <Row gap={2} align="center">
                <Text weight="medium" size={0}>
                  Angle
                </Text>
                <Text size={0} tone="muted">
                  {gradient.angle}°
                </Text>
              </Row>
              <input
                type="range"
                min="0"
                max="360"
                value={gradient.angle}
                onChange={(e) => setGradient({ ...gradient, angle: parseInt(e.target.value) })}
                style={{
                  width: "100%",
                  cursor: "pointer",
                }}
              />
            </Column>
          )}
        </Column>

        {/* Color Stops */}
        <Column gap={4}>
          <Column gap={2}>
            <Text weight="medium" size={1}>
              Color Stops
            </Text>
            <Column gap={2}>
              {gradient.stops.map((stop, index) => (
                <Card
                  key={index}
                  pad={3}
                  radius={2}
                  shadow={0}
                  style={{
                    border: selectedStopIndex === index ? "2px solid var(--st-color-primary)" : "1px solid var(--st-color-border)",
                    cursor: "pointer",
                    background:
                      selectedStopIndex === index ? "var(--st-color-surface-raised)" : "var(--st-color-surface)",
                  }}
                  onClick={() => setSelectedStopIndex(index)}
                >
                  <Row gap={3} align="center">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateColorStop(index, { color: e.target.value })}
                      style={{ width: "48px", height: "32px", border: "none", borderRadius: "var(--st-radius-1)", cursor: "pointer" }}
                    />
                    <Column gap={1} style={{ flex: 1 }}>
                      <Row gap={2}>
                        <Text size={0} weight="semibold">
                          {stop.color.toUpperCase()}
                        </Text>
                        <Text size={0} tone="muted">
                          {stop.position}%
                        </Text>
                      </Row>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={stop.position}
                        onChange={(e) => updateColorStop(index, { position: parseInt(e.target.value) })}
                        style={{ width: "100%", cursor: "pointer" }}
                      />
                    </Column>
                    {gradient.stops.length > 2 && (
                      <button
                        onClick={() => removeColorStop(index)}
                        style={{
                          padding: "var(--st-space-1) var(--st-space-3)",
                          borderRadius: "var(--st-radius-2)",
                          border: "1px solid var(--st-color-danger)",
                          background: "transparent",
                          color: "var(--st-color-danger)",
                          cursor: "pointer",
                          fontSize: "var(--st-font-size-0)",
                          fontWeight: "600",
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </Row>
                </Card>
              ))}
            </Column>

            {/* Add Color Stop Button */}
            <button
              onClick={addColorStop}
              style={{
                padding: "var(--st-space-3)",
                borderRadius: "var(--st-radius-2)",
                border: "2px dashed var(--st-color-primary)",
                background: "transparent",
                color: "var(--st-color-primary)",
                cursor: "pointer",
                fontSize: "var(--st-font-size-0)",
                fontWeight: "600",
                transition: "all var(--st-duration-fast) var(--st-easing-default)",
              }}
            >
              + Add Color Stop
            </button>
          </Column>
        </Column>
      </Grid>

      {/* Export Section */}
      <Card pad={6} radius={3} shadow={1} style={{ borderTop: "3px solid var(--st-color-primary)" }}>
        <Column gap={4}>
          <Column gap={1}>
            <Text weight="semibold" size={1}>
              CSS Export
            </Text>
            <Text size={0} tone="muted">
              Copy and paste into your stylesheet
            </Text>
          </Column>

          <pre
            style={{
              background: "var(--st-color-surface)",
              padding: "var(--st-space-4)",
              borderRadius: "var(--st-radius-2)",
              overflow: "auto",
              fontSize: "var(--st-font-size-0)",
              fontFamily: "var(--st-font-mono)",
              border: "1px solid var(--st-color-border)",
            }}
          >
            <code>{`:root {
  ${generateCssVariable()}: ${cssGradient};
}`}</code>
          </pre>

          <Column gap={2}>
            <Text weight="semibold" size={0}>
              Raw CSS:
            </Text>
            <pre
              style={{
                background: "var(--st-color-surface)",
                padding: "var(--st-space-4)",
                borderRadius: "var(--st-radius-2)",
                overflow: "auto",
                fontSize: "var(--st-font-size-0)",
                fontFamily: "var(--st-font-mono)",
                border: "1px solid var(--st-color-border)",
              }}
            >
              <code>
{`.element {
  background: ${cssGradient};
}`}
              </code>
            </pre>
          </Column>

          {/* Copy Buttons */}
          <Row gap={2}>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generateCssVariable());
              }}
              style={{
                flex: 1,
                padding: "var(--st-space-3)",
                borderRadius: "var(--st-radius-2)",
                border: "1px solid var(--st-color-primary)",
                background: "var(--st-color-primary)",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "var(--st-font-size-0)",
              }}
            >
              📋 Copy Variable Name
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(cssGradient);
              }}
              style={{
                flex: 1,
                padding: "var(--st-space-3)",
                borderRadius: "var(--st-radius-2)",
                border: "1px solid var(--st-color-primary)",
                background: "var(--st-color-primary)",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "var(--st-font-size-0)",
              }}
            >
              📋 Copy Gradient
            </button>
          </Row>
        </Column>
      </Card>

      {/* Quick Presets */}
      <Column gap={3}>
        <Text weight="semibold" size={1}>
          Quick Presets
        </Text>
        <Grid cols={{ base: 2, md: 3 }} gap={3}>
          {[
            { name: "Blue to Purple", stops: [{ color: "#3b82f6", position: 0 }, { color: "#a855f7", position: 100 }], angle: 135 },
            { name: "Green to Teal", stops: [{ color: "#10b981", position: 0 }, { color: "#06b6d4", position: 100 }], angle: 135 },
            { name: "Orange to Red", stops: [{ color: "#f97316", position: 0 }, { color: "#ef4444", position: 100 }], angle: 135 },
            { name: "Yellow to Orange", stops: [{ color: "#eab308", position: 0 }, { color: "#f59e0b", position: 100 }], angle: 135 },
            { name: "Pink to Rose", stops: [{ color: "#ec4899", position: 0 }, { color: "#f43f5e", position: 100 }], angle: 135 },
            { name: "Violet to Pink", stops: [{ color: "#8b5cf6", position: 0 }, { color: "#ec4899", position: 100 }], angle: 135 },
          ].map((preset) => (
            <button
              key={preset.name}
              onClick={() => setGradient({ ...gradient, name: preset.name, stops: preset.stops, angle: preset.angle })}
              style={{
                padding: "var(--st-space-4)",
                borderRadius: "var(--st-radius-2)",
                border: "1px solid var(--st-color-border)",
                background: `linear-gradient(${preset.angle}deg, ${preset.stops.map((s) => `${s.color} ${s.position}%`).join(", ")})`,
                cursor: "pointer",
                height: "80px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                fontSize: "var(--st-font-size-0)",
                fontWeight: "600",
                color: "white",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                transition: "all var(--st-duration-fast) var(--st-easing-default)",
              }}
            >
              {preset.name}
            </button>
          ))}
        </Grid>
      </Column>
    </Column>
  );
}
