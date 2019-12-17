module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    node: true
  },
  plugins: [
    "import",
    "prettier",
    "simple-import-sort",
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/warnings",
    "plugin:import/errors",
    "plugin:import/typescript",
    "node",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended", // KEEP THIS LAST
  ],
  rules: {
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
    "@typescript-eslint/explicit-function-return-type": ["error", {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
    }],

    //
    // eslint base
    //

    quotes: "off",
    "sort-imports": "off",
    eqeqeq: ["error", "always"],
    "no-param-reassign": "error",
    "no-mixed-operators": "error",

    //
    // eslint-plugin-prettier
    //

    "prettier/prettier": "error",

    //
    // eslint-plugin-simple-import-sort
    //

    "simple-import-sort/sort": "error",


    //
    // eslint-plugin-import
    //

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
      "@typescript-eslint/parser": [".ts", ".tsx" ]
    }
  },
  overrides: [
    {
      files: [
        "tests/**/*.test.ts"
      ],
      env: {
        "jest/globals": true
      },
      extends: [
        "plugin:jest/recommended",
        "plugin:jest/style"
      ],
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
