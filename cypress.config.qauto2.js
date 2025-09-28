const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guest:welcome2qauto@qauto2.forstudy.space",
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 10000,
    defaultCommandTimeout: 2000,

  },
});
