const { merge } = require("webpack-merge");
const common = require("./webpack.config.common.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            unsafe: true,
            unsafe_comps: true,
          },
          output: {
            comments: false,
          },
        },
        parallel: true,
      }),
    ],
  },
});
