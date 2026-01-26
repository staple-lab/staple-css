import { useState } from "react";
import { Stack, Card, Text, Inline, Box } from "@staple-css/primitives";

export type ExportFormat =
  | "css-variables"
  | "figma-tokens"
  | "style-dictionary"
  | "tailwind-config"
  | "css-modules"
  | "typescript"
  | "json"
  | "scss-variables";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: ExportFormat) => void;
  themeName: string;
}

const exportFormats: Array<{
  id: ExportFormat;
  name: string;
  description: string;
  icon: string;
}> = [
  {
    id: "css-variables",
    name: "CSS Variables",
    description: "Standard CSS custom properties for use in any project",
    icon: "🎨",
  },
  {
    id: "figma-tokens",
    name: "Figma Tokens",
    description: "Design Tokens format compatible with Figma Tokens plugin",
    icon: "🎯",
  },
  {
    id: "style-dictionary",
    name: "Style Dictionary",
    description: "Amazon Style Dictionary JSON format for multi-platform builds",
    icon: "📚",
  },
  {
    id: "tailwind-config",
    name: "Tailwind Config",
    description: "Tailwind CSS configuration object (tailwind.config.js)",
    icon: "💨",
  },
  {
    id: "css-modules",
    name: "CSS Modules",
    description: "CSS Modules format with :export syntax",
    icon: "📦",
  },
  {
    id: "typescript",
    name: "TypeScript",
    description: "TypeScript constants with full type definitions",
    icon: "🔷",
  },
  {
    id: "scss-variables",
    name: "SCSS Variables",
    description: "SASS/SCSS variable definitions",
    icon: "🎭",
  },
  {
    id: "json",
    name: "JSON",
    description: "Raw JSON format for custom processing",
    icon: "📄",
  },
];

export function ExportModal({ isOpen, onClose, onExport, themeName }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("css-variables");

  if (!isOpen) return null;

  const handleExport = () => {
    onExport(selectedFormat);
    onClose();
  };

  return (
    <Box
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <Card
        pad={0}
        radius={3}
        shadow={2}
        style={{ maxWidth: "800px", width: "90%", maxHeight: "90vh", overflow: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Stack gap={0}>
          {/* Header */}
          <Box pad={5} style={{ borderBottom: "1px solid var(--st-color-border)" }}>
            <Inline justify="between" align="center">
              <Stack gap={1}>
                <Text size={4} weight="bold">
                  Export Theme: {themeName}
                </Text>
                <Text size={1} tone="muted">
                  Choose your export format
                </Text>
              </Stack>
              <button
                onClick={onClose}
                style={{
                  padding: "8px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "24px",
                  lineHeight: "1",
                }}
              >
                ×
              </button>
            </Inline>
          </Box>

          {/* Format Grid */}
          <Box pad={5}>
            <Stack gap={3}>
              {exportFormats.map((format) => (
                <Card
                  key={format.id}
                  pad={4}
                  radius={2}
                  style={{
                    border: `2px solid ${
                      selectedFormat === format.id
                        ? "var(--st-color-primary)"
                        : "var(--st-color-border)"
                    }`,
                    cursor: "pointer",
                    transition: "all 150ms ease",
                  }}
                  onClick={() => setSelectedFormat(format.id)}
                >
                  <Inline gap={3} align="start">
                    <Text size={5}>{format.icon}</Text>
                    <Stack gap={1} style={{ flex: 1 }}>
                      <Text weight="semibold">{format.name}</Text>
                      <Text size={1} tone="muted">
                        {format.description}
                      </Text>
                    </Stack>
                    {selectedFormat === format.id && (
                      <Text size={4} style={{ color: "var(--st-color-primary)" }}>
                        ✓
                      </Text>
                    )}
                  </Inline>
                </Card>
              ))}
            </Stack>
          </Box>

          {/* Footer */}
          <Box
            pad={5}
            style={{
              borderTop: "1px solid var(--st-color-border)",
              background: "var(--st-color-surface-raised)",
            }}
          >
            <Inline gap={3} justify="end">
              <button
                onClick={onClose}
                style={{
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "1px solid var(--st-color-border)",
                  background: "transparent",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                style={{
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  background: "var(--st-color-primary)",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Export as {exportFormats.find((f) => f.id === selectedFormat)?.name}
              </button>
            </Inline>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}
