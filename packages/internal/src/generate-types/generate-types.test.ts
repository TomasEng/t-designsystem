import { readFile } from "node:fs/promises";
import { test, expect } from "vitest";
import { generateTypesFileContent } from "./generateTypesFileContent.ts";

test("Types file is up to date", async () => {
  const expectedContent = await generateTypesFileContent();
  const currentContent = await readFile("../web/src/types/element-types.ts", "utf8");
  expect(currentContent).toBe(expectedContent);
});
