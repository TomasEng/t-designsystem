import { within as withinShadow } from "shadow-dom-testing-library";
import { styler } from "../src/decorators/styler";
import type { Preview } from "@storybook/web-components-vite";
import "../src/properties.css";
import "../src/elements/t-button/t-button.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
  decorators: styler,
  loaders: [
    async ({ canvasElement, canvas }): Promise<void> => {
      Object.assign(canvas, { ...withinShadow(canvasElement) });
    },
  ],
  args: {
    hue: 263,
  },
  argTypes: {
    hue: {
      control: {
        type: "range",
        min: 0,
        max: 360,
        step: 1,
      },
    },
  },
};

export default preview;
