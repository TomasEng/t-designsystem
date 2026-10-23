import { within } from "shadow-dom-testing-library";
import { expect, fn, userEvent } from "storybook/test";
import { createExtendedStory } from "../utils/createExtendedStory.ts";
import type { Meta } from "@storybook/web-components-vite";
import type { ExtendedStory } from "../types/ExtendedStory.ts";
import type { StoryCode } from "../types/StoryCode.ts";

const meta: Meta = {
  title: "Komponenter/Tekstfelt",
  component: "t-textfield",
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    value: { control: "text" },
  },
};

export default meta;

const code: StoryCode = (args) => [
  {
    type: "web",
    tagName: "t-textfield",
    attributes: { label: args.label, value: args.value, disabled: args.disabled },
    reactName: "TTextfield",
    children: [],
  },
];

const defaultStory: ExtendedStory = createExtendedStory({ code });

export const Default: ExtendedStory = {
  ...defaultStory,
  name: "Standard",
  args: {
    label: "Skriv noe her",
  },
  async play({ canvasElement }) {
    const onInput = fn();
    canvasElement.querySelector("t-textfield")?.addEventListener("t-input", onInput);
    const field = within(canvasElement).getByShadowRole("textbox", { name: "Skriv noe her" });
    await expect(field).toBeInTheDocument();
    const value = "Test";
    await userEvent.type(field, value);
    await expect(onInput).toHaveBeenCalledTimes(value.length);
  },
};

export const Disabled: ExtendedStory = {
  ...defaultStory,
  name: "Deaktivert",
  args: {
    ...Default.args,
    value: "Tekst som ikke kan endres",
    disabled: true,
  },
  async play({ canvasElement }) {
    const onInput = fn();
    canvasElement.querySelector("t-textfield")?.addEventListener("t-input", onInput);
    const field = within(canvasElement).getByShadowRole("textbox", { name: "Skriv noe her" });
    await expect(field).toBeDisabled();
    await userEvent.type(field, "a");
    await expect(onInput).not.toHaveBeenCalled();
  },
};
