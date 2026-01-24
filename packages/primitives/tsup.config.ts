import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  treeshake: true,
  external: ["react", "@staple-css/tokens"],
  onSuccess: async () => {
    // Copy CSS file to dist
    const srcCss = join(__dirname, "src", "primitives.css");
    const distCss = join(__dirname, "dist", "primitives.css");
    mkdirSync(dirname(distCss), { recursive: true });
    copyFileSync(srcCss, distCss);
    console.log("Copied primitives.css to dist/");
  },
});
