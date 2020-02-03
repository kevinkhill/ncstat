module.exports = {
  verbose: true,
  clearMocks: true,
  preset: "ts-jest",
  coverageDirectory: "coverage",
  globals: {
    "ts-jest": {
      babelConfig: true
    }
  }
};
