module.exports = {
  rootDir: ".",
  // projects: ["<rootDir>/packages/*/jest.config.js"],
  coverageDirectory: "<rootDir>/coverage/",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  modulePathIgnorePatterns: ["/build"],
  testPathIgnorePatterns: [
    "/demo/",
    "/build/",
    "/node_modules/",
    "__tests__/utils.ts$"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest"
  }
};
