// This configuration file is used for setting up cross-browser testing in a React application.
// It utilizes the 'jest' testing framework and '@testing-library/react' for rendering components.

module.exports = {
  // Specify the test environment
  testEnvironment: 'jsdom',

  // Globally available test files
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Specify test match patterns
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).[jt]s?(x)'],

  // Coverage threshold configuration
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};