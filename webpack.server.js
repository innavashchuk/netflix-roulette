const {merge} = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    name: 'server',
    target: 'node',
    entry: './src/serverRenderer.js',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/serverRenderer.js',
        libraryTarget: 'commonjs2',
    },
});
