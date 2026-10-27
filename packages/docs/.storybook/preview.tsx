import { DocsContainer } from "@storybook/addon-docs/blocks";
import * as React from "react";
import { within as withinShadow } from "shadow-dom-testing-library";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import { themes } from "storybook/theming";
import { styler } from "../src/decorators/styler";
import type { DocsContainerProps } from "@storybook/addon-docs/blocks";
import type { Preview } from "@storybook/web-components-vite";
import "../../web/src/properties.css";
import "../../web/src/index.ts";

const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const preview: Preview = {
  initialGlobals: {
    backgrounds: {
      value: isDarkMode ? "dark" : "light",
    },
  },
  parameters: {
    backgrounds: {
      options: {
        light: { name: "light", value: "oklch(var(--t-colour-page-background-lightness-light) 0 0)" },
        dark: { name: "dark", value: "oklch(var(--t-colour-page-background-lightness-dark) 0 0)" },
      },
    },
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
      container: ThemedDocsContainer,
    },
    a11y: { test: "error" },
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

function ThemedDocsContainer({ children, context }: React.PropsWithChildren<DocsContainerProps>): React.JSX.Element {
  const { channel } = context;
  const subscribe = React.useCallback(
    (onChange: () => void): (() => void) => {
      channel.on(GLOBALS_UPDATED, onChange);
      return () => channel.off(GLOBALS_UPDATED, onChange);
    },
    [channel],
  );
  const dark = React.useSyncExternalStore(
    subscribe,
    () =>
      (channel.last(GLOBALS_UPDATED)?.[0]?.globals?.backgrounds?.value ?? (isDarkMode ? "dark" : "light")) === "dark",
  );

  return (
    <div className="t-styler" style={{ "--t-mode-colour-scaling": dark ? -1 : 1 } as React.CSSProperties}>
      <DocsContainer
        context={context}
        theme={dark ? { ...themes.dark, appContentBg: "var(--t-colour-page-background)" } : themes.light}
      >
        {children}
      </DocsContainer>
    </div>
  );
}

export default preview;
