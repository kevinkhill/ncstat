const ERROR = 2;
const WARN = 1;
const OFF = 0;

const MAX_PARAMS = 4;
const MAX_LINE_LENGTH = 120;
const MAX_NESTED_CALLBACKS = 3;
const MAX_STATEMENTS = 30;

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    project: "tsconfig.json"
  },
  env: {
    es6: true,
    node: true
  },
  plugins: [
    "jest",
    "import",
    "prettier",
    "lodash-fp",
    "jest-formatting",
    "simple-import-sort",
    "@typescript-eslint"
  ],
  extends: [
    "node",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:import/errors",
    "plugin:import/typescript",
    "plugin:jest-formatting/strict",
    "plugin:lodash-fp/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended" // KEEP THIS LAST
  ],
  rules: {
    quotes: OFF,
    "sort-imports": OFF,
    "no-unused-vars": OFF,
    eqeqeq: [ERROR, "always"],
    "no-param-reassign": ERROR,
    "no-mixed-operators": ERROR,

    "prettier/prettier": ERROR,
    "import/prefer-default-export": OFF,

    "@typescript-eslint/indent": OFF,
    "@typescript-eslint/no-var-requires": OFF,
    "@typescript-eslint/no-use-before-define": OFF,
    "@typescript-eslint/no-non-null-assertion": OFF,
    "@typescript-eslint/no-parameter-properties": OFF,
    "@typescript-eslint/explicit-member-accessibility": OFF,
    "@typescript-eslint/no-object-literal-type-assertion": OFF,
    "@typescript-eslint/no-explicit-any": WARN,
    "@typescript-eslint/ban-types": ERROR,
    "@typescript-eslint/prefer-includes": ERROR,
    "@typescript-eslint/prefer-regexp-exec": ERROR,
    "@typescript-eslint/no-inferrable-types": ERROR,
    "@typescript-eslint/no-misused-promises": ERROR,
    "@typescript-eslint/consistent-type-definitions": ERROR,
    "@typescript-eslint/no-unnecessary-type-assertion": ERROR,
    "@typescript-eslint/prefer-string-starts-ends-with": ERROR,
    "@typescript-eslint/array-type": [
      ERROR,
      { default: "array-simple" }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      ERROR,
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      ERROR,
      { argsIgnorePattern: "^_" }
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
      files: ["*.js"],
      rules: {
        "import/no-commonjs": OFF
      }
    },
    {
      files: ["scripts/*.js"],
      rules: {
        "prettier/prettier": ERROR
      }
    },
    {
      files: ["packages/**/*.test.ts"],
      env: {
        "jest/globals": true
      },
      extends: [
        "plugin:jest/style",
        "plugin:jest/recommended",
        "plugin:jest-formatting/recommended"
      ],
      plugins: ["jest", "jest-formatting"],
      rules: {
        "@typescript-eslint/no-misused-promises": OFF,
        "jest/no-disabled-tests": WARN,
        "jest/prefer-to-have-length": WARN,
        "jest/valid-expect": ERROR,
        "jest/no-focused-tests": ERROR,
        "jest/no-identical-title": ERROR
      }
    }
  ]
};
