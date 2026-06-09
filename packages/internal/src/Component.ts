import type { Type } from "./Type.js";
import type { typeSpec } from "./typeSpec.js";

export type Component = WebComponent | ElementWithClass;

type WebComponent = {
  type: "web";
  name: string;
  attributes: Record<string, AttributeInfo>;
  events: Record<string, EventInfo>;
};

type ElementWithClass = {
  type: "class";
  className: string;
  variantClasses: Record<string, string[]>;
};

type AttributeInfo = {
  type: Type;
  default: unknown;
};

type EventInfo = {
  reactPropName: string;
  detailType: keyof typeof typeSpec;
};
