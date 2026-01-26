import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entry: ["src/index.ts", "src/core.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  treeshake: true,
  external: ["react", "@staple-css/tokens"],
  onSuccess: async () => {
    // Copy CSS files to dist
    const srcPrimitives = join(__dirname, "src", "primitives.css");
    const distPrimitives = join(__dirname, "dist", "primitives.css");
    mkdirSync(dirname(distPrimitives), { recursive: true });
    copyFileSync(srcPrimitives, distPrimitives);
    console.log("Copied primitives.css to dist/");

    const srcCore = join(__dirname, "src", "core.css");
    const distCore = join(__dirname, "dist", "core.css");
    copyFileSync(srcCore, distCore);
    console.log("Copied core.css to dist/");
  },
});
