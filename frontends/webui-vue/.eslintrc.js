const path = require("path");

module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 8,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    project: path.resolve(__dirname, "tsconfig.json")
  },
  env: {
    es6: true,
    node: true
  },
  plugins: [
    "vue",
    "node",
    "jest",
    "import",
    "prettier",
    "lodash-fp",
    "jest-formatting",
    "simple-import-sort",
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:import/errors",
    "plugin:import/typescript",
    "plugin:jest-formatting/strict",
    "plugin:lodash-fp/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/essential",
    "@vue/typescript/recommended",
    "prettier",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended" // KEEP THIS LAST
  ],
  rules: {
    "no-console":
      process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger":
      process.env.NODE_ENV === "production" ? "error" : "off",

    //
    // eslint-plugin-vue plugin
    //

    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "vue/attribute-hyphenation": ["error", "always"],
    // "vue/max-attributes-per-line": [
    //   "error",
    //   {
    //     singleline: 2,
    //     multiline: {
    //       max: 1,
    //       allowFirstLine: false
    //     }
    //   }
    // ],
    "vue/attributes-order": [
      "error",
      {
        order: [
          "GLOBAL", // id
          "DEFINITION", // is
          "UNIQUE", // ref, key, slot
          "CONDITIONALS", // v-if, v-else-if, v-else, v-show, v-cloak
          "LIST_RENDERING", // v-for
          "OTHER_ATTR", // all unspecified bound & unbound attributes
          "BINDING", // v-model
          "RENDER_MODIFIERS", // v-pre, v-once
          "CONTENT", // v-html, v-text
          "EVENTS" // v-on
        ]
      }
    ]
  }
};
