const esbuild = require("esbuild");
const cssModulesPlugin = require("esbuild-css-modules-plugin");
const { dtsPlugin } = require("esbuild-plugin-d.ts");

esbuild.build({
  bundle: true,
  target: "es2015",
  platform: "browser",
  format: "esm",
  outfile: "dist/snippet/CodeSnippet.js",
  entryPoints: ["lib/snippet/CodeSnippet.tsx"],
  packages: "external",
  plugins: [
    cssModulesPlugin({
      inject: true,
    }),
    dtsPlugin(),
  ],
});
