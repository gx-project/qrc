const withPWA = require("next-pwa");
const withPreact = require("next-plugin-preact");

module.exports = withPreact(
  withPWA({
    pwa: {
      dest: "public",
    },
    i18n: {
      locales: ["pt-BR"],
      defaultLocale: "pt-BR",
    },
  })
);
