import { createExtendedStory } from "../utils/createExtendedStory.ts";
import type { Meta } from "@storybook/web-components-vite";
import type { ExtendedStory } from "../types/ExtendedStory.ts";
import type { TNode } from "../utils/CodeGenerator/CodeGenerator.ts";

const meta: Meta = {
  title: "Komponenter/Panel",
  component: "t-panel",
};

export default meta;

const node: TNode = {
  type: "web",
  tagName: "t-panel",
  attributes: {},
  reactName: "TPanel",
  children: [{ type: "string", content: "Test" }],
};

const heading: (text: string) => TNode = (text) => ({
  type: "native",
  element: "span",
  attributes: { slot: "heading" },
  children: [{ type: "string", content: text }],
});

export const Default: ExtendedStory = {
  ...createExtendedStory({ code: () => [node] }),
  name: "Standard",
};

export const WithHeading: ExtendedStory = {
  ...createExtendedStory({
    code: (args) => [
      {
        ...node,
        children: [heading(args.heading), { type: "string", content: "Lorem ipsum dolor sit amet" }],
      },
    ],
  }),
  name: "Med overskrift",
  argTypes: { heading: { control: "text" } },
  args: { heading: "Info" },
};

export const WithHeadingAndIcon: ExtendedStory = {
  ...createExtendedStory({
    code: (args) => [
      {
        ...node,
        children: [
          {
            type: "native",
            element: "svg",
            attributes: {
              height: "1em",
              slot: "icon",
              viewBox: "0 0 24 24",
              width: "1em",
              xmlns: "http://www.w3.org/2000/svg",
            },
            children: [
              {
                type: "native",
                element: "circle",
                attributes: { cx: 12, cy: 12, fill: "currentColor", r: 12 },
                children: [],
              },
            ],
          },
          heading(args.heading),
          { type: "string", content: "Lorem ipsum dolor sit amet" },
        ],
      },
    ],
  }),
  name: "Med overskrift og ikon",
  argTypes: WithHeading.argTypes,
  args: WithHeading.args,
};
