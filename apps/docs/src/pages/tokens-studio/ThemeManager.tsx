/**
 * Theme Manager UI
 *
 * Simplified theme manager for Token Studio.
 * Allows users to export and import themes dynamically.
 */

import { useState, useCallback } from "react";
import type {
  Theme,
  ThemeCollection,
  BuilderConfig,
  ThemeExportFormat,
} from "@staple-css/tokens";
import {
  createTheme,
  createThemeCollection,
  addThemeToCollection,
  removeThemeFromCollection,
  themeToJson,
  themeToCSS,
  themeToTypeScript,
  saveThemeCollectionToStorage,
  loadThemeCollectionFromStorage,
} from "@staple-css/tokens";

interface ThemeManagerProps {
  currentConfig: BuilderConfig;
  onThemeSelect?: (theme: Theme) => void;
}

/**
 * Theme Manager Component
 *
 * Provides UI for:
 * - Creating new themes from current config
 * - Exporting themes in multiple formats (CSS, JSON, TypeScript)
 * - Importing previously exported themes
 * - Managing theme collection
 */
export function ThemeManager({ currentConfig, onThemeSelect }: ThemeManagerProps) {
  // Load themes from storage or create empty collection
  const [collection, setCollection] = useState<ThemeCollection>(() => {
    const stored = loadThemeCollectionFromStorage("staple-themes");
    return stored || createThemeCollection("My Themes", [], "");
  });

  const [themeName, setThemeName] = useState("");
  const [exportFormat, setExportFormat] = useState<ThemeExportFormat>("json");

  // Create new theme from current config
  const handleCreateTheme = useCallback(() => {
    if (!themeName.trim()) return;

    const id = themeName.toLowerCase().replace(/\s+/g, "-");
    const theme = createTheme(id, themeName, currentConfig, {
      tags: ["custom"],
    });

    const updated = addThemeToCollection(collection, theme);
    setCollection(updated);
    saveThemeCollectionToStorage(updated);
    setThemeName("");

    // Update active theme
    setCollection(prev => ({
      ...prev,
      activeThemeId: id,
    }));

    onThemeSelect?.(theme);
  }, [themeName, currentConfig, collection, onThemeSelect]);

  // Delete theme
  const handleDeleteTheme = useCallback(
    (themeId: string) => {
      const updated = removeThemeFromCollection(collection, themeId);
      setCollection(updated);
      saveThemeCollectionToStorage(updated);
    },
    [collection]
  );

  // Export theme
  const handleExportTheme = useCallback(
    (theme: Theme) => {
      let content: string;
      let filename: string;
      let mimeType = "text/plain";

      switch (exportFormat) {
        case "css":
          content = themeToCSS(theme);
          filename = `${theme.metadata.id}.css`;
          break;
        case "typescript":
          content = themeToTypeScript(theme);
          filename = `${theme.metadata.id}.ts`;
          break;
        case "json":
        default:
          content = themeToJson(theme);
          filename = `${theme.metadata.id}.json`;
          mimeType = "application/json";
          break;
      }

      // Create download link
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    [exportFormat]
  );

  // Export all themes
  const handleExportAll = useCallback(() => {
    const content = JSON.stringify(collection, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${collection.name}-themes.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [collection]);

  // Import themes from JSON
  const handleImportThemes = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = event => {
        try {
          const imported = JSON.parse(
            event.target?.result as string
          ) as ThemeCollection;
          setCollection(imported);
          saveThemeCollectionToStorage(imported);
        } catch (error) {
          alert("Failed to import themes. Invalid JSON format.");
        }
      };
      reader.readAsText(file);
    },
    []
  );

  const activeTheme = collection.themes.find(t => t.metadata.id === collection.activeThemeId);

  return (
    <div className="theme-manager" style={{ padding: "1rem" }}>
      <h2>Theme Manager</h2>
      <p style={{ color: "var(--st-color-text-muted)" }}>
        Create, export, and manage custom themes for your design system
      </p>

      {/* Create New Theme Section */}
      <div style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid var(--st-color-border)", borderRadius: "var(--st-radius-2)" }}>
        <h3>Create New Theme</h3>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="theme-name" style={{ display: "block", marginBottom: "0.5rem" }}>
              Theme Name
            </label>
            <input
              id="theme-name"
              type="text"
              value={themeName}
              onChange={e => setThemeName(e.target.value)}
              placeholder="e.g., Dark Mode, High Contrast"
              onKeyDown={e => {
                if (e.key === "Enter") handleCreateTheme();
              }}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "var(--st-radius-1)",
                border: "1px solid var(--st-color-border)",
                fontSize: "1rem",
              }}
            />
          </div>
          <button
            onClick={handleCreateTheme}
            disabled={!themeName.trim()}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: themeName.trim() ? "var(--st-color-primary)" : "var(--st-color-border)",
              color: "var(--st-color-primary-text)",
              border: "none",
              borderRadius: "var(--st-radius-1)",
              cursor: themeName.trim() ? "pointer" : "not-allowed",
              fontWeight: "500",
            }}
          >
            Create
          </button>
        </div>
      </div>

      {/* Saved Themes List */}
      <div style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid var(--st-color-border)", borderRadius: "var(--st-radius-2)" }}>
        <h3>Saved Themes ({collection.themes.length})</h3>
        {collection.themes.length === 0 ? (
          <p style={{ color: "var(--st-color-text-muted)" }}>No themes yet. Create one above to get started.</p>
        ) : (
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {collection.themes.map(theme => (
              <div
                key={theme.metadata.id}
                style={{
                  padding: "1rem",
                  borderRadius: "var(--st-radius-1)",
                  border:
                    theme.metadata.id === collection.activeThemeId
                      ? "2px solid var(--st-color-primary)"
                      : "1px solid var(--st-color-border)",
                  backgroundColor:
                    theme.metadata.id === collection.activeThemeId
                      ? "rgba(37, 99, 235, 0.05)"
                      : "transparent",
                  cursor: "pointer",
                  transition: "all 200ms",
                }}
                onClick={() => {
                  setCollection(prev => ({
                    ...prev,
                    activeThemeId: theme.metadata.id,
                  }));
                  onThemeSelect?.(theme);
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: "0 0 0.25rem 0" }}>{theme.metadata.name}</h4>
                    <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem", color: "var(--st-color-text-muted)" }}>
                      v{theme.metadata.version} • {new Date(theme.metadata.created).toLocaleDateString()}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleExportTheme(theme);
                      }}
                      style={{
                        padding: "0.25rem 0.75rem",
                        fontSize: "0.875rem",
                        backgroundColor: "transparent",
                        border: "1px solid var(--st-color-border)",
                        borderRadius: "var(--st-radius-1)",
                        cursor: "pointer",
                      }}
                    >
                      Export
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleDeleteTheme(theme.metadata.id);
                      }}
                      style={{
                        padding: "0.25rem 0.75rem",
                        fontSize: "0.875rem",
                        backgroundColor: "var(--st-color-danger)",
                        color: "var(--st-color-danger-text)",
                        border: "none",
                        borderRadius: "var(--st-radius-1)",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Export Options */}
      <div style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid var(--st-color-border)", borderRadius: "var(--st-radius-2)" }}>
        <h3>Export & Import</h3>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="format" style={{ display: "block", marginBottom: "0.5rem" }}>
              Export Format
            </label>
            <select
              id="format"
              value={exportFormat}
              onChange={e => setExportFormat(e.target.value as ThemeExportFormat)}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "var(--st-radius-1)",
                border: "1px solid var(--st-color-border)",
                fontSize: "1rem",
              }}
            >
              <option value="json">JSON (config)</option>
              <option value="css">CSS Variables</option>
              <option value="typescript">TypeScript Module</option>
            </select>
          </div>
          <button
            onClick={handleExportAll}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "var(--st-color-primary)",
              color: "var(--st-color-primary-text)",
              border: "none",
              borderRadius: "var(--st-radius-1)",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Export All
          </button>
        </div>

        <div style={{ padding: "1rem", border: "2px dashed var(--st-color-border)", borderRadius: "var(--st-radius-1)" }}>
          <label htmlFor="import-file" style={{ display: "block", marginBottom: "0.5rem" }}>
            Import themes
          </label>
          <input
            id="import-file"
            type="file"
            accept=".json"
            onChange={e => {
              if (e.target.files?.[0]) {
                handleImportThemes(e.target.files[0]);
              }
            }}
            style={{ display: "block", width: "100%" }}
          />
          <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.875rem", color: "var(--st-color-text-muted)" }}>
            Upload a themes.json file to import themes
          </p>
        </div>
      </div>

      {/* Active Theme Info */}
      {activeTheme && (
        <div style={{ padding: "1rem", border: "1px solid var(--st-color-border)", borderRadius: "var(--st-radius-2)", backgroundColor: "rgba(37, 99, 235, 0.02)" }}>
          <h3>Active Theme: {activeTheme.metadata.name}</h3>
          <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem", fontSize: "0.875rem", color: "var(--st-color-text-muted)" }}>
            <li>ID: {activeTheme.metadata.id}</li>
            <li>Version: {activeTheme.metadata.version}</li>
            <li>Created: {new Date(activeTheme.metadata.created).toLocaleString()}</li>
            <li>Updated: {new Date(activeTheme.metadata.updated).toLocaleString()}</li>
            {activeTheme.metadata.tags && activeTheme.metadata.tags.length > 0 && (
              <li>Tags: {activeTheme.metadata.tags.join(", ")}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
