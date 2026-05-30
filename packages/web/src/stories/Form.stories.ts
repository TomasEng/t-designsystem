import { type TemplateResult, html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import "../elements/t-textfield";
import "../elements/t-button";

const meta = {
  title: "Eksempler/Skjema",
  render: (): TemplateResult => html`
    <form method="get">
      <t-textfield name="navn" label="Navn"></t-textfield>
      <t-button type="submit">Send inn</t-button>
    </form>
  `,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Example: Story = {
  args: {},
};
