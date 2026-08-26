import { format } from "prettier";
import { componentSpec } from "../componentSpec.ts";
import { typeSpec } from "../typeSpec.ts";
import { generateType } from "./generateType.ts";
import type { Component, ElementWithClass, WebComponent } from "../Component.ts";
import type { ConstantType, ObjectType, ReferenceType, Type, UnionType } from "../Type.ts";

export async function generateTypesFileContent(): Promise<string> {
  const code = generateWebComponentDefinitions() + "\n" + generateAttributeTypes() + "\n" + generateClassTypes();
  return await format(code, {
    parser: "typescript",
    printWidth: 120,
    endOfLine: "lf",
  });
}

function generateWebComponentDefinitions(): string {
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

function generateClassTypes(): string {
  const elementsWithClass = componentSpec.filter(isElementWithClass);
  const typeDefinitionGroups = elementsWithClass.map(classTypeDefinitionsForElement);
  return typeDefinitionGroups.join("\n");
}

function classTypeDefinitionsForElement(e: ElementWithClass): string {
  return classTypeForElement(e) + "\n" + variantClassesForElement(e);
}

function classTypeForElement(e: ElementWithClass): string {
  const variantNames = Object.keys(e.variantClasses);
  const types: Array<[string, ReferenceType]> = variantNames.map((n) => [
    n,
    { kind: "reference", name: typeNameForVariant(e.className, n) },
  ]);
  const objectType: ObjectType = { kind: "object", properties: Object.fromEntries(types), requiredProperties: [] };
  return "export type " + kebabCaseToPascalCase(e.className) + "Classes = " + generateType(objectType) + ";";
}

function typeNameForVariant(componentNameInKebabCase: string, variantNameInKebabCase: string): string {
  const componentNameInPascalCase = kebabCaseToPascalCase(componentNameInKebabCase);
  const variantNameInPascalCase = kebabCaseToPascalCase(variantNameInKebabCase);
  return componentNameInPascalCase + variantNameInPascalCase;
}

function variantClassesForElement(e: ElementWithClass): string {
  const classList = Object.entries(e.variantClasses);
  const typeDefinitions = classList.map(([variantName, classes]) => {
    return typeDefinitionFromNameAndStrings(e.className, variantName, classes);
  });
  return typeDefinitions.join("\n");
}

function typeDefinitionFromNameAndStrings(
  componentNameInKebabCase: string,
  variantNameInKebabCase: string,
  strings: string[],
): string {
  const typeName = typeNameForVariant(componentNameInKebabCase, variantNameInKebabCase);
  return "export type " + typeName + " = " + generateType(unionTypeFromStrings(strings)) + ";";
}

function unionTypeFromStrings(strings: string[]): UnionType {
  const constantTypes: ConstantType[] = strings.map((s) => ({ kind: "constant", value: s }));
  return { kind: "union", types: constantTypes };
}

function isElementWithClass(c: Component): c is ElementWithClass {
  return c.type === "class";
}
