const app = require('../app'); // Import the application

// This beforeAll is executed once before the tests begin
beforeAll(async () => {
  // Code to setup the test environment:
  // e.g., Connect to a test database or initialize test data
});

// This afterAll is executed once after all tests are finished
afterAll(async () => {
  // Code to cleanup the test environment:
  // e.g., Disconnect from the test database
});

module.exports = app; // Export the app for testing purposes
