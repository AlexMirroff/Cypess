const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guest:welcome2qauto@qauto.forstudy.space",
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 10000,
    defaultCommandTimeout: 2000,
    reporter: 'mochawesome',
    env: {
      'USER_EMAIL': "mirhaiazov@gmail.com",
      'USER_PASSWORD': "PassWord1"
    }
  },
});
