import type { StoryObj } from "@storybook/web-components-vite";
import type { StoryCode } from "./StoryCode.ts";

export type BasicStory = Omit<StoryObj, "render"> & { code: StoryCode };
