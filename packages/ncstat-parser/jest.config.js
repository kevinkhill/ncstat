module.exports = {
  rootDir: ".",
  // projects: ["<rootDir>/packages/*/jest.config.js"],
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
