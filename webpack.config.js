// eslint-disable-next-line
const webpack = require('webpack');
const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const dirname = path.resolve();

module.exports = {
    target: "node",
    mode: "development",
    devtool: "eval",
    entry: path.resolve(dirname, "./index.js"),
    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    plugins: [
        new NodemonPlugin() // use nodemon to watch for changes
    ],
    node: {
        __dirname: true
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js"],
        fallback: {
            fs: false
        }
    },
    output: {
        filename: "[name].js",
        path: path.resolve(dirname, "dist")
    }
};
