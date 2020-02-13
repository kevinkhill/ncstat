/** @type {import('bili').Config} */
module.exports = {
  input: {
    "ncstat.core": "src/index.ts",
    "ncstat.cli": "src/cli/index.ts"
  },
  plugins: {
    typescript2: {
      tsconfigOverride: {
        include: ["src"]
      }
    }
  }
};
