module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    '*.js',
    '!*.test.js',
    '!*.spec.js',
    '!jest.config.js'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  testMatch: ['**/*.test.js', '**/*.spec.js'],
  verbose: true,
  collectCoverage: false,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};