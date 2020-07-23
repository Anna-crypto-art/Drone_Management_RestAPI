module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5000/',
        ws: true,
        changeOrigin: true
      }
    },
    headers: { "Access-Control-Allow-Origin": "*" }
  }
}