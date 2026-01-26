/**
 * Tokens Builder Page
 *
 * Unified step-based workflow for building a complete token system.
 * Steps: Seeds → Harmony → Generate → Scales → Review → Overrides → Export
 */

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Container, Column, Text, Row, Card, Box, Grid, Flex } from "@staple-css/primitives";
import {
  type Seeds,
  type GenerationParams,
  type Palette,
  type SemanticMap,
  type Override,
  type BuilderConfig,
  generatePalettes,
  generateSinglePalette,
  generateBuilderCss,
  createDefaultBuilderConfig,
  resolveSemanticColors,
  applyPaletteOverrides,
  applySemanticOverrides,
  spaceScale,
  radiusScale,
  shadowScale,
  fontSizeScale,
  fontWeight,
  lineHeight,
  duration,
  easing,
} from "@staple-css/tokens";
import { generateHarmony, wcagContrastHex, type HarmonyType } from "@staple-css/tokens/color";
import { ColorPicker } from "../../components/ColorPicker";
import { CodePreview } from "../../components/CodePreview";
import {
  TransformEffectsEditor,
  BorderOutlineEditor,
  LayoutUtilitiesEditor,
  SizingDepthEditor,
  TextUtilitiesEditor,
} from "./TokenScaleEditors";

// ============================================================================
// Types
// ============================================================================

type BuilderStep = "seeds" | "scales" | "export";

// Responsive value: base value + optional breakpoint overrides
interface ResponsiveValue {
  base: string;
  breakpoints?: Record<string, string>; // e.g., { sm: "0.5rem", lg: "1rem" }
}

interface ScaleTokens {
  // Existing scales
  space: Record<string, ResponsiveValue>;
  radius: Record<string, string>;
  shadow: Record<string, string>;
  fontSize: Record<string, string>;
  fontWeight: Record<string, string>;
  lineHeight: Record<string, string>;
  duration: Record<string, string>;
  easing: Record<string, string>;

  // New: Transform & Effects
  blur?: Record<string, string>;
  brightness?: Record<string, string>;
  contrast?: Record<string, string>;
  saturate?: Record<string, string>;
  scale?: Record<string, string>;
  translate?: Record<string, string>;
  rotate?: Record<string, string>;
  backdrop?: Record<string, string>;

  // New: Border & Outline
  borderWidth?: Record<string, string>;
  outlineWidth?: Record<string, string>;
  outlineOffset?: Record<string, string>;
  letterSpacing?: Record<string, string>;
  lineClamp?: Record<string, string>;

  // New: Layout Utilities
  display?: Record<string, string>;
  position?: Record<string, string>;
  overflow?: Record<string, string>;
  flexGrow?: Record<string, string>;
  flexShrink?: Record<string, string>;
  order?: Record<string, string>;

  // New: Sizing & Depth
  maxWidth?: Record<string, string>;
  aspectRatio?: Record<string, string>;
  zIndex?: Record<string, string>;
  opacity?: Record<string, string>;

  // New: Text Utilities
  textTransform?: Record<string, string>;
  whiteSpace?: Record<string, string>;
  objectFit?: Record<string, string>;
  cursor?: Record<string, string>;
}

interface WorkingState {
  seeds: Seeds;
  generation: GenerationParams;
  palettes: Palette[];
  customPalettes: Array<{ name: string; baseColor: string }>; // User-created palettes
  semanticMap: {
    light: SemanticMap;
    dark: SemanticMap;
  };
  overrides: Override[];
  scales: ScaleTokens;
  breakpoints: Record<string, string>;
}

// ============================================================================
// Builder Page Component
// ============================================================================

export function BuilderPage() {
  const [currentStep, setCurrentStep] = useState<BuilderStep>("seeds");

  // Sidebar state with localStorage persistence
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("staple-builder-sidebar");
    return stored !== null ? stored === "true" : window.innerWidth >= 1024;
  });

  // Keyboard shortcut handler (Cmd/Ctrl + B)
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        setSidebarOpen(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, []);

  // Persist sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem("staple-builder-sidebar", String(sidebarOpen));
  }, [sidebarOpen]);

  // Auto-collapse on mobile (<1024px)
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setSidebarOpen(window.innerWidth >= 1024);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Default breakpoints
  const defaultBreakpoints: Record<string, string> = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  };

  // Convert simple scale to responsive format
  const toResponsiveSpace = (scale: Record<string, string>): Record<string, ResponsiveValue> => {
    const result: Record<string, ResponsiveValue> = {};
    for (const [key, value] of Object.entries(scale)) {
      result[key] = { base: value };
    }
    return result;
  };

  // Working state (unsaved changes)
  const [working, setWorking] = useState<WorkingState>(() => {
    const defaultConfig = createDefaultBuilderConfig();
    return {
      seeds: defaultConfig.seeds,
      generation: defaultConfig.generation,
      palettes: defaultConfig.palettes,
      customPalettes: [], // Initialize empty array for user-created palettes
      semanticMap: defaultConfig.semanticMap,
      overrides: [],
      scales: {
        // Existing scales
        space: toResponsiveSpace(spaceScale),
        radius: { ...radiusScale },
        shadow: { ...shadowScale },
        fontSize: { ...fontSizeScale },
        fontWeight: { ...fontWeight },
        lineHeight: { ...lineHeight },
        duration: { ...duration },
        easing: { ...easing },

        // New scales - initialized as empty, users can add items
        blur: {},
        brightness: {},
        contrast: {},
        saturate: {},
        scale: {},
        translate: {},
        rotate: {},
        backdrop: {},
        borderWidth: {},
        outlineWidth: {},
        outlineOffset: {},
        letterSpacing: {},
        lineClamp: {},
        display: {},
        position: {},
        overflow: {},
        flexGrow: {},
        flexShrink: {},
        order: {},
        maxWidth: {},
        aspectRatio: {},
        zIndex: {},
        opacity: {},
        textTransform: {},
        whiteSpace: {},
        objectFit: {},
        cursor: {},
      },
      breakpoints: { ...defaultBreakpoints },
    };
  });

  // Saved state (persisted config)
  const [saved, setSaved] = useState<WorkingState | null>(null);

  // Preview mode
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("light");

  // Preview size (mobile, tablet, desktop)
  const [previewSize, setPreviewSize] = useState<"mobile" | "tablet" | "desktop">("desktop");

  // Preview expanded state (showing full preview)
  const [previewExpanded, setPreviewExpanded] = useState(false);

  // Semantic color overrides (separate for light and dark)
  const [semanticOverrides, setSemanticOverrides] = useState<{
    light: Record<string, string>;
    dark: Record<string, string>;
  }>({ light: {}, dark: {} });

  // Handler to update semantic overrides
  const updateSemanticOverride = useCallback((mode: "light" | "dark", key: string, value: string) => {
    setSemanticOverrides(prev => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [key]: value,
      },
    }));
  }, []);

  // Steps configuration
  const steps: Array<{ id: BuilderStep; label: string; description: string }> = [
    { id: "seeds", label: "1. Brand Colors", description: "Colors, palettes & semantics" },
    { id: "scales", label: "2. Scales", description: "Space, radius, motion" },
    { id: "export", label: "3. Export", description: "Save & download" },
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

  // Track selected harmonies - can have secondary, accent, and custom colors
  const [selectedHarmonies, setSelectedHarmonies] = useState<Record<string, HarmonyType>>({});

  // Custom colors (beyond secondary and accent)
  const [customColors, setCustomColors] = useState<Record<string, string>>({});

  // Apply harmony suggestion to any color role
  const applyHarmony = useCallback((type: HarmonyType, role: string, colorIndex: number = 0) => {
    const colors = generateHarmony(working.seeds.primary, type);
    const selectedColor = colors[colorIndex] || colors[0];
    if (selectedColor) {
      if (role === "secondary" || role === "accent") {
        updateSeed(role as keyof Seeds, selectedColor);
      } else {
        // Custom color
        setCustomColors(prev => ({ ...prev, [role]: selectedColor }));
      }
      setSelectedHarmonies(prev => ({ ...prev, [role]: type }));
    }
  }, [working.seeds.primary, updateSeed]);

  // Add custom color
  const addCustomColor = useCallback((name: string, value: string) => {
    setCustomColors(prev => ({ ...prev, [name]: value }));
  }, []);

  // Update custom color
  const updateCustomColor = useCallback((name: string, value: string) => {
    setCustomColors(prev => ({ ...prev, [name]: value }));
    // Clear harmony selection if manually changed
    setSelectedHarmonies(prev => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  // Remove custom color
  const removeCustomColor = useCallback((name: string) => {
    setCustomColors(prev => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
    setSelectedHarmonies(prev => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  // Add custom palette
  const addCustomPalette = useCallback((name: string, baseColor: string) => {
    setWorking(prev => ({
      ...prev,
      customPalettes: [...prev.customPalettes, { name, baseColor }],
    }));
  }, []);

  // Remove custom palette
  const removeCustomPalette = useCallback((name: string) => {
    setWorking(prev => ({
      ...prev,
      customPalettes: prev.customPalettes.filter(p => p.name !== name),
    }));
  }, []);

  // Update custom palette color
  const updateCustomPalette = useCallback((name: string, baseColor: string) => {
    setWorking(prev => ({
      ...prev,
      customPalettes: prev.customPalettes.map(p =>
        p.name === name ? { ...p, baseColor } : p
      ),
    }));
  }, []);

  // Generate palettes for custom colors and custom palettes, combine with base palettes
  const allPalettes = useMemo(() => {
    const customColorPalettes = Object.entries(customColors).map(([name, color]) =>
      generateSinglePalette(name, color, working.generation)
    );
    const userCreatedPalettes = working.customPalettes.map(({ name, baseColor }) =>
      generateSinglePalette(name, baseColor, working.generation)
    );
    return [...working.palettes, ...customColorPalettes, ...userCreatedPalettes];
  }, [working.palettes, working.customPalettes, customColors, working.generation]);

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

  // Update scale token (handles both simple and responsive values)
  const updateScaleToken = useCallback((
    scaleType: keyof ScaleTokens,
    key: string,
    value: string
  ) => {
    setWorking(prev => {
      if (scaleType === "space") {
        // Space uses responsive values
        const currentSpace = prev.scales.space[key] || { base: "0" };
        return {
          ...prev,
          scales: {
            ...prev.scales,
            space: {
              ...prev.scales.space,
              [key]: { ...currentSpace, base: value },
            },
          },
        };
      }
      // Other scales use simple string values
      return {
        ...prev,
        scales: {
          ...prev.scales,
          [scaleType]: {
            ...prev.scales[scaleType],
            [key]: value,
          },
        },
      };
    });
  }, []);

  // Update space token breakpoint value
  const updateSpaceBreakpoint = useCallback((
    spaceKey: string,
    breakpointKey: string,
    value: string | null // null to remove
  ) => {
    setWorking(prev => {
      const currentSpace = prev.scales.space[spaceKey] || { base: "0" };
      const currentBreakpoints = currentSpace.breakpoints || {};

      let newBreakpoints: Record<string, string> | undefined;
      if (value === null) {
        // Remove breakpoint
        const { [breakpointKey]: _, ...rest } = currentBreakpoints;
        newBreakpoints = Object.keys(rest).length > 0 ? rest : undefined;
      } else {
        // Set breakpoint
        newBreakpoints = { ...currentBreakpoints, [breakpointKey]: value };
      }

      return {
        ...prev,
        scales: {
          ...prev.scales,
          space: {
            ...prev.scales.space,
            [spaceKey]: {
              ...currentSpace,
              breakpoints: newBreakpoints,
            },
          },
        },
      };
    });
  }, []);

  // Reset scale to default
  const resetScale = useCallback((scaleType: keyof ScaleTokens) => {
    setWorking(prev => {
      if (scaleType === "space") {
        return {
          ...prev,
          scales: {
            ...prev.scales,
            space: toResponsiveSpace(spaceScale),
          },
        };
      }
      const defaults: Record<Exclude<keyof ScaleTokens, "space">, Record<string, string>> = {
        radius: { ...radiusScale },
        shadow: { ...shadowScale },
        fontSize: { ...fontSizeScale },
        fontWeight: { ...fontWeight },
        lineHeight: { ...lineHeight },
        duration: { ...duration },
        easing: { ...easing },
      };
      return {
        ...prev,
        scales: {
          ...prev.scales,
          [scaleType]: defaults[scaleType],
        },
      };
    });
  }, [toResponsiveSpace]);

  // Add scale item
  const addScaleItem = useCallback((scaleType: keyof ScaleTokens) => {
    setWorking(prev => {
      const currentScale = prev.scales[scaleType];
      const keys = Object.keys(currentScale);
      // Try to find next numeric key
      const numericKeys = keys.map(k => parseInt(k)).filter(n => !isNaN(n));
      const nextKey = numericKeys.length > 0 ? String(Math.max(...numericKeys) + 1) : String(keys.length);

      if (scaleType === "space") {
        return {
          ...prev,
          scales: {
            ...prev.scales,
            space: {
              ...prev.scales.space,
              [nextKey]: { base: "1rem" },
            },
          },
        };
      }

      // Default values based on scale type
      const defaultValues: Record<Exclude<keyof ScaleTokens, "space">, string> = {
        radius: "0.5rem",
        shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        fontSize: "1rem",
        fontWeight: "400",
        lineHeight: "1.5",
        duration: "200ms",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      };

      return {
        ...prev,
        scales: {
          ...prev.scales,
          [scaleType]: {
            ...currentScale,
            [nextKey]: defaultValues[scaleType],
          },
        },
      };
    });
  }, []);

  // Remove scale item
  const removeScaleItem = useCallback((scaleType: keyof ScaleTokens, key: string) => {
    setWorking(prev => {
      if (scaleType === "space") {
        const currentSpace = { ...prev.scales.space };
        delete currentSpace[key];
        return {
          ...prev,
          scales: {
            ...prev.scales,
            space: currentSpace,
          },
        };
      }
      const currentScale = { ...prev.scales[scaleType] } as Record<string, string>;
      delete currentScale[key];
      return {
        ...prev,
        scales: {
          ...prev.scales,
          [scaleType]: currentScale,
        },
      };
    });
  }, []);

  // Update breakpoint
  const updateBreakpoint = useCallback((key: string, value: string) => {
    setWorking(prev => ({
      ...prev,
      breakpoints: {
        ...prev.breakpoints,
        [key]: value,
      },
    }));
  }, []);

  // Add breakpoint
  const addBreakpoint = useCallback(() => {
    setWorking(prev => {
      const keys = Object.keys(prev.breakpoints);
      const nextKey = `bp${keys.length + 1}`;
      return {
        ...prev,
        breakpoints: {
          ...prev.breakpoints,
          [nextKey]: "800px",
        },
      };
    });
  }, []);

  // Remove breakpoint
  const removeBreakpoint = useCallback((key: string) => {
    setWorking(prev => {
      const newBreakpoints = { ...prev.breakpoints };
      delete newBreakpoints[key];
      return {
        ...prev,
        breakpoints: newBreakpoints,
      };
    });
  }, []);

  // Rename breakpoint (change the prefix)
  const renameBreakpoint = useCallback((oldKey: string, newKey: string) => {
    if (oldKey === newKey || !newKey.trim()) return;
    setWorking(prev => {
      const value = prev.breakpoints[oldKey];
      if (value === undefined) return prev; // Guard against undefined

      const newBreakpoints: Record<string, string> = {};
      // Preserve order by rebuilding object
      for (const [k, v] of Object.entries(prev.breakpoints)) {
        if (k === oldKey) {
          newBreakpoints[newKey] = value;
        } else {
          newBreakpoints[k] = v;
        }
      }
      // Also update any space token breakpoint references
      const newSpace: Record<string, ResponsiveValue> = {};
      for (const [spaceKey, spaceVal] of Object.entries(prev.scales.space)) {
        if (spaceVal.breakpoints && spaceVal.breakpoints[oldKey] !== undefined) {
          const oldVal = spaceVal.breakpoints[oldKey];
          const newBpEntries = Object.entries(spaceVal.breakpoints)
            .filter(([k]) => k !== oldKey)
            .concat([[newKey, oldVal]]);
          newSpace[spaceKey] = {
            ...spaceVal,
            breakpoints: Object.fromEntries(newBpEntries),
          };
        } else {
          newSpace[spaceKey] = spaceVal;
        }
      }
      return {
        ...prev,
        breakpoints: newBreakpoints,
        scales: {
          ...prev.scales,
          space: newSpace,
        },
      };
    });
  }, []);

  // Save working state
  const saveConfig = useCallback(() => {
    setSaved({ ...working });
  }, [working]);

  // Import configuration
  const importConfig = useCallback((config: Partial<WorkingState>) => {
    setWorking(prev => ({
      ...prev,
      ...(config.seeds && { seeds: { ...prev.seeds, ...config.seeds } }),
      ...(config.generation && { generation: { ...prev.generation, ...config.generation } }),
      ...(config.palettes && { palettes: config.palettes }),
      ...(config.customPalettes && { customPalettes: config.customPalettes }),
      ...(config.semanticMap && { semanticMap: config.semanticMap }),
      ...(config.overrides && { overrides: config.overrides }),
      ...(config.scales && { scales: { ...prev.scales, ...config.scales } }),
      ...(config.breakpoints && { breakpoints: config.breakpoints }),
    }));
  }, []);

  // Has unsaved changes
  const hasChanges = useMemo(() => {
    if (!saved) return true;
    return JSON.stringify(working) !== JSON.stringify(saved);
  }, [working, saved]);

  // Generate CSS from working state (including custom palettes)
  const generatedCss = useMemo(() => {
    const config: BuilderConfig = {
      name: "staple-css",
      version: "1.0.0",
      ...working,
      palettes: allPalettes, // Include custom color palettes
    };
    return generateBuilderCss(config);
  }, [working, allPalettes]);

  // Resolved colors for preview - dependencies are explicit to ensure updates propagate
  const resolvedColors = useMemo(() => {
    const palettes = applyPaletteOverrides(allPalettes, working.overrides);
    const lightColors = {
      ...applySemanticOverrides(
        resolveSemanticColors(working.semanticMap.light, palettes, "light"),
        working.overrides,
        palettes,
        "light"
      ),
      ...semanticOverrides.light, // Apply user overrides on top
    };
    const darkColors = {
      ...applySemanticOverrides(
        resolveSemanticColors(working.semanticMap.dark, palettes, "dark"),
        working.overrides,
        palettes,
        "dark"
      ),
      ...semanticOverrides.dark, // Apply user overrides on top
    };
    return { light: lightColors, dark: darkColors };
  }, [allPalettes, working.semanticMap, working.overrides, semanticOverrides]);

  return (
    <Container size="xl">
      <Column gap={6}>
        {/* Header */}
        <Column gap={2}>
          <Text as="h1" size={5} weight="bold">
            Tokens Studio
          </Text>
          <Text tone="muted">
            Build a complete design token system step by step.
          </Text>
        </Column>

        {/* Step Navigation */}
        <Card pad={4} radius={2}>
          <Row gap={2} align="center" wrap="wrap">
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
          </Row>
        </Card>

        {/* Main Content Area */}
        <div className={`builder-layout ${sidebarOpen ? "builder-layout--sidebar-open" : "builder-layout--sidebar-closed"}`}>
          {/* Sidebar Toggle Button */}
          <button
            className="builder-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close sidebar (⌘B)" : "Open sidebar (⌘B)"}
            title={`${sidebarOpen ? "Close" : "Open"} sidebar (Cmd/Ctrl + B)`}
          >
            {sidebarOpen ? "✕" : "≡"}
          </button>
          {/* Left: Step Content */}
          <div className="builder-main">
            {currentStep === "seeds" && (
              <SeedsStep
                seeds={working.seeds}
                customColors={customColors}
                onUpdate={updateSeed}
                onAddCustomColor={addCustomColor}
                onUpdateCustomColor={updateCustomColor}
                onRemoveCustomColor={removeCustomColor}
                onApplyHarmony={applyHarmony}
                selectedHarmonies={selectedHarmonies}
                resolvedColors={resolvedColors}
                palettes={allPalettes}
                previewMode={previewMode}
                onSetPreviewMode={setPreviewMode}
                semanticOverrides={semanticOverrides}
                onUpdateSemanticOverride={updateSemanticOverride}
                generation={working.generation}
                onUpdateGeneration={updateGeneration}
                onRegenerate={regeneratePalettes}
                overrides={working.overrides}
                onAddOverride={addOverride}
                onRemoveOverride={removeOverride}
                customPalettes={working.customPalettes}
                onAddCustomPalette={addCustomPalette}
                onUpdateCustomPalette={updateCustomPalette}
                onRemoveCustomPalette={removeCustomPalette}
              />
            )}
            {currentStep === "scales" && (
              <ScalesStep
                scales={working.scales}
                onUpdate={updateScaleToken}
                onUpdateSpaceBreakpoint={updateSpaceBreakpoint}
                onReset={resetScale}
                onAddItem={addScaleItem}
                onRemoveItem={removeScaleItem}
                breakpoints={working.breakpoints}
                onUpdateBreakpoint={updateBreakpoint}
                onRenameBreakpoint={renameBreakpoint}
                onAddBreakpoint={addBreakpoint}
                onRemoveBreakpoint={removeBreakpoint}
              />
            )}
            {currentStep === "export" && (
              <ExportStep
                working={working}
                generatedCss={generatedCss}
                hasChanges={hasChanges}
                onSave={saveConfig}
                onImport={importConfig}
              />
            )}
          </div>

          {/* Right: Live Preview + Accessibility */}
          <div className="builder-preview">
            <Column gap={4}>
              {/* Accessibility Summary */}
              {currentStep === "seeds" && (
                <Card pad={4} radius={2}>
                  <Column gap={3}>
                    <Column gap={1}>
                      <Text weight="semibold">Accessibility Check</Text>
                      <Text size={0} tone="muted">WCAG 2.1 contrast score</Text>
                    </Column>
                    <AccessibilitySummary
                      getColor={(key: string, fallback: string = "#888888") =>
                        resolvedColors[previewMode][key] || fallback
                      }
                    />
                    <a
                      href="#accessibility-details"
                      className="studio-btn studio-btn--sm"
                      style={{ textDecoration: "none", textAlign: "center" }}
                    >
                      View Details ↓
                    </a>
                  </Column>
                </Card>
              )}

              {/* Live Preview */}
              <Card pad={4} radius={2}>
                <Column gap={4}>
                  <Row gap={2} align="center" justify="between" wrap="wrap">
                    <Text weight="semibold">Live Preview</Text>
                    {/* View mode controls */}
                    <Row gap={2} wrap="wrap">
                      <button
                        onClick={() => setPreviewExpanded(!previewExpanded)}
                        className="studio-btn studio-btn--sm studio-btn--primary"
                        title={previewExpanded ? "Hide full preview" : "Show full preview"}
                      >
                        {previewExpanded ? "Hide Preview" : "Preview"}
                      </button>
                      {/* Size presets (shown when preview expanded) */}
                      {previewExpanded && (
                        <Row gap={1}>
                          <button
                            onClick={() => setPreviewSize("mobile")}
                            className={`studio-btn studio-btn--xs ${previewSize === "mobile" ? "studio-btn--primary" : ""}`}
                            title="Mobile viewport (375px)"
                          >
                            📱
                          </button>
                          <button
                            onClick={() => setPreviewSize("tablet")}
                            className={`studio-btn studio-btn--xs ${previewSize === "tablet" ? "studio-btn--primary" : ""}`}
                            title="Tablet viewport (768px)"
                          >
                            📑
                          </button>
                          <button
                            onClick={() => setPreviewSize("desktop")}
                            className={`studio-btn studio-btn--xs ${previewSize === "desktop" ? "studio-btn--primary" : ""}`}
                            title="Desktop viewport (1024px)"
                          >
                            🖥️
                          </button>
                        </Row>
                      )}
                      {/* Light/Dark mode controls */}
                      <Row gap={1}>
                        <button
                          onClick={() => setPreviewMode("light")}
                          className={`studio-btn studio-btn--xs ${previewMode === "light" ? "studio-btn--primary" : ""}`}
                        >
                          Light
                        </button>
                        <button
                          onClick={() => setPreviewMode("dark")}
                          className={`studio-btn studio-btn--xs ${previewMode === "dark" ? "studio-btn--primary" : ""}`}
                        >
                          Dark
                        </button>
                      </Row>
                    </Row>
                  </Row>
                </Column>
              </Card>
            </Column>
          </div>

        </div>

        {/* Full-screen preview modal */}
        {previewExpanded && (
          <div className="builder-preview-modal-overlay">
            <div className="builder-preview-modal">
              <div className="builder-preview-modal-header">
                <Flex gap={2} align="center" justify="between">
                  <Text weight="semibold" size={3}>Live Preview</Text>
                  <Flex gap={2} align="center">
                    {/* Size presets */}
                    <Flex gap={1}>
                      <button
                        onClick={() => setPreviewSize("mobile")}
                        className={`studio-btn studio-btn--xs ${previewSize === "mobile" ? "studio-btn--primary" : ""}`}
                        title="Mobile viewport (375px)"
                      >
                        📱
                      </button>
                      <button
                        onClick={() => setPreviewSize("tablet")}
                        className={`studio-btn studio-btn--xs ${previewSize === "tablet" ? "studio-btn--primary" : ""}`}
                        title="Tablet viewport (768px)"
                      >
                        📑
                      </button>
                      <button
                        onClick={() => setPreviewSize("desktop")}
                        className={`studio-btn studio-btn--xs ${previewSize === "desktop" ? "studio-btn--primary" : ""}`}
                        title="Desktop viewport (1024px)"
                      >
                        🖥️
                      </button>
                    </Flex>
                    {/* Light/Dark mode */}
                    <Flex gap={1}>
                      <button
                        onClick={() => setPreviewMode("light")}
                        className={`studio-btn studio-btn--xs ${previewMode === "light" ? "studio-btn--primary" : ""}`}
                      >
                        Light
                      </button>
                      <button
                        onClick={() => setPreviewMode("dark")}
                        className={`studio-btn studio-btn--xs ${previewMode === "dark" ? "studio-btn--primary" : ""}`}
                      >
                        Dark
                      </button>
                    </Flex>
                    <button
                      onClick={() => setPreviewExpanded(false)}
                      className="studio-btn studio-btn--sm"
                      title="Close preview"
                    >
                      ✕ Close
                    </button>
                  </Flex>
                </Flex>
              </div>
              <div className="builder-preview-modal-body">
                <LivePreview
                  colors={resolvedColors[previewMode]}
                  mode={previewMode}
                  palettes={allPalettes}
                  size={previewSize}
                  onSizeChange={setPreviewSize}
                  embedded
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Footer */}
        <Card pad={4} radius={2}>
          <Row gap={2} align="center" justify="between">
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
          </Row>
        </Card>
      </Column>
    </Container>
  );
}

// ============================================================================
// Step Components
// ============================================================================

interface SeedsStepProps {
  seeds: Seeds;
  customColors: Record<string, string>;
  onUpdate: (key: keyof Seeds, value: string) => void;
  onAddCustomColor: (name: string, value: string) => void;
  onUpdateCustomColor: (name: string, value: string) => void;
  onRemoveCustomColor: (name: string) => void;
  onApplyHarmony: (type: HarmonyType, role: string, colorIndex?: number) => void;
  selectedHarmonies: Record<string, HarmonyType>;
  resolvedColors: { light: Record<string, string>; dark: Record<string, string> };
  palettes: Palette[];
  previewMode: "light" | "dark";
  onSetPreviewMode: (mode: "light" | "dark") => void;
  semanticOverrides: { light: Record<string, string>; dark: Record<string, string> };
  onUpdateSemanticOverride: (mode: "light" | "dark", key: string, value: string) => void;
  // Generation props
  generation: GenerationParams;
  onUpdateGeneration: (key: keyof GenerationParams, value: number | boolean | string) => void;
  onRegenerate: () => void;
  // Palette override props
  overrides: Override[];
  onAddOverride: (override: Omit<Override, "id">) => void;
  onRemoveOverride: (id: string) => void;
  // Custom palettes props
  customPalettes: Array<{ name: string; baseColor: string }>;
  onAddCustomPalette: (name: string, baseColor: string) => void;
  onUpdateCustomPalette: (name: string, baseColor: string) => void;
  onRemoveCustomPalette: (name: string) => void;
}

function SeedsStep({
  seeds,
  customColors,
  onUpdate,
  onAddCustomColor,
  onUpdateCustomColor,
  onRemoveCustomColor,
  onApplyHarmony: _onApplyHarmony,
  selectedHarmonies: _selectedHarmonies,
  resolvedColors,
  palettes,
  previewMode,
  onSetPreviewMode,
  semanticOverrides,
  onUpdateSemanticOverride,
  generation,
  onUpdateGeneration,
  onRegenerate,
  overrides,
  onAddOverride,
  onRemoveOverride,
  customPalettes,
  onAddCustomPalette,
  onUpdateCustomPalette,
  onRemoveCustomPalette,
}: SeedsStepProps) {
  const [newColorName, setNewColorName] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");
  const [newPaletteColor, setNewPaletteColor] = useState("#6366f1");
  const [selectedPalette, setSelectedPalette] = useState(palettes[0]?.name || "");
  const [selectedStep, setSelectedStep] = useState(5);
  const [overrideValue, setOverrideValue] = useState("#2563eb");
  const [overrideMode, setOverrideMode] = useState<"light" | "dark">("light");

  const colors = resolvedColors[previewMode];

  // Helper to safely get color with fallback
  const getColor = (key: string, fallback: string = "#888888") => colors[key] || fallback;

  const handleAddCustomColor = useCallback(() => {
    if (newColorName.trim() && !customColors[newColorName]) {
      onAddCustomColor(newColorName.trim().toLowerCase().replace(/\s+/g, "-"), "#6366f1");
      setNewColorName("");
    }
  }, [newColorName, customColors, onAddCustomColor]);

  // Handle clicking on a palette swatch to override it
  const handleSwatchClick = useCallback((paletteName: string, step: number, color: string) => {
    setSelectedPalette(paletteName);
    setSelectedStep(step);
    setOverrideValue(color);
  }, []);

  const handleAddOverride = useCallback(() => {
    onAddOverride({
      target: { type: "palette", palette: selectedPalette, step: selectedStep, mode: overrideMode },
      value: overrideValue,
      enabled: true,
    });
  }, [selectedPalette, selectedStep, overrideValue, overrideMode, onAddOverride]);

  // Get palette overrides
  const paletteOverrides = overrides.filter(o => o.target.type === "palette");

  const handleAddCustomPalette = useCallback(() => {
    if (newPaletteName.trim() && !customPalettes.some(p => p.name === newPaletteName)) {
      onAddCustomPalette(newPaletteName.trim().toLowerCase().replace(/\s+/g, "-"), newPaletteColor);
      setNewPaletteName("");
      setNewPaletteColor("#6366f1");
    }
  }, [newPaletteName, newPaletteColor, customPalettes, onAddCustomPalette]);

  return (
    <Column gap={4}>
      {/* Brand Colors - All with Light/Dark */}
      <Card pad={4} radius={2}>
        <Column gap={4}>
          <Column gap={2}>
            <Text as="h2" size={3} weight="semibold">
              Brand Colors
            </Text>
            <Text tone="muted">
              Set your brand colors. Each color can have different values for light and dark modes.
            </Text>
          </Column>

          {/* Column headers */}
          <div className="semantic-colors-header">
            <span className="semantic-colors-header-label">Color</span>
            <div className="semantic-colors-header-modes">
              <span className="semantic-colors-header-mode">Light</span>
              <span className="semantic-colors-header-mode">Dark</span>
            </div>
          </div>

          <Column gap={0}>
            <EditableSemanticColor
              label="primary"
              lightColor={seeds.primary}
              darkColor={semanticOverrides.dark.primary || resolvedColors.dark.primary || seeds.primary}
              onUpdateLight={(v) => onUpdate("primary", v)}
              onUpdateDark={(v) => onUpdateSemanticOverride("dark", "primary", v)}
              showHarmony
              onAddColor={onAddCustomColor}
            />
            <EditableSemanticColor
              label="secondary"
              lightColor={seeds.secondary || "#6366f1"}
              darkColor={semanticOverrides.dark.secondary || resolvedColors.dark.secondary || seeds.secondary || "#818cf8"}
              onUpdateLight={(v) => onUpdate("secondary", v)}
              onUpdateDark={(v) => onUpdateSemanticOverride("dark", "secondary", v)}
              showHarmony
              onAddColor={onAddCustomColor}
            />
            <EditableSemanticColor
              label="accent"
              lightColor={seeds.accent || "#ec4899"}
              darkColor={semanticOverrides.dark.accent || resolvedColors.dark.accent || seeds.accent || "#f472b6"}
              onUpdateLight={(v) => onUpdate("accent", v)}
              onUpdateDark={(v) => onUpdateSemanticOverride("dark", "accent", v)}
              showHarmony
              onAddColor={onAddCustomColor}
            />
            {/* Custom colors */}
            {Object.entries(customColors).map(([name]) => (
              <div key={name} className="editable-semantic-color-row editable-semantic-color-row--removable">
                <Row gap={2} align="center">
                  <span className="editable-semantic-color-label">{name}</span>
                  <button
                    onClick={() => onRemoveCustomColor(name)}
                    className="studio-btn studio-btn--xs studio-btn--danger"
                    title="Remove"
                  >
                    ×
                  </button>
                </Row>
                <div className="editable-semantic-color-pickers-inline">
                  <div className="editable-color-picker-cell" style={{ gridColumn: "span 2" }}>
                    <ColorPicker
                      value={customColors[name] || "#888888"}
                      onChange={(v) => onUpdateCustomColor(name, v)}
                      showHarmony
                      colorName={name}
                      onAddColor={onAddCustomColor}
                    />
                    <div style={{ marginTop: "var(--st-space-1)" }}>
                      <Text size={0} tone="muted">
                        Base color (generates light &amp; dark palettes)
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Column>

          {/* Add custom color */}
          <Row gap={2} align="end">
            <Column gap={1} style={{ flex: 1 }}>
              <Text size={0} weight="medium">Add Custom Color</Text>
              <input
                type="text"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="e.g., brand, highlight"
                className="studio-text-input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCustomColor();
                }}
              />
            </Column>
            <button
              onClick={handleAddCustomColor}
              disabled={!newColorName.trim()}
              className="studio-btn studio-btn--primary"
            >
              Add Color
            </button>
          </Row>
        </Column>
      </Card>

      {/* Semantic Colors - Editable */}
      <Card pad={4} radius={2}>
        <Column gap={4}>
          <Column gap={1}>
            <Text weight="semibold">Semantic Colors</Text>
            <Text size={0} tone="muted">
              Customize colors for light and dark modes. Changes update in real time.
            </Text>
          </Column>

          {/* Column headers */}
          <div className="semantic-colors-header">
            <span className="semantic-colors-header-label">Token</span>
            <div className="semantic-colors-header-modes">
              <span className="semantic-colors-header-mode">Light</span>
              <span className="semantic-colors-header-mode">Dark</span>
            </div>
          </div>

          <div className="editable-semantic-colors-grid">
            {/* Backgrounds */}
            <div className="semantic-color-group">
              <Text size={0} weight="medium">Backgrounds</Text>
              <Column gap={2}>
                <EditableSemanticColor
                  label="background"
                  lightColor={resolvedColors.light.background || "#ffffff"}
                  darkColor={resolvedColors.dark.background || "#1a1a1a"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "background", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "background", v)}
                />
                <EditableSemanticColor
                  label="surface"
                  lightColor={resolvedColors.light.surface || "#f5f5f5"}
                  darkColor={resolvedColors.dark.surface || "#262626"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "surface", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "surface", v)}
                />
                <EditableSemanticColor
                  label="surfaceRaised"
                  lightColor={resolvedColors.light.surfaceRaised || "#ffffff"}
                  darkColor={resolvedColors.dark.surfaceRaised || "#333333"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "surfaceRaised", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "surfaceRaised", v)}
                />
              </Column>
            </div>

            {/* Text */}
            <div className="semantic-color-group">
              <Text size={0} weight="medium">Text</Text>
              <Column gap={2}>
                <EditableSemanticColor
                  label="text"
                  lightColor={resolvedColors.light.text || "#1a1a1a"}
                  darkColor={resolvedColors.dark.text || "#fafafa"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "text", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "text", v)}
                />
                <EditableSemanticColor
                  label="textMuted"
                  lightColor={resolvedColors.light.textMuted || "#6b7280"}
                  darkColor={resolvedColors.dark.textMuted || "#9ca3af"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "textMuted", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "textMuted", v)}
                />
              </Column>
            </div>

            {/* Borders */}
            <div className="semantic-color-group">
              <Text size={0} weight="medium">Borders</Text>
              <Column gap={2}>
                <EditableSemanticColor
                  label="border"
                  lightColor={resolvedColors.light.border || "#e5e7eb"}
                  darkColor={resolvedColors.dark.border || "#404040"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "border", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "border", v)}
                />
                <EditableSemanticColor
                  label="borderMuted"
                  lightColor={resolvedColors.light.borderMuted || "#f3f4f6"}
                  darkColor={resolvedColors.dark.borderMuted || "#333333"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "borderMuted", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "borderMuted", v)}
                />
                <EditableSemanticColor
                  label="borderHover"
                  lightColor={resolvedColors.light.borderHover || "#d1d5db"}
                  darkColor={resolvedColors.dark.borderHover || "#525252"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "borderHover", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "borderHover", v)}
                />
                <EditableSemanticColor
                  label="borderFocus"
                  lightColor={resolvedColors.light.borderFocus || "#3b82f6"}
                  darkColor={resolvedColors.dark.borderFocus || "#60a5fa"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "borderFocus", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "borderFocus", v)}
                />
              </Column>
            </div>

            {/* Primary (Button Primary) */}
            <div className="semantic-color-group">
              <Text size={0} weight="medium">Button Primary</Text>
              <Column gap={2}>
                <EditableSemanticColor
                  label="primary"
                  lightColor={resolvedColors.light.primary || "#3b82f6"}
                  darkColor={resolvedColors.dark.primary || "#60a5fa"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "primary", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "primary", v)}
                />
                <EditableSemanticColor
                  label="primaryHover"
                  lightColor={resolvedColors.light.primaryHover || "#2563eb"}
                  darkColor={resolvedColors.dark.primaryHover || "#3b82f6"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "primaryHover", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "primaryHover", v)}
                />
                <EditableSemanticColor
                  label="primaryText"
                  lightColor={resolvedColors.light.primaryText || "#ffffff"}
                  darkColor={resolvedColors.dark.primaryText || "#ffffff"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "primaryText", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "primaryText", v)}
                />
                <EditableSemanticColor
                  label="primaryBorder"
                  lightColor={resolvedColors.light.primaryBorder || "#2563eb"}
                  darkColor={resolvedColors.dark.primaryBorder || "#3b82f6"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "primaryBorder", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "primaryBorder", v)}
                />
              </Column>
            </div>

            {/* Secondary (Button Secondary) */}
            <div className="semantic-color-group">
              <Text size={0} weight="medium">Button Secondary</Text>
              <Column gap={2}>
                <EditableSemanticColor
                  label="secondary"
                  lightColor={resolvedColors.light.secondary || "#6366f1"}
                  darkColor={resolvedColors.dark.secondary || "#818cf8"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "secondary", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "secondary", v)}
                />
                <EditableSemanticColor
                  label="secondaryHover"
                  lightColor={resolvedColors.light.secondaryHover || "#4f46e5"}
                  darkColor={resolvedColors.dark.secondaryHover || "#6366f1"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "secondaryHover", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "secondaryHover", v)}
                />
                <EditableSemanticColor
                  label="secondaryText"
                  lightColor={resolvedColors.light.secondaryText || "#ffffff"}
                  darkColor={resolvedColors.dark.secondaryText || "#ffffff"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "secondaryText", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "secondaryText", v)}
                />
                <EditableSemanticColor
                  label="secondaryBorder"
                  lightColor={resolvedColors.light.secondaryBorder || "#4f46e5"}
                  darkColor={resolvedColors.dark.secondaryBorder || "#6366f1"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "secondaryBorder", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "secondaryBorder", v)}
                />
              </Column>
            </div>

            {/* Accent (Button Accent) */}
            <div className="semantic-color-group">
              <Text size={0} weight="medium">Button Accent</Text>
              <Column gap={2}>
                <EditableSemanticColor
                  label="accent"
                  lightColor={resolvedColors.light.accent || "#ec4899"}
                  darkColor={resolvedColors.dark.accent || "#f472b6"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "accent", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "accent", v)}
                />
                <EditableSemanticColor
                  label="accentHover"
                  lightColor={resolvedColors.light.accentHover || "#db2777"}
                  darkColor={resolvedColors.dark.accentHover || "#ec4899"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "accentHover", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "accentHover", v)}
                />
                <EditableSemanticColor
                  label="accentText"
                  lightColor={resolvedColors.light.accentText || "#ffffff"}
                  darkColor={resolvedColors.dark.accentText || "#ffffff"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "accentText", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "accentText", v)}
                />
                <EditableSemanticColor
                  label="accentBorder"
                  lightColor={resolvedColors.light.accentBorder || "#db2777"}
                  darkColor={resolvedColors.dark.accentBorder || "#ec4899"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "accentBorder", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "accentBorder", v)}
                />
              </Column>
            </div>

            {/* Shadows */}
            <div className="semantic-color-group">
              <Text size={0} weight="medium">Shadows</Text>
              <Column gap={2}>
                <EditableSemanticColor
                  label="shadow"
                  lightColor={resolvedColors.light.shadow || "rgba(0, 0, 0, 0.1)"}
                  darkColor={resolvedColors.dark.shadow || "rgba(0, 0, 0, 0.5)"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "shadow", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "shadow", v)}
                />
                <EditableSemanticColor
                  label="shadowMedium"
                  lightColor={resolvedColors.light.shadowMedium || "rgba(0, 0, 0, 0.15)"}
                  darkColor={resolvedColors.dark.shadowMedium || "rgba(0, 0, 0, 0.6)"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "shadowMedium", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "shadowMedium", v)}
                />
                <EditableSemanticColor
                  label="shadowLarge"
                  lightColor={resolvedColors.light.shadowLarge || "rgba(0, 0, 0, 0.2)"}
                  darkColor={resolvedColors.dark.shadowLarge || "rgba(0, 0, 0, 0.7)"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "shadowLarge", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "shadowLarge", v)}
                />
              </Column>
            </div>

            {/* Status */}
            <div className="semantic-color-group">
              <Text size={0} weight="medium">Status</Text>
              <Column gap={2}>
                <EditableSemanticColor
                  label="success"
                  lightColor={resolvedColors.light.success || "#22c55e"}
                  darkColor={resolvedColors.dark.success || "#4ade80"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "success", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "success", v)}
                />
                <EditableSemanticColor
                  label="warn"
                  lightColor={resolvedColors.light.warn || "#f59e0b"}
                  darkColor={resolvedColors.dark.warn || "#fbbf24"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "warn", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "warn", v)}
                />
                <EditableSemanticColor
                  label="danger"
                  lightColor={resolvedColors.light.danger || "#ef4444"}
                  darkColor={resolvedColors.dark.danger || "#f87171"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "danger", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "danger", v)}
                />
              </Column>
            </div>

            {/* Status Surfaces */}
            <div className="semantic-color-group">
              <Text size={0} weight="medium">Status Surfaces</Text>
              <Column gap={2}>
                <EditableSemanticColor
                  label="successSurface"
                  lightColor={resolvedColors.light.successSurface || "#dcfce7"}
                  darkColor={resolvedColors.dark.successSurface || "#14532d"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "successSurface", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "successSurface", v)}
                />
                <EditableSemanticColor
                  label="warnSurface"
                  lightColor={resolvedColors.light.warnSurface || "#fef3c7"}
                  darkColor={resolvedColors.dark.warnSurface || "#78350f"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "warnSurface", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "warnSurface", v)}
                />
                <EditableSemanticColor
                  label="dangerSurface"
                  lightColor={resolvedColors.light.dangerSurface || "#fee2e2"}
                  darkColor={resolvedColors.dark.dangerSurface || "#7f1d1d"}
                  onUpdateLight={(v) => onUpdateSemanticOverride("light", "dangerSurface", v)}
                  onUpdateDark={(v) => onUpdateSemanticOverride("dark", "dangerSurface", v)}
                />
              </Column>
            </div>
          </div>
        </Column>
      </Card>

      {/* Generation Controls */}
      <Card pad={4} radius={2}>
        <Column gap={4}>
          <Row gap={2} align="center" justify="between" wrap="wrap">
            <Column gap={2}>
              <Text as="h2" size={3} weight="semibold">
                Palette Generation
              </Text>
              <Text tone="muted">
                Configure how color palettes are generated from your brand colors.
              </Text>
            </Column>
            <Row gap={1}>
              <button
                onClick={() => onSetPreviewMode("light")}
                className={`studio-btn studio-btn--sm ${previewMode === "light" ? "studio-btn--primary" : ""}`}
              >
                Light
              </button>
              <button
                onClick={() => onSetPreviewMode("dark")}
                className={`studio-btn studio-btn--sm ${previewMode === "dark" ? "studio-btn--primary" : ""}`}
              >
                Dark
              </button>
            </Row>
          </Row>

          <div className="builder-controls-grid">
            <Column gap={2}>
              <Text size={0} weight="medium">Algorithm</Text>
              <select
                value={generation.algorithm}
                onChange={(e) => onUpdateGeneration("algorithm", e.target.value)}
                className="studio-select"
              >
                <option value="oklch">OKLCH (Recommended)</option>
                <option value="hct">HCT (Tonal)</option>
              </select>
            </Column>

            <Column gap={2}>
              <Text size={0} weight="medium">Step Count</Text>
              <select
                value={generation.stepCount}
                onChange={(e) => onUpdateGeneration("stepCount", parseInt(e.target.value))}
                className="studio-select"
              >
                <option value={8}>8 steps</option>
                <option value={10}>10 steps</option>
                <option value={12}>12 steps (Recommended)</option>
              </select>
            </Column>

            <Column gap={2}>
              <Text size={0} weight="medium">
                Chroma Scale: {generation.chromaScale.toFixed(1)}
              </Text>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={generation.chromaScale}
                onChange={(e) => onUpdateGeneration("chromaScale", parseFloat(e.target.value))}
                className="studio-slider"
              />
            </Column>

            <Column gap={2}>
              <Text size={0} weight="medium">
                Contrast Target: {generation.contrastTarget.toFixed(1)}
              </Text>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={generation.contrastTarget}
                onChange={(e) => onUpdateGeneration("contrastTarget", parseFloat(e.target.value))}
                className="studio-slider"
              />
            </Column>

            <Column gap={2}>
              <Text size={0} weight="medium">Style</Text>
              <Row gap={2}>
                <button
                  onClick={() => onUpdateGeneration("vibrant", false)}
                  className={`studio-btn studio-btn--sm ${!generation.vibrant ? "studio-btn--primary" : ""}`}
                >
                  Muted
                </button>
                <button
                  onClick={() => onUpdateGeneration("vibrant", true)}
                  className={`studio-btn studio-btn--sm ${generation.vibrant ? "studio-btn--primary" : ""}`}
                >
                  Vibrant
                </button>
              </Row>
            </Column>
          </div>

          <button
            onClick={onRegenerate}
            className="studio-btn studio-btn--primary"
          >
            Regenerate Palettes
          </button>
        </Column>
      </Card>

      {/* Custom Palettes - User-created palettes */}
      <Card pad={4} radius={2}>
        <Column gap={4}>
          <Column gap={2}>
            <Text as="h2" size={3} weight="semibold">
              Custom Palettes
            </Text>
            <Text tone="muted">
              Create additional color palettes. Each palette generates a {generation.stepCount}-step color ramp.
            </Text>
          </Column>

          {/* List existing custom palettes */}
          {customPalettes.length > 0 && (
            <Column gap={2}>
              {customPalettes.map((palette) => {
                // Generate the palette to get step 8
                const generatedPalette = generateSinglePalette(palette.name, palette.baseColor, generation);
                const step8Color = generatedPalette.lightSteps[7] || palette.baseColor; // Step 8 is index 7

                return (
                  <Row key={palette.name} gap={2} align="center" justify="between" className="custom-palette-item">
                    <Row gap={2} align="center">
                      <div
                        className="builder-semantic-swatch"
                        style={{ backgroundColor: step8Color, width: "32px", height: "32px" }}
                        title={`Step 8: ${step8Color}`}
                      />
                      <Text size={1} weight="medium">{palette.name}</Text>
                    </Row>
                    <button
                      onClick={() => onRemoveCustomPalette(palette.name)}
                      className="studio-btn studio-btn--xs studio-btn--danger"
                      title="Remove palette"
                    >
                      ×
                    </button>
                  </Row>
                );
              })}
            </Column>
          )}

          {/* Add custom palette */}
          <Row gap={2} align="end">
            <Column gap={1} style={{ flex: 1 }}>
              <Text size={0} weight="medium">Palette Name</Text>
              <input
                type="text"
                value={newPaletteName}
                onChange={(e) => setNewPaletteName(e.target.value)}
                placeholder="e.g., brand, theme, corporate"
                className="studio-text-input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCustomPalette();
                }}
              />
            </Column>
            <Column gap={1}>
              <Text size={0} weight="medium">Base Color (Step 8)</Text>
              <ColorPicker
                value={newPaletteColor}
                onChange={setNewPaletteColor}
                showHarmony
              />
            </Column>
          </Row>
          <button
            onClick={handleAddCustomPalette}
            disabled={!newPaletteName.trim()}
            className="studio-btn studio-btn--primary"
          >
            Add Palette
          </button>
        </Column>
      </Card>

      {/* Generated Palettes Preview */}
      {palettes.length > 0 && (
        <Card pad={4} radius={2}>
          <Column gap={4}>
            <Row gap={2} align="center" justify="between">
              <Column gap={1}>
                <Text weight="semibold">Generated Palettes ({previewMode})</Text>
                <Text size={0} tone="muted">Click any swatch to select it for fine-tuning. Use + to add a new palette from that color.</Text>
              </Column>
            </Row>
            <Column gap={3}>
              {palettes.map((palette) => {
                const steps = previewMode === "light" ? palette.lightSteps : palette.darkSteps;
                return (
                  <Column key={palette.name} gap={2}>
                    <Row gap={2} align="center" justify="between">
                      <Text size={1} weight="medium" className="palette-name">
                        {palette.name}
                      </Text>
                      <button
                        onClick={() => onRemoveOverride(palette.name)}
                        className="studio-btn studio-btn--xs studio-btn--danger"
                        title={`Delete ${palette.name} palette`}
                      >
                        ×
                      </button>
                    </Row>
                    <div className="palette-clickable-ramp">
                      {steps.map((color, index) => {
                        const isSelected = selectedPalette === palette.name && selectedStep === index;
                        const hasOverride = paletteOverrides.some(
                          o => o.target.type === "palette" &&
                               o.target.palette === palette.name &&
                               o.target.step === index &&
                               o.target.mode === previewMode
                        );
                        return (
                          <button
                            key={index}
                            type="button"
                            className={`palette-swatch-btn ${isSelected ? "palette-swatch-btn--selected" : ""} ${hasOverride ? "palette-swatch-btn--override" : ""}`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleSwatchClick(palette.name, index, color)}
                            title={`${palette.name}[${index}]: ${color}${hasOverride ? " (has override)" : ""}`}
                          />
                        );
                      })}
                    </div>
                  </Column>
                );
              })}
            </Column>
          </Column>
        </Card>
      )}

      {/* Accessibility Details - Full breakdown */}
      <Card pad={4} radius={2} id="accessibility-details">
        <Column gap={4}>
          <Column gap={1}>
            <Text weight="semibold">Accessibility Details ({previewMode})</Text>
            <Text size={0} tone="muted">
              Complete WCAG 2.1 contrast validation for all color combinations.
            </Text>
          </Column>
          <SeedsContrastValidation
            getColor={(key: string, fallback: string = "#888888") =>
              colors[key] || fallback
            }
          />
        </Column>
      </Card>
    </Column>
  );
}


// Editable semantic color with light/dark values - always visible
interface EditableSemanticColorProps {
  label: string;
  lightColor: string;
  darkColor: string;
  onUpdateLight: (value: string) => void;
  onUpdateDark: (value: string) => void;
  showHarmony?: boolean;
  onAddColor?: (name: string, color: string) => void;
}

function EditableSemanticColor({ label, lightColor, darkColor, onUpdateLight, onUpdateDark, showHarmony = true, onAddColor }: EditableSemanticColorProps) {
  return (
    <div className="editable-semantic-color-row">
      <span className="editable-semantic-color-label">{label}</span>
      <div className="editable-semantic-color-pickers-inline">
        <div className="editable-color-picker-cell">
          <ColorPicker
            value={lightColor}
            onChange={onUpdateLight}
            showHarmony={showHarmony}
            colorName={label}
            onAddColor={onAddColor}
          />
        </div>
        <div className="editable-color-picker-cell">
          <ColorPicker
            value={darkColor}
            onChange={onUpdateDark}
            showHarmony={showHarmony}
            colorName={label}
            onAddColor={onAddColor}
          />
        </div>
      </div>
    </div>
  );
}

// Accessibility Summary - shows just the score (matches SeedsContrastValidation checks)
function AccessibilitySummary({ getColor }: { getColor: (key: string, fallback: string) => string }) {
  const score = useMemo(() => {
    const checks = [
      // Text on background
      wcagContrastHex(getColor("text", "#1a1a1a"), getColor("background", "#ffffff")) >= 4.5,
      // Muted text on background
      wcagContrastHex(getColor("textMuted", "#6b7280"), getColor("background", "#ffffff")) >= 4.5,
      // Text on surface
      wcagContrastHex(getColor("text", "#1a1a1a"), getColor("surface", "#f5f5f5")) >= 4.5,
      // Primary button text
      wcagContrastHex(getColor("primaryText", "#ffffff"), getColor("primary", "#3b82f6")) >= 4.5,
      // Success status (large text)
      wcagContrastHex(getColor("success", "#22c55e"), getColor("successSurface", "#dcfce7")) >= 3,
      // Warning status (large text)
      wcagContrastHex(getColor("warn", "#f59e0b"), getColor("warnSurface", "#fef3c7")) >= 3,
      // Danger status (large text)
      wcagContrastHex(getColor("danger", "#ef4444"), getColor("dangerSurface", "#fee2e2")) >= 3,
      // Border visibility (non-text)
      wcagContrastHex(getColor("border", "#e5e7eb"), getColor("background", "#ffffff")) >= 3,
      // Secondary button text
      wcagContrastHex(getColor("secondaryText", "#ffffff"), getColor("secondary", "#6366f1")) >= 4.5,
      // Accent button text
      wcagContrastHex(getColor("accentText", "#ffffff"), getColor("accent", "#ec4899")) >= 4.5,
      // Text on surface-raised (cards)
      wcagContrastHex(getColor("text", "#1a1a1a"), getColor("surfaceRaised", "#ffffff")) >= 4.5,
      // Primary color on background (links, icons)
      wcagContrastHex(getColor("primary", "#3b82f6"), getColor("background", "#ffffff")) >= 3,
      // Muted text on surface
      wcagContrastHex(getColor("textMuted", "#6b7280"), getColor("surface", "#f5f5f5")) >= 4.5,
      // Border on surface (input borders)
      wcagContrastHex(getColor("border", "#e5e7eb"), getColor("surface", "#f5f5f5")) >= 3,
      // Success text on background
      wcagContrastHex(getColor("success", "#22c55e"), getColor("background", "#ffffff")) >= 3,
      // Danger text on background
      wcagContrastHex(getColor("danger", "#ef4444"), getColor("background", "#ffffff")) >= 3,
    ];
    const passed = checks.filter(Boolean).length;
    const total = checks.length;
    return { passed, total };
  }, [getColor]);

  const allPass = score.passed === score.total;

  return (
    <div
      className={`contrast-summary ${allPass ? "contrast-summary--pass" : "contrast-summary--warn"}`}
      style={{
        padding: "var(--st-space-4)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--st-space-2)"
      }}
    >
      <span className="contrast-summary-icon">{allPass ? "✓" : "⚠"}</span>
      <strong style={{
        fontSize: "var(--st-font-size-2)",
        fontWeight: "var(--st-font-weight-semibold)",
        lineHeight: "1.4"
      }}>
        {score.passed}/{score.total} checks passing WCAG AA
      </strong>
    </div>
  );
}

// Extended contrast validation for Seeds step
interface SeedsContrastValidationProps {
  getColor: (key: string, fallback: string) => string;
}

function SeedsContrastValidation({ getColor }: SeedsContrastValidationProps) {
  const checks = useMemo(() => {
    const results: Array<{
      label: string;
      fg: string;
      bg: string;
      ratio: number;
      passAA: boolean;
      passAAA: boolean;
      level: "large" | "normal";
    }> = [];

    // Text on background
    const textOnBg = wcagContrastHex(getColor("text", "#1a1a1a"), getColor("background", "#ffffff"));
    results.push({
      label: "Text on Background",
      fg: getColor("text", "#1a1a1a"),
      bg: getColor("background", "#ffffff"),
      ratio: textOnBg,
      passAA: textOnBg >= 4.5,
      passAAA: textOnBg >= 7,
      level: "normal",
    });

    // Muted text on background
    const mutedOnBg = wcagContrastHex(getColor("textMuted", "#6b7280"), getColor("background", "#ffffff"));
    results.push({
      label: "Muted Text on Background",
      fg: getColor("textMuted", "#6b7280"),
      bg: getColor("background", "#ffffff"),
      ratio: mutedOnBg,
      passAA: mutedOnBg >= 4.5,
      passAAA: mutedOnBg >= 7,
      level: "normal",
    });

    // Text on surface
    const textOnSurface = wcagContrastHex(getColor("text", "#1a1a1a"), getColor("surface", "#f5f5f5"));
    results.push({
      label: "Text on Surface",
      fg: getColor("text", "#1a1a1a"),
      bg: getColor("surface", "#f5f5f5"),
      ratio: textOnSurface,
      passAA: textOnSurface >= 4.5,
      passAAA: textOnSurface >= 7,
      level: "normal",
    });

    // Primary button text
    const primaryText = wcagContrastHex(getColor("primaryText", "#ffffff"), getColor("primary", "#3b82f6"));
    results.push({
      label: "Text on Primary Button",
      fg: getColor("primaryText", "#ffffff"),
      bg: getColor("primary", "#3b82f6"),
      ratio: primaryText,
      passAA: primaryText >= 4.5,
      passAAA: primaryText >= 7,
      level: "normal",
    });

    // Success status
    const successText = wcagContrastHex(getColor("success", "#22c55e"), getColor("successSurface", "#dcfce7"));
    results.push({
      label: "Success Text on Surface",
      fg: getColor("success", "#22c55e"),
      bg: getColor("successSurface", "#dcfce7"),
      ratio: successText,
      passAA: successText >= 3, // Large text requirement
      passAAA: successText >= 4.5,
      level: "large",
    });

    // Warning status
    const warnText = wcagContrastHex(getColor("warn", "#f59e0b"), getColor("warnSurface", "#fef3c7"));
    results.push({
      label: "Warning Text on Surface",
      fg: getColor("warn", "#f59e0b"),
      bg: getColor("warnSurface", "#fef3c7"),
      ratio: warnText,
      passAA: warnText >= 3,
      passAAA: warnText >= 4.5,
      level: "large",
    });

    // Danger status
    const dangerText = wcagContrastHex(getColor("danger", "#ef4444"), getColor("dangerSurface", "#fee2e2"));
    results.push({
      label: "Danger Text on Surface",
      fg: getColor("danger", "#ef4444"),
      bg: getColor("dangerSurface", "#fee2e2"),
      ratio: dangerText,
      passAA: dangerText >= 3,
      passAAA: dangerText >= 4.5,
      level: "large",
    });

    // Border visibility
    const borderOnBg = wcagContrastHex(getColor("border", "#e5e7eb"), getColor("background", "#ffffff"));
    results.push({
      label: "Border on Background",
      fg: getColor("border", "#e5e7eb"),
      bg: getColor("background", "#ffffff"),
      ratio: borderOnBg,
      passAA: borderOnBg >= 3, // Non-text contrast
      passAAA: borderOnBg >= 4.5,
      level: "large",
    });

    // Secondary button text
    const secondaryText = wcagContrastHex(getColor("secondaryText", "#ffffff"), getColor("secondary", "#6366f1"));
    results.push({
      label: "Text on Secondary",
      fg: getColor("secondaryText", "#ffffff"),
      bg: getColor("secondary", "#6366f1"),
      ratio: secondaryText,
      passAA: secondaryText >= 4.5,
      passAAA: secondaryText >= 7,
      level: "normal",
    });

    // Accent button text
    const accentText = wcagContrastHex(getColor("accentText", "#ffffff"), getColor("accent", "#ec4899"));
    results.push({
      label: "Text on Accent",
      fg: getColor("accentText", "#ffffff"),
      bg: getColor("accent", "#ec4899"),
      ratio: accentText,
      passAA: accentText >= 4.5,
      passAAA: accentText >= 7,
      level: "normal",
    });

    // Text on surface-raised (cards)
    const textOnRaised = wcagContrastHex(getColor("text", "#1a1a1a"), getColor("surfaceRaised", "#ffffff"));
    results.push({
      label: "Text on Card",
      fg: getColor("text", "#1a1a1a"),
      bg: getColor("surfaceRaised", "#ffffff"),
      ratio: textOnRaised,
      passAA: textOnRaised >= 4.5,
      passAAA: textOnRaised >= 7,
      level: "normal",
    });

    // Primary color on background (links, icons)
    const primaryOnBg = wcagContrastHex(getColor("primary", "#3b82f6"), getColor("background", "#ffffff"));
    results.push({
      label: "Primary on Background",
      fg: getColor("primary", "#3b82f6"),
      bg: getColor("background", "#ffffff"),
      ratio: primaryOnBg,
      passAA: primaryOnBg >= 3, // Non-text/UI components
      passAAA: primaryOnBg >= 4.5,
      level: "large",
    });

    // Muted text on surface
    const mutedOnSurface = wcagContrastHex(getColor("textMuted", "#6b7280"), getColor("surface", "#f5f5f5"));
    results.push({
      label: "Muted on Surface",
      fg: getColor("textMuted", "#6b7280"),
      bg: getColor("surface", "#f5f5f5"),
      ratio: mutedOnSurface,
      passAA: mutedOnSurface >= 4.5,
      passAAA: mutedOnSurface >= 7,
      level: "normal",
    });

    // Border on surface (input borders)
    const borderOnSurface = wcagContrastHex(getColor("border", "#e5e7eb"), getColor("surface", "#f5f5f5"));
    results.push({
      label: "Border on Surface",
      fg: getColor("border", "#e5e7eb"),
      bg: getColor("surface", "#f5f5f5"),
      ratio: borderOnSurface,
      passAA: borderOnSurface >= 3,
      passAAA: borderOnSurface >= 4.5,
      level: "large",
    });

    // Success text on background (for inline success messages)
    const successOnBg = wcagContrastHex(getColor("success", "#22c55e"), getColor("background", "#ffffff"));
    results.push({
      label: "Success on Background",
      fg: getColor("success", "#22c55e"),
      bg: getColor("background", "#ffffff"),
      ratio: successOnBg,
      passAA: successOnBg >= 3,
      passAAA: successOnBg >= 4.5,
      level: "large",
    });

    // Danger text on background (for inline error messages)
    const dangerOnBg = wcagContrastHex(getColor("danger", "#ef4444"), getColor("background", "#ffffff"));
    results.push({
      label: "Danger on Background",
      fg: getColor("danger", "#ef4444"),
      bg: getColor("background", "#ffffff"),
      ratio: dangerOnBg,
      passAA: dangerOnBg >= 3,
      passAAA: dangerOnBg >= 4.5,
      level: "large",
    });

    return results;
  }, [getColor]);

  const passCount = checks.filter(c => c.passAA).length;
  const totalCount = checks.length;
  const allPass = passCount === totalCount;

  return (
    <Column gap={3}>
      {/* Summary */}
      <div
        className={`contrast-summary ${allPass ? "contrast-summary--pass" : "contrast-summary--warn"}`}
      >
        <Row gap={2} align="center">
          <span className="contrast-summary-icon">{allPass ? "✓" : "⚠"}</span>
          <Text size={1} weight="medium">
            {passCount}/{totalCount} checks passing WCAG AA
          </Text>
        </Row>
      </div>

      {/* Detailed checks */}
      <div className="contrast-checks-grid">
        {checks.map((check) => (
          <div key={check.label} className="contrast-check-item">
            <Row gap={2} align="center" justify="between">
              <Row gap={2} align="center">
                <div
                  className="contrast-sample"
                  style={{ backgroundColor: check.bg }}
                >
                  <span style={{ color: check.fg }}>Aa</span>
                </div>
                <Column gap={0}>
                  <Text size={0} weight="medium">{check.label}</Text>
                  <Text size={0} mono tone="muted">{check.ratio.toFixed(2)}:1</Text>
                </Column>
              </Row>
              <Row gap={1}>
                <span className={`contrast-level-badge ${check.passAA ? "contrast-level-badge--pass" : "contrast-level-badge--fail"}`}>
                  AA{check.level === "large" ? " (lg)" : ""}
                </span>
                <span className={`contrast-level-badge ${check.passAAA ? "contrast-level-badge--pass" : "contrast-level-badge--fail"}`}>
                  AAA
                </span>
              </Row>
            </Row>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="contrast-legend">
        <Text size={0} tone="muted">
          AA: 4.5:1 for normal text, 3:1 for large text • AAA: 7:1 for normal text, 4.5:1 for large text
        </Text>
      </div>
    </Column>
  );
}

interface GenerateStepProps {
  generation: GenerationParams;
  onUpdate: (key: keyof GenerationParams, value: number | boolean | string) => void;
  onGenerate: () => void;
  palettes: Palette[];
  overrides: Override[];
  onAddOverride: (override: Omit<Override, "id">) => void;
  onRemoveOverride: (id: string) => void;
  previewMode: "light" | "dark";
  onSetPreviewMode: (mode: "light" | "dark") => void;
}

function GenerateStep({
  generation,
  onUpdate,
  onGenerate,
  palettes,
  overrides,
  onAddOverride,
  onRemoveOverride,
  previewMode,
  onSetPreviewMode,
}: GenerateStepProps) {
  const [selectedPalette, setSelectedPalette] = useState(palettes[0]?.name || "");
  const [selectedStep, setSelectedStep] = useState(9);
  const [overrideValue, setOverrideValue] = useState("#2563eb");
  const [overrideMode, setOverrideMode] = useState<"light" | "dark">("light");

  // Handle clicking on a palette swatch to override it
  const handleSwatchClick = useCallback((paletteName: string, step: number, color: string) => {
    setSelectedPalette(paletteName);
    setSelectedStep(step);
    setOverrideValue(color);
  }, []);

  const handleAddOverride = useCallback(() => {
    onAddOverride({
      target: { type: "palette", palette: selectedPalette, step: selectedStep, mode: overrideMode },
      value: overrideValue,
      enabled: true,
    });
  }, [selectedPalette, selectedStep, overrideValue, overrideMode, onAddOverride]);

  // Get palette overrides
  const paletteOverrides = overrides.filter(o => o.target.type === "palette");

  return (
    <Column gap={6}>
      <Card pad={4} radius={2}>
        <Column gap={4}>
          <Row gap={2} align="center" justify="between" wrap="wrap">
            <Column gap={2}>
              <Text as="h2" size={3} weight="semibold">
                Generate Standard Set
              </Text>
              <Text tone="muted">
                Configure generation parameters and create your complete token system.
              </Text>
            </Column>
            <Row gap={1}>
              <button
                onClick={() => onSetPreviewMode("light")}
                className={`studio-btn studio-btn--sm ${previewMode === "light" ? "studio-btn--primary" : ""}`}
              >
                Light
              </button>
              <button
                onClick={() => onSetPreviewMode("dark")}
                className={`studio-btn studio-btn--sm ${previewMode === "dark" ? "studio-btn--primary" : ""}`}
              >
                Dark
              </button>
            </Row>
          </Row>

          <div className="builder-controls-grid">
            <Column gap={2}>
              <Text size={0} weight="medium">Algorithm</Text>
              <select
                value={generation.algorithm}
                onChange={(e) => onUpdate("algorithm", e.target.value)}
                className="studio-select"
              >
                <option value="oklch">OKLCH (Recommended)</option>
                <option value="hct">HCT (Tonal)</option>
              </select>
            </Column>

            <Column gap={2}>
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
            </Column>

            <Column gap={2}>
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
            </Column>

            <Column gap={2}>
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
            </Column>

            <Column gap={2}>
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
            </Column>

            <Column gap={2}>
              <Text size={0} weight="medium">Style</Text>
              <Row gap={2}>
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
              </Row>
            </Column>
          </div>

          <button
            onClick={onGenerate}
            className="studio-btn studio-btn--primary studio-btn--lg"
          >
            Generate Standard Set
          </button>
        </Column>
      </Card>

      {/* Generated Palettes Preview - Clickable for overrides */}
      {palettes.length > 0 && (
        <Card pad={4} radius={2}>
          <Column gap={4}>
            <Column gap={1}>
              <Text weight="semibold">Generated Palettes ({previewMode})</Text>
              <Text size={0} tone="muted">Click any color swatch to select it for override.</Text>
            </Column>
            <Column gap={3}>
              {palettes.map((palette) => {
                const steps = previewMode === "light" ? palette.lightSteps : palette.darkSteps;
                return (
                  <Column key={palette.name} gap={2}>
                    <Text size={1} weight="medium" className="palette-name">
                      {palette.name}
                    </Text>
                    <div className="palette-clickable-ramp">
                      {steps.map((color, index) => {
                        const isSelected = selectedPalette === palette.name && selectedStep === index;
                        const hasOverride = paletteOverrides.some(
                          o => o.target.type === "palette" &&
                               o.target.palette === palette.name &&
                               o.target.step === index &&
                               o.target.mode === previewMode
                        );
                        return (
                          <button
                            key={index}
                            type="button"
                            className={`palette-swatch-btn ${isSelected ? "palette-swatch-btn--selected" : ""} ${hasOverride ? "palette-swatch-btn--override" : ""}`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleSwatchClick(palette.name, index, color)}
                            title={`${palette.name}[${index}]: ${color}${hasOverride ? " (has override)" : ""}`}
                          />
                        );
                      })}
                    </div>
                  </Column>
                );
              })}
            </Column>
          </Column>
        </Card>
      )}

      {/* Palette Override Form */}
      {palettes.length > 0 && (
        <Card pad={4} radius={2}>
          <Column gap={4}>
            <Column gap={1}>
              <Text weight="semibold">Fine-Tune Palette Colors</Text>
              <Text size={0} tone="muted">Override specific palette steps to achieve exact colors without regenerating.</Text>
            </Column>

            <div className="builder-override-fields">
              <Column gap={2}>
                <Text size={0} weight="medium">Selected Color</Text>
                <Row gap={2} align="center">
                  <div
                    className="builder-semantic-swatch"
                    style={{ backgroundColor: overrideValue }}
                  />
                  <Text size={0} mono>{selectedPalette}[{selectedStep}]</Text>
                </Row>
              </Column>

              <Column gap={2}>
                <Text size={0} weight="medium">Override Mode</Text>
                <Row gap={2}>
                  <button
                    onClick={() => setOverrideMode("light")}
                    className={`studio-btn studio-btn--sm ${overrideMode === "light" ? "studio-btn--primary" : ""}`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setOverrideMode("dark")}
                    className={`studio-btn studio-btn--sm ${overrideMode === "dark" ? "studio-btn--primary" : ""}`}
                  >
                    Dark
                  </button>
                </Row>
              </Column>

              <Column gap={2}>
                <Text size={0} weight="medium">New Color Value</Text>
                <ColorPicker
                  value={overrideValue}
                  onChange={setOverrideValue}
                  showHarmony
                />
              </Column>
            </div>

            <button
              onClick={handleAddOverride}
              className="studio-btn studio-btn--primary"
            >
              Add Override
            </button>

            {/* Current Overrides List */}
            {paletteOverrides.length > 0 && (
              <Column gap={2}>
                <Text size={0} weight="medium">Active Overrides ({paletteOverrides.length})</Text>
                <div className="override-list">
                  {paletteOverrides.map((override) => {
                    const colorValue = typeof override.value === "string" ? override.value : "#888";
                    return (
                      <Row key={override.id} gap={2} align="center" className="override-item">
                        <div
                          className="builder-semantic-swatch"
                          style={{ backgroundColor: colorValue }}
                        />
                        <Text size={0} mono>
                          {override.target.type === "palette" && `${override.target.palette}[${override.target.step}] (${override.target.mode})`}
                        </Text>
                        <Text size={0}>{colorValue}</Text>
                        <button
                          onClick={() => onRemoveOverride(override.id)}
                          className="studio-btn studio-btn--sm studio-btn--danger"
                          title="Remove override"
                        >
                          ×
                        </button>
                      </Row>
                    );
                  })}
                </div>
              </Column>
            )}
          </Column>
        </Card>
      )}
    </Column>
  );
}

interface ScalesStepProps {
  scales: ScaleTokens;
  onUpdate: (scaleType: keyof ScaleTokens, key: string, value: string) => void;
  onUpdateSpaceBreakpoint: (spaceKey: string, breakpointKey: string, value: string | null) => void;
  onReset: (scaleType: keyof ScaleTokens) => void;
  onAddItem: (scaleType: keyof ScaleTokens) => void;
  onRemoveItem: (scaleType: keyof ScaleTokens, key: string) => void;
  breakpoints: Record<string, string>;
  onUpdateBreakpoint: (key: string, value: string) => void;
  onRenameBreakpoint: (oldKey: string, newKey: string) => void;
  onAddBreakpoint: () => void;
  onRemoveBreakpoint: (key: string) => void;
}

function ScalesStep({
  scales,
  onUpdate,
  onUpdateSpaceBreakpoint,
  onReset,
  onAddItem,
  onRemoveItem,
  breakpoints,
  onUpdateBreakpoint,
  onRenameBreakpoint,
  onAddBreakpoint,
  onRemoveBreakpoint,
}: ScalesStepProps) {
  const [activeTab, setActiveTab] = useState<
    "breakpoints" | "space" | "radius" | "shadow" | "typography" | "motion" |
    "transforms" | "borders" | "layout" | "sizing" | "text"
  >("breakpoints");
  const [playingEasing, setPlayingEasing] = useState<string | null>(null);

  // Expansion state for scale categories (space, radius, shadow currently expandable)
  const [expandedSpaceKeys, setExpandedSpaceKeys] = useState<Set<string>>(() => new Set(Object.keys(scales.space)));
  const [expandedRadiusKeys, setExpandedRadiusKeys] = useState<Set<string>>(() => new Set());
  const [expandedShadowKeys, setExpandedShadowKeys] = useState<Set<string>>(() => new Set());

  // Trigger easing animation preview
  const playEasingPreview = useCallback((key: string) => {
    setPlayingEasing(null);
    // Force re-render to restart animation
    setTimeout(() => setPlayingEasing(key), 10);
    // Reset after animation completes
    setTimeout(() => setPlayingEasing(null), 1500);
  }, []);

  const breakpointKeys = Object.keys(breakpoints);

  // Generic toggle function
  const createToggleExpanded = useCallback((setState: React.Dispatch<React.SetStateAction<Set<string>>>) => (key: string) => {
    setState(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  // Toggle functions for scale types
  const toggleSpaceExpanded = createToggleExpanded(setExpandedSpaceKeys);
  const toggleRadiusExpanded = createToggleExpanded(setExpandedRadiusKeys);
  const toggleShadowExpanded = createToggleExpanded(setExpandedShadowKeys);

  // Expand/collapse all functions
  const expandAll = useCallback((scaleType: "space" | "radius" | "shadow") => {
    const setState = {
      space: setExpandedSpaceKeys,
      radius: setExpandedRadiusKeys,
      shadow: setExpandedShadowKeys,
    }[scaleType];
    const keys = Object.keys(scales[scaleType]);
    setState(new Set(keys));
  }, [scales]);

  const collapseAll = useCallback((scaleType: "space" | "radius" | "shadow") => {
    const setState = {
      space: setExpandedSpaceKeys,
      radius: setExpandedRadiusKeys,
      shadow: setExpandedShadowKeys,
    }[scaleType];
    setState(new Set());
  }, []);

  return (
    <Column gap={6}>
      <Card pad={4} radius={2}>
        <Column gap={4}>
          <Column gap={2}>
            <Text as="h2" size={3} weight="semibold">
              Scale Tokens
            </Text>
            <Text tone="muted">
              Configure spacing, sizing, and motion tokens. These define the rhythm and feel of your UI.
            </Text>
          </Column>

          {/* Tab Navigation */}
          <Column gap={3}>
            <Row gap={2} wrap="wrap">
              <button
                onClick={() => setActiveTab("breakpoints")}
                className={`studio-btn studio-btn--sm ${activeTab === "breakpoints" ? "studio-btn--primary" : ""}`}
              >
                Breakpoints
              </button>
              <button
                onClick={() => setActiveTab("space")}
                className={`studio-btn studio-btn--sm ${activeTab === "space" ? "studio-btn--primary" : ""}`}
              >
                Space
              </button>
              <button
                onClick={() => setActiveTab("radius")}
                className={`studio-btn studio-btn--sm ${activeTab === "radius" ? "studio-btn--primary" : ""}`}
              >
                Radius
              </button>
              <button
                onClick={() => setActiveTab("shadow")}
                className={`studio-btn studio-btn--sm ${activeTab === "shadow" ? "studio-btn--primary" : ""}`}
              >
                Shadow
              </button>
              <button
                onClick={() => setActiveTab("typography")}
                className={`studio-btn studio-btn--sm ${activeTab === "typography" ? "studio-btn--primary" : ""}`}
              >
                Typography
              </button>
              <button
                onClick={() => setActiveTab("motion")}
                className={`studio-btn studio-btn--sm ${activeTab === "motion" ? "studio-btn--primary" : ""}`}
              >
                Motion
              </button>
            </Row>
            <Row gap={2} wrap="wrap">
              <button
                onClick={() => setActiveTab("transforms")}
                className={`studio-btn studio-btn--sm ${activeTab === "transforms" ? "studio-btn--primary" : ""}`}
                title="Blur, brightness, contrast, saturate, scale, translate, rotate, backdrop"
              >
                ✨ Transforms & Effects
              </button>
              <button
                onClick={() => setActiveTab("borders")}
                className={`studio-btn studio-btn--sm ${activeTab === "borders" ? "studio-btn--primary" : ""}`}
                title="Border width, outline, letter spacing, line clamp"
              >
                ◻️ Borders & Text
              </button>
              <button
                onClick={() => setActiveTab("layout")}
                className={`studio-btn studio-btn--sm ${activeTab === "layout" ? "studio-btn--primary" : ""}`}
                title="Display, position, overflow, flex, order"
              >
                📐 Layout Utils
              </button>
              <button
                onClick={() => setActiveTab("sizing")}
                className={`studio-btn studio-btn--sm ${activeTab === "sizing" ? "studio-btn--primary" : ""}`}
                title="Max width, aspect ratio, z-index, opacity"
              >
                📏 Sizing & Depth
              </button>
              <button
                onClick={() => setActiveTab("text")}
                className={`studio-btn studio-btn--sm ${activeTab === "text" ? "studio-btn--primary" : ""}`}
                title="Text transform, white space, object fit, cursor"
              >
                ✏️ Text Utils
              </button>
            </Row>
          </Column>
        </Column>
      </Card>

      {/* Breakpoints Tab */}
      {activeTab === "breakpoints" && (
        <Card pad={4} radius={2}>
          <Column gap={4}>
            <Row gap={2} align="center" justify="between">
              <Column gap={1}>
                <Text weight="semibold">Breakpoints ({Object.keys(breakpoints).length})</Text>
                <Text size={0} tone="muted">Define breakpoints used for responsive spacing. Edit the prefix name or width.</Text>
              </Column>
              <button onClick={onAddBreakpoint} className="studio-btn studio-btn--sm">
                + Add
              </button>
            </Row>
            <div className="scales-grid">
              {Object.entries(breakpoints).map(([key, value]) => (
                <div key={key} className="scale-item breakpoint-item">
                  <Column gap={2}>
                    <Row gap={2} align="center" justify="between">
                      <Text size={0} tone="muted">Prefix</Text>
                      <button
                        onClick={() => onRemoveBreakpoint(key)}
                        className="studio-btn studio-btn--sm studio-btn--danger"
                        title="Remove"
                      >
                        ×
                      </button>
                    </Row>
                    <input
                      type="text"
                      value={key}
                      onChange={(e) => onRenameBreakpoint(key, e.target.value)}
                      className="studio-text-input studio-text-input--sm"
                      style={{ width: "100%" }}
                      placeholder="e.g. sm, md, lg"
                    />
                    <Text size={0} tone="muted">Width</Text>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => onUpdateBreakpoint(key, e.target.value)}
                      className="studio-text-input studio-text-input--sm"
                      style={{ width: "100%" }}
                      placeholder="e.g. 768px"
                    />
                  </Column>
                </div>
              ))}
            </div>
          </Column>
        </Card>
      )}

      {/* Space Scale */}
      {activeTab === "space" && (
        <Card pad={4} radius={2}>
          <Column gap={4}>
            <Row gap={2} align="center" justify="between">
              <Column gap={1}>
                <Text weight="semibold">Space Scale ({Object.keys(scales.space).length} items)</Text>
                <Text size={0} tone="muted">Click a token to set responsive values per breakpoint.</Text>
              </Column>
                <Row gap={2}>
                  <button onClick={() => expandAll("space")} className="studio-btn studio-btn--sm" title="Expand all">
                    Expand All
                  </button>
                  <button onClick={() => collapseAll("space")} className="studio-btn studio-btn--sm" title="Collapse all">
                    Collapse All
                  </button>
                  <button onClick={() => onAddItem("space")} className="studio-btn studio-btn--sm">
                    + Add
                  </button>
                  <button onClick={() => onReset("space")} className="studio-btn studio-btn--sm">
                    Reset
                  </button>
                </Row>
              </Row>
              <div className="scales-grid">
                {Object.entries(scales.space).map(([key, responsiveValue]) => {
                  const isExpanded = expandedSpaceKeys.has(key);
                  const hasBreakpoints = responsiveValue.breakpoints && Object.keys(responsiveValue.breakpoints).length > 0;

                  return (
                    <div key={key} className={`scale-item scale-item--expandable ${isExpanded ? "scale-item--expanded" : ""}`}>
                      <div
                        className="scale-item-header"
                        onClick={() => toggleSpaceExpanded(key)}
                        style={{ cursor: "pointer" }}
                      >
                        <Row gap={2} align="center" justify="between">
                          <Column gap={1}>
                            <Row gap={2} align="center">
                              <span className="scale-expand-icon">{isExpanded ? "▼" : "▶"}</span>
                              <Text size={0} weight="medium" mono>--st-space-{key}</Text>
                              {hasBreakpoints && <span className="scale-responsive-badge">Responsive</span>}
                            </Row>
                            <div
                              className="scale-preview-bar"
                              style={{ width: responsiveValue.base, height: "8px", backgroundColor: "var(--st-color-primary)" }}
                            />
                          </Column>
                          <Row gap={1} align="center">
                            <input
                              type="text"
                              value={responsiveValue.base}
                              onChange={(e) => {
                                e.stopPropagation();
                                onUpdate("space", key, e.target.value);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="studio-text-input studio-text-input--sm"
                              style={{ width: "80px" }}
                              placeholder="Base"
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveItem("space", key);
                              }}
                              className="studio-btn studio-btn--sm studio-btn--danger"
                              title="Remove"
                            >
                              ×
                            </button>
                          </Row>
                        </Row>
                      </div>

                      {/* Expanded breakpoint values */}
                      {isExpanded && (
                        <div className="scale-breakpoints">
                          <div style={{ marginBottom: "var(--st-space-2)" }}>
                            <Text size={0} tone="muted">
                              Breakpoint overrides (leave empty to use base value):
                            </Text>
                          </div>
                          <div className="scale-breakpoints-grid">
                            {breakpointKeys.map((bp) => (
                              <div key={bp} className="scale-breakpoint-item">
                                <Text size={0} mono>{bp} ({breakpoints[bp]})</Text>
                                <input
                                  type="text"
                                  value={responsiveValue.breakpoints?.[bp] || ""}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    onUpdateSpaceBreakpoint(key, bp, val || null);
                                  }}
                                  className="studio-text-input studio-text-input--sm"
                                  placeholder={responsiveValue.base}
                                  style={{ width: "100%" }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Column>
          </Card>
      )}

      {/* Radius Scale */}
      {activeTab === "radius" && (
        <Card pad={4} radius={2}>
          <Column gap={4}>
            <Row gap={2} align="center" justify="between">
              <Column gap={1}>
                <Text weight="semibold">Radius Scale ({Object.keys(scales.radius).length} items)</Text>
                <Text size={0} tone="muted">Border radius values for rounded corners.</Text>
              </Column>
              <Row gap={2}>
                <button onClick={() => expandAll("radius")} className="studio-btn studio-btn--sm" title="Expand all">
                  Expand All
                </button>
                <button onClick={() => collapseAll("radius")} className="studio-btn studio-btn--sm" title="Collapse all">
                  Collapse All
                </button>
                <button onClick={() => onAddItem("radius")} className="studio-btn studio-btn--sm">
                  + Add
                </button>
                <button onClick={() => onReset("radius")} className="studio-btn studio-btn--sm">
                  Reset
                </button>
              </Row>
            </Row>
            <div className="scales-grid">
              {Object.entries(scales.radius).map(([key, value]) => {
                const isExpanded = expandedRadiusKeys.has(key);
                return (
                  <div key={key} className={`scale-item scale-item--expandable ${isExpanded ? "scale-item--expanded" : ""}`}>
                    <div
                      className="scale-item-header"
                      onClick={() => toggleRadiusExpanded(key)}
                      style={{ cursor: "pointer" }}
                    >
                      <Row gap={2} align="center" justify="between">
                        <Column gap={1}>
                          <Row gap={2} align="center">
                            <span className="scale-expand-icon">{isExpanded ? "▼" : "▶"}</span>
                            <Text size={0} weight="medium" mono>--st-radius-{key}</Text>
                          </Row>
                          <div
                            className="scale-preview-box"
                            style={{ borderRadius: value }}
                          />
                        </Column>
                        <Row gap={1} align="center">
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => {
                              e.stopPropagation();
                              onUpdate("radius", key, e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="studio-text-input studio-text-input--sm"
                            style={{ width: "80px" }}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveItem("radius", key);
                            }}
                            className="studio-btn studio-btn--sm studio-btn--danger"
                            title="Remove"
                          >
                            ×
                          </button>
                        </Row>
                      </Row>
                    </div>
                  </div>
                );
              })}
            </div>
          </Column>
        </Card>
      )}

      {/* Shadow Scale */}
      {activeTab === "shadow" && (
        <Card pad={4} radius={2}>
          <Column gap={4}>
            <Row gap={2} align="center" justify="between">
              <Column gap={1}>
                <Text weight="semibold">Shadow Scale ({Object.keys(scales.shadow).length} items)</Text>
                <Text size={0} tone="muted">Box shadow values for elevation.</Text>
              </Column>
              <Row gap={2}>
                <button onClick={() => expandAll("shadow")} className="studio-btn studio-btn--sm" title="Expand all">
                  Expand All
                </button>
                <button onClick={() => collapseAll("shadow")} className="studio-btn studio-btn--sm" title="Collapse all">
                  Collapse All
                </button>
                <button onClick={() => onAddItem("shadow")} className="studio-btn studio-btn--sm">
                  + Add
                </button>
                <button onClick={() => onReset("shadow")} className="studio-btn studio-btn--sm">
                  Reset
                </button>
              </Row>
            </Row>
            <div className="scales-grid">
              {Object.entries(scales.shadow).map(([key, value]) => {
                const isExpanded = expandedShadowKeys.has(key);
                return (
                  <div key={key} className={`scale-item scale-item--expandable ${isExpanded ? "scale-item--expanded" : ""}`}>
                    <div
                      className="scale-item-header"
                      onClick={() => toggleShadowExpanded(key)}
                      style={{ cursor: "pointer" }}
                    >
                      <Row gap={2} align="center" justify="between">
                        <Column gap={1}>
                          <Row gap={2} align="center">
                            <span className="scale-expand-icon">{isExpanded ? "▼" : "▶"}</span>
                            <Text size={0} weight="medium" mono>--st-shadow-{key}</Text>
                          </Row>
                          <div
                            className="scale-preview-shadow"
                            style={{ boxShadow: value }}
                          />
                        </Column>
                        <Row gap={1} align="center">
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => {
                              e.stopPropagation();
                              onUpdate("shadow", key, e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="studio-text-input studio-text-input--sm"
                            style={{ width: "200px" }}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveItem("shadow", key);
                            }}
                            className="studio-btn studio-btn--sm studio-btn--danger"
                            title="Remove"
                          >
                            ×
                          </button>
                        </Row>
                      </Row>
                    </div>
                  </div>
                );
              })}
            </div>
          </Column>
        </Card>
      )}

      {/* Typography */}
      {activeTab === "typography" && (
        <Column gap={4}>
          <Card pad={4} radius={2}>
            <Column gap={4}>
              <Row gap={2} align="center" justify="between">
                <Column gap={1}>
                  <Text weight="semibold">Font Size Scale ({Object.keys(scales.fontSize).length} items)</Text>
                  <Text size={0} tone="muted">Typography size scale.</Text>
                </Column>
                <Row gap={2}>
                  <button onClick={() => onAddItem("fontSize")} className="studio-btn studio-btn--sm">
                    + Add
                  </button>
                  <button onClick={() => onReset("fontSize")} className="studio-btn studio-btn--sm">
                    Reset
                  </button>
                </Row>
              </Row>
              <div className="scales-grid">
                {Object.entries(scales.fontSize).map(([key, value]) => (
                  <div key={key} className="scale-item">
                    <Row gap={2} align="center" justify="between">
                      <Column gap={1}>
                        <Text size={0} weight="medium" mono>--st-font-size-{key}</Text>
                        <span style={{ fontSize: value }}>Sample Text</span>
                      </Column>
                      <Row gap={1} align="center">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => onUpdate("fontSize", key, e.target.value)}
                          className="studio-text-input studio-text-input--sm"
                          style={{ width: "100px" }}
                        />
                        <button
                          onClick={() => onRemoveItem("fontSize", key)}
                          className="studio-btn studio-btn--sm studio-btn--danger"
                          title="Remove"
                        >
                          ×
                        </button>
                      </Row>
                    </Row>
                  </div>
                ))}
              </div>
            </Column>
          </Card>

          <Card pad={4} radius={2}>
            <Column gap={4}>
              <Row gap={2} align="center" justify="between">
                <Column gap={1}>
                  <Text weight="semibold">Font Weight ({Object.keys(scales.fontWeight).length} items)</Text>
                  <Text size={0} tone="muted">Weight values for text emphasis.</Text>
                </Column>
                <Row gap={2}>
                  <button onClick={() => onAddItem("fontWeight")} className="studio-btn studio-btn--sm">
                    + Add
                  </button>
                  <button onClick={() => onReset("fontWeight")} className="studio-btn studio-btn--sm">
                    Reset
                  </button>
                </Row>
              </Row>
              <div className="scales-grid">
                {Object.entries(scales.fontWeight).map(([key, value]) => (
                  <div key={key} className="scale-item">
                    <Row gap={2} align="center" justify="between">
                      <Column gap={1}>
                        <Text size={0} weight="medium" mono>--st-font-weight-{key}</Text>
                        <span style={{ fontWeight: value }}>Sample Text</span>
                      </Column>
                      <Row gap={1} align="center">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => onUpdate("fontWeight", key, e.target.value)}
                          className="studio-text-input studio-text-input--sm"
                          style={{ width: "80px" }}
                        />
                        <button
                          onClick={() => onRemoveItem("fontWeight", key)}
                          className="studio-btn studio-btn--sm studio-btn--danger"
                          title="Remove"
                        >
                          ×
                        </button>
                      </Row>
                    </Row>
                  </div>
                ))}
              </div>
            </Column>
          </Card>

          <Card pad={4} radius={2}>
            <Column gap={4}>
              <Row gap={2} align="center" justify="between">
                <Column gap={1}>
                  <Text weight="semibold">Line Height ({Object.keys(scales.lineHeight).length} items)</Text>
                  <Text size={0} tone="muted">Line height values for text density.</Text>
                </Column>
                <Row gap={2}>
                  <button onClick={() => onAddItem("lineHeight")} className="studio-btn studio-btn--sm">
                    + Add
                  </button>
                  <button onClick={() => onReset("lineHeight")} className="studio-btn studio-btn--sm">
                    Reset
                  </button>
                </Row>
              </Row>
              <div className="scales-grid">
                {Object.entries(scales.lineHeight).map(([key, value]) => (
                  <div key={key} className="scale-item">
                    <Row gap={2} align="center" justify="between">
                      <Text size={0} weight="medium" mono>--st-leading-{key}</Text>
                      <Row gap={1} align="center">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => onUpdate("lineHeight", key, e.target.value)}
                          className="studio-text-input studio-text-input--sm"
                          style={{ width: "80px" }}
                        />
                        <button
                          onClick={() => onRemoveItem("lineHeight", key)}
                          className="studio-btn studio-btn--sm studio-btn--danger"
                          title="Remove"
                        >
                          ×
                        </button>
                      </Row>
                    </Row>
                  </div>
                ))}
              </div>
            </Column>
          </Card>
        </Column>
      )}

      {/* Motion */}
      {activeTab === "motion" && (
        <Column gap={4}>
          <Card pad={4} radius={2}>
            <Column gap={4}>
              <Row gap={2} align="center" justify="between">
                <Column gap={1}>
                  <Text weight="semibold">Duration ({Object.keys(scales.duration).length} items)</Text>
                  <Text size={0} tone="muted">Animation duration values.</Text>
                </Column>
                <Row gap={2}>
                  <button onClick={() => onAddItem("duration")} className="studio-btn studio-btn--sm">
                    + Add
                  </button>
                  <button onClick={() => onReset("duration")} className="studio-btn studio-btn--sm">
                    Reset
                  </button>
                </Row>
              </Row>
              <div className="scales-grid">
                {Object.entries(scales.duration).map(([key, value]) => (
                  <div key={key} className="scale-item">
                    <Row gap={2} align="center" justify="between">
                      <Column gap={1}>
                        <Text size={0} weight="medium" mono>--st-duration-{key}</Text>
                        <div
                          className="scale-preview-motion"
                          style={{ animationDuration: value }}
                        />
                      </Column>
                      <Row gap={1} align="center">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => onUpdate("duration", key, e.target.value)}
                          className="studio-text-input studio-text-input--sm"
                          style={{ width: "100px" }}
                        />
                        <button
                          onClick={() => onRemoveItem("duration", key)}
                          className="studio-btn studio-btn--sm studio-btn--danger"
                          title="Remove"
                        >
                          ×
                        </button>
                      </Row>
                    </Row>
                  </div>
                ))}
              </div>
            </Column>
          </Card>

          <Card pad={4} radius={2}>
            <Column gap={4}>
              <Row gap={2} align="center" justify="between">
                <Column gap={1}>
                  <Text weight="semibold">Easing ({Object.keys(scales.easing).length} items)</Text>
                  <Text size={0} tone="muted">Animation easing curves. Click preview to see the curve in action.</Text>
                </Column>
                <Row gap={2}>
                  <button onClick={() => onAddItem("easing")} className="studio-btn studio-btn--sm">
                    + Add
                  </button>
                  <button onClick={() => onReset("easing")} className="studio-btn studio-btn--sm">
                    Reset
                  </button>
                </Row>
              </Row>
              <div className="scales-grid">
                {Object.entries(scales.easing).map(([key, value]) => (
                  <div key={key} className="scale-item scale-item--easing">
                    <Column gap={2}>
                      <Row gap={2} align="center" justify="between">
                        <Text size={0} weight="medium" mono>--st-easing-{key}</Text>
                        <Row gap={1} align="center">
                          <button
                            onClick={() => playEasingPreview(key)}
                            className="studio-btn studio-btn--sm"
                            title="Preview animation"
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => onRemoveItem("easing", key)}
                            className="studio-btn studio-btn--sm studio-btn--danger"
                            title="Remove"
                          >
                            ×
                          </button>
                        </Row>
                      </Row>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => onUpdate("easing", key, e.target.value)}
                        className="studio-text-input studio-text-input--sm"
                        style={{ width: "100%" }}
                      />
                      {/* Easing Preview Track */}
                      <div className="easing-preview-track">
                        <div
                          className={`easing-preview-ball ${playingEasing === key ? "easing-preview-ball--playing" : ""}`}
                          style={{
                            transitionTimingFunction: value,
                          }}
                        />
                      </div>
                    </Column>
                  </div>
                ))}
              </div>
            </Column>
          </Card>
        </Column>
      )}

      {/* Transform & Effects */}
      {activeTab === "transforms" && (
        <TransformEffectsEditor
          scales={scales}
          onUpdate={onUpdate}
          onReset={onReset}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
      )}

      {/* Border & Outline */}
      {activeTab === "borders" && (
        <BorderOutlineEditor
          scales={scales}
          onUpdate={onUpdate}
          onReset={onReset}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
      )}

      {/* Layout Utilities */}
      {activeTab === "layout" && (
        <LayoutUtilitiesEditor
          scales={scales}
          onUpdate={onUpdate}
          onReset={onReset}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
      )}

      {/* Sizing & Depth */}
      {activeTab === "sizing" && (
        <SizingDepthEditor
          scales={scales}
          onUpdate={onUpdate}
          onReset={onReset}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
      )}

      {/* Text Utilities */}
      {activeTab === "text" && (
        <TextUtilitiesEditor
          scales={scales}
          onUpdate={onUpdate}
          onReset={onReset}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
      )}
    </Column>
  );
}

interface ExportStepProps {
  working: WorkingState;
  generatedCss: { tokens: string; themes: string; palettes: string; all: string };
  hasChanges: boolean;
  onSave: () => void;
  onImport: (config: Partial<WorkingState>) => void;
}

function ExportStep({ working, generatedCss, hasChanges, onSave, onImport }: ExportStepProps) {
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        setImportError(null);
        onImport(json);
      } catch {
        setImportError("Invalid JSON file. Please check the format.");
      }
    };
    reader.readAsText(file);
    // Reset input so same file can be selected again
    e.target.value = "";
  }, [onImport]);

  const llmPrompt = `I need help creating a color palette for my brand. Here are my current brand colors:

Primary: ${working.seeds.primary}
Secondary: ${working.seeds.secondary || "(not set)"}
Accent: ${working.seeds.accent || "(not set)"}

Please suggest:
1. Complementary/harmonious colors for secondary and accent if not set
2. Appropriate success, warning, and danger colors that work with my brand
3. Neutral gray tones for backgrounds, text, and borders

Please provide the colors in hex format (e.g., #3b82f6) and explain your color theory reasoning.

After getting suggestions, I can import them into Staple CSS Tokens Studio using this JSON format:
{
  "seeds": {
    "primary": "#hex",
    "secondary": "#hex",
    "accent": "#hex",
    "success": "#hex",
    "warn": "#hex",
    "danger": "#hex",
    "neutral": "#hex"
  }
}`;

  return (
    <Column gap={6}>
      <Card pad={4} radius={2}>
        <Column gap={4}>
          <Column gap={2}>
            <Text as="h2" size={3} weight="semibold">
              Import & Export
            </Text>
            <Text tone="muted">
              Import a configuration or export your token system.
            </Text>
          </Column>

          {/* Import */}
          <Column gap={3}>
            <Text weight="semibold">Import</Text>
            <Row gap={2} align="center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: "none" }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="studio-btn"
              >
                Import JSON Config
              </button>
              {importError && (
                <Text size={0} tone="danger">{importError}</Text>
              )}
            </Row>
          </Column>

          {/* Save to Config */}
          <Card pad={3} radius={1} className={hasChanges ? "builder-unsaved" : ""}>
            <Row gap={3} align="center" justify="between">
              <Column gap={1}>
                <Text weight="semibold">Save to Config</Text>
                <Text size={0} tone="muted">
                  {hasChanges ? "You have unsaved changes" : "Configuration is up to date"}
                </Text>
              </Column>
              <button
                onClick={onSave}
                disabled={!hasChanges}
                className="studio-btn studio-btn--primary"
              >
                Save Changes
              </button>
            </Row>
          </Card>

          {/* Export Options */}
          <Column gap={3}>
            <Text weight="semibold">Export</Text>
            <Row gap={2} wrap="wrap">
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
            </Row>
          </Column>
        </Column>
      </Card>

      {/* LLM Prompt Helper */}
      <Card pad={4} radius={2}>
        <Column gap={4}>
          <Column gap={1}>
            <Text weight="semibold">AI Color Assistant Prompt</Text>
            <Text size={0} tone="muted">
              Copy this prompt to ask an AI assistant for color palette suggestions based on your current brand colors.
            </Text>
          </Column>
          <div className="llm-prompt-box">
            <pre className="llm-prompt-text">{llmPrompt}</pre>
            <button
              onClick={() => navigator.clipboard.writeText(llmPrompt)}
              className="studio-btn studio-btn--sm llm-prompt-copy"
            >
              Copy Prompt
            </button>
          </div>
        </Column>
      </Card>

      {/* CSS Preview */}
      <Card pad={4} radius={2}>
        <Column gap={4}>
          <Text weight="semibold">Generated CSS Preview</Text>
          <CodePreview
            code={generatedCss.all}
            language="css"
            title="all.css"
            collapsible
            defaultCollapsed={false}
          />
        </Column>
      </Card>
    </Column>
  );
}

// ============================================================================
// Helper Components
// ============================================================================

interface LivePreviewProps {
  colors: Record<string, string>;
  mode: "light" | "dark";
  palettes: Palette[];
  size?: "mobile" | "tablet" | "desktop";
  onSizeChange?: (size: "mobile" | "tablet" | "desktop") => void;
  /** When true, shows full content directly without mini preview or internal modal */
  embedded?: boolean;
}

const PREVIEW_WIDTHS = {
  mobile: "375px",
  tablet: "768px",
  desktop: "100%",
};

function LivePreview({ colors, mode, palettes, size = "desktop", onSizeChange, embedded = false }: LivePreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewWidth = PREVIEW_WIDTHS[size];

  const bgColor = colors.background || "#ffffff";
  const surfaceColor = colors.surface || "#f9fafb";
  const surfaceRaisedColor = colors.surfaceRaised || surfaceColor;
  const textColor = colors.text || "#111827";
  const mutedColor = colors.textMuted || "#6b7280";
  const borderColor = colors.border || "#e5e7eb";
  const primaryColor = colors.primary || "#2563eb";
  const primaryTextColor = colors.primaryText || "#ffffff";
  const dangerColor = colors.danger || "#dc2626";
  const successColor = colors.success || "#16a34a";
  const warnColor = colors.warn || "#d97706";

  // Get secondary and accent colors from palettes
  const secondaryPalette = palettes.find(p => p.name === "secondary");
  const accentPalette = palettes.find(p => p.name === "accent");
  const secondaryColor = secondaryPalette
    ? (mode === "light" ? secondaryPalette.lightSteps[8] : secondaryPalette.darkSteps[8])
    : "#7c3aed";
  const accentColor = accentPalette
    ? (mode === "light" ? accentPalette.lightSteps[8] : accentPalette.darkSteps[8])
    : "#f59e0b";

  // Mini preview (compact)
  const miniPreview = (
    <Column gap={3}>
      {/* Expand Button at top */}
      <button
        onClick={() => setIsExpanded(true)}
        className="studio-btn studio-btn--sm"
        style={{ width: "100%" }}
      >
        Expand Full Preview
      </button>

      <div
        className="builder-live-preview"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          borderColor: borderColor,
        }}
      >
        <Column gap={4}>
          {/* Sample Card - Uses Responsive Padding */}
          <Box
            pad={{ base: 3, md: 4, lg: 5 }}
            radius={2}
            className="builder-preview-card"
            style={{ backgroundColor: surfaceColor, borderColor }}
          >
            <Column gap={2}>
              <span style={{ color: textColor, fontWeight: 600 }}>Responsive Card</span>
              <span style={{ color: mutedColor, fontSize: "var(--st-font-size-1)" }}>
                Padding adapts: Mobile (3) → Tablet (4) → Desktop (5). Resize to see it change!
              </span>
              <Grid cols={{ base: 1, sm: 3 }} gap={2}>
                <button
                  className="builder-preview-btn builder-preview-btn--primary"
                  style={{ backgroundColor: primaryColor, color: primaryTextColor, width: "100%" }}
                >
                  Primary
                </button>
                <button
                  className="builder-preview-btn builder-preview-btn--primary"
                  style={{ backgroundColor: secondaryColor, color: "#fff", width: "100%" }}
                >
                  Secondary
                </button>
                <button
                  className="builder-preview-btn builder-preview-btn--primary"
                  style={{ backgroundColor: accentColor, color: "#fff", width: "100%" }}
                >
                  Accent
                </button>
              </Grid>
            </Column>
          </Box>

          {/* Status Colors */}
          <Grid cols={{ base: 1, sm: 3 }} gap={2}>
            <span
              className="builder-preview-badge"
              style={{ backgroundColor: successColor, color: "#fff", width: "100%", display: "block", textAlign: "center" }}
            >
              Success
            </span>
            <span
              className="builder-preview-badge"
              style={{ backgroundColor: warnColor, color: "#fff", width: "100%", display: "block", textAlign: "center" }}
            >
              Warning
            </span>
            <span
              className="builder-preview-badge"
              style={{ backgroundColor: dangerColor, color: "#fff", width: "100%", display: "block", textAlign: "center" }}
            >
              Danger
            </span>
          </Grid>

          {/* Text Samples */}
          <Column gap={1}>
            <span style={{ color: textColor }}>Primary text color</span>
            <span style={{ color: mutedColor }}>Muted text color</span>
            <span style={{ color: primaryColor }}>Link color</span>
          </Column>
        </Column>
      </div>
    </Column>
  );

  // Full preview modal
  const fullPreview = isExpanded && (
    <div className="preview-modal-overlay" onClick={() => setIsExpanded(false)}>
      <div
        className="preview-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        {/* Modal Header */}
        <div
          className="preview-modal-header"
          style={{
            backgroundColor: surfaceColor,
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <Row gap={2} align="center" justify="between">
            <span style={{ fontWeight: 600 }}>Full Preview ({mode} mode)</span>
            <Row gap={2} align="center">
              {/* Size controls */}
              {onSizeChange && (
                <Row gap={1}>
                  <button
                    onClick={() => onSizeChange("mobile")}
                    className={`studio-btn studio-btn--sm ${size === "mobile" ? "studio-btn--primary" : ""}`}
                    title="Mobile (375px)"
                  >
                    📱
                  </button>
                  <button
                    onClick={() => onSizeChange("tablet")}
                    className={`studio-btn studio-btn--sm ${size === "tablet" ? "studio-btn--primary" : ""}`}
                    title="Tablet (768px)"
                  >
                    📱
                  </button>
                  <button
                    onClick={() => onSizeChange("desktop")}
                    className={`studio-btn studio-btn--sm ${size === "desktop" ? "studio-btn--primary" : ""}`}
                    title="Desktop (100%)"
                  >
                    🖥️
                  </button>
                </Row>
              )}
              <button
                onClick={() => setIsExpanded(false)}
                className="studio-btn studio-btn--sm"
              >
                Close
              </button>
            </Row>
          </Row>
        </div>

        {/* Preview Content */}
        <div className="preview-modal-body" style={{ display: "flex", justifyContent: "center" }}>
          <div className="preview-container" style={{ width: previewWidth, maxWidth: "100%", transition: "width 0.2s ease" }}>
            {/* Preview Header */}
            <div
              style={{
                backgroundColor: surfaceColor,
                borderBottom: `1px solid ${borderColor}`,
              padding: "var(--st-space-3) var(--st-space-4)",
            }}
          >
            <Row gap={6} align="center">
              <span style={{ fontWeight: 700, color: textColor }}>
                AppName
              </span>
              <Row gap={4}>
                <span style={{ color: primaryColor }}>Dashboard</span>
                <span style={{ color: mutedColor }}>Settings</span>
                <span style={{ color: mutedColor }}>Profile</span>
              </Row>
            </Row>
          </div>

          {/* Preview Body - Uses Responsive Padding */}
          <Box pad={{ base: 3, md: 4, lg: 5 }}>
            <Column gap={5}>
              {/* Stats Row */}
              <div className="preview-stats-grid">
                <StatCard label="Total Revenue" value="$45,231" change="+20.1%" changeType="success" colors={colors} />
                <StatCard label="Subscriptions" value="+2,350" change="+180.1%" changeType="success" colors={colors} />
                <StatCard label="Sales" value="+12,234" change="+19%" changeType="success" colors={colors} />
                <StatCard label="Active Now" value="+573" change="-4%" changeType="danger" colors={colors} />
              </div>

              {/* Content Area */}
              <div className="preview-content-grid">
                {/* Main Content - Uses Responsive Padding */}
                <Box
                  pad={{ base: 3, md: 4 }}
                  radius={2}
                  style={{
                    backgroundColor: surfaceRaisedColor,
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <Column gap={4}>
                    <Row gap={2} justify="between" align="center">
                      <span style={{ fontWeight: 600, color: textColor }}>Recent Activity</span>
                      <button
                        style={{
                          backgroundColor: primaryColor,
                          color: primaryTextColor,
                          border: "none",
                          borderRadius: "var(--st-radius-2)",
                          padding: "var(--st-space-1) var(--st-space-3)",
                          fontSize: "var(--st-font-size-0)",
                          cursor: "pointer",
                        }}
                      >
                        View All
                      </button>
                    </Row>

                    <Column gap={3}>
                      <ActivityItem title="New user registered" time="2 minutes ago" colors={colors} />
                      <ActivityItem title="Payment received" time="15 minutes ago" colors={colors} />
                      <ActivityItem title="Server alert resolved" time="1 hour ago" colors={colors} />
                      <ActivityItem title="Database backup completed" time="3 hours ago" colors={colors} />
                    </Column>
                  </Column>
                </Box>

                {/* Sidebar */}
                <Column gap={3}>
                  {/* Alert Card - Uses Responsive Padding */}
                  <Box
                    pad={{ base: 2, md: 3 }}
                    radius={2}
                    style={{
                      backgroundColor: colors.warnSurface || "rgba(217, 119, 6, 0.1)",
                      border: `1px solid ${warnColor}`,
                    }}
                  >
                    <Column gap={2}>
                      <span style={{ fontWeight: 600, color: warnColor }}>
                        Action Required
                      </span>
                      <span style={{ fontSize: "var(--st-font-size-0)", color: colors.warnText || warnColor }}>
                        Please verify your email address to continue.
                      </span>
                    </Column>
                  </Box>

                  {/* Quick Actions - Uses Responsive Padding */}
                  <Box
                    pad={{ base: 2, md: 3 }}
                    radius={2}
                    style={{
                      backgroundColor: surfaceRaisedColor,
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    <Column gap={3}>
                      <span style={{ fontWeight: 600, color: textColor }}>
                        Quick Actions
                      </span>
                      <Column gap={2}>
                        <ActionButton label="Create New" variant="primary" colors={colors} primaryColor={primaryColor} primaryTextColor={primaryTextColor} />
                        <ActionButton label="Import Data" variant="outline" colors={colors} primaryColor={primaryColor} primaryTextColor={primaryTextColor} />
                        <ActionButton label="Export Report" variant="ghost" colors={colors} primaryColor={primaryColor} primaryTextColor={primaryTextColor} />
                      </Column>
                    </Column>
                  </Box>

                  {/* Form Example - Uses Responsive Padding */}
                  <Box
                    pad={{ base: 2, md: 3 }}
                    radius={2}
                    style={{
                      backgroundColor: surfaceRaisedColor,
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    <Column gap={3}>
                      <span style={{ fontWeight: 600, color: textColor }}>
                        Sample Form
                      </span>
                      <Column gap={2}>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          style={{
                            backgroundColor: bgColor,
                            border: `1px solid ${borderColor}`,
                            borderRadius: "var(--st-radius-1)",
                            padding: "var(--st-space-2)",
                            color: textColor,
                            fontSize: "var(--st-font-size-0)",
                          }}
                        />
                        <input
                          type="email"
                          placeholder="Enter your email"
                          style={{
                            backgroundColor: bgColor,
                            border: `1px solid ${borderColor}`,
                            borderRadius: "var(--st-radius-1)",
                            padding: "var(--st-space-2)",
                            color: textColor,
                            fontSize: "var(--st-font-size-0)",
                          }}
                        />
                      </Column>
                    </Column>
                  </Box>
                </Column>
              </div>

              {/* Status Badges */}
              <Row gap={3} wrap="wrap">
                <span style={{ backgroundColor: colors.successSurface || "rgba(22, 163, 74, 0.1)", color: successColor, padding: "var(--st-space-1) var(--st-space-2)", borderRadius: "var(--st-radius-1)", fontSize: "var(--st-font-size-0)", fontWeight: 600 }}>
                  Success
                </span>
                <span style={{ backgroundColor: colors.warnSurface || "rgba(217, 119, 6, 0.1)", color: warnColor, padding: "var(--st-space-1) var(--st-space-2)", borderRadius: "var(--st-radius-1)", fontSize: "var(--st-font-size-0)", fontWeight: 600 }}>
                  Warning
                </span>
                <span style={{ backgroundColor: colors.dangerSurface || "rgba(220, 38, 38, 0.1)", color: dangerColor, padding: "var(--st-space-1) var(--st-space-2)", borderRadius: "var(--st-radius-1)", fontSize: "var(--st-font-size-0)", fontWeight: 600 }}>
                  Danger
                </span>
                <span style={{ backgroundColor: primaryColor, color: primaryTextColor, padding: "var(--st-space-1) var(--st-space-2)", borderRadius: "var(--st-radius-1)", fontSize: "var(--st-font-size-0)", fontWeight: 600 }}>
                  Primary
                </span>
                <span style={{ backgroundColor: secondaryColor, color: "#fff", padding: "var(--st-space-1) var(--st-space-2)", borderRadius: "var(--st-radius-1)", fontSize: "var(--st-font-size-0)", fontWeight: 600 }}>
                  Secondary
                </span>
                <span style={{ backgroundColor: accentColor, color: "#fff", padding: "var(--st-space-1) var(--st-space-2)", borderRadius: "var(--st-radius-1)", fontSize: "var(--st-font-size-0)", fontWeight: 600 }}>
                  Accent
                </span>
              </Row>

              {/* Typography Sample - Uses Responsive Padding */}
              <Box
                pad={{ base: 3, md: 4 }}
                radius={2}
                style={{
                  backgroundColor: surfaceRaisedColor,
                  border: `1px solid ${borderColor}`,
                }}
              >
                <Column gap={3}>
                  <span style={{ fontSize: "var(--st-font-size-5)", fontWeight: 700, color: textColor }}>Heading 1</span>
                  <span style={{ fontSize: "var(--st-font-size-4)", fontWeight: 600, color: textColor }}>Heading 2</span>
                  <span style={{ fontSize: "var(--st-font-size-3)", fontWeight: 600, color: textColor }}>Heading 3</span>
                  <span style={{ fontSize: "var(--st-font-size-2)", color: textColor }}>
                    Body text looks like this. It has good contrast against the background and is easy to read.
                  </span>
                  <span style={{ fontSize: "var(--st-font-size-1)", color: mutedColor }}>
                    Muted text is used for secondary information and has less prominence.
                  </span>
                  <span style={{ fontSize: "var(--st-font-size-0)", color: mutedColor }}>
                    Caption text for small labels and metadata.
                  </span>
                </Column>
              </Box>
            </Column>
          </Box>
          </div>
        </div>
      </div>
    </div>
  );

  // Embedded content (for use inside a modal - no wrapper)
  const embeddedContent = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="preview-container" style={{ width: previewWidth, maxWidth: "100%", transition: "width 0.2s ease" }}>
        {/* Preview Header */}
        <div
          style={{
            backgroundColor: surfaceColor,
            borderBottom: `1px solid ${borderColor}`,
            padding: "var(--st-space-3) var(--st-space-4)",
          }}
        >
          <Row gap={6} align="center">
            <span style={{ fontWeight: 700, color: textColor }}>
              AppName
            </span>
            <Row gap={4}>
              <span style={{ color: primaryColor }}>Dashboard</span>
              <span style={{ color: mutedColor }}>Settings</span>
              <span style={{ color: mutedColor }}>Profile</span>
            </Row>
          </Row>
        </div>

        {/* Preview Body */}
        <Box pad={{ base: 3, md: 4, lg: 5 }} style={{ backgroundColor: bgColor }}>
          <Column gap={5}>
            {/* Stats Row */}
            <div className="preview-stats-grid">
              <StatCard label="Total Revenue" value="$45,231" change="+20.1%" changeType="success" colors={colors} />
              <StatCard label="Subscriptions" value="+2,350" change="+180.1%" changeType="success" colors={colors} />
              <StatCard label="Sales" value="+12,234" change="+19%" changeType="success" colors={colors} />
              <StatCard label="Active Now" value="+573" change="-4%" changeType="danger" colors={colors} />
            </div>

            {/* Content Area */}
            <div className="preview-content-grid">
              {/* Main Content */}
              <Box
                pad={{ base: 3, md: 4 }}
                radius={2}
                style={{
                  backgroundColor: surfaceRaisedColor,
                  border: `1px solid ${borderColor}`,
                }}
              >
                <Column gap={4}>
                  <Row gap={2} justify="between" align="center">
                    <span style={{ fontWeight: 600, color: textColor }}>Recent Activity</span>
                    <button
                      style={{
                        backgroundColor: primaryColor,
                        color: primaryTextColor,
                        border: "none",
                        borderRadius: "var(--st-radius-2)",
                        padding: "var(--st-space-1) var(--st-space-3)",
                        fontSize: "var(--st-font-size-0)",
                        cursor: "pointer",
                      }}
                    >
                      View All
                    </button>
                  </Row>

                  <Column gap={3}>
                    <ActivityItem title="New user registered" time="2 minutes ago" colors={colors} />
                    <ActivityItem title="Payment received" time="15 minutes ago" colors={colors} />
                    <ActivityItem title="Server alert resolved" time="1 hour ago" colors={colors} />
                    <ActivityItem title="Database backup completed" time="3 hours ago" colors={colors} />
                  </Column>
                </Column>
              </Box>

              {/* Sidebar */}
              <Column gap={3}>
                {/* Alert Card */}
                <Box
                  pad={{ base: 2, md: 3 }}
                  radius={2}
                  style={{
                    backgroundColor: colors.warnSurface || "rgba(217, 119, 6, 0.1)",
                    border: `1px solid ${warnColor}`,
                  }}
                >
                  <Column gap={2}>
                    <span style={{ fontWeight: 600, color: warnColor }}>
                      Action Required
                    </span>
                    <span style={{ fontSize: "var(--st-font-size-0)", color: colors.warnText || warnColor }}>
                      Please verify your email address to continue.
                    </span>
                  </Column>
                </Box>

                {/* Quick Actions */}
                <Box
                  pad={{ base: 2, md: 3 }}
                  radius={2}
                  style={{
                    backgroundColor: surfaceRaisedColor,
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <Column gap={3}>
                    <span style={{ fontWeight: 600, color: textColor }}>
                      Quick Actions
                    </span>
                    <Column gap={2}>
                      <ActionButton label="Create New" variant="primary" colors={colors} primaryColor={primaryColor} primaryTextColor={primaryTextColor} />
                      <ActionButton label="Import Data" variant="outline" colors={colors} primaryColor={primaryColor} primaryTextColor={primaryTextColor} />
                      <ActionButton label="Export Report" variant="ghost" colors={colors} primaryColor={primaryColor} primaryTextColor={primaryTextColor} />
                    </Column>
                  </Column>
                </Box>
              </Column>
            </div>

            {/* Color Badges */}
            <Row gap={2} wrap="wrap">
              <span style={{ backgroundColor: colors.successSurface || "rgba(22, 163, 74, 0.1)", color: successColor, padding: "var(--st-space-1) var(--st-space-2)", borderRadius: "var(--st-radius-1)", fontSize: "var(--st-font-size-0)", fontWeight: 600 }}>
                Success
              </span>
              <span style={{ backgroundColor: colors.warnSurface || "rgba(217, 119, 6, 0.1)", color: warnColor, padding: "var(--st-space-1) var(--st-space-2)", borderRadius: "var(--st-radius-1)", fontSize: "var(--st-font-size-0)", fontWeight: 600 }}>
                Warning
              </span>
              <span style={{ backgroundColor: colors.dangerSurface || "rgba(220, 38, 38, 0.1)", color: dangerColor, padding: "var(--st-space-1) var(--st-space-2)", borderRadius: "var(--st-radius-1)", fontSize: "var(--st-font-size-0)", fontWeight: 600 }}>
                Danger
              </span>
              <span style={{ backgroundColor: primaryColor, color: primaryTextColor, padding: "var(--st-space-1) var(--st-space-2)", borderRadius: "var(--st-radius-1)", fontSize: "var(--st-font-size-0)", fontWeight: 600 }}>
                Primary
              </span>
              <span style={{ backgroundColor: secondaryColor, color: "#fff", padding: "var(--st-space-1) var(--st-space-2)", borderRadius: "var(--st-radius-1)", fontSize: "var(--st-font-size-0)", fontWeight: 600 }}>
                Secondary
              </span>
              <span style={{ backgroundColor: accentColor, color: "#fff", padding: "var(--st-space-1) var(--st-space-2)", borderRadius: "var(--st-radius-1)", fontSize: "var(--st-font-size-0)", fontWeight: 600 }}>
                Accent
              </span>
            </Row>

            {/* Typography Sample */}
            <Box
              pad={{ base: 3, md: 4 }}
              radius={2}
              style={{
                backgroundColor: surfaceRaisedColor,
                border: `1px solid ${borderColor}`,
              }}
            >
              <Column gap={3}>
                <span style={{ fontSize: "var(--st-font-size-5)", fontWeight: 700, color: textColor }}>Heading 1</span>
                <span style={{ fontSize: "var(--st-font-size-4)", fontWeight: 600, color: textColor }}>Heading 2</span>
                <span style={{ fontSize: "var(--st-font-size-3)", fontWeight: 600, color: textColor }}>Heading 3</span>
                <span style={{ fontSize: "var(--st-font-size-2)", color: textColor }}>
                  Body text looks like this. It has good contrast against the background and is easy to read.
                </span>
                <span style={{ fontSize: "var(--st-font-size-1)", color: mutedColor }}>
                  Muted text is used for secondary information and has less prominence.
                </span>
                <span style={{ fontSize: "var(--st-font-size-0)", color: mutedColor }}>
                  Caption text for small labels and metadata.
                </span>
              </Column>
            </Box>
          </Column>
        </Box>
      </div>
    </div>
  );

  // When embedded, just return the content directly
  if (embedded) {
    return embeddedContent;
  }

  return (
    <>
      {miniPreview}
      {fullPreview}
    </>
  );
}

// Helper components for the full preview
interface StatCardProps {
  label: string;
  value: string;
  change: string;
  changeType: "success" | "danger";
  colors: Record<string, string>;
}

function StatCard({ label, value, change, changeType, colors }: StatCardProps) {
  const changeColor = changeType === "success" ? (colors.success || "#16a34a") : (colors.danger || "#dc2626");

  return (
    <div
      style={{
        backgroundColor: colors.surfaceRaised || colors.surface || "#f9fafb",
        border: `1px solid ${colors.border || "#e5e7eb"}`,
        borderRadius: "var(--st-radius-2)",
        padding: "var(--st-space-3)",
      }}
    >
      <Column gap={1}>
        <span style={{ fontSize: "var(--st-font-size-0)", color: colors.textMuted || "#6b7280" }}>{label}</span>
        <span style={{ fontSize: "var(--st-font-size-4)", fontWeight: 700, color: colors.text || "#111827" }}>{value}</span>
        <span style={{ fontSize: "var(--st-font-size-0)", color: changeColor }}>{change}</span>
      </Column>
    </div>
  );
}

interface ActivityItemProps {
  title: string;
  time: string;
  colors: Record<string, string>;
}

function ActivityItem({ title, time, colors }: ActivityItemProps) {
  return (
    <div
      style={{
        backgroundColor: colors.surface || "#f9fafb",
        borderRadius: "var(--st-radius-1)",
        padding: "var(--st-space-2) var(--st-space-3)",
      }}
    >
      <Row gap={3} align="center" justify="between">
        <span style={{ fontSize: "var(--st-font-size-1)", color: colors.text || "#111827" }}>{title}</span>
        <span style={{ fontSize: "var(--st-font-size-0)", color: colors.textMuted || "#6b7280" }}>{time}</span>
      </Row>
    </div>
  );
}

interface ActionButtonProps {
  label: string;
  variant: "primary" | "outline" | "ghost";
  colors: Record<string, string>;
  primaryColor: string;
  primaryTextColor: string;
}

function ActionButton({ label, variant, colors, primaryColor, primaryTextColor }: ActionButtonProps) {
  const styles = {
    primary: {
      backgroundColor: primaryColor,
      color: primaryTextColor,
      border: `1px solid ${primaryColor}`,
    },
    outline: {
      backgroundColor: "transparent",
      color: colors.text || "#111827",
      border: `1px solid ${colors.border || "#e5e7eb"}`,
    },
    ghost: {
      backgroundColor: "transparent",
      color: colors.textMuted || "#6b7280",
      border: "1px solid transparent",
    },
  };

  return (
    <button
      style={{
        ...styles[variant],
        borderRadius: "var(--st-radius-2)",
        padding: "var(--st-space-2) var(--st-space-3)",
        fontSize: "var(--st-font-size-0)",
        cursor: "pointer",
        width: "100%",
        textAlign: "center",
      }}
    >
      {label}
    </button>
  );
}
