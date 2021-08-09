const webpack = require('webpack');
// const path = require('path');
const { resolve } = require('path');

var SRC_DIR = resolve(__dirname, 'src');
const PUBLIC_DIR = resolve(__dirname, 'public');

module.exports = {
    entry: `${SRC_DIR}/index.js`,
    output: {
        filename: 'bundle.js',
        path: PUBLIC_DIR
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/
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