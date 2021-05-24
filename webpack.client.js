/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevMod = process.env.NODE_ENV === 'development';
module.exports = merge(common, {
  name: 'client',
  target: 'web',
  mode: 'development',
  entry: [
    isDevMod && 'webpack-hot-middleware/client',
    './src/index.tsx',
  ].filter(Boolean),
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'remove-comments-loader',
            options: { attrs: false }
          },
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  optimization: {
    moduleIds: 'named'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './styles.css'
    })
  ].filter(Boolean),
});
