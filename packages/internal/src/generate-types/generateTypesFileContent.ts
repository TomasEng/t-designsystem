import { format } from "prettier";
import { componentSpec } from "../componentSpec.ts";
import { typeSpec } from "../typeSpec.ts";
import { generateType } from "./generateType.ts";
import type { Component, WebComponent } from "../Component.ts";
import type { ObjectType, Type } from "../Type.ts";

export async function generateTypesFileContent(): Promise<string> {
  const code = generateDefinitions() + "\n" + generateAttributeTypes();
  return await format(code, {
    parser: "typescript",
    printWidth: 120,
    endOfLine: "lf",
  });
}

function generateDefinitions(): string {
  const names: (keyof typeof typeSpec)[] = Object.keys(typeSpec) as (keyof typeof typeSpec)[];
  const definitions = names.map((name) => generateDefinition(name, typeSpec[name]));
  return definitions.join("\n");
}

function generateDefinition(name: string, type: Type): string {
  return "export type " + name + " = " + generateType(type) + ";";
}

function generateAttributeTypes(): string {
  const components = componentSpec.filter(isWebComponent);
  return components.map(generateAttributeType).join("\n");
}

function isWebComponent(c: Component): c is WebComponent {
  return c.type === "web";
}

function generateAttributeType(component: WebComponent): string {
  const typeName = kebabCaseToPascalCase(component.name) + "Attributes";
  const type = createAttributeType(component);
  return "export type " + typeName + " = " + generateType(type) + ";";
}

function kebabCaseToPascalCase(kebabCaseString: string): string {
  const words = kebabCaseString.split("-");
  const capitalisedWords = words.map(capitalise);
  return capitalisedWords.join("");
}

function capitalise(s: string): string {
  if (!s.length) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function createAttributeType(c: WebComponent): ObjectType {
  const propertyEntries: Array<[string, Type]> = Object.entries(c.attributes).map(([name, { type }]) => [name, type]);
  const properties = Object.fromEntries(propertyEntries);
  return { kind: "object", properties, requiredProperties: [] };
}
