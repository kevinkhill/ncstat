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

    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "sort-imports": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",

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
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-regexp-exec": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/array-type": [
      "error",
      { default: "array-simple" }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_" }
    ],

    //
    // eslint-plugin-prettier
    //

    "prettier/prettier": "error",

    //
    // eslint-plugin-simple-import-sort
    //

    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

    //
    // eslint-plugin-import
    //

    "import/named": "off",
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
      files: ["*.js"],
      rules: {
        "simple-import-sort/imports": "off",
        // "import/no-commonjs": "off",
        "import/order": ["error", { "newlines-between": "always" }]
      }
    },
    {
      files: ["scripts/*.js"],
      rules: {
        "prettier/prettier": "error"
      }
    },
    {
      files: ["**/*.test.ts"],
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
