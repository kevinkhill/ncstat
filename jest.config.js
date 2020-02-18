module.exports = {
  modulePathIgnorePatterns: [
    'examples/.*',
    'packages/.*/build',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/examples/',
    '\\.snap$',
    '/packages/.*/build',
    '/packages/.*/build-es5',
    '/packages/.*/src/__tests__/setPrettyPrint.ts',
    '/packages/.*/src/__tests__/utils.ts',
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  }
};
