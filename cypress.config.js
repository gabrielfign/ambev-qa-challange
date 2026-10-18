const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Desafio QA Ambev",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: "https://front.serverest.dev",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 20000,
    setupNodeEvents(on) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    retries: {
      runMode: 1,
      openMode: 0,
    },
  },
  expose: {
    apiUrl: "https://serverest.dev",
  },
});
