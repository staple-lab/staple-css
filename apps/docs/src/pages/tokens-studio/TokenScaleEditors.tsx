/**
 * Token Scale Editors
 *
 * Comprehensive UI editors for all CSS token types in the staple-css system.
 * Extends ScalesStep with full coverage for 40+ token categories.
 */

import { useState, useCallback } from "react";
import { Column, Card, Text, Row, Box } from "@staple-css/primitives";

// ============================================================================
// Types
// ============================================================================

export interface TokenScaleEditorProps {
  scales: Record<string, Record<string, any>>;
  onUpdate: (scaleType: string, key: string, value: string) => void;
  onReset: (scaleType: string) => void;
  onAddItem: (scaleType: string) => void;
  onRemoveItem: (scaleType: string, key: string) => void;
}

// ============================================================================
// Generic Scale Editor Component
// ============================================================================

interface SimpleScaleItem {
  key: string;
  value: string;
  preview?: React.ReactNode;
}

interface SimpleScaleEditorProps {
  title: string;
  description: string;
  items: SimpleScaleItem[];
  onUpdate: (key: string, value: string) => void;
  onRemove: (key: string) => void;
  onAdd: () => void;
  onReset: () => void;
  valueInputType?: "text" | "number" | "color";
  placeholder?: string;
  monoFont?: boolean;
}

export function SimpleScaleEditor({
  title,
  description,
  items,
  onUpdate,
  onRemove,
  onAdd,
  onReset,
  valueInputType = "text",
  placeholder,
  monoFont = true,
}: SimpleScaleEditorProps) {
  return (
    <Card pad={4} radius={2}>
      <Column gap={4}>
        <Row gap={2} align="center" justify="between">
          <Column gap={1}>
            <Text weight="semibold">{title} ({items.length} items)</Text>
            <Text size={0} tone="muted">{description}</Text>
          </Column>
          <Row gap={2}>
            <button onClick={onAdd} className="studio-btn studio-btn--sm">
              + Add
            </button>
            <button onClick={onReset} className="studio-btn studio-btn--sm">
              Reset
            </button>
          </Row>
        </Row>
        <div className="scales-grid">
          {items.map(({ key, value, preview }) => (
            <div key={key} className="scale-item">
              <Column gap={2}>
                <Row gap={2} align="center" justify="between">
                  <Text size={0} weight="medium" style={{ fontFamily: monoFont ? "monospace" : "inherit" }}>
                    --st-{key}
                  </Text>
                  <button
                    onClick={() => onRemove(key)}
                    className="studio-btn studio-btn--sm studio-btn--danger"
                    title="Remove"
                  >
                    ×
                  </button>
                </Row>
                {preview && <Box>{preview}</Box>}
                <input
                  type={valueInputType}
                  value={value}
                  onChange={(e) => onUpdate(key, e.target.value)}
                  className="studio-text-input studio-text-input--sm"
                  style={{ width: "100%" }}
                  placeholder={placeholder}
                />
              </Column>
            </div>
          ))}
        </div>
      </Column>
    </Card>
  );
}

// ============================================================================
// Transform Effects Editor
// ============================================================================

export function TransformEffectsEditor({
  scales,
  onUpdate,
  onReset,
  onAddItem,
  onRemoveItem,
}: TokenScaleEditorProps) {
  const [activeTab, setActiveTab] = useState<"blur" | "brightness" | "contrast" | "saturate" | "scale" | "translate" | "rotate" | "backdrop">("blur");

  const tabs = [
    { id: "blur", label: "Blur", description: "Blur effect scale" },
    { id: "brightness", label: "Brightness", description: "Brightness adjustment (0-2)" },
    { id: "contrast", label: "Contrast", description: "Contrast adjustment (0-2)" },
    { id: "saturate", label: "Saturate", description: "Color saturation (0-2)" },
    { id: "scale", label: "Scale", description: "Transform scale (0-2)" },
    { id: "translate", label: "Translate", description: "Transform translate (position)" },
    { id: "rotate", label: "Rotate", description: "Transform rotation (degrees)" },
    { id: "backdrop", label: "Backdrop", description: "Backdrop filter effects" },
  ];

  const scaleItems = (scales[activeTab] || {}) as Record<string, string>;
  const items = Object.entries(scaleItems).map(([key, value]) => ({
    key,
    value,
    preview:
      activeTab === "blur" ? (
        <div
          style={{
            width: "100%",
            height: "40px",
            background: "linear-gradient(135deg, var(--st-color-primary), var(--st-color-primary-dark, #1a5a8f))",
            borderRadius: "4px",
            filter: `blur(${value})`,
          }}
        />
      ) : activeTab === "brightness" ? (
        <div
          style={{
            width: "100%",
            height: "40px",
            background: "var(--st-color-primary)",
            borderRadius: "4px",
            filter: `brightness(${value})`,
          }}
        />
      ) : activeTab === "contrast" ? (
        <div
          style={{
            width: "100%",
            height: "40px",
            background: "linear-gradient(135deg, var(--st-color-primary), var(--st-color-primary-light, #e3f2fd))",
            borderRadius: "4px",
            filter: `contrast(${value})`,
          }}
        />
      ) : activeTab === "saturate" ? (
        <div
          style={{
            width: "100%",
            height: "40px",
            background: "linear-gradient(135deg, var(--st-color-danger), var(--st-color-success))",
            borderRadius: "4px",
            filter: `saturate(${value})`,
          }}
        />
      ) : activeTab === "scale" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "40px",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              background: "var(--st-color-primary)",
              borderRadius: "4px",
              transform: `scale(${value})`,
              transition: "transform 0.2s",
            }}
          />
        </div>
      ) : null,
  }));

  return (
    <Column gap={6}>
      <Card pad={4} radius={2}>
        <Column gap={4}>
          <Column gap={2}>
            <Text as="h3" size={3} weight="semibold">
              Transform & Effects
            </Text>
            <Text tone="muted" size={0}>
              Configure blur, brightness, contrast, saturation, scale, translate, rotate, and backdrop filters.
            </Text>
          </Column>

          {/* Tab Navigation */}
          <Row gap={2} wrap="wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`studio-btn studio-btn--sm ${activeTab === tab.id ? "studio-btn--primary" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </Row>
        </Column>
      </Card>

      {/* Tab Content */}
      {activeTab && (
        <SimpleScaleEditor
          title={tabs.find((t) => t.id === activeTab)?.label || ""}
          description={tabs.find((t) => t.id === activeTab)?.description || ""}
          items={items}
          onUpdate={(key, value) => onUpdate(activeTab, key, value)}
          onRemove={(key) => onRemoveItem(activeTab, key)}
          onAdd={() => onAddItem(activeTab)}
          onReset={() => onReset(activeTab)}
          placeholder={activeTab === "brightness" || activeTab === "contrast" || activeTab === "saturate" ? "0-2" : "value"}
        />
      )}
    </Column>
  );
}

// ============================================================================
// Border & Outline Editor
// ============================================================================

export function BorderOutlineEditor({
  scales,
  onUpdate,
  onReset,
  onAddItem,
  onRemoveItem,
}: TokenScaleEditorProps) {
  const [activeTab, setActiveTab] = useState<"borderWidth" | "outlineWidth" | "outlineOffset" | "letterSpacing">(
    "borderWidth"
  );

  const tabs = [
    { id: "borderWidth", label: "Border Width", description: "Border thickness" },
    { id: "outlineWidth", label: "Outline Width", description: "Outline thickness" },
    { id: "outlineOffset", label: "Outline Offset", description: "Outline distance from element" },
    { id: "letterSpacing", label: "Letter Spacing", description: "Text letter spacing" },
  ];

  const scaleItems = (scales[activeTab] || {}) as Record<string, string>;
  const items = Object.entries(scaleItems).map(([key, value]) => ({
    key,
    value,
    preview:
      activeTab === "borderWidth" ? (
        <div
          style={{
            width: "100%",
            height: "40px",
            background: "transparent",
            border: `${value} solid var(--st-color-primary)`,
            borderRadius: "4px",
          }}
        />
      ) : activeTab === "outlineWidth" ? (
        <div
          style={{
            width: "100%",
            height: "40px",
            background: "transparent",
            border: "2px solid var(--st-color-surface-secondary)",
            outline: `${value} solid var(--st-color-primary)`,
            borderRadius: "4px",
          }}
        />
      ) : activeTab === "outlineOffset" ? (
        <div
          style={{
            width: "100%",
            height: "40px",
            background: "transparent",
            border: "2px solid var(--st-color-surface-secondary)",
            outline: "2px solid var(--st-color-primary)",
            outlineOffset: value,
            borderRadius: "4px",
          }}
        />
      ) : (
        <div style={{ fontSize: "14px", letterSpacing: value }}>Sample Text Here</div>
      ),
  }));

  return (
    <Column gap={6}>
      <Card pad={4} radius={2}>
        <Column gap={4}>
          <Column gap={2}>
            <Text as="h3" size={3} weight="semibold">
              Border & Outline
            </Text>
            <Text tone="muted" size={0}>
              Configure border width, outline width, offset, and letter spacing.
            </Text>
          </Column>

          {/* Tab Navigation */}
          <Row gap={2} wrap="wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`studio-btn studio-btn--sm ${activeTab === tab.id ? "studio-btn--primary" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </Row>
        </Column>
      </Card>

      {/* Tab Content */}
      {activeTab && (
        <SimpleScaleEditor
          title={tabs.find((t) => t.id === activeTab)?.label || ""}
          description={tabs.find((t) => t.id === activeTab)?.description || ""}
          items={items}
          onUpdate={(key, value) => onUpdate(activeTab, key, value)}
          onRemove={(key) => onRemoveItem(activeTab, key)}
          onAdd={() => onAddItem(activeTab)}
          onReset={() => onReset(activeTab)}
        />
      )}
    </Column>
  );
}

// ============================================================================
// Layout Utilities Editor
// ============================================================================

export function LayoutUtilitiesEditor({
  scales,
  onUpdate,
  onReset,
  onAddItem,
  onRemoveItem,
}: TokenScaleEditorProps) {
  const [activeTab, setActiveTab] = useState<"display" | "position" | "overflow" | "flexGrow" | "flexShrink" | "order">(
    "display"
  );

  const tabs = [
    { id: "display", label: "Display", description: "Display types (block, flex, grid, etc.)" },
    { id: "position", label: "Position", description: "Positioning (static, absolute, fixed, etc.)" },
    { id: "overflow", label: "Overflow", description: "Overflow behavior (visible, hidden, scroll, auto)" },
    { id: "flexGrow", label: "Flex Grow", description: "Flex grow factor (0, 1)" },
    { id: "flexShrink", label: "Flex Shrink", description: "Flex shrink factor (0, 1)" },
    { id: "order", label: "Order", description: "Flex order (-1, 0, 1, 2, 3)" },
  ];

  const scaleItems = (scales[activeTab] || {}) as Record<string, string>;
  const items = Object.entries(scaleItems).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <Column gap={6}>
      <Card pad={4} radius={2}>
        <Column gap={4}>
          <Column gap={2}>
            <Text as="h3" size={3} weight="semibold">
              Layout Utilities
            </Text>
            <Text tone="muted" size={0}>
              Configure display, position, overflow, flex properties, and ordering.
            </Text>
          </Column>

          {/* Tab Navigation */}
          <Row gap={2} wrap="wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`studio-btn studio-btn--sm ${activeTab === tab.id ? "studio-btn--primary" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </Row>
        </Column>
      </Card>

      {/* Tab Content */}
      {activeTab && (
        <SimpleScaleEditor
          title={tabs.find((t) => t.id === activeTab)?.label || ""}
          description={tabs.find((t) => t.id === activeTab)?.description || ""}
          items={items}
          onUpdate={(key, value) => onUpdate(activeTab, key, value)}
          onRemove={(key) => onRemoveItem(activeTab, key)}
          onAdd={() => onAddItem(activeTab)}
          onReset={() => onReset(activeTab)}
          monoFont={false}
        />
      )}
    </Column>
  );
}

// ============================================================================
// Sizing & Depth Editor
// ============================================================================

export function SizingDepthEditor({
  scales,
  onUpdate,
  onReset,
  onAddItem,
  onRemoveItem,
}: TokenScaleEditorProps) {
  const [activeTab, setActiveTab] = useState<"maxWidth" | "aspectRatio" | "zIndex" | "opacity" | "lineClamp">(
    "maxWidth"
  );

  const tabs = [
    { id: "maxWidth", label: "Max Width", description: "Container width constraints" },
    { id: "aspectRatio", label: "Aspect Ratio", description: "Predefined aspect ratios" },
    { id: "zIndex", label: "Z-Index", description: "Stacking order" },
    { id: "opacity", label: "Opacity", description: "Transparency (0-1)" },
    { id: "lineClamp", label: "Line Clamp", description: "Text line limits (1-6)" },
  ];

  const scaleItems = (scales[activeTab] || {}) as Record<string, string>;
  const items = Object.entries(scaleItems).map(([key, value]) => ({
    key,
    value,
    preview:
      activeTab === "opacity" ? (
        <div
          style={{
            width: "100%",
            height: "40px",
            background: "var(--st-color-primary)",
            borderRadius: "4px",
            opacity: parseFloat(value),
          }}
        />
      ) : activeTab === "aspectRatio" ? (
        <div
          style={{
            aspectRatio: value,
            background: "var(--st-color-primary)",
            borderRadius: "4px",
            maxWidth: "100%",
          }}
        />
      ) : undefined,
  }));

  return (
    <Column gap={6}>
      <Card pad={4} radius={2}>
        <Column gap={4}>
          <Column gap={2}>
            <Text as="h3" size={3} weight="semibold">
              Sizing & Depth
            </Text>
            <Text tone="muted" size={0}>
              Configure max widths, aspect ratios, z-index, opacity, and line clamping.
            </Text>
          </Column>

          {/* Tab Navigation */}
          <Row gap={2} wrap="wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`studio-btn studio-btn--sm ${activeTab === tab.id ? "studio-btn--primary" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </Row>
        </Column>
      </Card>

      {/* Tab Content */}
      {activeTab && (
        <SimpleScaleEditor
          title={tabs.find((t) => t.id === activeTab)?.label || ""}
          description={tabs.find((t) => t.id === activeTab)?.description || ""}
          items={items}
          onUpdate={(key, value) => onUpdate(activeTab, key, value)}
          onRemove={(key) => onRemoveItem(activeTab, key)}
          onAdd={() => onAddItem(activeTab)}
          onReset={() => onReset(activeTab)}
        />
      )}
    </Column>
  );
}

// ============================================================================
// Text Utilities Editor
// ============================================================================

export function TextUtilitiesEditor({
  scales,
  onUpdate,
  onReset,
  onAddItem,
  onRemoveItem,
}: TokenScaleEditorProps) {
  const [activeTab, setActiveTab] = useState<"textTransform" | "whiteSpace" | "objectFit" | "cursor">(
    "textTransform"
  );

  const tabs = [
    { id: "textTransform", label: "Text Transform", description: "Text case (uppercase, lowercase, etc.)" },
    { id: "whiteSpace", label: "White Space", description: "Whitespace handling (normal, nowrap, pre, etc.)" },
    { id: "objectFit", label: "Object Fit", description: "Image/video fitting (contain, cover, fill)" },
    { id: "cursor", label: "Cursor", description: "Mouse cursor styles" },
  ];

  const scaleItems = (scales[activeTab] || {}) as Record<string, string>;
  const items = Object.entries(scaleItems).map(([key, value]) => ({
    key,
    value,
    preview:
      activeTab === "textTransform" ? (
        <div style={{ textTransform: value as any }}>Sample Text</div>
      ) : activeTab === "cursor" ? (
        <div style={{ cursor: value as any, padding: "8px", background: "var(--st-color-surface-secondary)", borderRadius: "4px" }}>
          Hover to see cursor
        </div>
      ) : undefined,
  }));

  return (
    <Column gap={6}>
      <Card pad={4} radius={2}>
        <Column gap={4}>
          <Column gap={2}>
            <Text as="h3" size={3} weight="semibold">
              Text Utilities
            </Text>
            <Text tone="muted" size={0}>
              Configure text transformations, white space, object fitting, and cursor styles.
            </Text>
          </Column>

          {/* Tab Navigation */}
          <Row gap={2} wrap="wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`studio-btn studio-btn--sm ${activeTab === tab.id ? "studio-btn--primary" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </Row>
        </Column>
      </Card>

      {/* Tab Content */}
      {activeTab && (
        <SimpleScaleEditor
          title={tabs.find((t) => t.id === activeTab)?.label || ""}
          description={tabs.find((t) => t.id === activeTab)?.description || ""}
          items={items}
          onUpdate={(key, value) => onUpdate(activeTab, key, value)}
          onRemove={(key) => onRemoveItem(activeTab, key)}
          onAdd={() => onAddItem(activeTab)}
          onReset={() => onReset(activeTab)}
          monoFont={false}
        />
      )}
    </Column>
  );
}
