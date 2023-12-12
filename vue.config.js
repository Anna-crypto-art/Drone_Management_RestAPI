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
    headers: { 
      "Access-Control-Allow-Origin": "https://volateq-customer-data.s3.amazonaws.com, http://localhost:5000/, https://*.openstreetmap.org" 
    }
  },
  configureWebpack: inProduction ? {
    mode: "production",
    optimization: {
      minimize: true,
      usedExports: true,
      concatenateModules: true,
    },
    output: {
      hashFunction: "sha256",
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
    } 
  } : {
    mode: "development",
    devtool: "source-map",
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
