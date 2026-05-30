import { html } from "lit";
import "./t-button.ts";
import { expect, fn, userEvent } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import type { TButtonVariant } from "./t-button.ts";

const meta: Meta = {
  title: "Komponenter/Knapp",
  component: "t-button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "link", "without-background", "transparent"] satisfies TButtonVariant[],
    },
    disabled: {
      control: "boolean",
    },
  },
  render: (args) => {
    return html`
      <button class="t-button ${args.variant}" ?disabled=${args.disabled} @click=${onClick}>Klikk på meg</button>
    `;
  },
};

export default meta;
type Story = StoryObj;

const onClick = fn();

export const Default: Story = {
  name: "Standard",
  args: {
    variant: "default",
  },
  async play({ canvas }) {
    const button = canvas.getByRole("button", { name: "Klikk på meg" });
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await expect(onClick).toHaveBeenCalledOnce();
  },
};

export const Transparent: Story = {
  ...Default,
  name: "Gjennomsiktig",
  args: {
    variant: "transparent",
  },
};

export const Link: Story = {
  ...Default,
  name: "Som lenke",
  args: {
    variant: "link",
  },
};

export const WithoutBackground: Story = {
  ...Default,
  name: "Uten bakgrunn",
  args: {
    variant: "without-background",
  },
};

export const Disabled: Story = {
  ...Default,
  name: "Deaktivert",
  args: {
    ...Default.args,
    disabled: true,
  },
  async play({ canvas }) {
    const button = canvas.getByRole("button", { name: "Klikk på meg" });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(onClick).not.toHaveBeenCalled();
  },
};
