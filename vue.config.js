module.exports = {
  devServer: {
    proxy: 'http://localhost:5000',
    headers: { "Access-Control-Allow-Origin": "*" }
  }
}