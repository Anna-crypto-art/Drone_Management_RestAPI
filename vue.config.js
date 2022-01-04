/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:5000/",
        ws: true,
        changeOrigin: true,
      },
    },
    // headers: { "Access-Control-Allow-Origin": "*" }
  },
  configureWebpack: {
    mode: process.env.ENV === "production" ? "production" : "development",
    optimization: {
      minimize: true,
      usedExports: true,
      concatenateModules: true,
    },
    output: {
      hashFunction: "sha256",
    },
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
};
