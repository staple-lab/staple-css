import { useState, useRef } from "react";
import { Column, Row, Text, Box } from "@staple-css/primitives/full";
import { Copy } from "lucide-react";

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

  const [draggingStop, setDraggingStop] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

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

  const handlePreviewMouseDown = (e: React.MouseEvent<HTMLDivElement>, stopIndex: number) => {
    e.preventDefault();
    setDraggingStop(stopIndex);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingStop === null || !previewRef.current) return;

    const rect = previewRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = Math.round((x / rect.width) * 100);

    updateColorStop(draggingStop, { position: percentage });
  };

  const handleMouseUp = () => {
    setDraggingStop(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cssGradient = generateGradientCss();
  const previewWidth = previewRef.current?.offsetWidth || 400;
  const previewHeight = 120;

  return (
    <Column gap={4}>
      {/* Preview with draggable color stops */}
      <Column gap={2}>
        <Row justify="between" align="center">
          <Text weight="medium" size={0}>
            Preview
          </Text>
          <Row gap={1} align="center" style={{ fontSize: "12px", color: "var(--st-color-text-muted)" }}>
            <Text size={0} tone="muted">
              {previewWidth}×{previewHeight}px
            </Text>
          </Row>
        </Row>
        <div
          ref={previewRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            background: cssGradient,
            height: `${previewHeight}px`,
            borderRadius: "var(--st-radius-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            cursor: draggingStop !== null ? "grabbing" : "grab",
            userSelect: "none",
          }}
        >
          {/* Draggable color stop handles */}
          {gradient.stops.map((stop, index) => (
            <div
              key={index}
              onMouseDown={(e) => handlePreviewMouseDown(e, index)}
              style={{
                position: "absolute",
                left: `${stop.position}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "16px",
                height: "16px",
                background: stop.color,
                borderRadius: "50%",
                border: "2px solid white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                cursor: "grab",
              }}
              title={`${stop.color} at ${stop.position}%`}
            />
          ))}

          <Text weight="semibold" size={1} style={{ color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
            {gradient.name}
          </Text>
        </div>
      </Column>

      {/* CSS Output */}
      <Column gap={2}>
        <Text weight="medium" size={0}>
          CSS Output
        </Text>
        <Box
          style={{
            background: "var(--st-color-surface)",
            border: "1px solid var(--st-color-border)",
            borderRadius: "var(--st-radius-2)",
            padding: "var(--st-space-3)",
            position: "relative",
          }}
        >
          <Column gap={2}>
            <Row justify="between" align="start">
              <Column gap={1} style={{ flex: 1 }}>
                <Text size={0} tone="muted" style={{ fontFamily: "monospace", wordBreak: "break-all" }}>
                  background: {cssGradient};
                </Text>
              </Column>
              <button
                onClick={() => copyToClipboard(`background: ${cssGradient};`)}
                style={{
                  padding: "var(--st-space-1) var(--st-space-2)",
                  borderRadius: "var(--st-radius-1)",
                  border: "1px solid var(--st-color-border)",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "12px",
                  color: copied ? "var(--st-color-success)" : "var(--st-color-text)",
                }}
                title="Copy to clipboard"
              >
                <Copy size={14} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </Row>
            <Row gap={2}>
              <div style={{ flex: 1 }}>
                <Text size={0} tone="muted" style={{ fontFamily: "monospace" }}>
                  var: {generateCssVariable()}
                </Text>
              </div>
              <button
                onClick={() => copyToClipboard(`${generateCssVariable()}: ${cssGradient};`)}
                style={{
                  padding: "var(--st-space-1) var(--st-space-2)",
                  borderRadius: "var(--st-radius-1)",
                  border: "1px solid var(--st-color-border)",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "12px",
                  color: "var(--st-color-text)",
                }}
                title="Copy variable to clipboard"
              >
                <Copy size={14} />
                Copy
              </button>
            </Row>
          </Column>
        </Box>
      </Column>

      {/* Controls */}
      <Column gap={3}>
        {/* Name */}
        <Column gap={1}>
          <Text weight="medium" size={0}>
            Gradient Name
          </Text>
          <input
            type="text"
            value={gradient.name}
            onChange={(e) => setGradient({ ...gradient, name: e.target.value })}
            placeholder="Gradient name"
            style={{
              padding: "var(--st-space-2) var(--st-space-3)",
              borderRadius: "var(--st-radius-2)",
              border: "1px solid var(--st-color-border)",
              fontSize: "var(--st-font-size-1)",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </Column>

        {/* Type & Angle */}
        <Row gap={4} align="start" style={{ flexWrap: "wrap" }}>
          {/* Type Buttons */}
          <Column gap={1}>
            <Text weight="medium" size={0}>
              Type
            </Text>
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
          </Column>

          {/* Angle (for linear) */}
          {gradient.type === "linear" && (
            <Column gap={1} style={{ flex: 1, minWidth: "200px" }}>
              <Row justify="between">
                <Text weight="medium" size={0}>
                  Angle
                </Text>
                <Text size={0} weight="semibold" tone="primary">
                  {gradient.angle}°
                </Text>
              </Row>
              <input
                type="range"
                min="0"
                max="360"
                value={gradient.angle}
                onChange={(e) => setGradient({ ...gradient, angle: parseInt(e.target.value) })}
                style={{ width: "100%", cursor: "pointer" }}
              />
            </Column>
          )}
        </Row>

        {/* Color Stops */}
        <Column gap={1}>
          <Row justify="between" align="center">
            <Text weight="medium" size={0}>
              Color Stops
            </Text>
            <button
              onClick={addColorStop}
              style={{
                padding: "var(--st-space-1) var(--st-space-2)",
                borderRadius: "var(--st-radius-1)",
                border: "1px dashed var(--st-color-primary)",
                background: "transparent",
                color: "var(--st-color-primary)",
                cursor: "pointer",
                fontSize: "var(--st-font-size-0)",
                fontWeight: "600",
              }}
            >
              + Add Stop
            </button>
          </Row>
          <Column gap={2}>
            {gradient.stops.map((stop, index) => (
              <Row key={index} gap={2} align="center">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateColorStop(index, { color: e.target.value })}
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px solid var(--st-color-border)",
                    borderRadius: "var(--st-radius-1)",
                    cursor: "pointer",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <Row gap={2} align="center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stop.position}
                      onChange={(e) => updateColorStop(index, { position: parseInt(e.target.value) })}
                      style={{ flex: 1, cursor: "pointer" }}
                    />
                    <Text size={0} weight="medium" style={{ minWidth: "45px", textAlign: "right" }}>
                      {stop.position}%
                    </Text>
                  </Row>
                </div>
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
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Remove
                  </button>
                )}
              </Row>
            ))}
          </Column>
        </Column>
      </Column>

    </Column>
  );
}
