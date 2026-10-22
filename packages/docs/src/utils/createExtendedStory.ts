import { html, type TemplateResult } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { CodeGenerator } from "./CodeGenerator/CodeGenerator.ts";
import type { StoryObj } from "@storybook/web-components-vite";
import type { BasicStory } from "../types/BasicStory.ts";
import type { ExtendedStory } from "../types/ExtendedStory.ts";

export function createExtendedStory({ code, ...story }: BasicStory): ExtendedStory {
  const htmlCode = (...parameters: Parameters<NonNullable<StoryObj["render"]>>): string => {
    const codeGenerator = new CodeGenerator(code(...parameters));
    return codeGenerator.generateHtml();
  };
  const reactCode = (...parameters: Parameters<NonNullable<StoryObj["render"]>>): string => {
    const codeGenerator = new CodeGenerator(code(...parameters));
    return codeGenerator.generateReact();
  };
  const render = (...parameters: Parameters<NonNullable<StoryObj["render"]>>): TemplateResult<1> => {
    const codeGenerator = new CodeGenerator(code(...parameters));
    return html`${unsafeHTML(codeGenerator.generateHtml())}`;
  };
  return { ...story, htmlCode, reactCode, render };
}
