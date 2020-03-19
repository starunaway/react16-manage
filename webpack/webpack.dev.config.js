module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 10086,
    hot: true,
    open:true,
    proxy: {
      "/": {
        target: "http://localhost:10086",
        pathRewrite: { '/': '/main' },
      },
      "/main": {
        target: "http://localhost:10086",
        pathRewrite: { '^/main': '/main' },
      }
    },
  }
};
