import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import { configs as tseslintConfigs } from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  {
    files: ["**/*.{ts,tsx,mts}"],
    extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript, tseslintConfigs.recommended],
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
          named: { types: "types-last" },
          alphabetize: { order: "asc" },
          sortTypesGroup: true,
          "newlines-between": "never",
          "newlines-between-types": "never",
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  {
    ignores: [
      "**/coverage/*",
      "**/dist/*",
      "**/node_modules/*",
      "**/package.json",
      "**/storybook-static/*",
      "package-lock.json",
      "pnpm-lock.yaml",
      "pnpm-workspace.yaml",
    ],
  },
]);
