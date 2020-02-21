module.exports = {
  rootDir: ".",
  modulePathIgnorePatterns: ["examples/.*", "packages/.*/build"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/examples/",
    "\\.snap$",
    "/packages/.*/build",
    "/packages/.*/src/__tests__/utils.ts"
  ],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  }
};
