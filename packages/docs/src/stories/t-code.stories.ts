import { createExtendedStory } from "../utils/createExtendedStory.ts";
import type { Meta } from "@storybook/web-components-vite";
import type { ExtendedStory } from "../types/ExtendedStory.ts";
import type { TNode } from "../utils/CodeGenerator/CodeGenerator.ts";

const meta: Meta = {
  title: "Komponenter/Kode",
  component: "t-code",
};

export default meta;

const node: TNode = {
  type: "web",
  tagName: "t-code",
  attributes: { code: "const test: string = 'test';", language: "typescript" },
  reactName: "TCode",
  children: [],
};

export const Default: ExtendedStory = {
  ...createExtendedStory({ code: () => [node] }),
  name: "Standard (på linje)",
};

export const Block: ExtendedStory = {
  ...createExtendedStory({
    code: () => [
      {
        ...node,
        attributes: {
          code: "|function test(): void {\n      |  console.log('test');\n      |}",
          language: "typescript",
          mode: "block",
          trimmargin: true,
        },
      },
    ],
  }),
  name: "Blokk",
};

export const Panel: ExtendedStory = {
  ...createExtendedStory({
    code: () => [
      {
        ...node,
        attributes: {
          code: "|function test(): void {\n      |  console.log('test');\n      |}",
          language: "typescript",
          mode: "panel",
          trimmargin: true,
        },
      },
    ],
  }),
  name: "Panel",
};

export const HeadingPanel: ExtendedStory = {
  ...createExtendedStory({
    name: "Panel med overskrift",
    code: () => [
      {
        ...node,
        attributes: {
          code: "|function test(): void {\n      |  console.log('test');\n      |}",
          language: "typescript",
          mode: "heading-panel",
          trimmargin: true,
        },
      },
    ],
  }),
  name: "Panel med overskrift",
};
