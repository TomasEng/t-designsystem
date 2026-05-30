import { html } from "lit";
import "./t-textfield.ts";
import { expect, fn, userEvent } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

const meta: Meta = {
  title: "Komponenter/Tekstfelt",
  component: "t-textfield",
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    value: {
      control: "text",
    },
  },
  render: (args) => {
    return html`
      <t-textfield label=${args.label} value=${args.value} ?disabled=${args.disabled} @t-input=${onInput} />
    `;
  },
};

export default meta;
type Story = StoryObj;

const onInput = fn();

export const Default: Story = {
  name: "Standard",
  args: {
    label: "Skriv noe her",
  },
  async play({ canvas }) {
    const field = canvas.getByShadowRole("textbox", { name: "Skriv noe her" });
    expect(field).toBeInTheDocument();
    const value = "Test";
    await userEvent.type(field, value);
    await expect(onInput).toHaveBeenCalledTimes(value.length);
  },
};

export const Disabled: Story = {
  name: "Deaktivert",
  args: {
    ...Default.args,
    value: "Tekst som ikke kan endres",
    disabled: true,
  },
  async play({ canvas }) {
    const field = canvas.getByShadowRole("textbox", { name: "Skriv noe her" });
    expect(field).toBeDisabled();
    await userEvent.type(field, "a");
    await expect(onInput).not.toHaveBeenCalled();
  },
};
