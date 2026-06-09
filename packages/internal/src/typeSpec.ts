import type { Type } from "./Type.js";

export const typeSpec = {
  TInputEvent: {
    kind: "object",
    properties: {
      value: { kind: "string" },
    },
    requiredProperties: ["value"],
  },
  TKeyboardEvent: {
    kind: "object",
    properties: {
      value: { kind: "string" },
      key: { kind: "string" },
    },
    requiredProperties: ["value", "key"],
  },
  TFocusEvent: {
    kind: "object",
    properties: {
      value: { kind: "string" },
    },
    requiredProperties: ["value"],
  },
} satisfies Record<string, Type>;
