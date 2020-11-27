module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
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
