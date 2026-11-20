import { createExtendedStory } from "../utils/createExtendedStory.ts";
import type { Meta } from "@storybook/web-components-vite";
import type { TIframeResizeMode } from "tomas-designsystem-react";
import type { ExtendedStory } from "../types/ExtendedStory.ts";

const meta: Meta = {
  title: "Komponenter/Ramme",
  component: "t-iframe",
  argTypes: {
    src: {
      control: "text",
    },
    srcdoc: {
      control: "text",
    },
    resize: {
      control: "radio",
      options: ["none", "horizontal", "vertical", "both"] satisfies TIframeResizeMode[],
    },
  },
};

export default meta;

export const Default: ExtendedStory = {
  ...createExtendedStory({
    code: (args) => [
      {
        type: "web",
        tagName: "t-iframe",
        attributes: { srcdoc: args.srcdoc, src: args.src, resize: args.resize, title: "Eksempelinnhold" },
        reactName: "TIframe",
        children: [],
      },
    ],
  }),
  name: "Standard",
  args: { resize: "none", srcdoc: "<p>Lorem ipsum dolor sit amet</p>" },
};

export const Resizable: ExtendedStory = {
  ...Default,
  name: "Justerbar størrelse",
  args: { resize: "both", srcdoc: "<p>Lorem ipsum dolor sit amet</p>" },
};
