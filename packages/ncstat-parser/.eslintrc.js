// "../../.eslintrc.js",

module.exports = {
  // root: true,
  env: {
    "jest": true
  },
  globals: {
    parseSource: true
  },
  parserOptions: {
    project: "tsconfig.eslint.json",
    tsconfigRootDir: __dirname
  },
  plugins: ["import", "jest-formatting"],
  extends: [
    "plugin:jest-formatting/strict"
  ],
  settings: {
    "import/extensions": [".ts"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"]
    },
    "import/resolver": {
      alias: {
        map: [["@/*", "./src"]],
        extensions: [".ts", ".js", ".jsx", ".json"]
      }
    }
  },
  rules: {
    "newline-per-chained-call": [2, { ignoreChainWithDepth: 3 }],
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "error"
  }
};
