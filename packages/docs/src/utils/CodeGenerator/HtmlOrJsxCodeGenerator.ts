import { ObjectUtils } from "../ObjectUtils.ts";

export type HtmlOrJsxNodes = HtmlOrJsxNode[];

export type HtmlOrJsxNode = string | HtmlOrJsxTag;

export type HtmlOrJsxTag = {
  name: string;
  attributes: Attributes;
  children: HtmlOrJsxNodes;
};

type Attributes = Record<string, string | number | boolean | undefined>;
type DefinedAttributes = Record<string, string | number | boolean>;

export class HtmlOrJsxCodeGenerator {
  #htmlOrJsxNodes: HtmlOrJsxNodes;

  constructor(htmlOrJsxNodes: HtmlOrJsxNodes) {
    this.#htmlOrJsxNodes = htmlOrJsxNodes;
  }

  public generateHtml(): string {
    return this.#htmlOrJsxNodes.map(this.generateHtmlForNode, this).join("\n");
  }

  private generateHtmlForNode(node: HtmlOrJsxNode): string {
    return typeof node === "string" ? node : this.generateHtmlForTag(node);
  }

  private generateHtmlForTag(tag: HtmlOrJsxTag): string {
    return tag.children.length
      ? this.generateHtmlForTagWithChildren(tag)
      : this.openingHtmlTag(tag) + this.closingHtmlTag(tag);
  }

  private generateHtmlForTagWithChildren(tag: HtmlOrJsxTag): string {
    const childrenCodeGenerator = new HtmlOrJsxCodeGenerator(tag.children);
    const childrenCode = childrenCodeGenerator.generateHtml();
    return `${this.openingHtmlTag(tag)}\n${indentAllLines(childrenCode)}\n${this.closingHtmlTag(tag)}`;
  }

  private openingHtmlTag(tag: HtmlOrJsxTag): string {
    const definedAttributes = this.definedAttributes(tag.attributes);
    const attributes = this.htmlAttributes(definedAttributes);
    const slashIfVoid = this.isVoid(tag) ? "/" : "";
    switch (this.numberOfVisibleAttributes(definedAttributes)) {
      case 0:
        return `<${tag.name}${slashIfVoid}>`;
      case 1:
        return `<${tag.name} ${attributes}${slashIfVoid}>`;
      default:
        return `<${tag.name}\n${indentAllLines(attributes)}\n${slashIfVoid}>`;
    }
  }

  private definedAttributes(attributes: Attributes): DefinedAttributes {
    return ObjectUtils.removeUndefined(attributes);
  }

  private htmlAttributes(attributes: DefinedAttributes): string {
    const visibleAttributes = this.visibleHtmlAttributes(attributes);
    return visibleAttributes.map(this.htmlAttribute).join("\n");
  }

  private visibleHtmlAttributes(attributes: DefinedAttributes): [string, string | number | true][] {
    const allEntries = Object.entries(attributes);
    return allEntries.filter(([, value]) => isNotFalse(value)) as [string, string | number | true][];
  }

  private htmlAttribute([key, value]: [string, string | number | true]): string {
    return value === true ? key : `${key}="${value}"`;
  }

  private numberOfVisibleAttributes(attributes: DefinedAttributes): number {
    return this.visibleHtmlAttributes(attributes).length;
  }

  private closingHtmlTag(tag: HtmlOrJsxTag): string {
    return this.isVoid(tag) ? "" : this.closingTag(tag);
  }

  private isVoid(tag: HtmlOrJsxTag): boolean {
    const voidHtmlElements: string[] = [
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
    ];
    return voidHtmlElements.includes(tag.name.toLowerCase());
  }

  private closingTag(tag: HtmlOrJsxTag): string {
    return `</${tag.name}>`;
  }

  public generateJsx(): string {
    return this.#htmlOrJsxNodes.map(this.generateJsxForNode, this).join("\n");
  }

  private generateJsxForNode(node: HtmlOrJsxNode): string {
    return typeof node === "string" ? node : this.generateJsxForTag(node);
  }

  private generateJsxForTag(tag: HtmlOrJsxTag): string {
    return tag.children.length ? this.generateJsxForTagWithChildren(tag) : this.openingJsxTag(tag);
  }

  private generateJsxForTagWithChildren(tag: HtmlOrJsxTag): string {
    const childrenCodeGenerator = new HtmlOrJsxCodeGenerator(tag.children);
    const childrenCode = childrenCodeGenerator.generateJsx();
    return `${this.openingJsxTag(tag)}\n${indentAllLines(childrenCode)}\n${this.closingTag(tag)}`;
  }

  private openingJsxTag(tag: HtmlOrJsxTag): string {
    const definedAttributes = this.definedAttributes(tag.attributes);
    const attributes = this.jsxAttributes(definedAttributes);
    const slashIfNoChildren = tag.children.length ? "" : "/";
    switch (Object.keys(definedAttributes).length) {
      case 0:
        return `<${tag.name}${slashIfNoChildren}>`;
      case 1:
        return `<${tag.name} ${attributes}${slashIfNoChildren}>`;
      default:
        return `<${tag.name}\n${indentAllLines(attributes)}\n${slashIfNoChildren}>`;
    }
  }

  private jsxAttributes(attributes: DefinedAttributes): string {
    return Object.entries(attributes).map(this.jsxAttribute).join("\n");
  }

  private jsxAttribute([key, value]: [string, string | number | boolean]): string {
    switch (typeof value) {
      case "string":
        return `${key}="${value}"`;
      case "number":
        return `${key}={${value}}`;
      case "boolean":
        return value ? key : `${key}={false}`;
    }
  }

  public generateLitTemplate(): string {
    return this.#htmlOrJsxNodes.map(this.generateLitForNode, this).join("\n");
  }

  private generateLitForNode(node: HtmlOrJsxNode): string {
    return typeof node === "string" ? node : this.generateLitForTag(node);
  }

  private generateLitForTag(tag: HtmlOrJsxTag): string {
    return tag.children.length
      ? this.generateLitForTagWithChildren(tag)
      : this.openingLitTag(tag) + this.closingHtmlTag(tag);
  }

  private generateLitForTagWithChildren(tag: HtmlOrJsxTag): string {
    const childrenCodeGenerator = new HtmlOrJsxCodeGenerator(tag.children);
    const childrenCode = childrenCodeGenerator.generateLitTemplate();
    return `${this.openingLitTag(tag)}\n${indentAllLines(childrenCode)}\n${this.closingHtmlTag(tag)}`;
  }

  private openingLitTag(tag: HtmlOrJsxTag): string {
    const definedAttributes = this.definedAttributes(tag.attributes);
    const attributes = this.litAttributes(definedAttributes);
    const slashIfVoid = this.isVoid(tag) ? "/" : "";
    switch (Object.keys(definedAttributes).length) {
      case 0:
        return `<${tag.name}${slashIfVoid}>`;
      case 1:
        return `<${tag.name} ${attributes}${slashIfVoid}>`;
      default:
        return `<${tag.name}\n${indentAllLines(attributes)}\n${slashIfVoid}>`;
    }
  }

  private litAttributes(attributes: DefinedAttributes): string {
    return Object.entries(attributes).map(this.litAttribute).join("\n");
  }

  private litAttribute([key, value]: [string, string | number | boolean]): string {
    switch (typeof value) {
      case "string":
        return `${key}="${value}"`;
      case "number":
        return `${key}=\${${value}}`;
      case "boolean":
        return `?${key}=\${${value}}`;
    }
  }
}

function isNotFalse(value: string | number | boolean): value is string | number | true {
  return value !== false;
}

const INDENT = "    ";
function indentAllLines(text: string): string {
  return INDENT + text.replace(/\n/g, "\n" + INDENT);
}
