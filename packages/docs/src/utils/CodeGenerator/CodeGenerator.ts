import { ObjectUtils } from "../ObjectUtils.ts";
import {
  HtmlOrJsxCodeGenerator,
  type HtmlOrJsxNode,
  type HtmlOrJsxNodes,
  type HtmlOrJsxTag,
} from "./HtmlOrJsxCodeGenerator.ts";

export type TNode = TNodeWeb | TNodeClass | TNodeNative | TNodeString;
type TNodeInputs = {
  attributes: Record<string, string | number | boolean | undefined>;
  children: TNode[];
};

type TNodeWeb = {
  type: "web";
  tagName: string;
  reactName: string;
} & TNodeInputs;

type TNodeClass = {
  type: "class";
  element: string;
  reactName: string;
  primaryClass: string;
  secondaryClasses: Record<string, string | number | boolean | undefined>;
} & TNodeInputs;

type TNodeNative = {
  type: "native";
  element: string;
} & TNodeInputs;

type TNodeString = {
  type: "string";
  content: string;
};

export class CodeGenerator {
  #nodes: TNode[];

  constructor(nodes: TNode[]) {
    this.#nodes = nodes;
  }

  public generateHtml(): string {
    const htmlStructures = nodesToHtmlStructures(this.#nodes);
    return new HtmlOrJsxCodeGenerator(htmlStructures).generateHtml();
  }

  public generateReact(): string {
    const reactStructures = nodesToReactStructures(this.#nodes);
    return new HtmlOrJsxCodeGenerator(reactStructures).generateJsx();
  }
}

function nodesToHtmlStructures(nodes: TNode[]): HtmlOrJsxNodes {
  return nodes.map(nodeToHtmlStructure);
}

function nodesToReactStructures(nodes: TNode[]): HtmlOrJsxNodes {
  return nodes.map(nodeToReactStructure);
}

function nodeToHtmlStructure(node: TNode): HtmlOrJsxNode {
  switch (node.type) {
    case "web":
      return webNodeToHtmlStructure(node);
    case "class":
      return classNodeToHtmlStructure(node);
    case "native":
      return nativeNodeToHtmlStructure(node);
    case "string":
      return node.content;
  }
}

function nodeToReactStructure(node: TNode): HtmlOrJsxNode {
  switch (node.type) {
    case "web":
      return webNodeToReactStructure(node);
    case "class":
      return classNodeToReactStructure(node);
    case "native":
      return nativeNodeToReactStructure(node);
    case "string":
      return node.content;
  }
}

function webNodeToHtmlStructure(node: TNodeWeb): HtmlOrJsxTag {
  return {
    name: node.tagName,
    attributes: node.attributes,
    children: node.children.map(nodeToHtmlStructure),
  };
}

function webNodeToReactStructure(node: TNodeWeb): HtmlOrJsxTag {
  return {
    name: node.reactName,
    attributes: node.attributes,
    children: node.children.map(nodeToReactStructure),
  };
}

function classNodeToHtmlStructure(node: TNodeClass): HtmlOrJsxTag {
  const secondaryClasses = Object.values(ObjectUtils.removeUndefined(node.secondaryClasses));
  const classes = [
    node.primaryClass,
    ...secondaryClasses,
    ...(node.attributes.class ? [node.attributes.class] : []),
  ].join(" ");
  const additionalAttributes = ObjectUtils.removeProperty("class", node.attributes);
  const attributes = { class: classes, ...additionalAttributes };
  return {
    name: node.element,
    attributes,
    children: node.children.map(nodeToHtmlStructure),
  };
}

function classNodeToReactStructure(node: TNodeClass): HtmlOrJsxTag {
  const attributes = { ...node.secondaryClasses, ...node.attributes };
  return {
    name: node.reactName,
    attributes,
    children: node.children.map(nodeToReactStructure),
  };
}

function nativeNodeToHtmlStructure(node: TNodeNative): HtmlOrJsxTag {
  return {
    name: node.element,
    attributes: node.attributes,
    children: node.children.map(nodeToHtmlStructure),
  };
}

function nativeNodeToReactStructure(node: TNodeNative): HtmlOrJsxTag {
  return {
    name: node.element,
    attributes: node.attributes,
    children: node.children.map(nodeToReactStructure),
  };
}
