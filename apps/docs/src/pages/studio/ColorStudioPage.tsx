import { useState, useMemo, useCallback } from "react";
import { Container, Stack, Text, Inline, Card, Box } from "@staple-css/primitives";
import {
  generateRamp,
  generateAlphaRamp,
  generateHarmony,
  generatePresetRamp,
  PRESET_TEMPLATES,
  hexToOklch,
  type HarmonyType,
  type PresetTemplate,
} from "@staple-css/tokens/color";
import { ColorPicker } from "../../components/ColorPicker";
import { ColorRamp, ColorSwatch } from "../../components/ColorRamp";
import { ContrastChecker } from "../../components/ContrastChecker";
import { CodePreview } from "../../components/CodePreview";

type Tab = "ramps" | "harmony" | "contrast" | "palettes";

export function ColorStudioPage() {
  const [activeTab, setActiveTab] = useState<Tab>("ramps");

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "ramps", label: "Color Ramps" },
    { id: "harmony", label: "Color Harmony" },
    { id: "contrast", label: "Contrast Checker" },
    { id: "palettes", label: "Custom Palettes" },
  ];

  return (
    <Container size="xl">
      <Stack gap={6}>
        {/* Header */}
        <Stack gap={2}>
          <Text as="h1" size={5} weight="bold">
            Color Studio
          </Text>
          <Text tone="muted">
            Advanced color tools using OKLCH color space for perceptually uniform
            color ramps, accessibility-first contrast checking, and harmonious
            color schemes.
          </Text>
        </Stack>

        {/* Tab Navigation */}
        <Inline gap={0} className="studio-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`studio-tab ${activeTab === tab.id ? "studio-tab--active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </Inline>

        {/* Tab Content */}
        <div className="studio-content">
          {activeTab === "ramps" && <RampsTab />}
          {activeTab === "harmony" && <HarmonyTab />}
          {activeTab === "contrast" && <ContrastTab />}
          {activeTab === "palettes" && <PalettesTab />}
        </div>
      </Stack>
    </Container>
  );
}

// Ramps Tab
function RampsTab() {
  const [baseColor, setBaseColor] = useState("#2563eb");
  const [selectedPreset, setSelectedPreset] = useState<PresetTemplate | "custom">("blue");

  const presets = Object.keys(PRESET_TEMPLATES) as PresetTemplate[];

  // Generate the ramp
  const ramp = useMemo(() => {
    if (selectedPreset === "custom") {
      return generateRamp({ baseColor });
    }
    return generatePresetRamp(selectedPreset);
  }, [baseColor, selectedPreset]);

  const alphaRamp = useMemo(() => {
    const color = selectedPreset === "custom" ? baseColor : ramp[8] || baseColor;
    return generateAlphaRamp(color);
  }, [baseColor, selectedPreset, ramp]);

  // Generate CSS variables
  const cssCode = useMemo(() => {
    const name = selectedPreset === "custom" ? "custom" : selectedPreset;
    const solidVars = ramp.map((color, i) => `  --${name}-${i + 1}: ${color};`).join("\n");
    const alphaVars = alphaRamp.map((color, i) => `  --${name}-a${i + 1}: ${color};`).join("\n");
    return `:root {\n${solidVars}\n\n${alphaVars}\n}`;
  }, [ramp, alphaRamp, selectedPreset]);

  return (
    <Stack gap={6}>
      {/* Controls */}
      <Card pad={4} radius={2}>
        <Stack gap={4}>
          <Inline gap={4} align="end" wrap>
            <Stack gap={1}>
              <Text as="label" size={0} weight="medium">
                Preset
              </Text>
              <select
                value={selectedPreset}
                onChange={(e) => setSelectedPreset(e.target.value as PresetTemplate | "custom")}
                className="studio-select"
              >
                <option value="custom">Custom</option>
                <optgroup label="Radix-like Presets">
                  {presets.map((preset) => (
                    <option key={preset} value={preset}>
                      {preset.charAt(0).toUpperCase() + preset.slice(1)}
                    </option>
                  ))}
                </optgroup>
              </select>
            </Stack>

            {selectedPreset === "custom" && (
              <ColorPicker
                label="Base Color"
                value={baseColor}
                onChange={setBaseColor}
              />
            )}
          </Inline>

          {selectedPreset === "custom" && (
            <Stack gap={1}>
              <Text size={0} tone="muted">
                OKLCH Values
              </Text>
              <Text mono size={1}>
                L: {hexToOklch(baseColor).L.toFixed(3)} | C:{" "}
                {hexToOklch(baseColor).C.toFixed(3)} | H:{" "}
                {hexToOklch(baseColor).H.toFixed(1)}
              </Text>
            </Stack>
          )}
        </Stack>
      </Card>

      {/* 12-Step Ramp */}
      <Stack gap={3}>
        <Text as="h3" size={2} weight="semibold">
          12-Step Solid Ramp
        </Text>
        <ColorRamp colors={ramp} showContrast />
        <div className="color-ramp-details">
          {ramp.map((color, i) => (
            <Stack key={i} gap={0} className="color-ramp-detail">
              <Text size={0} mono weight="medium">
                {i + 1}
              </Text>
              <Text size={0} mono tone="muted">
                {color}
              </Text>
            </Stack>
          ))}
        </div>
      </Stack>

      {/* Alpha Ramp */}
      <Stack gap={3}>
        <Text as="h3" size={2} weight="semibold">
          12-Step Alpha Ramp
        </Text>
        <Box className="alpha-ramp-bg" pad={0}>
          <ColorRamp colors={alphaRamp} showLabels={false} />
        </Box>
        <div className="color-ramp-details">
          {alphaRamp.map((color, i) => (
            <Stack key={i} gap={0} className="color-ramp-detail">
              <Text size={0} mono weight="medium">
                a{i + 1}
              </Text>
              <span
                style={{
                  fontSize: "0.65rem",
                  fontFamily: "var(--st-font-mono)",
                  color: "var(--st-color-text-muted)",
                }}
              >
                {Math.round((i + 1) / 12 * 100)}%
              </span>
            </Stack>
          ))}
        </div>
      </Stack>

      {/* CSS Output */}
      <Stack gap={3}>
        <Text as="h3" size={2} weight="semibold">
          Generated CSS
        </Text>
        <CodePreview code={cssCode} language="css" title="CSS Variables" />
      </Stack>

      {/* Usage Examples */}
      <Stack gap={3}>
        <Text as="h3" size={2} weight="semibold">
          Usage Recommendations
        </Text>
        <Card pad={4} radius={2}>
          <Stack gap={3}>
            <Inline gap={4} wrap>
              <UsageExample color={ramp[0]} label="1-2" description="App background" />
              <UsageExample color={ramp[2]} label="3" description="Subtle background" />
              <UsageExample color={ramp[3]} label="4" description="Component background" />
              <UsageExample color={ramp[4]} label="5" description="Hovered component bg" />
              <UsageExample color={ramp[5]} label="6" description="Active/selected bg" />
              <UsageExample color={ramp[6]} label="7" description="Subtle borders" />
              <UsageExample color={ramp[7]} label="8" description="Borders, focus rings" />
              <UsageExample color={ramp[8]} label="9" description="Solid backgrounds" />
              <UsageExample color={ramp[9]} label="10" description="Hovered solid bg" />
              <UsageExample color={ramp[10]} label="11" description="Low-contrast text" />
              <UsageExample color={ramp[11]} label="12" description="High-contrast text" />
            </Inline>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
}

function UsageExample({
  color,
  label,
  description,
}: {
  color: string | undefined;
  label: string;
  description: string;
}) {
  if (!color) return null;
  return (
    <Inline gap={2} align="center" className="usage-example">
      <Box
        radius={1}
        style={{
          width: "24px",
          height: "24px",
          backgroundColor: color,
          border: "1px solid var(--st-color-border)",
        }}
      />
      <Stack gap={0}>
        <Text size={0} weight="medium">
          Step {label}
        </Text>
        <Text size={0} tone="muted">
          {description}
        </Text>
      </Stack>
    </Inline>
  );
}

// Harmony Tab
function HarmonyTab() {
  const [baseColor, setBaseColor] = useState("#2563eb");

  const harmonies: Array<{ type: HarmonyType; label: string; description: string }> = [
    {
      type: "complementary",
      label: "Complementary",
      description: "Two colors opposite on the color wheel. High contrast, vibrant.",
    },
    {
      type: "split-complementary",
      label: "Split Complementary",
      description: "Base color plus two colors adjacent to its complement. Less tension.",
    },
    {
      type: "analogous",
      label: "Analogous",
      description: "Three colors next to each other on the wheel. Harmonious, serene.",
    },
    {
      type: "triadic",
      label: "Triadic",
      description: "Three colors evenly spaced (120deg apart). Balanced, vibrant.",
    },
    {
      type: "tetradic",
      label: "Tetradic",
      description: "Four colors forming a rectangle. Rich, needs careful balancing.",
    },
    {
      type: "monochrome",
      label: "Monochromatic",
      description: "Variations of one color. Clean, sophisticated, minimal.",
    },
  ];

  return (
    <Stack gap={6}>
      {/* Color Input */}
      <Card pad={4} radius={2}>
        <Inline gap={4} align="end">
          <ColorPicker
            label="Base Color"
            value={baseColor}
            onChange={setBaseColor}
          />
          <Stack gap={1}>
            <Text size={0} tone="muted">
              OKLCH
            </Text>
            <Text mono size={1}>
              L: {hexToOklch(baseColor).L.toFixed(2)} | C:{" "}
              {hexToOklch(baseColor).C.toFixed(2)} | H:{" "}
              {hexToOklch(baseColor).H.toFixed(0)}deg
            </Text>
          </Stack>
        </Inline>
      </Card>

      {/* Harmony Schemes */}
      <div className="harmony-grid">
        {harmonies.map(({ type, label, description }) => {
          const colors = generateHarmony(baseColor, type);
          return (
            <Card key={type} pad={4} radius={2}>
              <Stack gap={3}>
                <Stack gap={1}>
                  <Text weight="semibold">{label}</Text>
                  <Text size={0} tone="muted">
                    {description}
                  </Text>
                </Stack>
                <Inline gap={2} wrap>
                  {colors.map((color, i) => (
                    <ColorSwatch key={i} color={color} size="md" />
                  ))}
                </Inline>
              </Stack>
            </Card>
          );
        })}
      </div>
    </Stack>
  );
}

// Contrast Tab
function ContrastTab() {
  const [foreground, setForeground] = useState("#ffffff");
  const [background, setBackground] = useState("#2563eb");

  const swapColors = useCallback(() => {
    const temp = foreground;
    setForeground(background);
    setBackground(temp);
  }, [foreground, background]);

  return (
    <Stack gap={6}>
      {/* Color Inputs */}
      <Card pad={4} radius={2}>
        <Inline gap={4} align="end" wrap>
          <ColorPicker
            label="Text Color"
            value={foreground}
            onChange={setForeground}
          />
          <button onClick={swapColors} className="studio-btn">
            Swap
          </button>
          <ColorPicker
            label="Background Color"
            value={background}
            onChange={setBackground}
          />
        </Inline>
      </Card>

      {/* Contrast Results */}
      <ContrastChecker foreground={foreground} background={background} />

      {/* Info */}
      <Card pad={4} radius={2}>
        <Stack gap={3}>
          <Text as="h3" size={2} weight="semibold">
            About Contrast Standards
          </Text>
          <Stack gap={2}>
            <Text size={1}>
              <strong>WCAG 2.1</strong> uses a contrast ratio formula. AA requires 4.5:1 for
              normal text, 3:1 for large text. AAA requires 7:1 and 4.5:1 respectively.
            </Text>
            <Text size={1}>
              <strong>APCA (WCAG 3.0 Draft)</strong> is more perceptually accurate. It uses
              Lightness Contrast (Lc) values. Higher values indicate better readability.
              APCA considers text polarity (light-on-dark vs dark-on-light).
            </Text>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}

// Palettes Tab
function PalettesTab() {
  const [palettes, setPalettes] = useState<
    Array<{ name: string; baseColor: string; colors: string[] }>
  >([]);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("#2563eb");

  const addPalette = useCallback(() => {
    if (!newName.trim()) return;
    const colors = generateRamp({ baseColor: newColor });
    setPalettes((prev) => [
      ...prev,
      { name: newName.trim().toLowerCase().replace(/\s+/g, "-"), baseColor: newColor, colors },
    ]);
    setNewName("");
  }, [newName, newColor]);

  const removePalette = useCallback((index: number) => {
    setPalettes((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const exportPalettes = useCallback(() => {
    if (palettes.length === 0) return;

    const css = `:root {\n${palettes
      .map(
        (p) =>
          `  /* ${p.name} */\n` +
          p.colors.map((c, i) => `  --${p.name}-${i + 1}: ${c};`).join("\n")
      )
      .join("\n\n")}\n}`;

    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "custom-palettes.css";
    a.click();
    URL.revokeObjectURL(url);
  }, [palettes]);

  const exportJson = useCallback(() => {
    if (palettes.length === 0) return;
    const json = JSON.stringify(palettes, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "custom-palettes.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [palettes]);

  const importJson = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const text = await file.text();
        try {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) {
            setPalettes(parsed);
          }
        } catch {
          alert("Invalid JSON file");
        }
      }
    };
    input.click();
  }, []);

  return (
    <Stack gap={6}>
      {/* Add Palette */}
      <Card pad={4} radius={2}>
        <Stack gap={4}>
          <Text as="h3" size={2} weight="semibold">
            Create Custom Palette
          </Text>
          <Inline gap={4} align="end" wrap>
            <Stack gap={1}>
              <Text as="label" size={0} weight="medium">
                Palette Name
              </Text>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., brand, accent"
                className="studio-text-input"
              />
            </Stack>
            <ColorPicker label="Base Color" value={newColor} onChange={setNewColor} />
            <button onClick={addPalette} className="studio-btn studio-btn--primary">
              Add Palette
            </button>
          </Inline>
        </Stack>
      </Card>

      {/* Palette List */}
      {palettes.length > 0 && (
        <Stack gap={4}>
          <Inline gap={2} align="center" justify="between">
            <Text as="h3" size={2} weight="semibold">
              Custom Palettes ({palettes.length})
            </Text>
            <Inline gap={2}>
              <button onClick={importJson} className="studio-btn">
                Import JSON
              </button>
              <button onClick={exportJson} className="studio-btn">
                Export JSON
              </button>
              <button onClick={exportPalettes} className="studio-btn studio-btn--primary">
                Export CSS
              </button>
            </Inline>
          </Inline>

          <Stack gap={4}>
            {palettes.map((palette, index) => (
              <Card key={index} pad={4} radius={2}>
                <Stack gap={3}>
                  <Inline gap={2} align="center" justify="between">
                    <Inline gap={2} align="center">
                      <Text weight="semibold">{palette.name}</Text>
                      <Text size={0} mono tone="muted">
                        {palette.baseColor}
                      </Text>
                    </Inline>
                    <button
                      onClick={() => removePalette(index)}
                      className="studio-btn studio-btn--danger studio-btn--sm"
                    >
                      Remove
                    </button>
                  </Inline>
                  <ColorRamp colors={palette.colors} showContrast />
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>
      )}

      {palettes.length === 0 && (
        <Card pad={6} radius={2}>
          <Stack gap={2} align="center">
            <Text tone="muted">No custom palettes yet.</Text>
            <Text size={1} tone="muted">
              Create a palette above or import from JSON.
            </Text>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
