const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const developmentMode = process.env.NODE_ENV === "development";
const productionMode = !developmentMode;

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: "./index.tsx",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        chunkFilename: '[name].bundle.js',
        publicPath: '/'
    },
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: "index.html",
            minify: {collapseWhitespace: productionMode},
        }),
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ""
                        }
                    },
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(ttf|gif|png|jpg|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {name: "images/[name].[ext]"},
                    },
                ],
            },
        ],
    },
};
