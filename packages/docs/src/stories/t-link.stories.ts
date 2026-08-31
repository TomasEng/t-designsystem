import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

const meta: Meta = {
  title: "Komponenter/Lenke",
  component: "t-link",
  tags: ["autodocs"],
  render: () => {
    return html` <a class="t-link">Klikk på meg</a> `;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: "Standard",
};
