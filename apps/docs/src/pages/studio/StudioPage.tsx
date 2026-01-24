import { useState, useCallback, useMemo, useEffect } from "react";
import { Container, Stack, Text, Inline, Card, Box } from "@staple-css/primitives";
import {
  defaultConfig,
  validateConfig,
  generateCss,
  type TokenConfig,
  type GeneratedCss,
} from "@staple-css/tokens";
import { ColorPicker } from "../../components/ColorPicker";
import { TabCodePreview } from "../../components/CodePreview";

type Tab = "overview" | "colors" | "space" | "typography" | "motion";

export function StudioPage() {
  const [config, setConfig] = useState<TokenConfig>(defaultConfig);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [validationError, setValidationError] = useState<string | null>(null);

  // Generate CSS from config
  const generatedCss = useMemo<GeneratedCss>(() => {
    return generateCss(config);
  }, [config]);

  // Validate on config change
  useEffect(() => {
    const result = validateConfig(config);
    if (!result.success && result.errors) {
      setValidationError(result.errors.message);
    } else {
      setValidationError(null);
    }
  }, [config]);

  // Config update helpers
  const updateConfig = useCallback((path: string[], value: unknown) => {
    setConfig((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as Record<string, unknown>;
      let obj: Record<string, unknown> = next;
      for (let i = 0; i < path.length - 1; i++) {
        obj = obj[path[i] as string] as Record<string, unknown>;
      }
      obj[path[path.length - 1] as string] = value;
      return next as TokenConfig;
    });
  }, []);

  const updateColor = useCallback(
    (theme: "light" | "dark", key: string, value: string) => {
      updateConfig(["colors", theme, key], value);
    },
    [updateConfig]
  );

  // Export JSON
  const handleExportJson = useCallback(() => {
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "staple-tokens.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [config]);

  // Export CSS
  const handleExportCss = useCallback(() => {
    const css = generatedCss.all + "\n\n" + generatedCss.tokens + "\n\n" + generatedCss.themes + "\n\n" + generatedCss.density;
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "staple-tokens.css";
    a.click();
    URL.revokeObjectURL(url);
  }, [generatedCss]);

  // Import JSON
  const handleImportJson = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const text = await file.text();
        try {
          const parsed = JSON.parse(text);
          const result = validateConfig(parsed);
          if (result.success && result.data) {
            setConfig(result.data);
            setValidationError(null);
          } else {
            setValidationError("Invalid config file: " + result.errors?.message);
          }
        } catch {
          setValidationError("Invalid JSON file");
        }
      }
    };
    input.click();
  }, []);

  // Reset to defaults
  const handleReset = useCallback(() => {
    setConfig(defaultConfig);
    setValidationError(null);
  }, []);

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "overview", label: "Overview" },
    { id: "colors", label: "Colors" },
    { id: "space", label: "Space & Radius" },
    { id: "typography", label: "Typography" },
    { id: "motion", label: "Motion" },
  ];

  return (
    <Container size="xl">
      <Stack gap={6}>
        {/* Header */}
        <Stack gap={2}>
          <Text as="h1" size={5} weight="bold">
            Tokens Studio
          </Text>
          <Text tone="muted">
            Edit your design tokens configuration and generate CSS. All changes
            are validated in real-time using Zod schemas.
          </Text>
        </Stack>

        {/* Actions Bar */}
        <Card pad={3} radius={2}>
          <Inline gap={2} align="center" justify="between" wrap>
            <Inline gap={2}>
              <button onClick={handleImportJson} className="studio-btn">
                Import JSON
              </button>
              <button onClick={handleExportJson} className="studio-btn">
                Export JSON
              </button>
              <button onClick={handleExportCss} className="studio-btn studio-btn--primary">
                Export CSS
              </button>
            </Inline>
            <button onClick={handleReset} className="studio-btn studio-btn--danger">
              Reset to Defaults
            </button>
          </Inline>
        </Card>

        {/* Validation Error */}
        {validationError && (
          <Card pad={3} radius={2} tone="danger">
            <Stack gap={2}>
              <Text weight="semibold" tone="danger">
                Validation Error
              </Text>
              <Text size={1} mono>
                {validationError}
              </Text>
            </Stack>
          </Card>
        )}

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
          {activeTab === "overview" && (
            <OverviewTab config={config} generatedCss={generatedCss} />
          )}
          {activeTab === "colors" && (
            <ColorsTab config={config} updateColor={updateColor} />
          )}
          {activeTab === "space" && (
            <SpaceTab config={config} updateConfig={updateConfig} />
          )}
          {activeTab === "typography" && (
            <TypographyTab config={config} updateConfig={updateConfig} />
          )}
          {activeTab === "motion" && (
            <MotionTab config={config} updateConfig={updateConfig} />
          )}
        </div>
      </Stack>
    </Container>
  );
}

// Overview Tab
function OverviewTab({
  config,
  generatedCss,
}: {
  config: TokenConfig;
  generatedCss: GeneratedCss;
}) {
  return (
    <Stack gap={6}>
      <Stack gap={3}>
        <Text as="h2" size={3} weight="semibold">
          Configuration
        </Text>
        <Card pad={3} radius={2}>
          <Inline gap={4} wrap>
            <Stack gap={1}>
              <Text size={0} tone="muted">
                Name
              </Text>
              <Text weight="medium">{config.name}</Text>
            </Stack>
            <Stack gap={1}>
              <Text size={0} tone="muted">
                Version
              </Text>
              <Text weight="medium">{config.version}</Text>
            </Stack>
            <Stack gap={1}>
              <Text size={0} tone="muted">
                Space Scale
              </Text>
              <Text weight="medium">9 steps (0-8)</Text>
            </Stack>
            <Stack gap={1}>
              <Text size={0} tone="muted">
                Font Sizes
              </Text>
              <Text weight="medium">7 steps (0-6)</Text>
            </Stack>
            <Stack gap={1}>
              <Text size={0} tone="muted">
                Themes
              </Text>
              <Text weight="medium">Light, Dark</Text>
            </Stack>
            <Stack gap={1}>
              <Text size={0} tone="muted">
                Densities
              </Text>
              <Text weight="medium">Comfortable, Compact</Text>
            </Stack>
          </Inline>
        </Card>
      </Stack>

      <Stack gap={3}>
        <Text as="h2" size={3} weight="semibold">
          Generated CSS Preview
        </Text>
        <TabCodePreview
          tabs={[
            { label: "tokens.css", code: generatedCss.tokens, language: "css" },
            { label: "themes.css", code: generatedCss.themes, language: "css" },
            { label: "density.css", code: generatedCss.density, language: "css" },
          ]}
        />
      </Stack>
    </Stack>
  );
}

// Colors Tab
function ColorsTab({
  config,
  updateColor,
}: {
  config: TokenConfig;
  updateColor: (theme: "light" | "dark", key: string, value: string) => void;
}) {
  const colorGroups = [
    {
      title: "Background & Surface",
      colors: ["background", "surface", "surfaceRaised"],
    },
    {
      title: "Text",
      colors: ["text", "textMuted", "textInverse"],
    },
    {
      title: "Border",
      colors: ["border", "borderMuted"],
    },
    {
      title: "Primary",
      colors: ["primary", "primaryHover", "primaryText"],
    },
    {
      title: "Danger",
      colors: ["danger", "dangerHover", "dangerText", "dangerSurface"],
    },
    {
      title: "Warning",
      colors: ["warn", "warnHover", "warnText", "warnSurface"],
    },
    {
      title: "Success",
      colors: ["success", "successHover", "successText", "successSurface"],
    },
    {
      title: "Focus",
      colors: ["focus"],
    },
  ];

  return (
    <Stack gap={6}>
      <Inline gap={6} align="start" wrap className="studio-colors-grid">
        {/* Light Theme */}
        <Stack gap={4} className="studio-color-theme">
          <Text as="h3" size={2} weight="semibold">
            Light Theme
          </Text>
          {colorGroups.map((group) => (
            <Stack key={group.title} gap={2}>
              <Text size={0} weight="medium" tone="muted">
                {group.title}
              </Text>
              <div className="studio-color-grid">
                {group.colors.map((colorKey) => {
                  const value =
                    config.colors.light[colorKey as keyof typeof config.colors.light];
                  if (typeof value !== "string" || !value.startsWith("#")) return null;
                  return (
                    <ColorPicker
                      key={colorKey}
                      label={colorKey}
                      value={value}
                      onChange={(v) => updateColor("light", colorKey, v)}
                    />
                  );
                })}
              </div>
            </Stack>
          ))}
        </Stack>

        {/* Dark Theme */}
        <Stack gap={4} className="studio-color-theme">
          <Text as="h3" size={2} weight="semibold">
            Dark Theme
          </Text>
          {colorGroups.map((group) => (
            <Stack key={group.title} gap={2}>
              <Text size={0} weight="medium" tone="muted">
                {group.title}
              </Text>
              <div className="studio-color-grid">
                {group.colors.map((colorKey) => {
                  const value =
                    config.colors.dark[colorKey as keyof typeof config.colors.dark];
                  if (typeof value !== "string" || !value.startsWith("#")) return null;
                  return (
                    <ColorPicker
                      key={colorKey}
                      label={colorKey}
                      value={value}
                      onChange={(v) => updateColor("dark", colorKey, v)}
                    />
                  );
                })}
              </div>
            </Stack>
          ))}
        </Stack>
      </Inline>
    </Stack>
  );
}

// Space Tab
function SpaceTab({
  config,
  updateConfig,
}: {
  config: TokenConfig;
  updateConfig: (path: string[], value: unknown) => void;
}) {
  return (
    <Stack gap={6}>
      {/* Space Scale */}
      <Stack gap={4}>
        <Text as="h3" size={2} weight="semibold">
          Space Scale (0-8)
        </Text>
        <div className="studio-input-grid">
          {Object.entries(config.space).map(([key, value]) => (
            <Stack key={key} gap={1}>
              <Text as="label" size={0} weight="medium">
                space-{key}
              </Text>
              <input
                type="text"
                value={value}
                onChange={(e) => updateConfig(["space", key], e.target.value)}
                className="studio-text-input"
              />
              <Box
                style={{
                  width: value,
                  height: "8px",
                  backgroundColor: "var(--st-color-primary)",
                  borderRadius: "var(--st-radius-1)",
                }}
              />
            </Stack>
          ))}
        </div>
      </Stack>

      {/* Radius Scale */}
      <Stack gap={4}>
        <Text as="h3" size={2} weight="semibold">
          Radius Scale (0-4)
        </Text>
        <div className="studio-input-grid">
          {Object.entries(config.radius).map(([key, value]) => (
            <Stack key={key} gap={1}>
              <Text as="label" size={0} weight="medium">
                radius-{key}
              </Text>
              <input
                type="text"
                value={value}
                onChange={(e) => updateConfig(["radius", key], e.target.value)}
                className="studio-text-input"
              />
              <Box
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "var(--st-color-primary)",
                  borderRadius: value,
                }}
              />
            </Stack>
          ))}
        </div>
      </Stack>

      {/* Shadow Scale */}
      <Stack gap={4}>
        <Text as="h3" size={2} weight="semibold">
          Shadow Scale (0-2)
        </Text>
        <div className="studio-input-grid studio-input-grid--wide">
          {Object.entries(config.shadow).map(([key, value]) => (
            <Stack key={key} gap={1}>
              <Text as="label" size={0} weight="medium">
                shadow-{key}
              </Text>
              <input
                type="text"
                value={value}
                onChange={(e) => updateConfig(["shadow", key], e.target.value)}
                className="studio-text-input"
              />
              <Box
                pad={3}
                radius={2}
                style={{
                  backgroundColor: "var(--st-color-surface-raised)",
                  boxShadow: value,
                }}
              >
                <Text size={0}>Shadow preview</Text>
              </Box>
            </Stack>
          ))}
        </div>
      </Stack>
    </Stack>
  );
}

// Typography Tab
function TypographyTab({
  config,
  updateConfig,
}: {
  config: TokenConfig;
  updateConfig: (path: string[], value: unknown) => void;
}) {
  return (
    <Stack gap={6}>
      {/* Font Family */}
      <Stack gap={4}>
        <Text as="h3" size={2} weight="semibold">
          Font Family
        </Text>
        <Stack gap={3}>
          <Stack gap={1}>
            <Text as="label" size={0} weight="medium">
              Sans (default)
            </Text>
            <input
              type="text"
              value={config.typography.fontFamily.sans}
              onChange={(e) =>
                updateConfig(["typography", "fontFamily", "sans"], e.target.value)
              }
              className="studio-text-input studio-text-input--wide"
            />
            <span style={{ fontFamily: config.typography.fontFamily.sans }}>
              The quick brown fox jumps over the lazy dog.
            </span>
          </Stack>
          <Stack gap={1}>
            <Text as="label" size={0} weight="medium">
              Mono
            </Text>
            <input
              type="text"
              value={config.typography.fontFamily.mono}
              onChange={(e) =>
                updateConfig(["typography", "fontFamily", "mono"], e.target.value)
              }
              className="studio-text-input studio-text-input--wide"
            />
            <span style={{ fontFamily: config.typography.fontFamily.mono }}>
              const x = 42; // code example
            </span>
          </Stack>
        </Stack>
      </Stack>

      {/* Font Size */}
      <Stack gap={4}>
        <Text as="h3" size={2} weight="semibold">
          Font Size Scale (0-6)
        </Text>
        <div className="studio-input-grid">
          {Object.entries(config.typography.fontSize).map(([key, value]) => (
            <Stack key={key} gap={1}>
              <Text as="label" size={0} weight="medium">
                font-size-{key}
              </Text>
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  updateConfig(["typography", "fontSize", key], e.target.value)
                }
                className="studio-text-input"
              />
              <span style={{ fontSize: value }}>Aa</span>
            </Stack>
          ))}
        </div>
      </Stack>

      {/* Line Height */}
      <Stack gap={4}>
        <Text as="h3" size={2} weight="semibold">
          Line Height
        </Text>
        <div className="studio-input-grid">
          {Object.entries(config.typography.lineHeight).map(([key, value]) => (
            <Stack key={key} gap={1}>
              <Text as="label" size={0} weight="medium">
                leading-{key}
              </Text>
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  updateConfig(["typography", "lineHeight", key], e.target.value)
                }
                className="studio-text-input"
              />
            </Stack>
          ))}
        </div>
      </Stack>

      {/* Font Weight */}
      <Stack gap={4}>
        <Text as="h3" size={2} weight="semibold">
          Font Weight
        </Text>
        <div className="studio-input-grid">
          {Object.entries(config.typography.fontWeight).map(([key, value]) => (
            <Stack key={key} gap={1}>
              <Text as="label" size={0} weight="medium">
                font-weight-{key}
              </Text>
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  updateConfig(["typography", "fontWeight", key], e.target.value)
                }
                className="studio-text-input"
              />
              <span style={{ fontWeight: value }}>Sample text</span>
            </Stack>
          ))}
        </div>
      </Stack>
    </Stack>
  );
}

// Motion Tab
function MotionTab({
  config,
  updateConfig,
}: {
  config: TokenConfig;
  updateConfig: (path: string[], value: unknown) => void;
}) {
  return (
    <Stack gap={6}>
      {/* Duration */}
      <Stack gap={4}>
        <Text as="h3" size={2} weight="semibold">
          Duration
        </Text>
        <div className="studio-input-grid">
          {Object.entries(config.motion.duration).map(([key, value]) => (
            <Stack key={key} gap={1}>
              <Text as="label" size={0} weight="medium">
                duration-{key}
              </Text>
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  updateConfig(["motion", "duration", key], e.target.value)
                }
                className="studio-text-input"
              />
            </Stack>
          ))}
        </div>
      </Stack>

      {/* Easing */}
      <Stack gap={4}>
        <Text as="h3" size={2} weight="semibold">
          Easing
        </Text>
        <div className="studio-input-grid studio-input-grid--wide">
          {Object.entries(config.motion.easing).map(([key, value]) => (
            <Stack key={key} gap={1}>
              <Text as="label" size={0} weight="medium">
                easing-{key}
              </Text>
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  updateConfig(["motion", "easing", key], e.target.value)
                }
                className="studio-text-input"
              />
            </Stack>
          ))}
        </div>
      </Stack>

      {/* Animation Preview */}
      <Stack gap={4}>
        <Text as="h3" size={2} weight="semibold">
          Animation Preview
        </Text>
        <Card pad={4} radius={2}>
          <Stack gap={4}>
            {Object.entries(config.motion.easing).map(([key, value]) => (
              <Inline key={key} gap={4} align="center">
                <span style={{ width: "80px", fontSize: "var(--st-font-size-1)" }}>
                  {key}
                </span>
                <Box className="motion-track">
                  <Box
                    className="motion-ball"
                    style={{
                      transitionTimingFunction: value,
                      transitionDuration: config.motion.duration.slow,
                    }}
                  />
                </Box>
              </Inline>
            ))}
            <Text size={0} tone="muted">
              Hover over tracks to see animation
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
}
