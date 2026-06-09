import type { Component } from "./Component.js";

export const componentSpec: Component[] = [
  {
    type: "web",
    name: "t-textfield",
    attributes: {
      name: {
        type: { kind: "string" },
        default: "",
      },
      label: {
        type: { kind: "string" },
        default: "",
      },
      value: {
        type: { kind: "string" },
        default: "",
      },
      disabled: {
        type: { kind: "boolean" },
        default: false,
      },
    },
    events: {
      "t-input": {
        reactPropName: "onTInput",
        detailType: "TInputEvent",
      },
      "t-change": {
        reactPropName: "onTChange",
        detailType: "TInputEvent",
      },
      "t-keydown": {
        reactPropName: "onTKeydown",
        detailType: "TKeyboardEvent",
      },
      "t-keyup": {
        reactPropName: "onTKeyup",
        detailType: "TKeyboardEvent",
      },
      "t-focus": {
        reactPropName: "onTFocus",
        detailType: "TFocusEvent",
      },
      "t-blur": {
        reactPropName: "onTBlur",
        detailType: "TFocusEvent",
      },
    },
  },
];
