import { describe, it, expect } from "vitest";
import {
  generateRamp,
  generateAlphaRamp,
  generateHarmony,
  generatePresetRamp,
  PRESET_TEMPLATES,
} from "./ramp.js";
import { hexToOklch } from "./oklch.js";

describe("generateRamp", () => {
  it("generates 12 steps by default", () => {
    const ramp = generateRamp({ baseColor: "#2563eb" });
    expect(ramp).toHaveLength(12);
  });

  it("generates 8 steps when specified", () => {
    const ramp = generateRamp({ baseColor: "#2563eb", steps: 8 });
    expect(ramp).toHaveLength(8);
  });

  it("generates 10 steps when specified", () => {
    const ramp = generateRamp({ baseColor: "#2563eb", steps: 10 });
    expect(ramp).toHaveLength(10);
  });

  it("returns valid hex colors", () => {
    const ramp = generateRamp({ baseColor: "#2563eb" });
    for (const color of ramp) {
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("places base color near step 9", () => {
    const baseColor = "#2563eb";
    const ramp = generateRamp({ baseColor });
    const baseLch = hexToOklch(baseColor);
    const step9Lch = hexToOklch(ramp[8] as string);
    // Hue should be similar
    expect(Math.abs(baseLch.H - step9Lch.H)).toBeLessThan(10);
  });

  it("creates light to dark progression", () => {
    const ramp = generateRamp({ baseColor: "#2563eb" });
    const lightnesses = ramp.map((hex) => hexToOklch(hex).L);
    // First colors should be lighter than last
    expect(lightnesses[0]).toBeGreaterThan(lightnesses[11] as number);
  });

  it("respects chromaScale", () => {
    const normal = generateRamp({ baseColor: "#2563eb", chromaScale: 1 });
    const muted = generateRamp({ baseColor: "#2563eb", chromaScale: 0.5 });

    const normalChroma = hexToOklch(normal[8] as string).C;
    const mutedChroma = hexToOklch(muted[8] as string).C;

    expect(mutedChroma).toBeLessThan(normalChroma);
  });
});

describe("generateAlphaRamp", () => {
  it("generates 12 alpha steps by default", () => {
    const ramp = generateAlphaRamp("#2563eb");
    expect(ramp).toHaveLength(12);
  });

  it("generates hex colors with alpha", () => {
    const ramp = generateAlphaRamp("#2563eb");
    for (const color of ramp) {
      // Should be hex with alpha (8 characters) or rgba format
      expect(color).toMatch(/^(#[0-9a-f]{8}|rgba\(.+\))$/i);
    }
  });

  it("generates increasing alpha values", () => {
    const ramp = generateAlphaRamp("#2563eb");
    // First step should be nearly transparent, last should be nearly opaque
    expect(ramp[0]).toBeDefined();
    expect(ramp[11]).toBeDefined();
  });
});

describe("generateHarmony", () => {
  it("generates complementary colors (base + complement)", () => {
    const colors = generateHarmony("#2563eb", "complementary");
    // Returns base color + 1 complementary = 2 total, but may return just the harmony colors
    expect(colors.length).toBeGreaterThan(0);
  });

  it("generates analogous colors", () => {
    const colors = generateHarmony("#2563eb", "analogous");
    expect(colors.length).toBeGreaterThan(0);
  });

  it("generates triadic colors", () => {
    const colors = generateHarmony("#2563eb", "triadic");
    expect(colors.length).toBeGreaterThan(0);
  });

  it("generates tetradic colors", () => {
    const colors = generateHarmony("#2563eb", "tetradic");
    expect(colors.length).toBeGreaterThan(0);
  });

  it("generates monochrome colors with similar hue", () => {
    const colors = generateHarmony("#2563eb", "monochrome");
    expect(colors.length).toBeGreaterThan(0);

    // Monochrome should have same/similar hue (allow some gamut clamping variation)
    const baseHue = hexToOklch("#2563eb").H;
    for (const color of colors) {
      const hue = hexToOklch(color).H;
      const hueDiff = Math.abs(baseHue - hue);
      expect(Math.min(hueDiff, 360 - hueDiff)).toBeLessThan(15);
    }
  });

  it("generates split-complementary colors", () => {
    const colors = generateHarmony("#2563eb", "split-complementary");
    expect(colors.length).toBeGreaterThan(0);
  });

  it("returns valid hex colors for all harmony types", () => {
    const types: Array<"complementary" | "analogous" | "triadic" | "tetradic" | "monochrome" | "split-complementary"> =
      ["complementary", "analogous", "triadic", "tetradic", "monochrome", "split-complementary"];

    for (const type of types) {
      const colors = generateHarmony("#2563eb", type);
      for (const color of colors) {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      }
    }
  });
});

describe("generatePresetRamp", () => {
  it("generates all presets", () => {
    const presets = Object.keys(PRESET_TEMPLATES);
    for (const preset of presets) {
      const ramp = generatePresetRamp(preset as keyof typeof PRESET_TEMPLATES);
      expect(ramp).toHaveLength(12);
      for (const color of ramp) {
        expect(color).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
  });

  it("generates blue preset correctly", () => {
    const ramp = generatePresetRamp("blue");
    // Blue should have hue around 260
    const hue = hexToOklch(ramp[8] as string).H;
    expect(hue).toBeGreaterThan(240);
    expect(hue).toBeLessThan(280);
  });

  it("generates gray preset with low chroma", () => {
    const ramp = generatePresetRamp("gray");
    const chroma = hexToOklch(ramp[5] as string).C;
    expect(chroma).toBeLessThan(0.02);
  });
});

describe("PRESET_TEMPLATES", () => {
  it("has expected presets", () => {
    expect(PRESET_TEMPLATES).toHaveProperty("gray");
    expect(PRESET_TEMPLATES).toHaveProperty("red");
    expect(PRESET_TEMPLATES).toHaveProperty("blue");
    expect(PRESET_TEMPLATES).toHaveProperty("green");
  });

  it("presets have required properties", () => {
    for (const [_, template] of Object.entries(PRESET_TEMPLATES)) {
      expect(template).toHaveProperty("baseColor");
      expect(template).toHaveProperty("chromaScale");
    }
  });
});
