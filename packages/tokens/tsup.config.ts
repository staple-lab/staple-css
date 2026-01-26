import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/config.ts",
    "src/generator.ts",
    "src/color/index.ts",
    "src/dynamic-theme.ts",
  ],
  format: ["esm"],
  dts: true,
  clean: false, // Don't clean - we generate CSS first
  splitting: false,
  sourcemap: true,
  treeshake: true,
  external: ["zod"],
});
