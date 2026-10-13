import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
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
