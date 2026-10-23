import { createExtendedStory } from "../utils/createExtendedStory.ts";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

const meta: Meta = {
  title: "Komponenter/Lenke",
  component: "t-link",
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  ...createExtendedStory({
    code: () => [
      {
        type: "class",
        element: "a",
        primaryClass: "t-link",
        secondaryClasses: {},
        attributes: {},
        reactName: "TLink",
        children: [{ type: "string", content: "Klikk på meg" }],
      },
    ],
  }),
  name: "Standard",
};
