import { writeFile } from "node:fs/promises";
import { generateTypesFileContent } from "./generateTypesFileContent.ts";

console.log("Genererer typer.");

await writeToFile("../web/src/types/element-types.ts", await generateTypesFileContent());

async function writeToFile(fileName: string, content: string): Promise<void> {
  console.log("Genererer " + fileName);
  await writeFile(fileName, content, "utf8");
  console.log("Ferdig.");
}
