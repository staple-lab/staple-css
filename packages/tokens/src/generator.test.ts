import { describe, it, expect } from "vitest";
import { generateCss, generatePreviewCss } from "./generator.js";
import { defaultConfig } from "./config.js";

describe("generateCss", () => {
  it("generates all CSS files", () => {
    const css = generateCss(defaultConfig);

    expect(css.tokens).toBeDefined();
    expect(css.themes).toBeDefined();
    expect(css.density).toBeDefined();
    expect(css.all).toBeDefined();
  });

  it("generates valid CSS with :root selector", () => {
    const css = generateCss(defaultConfig);

    expect(css.tokens).toContain(":root");
    expect(css.tokens).toContain("--st-space-");
    expect(css.tokens).toContain("--st-radius-");
    expect(css.tokens).toContain("--st-font-");
  });

  it("generates theme CSS with data-theme selectors", () => {
    const css = generateCss(defaultConfig);

    expect(css.themes).toContain('[data-theme="light"]');
    expect(css.themes).toContain('[data-theme="dark"]');
    expect(css.themes).toContain("--st-color-");
  });

  it("generates density CSS with data-density selectors", () => {
    const css = generateCss(defaultConfig);

    expect(css.density).toContain('[data-density="comfortable"]');
    expect(css.density).toContain('[data-density="compact"]');
    expect(css.density).toContain("--st-density-");
  });

  it("generates all.css with imports", () => {
    const css = generateCss(defaultConfig);

    expect(css.all).toContain('@import "./tokens.css"');
    expect(css.all).toContain('@import "./themes.css"');
    expect(css.all).toContain('@import "./density.css"');
  });

  it("includes config name and version in comments", () => {
    const css = generateCss(defaultConfig);

    expect(css.tokens).toContain(defaultConfig.name);
    expect(css.tokens).toContain(defaultConfig.version);
  });

  it("uses kebab-case for CSS variable names", () => {
    const css = generateCss(defaultConfig);

    expect(css.themes).toContain("--st-color-surface-raised");
    expect(css.themes).toContain("--st-color-text-muted");
    expect(css.themes).toContain("--st-color-primary-hover");
  });

  it("includes prefers-color-scheme media query", () => {
    const css = generateCss(defaultConfig);

    expect(css.themes).toContain("@media (prefers-color-scheme: dark)");
  });

  it("generates palette CSS when palettes exist", () => {
    const configWithPalettes = {
      ...defaultConfig,
      palettes: [
        {
          name: "brand",
          baseColor: "#2563eb",
          steps: Array(12).fill("#000000") as [string, string, string, string, string, string, string, string, string, string, string, string],
        },
      ],
    };

    const css = generateCss(configWithPalettes);
    expect(css.palettes).toBeDefined();
    expect(css.palettes).toContain("--st-brand-");
  });
});

describe("generatePreviewCss", () => {
  it("generates space preview", () => {
    const preview = generatePreviewCss("space", defaultConfig);

    expect(preview).toContain(":root");
    expect(preview).toContain("--st-space-0");
    expect(preview).toContain("--st-space-8");
  });

  it("generates radius preview", () => {
    const preview = generatePreviewCss("radius", defaultConfig);

    expect(preview).toContain("--st-radius-0");
    expect(preview).toContain("--st-radius-4");
  });

  it("generates typography preview", () => {
    const preview = generatePreviewCss("typography", defaultConfig);

    expect(preview).toContain("--st-font-sans");
    expect(preview).toContain("--st-font-size-");
    expect(preview).toContain("--st-leading-");
    expect(preview).toContain("--st-font-weight-");
  });

  it("generates colors preview", () => {
    const preview = generatePreviewCss("colors", defaultConfig);

    expect(preview).toContain('[data-theme="light"]');
    expect(preview).toContain('[data-theme="dark"]');
    expect(preview).toContain("--st-color-");
  });

  it("generates density preview", () => {
    const preview = generatePreviewCss("density", defaultConfig);

    expect(preview).toContain('[data-density="comfortable"]');
    expect(preview).toContain('[data-density="compact"]');
  });

  it("generates motion preview", () => {
    const preview = generatePreviewCss("motion", defaultConfig);

    expect(preview).toContain("--st-duration-");
    expect(preview).toContain("--st-easing-");
  });

  it("returns empty string for unknown category", () => {
    // @ts-expect-error Testing invalid input
    const preview = generatePreviewCss("invalid", defaultConfig);
    expect(preview).toBe("");
  });
});
