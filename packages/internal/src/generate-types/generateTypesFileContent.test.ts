import * as ts from "typescript";
import { describe, it, expect } from "vitest";
import { Assert } from "../Assert.ts";
import { generateTypesFileContent } from "./generateTypesFileContent.ts";

describe("generateTypesFileContent", () => {
  it("Returns the same result each time", async () => {
    const result1 = await generateTypesFileContent();
    const result2 = await generateTypesFileContent();
    const result3 = await generateTypesFileContent();
    expect(result2).toBe(result1);
    expect(result3).toBe(result1);
  });

  it("Returns a non-empty string", async () => {
    const code = await generateTypesFileContent();
    expect(code.length).toBeGreaterThan(0);
  });

  it("Returns valid Typescript code", async () => {
    const code = await generateTypesFileContent();
    const sourceFile = ts.createSourceFile("code.ts", code, ts.ScriptTarget.Latest, true);
    const errors = (sourceFile as any).parseDiagnostics; // eslint-disable-line @typescript-eslint/no-explicit-any
    Assert.isArray(errors);
    expect(errors.length).toBe(0);
  });

  it("Includes event types", async () => {
    const code = await generateTypesFileContent();
    expect(code).toContain("export type TInputEvent =");
  });

  it("Includes attribute types", async () => {
    const code = await generateTypesFileContent();
    expect(code).toContain("export type TTextfieldAttributes =");
  });
});
