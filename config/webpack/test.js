const merge = require('webpack-merge');
const sharedConfig = require('./shared');

module.exports = merge(sharedConfig, {
    // `entry` configured by karma
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /.test\.js$/,
                include: /(src|test)/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                },
            },
            {
                test: /\.js$/,
                include: /src/,
                loader: 'istanbul-instrumenter-loader',
            },
        ],
    },
});
