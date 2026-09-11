import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

const meta: Meta = {
  title: "Komponenter/Panel",
  component: "t-panel",
  tags: ["autodocs"],
  render: () => {
    return html`<t-panel>Test</t-panel>`;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: "Standard",
};

export const WithHeading: Story = {
  name: "Med overskrift",
  argTypes: {
    heading: { control: "text" },
  },
  args: {
    heading: "Info",
  },
  render: (args) => {
    return html`
      <t-panel>
        <span slot="heading"> ${args.heading} </span>
        Lorem ipsum dolor sit amet
      </t-panel>
    `;
  },
};

export const WithHeadingAndIcon: Story = {
  name: "Med overskrift og ikon",
  argTypes: WithHeading.argTypes,
  args: WithHeading.args,
  render: (args) => {
    return html`
      <t-panel>
        <svg height="1em" slot="icon" viewbox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" fill="currentColor" r="12"></circle>
        </svg>
        <span slot="heading"> ${args.heading} </span>
        Lorem ipsum dolor sit amet
      </t-panel>
    `;
  },
};
