import { useState } from "react";
import { Column, Row, Text, Box } from "@staple-css/primitives/full";

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
    }
  };

  const updateColorStop = (index: number, stop: Partial<ColorStop>) => {
    const updated = [...gradient.stops];
    const existing = updated[index];
    if (existing) {
      updated[index] = {
        color: stop.color ?? existing.color,
        position: stop.position ?? existing.position,
      };
      setGradient({ ...gradient, stops: updated });
    }
  };

  const cssGradient = generateGradientCss();

  return (
    <Column gap={3}>
      {/* Preview */}
      <Box
        style={{
          background: cssGradient,
          height: "120px",
          borderRadius: "var(--st-radius-2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text weight="semibold" size={1} style={{ color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
          {gradient.name}
        </Text>
      </Box>

      {/* Controls Row */}
      <Row gap={3} align="center" style={{ flexWrap: "wrap" }}>
        {/* Name */}
        <div style={{ minWidth: "150px", flex: 1 }}>
          <input
            type="text"
            value={gradient.name}
            onChange={(e) => setGradient({ ...gradient, name: e.target.value })}
            placeholder="Gradient name"
            style={{
              padding: "var(--st-space-1) var(--st-space-2)",
              borderRadius: "var(--st-radius-2)",
              border: "1px solid var(--st-color-border)",
              fontSize: "var(--st-font-size-0)",
              width: "100%",
            }}
          />
        </div>

        {/* Type Buttons */}
        <Row gap={1}>
          {(["linear", "radial"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setGradient({ ...gradient, type })}
              style={{
                padding: "var(--st-space-1) var(--st-space-2)",
                borderRadius: "var(--st-radius-1)",
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

        {/* Angle (for linear) */}
        {gradient.type === "linear" && (
          <div style={{ display: "flex", alignItems: "center", gap: "var(--st-space-2)", minWidth: "180px" }}>
            <Text size={0} weight="medium" style={{ whiteSpace: "nowrap" }}>
              Angle:
            </Text>
            <input
              type="range"
              min="0"
              max="360"
              value={gradient.angle}
              onChange={(e) => setGradient({ ...gradient, angle: parseInt(e.target.value) })}
              style={{ flex: 1, cursor: "pointer" }}
            />
            <Text size={0} tone="muted" style={{ minWidth: "35px", textAlign: "right" }}>
              {gradient.angle}°
            </Text>
          </div>
        )}
      </Row>

      {/* Color Stops - Horizontal Compact */}
      <Column gap={2}>
        <Text weight="medium" size={0}>
          Color Stops
        </Text>
        <Row gap={2} align="center" style={{ flexWrap: "wrap" }}>
          {gradient.stops.map((stop, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--st-space-1)",
                padding: "var(--st-space-1) var(--st-space-2)",
                background: "var(--st-color-surface)",
                border: "1px solid var(--st-color-border)",
                borderRadius: "var(--st-radius-2)",
              }}
            >
              <input
                type="color"
                value={stop.color}
                onChange={(e) => updateColorStop(index, { color: e.target.value })}
                style={{
                  width: "28px",
                  height: "28px",
                  border: "none",
                  borderRadius: "var(--st-radius-1)",
                  cursor: "pointer",
                }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={stop.position}
                onChange={(e) => updateColorStop(index, { position: parseInt(e.target.value) })}
                style={{ width: "80px", cursor: "pointer" }}
              />
              <Text size={0} tone="muted" style={{ minWidth: "35px", textAlign: "center" }}>
                {stop.position}%
              </Text>
              {gradient.stops.length > 2 && (
                <button
                  onClick={() => removeColorStop(index)}
                  style={{
                    padding: "var(--st-space-1) var(--st-space-2)",
                    borderRadius: "var(--st-radius-1)",
                    border: "1px solid var(--st-color-danger)",
                    background: "transparent",
                    color: "var(--st-color-danger)",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addColorStop}
            style={{
              padding: "var(--st-space-1) var(--st-space-2)",
              borderRadius: "var(--st-radius-2)",
              border: "1px dashed var(--st-color-primary)",
              background: "transparent",
              color: "var(--st-color-primary)",
              cursor: "pointer",
              fontSize: "var(--st-font-size-0)",
              fontWeight: "600",
            }}
          >
            + Add
          </button>
        </Row>
      </Column>

    </Column>
  );
}
