import { describe, it, expect } from "vitest";
import {
  hexToRgb,
  rgbToHex,
  hexToOklch,
  oklchToHex,
  clampToGamut,
  isInGamut,
  oklchToRgb,
} from "./oklch.js";

describe("hexToRgb", () => {
  it("parses hex colors", () => {
    expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb("#00ff00")).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb("#0000ff")).toEqual({ r: 0, g: 0, b: 255 });
  });

  it("handles hex without #", () => {
    expect(hexToRgb("ffffff")).toEqual({ r: 255, g: 255, b: 255 });
  });

  it("throws on invalid hex", () => {
    expect(() => hexToRgb("invalid")).toThrow();
    expect(() => hexToRgb("#fff")).toThrow(); // shorthand not supported
  });
});

describe("rgbToHex", () => {
  it("converts RGB to hex", () => {
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe("#ffffff");
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe("#000000");
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
  });

  it("clamps out-of-range values", () => {
    expect(rgbToHex({ r: 300, g: -10, b: 128 })).toBe("#ff0080");
  });
});

describe("OKLCH conversions", () => {
  it("roundtrips white", () => {
    const hex = "#ffffff";
    const oklch = hexToOklch(hex);
    expect(oklch.L).toBeCloseTo(1, 2);
    expect(oklch.C).toBeCloseTo(0, 2);
    const result = oklchToHex(oklch);
    expect(result).toBe(hex);
  });

  it("roundtrips black", () => {
    const hex = "#000000";
    const oklch = hexToOklch(hex);
    expect(oklch.L).toBeCloseTo(0, 2);
    expect(oklch.C).toBeCloseTo(0, 2);
    const result = oklchToHex(oklch);
    expect(result).toBe(hex);
  });

  it("roundtrips colors with reasonable accuracy", () => {
    const colors = ["#2563eb", "#dc2626", "#16a34a", "#d97706"];
    for (const hex of colors) {
      const oklch = hexToOklch(hex);
      const result = oklchToHex(oklch);
      // Allow small differences due to gamut clamping
      const origRgb = hexToRgb(hex);
      const resultRgb = hexToRgb(result);
      expect(Math.abs(origRgb.r - resultRgb.r)).toBeLessThan(3);
      expect(Math.abs(origRgb.g - resultRgb.g)).toBeLessThan(3);
      expect(Math.abs(origRgb.b - resultRgb.b)).toBeLessThan(3);
    }
  });

  it("parses hue correctly for primary colors", () => {
    // Red should be around 0/360 degrees
    const red = hexToOklch("#ff0000");
    expect(red.H).toBeLessThan(30);

    // Green should be around 140-150 degrees
    const green = hexToOklch("#00ff00");
    expect(green.H).toBeGreaterThan(120);
    expect(green.H).toBeLessThan(160);

    // Blue should be around 260-270 degrees
    const blue = hexToOklch("#0000ff");
    expect(blue.H).toBeGreaterThan(250);
    expect(blue.H).toBeLessThan(280);
  });
});

describe("gamut clamping", () => {
  it("keeps in-gamut colors unchanged", () => {
    const oklch = hexToOklch("#808080");
    const clamped = clampToGamut(oklch);
    expect(clamped.L).toBeCloseTo(oklch.L, 4);
    expect(clamped.C).toBeCloseTo(oklch.C, 4);
    expect(clamped.H).toBeCloseTo(oklch.H, 4);
  });

  it("clamps out-of-gamut colors", () => {
    // Highly saturated color that might be out of gamut
    const outOfGamut = { L: 0.5, C: 0.5, H: 29 };
    const clamped = clampToGamut(outOfGamut);
    expect(clamped.C).toBeLessThanOrEqual(outOfGamut.C);
    const rgb = oklchToRgb(clamped);
    expect(isInGamut(rgb)).toBe(true);
  });

  it("handles edge cases", () => {
    // Black
    expect(clampToGamut({ L: 0, C: 0.1, H: 0 })).toEqual({ L: 0, C: 0, H: 0 });
    // White
    expect(clampToGamut({ L: 1, C: 0.1, H: 0 })).toEqual({ L: 1, C: 0, H: 0 });
    // Zero chroma
    expect(clampToGamut({ L: 0.5, C: 0, H: 180 })).toEqual({ L: 0.5, C: 0, H: 180 });
  });
});

describe("isInGamut", () => {
  it("returns true for valid sRGB", () => {
    expect(isInGamut({ r: 0, g: 0, b: 0 })).toBe(true);
    expect(isInGamut({ r: 255, g: 255, b: 255 })).toBe(true);
    expect(isInGamut({ r: 128, g: 64, b: 192 })).toBe(true);
  });

  it("returns false for out-of-range values", () => {
    expect(isInGamut({ r: -1, g: 0, b: 0 })).toBe(false);
    expect(isInGamut({ r: 256, g: 0, b: 0 })).toBe(false);
    expect(isInGamut({ r: 0, g: 300, b: 0 })).toBe(false);
  });
});
