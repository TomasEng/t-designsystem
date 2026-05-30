import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import rootConfig from "../../eslint.config.mjs";

export default defineConfig([
  { extends: rootConfig },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
    rules: {
      "css/use-baseline": "off",
      "css/no-invalid-properties": "off",
    },
  },
  {
    ignores: ["storybook-static", "dist"],
  },
]);
