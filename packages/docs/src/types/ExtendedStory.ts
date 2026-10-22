import type { Meta, StoryObj } from "@storybook/web-components-vite";

export type ExtendedStory = StoryObj & {
  htmlCode: (...parameters: Parameters<NonNullable<Meta["render"]>>) => string;
  reactCode: (...parameters: Parameters<NonNullable<Meta["render"]>>) => string;
};
