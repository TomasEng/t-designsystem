import { readFile } from "node:fs/promises";
import { test, expect } from "vitest";
import { generateTypesFileContent } from "../src/generate-types/generateTypesFileContent";

test("Types file is up to date", async () => {
  const expectedContent = await generateTypesFileContent();
  const currentContent = await readFile("generated/types.ts", "utf8");
  expect(currentContent).toBe(expectedContent);
});
