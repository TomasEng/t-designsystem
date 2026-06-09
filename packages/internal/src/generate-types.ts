import { typeSpec } from "./typeSpec.ts";
import type { ArrayType, ConstantType, ObjectType, Type, UnionType } from "./Type.ts";
import { writeFile } from 'node:fs/promises';

console.log("Genererer typer.");

const contentString = generateDefinitions();
await writeToFile("generated/types.ts", contentString);

async function writeToFile(fileName: string, content: string): Promise<void> {
  console.log("Generating " + fileName);
  await writeFile(fileName, content, 'utf8');
  console.log('Ferdig.');
}

function generateDefinitions(): string {
  const names: (keyof typeof typeSpec)[] = Object.keys(typeSpec) as (keyof typeof typeSpec)[];
  const definitions = names.map(name => generateDefinition(name, typeSpec[name]));
  return definitions.join("\n");
}

function generateDefinition(name: string, type: Type): string {
  return 'export type ' + name + ' = ' + generateType(type) + ';';
}

function generateType(type: Type): string {
  switch (type.kind) {
    case "null": return "null";
    case "string": return "string";
    case "number": return "number";
    case "boolean": return "boolean";
    case "array": return generateArrayType(type);
    case "object": return generateObjectType(type);
    case "union": return generateUnionType(type);
    case "constant": return generateConstantType(type);
  }
}
function generateArrayType(type: ArrayType): string {
  return 'Array<' + generateType(type.subkind) + '>';
}

function generateObjectType(type: ObjectType): string {
  const propertyDefinitions = Object.keys(type.properties).map(p => generateObjectPropertyDefinition(type, p));
  return '{ ' + propertyDefinitions.join('; ') + ' }';
}

function generateObjectPropertyDefinition(type: ObjectType, property: keyof ObjectType['properties']): string {
  const isRequired = type.requiredProperties.includes(property);
  const questionMarkIfOptional = isRequired ? '' : '?';
  return `${property}${questionMarkIfOptional}: ${generateType(type.properties[property])}`;
}

function generateUnionType(type: UnionType): string {
  return type.types.map(generateType).join(' | ');
}

function generateConstantType(type: ConstantType): string {
  switch (typeof type.value) {
    case "string": return '"' + type.value + '"';
    case "number": return type.value.toString();
    case "boolean": return type.value ? 'true' : 'false';
  }
}