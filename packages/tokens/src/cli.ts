#!/usr/bin/env node

/**
 * staple-css Token Generator CLI
 *
 * Generate custom token systems from config files
 *
 * Usage:
 *   npx @staple-css/tokens generate config.json
 *   npx @staple-css/tokens generate --format css --output tokens.css
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { validateConfig } from "./generator.js";
import { generatePalettesCss } from "./palettes.js";
import { generateBreakpointsCss } from "./breakpoints.js";

// Simplified config for CLI (for custom token generation)
interface SimpleTokenConfig {
  prefix?: string;
  colors?: Record<string, string>;
  space?: Record<string | number, string>;
  radius?: Record<string | number, string>;
  shadow?: Record<string | number, string>;
  breakpoints?: Array<{ name: string; minWidth: number }>;
}

// CLI argument parser
interface CliArgs {
  command: string;
  inputFile?: string;
  format: "css" | "json" | "typescript" | "all";
  output?: string;
  prefix?: string;
  help?: boolean;
  version?: boolean;
}

function parseArgs(args: string[]): CliArgs {
  const parsed: CliArgs = {
    command: args[0] || "help",
    format: "css",
  };

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--version" || arg === "-v") {
      parsed.version = true;
    } else if (arg === "--format" || arg === "-f") {
      const nextArg = args[++i];
      if (nextArg) {
        parsed.format = nextArg as CliArgs["format"];
      }
    } else if (arg === "--output" || arg === "-o") {
      const nextArg = args[++i];
      if (nextArg) {
        parsed.output = nextArg;
      }
    } else if (arg === "--prefix" || arg === "-p") {
      const nextArg = args[++i];
      if (nextArg) {
        parsed.prefix = nextArg;
      }
    } else if (!parsed.inputFile && !arg.startsWith("-")) {
      parsed.inputFile = arg;
    }
  }

  return parsed;
}

function printHelp() {
  console.log(`
staple-css Token Generator CLI

USAGE:
  npx @staple-css/tokens <command> [options]

COMMANDS:
  generate <file>       Generate tokens from config file
  init                  Create a default config file
  validate <file>       Validate a config file
  help                  Show this help message

OPTIONS:
  -f, --format <type>   Output format: css, json, typescript, all (default: css)
  -o, --output <file>   Output file path (default: stdout)
  -p, --prefix <str>    CSS variable prefix (default: st)
  -h, --help           Show help
  -v, --version        Show version

EXAMPLES:
  # Generate CSS from config
  npx @staple-css/tokens generate config.json

  # Generate all formats
  npx @staple-css/tokens generate config.json --format all

  # Generate with custom prefix
  npx @staple-css/tokens generate config.json --prefix my --output tokens.css

  # Create default config
  npx @staple-css/tokens init

  # Validate config
  npx @staple-css/tokens validate config.json

CONFIG FILE FORMAT:
  {
    "prefix": "st",
    "colors": {
      "primary": "#2563eb",
      "danger": "#dc2626",
      ...
    },
    "space": {
      "0": "0",
      "1": "0.25rem",
      ...
    },
    "breakpoints": [
      { "name": "sm", "minWidth": 640 },
      { "name": "md", "minWidth": 768 }
    ]
  }

DOCUMENTATION:
  https://github.com/staple-lab/staple-css
`);
}

function printVersion() {
  // Read version from package.json
  try {
    const packageJson = JSON.parse(
      readFileSync(resolve(__dirname, "../package.json"), "utf-8")
    );
    console.log(`@staple-css/tokens v${packageJson.version}`);
  } catch {
    console.log("@staple-css/tokens");
  }
}

function createDefaultConfig(): SimpleTokenConfig {
  return {
    prefix: "st",
    colors: {
      primary: "#2563eb",
      primaryHover: "#1d4ed8",
      secondary: "#64748b",
      danger: "#dc2626",
      warn: "#f59e0b",
      success: "#16a34a",
      background: "#ffffff",
      surface: "#f9fafb",
      text: "#1f2937",
      textMuted: "#6b7280",
      border: "#e5e7eb",
    },
    space: {
      0: "0",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.5rem",
      6: "2rem",
      7: "3rem",
      8: "4rem",
    },
    radius: {
      0: "0",
      1: "0.125rem",
      2: "0.25rem",
      3: "0.5rem",
      4: "1rem",
    },
    shadow: {
      0: "none",
      1: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      2: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    },
  };
}

function initCommand() {
  const configPath = "staple.config.json";

  if (existsSync(configPath)) {
    console.error(`❌ Config file already exists: ${configPath}`);
    process.exit(1);
  }

  const config = createDefaultConfig();
  writeFileSync(configPath, JSON.stringify(config, null, 2));

  console.log(`✅ Created default config: ${configPath}`);
  console.log("\nNext steps:");
  console.log("  1. Edit staple.config.json to customize your tokens");
  console.log("  2. Run: npx @staple-css/tokens generate staple.config.json");
}

function validateCommand(inputFile: string) {
  if (!existsSync(inputFile)) {
    console.error(`❌ Config file not found: ${inputFile}`);
    process.exit(1);
  }

  try {
    const configJson = readFileSync(inputFile, "utf-8");
    const config = JSON.parse(configJson);

    const validation = validateConfig(config);

    if (validation.valid) {
      console.log(`✅ Config is valid: ${inputFile}`);
    } else {
      console.error(`❌ Config validation failed:`);
      validation.errors?.forEach((error) => {
        console.error(`  - ${error}`);
      });
      process.exit(1);
    }
  } catch (error) {
    console.error(`❌ Error reading config: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

function generateSimpleCss(config: SimpleTokenConfig): string {
  const prefix = config.prefix || "st";
  let css = `:root {\n`;

  // Generate color variables
  if (config.colors) {
    css += `  /* Colors */\n`;
    for (const [key, value] of Object.entries(config.colors)) {
      css += `  --${prefix}-color-${key}: ${value};\n`;
    }
    css += `\n`;
  }

  // Generate space variables
  if (config.space) {
    css += `  /* Space */\n`;
    for (const [key, value] of Object.entries(config.space)) {
      css += `  --${prefix}-space-${key}: ${value};\n`;
    }
    css += `\n`;
  }

  // Generate radius variables
  if (config.radius) {
    css += `  /* Radius */\n`;
    for (const [key, value] of Object.entries(config.radius)) {
      css += `  --${prefix}-radius-${key}: ${value};\n`;
    }
    css += `\n`;
  }

  // Generate shadow variables
  if (config.shadow) {
    css += `  /* Shadow */\n`;
    for (const [key, value] of Object.entries(config.shadow)) {
      css += `  --${prefix}-shadow-${key}: ${value};\n`;
    }
  }

  css += `}\n`;
  return css;
}

function generateCommand(args: CliArgs) {
  if (!args.inputFile) {
    console.error("❌ Input file required");
    console.error("Usage: npx @staple-css/tokens generate <file>");
    process.exit(1);
  }

  const inputFile = resolve(process.cwd(), args.inputFile);

  if (!existsSync(inputFile)) {
    console.error(`❌ Config file not found: ${inputFile}`);
    process.exit(1);
  }

  try {
    // Read and parse config
    const configJson = readFileSync(inputFile, "utf-8");
    const config: SimpleTokenConfig = JSON.parse(configJson);

    // Validate config
    const validation = validateConfig(config);
    if (!validation.valid) {
      console.error("❌ Config validation failed:");
      validation.errors?.forEach((error) => {
        console.error(`  - ${error}`);
      });
      process.exit(1);
    }

    // Override prefix if specified
    if (args.prefix) {
      config.prefix = args.prefix;
    }

    // Generate output
    const outputs: Record<string, string> = {};

    if (args.format === "css" || args.format === "all") {
      outputs.css = generateSimpleCss(config);
    }

    if (args.format === "json" || args.format === "all") {
      outputs.json = JSON.stringify(config, null, 2);
    }

    if (args.format === "typescript" || args.format === "all") {
      outputs.typescript = generateTypeScript(config);
    }

    // Write output
    if (args.output) {
      const outputPath = resolve(process.cwd(), args.output);

      if (args.format === "all") {
        // Write multiple files
        const cssOut = outputs.css;
        const jsonOut = outputs.json;
        const tsOut = outputs.typescript;

        if (cssOut) writeFileSync(outputPath.replace(/\.\w+$/, ".css"), cssOut);
        if (jsonOut) writeFileSync(outputPath.replace(/\.\w+$/, ".json"), jsonOut);
        if (tsOut) writeFileSync(outputPath.replace(/\.\w+$/, ".ts"), tsOut);

        console.log(`✅ Generated tokens:`);
        console.log(`  - ${outputPath.replace(/\.\w+$/, ".css")}`);
        console.log(`  - ${outputPath.replace(/\.\w+$/, ".json")}`);
        console.log(`  - ${outputPath.replace(/\.\w+$/, ".ts")}`);
      } else {
        const output = outputs[args.format];
        if (output) {
          writeFileSync(outputPath, output);
          console.log(`✅ Generated tokens: ${outputPath}`);
        }
      }
    } else {
      // Print to stdout
      console.log(outputs[args.format]);
    }
  } catch (error) {
    console.error(`❌ Error generating tokens: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

function generateTypeScript(config: SimpleTokenConfig): string {
  const prefix = config.prefix || "st";

  let ts = `/**\n * Generated by @staple-css/tokens\n */\n\n`;

  if (config.colors) {
    ts += `export const colors = {\n`;
    Object.entries(config.colors).forEach(([key, value]) => {
      ts += `  ${key}: '${value}',\n`;
    });
    ts += `} as const;\n\n`;
  }

  if (config.space) {
    ts += `export const space = {\n`;
    Object.entries(config.space).forEach(([key, value]) => {
      ts += `  ${key}: '${value}',\n`;
    });
    ts += `} as const;\n\n`;
  }

  if (config.radius) {
    ts += `export const radius = {\n`;
    Object.entries(config.radius).forEach(([key, value]) => {
      ts += `  ${key}: '${value}',\n`;
    });
    ts += `} as const;\n\n`;
  }

  if (config.shadow) {
    ts += `export const shadow = {\n`;
    Object.entries(config.shadow).forEach(([key, value]) => {
      ts += `  ${key}: '${value}',\n`;
    });
    ts += `} as const;\n\n`;
  }

  ts += `export const tokens = {\n`;
  if (config.colors) ts += `  colors,\n`;
  if (config.space) ts += `  space,\n`;
  if (config.radius) ts += `  radius,\n`;
  if (config.shadow) ts += `  shadow,\n`;
  ts += `} as const;\n\n`;

  ts += `export type Tokens = typeof tokens;\n`;

  return ts;
}

// Main
function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (args.version) {
    printVersion();
    process.exit(0);
  }

  switch (args.command) {
    case "generate":
      generateCommand(args);
      break;
    case "init":
      initCommand();
      break;
    case "validate":
      if (!args.inputFile) {
        console.error("❌ Input file required");
        process.exit(1);
      }
      validateCommand(args.inputFile);
      break;
    case "help":
      printHelp();
      break;
    default:
      console.error(`❌ Unknown command: ${args.command}`);
      console.error("Run 'npx @staple-css/tokens help' for usage information");
      process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
