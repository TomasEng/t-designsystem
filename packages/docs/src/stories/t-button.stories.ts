import { expect } from "storybook/test";
import { createExtendedStory } from "../utils/createExtendedStory.ts";
import type { Meta } from "@storybook/web-components-vite";
import type { TButtonVariant } from "tomas-designsystem-react";
import type { ExtendedStory } from "../types/ExtendedStory.ts";
import type { StoryCode } from "../types/StoryCode.ts";

const meta: Meta = {
  title: "Komponenter/Knapp",
  component: "t-button",
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "link", "without-background", "transparent"] satisfies TButtonVariant[],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

const code: StoryCode = (args) => [
  {
    type: "class",
    element: "button",
    primaryClass: "t-button",
    secondaryClasses: { variant: args.variant },
    attributes: { disabled: args.disabled },
    reactName: "TButton",
    children: [{ type: "string", content: "Klikk på meg" }],
  },
];

export const Default: ExtendedStory = createExtendedStory({
  name: "Standard",
  args: {
    variant: "default",
  },
  async play({ canvas }) {
    const button = canvas.getByRole("button", { name: "Klikk på meg" });
    await expect(button).toBeInTheDocument();
  },
  code,
});

export const Transparent: ExtendedStory = {
  ...Default,
  name: "Gjennomsiktig",
  args: {
    variant: "transparent",
  },
};

export const Link: ExtendedStory = {
  ...Default,
  name: "Som lenke",
  args: {
    variant: "link",
  },
};

export const WithoutBackground: ExtendedStory = {
  ...Default,
  name: "Uten bakgrunn",
  args: {
    variant: "without-background",
  },
};

export const Disabled: ExtendedStory = {
  ...Default,
  name: "Deaktivert",
  args: {
    ...Default.args,
    disabled: true,
  },
  async play({ canvas }) {
    const button = canvas.getByRole("button", { name: "Klikk på meg" });
    await expect(button).toBeInTheDocument();
    await expect(button).toBeDisabled();
  },
};
