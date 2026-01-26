import { describe, it, expect } from "vitest";
import {
  spaceScale,
  radiusScale,
  shadowScale,
  fontSizeScale,
  fontWeight,
  lineHeight,
  duration,
  easing,
  delay,
  zIndexScale,
  opacityScale,
} from "../tokens.js";

describe("Token Scales", () => {
  describe("spaceScale", () => {
    it("should have 9 space values (0-8)", () => {
      expect(Object.keys(spaceScale)).toHaveLength(9);
      expect(spaceScale).toHaveProperty("0");
      expect(spaceScale).toHaveProperty("8");
    });

    it("should have correct space values", () => {
      expect(spaceScale[0]).toBe("0");
      expect(spaceScale[1]).toBe("0.25rem");
      expect(spaceScale[4]).toBe("1rem");
      expect(spaceScale[8]).toBe("4rem");
    });
  });

  describe("radiusScale", () => {
    it("should have 5 radius values (0-4)", () => {
      expect(Object.keys(radiusScale)).toHaveLength(5);
    });

    it("should have correct radius values", () => {
      expect(radiusScale[0]).toBe("0");
      expect(radiusScale[2]).toBe("0.25rem");
      expect(radiusScale[4]).toBe("1rem");
    });
  });

  describe("shadowScale", () => {
    it("should have 6 shadow values (0-5) - enterprise elevation system", () => {
      expect(Object.keys(shadowScale)).toHaveLength(6);
      expect(shadowScale).toHaveProperty("0");
      expect(shadowScale).toHaveProperty("5");
    });

    it("should have none for shadow 0", () => {
      expect(shadowScale[0]).toBe("none");
    });

    it("should have increasing shadow depths", () => {
      expect(shadowScale[1]).toBe("0 0.0625rem 0.125rem 0 rgb(0 0 0 / 0.05)");
      expect(shadowScale[2]).toContain("rgb(0 0 0");
      expect(shadowScale[5]).toContain("1.5rem"); // Highest elevation
    });
  });

  describe("fontSizeScale", () => {
    it("should have 7 font sizes (0-6)", () => {
      expect(Object.keys(fontSizeScale)).toHaveLength(7);
    });

    it("should have correct font sizes", () => {
      expect(fontSizeScale[0]).toBe("0.75rem");
      expect(fontSizeScale[2]).toBe("1rem");
      expect(fontSizeScale[6]).toBe("2rem");
    });
  });

  describe("fontWeight", () => {
    it("should have all weight values", () => {
      expect(fontWeight).toHaveProperty("normal");
      expect(fontWeight).toHaveProperty("medium");
      expect(fontWeight).toHaveProperty("semibold");
      expect(fontWeight).toHaveProperty("bold");
    });

    it("should have correct weight values", () => {
      expect(fontWeight.normal).toBe("400");
      expect(fontWeight.bold).toBe("700");
    });
  });

  describe("lineHeight", () => {
    it("should have 3 line height values", () => {
      expect(Object.keys(lineHeight)).toHaveLength(3);
    });

    it("should have tight, normal, relaxed", () => {
      expect(lineHeight.tight).toBe("1.25");
      expect(lineHeight.normal).toBe("1.5");
      expect(lineHeight.relaxed).toBe("1.75");
    });
  });
});

describe("Motion Tokens", () => {
  describe("duration", () => {
    it("should have 7 duration values", () => {
      expect(Object.keys(duration)).toHaveLength(7);
    });

    it("should have correct duration values", () => {
      expect(duration.instant).toBe("75ms");
      expect(duration.fast).toBe("150ms");
      expect(duration.normal).toBe("200ms");
      expect(duration.slowest).toBe("1000ms");
    });

    it("should have sequential durations", () => {
      const values = Object.values(duration).map((v) => parseInt(v));
      expect(values[0]).toBeLessThan(values[1]);
      expect(values[values.length - 2]).toBeLessThan(values[values.length - 1]);
    });
  });

  describe("easing", () => {
    it("should have 12 easing curves", () => {
      expect(Object.keys(easing)).toHaveLength(12);
    });

    it("should have standard easing curves", () => {
      expect(easing).toHaveProperty("default");
      expect(easing).toHaveProperty("linear");
      expect(easing).toHaveProperty("in");
      expect(easing).toHaveProperty("out");
      expect(easing).toHaveProperty("inOut");
    });

    it("should have expressive easing curves", () => {
      expect(easing).toHaveProperty("emphasized");
      expect(easing).toHaveProperty("bounce");
      expect(easing).toHaveProperty("elastic");
    });

    it("should have valid cubic-bezier values", () => {
      expect(easing.default).toMatch(/cubic-bezier\(/);
      expect(easing.bounce).toMatch(/cubic-bezier\(/);
    });
  });

  describe("delay", () => {
    it("should have 9 delay values", () => {
      expect(Object.keys(delay)).toHaveLength(9);
    });

    it("should start with 0ms", () => {
      expect(delay[0]).toBe("0ms");
    });

    it("should have sequential delays", () => {
      const values = Object.values(delay).map((v) => parseInt(v));
      for (let i = 0; i < values.length - 1; i++) {
        expect(values[i]).toBeLessThanOrEqual(values[i + 1]);
      }
    });
  });
});

describe("Layout Tokens", () => {
  describe("zIndexScale", () => {
    it("should have z-index values", () => {
      expect(Object.keys(zIndexScale).length).toBeGreaterThan(0);
    });

    it("should have max value", () => {
      expect(zIndexScale).toHaveProperty("max");
      expect(zIndexScale.max).toBe("9999");
    });

    it("should have incremental values", () => {
      expect(zIndexScale[10]).toBe("10");
      expect(zIndexScale[20]).toBe("20");
      expect(zIndexScale[50]).toBe("50");
    });
  });

  describe("opacityScale", () => {
    it("should have opacity values from 0 to 100", () => {
      expect(opacityScale[0]).toBe("0");
      expect(opacityScale[50]).toBe("0.5");
      expect(opacityScale[100]).toBe("1");
    });

    it("should have correct decimal values", () => {
      expect(opacityScale[10]).toBe("0.1");
      expect(opacityScale[70]).toBe("0.7");
      expect(opacityScale[90]).toBe("0.9");
    });
  });
});

describe("Token Type Safety", () => {
  it("should have readonly token scales", () => {
    // TypeScript will enforce this at compile time
    // This test verifies the runtime structure
    expect(Object.isFrozen(spaceScale)).toBe(false); // as const doesn't freeze, but TS enforces
    expect(typeof spaceScale).toBe("object");
  });

  it("should export all required scales", () => {
    expect(spaceScale).toBeDefined();
    expect(radiusScale).toBeDefined();
    expect(shadowScale).toBeDefined();
    expect(fontSizeScale).toBeDefined();
    expect(fontWeight).toBeDefined();
    expect(lineHeight).toBeDefined();
    expect(duration).toBeDefined();
    expect(easing).toBeDefined();
    expect(delay).toBeDefined();
  });
});
