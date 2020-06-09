// "../../.eslintrc.js",

module.exports = {
  // root: true,
  parserOptions: {
    project: "tsconfig.eslint.json",
    tsconfigRootDir: __dirname
  },
  plugins: ["import", "jest-formatting"],
  extends: ["plugin:jest-formatting/strict"],
  settings: {
    "import/extensions": [".ts", ".js"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      alias: {
        map: [["@/*", "./src"]],
        extensions: [".ts", ".js", ".jsx", ".json"]
      }
    }
  },
  rules: {
    "import/no-extraneous-dependencies": "off"
  }
};
