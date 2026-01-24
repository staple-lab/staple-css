/**
 * Tokens Builder Page
 *
 * Unified step-based workflow for building a complete token system.
 * Steps: Seeds → Harmony → Generate → Review → Overrides → Export
 */

import { useState, useCallback, useMemo, useEffect } from "react";
import { Container, Stack, Text, Inline, Card, Box } from "@staple-css/primitives";
import {
  type Seeds,
  type GenerationParams,
  type Palette,
  type SemanticMap,
  type Override,
  type BuilderConfig,
  type HarmonySuggestion,
  defaultSeeds,
  defaultGenerationParams,
  defaultSemanticMapLight,
  defaultSemanticMapDark,
  generatePalettes,
  generateHarmonySuggestions,
  generateBuilderCss,
  createDefaultBuilderConfig,
  validateBuilderConfig,
  resolveSemanticColors,
  applyPaletteOverrides,
  applySemanticOverrides,
} from "@staple-css/tokens";
import { generateHarmony, wcagContrastHex, type HarmonyType } from "@staple-css/tokens/color";
import { Link } from "react-router-dom";
import { ColorPicker } from "../../components/ColorPicker";
import { ColorRamp } from "../../components/ColorRamp";
import { CodePreview } from "../../components/CodePreview";

// ============================================================================
// Types
// ============================================================================

type BuilderStep = "seeds" | "harmony" | "generate" | "review" | "overrides" | "export";

interface WorkingState {
  seeds: Seeds;
  generation: GenerationParams;
  palettes: Palette[];
  semanticMap: {
    light: SemanticMap;
    dark: SemanticMap;
  };
  overrides: Override[];
}

// ============================================================================
// Builder Page Component
// ============================================================================

export function BuilderPage() {
  const [currentStep, setCurrentStep] = useState<BuilderStep>("seeds");

  // Working state (unsaved changes)
  const [working, setWorking] = useState<WorkingState>(() => {
    const defaultConfig = createDefaultBuilderConfig();
    return {
      seeds: defaultConfig.seeds,
      generation: defaultConfig.generation,
      palettes: defaultConfig.palettes,
      semanticMap: defaultConfig.semanticMap,
      overrides: [],
    };
  });

  // Saved state (persisted config)
  const [saved, setSaved] = useState<WorkingState | null>(null);

  // Preview mode
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("light");

  // Steps configuration
  const steps: Array<{ id: BuilderStep; label: string; description: string }> = [
    { id: "seeds", label: "1. Brand Seeds", description: "Set your base colors" },
    { id: "harmony", label: "2. Harmony", description: "Color suggestions" },
    { id: "generate", label: "3. Generate", description: "Create token system" },
    { id: "review", label: "4. Review", description: "Compare changes" },
    { id: "overrides", label: "5. Overrides", description: "Fine-tune values" },
    { id: "export", label: "6. Export", description: "Save & download" },
  ];

  // Navigation
  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const canGoBack = currentStepIndex > 0;
  const canGoNext = currentStepIndex < steps.length - 1;

  const goBack = useCallback(() => {
    if (canGoBack && currentStepIndex > 0) {
      const prevStep = steps[currentStepIndex - 1];
      if (prevStep) setCurrentStep(prevStep.id);
    }
  }, [canGoBack, currentStepIndex, steps]);

  const goNext = useCallback(() => {
    if (canGoNext && currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1];
      if (nextStep) setCurrentStep(nextStep.id);
    }
  }, [canGoNext, currentStepIndex, steps]);

  // Update seeds AND regenerate palettes immediately
  const updateSeed = useCallback((key: keyof Seeds, value: string) => {
    setWorking(prev => {
      const newSeeds = { ...prev.seeds, [key]: value };
      const newPalettes = generatePalettes(newSeeds, prev.generation);
      return {
        ...prev,
        seeds: newSeeds,
        palettes: newPalettes,
      };
    });
  }, []);

  // Update generation params AND regenerate palettes immediately
  const updateGeneration = useCallback((key: keyof GenerationParams, value: number | boolean | string) => {
    setWorking(prev => {
      const newGeneration = { ...prev.generation, [key]: value };
      const newPalettes = generatePalettes(prev.seeds, newGeneration);
      return {
        ...prev,
        generation: newGeneration,
        palettes: newPalettes,
      };
    });
  }, []);

  // Regenerate palettes from seeds (manual trigger)
  const regeneratePalettes = useCallback(() => {
    setWorking(prev => {
      const newPalettes = generatePalettes(prev.seeds, prev.generation);
      return { ...prev, palettes: newPalettes };
    });
  }, []);

  // Track selected harmonies - can have both secondary and accent
  const [selectedHarmonies, setSelectedHarmonies] = useState<{
    secondary?: HarmonyType;
    accent?: HarmonyType;
  }>({});

  // Apply harmony suggestion
  const applyHarmony = useCallback((type: HarmonyType, role: "secondary" | "accent") => {
    const colors = generateHarmony(working.seeds.primary, type);
    const firstColor = colors[0];
    if (firstColor) {
      updateSeed(role, firstColor);
      setSelectedHarmonies(prev => ({ ...prev, [role]: type }));
    }
  }, [working.seeds.primary, updateSeed]);

  // Add override
  const addOverride = useCallback((override: Omit<Override, "id">) => {
    const newOverride: Override = {
      ...override,
      id: crypto.randomUUID(),
    };
    setWorking(prev => ({
      ...prev,
      overrides: [...prev.overrides, newOverride],
    }));
  }, []);

  // Remove override
  const removeOverride = useCallback((id: string) => {
    setWorking(prev => ({
      ...prev,
      overrides: prev.overrides.filter(o => o.id !== id),
    }));
  }, []);

  // Save working state
  const saveConfig = useCallback(() => {
    setSaved({ ...working });
  }, [working]);

  // Has unsaved changes
  const hasChanges = useMemo(() => {
    if (!saved) return true;
    return JSON.stringify(working) !== JSON.stringify(saved);
  }, [working, saved]);

  // Generate CSS from working state
  const generatedCss = useMemo(() => {
    const config: BuilderConfig = {
      name: "staple-css",
      version: "1.0.0",
      ...working,
    };
    return generateBuilderCss(config);
  }, [working]);

  // Resolved colors for preview
  const resolvedColors = useMemo(() => {
    const palettes = applyPaletteOverrides(working.palettes, working.overrides);
    const lightColors = applySemanticOverrides(
      resolveSemanticColors(working.semanticMap.light, palettes, "light"),
      working.overrides,
      palettes,
      "light"
    );
    const darkColors = applySemanticOverrides(
      resolveSemanticColors(working.semanticMap.dark, palettes, "dark"),
      working.overrides,
      palettes,
      "dark"
    );
    return { light: lightColors, dark: darkColors };
  }, [working]);

  return (
    <Container size="xl">
      <Stack gap={6}>
        {/* Header */}
        <Stack gap={2}>
          <Text as="h1" size={5} weight="bold">
            Tokens Builder
          </Text>
          <Text tone="muted">
            Build a complete design token system step by step.
          </Text>
        </Stack>

        {/* Page Navigation */}
        <Card pad={3} radius={2}>
          <Inline gap={2} align="center" justify="between" wrap>
            <Inline gap={2}>
              <span className="studio-btn studio-btn--primary">Builder</span>
              <Link to="/tokens-studio/preview" className="studio-btn">
                Preview
              </Link>
              <Link to="/tokens-studio/config" className="studio-btn">
                Config
              </Link>
              <Link to="/tokens-studio/prompts" className="studio-btn">
                Prompts
              </Link>
            </Inline>
          </Inline>
        </Card>

        {/* Step Navigation */}
        <Card pad={4} radius={2}>
          <Inline gap={2} align="center" wrap>
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`builder-step-btn ${currentStep === step.id ? "builder-step-btn--active" : ""} ${index < currentStepIndex ? "builder-step-btn--completed" : ""}`}
              >
                <span className="builder-step-num">{index + 1}</span>
                <span className="builder-step-label">{step.label.split(". ")[1]}</span>
              </button>
            ))}
          </Inline>
        </Card>

        {/* Main Content Area */}
        <div className="builder-layout">
          {/* Left: Step Content */}
          <div className="builder-main">
            {currentStep === "seeds" && (
              <SeedsStep
                seeds={working.seeds}
                onUpdate={updateSeed}
              />
            )}
            {currentStep === "harmony" && (
              <HarmonyStep
                primaryColor={working.seeds.primary}
                secondaryColor={working.seeds.secondary}
                accentColor={working.seeds.accent}
                onApply={applyHarmony}
                selectedHarmonies={selectedHarmonies}
              />
            )}
            {currentStep === "generate" && (
              <GenerateStep
                generation={working.generation}
                onUpdate={updateGeneration}
                onGenerate={regeneratePalettes}
                palettes={working.palettes}
              />
            )}
            {currentStep === "review" && (
              <ReviewStep
                working={working}
                saved={saved}
                previewMode={previewMode}
                onPreviewModeChange={setPreviewMode}
                resolvedColors={resolvedColors}
              />
            )}
            {currentStep === "overrides" && (
              <OverridesStep
                overrides={working.overrides}
                palettes={working.palettes}
                onAdd={addOverride}
                onRemove={removeOverride}
                resolvedColors={resolvedColors}
                previewMode={previewMode}
              />
            )}
            {currentStep === "export" && (
              <ExportStep
                working={working}
                generatedCss={generatedCss}
                hasChanges={hasChanges}
                onSave={saveConfig}
              />
            )}
          </div>

          {/* Right: Live Preview */}
          <div className="builder-preview">
            <Card pad={4} radius={2}>
              <Stack gap={4}>
                <Inline gap={2} align="center" justify="between">
                  <Text weight="semibold">Live Preview</Text>
                  <Inline gap={1}>
                    <button
                      onClick={() => setPreviewMode("light")}
                      className={`studio-btn studio-btn--sm ${previewMode === "light" ? "studio-btn--primary" : ""}`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => setPreviewMode("dark")}
                      className={`studio-btn studio-btn--sm ${previewMode === "dark" ? "studio-btn--primary" : ""}`}
                    >
                      Dark
                    </button>
                  </Inline>
                </Inline>

                <LivePreview
                  colors={resolvedColors[previewMode]}
                  mode={previewMode}
                  palettes={working.palettes}
                />
              </Stack>
            </Card>
          </div>
        </div>

        {/* Navigation Footer */}
        <Card pad={4} radius={2}>
          <Inline gap={2} align="center" justify="between">
            <button
              onClick={goBack}
              disabled={!canGoBack}
              className="studio-btn"
            >
              ← Back
            </button>
            <Text tone="muted">
              Step {currentStepIndex + 1} of {steps.length}: {steps[currentStepIndex]?.description ?? ""}
            </Text>
            <button
              onClick={goNext}
              disabled={!canGoNext}
              className="studio-btn studio-btn--primary"
            >
              Next →
            </button>
          </Inline>
        </Card>
      </Stack>
    </Container>
  );
}

// ============================================================================
// Step Components
// ============================================================================

interface SeedsStepProps {
  seeds: Seeds;
  onUpdate: (key: keyof Seeds, value: string) => void;
}

function SeedsStep({ seeds, onUpdate }: SeedsStepProps) {
  return (
    <Stack gap={6}>
      <Card pad={4} radius={2}>
        <Stack gap={4}>
          <Stack gap={2}>
            <Text as="h2" size={3} weight="semibold">
              Brand Seeds
            </Text>
            <Text tone="muted">
              Start with your primary brand color. Secondary and accent colors can be set manually
              or generated from harmony suggestions in the next step.
            </Text>
          </Stack>

          <div className="builder-seeds-grid">
            <Stack gap={3}>
              <Text weight="semibold" size={1}>Primary Colors</Text>
              <ColorPicker
                label="Primary"
                value={seeds.primary}
                onChange={(v) => onUpdate("primary", v)}
              />
              <ColorPicker
                label="Secondary"
                value={seeds.secondary || "#7c3aed"}
                onChange={(v) => onUpdate("secondary", v)}
              />
              <ColorPicker
                label="Accent (optional)"
                value={seeds.accent || "#f59e0b"}
                onChange={(v) => onUpdate("accent", v)}
              />
            </Stack>

            <Stack gap={3}>
              <Text weight="semibold" size={1}>Semantic Colors</Text>
              <ColorPicker
                label="Success"
                value={seeds.success || "#16a34a"}
                onChange={(v) => onUpdate("success", v)}
              />
              <ColorPicker
                label="Warning"
                value={seeds.warn || "#d97706"}
                onChange={(v) => onUpdate("warn", v)}
              />
              <ColorPicker
                label="Danger"
                value={seeds.danger || "#dc2626"}
                onChange={(v) => onUpdate("danger", v)}
              />
            </Stack>

            <Stack gap={3}>
              <Text weight="semibold" size={1}>Neutral Base</Text>
              <ColorPicker
                label="Neutral"
                value={seeds.neutral || "#64748b"}
                onChange={(v) => onUpdate("neutral", v)}
              />
              <Text size={0} tone="muted">
                Used for backgrounds, text, and borders. Leave default for auto-generated neutrals.
              </Text>
            </Stack>
          </div>
        </Stack>
      </Card>

      {/* Quick Preview */}
      <Card pad={4} radius={2}>
        <Stack gap={3}>
          <Text weight="semibold">Quick Preview</Text>
          <Inline gap={3} wrap>
            <div
              className="builder-seed-swatch"
              style={{ backgroundColor: seeds.primary }}
            >
              <Text size={0}>Primary</Text>
            </div>
            <div
              className="builder-seed-swatch"
              style={{ backgroundColor: seeds.secondary || "#7c3aed" }}
            >
              <Text size={0}>Secondary</Text>
            </div>
            <div
              className="builder-seed-swatch"
              style={{ backgroundColor: seeds.success || "#16a34a" }}
            >
              <Text size={0}>Success</Text>
            </div>
            <div
              className="builder-seed-swatch"
              style={{ backgroundColor: seeds.warn || "#d97706" }}
            >
              <Text size={0}>Warning</Text>
            </div>
            <div
              className="builder-seed-swatch"
              style={{ backgroundColor: seeds.danger || "#dc2626" }}
            >
              <Text size={0}>Danger</Text>
            </div>
          </Inline>
        </Stack>
      </Card>
    </Stack>
  );
}

interface HarmonyStepProps {
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  onApply: (type: HarmonyType, role: "secondary" | "accent") => void;
  selectedHarmonies: { secondary?: HarmonyType; accent?: HarmonyType };
}

function HarmonyStep({ primaryColor, secondaryColor, accentColor, onApply, selectedHarmonies }: HarmonyStepProps) {
  const suggestions = useMemo(() => {
    return generateHarmonySuggestions(primaryColor);
  }, [primaryColor]);

  const hasSelections = selectedHarmonies.secondary || selectedHarmonies.accent;

  return (
    <Stack gap={6}>
      {/* Current Selections */}
      {hasSelections && (
        <Card pad={4} radius={2} className="builder-harmony-selected">
          <Stack gap={3}>
            <Inline gap={2} align="center">
              <span style={{ fontSize: "1.5rem" }}>✓</span>
              <Text weight="semibold">Selected Colors</Text>
            </Inline>
            <Inline gap={6} wrap>
              {selectedHarmonies.secondary && (
                <Inline gap={2} align="center">
                  <div
                    className="builder-harmony-swatch"
                    style={{ backgroundColor: secondaryColor || primaryColor }}
                  />
                  <Stack gap={0}>
                    <Text size={0} weight="medium">Secondary</Text>
                    <Text size={0} tone="muted">{selectedHarmonies.secondary}</Text>
                  </Stack>
                </Inline>
              )}
              {selectedHarmonies.accent && (
                <Inline gap={2} align="center">
                  <div
                    className="builder-harmony-swatch"
                    style={{ backgroundColor: accentColor || primaryColor }}
                  />
                  <Stack gap={0}>
                    <Text size={0} weight="medium">Accent</Text>
                    <Text size={0} tone="muted">{selectedHarmonies.accent}</Text>
                  </Stack>
                </Inline>
              )}
            </Inline>
          </Stack>
        </Card>
      )}

      <Card pad={4} radius={2}>
        <Stack gap={4}>
          <Stack gap={2}>
            <Text as="h2" size={3} weight="semibold">
              Harmony Suggestions
            </Text>
            <Text tone="muted">
              Based on your primary color, here are harmonious color combinations.
              Select a harmony for secondary, accent, or both. The live preview updates automatically.
            </Text>
          </Stack>

          <div className="builder-harmony-grid">
            {suggestions.map((suggestion) => {
              const isSelectedSecondary = selectedHarmonies.secondary === suggestion.type;
              const isSelectedAccent = selectedHarmonies.accent === suggestion.type;
              const hasSelection = isSelectedSecondary || isSelectedAccent;

              return (
                <Card
                  key={suggestion.type}
                  pad={3}
                  radius={1}
                  className={hasSelection ? "builder-harmony-card--selected" : ""}
                >
                  <Stack gap={3}>
                    <Stack gap={1}>
                      <Inline gap={2} align="center" wrap>
                        <Text weight="semibold">{suggestion.label}</Text>
                        {isSelectedSecondary && (
                          <span className="builder-harmony-badge">Secondary</span>
                        )}
                        {isSelectedAccent && (
                          <span className="builder-harmony-badge builder-harmony-badge--accent">Accent</span>
                        )}
                      </Inline>
                      <Text size={0} tone="muted">{suggestion.description}</Text>
                    </Stack>

                    <Inline gap={2}>
                      <div
                        className="builder-harmony-swatch builder-harmony-swatch--base"
                        style={{ backgroundColor: primaryColor }}
                        title="Primary (base)"
                      />
                      {suggestion.colors.map((color, i) => (
                        <div
                          key={i}
                          className="builder-harmony-swatch"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </Inline>

                    <Inline gap={2}>
                      <button
                        onClick={() => onApply(suggestion.type, "secondary")}
                        className={`studio-btn studio-btn--sm ${isSelectedSecondary ? "studio-btn--success" : ""}`}
                      >
                        {isSelectedSecondary ? "✓ Secondary" : "Use as Secondary"}
                      </button>
                      <button
                        onClick={() => onApply(suggestion.type, "accent")}
                        className={`studio-btn studio-btn--sm ${isSelectedAccent ? "studio-btn--success" : ""}`}
                      >
                        {isSelectedAccent ? "✓ Accent" : "Use as Accent"}
                      </button>
                    </Inline>
                  </Stack>
                </Card>
              );
            })}
          </div>
        </Stack>
      </Card>
    </Stack>
  );
}

interface GenerateStepProps {
  generation: GenerationParams;
  onUpdate: (key: keyof GenerationParams, value: number | boolean | string) => void;
  onGenerate: () => void;
  palettes: Palette[];
}

function GenerateStep({ generation, onUpdate, onGenerate, palettes }: GenerateStepProps) {
  return (
    <Stack gap={6}>
      <Card pad={4} radius={2}>
        <Stack gap={4}>
          <Stack gap={2}>
            <Text as="h2" size={3} weight="semibold">
              Generate Standard Set
            </Text>
            <Text tone="muted">
              Configure generation parameters and create your complete token system.
            </Text>
          </Stack>

          <div className="builder-controls-grid">
            <Stack gap={2}>
              <Text size={0} weight="medium">Algorithm</Text>
              <select
                value={generation.algorithm}
                onChange={(e) => onUpdate("algorithm", e.target.value)}
                className="studio-select"
              >
                <option value="oklch">OKLCH (Recommended)</option>
                <option value="hct">HCT (Tonal)</option>
              </select>
            </Stack>

            <Stack gap={2}>
              <Text size={0} weight="medium">Step Count</Text>
              <select
                value={generation.stepCount}
                onChange={(e) => onUpdate("stepCount", parseInt(e.target.value))}
                className="studio-select"
              >
                <option value={8}>8 steps</option>
                <option value={10}>10 steps</option>
                <option value={12}>12 steps (Recommended)</option>
              </select>
            </Stack>

            <Stack gap={2}>
              <Text size={0} weight="medium">
                Chroma Scale: {generation.chromaScale.toFixed(1)}
              </Text>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={generation.chromaScale}
                onChange={(e) => onUpdate("chromaScale", parseFloat(e.target.value))}
                className="studio-slider"
              />
            </Stack>

            <Stack gap={2}>
              <Text size={0} weight="medium">
                Contrast Target: {generation.contrastTarget.toFixed(1)}
              </Text>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={generation.contrastTarget}
                onChange={(e) => onUpdate("contrastTarget", parseFloat(e.target.value))}
                className="studio-slider"
              />
            </Stack>

            <Stack gap={2}>
              <Text size={0} weight="medium">
                Warm/Cool Bias: {generation.warmCoolBias.toFixed(1)}
              </Text>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.1"
                value={generation.warmCoolBias}
                onChange={(e) => onUpdate("warmCoolBias", parseFloat(e.target.value))}
                className="studio-slider"
              />
            </Stack>

            <Stack gap={2}>
              <Text size={0} weight="medium">Style</Text>
              <Inline gap={2}>
                <button
                  onClick={() => onUpdate("vibrant", false)}
                  className={`studio-btn studio-btn--sm ${!generation.vibrant ? "studio-btn--primary" : ""}`}
                >
                  Muted
                </button>
                <button
                  onClick={() => onUpdate("vibrant", true)}
                  className={`studio-btn studio-btn--sm ${generation.vibrant ? "studio-btn--primary" : ""}`}
                >
                  Vibrant
                </button>
              </Inline>
            </Stack>
          </div>

          <button
            onClick={onGenerate}
            className="studio-btn studio-btn--primary studio-btn--lg"
          >
            Generate Standard Set
          </button>
        </Stack>
      </Card>

      {/* Generated Palettes Preview */}
      {palettes.length > 0 && (
        <Card pad={4} radius={2}>
          <Stack gap={4}>
            <Text weight="semibold">Generated Palettes (Working)</Text>
            <Stack gap={3}>
              {palettes.map((palette) => (
                <Stack key={palette.name} gap={2}>
                  <Text size={1} weight="medium" className="palette-name">
                    {palette.name}
                  </Text>
                  <ColorRamp colors={palette.lightSteps} showLabels={false} />
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}

interface ReviewStepProps {
  working: WorkingState;
  saved: WorkingState | null;
  previewMode: "light" | "dark";
  onPreviewModeChange: (mode: "light" | "dark") => void;
  resolvedColors: { light: Record<string, string>; dark: Record<string, string> };
}

function ReviewStep({ working, saved, previewMode, onPreviewModeChange, resolvedColors }: ReviewStepProps) {
  // Calculate diff
  const diff = useMemo(() => {
    if (!saved) return { added: [], changed: [], removed: [] };

    const added: string[] = [];
    const changed: { key: string; from: string; to: string }[] = [];
    const removed: string[] = [];

    // Compare palettes
    const workingPaletteNames = new Set(working.palettes.map(p => p.name));
    const savedPaletteNames = new Set(saved.palettes.map(p => p.name));

    for (const name of workingPaletteNames) {
      if (!savedPaletteNames.has(name)) {
        added.push(`Palette: ${name}`);
      }
    }

    for (const name of savedPaletteNames) {
      if (!workingPaletteNames.has(name)) {
        removed.push(`Palette: ${name}`);
      }
    }

    // Compare generation params
    if (working.generation.stepCount !== saved.generation.stepCount) {
      changed.push({
        key: "Step Count",
        from: String(saved.generation.stepCount),
        to: String(working.generation.stepCount),
      });
    }

    return { added, changed, removed };
  }, [working, saved]);

  return (
    <Stack gap={6}>
      <Card pad={4} radius={2}>
        <Stack gap={4}>
          <Stack gap={2}>
            <Text as="h2" size={3} weight="semibold">
              Review Changes
            </Text>
            <Text tone="muted">
              Compare your working state with the saved configuration.
            </Text>
          </Stack>

          {/* Tabs for Live vs Saved */}
          <div className="builder-review-tabs">
            <Inline gap={0} className="studio-tabs">
              <button
                onClick={() => onPreviewModeChange("light")}
                className={`studio-tab ${previewMode === "light" ? "studio-tab--active" : ""}`}
              >
                Light Mode
              </button>
              <button
                onClick={() => onPreviewModeChange("dark")}
                className={`studio-tab ${previewMode === "dark" ? "studio-tab--active" : ""}`}
              >
                Dark Mode
              </button>
            </Inline>
          </div>

          {/* Palettes Comparison */}
          <Stack gap={4}>
            <Text weight="semibold">Working Palettes</Text>
            {working.palettes.map((palette) => (
              <Stack key={palette.name} gap={2}>
                <Text size={1} weight="medium" className="palette-name">
                  {palette.name}
                </Text>
                <ColorRamp
                  colors={previewMode === "light" ? palette.lightSteps : palette.darkSteps}
                  showLabels={false}
                />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Card>

      {/* Diff Panel */}
      <Card pad={4} radius={2}>
        <Stack gap={4}>
          <Text weight="semibold">Changes from Saved</Text>
          {!saved ? (
            <Text tone="muted">No saved configuration yet. Save to create a baseline.</Text>
          ) : diff.added.length === 0 && diff.changed.length === 0 && diff.removed.length === 0 ? (
            <Text tone="muted">No changes from saved configuration.</Text>
          ) : (
            <Stack gap={3}>
              {diff.added.map((item) => (
                <Inline key={item} gap={2} align="center">
                  <span className="diff-badge diff-badge--added">+</span>
                  <Text size={1}>{item}</Text>
                </Inline>
              ))}
              {diff.changed.map((item) => (
                <Inline key={item.key} gap={2} align="center">
                  <span className="diff-badge diff-badge--changed">~</span>
                  <Text size={1}>
                    {item.key}: {item.from} → {item.to}
                  </Text>
                </Inline>
              ))}
              {diff.removed.map((item) => (
                <Inline key={item} gap={2} align="center">
                  <span className="diff-badge diff-badge--removed">-</span>
                  <Text size={1}>{item}</Text>
                </Inline>
              ))}
            </Stack>
          )}
        </Stack>
      </Card>

      {/* Semantic Colors Preview */}
      <Card pad={4} radius={2}>
        <Stack gap={4}>
          <Text weight="semibold">Resolved Semantic Colors ({previewMode})</Text>
          <div className="builder-semantic-grid">
            {Object.entries(resolvedColors[previewMode]).map(([key, value]) => {
              if (key === "focusRing") return null;
              return (
                <Inline key={key} gap={2} align="center">
                  <div
                    className="builder-semantic-swatch"
                    style={{ backgroundColor: value }}
                  />
                  <Stack gap={0}>
                    <Text size={0} weight="medium">{key}</Text>
                    <Text size={0} mono tone="muted">{value}</Text>
                  </Stack>
                </Inline>
              );
            })}
          </div>
        </Stack>
      </Card>
    </Stack>
  );
}

interface OverridesStepProps {
  overrides: Override[];
  palettes: Palette[];
  onAdd: (override: Omit<Override, "id">) => void;
  onRemove: (id: string) => void;
  resolvedColors: { light: Record<string, string>; dark: Record<string, string> };
  previewMode: "light" | "dark";
}

function OverridesStep({ overrides, palettes, onAdd, onRemove, resolvedColors, previewMode }: OverridesStepProps) {
  const [newOverrideType, setNewOverrideType] = useState<"palette" | "semantic">("semantic");
  const [selectedPalette, setSelectedPalette] = useState(palettes[0]?.name || "");
  const [selectedStep, setSelectedStep] = useState(9);
  const [selectedToken, setSelectedToken] = useState("primary");
  const [overrideValue, setOverrideValue] = useState("#2563eb");
  const [overrideMode, setOverrideMode] = useState<"light" | "dark">("light");
  const [overrideReason, setOverrideReason] = useState("");

  // Handle clicking on a palette swatch
  const handleSwatchClick = useCallback((paletteName: string, step: number, color: string) => {
    setNewOverrideType("palette");
    setSelectedPalette(paletteName);
    setSelectedStep(step);
    setOverrideValue(color);
  }, []);

  const semanticTokens = Object.keys(resolvedColors.light).filter(k => k !== "focusRing");

  const handleAddOverride = useCallback(() => {
    const target = newOverrideType === "palette"
      ? { type: "palette" as const, palette: selectedPalette, step: selectedStep, mode: overrideMode }
      : { type: "semantic" as const, token: selectedToken, mode: overrideMode };

    onAdd({
      target,
      value: overrideValue,
      reason: overrideReason || undefined,
      enabled: true,
    });

    setOverrideReason("");
  }, [newOverrideType, selectedPalette, selectedStep, selectedToken, overrideValue, overrideMode, overrideReason, onAdd]);

  return (
    <Stack gap={6}>
      <Card pad={4} radius={2}>
        <Stack gap={4}>
          <Stack gap={2}>
            <Text as="h2" size={3} weight="semibold">
              Final Overrides
            </Text>
            <Text tone="muted">
              Make targeted adjustments without breaking the token system. Overrides are applied
              after generation and can target specific palette steps or semantic tokens.
            </Text>
          </Stack>

          {/* Add Override Form */}
          <Card pad={3} radius={1} className="builder-override-form">
            <Stack gap={3}>
              <Text weight="semibold" size={1}>Add Override</Text>

              <Inline gap={2}>
                <button
                  onClick={() => setNewOverrideType("semantic")}
                  className={`studio-btn studio-btn--sm ${newOverrideType === "semantic" ? "studio-btn--primary" : ""}`}
                >
                  Semantic Token
                </button>
                <button
                  onClick={() => setNewOverrideType("palette")}
                  className={`studio-btn studio-btn--sm ${newOverrideType === "palette" ? "studio-btn--primary" : ""}`}
                >
                  Palette Step
                </button>
              </Inline>

              <div className="builder-override-fields">
                {newOverrideType === "semantic" ? (
                  <Stack gap={2}>
                    <Text size={0} weight="medium">Token</Text>
                    <select
                      value={selectedToken}
                      onChange={(e) => setSelectedToken(e.target.value)}
                      className="studio-select"
                    >
                      {semanticTokens.map((token) => (
                        <option key={token} value={token}>{token}</option>
                      ))}
                    </select>
                    {/* Current value preview */}
                    <Inline gap={2} align="center">
                      <div
                        className="builder-semantic-swatch"
                        style={{ backgroundColor: resolvedColors[overrideMode][selectedToken] || "#888" }}
                      />
                      <Text size={0} tone="muted">
                        Current: {resolvedColors[overrideMode][selectedToken] || "N/A"}
                      </Text>
                    </Inline>
                  </Stack>
                ) : (
                  <>
                    <Stack gap={2}>
                      <Text size={0} weight="medium">Palette</Text>
                      <select
                        value={selectedPalette}
                        onChange={(e) => setSelectedPalette(e.target.value)}
                        className="studio-select"
                      >
                        {palettes.map((p) => (
                          <option key={p.name} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </Stack>
                    <Stack gap={2}>
                      <Text size={0} weight="medium">Step</Text>
                      <select
                        value={selectedStep}
                        onChange={(e) => setSelectedStep(parseInt(e.target.value))}
                        className="studio-select"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((step) => (
                          <option key={step} value={step}>{step}</option>
                        ))}
                      </select>
                    </Stack>
                  </>
                )}

                <Stack gap={2}>
                  <Text size={0} weight="medium">Mode</Text>
                  <select
                    value={overrideMode}
                    onChange={(e) => setOverrideMode(e.target.value as "light" | "dark")}
                    className="studio-select"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </Stack>

                <ColorPicker
                  label="Value"
                  value={overrideValue}
                  onChange={setOverrideValue}
                />
              </div>

              <Stack gap={2}>
                <Text size={0} weight="medium">Reason (optional)</Text>
                <input
                  type="text"
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  placeholder="e.g., Brand guideline requirement"
                  className="studio-text-input"
                />
              </Stack>

              <button onClick={handleAddOverride} className="studio-btn studio-btn--primary">
                Add Override
              </button>
            </Stack>
          </Card>

          {/* Current Overrides */}
          {overrides.length > 0 && (
            <Stack gap={3}>
              <Text weight="semibold">Active Overrides ({overrides.length})</Text>
              {overrides.map((override) => (
                <Card key={override.id} pad={3} radius={1}>
                  <Inline gap={2} align="center" justify="between">
                    <Stack gap={1}>
                      <Text size={1} weight="medium">
                        {override.target.type === "palette"
                          ? `${override.target.palette}[${override.target.step}] (${override.target.mode})`
                          : `${override.target.token} (${override.target.mode})`}
                      </Text>
                      <Inline gap={2} align="center">
                        <div
                          className="builder-override-swatch"
                          style={{ backgroundColor: typeof override.value === "string" ? override.value : "#888" }}
                        />
                        <Text size={0} mono tone="muted">
                          {typeof override.value === "string" ? override.value : `${override.value.palette}[${override.value.step}]`}
                        </Text>
                        {override.reason && (
                          <Text size={0} tone="muted">— {override.reason}</Text>
                        )}
                      </Inline>
                    </Stack>
                    <button
                      onClick={() => onRemove(override.id)}
                      className="studio-btn studio-btn--danger studio-btn--sm"
                    >
                      Remove
                    </button>
                  </Inline>
                </Card>
              ))}
            </Stack>
          )}
        </Stack>
      </Card>

      {/* Clickable Palette Swatches */}
      <Card pad={4} radius={2}>
        <Stack gap={4}>
          <Stack gap={2}>
            <Text weight="semibold">Palette Steps</Text>
            <Text size={0} tone="muted">
              Click any swatch to select it for override. Showing {previewMode} mode.
            </Text>
          </Stack>
          <Stack gap={3}>
            {palettes.map((palette) => {
              const steps = previewMode === "light" ? palette.lightSteps : palette.darkSteps;
              return (
                <Stack key={palette.name} gap={2}>
                  <Text size={1} weight="medium" className="palette-name">
                    {palette.name}
                  </Text>
                  <Inline gap={1} wrap>
                    {steps.map((color, i) => {
                      const isSelected = newOverrideType === "palette" &&
                        selectedPalette === palette.name &&
                        selectedStep === i + 1;
                      return (
                        <button
                          key={i}
                          onClick={() => handleSwatchClick(palette.name, i + 1, color)}
                          className={`builder-clickable-swatch ${isSelected ? "builder-clickable-swatch--selected" : ""}`}
                          style={{ backgroundColor: color }}
                          title={`${palette.name}[${i + 1}]: ${color}`}
                        >
                          <span className="builder-swatch-label">{i + 1}</span>
                        </button>
                      );
                    })}
                  </Inline>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Card>

      {/* Contrast Validation */}
      <Card pad={4} radius={2}>
        <Stack gap={4}>
          <Text weight="semibold">Contrast Validation</Text>
          <ContrastValidation colors={resolvedColors[previewMode]} mode={previewMode} />
        </Stack>
      </Card>
    </Stack>
  );
}

interface ExportStepProps {
  working: WorkingState;
  generatedCss: { tokens: string; themes: string; palettes: string; all: string };
  hasChanges: boolean;
  onSave: () => void;
}

function ExportStep({ working, generatedCss, hasChanges, onSave }: ExportStepProps) {
  const exportJson = useCallback(() => {
    const config: BuilderConfig = {
      name: "staple-css",
      version: "1.0.0",
      ...working,
    };
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tokens-config.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [working]);

  const exportCss = useCallback((type: "all" | "tokens" | "themes" | "palettes") => {
    const css = generatedCss[type];
    const filename = type === "all" ? "tokens.css" : `${type}.css`;
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [generatedCss]);

  return (
    <Stack gap={6}>
      <Card pad={4} radius={2}>
        <Stack gap={4}>
          <Stack gap={2}>
            <Text as="h2" size={3} weight="semibold">
              Save & Export
            </Text>
            <Text tone="muted">
              Save your configuration or export as JSON/CSS files.
            </Text>
          </Stack>

          {/* Save to Config */}
          <Card pad={3} radius={1} className={hasChanges ? "builder-unsaved" : ""}>
            <Inline gap={3} align="center" justify="between">
              <Stack gap={1}>
                <Text weight="semibold">Save to Config</Text>
                <Text size={0} tone="muted">
                  {hasChanges ? "You have unsaved changes" : "Configuration is up to date"}
                </Text>
              </Stack>
              <button
                onClick={onSave}
                disabled={!hasChanges}
                className="studio-btn studio-btn--primary"
              >
                Save Changes
              </button>
            </Inline>
          </Card>

          {/* Export Options */}
          <Stack gap={3}>
            <Text weight="semibold">Export</Text>
            <Inline gap={2} wrap>
              <button onClick={exportJson} className="studio-btn">
                Export JSON Config
              </button>
              <button onClick={() => exportCss("all")} className="studio-btn">
                Export All CSS
              </button>
              <button onClick={() => exportCss("tokens")} className="studio-btn">
                Export tokens.css
              </button>
              <button onClick={() => exportCss("themes")} className="studio-btn">
                Export themes.css
              </button>
              <button onClick={() => exportCss("palettes")} className="studio-btn">
                Export palettes.css
              </button>
            </Inline>
          </Stack>
        </Stack>
      </Card>

      {/* CSS Preview */}
      <Card pad={4} radius={2}>
        <Stack gap={4}>
          <Text weight="semibold">Generated CSS Preview</Text>
          <CodePreview
            code={generatedCss.all}
            language="css"
            title="all.css"
            collapsible
            defaultCollapsed={false}
          />
        </Stack>
      </Card>
    </Stack>
  );
}

// ============================================================================
// Helper Components
// ============================================================================

interface LivePreviewProps {
  colors: Record<string, string>;
  mode: "light" | "dark";
  palettes: Palette[];
}

function LivePreview({ colors, mode, palettes }: LivePreviewProps) {
  const bgColor = colors.background || "#ffffff";
  const surfaceColor = colors.surface || "#f9fafb";
  const textColor = colors.text || "#111827";
  const mutedColor = colors.textMuted || "#6b7280";
  const borderColor = colors.border || "#e5e7eb";
  const primaryColor = colors.primary || "#2563eb";
  const primaryTextColor = colors.primaryText || "#ffffff";
  const dangerColor = colors.danger || "#dc2626";
  const successColor = colors.success || "#16a34a";

  // Get secondary and accent colors from palettes
  const secondaryPalette = palettes.find(p => p.name === "secondary");
  const accentPalette = palettes.find(p => p.name === "accent");
  const secondaryColor = secondaryPalette
    ? (mode === "light" ? secondaryPalette.lightSteps[8] : secondaryPalette.darkSteps[8])
    : "#7c3aed";
  const accentColor = accentPalette
    ? (mode === "light" ? accentPalette.lightSteps[8] : accentPalette.darkSteps[8])
    : "#f59e0b";

  return (
    <div
      className="builder-live-preview"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: borderColor,
      }}
    >
      <Stack gap={4}>
        {/* Sample Card */}
        <div
          className="builder-preview-card"
          style={{ backgroundColor: surfaceColor, borderColor }}
        >
          <Stack gap={2}>
            <span style={{ color: textColor, fontWeight: 600 }}>Sample Card</span>
            <span style={{ color: mutedColor, fontSize: "var(--st-font-size-1)" }}>
              This is how your token system looks in practice.
            </span>
            <Inline gap={2} wrap>
              <button
                className="builder-preview-btn builder-preview-btn--primary"
                style={{ backgroundColor: primaryColor, color: primaryTextColor }}
              >
                Primary
              </button>
              <button
                className="builder-preview-btn builder-preview-btn--primary"
                style={{ backgroundColor: secondaryColor, color: "#fff" }}
              >
                Secondary
              </button>
              <button
                className="builder-preview-btn builder-preview-btn--primary"
                style={{ backgroundColor: accentColor, color: "#fff" }}
              >
                Accent
              </button>
            </Inline>
          </Stack>
        </div>

        {/* Status Colors */}
        <Inline gap={2}>
          <span
            className="builder-preview-badge"
            style={{ backgroundColor: successColor, color: "#fff" }}
          >
            Success
          </span>
          <span
            className="builder-preview-badge"
            style={{ backgroundColor: colors.warn || "#d97706", color: "#fff" }}
          >
            Warning
          </span>
          <span
            className="builder-preview-badge"
            style={{ backgroundColor: dangerColor, color: "#fff" }}
          >
            Danger
          </span>
        </Inline>

        {/* Text Samples */}
        <Stack gap={1}>
          <span style={{ color: textColor }}>Primary text color</span>
          <span style={{ color: mutedColor }}>Muted text color</span>
          <span style={{ color: primaryColor }}>Link color</span>
        </Stack>
      </Stack>
    </div>
  );
}

interface ContrastValidationProps {
  colors: Record<string, string>;
  mode: "light" | "dark";
}

function ContrastValidation({ colors, mode }: ContrastValidationProps) {
  const checks = useMemo(() => {
    const results: Array<{ label: string; fg: string; bg: string; ratio: number; pass: boolean }> = [];

    // Text on background
    if (colors.text && colors.background) {
      const ratio = wcagContrastHex(colors.text, colors.background);
      results.push({
        label: "Text on Background",
        fg: colors.text,
        bg: colors.background,
        ratio,
        pass: ratio >= 4.5,
      });
    }

    // Muted text on background
    if (colors.textMuted && colors.background) {
      const ratio = wcagContrastHex(colors.textMuted, colors.background);
      results.push({
        label: "Muted Text on Background",
        fg: colors.textMuted,
        bg: colors.background,
        ratio,
        pass: ratio >= 4.5,
      });
    }

    // Primary text on primary
    if (colors.primaryText && colors.primary) {
      const ratio = wcagContrastHex(colors.primaryText, colors.primary);
      results.push({
        label: "Text on Primary Button",
        fg: colors.primaryText,
        bg: colors.primary,
        ratio,
        pass: ratio >= 4.5,
      });
    }

    return results;
  }, [colors]);

  return (
    <Stack gap={2}>
      {checks.map((check) => (
        <Inline key={check.label} gap={2} align="center" justify="between">
          <Inline gap={2} align="center">
            <div
              className="builder-contrast-sample"
              style={{ backgroundColor: check.bg }}
            >
              <span style={{ color: check.fg }}>Aa</span>
            </div>
            <Text size={1}>{check.label}</Text>
          </Inline>
          <Inline gap={2} align="center">
            <Text size={0} mono>{check.ratio.toFixed(2)}:1</Text>
            <span className={`contrast-badge ${check.pass ? "contrast-badge--pass" : "contrast-badge--fail"}`}>
              {check.pass ? "AA ✓" : "Fail"}
            </span>
          </Inline>
        </Inline>
      ))}
    </Stack>
  );
}
