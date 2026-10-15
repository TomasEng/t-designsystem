import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

const meta: Meta = {
  title: "Komponenter/Faner",
  component: "t-tabs",
  tags: ["autodocs"],
  render: () => {
    return html`
      <t-tabs>
        <t-tab heading="Fane 1">Innhold 1</t-tab>
        <t-tab heading="Fane 2">Innhold 2</t-tab>
        <t-tab heading="Fane 3">Innhold 3</t-tab>
      </t-tabs>
    `;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: "Eksempel",
};
