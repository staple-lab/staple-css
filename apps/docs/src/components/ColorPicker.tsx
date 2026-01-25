import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { Stack, Text, Inline } from "@staple-css/primitives";
import { hexToOklch, generateHarmony, type HarmonyType } from "@staple-css/tokens/color";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  showOklch?: boolean;
  showHarmony?: boolean;
  colorName?: string; // Name for generating harmony color names
  onAddColor?: (name: string, color: string) => void; // Callback to add a new color scale
}

const HARMONY_TYPES: { type: HarmonyType; label: string; description: string }[] = [
  { type: "complementary", label: "Complementary", description: "Opposite on color wheel - high contrast" },
  { type: "split-complementary", label: "Split Complementary", description: "Two colors adjacent to complement" },
  { type: "triadic", label: "Triadic", description: "Three colors evenly spaced (120°)" },
  { type: "tetradic", label: "Tetradic", description: "Four colors in rectangle pattern" },
  { type: "analogous", label: "Analogous", description: "Adjacent colors - harmonious feel" },
];

// Convert hex to HSL
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: l * 100 };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  switch (max) {
    case r:
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      break;
    case g:
      h = ((b - r) / d + 2) / 6;
      break;
    case b:
      h = ((r - g) / d + 4) / 6;
      break;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

// Convert HSL to hex
function hslToHex(h: number, s: number, l: number): string {
  s = s / 100;
  l = l / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function ColorPicker({ value, onChange, label, showOklch = false, showHarmony = false, colorName, onAddColor }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  // Generate harmony colors from current value
  const harmonyColors = useMemo(() => {
    if (!showHarmony || !/^#[0-9a-fA-F]{6}$/.test(value)) return null;
    try {
      return HARMONY_TYPES.map(({ type, label, description }) => ({
        type,
        label,
        description,
        colors: generateHarmony(value, type),
      }));
    } catch {
      return null;
    }
  }, [value, showHarmony]);

  // Sync internal state with external value
  useEffect(() => {
    setInputValue(value);
    try {
      if (/^#[0-9a-fA-F]{6}$/.test(value)) {
        const hsl = hexToHsl(value);
        setHue(hsl.h);
        setSaturation(hsl.s);
        setLightness(hsl.l);
      }
    } catch {
      // Invalid color, ignore
    }
  }, [value]);

  // Close picker when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      if (/^#[0-9a-fA-F]{6}$/.test(newValue)) {
        onChange(newValue);
      }
    },
    [onChange]
  );

  const updateColorFromHsl = useCallback(
    (h: number, s: number, l: number) => {
      const hex = hslToHex(h, s, l);
      setInputValue(hex);
      onChange(hex);
    },
    [onChange]
  );

  const handleGradientInteraction = useCallback(
    (clientX: number, clientY: number) => {
      if (!gradientRef.current) return;

      const rect = gradientRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

      // x = saturation (0-100), y = lightness (100-0)
      const s = x * 100;
      const l = (1 - y) * 100;

      setSaturation(s);
      setLightness(l);
      updateColorFromHsl(hue, s, l);
    },
    [hue, updateColorFromHsl]
  );

  const handleGradientMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      handleGradientInteraction(e.clientX, e.clientY);

      const handleMouseMove = (e: MouseEvent) => {
        handleGradientInteraction(e.clientX, e.clientY);
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleGradientInteraction]
  );

  const handleHueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const h = Number(e.target.value);
      setHue(h);
      updateColorFromHsl(h, saturation, lightness);
    },
    [saturation, lightness, updateColorFromHsl]
  );

  // Calculate OKLCH values for display
  let oklchValues = { L: 0, C: 0, H: 0 };
  try {
    oklchValues = hexToOklch(value);
  } catch {
    // Invalid color
  }

  // Calculate cursor position from saturation/lightness
  const cursorX = saturation;
  const cursorY = 100 - lightness;

  return (
    <Stack gap={1}>
      {label && (
        <Text as="label" size={0} weight="medium">
          {label}
        </Text>
      )}
      <div className="color-picker-container" ref={containerRef}>
        <Inline gap={2} align="center">
          <button
            type="button"
            className="color-picker-swatch"
            style={{ backgroundColor: value }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open color picker"
          />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="color-picker-input"
            placeholder="#000000"
            spellCheck={false}
          />
        </Inline>

        {isOpen && (
          <div className={`color-picker-popover ${showHarmony && harmonyColors ? "color-picker-popover--with-harmony" : ""}`}>
            <div className="color-picker-main">
              {/* Saturation/Lightness gradient */}
              <div
                ref={gradientRef}
                className="color-picker-gradient"
                style={{
                  background: `
                    linear-gradient(to bottom, transparent 0%, #000 100%),
                    linear-gradient(to right, #fff 0%, hsl(${hue}, 100%, 50%) 100%)
                  `,
                }}
                onMouseDown={handleGradientMouseDown}
              >
                <div
                  className="color-picker-cursor"
                  style={{
                    left: `${cursorX}%`,
                    top: `${cursorY}%`,
                  }}
                />
              </div>

              {/* Hue slider */}
              <div className="color-picker-hue-track">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hue}
                  onChange={handleHueChange}
                  className="color-picker-hue-slider"
                />
              </div>

              {/* Current color display */}
              <div className="color-picker-footer">
                <div
                  className="color-picker-current"
                  style={{ backgroundColor: value }}
                />
                <span className="color-picker-hex">{value.toUpperCase()}</span>
              </div>
            </div>

            {/* Harmony panel - side by side */}
            {showHarmony && harmonyColors && (
              <div className="color-picker-harmony-panel">
                <div className="color-picker-harmony-header">
                  <Text size={0} weight="medium">Harmonies</Text>
                </div>
                {harmonyColors.map(({ type, label, description, colors }) => (
                  <div key={type} className="color-picker-harmony-section">
                    <div className="color-picker-harmony-info">
                      <span className="color-picker-harmony-label">{label}</span>
                      <span className="color-picker-harmony-desc">{description}</span>
                    </div>
                    <div className="color-picker-harmony-swatches">
                      {colors.map((color, i) => {
                        const harmonyName = colorName ? `${colorName}-${type}${colors.length > 1 ? `-${i + 1}` : ""}` : undefined;
                        return (
                          <div key={i} className="color-picker-harmony-color">
                            <button
                              type="button"
                              className="color-picker-harmony-swatch"
                              style={{ backgroundColor: color }}
                              onClick={() => {
                                onChange(color);
                              }}
                              title={`Use ${color.toUpperCase()}`}
                            />
                            {onAddColor && harmonyName && (
                              <button
                                type="button"
                                className="color-picker-harmony-add"
                                onClick={() => {
                                  onAddColor(harmonyName, color);
                                }}
                                title={`Add as new color: ${harmonyName}`}
                              >
                                +
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showOklch && (
        <Text size={0} tone="muted">
          L: {(oklchValues.L * 100).toFixed(1)}% C: {oklchValues.C.toFixed(3)} H: {oklchValues.H.toFixed(0)}°
        </Text>
      )}
    </Stack>
  );
}
