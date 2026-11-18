import { createExtendedStory } from "../utils/createExtendedStory.ts";
import type { Meta } from "@storybook/web-components-vite";
import type { ExtendedStory } from "../types/ExtendedStory.ts";
import type { TNode } from "../utils/CodeGenerator/CodeGenerator.ts";

const meta: Meta = {
  title: "Komponenter/Overskrift",
  component: "t-heading",
};

export default meta;

const heading = (level: number, attributes: Record<string, string> = {}, children: TNode[] = []): TNode => ({
  type: "web",
  tagName: "t-heading",
  reactName: "THeading",
  attributes: { level, ...attributes },
  children: [{ type: "string", content: `Overskrift på nivå ${level}` }, ...children],
});

export const Default: ExtendedStory = {
  ...createExtendedStory({ code: (args) => [heading(args.level)] }),
  name: "Standard",
  argTypes: { level: { control: "select", options: [1, 2, 3, 4, 5, 6] } },
  args: { level: 1 },
};

export const AllLevels: ExtendedStory = {
  ...createExtendedStory({ code: () => [1, 2, 3, 4, 5, 6].map((level) => heading(level)) }),
  name: "Alle nivåer",
};

export const WithAnchor: ExtendedStory = {
  ...createExtendedStory({ code: () => [heading(2, { id: "eksempel" })] }),
  name: "Med ankerlenke",
};

export const WithNote: ExtendedStory = {
  ...createExtendedStory({
    code: () => [
      heading(2, { id: "eksempel" }, [
        {
          type: "native",
          element: "p",
          attributes: { slot: "note" },
          children: [{ type: "string", content: "Utfyllende informasjon om overskriften." }],
        },
      ]),
    ],
  }),
  name: "Med merknad",
};
