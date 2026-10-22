import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    onConsoleLog(log) {
      if (
        log.trim() ===
        "Lit is in dev mode. Not recommended for production! See https://lit.dev/msg/dev-mode for more information."
      )
        return false;
    },
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({}),
      instances: [{ browser: "chromium" }],
    },
    reporters: ["default", "json"],
    outputFile: {
      json: "./test-results.json",
    },
    coverage: {
      enabled: true,
      include: ["src/**/*.ts"],
      reporter: ["text", "json-summary", "json"],
    },
  },
});
