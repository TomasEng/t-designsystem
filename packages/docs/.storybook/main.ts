import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@chromatic-com/storybook", "@storybook/addon-vitest", "@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: "@storybook/web-components-vite",
  async viteFinal(config) {
    config.plugins = config.plugins || [];
    config.plugins.push({
      name: "force-full-reload-for-web-components",
      handleHotUpdate({ file, server }) {
        if (file.includes("/src/")) {
          server.ws.send({
            type: "full-reload",
            path: "*",
          });
          return [];
        }
      },
    });

    return config;
  },
};
export default config;
