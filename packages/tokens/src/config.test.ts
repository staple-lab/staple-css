import { describe, it, expect } from "vitest";
import {
  validateConfig,
  mergeConfig,
  defaultConfig,
  configToJson,
  configFromJson,
  type TokenConfig,
} from "./config.js";

describe("config validation", () => {
  it("validates default config", () => {
    const result = validateConfig(defaultConfig);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(defaultConfig);
  });

  it("rejects invalid hex colors", () => {
    const invalid = {
      ...defaultConfig,
      colors: {
        ...defaultConfig.colors,
        light: {
          ...defaultConfig.colors.light,
          primary: "not-a-color",
        },
      },
    };
    const result = validateConfig(invalid);
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
  });

  it("rejects invalid CSS lengths", () => {
    const invalid = {
      ...defaultConfig,
      space: {
        ...defaultConfig.space,
        1: "invalid",
      },
    };
    const result = validateConfig(invalid);
    expect(result.success).toBe(false);
  });

  it("accepts valid hex colors with alpha", () => {
    const config = {
      ...defaultConfig,
      colors: {
        ...defaultConfig.colors,
        light: {
          ...defaultConfig.colors.light,
          primary: "#2563ebff",
        },
      },
    };
    const result = validateConfig(config);
    expect(result.success).toBe(true);
  });
});

describe("mergeConfig", () => {
  it("uses defaults when no partial provided", () => {
    const merged = mergeConfig({});
    expect(merged.space[0]).toBe(defaultConfig.space[0]);
    expect(merged.space[1]).toBe(defaultConfig.space[1]);
  });

  it("overrides space scale completely when provided", () => {
    const partial = {
      space: {
        0: "0",
        1: "0.5rem",
        2: "1rem",
        3: "1.5rem",
        4: "2rem",
        5: "3rem",
        6: "4rem",
        7: "5rem",
        8: "6rem",
      },
    };
    const merged = mergeConfig(partial as Partial<TokenConfig>);
    expect(merged.space[1]).toBe("0.5rem");
  });

  it("deep merges colors", () => {
    const partial = {
      colors: {
        light: {
          primary: "#ff0000",
        },
      },
    };
    const merged = mergeConfig(partial as Partial<TokenConfig>);
    expect(merged.colors.light.primary).toBe("#ff0000");
    expect(merged.colors.light.background).toBe(defaultConfig.colors.light.background);
    expect(merged.colors.dark.primary).toBe(defaultConfig.colors.dark.primary);
  });

  it("keeps default typography when no override", () => {
    const merged = mergeConfig({});
    expect(merged.typography.fontFamily.sans).toBe(defaultConfig.typography.fontFamily.sans);
    expect(merged.typography.fontFamily.mono).toBe(defaultConfig.typography.fontFamily.mono);
  });
});

describe("JSON serialization", () => {
  it("roundtrips config through JSON", () => {
    const json = configToJson(defaultConfig);
    const parsed = configFromJson(json);
    expect(parsed).toEqual(defaultConfig);
  });

  it("throws on invalid JSON config", () => {
    const invalidJson = JSON.stringify({ invalid: true });
    expect(() => configFromJson(invalidJson)).toThrow();
  });
});
