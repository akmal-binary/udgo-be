module.exports = {
  modulePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.js', 'tests', 'Boilerplate'],
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.js', 'tests', 'Boilerplate'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
