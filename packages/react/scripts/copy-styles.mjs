import { copyFile } from "node:fs/promises";

await copyFile(
  new URL(import.meta.resolve("tomas-designsystem/tomas-designsystem.css")),
  new URL("../dist/tomas-designsystem.css", import.meta.url),
);
