/**
 * Theme Manager
 *
 * Utilities for managing dynamic themes - creation, export, import, and switching.
 * Enables themes to be loaded and applied dynamically at runtime.
 */

import type { BuilderConfig } from "./builder-config.js";

/**
 * Theme metadata
 */
export interface ThemeMetadata {
  id: string;
  name: string;
  description?: string;
  version: string;
  created: string;
  updated: string;
  parent?: string; // For theme inheritance
  tags?: string[];
}

/**
 * Complete theme with config and metadata
 */
export interface Theme {
  metadata: ThemeMetadata;
  config: BuilderConfig;
}

/**
 * Theme collection
 */
export interface ThemeCollection {
  name: string;
  version: string;
  themes: Theme[];
  activeThemeId: string;
}

/**
 * Theme export format options
 */
export type ThemeExportFormat = "css" | "json" | "typescript";

/**
 * Create a new theme with metadata
 */
export function createTheme(
  id: string,
  name: string,
  config: BuilderConfig,
  options?: {
    description?: string;
    parent?: string;
    tags?: string[];
  }
): Theme {
  const now = new Date().toISOString();
  return {
    metadata: {
      id,
      name,
      description: options?.description,
      version: "1.0.0",
      created: now,
      updated: now,
      parent: options?.parent,
      tags: options?.tags,
    },
    config,
  };
}

/**
 * Update theme metadata
 */
export function updateThemeMetadata(
  theme: Theme,
  updates: Partial<Omit<ThemeMetadata, "id" | "created">>
): Theme {
  return {
    ...theme,
    metadata: {
      ...theme.metadata,
      ...updates,
      updated: new Date().toISOString(),
    },
  };
}

/**
 * Export theme to JSON
 */
export function themeToJson(theme: Theme): string {
  return JSON.stringify(theme, null, 2);
}

/**
 * Import theme from JSON
 */
export function themeFromJson(json: string): Theme {
  try {
    const parsed = JSON.parse(json);
    if (!parsed.metadata || !parsed.config) {
      throw new Error("Invalid theme JSON: missing metadata or config");
    }
    return parsed as Theme;
  } catch (error) {
    throw new Error(`Failed to parse theme JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Export theme to CSS variables file
 */
export function themeToCSS(theme: Theme): string {
  const { metadata, config } = theme;

  const cssLines: string[] = [
    `/**`,
    ` * ${metadata.name}`,
    metadata.description ? ` * ${metadata.description}` : "",
    ` * Generated: ${metadata.updated}`,
    ` * Version: ${metadata.version}`,
    ` */`,
    ``,
    `:root {`,
  ];

  // Add color variables from semantic map
  if (config.semanticMap?.light) {
    cssLines.push(`  /* Light theme colors */`);
    for (const [key, colorValue] of Object.entries(config.semanticMap.light)) {
      const value = colorValue as any;
      if (typeof value === "string" && value.startsWith("#")) {
        const cssVarName = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        cssLines.push(`  --st-color-${cssVarName}: ${value};`);
      }
    }
  }

  // Add other token values if present
  if (config.seeds) {
    cssLines.push(`  /* Seed colors */`);
    for (const [key, seedValue] of Object.entries(config.seeds)) {
      const value = seedValue as any;
      if (typeof value === "string" && value.startsWith("#")) {
        const cssVarName = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        cssLines.push(`  --st-seed-${cssVarName}: ${value};`);
      }
    }
  }

  cssLines.push(`}`);

  // Dark mode override if available
  if (config.semanticMap?.dark) {
    cssLines.push(``);
    cssLines.push(`@media (prefers-color-scheme: dark) {`);
    cssLines.push(`  :root {`);
    cssLines.push(`    /* Dark theme colors */`);
    for (const [key, darkValue] of Object.entries(config.semanticMap.dark)) {
      const value = darkValue as any;
      if (typeof value === "string" && value.startsWith("#")) {
        const cssVarName = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        cssLines.push(`    --st-color-${cssVarName}: ${value};`);
      }
    }
    cssLines.push(`  }`);
    cssLines.push(`}`);
  }

  return cssLines.join("\n");
}

/**
 * Export theme to TypeScript module
 */
export function themeToTypeScript(theme: Theme): string {
  const { metadata, config } = theme;
  const themeVarName = metadata.id.replace(/[^a-zA-Z0-9]/g, "_");

  const tsLines: string[] = [
    `/**`,
    ` * ${metadata.name} Theme`,
    metadata.description ? ` * ${metadata.description}` : "",
    ` * Generated: ${metadata.updated}`,
    ` * Version: ${metadata.version}`,
    ` */`,
    ``,
    `import type { BuilderConfig } from "@staple-css/tokens";`,
    ``,
    `export const ${themeVarName}Config: BuilderConfig = ${JSON.stringify(config, null, 2)};`,
    ``,
    `export default ${themeVarName}Config;`,
  ];

  return tsLines.join("\n");
}

/**
 * Apply theme to DOM (for runtime theme switching)
 */
export function applyTheme(theme: Theme, element: HTMLElement = document.documentElement): void {
  const css = themeToCSS(theme);
  const style = document.createElement("style");
  style.id = `theme-${theme.metadata.id}`;
  style.textContent = css;
  element.appendChild(style);
}

/**
 * Remove theme from DOM
 */
export function removeTheme(themeId: string, element: HTMLElement = document.documentElement): void {
  const style = element.querySelector(`style#theme-${themeId}`);
  if (style) {
    style.remove();
  }
}

/**
 * Export theme collection to JSON
 */
export function themeCollectionToJson(collection: ThemeCollection): string {
  return JSON.stringify(collection, null, 2);
}

/**
 * Import theme collection from JSON
 */
export function themeCollectionFromJson(json: string): ThemeCollection {
  try {
    const parsed = JSON.parse(json);
    if (!parsed.name || !Array.isArray(parsed.themes)) {
      throw new Error("Invalid theme collection JSON");
    }
    return parsed as ThemeCollection;
  } catch (error) {
    throw new Error(
      `Failed to parse theme collection JSON: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Create theme collection from individual themes
 */
export function createThemeCollection(
  name: string,
  themes: Theme[],
  activeThemeId: string
): ThemeCollection {
  return {
    name,
    version: "1.0.0",
    themes,
    activeThemeId,
  };
}

/**
 * Get theme by ID from collection
 */
export function getThemeById(collection: ThemeCollection, id: string): Theme | undefined {
  return collection.themes.find(theme => theme.metadata.id === id);
}

/**
 * Add theme to collection
 */
export function addThemeToCollection(collection: ThemeCollection, theme: Theme): ThemeCollection {
  return {
    ...collection,
    themes: [...collection.themes, theme],
  };
}

/**
 * Remove theme from collection
 */
export function removeThemeFromCollection(collection: ThemeCollection, themeId: string): ThemeCollection {
  return {
    ...collection,
    themes: collection.themes.filter(theme => theme.metadata.id !== themeId),
  };
}

/**
 * Export theme collection as ZIP file (multiple formats)
 * Note: Requires additional dependencies (e.g., JSZip)
 */
export async function exportThemeCollectionAsZip(
  collection: ThemeCollection,
  formats: ThemeExportFormat[] = ["json", "css", "typescript"]
): Promise<Blob> {
  // This is a placeholder - actual implementation would use JSZip
  const files: Record<string, string> = {};

  if (formats.includes("json")) {
    files[`${collection.name}.json`] = themeCollectionToJson(collection);
  }

  for (const theme of collection.themes) {
    const safeThemeName = theme.metadata.id.replace(/[^a-zA-Z0-9-]/g, "-");

    if (formats.includes("css")) {
      files[`themes/${safeThemeName}.css`] = themeToCSS(theme);
    }

    if (formats.includes("typescript")) {
      files[`themes/${safeThemeName}.ts`] = themeToTypeScript(theme);
    }
  }

  // For now, return a simple blob with JSON content
  // Real implementation would use JSZip to create actual ZIP
  return new Blob([JSON.stringify(files, null, 2)], { type: "application/json" });
}

/**
 * Store theme collection in localStorage
 */
export function saveThemeCollectionToStorage(
  collection: ThemeCollection,
  key: string = "staple-themes"
): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(key, themeCollectionToJson(collection));
}

/**
 * Load theme collection from localStorage
 */
export function loadThemeCollectionFromStorage(key: string = "staple-themes"): ThemeCollection | null {
  if (typeof localStorage === "undefined") return null;
  const json = localStorage.getItem(key);
  if (!json) return null;
  try {
    return themeCollectionFromJson(json);
  } catch {
    return null;
  }
}
