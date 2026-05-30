import { defineConfig, globalIgnores } from "eslint/config";
import react from "eslint-plugin-react";
import rootConfig from "../../eslint.config.mjs";

export default defineConfig([
  {
    extends: rootConfig,
    plugins: { react },
  },
  globalIgnores(["dist", "node_modules", "package.json"]),
]);
