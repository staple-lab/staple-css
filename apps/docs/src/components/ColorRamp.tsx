import { Stack, Text, Inline, Box } from "@staple-css/primitives";
import { wcagContrastHex } from "@staple-css/tokens/color";

interface ColorRampProps {
  colors: string[];
  name?: string;
  showLabels?: boolean;
  showContrast?: boolean;
}

export function ColorRamp({
  colors,
  name,
  showLabels = true,
  showContrast = false,
}: ColorRampProps) {
  return (
    <Stack gap={2}>
      {name && (
        <Text size={1} weight="medium">
          {name}
        </Text>
      )}
      <Inline gap={0} className="color-ramp">
        {colors.map((color, i) => (
          <div
            key={i}
            className="color-ramp-step"
            style={{ backgroundColor: color }}
            title={showLabels ? `${i + 1}: ${color}` : color}
          >
            {showContrast && (
              <span
                className="color-ramp-contrast"
                style={{
                  color: wcagContrastHex("#ffffff", color) > 4.5 ? "#fff" : "#000",
                  fontSize: "var(--st-font-size-0)",
                  fontFamily: "var(--st-font-mono)",
                }}
              >
                {i + 1}
              </span>
            )}
          </div>
        ))}
      </Inline>
      {showLabels && (
        <Inline gap={0} className="color-ramp-labels">
          {colors.map((color, i) => (
            <Text key={i} size={0} mono tone="muted" className="color-ramp-label">
              {i + 1}
            </Text>
          ))}
        </Inline>
      )}
    </Stack>
  );
}

interface ColorSwatchProps {
  color: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  showHex?: boolean;
}

export function ColorSwatch({
  color,
  size = "md",
  label,
  showHex = true,
}: ColorSwatchProps) {
  const sizeMap = { sm: "1.5rem", md: "2.5rem", lg: "4rem" };

  return (
    <Stack gap={1} align="center">
      <Box
        radius={2}
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          backgroundColor: color,
          border: "1px solid var(--st-color-border)",
        }}
      />
      {label && (
        <Text size={0} weight="medium">
          {label}
        </Text>
      )}
      {showHex && (
        <Text size={0} mono tone="muted">
          {color}
        </Text>
      )}
    </Stack>
  );
}
