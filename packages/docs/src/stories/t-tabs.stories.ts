import { createExtendedStory } from "../utils/createExtendedStory.ts";
import type { Meta } from "@storybook/web-components-vite";
import type { ExtendedStory } from "../types/ExtendedStory.ts";

const meta: Meta = {
  title: "Komponenter/Faner",
  component: "t-tabs",
};

export default meta;

export const Default: ExtendedStory = {
  ...createExtendedStory({
    code: () => [
      {
        type: "web",
        tagName: "t-tabs",
        attributes: {},
        reactName: "TTabs",
        children: [1, 2, 3].map((number) => ({
          type: "web",
          tagName: "t-tab",
          attributes: { heading: `Fane ${number}` },
          reactName: "TTab",
          children: [{ type: "string", content: `Innhold ${number}` }],
        })),
      },
    ],
  }),
  name: "Eksempel",
};
