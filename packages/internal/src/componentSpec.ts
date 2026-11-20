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
    name: "t-heading",
    attributes: {
      level: {
        type: { kind: "reference", name: "THeadingLevel" },
        default: 1,
      },
    },
    events: {},
  },
  {
    type: "web",
    name: "t-iframe",
    attributes: {
      src: {
        type: { kind: "string" },
        default: undefined,
      },
      srcdoc: {
        type: { kind: "string" },
        default: undefined,
      },
      resize: {
        type: { kind: "reference", name: "TIframeResizeMode" },
        default: "none",
      },
      title: {
        type: { kind: "string" },
        default: "",
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
  {
    type: "web",
    name: "t-tabs",
    attributes: {},
    events: {},
  },
  {
    type: "web",
    name: "t-tab",
    attributes: {
      heading: {
        type: { kind: "string" },
        default: "",
      },
      name: {
        type: { kind: "string" },
        default: "",
      },
    },
    events: {},
  },
];

export const subtypes: Record<string, Type> = {
  THeadingLevel: {
    kind: "union",
    types: [
      { kind: "constant", value: 1 },
      { kind: "constant", value: 2 },
      { kind: "constant", value: 3 },
      { kind: "constant", value: 4 },
      { kind: "constant", value: 5 },
      { kind: "constant", value: 6 },
    ],
  },
  TIframeResizeMode: {
    kind: "union",
    types: [
      { kind: "constant", value: "none" },
      { kind: "constant", value: "horizontal" },
      { kind: "constant", value: "vertical" },
      { kind: "constant", value: "both" },
    ],
  },
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
