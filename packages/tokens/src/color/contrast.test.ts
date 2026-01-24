import { describe, it, expect } from "vitest";
import {
  wcagContrastHex,
  wcagRating,
  apcaContrastHex,
  apcaRating,
  bestTextColor,
  checkContrast,
} from "./contrast.js";

describe("wcagContrastHex", () => {
  it("calculates max contrast for black on white", () => {
    const contrast = wcagContrastHex("#000000", "#ffffff");
    expect(contrast).toBeCloseTo(21, 0);
  });

  it("calculates min contrast for same colors", () => {
    const contrast = wcagContrastHex("#808080", "#808080");
    expect(contrast).toBeCloseTo(1, 1);
  });

  it("is symmetric", () => {
    const a = wcagContrastHex("#2563eb", "#ffffff");
    const b = wcagContrastHex("#ffffff", "#2563eb");
    expect(a).toBeCloseTo(b, 2);
  });

  it("calculates reasonable contrast for typical UI colors", () => {
    // Dark text on light background
    const darkOnLight = wcagContrastHex("#111827", "#ffffff");
    expect(darkOnLight).toBeGreaterThan(15);

    // Primary button text
    const whiteOnBlue = wcagContrastHex("#ffffff", "#2563eb");
    expect(whiteOnBlue).toBeGreaterThan(4.5);
  });
});

describe("wcagRating", () => {
  it("returns AAA for high contrast", () => {
    expect(wcagRating(7.5)).toBe("AAA");
    expect(wcagRating(21)).toBe("AAA");
  });

  it("returns AA for medium contrast", () => {
    expect(wcagRating(4.5)).toBe("AA");
    expect(wcagRating(6)).toBe("AA");
  });

  it("returns AA Large for low contrast", () => {
    expect(wcagRating(3)).toBe("AA Large");
    expect(wcagRating(4)).toBe("AA Large");
  });

  it("returns Fail for insufficient contrast", () => {
    expect(wcagRating(2)).toBe("Fail");
    expect(wcagRating(1)).toBe("Fail");
  });
});

describe("apcaContrastHex", () => {
  it("returns high absolute Lc for max contrast", () => {
    // APCA sign depends on polarity - just check absolute value
    const lcWhiteOnBlack = apcaContrastHex("#ffffff", "#000000");
    const lcBlackOnWhite = apcaContrastHex("#000000", "#ffffff");
    expect(Math.abs(lcWhiteOnBlack)).toBeGreaterThan(100);
    expect(Math.abs(lcBlackOnWhite)).toBeGreaterThan(100);
  });

  it("returns opposite signs for different polarities", () => {
    const lcWhiteOnBlack = apcaContrastHex("#ffffff", "#000000");
    const lcBlackOnWhite = apcaContrastHex("#000000", "#ffffff");
    // Different polarities should have opposite signs
    expect(lcWhiteOnBlack * lcBlackOnWhite).toBeLessThan(0);
  });

  it("returns 0 for same colors", () => {
    const lc = apcaContrastHex("#808080", "#808080");
    expect(Math.abs(lc)).toBeLessThan(1);
  });
});

describe("apcaRating", () => {
  it("rates body text correctly", () => {
    expect(apcaRating(80, "body")).toBe("Pass");
    expect(apcaRating(65, "body")).toBe("Marginal");
    expect(apcaRating(50, "body")).toBe("Fail");
  });

  it("rates large text correctly", () => {
    expect(apcaRating(65, "large")).toBe("Pass");
    expect(apcaRating(50, "large")).toBe("Marginal");
    expect(apcaRating(30, "large")).toBe("Fail");
  });

  it("handles absolute values", () => {
    expect(apcaRating(-80, "body")).toBe("Pass");
    expect(apcaRating(-50, "body")).toBe("Fail");
  });
});

describe("bestTextColor", () => {
  it("returns white for dark backgrounds", () => {
    expect(bestTextColor("#000000")).toBe("#ffffff");
    expect(bestTextColor("#1a1a1a")).toBe("#ffffff");
    expect(bestTextColor("#2563eb")).toBe("#ffffff");
  });

  it("returns black for light backgrounds", () => {
    expect(bestTextColor("#ffffff")).toBe("#000000");
    expect(bestTextColor("#f0f0f0")).toBe("#000000");
    expect(bestTextColor("#fbbf24")).toBe("#000000");
  });
});

describe("checkContrast", () => {
  it("returns complete contrast result", () => {
    const result = checkContrast("#ffffff", "#2563eb");

    expect(result.wcag.ratio).toBeGreaterThan(4);
    expect(result.wcag.rating).toBeDefined();
    expect(result.apca.lc).toBeDefined();
    expect(result.apca.rating).toBeDefined();
  });

  it("uses correct APCA use case", () => {
    const body = checkContrast("#666666", "#ffffff", "body");
    const headline = checkContrast("#666666", "#ffffff", "headline");

    // Same Lc, but different ratings based on use case
    expect(body.apca.lc).toBe(headline.apca.lc);
    // Headline has lower threshold, so might pass where body fails
  });
});
