import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import type { StoryObj } from "@storybook/web-components-vite";

export const styler: StoryObj["decorators"] = (story, { args, globals }) => {
  const styles = {
    "--t-base-hue": `${args.hue}deg`,
    "--t-mode-colour-scaling": `${globals.backgrounds.value === "dark" ? "-1" : "1"}`,
  };
  return html` <div class="t-styler" style="${styleMap(styles)}">${story()}</div> `;
};
