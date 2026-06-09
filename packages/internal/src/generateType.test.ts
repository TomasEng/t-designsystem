import { describe, it, expect } from "vitest";
import { generateType } from "./generateType.ts";
import type { NullType , PrimitiveType, ArrayType, ObjectType, UnionType, ConstantType } from "./Type.ts";

describe('generateType', () => {
  it('Generates "null" from a null type', () => {
    const nullType: NullType = { kind: "null" };
    expect(generateType(nullType)).toEqual("null");
  });

  describe('Primitive types', () => {
    it('Generates "string" from a string type', () => {
      const stringType: PrimitiveType = { kind: "string" };
      expect(generateType(stringType)).toEqual("string");
    });

    it('Generates "number" from a number type', () => {
      const numberType: PrimitiveType = { kind: "number" };
      expect(generateType(numberType)).toEqual("number");
    });

    it('Generates "boolean" from a boolean type', () => {
      const booleanType: PrimitiveType = { kind: "boolean" };
      expect(generateType(booleanType)).toEqual("boolean");
    });
  });

  describe('Array types', () => {
    it('Generates Array<string> from an array of strings', () => {
      const arrayType: ArrayType = { kind: "array", subkind: { kind: "string" } };
      expect(generateType(arrayType)).toEqual("Array<string>");
    });

    it('Generates Array<number> from an array of numbers', () => {
      const arrayType: ArrayType = { kind: "array", subkind: { kind: "number" } };
      expect(generateType(arrayType)).toEqual("Array<number>");
    });

    it('Generates nested arrays correctly', () => {
      const arrayType: ArrayType = {
        kind: "array",
        subkind: { kind: "array", subkind: { kind: "string" } }
      };
      expect(generateType(arrayType)).toEqual("Array<Array<string>>");
    });
  });

  describe('Object types', () => {
    it('Generates object with required properties', () => {
      const objectType: ObjectType = {
        kind: "object",
        properties: {
          name: { kind: "string" },
          age: { kind: "number" }
        },
        requiredProperties: ["name", "age"]
      };
      expect(generateType(objectType)).toEqual("{ name: string; age: number }");
    });

    it('Generates object with optional properties', () => {
      const objectType: ObjectType = {
        kind: "object",
        properties: {
          name: { kind: "string" },
          age: { kind: "number" }
        },
        requiredProperties: ["name"]
      };
      expect(generateType(objectType)).toEqual("{ name: string; age?: number }");
    });

    it('Generates empty object', () => {
      const objectType: ObjectType = {
        kind: "object",
        properties: {},
        requiredProperties: []
      };
      expect(generateType(objectType)).toEqual("{  }");
    });
  });

  describe('Union types', () => {
    it('Generates union of primitive types', () => {
      const unionType: UnionType = {
        kind: "union",
        types: [
          { kind: "string" },
          { kind: "number" }
        ]
      };
      expect(generateType(unionType)).toEqual("string | number");
    });

    it('Generates union with null', () => {
      const unionType: UnionType = {
        kind: "union",
        types: [
          { kind: "null" },
          { kind: "string" }
        ]
      };
      expect(generateType(unionType)).toEqual("null | string");
    });

    it('Generates union with multiple types', () => {
      const unionType: UnionType = {
        kind: "union",
        types: [
          { kind: "null" },
          { kind: "string" },
          { kind: "number" },
          { kind: "boolean" }
        ]
      };
      expect(generateType(unionType)).toEqual("null | string | number | boolean");
    });
  });

  describe('Constant types', () => {
    it('Generates constant string with quotes', () => {
      const constantType: ConstantType = { kind: "constant", value: "hello" };
      expect(generateType(constantType)).toEqual('"hello"');
    });

    it('Generates constant number', () => {
      const constantType: ConstantType = { kind: "constant", value: 42 };
      expect(generateType(constantType)).toEqual("42");
    });

    it('Generates constant boolean true', () => {
      const constantType: ConstantType = { kind: "constant", value: true };
      expect(generateType(constantType)).toEqual("true");
    });

    it('Generates constant boolean false', () => {
      const constantType: ConstantType = { kind: "constant", value: false };
      expect(generateType(constantType)).toEqual("false");
    });
  });

  describe('Complex types', () => {
    it('Generates complex union with constants and primitives', () => {
      const unionType: UnionType = {
        kind: "union",
        types: [
          { kind: "null" },
          { kind: "constant", value: 1 },
          { kind: "constant", value: "active" },
          { kind: "boolean" }
        ]
      };
      expect(generateType(unionType)).toEqual('null | 1 | "active" | boolean');
    });

    it('Generates array of objects', () => {
      const arrayType: ArrayType = {
        kind: "array",
        subkind: {
          kind: "object",
          properties: {
            id: { kind: "number" },
            name: { kind: "string" }
          },
          requiredProperties: ["id"]
        }
      };
      expect(generateType(arrayType)).toEqual("Array<{ id: number; name?: string }>");
    });
  });
});