const webpack = require('webpack');
const path = require('path');
const { resolve } = path;

console.log('__dirname', __dirname);

var SRC_DIR = resolve(__dirname, 'frontend/src');
const PUBLIC_DIR = resolve(__dirname, 'public');

module.exports = {
    mode: 'development',
    entry: { app: [path.join(SRC_DIR, 'main')] },
    output: {
        filename: 'bundle.js',
        path: PUBLIC_DIR
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true,
                        plugins: ['@babel/plugin-proposal-function-bind', '@babel/plugin-proposal-class-properties'],
                    }
                }
            },
            {
                test: /\.html$/,
                loader: 'underscore-template-loader'
            }
        ]
    },
    devServer: {
        contentBase: PUBLIC_DIR
    }
};