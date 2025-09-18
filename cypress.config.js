const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true

  },
});
