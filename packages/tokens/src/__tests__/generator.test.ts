import { describe, it, expect } from "vitest";
import { validateConfig } from "../generator.js";

describe("Token Generator", () => {
  describe("validateConfig", () => {
    it("should validate a valid config", () => {
      const config = {
        prefix: "st",
        colors: {
          primary: "#2563eb",
        },
        space: {
          0: "0",
          1: "0.25rem",
        },
      };

      const result = validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it("should reject invalid color values", () => {
      const config: any = {
        prefix: "st",
        colors: {
          primary: "not-a-color",
        },
      };

      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.length).toBeGreaterThan(0);
    });

    it("should allow empty config sections", () => {
      const config = {
        prefix: "st",
        colors: {},
      };

      const result = validateConfig(config);
      expect(result.valid).toBe(true);
    });

    it("should reject non-object configs", () => {
      const result = validateConfig(null);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Config must be an object");
    });

    it("should validate space tokens", () => {
      const config = {
        space: {
          0: "0",
          1: "0.25rem",
        },
      };

      const result = validateConfig(config);
      expect(result.valid).toBe(true);
    });

    it("should validate radius tokens", () => {
      const config = {
        radius: {
          0: "0",
          sm: "0.125rem",
        },
      };

      const result = validateConfig(config);
      expect(result.valid).toBe(true);
    });

    it("should validate shadow tokens", () => {
      const config = {
        shadow: {
          none: "none",
          sm: "0 1px 2px rgba(0,0,0,0.05)",
        },
      };

      const result = validateConfig(config);
      expect(result.valid).toBe(true);
    });

    it("should reject invalid space config", () => {
      const config = {
        space: "invalid",
      };

      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("space must be an object");
    });

    it("should handle multiple validation errors", () => {
      const config = {
        colors: {
          primary: "not-a-color",
          secondary: "also-invalid",
        },
      };

      const result = validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors?.length).toBeGreaterThanOrEqual(2);
    });
  });
});
