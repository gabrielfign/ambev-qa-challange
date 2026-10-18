const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front.serverest.dev",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 20000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
  },
  expose: {
    apiUrl: "https://serverest.dev",
  },
});
