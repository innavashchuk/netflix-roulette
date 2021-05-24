const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');

module.exports = {
  target: 'web',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, './public'),
    publicPath: '/'
  },

  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },

  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolveLoader: {
    alias: {
      'remove-comments-loader': path.join(__dirname, 'src/loaders', 'remove-comments-loader.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.(js|jsx?)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          }, {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
      },
      {
        test: /\.(ttf|eot|svg|woff|png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]?[hash]'
        }
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './styles.css'
    })
  ],
};