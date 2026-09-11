import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

const meta: Meta = {
  title: "Komponenter/Kode",
  component: "t-code",
  tags: ["autodocs"],
  render: () => {
    return html` <t-code code="const test: string = 'test';" language="typescript"></t-code> `;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: "Standard (på linje)",
};

export const Block: Story = {
  name: "Blokk",
  render: () => {
    return html`
      <t-code
        code="function test(): void {
  console.log('test');
}"
        language="typescript"
        mode="block"
      ></t-code>
    `;
  },
};

export const Panel: Story = {
  name: "Panel",
  render: () => {
    return html`
      <t-code
        code="function test(): void {
  console.log('test');
}"
        language="typescript"
        mode="panel"
      ></t-code>
    `;
  },
};

export const HeadingPanel: Story = {
  name: "Panel med overskrift",
  render: () => {
    return html`
      <t-code
        code="function test(): void {
  console.log('test');
}"
        language="typescript"
        mode="heading-panel"
      ></t-code>
    `;
  },
};
