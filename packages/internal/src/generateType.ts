import type { ArrayType, ConstantType, ObjectType, Type, UnionType } from "./Type.ts";

export function generateType(type: Type): string {
  switch (type.kind) {
    case "null":
      return "null";
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "array":
      return generateArrayType(type);
    case "object":
      return generateObjectType(type);
    case "union":
      return generateUnionType(type);
    case "constant":
      return generateConstantType(type);
  }
}

function generateArrayType(type: ArrayType): string {
  return "Array<" + generateType(type.subkind) + ">";
}

function generateObjectType(type: ObjectType): string {
  const propertyDefinitions = Object.keys(type.properties).map((p) => generateObjectPropertyDefinition(type, p));
  return "{ " + propertyDefinitions.join("; ") + " }";
}

function generateObjectPropertyDefinition(type: ObjectType, property: keyof ObjectType["properties"]): string {
  const isRequired = type.requiredProperties.includes(property);
  const questionMarkIfOptional = isRequired ? "" : "?";
  return `${property}${questionMarkIfOptional}: ${generateType(type.properties[property])}`;
}

function generateUnionType(type: UnionType): string {
  return type.types.map(generateType).join(" | ");
}

function generateConstantType(type: ConstantType): string {
  switch (typeof type.value) {
    case "string":
      return '"' + type.value + '"';
    case "number":
      return type.value.toString();
    case "boolean":
      return type.value ? "true" : "false";
  }
}
