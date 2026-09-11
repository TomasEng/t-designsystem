import { describe, it, expect } from "vitest";
import {
  camelToPascal,
  capitalize,
  collapseWhitespace,
  kebabToCamel,
  kebabToPascal,
  trimLineBreaks,
  trimMargin,
} from "./stringUtils";

describe("stringUtils", () => {
  describe("kebabToCamel", () => {
    it("Converts kebab case to camel case", () => {
      expect(kebabToCamel("kebab-case")).toBe("kebabCase");
    });

    it("Converts kebab case with multiple dashes to camel case", () => {
      expect(kebabToCamel("kebab-case-example")).toBe("kebabCaseExample");
    });
  });

  describe("kebabToPascal", () => {
    it("Converts kebab case to pascal case", () => {
      expect(kebabToPascal("kebab-case")).toBe("KebabCase");
    });

    it("Converts kebab case with multiple dashes to pascal case", () => {
      expect(kebabToPascal("kebab-case-example")).toBe("KebabCaseExample");
    });

    it("Works with numbers", () => {
      expect(kebabToPascal("kebab-case-123")).toBe("KebabCase123");
    });
  });

  describe("camelToPascal", () => {
    it("Converts camel case to pascal case", () => {
      expect(camelToPascal("camelCase")).toBe("CamelCase");
    });

    it("Converts camel case with multiple words to pascal case", () => {
      expect(camelToPascal("camelCaseExample")).toBe("CamelCaseExample");
    });
  });

  describe("collapseWhitespace", () => {
    it("Collapses multiple whitespaces to a single space character", () => {
      expect(collapseWhitespace("  test\n  test  ")).toBe(" test test ");
    });
  });

  describe("trimMargin", () => {
    it('Removes everything before the first "|" character on each line, including the "|" character', () => {
      expect(
        trimMargin(`
          |test
          |    test
          |test|
      `),
      ).toBe("test\n    test\ntest|");
    });
  });

  describe("capitalize", () => {
    it("Capitalizes the first character of a string", () => {
      expect(capitalize("test")).toBe("Test");
    });

    it("Does nothing if the first character is already capitalized", () => {
      expect(capitalize("Test")).toBe("Test");
    });

    it("Does nothing if the first character is a letter", () => {
      expect(capitalize("123")).toBe("123");
    });

    it("Returns an empty string if the input is an empty string", () => {
      expect(capitalize("")).toBe("");
    });
  });

  describe("trimLineBreaks", () => {
    it("Removes the first line break when it is the first character", () => {
      expect(trimLineBreaks("\ntest")).toBe("test");
    });

    it("Removes the last line break when it is the last character", () => {
      expect(trimLineBreaks("test\n")).toBe("test");
    });

    it("Does not remove line breaks in the middle of the string", () => {
      expect(trimLineBreaks("te\nst")).toBe("te\nst");
    });

    it("Removes whitespace at the beginning until the first line break", () => {
      expect(trimLineBreaks("  \ntest")).toBe("test");
    });

    it("Removes whitespace at the end after the last line break", () => {
      expect(trimLineBreaks("test\n  ")).toBe("test");
    });

    it("Does not trim the string if there are no line breaks", () => {
      expect(trimLineBreaks(" test ")).toBe(" test ");
    });

    it("Returns an empty string if the input is an empty string", () => {
      expect(trimLineBreaks("")).toBe("");
    });

    it("Does not remove white space after the first and before the last line break", () => {
      expect(trimLineBreaks(" \n test \n ")).toBe(" test ");
    });
  });
});
