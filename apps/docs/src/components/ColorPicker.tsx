import { useCallback, useState, useEffect, useRef } from "react";
import { Stack, Text, Inline, Box } from "@staple-css/primitives";
import { hexToOklch, oklchToHex, clampToGamut } from "@staple-css/tokens/color";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  showOklch?: boolean;
}

export function ColorPicker({ value, onChange, label, showOklch = false }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);
  const pickerRef = useRef<HTMLDivElement>(null);
  const satLightRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef(hue);
  hueRef.current = hue;

  // Sync internal state with external value
  useEffect(() => {
    setInputValue(value);
    try {
      const oklch = hexToOklch(value);
      setHue(oklch.H);
      setLightness(oklch.L * 100);
      setSaturation(Math.min(oklch.C * 400, 100)); // Scale chroma to 0-100
    } catch {
      // Invalid color, ignore
    }
  }, [value]);

  // Close picker when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
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

  const updateColorFromOklch = useCallback(
    (h: number, s: number, l: number) => {
      const clamped = clampToGamut({
        L: l / 100,
        C: s / 400, // Scale back from 0-100 to typical chroma range
        H: h,
      });
      const hex = oklchToHex(clamped);
      setInputValue(hex);
      onChange(hex);
    },
    [onChange]
  );

  const handleHueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const h = Number(e.target.value);
      setHue(h);
      updateColorFromOklch(h, saturation, lightness);
    },
    [saturation, lightness, updateColorFromOklch]
  );

  const handleSatLightMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      const updateFromMouse = (clientX: number, clientY: number) => {
        // Get fresh rect on each update to handle scrolling/layout changes
        const rect = satLightRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
        const s = x * 100;
        const l = (1 - y) * 100;
        setSaturation(s);
        setLightness(l);
        // Use ref to get latest hue value
        updateColorFromOklch(hueRef.current, s, l);
      };

      updateFromMouse(e.clientX, e.clientY);

      const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        updateFromMouse(e.clientX, e.clientY);
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [updateColorFromOklch]
  );

  // Calculate OKLCH values for display
  let oklchValues = { L: 0, C: 0, H: 0 };
  try {
    oklchValues = hexToOklch(value);
  } catch {
    // Invalid color
  }

  return (
    <Stack gap={1}>
      {label && (
        <Text as="label" size={0} weight="medium">
          {label}
        </Text>
      )}
      <div className="color-picker-container" ref={pickerRef}>
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
          <div className="color-picker-popover">
            {/* Saturation/Lightness area */}
            <div
              ref={satLightRef}
              className="color-picker-satlight"
              style={{
                background: `
                  linear-gradient(to top, #000, transparent),
                  linear-gradient(to right, #fff, oklch(0.65 0.25 ${hue}))
                `,
              }}
              onMouseDown={handleSatLightMouseDown}
            >
              <div
                className="color-picker-cursor"
                style={{
                  left: `${saturation}%`,
                  top: `${100 - lightness}%`,
                }}
              />
            </div>

            {/* Hue slider */}
            <div className="color-picker-hue-container">
              <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={handleHueChange}
                className="color-picker-hue-slider"
              />
            </div>

            {/* Preview and value */}
            <Inline gap={2} align="center" className="color-picker-preview-row">
              <div
                className="color-picker-preview"
                style={{ backgroundColor: value }}
              />
              <Text size={0} tone="muted" className="color-picker-value">
                {value.toUpperCase()}
              </Text>
            </Inline>
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
