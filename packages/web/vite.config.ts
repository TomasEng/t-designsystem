import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "esnext",
    lib: {
      entry: "src/index.ts",
      name: "tomas-designsystem",
      formats: ["es"],
      fileName: () => "index.js",
    },
    outDir: "dist",
    cssTarget: "chrome147",
  },
  server: {
    port: 5173,
    open: true,
  },
});
