const {merge} = require("webpack-merge");
const common = require("./webpack.config.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    devServer: {
        contentBase: "./dist",
        compress: true,
        historyApiFallback: true,
        port: 3000,
        open: true
    },
});