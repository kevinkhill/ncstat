/** @type {import('bili').Config} */
const pkg = require("./package.json");

module.exports = {
  input: {
    NcParser: "src/index.ts",
    ncstat: "src/cli/index.ts"
  },
  output: {
    dir: "./dist",
    format: ["cjs-min"]
  },
  externals: [...Object.keys(pkg.dependencies)],
  plugins: {
    // typescript2: {
    //   tsconfigOverride: {
    //     include: ["src"]
    //   }
    // }
  }
};
