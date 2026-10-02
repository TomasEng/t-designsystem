import type { Component } from "./Component.js";
import type { Type } from "./Type.ts";

export const componentSpec: Component[] = [
  {
    type: "class",
    htmlElement: "button",
    className: "t-button",
    variantClasses: {
      variant: ["default", "transparent", "link", "without-background"],
    },
  },
  {
    type: "class",
    htmlElement: "a",
    className: "t-link",
    variantClasses: {},
  },
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
  {
    type: "web",
    name: "t-code",
    attributes: {
      code: {
        type: { kind: "string" },
        default: "",
      },
      language: {
        type: { kind: "string" },
        default: "",
      },
      mode: {
        type: { kind: "reference", name: "TCodeDisplayMode" },
        default: "inline",
      },
      trimmargin: {
        type: { kind: "boolean" },
        default: false,
      },
      copyButtonTitle: {
        type: { kind: "string" },
        default: "Kopier kode",
      },
    },
    events: {},
  },
  {
    type: "web",
    name: "t-panel",
    attributes: {},
    events: {},
  },
];

export const subtypes: Record<string, Type> = {
  TCodeDisplayMode: {
    kind: "union",
    types: [
      { kind: "constant", value: "inline" },
      { kind: "constant", value: "block" },
      { kind: "constant", value: "panel" },
      { kind: "constant", value: "heading-panel" },
    ],
  },
};
