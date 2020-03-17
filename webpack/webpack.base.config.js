const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx'],
    mainFiles: ['index'],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@component': path.resolve(__dirname, '../src/component'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@app': path.resolve(__dirname, '../src/app'),
      '@action': path.resolve(__dirname, '../src/action'),
      '@utils':path.resolve(__dirname, '../src/utils'),
      '@themes':path.resolve(__dirname, '../src/themes'),
      '@routes':path.resolve(__dirname, '../src/routes')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },

      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
