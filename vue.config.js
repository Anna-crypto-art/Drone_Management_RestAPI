const inProduction = process.env.ENV === "production";

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  css: { extract: true },
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:5000/",
        ws: true,
        changeOrigin: true,
      },
    },
    headers: { "Access-Control-Allow-Origin": "https://volateq-customer-data.s3.amazonaws.com, http://localhost:5000/" }
  },
  configureWebpack: {
    mode: inProduction ? "production" : "development",
    optimization: inProduction // Only apply when in production
      ? {
          minimize: false,
          usedExports: true,
          concatenateModules: true,
        }
      : undefined,
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
