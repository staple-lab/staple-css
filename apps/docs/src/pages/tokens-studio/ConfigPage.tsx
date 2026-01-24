/**
 * Config Page
 *
 * View and edit the raw configuration JSON.
 * Useful for advanced users who want direct access to the config.
 */

import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Container, Stack, Text, Inline, Card } from "@staple-css/primitives";
import {
  createDefaultBuilderConfig,
  validateBuilderConfig,
  type BuilderConfig,
} from "@staple-css/tokens";
import { CodePreview } from "../../components/CodePreview";

export function ConfigPage() {
  // Initialize with default config
  const [configJson, setConfigJson] = useState(() => {
    const config = createDefaultBuilderConfig();
    return JSON.stringify(config, null, 2);
  });

  const [editedJson, setEditedJson] = useState(configJson);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate the current JSON
  const validation = useMemo(() => {
    try {
      const parsed = JSON.parse(editedJson);
      const result = validateBuilderConfig(parsed);
      if (result.success) {
        return { valid: true, data: result.data };
      } else {
        return {
          valid: false,
          error: result.errors?.issues.map(i => i.message).join(", "),
        };
      }
    } catch {
      return { valid: false, error: "Invalid JSON syntax" };
    }
  }, [editedJson]);

  // Apply changes
  const applyChanges = useCallback(() => {
    if (validation.valid) {
      setConfigJson(editedJson);
      setIsEditing(false);
      setError(null);
    } else {
      setError(validation.error || "Validation failed");
    }
  }, [editedJson, validation]);

  // Reset to default
  const resetToDefault = useCallback(() => {
    const config = createDefaultBuilderConfig();
    const json = JSON.stringify(config, null, 2);
    setConfigJson(json);
    setEditedJson(json);
    setIsEditing(false);
    setError(null);
  }, []);

  // Export config
  const exportConfig = useCallback(() => {
    const blob = new Blob([configJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tokens-config.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [configJson]);

  // Import config
  const importConfig = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          setEditedJson(content);
          setIsEditing(true);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, []);

  // Current config for display
  const currentConfig = useMemo(() => {
    try {
      return JSON.parse(configJson) as BuilderConfig;
    } catch {
      return null;
    }
  }, [configJson]);

  return (
    <Container size="xl">
      <Stack gap={6}>
        {/* Header */}
        <Stack gap={2}>
          <Text as="h1" size={5} weight="bold">
            Configuration
          </Text>
          <Text tone="muted">
            View and edit the raw token configuration JSON.
          </Text>
        </Stack>

        {/* Page Navigation */}
        <Card pad={3} radius={2}>
          <Inline gap={2} align="center" justify="between" wrap>
            <Inline gap={2}>
              <Link to="/tokens-studio" className="studio-btn">
                ← Builder
              </Link>
              <Link to="/tokens-studio/preview" className="studio-btn">
                Preview
              </Link>
              <span className="studio-btn studio-btn--primary">Config</span>
              <Link to="/tokens-studio/prompts" className="studio-btn">
                Prompts
              </Link>
            </Inline>
          </Inline>
        </Card>

        {/* Actions */}
        <Card pad={4} radius={2}>
          <Inline gap={3} align="center" justify="between" wrap>
            <Inline gap={2}>
              <button onClick={importConfig} className="studio-btn">
                Import JSON
              </button>
              <button onClick={exportConfig} className="studio-btn">
                Export JSON
              </button>
              <button onClick={resetToDefault} className="studio-btn">
                Reset to Default
              </button>
            </Inline>
            <Inline gap={2}>
              {isEditing ? (
                <>
                  <button
                    onClick={() => {
                      setEditedJson(configJson);
                      setIsEditing(false);
                      setError(null);
                    }}
                    className="studio-btn"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={applyChanges}
                    className={`studio-btn ${validation.valid ? "studio-btn--primary" : ""}`}
                    disabled={!validation.valid}
                  >
                    Apply Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="studio-btn studio-btn--primary"
                >
                  Edit Config
                </button>
              )}
            </Inline>
          </Inline>
        </Card>

        {/* Validation Status */}
        {isEditing && (
          <div
            className={`config-validation ${validation.valid ? "config-validation--valid" : "config-validation--invalid"}`}
            style={{
              padding: "var(--st-space-3)",
              borderRadius: "var(--st-radius-2)",
              backgroundColor: validation.valid
                ? "var(--st-color-success-surface)"
                : "var(--st-color-danger-surface)",
              border: `1px solid ${validation.valid ? "var(--st-color-success)" : "var(--st-color-danger)"}`,
            }}
          >
            <Inline gap={2} align="center">
              <span
                style={{
                  color: validation.valid
                    ? "var(--st-color-success)"
                    : "var(--st-color-danger)",
                }}
              >
                {validation.valid ? "✓" : "✗"}
              </span>
              <span
                style={{
                  fontSize: "var(--st-font-size-1)",
                  color: validation.valid
                    ? "var(--st-color-success)"
                    : "var(--st-color-danger)",
                }}
              >
                {validation.valid ? "Configuration is valid" : validation.error}
              </span>
            </Inline>
          </div>
        )}

        {error && (
          <div
            style={{
              padding: "var(--st-space-3)",
              borderRadius: "var(--st-radius-2)",
              backgroundColor: "var(--st-color-danger-surface)",
              border: "1px solid var(--st-color-danger)",
            }}
          >
            <span style={{ fontSize: "var(--st-font-size-1)", color: "var(--st-color-danger)" }}>
              Error: {error}
            </span>
          </div>
        )}

        {/* Config Editor/Display */}
        <Card pad={0} radius={2}>
          {isEditing ? (
            <textarea
              value={editedJson}
              onChange={(e) => setEditedJson(e.target.value)}
              className="config-editor"
              spellCheck={false}
              style={{
                width: "100%",
                minHeight: "500px",
                padding: "var(--st-space-4)",
                fontFamily: "var(--st-font-mono)",
                fontSize: "var(--st-font-size-0)",
                lineHeight: "var(--st-leading-relaxed)",
                border: "none",
                backgroundColor: "var(--st-color-surface)",
                color: "var(--st-color-text)",
                resize: "vertical",
              }}
            />
          ) : (
            <CodePreview
              code={configJson}
              language="json"
              title="tokens-config.json"
            />
          )}
        </Card>

        {/* Config Summary */}
        {currentConfig && !isEditing && (
          <Card pad={4} radius={2}>
            <Stack gap={4}>
              <Text weight="semibold">Configuration Summary</Text>

              <div className="config-summary-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--st-space-4)" }}>
                <Stack gap={2}>
                  <Text size={0} weight="medium" tone="muted">Name</Text>
                  <Text>{currentConfig.name}</Text>
                </Stack>

                <Stack gap={2}>
                  <Text size={0} weight="medium" tone="muted">Version</Text>
                  <Text>{currentConfig.version}</Text>
                </Stack>

                <Stack gap={2}>
                  <Text size={0} weight="medium" tone="muted">Palettes</Text>
                  <Text>{currentConfig.palettes.length} palettes</Text>
                </Stack>

                <Stack gap={2}>
                  <Text size={0} weight="medium" tone="muted">Step Count</Text>
                  <Text>{currentConfig.generation.stepCount} steps</Text>
                </Stack>

                <Stack gap={2}>
                  <Text size={0} weight="medium" tone="muted">Algorithm</Text>
                  <span style={{ textTransform: "uppercase" }}>
                    {currentConfig.generation.algorithm}
                  </span>
                </Stack>

                <Stack gap={2}>
                  <Text size={0} weight="medium" tone="muted">Overrides</Text>
                  <Text>{currentConfig.overrides.length} overrides</Text>
                </Stack>
              </div>

              {/* Seeds Preview */}
              <Stack gap={2}>
                <Text size={0} weight="medium" tone="muted">Seed Colors</Text>
                <Inline gap={2} wrap>
                  {Object.entries(currentConfig.seeds).map(([key, value]) => (
                    value && (
                      <Inline key={key} gap={2} align="center">
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            backgroundColor: value,
                            borderRadius: "var(--st-radius-1)",
                            border: "1px solid var(--st-color-border)",
                          }}
                        />
                        <Text size={0}>{key}</Text>
                      </Inline>
                    )
                  ))}
                </Inline>
              </Stack>
            </Stack>
          </Card>
        )}

        {/* Schema Documentation */}
        <Card pad={4} radius={2}>
          <Stack gap={4}>
            <Text weight="semibold">Configuration Schema</Text>
            <Text size={1} tone="muted">
              The configuration follows a structured schema with the following top-level properties:
            </Text>

            <div className="schema-docs" style={{ display: "grid", gap: "var(--st-space-3)" }}>
              <SchemaField
                name="seeds"
                type="object"
                description="Base colors for palette generation (primary, secondary, neutral, etc.)"
              />
              <SchemaField
                name="generation"
                type="object"
                description="Parameters controlling how palettes are generated (algorithm, stepCount, chromaScale, etc.)"
              />
              <SchemaField
                name="palettes"
                type="array"
                description="Generated color palettes with light and dark mode variants"
              />
              <SchemaField
                name="semanticMap"
                type="object"
                description="Maps semantic token names to palette step references for light and dark modes"
              />
              <SchemaField
                name="overrides"
                type="array"
                description="Manual overrides applied after generation for fine-tuning"
              />
              <SchemaField
                name="space, radius, shadow"
                type="object"
                description="Spacing, border radius, and shadow scales"
              />
              <SchemaField
                name="typography"
                type="object"
                description="Font family, size, weight, and line height tokens"
              />
              <SchemaField
                name="motion"
                type="object"
                description="Animation duration and easing tokens"
              />
              <SchemaField
                name="density"
                type="object"
                description="Comfortable and compact density variants"
              />
            </div>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}

interface SchemaFieldProps {
  name: string;
  type: string;
  description: string;
}

function SchemaField({ name, type, description }: SchemaFieldProps) {
  return (
    <div
      style={{
        padding: "var(--st-space-2) var(--st-space-3)",
        backgroundColor: "var(--st-color-surface)",
        borderRadius: "var(--st-radius-1)",
      }}
    >
      <Inline gap={2} align="baseline">
        <span style={{ fontFamily: "var(--st-font-mono)", fontWeight: 600, color: "var(--st-color-primary)" }}>
          {name}
        </span>
        <span style={{ fontSize: "var(--st-font-size-0)", fontFamily: "var(--st-font-mono)", color: "var(--st-color-text-muted)" }}>
          {type}
        </span>
      </Inline>
      <span style={{ fontSize: "var(--st-font-size-0)", color: "var(--st-color-text-muted)", marginTop: "var(--st-space-1)", display: "block" }}>
        {description}
      </span>
    </div>
  );
}
