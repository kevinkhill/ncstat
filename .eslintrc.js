const { resolve } = require("path");

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    project: resolve(__dirname, "./tsconfig.json"),
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    node: true
  },
  plugins: [
    "import",
    "prettier",
    "lodash-fp",
    "simple-import-sort",
    "@typescript-eslint"
  ],
  extends: [
    "node",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:import/warnings",
    "plugin:import/errors",
    "plugin:import/typescript",
    "plugin:lodash-fp/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended" // KEEP THIS LAST
  ],
  rules: {
    quotes: "off",
    "sort-imports": "off",
    "no-unused-vars": "off",
    eqeqeq: ["error", "always"],
    "no-param-reassign": "error",
    "no-mixed-operators": "error",

    //
    // @typescript-eslint/eslint-plugin
    //

    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/ban-ts-ignore": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-regexp-exec": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ],

    //
    // eslint-plugin-prettier
    //

    "prettier/prettier": "error",

    //
    // eslint-plugin-simple-import-sort
    //

    "simple-import-sort/sort": "error",

    //
    // eslint-plugin-lodash-fp
    //

    "lodash-fp/no-for-each": "off",
    "lodash-fp/preferred-alias": "off",
    "lodash-fp/consistent-compose": "off",
    "lodash-fp/consistent-name": ["error", "_"],
    "lodash-fp/use-fp": "error",
    "lodash-fp/no-chain": "error",
    "lodash-fp/prefer-get": "error",
    "lodash-fp/prefer-compact": "error",
    "lodash-fp/prefer-flat-map": "error",
    "lodash-fp/no-unused-result": "error",
    "lodash-fp/no-extraneous-args": "error",
    "lodash-fp/no-single-composition": "error",
    "lodash-fp/no-argumentless-calls": "error",
    "lodash-fp/no-partial-of-curried": "error",
    "lodash-fp/no-extraneous-partials": "error",
    "lodash-fp/no-submodule-destructuring": "error",
    "lodash-fp/no-extraneous-iteratee-args": "error",
    "lodash-fp/prefer-composition-grouping": "error",
    "lodash-fp/no-extraneous-function-wrapping": "error",
    "lodash-fp/prefer-constant": [
      "error",
      {
        arrowFunctions: false
      }
    ],
    "lodash-fp/prefer-identity": [
      "error",
      {
        arrowFunctions: false
      }
    ],

    //
    // eslint-plugin-import
    //

    "import/named": "warn",
    "import/no-named-export": "off",
    "import/no-nodejs-modules": "off",
    "import/no-default-export": "off",
    "import/prefer-default-export": "off",
    "import/first": "error",
    "import/no-amd": "error",
    "import/no-unresolved": "error",
    "import/no-self-import": "error",
    "import/no-named-default": "error",
    "import/no-absolute-path": "error",
    "import/no-mutable-exports": "error",
    "import/newline-after-import": "error",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        peerDependencies: true,
        optionalDependencies: false
      }
    ]
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  overrides: [
    {
      files: ["tests/*/*.test.ts"],
      env: {
        "jest/globals": true
      },
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
      plugins: ["jest"],
      rules: {
        "@typescript-eslint/no-misused-promises": "off",
        "jest/no-disabled-tests": "warn",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error"
      }
    }
  ]
};
