module.exports = {
  rootDir: ".",
  preset: "ts-jest",
  setupFiles: ["<rootDir>/src/lib/test-helpers.ts"],
  globals: {
    parseSource: true // test-helpers.ts
  },
  coverageDirectory: "<rootDir>/coverage/",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  modulePathIgnorePatterns: ["/build"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1"
  },
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "demo",
    "build",
    "node_modules",
    "helpers.ts"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest"
  }
};
