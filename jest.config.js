module.exports = {
  rootDir: ".",
  // projects: ["<rootDir>/packages/*/jest.config.js"],
  coverageDirectory: "<rootDir>/coverage/",
  collectCoverageFrom: ["<rootDir>/packages/*/src/**/*.ts"],
  modulePathIgnorePatterns: ["examples/.*", "packages/.*/build"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/examples/",
    "\\.snap$",
    "__tests__/utils.ts$",
    "/packages/.*/build"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest"
  }
};
