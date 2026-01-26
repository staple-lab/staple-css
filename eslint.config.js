// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config({
  ignores: ["**/dist/**", "**/node_modules/**", "**/*.css"],
}, {
  files: ["**/*.{ts,tsx}"],
  extends: [...tseslint.configs.recommended],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "no-console": ["warn", { allow: ["warn", "error"] }],
  },
}, storybook.configs["flat/recommended"]);
