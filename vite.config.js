// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    declaration: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: [
        resolve(__dirname, "lib/snippet/CodeSnippet.tsx"),
        resolve(__dirname, "lib/snippet/SyntaxRule.tsx"),
      ],
      name: "Customizable Code Snippets",
      // the proper extensions will be added
      fileName: "",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
        },
      },
    },
  },
});
