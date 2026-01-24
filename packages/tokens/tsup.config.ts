import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: false, // Don't clean - we generate CSS first
  splitting: false,
  sourcemap: true,
  treeshake: true,
});
