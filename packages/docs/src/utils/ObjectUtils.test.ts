import { describe, it, expect } from "vitest";
import { ObjectUtils } from "./ObjectUtils.ts";

describe("ObjectUtils", () => {
  describe("removeProperty", () => {
    it("Returns a copy of the given object where the given property is removed", () => {
      const object = { a: "Lorem", b: "ipsum" };
      const result = ObjectUtils.removeProperty("b", object);
      expect(result).toEqual({ a: "Lorem" });
    });

    it("Does not mutate the original object", () => {
      const object = { a: "Lorem", b: "ipsum" };
      ObjectUtils.removeProperty("b", object);
      expect(object).toEqual({ a: "Lorem", b: "ipsum" });
    });
  });

  describe("removeUndefined", () => {
    it("Returns an object without undefined properties", () => {
      const object = {
        a: "value1",
        b: undefined,
        c: "value3",
        d: undefined,
      };
      const result = ObjectUtils.removeUndefined(object);
      expect(result).toEqual({
        a: "value1",
        c: "value3",
      });
      expect(result).not.toHaveProperty("b"); // This is necessary because toEqual ignores undefined properties
      expect(result).not.toHaveProperty("d");
    });

    it("Does not mutate the original object", () => {
      const object = {
        a: "value1",
        b: undefined,
        c: "value3",
        d: undefined,
      };
      ObjectUtils.removeUndefined(object);
      expect(object).toEqual({
        a: "value1",
        b: undefined,
        c: "value3",
        d: undefined,
      });
      expect(object).toHaveProperty("b");
      expect(object).toHaveProperty("d");
    });
  });
});
