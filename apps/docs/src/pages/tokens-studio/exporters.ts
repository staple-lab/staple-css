import type { ExportFormat } from "./ExportModal";

// Export functions for different formats
export function exportToCssVariables(theme: any): string {
  const { colors, space, radius, shadow, fontSizes } = theme;

  let css = `:root {\n`;
  css += `  /* ${theme.name || "Custom Theme"} */\n\n`;

  // Colors
  if (colors) {
    css += `  /* Colors */\n`;
    Object.entries(colors).forEach(([key, value]) => {
      css += `  --theme-color-${key}: ${value};\n`;
    });
    css += `\n`;
  }

  // Space
  if (space) {
    css += `  /* Spacing */\n`;
    Object.entries(space).forEach(([key, value]) => {
      css += `  --theme-space-${key}: ${value};\n`;
    });
    css += `\n`;
  }

  // Radius
  if (radius) {
    css += `  /* Border Radius */\n`;
    Object.entries(radius).forEach(([key, value]) => {
      css += `  --theme-radius-${key}: ${value};\n`;
    });
    css += `\n`;
  }

  // Shadows
  if (shadow) {
    css += `  /* Shadows */\n`;
    Object.entries(shadow).forEach(([key, value]) => {
      css += `  --theme-shadow-${key}: ${value};\n`;
    });
    css += `\n`;
  }

  // Font sizes
  if (fontSizes) {
    css += `  /* Font Sizes */\n`;
    Object.entries(fontSizes).forEach(([key, value]) => {
      css += `  --theme-font-size-${key}: ${value};\n`;
    });
  }

  css += `}\n`;
  return css;
}

export function exportToFigmaTokens(theme: any): string {
  const figmaTokens: any = {
    name: theme.name || "Custom Theme",
    tokens: {},
  };

  if (theme.colors) {
    figmaTokens.tokens.colors = {};
    Object.entries(theme.colors).forEach(([key, value]) => {
      figmaTokens.tokens.colors[key] = {
        value,
        type: "color",
      };
    });
  }

  if (theme.space) {
    figmaTokens.tokens.spacing = {};
    Object.entries(theme.space).forEach(([key, value]) => {
      figmaTokens.tokens.spacing[key] = {
        value,
        type: "dimension",
      };
    });
  }

  if (theme.radius) {
    figmaTokens.tokens.borderRadius = {};
    Object.entries(theme.radius).forEach(([key, value]) => {
      figmaTokens.tokens.borderRadius[key] = {
        value,
        type: "dimension",
      };
    });
  }

  if (theme.fontSizes) {
    figmaTokens.tokens.fontSize = {};
    Object.entries(theme.fontSizes).forEach(([key, value]) => {
      figmaTokens.tokens.fontSize[key] = {
        value,
        type: "dimension",
      };
    });
  }

  return JSON.stringify(figmaTokens, null, 2);
}

export function exportToStyleDictionary(theme: any): string {
  const styleDictionary: any = {
    color: {},
    size: {},
  };

  if (theme.colors) {
    Object.entries(theme.colors).forEach(([key, value]) => {
      styleDictionary.color[key] = { value };
    });
  }

  if (theme.space) {
    styleDictionary.size.spacing = {};
    Object.entries(theme.space).forEach(([key, value]) => {
      styleDictionary.size.spacing[key] = { value };
    });
  }

  if (theme.radius) {
    styleDictionary.size.borderRadius = {};
    Object.entries(theme.radius).forEach(([key, value]) => {
      styleDictionary.size.borderRadius[key] = { value };
    });
  }

  if (theme.fontSizes) {
    styleDictionary.size.font = {};
    Object.entries(theme.fontSizes).forEach(([key, value]) => {
      styleDictionary.size.font[key] = { value };
    });
  }

  return JSON.stringify(styleDictionary, null, 2);
}

export function exportToTailwindConfig(theme: any): string {
  let config = `/** @type {import('tailwindcss').Config} */\n`;
  config += `module.exports = {\n`;
  config += `  theme: {\n`;
  config += `    extend: {\n`;

  if (theme.colors) {
    config += `      colors: {\n`;
    Object.entries(theme.colors).forEach(([key, value]) => {
      config += `        '${key}': '${value}',\n`;
    });
    config += `      },\n`;
  }

  if (theme.space) {
    config += `      spacing: {\n`;
    Object.entries(theme.space).forEach(([key, value]) => {
      config += `        '${key}': '${value}',\n`;
    });
    config += `      },\n`;
  }

  if (theme.radius) {
    config += `      borderRadius: {\n`;
    Object.entries(theme.radius).forEach(([key, value]) => {
      config += `        '${key}': '${value}',\n`;
    });
    config += `      },\n`;
  }

  if (theme.fontSizes) {
    config += `      fontSize: {\n`;
    Object.entries(theme.fontSizes).forEach(([key, value]) => {
      config += `        '${key}': '${value}',\n`;
    });
    config += `      },\n`;
  }

  config += `    },\n`;
  config += `  },\n`;
  config += `}\n`;

  return config;
}

export function exportToCssModules(theme: any): string {
  let css = `:export {\n`;

  if (theme.colors) {
    Object.entries(theme.colors).forEach(([key, value]) => {
      css += `  color-${key}: ${value};\n`;
    });
  }

  if (theme.space) {
    Object.entries(theme.space).forEach(([key, value]) => {
      css += `  space-${key}: ${value};\n`;
    });
  }

  if (theme.radius) {
    Object.entries(theme.radius).forEach(([key, value]) => {
      css += `  radius-${key}: ${value};\n`;
    });
  }

  if (theme.fontSizes) {
    Object.entries(theme.fontSizes).forEach(([key, value]) => {
      css += `  font-size-${key}: ${value};\n`;
    });
  }

  css += `}\n`;
  return css;
}

export function exportToTypeScript(theme: any): string {
  let ts = `// Generated theme: ${theme.name || "Custom Theme"}\n\n`;

  if (theme.colors) {
    ts += `export const colors = {\n`;
    Object.entries(theme.colors).forEach(([key, value]) => {
      ts += `  ${key}: '${value}',\n`;
    });
    ts += `} as const;\n\n`;
  }

  if (theme.space) {
    ts += `export const space = {\n`;
    Object.entries(theme.space).forEach(([key, value]) => {
      ts += `  ${key}: '${value}',\n`;
    });
    ts += `} as const;\n\n`;
  }

  if (theme.radius) {
    ts += `export const radius = {\n`;
    Object.entries(theme.radius).forEach(([key, value]) => {
      ts += `  ${key}: '${value}',\n`;
    });
    ts += `} as const;\n\n`;
  }

  if (theme.fontSizes) {
    ts += `export const fontSizes = {\n`;
    Object.entries(theme.fontSizes).forEach(([key, value]) => {
      ts += `  ${key}: '${value}',\n`;
    });
    ts += `} as const;\n\n`;
  }

  ts += `export const theme = {\n`;
  if (theme.colors) ts += `  colors,\n`;
  if (theme.space) ts += `  space,\n`;
  if (theme.radius) ts += `  radius,\n`;
  if (theme.fontSizes) ts += `  fontSizes,\n`;
  ts += `} as const;\n\n`;

  ts += `export type Theme = typeof theme;\n`;

  return ts;
}

export function exportToScssVariables(theme: any): string {
  let scss = `// ${theme.name || "Custom Theme"}\n\n`;

  if (theme.colors) {
    scss += `// Colors\n`;
    Object.entries(theme.colors).forEach(([key, value]) => {
      scss += `$color-${key}: ${value};\n`;
    });
    scss += `\n`;
  }

  if (theme.space) {
    scss += `// Spacing\n`;
    Object.entries(theme.space).forEach(([key, value]) => {
      scss += `$space-${key}: ${value};\n`;
    });
    scss += `\n`;
  }

  if (theme.radius) {
    scss += `// Border Radius\n`;
    Object.entries(theme.radius).forEach(([key, value]) => {
      scss += `$radius-${key}: ${value};\n`;
    });
    scss += `\n`;
  }

  if (theme.fontSizes) {
    scss += `// Font Sizes\n`;
    Object.entries(theme.fontSizes).forEach(([key, value]) => {
      scss += `$font-size-${key}: ${value};\n`;
    });
  }

  return scss;
}

export function exportToJson(theme: any): string {
  return JSON.stringify(theme, null, 2);
}

// Main export function
export function exportTheme(theme: any, format: ExportFormat): string {
  switch (format) {
    case "css-variables":
      return exportToCssVariables(theme);
    case "figma-tokens":
      return exportToFigmaTokens(theme);
    case "style-dictionary":
      return exportToStyleDictionary(theme);
    case "tailwind-config":
      return exportToTailwindConfig(theme);
    case "css-modules":
      return exportToCssModules(theme);
    case "typescript":
      return exportToTypeScript(theme);
    case "scss-variables":
      return exportToScssVariables(theme);
    case "json":
      return exportToJson(theme);
    default:
      return exportToJson(theme);
  }
}

// Download helper
export function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Get file extension for format
export function getFileExtension(format: ExportFormat): string {
  switch (format) {
    case "css-variables":
    case "css-modules":
      return ".css";
    case "figma-tokens":
    case "style-dictionary":
    case "json":
      return ".json";
    case "tailwind-config":
      return ".js";
    case "typescript":
      return ".ts";
    case "scss-variables":
      return ".scss";
    default:
      return ".txt";
  }
}
