import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const dirname =
  typeof import.meta.dirname !== "undefined" ? import.meta.dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    onConsoleLog(log) {
      if (
        log.trim() ===
        "Lit is in dev mode. Not recommended for production! See https://lit.dev/msg/dev-mode for more information."
      )
        return false;
    },
    projects: [
      {
        test: {
          name: "unit",
          environment: "node",
          include: ["src/**/*.test.ts"],
        },
      },
      {
        plugins: [storybookTest({ configDir: path.join(dirname, ".storybook") })],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
    reporters: ["default", "json"],
    outputFile: {
      json: "./test-results.json",
    },
  },
});
