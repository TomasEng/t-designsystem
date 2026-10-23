import { describe, it, expect } from "vitest";
import { StoriesUtils } from "./StoriesUtils.ts";
import type { ExtendedStory } from "../types/ExtendedStory.ts";
import type { StoriesModule } from "../types/StoriesModule.ts";

const storiesModule = {
  default: {
    title: "Components/Actions/Button",
    component: "t-button",
  },
  Default: {
    name: "Default button",
    args: { disabled: false },
    htmlCode: (): string => "<button>Click me</button>",
    reactCode: (): string => "<TButton>Click me</TButton>",
  } satisfies ExtendedStory,
  Disabled: {
    name: "Disabled button",
    args: { disabled: true },
    htmlCode: (): string => "<button disabled>Click me</button>",
    reactCode: (): string => "<TButton disabled>Click me</TButton>",
  } satisfies ExtendedStory,
  RegularStory: { args: { disabled: false } },
  HtmlOnly: { htmlCode: (): string => "<button>Click me</button>" },
  ReactOnly: { reactCode: (): string => "<TButton>Click me</TButton>" },
  nullExport: null,
  undefinedExport: undefined,
  stringExport: "Button helpers",
  numberExport: 42,
  booleanExport: false,
  functionExport: (): string => "helper",
} satisfies StoriesModule;

describe("StoriesUtils", () => {
  describe("extractExtendedStories", () => {
    it("Returns only extended stories", () => {
      expect(StoriesUtils.extractExtendedStories(storiesModule)).toEqual({
        Default: storiesModule.Default,
        Disabled: storiesModule.Disabled,
      });
    });
  });

  describe("extractTitle", () => {
    it("Returns the last part of the default title", () => {
      expect(StoriesUtils.extractTitle(storiesModule)).toBe("Button");
    });

    it("Returns an empty string when the default export has no title", () => {
      const module: StoriesModule = { ...storiesModule, default: {} };
      expect(StoriesUtils.extractTitle(module)).toBe("");
    });

    it("Returns an empty string when there is no default export", () => {
      expect(StoriesUtils.extractTitle({})).toBe("");
    });
  });
});
