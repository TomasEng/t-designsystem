import type { StoryObj } from "@storybook/web-components-vite";
import type { TNode } from "../utils/CodeGenerator/CodeGenerator.ts";

export type StoryCode = (...parameters: Parameters<NonNullable<StoryObj["render"]>>) => TNode[];
