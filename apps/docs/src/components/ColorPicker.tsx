import { useCallback, useState, useEffect } from "react";
import { Stack, Text, Inline } from "@staple-css/primitives";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

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

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <Stack gap={1}>
      {label && (
        <Text as="label" size={0} weight="medium">
          {label}
        </Text>
      )}
      <Inline gap={2} align="center">
        <input
          type="color"
          value={value}
          onChange={handleColorChange}
          className="studio-color-input"
        />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="studio-text-input"
          placeholder="#000000"
          pattern="^#[0-9a-fA-F]{6}$"
        />
      </Inline>
    </Stack>
  );
}
